import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Eye,
    ExternalLink,
    Github,
    Search,
    ChevronLeft,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { ProjectModal } from '@/components/portfolio/project-modal';
import { ProjectShowcaseCard } from '@/components/portfolio/project-showcase-card';
import { playClickSound } from '@/components/portfolio/sound-effects';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
    projects: Project[];
    categories: Array<{ id: string; label: string }>;
}

export default function ProjectsPage({ projects, categories }: ProjectsProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModalProject, setActiveModalProject] =
        useState<Project | null>(null);

    const filtered = projects.filter((p) => {
        const matchesCategory =
            selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        return matchesCategory && matchesSearch;
    });

    return (
        <PortfolioLayout>
            <Head title="معرض المشاريع والأعمال البرمجية" />

            <ProjectModal
                project={activeModalProject}
                isOpen={!!activeModalProject}
                onClose={() => setActiveModalProject(null)}
            />

            <div className="container mx-auto space-y-12 px-4 py-16 sm:px-6 md:py-24">
                <div className="max-w-3xl space-y-4">
                    <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                        معرض الأعمال
                    </Badge>
                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        المشاريع والأعمال البرمجية
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        استكشف قائمة المشاريع الكاملة في مجالات منصات التجارة
                        الإلكترونية، تطبيقات الهواتف الذكية بـ Flutter، ونماذج
                        الذكاء الاصطناعي وعلم البيانات.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm md:flex-row md:items-center">
                    {/* Category tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setSelectedCategory(cat.id);
                                }}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="بحث في المشاريع أو التقنيات..."
                            className="rounded-xl border-border/80 pr-9 text-xs"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((project) => (
                        <ProjectShowcaseCard
                            key={project.id}
                            project={project}
                            onOpenModal={setActiveModalProject}
                        />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="rounded-3xl border border-border/60 bg-muted/20 p-12 text-center text-muted-foreground">
                        لا توجد مشاريع تطابق البحث الحالي.
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
