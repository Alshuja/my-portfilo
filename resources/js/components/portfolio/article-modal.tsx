import React, { useEffect } from 'react';
import { X, Calendar, Clock, ArrowUpRight, BookOpen, User } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Article } from '@/types/portfolio';
import { playClickSound } from './sound-effects';

interface ArticleModalProps {
    article: Article | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !article) return null;

    return (
        <div
            className="custom-modal"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="modal-close"
                    onClick={() => {
                        playClickSound(600, 0.02);
                        onClose();
                    }}
                    aria-label="إغلاق"
                >
                    <X className="size-5" />
                </button>

                {/* Article Header */}
                <div className="modal-header-section text-right">
                    <span className="tag">
                        {article.category_label || article.category}
                    </span>
                    <h2 className="mb-3 text-2xl leading-snug font-extrabold text-foreground sm:text-3xl">
                        {article.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <User className="size-3.5 text-primary" />
                            {article.author || 'عبدالرحمن عادل الشجاع'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            {article.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {article.reading_time}
                        </span>
                    </div>
                </div>

                {/* Image */}
                {article.image && (
                    <div className="modal-image-box mb-6">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                            }}
                        />
                    </div>
                )}

                {/* Body Content */}
                <div className="modal-body-section space-y-4 text-right">
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed font-semibold text-foreground">
                        {article.excerpt}
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-muted-foreground sm:text-base">
                        {article.body || article.excerpt}
                    </div>
                </div>

                {/* Actions */}
                <div className="modal-actions mt-6 flex items-center justify-between border-t border-border pt-4">
                    <Link
                        href={`/blog/${article.slug}`}
                        className="btn btn-primary"
                        onClick={() => playClickSound(650, 0.03)}
                    >
                        <BookOpen className="size-4" />
                        <span>فتح المقال في صفحة مخصصة</span>
                        <ArrowUpRight className="size-4" />
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-outline"
                    >
                        إغلاق النافذة
                    </button>
                </div>
            </div>
        </div>
    );
}
