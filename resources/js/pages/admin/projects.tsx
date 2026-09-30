import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import {
    PlusCircle,
    Edit3,
    Trash2,
    Star,
    ExternalLink,
    Github,
    FolderGit2,
    Calendar,
    Eye,
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
import type { Project } from '@/types/portfolio';

interface AdminProjectsProps {
    projects: Project[];
}

export default function AdminProjects({ projects }: AdminProjectsProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Add / Edit Form
    const { data, setData, post, put, reset, errors, processing } = useForm({
        title: '',
        slug: '',
        category: 'platform',
        category_label: 'المنصات والتجارة الإلكترونية',
        brief: '',
        description: '',
        tags: '',
        image: '',
        gallery: '',
        problem: '',
        solution: '',
        features: '',
        role: '',
        client: '',
        date_range: '2024 - 2025',
        live_url: '',
        github_url: '',
        is_featured: false,
    });

    const openAddModal = () => {
        reset();
        setEditingProject(null);
        setIsAddOpen(true);
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setData({
            title: project.title,
            slug: project.slug,
            category: project.category,
            category_label: project.category_label,
            brief: project.brief,
            description: project.description,
            tags: project.tags.join(', '),
            image: project.image || '',
            gallery: Array.isArray(project.gallery)
                ? project.gallery.join('\n')
                : project.gallery || '',
            problem: project.problem || '',
            solution: project.solution || '',
            features: Array.isArray(project.features)
                ? project.features.join('\n')
                : project.features || '',
            role: project.role || '',
            client: project.client || '',
            date_range: project.date_range,
            live_url: project.live_url || '',
            github_url: project.github_url || '',
            is_featured: project.is_featured,
        });
        setIsAddOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            put(`/admin/projects/${editingProject.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsAddOpen(false);
                    setEditingProject(null);
                },
            });
        } else {
            post('/admin/projects', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsAddOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من رغبتك في حذف هذا المشروع؟')) {
            router.delete(`/admin/projects/${id}`, { preserveScroll: true });
        }
    };

    const handleToggleFeatured = (id: number) => {
        router.patch(
            `/admin/projects/${id}/toggle-featured`,
            {},
            { preserveScroll: true },
        );
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
            <Head title="إدارة المشاريع والأعمال" />

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                        <FolderGit2 className="size-6 text-primary" />
                        إدارة المشاريع البرمجية
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        أضف مشاريعك الجديدة أو عدّل القائمة الحالية (الإجمالي:{' '}
                        {projects.length} مشروع).
                    </p>
                </div>

                <Button
                    onClick={openAddModal}
                    className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                    <PlusCircle className="size-4" />
                    إضافة مشروع جديد
                </Button>
            </div>

            {/* Projects Table */}
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="border-b border-border/80 bg-muted/50 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">اسم المشروع</th>
                                <th className="p-4">التصنيف</th>
                                <th className="p-4">الفترة</th>
                                <th className="p-4">مميز</th>
                                <th className="p-4">الروابط</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="transition-colors hover:bg-muted/30"
                                >
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-3">
                                            {project.image && (
                                                <img
                                                    src={project.image}
                                                    alt=""
                                                    className="size-10 shrink-0 rounded-lg bg-muted object-cover"
                                                />
                                            )}
                                            <div>
                                                <div>{project.title}</div>
                                                <div className="font-mono text-[10px] text-muted-foreground">
                                                    /{project.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge
                                            variant="outline"
                                            className="text-[10px]"
                                        >
                                            {project.category_label}
                                        </Badge>
                                    </td>
                                    <td className="p-4 font-mono text-muted-foreground">
                                        {project.date_range}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() =>
                                                handleToggleFeatured(project.id)
                                            }
                                            className={`flex size-7 items-center justify-center rounded-lg transition-colors ${
                                                project.is_featured
                                                    ? 'bg-amber-500/10 text-amber-500'
                                                    : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                            title="تبديل الحالة كمشروع مميز"
                                        >
                                            <Star className="size-4 fill-current" />
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                    title="المعاينة الحية"
                                                >
                                                    <ExternalLink className="size-4" />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-foreground"
                                                    title="GitHub"
                                                >
                                                    <Github className="size-4" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-left">
                                        <div className="flex items-center justify-end gap-1">
                                            <a
                                                href={`/projects/${project.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                                                title="عرض صفحة المشروع العامة"
                                            >
                                                <Eye className="size-3.5" />
                                            </a>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    openEditModal(project)
                                                }
                                                className="size-8 rounded-lg"
                                                title="تعديل"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="size-8 rounded-lg hover:text-destructive"
                                                title="حذف"
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

            {/* Add / Edit Dialog Modal */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-8">
                    <DialogHeader className="space-y-1 text-right">
                        <DialogTitle className="text-xl font-bold">
                            {editingProject
                                ? 'تعديل بيانات المشروع'
                                : 'إضافة مشروع جديد'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل تفاصيل المشروع والتقنيات ورابط المعاينة وصورة
                            الغلاف.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    عنوان المشروع *
                                </label>
                                <Input
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="مثال: منصة وتطبيق سندباد"
                                    required
                                    className="rounded-xl"
                                />
                                {errors.title && (
                                    <p className="text-xs text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    الرابط التعريفي (Slug) *
                                </label>
                                <Input
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    placeholder="sinbad"
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                                {errors.slug && (
                                    <p className="text-xs text-destructive">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    تصنيف المشروع *
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const labels: Record<string, string> = {
                                            platform:
                                                'المنصات والتجارة الإلكترونية',
                                            mobile: 'تطبيقات الهواتف (Flutter)',
                                            'ai-data':
                                                'الذكاء الاصطناعي وعلم البيانات',
                                            web: 'تطوير الويب والخوادم',
                                        };
                                        setData({
                                            ...data,
                                            category: val,
                                            category_label: labels[val] || val,
                                        });
                                    }}
                                    className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                                >
                                    <option value="platform">
                                        المنصات والتجارة الإلكترونية
                                    </option>
                                    <option value="mobile">
                                        تطبيقات الهواتف (Flutter)
                                    </option>
                                    <option value="ai-data">
                                        الذكاء الاصطناعي وعلم البيانات
                                    </option>
                                    <option value="web">
                                        تطوير الويب والخوادم
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    تاريخ / سنة الإنجاز *
                                </label>
                                <Input
                                    value={data.date_range}
                                    onChange={(e) =>
                                        setData('date_range', e.target.value)
                                    }
                                    placeholder="مثال: 2024 - 2025"
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    الدور المنفّذ (Role)
                                </label>
                                <Input
                                    value={data.role}
                                    onChange={(e) =>
                                        setData('role', e.target.value)
                                    }
                                    placeholder="مثال: Lead Full-Stack & Mobile Developer"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    الجهة / العميل (Client)
                                </label>
                                <Input
                                    value={data.client}
                                    onChange={(e) =>
                                        setData('client', e.target.value)
                                    }
                                    placeholder="مثال: شركة سندباد للتجارة"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                التقنيات المستخدمة (مفصولة بفواصل) *
                            </label>
                            <Input
                                value={data.tags}
                                onChange={(e) =>
                                    setData('tags', e.target.value)
                                }
                                placeholder="Flutter, Laravel, PHP, MySQL, REST API"
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                نبذة سريعة عن المشروع (تظهر في البطاقة) *
                            </label>
                            <Input
                                value={data.brief}
                                onChange={(e) =>
                                    setData('brief', e.target.value)
                                }
                                placeholder="اكتب نبذة مختصرة من سطرين..."
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                الوصف الكامل والمفصل *
                            </label>
                            <Textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="اشرح الحل التقني والمعمارية بالتفصيل..."
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                                    المشكلة والتحدي (The Problem Statement)
                                </label>
                                <Textarea
                                    rows={3}
                                    value={data.problem}
                                    onChange={(e) =>
                                        setData('problem', e.target.value)
                                    }
                                    placeholder="ما هي المشكلة الواقعية التي كان يعاني منها المستخدمون أو السوق؟"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                    الحل المبتكر والمعمارية (The Solution &
                                    Architecture)
                                </label>
                                <Textarea
                                    rows={3}
                                    value={data.solution}
                                    onChange={(e) =>
                                        setData('solution', e.target.value)
                                    }
                                    placeholder="كيف قمت بهندسة الحل تقنياً، وما هي الخوارزميات أو المعمارية المعتمدة؟"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                أبرز المميزات والوظائف (اكتب كل ميزة في سطر
                                منفصل)
                            </label>
                            <Textarea
                                rows={3}
                                value={data.features}
                                onChange={(e) =>
                                    setData('features', e.target.value)
                                }
                                placeholder={
                                    'لوحة تحكم إدارية متكاملة\nتتبع حي للشحنات عبر الخرائط\nبوابات دفع إلكترونية متعددة'
                                }
                                className="rounded-xl text-xs"
                            />
                        </div>

                        {/* Modern Image Dropzone with Canvas Compression */}
                        <ImageDropzone
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            label="صورة الغلاف الرئيسية للمشروع"
                            description="اسحب وأفلت صورة الغلاف هنا، أو انقر للاختيار. سيتم ضغطها تلقائياً وتحسين أبعادها."
                        />

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                معرض صور المشروع (ضع كل رابط صورة في سطر جديد)
                            </label>
                            <Textarea
                                rows={3}
                                value={data.gallery}
                                onChange={(e) =>
                                    setData('gallery', e.target.value)
                                }
                                placeholder={
                                    'https://images.unsplash.com/...\nhttps://images.unsplash.com/...'
                                }
                                className="rounded-xl font-mono text-xs"
                                dir="ltr"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    رابط المعاينة الحية (Live URL)
                                </label>
                                <Input
                                    value={data.live_url}
                                    onChange={(e) =>
                                        setData('live_url', e.target.value)
                                    }
                                    placeholder="https://..."
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    رابط مستودع GitHub
                                </label>
                                <Input
                                    value={data.github_url}
                                    onChange={(e) =>
                                        setData('github_url', e.target.value)
                                    }
                                    placeholder="https://github.com/..."
                                    className="rounded-xl font-mono text-xs"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) =>
                                    setData('is_featured', e.target.checked)
                                }
                                className="size-4 rounded text-primary"
                            />
                            <label
                                htmlFor="is_featured"
                                className="cursor-pointer text-xs font-medium"
                            >
                                تعيين كمشروع مميز في الصفحة الرئيسية
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsAddOpen(false)}
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
                                    : editingProject
                                      ? 'حفظ التعديلات'
                                      : 'إضافة المشروع'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
