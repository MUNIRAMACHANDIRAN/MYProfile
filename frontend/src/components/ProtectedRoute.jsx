import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                    <p className="neon-text orbitron text-sm tracking-widest">INITIALIZING...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate to="/login" state={{ from: location, message: 'Please login or create an account to view full portfolio details.' }} replace />
        );
    }

    return children;
};

export default ProtectedRoute;
