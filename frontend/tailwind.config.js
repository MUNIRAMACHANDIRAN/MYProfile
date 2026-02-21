/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                neon: { blue: '#00d4ff', cyan: '#00ffff', purple: '#7c3aed' },
                dark: { 900: '#050b18', 800: '#0a1628', 700: '#0f2040', 600: '#1a3a5c' },
            },
            fontFamily: { inter: ['Inter', 'sans-serif'], orbitron: ['Orbitron', 'sans-serif'] },
            animation: {
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                glowPulse: { '0%,100%': { boxShadow: '0 0 20px #00d4ff55' }, '50%': { boxShadow: '0 0 40px #00d4ffaa, 0 0 80px #00d4ff44' } },
                float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
            },
            backdropBlur: { xs: '2px' },
        },
    },
    plugins: [],
};
