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

export default function ProjectShowPage({
    project,
    relatedProjects,
}: ProjectShowProps) {
    // Combine primary image and gallery images into a single list
    const galleryImages = [
        ...(project.image ? [project.image] : []),
        ...(project.gallery && Array.isArray(project.gallery)
            ? project.gallery
            : []),
    ];
    // Remove duplicates
    const uniqueImages = Array.from(new Set(galleryImages));

    const [activeImage, setActiveImage] = useState<string>(
        uniqueImages[0] ||
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
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
            void navigator.clipboard.writeText(window.location.href);
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
                {project.image && (
                    <meta property="og:image" content={project.image} />
                )}
            </Head>

            <article className="container mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 md:py-20">
                {/* Top Navigation & Breadcrumb */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="-mr-2 gap-2 text-muted-foreground hover:text-foreground"
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
                        className="gap-2 rounded-xl border-border/80 text-xs transition-colors hover:bg-primary/10 hover:text-primary"
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
                        <Badge className="border border-primary/30 bg-primary/15 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                            {project.category_label}
                        </Badge>
                        {project.is_featured && (
                            <Badge className="border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                                ★ مشروع مميز
                            </Badge>
                        )}
                        <span className="mr-auto flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                            <Calendar className="size-3.5 text-primary" />
                            {project.date_range}
                        </span>
                    </div>

                    <h1 className="text-3xl leading-[1.2] font-black tracking-tight text-foreground sm:text-5xl">
                        {project.title}
                    </h1>

                    <p className="rounded-2xl border border-border/70 bg-card/60 p-6 text-base leading-relaxed text-muted-foreground shadow-sm backdrop-blur-sm sm:text-lg">
                        {project.brief}
                    </p>
                </div>

                {/* Meta details strip (Role, Client, Category, Period) */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm md:grid-cols-4">
                    {project.role && (
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Briefcase className="size-3.5 text-primary" />
                                الدور المنفّذ
                            </div>
                            <div className="line-clamp-2 text-sm font-bold text-foreground">
                                {project.role}
                            </div>
                        </div>
                    )}
                    {project.client && (
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Building2 className="size-3.5 text-primary" />
                                الجهة / العميل
                            </div>
                            <div className="line-clamp-2 text-sm font-bold text-foreground">
                                {project.client}
                            </div>
                        </div>
                    )}
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Layers className="size-3.5 text-primary" />
                            التصنيف التقني
                        </div>
                        <div className="text-sm font-bold text-foreground">
                            {project.category_label}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="size-3.5 text-primary" />
                            فترة الإنجاز
                        </div>
                        <div className="font-mono text-sm font-bold text-foreground">
                            {project.date_range}
                        </div>
                    </div>
                </div>

                {/* Interactive Gallery */}
                <div className="space-y-4">
                    <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-xl">
                        <img
                            src={activeImage}
                            alt={project.title}
                            className="size-full object-cover transition-all duration-500"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                            }}
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="rounded-xl bg-black/50 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
                                معاينة اللقطة المختارة من المشروع
                            </span>
                        </div>
                    </div>

                    {/* Thumbnail strip */}
                    {uniqueImages.length > 1 && (
                        <div className="flex scrollbar-thin items-center gap-3 overflow-x-auto pb-2">
                            {uniqueImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        playClickSound(600, 0.02);
                                        setActiveImage(img);
                                    }}
                                    className={`relative size-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 sm:size-24 ${
                                        activeImage === img
                                            ? 'scale-95 border-primary shadow-md ring-2 ring-primary/30'
                                            : 'border-border/80 opacity-70 hover:border-primary/50 hover:opacity-100'
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
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 rounded-2xl font-bold shadow-lg shadow-primary/20"
                        >
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="size-4" />
                                زيارة المنصة / المعاينة الحية
                            </a>
                        </Button>
                    )}
                    {project.github_url && project.github_url !== '#' && (
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="gap-2 rounded-2xl border-border/80 font-bold"
                        >
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="size-4" />
                                الكود على GitHub
                            </a>
                        </Button>
                    )}
                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="gap-2 rounded-2xl text-muted-foreground hover:text-foreground"
                    >
                        <Link
                            href={`/contact?subject=${encodeURIComponent('استفسار حول مشروع ' + project.title)}`}
                        >
                            <MessageSquare className="size-4" />
                            طلب مشروع مشابه
                        </Link>
                    </Button>
                </div>

                {/* Problem & Solution Dual Architectural Breakdown */}
                {(project.problem || project.solution) && (
                    <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
                        {project.problem && (
                            <div className="relative space-y-4 rounded-3xl border border-rose-500/20 bg-rose-500/[0.03] p-6 shadow-sm sm:p-8 dark:bg-rose-950/[0.1]">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                                    <AlertCircle className="size-6" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                                        المشكلة والتحدي
                                    </h2>
                                    <div className="font-mono text-xs text-rose-600 dark:text-rose-400">
                                        The Challenge & Friction Points
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground sm:text-base">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {project.solution && (
                            <div className="relative space-y-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 shadow-sm sm:p-8 dark:bg-emerald-950/[0.1]">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <Sparkles className="size-6" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                                        الحل المبتكر والمعمارية
                                    </h2>
                                    <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                                        Innovative Architecture & Solution
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground sm:text-base">
                                    {project.solution}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Key Features Grid */}
                {project.features &&
                    Array.isArray(project.features) &&
                    project.features.length > 0 && (
                        <div className="space-y-6 pt-4">
                            <div className="space-y-1">
                                <Badge
                                    variant="outline"
                                    className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                                >
                                    الخصائص الهندسية
                                </Badge>
                                <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                                    أبرز مميزات النظام والوظائف
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {project.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex items-start gap-3.5 rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                                    >
                                        <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <CheckCircle2 className="size-4" />
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-foreground/90 sm:text-sm">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/* Tech Stack Pills */}
                {project.tags && project.tags.length > 0 && (
                    <div className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                            <span className="size-2 animate-pulse rounded-full bg-primary" />
                            التقنيات والمكتبات المستخدمة
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-xl border border-border/60 bg-muted px-3 py-1.5 font-mono text-xs font-semibold text-foreground/90 transition-colors hover:border-primary/50 hover:bg-primary/5"
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
                        <div className="prose dark:prose-invert max-w-none rounded-3xl border border-border/70 bg-card/40 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8 sm:text-base">
                            <p className="whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Related Projects */}
                {relatedProjects && relatedProjects.length > 0 && (
                    <div className="space-y-6 border-t border-border/70 pt-12">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Badge
                                    variant="outline"
                                    className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                                >
                                    تصفح المزيد
                                </Badge>
                                <h2 className="text-2xl font-black text-foreground">
                                    مشاريع أخرى ذات صلة
                                </h2>
                            </div>

                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-primary"
                            >
                                <Link href="/projects">
                                    عرض كل المشاريع
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedProjects.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/projects/${rel.slug}`}
                                    className="group block overflow-hidden rounded-2xl border border-border/80 bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                                >
                                    {rel.image && (
                                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                            <img
                                                src={rel.image}
                                                alt={rel.title}
                                                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-2 p-4">
                                        <div className="font-mono text-[11px] font-semibold text-primary">
                                            {rel.category_label}
                                        </div>
                                        <h3 className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                                            {rel.title}
                                        </h3>
                                        <p className="line-clamp-2 text-xs text-muted-foreground">
                                            {rel.brief}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Callout */}
                <div className="space-y-4 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 text-center sm:p-10">
                    <h3 className="text-2xl font-black text-foreground sm:text-3xl">
                        هل تبحث عن بناء منصة أو تطبيق مماثل؟
                    </h3>
                    <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
                        يسعدني دائماً مناقشة الأفكار البرمجية الجديدة وتحويلها إلى
                        حلول رقمية عملية وناجحة تخدم أهدافك.
                    </p>
                    <div className="pt-2">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-2xl px-8 font-bold shadow-lg shadow-primary/25"
                        >
                            <Link href="/contact">ابدأ محادثة الآن</Link>
                        </Button>
                    </div>
                </div>
            </article>
        </PortfolioLayout>
    );
}
