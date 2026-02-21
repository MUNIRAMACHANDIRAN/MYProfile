import { motion } from 'framer-motion';
import { Target, Heart, Lightbulb, Rocket } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 } }) };

const AboutPage = () => (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
                <p className="text-xs orbitron text-neon-blue tracking-widest mb-3">/ ABOUT ME</p>
                <h1 className="text-3xl md:text-5xl font-black orbitron gradient-text mb-4">Muniyappan R</h1>
                <p className="text-neon-cyan text-sm tracking-wider">FULL STACK DEVELOPER · DESKTOP SUPPORT · MOBILE APP DEVELOPER</p>
            </motion.div>

            {/* Summary Card */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-8 neon-border mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-neon-blue/15 flex items-center justify-center">
                        <Target size={16} className="text-neon-blue" />
                    </div>
                    <h2 className="font-bold text-sm orbitron text-neon-blue tracking-wider">PROFESSIONAL SUMMARY</h2>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">
                    Experienced IT professional with strong expertise in <span className="text-neon-blue font-medium">software development</span>,
                    desktop support, and enterprise systems. Skilled in <span className="text-neon-cyan font-medium">Java, Python, Web Development</span>,
                    and database technologies (SQL, Oracle). Passionate about building scalable applications and solving real-world technical problems.
                    Currently expanding into <span className="text-purple-400 font-medium">Data Analytics, Power BI</span>, and mobile application development.
                </p>
            </motion.div>

            {/* Career Journey */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-8 neon-border mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                        <Rocket size={16} className="text-purple-400" />
                    </div>
                    <h2 className="font-bold text-sm orbitron text-purple-400 tracking-wider">CAREER JOURNEY</h2>
                </div>
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                        Started my professional journey as a <strong className="text-white">Junior Software Engineer (Java Developer)</strong> at Mueen Technology (Client), Bangalore,
                        where I developed enterprise-grade applications and REST APIs.
                        <br /><span className="text-xs text-slate-500">June 2019 – November 2019 (6 months)</span>
                    </p>
                    <p>
                        Progressed into a <strong className="text-white">Python Developer</strong> role at Relentless Systems, Chennai,
                        where I built automation tools and data processing pipelines.
                        <br /><span className="text-xs text-slate-500">November 2019 – June 2022 (2 years 7 months)</span>
                    </p>
                    <p>
                        Worked as a <strong className="text-white">Desktop Support Engineer</strong> at Arsus Technology, Coimbatore,
                        building strong expertise in enterprise hardware, OS management, and network troubleshooting.
                        <br /><span className="text-xs text-slate-500">April 2020 – October 2022 (2+ years)</span>
                    </p>
                    <p>
                        Currently working at <strong className="text-white">Comviva (Client), Bangalore</strong> as a <strong className="text-white">Desktop Engineer (L2)</strong>,
                        managing enterprise IT infrastructure, advanced troubleshooting, and end-user support in a high-velocity telecom environment.
                        <br /><span className="text-xs text-slate-500">October 2024 – Present</span>
                    </p>
                </div>
            </motion.div>

            {/* Interests & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-6 neon-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
                            <Heart size={16} className="text-neon-cyan" />
                        </div>
                        <h2 className="font-bold text-sm orbitron text-neon-cyan tracking-wider">TECHNICAL INTERESTS</h2>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                        {['Full Stack Web Development', 'Mobile App Development', 'Data Analytics & Power BI', 'Cloud Infrastructure (AWS/Azure)', 'Database Architecture', 'Enterprise Java (Spring Boot)', 'AI & Machine Learning'].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0" />{item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-6 neon-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                            <Lightbulb size={16} className="text-amber-400" />
                        </div>
                        <h2 className="font-bold text-sm orbitron text-amber-400 tracking-wider">GOALS</h2>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                        {[
                            'Build production-ready SaaS products',
                            'Achieve AWS/Azure Cloud Certification',
                            'Master Data Analytics & BI dashboards',
                            'Lead a software development team',
                            'Contribute to open-source projects',
                            'Build scalable mobile applications',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Contact Bar */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mt-6 glass-card p-5 neon-border text-center">
                <p className="text-xs text-slate-400 tracking-wider mb-2">GET IN TOUCH</p>
                <p className="text-neon-blue font-medium">muniramachandiran@gmail.com</p>
                <p className="text-slate-400 text-sm mt-1">📞 9952650870, 9962650870, 9092650870  <br />Krishnagiri – 635001, Tamil Nadu</p>
            </motion.div>
        </div>
    </div>
);

export default AboutPage;
