import { useEffect, useRef, useState } from 'react';

export function ElasticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // Disable on touch-only devices
        if (
            typeof window === 'undefined' ||
            window.matchMedia('(pointer: coarse)').matches
        ) {
            return;
        }

        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);

            // Check if hovering an interactive element
            const target = e.target as HTMLElement | null;
            if (target) {
                const isInteractive = target.closest(
                    'a, button, input, textarea, select, [role="button"], .tilt-card, .avatar-frame, .interactive',
                );
                setIsHovered(!!isInteractive);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);

        // Smooth 60fps spring lerp render loop
        const render = () => {
            const ease = isHovered ? 0.2 : 0.16;
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;

            cursorX += diffX * ease;
            cursorY += diffY * ease;

            // Velocity stretch calculation
            const speed = Math.sqrt(diffX * diffX + diffY * diffY);
            const scale = Math.min(1 + speed * 0.0035, 1.4);
            const angle = (Math.atan2(diffY, diffX) * 180) / Math.PI;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(${angle}deg) scale(${scale}, ${2 - scale})`;
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }

            rafId = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove, {
            passive: true,
        });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener(
            'mouseleave',
            handleMouseLeave,
        );

        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener(
                'mouseleave',
                handleMouseLeave,
            );
            cancelAnimationFrame(rafId);
        };
    }, [isVisible, isHovered]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden print:hidden">
            {/* Outer Elastic Jelly Ring */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 -mt-5 -ml-5 rounded-full border transition-all duration-150 ${
                    isHovered
                        ? 'size-12 border-primary/80 bg-primary/10 shadow-[0_0_20px_rgba(215,25,22,0.4)]'
                        : isClicking
                          ? 'size-7 scale-90 border-primary bg-primary/20'
                          : 'size-10 border-foreground/30 bg-primary/5'
                }`}
            />

            {/* Inner Precision Point */}
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 -mt-1 -ml-1 rounded-full transition-transform duration-75 ${
                    isClicking
                        ? '-mt-1.5 -ml-1.5 size-2.5 bg-primary'
                        : 'size-2 bg-primary'
                }`}
            />
        </div>
    );
}
