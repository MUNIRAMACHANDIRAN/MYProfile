import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Image, AlertCircle, CheckCircle, XCircle, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';

const SignupPage = () => {
    const { signup, verifyOTP, user } = useAuth();
    const navigate = useNavigate();

    // Step 1: Registration Form
    const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' });
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showPass, setShowPass] = useState(false);

    // Step 2: OTP Verification
    const [step, setStep] = useState(1); // 1 = form, 2 = verify
    const [userId, setUserId] = useState(null);
    const [otps, setOtps] = useState({ emailOtp: '', mobileOtp: '' });
    const [receivedOtps, setReceivedOtps] = useState({ email: '', mobile: '' }); // For temporary display
    const [showTempOtps, setShowTempOtps] = useState(false); // Toggle for temporary display

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (user) navigate('/dashboard', { replace: true }); }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) { setProfileImg(file); setPreview(URL.createObjectURL(file)); }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); setError(''); setLoading(true);
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('email', form.email);
        fd.append('mobile', form.mobile);
        fd.append('password', form.password);
        fd.append('confirmPassword', form.confirmPassword);
        if (profileImg) fd.append('profileImage', profileImg);

        try {
            const res = await signup(fd);
            setUserId(res.userId);
            setReceivedOtps({ email: res.emailOtp, mobile: res.mobileOtp });
            setSuccess('Registration initiated! OTPs sent to email and mobile.');
            setTimeout(() => {
                setSuccess('');
                setStep(2); // Move to OTP step
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally { setLoading(false); }
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            await verifyOTP(userId, otps.emailOtp, otps.mobileOtp);
            setSuccess('Verification successful! Logging you in...');
            setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please check your OTPs.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <ParticleBackground />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="w-full max-w-md z-10">
                <div className="glass-card p-8 neon-border relative overflow-hidden">

                    {/* Header */}
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-black orbitron gradient-text mb-1">
                            {step === 1 ? 'CREATE ACCOUNT' : 'VERIFY OTP'}
                        </h1>
                        <p className="text-xs text-slate-500 tracking-widest">
                            {step === 1 ? 'JOIN THE PORTFOLIO VAULT' : 'ENTER CODES TO CONTINUE'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form key="step1" onSubmit={handleRegisterSubmit} className="space-y-4"
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>

                                {/* Profile Image Upload */}
                                <div className="flex flex-col items-center mb-2">
                                    <label className="cursor-pointer group relative">
                                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-neon-blue/40 group-hover:border-neon-blue/80 transition-all flex items-center justify-center overflow-hidden bg-dark-800">
                                            {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                                : <Image size={24} className="text-slate-600 group-hover:text-neon-blue transition-colors" />}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                        <span className="text-xs text-slate-500 mt-1 block text-center group-hover:text-neon-blue transition-colors">Upload Photo</span>
                                    </label>
                                </div>

                                {/* Name */}
                                <div className="relative">
                                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="text" required placeholder="Full Name" className="input-neon pl-9" value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="email" required placeholder="Email Address" className="input-neon pl-9" value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>

                                {/* Mobile */}
                                <div className="relative">
                                    <Smartphone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="tel" required placeholder="Mobile Number" className="input-neon pl-9" value={form.mobile}
                                        onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type={showPass ? 'text' : 'password'} required placeholder="Password (min 6 characters)" className="input-neon pl-9 pr-9"
                                        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-neon-blue">
                                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="password" required placeholder="Confirm Password" className="input-neon pl-9"
                                        value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                                </div>

                                {/* Feedback */}
                                {error && step === 1 && <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-center gap-2"><AlertCircle size={14} className="text-red-400 shrink-0" /><p className="text-xs text-red-400">{error}</p></div>}
                                {success && step === 1 && <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/10 flex items-center gap-2"><CheckCircle size={14} className="text-green-400 shrink-0" /><p className="text-xs text-green-400">{success}</p></div>}

                                <button type="submit" disabled={loading} className="w-full btn-solid py-3 text-sm disabled:opacity-50">
                                    {loading ? 'SENDING OTP...' : 'REGISTER'}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form key="step2" onSubmit={handleVerifySubmit} className="space-y-5"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

                                <p className="text-xs text-slate-400 text-center mb-4 leading-relaxed">
                                    We've sent a 6-digit OTP to your email <strong className="text-neon-cyan">{form.email}</strong> and mobile <strong className="text-neon-cyan">{form.mobile}</strong>.
                                </p>

                                {/* TEMPORARY OTP DISPLAY */}
                                <div className="p-3 rounded-lg border border-neon-blue/30 bg-neon-blue/10 mb-4 relative group">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Temporary OTP (Dev Mode)</p>
                                        <button
                                            type="button"
                                            onClick={() => setShowTempOtps(!showTempOtps)}
                                            className="text-neon-blue hover:text-neon-cyan transition-colors"
                                            title={showTempOtps ? "Hide OTPs" : "Show OTPs"}
                                        >
                                            {showTempOtps ? <EyeOff size={12} /> : <Eye size={12} />}
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-neon-blue tracking-widest text-center">
                                        {showTempOtps ? (
                                            `Email: ${receivedOtps.email} | Mobile: ${receivedOtps.mobile}`
                                        ) : (
                                            "•••••• | ••••••"
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider font-semibold flex justify-between">
                                        EMAIL OTP
                                        {otps.emailOtp.length === 6 && (
                                            otps.emailOtp === receivedOtps.email
                                                ? <span className="text-green-400 flex items-center gap-1 text-[10px]"><CheckCircle size={10} /> CORRECT</span>
                                                : <span className="text-red-400 flex items-center gap-1 text-[10px]"><XCircle size={10} /> INVALID</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" required maxLength="6" placeholder="------"
                                            className={`input-neon pl-9 text-center tracking-widest font-mono text-lg ${otps.emailOtp.length === 6 && otps.emailOtp !== receivedOtps.email ? 'border-red-500/50 bg-red-500/5' : ''} ${otps.emailOtp.length === 6 && otps.emailOtp === receivedOtps.email ? 'border-green-500/50 bg-green-500/5' : ''}`}
                                            value={otps.emailOtp} onChange={(e) => setOtps({ ...otps, emailOtp: e.target.value.replace(/\D/g, '') })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider font-semibold flex justify-between">
                                        MOBILE OTP
                                        {otps.mobileOtp.length === 6 && (
                                            otps.mobileOtp === receivedOtps.mobile
                                                ? <span className="text-green-400 flex items-center gap-1 text-[10px]"><CheckCircle size={10} /> CORRECT</span>
                                                : <span className="text-red-400 flex items-center gap-1 text-[10px]"><XCircle size={10} /> INVALID</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <Smartphone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" required maxLength="6" placeholder="------"
                                            className={`input-neon pl-9 text-center tracking-widest font-mono text-lg ${otps.mobileOtp.length === 6 && otps.mobileOtp !== receivedOtps.mobile ? 'border-red-500/50 bg-red-500/5' : ''} ${otps.mobileOtp.length === 6 && otps.mobileOtp === receivedOtps.mobile ? 'border-green-500/50 bg-green-500/5' : ''}`}
                                            value={otps.mobileOtp} onChange={(e) => setOtps({ ...otps, mobileOtp: e.target.value.replace(/\D/g, '') })} />
                                    </div>
                                </div>

                                {/* Feedback */}
                                {error && step === 2 && <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-center gap-2"><AlertCircle size={14} className="text-red-400 shrink-0" /><p className="text-xs text-red-400">{error}</p></div>}
                                {success && step === 2 && <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/10 flex items-center gap-2"><CheckCircle size={14} className="text-green-400 shrink-0" /><p className="text-xs text-green-400">{success}</p></div>}

                                <div className="pt-2 flex flex-col gap-3">
                                    <button type="submit" disabled={loading || otps.emailOtp.length !== 6 || otps.mobileOtp.length !== 6} className="w-full btn-solid py-3 text-sm disabled:opacity-50">
                                        {loading ? 'VERIFYING...' : 'VERIFY & LOGIN'}
                                    </button>
                                    <button type="button" onClick={() => { setStep(1); setUserId(null); setError(''); }} className="w-full btn-neon py-3 text-sm">
                                        ← BACK TO REGISTRATION
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {step === 1 && (
                        <div className="mt-5">
                            <p className="text-center text-xs text-slate-500">
                                Already registered?{' '}
                                <Link to="/login" className="text-neon-blue hover:text-neon-cyan font-medium transition-colors">Login →</Link>
                            </p>
                            <p className="text-center text-xs text-slate-600 mt-2">
                                <Link to="/" className="hover:text-slate-400 transition-colors">← Back to Home</Link>
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
