import { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Loader2, Cpu, Terminal } from 'lucide-react';
import { isSoundEnabled, toggleSound, playMechanicalPress, playMechanicalRelease, playClickSound } from './sound-effects';

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
        if (typeof window !== 'undefined' && customElements.get('spline-viewer')) {
            setScriptReady(true);
            return;
        }

        // Dynamically load the official Spline Viewer web component
        const existingScript = document.querySelector('script[src*="spline-viewer"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => setScriptReady(true));
            // In case it was already loaded
            setScriptReady(true);
            return;
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
        script.async = true;
        script.onload = () => setScriptReady(true);
        script.onerror = () => {
            console.warn('Spline viewer script failed to load from CDN. Using interactive fallback.');
            setHasError(true);
        };
        document.head.appendChild(script);
    }, []);

    // Listen to physical keyboard events to trigger mechanical sounds while interacting
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in form inputs
            const target = e.target as HTMLElement;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
                return;
            }
            playMechanicalPress();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
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
            containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
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
            className={`relative rounded-3xl overflow-hidden border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''
            } ${className}`}
            style={{ height: isFullscreen ? '100vh' : height }}
        >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 right-1/4 size-72 rounded-full bg-red-600/15 blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 size-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none -z-10" />

            {/* Top Interactive Controls Bar */}
            {showControls && (
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/80 shadow-md text-xs font-semibold text-foreground pointer-events-auto">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-mono text-primary font-bold">3D WebGL Engine</span>
                        <span className="text-muted-foreground hidden sm:inline">|</span>
                        <span className="text-[11px] text-muted-foreground hidden sm:inline">{hintText}</span>
                    </div>

                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            type="button"
                            onClick={handleSoundToggle}
                            className="size-9 rounded-xl bg-background/85 hover:bg-secondary backdrop-blur-md border border-border/80 flex items-center justify-center text-foreground hover:text-primary transition-all shadow-md"
                            title={soundOn ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الميكانيكية'}
                        >
                            {soundOn ? <Volume2 className="size-4 text-primary" /> : <VolumeX className="size-4 text-muted-foreground" />}
                        </button>

                        <button
                            type="button"
                            onClick={handleResetCamera}
                            className="size-9 rounded-xl bg-background/85 hover:bg-secondary backdrop-blur-md border border-border/80 flex items-center justify-center text-foreground hover:text-primary transition-all shadow-md"
                            title="إعادة ضبط زاوية الكاميرا"
                        >
                            <RotateCcw className="size-4" />
                        </button>

                        <button
                            type="button"
                            onClick={handleFullscreenToggle}
                            className="size-9 rounded-xl bg-background/85 hover:bg-secondary backdrop-blur-md border border-border/80 flex items-center justify-center text-foreground hover:text-primary transition-all shadow-md"
                            title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
                        >
                            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* Spline Viewer 3D Custom Element */}
            {scriptReady && !hasError ? (
                <div
                    className="size-full flex items-center justify-center"
                    onMouseDown={() => playMechanicalPress()}
                    onMouseUp={() => playMechanicalRelease()}
                >
                    {/* @ts-expect-error spline-viewer is registered as a custom element */}
                    <spline-viewer
                        ref={(el: HTMLElement | null) => {
                            viewerRef.current = el;
                            if (el && !viewerLoaded) {
                                el.addEventListener('load', () => setViewerLoaded(true));
                            }
                        }}
                        url={url}
                        loading-anim-type="spinner-small-dark"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                </div>
            ) : hasError ? (
                /* Fallback 3D Visual Experience if CDN is blocked or WebGL fails */
                <div className="size-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="size-20 rounded-3xl bg-gradient-to-tr from-primary to-orange-500 text-white flex items-center justify-center shadow-2xl shadow-primary/30 animate-pulse">
                        <Cpu className="size-10" />
                    </div>
                    <div className="space-y-1.5 max-w-md">
                        <h4 className="text-lg font-black text-foreground">مجسم لوحة المفاتيح ثلاثية الأبعاد</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            نموذج تفاعلي متقدم بتقنية Spline & WebGL 2.0. اضغط على أي زر في لوحة مفاتيحك لسماع النقر الميكانيكي الحقيقي.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                        {['Python', 'Flutter', 'Laravel', 'React', 'Docker', 'AI'].map((key) => (
                            <button
                                key={key}
                                type="button"
                                onMouseDown={() => playMechanicalPress()}
                                onMouseUp={() => playMechanicalRelease()}
                                className="px-3 py-2 rounded-xl bg-secondary/80 border border-primary/20 hover:border-primary hover:bg-primary/10 text-xs font-mono font-bold text-foreground transition-all active:translate-y-1 shadow-sm"
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Loading State */
                <div className="size-full flex flex-col items-center justify-center space-y-3 text-muted-foreground">
                    <Loader2 className="size-8 text-primary animate-spin" />
                    <span className="text-xs font-mono font-semibold">جارٍ تهيئة المحرك ثلاثي الأبعاد...</span>
                </div>
            )}

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none text-[11px] text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" />
                    <span>Skills 3D Model · Spline Engine</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    <span>60 FPS</span>
                    <span>•</span>
                    <span>Mechanical Audio Sync</span>
                </div>
            </div>
        </div>
    );
}
