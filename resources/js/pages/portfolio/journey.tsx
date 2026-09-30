import { Head } from '@inertiajs/react';
import {
    Route,
    Rocket,
    GraduationCap,
    Brain,
    Lightbulb,
    Calendar,
} from 'lucide-react';
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

            <div className="container mx-auto space-y-12 px-4 py-16 sm:px-6 md:py-24">
                <div className="max-w-3xl space-y-4">
                    <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                        المسار والخبرات
                    </Badge>
                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        رحلتي المهنية والأكاديمية
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        خط زمني يوثق مسيرتي في دراسة علوم الحاسوب بجامعة إب،
                        تأسيس مبادرة فكرة مبرمج، وتطوير منصات وتطبيقات حقيقية
                        ناجحة.
                    </p>
                </div>

                <div className="relative mx-auto max-w-4xl space-y-8 before:absolute before:inset-0 before:right-6 before:w-0.5 before:bg-border/80 md:before:right-1/2">
                    {journey.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <div
                                key={item.id}
                                className="relative flex flex-col items-start gap-8 md:flex-row"
                            >
                                <div className="absolute right-3.5 z-10 flex size-6 -translate-x-[-50%] items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md md:right-1/2" />

                                <div className="mr-12 w-full space-y-3 rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 md:mr-0 md:p-8">
                                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary">
                                                <Icon className="size-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-foreground">
                                                    {item.title}
                                                </h3>
                                                <div className="text-xs font-semibold text-primary">
                                                    {item.role}
                                                </div>
                                            </div>
                                        </div>

                                        <Badge
                                            variant="outline"
                                            className="w-fit font-mono text-xs"
                                        >
                                            {item.date_range}
                                        </Badge>
                                    </div>

                                    <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
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
