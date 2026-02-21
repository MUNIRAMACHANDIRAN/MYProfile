import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';

const LoginPage = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const redirectMessage = location.state?.message || '';
    const redirectTo = location.state?.from?.pathname || '/dashboard';

    useEffect(() => { if (user) navigate('/dashboard', { replace: true }); }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            await login(form.email, form.password);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative">
            <ParticleBackground />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="w-full max-w-md z-10">
                <div className="glass-card p-8 neon-border">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-neon-blue/50 bg-neon-blue/10 flex items-center justify-center glow-blue">
                            <Lock className="text-neon-blue" size={22} />
                        </div>
                        <h1 className="text-2xl font-black orbitron gradient-text mb-1">WELCOME BACK</h1>
                        <p className="text-xs text-slate-500 tracking-widest">AUTHENTICATE TO CONTINUE</p>
                    </div>

                    {/* Redirect message */}
                    {redirectMessage && (
                        <div className="mb-5 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center gap-2">
                            <AlertCircle size={14} className="text-amber-400 shrink-0" />
                            <p className="text-xs text-amber-300">{redirectMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs text-slate-400 mb-1.5 tracking-wider">EMAIL ADDRESS</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email" required placeholder="you@example.com"
                                    className="input-neon pl-9"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs text-slate-400 mb-1.5 tracking-wider">PASSWORD</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPass ? 'text' : 'password'} required placeholder="••••••••"
                                    className="input-neon pl-9 pr-9"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-neon-blue transition-colors">
                                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-400 shrink-0" />
                                <p className="text-xs text-red-400">{error}</p>
                            </div>
                        )}

                        <button type="submit" disabled={loading}
                            className="w-full btn-solid py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        No account?{' '}
                        <Link to="/signup" className="text-neon-blue hover:text-neon-cyan transition-colors font-medium">
                            Create one here →
                        </Link>
                    </p>
                    <p className="text-center text-xs text-slate-600 mt-2">
                        <Link to="/" className="hover:text-slate-400 transition-colors">← Back to Home</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
