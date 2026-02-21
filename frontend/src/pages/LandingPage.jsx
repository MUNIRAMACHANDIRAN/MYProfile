import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';

// 3D Animated sphere
const AnimatedSphere = () => {
    const meshRef = useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
        }
    });
    return (
        <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.8}>
            <MeshDistortMaterial color="#00d4ff" attach="material" distort={0.4} speed={2} roughness={0.1} metalness={0.8} wireframe={false} opacity={0.35} transparent />
        </Sphere>
    );
};

const LandingPage = () => {
    const { user } = useAuth();

    const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' } }) };

    return (
        <div className="min-h-screen bg-gradient-dark relative overflow-hidden flex flex-col">
            <ParticleBackground />

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 4] }}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={2} />
                    <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={1} />
                    <AnimatedSphere />
                </Canvas>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
                {/* Profile Image Placeholder */}
                <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
                    <div className="relative w-36 h-36 mx-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-spin-slow opacity-70" />
                        <div className="absolute inset-1 rounded-full bg-dark-900 flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center">
                                <span className="text-5xl font-black orbitron gradient-text">MR</span>
                            </div>
                        </div>
                        {/* Glow ring */}
                        <div className="absolute -inset-2 rounded-full border border-neon-blue/20 animate-ping opacity-30" />
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-4xl md:text-6xl font-black orbitron mb-3">
                    <span className="gradient-text">Muniyappan R</span>
                </motion.h1>

                {/* Role */}
                <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-lg md:text-xl text-neon-cyan mb-2 tracking-wider font-medium">
                    Full Stack Developer
                </motion.p>
                <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="text-sm text-slate-400 tracking-widest mb-8">
                    DESKTOP SUPPORT ENGINEER &nbsp;|&nbsp; MOBILE APP DEVELOPER
                </motion.p>

                {/* Summary */}
                <motion.p custom={4} initial="hidden" animate="visible" variants={fadeUp}
                    className="max-w-2xl text-slate-400 text-sm md:text-base leading-relaxed mb-10">
                    Experienced IT professional with expertise in <span className="text-neon-blue font-medium">Java, Python, Web Development</span>, and database technologies.
                    Passionate about building scalable applications and solving real-world technical problems.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
                    {user ? (
                        <Link to="/dashboard" className="btn-solid px-8 py-3 text-sm">ENTER DASHBOARD</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-neon px-8 py-3 text-sm">LOGIN</Link>
                            <Link to="/signup" className="btn-solid px-8 py-3 text-sm">CREATE ACCOUNT</Link>
                        </>
                    )}
                </motion.div>

                {/* 3 Feature Cards */}
                <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
                    {[
                        { icon: '⚡', title: 'Full Stack', desc: 'Java · Python · React' },
                        { icon: '🛡️', title: 'Enterprise IT', desc: 'Desktop Support · ERP' },
                        { icon: '📊', title: 'Data Analytics', desc: 'Power BI · SQL · Oracle' },
                    ].map((card) => (
                        <div key={card.title} className="glass-card tilt-card neon-border p-5 text-center">
                            <div className="text-3xl mb-2">{card.icon}</div>
                            <h3 className="text-sm font-bold text-neon-blue orbitron mb-1">{card.title}</h3>
                            <p className="text-xs text-slate-400">{card.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Lock notice for guests */}
                {!user && (
                    <motion.p custom={7} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 text-xs text-slate-600 max-w-md">
                        🔒 Full portfolio — projects, skills, experience, certifications — available after login.
                    </motion.p>
                )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
                <div className="w-px h-8 bg-gradient-to-b from-neon-blue to-transparent" />
                <span className="text-xs text-slate-600 tracking-widest">SCROLL</span>
            </div>
        </div>
    );
};

export default LandingPage;
