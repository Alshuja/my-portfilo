import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { MessageSquare, Trash2, Mail, Check, Phone, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import type { ContactMessage } from '@/types/portfolio';

interface AdminMessagesProps {
    messages: ContactMessage[];
}

export default function AdminMessages({ messages }: AdminMessagesProps) {
    const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

    const toggleRead = (id: number) => {
        router.patch(`/admin/messages/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            router.delete(`/admin/messages/${id}`, { preserveScroll: true });
        }
    };

    const viewMessage = (msg: ContactMessage) => {
        setSelectedMsg(msg);
        if (!msg.is_read) {
            toggleRead(msg.id);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Head title="صندوق رسائل التواصل" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/80 shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="size-6 text-primary" />
                        صندوق رسائل واستفسارات الزوار
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        عرض وإدارة الرسائل الواردة من خلال نموذج التواصل بالموقع ({messages.length} رسالة).
                    </p>
                </div>
            </div>

            {/* Messages List / Table */}
            <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="bg-muted/50 border-b border-border/80 font-bold text-muted-foreground">
                            <tr>
                                <th className="p-4">المرسل</th>
                                <th className="p-4">البريد الإلكتروني</th>
                                <th className="p-4">الهاتف</th>
                                <th className="p-4">الموضوع / مقتطف</th>
                                <th className="p-4">الحالة</th>
                                <th className="p-4 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                        لا توجد أي رسائل واردة حالياً.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr
                                        key={msg.id}
                                        className={`transition-colors cursor-pointer ${
                                            !msg.is_read ? 'bg-primary/5 font-semibold' : 'hover:bg-muted/30'
                                        }`}
                                        onClick={() => viewMessage(msg)}
                                    >
                                        <td className="p-4 font-bold text-foreground">
                                            {msg.name}
                                        </td>
                                        <td className="p-4 font-mono text-muted-foreground" dir="ltr">
                                            {msg.email}
                                        </td>
                                        <td className="p-4 font-mono text-muted-foreground" dir="ltr">
                                            {msg.phone || '—'}
                                        </td>
                                        <td className="p-4 max-w-xs truncate text-muted-foreground">
                                            {msg.subject ? `${msg.subject}: ` : ''}
                                            {msg.message}
                                        </td>
                                        <td className="p-4">
                                            {!msg.is_read ? (
                                                <Badge className="bg-primary text-primary-foreground text-[10px]">
                                                    جديدة
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-muted-foreground text-[10px]">
                                                    مقروءة
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-4 text-left" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleRead(msg.id)}
                                                    className="size-8 rounded-lg"
                                                    title={msg.is_read ? 'تعيين كغير مقروء' : 'تعيين كمقروء'}
                                                >
                                                    <Check className="size-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="size-8 rounded-lg hover:text-destructive"
                                                    title="حذف الرسالة"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Message Dialog */}
            <Dialog open={!!selectedMsg} onOpenChange={(open) => !open && setSelectedMsg(null)}>
                <DialogContent className="max-w-lg p-6 md:p-8 rounded-3xl">
                    {selectedMsg && (
                        <>
                            <DialogHeader className="text-right space-y-2">
                                <DialogTitle className="text-xl font-bold flex items-center justify-between">
                                    <span>رسالة من: {selectedMsg.name}</span>
                                    <span className="text-xs font-mono font-normal text-muted-foreground">
                                        {new Date(selectedMsg.created_at).toLocaleDateString('ar-EG')}
                                    </span>
                                </DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground">
                                    تفاصيل الرسالة الواردة
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 pt-2 text-sm">
                                <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Mail className="size-3.5 text-primary" />
                                        <span className="font-semibold text-foreground">البريد:</span>
                                        <a href={`mailto:${selectedMsg.email}`} className="font-mono text-primary hover:underline">
                                            {selectedMsg.email}
                                        </a>
                                    </div>
                                    {selectedMsg.phone && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <Phone className="size-3.5 text-primary" />
                                            <span className="font-semibold text-foreground">الهاتف / الواتساب:</span>
                                            <a
                                                href={`https://wa.me/${selectedMsg.phone.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-mono text-emerald-600 hover:underline"
                                            >
                                                {selectedMsg.phone}
                                            </a>
                                        </div>
                                    )}
                                    {selectedMsg.subject && (
                                        <div className="text-xs pt-1 border-t border-border/60">
                                            <span className="font-semibold text-foreground">الموضوع: </span>
                                            <span>{selectedMsg.subject}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-muted-foreground">نص الرسالة:</span>
                                    <div className="p-4 rounded-2xl bg-card border border-border/80 leading-relaxed whitespace-pre-line text-foreground">
                                        {selectedMsg.message}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const mailto = `mailto:${selectedMsg.email}?subject=${encodeURIComponent(
                                                'رد بخصوص: ' + (selectedMsg.subject || 'تواصل عبر الموقع')
                                            )}`;
                                            window.location.href = mailto;
                                        }}
                                        className="gap-2 rounded-xl"
                                    >
                                        <Mail className="size-3.5" />
                                        الرد عبر البريد
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedMsg(null)}
                                        className="rounded-xl"
                                    >
                                        إغلاق
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
