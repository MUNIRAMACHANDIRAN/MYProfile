import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        let animId;

        const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };

        const animate = () => {
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + 'px';
                dotRef.current.style.top = mouseY + 'px';
            }
            // Ring follows with lag
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px';
                ringRef.current.style.top = ringY + 'px';
            }
            animId = requestAnimationFrame(animate);
        };
        animate();

        // Hover effects on interactive elements
        const onHoverIn = () => {
            if (ringRef.current) { ringRef.current.style.width = '50px'; ringRef.current.style.height = '50px'; ringRef.current.style.borderColor = 'rgba(0,255,255,0.8)'; }
            if (dotRef.current) { dotRef.current.style.transform = 'translate(-50%,-50%) scale(2)'; }
        };
        const onHoverOut = () => {
            if (ringRef.current) { ringRef.current.style.width = '30px'; ringRef.current.style.height = '30px'; ringRef.current.style.borderColor = 'rgba(0,212,255,0.5)'; }
            if (dotRef.current) { dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.querySelectorAll('a,button,[role="button"],input').forEach((el) => {
            el.addEventListener('mouseenter', onHoverIn);
            el.addEventListener('mouseleave', onHoverOut);
        });

        return () => {
            cancelAnimationFrame(animId);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
        </>
    );
};

export default CustomCursor;
