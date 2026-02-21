import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('portfolio_user')); } catch { return null; }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('portfolio_token');
        if (token) {
            API.get('/auth/me')
                .then((res) => { setUser(res.data.user); localStorage.setItem('portfolio_user', JSON.stringify(res.data.user)); })
                .catch(() => { localStorage.removeItem('portfolio_token'); localStorage.removeItem('portfolio_user'); setUser(null); })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('portfolio_token', res.data.token);
        localStorage.setItem('portfolio_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const signup = async (formData) => {
        const res = await API.post('/auth/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    };

    const verifyOTP = async (userId, emailOtp, mobileOtp) => {
        const res = await API.post('/auth/verify-otp', { userId, emailOtp, mobileOtp });
        localStorage.setItem('portfolio_token', res.data.token);
        localStorage.setItem('portfolio_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('portfolio_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, verifyOTP, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
