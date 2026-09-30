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

export default function ProgrammerIdeaPage({ settings, stats }: ProgrammerIdeaProps) {
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

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16">
                {/* Hero Banner */}
                <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-8 md:p-14 shadow-xl space-y-6 text-center max-w-4xl mx-auto">
                    <div className="size-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto shadow-lg shadow-primary/20">
                        <GraduationCap className="size-8" />
                    </div>

                    <div className="space-y-3">
                        <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                            المبادرة التعليمية
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                            منصة ومبادرة "فكرة مبرمج"
                        </h1>
                        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            مجتمع إلهام وتعلّم لرواد التقنية بإشراف المهندس عبدالرحمن عادل الشجاع. شروحات بايثون، علم البيانات، فلاتر، وتطوير البرمجيات باللغة العربية.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-md">
                            <a href="https://t.me/Alshuja_ai" target="_blank" rel="noopener noreferrer">
                                <Send className="size-4" />
                                قناة التليجرام الرسمية
                            </a>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="rounded-xl border-border/80 gap-2">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <Youtube className="size-4 text-red-500" />
                                قناة اليوتيوب
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
                        <div className="text-3xl font-black text-primary font-mono">{stats.students}</div>
                        <div className="text-xs text-muted-foreground font-medium">طالب ومبرمج مستفيد</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
                        <div className="text-3xl font-black text-primary font-mono">{stats.courses}</div>
                        <div className="text-xs text-muted-foreground font-medium">مسار ودورة تدريبية</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
                        <div className="text-3xl font-black text-primary font-mono">{stats.videos}</div>
                        <div className="text-xs text-muted-foreground font-medium">فيديو وشرح تطبيقي</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-1">
                        <div className="text-3xl font-black text-primary font-mono">{stats.telegramMembers}</div>
                        <div className="text-xs text-muted-foreground font-medium">عضو في مجتمع تيليجرام</div>
                    </div>
                </div>

                {/* Pillars Grid */}
                <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
                        ركائز ومسارات المبادرة
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all space-y-3"
                                >
                                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        <Icon className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground">{pillar.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
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
