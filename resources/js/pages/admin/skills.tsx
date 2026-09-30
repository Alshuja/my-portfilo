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
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Head title="إدارة المهارات والتقنيات" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/80 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Cpu className="size-6 text-primary" />
                        إدارة المهارات والتقنيات
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        تحكم بالمهارات التقنية ومستويات الإتقان وألوان المؤشرات ({skills.length} مهارة مسجلة).
                    </p>
                </div>

                <Button onClick={openAddModal} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-md">
                    <PlusCircle className="size-4" />
                    إضافة مهارة جديدة
                </Button>
            </div>

            {/* Skills Table */}
            <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="bg-muted/50 border-b border-border/80 font-bold text-muted-foreground">
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
                                <tr key={skill.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-foreground">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className="size-3 rounded-full shrink-0"
                                                style={{ backgroundColor: skill.color }}
                                            />
                                            <span>{skill.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className="text-[10px]">
                                            {skill.category}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
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
                                                onClick={() => openEditModal(skill)}
                                                className="size-8 rounded-lg"
                                            >
                                                <Edit3 className="size-3.5 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(skill.id)}
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
                <DialogContent className="max-w-md p-6 rounded-3xl">
                    <DialogHeader className="text-right space-y-1">
                        <DialogTitle className="text-lg font-bold">
                            {editingSkill ? 'تعديل المهارة' : 'إضافة مهارة جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            أدخل اسم المهارة والمسار ونسبة الإتقان.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">اسم المهارة *</label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="مثال: PyTorch & Deep Learning"
                                required
                                className="rounded-xl"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold">المسار التقني *</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full h-9 rounded-xl border border-input bg-transparent px-3 py-1 text-xs shadow-sm"
                            >
                                <option value="data-ai">البيانات والذكاء الاصطناعي</option>
                                <option value="programming">البرمجة وتطوير الويب</option>
                                <option value="mobile">تطبيقات الهواتف الذكية</option>
                                <option value="tools">الأدوات وقواعد البيانات</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold">نسبة الإتقان (1-100%) *</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={data.level}
                                    onChange={(e) => setData('level', Number(e.target.value))}
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold">اللون النيوني *</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="size-9 rounded-lg border border-border p-0.5 cursor-pointer bg-transparent"
                                    />
                                    <Input
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="rounded-xl font-mono text-xs"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
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
                                {processing ? 'جارٍ الحفظ...' : editingSkill ? 'حفظ التعديلات' : 'إضافة المهارة'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
