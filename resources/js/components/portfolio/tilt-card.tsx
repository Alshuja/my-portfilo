import React, { useRef, useState } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
    glare?: boolean;
}

export function TiltCard({
    children,
    className = '',
    maxTilt = 10,
    glare = true,
    style,
    ...props
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (0.5 - y) * maxTilt * 2;
        const tiltY = (x - 0.5) * maxTilt * 2;

        setTransform(`perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
        setGlarePosition({ x: Math.round(x * 100), y: Math.round(y * 100) });
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`tilt-card ${className}`}
            style={{
                ...style,
                transform: transform || undefined,
                ['--glare-x' as string]: `${glarePosition.x}%`,
                ['--glare-y' as string]: `${glarePosition.y}%`,
            }}
            {...props}
        >
            {glare && <div className="card-glare" aria-hidden="true" />}
            {children}
        </div>
    );
}
