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

    const filtered = activeTab === 'all'
        ? skills
        : skills.filter((s) => s.category === activeTab);

    return (
        <PortfolioLayout>
            <Head title="المهارات والتقنيات البرمجية" />

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-20">
                {/* Header Section */}
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        القدرات والخبرات التقنية
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        المهارات والترسانة البرمجية
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        استعراض تفصيلي للمهارات والتقنيات التي اكتسبتها وطبقتها في بناء نظم سحابية عالية الأداء ونماذج الذكاء الاصطناعي وتطبيقات الهواتف المعتمدة لمشاريع مثل <strong>سندباد</strong> و<strong>محفظة ريال</strong> ومبادرة <strong>فكرة مبرمج</strong>.
                    </p>
                </div>

                {/* ============================================================== */}
                {/* 3D MECHANICAL KEYBOARD LAB & CORE TECH WALL                    */}
                {/* ============================================================== */}
                <Tech3dLabSection />

                {/* ============================================================== */}
                {/* INTERACTIVE SKILL MATRIX WITH PROGRESS BARS                    */}
                {/* ============================================================== */}
                <section className="space-y-8 pt-8 border-t border-border/60">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                                <Cpu className="size-3.5" />
                                <span>Matrix & Proficiency</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                                مصفوفة المهارات ومستوى الإتقان
                            </h2>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                نسب الإتقان الميداني والخبرة العملية في كل مهارة برمجية.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-card border border-border/80 shadow-sm w-fit">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        playClickSound(550, 0.02);
                                        setActiveTab(cat.id);
                                    }}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                        activeTab === cat.id
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((skill) => (
                            <TiltCard
                                key={skill.id}
                                maxTilt={8}
                                className="p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="size-10 rounded-xl bg-muted flex items-center justify-center font-bold text-primary">
                                        <Cpu className="size-5" />
                                    </div>
                                    <span className="text-sm font-mono font-bold text-primary">
                                        {skill.level}%
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-bold text-base text-foreground">{skill.name}</h3>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {skill.category === 'data-ai' && 'Data Science & AI'}
                                        {skill.category === 'programming' && 'Web & Backend'}
                                        {skill.category === 'mobile' && 'Mobile Development'}
                                        {skill.category === 'tools' && 'Database & DevOps'}
                                    </p>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${skill.level}%`,
                                            backgroundColor: skill.color || '#D71916',
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
