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

            <div dir="rtl" className="min-h-[85vh] flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/4 right-1/4 size-96 rounded-full bg-primary/15 blur-3xl pointer-events-none -z-10" />
                <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none -z-10" />

                <div className="max-w-4xl w-full mx-auto space-y-10 text-center">
                    {/* 3D 404 Spline Model Viewport */}
                    <div className="max-w-xl mx-auto">
                        <Spline3dScene
                            url="/assets/3d/404.spline"
                            height="380px"
                            hintText="مجسم 404 ثلاثي الأبعاد — حرك بالفأرة للتفاعل"
                        />
                    </div>

                    {/* Headline and Error Message */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary">
                            <Terminal className="size-3.5" />
                            ERROR_CODE: 404_PAGE_NOT_FOUND
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
                            عفواً، ضللت <span className="text-gradient">المسار!</span>
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            الصفحة أو الرابط الذي تبحث عنه غير متوفر حالياً أو تم نقله. يمكنك العودة للصفحة الرئيسية أو استكشاف المشاريع والخدمات.
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
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25 rounded-2xl gap-2"
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
                            className="border-border hover:bg-secondary font-semibold rounded-2xl gap-2"
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
                            className="text-muted-foreground hover:text-foreground font-semibold rounded-2xl gap-2"
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
