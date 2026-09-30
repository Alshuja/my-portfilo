import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusCircle, Edit3, Trash2, Newspaper, Eye, EyeOff, ExternalLink } from 'lucide-react';
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
import type { Article } from '@/types/portfolio';

interface AdminArticlesProps {
    articles: Article[];
}

export default function AdminArticles({ articles }: AdminArticlesProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        title: '',
        slug: '',
        category: 'data-ai',
        category_label: 'علوم البيانات والذكاء الاصطناعي',
        reading_time: '5 دقائق قراءة',
        author: 'عبدالرحمن عادل الشجاع',
        date: '2025',
        image: '',
        excerpt: '',
        body: '',
        tags: '',
        is_published: true,
    });

    const openAddModal = () => {
        reset();
        setEditingArticle(null);
        setIsModalOpen(true);
    };

    const openEditModal = (art: Article) => {
        setEditingArticle(art);
        setData({
            title: art.title,
            slug: art.slug,
            category: art.category,
            category_label: art.category_label,
            reading_time: art.reading_time,
            author: art.author,
            date: art.date,
            image: art.image || '',
            excerpt: art.excerpt,
            body: art.body,
            tags: art.tags ? art.tags.join(', ') : '',
            is_published: art.is_published,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingArticle) {
            put(`/admin/articles/${editingArticle.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingArticle(null);
                },
            });
        } else {
            post('/admin/articles', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            router.delete(`/admin/articles/${id}`, { preserveScroll: true });
        }
    };

    const handleTogglePublish = (id: number) => {
        router.patch(`/admin/articles/${id}/toggle-publish`, {}, { preserveScroll: true });
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Head title="إدارة المدونة والمقالات" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/80 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Newspaper className="size-6 text-primary" />
                        إدارة المدونة والمقالات
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        كتابة ونشر المقالات التقنية والشروحات ({articles.length} مقال مسجل).
                    </p>
                </div>

                <Button onClick={openAddModal} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-md">
                    <PlusCircle className="size-4" />
                    كتابة مقال جديد
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="bg-muted/50 border-b border-border/80 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">عنوان المقال</th>
                                <th className="p-4">التصنيف</th>
                                <th className="p-4">التاريخ</th>
                                <th className="p-4">الحالة</th>
                                <th className="p-4">معاينة</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {articles.map((art) => (
                                <tr key={art.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-3">
                                            {art.image && (
                                                <img
                                                    src={art.image}
                                                    alt=""
                                                    className="size-10 rounded-lg object-cover bg-muted shrink-0"
                                                />
                                            )}
                                            <div>
                                                <div>{art.title}</div>
                                                <div className="text-[10px] text-muted-foreground font-mono">
                                                    /{art.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className="text-[10px]">
                                            {art.category_label}
                                        </Badge>
                                    </td>
                                    <td className="p-4 font-mono text-muted-foreground">{art.date}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleTogglePublish(art.id)}
                                            className="cursor-pointer"
                                            title="تبديل حالة النشر"
                                        >
                                            {art.is_published ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                                                    منشور
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-muted-foreground text-[10px]">
                                                    مسودة
                                                </Badge>
                                            )}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`/blog/${art.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline flex items-center gap-1"
                                        >
                                            <span>عرض</span>
                                            <ExternalLink className="size-3" />
                                        </a>
                                    </td>
                                    <td className="p-4 text-left">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(art)}
                                                className="size-8 rounded-lg"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(art.id)}
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
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl">
                    <DialogHeader className="text-right space-y-1">
                        <DialogTitle className="text-xl font-bold">
                            {editingArticle ? 'تعديل المقال' : 'كتابة مقال تقني جديد'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل تفاصيل المقال، محتواه، والوسوم التوضيحية.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">عنوان المقال *</label>
                                <Input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="مثال: دليل المبرمج للبدء في علم البيانات"
                                    required
                                    className="rounded-xl"
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">الرابط التعريفي (Slug) *</label>
                                <Input
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="data-science-guide"
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                                {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">التصنيف *</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const labels: Record<string, string> = {
                                            'data-ai': 'علوم البيانات والذكاء الاصطناعي',
                                            mobile: 'تطبيقات الهواتف الذكية',
                                            programming: 'البرمجة وتطوير الويب',
                                            startups: 'ريادة الأعمال والمنتجات الرقمية',
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
                                    <option value="mobile">تطبيقات الهواتف الذكية</option>
                                    <option value="programming">البرمجة وتطوير الويب</option>
                                    <option value="startups">ريادة الأعمال والمنتجات الرقمية</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">مدة القراءة *</label>
                                <Input
                                    value={data.reading_time}
                                    onChange={(e) => setData('reading_time', e.target.value)}
                                    placeholder="5 دقائق قراءة"
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">سنة النشر *</label>
                                <Input
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    placeholder="2025"
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <ImageDropzone
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            label="صورة المقال الرئيسية"
                            description="اسحب وأفلت صورة المقال هنا. سيتم ضغطها تلقائياً بتقنية Canvas."
                        />

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">الوسوم (مفصولة بفواصل)</label>
                            <Input
                                value={data.tags}
                                onChange={(e) => setData('tags', e.target.value)}
                                placeholder="Python, Data Science, pandas, AI"
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">الموجز والنبذة (Excerpt) *</label>
                            <Textarea
                                rows={2}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                placeholder="نبذة مختصرة تظهر في البطاقات..."
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">محتوى المقال كاملاً (يدعم HTML) *</label>
                            <Textarea
                                rows={8}
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                placeholder="اكتب محتوى المقال هنا..."
                                required
                                className="rounded-xl font-mono text-xs"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="is_published"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="rounded size-4 text-primary"
                            />
                            <label htmlFor="is_published" className="text-xs font-medium cursor-pointer">
                                نشر المقال فوراً في المدونة
                            </label>
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
                                {processing ? 'جارٍ الحفظ...' : editingArticle ? 'حفظ التعديلات' : 'نشر المقال'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
