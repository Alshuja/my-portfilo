import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    Sparkles,
    FolderGit2,
    Cpu,
    FileText,
    Mail,
    Compass,
    Volume2,
    VolumeX,
    Sun,
    Moon,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { isSoundEnabled, toggleSound, playClickSound } from './sound-effects';

export function FloatingDock() {
    const { url } = usePage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [soundOn, setSoundOn] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [mouseX, setMouseX] = useState<number | null>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSoundOn(isSoundEnabled());
    }, []);

    const handleSoundToggle = () => {
        const next = toggleSound();
        setSoundOn(next);
    };

    const handleThemeToggle = () => {
        playClickSound(750, 0.03);
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const handleOpenRadialMenu = () => {
        playClickSound(900, 0.03);
        window.dispatchEvent(new CustomEvent('open-radial-menu', {
            detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        }));
    };

    const dockItems = [
        {
            title: 'الرئيسية',
            icon: Home,
            href: '/',
            isAction: false,
        },
        {
            title: 'المشاريع',
            icon: FolderGit2,
            href: '/projects',
            isAction: false,
        },
        {
            title: 'الخدمات',
            icon: Sparkles,
            href: '/services',
            isAction: false,
        },
        {
            title: 'المهارات و 3D Lab',
            icon: Cpu,
            href: '/skills',
            isAction: false,
        },
        {
            title: 'السيرة الذاتية (CV)',
            icon: FileText,
            href: '/cv',
            isAction: false,
        },
        {
            title: 'تواصل معي',
            icon: Mail,
            href: '/contact',
            isAction: false,
        },
        {
            title: 'القائمة الدائرية 3D',
            icon: Compass,
            action: handleOpenRadialMenu,
            isAction: true,
            color: 'text-amber-500',
        },
        {
            title: soundOn ? 'كتم المؤثرات' : 'تفعيل المؤثرات الميكانيكية',
            icon: soundOn ? Volume2 : VolumeX,
            action: handleSoundToggle,
            isAction: true,
            color: soundOn ? 'text-primary' : 'text-muted-foreground',
        },
        {
            title: resolvedAppearance === 'dark' ? 'الوضع الفاتح' : 'الوضع الليلي',
            icon: resolvedAppearance === 'dark' ? Sun : Moon,
            action: handleThemeToggle,
            isAction: true,
            color: 'text-orange-400',
        },
    ];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseX(e.clientX);
    };

    const handleMouseLeave = () => {
        setMouseX(null);
        setHoveredIdx(null);
    };

    // Calculate 3D magnification scale based on mouse distance
    const getScale = (itemIndex: number) => {
        if (mouseX === null || !dockRef.current) return 1;
        const rect = dockRef.current.getBoundingClientRect();
        const itemWidth = rect.width / dockItems.length;
        const itemCenter = rect.left + itemIndex * itemWidth + itemWidth / 2;
        const distance = Math.abs(mouseX - itemCenter);
        const maxDistance = itemWidth * 2.2;

        if (distance > maxDistance) return 1;
        const factor = (maxDistance - distance) / maxDistance;
        return 1 + factor * 0.45; // Magnifies up to 1.45x
    };

    return (
        <div className="fixed bottom-6 inset-x-0 flex flex-col items-center justify-center z-40 pointer-events-none print:hidden">
            {/* Collapse / Expand Toggle Button */}
            <button
                type="button"
                onClick={() => {
                    playClickSound(600, 0.02);
                    setIsCollapsed(!isCollapsed);
                }}
                className="mb-1 size-6 rounded-full bg-card/85 backdrop-blur-md border border-border/80 text-muted-foreground hover:text-foreground flex items-center justify-center shadow-md pointer-events-auto transition-transform hover:scale-110"
                title={isCollapsed ? 'إظهار شريط التنقل ثلاثي الأبعاد' : 'إخفاء شريط التنقل'}
            >
                {isCollapsed ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>

            {!isCollapsed && (
                <div
                    ref={dockRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex items-end gap-2 px-4 py-2.5 rounded-3xl bg-card/80 dark:bg-[#1A0203]/90 backdrop-blur-2xl border border-primary/20 shadow-2xl shadow-black/30 pointer-events-auto transition-all duration-300"
                >
                    {/* Glowing Dock Underline Backdrop */}
                    <div className="absolute inset-x-8 -bottom-1 h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm pointer-events-none" />

                    {dockItems.map((item, idx) => {
                        const scale = getScale(idx);
                        const translateY = (scale - 1) * -16;
                        const isHovered = hoveredIdx === idx;
                        const isActive = !item.isAction && item.href && (url === item.href || (item.href !== '/' && url.startsWith(item.href)));

                        const Icon = item.icon;

                        const content = (
                            <div
                                onMouseEnter={() => {
                                    setHoveredIdx(idx);
                                    playClickSound(500 + idx * 40, 0.015);
                                }}
                                className="relative flex flex-col items-center justify-center"
                                style={{
                                    transform: `translateY(${translateY}px) scale(${scale})`,
                                    transformOrigin: 'bottom center',
                                    transition: mouseX === null ? 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                                }}
                            >
                                {/* 3D Tooltip */}
                                {isHovered && (
                                    <div
                                        className="absolute -top-10 px-2.5 py-1 rounded-xl bg-background/95 backdrop-blur-md border border-border/80 shadow-xl text-[11px] font-bold text-foreground whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                                    >
                                        {item.title}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-background border-r border-b border-border/80 rotate-45" />
                                    </div>
                                )}

                                {/* Dock Icon Orb */}
                                <div
                                    className={`size-11 sm:size-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-md ${
                                        isActive
                                            ? 'bg-gradient-to-tr from-primary to-orange-500 text-white shadow-primary/30 ring-2 ring-primary/40'
                                            : isHovered
                                            ? 'bg-secondary text-primary shadow-lg ring-1 ring-primary/30'
                                            : 'bg-muted/70 hover:bg-muted text-foreground'
                                    }`}
                                >
                                    <Icon className={`size-5 sm:size-5.5 ${item.color || ''}`} />
                                </div>

                                {/* Active Dot Indicator */}
                                {isActive && (
                                    <span className="absolute -bottom-1 size-1.5 rounded-full bg-primary shadow-sm shadow-primary" />
                                )}
                            </div>
                        );

                        if (item.isAction) {
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={item.action}
                                    className="outline-none"
                                >
                                    {content}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.href!}
                                onClick={() => playClickSound(700, 0.02)}
                                className="outline-none"
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
