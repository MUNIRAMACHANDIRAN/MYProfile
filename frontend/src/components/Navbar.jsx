import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Moon, Sun, LogOut, User } from 'lucide-react';

const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Education', path: '/education' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Experience', path: '/experience' },
];

const Navbar = ({ darkMode, setDarkMode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-neon-blue/10 backdrop-blur-xl px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
                    <span className="text-neon-blue font-bold text-xl orbitron neon-text">MR</span>
                    <span className="text-xs text-slate-400 font-light hidden sm:block tracking-wider">PORTFOLIO</span>
                </Link>

                {/* Desktop Nav */}
                {user && (
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((l) => (
                            <Link
                                key={l.path}
                                to={l.path}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wider transition-all duration-200 ${location.pathname === l.path
                                        ? 'text-neon-blue bg-neon-blue/10 border border-neon-blue/30'
                                        : 'text-slate-400 hover:text-neon-blue hover:bg-white/5'
                                    }`}
                            >
                                {l.label.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Dark/Light toggle */}
                    <button
                        onClick={() => { setDarkMode(!darkMode); document.documentElement.classList.toggle('light'); }}
                        className="p-2 rounded-md text-slate-400 hover:text-neon-blue hover:bg-white/5 transition-all"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-slate-300 hover:text-neon-blue hover:bg-white/5 transition-all">
                                {user.profileImage
                                    ? <img src={user.profileImage} alt="avatar" className="w-6 h-6 rounded-full object-cover border border-neon-blue/40" />
                                    : <User size={14} />}
                                <span className="hidden sm:block font-medium">{user.name?.split(' ')[0]}</span>
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                                <LogOut size={14} /> <span className="hidden sm:block">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn-neon text-xs py-1.5 px-4">LOGIN</Link>
                            <Link to="/signup" className="btn-solid text-xs py-1.5 px-4">SIGN UP</Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    {user && (
                        <button className="md:hidden p-2 text-slate-400 hover:text-neon-blue" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {user && menuOpen && (
                <div className="md:hidden mt-2 pb-2 border-t border-white/5">
                    {navLinks.map((l) => (
                        <Link
                            key={l.path}
                            to={l.path}
                            onClick={() => setMenuOpen(false)}
                            className={`block px-4 py-2.5 text-sm font-medium tracking-wider transition-all ${location.pathname === l.path ? 'text-neon-blue' : 'text-slate-400 hover:text-neon-blue'
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
