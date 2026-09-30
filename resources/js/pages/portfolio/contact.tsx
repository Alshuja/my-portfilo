import { Head, useForm } from '@inertiajs/react';
import { Phone, Send, Mail, CheckCircle2, MessageSquare, Instagram, Github } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { playClickSound } from '@/components/portfolio/sound-effects';
import type { ProfileSettings } from '@/types/portfolio';

interface ContactPageProps {
    settings: ProfileSettings;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function ContactPage({ settings, flash }: ContactPageProps) {
    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClickSound(800, 0.04);
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <PortfolioLayout>
            <Head title="تواصل معي وقنوات فكرة مبرمج" />

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16">
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        قنوات التواصل الرسمية
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        دعنا نتحدث ونبني شيئاً رائعاً معاً
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        يسعدني التواصل معك ومناقشة أفكار المشاريع البرمجية، حلول علوم البيانات والذكاء الاصطناعي، أو التعاون التقني في أي وقت.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Channels Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        <a
                            href={`https://wa.me/${(settings.whatsapp_1 || '+967773853853').replace(/\+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-3xl border border-border/80 bg-card hover:border-emerald-500/50 transition-all flex items-center gap-4 group shadow-sm"
                        >
                            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                                <Phone className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-foreground">واتساب مباشر (1)</h3>
                                <div className="text-sm font-mono text-muted-foreground" dir="ltr">
                                    {settings.whatsapp_1 || '+967 773 853 853'}
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    مراسلة فورية لمناقشة المشاريع والعمل الحر
                                </p>
                            </div>
                        </a>

                        <a
                            href={`https://wa.me/${(settings.whatsapp_2 || '+967777580845').replace(/\+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-3xl border border-border/80 bg-card hover:border-emerald-500/50 transition-all flex items-center gap-4 group shadow-sm"
                        >
                            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                                <Phone className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-foreground">واتساب مباشر (2)</h3>
                                <div className="text-sm font-mono text-muted-foreground" dir="ltr">
                                    {settings.whatsapp_2 || '+967 777 580 845'}
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    خط التواصل المباشر الثاني
                                </p>
                            </div>
                        </a>

                        <a
                            href={settings.telegram || 'https://t.me/Alshuja_ai'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-3xl border border-border/80 bg-card hover:border-sky-500/50 transition-all flex items-center gap-4 group shadow-sm"
                        >
                            <div className="size-14 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                                <Send className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-foreground">تيليجرام شخصي</h3>
                                <div className="text-sm font-mono text-muted-foreground" dir="ltr">
                                    @Alshuja_ai
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    للمحادثات التقنية ومناقشات البرمجة
                                </p>
                            </div>
                        </a>

                        <a
                            href={settings.instagram || 'https://www.instagram.com/alshujaa'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-3xl border border-border/80 bg-card hover:border-pink-500/50 transition-all flex items-center gap-4 group shadow-sm"
                        >
                            <div className="size-14 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
                                <Instagram className="size-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-foreground">انستغرام</h3>
                                <div className="text-sm font-mono text-muted-foreground" dir="ltr">
                                    @alshujaa
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    متابعة التحديثات والأنشطة اليومية
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-7">
                        <div className="p-8 md:p-10 rounded-3xl border border-border/80 bg-card shadow-xl space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    أرسل رسالتك وسأرد عليك سريعاً
                                </h3>
                                <p className="text-xs text-muted-foreground pt-1">
                                    املأ الحقول التالية وسيتم استلام رسالتك وتخزينها في لوحة التحكم.
                                </p>
                            </div>

                            {recentlySuccessful && (
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                                    <CheckCircle2 className="size-5 shrink-0" />
                                    <span>تم إرسال رسالتك بنجاح! شكراً لك.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">الاسم الكريم *</label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="أدخل اسمك"
                                            required
                                            className="rounded-xl border-border/80"
                                        />
                                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">البريد الإلكتروني *</label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@example.com"
                                            required
                                            className="rounded-xl border-border/80"
                                        />
                                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">رقم الهاتف (اختياري)</label>
                                        <Input
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+967..."
                                            className="rounded-xl border-border/80 font-mono"
                                            dir="ltr"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">موضوع الرسالة (اختياري)</label>
                                        <Input
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="مشروع جديد، استفسار..."
                                            className="rounded-xl border-border/80"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">نص الرسالة *</label>
                                    <Textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="اكتب رسالتك وتفاصيل استفسارك هنا..."
                                        required
                                        className="rounded-xl border-border/80"
                                    />
                                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-md py-6 text-base"
                                >
                                    <Send className="size-4" />
                                    {processing ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
