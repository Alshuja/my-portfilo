/**
 * Lightweight, zero-dependency HTML5 Canvas Confetti Burst Engine
 * Emits brand confetti (#D71916, #FF6A32, #F59E0B, #10B981, #FFF)
 */

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    vRotation: number;
    opacity: number;
}

export function fireConfetti(originX?: number, originY?: number): void {
    if (typeof window === 'undefined' || typeof document === 'undefined')
        return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        canvas.remove();
        return;
    }

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const startX = originX !== undefined ? originX : width / 2;
    const startY = originY !== undefined ? originY : height / 2;

    const colors = [
        '#D71916',
        '#FF6A32',
        '#F59E0B',
        '#10B981',
        '#3B82F6',
        '#FFFFFF',
    ];
    const particles: Particle[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 6;
        particles.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 6,
            rotation: Math.random() * 360,
            vRotation: (Math.random() - 0.5) * 12,
            opacity: 1,
        });
    }

    const context = ctx;
    let frameId: number;
    const startTime = performance.now();
    const duration = 2500;

    function render(time: number) {
        if (!context) return;

        const elapsed = time - startTime;
        if (elapsed > duration) {
            cancelAnimationFrame(frameId);
            canvas.remove();
            return;
        }

        context.clearRect(0, 0, width, height);

        const fadeRatio =
            elapsed > duration * 0.7
                ? 1 - (elapsed - duration * 0.7) / (duration * 0.3)
                : 1;

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98; // air resistance
            p.rotation += p.vRotation;

            context.save();
            context.translate(p.x, p.y);
            context.rotate((p.rotation * Math.PI) / 180);
            context.globalAlpha = Math.max(0, p.opacity * fadeRatio);
            context.fillStyle = p.color;
            context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            context.restore();
        }

        frameId = requestAnimationFrame(render);
    }

    frameId = requestAnimationFrame(render);
}
