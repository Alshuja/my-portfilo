import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Printer,
    Mail,
    Phone,
    MapPin,
    Globe,
    Github,
    Linkedin,
    Send,
    Award,
    BookOpen,
    Briefcase,
    Code,
    Sparkles,
    Download,
} from 'lucide-react';
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

export default function CVPage({
    settings,
    projects,
    skills,
    journey,
    certificates,
    services,
}: CVProps) {
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

            <div
                dir="rtl"
                className="min-h-screen bg-background py-8 text-foreground selection:bg-red-500/20 sm:py-12 print:bg-white print:py-0"
            >
                <div className="mx-auto max-w-4xl px-4 sm:px-6 print:px-0">
                    {/* Top Action Bar (Hidden when printing) */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
                        <Link
                            href="/"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                        >
                            <ArrowRight className="ml-1 h-4 w-4 text-[#D71916]" />
                            <span>العودة للرئيسية</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {settings.cv_pdf && (
                                <a
                                    href={settings.cv_pdf}
                                    download
                                    onClick={() => playClickSound()}
                                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary/80"
                                >
                                    <Download className="h-4 w-4 text-[#D71916]" />
                                    <span>تحميل النسخة المعتمدة (PDF)</span>
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#D71916]/25 transition-all hover:opacity-95 hover:shadow-xl"
                            >
                                <Printer className="h-4 w-4" />
                                <span>طباعة / حفظ كملف PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* CV Document Container */}
                    <article className="space-y-9 rounded-3xl border border-border/80 bg-card p-8 shadow-xl sm:p-12 print:border-0 print:bg-white print:shadow-none">
                        {/* Header: Name, Title & Contacts */}
                        <header className="flex flex-col items-center justify-between gap-6 border-b border-border/80 pb-8 sm:flex-row sm:items-start">
                            {/* Photo with signature Red & White frame accent */}
                            <div className="shrink-0">
                                <div
                                    className="relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105"
                                    style={{
                                        borderTop: '6px solid #FFFFFF',
                                        borderRight: '6px solid #FFFFFF',
                                        borderBottom: '6px solid #D71916',
                                        borderLeft: '6px solid #D71916',
                                        boxShadow:
                                            '0 8px 24px rgba(215, 25, 22, 0.25)',
                                    }}
                                >
                                    <img
                                        src={
                                            settings.hero_image ||
                                            '/images/profile-hero.png'
                                        }
                                        alt={
                                            settings.name ||
                                            'عبدالرحمن عادل الشجاع'
                                        }
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (
                                                !target.src.includes(
                                                    'main-img.jpg',
                                                )
                                            ) {
                                                target.src =
                                                    '/images/main-img.jpg';
                                            }
                                        }}
                                        className="size-24 rounded-sm object-cover sm:size-28"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 text-center sm:text-right">
                                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl print:text-black">
                                    {settings.name || 'عبدالرحمن عادل الشجاع'}
                                </h1>
                                <p className="mt-1.5 text-lg font-bold text-[#D71916]">
                                    {settings.role_title ||
                                        'Computer Science & IT · Data & AI · Full-Stack & Mobile Development'}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                                    {settings.about_lead ||
                                        'طالب علوم حاسوب وتقنية معلومات بجامعة إب، مبرمج ومؤسس منصة فكرة مبرمج، أعمل على تحويل الأفكار إلى منتجات ومنصات برمجية قابلة للتوسع.'}
                                </p>
                            </div>

                            {/* Contact Details List */}
                            <div className="flex shrink-0 flex-col gap-2 border-border/80 text-xs text-muted-foreground sm:border-r sm:pr-6 sm:text-sm print:text-neutral-800">
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
                            <h2 className="mb-3 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <Sparkles className="h-4 w-4 text-[#D71916]" />
                                <span>
                                    النبذة المهنية (Professional Summary)
                                </span>
                            </h2>
                            <p className="text-sm leading-relaxed font-normal text-foreground/90 sm:text-base print:text-neutral-900">
                                مهندس برمجيات واعد ومحلل بيانات، متمكن من لغة
                                Python وتحليل البيانات ونماذج التعلم الآلي، وبناء
                                تطبيقات الهواتف الذكية بـ Flutter لنظامي Android
                                و iOS، وتطوير الأنظمة السحابية والـ Backends
                                المتينة بإطار Laravel. أسست منصة "فكرة مبرمج"
                                لنشر المعرفة البرمجية العربية وشاركت في تطوير
                                منصات وتطبيقات عملية كمنصة سندباد للتجارة
                                الإلكترونية ومحفظة ريال الرقمية.
                            </p>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <BookOpen className="h-4 w-4 text-[#D71916]" />
                                <span>المؤهل الأكاديمي (Education)</span>
                            </h2>
                            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 print:bg-neutral-50">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-base font-bold text-foreground print:text-black">
                                        بكالوريوس علوم الحاسوب وتقنية المعلومات
                                    </h3>
                                    <span className="rounded-full bg-[#D71916]/10 px-2.5 py-1 text-xs font-bold text-[#D71916]">
                                        2022 — حتى الآن (المستوى الرابع)
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                                    جامعة إب — كلية الحاسوب وتقنية المعلومات —
                                    اليمن
                                </p>
                                <p className="mt-2 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                                    دراسة متعمقة في: هياكل البيانات
                                    والخوارزميات، البرمجة كائنية التوجه (OOP)،
                                    تصميم وإدارة قواعد البيانات SQL/MySQL،
                                    وهندسة البرمجيات.
                                </p>
                            </div>
                        </section>

                        {/* Experiences & Key Positions */}
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <Briefcase className="h-4 w-4 text-[#D71916]" />
                                <span>
                                    الخبرات العملية والمشاريع القيادية
                                    (Experience)
                                </span>
                            </h2>
                            <div className="space-y-4">
                                {journey.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-2xl border border-border/50 bg-secondary/30 p-5 print:bg-neutral-50"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="text-base font-bold text-foreground print:text-black">
                                                {item.title}
                                            </h3>
                                            <span className="rounded-md border border-border/50 bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                                                {item.date_range}
                                            </span>
                                        </div>
                                        <span className="mt-1 block text-xs font-bold text-[#D71916]">
                                            {item.role}
                                        </span>
                                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Featured Projects */}
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <Code className="h-4 w-4 text-[#D71916]" />
                                <span>
                                    المشاريع التقنية المنجزة (Key Projects)
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {projects.slice(0, 6).map((proj) => (
                                    <div
                                        key={proj.id}
                                        className="flex flex-col justify-between rounded-2xl border border-border/50 bg-secondary/30 p-4 print:bg-neutral-50"
                                    >
                                        <div>
                                            <div className="mb-1.5 flex items-center justify-between gap-2">
                                                <h4 className="text-sm font-bold text-foreground print:text-black">
                                                    {proj.title}
                                                </h4>
                                                <span className="text-[11px] text-muted-foreground">
                                                    {proj.date_range}
                                                </span>
                                            </div>
                                            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                                {proj.brief}
                                            </p>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-1 border-t border-border/40 pt-2">
                                            {proj.tags
                                                ?.slice(0, 4)
                                                .map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="rounded border border-border/40 bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground/80"
                                                    >
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
                            <h2 className="mb-4 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <Sparkles className="h-4 w-4 text-[#D71916]" />
                                <span>
                                    المهارات التقنية والأدوات (Technical Skills)
                                </span>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s) => (
                                    <span
                                        key={s.id}
                                        className="rounded-xl border border-border/60 bg-secondary px-3 py-1.5 text-xs font-bold text-foreground print:bg-neutral-100 print:text-black"
                                    >
                                        {s.name} ({s.level}%)
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Certificates & Credentials */}
                        <section>
                            <h2 className="mb-4 flex items-center gap-2 border-r-4 border-[#D71916] pr-3 text-lg font-black text-foreground print:text-black">
                                <Award className="h-4 w-4 text-[#D71916]" />
                                <span>الشهادات المعتمدة (Certifications)</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                                {certificates.slice(0, 8).map((c) => (
                                    <div
                                        key={c.id}
                                        className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-secondary/20 p-3"
                                    >
                                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#D71916]" />
                                        <div>
                                            <h5 className="font-bold text-foreground print:text-black">
                                                {c.title}
                                            </h5>
                                            <span className="text-[11px] text-muted-foreground">
                                                {c.issuer} · {c.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer Sign-off */}
                        <footer className="border-t border-border/80 pt-6 text-center text-xs text-muted-foreground">
                            <p>
                                تم استخراج وتحديث هذه السيرة الذاتية عبر الموقع
                                الرسمي:{' '}
                                <strong className="text-foreground">
                                    alshujaa.tech
                                </strong>
                            </p>
                        </footer>
                    </article>
                </div>
            </div>
        </>
    );
}
