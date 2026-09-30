import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusCircle, Edit3, Trash2, Award, ExternalLink } from 'lucide-react';
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
import type { Certificate } from '@/types/portfolio';

interface AdminCertificatesProps {
    certificates: Certificate[];
}

export default function AdminCertificates({ certificates }: AdminCertificatesProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState<Certificate | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        title: '',
        issuer: '',
        date: '2024',
        category: 'data-ai',
        category_label: 'علوم البيانات والذكاء الاصطناعي',
        image: '',
        credential_url: '',
        description: '',
    });

    const openAddModal = () => {
        reset();
        setEditingCert(null);
        setIsModalOpen(true);
    };

    const openEditModal = (cert: Certificate) => {
        setEditingCert(cert);
        setData({
            title: cert.title,
            issuer: cert.issuer,
            date: cert.date,
            category: cert.category,
            category_label: cert.category_label,
            image: cert.image || '',
            credential_url: cert.credential_url || '',
            description: cert.description || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCert) {
            put(`/admin/certificates/${editingCert.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingCert(null);
                },
            });
        } else {
            post('/admin/certificates', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
            router.delete(`/admin/certificates/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Head title="إدارة الشهادات والجوائز" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/80 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Award className="size-6 text-primary" />
                        إدارة الشهادات والجوائز
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        تحكم بقائمة الشهادات المعتمدة وروابط التحقق وصور الغلاف ({certificates.length} شهادة مسجلة).
                    </p>
                </div>

                <Button onClick={openAddModal} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-md">
                    <PlusCircle className="size-4" />
                    إضافة شهادة جديدة
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="bg-muted/50 border-b border-border/80 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">عنوان الشهادة</th>
                                <th className="p-4">الجهة المانحة</th>
                                <th className="p-4">التاريخ</th>
                                <th className="p-4">التصنيف</th>
                                <th className="p-4">رابط الاعتماد</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {certificates.map((cert) => (
                                <tr key={cert.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-3">
                                            {cert.image && (
                                                <img
                                                    src={cert.image}
                                                    alt=""
                                                    className="size-10 rounded-lg object-cover bg-muted shrink-0"
                                                />
                                            )}
                                            <span>{cert.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{cert.issuer}</td>
                                    <td className="p-4 font-mono text-muted-foreground">{cert.date}</td>
                                    <td className="p-4">
                                        <Badge variant="outline" className="text-[10px]">
                                            {cert.category_label}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        {cert.credential_url && (
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline flex items-center gap-1"
                                            >
                                                <span>تحقق</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        )}
                                    </td>
                                    <td className="p-4 text-left">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(cert)}
                                                className="size-8 rounded-lg"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(cert.id)}
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
                <DialogContent className="max-w-lg p-6 rounded-3xl">
                    <DialogHeader className="text-right space-y-1">
                        <DialogTitle className="text-lg font-bold">
                            {editingCert ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل تفاصيل الشهادة والجهة المصدرة ورابط التحقق.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">عنوان الشهادة أو التكريم *</label>
                            <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="مثال: Python for Data Science & AI"
                                required
                                className="rounded-xl"
                            />
                            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">الجهة المانحة *</label>
                                <Input
                                    value={data.issuer}
                                    onChange={(e) => setData('issuer', e.target.value)}
                                    placeholder="IBM / جامعة إب"
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">السنة / التاريخ *</label>
                                <Input
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    placeholder="2024"
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">التصنيف *</label>
                            <select
                                value={data.category}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const labels: Record<string, string> = {
                                        'data-ai': 'علوم البيانات والذكاء الاصطناعي',
                                        academic: 'التكريمات الأكاديمية والجامعية',
                                        mobile: 'تطبيقات الهواتف الذكية',
                                        web: 'تطوير الويب والخوادم',
                                    };
                                    setData({
                                        ...data,
                                        category: val,
                                        category_label: labels[val] || val,
                                    });
                                }}
                                className="w-full h-9 rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                            >
                                <option value="data-ai">علوم البيانات والذكاء الاصطناعي</option>
                                <option value="academic">التكريمات الأكاديمية والجامعية</option>
                                <option value="mobile">تطبيقات الهواتف الذكية</option>
                                <option value="web">تطوير الويب والخوادم</option>
                            </select>
                        </div>

                        <ImageDropzone
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            label="صورة وثيقة الشهادة أو الشعار الرسمي"
                            description="اسحب وأفلت صورة الشهادة هنا. سيتم ضغطها وتخزينها بأفضل دقة."
                        />

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">رابط التحقق الرسمي من الشهادة</label>
                            <Input
                                value={data.credential_url}
                                onChange={(e) => setData('credential_url', e.target.value)}
                                placeholder="https://coursera.org/verify/..."
                                className="rounded-xl font-mono text-xs"
                                dir="ltr"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">نبذة مختصرة عن محتوى الشهادة</label>
                            <Textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="اكتب المهارات المكتسبة..."
                                className="rounded-xl"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
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
                                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                            >
                                {processing ? 'جارٍ الحفظ...' : editingCert ? 'حفظ التعديلات' : 'إضافة الشهادة'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
