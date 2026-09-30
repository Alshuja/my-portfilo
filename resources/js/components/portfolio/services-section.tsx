import React from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    ChevronLeft,
    Code2,
    Cpu,
    Database,
    Layers,
    Smartphone,
    Sparkles,
} from 'lucide-react';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { Service } from '@/types/portfolio';

export type ServiceItem = Service;

interface ServicesSectionProps {
    services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
    const iconMap: Record<string, React.ReactNode> = {
        code: <Code2 className="h-6 w-6 text-[#D71916]" />,
        smartphone: <Smartphone className="h-6 w-6 text-[#D71916]" />,
        database: <Database className="h-6 w-6 text-[#D71916]" />,
        cpu: <Cpu className="h-6 w-6 text-[#D71916]" />,
        layers: <Layers className="h-6 w-6 text-[#D71916]" />,
        sparkles: <Sparkles className="h-6 w-6 text-[#D71916]" />,
    };

    const renderIcon = (iconStr: string) => {
        if (!iconStr) return <Code2 className="h-7 w-7 text-[#D71916]" />;

        const isImagePath =
            iconStr.startsWith('/') ||
            iconStr.startsWith('http') ||
            iconStr.includes('.');
        if (isImagePath) {
            return (
                <img
                    src={iconStr}
                    alt="أيقونة الخدمة"
                    className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
            );
        }

        return (
            iconMap[iconStr.toLowerCase()] ?? (
                <Code2 className="h-7 w-7 text-[#D71916]" />
            )
        );
    };

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-background py-24"
        >
            {/* Ambient Background Accents */}
            <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D71916]/5 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 rounded-full bg-[#FF6A32]/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center fade-in">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D71916]/20 bg-[#D71916]/10 px-3.5 py-1.5 text-xs font-bold text-[#D71916]">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>الخدمات والحلول الرقمية</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        ماذا أقدم لمشاريعك{' '}
                        <span className="text-gradient">التقنية؟</span>
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        حلول هندسية متكاملة تبدأ من دراسة الفكرة وصياغة تجربة
                        المستخدم، وصولاً لتطوير تطبيقات الموبايل والويب، وتحليل
                        البيانات ونماذج الذكاء الاصطناعي.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="tilt-card group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 hover:border-[#D71916]/40 hover:shadow-xl hover:shadow-[#D71916]/10"
                        >
                            <div className="card-glare" />

                            <div>
                                {/* Top Badge & Counter */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-secondary/80 shadow-inner transition-colors group-hover:border-[#D71916]/30 dark:bg-accent/40">
                                        {renderIcon(service.icon)}
                                    </div>
                                    <span className="text-2xl font-black text-muted-foreground/30 transition-colors group-hover:text-[#D71916]/40">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Title & Short Description */}
                                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-[#D71916]">
                                    {service.title}
                                </h3>
                                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                    {service.short_description}
                                </p>

                                {/* Features List */}
                                {service.features &&
                                    service.features.length > 0 && (
                                        <ul className="mb-6 space-y-2 border-t border-border/50 pt-4">
                                            {service.features
                                                .slice(0, 3)
                                                .map((feat, fIdx) => (
                                                    <li
                                                        key={fIdx}
                                                        className="flex items-center gap-2 text-xs font-medium text-foreground/80"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D71916]" />
                                                        <span className="truncate">
                                                            {feat}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                            </div>

                            {/* Card Footer / Action */}
                            <div className="flex items-center justify-between border-t border-border/50 pt-4">
                                {service.technologies &&
                                service.technologies.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {service.technologies
                                            .slice(0, 3)
                                            .map((tech, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        خدمة متخصصة
                                    </span>
                                )}

                                <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => playClickSound()}
                                    className="group/btn inline-flex items-center gap-1 text-xs font-bold text-[#D71916] transition-colors hover:text-[#FF6A32]"
                                >
                                    <span>تفاصيل</span>
                                    <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Link to Full Services Catalog */}
                <div className="mt-14 text-center">
                    <Link
                        href="/services"
                        onClick={() => playClickSound()}
                        className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-secondary/80 px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-[#D71916]/40 hover:bg-secondary hover:shadow"
                    >
                        <span>استعراض كافة الخدمات الرقمية وباقات العمل</span>
                        <ArrowLeft className="h-4 w-4 text-[#D71916]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
