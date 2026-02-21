import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Code2, Eye } from 'lucide-react';

const staticProjects = [
    {
        id: 1,
        name: 'Land Management – VAO Admin Portal',
        description: 'A comprehensive land record management system built for Village Administrative Officers (VAO) to manage patta, chitta, and adangal records digitally. Features role-based access, document generation, and full audit trail for all property transactions.',
        githubLink: 'https://github.com/muniyappan',
        techStack: 'Java, Spring Boot, MySQL, HTML, CSS, JavaScript',
        icon: '🏛️',
        color: '#00d4ff',
    },
    {
        id: 2,
        name: 'Help Desk Ticketing Management',
        description: 'A full-featured IT help desk system that handles ticket creation, assignment, escalation, and resolution workflows. Includes SLA tracking, email notifications, priority queues, and a real-time manager dashboard.',
        githubLink: 'https://github.com/muniyappan',
        techStack: 'Java, SQL Server, Bootstrap, REST APIs',
        icon: '🎫',
        color: '#00ffff',
    },
    {
        id: 3,
        name: 'Resume Maker (ATS Based)',
        description: 'An intelligent resume builder optimized for Applicant Tracking Systems. Users create, preview, and download professional resumes with keyword optimization suggestions to pass automated HR screening systems.',
        githubLink: 'https://github.com/muniyappan',
        techStack: 'React JS, Node.js, HTML, CSS, JavaScript',
        icon: '📄',
        color: '#7c3aed',
    },
    {
        id: 4,
        name: 'TASMAC Shop Account Management',
        description: 'Accounting and inventory management for TASMAC retail outlets. Manages daily sales, stock reconciliation, employee attendance, and generates GST-compliant financial reports.',
        githubLink: 'https://github.com/muniyappan',
        techStack: 'Python, Django, MySQL, Bootstrap',
        icon: '🏪',
        color: '#f59e0b',
    },
    {
        id: 5,
        name: 'VAO Adangal System (Account I & II)',
        description: 'Digital record-keeping platform for VAO Adangal covering Account-I (land use) and Account-II (water use). Enables online entry, verification, and generation of official government reports.',
        githubLink: 'https://github.com/muniyappan',
        techStack: 'Java, Oracle DB, JSP, Servlets',
        icon: '📋',
        color: '#ec4899',
    },
];

const ProjectModal = ({ project, onClose }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-md"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card border max-w-lg w-full p-8 relative" style={{ borderColor: `${project.color}40` }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                <X size={18} />
            </button>
            <div className="text-4xl mb-4">{project.icon}</div>
            <h2 className="text-xl font-black orbitron mb-2" style={{ color: project.color }}>{project.name}</h2>
            <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack?.split(', ').map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>{t}</span>
                ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.description}</p>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-neon py-2 px-5 text-xs">
                <Github size={14} /> VIEW ON GITHUB
            </a>
        </motion.div>
    </motion.div>
);

const ProjectsPage = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <p className="text-xs orbitron text-neon-blue tracking-widest mb-3">/ MY WORK</p>
                    <h1 className="text-3xl md:text-5xl font-black orbitron gradient-text mb-4">PROJECTS</h1>
                    <p className="text-slate-400 text-sm">Enterprise-grade applications built with real-world impact</p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {staticProjects.map((proj, i) => (
                        <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <div className="glass-card neon-border hover:scale-[1.02] transition-all duration-300 group h-full cursor-pointer overflow-hidden"
                                style={{ borderColor: `${proj.color}20` }}
                                onClick={() => setSelected(proj)}>
                                {/* Top accent */}
                                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }} />
                                <div className="p-6">
                                    <div className="text-4xl mb-3">{proj.icon}</div>
                                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-neon-blue transition-colors leading-snug">{proj.name}</h3>
                                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{proj.description}</p>

                                    {/* Tech stack chips */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {proj.techStack?.split(', ').slice(0, 4).map((t) => (
                                            <span key={t} className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${proj.color}10`, color: proj.color, border: `1px solid ${proj.color}25` }}>{t}</span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-auto">
                                        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all"
                                            style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}>
                                            <Eye size={12} /> Details
                                        </button>
                                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                                            <Github size={12} /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsPage;
