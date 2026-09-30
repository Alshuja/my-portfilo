import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Terminal,
    Home,
    User,
    Cpu,
    FolderGit2,
    Award,
    Route as RouteIcon,
    Newspaper,
    GraduationCap,
    Mail,
    Lock,
    Sun,
    Moon,
    Volume2,
    VolumeX,
    Menu,
    X,
    MessageCircle,
    ArrowUp,
    Sparkles,
    FileText,
} from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { isSoundEnabled, toggleSound, playClickSound } from '@/components/portfolio/sound-effects';
import { AmbientBackground } from '@/components/portfolio/ambient-background';
import { ScrollProgress } from '@/components/portfolio/scroll-progress';
import { SmartAiAssistant } from '@/components/portfolio/smart-ai-assistant';
import { ElasticCursor } from '@/components/portfolio/elastic-cursor';
import { RadialMenu } from '@/components/portfolio/radial-menu';
import { FloatingDock } from '@/components/portfolio/floating-dock';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PortfolioLayoutProps {
    children: React.ReactNode;
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
    const { url } = usePage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [soundOn, setSoundOn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setSoundOn(isSoundEnabled());

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setIsScrolled(scrollTop > 20);
            if (docHeight > 0) {
                setScrollProgress(Math.min((scrollTop / docHeight) * 100, 100));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleThemeToggle = () => {
        playClickSound(700, 0.04);
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const handleSoundToggle = () => {
        const next = toggleSound();
        setSoundOn(next);
    };

    const navLinks = [
        { href: '/', label: 'الرئيسية', icon: Home, exact: true },
        { href: '/about', label: 'عني ومساري', icon: User },
        { href: '/services', label: 'الخدمات', icon: Sparkles },
        { href: '/projects', label: 'المشاريع', icon: FolderGit2 },
        { href: '/cv', label: 'السيرة الذاتية', icon: FileText },
        { href: '/skills', label: 'المهارات', icon: Cpu },
        { href: '/certificates', label: 'الشهادات', icon: Award },
        { href: '/journey', label: 'المسار', icon: RouteIcon },
        { href: '/blog', label: 'المدونة', icon: Newspaper },
        { href: '/programmer-idea', label: 'فكرة مبرمج', icon: GraduationCap },
        { href: '/contact', label: 'تواصل معي', icon: Mail },
    ];

    const isLinkActive = (href: string, exact = false) => {
        if (exact) return url === href;
        return url.startsWith(href);
    };

    const scrollToTop = () => {
        playClickSound(900, 0.03);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-red-500/20 selection:text-red-500 font-sans relative">
            {/* Top Glowing Scroll Progress Bar */}
            <ScrollProgress />

            {/* Ambient Particle Background Canvas */}
            <AmbientBackground />

            {/* Sticky Modern Header */}
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-xl border-b border-border/70 shadow-sm py-3'
                        : 'bg-transparent py-4'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        onClick={() => playClickSound(650, 0.03)}
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="size-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform duration-300">
                            <Terminal className="size-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight tracking-tight text-foreground flex items-center gap-1">
                                عبدالرحمن <span className="text-red-600">.الشجاع</span>
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono leading-none">
                                Data & AI · Software
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-muted/40 p-1.5 rounded-full border border-border/60 backdrop-blur-md">
                        {navLinks.map((link) => {
                            const active = isLinkActive(link.href, link.exact);
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => playClickSound(550, 0.02)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                        active
                                            ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                                    }`}
                                >
                                    <Icon className="size-3.5" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Header Action Controls */}
                    <div className="flex items-center gap-2">
                        {/* Sound Effect Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSoundToggle}
                            title={soundOn ? 'إيقاف المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية الميكانيكية'}
                            className="size-9 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                            {soundOn ? <Volume2 className="size-4 text-primary" /> : <VolumeX className="size-4" />}
                        </Button>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleThemeToggle}
                            title="تبديل المظهر (ليلي / نهاري)"
                            className="size-9 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4 text-amber-400" />
                            ) : (
                                <Moon className="size-4 text-slate-700" />
                            )}
                        </Button>

                        {/* Admin Link */}
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            title="لوحة الإدارة"
                            className="hidden sm:inline-flex size-9 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                            <Link href="/dashboard" onClick={() => playClickSound(600, 0.02)}>
                                <Lock className="size-3.5" />
                            </Link>
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="lg:hidden size-9 rounded-xl border-border/70"
                                >
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72 p-6 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            <Terminal className="size-4" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">عبدالرحمن الشجاع</div>
                                            <div className="text-xs text-muted-foreground">قائمة الموقع</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 pt-4 border-t border-border/60">
                                        {navLinks.map((link) => {
                                            const active = isLinkActive(link.href, link.exact);
                                            const Icon = link.icon;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => {
                                                        playClickSound(550, 0.02);
                                                        setMobileOpen(false);
                                                    }}
                                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                                                        active
                                                            ? 'bg-primary text-primary-foreground font-semibold'
                                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                                    }`}
                                                >
                                                    <Icon className="size-4" />
                                                    <span>{link.label}</span>
                                                </Link>
                                            );
                                        })}
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 mt-2 border-t border-border/50"
                                        >
                                            <Lock className="size-4 text-primary" />
                                            <span>لوحة الإدارة</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border/60 text-xs text-muted-foreground text-center">
                                    عبدالرحمن عادل الشجاع © 2026
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Main Page Body */}
            <main className="flex-1 w-full relative">{children}</main>

            {/* Modern Footer */}
            <footer className="border-t border-border/60 bg-muted/20 backdrop-blur-md pt-16 pb-12 mt-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {/* Col 1: Bio */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    <Terminal className="size-4" />
                                </div>
                                <span className="font-bold text-lg text-foreground">
                                    عبدالرحمن عادل الشجاع
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                                طالب علوم حاسوب وتقنية معلومات بجامعة إب، مطور برمجيات، شغوف بعلوم البيانات والذكاء الاصطناعي وبناء منصات رقمية متكاملة تخدم المجتمع. مؤسس مبادرة "فكرة مبرمج".
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <a
                                    href="https://wa.me/967773853853"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                                >
                                    <MessageCircle className="size-3.5" />
                                    واتساب مباشر
                                </a>
                                <a
                                    href="https://t.me/Alshuja_ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-colors flex items-center gap-1.5"
                                >
                                    تيليجرام: @Alshuja_ai
                                </a>
                            </div>
                        </div>

                        {/* Col 2: Navigation Links */}
                        {/* Col 2: Navigation Links */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                                روابط الموقع
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/" className="hover:text-primary transition-colors">
                                        الرئيسية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-primary transition-colors">
                                        عني ومساري المهني
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="hover:text-primary transition-colors">
                                        الخدمات والحلول الرقمية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/projects" className="hover:text-primary transition-colors">
                                        معرض المشاريع
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cv" className="hover:text-primary transition-colors">
                                        السيرة الذاتية (CV)
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/skills" className="hover:text-primary transition-colors">
                                        المهارات التقنية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/certificates" className="hover:text-primary transition-colors">
                                        الشهادات والجوائز
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/journey" className="hover:text-primary transition-colors">
                                        المسار الأكاديمي والمهني
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Community & Admin */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                                المبادرة والتدوين
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/programmer-idea" className="hover:text-primary transition-colors">
                                        منصة فكرة مبرمج
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-primary transition-colors">
                                        المدونة والمقالات
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-primary transition-colors">
                                        تواصل معي
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="text-xs text-primary hover:underline flex items-center gap-1 pt-2">
                                        <Lock className="size-3" />
                                        لوحة التحكم والإدارة
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div>
                            جميع الحقوق محفوظة للمهندس عبدالرحمن عادل الشجاع © {new Date().getFullYear()}
                        </div>
                        <div className="flex items-center gap-4">
                            <span>صُنع بـ Laravel 12 &amp; React &amp; Tailwind</span>
                            <button
                                onClick={scrollToTop}
                                className="size-7 rounded-lg border border-border/80 flex items-center justify-center hover:bg-muted transition-colors"
                                title="العودة لأعلى الصفحة"
                            >
                                <ArrowUp className="size-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Fluid Elastic 3D Magnetic Cursor */}
            <ElasticCursor />

            {/* Futuristic 3D Radial Action Wheel Menu */}
            <RadialMenu />

            {/* macOS-style 3D Magnifying Navigation Dock */}
            <FloatingDock />

            {/* Smart AI Assistant & Floating Action Buttons */}
            <SmartAiAssistant />
        </div>
    );
}
