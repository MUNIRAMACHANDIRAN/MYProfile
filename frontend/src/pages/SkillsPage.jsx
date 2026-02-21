import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    { name: 'Java', level: 88, color: '#f89820', category: 'Backend', icon: '☕' },
    { name: 'Python', level: 82, color: '#3572A5', category: 'Backend', icon: '🐍' },
    { name: 'HTML & CSS', level: 90, color: '#e34c26', category: 'Frontend', icon: '🌐' },
    { name: 'React JS', level: 75, color: '#61dafb', category: 'Frontend', icon: '⚛️' },
    { name: 'JavaScript', level: 78, color: '#f7df1e', category: 'Frontend', icon: '⚡' },
    { name: 'SQL', level: 85, color: '#00d4ff', category: 'Database', icon: '🗄️' },
    { name: 'Oracle Database', level: 80, color: '#ff3333', category: 'Database', icon: '🔴' },
    { name: 'Power BI', level: 70, color: '#f2c811', category: 'Analytics', icon: '📊' },
    { name: 'Node.js', level: 72, color: '#68a063', category: 'Backend', icon: '🟢' },
    { name: 'Spring Boot', level: 77, color: '#6DB33F', category: 'Backend', icon: '🍃' },
    { name: 'Git / GitHub', level: 83, color: '#f05032', category: 'DevOps', icon: '🔧' },
    { name: 'Data Analytics', level: 75, color: '#00ffff', category: 'Analytics', icon: '📈' },
];

const categories = ['All', 'Backend', 'Frontend', 'Database', 'Analytics', 'DevOps'];

const SkillBar = ({ skill, inView }) => {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-4 neon-border group hover:border-neon-blue/40 transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{skill.icon}</span>
                    <span className="font-semibold text-sm text-slate-200">{skill.name}</span>
                </div>
                <span className="text-xs font-bold orbitron" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(90deg, ${skill.color}bb, ${skill.color})` }}
                />
            </div>
            <span className="text-xs text-slate-500 mt-1 block">{skill.category}</span>
        </motion.div>
    );
};

const SkillsPage = () => {
    const [filter, setFilter] = useState('All');
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const filtered = filter === 'All' ? skillsData : skillsData.filter((s) => s.category === filter);

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <p className="text-xs orbitron text-neon-blue tracking-widest mb-3">/ TECHNICAL EXPERTISE</p>
                    <h1 className="text-3xl md:text-5xl font-black orbitron gradient-text mb-4">SKILLS</h1>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto">Technologies and tools I use to build powerful applications</p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs orbitron tracking-wider transition-all ${filter === cat ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50' : 'text-slate-400 border border-slate-700 hover:border-neon-blue/30 hover:text-neon-blue'
                                }`}>
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((skill, i) => (
                        <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                            <SkillBar skill={skill} inView={inView} />
                        </motion.div>
                    ))}
                </div>

                {/* Legend */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 glass-card p-5 text-center">
                    <p className="text-xs text-slate-500 mb-3 tracking-wider">PROFICIENCY LEGEND</p>
                    <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-400">
                        {[{ range: '90–100%', label: 'Expert' }, { range: '75–89%', label: 'Proficient' }, { range: '60–74%', label: 'Intermediate' }].map((l) => (
                            <span key={l.label} className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-neon-blue" /> {l.range} – <strong className="text-slate-300">{l.label}</strong>
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SkillsPage;
