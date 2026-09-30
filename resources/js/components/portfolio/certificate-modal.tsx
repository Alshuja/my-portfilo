import React, { useEffect } from 'react';
import { X, Award, ExternalLink, Calendar, Building2 } from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import { playClickSound } from './sound-effects';

interface CertificateModalProps {
    certificate: Certificate | null;
    isOpen: boolean;
    onClose: () => void;
}

export function CertificateModal({
    certificate,
    isOpen,
    onClose,
}: CertificateModalProps) {
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

    if (!isOpen || !certificate) return null;

    return (
        <div
            className="custom-modal"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="modal-container cert-modal-container"
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

                <div className="lightbox-content-box">
                    {/* Certificate Image Preview */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/80 bg-muted/60 shadow-md">
                        <img
                            src={certificate.image || '/images/project-1.png'}
                            alt={certificate.title}
                            className="mx-auto max-h-[60vh] w-full object-contain"
                            onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('placeholder.jpg')) {
                                    target.src = '/images/placeholder.jpg';
                                }
                            }}
                        />
                        <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                            {certificate.date}
                        </div>
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
                        {certificate.title}
                    </h3>

                    <div className="mb-4 flex items-center justify-center gap-4 text-xs font-semibold text-primary sm:text-sm">
                        <span className="flex items-center gap-1.5">
                            <Building2 className="size-4" />
                            {certificate.issuer}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 font-mono text-muted-foreground">
                            <Calendar className="size-4" />
                            {certificate.date}
                        </span>
                    </div>

                    {certificate.description && (
                        <p className="mx-auto mb-6 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            {certificate.description}
                        </p>
                    )}

                    {certificate.credential_url &&
                        certificate.credential_url !== '#' && (
                            <div className="flex justify-center border-t border-border pt-4">
                                <a
                                    href={certificate.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    onClick={() => playClickSound(650, 0.03)}
                                >
                                    <Award className="size-4" />
                                    <span>
                                        التحقق الرسمي من الشهادة والاعتماد
                                    </span>
                                    <ExternalLink className="size-3.5" />
                                </a>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
