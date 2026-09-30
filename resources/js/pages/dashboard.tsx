import { useState, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    FolderGit2,
    Cpu,
    Award,
    Route,
    Newspaper,
    MessageSquare,
    PlusCircle,
    ExternalLink,
    Mail,
    Phone,
    CheckCircle2,
    Calendar,
    Settings,
    Send,
    Terminal,
    Download,
    Upload,
    Database,
    FileJson,
    Loader2,
    AlertCircle,
    Sparkles,
    MessageSquareQuote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ImageDropzone } from '@/components/portfolio/image-dropzone';
import { dashboard } from '@/routes';
import type {
    ContactMessage,
    Project,
    ProfileSettings,
} from '@/types/portfolio';

interface DashboardProps {
    stats: {
        projects: number;
        services?: number;
        testimonials?: number;
        skills: number;
        certificates: number;
        journey: number;
        articles: number;
        messages: number;
        unreadMessages: number;
    };
    recentMessages: ContactMessage[];
    recentProjects: Project[];
    settings: ProfileSettings;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Dashboard({
    stats,
    recentMessages,
    recentProjects,
    settings,
    flash,
}: DashboardProps) {
    const [isImporting, setIsImporting] = useState(false);
    const backupInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        settings: {
            whatsapp_1: settings.whatsapp_1 || '',
            whatsapp_2: settings.whatsapp_2 || '',
            telegram: settings.telegram || '',
            cv_url: settings.cv_url || '',
            status_badge: settings.status_badge || '',
            hero_image: settings.hero_image || '/images/profile-hero.png',
            about_image: settings.about_image || '/images/about-img.png',
        },
    });

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings', { preserveScroll: true });
    };

    const toggleMessageRead = (id: number) => {
        router.patch(
            `/admin/messages/${id}/toggle-read`,
            {},
            { preserveScroll: true },
        );
    };

    const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (
            !confirm(
                'هل أنت متأكد من رغبتك في استيراد بيانات النسخة الاحتياطية؟ سيتم تحديث وتحديث السجلات المسجلة بالملف.',
            )
        ) {
            if (backupInputRef.current) backupInputRef.current.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('backup_file', file);

        router.post('/admin/backup/import', formData, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => setIsImporting(true),
            onFinish: () => {
                setIsImporting(false);
                if (backupInputRef.current) backupInputRef.current.value = '';
            },
        });
    };

    const statCards = [
        {
            title: 'المشاريع المسجلة',
            count: stats.projects,
            icon: FolderGit2,
            href: '/admin/projects',
            color: 'text-red-500 bg-red-500/10 border-red-500/20',
        },
        {
            title: 'الخدمات الرقمية',
            count: stats.services ?? 0,
            icon: Sparkles,
            href: '/admin/services',
            color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
        },
        {
            title: 'آراء وتوصيات العملاء',
            count: stats.testimonials ?? 0,
            icon: MessageSquareQuote,
            href: '/admin/testimonials',
            color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
        },
        {
            title: 'المهارات التقنية',
            count: stats.skills,
            icon: Cpu,
            href: '/admin/skills',
            color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        },
        {
            title: 'الشهادات والجوائز',
            count: stats.certificates,
            icon: Award,
            href: '/admin/certificates',
            color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        },
        {
            title: 'محطات المسار',
            count: stats.journey,
            icon: Route,
            href: '/admin/journey',
            color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        },
        {
            title: 'المقالات المنشورة',
            count: stats.articles,
            icon: Newspaper,
            href: '/admin/articles',
            color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
        },
        {
            title: 'رسائل التواصل',
            count: stats.messages,
            unread: stats.unreadMessages,
            icon: MessageSquare,
            href: '/admin/messages',
            color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
        },
    ];

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 md:p-8">
            <Head title="لوحة التحكم والإدارة" />

            {/* Hidden Backup File Input */}
            <input
                ref={backupInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportBackup}
                className="hidden"
            />

            {/* Flash Notifications */}
            {flash?.success && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-600 sm:text-sm dark:text-emerald-400">
                    <CheckCircle2 className="size-4 shrink-0 sm:size-5" />
                    <span>{flash.success}</span>
                </div>
            )}
            {flash?.error && (
                <div className="flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-xs text-destructive sm:text-sm">
                    <AlertCircle className="size-4 shrink-0 sm:size-5" />
                    <span>{flash.error}</span>
                </div>
            )}

            {/* Top Welcome Banner */}
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                            <Terminal className="ml-1 size-3" />
                            لوحة الإدارة الرئيسية
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">
                            Laravel 12 &amp; Inertia React
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        مرحباً بك، يا مهندس عبدالرحمن!
                    </h1>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                        تحكم بكافة محتويات الموقع الشخصي، المشاريع، المهارات،
                        المقالات ورسائل الزوار من هنا.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        asChild
                        variant="outline"
                        className="gap-1.5 rounded-xl border-border/80 text-xs"
                    >
                        <a
                            href="/admin/backup/export"
                            download
                            title="تصدير نسخة احتياطية لكافة بيانات الموقع بصيغة JSON"
                        >
                            <Download className="size-3.5" />
                            تصدير JSON
                        </a>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => backupInputRef.current?.click()}
                        disabled={isImporting}
                        className="gap-1.5 rounded-xl border-border/80 text-xs"
                        title="استيراد وتحديث قاعدة البيانات من ملف JSON"
                    >
                        {isImporting ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <Upload className="size-3.5" />
                        )}
                        استيراد JSON
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="gap-1.5 rounded-xl border-border/80 text-xs"
                    >
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-3.5" />
                            معاينة الموقع
                        </a>
                    </Button>
                    <Button
                        asChild
                        className="gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                    >
                        <Link href="/admin/projects">
                            <PlusCircle className="size-3.5" />
                            إضافة مشروع
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
                {statCards.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                        <Link
                            key={idx}
                            href={c.href}
                            className="group flex flex-col justify-between space-y-3 rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50"
                        >
                            <div className="flex items-center justify-between">
                                <div
                                    className={`flex size-10 items-center justify-center rounded-xl border ${c.color}`}
                                >
                                    <Icon className="size-5" />
                                </div>
                                {c.unread !== undefined && c.unread > 0 && (
                                    <Badge className="py-0.2 bg-red-500 px-1.5 font-mono text-[10px] text-white">
                                        {c.unread} جديد
                                    </Badge>
                                )}
                            </div>
                            <div>
                                <div className="font-mono text-2xl font-black text-foreground transition-colors group-hover:text-primary">
                                    {c.count}
                                </div>
                                <div className="pt-0.5 text-xs font-medium text-muted-foreground">
                                    {c.title}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Recent Messages Column */}
                <div className="space-y-4 lg:col-span-7">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                            <MessageSquare className="size-5 text-primary" />
                            أحدث رسائل التواصل الواردة
                        </h2>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary"
                        >
                            <Link href="/admin/messages">عرض كل الرسائل</Link>
                        </Button>
                    </div>

                    <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
                        {recentMessages.length === 0 ? (
                            <div className="p-8 text-center text-xs text-muted-foreground">
                                لا توجد رسائل جديدة واردة حتى الآن.
                            </div>
                        ) : (
                            recentMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-start justify-between gap-4 p-4 transition-colors ${
                                        !msg.is_read
                                            ? 'bg-primary/5'
                                            : 'hover:bg-muted/40'
                                    }`}
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-foreground">
                                                {msg.name}
                                            </span>
                                            {!msg.is_read && (
                                                <Badge className="py-0.2 bg-primary px-1.5 text-[10px] text-primary-foreground">
                                                    جديدة
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                                            <span>{msg.email}</span>
                                            {msg.phone && (
                                                <span>• {msg.phone}</span>
                                            )}
                                        </div>
                                        <p className="line-clamp-2 pt-1 text-xs text-foreground/80">
                                            {msg.message}
                                        </p>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            toggleMessageRead(msg.id)
                                        }
                                        className="shrink-0 rounded-lg text-xs"
                                    >
                                        {msg.is_read
                                            ? 'تعيين كغير مقروء'
                                            : 'تمت القراءة'}
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Profile Settings Form */}
                <div className="space-y-4 lg:col-span-5">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                        <Settings className="size-5 text-primary" />
                        تحديث الروابط وقنوات التواصل
                    </h2>

                    <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="size-4 shrink-0" />
                                <span>تم حفظ الإعدادات بنجاح.</span>
                            </div>
                        )}

                        <form
                            onSubmit={handleSaveSettings}
                            className="space-y-3"
                        >
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">
                                    واتساب الرئيسي
                                </label>
                                <Input
                                    value={data.settings.whatsapp_1}
                                    onChange={(e) =>
                                        setData('settings', {
                                            ...data.settings,
                                            whatsapp_1: e.target.value,
                                        })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">
                                    واتساب الخط الثاني
                                </label>
                                <Input
                                    value={data.settings.whatsapp_2}
                                    onChange={(e) =>
                                        setData('settings', {
                                            ...data.settings,
                                            whatsapp_2: e.target.value,
                                        })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">
                                    رابط تيليجرام
                                </label>
                                <Input
                                    value={data.settings.telegram}
                                    onChange={(e) =>
                                        setData('settings', {
                                            ...data.settings,
                                            telegram: e.target.value,
                                        })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">
                                    شارة الحالة في الصفحة الرئيسية
                                </label>
                                <Input
                                    value={data.settings.status_badge}
                                    onChange={(e) =>
                                        setData('settings', {
                                            ...data.settings,
                                            status_badge: e.target.value,
                                        })
                                    }
                                    className="rounded-xl text-xs"
                                />
                            </div>

                            <div className="space-y-2 border-t border-border/60 pt-2">
                                <label className="flex items-center justify-between text-xs font-bold text-foreground">
                                    <span>
                                        الصورة الشخصية الرئيسية (مع الإطار الأحمر
                                        والأبيض)
                                    </span>
                                    <span className="text-[10px] font-normal text-muted-foreground">
                                        تظهر في الصفحة الرئيسية وصفحة السيرة
                                    </span>
                                </label>
                                <ImageDropzone
                                    value={data.settings.hero_image}
                                    onChange={(url) =>
                                        setData('settings', {
                                            ...data.settings,
                                            hero_image: url,
                                        })
                                    }
                                    label="اسحب صورة الهيرو الشخصية أو اختر ملفاً"
                                />
                                {data.settings.hero_image && (
                                    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
                                        <div
                                            className="shrink-0 overflow-hidden rounded-lg"
                                            style={{
                                                borderTop: '4px solid #FFFFFF',
                                                borderRight:
                                                    '4px solid #FFFFFF',
                                                borderBottom:
                                                    '4px solid #D71916',
                                                borderLeft: '4px solid #D71916',
                                            }}
                                        >
                                            <img
                                                src={data.settings.hero_image}
                                                alt="معاينة الإطار"
                                                className="size-14 object-cover"
                                            />
                                        </div>
                                        <div className="space-y-0.5 text-xs">
                                            <div className="font-bold text-foreground">
                                                معاينة الإطار المزدوج (أحمر
                                                وأبيض)
                                            </div>
                                            <div className="text-[11px] text-muted-foreground">
                                                يتم تطبيق الإطار الأيقوني تلقائياً
                                                في واجهة الموقع
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="mt-2 w-full gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
                            >
                                <Send className="size-3.5" />
                                {processing ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                            </Button>
                        </form>
                    </div>

                    {/* Database JSON Backup & Restore Card */}
                    <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                                <Database className="size-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">
                                    النسخ الاحتياطي واستعادة البيانات
                                </h3>
                                <p className="text-[11px] text-muted-foreground">
                                    تصدير واستيراد قاعدة البيانات بصيغة JSON
                                </p>
                            </div>
                        </div>

                        <p className="text-xs leading-relaxed text-muted-foreground">
                            يتطابق نظام النسخ الاحتياطي مع بنية ملفات التصميم
                            السابق (JSON Data Store)، مما يتيح لك حفظ نسخة آمنة
                            من كافة المشاريع والمهارات والشهادات والمقالات
                            واستعادتها بضغطة زر واحدة.
                        </p>

                        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full gap-2 rounded-xl border-border/80 text-xs"
                            >
                                <a href="/admin/backup/export" download>
                                    <Download className="size-3.5" />
                                    تصدير JSON
                                </a>
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => backupInputRef.current?.click()}
                                disabled={isImporting}
                                className="w-full gap-2 rounded-xl text-xs font-semibold"
                            >
                                {isImporting ? (
                                    <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                    <Upload className="size-3.5" />
                                )}
                                {isImporting
                                    ? 'جارٍ الاستيراد...'
                                    : 'استيراد JSON'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'لوحة التحكم',
            href: dashboard(),
        },
    ],
};
