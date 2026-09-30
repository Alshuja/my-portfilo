import { useState } from 'react';
import { Spline3dScene } from './spline-3d-scene';
import {
    playMechanicalPress,
    playMechanicalRelease,
    playClickSound,
} from './sound-effects';
import { CoreTechWall } from './core-tech-wall';
import { Badge } from '@/components/ui/badge';
import {
    Sparkles,
    Terminal,
    Cpu,
    Layers,
    Keyboard,
    Volume2,
    ShieldCheck,
    Zap,
} from 'lucide-react';

export function Tech3dLabSection() {
    const [activeTech, setActiveTech] = useState<string>('python');

    const keyCapSkills = [
        {
            id: 'python',
            name: 'Python & AI',
            keycap: 'PY',
            category: 'علوم البيانات والذكاء الاصطناعي',
            color: 'from-blue-600 to-amber-500',
            desc: 'نماذج تعلم الآلة، تحليل البيانات بـ Pandas/NumPy، ومعالجة اللغات الطبيعية.',
        },
        {
            id: 'flutter',
            name: 'Flutter & Dart',
            keycap: 'FL',
            category: 'تطبيقات الهواتف الذكية',
            color: 'from-sky-500 to-blue-600',
            desc: 'تطبيقات هجينة فائقة السرعة لنظامي Android و iOS بكود واحد وتجربة مستخدم سلسة.',
        },
        {
            id: 'laravel',
            name: 'Laravel & PHP',
            keycap: 'LV',
            category: 'الأنظمة والواجهات الخلفية',
            color: 'from-red-600 to-rose-700',
            desc: 'بناء منصات متينة، واجهات RESTful APIs، ومعالجة المهام الخلفية وقواعد البيانات.',
        },
        {
            id: 'react',
            name: 'React & Inertia',
            keycap: 'RC',
            category: 'تطوير واجهات الويب',
            color: 'from-cyan-500 to-blue-500',
            desc: 'واجهات أحادية الصفحة (SPA) عصرية ومترابطة بأحدث معايير React 19 و TypeScript.',
        },
        {
            id: 'docker',
            name: 'Docker & DevOps',
            keycap: 'DK',
            category: 'البنى التحتية السحابية',
            color: 'from-blue-500 to-indigo-600',
            desc: 'حاويات معزولة للنشر السحابي، خطوط تكامل مستمر CI/CD، وإدارة الخوادم.',
        },
        {
            id: 'db',
            name: 'Postgres & Redis',
            keycap: 'DB',
            category: 'قواعد البيانات والتخزين المؤقت',
            color: 'from-emerald-500 to-teal-600',
            desc: 'تصميم مخططات قواعد البيانات عالية الكفاءة مع التخزين المؤقت فائق السرعة.',
        },
    ];

    const currentSkill =
        keyCapSkills.find((s) => s.id === activeTech) || keyCapSkills[0];

    return (
        <section
            id="3d-lab"
            className="relative overflow-hidden border-t border-border/70 bg-muted/15 py-20 sm:py-28"
        >
            {/* Ambient Glows */}
            <div className="pointer-events-none absolute top-1/3 right-10 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 left-10 -z-10 size-96 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="container mx-auto space-y-12 px-4 sm:px-6">
                {/* Header */}
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                    <Badge
                        variant="outline"
                        className="gap-2 border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary"
                    >
                        <Sparkles className="size-3.5" />
                        المختبر التفاعلي ثلاثي الأبعاد — 3D Mechanical Lab
                    </Badge>
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        تجربة لوحة المفاتيح{' '}
                        <span className="text-gradient">ثلاثية الأبعاد</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        نموذج Spline 3D حي وتفاعلي يجسد المهارات الهندسية
                        ومفاتيح البرمجة. حرك المجسم بحرية، واضغط على الأزرار
                        لسماع النقر الميكانيكي الحقيقي المقتبس من التصميم
                        السابق.
                    </p>
                </div>

                {/* 3D Scene Viewport */}
                <div className="mx-auto max-w-5xl">
                    <Spline3dScene
                        url="/assets/3d/skills-keyboard.spline"
                        height="580px"
                        hintText="حرك المجسم ثلاثي الأبعاد أو اضغط على مفاتيح الكيبورد الفيزيائي"
                    />
                </div>

                {/* Interactive Keycap Selector Strip */}
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Keyboard className="size-4 text-primary" />
                            مفاتيح التقنيات السريعة (اضغط للتفاصيل):
                        </span>
                        <span className="hidden sm:inline">
                            صوت ميكانيكي حقيقي مزامن
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                        {keyCapSkills.map((skill) => {
                            const isSelected = activeTech === skill.id;
                            return (
                                <button
                                    key={skill.id}
                                    type="button"
                                    onMouseDown={() => {
                                        playMechanicalPress();
                                        setActiveTech(skill.id);
                                    }}
                                    onMouseUp={() => playMechanicalRelease()}
                                    className={`relative rounded-2xl border p-3 text-right shadow-sm transition-all duration-200 active:translate-y-1 ${
                                        isSelected
                                            ? 'border-primary bg-card shadow-lg ring-2 shadow-primary/10 ring-primary/30'
                                            : 'border-border/80 bg-card/70 hover:border-primary/40 hover:bg-card'
                                    }`}
                                >
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <span className="rounded-lg border border-border/60 bg-muted px-2 py-0.5 font-mono text-xs font-black text-primary">
                                            {skill.keycap}
                                        </span>
                                        <span
                                            className={`size-2 rounded-full ${isSelected ? 'animate-pulse bg-primary' : 'bg-muted-foreground/40'}`}
                                        />
                                    </div>
                                    <div className="truncate text-xs font-bold text-foreground">
                                        {skill.name}
                                    </div>
                                    <div className="truncate text-[10px] text-muted-foreground">
                                        {skill.category}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Skill Telemetry Box */}
                    <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur-md md:flex-row md:items-center">
                        <div className="max-w-2xl space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-black text-primary">
                                    KEYCAP: {currentSkill.keycap}
                                </span>
                                <h3 className="text-lg font-black text-foreground">
                                    {currentSkill.name}
                                </h3>
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                {currentSkill.desc}
                            </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-4 font-mono text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                                <Zap className="size-4" />
                                <span>WebGL 2.0</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-bold text-primary">
                                <Volume2 className="size-4" />
                                <span>Mechanical Click</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-bold text-amber-500">
                                <ShieldCheck className="size-4" />
                                <span>Spline 3D</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D Glowing Tech Wall (Core Tech Stack) */}
                <div className="mx-auto max-w-5xl pt-4">
                    <CoreTechWall />
                </div>
            </div>
        </section>
    );
}
