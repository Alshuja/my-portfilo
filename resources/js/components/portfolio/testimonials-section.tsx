import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, Quote } from 'lucide-react';
import type { Testimonial } from '@/types/portfolio';

export type TestimonialItem = Testimonial;

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-secondary/30 dark:bg-card/30 border-y border-border/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-4 border border-[#D71916]/20">
                        <MessageSquareQuote className="h-3.5 w-3.5" />
                        <span>آراء وتوصيات الشركاء</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                        ماذا يقول من <span className="text-gradient">تعامل معي؟</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                        ثقة شركاء النجاح وفرق العمل والمجتمع البرمجي هي الدافع الدائم لتقديم أعلى مستويات الجودة البرمجية والتصميمية.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex flex-col justify-between rounded-3xl p-8 bg-card border border-border/80 hover:border-[#D71916]/30 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Decorative Background Quote */}
                            <Quote className="absolute top-6 left-6 h-12 w-12 text-[#D71916]/10 group-hover:text-[#D71916]/20 transition-colors pointer-events-none" />

                            <div>
                                {/* Star Rating */}
                                <div className="flex items-center gap-1 mb-5">
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
                                    <span className="text-xs font-bold text-muted-foreground mr-2">5.0</span>
                                </div>

                                {/* Review Text */}
                                <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-6 font-medium italic relative z-10">
                                    "{item.text}"
                                </p>
                            </div>

                            {/* Client Profile */}
                            <div className="flex items-center gap-3.5 pt-5 border-t border-border/60">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D71916]/30 shrink-0 bg-muted">
                                    <img
                                        src={item.avatar || '/images/main-img.jpg'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = '/images/profile-hero.png';
                                        }}
                                    />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-bold text-foreground text-sm truncate">{item.name}</h4>
                                        <CheckCircle className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {item.role} {item.company ? `· ${item.company}` : ''}
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
