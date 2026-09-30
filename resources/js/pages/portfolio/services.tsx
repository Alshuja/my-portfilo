import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, ArrowLeft, CheckCircle2, ChevronLeft, Code2, Smartphone, Database, Cpu, Layers } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { ProcessSection } from '@/components/portfolio/process-section';
import { TestimonialsSection, type TestimonialItem } from '@/components/portfolio/testimonials-section';
import { CallToActionSection } from '@/components/portfolio/cta-section';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { ServiceItem } from '@/components/portfolio/services-section';

interface ServicesPageProps {
    services: ServiceItem[];
    testimonials: TestimonialItem[];
}

export default function ServicesPage({ services, testimonials }: ServicesPageProps) {
    const renderIcon = (iconStr: string) => {
        if (!iconStr) return <Code2 className="h-8 w-8 text-[#D71916]" />;

        const isImagePath = iconStr.startsWith('/') || iconStr.startsWith('http') || iconStr.includes('.');
        if (isImagePath) {
            return (
                <img
                    src={iconStr}
                    alt="أيقونة الخدمة"
                    className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
            );
        }

        return <Code2 className="h-8 w-8 text-[#D71916]" />;
    };

    return (
        <PortfolioLayout>
            <Head title="الخدمات والحلول الرقمية — عبدالرحمن عادل الشجاع" />

            <div className="py-16 sm:py-24 relative overflow-hidden">
                {/* Hero Banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-5 border border-[#D71916]/20">
                        <Sparkles className="h-4 w-4" />
                        <span>الخدمات البرمجية والهندسية</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight max-w-4xl mx-auto leading-tight">
                        حلول رقمية متكاملة تدعم نمو <span className="text-gradient">أعمالك ومشاريعك</span>
                    </h1>
                    <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        أقدم خبراتي في تطوير تطبيقات الموبايل بـ Flutter، وبناء أنظمة الـ Backend بـ Laravel، وتحليل البيانات الضخمة، والذكاء الاصطناعي لمساعدتك في بناء منتجات متينة ومتميزة.
                    </p>
                </div>

                {/* Services Detailed Catalog */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="tilt-card flex flex-col justify-between rounded-3xl p-8 bg-card border border-border/80 hover:border-[#D71916]/40 shadow-sm hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="card-glare" />

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border group-hover:scale-105 transition-transform shadow-inner">
                                            {renderIcon(service.icon)}
                                        </div>
                                        <span className="text-3xl font-black text-muted-foreground/30 group-hover:text-[#D71916]/40 transition-colors">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#D71916] transition-colors">
                                        {service.title}
                                    </h2>

                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                        {service.detailed_description || service.short_description}
                                    </p>

                                    {service.features && service.features.length > 0 && (
                                        <div className="space-y-2.5 mb-6 pt-5 border-t border-border/50">
                                            <span className="text-xs font-bold text-foreground/80 block">أبرز المميزات:</span>
                                            {service.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#D71916] shrink-0" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-5 border-t border-border/50 flex items-center justify-between">
                                    {service.technologies && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.technologies.slice(0, 3).map((tech, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-semibold text-foreground/80"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <Link
                                        href={`/services/${service.slug}`}
                                        onClick={() => playClickSound()}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D71916]/10 hover:bg-[#D71916]/20 text-[#D71916] font-bold text-xs transition-colors"
                                    >
                                        <span>عرض التفاصيل</span>
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workflow Process Section */}
                <ProcessSection />

                {/* Testimonials */}
                <TestimonialsSection testimonials={testimonials} />

                {/* Call To Action */}
                <CallToActionSection />
            </div>
        </PortfolioLayout>
    );
}
