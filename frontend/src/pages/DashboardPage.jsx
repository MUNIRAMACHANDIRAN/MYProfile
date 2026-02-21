import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, Code, GraduationCap, Award, Briefcase, FolderOpen, Upload } from 'lucide-react';

const menuCards = [
    { label: 'About', path: '/about', icon: User, color: '#00d4ff', desc: 'Professional summary & journey' },
    { label: 'Projects', path: '/projects', icon: FolderOpen, color: '#00ffff', desc: '5 enterprise-grade projects' },
    { label: 'Skills', path: '/skills', icon: Code, color: '#7c3aed', desc: 'Java, Python, SQL & more' },
    { label: 'Education', path: '/education', icon: GraduationCap, color: '#10b981', desc: 'MBA, Cambridge Certification' },
    { label: 'Certifications', path: '/certifications', icon: Award, color: '#f59e0b', desc: 'Professional credentials' },
    { label: 'Experience', path: '/experience', icon: Briefcase, color: '#ec4899', desc: '5+ years of IT experience' },
    { label: 'Upload', path: '/certifications', icon: Upload, color: '#06b6d4', desc: 'Manage your documents' },
];

const TiltCard = ({ card, mousePos }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        setTilt({ x: dy * 12, y: dx * -12 });
    };

    return (
        <Link to={card.path}>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card p-6 cursor-pointer group"
                style={{
                    transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    borderColor: `${card.color}22`,
                    transition: 'border-color 0.3s',
                }}
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl shrink-0" style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                        <card.icon size={22} style={{ color: card.color }} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm orbitron mb-1 group-hover:text-neon-blue transition-colors" style={{ color: card.color }}>
                            {card.label.toUpperCase()}
                        </h3>
                        <p className="text-xs text-slate-400">{card.desc}</p>
                    </div>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 30px ${card.color}08` }} />
            </motion.div>
        </Link>
    );
};

const DashboardPage = () => {
    const { user } = useAuth();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouse);
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => { window.removeEventListener('mousemove', handleMouse); clearInterval(timer); };
    }, []);

    // Parallax offset based on cursor
    const px = (mousePos.x / window.innerWidth - 0.5) * 20;
    const py = (mousePos.y / window.innerHeight - 0.5) * 20;

    return (
        <div className="min-h-screen bg-gradient-dark pt-20 px-6 pb-12 relative overflow-hidden">
            {/* Dynamic background gradient that follows cursor */}
            <div className="fixed inset-0 pointer-events-none z-0"
                style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,212,255,0.04), transparent 70%)` }} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p className="text-xs text-slate-500 orbitron tracking-widest mb-1">WELCOME BACK</p>
                        <h1 className="text-3xl md:text-4xl font-black orbitron gradient-text">{user?.name || 'Developer'}</h1>
                        <p className="text-sm text-slate-400 mt-1">Full Stack Developer · IT Professional</p>
                    </div>
                    <div className="glass-card px-5 py-3 text-right">
                        <p className="text-neon-blue orbitron text-lg font-bold">{time.toLocaleTimeString()}</p>
                        <p className="text-xs text-slate-500">{time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Projects', value: '5+', color: '#00d4ff' },
                        { label: 'Years Exp.', value: '5+', color: '#00ffff' },
                        { label: 'Skills', value: '10+', color: '#7c3aed' },
                        { label: 'Certs', value: '3+', color: '#f59e0b' },
                    ].map((s, i) => (
                        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                            className="glass-card p-4 text-center" style={{ borderColor: `${s.color}20` }}>
                            <p className="text-3xl font-black orbitron" style={{ color: s.color }}>{s.value}</p>
                            <p className="text-xs text-slate-400 mt-1 tracking-wider">{s.label.toUpperCase()}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Section title */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-neon-blue" />
                    <h2 className="text-xs orbitron text-slate-400 tracking-widest">NAVIGATION HUB</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-neon-blue/20 to-transparent" />
                </div>

                {/* Menu Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuCards.map((card, i) => (
                        <motion.div key={card.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                            <TiltCard card={card} mousePos={mousePos} />
                        </motion.div>
                    ))}
                </div>

                {/* Profile Quick View */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 glass-card p-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-neon-blue/50 overflow-hidden bg-dark-800 flex items-center justify-center shrink-0">
                            {user?.profileImage
                                ? <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                                : <span className="font-black orbitron text-neon-blue text-lg">{user?.name?.[0] || 'M'}</span>}
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{user?.name}</h3>
                            <p className="text-xs text-slate-400">{user?.email}</p>
                            <p className="text-xs text-neon-cyan mt-1">Full Stack Developer · Desktop Support · Mobile Developer</p>
                        </div>
                        <Link to="/profile" className="ml-auto btn-neon text-xs py-1.5 px-4 hidden sm:block">EDIT PROFILE</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardPage;
