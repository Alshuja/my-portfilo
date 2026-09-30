import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MessageCircle, Sparkles, FolderGit2 } from 'lucide-react';
import { playClickSound } from '@/components/portfolio/sound-effects';

export function CallToActionSection() {
    return (
        <section className="py-20 relative overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-[#D71916]/30 bg-gradient-to-br from-card via-card to-secondary/50 shadow-2xl text-center">
                    {/* Glowing Accents */}
                    <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D71916]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#FF6A32]/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-6 border border-[#D71916]/20">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>متاح للمشاريع والتعاون التقني</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight max-w-3xl mx-auto leading-tight mb-5">
                        هل لديك فكرة مشروع برمجيات أو <span className="text-gradient">تطبيق رقمي؟</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                        سواء كنت تبحث عن بناء منصة تجارة إلكترونية، أو تطبيق هاتف ذكي، أو معالجة وتحليل بيانات معقدة؛ يسعدني التواصل ومناقشة تفاصيل مشروعك وتحويله لواقع عملي.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            onClick={() => playClickSound()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#D71916]/25 hover:shadow-xl hover:shadow-[#D71916]/35 transition-all group"
                        >
                            <span>ابدأ محادثة الآن</span>
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        </Link>

                        <a
                            href="https://wa.me/967777580845"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playClickSound()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition-all"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>تواصل عبر واتساب</span>
                        </a>

                        <Link
                            href="/projects"
                            onClick={() => playClickSound()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-sm sm:text-base border border-border transition-all"
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
