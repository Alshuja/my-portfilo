import { useState, useEffect, useRef } from 'react';
import {
    Sparkles,
    RotateCcw,
    Volume2,
    VolumeX,
    Maximize2,
    Minimize2,
    Loader2,
    Cpu,
    Terminal,
} from 'lucide-react';
import {
    isSoundEnabled,
    toggleSound,
    playMechanicalPress,
    playMechanicalRelease,
    playClickSound,
} from './sound-effects';

interface Spline3dSceneProps {
    url?: string;
    className?: string;
    height?: string;
    hintText?: string;
    showControls?: boolean;
}

export function Spline3dScene({
    url = '/assets/3d/skills-keyboard.spline',
    className = '',
    height = '540px',
    hintText = 'حرك الماوس للتفاعل ثلاثي الأبعاد، واضغط المفاتيح لسماع النقر الميكانيكي',
    showControls = true,
}: Spline3dSceneProps) {
    const [scriptReady, setScriptReady] = useState(false);
    const [viewerLoaded, setViewerLoaded] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setSoundOn(isSoundEnabled());

        // Check if spline-viewer is already registered
        if (
            typeof window !== 'undefined' &&
            customElements.get('spline-viewer')
        ) {
            setScriptReady(true);
            return;
        }

        // Dynamically load the official Spline Viewer web component
        const existingScript = document.querySelector(
            'script[src*="spline-viewer"]',
        );
        if (existingScript) {
            existingScript.addEventListener('load', () => setScriptReady(true));
            // In case it was already loaded
            setScriptReady(true);
            return;
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.src =
            'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
        script.async = true;
        script.onload = () => setScriptReady(true);
        script.onerror = () => {
            console.warn(
                'Spline viewer script failed to load from CDN. Using interactive fallback.',
            );
            setHasError(true);
        };
        document.head.appendChild(script);
    }, []);

    // Listen to physical keyboard events to trigger mechanical sounds while interacting
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in form inputs
            const target = e.target as HTMLElement;
            if (
                target &&
                (target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.isContentEditable)
            ) {
                return;
            }
            playMechanicalPress();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (
                target &&
                (target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.isContentEditable)
            ) {
                return;
            }
            playMechanicalRelease();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleSoundToggle = () => {
        const next = toggleSound();
        setSoundOn(next);
    };

    const handleFullscreenToggle = () => {
        if (!containerRef.current) return;
        playClickSound(800, 0.03);
        if (!document.fullscreenElement) {
            containerRef.current
                .requestFullscreen()
                .then(() => setIsFullscreen(true))
                .catch(() => {});
        } else {
            document
                .exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(() => {});
        }
    };

    const handleResetCamera = () => {
        playClickSound(650, 0.03);
        // Force re-mount of viewer by toggling briefly
        setViewerLoaded(false);
        setTimeout(() => setViewerLoaded(true), 150);
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-3xl border border-border/80 bg-card/60 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''
            } ${className}`}
            style={{ height: isFullscreen ? '100vh' : height }}
        >
            {/* Ambient Lighting Gradients */}
            <div className="pointer-events-none absolute top-0 right-1/4 -z-10 size-72 rounded-full bg-red-600/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 size-72 rounded-full bg-orange-500/10 blur-3xl" />

            {/* Top Interactive Controls Bar */}
            {showControls && (
                <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                    <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/85 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md">
                        <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                        <span className="font-mono text-[11px] font-bold text-primary">
                            3D WebGL Engine
                        </span>
                        <span className="hidden text-muted-foreground sm:inline">
                            |
                        </span>
                        <span className="hidden text-[11px] text-muted-foreground sm:inline">
                            {hintText}
                        </span>
                    </div>

                    <div className="pointer-events-auto flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSoundToggle}
                            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-secondary hover:text-primary"
                            title={
                                soundOn
                                    ? 'كتم المؤثرات الصوتية'
                                    : 'تفعيل المؤثرات الميكانيكية'
                            }
                        >
                            {soundOn ? (
                                <Volume2 className="size-4 text-primary" />
                            ) : (
                                <VolumeX className="size-4 text-muted-foreground" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleResetCamera}
                            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-secondary hover:text-primary"
                            title="إعادة ضبط زاوية الكاميرا"
                        >
                            <RotateCcw className="size-4" />
                        </button>

                        <button
                            type="button"
                            onClick={handleFullscreenToggle}
                            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-secondary hover:text-primary"
                            title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
                        >
                            {isFullscreen ? (
                                <Minimize2 className="size-4" />
                            ) : (
                                <Maximize2 className="size-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Spline Viewer 3D Custom Element */}
            {scriptReady && !hasError ? (
                <div
                    className="flex size-full items-center justify-center"
                    onMouseDown={() => playMechanicalPress()}
                    onMouseUp={() => playMechanicalRelease()}
                >
                    {/* @ts-expect-error spline-viewer is registered as a custom element */}
                    <spline-viewer
                        ref={(el: HTMLElement | null) => {
                            viewerRef.current = el;
                            if (el && !viewerLoaded) {
                                el.addEventListener('load', () =>
                                    setViewerLoaded(true),
                                );
                            }
                        }}
                        url={url}
                        loading-anim-type="spinner-small-dark"
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                        }}
                    />
                </div>
            ) : hasError ? (
                /* Fallback 3D Visual Experience if CDN is blocked or WebGL fails */
                <div className="flex size-full flex-col items-center justify-center space-y-4 p-8 text-center">
                    <div className="flex size-20 animate-pulse items-center justify-center rounded-3xl bg-gradient-to-tr from-primary to-orange-500 text-white shadow-2xl shadow-primary/30">
                        <Cpu className="size-10" />
                    </div>
                    <div className="max-w-md space-y-1.5">
                        <h4 className="text-lg font-black text-foreground">
                            مجسم لوحة المفاتيح ثلاثية الأبعاد
                        </h4>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            نموذج تفاعلي متقدم بتقنية Spline & WebGL 2.0. اضغط
                            على أي زر في لوحة مفاتيحك لسماع النقر الميكانيكي
                            الحقيقي.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-2 sm:grid-cols-6">
                        {[
                            'Python',
                            'Flutter',
                            'Laravel',
                            'React',
                            'Docker',
                            'AI',
                        ].map((key) => (
                            <button
                                key={key}
                                type="button"
                                onMouseDown={() => playMechanicalPress()}
                                onMouseUp={() => playMechanicalRelease()}
                                className="rounded-xl border border-primary/20 bg-secondary/80 px-3 py-2 font-mono text-xs font-bold text-foreground shadow-sm transition-all hover:border-primary hover:bg-primary/10 active:translate-y-1"
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Loading State */
                <div className="flex size-full flex-col items-center justify-center space-y-3 text-muted-foreground">
                    <Loader2 className="size-8 animate-spin text-primary" />
                    <span className="font-mono text-xs font-semibold">
                        جارٍ تهيئة المحرك ثلاثي الأبعاد...
                    </span>
                </div>
            )}

            {/* Bottom Telemetry Bar */}
            <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" />
                    <span>Skills 3D Model · Spline Engine</span>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                    <span>60 FPS</span>
                    <span>•</span>
                    <span>Mechanical Audio Sync</span>
                </div>
            </div>
        </div>
    );
}
