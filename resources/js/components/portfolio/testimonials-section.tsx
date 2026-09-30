import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, Quote } from 'lucide-react';
import type { Testimonial } from '@/types/portfolio';

export type TestimonialItem = Testimonial;

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({
    testimonials,
}: TestimonialsSectionProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden border-y border-border/60 bg-secondary/30 py-24 dark:bg-card/30"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center fade-in">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D71916]/20 bg-[#D71916]/10 px-3.5 py-1.5 text-xs font-bold text-[#D71916]">
                        <MessageSquareQuote className="h-3.5 w-3.5" />
                        <span>آراء وتوصيات الشركاء</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        ماذا يقول من{' '}
                        <span className="text-gradient">تعامل معي؟</span>
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        ثقة شركاء النجاح وفرق العمل والمجتمع البرمجي هي الدافع
                        الدائم لتقديم أعلى مستويات الجودة البرمجية والتصميمية.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:border-[#D71916]/30 hover:shadow-xl"
                        >
                            {/* Decorative Background Quote */}
                            <Quote className="pointer-events-none absolute top-6 left-6 h-12 w-12 text-[#D71916]/10 transition-colors group-hover:text-[#D71916]/20" />

                            <div>
                                {/* Star Rating */}
                                <div className="mb-5 flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < (item.rating || 5)
                                                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                                                    : 'fill-muted text-muted-foreground/30'
                                            }`}
                                        />
                                    ))}
                                    <span className="mr-2 text-xs font-bold text-muted-foreground">
                                        5.0
                                    </span>
                                </div>

                                {/* Review Text */}
                                <p className="relative z-10 mb-6 text-sm leading-relaxed font-medium text-foreground/90 italic sm:text-base">
                                    "{item.text}"
                                </p>
                            </div>

                            {/* Client Profile */}
                            <div className="flex items-center gap-3.5 border-t border-border/60 pt-5">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#D71916]/30 bg-muted">
                                    <img
                                        src={
                                            item.avatar ||
                                            '/images/main-img.jpg'
                                        }
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src = '/images/profile-hero.png';
                                        }}
                                    />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="truncate text-sm font-bold text-foreground">
                                            {item.name}
                                        </h4>
                                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                                    </div>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {item.role}{' '}
                                        {item.company
                                            ? `· ${item.company}`
                                            : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
