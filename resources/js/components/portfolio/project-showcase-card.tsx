import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Info, ExternalLink, Star, Users, Shield, Cpu, Globe } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { playClickSound } from './sound-effects';
import { Button } from '@/components/ui/button';

interface ProjectShowcaseCardProps {
    project: Project;
    onOpenModal: (project: Project) => void;
}

export function ProjectShowcaseCard({ project, onOpenModal }: ProjectShowcaseCardProps) {
    const cardRef = useRef<HTMLElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    // Determine badge type matching original design
    const renderBadge = () => {
        if (project.is_featured) {
            return (
                <span className="badge-featured">
                    <Star className="size-3 fill-current" />
                    مشروع رئيسي
                </span>
            );
        }

        if (project.category === 'platform' || project.category === 'community') {
            return (
                <span className="badge-community">
                    <Users className="size-3" />
                    منصة مجتمعية
                </span>
            );
        }

        if (project.category === 'mobile') {
            return (
                <span className="badge-fintech">
                    <Shield className="size-3" />
                    تطبيق معتمد
                </span>
            );
        }

        if (project.category === 'ai-data') {
            return (
                <span className="badge-ai">
                    <Cpu className="size-3" />
                    ذكاء اصطناعي
                </span>
            );
        }

        return (
            <span className="badge-web">
                <Globe className="size-3" />
                حل رقمي
            </span>
        );
    };

    const primaryActionLabel = project.live_url && project.live_url !== '#'
        ? (project.live_url.includes('sinbadd') ? 'زيارة الموقع (sinbadd.com)'
            : project.live_url.includes('rial') ? 'الموقع الرسمي (rial.cash)'
            : project.live_url.includes('t.me') ? 'قناة المنصة (Telegram)'
            : 'زيارة الموقع')
        : (project.github_url && project.github_url !== '#' ? 'كود المشروع (GitHub)' : 'معاينة المشروع');

    return (
        <article
            ref={cardRef}
            className={`project-card tilt-card group ${project.is_featured ? 'featured' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-glare" />

            {/* Thumbnail */}
            <div className="card-thumb">
                <Link
                    href={`/projects/${project.slug}`}
                    onClick={() => playClickSound(650, 0.02)}
                    className="block size-full"
                    title={project.title}
                >
                    <img
                        src={project.image || '/images/placeholder.jpg'}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                </Link>
                <span className="category-tag">
                    {project.category_label || 'برمجيات متقدمة'}
                </span>
            </div>

            {/* Body */}
            <div className="project-card-body">
                <div className="project-meta-line">
                    <span className="project-date">
                        <Calendar className="size-3.5 text-primary" />
                        {project.date_range}
                    </span>
                    {renderBadge()}
                </div>

                <Link
                    href={`/projects/${project.slug}`}
                    onClick={() => playClickSound(650, 0.02)}
                    className="hover:text-primary transition-colors"
                >
                    <h3>{project.title}</h3>
                </Link>

                <p>{project.brief}</p>

                <div className="tech-tags">
                    {project.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                    ))}
                </div>

                {/* Action Buttons matching original template */}
                <div className="project-links">
                    <Button
                        size="sm"
                        onClick={() => {
                            playClickSound(650, 0.03);
                            onOpenModal(project);
                        }}
                        className="btn bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-1.5 shadow-md shadow-primary/20 text-xs"
                    >
                        <Info className="size-3.5" />
                        التفاصيل الكاملة
                    </Button>

                    {project.live_url && project.live_url !== '#' ? (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            onClick={() => playClickSound(650, 0.02)}
                            className="btn border-border/80 hover:bg-muted text-foreground font-semibold rounded-xl gap-1.5 text-xs truncate"
                        >
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={project.live_url}
                            >
                                <ExternalLink className="size-3.5" />
                                <span className="truncate">{primaryActionLabel}</span>
                            </a>
                        </Button>
                    ) : project.github_url && project.github_url !== '#' ? (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            onClick={() => playClickSound(650, 0.02)}
                            className="btn border-border/80 hover:bg-muted text-foreground font-semibold rounded-xl gap-1.5 text-xs truncate"
                        >
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={project.github_url}
                            >
                                <ExternalLink className="size-3.5" />
                                <span className="truncate">كود المشروع (GitHub)</span>
                            </a>
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            onClick={() => playClickSound(650, 0.02)}
                            className="btn border-border/80 hover:bg-muted text-foreground font-semibold rounded-xl gap-1.5 text-xs"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <ExternalLink className="size-3.5" />
                                صفحة المعرض
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
