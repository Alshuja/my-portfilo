import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    MessageSquare,
    Trash2,
    Mail,
    Check,
    Phone,
    Calendar,
    Eye,
} from 'lucide-react';
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
        router.patch(
            `/admin/messages/${id}/toggle-read`,
            {},
            { preserveScroll: true },
        );
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
            <Head title="صندوق رسائل التواصل" />

            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                        <MessageSquare className="size-6 text-primary" />
                        صندوق رسائل واستفسارات الزوار
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        عرض وإدارة الرسائل الواردة من خلال نموذج التواصل بالموقع
                        ({messages.length} رسالة).
                    </p>
                </div>
            </div>

            {/* Messages List / Table */}
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                        <thead className="border-b border-border/80 bg-muted/50 font-bold text-muted-foreground">
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
                                    <td
                                        colSpan={6}
                                        className="p-12 text-center text-muted-foreground"
                                    >
                                        لا توجد أي رسائل واردة حالياً.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr
                                        key={msg.id}
                                        className={`cursor-pointer transition-colors ${
                                            !msg.is_read
                                                ? 'bg-primary/5 font-semibold'
                                                : 'hover:bg-muted/30'
                                        }`}
                                        onClick={() => viewMessage(msg)}
                                    >
                                        <td className="p-4 font-bold text-foreground">
                                            {msg.name}
                                        </td>
                                        <td
                                            className="p-4 font-mono text-muted-foreground"
                                            dir="ltr"
                                        >
                                            {msg.email}
                                        </td>
                                        <td
                                            className="p-4 font-mono text-muted-foreground"
                                            dir="ltr"
                                        >
                                            {msg.phone || '—'}
                                        </td>
                                        <td className="max-w-xs truncate p-4 text-muted-foreground">
                                            {msg.subject
                                                ? `${msg.subject}: `
                                                : ''}
                                            {msg.message}
                                        </td>
                                        <td className="p-4">
                                            {!msg.is_read ? (
                                                <Badge className="bg-primary text-[10px] text-primary-foreground">
                                                    جديدة
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] text-muted-foreground"
                                                >
                                                    مقروءة
                                                </Badge>
                                            )}
                                        </td>
                                        <td
                                            className="p-4 text-left"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        toggleRead(msg.id)
                                                    }
                                                    className="size-8 rounded-lg"
                                                    title={
                                                        msg.is_read
                                                            ? 'تعيين كغير مقروء'
                                                            : 'تعيين كمقروء'
                                                    }
                                                >
                                                    <Check className="size-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDelete(msg.id)
                                                    }
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
            <Dialog
                open={!!selectedMsg}
                onOpenChange={(open) => !open && setSelectedMsg(null)}
            >
                <DialogContent className="max-w-lg rounded-3xl p-6 md:p-8">
                    {selectedMsg && (
                        <>
                            <DialogHeader className="space-y-2 text-right">
                                <DialogTitle className="flex items-center justify-between text-xl font-bold">
                                    <span>رسالة من: {selectedMsg.name}</span>
                                    <span className="font-mono text-xs font-normal text-muted-foreground">
                                        {new Date(
                                            selectedMsg.created_at,
                                        ).toLocaleDateString('ar-EG')}
                                    </span>
                                </DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground">
                                    تفاصيل الرسالة الواردة
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 pt-2 text-sm">
                                <div className="space-y-2 rounded-xl border border-border/80 bg-muted/40 p-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Mail className="size-3.5 text-primary" />
                                        <span className="font-semibold text-foreground">
                                            البريد:
                                        </span>
                                        <a
                                            href={`mailto:${selectedMsg.email}`}
                                            className="font-mono text-primary hover:underline"
                                        >
                                            {selectedMsg.email}
                                        </a>
                                    </div>
                                    {selectedMsg.phone && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <Phone className="size-3.5 text-primary" />
                                            <span className="font-semibold text-foreground">
                                                الهاتف / الواتساب:
                                            </span>
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
                                        <div className="border-t border-border/60 pt-1 text-xs">
                                            <span className="font-semibold text-foreground">
                                                الموضوع:{' '}
                                            </span>
                                            <span>{selectedMsg.subject}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        نص الرسالة:
                                    </span>
                                    <div className="rounded-2xl border border-border/80 bg-card p-4 leading-relaxed whitespace-pre-line text-foreground">
                                        {selectedMsg.message}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const mailto = `mailto:${selectedMsg.email}?subject=${encodeURIComponent(
                                                'رد بخصوص: ' +
                                                    (selectedMsg.subject ||
                                                        'تواصل عبر الموقع'),
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
