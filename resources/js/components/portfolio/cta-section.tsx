import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MessageCircle, Sparkles, FolderGit2 } from 'lucide-react';
import { playClickSound } from '@/components/portfolio/sound-effects';

export function CallToActionSection() {
    return (
        <section className="relative overflow-hidden bg-background py-20">
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl border border-[#D71916]/30 bg-gradient-to-br from-card via-card to-secondary/50 p-8 text-center shadow-2xl sm:p-14">
                    {/* Glowing Accents */}
                    <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#D71916]/10 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#FF6A32]/10 blur-3xl" />

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D71916]/20 bg-[#D71916]/10 px-4 py-1.5 text-xs font-bold text-[#D71916]">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>متاح للمشاريع والتعاون التقني</span>
                    </div>

                    {/* Heading */}
                    <h2 className="mx-auto mb-5 max-w-3xl text-3xl leading-tight font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        هل لديك فكرة مشروع برمجيات أو{' '}
                        <span className="text-gradient">تطبيق رقمي؟</span>
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        سواء كنت تبحث عن بناء منصة تجارة إلكترونية، أو تطبيق
                        هاتف ذكي، أو معالجة وتحليل بيانات معقدة؛ يسعدني التواصل
                        ومناقشة تفاصيل مشروعك وتحويله لواقع عملي.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            onClick={() => playClickSound()}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#D71916]/25 transition-all hover:shadow-xl hover:shadow-[#D71916]/35 sm:w-auto sm:text-base"
                        >
                            <span>ابدأ محادثة الآن</span>
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        </Link>

                        <a
                            href="https://wa.me/967777580845"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playClickSound()}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 sm:w-auto sm:text-base"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>تواصل عبر واتساب</span>
                        </a>

                        <Link
                            href="/projects"
                            onClick={() => playClickSound()}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-7 py-4 text-sm font-bold text-foreground transition-all hover:bg-secondary/80 sm:w-auto sm:text-base"
                        >
                            <FolderGit2 className="h-4 w-4 text-[#D71916]" />
                            <span>استكشف المشاريع</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
