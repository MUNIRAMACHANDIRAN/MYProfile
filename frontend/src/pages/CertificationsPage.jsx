import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Trash2, Eye, Download, X, Award, Building, Calendar, AlertCircle } from 'lucide-react';
import api from '../utils/api'; // ✅ FIXED (was API)
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

    // ✅ Helper to convert relative path → full backend URL
    const getFileUrl = (path) => {
        if (!path) return null;
        return `${import.meta.env.VITE_API_URL}${path}`;
    };

    const fetchCerts = async () => {
        try {
            const res = await api.get('/certificates'); // ✅ FIXED
            setCerts(res.data.certificates);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCerts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('organization', form.organization);
            if (form.issueDate) fd.append('issueDate', form.issueDate);
            if (file) fd.append('file', file);

            await api.post('/certificates', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setForm({ name: '', organization: '', issueDate: '' });
            setFile(null);
            setShowForm(false);
            fetchCerts();

        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this certificate?')) return;
        try {
            await api.delete(`/certificates/${id}`);
            setCerts(certs.filter((c) => c.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const defaultCerts = [
        { id: 'd1', name: 'Data Analytics Certification', organization: 'Cambridge University', issueDate: '2023-01-01', filePath: null },
        { id: 'd2', name: 'Diploma in Data Analytics', organization: 'Professional Institute', issueDate: '2023-06-01', filePath: null },
        { id: 'd3', name: 'Java Full Stack Development', organization: 'Udemy / NPTEL', issueDate: '2022-09-01', filePath: null },
    ];

    const displayCerts = certs.length > 0 ? certs : defaultCerts;

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between mb-10">
                    <h1 className="text-3xl font-black">CERTIFICATIONS</h1>
                    {isAdmin && (
                        <button onClick={() => setShowForm(!showForm)} className="btn-solid">
                            <Plus size={14} /> ADD CERTIFICATE
                        </button>
                    )}
                </div>

                {/* UPLOAD FORM */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-8">
                        <input required placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input required placeholder="Organization"
                            value={form.organization}
                            onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        />
                        <input type="date"
                            value={form.issueDate}
                            onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                        />

                        <input
                            ref={fileRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        {error && <p className="text-red-500">{error}</p>}

                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                )}

                {/* CERTIFICATE GRID */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid gap-5">
                        {displayCerts.map((cert) => (
                            <div
                                key={cert.id}
                                className="glass-card p-6 cursor-pointer"
                                onClick={() => cert.filePath && setPreview(getFileUrl(cert.filePath))}
                            >
                                <Award />
                                <h3>{cert.name}</h3>
                                <p>{cert.organization}</p>

                                <div className="flex gap-2 mt-3">
                                    {cert.filePath && (
                                        <>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                setPreview(getFileUrl(cert.filePath));
                                            }}>
                                                <Eye /> Preview
                                            </button>

                                            <a
                                                href={getFileUrl(cert.filePath)}
                                                download
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Download /> Download
                                            </a>
                                        </>
                                    )}

                                    {isAdmin && cert.id && typeof cert.id === 'number' && (
                                        <button onClick={() => handleDelete(cert.id)}>
                                            <Trash2 />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PREVIEW MODAL */}
            <AnimatePresence>
                {preview && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center"
                        onClick={() => setPreview(null)}
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            {preview.toLowerCase().endsWith('.pdf') ? (
                                <iframe src={preview} className="w-[800px] h-[600px]" />
                            ) : (
                                <img src={preview} className="max-w-full max-h-full" />
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CertificationsPage;
