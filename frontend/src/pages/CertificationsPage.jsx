import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Trash2, Eye, Download, X, Award, Building, Calendar, AlertCircle } from 'lucide-react';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CertificationsPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', organization: '', issueDate: '' });
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);

    const fetchCerts = async () => {
        try {
            const res = await API.get('/certificates');
            setCerts(res.data.certificates);
        } catch (e) {
            console.error(e);
        } finally { setLoading(false); }
    };
    useEffect(() => { fetchCerts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); setError(''); setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('organization', form.organization);
            if (form.issueDate) fd.append('issueDate', form.issueDate);
            if (file) fd.append('file', file);
            await API.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setForm({ name: '', organization: '', issueDate: '' });
            setFile(null);
            setShowForm(false);
            fetchCerts();
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed.');
        } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this certificate?')) return;
        try { await API.delete(`/certificates/${id}`); setCerts(certs.filter((c) => c.id !== id)); } catch (e) { console.error(e); }
    };

    // Default certs for display when no DB
    const defaultCerts = [
        { id: 'd1', name: 'Data Analytics Certification', organization: 'Cambridge University', issueDate: '2023-01-01', filePath: null, fileType: null },
        { id: 'd2', name: 'Diploma in Data Analytics', organization: 'Professional Institute', issueDate: '2023-06-01', filePath: null, fileType: null },
        { id: 'd3', name: 'Java Full Stack Development', organization: 'Udemy / NPTEL', issueDate: '2022-09-01', filePath: null, fileType: null },
    ];
    const displayCerts = certs.length > 0 ? certs : defaultCerts;

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p className="text-xs orbitron text-neon-blue tracking-widest mb-2">/ CREDENTIALS</p>
                        <h1 className="text-3xl md:text-4xl font-black orbitron gradient-text">CERTIFICATIONS</h1>
                    </div>
                    {isAdmin && (
                        <button onClick={() => setShowForm(!showForm)} className="btn-solid flex items-center gap-2 text-xs py-2 px-5">
                            <Plus size={14} /> ADD CERTIFICATE
                        </button>
                    )}
                </motion.div>

                {/* Upload Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-7 neon-border mb-8 overflow-hidden">
                            <h2 className="text-sm orbitron text-neon-blue font-bold tracking-wider mb-5">UPLOAD CERTIFICATE</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">CERTIFICATE NAME *</label>
                                    <input required className="input-neon" placeholder="e.g. AWS Solutions Architect" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">ISSUING ORGANIZATION *</label>
                                    <input required className="input-neon" placeholder="e.g. Amazon Web Services" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">ISSUE DATE</label>
                                    <input type="date" className="input-neon" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 tracking-wider">CERTIFICATE FILE (PDF/IMAGE)</label>
                                    <div onClick={() => fileRef.current?.click()} className="input-neon cursor-pointer flex items-center gap-2 text-slate-500 hover:text-neon-blue transition-colors">
                                        <Upload size={14} /> {file ? file.name : 'Click to upload...'}
                                    </div>
                                    <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                                {error && <div className="md:col-span-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400"><AlertCircle size={13} />{error}</div>}
                                <div className="md:col-span-2 flex gap-3">
                                    <button type="submit" disabled={submitting} className="btn-solid py-2 px-6 text-xs disabled:opacity-50">
                                        {submitting ? 'UPLOADING...' : 'UPLOAD'}
                                    </button>
                                    <button type="button" onClick={() => setShowForm(false)} className="btn-neon py-2 px-6 text-xs">CANCEL</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Certs Grid */}
                {loading ? (
                    <div className="text-center py-16"><div className="w-10 h-10 mx-auto border-4 border-neon-blue border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {displayCerts.map((cert, i) => (
                            <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                                onClick={() => cert.filePath && setPreview(cert.filePath)}
                                className={`glass-card p-6 neon-border hover:scale-[1.02] transition-transform group ${cert.filePath ? 'cursor-pointer' : ''}`}>
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                                    <Award size={22} className="text-amber-400" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1 leading-snug">{cert.name}</h3>
                                <p className="text-xs text-neon-blue flex items-center gap-1 mb-1"><Building size={11} />{cert.organization}</p>
                                {cert.issueDate && <p className="text-xs text-slate-500 flex items-center gap-1 mb-4"><Calendar size={11} />{new Date(cert.issueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</p>}

                                <div className="flex gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                                    {cert.filePath && (
                                        <>
                                            <button onClick={() => setPreview(cert.filePath)}
                                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-neon-blue/15 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/25 transition-all">
                                                <Eye size={11} /> Preview
                                            </button>
                                            <a href={cert.filePath} download
                                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 transition-all">
                                                <Download size={11} /> Download
                                            </a>
                                        </>
                                    )}
                                    {isAdmin && cert.id && typeof cert.id === 'number' && (
                                        <button onClick={() => handleDelete(cert.id)}
                                            className="ml-auto flex items-center gap-1 text-xs px-2 py-1.5 rounded-md text-red-400 hover:bg-red-500/10 transition-all">
                                            <Trash2 size={11} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {preview && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setPreview(null)}>
                        <div className="relative w-full max-w-4xl h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-slate-400 hover:text-white"><X size={24} /></button>
                            {preview.toLowerCase().endsWith('.pdf') ? (
                                <iframe src={preview} title="Certificate Preview" className="w-full h-full rounded-xl border border-neon-blue/30 bg-white" />
                            ) : (
                                <img src={preview} alt="certificate" className="max-w-full max-h-full object-contain rounded-xl border border-neon-blue/30" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CertificationsPage;
