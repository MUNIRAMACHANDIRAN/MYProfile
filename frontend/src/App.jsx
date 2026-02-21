import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CopyProtection from './components/CopyProtection';

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Page transition wrapper
const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
        {children}
    </motion.div>
);

// Loading fallback
const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center">
            <div className="w-12 h-12 mx-auto border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4" />
            <p className="neon-text orbitron text-xs tracking-widest">LOADING...</p>
        </div>
    </div>
);

const AppInner = () => {
    const [darkMode, setDarkMode] = useState(true);
    const location = useLocation();

    return (
        <>
            <CustomCursor />
            <CopyProtection />
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Suspense fallback={<LoadingFallback />}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
                        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><DashboardPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/about" element={<ProtectedRoute><PageWrapper><AboutPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/skills" element={<ProtectedRoute><PageWrapper><SkillsPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/projects" element={<ProtectedRoute><PageWrapper><ProjectsPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/education" element={<ProtectedRoute><PageWrapper><EducationPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/certifications" element={<ProtectedRoute><PageWrapper><CertificationsPage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/experience" element={<ProtectedRoute><PageWrapper><ExperiencePage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfilePage /></PageWrapper></ProtectedRoute>} />

                        {/* 404 */}
                        <Route path="*" element={
                            <PageWrapper>
                                <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center text-center px-6">
                                    <h1 className="text-8xl font-black orbitron neon-text mb-4">404</h1>
                                    <p className="text-slate-400 mb-8">Page not found in the matrix.</p>
                                    <a href="/" className="btn-neon px-8 py-3 text-sm">RETURN HOME</a>
                                </div>
                            </PageWrapper>
                        } />
                    </Routes>
                </AnimatePresence>
            </Suspense>
        </>
    );
};

const App = () => (
    <AuthProvider>
        <AppInner />
    </AuthProvider>
);

export default App;
