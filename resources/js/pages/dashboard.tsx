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
import type { ContactMessage, Project, ProfileSettings } from '@/types/portfolio';

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
        router.patch(`/admin/messages/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (!confirm('هل أنت متأكد من رغبتك في استيراد بيانات النسخة الاحتياطية؟ سيتم تحديث وتحديث السجلات المسجلة بالملف.')) {
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
        <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
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
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="size-4 sm:size-5 shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}
            {flash?.error && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="size-4 sm:size-5 shrink-0" />
                    <span>{flash.error}</span>
                </div>
            )}

            {/* Top Welcome Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-card via-card to-primary/5 border border-border/80 shadow-sm">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-primary-foreground font-medium px-2.5 py-0.5 text-xs">
                            <Terminal className="size-3 ml-1" />
                            لوحة الإدارة الرئيسية
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">Laravel 12 &amp; Inertia React</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        مرحباً بك، يا مهندس عبدالرحمن!
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        تحكم بكافة محتويات الموقع الشخصي، المشاريع، المهارات، المقالات ورسائل الزوار من هنا.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button asChild variant="outline" className="rounded-xl border-border/80 gap-1.5 text-xs">
                        <a href="/admin/backup/export" download title="تصدير نسخة احتياطية لكافة بيانات الموقع بصيغة JSON">
                            <Download className="size-3.5" />
                            تصدير JSON
                        </a>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => backupInputRef.current?.click()}
                        disabled={isImporting}
                        className="rounded-xl border-border/80 gap-1.5 text-xs"
                        title="استيراد وتحديث قاعدة البيانات من ملف JSON"
                    >
                        {isImporting ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                        استيراد JSON
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl border-border/80 gap-1.5 text-xs">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-3.5" />
                            معاينة الموقع
                        </a>
                    </Button>
                    <Button asChild className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 font-bold shadow-md text-xs">
                        <Link href="/admin/projects">
                            <PlusCircle className="size-3.5" />
                            إضافة مشروع
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {statCards.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                        <Link
                            key={idx}
                            href={c.href}
                            className="p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between space-y-3 group"
                        >
                            <div className="flex items-center justify-between">
                                <div className={`size-10 rounded-xl flex items-center justify-center border ${c.color}`}>
                                    <Icon className="size-5" />
                                </div>
                                {c.unread !== undefined && c.unread > 0 && (
                                    <Badge className="bg-red-500 text-white font-mono text-[10px] px-1.5 py-0.2">
                                        {c.unread} جديد
                                    </Badge>
                                )}
                            </div>
                            <div>
                                <div className="text-2xl font-black text-foreground font-mono group-hover:text-primary transition-colors">
                                    {c.count}
                                </div>
                                <div className="text-xs text-muted-foreground font-medium pt-0.5">
                                    {c.title}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Messages Column */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <MessageSquare className="size-5 text-primary" />
                            أحدث رسائل التواصل الواردة
                        </h2>
                        <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
                            <Link href="/admin/messages">عرض كل الرسائل</Link>
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm divide-y divide-border/60">
                        {recentMessages.length === 0 ? (
                            <div className="p-8 text-center text-xs text-muted-foreground">
                                لا توجد رسائل جديدة واردة حتى الآن.
                            </div>
                        ) : (
                            recentMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-4 transition-colors flex items-start justify-between gap-4 ${
                                        !msg.is_read ? 'bg-primary/5' : 'hover:bg-muted/40'
                                    }`}
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-foreground">{msg.name}</span>
                                            {!msg.is_read && (
                                                <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.2">
                                                    جديدة
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-3 font-mono">
                                            <span>{msg.email}</span>
                                            {msg.phone && <span>• {msg.phone}</span>}
                                        </div>
                                        <p className="text-xs text-foreground/80 line-clamp-2 pt-1">
                                            {msg.message}
                                        </p>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleMessageRead(msg.id)}
                                        className="text-xs shrink-0 rounded-lg"
                                    >
                                        {msg.is_read ? 'تعيين كغير مقروء' : 'تمت القراءة'}
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Profile Settings Form */}
                <div className="lg:col-span-5 space-y-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Settings className="size-5 text-primary" />
                        تحديث الروابط وقنوات التواصل
                    </h2>

                    <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-4">
                        {recentlySuccessful && (
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                                <CheckCircle2 className="size-4 shrink-0" />
                                <span>تم حفظ الإعدادات بنجاح.</span>
                            </div>
                        )}

                        <form onSubmit={handleSaveSettings} className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">واتساب الرئيسي</label>
                                <Input
                                    value={data.settings.whatsapp_1}
                                    onChange={(e) =>
                                        setData('settings', { ...data.settings, whatsapp_1: e.target.value })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">واتساب الخط الثاني</label>
                                <Input
                                    value={data.settings.whatsapp_2}
                                    onChange={(e) =>
                                        setData('settings', { ...data.settings, whatsapp_2: e.target.value })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">رابط تيليجرام</label>
                                <Input
                                    value={data.settings.telegram}
                                    onChange={(e) =>
                                        setData('settings', { ...data.settings, telegram: e.target.value })
                                    }
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-foreground">شارة الحالة في الصفحة الرئيسية</label>
                                <Input
                                    value={data.settings.status_badge}
                                    onChange={(e) =>
                                        setData('settings', { ...data.settings, status_badge: e.target.value })
                                    }
                                    className="rounded-xl text-xs"
                                />
                            </div>

                            <div className="space-y-2 pt-2 border-t border-border/60">
                                <label className="text-xs font-bold text-foreground flex items-center justify-between">
                                    <span>الصورة الشخصية الرئيسية (مع الإطار الأحمر والأبيض)</span>
                                    <span className="text-[10px] text-muted-foreground font-normal">تظهر في الصفحة الرئيسية وصفحة السيرة</span>
                                </label>
                                <ImageDropzone
                                    value={data.settings.hero_image}
                                    onChange={(url) =>
                                        setData('settings', { ...data.settings, hero_image: url })
                                    }
                                    label="اسحب صورة الهيرو الشخصية أو اختر ملفاً"
                                />
                                {data.settings.hero_image && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
                                        <div
                                            className="shrink-0 rounded-lg overflow-hidden"
                                            style={{
                                                borderTop: '4px solid #FFFFFF',
                                                borderRight: '4px solid #FFFFFF',
                                                borderBottom: '4px solid #D71916',
                                                borderLeft: '4px solid #D71916',
                                            }}
                                        >
                                            <img
                                                src={data.settings.hero_image}
                                                alt="معاينة الإطار"
                                                className="size-14 object-cover"
                                            />
                                        </div>
                                        <div className="text-xs space-y-0.5">
                                            <div className="font-bold text-foreground">معاينة الإطار المزدوج (أحمر وأبيض)</div>
                                            <div className="text-muted-foreground text-[11px]">يتم تطبيق الإطار الأيقوني تلقائياً في واجهة الموقع</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-sm text-xs mt-2"
                            >
                                <Send className="size-3.5" />
                                {processing ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                            </Button>
                        </form>
                    </div>

                    {/* Database JSON Backup & Restore Card */}
                    <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <Database className="size-4" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-foreground">النسخ الاحتياطي واستعادة البيانات</h3>
                                <p className="text-[11px] text-muted-foreground">تصدير واستيراد قاعدة البيانات بصيغة JSON</p>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                            يتطابق نظام النسخ الاحتياطي مع بنية ملفات التصميم السابق (JSON Data Store)، مما يتيح لك حفظ نسخة آمنة من كافة المشاريع والمهارات والشهادات والمقالات واستعادتها بضغطة زر واحدة.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <Button asChild variant="outline" className="w-full rounded-xl gap-2 text-xs border-border/80">
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
                                className="w-full rounded-xl gap-2 text-xs font-semibold"
                            >
                                {isImporting ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                                {isImporting ? 'جارٍ الاستيراد...' : 'استيراد JSON'}
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
