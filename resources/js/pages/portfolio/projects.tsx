import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Eye, ExternalLink, Github, Search, ChevronLeft } from 'lucide-react';
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
    const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

    const filtered = projects.filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-12">
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        معرض الأعمال
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        المشاريع والأعمال البرمجية
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        استكشف قائمة المشاريع الكاملة في مجالات منصات التجارة الإلكترونية، تطبيقات الهواتف الذكية بـ Flutter، ونماذج الذكاء الاصطناعي وعلم البيانات.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-sm">
                    {/* Category tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setSelectedCategory(cat.id);
                                }}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <Search className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="بحث في المشاريع أو التقنيات..."
                            className="pr-9 rounded-xl border-border/80 text-xs"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((project) => (
                        <ProjectShowcaseCard
                            key={project.id}
                            project={project}
                            onOpenModal={setActiveModalProject}
                        />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-3xl border border-border/60">
                        لا توجد مشاريع تطابق البحث الحالي.
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
