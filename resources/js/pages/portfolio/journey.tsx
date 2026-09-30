import { Head } from '@inertiajs/react';
import { Route, Rocket, GraduationCap, Brain, Lightbulb, Calendar } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import type { Journey } from '@/types/portfolio';

interface JourneyProps {
    journey: Journey[];
}

export default function JourneyPage({ journey }: JourneyProps) {
    const getIcon = (iconName: string) => {
        if (iconName.includes('brain')) return Brain;
        if (iconName.includes('graduation')) return GraduationCap;
        if (iconName.includes('lightbulb')) return Lightbulb;
        return Rocket;
    };

    return (
        <PortfolioLayout>
            <Head title="المسار والرحلة المهنية والأكاديمية" />

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-12">
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        المسار والخبرات
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        رحلتي المهنية والأكاديمية
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        خط زمني يوثق مسيرتي في دراسة علوم الحاسوب بجامعة إب، تأسيس مبادرة فكرة مبرمج، وتطوير منصات وتطبيقات حقيقية ناجحة.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:right-6 md:before:right-1/2 before:w-0.5 before:bg-border/80">
                    {journey.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <div
                                key={item.id}
                                className="relative flex flex-col md:flex-row items-start gap-8"
                            >
                                <div className="absolute right-3.5 md:right-1/2 -translate-x-[-50%] size-6 rounded-full bg-primary text-primary-foreground border-4 border-background flex items-center justify-center shadow-md z-10" />

                                <div className="mr-12 md:mr-0 w-full p-6 md:p-8 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all shadow-sm space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                <Icon className="size-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                                                <div className="text-xs text-primary font-semibold">{item.role}</div>
                                            </div>
                                        </div>

                                        <Badge variant="outline" className="w-fit text-xs font-mono">
                                            {item.date_range}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PortfolioLayout>
    );
}
