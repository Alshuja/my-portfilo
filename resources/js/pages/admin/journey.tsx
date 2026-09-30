import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusCircle, Edit3, Trash2, Route, Rocket } from 'lucide-react';
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
import type { Journey } from '@/types/portfolio';

interface AdminJourneyProps {
    journey: Journey[];
}

export default function AdminJourney({ journey }: AdminJourneyProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJourney, setEditingJourney] = useState<Journey | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        title: '',
        role: '',
        date_range: '2024 - 2025',
        category: 'work',
        category_label: 'خبرة ومشاريع كبرى',
        icon: 'rocket',
        description: '',
    });

    const openAddModal = () => {
        reset();
        setEditingJourney(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item: Journey) => {
        setEditingJourney(item);
        setData({
            title: item.title,
            role: item.role,
            date_range: item.date_range,
            category: item.category,
            category_label: item.category_label,
            icon: item.icon,
            description: item.description,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingJourney) {
            put(`/admin/journey/${editingJourney.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingJourney(null);
                },
            });
        } else {
            post('/admin/journey', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه المحطة؟')) {
            router.delete(`/admin/journey/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
            <Head title="إدارة المسار والمحطات" />

            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                        <Route className="size-6 text-primary" />
                        إدارة المسار والمحطات
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        تحكم بمحطات المسار التعليمي والمهني والمبادرات (
                        {journey.length} محطة مسجلة).
                    </p>
                </div>

                <Button
                    onClick={openAddModal}
                    className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                    <PlusCircle className="size-4" />
                    إضافة محطة جديدة
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="border-b border-border/80 bg-muted/50 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">عنوان المحطة</th>
                                <th className="p-4">المسمى / التخصص</th>
                                <th className="p-4">الفترة</th>
                                <th className="p-4">النوع</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {journey.map((item) => (
                                <tr
                                    key={item.id}
                                    className="transition-colors hover:bg-muted/30"
                                >
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                                                <Rocket className="size-4" />
                                            </div>
                                            <span>{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{item.role}</td>
                                    <td className="p-4 font-mono text-muted-foreground">
                                        {item.date_range}
                                    </td>
                                    <td className="p-4">
                                        <Badge
                                            variant="outline"
                                            className="text-[10px]"
                                        >
                                            {item.category_label}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-left">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    openEditModal(item)
                                                }
                                                className="size-8 rounded-lg"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="size-8 rounded-lg hover:text-destructive"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-lg rounded-3xl p-6">
                    <DialogHeader className="space-y-1 text-right">
                        <DialogTitle className="text-lg font-bold">
                            {editingJourney
                                ? 'تعديل المحطة'
                                : 'إضافة محطة جديدة في المسار'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل تفاصيل الإنجاز أو المحطة الأكاديمية والمهنية.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                عنوان المحطة أو الإنجاز *
                            </label>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="مثال: تطوير منصة سندباد ومحفظة ريال"
                                required
                                className="rounded-xl"
                            />
                            {errors.title && (
                                <p className="text-xs text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    المسمى / التخصص *
                                </label>
                                <Input
                                    value={data.role}
                                    onChange={(e) =>
                                        setData('role', e.target.value)
                                    }
                                    placeholder="Full-Stack Developer"
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    الفترة الزمنية *
                                </label>
                                <Input
                                    value={data.date_range}
                                    onChange={(e) =>
                                        setData('date_range', e.target.value)
                                    }
                                    placeholder="2024 - 2025"
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                نوع المحطة *
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const labels: Record<string, string> = {
                                        work: 'خبرة ومشاريع كبرى',
                                        learning: 'تعلّم وتخصص',
                                        community: 'مبادرة ومجتمع',
                                        education: 'تعليم أكاديمي وجامعي',
                                    };
                                    setData({
                                        ...data,
                                        category: val,
                                        category_label: labels[val] || val,
                                    });
                                }}
                                className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                            >
                                <option value="work">خبرة ومشاريع كبرى</option>
                                <option value="learning">تعلّم وتخصص</option>
                                <option value="community">مبادرة ومجتمع</option>
                                <option value="education">
                                    تعليم أكاديمي وجامعي
                                </option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                نبذة تفصيلية *
                            </label>
                            <Textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="اكتب نبذة مختصرة عن الإنجاز..."
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-xl"
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                            >
                                {processing
                                    ? 'جارٍ الحفظ...'
                                    : editingJourney
                                      ? 'حفظ التعديلات'
                                      : 'إضافة المحطة'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
