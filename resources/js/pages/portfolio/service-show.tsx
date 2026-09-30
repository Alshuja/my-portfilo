import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    Code2,
    Sparkles,
    MessageCircle,
    Send,
    ArrowLeft,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { ServiceItem } from '@/components/portfolio/services-section';

interface ServiceShowProps {
    service: ServiceItem;
    relatedServices: ServiceItem[];
}

export default function ServiceShowPage({
    service,
    relatedServices,
}: ServiceShowProps) {
    const renderIcon = (iconStr: string) => {
        if (!iconStr) return <Code2 className="h-10 w-10 text-[#D71916]" />;

        const isImagePath =
            iconStr.startsWith('/') ||
            iconStr.startsWith('http') ||
            iconStr.includes('.');
        if (isImagePath) {
            return (
                <img
                    src={iconStr}
                    alt={service.title}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                />
            );
        }

        return <Code2 className="h-10 w-10 text-[#D71916]" />;
    };

    return (
        <PortfolioLayout>
            <Head title={`${service.title} — عبدالرحمن عادل الشجاع`} />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">
                        الرئيسية
                    </Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-foreground">
                        الخدمات
                    </Link>
                    <span>/</span>
                    <span className="font-semibold text-[#D71916]">
                        {service.title}
                    </span>
                </nav>

                {/* Service Header Card */}
                <div className="relative mb-12 overflow-hidden rounded-3xl border border-border/80 bg-card p-8 shadow-xl sm:p-12">
                    <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/80 shadow-inner">
                            {renderIcon(service.icon)}
                        </div>
                        <div>
                            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#D71916]/10 px-3 py-1 text-xs font-bold text-[#D71916]">
                                <Sparkles className="h-3 w-3" />
                                <span>خدمة تقنية متخصصة</span>
                            </div>
                            <h1 className="text-3xl font-black text-foreground sm:text-4xl">
                                {service.title}
                            </h1>
                            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                                {service.short_description}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="prose dark:prose-invert max-w-none space-y-4 border-t border-border/60 pt-8 leading-relaxed text-foreground/90">
                        <h3 className="text-xl font-bold text-foreground">
                            تفاصيل ونطاق تنفيذ الخدمة:
                        </h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {service.detailed_description}
                        </p>

                        {service.additional_info && (
                            <div className="mt-4 rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm text-foreground/80">
                                <strong className="text-[#D71916]">
                                    ملاحظة إضافية:{' '}
                                </strong>
                                {service.additional_info}
                            </div>
                        )}
                    </div>

                    {/* Features & Technologies Grid */}
                    <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border/60 pt-8 md:grid-cols-2">
                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                            <div>
                                <h3 className="mb-4 text-lg font-bold text-foreground">
                                    ما تتضمنه هذه الخدمة:
                                </h3>
                                <ul className="space-y-3">
                                    {service.features.map((feat, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2.5 text-sm font-medium text-foreground/80"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D71916]" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Technologies */}
                        {service.technologies &&
                            service.technologies.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-lg font-bold text-foreground">
                                        التقنيات والأدوات المستخدمة:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.technologies.map(
                                            (tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="rounded-xl border border-border/60 bg-secondary px-3 py-1.5 text-xs font-bold text-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border/60 pt-8">
                        <Link
                            href="/contact"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#D71916]/25 transition-opacity hover:opacity-95"
                        >
                            <Send className="h-4 w-4" />
                            <span>طلب هذه الخدمة أو استفسار</span>
                        </Link>

                        <a
                            href={`https://wa.me/967777580845?text=${encodeURIComponent(`مرحباً أخي عبدالرحمن، أود الاستفسار عن خدمة: ${service.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow transition-colors hover:bg-emerald-700"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>تواصل فوري عبر واتساب</span>
                        </a>
                    </div>
                </div>

                {/* Related Services */}
                {relatedServices && relatedServices.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-foreground">
                            خدمات وحلول رقمية أخرى:
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedServices.map((rSrv) => (
                                <Link
                                    key={rSrv.id}
                                    href={`/services/${rSrv.slug}`}
                                    onClick={() => playClickSound()}
                                    className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-[#D71916]/40 hover:shadow-md"
                                >
                                    <div>
                                        <h4 className="mb-2 font-bold text-foreground transition-colors group-hover:text-[#D71916]">
                                            {rSrv.title}
                                        </h4>
                                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                            {rSrv.short_description}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-bold text-[#D71916]">
                                        <span>استعراض</span>
                                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PortfolioLayout>
    );
}
