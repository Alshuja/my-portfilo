import { Head, Link } from '@inertiajs/react';
import {
    Download,
    Send,
    GraduationCap,
    Brain,
    Smartphone,
    Rocket,
    Calendar,
    Lightbulb,
    Briefcase,
    Award,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { TiltCard } from '@/components/portfolio/tilt-card';
import { fireConfetti } from '@/components/portfolio/confetti';
import { playClickSound } from '@/components/portfolio/sound-effects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Journey, ProfileSettings } from '@/types/portfolio';

interface AboutProps {
    settings: ProfileSettings;
    journey: Journey[];
    stats: {
        projects: number;
        certificates: number;
        skills: number;
        journey: number;
    };
}

export default function AboutPage({ settings, journey, stats }: AboutProps) {
    const handleDownloadCv = (e: React.MouseEvent) => {
        playClickSound(750, 0.04);
        fireConfetti(e.clientX, e.clientY);
    };

    const getJourneyIcon = (iconName: string) => {
        switch (iconName) {
            case 'rocket':
                return <Rocket className="size-5 text-primary" />;
            case 'brain':
                return <Brain className="size-5 text-amber-500" />;
            case 'lightbulb':
                return <Lightbulb className="size-5 text-primary" />;
            case 'graduation-cap':
            default:
                return <GraduationCap className="size-5 text-amber-500" />;
        }
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>عني ومساري المهني والأكاديمي | عبدالرحمن عادل الشجاع</title>
                <meta
                    name="description"
                    content="السيرة الذاتية والمسار الأكاديمي والمهني للمهندس عبدالرحمن عادل الشجاع — طالب علوم حاسوب بجامعة إب ومؤسس فكرة مبرمج."
                />
            </Head>

            {/* ==================== PAGE BANNER ==================== */}
            <div className="relative py-12 md:py-20 border-b border-border/80 bg-card/40 backdrop-blur-md overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-primary transition-colors">
                            الرئيسية
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">السيرة الذاتية والمسار</span>
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <Badge variant="outline" className="text-primary border-primary/30 px-3.5 py-1 bg-primary/5 text-xs font-semibold">
                            السيرة والرحلة المهنية
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                            عن عبدالرحمن <span className="text-gradient">عادل الشجاع</span>
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {settings.about_lead ||
                                'طالب علوم حاسوب وتقنية معلومات (المستوى الرابع) بجامعة إب، مطور برمجيات، شغوف بعلوم البيانات والذكاء الاصطناعي وبناء منصات رقمية تخدم المجتمع.'}
                        </p>
                    </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute top-0 right-1/4 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />
            </div>

            {/* ==================== ABOUT MAIN CONTENT ==================== */}
            <main className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-5xl space-y-20">
                {/* Profile & Bio Card */}
                <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-xl backdrop-blur-md">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                        {/* Image Column */}
                        <div className="lg:col-span-5 flex justify-center">
                            <TiltCard maxTilt={6} className="w-full max-w-xs sm:max-w-sm">
                                <div className="avatar-frame">
                                    <div className="image-glow" />
                                    <img
                                        src={settings.about_image || settings.hero_image || '/images/profile-hero.png'}
                                        alt={settings.name || 'عبدالرحمن عادل الشجاع'}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.src.includes('main-img.jpg')) {
                                                target.src = '/images/main-img.jpg';
                                            }
                                        }}
                                        className="avatar-img signature-frame-img"
                                    />
                                    <div className="image-badge-experience">
                                        <span className="badge-number">+{settings.experience_years || '3'}</span>
                                        <span className="badge-text">سنوات شغف وبناء برمجيات</span>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>

                        {/* Bio Text Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <span className="text-xs font-mono font-bold text-primary tracking-wide">
                                    تعرّف علي أكثر
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                                    مهندس ومطور <span className="text-gradient">يبني الأفكار إلى واقع رقمي</span>
                                </h2>
                            </div>

                            <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                                أنا <strong>عبدالرحمن عادل الشجاع</strong>، طالب في <strong>جامعة إب</strong> بكلية الحاسوب وتقنية المعلومات (المستوى الرابع).
                                أؤمن بأن التقنية والبيانات هما القوة المحركة لصناعة التغيير، ولذلك كرست وقتي لتعلم وتطبيق أحدث مهارات علم البيانات، ونماذج الذكاء الاصطناعي، وهندسة البرمجيات.
                            </p>

                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {settings.about_bio ||
                                    'أسست منصة ومبادرة "فكرة مبرمج" (Programmer Idea) لتبسيط علوم البرمجة والذكاء الاصطناعي وإثراء المحتوى التقني العربي واليمني، كما شاركت في بناء وتطوير مشاريع حقيقية وناجحة كمنصة "سندباد" (Sinbad) للتجارة الإلكترونية وتطبيق "محفظة ريال" (Riyal Wallet).'}
                            </p>

                            {/* 4 Interactive 3D Highlights Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                <TiltCard className="p-4 rounded-2xl bg-muted/30 border border-border/70 flex items-start gap-3.5 hover:border-primary/50 transition-colors">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="font-bold text-sm text-foreground">جامعة إب</div>
                                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                                            علوم حاسوب وتقنية معلومات (المستوى 4)
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="p-4 rounded-2xl bg-muted/30 border border-border/70 flex items-start gap-3.5 hover:border-primary/50 transition-colors">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <Brain className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="font-bold text-sm text-foreground">Data &amp; AI</div>
                                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                                            نماذج تعلم الآلة وتحليل البيانات ببايثون
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="p-4 rounded-2xl bg-muted/30 border border-border/70 flex items-start gap-3.5 hover:border-primary/50 transition-colors">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="font-bold text-sm text-foreground">Flutter Apps</div>
                                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                                            تطبيقات هواتف ذكية Android &amp; iOS
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="p-4 rounded-2xl bg-muted/30 border border-border/70 flex items-start gap-3.5 hover:border-primary/50 transition-colors">
                                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <Rocket className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="font-bold text-sm text-foreground">فكرة مبرمج</div>
                                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                                            مبادرة ومجتمع تقني لتعليم البرمجة
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                                <Button
                                    asChild
                                    size="lg"
                                    onClick={handleDownloadCv}
                                    className="rounded-2xl font-bold gap-2 shadow-lg shadow-primary/25"
                                >
                                    <a href={settings.cv_url || '#'} download>
                                        <Download className="size-4" />
                                        تحميل السيرة الذاتية (CV)
                                    </a>
                                </Button>

                                <Button asChild variant="outline" size="lg" className="rounded-2xl font-bold gap-2 border-border/80">
                                    <Link href="/contact">
                                        <Send className="size-4 -scale-x-100 text-primary" />
                                        تواصل معي مباشرة
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline & Milestones Section */}
                <div className="space-y-8">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5 text-xs font-semibold">
                            المسار والمحطات
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                            محطات <span className="text-gradient">المسيرة الأكاديمية والمهنية</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            أبرز المحطات والإنجازات التي شكلت خبرتي البرمجية والأكاديمية عبر السنوات الماضية.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {journey.map((item) => (
                            <TiltCard
                                key={item.id}
                                className="p-6 rounded-3xl bg-card border border-border/80 shadow-md hover:border-primary/50 transition-all flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            {getJourneyIcon(item.icon)}
                                        </div>
                                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1.5">
                                            <Calendar className="size-3 text-primary" />
                                            {item.date_range}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-base sm:text-lg text-foreground">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                                            <Award className="size-3" />
                                            <span>{item.role}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-border/60">
                                    <span className="text-[11px] font-mono text-primary font-bold">
                                        #{item.category_label}
                                    </span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Bottom Callout */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 text-center space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                        هل ترغب في العمل معاً على مشروعك القادم؟
                    </h3>
                    <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                        سواء كنت بحاجة إلى استشارة في علوم البيانات والذكاء الاصطناعي، أو بناء تطبيق هاتف ذكي، أو منصة تجارية متكاملة.
                    </p>
                    <div className="pt-2">
                        <Button asChild size="lg" className="rounded-2xl font-bold px-8 shadow-lg shadow-primary/25">
                            <Link href="/contact">
                                ابدأ محادثة مباشرة الآن
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </PortfolioLayout>
    );
}
