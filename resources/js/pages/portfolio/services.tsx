import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Sparkles,
    ArrowLeft,
    CheckCircle2,
    ChevronLeft,
    Code2,
    Smartphone,
    Database,
    Cpu,
    Layers,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { ProcessSection } from '@/components/portfolio/process-section';
import {
    TestimonialsSection,
    type TestimonialItem,
} from '@/components/portfolio/testimonials-section';
import { CallToActionSection } from '@/components/portfolio/cta-section';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { ServiceItem } from '@/components/portfolio/services-section';

interface ServicesPageProps {
    services: ServiceItem[];
    testimonials: TestimonialItem[];
}

export default function ServicesPage({
    services,
    testimonials,
}: ServicesPageProps) {
    const renderIcon = (iconStr: string) => {
        if (!iconStr) return <Code2 className="h-8 w-8 text-[#D71916]" />;

        const isImagePath =
            iconStr.startsWith('/') ||
            iconStr.startsWith('http') ||
            iconStr.includes('.');
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

            <div className="relative overflow-hidden py-16 sm:py-24">
                {/* Hero Banner */}
                <div className="mx-auto mb-20 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D71916]/20 bg-[#D71916]/10 px-4 py-1.5 text-xs font-bold text-[#D71916]">
                        <Sparkles className="h-4 w-4" />
                        <span>الخدمات البرمجية والهندسية</span>
                    </div>
                    <h1 className="mx-auto max-w-4xl text-4xl leading-tight font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        حلول رقمية متكاملة تدعم نمو{' '}
                        <span className="text-gradient">أعمالك ومشاريعك</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        أقدم خبراتي في تطوير تطبيقات الموبايل بـ Flutter، وبناء
                        أنظمة الـ Backend بـ Laravel، وتحليل البيانات الضخمة،
                        والذكاء الاصطناعي لمساعدتك في بناء منتجات متينة ومتميزة.
                    </p>
                </div>

                {/* Services Detailed Catalog */}
                <div className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="tilt-card group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:border-[#D71916]/40 hover:shadow-2xl"
                            >
                                <div className="card-glare" />

                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary/80 shadow-inner transition-transform group-hover:scale-105">
                                            {renderIcon(service.icon)}
                                        </div>
                                        <span className="text-3xl font-black text-muted-foreground/30 transition-colors group-hover:text-[#D71916]/40">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h2 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-[#D71916]">
                                        {service.title}
                                    </h2>

                                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                        {service.detailed_description ||
                                            service.short_description}
                                    </p>

                                    {service.features &&
                                        service.features.length > 0 && (
                                            <div className="mb-6 space-y-2.5 border-t border-border/50 pt-5">
                                                <span className="block text-xs font-bold text-foreground/80">
                                                    أبرز المميزات:
                                                </span>
                                                {service.features.map(
                                                    (feat, fIdx) => (
                                                        <div
                                                            key={fIdx}
                                                            className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                                                        >
                                                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D71916]" />
                                                            <span>{feat}</span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                </div>

                                <div className="flex items-center justify-between border-t border-border/50 pt-5">
                                    {service.technologies && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.technologies
                                                .slice(0, 3)
                                                .map((tech, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                        </div>
                                    )}

                                    <Link
                                        href={`/services/${service.slug}`}
                                        onClick={() => playClickSound()}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#D71916]/10 px-3.5 py-1.5 text-xs font-bold text-[#D71916] transition-colors hover:bg-[#D71916]/20"
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
