import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Printer, Mail, Phone, MapPin, Globe, Github, Linkedin, Send, Award, BookOpen, Briefcase, Code, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playClickSound } from '@/components/portfolio/sound-effects';

interface CVProps {
    settings: Record<string, string>;
    projects: Array<{
        id: number;
        title: string;
        brief: string;
        description: string;
        tags: string[];
        date_range: string;
        role?: string;
        client?: string;
    }>;
    skills: Array<{
        id: number;
        name: string;
        category: string;
        level: number;
    }>;
    journey: Array<{
        id: number;
        title: string;
        role: string;
        date_range: string;
        category: string;
        category_label: string;
        description: string;
    }>;
    certificates: Array<{
        id: number;
        title: string;
        issuer: string;
        date: string;
        category_label: string;
    }>;
    services: Array<{
        id: number;
        title: string;
        short_description: string;
    }>;
}

export default function CVPage({ settings, projects, skills, journey, certificates, services }: CVProps) {
    const handlePrint = () => {
        playClickSound();
        window.print();
    };

    const email = settings.email || 'Abdulrahman_Alshujaa@gmail.com';
    const phone = settings.whatsapp_2 || '+967 777 580 845';
    const location = 'اليمن — إب / صنعاء';

    return (
        <>
            <Head title="السيرة الذاتية المهنية — عبدالرحمن عادل الشجاع" />

            <div dir="rtl" className="min-h-screen bg-background py-8 sm:py-12 print:py-0 print:bg-white text-foreground selection:bg-red-500/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 print:px-0">
                    {/* Top Action Bar (Hidden when printing) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
                        <Link
                            href="/"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-secondary text-sm font-semibold transition-colors shadow-sm"
                        >
                            <ArrowRight className="h-4 w-4 ml-1 text-[#D71916]" />
                            <span>العودة للرئيسية</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {settings.cv_pdf && (
                                <a
                                    href={settings.cv_pdf}
                                    download
                                    onClick={() => playClickSound()}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground text-sm font-semibold transition-colors shadow-sm"
                                >
                                    <Download className="h-4 w-4 text-[#D71916]" />
                                    <span>تحميل النسخة المعتمدة (PDF)</span>
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white text-sm font-bold shadow-lg shadow-[#D71916]/25 hover:shadow-xl hover:opacity-95 transition-all"
                            >
                                <Printer className="h-4 w-4" />
                                <span>طباعة / حفظ كملف PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* CV Document Container */}
                    <article className="bg-card print:bg-white border border-border/80 print:border-0 rounded-3xl p-8 sm:p-12 shadow-xl print:shadow-none space-y-9">
                        {/* Header: Name, Title & Contacts */}
                        <header className="border-b border-border/80 pb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                            {/* Photo with signature Red & White frame accent */}
                            <div className="shrink-0">
                                <div
                                    className="relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105"
                                    style={{
                                        borderTop: '6px solid #FFFFFF',
                                        borderRight: '6px solid #FFFFFF',
                                        borderBottom: '6px solid #D71916',
                                        borderLeft: '6px solid #D71916',
                                        boxShadow: '0 8px 24px rgba(215, 25, 22, 0.25)',
                                    }}
                                >
                                    <img
                                        src={settings.hero_image || '/images/profile-hero.png'}
                                        alt={settings.name || 'عبدالرحمن عادل الشجاع'}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.src.includes('main-img.jpg')) {
                                                target.src = '/images/main-img.jpg';
                                            }
                                        }}
                                        className="size-24 sm:size-28 object-cover rounded-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 text-center sm:text-right">
                                <h1 className="text-3xl sm:text-4xl font-black text-foreground print:text-black tracking-tight">
                                    {settings.name || 'عبدالرحمن عادل الشجاع'}
                                </h1>
                                <p className="text-lg font-bold text-[#D71916] mt-1.5">
                                    {settings.role_title || 'Computer Science & IT · Data & AI · Full-Stack & Mobile Development'}
                                </p>
                                <p className="text-sm text-muted-foreground print:text-neutral-700 mt-2 leading-relaxed">
                                    {settings.about_lead || 'طالب علوم حاسوب وتقنية معلومات بجامعة إب، مبرمج ومؤسس منصة فكرة مبرمج، أعمل على تحويل الأفكار إلى منتجات ومنصات برمجية قابلة للتوسع.'}
                                </p>
                            </div>

                            {/* Contact Details List */}
                            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground print:text-neutral-800 shrink-0 sm:border-r border-border/80 sm:pr-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#D71916]" />
                                    <span>{location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#D71916]" />
                                    <span dir="ltr">{phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-[#D71916]" />
                                    <span dir="ltr">{email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Github className="h-4 w-4 text-[#D71916]" />
                                    <span dir="ltr">github.com/alshujaa</span>
                                </div>
                            </div>
                        </header>

                        {/* Summary / Profile */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-3 border-r-4 border-[#D71916] pr-3">
                                <Sparkles className="h-4 w-4 text-[#D71916]" />
                                <span>النبذة المهنية (Professional Summary)</span>
                            </h2>
                            <p className="text-sm sm:text-base text-foreground/90 print:text-neutral-900 leading-relaxed font-normal">
                                مهندس برمجيات واعد ومحلل بيانات، متمكن من لغة Python وتحليل البيانات ونماذج التعلم الآلي، وبناء تطبيقات الهواتف الذكية بـ Flutter لنظامي Android و iOS، وتطوير الأنظمة السحابية والـ Backends المتينة بإطار Laravel. أسست منصة "فكرة مبرمج" لنشر المعرفة البرمجية العربية وشاركت في تطوير منصات وتطبيقات عملية كمنصة سندباد للتجارة الإلكترونية ومحفظة ريال الرقمية.
                            </p>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-4 border-r-4 border-[#D71916] pr-3">
                                <BookOpen className="h-4 w-4 text-[#D71916]" />
                                <span>المؤهل الأكاديمي (Education)</span>
                            </h2>
                            <div className="rounded-2xl p-5 bg-secondary/40 print:bg-neutral-50 border border-border/60">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="font-bold text-base text-foreground print:text-black">
                                        بكالوريوس علوم الحاسوب وتقنية المعلومات
                                    </h3>
                                    <span className="text-xs font-bold text-[#D71916] px-2.5 py-1 rounded-full bg-[#D71916]/10">
                                        2022 — حتى الآن (المستوى الرابع)
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-muted-foreground mt-1">جامعة إب — كلية الحاسوب وتقنية المعلومات — اليمن</p>
                                <p className="text-xs sm:text-sm text-foreground/80 mt-2 leading-relaxed">
                                    دراسة متعمقة في: هياكل البيانات والخوارزميات، البرمجة كائنية التوجه (OOP)، تصميم وإدارة قواعد البيانات SQL/MySQL، وهندسة البرمجيات.
                                </p>
                            </div>
                        </section>

                        {/* Experiences & Key Positions */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-4 border-r-4 border-[#D71916] pr-3">
                                <Briefcase className="h-4 w-4 text-[#D71916]" />
                                <span>الخبرات العملية والمشاريع القيادية (Experience)</span>
                            </h2>
                            <div className="space-y-4">
                                {journey.map((item) => (
                                    <div key={item.id} className="rounded-2xl p-5 bg-secondary/30 print:bg-neutral-50 border border-border/50">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="font-bold text-base text-foreground print:text-black">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs font-semibold text-muted-foreground bg-card px-2.5 py-1 rounded-md border border-border/50">
                                                {item.date_range}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-[#D71916] block mt-1">{item.role}</span>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Featured Projects */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-4 border-r-4 border-[#D71916] pr-3">
                                <Code className="h-4 w-4 text-[#D71916]" />
                                <span>المشاريع التقنية المنجزة (Key Projects)</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {projects.slice(0, 6).map((proj) => (
                                    <div key={proj.id} className="rounded-2xl p-4 bg-secondary/30 print:bg-neutral-50 border border-border/50 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <h4 className="font-bold text-sm text-foreground print:text-black">{proj.title}</h4>
                                                <span className="text-[11px] text-muted-foreground">{proj.date_range}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                {proj.brief}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-border/40">
                                            {proj.tags?.slice(0, 4).map((tag, tIdx) => (
                                                <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-card text-foreground/80 border border-border/40">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Technical Skills */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-4 border-r-4 border-[#D71916] pr-3">
                                <Sparkles className="h-4 w-4 text-[#D71916]" />
                                <span>المهارات التقنية والأدوات (Technical Skills)</span>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s) => (
                                    <span
                                        key={s.id}
                                        className="px-3 py-1.5 rounded-xl bg-secondary print:bg-neutral-100 text-xs font-bold text-foreground print:text-black border border-border/60"
                                    >
                                        {s.name} ({s.level}%)
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Certificates & Credentials */}
                        <section>
                            <h2 className="text-lg font-black text-foreground print:text-black flex items-center gap-2 mb-4 border-r-4 border-[#D71916] pr-3">
                                <Award className="h-4 w-4 text-[#D71916]" />
                                <span>الشهادات المعتمدة (Certifications)</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                {certificates.slice(0, 8).map((c) => (
                                    <div key={c.id} className="p-3 rounded-xl border border-border/50 bg-secondary/20 flex items-start gap-2.5">
                                        <Award className="h-4 w-4 text-[#D71916] shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-foreground print:text-black">{c.title}</h5>
                                            <span className="text-[11px] text-muted-foreground">{c.issuer} · {c.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer Sign-off */}
                        <footer className="pt-6 border-t border-border/80 text-center text-xs text-muted-foreground">
                            <p>تم استخراج وتحديث هذه السيرة الذاتية عبر الموقع الرسمي: <strong className="text-foreground">alshujaa.tech</strong></p>
                        </footer>
                    </article>
                </div>
            </div>
        </>
    );
}
