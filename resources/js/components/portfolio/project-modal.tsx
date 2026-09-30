import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ExternalLink,
    Github,
    Calendar,
    Layers,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    User,
    Briefcase,
    ArrowLeft,
} from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { playClickSound } from './sound-effects';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    if (!project) return null;

    const allImages = [
        ...(project.image ? [project.image] : []),
        ...(project.gallery && Array.isArray(project.gallery)
            ? project.gallery
            : []),
    ].filter((img, idx, arr) => arr.indexOf(img) === idx);

    const currentImg =
        allImages[activeImageIndex] ||
        project.image ||
        '/images/placeholder.jpg';

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto rounded-3xl border border-border/80 bg-card/95 p-0 shadow-2xl backdrop-blur-2xl">
                {/* Hero Image & Gallery Bar */}
                <div className="relative w-full overflow-hidden bg-muted">
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={currentImg}
                            alt={project.title}
                            className="size-full object-cover transition-all duration-500"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                            }}
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className="border-none bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                            {project.category_label || 'مشروع برمجي'}
                        </Badge>
                        {project.is_featured && (
                            <Badge className="border-none bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
                                ★ مشروع رئيسي
                            </Badge>
                        )}
                    </div>

                    {/* Gallery Thumbnails Strip */}
                    {allImages.length > 1 && (
                        <div className="absolute right-4 bottom-3 left-4 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/20 bg-black/50 p-1.5 backdrop-blur-md">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        playClickSound(650, 0.02);
                                        setActiveImageIndex(idx);
                                    }}
                                    className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                                        activeImageIndex === idx
                                            ? 'scale-105 border-primary shadow-md'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                    {/* Header */}
                    <DialogHeader className="space-y-2 text-right">
                        <DialogTitle className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                            {project.title}
                        </DialogTitle>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground sm:text-sm">
                            <span className="flex items-center gap-1.5 font-mono">
                                <Calendar className="size-3.5 text-primary" />
                                {project.date_range}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <Layers className="size-3.5 text-primary" />
                                {project.category_label}
                            </span>
                            {project.client && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase className="size-3.5 text-amber-500" />
                                        {project.client}
                                    </span>
                                </>
                            )}
                            {project.role && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="size-3.5 text-emerald-500" />
                                        {project.role}
                                    </span>
                                </>
                            )}
                        </div>
                    </DialogHeader>

                    {/* Brief Note */}
                    <DialogDescription className="rounded-2xl border border-border/80 bg-muted/40 p-4 text-right text-base leading-relaxed font-medium text-foreground/90 sm:p-5">
                        {project.brief}
                    </DialogDescription>

                    {/* Problem & Solution Architecture (if available) */}
                    {(project.problem || project.solution) && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {project.problem && (
                                <div className="space-y-2 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-right sm:p-5">
                                    <h4 className="flex items-center justify-end gap-1.5 text-xs font-bold tracking-wider text-red-600 uppercase dark:text-red-400">
                                        التحدي والمشكلة
                                        <AlertCircle className="size-4" />
                                    </h4>
                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {project.problem}
                                    </p>
                                </div>
                            )}

                            {project.solution && (
                                <div className="space-y-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-right sm:p-5">
                                    <h4 className="flex items-center justify-end gap-1.5 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                                        الحل التقني والهندسي
                                        <CheckCircle2 className="size-4" />
                                    </h4>
                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {project.solution}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Features List (if available) */}
                    {project.features &&
                        Array.isArray(project.features) &&
                        project.features.length > 0 && (
                            <div className="space-y-3 text-right">
                                <h4 className="flex items-center justify-end gap-2 text-sm font-bold text-foreground">
                                    أهم المزايا والخصائص المطبقة
                                    <Sparkles className="size-4 text-primary" />
                                </h4>
                                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                    {project.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-card p-3 text-xs text-secondary-foreground"
                                        >
                                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="leading-snug">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    {/* Full Description */}
                    {project.description && (
                        <div className="space-y-2 text-right">
                            <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                                عن تفاصيل المشروع والتنفيذ
                            </h4>
                            <div className="rounded-xl border border-border/60 bg-card/60 p-4 text-xs leading-relaxed whitespace-pre-line text-muted-foreground sm:text-sm">
                                {project.description}
                            </div>
                        </div>
                    )}

                    {/* Technologies Tags */}
                    <div className="space-y-2.5 text-right">
                        <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
                            التقنيات والمكتبات المستخدمة
                        </h4>
                        <div className="flex flex-wrap justify-end gap-2">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-lg border border-border/70 bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                            {project.live_url && project.live_url !== '#' && (
                                <Button
                                    asChild
                                    size="sm"
                                    className="gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                                >
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="size-3.5" />
                                        زيارة الموقع الحي
                                    </a>
                                </Button>
                            )}

                            {project.github_url &&
                                project.github_url !== '#' && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 rounded-xl border-border/80 text-xs hover:bg-secondary"
                                    >
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github className="size-3.5" />
                                            مستودع الكود GitHub
                                        </a>
                                    </Button>
                                )}

                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="gap-2 rounded-xl border-primary/40 text-xs text-primary hover:bg-primary/10"
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    onClick={onClose}
                                >
                                    صفحة المشروع والمعرض الكامل
                                    <ArrowLeft className="size-3.5" />
                                </Link>
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-xs text-muted-foreground hover:text-foreground"
                        >
                            إغلاق النافذة
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
