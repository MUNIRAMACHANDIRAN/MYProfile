const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const upload = require('../middleware/upload');
require('dotenv').config();

// Helper to generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/auth/register-init (was /signup)
router.post('/signup', (req, res, next) => {
    req.uploadType = 'profile';
    next();
}, upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPassword } = req.body;

        if (!name || !email || !mobile || !password)
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        if (password !== confirmPassword)
            return res.status(400).json({ success: false, message: 'Passwords do not match.' });
        if (password.length < 6)
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });

        // Check if email or mobile exists and is verified
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            if (existing.isEmailVerified && existing.isMobileVerified) {
                return res.status(409).json({ success: false, message: 'Email already registered and verified.' });
            } else {
                // Delete unverified existing user so they can try again
                await existing.destroy();
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const profileImage = req.file ? `/uploads/profiles/${req.file.filename}` : null;

        const emailOtp = generateOtp();
        const mobileOtp = generateOtp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const user = await User.create({
            name, email, mobile,
            password: hashedPassword,
            profileImage,
            emailOtp, mobileOtp, otpExpiry,
            isEmailVerified: false, isMobileVerified: false
        });

        // --- SEND SMS OTP VIA FAST2SMS ---
        const FAST2SMS_KEY = 'syvUSeYV26Bzl5KXgPaFmR4QZchx7Iitq0w1oukT8rOb3dpEJf763Lto1g5Se89AbcjpBE4IzPC0TGsh';
        try {
            await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                params: {
                    authorization: FAST2SMS_KEY,
                    route: 'q',
                    message: `Your Portfolio verification OTP is ${mobileOtp}. Valid for 10 minutes.`,
                    flash: '0',
                    numbers: mobile
                }
            });
            console.log(`[SMS] OTP ${mobileOtp} sent to ${mobile}`);
        } catch (smsErr) {
            console.error('[SMS ERROR]:', smsErr.response?.data || smsErr.message);
            // We won't block registration if SMS fails here, but real production should.
        }

        // --- SEND EMAIL OTP VIA EMAILJS ---
        const EMAILJS_SERVICE_ID = 'service_tnzmvbr';
        const EMAILJS_TEMPLATE_ID = 'template_hrmjgls';
        const EMAILJS_PUBLIC_KEY = 'gIMXVw05GAQkq13QC';
        const EMAILJS_PRIVATE_KEY = '0ZGc4ouHAmKz50_AXvK27';

        try {
            await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                accessToken: EMAILJS_PRIVATE_KEY,
                template_params: {
                    to_name: name,
                    name: name,
                    to_email: email,
                    email: email,
                    user_email: email,
                    reply_to: 'muniramachandiran@gmail.com',
                    otp: emailOtp,
                    OTP: emailOtp,
                    email_otp: emailOtp,
                    code: emailOtp,
                    message: `Your Email verification OTP is: ${emailOtp}. It is valid for 10 minutes.`,
                    msg: `Your Email verification OTP is: ${emailOtp}. It is valid for 10 minutes.`
                }
            });
            console.log(`[EMAIL] OTP ${emailOtp} successfully sent via EmailJS to ${email}`);
        } catch (emailErr) {
            console.error('[EMAIL ERROR]:', emailErr.response?.data || emailErr.message);
        }

        res.status(201).json({
            success: true,
            message: 'Registration initiated. OTPs sent to your mobile and email.',
            userId: user.id,
            emailOtp, // Temporarily returned for testing
            mobileOtp // Temporarily returned for testing
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ success: false, message: 'Server error during signup.' });
    }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const { userId, emailOtp, mobileOtp } = req.body;

        if (!userId || !emailOtp || !mobileOtp) {
            return res.status(400).json({ success: false, message: 'All inputs are required.' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        if (user.isEmailVerified && user.isMobileVerified) {
            return res.status(400).json({ success: false, message: 'User already verified.' });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: 'OTPs have expired. Please sign up again.' });
        }

        if (user.emailOtp !== emailOtp) {
            return res.status(400).json({ success: false, message: 'Invalid Email OTP.' });
        }

        if (user.mobileOtp !== mobileOtp) {
            return res.status(400).json({ success: false, message: 'Invalid Mobile OTP.' });
        }

        // Verification successful
        user.isEmailVerified = true;
        user.isMobileVerified = true;
        user.emailOtp = null;
        user.mobileOtp = null;
        await user.save();

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({
            success: true,
            message: 'Verification successful. You are now logged in.',
            token,
            user: { id: user.id, name: user.name, email: user.email, profileImage: user.profileImage, role: user.role },
        });

    } catch (err) {
        console.error('Verification error:', err);
        res.status(500).json({ success: false, message: 'Server error during verification.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Email and password are required.' });

        const user = await User.findOne({ where: { email } });
        if (!user || !user.isActive)
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        if (!user.isEmailVerified || !user.isMobileVerified) {
            return res.status(403).json({ success: false, message: 'Please verify your email and mobile number before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({
            success: true,
            message: 'Login successful.',
            token,
            user: { id: user.id, name: user.name, email: user.email, profileImage: user.profileImage, role: user.role },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

// GET /api/auth/me  (protected)
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, async (req, res) => {
    const { id, name, email, profileImage, role } = req.user;
    res.json({ success: true, user: { id, name, email, profileImage, role } });
});

module.exports = router;
