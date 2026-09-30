import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import {
    FolderGit2,
    Sparkles,
    Cpu,
    FileText,
    MessageCircle,
    Sun,
    Moon,
    Volume2,
    VolumeX,
    X,
    PartyPopper,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import {
    isSoundEnabled,
    toggleSound,
    playClickSound,
    playMechanicalPress,
} from './sound-effects';
import { fireConfetti } from './confetti';

interface ShockwaveData {
    id: number;
    x: number;
    y: number;
    color: string;
}

export function RadialMenu() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [shockwaves, setShockwaves] = useState<ShockwaveData[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [soundOn, setSoundOn] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSoundOn(isSoundEnabled());

        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Don't intercept right clicks inside inputs or textareas
            if (
                target &&
                (target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.isContentEditable)
            ) {
                return;
            }

            e.preventDefault();
            spawnMenu(e.clientX, e.clientY);
        };

        const handleCustomOpen = (e: Event) => {
            const customEvent = e as CustomEvent<{ x?: number; y?: number }>;
            const x = customEvent.detail?.x ?? window.innerWidth / 2;
            const y = customEvent.detail?.y ?? window.innerHeight / 2;
            spawnMenu(x, y);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('open-radial-menu', handleCustomOpen);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('open-radial-menu', handleCustomOpen);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const spawnMenu = (clientX: number, clientY: number) => {
        // Clamp menu coordinates so it doesn't overflow viewport boundaries
        const radius = 150;
        const clampedX = Math.max(
            radius + 20,
            Math.min(window.innerWidth - radius - 20, clientX),
        );
        const clampedY = Math.max(
            radius + 20,
            Math.min(window.innerHeight - radius - 20, clientY),
        );

        setPos({ x: clampedX, y: clampedY });
        setIsOpen(true);
        playMechanicalPress();

        // Spawn shockwave ripple effect
        const newShockwave: ShockwaveData = {
            id: Date.now(),
            x: clampedX,
            y: clampedY,
            color: '#D71916',
        };
        setShockwaves((prev) => [...prev, newShockwave]);
        setTimeout(() => {
            setShockwaves((prev) =>
                prev.filter((s) => s.id !== newShockwave.id),
            );
        }, 1200);
    };

    const handleAction = (item: (typeof menuItems)[0]) => {
        playClickSound(800, 0.04);
        setIsOpen(false);

        if (item.action) {
            item.action();
        } else if (item.href) {
            if (item.external) {
                window.open(item.href, '_blank');
            } else {
                router.visit(item.href);
            }
        }
    };

    const handleThemeToggle = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const handleSoundToggle = () => {
        const next = toggleSound();
        setSoundOn(next);
    };

    const menuItems = [
        {
            title: 'المشاريع',
            icon: FolderGit2,
            href: '/projects',
            color: '#D71916',
        },
        {
            title: 'الخدمات',
            icon: Sparkles,
            href: '/services',
            color: '#FF6A32',
        },
        {
            title: 'المهارات و 3D',
            icon: Cpu,
            href: '/skills',
            color: '#F59E0B',
        },
        {
            title: 'السيرة (CV)',
            icon: FileText,
            href: '/cv',
            color: '#10B981',
        },
        {
            title: 'واتساب مباشر',
            icon: MessageCircle,
            href: 'https://wa.me/967773853853',
            external: true,
            color: '#22C55E',
        },
        {
            title: 'تبديل المظهر',
            icon: resolvedAppearance === 'dark' ? Sun : Moon,
            action: handleThemeToggle,
            color: '#3B82F6',
        },
        {
            title: soundOn ? 'كتم المؤثرات' : 'تشغيل المؤثرات',
            icon: soundOn ? Volume2 : VolumeX,
            action: handleSoundToggle,
            color: '#8B5CF6',
        },
        {
            title: 'احتفال كونفيتي',
            icon: PartyPopper,
            action: () => fireConfetti(),
            color: '#EC4899',
        },
    ];

    if (!isOpen && shockwaves.length === 0) return null;

    const radius = 120; // Radius of circular arrangement

    return (
        <div className="pointer-events-none fixed inset-0 z-50 print:hidden">
            {/* Shockwave Rings */}
            {shockwaves.map((s) => (
                <div
                    key={s.id}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                    style={{
                        left: s.x,
                        top: s.y,
                        width: '120px',
                        height: '120px',
                        border: '3px solid rgba(215, 25, 22, 0.65)',
                        boxShadow: '0 0 30px rgba(215, 25, 22, 0.4)',
                        animationDuration: '0.9s',
                    }}
                />
            ))}

            {isOpen && (
                <>
                    {/* Backdrop Click Dismiss */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="pointer-events-auto fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
                    />

                    {/* Radial Menu Container */}
                    <div
                        ref={menuRef}
                        className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 animate-in duration-200 zoom-in-75 fade-in"
                        style={{ left: pos.x, top: pos.y }}
                    >
                        {/* Central Hub Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="relative z-20 flex size-16 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-tr from-primary to-orange-500 text-white shadow-2xl shadow-primary/50 transition-all hover:scale-110 active:scale-95"
                            title="إغلاق القائمة"
                        >
                            <X className="size-6" />
                        </button>

                        {/* Circular Radial Items */}
                        {menuItems.map((item, idx) => {
                            const angle =
                                (idx * (360 / menuItems.length) - 90) *
                                (Math.PI / 180);
                            const itemX = Math.cos(angle) * radius;
                            const itemY = Math.sin(angle) * radius;
                            const isHovered = hoveredIdx === idx;
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(${itemX - 22}px, ${itemY - 22}px) scale(${isHovered ? 1.2 : 1})`,
                                        transition:
                                            'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                >
                                    <button
                                        type="button"
                                        onMouseEnter={() => {
                                            setHoveredIdx(idx);
                                            playClickSound(
                                                600 + idx * 50,
                                                0.02,
                                            );
                                        }}
                                        onMouseLeave={() => setHoveredIdx(null)}
                                        onClick={() => handleAction(item)}
                                        className="relative flex size-12 items-center justify-center rounded-2xl border border-border/80 bg-card/95 shadow-xl transition-all hover:bg-card hover:shadow-2xl"
                                        style={{
                                            boxShadow: isHovered
                                                ? `0 0 25px ${item.color}88`
                                                : undefined,
                                            borderColor: isHovered
                                                ? item.color
                                                : undefined,
                                        }}
                                    >
                                        <Icon
                                            className="size-5"
                                            style={{ color: item.color }}
                                        />

                                        {/* Label Tag on Hover */}
                                        {isHovered && (
                                            <div className="absolute -top-8 z-30 rounded-lg border border-border/80 bg-background/95 px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap text-foreground shadow-lg backdrop-blur-md">
                                                {item.title}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
