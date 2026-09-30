import { Head } from '@inertiajs/react';
import {
    GraduationCap,
    Send,
    Youtube,
    CheckCircle2,
    Users,
    Video,
    BookOpen,
    Code,
    Sparkles,
    ExternalLink,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ProfileSettings } from '@/types/portfolio';

interface ProgrammerIdeaProps {
    settings: ProfileSettings;
    stats: {
        students: string;
        courses: string;
        videos: string;
        telegramMembers: string;
    };
}

export default function ProgrammerIdeaPage({
    settings,
    stats,
}: ProgrammerIdeaProps) {
    const pillars = [
        {
            title: 'شروحات معمقة في بايثون وعلم البيانات',
            desc: 'سلاسل تطبيقية تبدأ من الأساسيات وتتدرج إلى تحليل البيانات بمكتبات pandas و NumPy وبناء نماذج Machine Learning.',
            icon: Code,
        },
        {
            title: 'معسكرات وتطبيقات هواتف بـ Flutter',
            desc: 'دروس عملية لبناء تطبيقات حقيقية تعمل على Android و iOS بكود نظيف وتصميم عصري وربط APIs متكامل.',
            icon: Sparkles,
        },
        {
            title: 'مجتمع تفاعلي للمساعدة وحل المشكلات',
            desc: 'نقاشات حية لحل أخطاء الأكواد ومساعدة الطلاب الجدد في تخصصات علوم الحاسوب وهندسة البرمجيات.',
            icon: Users,
        },
        {
            title: 'متاح مجاناً للجميع عبر تيليجرام ويوتيوب',
            desc: 'إيمان راسخ بأن زكاة العلم نشره، وتوفير مصادر تعلم ذات جودة عالية تدعم الطالب والمطور العربي.',
            icon: BookOpen,
        },
    ];

    return (
        <PortfolioLayout>
            <Head title="منصة ومبادرة فكرة مبرمج — Programmer Idea" />

            <div className="container mx-auto space-y-16 px-4 py-16 sm:px-6 md:py-24">
                {/* Hero Banner */}
                <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-8 text-center shadow-xl md:p-14">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/20">
                        <GraduationCap className="size-8" />
                    </div>

                    <div className="space-y-3">
                        <Badge
                            variant="outline"
                            className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                        >
                            المبادرة التعليمية
                        </Badge>
                        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                            منصة ومبادرة "فكرة مبرمج"
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            مجتمع إلهام وتعلّم لرواد التقنية بإشراف المهندس
                            عبدالرحمن عادل الشجاع. شروحات بايثون، علم البيانات،
                            فلاتر، وتطوير البرمجيات باللغة العربية.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                        >
                            <a
                                href="https://t.me/Alshuja_ai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Send className="size-4" />
                                قناة التليجرام الرسمية
                            </a>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="gap-2 rounded-xl border-border/80"
                        >
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Youtube className="size-4 text-red-500" />
                                قناة اليوتيوب
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-center md:grid-cols-4">
                    <div className="space-y-1 rounded-2xl border border-border/80 bg-card p-6">
                        <div className="font-mono text-3xl font-black text-primary">
                            {stats.students}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                            طالب ومبرمج مستفيد
                        </div>
                    </div>
                    <div className="space-y-1 rounded-2xl border border-border/80 bg-card p-6">
                        <div className="font-mono text-3xl font-black text-primary">
                            {stats.courses}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                            مسار ودورة تدريبية
                        </div>
                    </div>
                    <div className="space-y-1 rounded-2xl border border-border/80 bg-card p-6">
                        <div className="font-mono text-3xl font-black text-primary">
                            {stats.videos}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                            فيديو وشرح تطبيقي
                        </div>
                    </div>
                    <div className="space-y-1 rounded-2xl border border-border/80 bg-card p-6">
                        <div className="font-mono text-3xl font-black text-primary">
                            {stats.telegramMembers}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                            عضو في مجتمع تيليجرام
                        </div>
                    </div>
                </div>

                {/* Pillars Grid */}
                <div className="mx-auto max-w-4xl space-y-6">
                    <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
                        ركائز ومسارات المبادرة
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {pillars.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={idx}
                                    className="space-y-3 rounded-3xl border border-border/80 bg-card p-6 transition-all hover:border-primary/50 md:p-8"
                                >
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary">
                                        <Icon className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {pillar.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
