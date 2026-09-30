import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    baseAlpha: number;
}

interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
}

export function AmbientBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const ripples: Ripple[] = [];

        const handleClick = (e: MouseEvent) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                maxRadius: 180,
                alpha: 0.6,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        // Density scaled for smooth 60fps performance across desktop & mobile
        const particleCount = Math.min(
            Math.floor((width * height) / 18000),
            80,
        );
        const particles: Particle[] = [];

        const colors = [
            '215, 25, 22', // Tech Crimson (#D71916)
            '255, 106, 50', // Fire Orange (#FF6A32)
            '245, 158, 11', // Amber Gold (#F59E0B)
        ];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseAlpha: Math.random() * 0.4 + 0.35,
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.classList.contains('dark');
            const filamentOpacityFactor = isDark ? 0.22 : 0.14;
            const mouseFilamentFactor = isDark ? 0.35 : 0.22;

            // 1. Draw and update shockwave ripples
            for (let r = ripples.length - 1; r >= 0; r--) {
                const rip = ripples[r];
                rip.radius += 3.5;
                rip.alpha *= 0.95;

                ctx.beginPath();
                ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 106, 50, ${rip.alpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Gentle displacement of particles hit by ripple
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - rip.x;
                    const dy = p.y - rip.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (Math.abs(dist - rip.radius) < 25) {
                        const angle = Math.atan2(dy, dx);
                        p.x += Math.cos(angle) * 1.5;
                        p.y += Math.sin(angle) * 1.5;
                    }
                }

                if (rip.radius > rip.maxRadius || rip.alpha < 0.01) {
                    ripples.splice(r, 1);
                }
            }

            // 2. Interactive filaments to mouse pointer
            if (mouseX > 0 && mouseY > 0) {
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        // Subtle magnetic pull towards cursor
                        p.x += (dx / dist) * 0.35;
                        p.y += (dy / dist) * 0.35;

                        const alpha = mouseFilamentFactor * (1 - dist / 150);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.strokeStyle = `rgba(255, 106, 50, ${alpha})`;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
            }

            // 3. Constellation connections between particles
            const connectionDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha =
                            filamentOpacityFactor *
                            (1 - dist / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(215, 25, 22, ${alpha})`;
                        ctx.lineWidth = 0.65;
                        ctx.stroke();
                    }
                }
            }

            // 4. Update and draw glowing particle nodes
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off canvas edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Subtle glowing particle body
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;
                ctx.fill();

                // Core pinpoint light
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha * 0.8})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Ambient Flowing Neon / Velvet Mesh Orbs */}
            <div
                aria-hidden="true"
                className="animate-ambient-1 absolute -top-40 -right-40 size-[32rem] rounded-full bg-gradient-to-br from-[#D71916]/20 via-[#FF6A32]/10 to-transparent blur-3xl sm:size-[42rem]"
            />
            <div
                aria-hidden="true"
                className="animate-ambient-2 absolute top-1/2 -left-48 size-[28rem] rounded-full bg-gradient-to-tr from-[#FF6A32]/15 via-[#F59E0B]/12 to-transparent blur-3xl sm:size-[38rem]"
            />
            <div
                aria-hidden="true"
                className="animate-ambient-3 absolute right-1/4 -bottom-40 size-[30rem] rounded-full bg-gradient-to-t from-[#8E080B]/15 via-[#D71916]/10 to-transparent blur-3xl sm:size-[40rem]"
            />

            {/* Interactive Constellation Canvas */}
            <canvas
                id="particlesCanvas"
                ref={canvasRef}
                aria-hidden="true"
                className="size-full opacity-85 transition-opacity duration-700 dark:opacity-95"
            />
        </div>
    );
}
