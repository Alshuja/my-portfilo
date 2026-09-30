import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Cpu } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { TiltCard } from '@/components/portfolio/tilt-card';
import { playClickSound } from '@/components/portfolio/sound-effects';
import { Tech3dLabSection } from '@/components/portfolio/tech-3d-lab-section';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/types/portfolio';

interface SkillsProps {
    skills: Skill[];
}

export default function SkillsPage({ skills }: SkillsProps) {
    const [activeTab, setActiveTab] = useState('all');

    const categories = [
        { id: 'all', label: 'جميع المهارات' },
        { id: 'data-ai', label: 'علوم البيانات والذكاء الاصطناعي' },
        { id: 'programming', label: 'البرمجة وهندسة البرمجيات' },
        { id: 'mobile', label: 'تطوير تطبيقات الهواتف' },
        { id: 'tools', label: 'الأدوات والمنصات وقواعد البيانات' },
    ];

    const filtered =
        activeTab === 'all'
            ? skills
            : skills.filter((s) => s.category === activeTab);

    return (
        <PortfolioLayout>
            <Head title="المهارات والتقنيات البرمجية" />

            <div className="container mx-auto space-y-20 px-4 py-16 sm:px-6 md:py-24">
                {/* Header Section */}
                <div className="max-w-3xl space-y-4">
                    <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                        القدرات والخبرات التقنية
                    </Badge>
                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        المهارات والترسانة البرمجية
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        استعراض تفصيلي للمهارات والتقنيات التي اكتسبتها وطبقتها
                        في بناء نظم سحابية عالية الأداء ونماذج الذكاء الاصطناعي
                        وتطبيقات الهواتف المعتمدة لمشاريع مثل{' '}
                        <strong>سندباد</strong> و<strong>محفظة ريال</strong>{' '}
                        ومبادرة <strong>فكرة مبرمج</strong>.
                    </p>
                </div>

                {/* ============================================================== */}
                {/* 3D MECHANICAL KEYBOARD LAB & CORE TECH WALL                    */}
                {/* ============================================================== */}
                <Tech3dLabSection />

                {/* ============================================================== */}
                {/* INTERACTIVE SKILL MATRIX WITH PROGRESS BARS                    */}
                {/* ============================================================== */}
                <section className="space-y-8 border-t border-border/60 pt-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
                                <Cpu className="size-3.5" />
                                <span>Matrix & Proficiency</span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                                مصفوفة المهارات ومستوى الإتقان
                            </h2>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                                نسب الإتقان الميداني والخبرة العملية في كل مهارة
                                برمجية.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex w-fit flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-card p-1.5 shadow-sm">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        playClickSound(550, 0.02);
                                        setActiveTab(cat.id);
                                    }}
                                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                        activeTab === cat.id
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((skill) => (
                            <TiltCard
                                key={skill.id}
                                maxTilt={8}
                                className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted font-bold text-primary">
                                        <Cpu className="size-5" />
                                    </div>
                                    <span className="font-mono text-sm font-bold text-primary">
                                        {skill.level}%
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-foreground">
                                        {skill.name}
                                    </h3>
                                    <p className="font-mono text-xs text-muted-foreground">
                                        {skill.category === 'data-ai' &&
                                            'Data Science & AI'}
                                        {skill.category === 'programming' &&
                                            'Web & Backend'}
                                        {skill.category === 'mobile' &&
                                            'Mobile Development'}
                                        {skill.category === 'tools' &&
                                            'Database & DevOps'}
                                    </p>
                                </div>

                                {/* Progress bar */}
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${skill.level}%`,
                                            backgroundColor:
                                                skill.color || '#D71916',
                                        }}
                                    />
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </section>
            </div>
        </PortfolioLayout>
    );
}
