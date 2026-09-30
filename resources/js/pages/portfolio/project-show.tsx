import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ExternalLink,
    Github,
    Calendar,
    Briefcase,
    Building2,
    CheckCircle2,
    AlertCircle,
    Layers,
    Share2,
    Sparkles,
    Check,
    MessageSquare,
    Eye,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { Project } from '@/types/portfolio';

interface ProjectShowProps {
    project: Project;
    relatedProjects: Project[];
}

export default function ProjectShowPage({ project, relatedProjects }: ProjectShowProps) {
    // Combine primary image and gallery images into a single list
    const galleryImages = [
        ...(project.image ? [project.image] : []),
        ...(project.gallery && Array.isArray(project.gallery) ? project.gallery : []),
    ];
    // Remove duplicates
    const uniqueImages = Array.from(new Set(galleryImages));

    const [activeImage, setActiveImage] = useState<string>(
        uniqueImages[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    );
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator
                .share({
                    title: project.title,
                    text: project.brief,
                    url: window.location.href,
                })
                .catch(() => {});
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>{`${project.title} | مشاريع م. عبدالرحمن عادل الشجاع`}</title>
                <meta name="description" content={project.brief} />
                <meta property="og:title" content={project.title} />
                <meta property="og:description" content={project.brief} />
                {project.image && <meta property="og:image" content={project.image} />}
            </Head>

            <article className="container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-5xl space-y-12">
                {/* Top Navigation & Breadcrumb */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground -mr-2"
                        onClick={() => playClickSound(500, 0.03)}
                    >
                        <Link href="/projects">
                            <ArrowRight className="size-4" />
                            العودة إلى معرض المشاريع
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="gap-2 rounded-xl text-xs border-border/80 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="size-3.5 text-emerald-500" />
                                تم نسخ الرابط!
                            </>
                        ) : (
                            <>
                                <Share2 className="size-3.5" />
                                مشاركة المشروع
                            </>
                        )}
                    </Button>
                </div>

                {/* Project Header */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <Badge className="bg-primary/15 text-primary border border-primary/30 px-3.5 py-1 text-xs font-semibold backdrop-blur-sm">
                            {project.category_label}
                        </Badge>
                        {project.is_featured && (
                            <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1">
                                ★ مشروع مميز
                            </Badge>
                        )}
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 mr-auto">
                            <Calendar className="size-3.5 text-primary" />
                            {project.date_range}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.2]">
                        {project.title}
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed bg-card/60 p-6 rounded-2xl border border-border/70 backdrop-blur-sm shadow-sm">
                        {project.brief}
                    </p>
                </div>

                {/* Meta details strip (Role, Client, Category, Period) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-card border border-border/70 shadow-sm">
                    {project.role && (
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <Briefcase className="size-3.5 text-primary" />
                                الدور المنفّذ
                            </div>
                            <div className="text-sm font-bold text-foreground line-clamp-2">
                                {project.role}
                            </div>
                        </div>
                    )}
                    {project.client && (
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <Building2 className="size-3.5 text-primary" />
                                الجهة / العميل
                            </div>
                            <div className="text-sm font-bold text-foreground line-clamp-2">
                                {project.client}
                            </div>
                        </div>
                    )}
                    <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Layers className="size-3.5 text-primary" />
                            التصنيف التقني
                        </div>
                        <div className="text-sm font-bold text-foreground">
                            {project.category_label}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary" />
                            فترة الإنجاز
                        </div>
                        <div className="text-sm font-bold font-mono text-foreground">
                            {project.date_range}
                        </div>
                    </div>
                </div>

                {/* Interactive Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-xl group">
                        <img
                            src={activeImage}
                            alt={project.title}
                            className="size-full object-cover transition-all duration-500"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <span className="text-white text-xs font-mono bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-md">
                                معاينة اللقطة المختارة من المشروع
                            </span>
                        </div>
                    </div>

                    {/* Thumbnail strip */}
                    {uniqueImages.length > 1 && (
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                            {uniqueImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        playClickSound(600, 0.02);
                                        setActiveImage(img);
                                    }}
                                    className={`relative size-20 sm:size-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                                        activeImage === img
                                            ? 'border-primary ring-2 ring-primary/30 scale-95 shadow-md'
                                            : 'border-border/80 opacity-70 hover:opacity-100 hover:border-primary/50'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${project.title} - ${idx + 1}`}
                                        className="size-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.live_url && project.live_url !== '#' && (
                        <Button asChild size="lg" className="gap-2 rounded-2xl font-bold shadow-lg shadow-primary/20">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-4" />
                                زيارة المنصة / المعاينة الحية
                            </a>
                        </Button>
                    )}
                    {project.github_url && project.github_url !== '#' && (
                        <Button asChild variant="outline" size="lg" className="gap-2 rounded-2xl border-border/80 font-bold">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="size-4" />
                                الكود على GitHub
                            </a>
                        </Button>
                    )}
                    <Button asChild variant="ghost" size="lg" className="gap-2 rounded-2xl text-muted-foreground hover:text-foreground">
                        <Link href={`/contact?subject=${encodeURIComponent('استفسار حول مشروع ' + project.title)}`}>
                            <MessageSquare className="size-4" />
                            طلب مشروع مشابه
                        </Link>
                    </Button>
                </div>

                {/* Problem & Solution Dual Architectural Breakdown */}
                {(project.problem || project.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {project.problem && (
                            <div className="relative p-6 sm:p-8 rounded-3xl border border-rose-500/20 bg-rose-500/[0.03] dark:bg-rose-950/[0.1] space-y-4 shadow-sm">
                                <div className="size-11 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                                    <AlertCircle className="size-6" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                        المشكلة والتحدي
                                    </h2>
                                    <div className="text-xs font-mono text-rose-600 dark:text-rose-400">
                                        The Challenge & Friction Points
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {project.solution && (
                            <div className="relative p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] dark:bg-emerald-950/[0.1] space-y-4 shadow-sm">
                                <div className="size-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <Sparkles className="size-6" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                        الحل المبتكر والمعمارية
                                    </h2>
                                    <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                                        Innovative Architecture & Solution
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project.solution}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Key Features Grid */}
                {project.features && Array.isArray(project.features) && project.features.length > 0 && (
                    <div className="space-y-6 pt-4">
                        <div className="space-y-1">
                            <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                                الخصائص الهندسية
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                                أبرز مميزات النظام والوظائف
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all hover:shadow-md flex items-start gap-3.5 group"
                                >
                                    <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <CheckCircle2 className="size-4" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tech Stack Pills */}
                {project.tags && project.tags.length > 0 && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4">
                        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary animate-pulse" />
                            التقنيات والمكتبات المستخدمة
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 rounded-xl bg-muted border border-border/60 text-xs font-mono font-semibold text-foreground/90 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full Narrative Description */}
                {project.description && (
                    <div className="space-y-4 pt-4">
                        <h2 className="text-2xl font-bold text-foreground">
                            عن المشروع بالتفصيل
                        </h2>
                        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base bg-card/40 p-6 sm:p-8 rounded-3xl border border-border/70">
                            <p className="whitespace-pre-line">{project.description}</p>
                        </div>
                    </div>
                )}

                {/* Related Projects */}
                {relatedProjects && relatedProjects.length > 0 && (
                    <div className="space-y-6 pt-12 border-t border-border/70">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                                    تصفح المزيد
                                </Badge>
                                <h2 className="text-2xl font-black text-foreground">
                                    مشاريع أخرى ذات صلة
                                </h2>
                            </div>

                            <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
                                <Link href="/projects">
                                    عرض كل المشاريع
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProjects.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/projects/${rel.slug}`}
                                    className="group block rounded-2xl border border-border/80 bg-card overflow-hidden hover:border-primary/60 transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    {rel.image && (
                                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                            <img
                                                src={rel.image}
                                                alt={rel.title}
                                                className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4 space-y-2">
                                        <div className="text-[11px] font-mono text-primary font-semibold">
                                            {rel.category_label}
                                        </div>
                                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                            {rel.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {rel.brief}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Callout */}
                <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 text-center space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                        هل تبحث عن بناء منصة أو تطبيق مماثل؟
                    </h3>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                        يسعدني دائماً مناقشة الأفكار البرمجية الجديدة وتحويلها إلى حلول رقمية عملية وناجحة تخدم أهدافك.
                    </p>
                    <div className="pt-2">
                        <Button asChild size="lg" className="rounded-2xl font-bold px-8 shadow-lg shadow-primary/25">
                            <Link href="/contact">
                                ابدأ محادثة الآن
                            </Link>
                        </Button>
                    </div>
                </div>
            </article>
        </PortfolioLayout>
    );
}
