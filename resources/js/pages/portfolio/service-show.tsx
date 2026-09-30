import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, ChevronLeft, Code2, Sparkles, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { ServiceItem } from '@/components/portfolio/services-section';

interface ServiceShowProps {
    service: ServiceItem;
    relatedServices: ServiceItem[];
}

export default function ServiceShowPage({ service, relatedServices }: ServiceShowProps) {
    const renderIcon = (iconStr: string) => {
        if (!iconStr) return <Code2 className="h-10 w-10 text-[#D71916]" />;

        const isImagePath = iconStr.startsWith('/') || iconStr.startsWith('http') || iconStr.includes('.');
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

            <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground">الرئيسية</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-foreground">الخدمات</Link>
                    <span>/</span>
                    <span className="text-[#D71916] font-semibold">{service.title}</span>
                </nav>

                {/* Service Header Card */}
                <div className="rounded-3xl p-8 sm:p-12 bg-card border border-border/80 shadow-xl mb-12 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border shrink-0 shadow-inner">
                            {renderIcon(service.icon)}
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-2">
                                <Sparkles className="h-3 w-3" />
                                <span>خدمة تقنية متخصصة</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-foreground">{service.title}</h1>
                            <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                                {service.short_description}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="prose dark:prose-invert max-w-none border-t border-border/60 pt-8 text-foreground/90 leading-relaxed space-y-4">
                        <h3 className="text-xl font-bold text-foreground">تفاصيل ونطاق تنفيذ الخدمة:</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {service.detailed_description}
                        </p>

                        {service.additional_info && (
                            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 text-sm text-foreground/80 mt-4">
                                <strong className="text-[#D71916]">ملاحظة إضافية: </strong>
                                {service.additional_info}
                            </div>
                        )}
                    </div>

                    {/* Features & Technologies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-border/60">
                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4">ما تتضمنه هذه الخدمة:</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 text-sm text-foreground/80 font-medium">
                                            <CheckCircle2 className="h-4 w-4 text-[#D71916] shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Technologies */}
                        {service.technologies && service.technologies.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4">التقنيات والأدوات المستخدمة:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 rounded-xl bg-secondary text-xs font-bold text-foreground border border-border/60"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-10 pt-8 border-t border-border/60 flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white font-bold text-sm shadow-lg shadow-[#D71916]/25 hover:opacity-95 transition-opacity"
                        >
                            <Send className="h-4 w-4" />
                            <span>طلب هذه الخدمة أو استفسار</span>
                        </Link>

                        <a
                            href={`https://wa.me/967777580845?text=${encodeURIComponent(`مرحباً أخي عبدالرحمن، أود الاستفسار عن خدمة: ${service.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-colors"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>تواصل فوري عبر واتساب</span>
                        </a>
                    </div>
                </div>

                {/* Related Services */}
                {relatedServices && relatedServices.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-foreground mb-6">خدمات وحلول رقمية أخرى:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((rSrv) => (
                                <Link
                                    key={rSrv.id}
                                    href={`/services/${rSrv.slug}`}
                                    onClick={() => playClickSound()}
                                    className="p-6 rounded-2xl bg-card border border-border/80 hover:border-[#D71916]/40 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <h4 className="font-bold text-foreground group-hover:text-[#D71916] transition-colors mb-2">
                                            {rSrv.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {rSrv.short_description}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-[#D71916]">
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
