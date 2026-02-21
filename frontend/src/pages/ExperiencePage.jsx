import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const experiences = [
    {
        role: 'Desktop Engineer (L2)',
        company: 'Comviva (Client)',
        location: 'Bangalore',
        period: 'Oct 2024 – Present',
        type: 'Full-time',
        color: '#7c3aed',
        current: true,
        desc: 'Managing enterprise IT infrastructure, advanced troubleshooting, and end-user support in a high-velocity telecom environment.',
        skills: ['Windows Server', 'Active Directory', 'VPN', 'Network Support', 'ITIL', 'ServiceNow'],
    },
    {
        role: 'Desktop Support Engineer',
        company: 'Arsus Technology',
        location: 'Coimbatore',
        period: 'Apr 2020 – Oct 2022 (2+ years)',
        type: 'Full-time',
        color: '#10b981',
        current: false,
        desc: 'Built strong expertise in enterprise hardware, OS management, and network troubleshooting. Managed hardware installation, OS deployment, software configuration, and user support.',
        skills: ['Hardware Support', 'OS Deployment', 'Networking', 'Windows', 'Troubleshooting'],
    },
    {
        role: 'Python Developer',
        company: 'Relentless Systems',
        location: 'Chennai',
        period: 'Nov 2019 – Jun 2022 (2 years 7 months)',
        type: 'Full-time',
        color: '#3572A5',
        current: false,
        desc: 'Built automation tools, data processing pipelines, and web scrapers using Python. Developed Flask-based APIs and contributed to data analytics dashboards using Power BI.',
        skills: ['Python', 'Flask', 'Django', 'Power BI', 'SQL', 'Automation'],
    },
    {
        role: 'Junior Software Engineer (Java Developer)',
        company: 'Mueen Technology (Client)',
        location: 'Bangalore',
        period: 'Jun 2019 – Nov 2019 (6 months)',
        type: 'Full-time',
        color: '#00d4ff',
        current: false,
        desc: 'Developed enterprise-grade Java applications and REST APIs. First professional role where I started my career journey in software development.',
        skills: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Oracle DB'],
    },
];

const ExperiencePage = () => (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <p className="text-xs orbitron text-neon-blue tracking-widest mb-3">/ WORK HISTORY</p>
                <h1 className="text-3xl md:text-5xl font-black orbitron gradient-text mb-4">EXPERIENCE</h1>
                <p className="text-slate-400 text-sm">5+ years of professional IT experience across multiple domains</p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-purple-500 to-transparent" />

                {experiences.map((exp, i) => (
                    <motion.div key={exp.company + exp.role}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className={`relative flex gap-6 md:gap-0 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                        {/* Timeline dot */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-dark-900 z-10"
                            style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />

                        {/* Card */}
                        <div className={`ml-14 md:ml-0 w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                            <div className="glass-card p-6 neon-border hover:scale-[1.01] transition-transform" style={{ borderColor: `${exp.color}25` }}>
                                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            {exp.current && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 orbitron">CURRENT</span>}
                                        </div>
                                        <h3 className="font-bold text-white text-base">{exp.role}</h3>
                                        <p className="text-sm font-medium" style={{ color: exp.color }}>{exp.company}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                                        <Briefcase size={18} style={{ color: exp.color }} />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                                    <span className="flex items-center gap-1"><Calendar size={11} />{exp.period}</span>
                                </div>

                                <p className="text-sm text-slate-400 leading-relaxed mb-4">{exp.desc}</p>

                                <div className="flex flex-wrap gap-1.5">
                                    {exp.skills.map((sk) => (
                                        <span key={sk} className="text-xs px-2 py-0.5 rounded-md tracking-wide"
                                            style={{ background: `${exp.color}12`, color: exp.color, border: `1px solid ${exp.color}25` }}>
                                            {sk}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

export default ExperiencePage;
