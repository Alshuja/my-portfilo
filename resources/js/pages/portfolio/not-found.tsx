import { Head, Link } from '@inertiajs/react';
import { Home, ArrowRight, Compass, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spline3dScene } from '@/components/portfolio/spline-3d-scene';
import { playClickSound } from '@/components/portfolio/sound-effects';
import { fireConfetti } from '@/components/portfolio/confetti';
import { PortfolioLayout } from '@/layouts/portfolio-layout';

export default function NotFound() {
    return (
        <PortfolioLayout>
            <Head title="404 — الصفحة غير موجودة | عبدالرحمن عادل الشجاع" />

            <div
                dir="rtl"
                className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-16"
            >
                {/* Background Ambient Glows */}
                <div className="pointer-events-none absolute top-1/4 right-1/4 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-1/4 left-1/4 -z-10 size-96 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="mx-auto w-full max-w-4xl space-y-10 text-center">
                    {/* 3D 404 Spline Model Viewport */}
                    <div className="mx-auto max-w-xl">
                        <Spline3dScene
                            url="/assets/3d/404.spline"
                            height="380px"
                            hintText="مجسم 404 ثلاثي الأبعاد — حرك بالفأرة للتفاعل"
                        />
                    </div>

                    {/* Headline and Error Message */}
                    <div className="mx-auto max-w-lg space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-bold text-primary">
                            <Terminal className="size-3.5" />
                            ERROR_CODE: 404_PAGE_NOT_FOUND
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
                            عفواً، ضللت{' '}
                            <span className="text-gradient">المسار!</span>
                        </h1>
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            الصفحة أو الرابط الذي تبحث عنه غير متوفر حالياً أو تم
                            نقله. يمكنك العودة للصفحة الرئيسية أو استكشاف
                            المشاريع والخدمات.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Button
                            asChild
                            size="lg"
                            onClick={() => {
                                playClickSound(800, 0.04);
                                fireConfetti();
                            }}
                            className="gap-2 rounded-2xl bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                        >
                            <Link href="/">
                                <Home className="size-4" />
                                العودة للرئيسية
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            onClick={() => playClickSound(650, 0.03)}
                            className="gap-2 rounded-2xl border-border font-semibold hover:bg-secondary"
                        >
                            <Link href="/projects">
                                <Sparkles className="size-4 text-primary" />
                                استكشف المشاريع
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="ghost"
                            size="lg"
                            onClick={() => playClickSound(650, 0.03)}
                            className="gap-2 rounded-2xl font-semibold text-muted-foreground hover:text-foreground"
                        >
                            <Link href="/services">
                                <Compass className="size-4" />
                                دليل الخدمات
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
