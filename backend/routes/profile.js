const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// PUT update profile
router.put('/', authMiddleware, (req, res, next) => {
    req.uploadType = 'profile';
    next();
}, upload.single('profileImage'), async (req, res) => {
    try {
        const { name } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (req.file) updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
        await req.user.update(updateData);
        const { id, name: n, email, profileImage, role } = req.user;
        res.json({ success: true, message: 'Profile updated.', user: { id, name: n, email, profileImage, role } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update profile.' });
    }
});

module.exports = router;
