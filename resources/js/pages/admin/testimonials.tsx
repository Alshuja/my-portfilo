import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import {
    PlusCircle,
    Edit3,
    Trash2,
    MessageSquareQuote,
    Star,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';
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
import type { Testimonial } from '@/types/portfolio';

interface AdminTestimonialsProps {
    testimonials: Testimonial[];
}

export default function AdminTestimonials({
    testimonials,
}: AdminTestimonialsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] =
        useState<Testimonial | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        name: '',
        role: '',
        company: '',
        avatar: '/images/main-img.jpg',
        text: '',
        rating: 5,
    });

    const openAddModal = () => {
        reset();
        setEditingTestimonial(null);
        setIsModalOpen(true);
    };

    const openEditModal = (t: Testimonial) => {
        setEditingTestimonial(t);
        setData({
            name: t.name,
            role: t.role || '',
            company: t.company || '',
            avatar: t.avatar || '/images/main-img.jpg',
            text: t.text,
            rating: t.rating || 5,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTestimonial) {
            router.put(`/admin/testimonials/${editingTestimonial.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingTestimonial(null);
                },
            });
        } else {
            router.post('/admin/testimonials', data, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`هل أنت متأكد من رغبتك في حذف رأي العميل "${name}"؟`)) {
            router.delete(`/admin/testimonials/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8"
        >
            <Head title="إدارة آراء وتوصيات العملاء — لوحة التحكم" />

            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                            >
                                <ArrowRight className="size-3" />
                                العودة للوحة التحكم
                            </Link>
                        </div>
                        <h1 className="flex items-center gap-2 text-2xl font-black text-foreground">
                            <MessageSquareQuote className="size-6 text-primary" />
                            إدارة آراء وتوصيات العملاء
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            إدارة شهادات وتوصيات العملاء وشركاء المشاريع (
                            {testimonials.length} توصية).
                        </p>
                    </div>

                    <Button
                        onClick={openAddModal}
                        className="gap-2 bg-primary font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                    >
                        <PlusCircle className="size-4" />
                        إضافة توصية جديدة
                    </Button>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col justify-between space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50"
                        >
                            <div>
                                <div className="mb-3 flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                                            <img
                                                src={
                                                    t.avatar ||
                                                    '/images/main-img.jpg'
                                                }
                                                alt={t.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-foreground">
                                                {t.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {t.role}{' '}
                                                {t.company
                                                    ? `· ${t.company}`
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => openEditModal(t)}
                                            className="rounded-lg border border-border/80 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                            title="تعديل"
                                        >
                                            <Edit3 className="size-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(t.id, t.name)
                                            }
                                            className="rounded-lg border border-border/80 p-1.5 text-destructive transition-colors hover:bg-red-500/10"
                                            title="حذف"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-2 flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`size-3.5 ${
                                                i < (t.rating || 5)
                                                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                                                    : 'fill-muted text-muted-foreground/30'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground italic">
                                    "{t.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent
                    className="max-h-[90vh] max-w-lg overflow-y-auto"
                    dir="rtl"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            {editingTestimonial
                                ? 'تعديل التوصية'
                                : 'إضافة توصية جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            بيانات العميل أو الشريك ونص التوصية والتقييم.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                اسم العميل / الشريك *
                            </label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="مثال: فريق إدارة منصة سندباد"
                                required
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">
                                    المسمى الوظيفي / الدور
                                </label>
                                <Input
                                    value={data.role}
                                    onChange={(e) =>
                                        setData('role', e.target.value)
                                    }
                                    placeholder="مثال: المدير التنفيذي"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold">
                                    الشركة / الجهة
                                </label>
                                <Input
                                    value={data.company}
                                    onChange={(e) =>
                                        setData('company', e.target.value)
                                    }
                                    placeholder="مثال: Sinbad Marketplace"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                نص التوصية أو الرأي *
                            </label>
                            <Textarea
                                rows={4}
                                value={data.text}
                                onChange={(e) =>
                                    setData('text', e.target.value)
                                }
                                placeholder="اكتب الرأي أو التوصية هنا..."
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                التقييم (من 1 إلى 5)
                            </label>
                            <Input
                                type="number"
                                min={1}
                                max={5}
                                value={data.rating}
                                onChange={(e) =>
                                    setData(
                                        'rating',
                                        parseInt(e.target.value) || 5,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                صورة العميل (مسار محلي أو رفع)
                            </label>
                            <Input
                                value={data.avatar}
                                onChange={(e) =>
                                    setData('avatar', e.target.value)
                                }
                                placeholder="/images/main-img.jpg"
                                dir="ltr"
                            />
                            <div className="pt-1">
                                <ImageDropzone
                                    label="أو اسحب وأفلت صورة العميل"
                                    value={data.avatar}
                                    onChange={(url: string) =>
                                        setData('avatar', url)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 border-t pt-4">
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
                                className="bg-primary font-bold text-primary-foreground"
                            >
                                {editingTestimonial
                                    ? 'تحديث التوصية'
                                    : 'حفظ التوصية'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
