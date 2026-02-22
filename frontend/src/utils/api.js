import axios from 'axios';

const api = axios.create({
  baseURL: "https://portfolio-backend-q017.onrender.com"
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 auto-logout
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('portfolio_token');
            localStorage.removeItem('portfolio_user');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

export default API;
