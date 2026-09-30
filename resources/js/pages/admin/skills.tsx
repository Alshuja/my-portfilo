import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusCircle, Edit3, Trash2, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import type { Skill } from '@/types/portfolio';

interface AdminSkillsProps {
    skills: Skill[];
}

export default function AdminSkills({ skills }: AdminSkillsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        name: '',
        category: 'data-ai',
        level: 85,
        color: '#D71916',
        icon: '',
    });

    const openAddModal = () => {
        reset();
        setEditingSkill(null);
        setIsModalOpen(true);
    };

    const openEditModal = (skill: Skill) => {
        setEditingSkill(skill);
        setData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            color: skill.color,
            icon: skill.icon || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSkill) {
            put(`/admin/skills/${editingSkill.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingSkill(null);
                },
            });
        } else {
            post('/admin/skills', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه المهارة؟')) {
            router.delete(`/admin/skills/${id}`, { preserveScroll: true });
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
            <Head title="إدارة المهارات والتقنيات" />

            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                        <Cpu className="size-6 text-primary" />
                        إدارة المهارات والتقنيات
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        تحكم بالمهارات التقنية ومستويات الإتقان وألوان المؤشرات (
                        {skills.length} مهارة مسجلة).
                    </p>
                </div>

                <Button
                    onClick={openAddModal}
                    className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                    <PlusCircle className="size-4" />
                    إضافة مهارة جديدة
                </Button>
            </div>

            {/* Skills Table */}
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="border-b border-border/80 bg-muted/50 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">اسم المهارة</th>
                                <th className="p-4">المسار التقني</th>
                                <th className="p-4">نسبة الإتقان</th>
                                <th className="p-4">اللون</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {skills.map((skill) => (
                                <tr
                                    key={skill.id}
                                    className="transition-colors hover:bg-muted/30"
                                >
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className="size-3 shrink-0 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        skill.color,
                                                }}
                                            />
                                            <span>{skill.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge
                                            variant="outline"
                                            className="text-[10px]"
                                        >
                                            {skill.category}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${skill.level}%`,
                                                        backgroundColor:
                                                            skill.color,
                                                    }}
                                                />
                                            </div>
                                            <span className="font-mono font-bold text-muted-foreground">
                                                {skill.level}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-[11px] text-muted-foreground">
                                        {skill.color}
                                    </td>
                                    <td className="p-4 text-left">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    openEditModal(skill)
                                                }
                                                className="size-8 rounded-lg"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(skill.id)
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
                <DialogContent className="max-w-md rounded-3xl p-6">
                    <DialogHeader className="space-y-1 text-right">
                        <DialogTitle className="text-lg font-bold">
                            {editingSkill
                                ? 'تعديل المهارة'
                                : 'إضافة مهارة جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل اسم المهارة والمسار ونسبة الإتقان.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                اسم المهارة *
                            </label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="مثال: PyTorch & Deep Learning"
                                required
                                className="rounded-xl"
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">
                                المسار التقني *
                            </label>
                            <select
                                value={data.category}
                                onChange={(e) =>
                                    setData('category', e.target.value)
                                }
                                className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                            >
                                <option value="data-ai">
                                    البيانات والذكاء الاصطناعي
                                </option>
                                <option value="programming">
                                    البرمجة وتطوير الويب
                                </option>
                                <option value="mobile">
                                    تطبيقات الهواتف الذكية
                                </option>
                                <option value="tools">
                                    الأدوات وقواعد البيانات
                                </option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    نسبة الإتقان (1-100%) *
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={data.level}
                                    onChange={(e) =>
                                        setData('level', Number(e.target.value))
                                    }
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">
                                    اللون النيوني *
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.color}
                                        onChange={(e) =>
                                            setData('color', e.target.value)
                                        }
                                        className="size-9 cursor-pointer rounded-lg border border-border bg-transparent p-0.5"
                                    />
                                    <Input
                                        value={data.color}
                                        onChange={(e) =>
                                            setData('color', e.target.value)
                                        }
                                        className="rounded-xl font-mono text-xs"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
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
                                    : editingSkill
                                      ? 'حفظ التعديلات'
                                      : 'إضافة المهارة'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
