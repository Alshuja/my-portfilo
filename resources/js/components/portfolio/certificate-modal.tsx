import React, { useEffect } from 'react';
import { X, Award, ExternalLink, Calendar, Building2 } from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import { playClickSound } from './sound-effects';

interface CertificateModalProps {
    certificate: Certificate | null;
    isOpen: boolean;
    onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
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
        <div className="custom-modal" role="dialog" aria-modal="true" onClick={onClose}>
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
                    <div className="relative rounded-2xl overflow-hidden bg-muted/60 mb-6 border border-border/80 shadow-md">
                        <img
                            src={certificate.image || '/images/project-1.png'}
                            alt={certificate.title}
                            className="w-full max-h-[60vh] object-contain mx-auto"
                            onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('placeholder.jpg')) {
                                    target.src = '/images/placeholder.jpg';
                                }
                            }}
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-md">
                            {certificate.date}
                        </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {certificate.title}
                    </h3>

                    <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-primary font-semibold mb-4">
                        <span className="flex items-center gap-1.5">
                            <Building2 className="size-4" />
                            {certificate.issuer}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground font-mono">
                            <Calendar className="size-4" />
                            {certificate.date}
                        </span>
                    </div>

                    {certificate.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
                            {certificate.description}
                        </p>
                    )}

                    {certificate.credential_url && certificate.credential_url !== '#' && (
                        <div className="pt-4 border-t border-border flex justify-center">
                            <a
                                href={certificate.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                onClick={() => playClickSound(650, 0.03)}
                            >
                                <Award className="size-4" />
                                <span>التحقق الرسمي من الشهادة والاعتماد</span>
                                <ExternalLink className="size-3.5" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
