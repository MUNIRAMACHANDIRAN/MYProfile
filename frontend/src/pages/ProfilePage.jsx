import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.profileImage || null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const fileRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
    };

    const handleSave = async (e) => {
        e.preventDefault(); setError(''); setSuccess(''); setLoading(true);
        try {
            const fd = new FormData();
            fd.append('name', name);
            if (image) fd.append('profileImage', image);
            const res = await API.put('/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            updateUser(res.data.user);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
            <div className="max-w-xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 neon-border">
                    <h1 className="text-xl font-black orbitron gradient-text mb-8 text-center">EDIT PROFILE</h1>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-2 border-neon-blue/50 overflow-hidden bg-dark-800 flex items-center justify-center glow-blue">
                                {preview
                                    ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                                    : <span className="text-4xl font-black orbitron text-neon-blue">{user?.name?.[0] || 'M'}</span>}
                            </div>
                            <button onClick={() => fileRef.current?.click()}
                                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-neon-blue text-dark-900 flex items-center justify-center hover:bg-neon-cyan transition-colors shadow-lg">
                                <Camera size={14} />
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </div>
                        <p className="text-xs text-slate-500 mt-3">Click camera icon to change photo</p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">FULL NAME</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input className="input-neon pl-9" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">EMAIL (READ-ONLY)</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input className="input-neon pl-9 opacity-50 cursor-not-allowed" value={user?.email || ''} readOnly />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="p-3 rounded-lg bg-neon-blue/5 border border-neon-blue/15">
                            <p className="text-xs text-slate-400">ROLE: <span className="text-neon-blue font-medium">{user?.role?.toUpperCase()}</span></p>
                        </div>

                        {/* Feedback */}
                        {error && <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-center gap-2 text-xs text-red-400"><AlertCircle size={13} />{error}</div>}
                        {success && <div className="p-3 rounded-lg border border-green-500/30 bg-green-500/10 flex items-center gap-2 text-xs text-green-400"><CheckCircle size={13} />{success}</div>}

                        <button type="submit" disabled={loading} className="w-full btn-solid py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                            <Save size={14} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
