import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const educationData = [
    {
        degree: 'Master of Business Administration (MBA)',
        institution: 'Anna University Affiliated College',
        location: 'Tamil Nadu, India',
        year: '2018 – 2020',
        icon: GraduationCap,
        color: '#00d4ff',
        desc: 'Specialized in Business Management with focus on IT project management, organizational behavior, and strategic planning.',
        badge: 'POST GRADUATE',
    },
    {
        degree: 'Data Analytics Certification',
        institution: 'Cambridge University (Online)',
        location: 'United Kingdom',
        year: '2023',
        icon: Award,
        color: '#00ffff',
        desc: 'Completed certification covering statistical analysis, data visualization, business intelligence tools, and data-driven decision making.',
        badge: 'CERTIFICATION',
    },
    {
        degree: 'Diploma in Data Analytics',
        institution: 'Professional Institute',
        location: 'Tamil Nadu, India',
        year: '2022 – 2023',
        icon: BookOpen,
        color: '#7c3aed',
        desc: 'Covered Python for data analysis, SQL, Power BI, machine learning fundamentals, and real-world data project implementation.',
        badge: 'DIPLOMA',
    },
];

const EducationPage = () => (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <p className="text-xs orbitron text-neon-blue tracking-widest mb-3">/ ACADEMIC BACKGROUND</p>
                <h1 className="text-3xl md:text-5xl font-black orbitron gradient-text mb-4">EDUCATION</h1>
                <p className="text-slate-400 text-sm">Educational foundations and professional certifications</p>
            </motion.div>

            {/* Cards */}
            <div className="space-y-6">
                {educationData.map((edu, i) => (
                    <motion.div key={edu.degree} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="glass-card p-7 neon-border hover:scale-[1.01] transition-transform" style={{ borderColor: `${edu.color}22` }}>
                        <div className="flex flex-wrap items-start gap-5">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30` }}>
                                <edu.icon size={26} style={{ color: edu.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="text-xs px-2 py-0.5 rounded-full orbitron font-bold tracking-wider"
                                        style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}>
                                        {edu.badge}
                                    </span>
                                    <span className="text-xs text-slate-500 orbitron">{edu.year}</span>
                                </div>
                                <h2 className="text-lg font-bold text-white mb-1">{edu.degree}</h2>
                                <p className="text-sm font-medium mb-0.5" style={{ color: edu.color }}>{edu.institution}</p>
                                <p className="text-xs text-slate-500 mb-3">📍 {edu.location}</p>
                                <p className="text-sm text-slate-400 leading-relaxed">{edu.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certifications note */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 glass-card p-5 text-center neon-border">
                <p className="text-xs text-slate-400">
                    🎓 <span className="text-neon-blue font-medium">Committed to Continuous Learning</span> — Currently pursuing cloud certifications and advanced data engineering courses.
                </p>
            </motion.div>
        </div>
    </div>
);

export default EducationPage;
