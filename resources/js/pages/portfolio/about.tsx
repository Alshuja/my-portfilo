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
                <title>
                    عني ومساري المهني والأكاديمي | عبدالرحمن عادل الشجاع
                </title>
                <meta
                    name="description"
                    content="السيرة الذاتية والمسار الأكاديمي والمهني للمهندس عبدالرحمن عادل الشجاع — طالب علوم حاسوب بجامعة إب ومؤسس فكرة مبرمج."
                />
            </Head>

            {/* ==================== PAGE BANNER ==================== */}
            <div className="relative overflow-hidden border-b border-border/80 bg-card/40 py-12 backdrop-blur-md md:py-20">
                <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <Link
                            href="/"
                            className="transition-colors hover:text-primary"
                        >
                            الرئيسية
                        </Link>
                        <span>/</span>
                        <span className="font-bold text-primary">
                            السيرة الذاتية والمسار
                        </span>
                    </div>

                    <div className="max-w-3xl space-y-4">
                        <Badge
                            variant="outline"
                            className="border-primary/30 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary"
                        >
                            السيرة والرحلة المهنية
                        </Badge>
                        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                            عن عبدالرحمن{' '}
                            <span className="text-gradient">عادل الشجاع</span>
                        </h1>
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {settings.about_lead ||
                                'طالب علوم حاسوب وتقنية معلومات (المستوى الرابع) بجامعة إب، مطور برمجيات، شغوف بعلوم البيانات والذكاء الاصطناعي وبناء منصات رقمية تخدم المجتمع.'}
                        </p>
                    </div>
                </div>

                {/* Ambient glow */}
                <div className="pointer-events-none absolute top-0 right-1/4 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* ==================== ABOUT MAIN CONTENT ==================== */}
            <main className="container mx-auto max-w-5xl space-y-20 px-4 py-16 sm:px-6 md:py-24">
                {/* Profile & Bio Card */}
                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur-md sm:p-10">
                    <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
                        {/* Image Column */}
                        <div className="flex justify-center lg:col-span-5">
                            <TiltCard
                                maxTilt={6}
                                className="w-full max-w-xs sm:max-w-sm"
                            >
                                <div className="avatar-frame">
                                    <div className="image-glow" />
                                    <img
                                        src={
                                            settings.about_image ||
                                            settings.hero_image ||
                                            '/images/profile-hero.png'
                                        }
                                        alt={
                                            settings.name ||
                                            'عبدالرحمن عادل الشجاع'
                                        }
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (
                                                !target.src.includes(
                                                    'main-img.jpg',
                                                )
                                            ) {
                                                target.src =
                                                    '/images/main-img.jpg';
                                            }
                                        }}
                                        className="avatar-img signature-frame-img"
                                    />
                                    <div className="image-badge-experience">
                                        <span className="badge-number">
                                            +{settings.experience_years || '3'}
                                        </span>
                                        <span className="badge-text">
                                            سنوات شغف وبناء برمجيات
                                        </span>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>

                        {/* Bio Text Column */}
                        <div className="space-y-6 lg:col-span-7">
                            <div className="space-y-2">
                                <span className="font-mono text-xs font-bold tracking-wide text-primary">
                                    تعرّف علي أكثر
                                </span>
                                <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                                    مهندس ومطور{' '}
                                    <span className="text-gradient">
                                        يبني الأفكار إلى واقع رقمي
                                    </span>
                                </h2>
                            </div>

                            <p className="text-sm leading-relaxed font-medium text-foreground/90 sm:text-base">
                                أنا <strong>عبدالرحمن عادل الشجاع</strong>، طالب
                                في <strong>جامعة إب</strong> بكلية الحاسوب
                                وتقنية المعلومات (المستوى الرابع). أؤمن بأن
                                التقنية والبيانات هما القوة المحركة لصناعة
                                التغيير، ولذلك كرست وقتي لتعلم وتطبيق أحدث
                                مهارات علم البيانات، ونماذج الذكاء الاصطناعي،
                                وهندسة البرمجيات.
                            </p>

                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                {settings.about_bio ||
                                    'أسست منصة ومبادرة "فكرة مبرمج" (Programmer Idea) لتبسيط علوم البرمجة والذكاء الاصطناعي وإثراء المحتوى التقني العربي واليمني، كما شاركت في بناء وتطوير مشاريع حقيقية وناجحة كمنصة "سندباد" (Sinbad) للتجارة الإلكترونية وتطبيق "محفظة ريال" (Riyal Wallet).'}
                            </p>

                            {/* 4 Interactive 3D Highlights Cards */}
                            <div className="grid grid-cols-1 gap-3.5 pt-2 sm:grid-cols-2">
                                <TiltCard className="flex items-start gap-3.5 rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:border-primary/50">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <GraduationCap className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-bold text-foreground">
                                            جامعة إب
                                        </div>
                                        <div className="text-[11px] leading-relaxed text-muted-foreground">
                                            علوم حاسوب وتقنية معلومات (المستوى
                                            4)
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="flex items-start gap-3.5 rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:border-primary/50">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Brain className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-bold text-foreground">
                                            Data &amp; AI
                                        </div>
                                        <div className="text-[11px] leading-relaxed text-muted-foreground">
                                            نماذج تعلم الآلة وتحليل البيانات
                                            ببايثون
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="flex items-start gap-3.5 rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:border-primary/50">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-bold text-foreground">
                                            Flutter Apps
                                        </div>
                                        <div className="text-[11px] leading-relaxed text-muted-foreground">
                                            تطبيقات هواتف ذكية Android &amp; iOS
                                        </div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="flex items-start gap-3.5 rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:border-primary/50">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Rocket className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-bold text-foreground">
                                            فكرة مبرمج
                                        </div>
                                        <div className="text-[11px] leading-relaxed text-muted-foreground">
                                            مبادرة ومجتمع تقني لتعليم البرمجة
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
                                <Button
                                    asChild
                                    size="lg"
                                    onClick={handleDownloadCv}
                                    className="gap-2 rounded-2xl font-bold shadow-lg shadow-primary/25"
                                >
                                    <a href={settings.cv_url || '#'} download>
                                        <Download className="size-4" />
                                        تحميل السيرة الذاتية (CV)
                                    </a>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="gap-2 rounded-2xl border-border/80 font-bold"
                                >
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
                    <div className="mx-auto max-w-2xl space-y-3 text-center">
                        <Badge
                            variant="outline"
                            className="border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                        >
                            المسار والمحطات
                        </Badge>
                        <h2 className="text-3xl font-black text-foreground sm:text-4xl">
                            محطات{' '}
                            <span className="text-gradient">
                                المسيرة الأكاديمية والمهنية
                            </span>
                        </h2>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            أبرز المحطات والإنجازات التي شكلت خبرتي البرمجية
                            والأكاديمية عبر السنوات الماضية.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {journey.map((item) => (
                            <TiltCard
                                key={item.id}
                                className="flex flex-col justify-between space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-md transition-all hover:border-primary/50"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                                            {getJourneyIcon(item.icon)}
                                        </div>
                                        <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-xs font-semibold text-muted-foreground">
                                            <Calendar className="size-3 text-primary" />
                                            {item.date_range}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-base font-bold text-foreground sm:text-lg">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                                            <Award className="size-3" />
                                            <span>{item.role}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="border-t border-border/60 pt-3">
                                    <span className="font-mono text-[11px] font-bold text-primary">
                                        #{item.category_label}
                                    </span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Bottom Callout */}
                <div className="space-y-4 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 text-center sm:p-12">
                    <h3 className="text-2xl font-black text-foreground sm:text-3xl">
                        هل ترغب في العمل معاً على مشروعك القادم؟
                    </h3>
                    <p className="mx-auto max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        سواء كنت بحاجة إلى استشارة في علوم البيانات والذكاء
                        الاصطناعي، أو بناء تطبيق هاتف ذكي، أو منصة تجارية
                        متكاملة.
                    </p>
                    <div className="pt-2">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-2xl px-8 font-bold shadow-lg shadow-primary/25"
                        >
                            <Link href="/contact">ابدأ محادثة مباشرة الآن</Link>
                        </Button>
                    </div>
                </div>
            </main>
        </PortfolioLayout>
    );
}
