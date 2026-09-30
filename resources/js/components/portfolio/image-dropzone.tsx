import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageDropzoneProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    maxWidth?: number;
    quality?: number;
}

/**
 * Compresses an image file client-side using HTML5 Canvas
 */
async function compressImageFile(file: File, maxWidth = 1600, quality = 0.85): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                let { width, height } = img;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve(file);
                    return;
                }

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            resolve(file);
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = () => reject(new Error('فشل قراءة الصورة'));
        };
        reader.onerror = () => reject(new Error('فشل تحميل الملف'));
    });
}

export function ImageDropzone({
    value = '',
    onChange,
    label = 'صورة الغلاف',
    description = 'اسحب وأفلت الصورة هنا، أو انقر للاختيار. سيتم ضغط الصورة تلقائياً.',
    maxWidth = 1600,
    quality = 0.85,
}: ImageDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isManualUrl, setIsManualUrl] = useState(false);
    const [manualUrlInput, setManualUrlInput] = useState(value);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [statsInfo, setStatsInfo] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getCsrfToken = () => {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(XSRF-TOKEN)=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : '';
    };

    const handleFileProcess = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setErrorMsg('يرجى اختيار ملف صورة صالح (PNG, JPG, WebP, GIF)');
            return;
        }

        setErrorMsg(null);
        setIsUploading(true);
        const originalSizeKb = Math.round(file.size / 1024);

        try {
            // Compress on client-side canvas
            const compressedBlob = await compressImageFile(file, maxWidth, quality);
            const compressedSizeKb = Math.round(compressedBlob.size / 1024);

            const formData = new FormData();
            formData.append('image', compressedBlob, file.name.replace(/\.[^/.]+$/, '') + '.jpg');

            const token = getCsrfToken();
            const response = await fetch('/admin/upload/image', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    ...(token ? { 'X-XSRF-TOKEN': token } : {}),
                },
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'فشل رفع الصورة إلى الخادم');
            }

            const data = await response.json();
            if (data.url) {
                onChange(data.url);
                setStatsInfo(`تم ضغط الصورة بنجاح (${originalSizeKb}KB → ${compressedSizeKb}KB)`);
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'حدث خطأ أثناء معالجة الصورة');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileProcess(e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileProcess(e.target.files[0]);
        }
    };

    const clearImage = () => {
        onChange('');
        setManualUrlInput('');
        setStatsInfo(null);
        setErrorMsg(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">{label}</label>
                <button
                    type="button"
                    onClick={() => setIsManualUrl(!isManualUrl)}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1"
                >
                    <Link2 className="size-3" />
                    {isManualUrl ? 'استخدام السحب والإفلات' : 'إدخال رابط مباشر'}
                </button>
            </div>

            {isManualUrl ? (
                <div className="flex items-center gap-2">
                    <Input
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setManualUrlInput(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/... أو /storage/uploads/..."
                        className="rounded-xl font-mono text-xs"
                        dir="ltr"
                    />
                    {value && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={clearImage}
                            className="size-9 rounded-xl hover:text-destructive"
                            title="مسح الرابط"
                        >
                            <X className="size-4" />
                        </Button>
                    )}
                </div>
            ) : value ? (
                /* Image Preview Mode */
                <div className="relative rounded-2xl border border-border/80 bg-muted/30 p-2 overflow-hidden group">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                        <img
                            src={value}
                            alt="معاينة الصورة"
                            className="size-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={clearImage}
                                className="rounded-xl text-xs gap-1 font-bold shadow-lg"
                            >
                                <X className="size-3.5" />
                                إزالة الصورة
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-xl text-xs gap-1 font-bold shadow-lg"
                            >
                                <UploadCloud className="size-3.5" />
                                استبدال
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-muted-foreground font-mono truncate">
                        <span className="truncate max-w-[280px]" dir="ltr">{value}</span>
                        {statsInfo && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{statsInfo}</span>}
                    </div>
                </div>
            ) : (
                /* Dropzone Drag & Drop Area */
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                        isDragging
                            ? 'border-primary bg-primary/10 scale-[1.01]'
                            : 'border-border/80 hover:border-primary/50 hover:bg-muted/40 bg-card/60'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                    />

                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2 py-3 text-primary">
                            <Loader2 className="size-8 animate-spin" />
                            <span className="text-xs font-semibold">جارٍ ضغط الصورة ورفعها بأعلى جودة...</span>
                        </div>
                    ) : (
                        <>
                            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <UploadCloud className="size-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground">
                                    اسحب وأفلت صورة المشروع هنا، أو <span className="text-primary underline">انقر للاختيار</span>
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-muted text-[10px] font-mono text-muted-foreground">
                                PNG · JPG · WebP · Max 10MB (ضغط تلقائي 60fps)
                            </span>
                        </>
                    )}
                </div>
            )}

            {errorMsg && (
                <p className="text-xs text-destructive font-medium pt-1">
                    {errorMsg}
                </p>
            )}
        </div>
    );
}
