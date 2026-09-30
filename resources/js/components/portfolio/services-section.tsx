import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, ChevronLeft, Code2, Cpu, Database, Layers, Smartphone, Sparkles } from 'lucide-react';
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

        const isImagePath = iconStr.startsWith('/') || iconStr.startsWith('http') || iconStr.includes('.');
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

        return iconMap[iconStr.toLowerCase()] ?? <Code2 className="h-7 w-7 text-[#D71916]" />;
    };

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-background">
            {/* Ambient Background Accents */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D71916]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FF6A32]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-4 border border-[#D71916]/20">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>الخدمات والحلول الرقمية</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                        ماذا أقدم لمشاريعك <span className="text-gradient">التقنية؟</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                        حلول هندسية متكاملة تبدأ من دراسة الفكرة وصياغة تجربة المستخدم، وصولاً لتطوير تطبيقات الموبايل والويب، وتحليل البيانات ونماذج الذكاء الاصطناعي.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="tilt-card group relative flex flex-col justify-between rounded-3xl p-7 bg-card border border-border/80 hover:border-[#D71916]/40 shadow-sm hover:shadow-xl hover:shadow-[#D71916]/10 transition-all duration-300"
                        >
                            <div className="card-glare" />

                            <div>
                                {/* Top Badge & Counter */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/80 dark:bg-accent/40 border border-border flex items-center justify-center shadow-inner group-hover:border-[#D71916]/30 transition-colors">
                                        {renderIcon(service.icon)}
                                    </div>
                                    <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-[#D71916]/40 transition-colors">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Title & Short Description */}
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#D71916] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                    {service.short_description}
                                </p>

                                {/* Features List */}
                                {service.features && service.features.length > 0 && (
                                    <ul className="space-y-2 mb-6 border-t border-border/50 pt-4">
                                        {service.features.slice(0, 3).map((feat, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-[#D71916] shrink-0" />
                                                <span className="truncate">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Card Footer / Action */}
                            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                                {service.technologies && service.technologies.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {service.technologies.slice(0, 3).map((tech, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="px-2 py-0.5 rounded-md bg-secondary text-[11px] font-semibold text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground">خدمة متخصصة</span>
                                )}

                                <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => playClickSound()}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D71916] hover:text-[#FF6A32] transition-colors group/btn"
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
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/80 hover:bg-secondary text-foreground font-bold text-sm border border-border/80 hover:border-[#D71916]/40 transition-all shadow-sm hover:shadow"
                    >
                        <span>استعراض كافة الخدمات الرقمية وباقات العمل</span>
                        <ArrowLeft className="h-4 w-4 text-[#D71916]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
