import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { PlusCircle, Edit3, Trash2, Sparkles, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ImageDropzone } from '@/components/portfolio/image-dropzone';
import type { Service } from '@/types/portfolio';

interface AdminServicesProps {
    services: Service[];
}

export default function AdminServices({ services }: AdminServicesProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        title: '',
        slug: '',
        short_description: '',
        detailed_description: '',
        additional_info: '',
        icon: '/images/s1.png',
        features: '' as string | string[],
        technologies: '' as string | string[],
    });

    const openAddModal = () => {
        reset();
        setEditingService(null);
        setIsModalOpen(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setData({
            title: service.title,
            slug: service.slug,
            short_description: service.short_description,
            detailed_description: service.detailed_description,
            additional_info: service.additional_info || '',
            icon: service.icon || '/images/s1.png',
            features: (service.features || []).join(', '),
            technologies: (service.technologies || []).join(', '),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: any = {
            ...data,
            features: typeof data.features === 'string'
                ? data.features.split(',').map((s) => s.trim()).filter(Boolean)
                : data.features,
            technologies: typeof data.technologies === 'string'
                ? data.technologies.split(',').map((s) => s.trim()).filter(Boolean)
                : data.technologies,
        };

        if (editingService) {
            router.put(`/admin/services/${editingService.id}`, payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingService(null);
                },
            });
        } else {
            router.post('/admin/services', payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`هل أنت متأكد من رغبتك في حذف خدمة "${title}"؟`)) {
            router.delete(`/admin/services/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
            <Head title="إدارة الخدمات الرقمية — لوحة التحكم" />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-card border border-border/80 rounded-2xl shadow-sm">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <ArrowRight className="size-3" />
                                العودة للوحة التحكم
                            </Link>
                        </div>
                        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                            <Sparkles className="size-6 text-primary" />
                            إدارة الخدمات والحلول الرقمية
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            إضافة وتحديث الخدمات الرقمية وباقات العمل المعروضة للعملاء والزوار ({services.length} خدمة).
                        </p>
                    </div>

                    <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold shadow-md">
                        <PlusCircle className="size-4" />
                        إضافة خدمة جديدة
                    </Button>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-sm space-y-4"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border flex items-center justify-center overflow-hidden shrink-0">
                                        {service.icon?.startsWith('/') || service.icon?.includes('.') ? (
                                            <img src={service.icon} alt="" className="w-8 h-8 object-contain" />
                                        ) : (
                                            <Layers className="size-6 text-primary" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => openEditModal(service)}
                                            className="p-1.5 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                            title="تعديل"
                                        >
                                            <Edit3 className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id, service.title)}
                                            className="p-1.5 rounded-lg border border-border/80 hover:bg-red-500/10 text-destructive transition-colors"
                                            title="حذف"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-foreground mb-1">{service.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {service.short_description}
                                </p>

                                {service.technologies && service.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {service.technologies.map((t, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-[10px]">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                                >
                                    معاينة في الموقع
                                    <ExternalLink className="size-3" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            {editingService ? 'تعديل الخدمة الرقمية' : 'إضافة خدمة جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل تفاصيل الخدمة والتقنيات والمميزات المصاحبة لها.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">عنوان الخدمة *</label>
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="مثال: تطوير تطبيقات الموبايل"
                                    required
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">المعرف اللطيف (Slug)</label>
                                <Input
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="اتركه فارغاً للتوليد التلقائي"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">الوصف المختصر *</label>
                            <Input
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                placeholder="سطر أو سطرين يصفان القيمة الأساسية للخدمة"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">الوصف التفصيلي *</label>
                            <Textarea
                                rows={4}
                                value={data.detailed_description}
                                onChange={(e) => setData('detailed_description', e.target.value)}
                                placeholder="شرح معمق لما تتضمنه الخدمة، نطاق العمل، ومخرجات التسليم"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">أيقونة أو صورة الخدمة (مسار محلي أو رفع)</label>
                            <div className="flex gap-2">
                                <Input
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="/images/s1.png"
                                    dir="ltr"
                                />
                            </div>
                            <div className="pt-1">
                                <ImageDropzone
                                    label="أو اسحب وأفلت أيقونة/صورة جديدة"
                                    value={data.icon}
                                    onChange={(url: string) => setData('icon', url)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">المميزات (مفصولة بفواصل)</label>
                                <Input
                                    value={data.features as string}
                                    onChange={(e) => setData('features', e.target.value)}
                                    placeholder="Flutter, UI/UX, REST APIs"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">التقنيات (مفصولة بفواصل)</label>
                                <Input
                                    value={data.technologies as string}
                                    onChange={(e) => setData('technologies', e.target.value)}
                                    placeholder="Flutter, Dart, Firebase"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">معلومات إضافية (اختياري)</label>
                            <Input
                                value={data.additional_info}
                                onChange={(e) => setData('additional_info', e.target.value)}
                                placeholder="مثلاً: مدة التسليم، شروط الاستضافة، الدعم الفني"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground font-bold"
                            >
                                {editingService ? 'تحديث الخدمة' : 'حفظ الخدمة'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
