import { useState } from 'react';
import { Spline3dScene } from './spline-3d-scene';
import { playMechanicalPress, playMechanicalRelease, playClickSound } from './sound-effects';
import { CoreTechWall } from './core-tech-wall';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Terminal, Cpu, Layers, Keyboard, Volume2, ShieldCheck, Zap } from 'lucide-react';

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

    const currentSkill = keyCapSkills.find((s) => s.id === activeTech) || keyCapSkills[0];

    return (
        <section id="3d-lab" className="py-20 sm:py-28 relative overflow-hidden bg-muted/15 border-t border-border/70">
            {/* Ambient Glows */}
            <div className="absolute top-1/3 right-10 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 size-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 space-y-12">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-1.5 text-xs font-semibold gap-2">
                        <Sparkles className="size-3.5" />
                        المختبر التفاعلي ثلاثي الأبعاد — 3D Mechanical Lab
                    </Badge>
                    <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                        تجربة لوحة المفاتيح <span className="text-gradient">ثلاثية الأبعاد</span>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        نموذج Spline 3D حي وتفاعلي يجسد المهارات الهندسية ومفاتيح البرمجة. حرك المجسم بحرية، واضغط على الأزرار لسماع النقر الميكانيكي الحقيقي المقتبس من التصميم السابق.
                    </p>
                </div>

                {/* 3D Scene Viewport */}
                <div className="max-w-5xl mx-auto">
                    <Spline3dScene
                        url="/assets/3d/skills-keyboard.spline"
                        height="580px"
                        hintText="حرك المجسم ثلاثي الأبعاد أو اضغط على مفاتيح الكيبورد الفيزيائي"
                    />
                </div>

                {/* Interactive Keycap Selector Strip */}
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-2">
                            <Keyboard className="size-4 text-primary" />
                            مفاتيح التقنيات السريعة (اضغط للتفاصيل):
                        </span>
                        <span className="hidden sm:inline">صوت ميكانيكي حقيقي مزامن</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
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
                                    className={`relative p-3 rounded-2xl border text-right transition-all duration-200 active:translate-y-1 shadow-sm ${
                                        isSelected
                                            ? 'bg-card border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/10'
                                            : 'bg-card/70 hover:bg-card border-border/80 hover:border-primary/40'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="px-2 py-0.5 rounded-lg bg-muted text-xs font-mono font-black text-primary border border-border/60">
                                            {skill.keycap}
                                        </span>
                                        <span className={`size-2 rounded-full ${isSelected ? 'bg-primary animate-pulse' : 'bg-muted-foreground/40'}`} />
                                    </div>
                                    <div className="text-xs font-bold text-foreground truncate">{skill.name}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{skill.category}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Skill Telemetry Box */}
                    <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-1.5 max-w-2xl">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-mono font-black border border-primary/20">
                                    KEYCAP: {currentSkill.keycap}
                                </span>
                                <h3 className="text-lg font-black text-foreground">{currentSkill.name}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {currentSkill.desc}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono shrink-0">
                            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                                <Zap className="size-4" />
                                <span>WebGL 2.0</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-primary font-bold">
                                <Volume2 className="size-4" />
                                <span>Mechanical Click</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                                <ShieldCheck className="size-4" />
                                <span>Spline 3D</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D Glowing Tech Wall (Core Tech Stack) */}
                <div className="max-w-5xl mx-auto pt-4">
                    <CoreTechWall />
                </div>
            </div>
        </section>
    );
}
