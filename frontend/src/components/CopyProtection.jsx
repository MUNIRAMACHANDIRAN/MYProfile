import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * CopyProtection — disables right-click, text selection, and keyboard shortcuts
 * for non-admin users to protect portfolio content from being copied.
 */
const CopyProtection = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        if (isAdmin) return; // Admin has full access

        // Disable right-click context menu
        const blockContextMenu = (e) => {
            e.preventDefault();
            return false;
        };

        // Disable common keyboard copy shortcuts
        const blockKeyboard = (e) => {
            const blocked = (
                // Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U (view source), Ctrl+P (print)
                (e.ctrlKey && ['c', 'a', 's', 'u', 'p', 'x'].includes(e.key.toLowerCase())) ||
                // F12 DevTools
                e.key === 'F12' ||
                // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
                (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
            );
            if (blocked) {
                e.preventDefault();
                return false;
            }
        };

        // Disable drag (image drag-to-copy)
        const blockDrag = (e) => e.preventDefault();

        // Inject CSS to disable text selection
        const style = document.createElement('style');
        style.id = 'copy-protection-style';
        style.innerHTML = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);

        document.addEventListener('contextmenu', blockContextMenu);
        document.addEventListener('keydown', blockKeyboard);
        document.addEventListener('dragstart', blockDrag);

        return () => {
            document.removeEventListener('contextmenu', blockContextMenu);
            document.removeEventListener('keydown', blockKeyboard);
            document.removeEventListener('dragstart', blockDrag);
            const existing = document.getElementById('copy-protection-style');
            if (existing) existing.remove();
        };
    }, [isAdmin]);

    return null;
};

export default CopyProtection;
