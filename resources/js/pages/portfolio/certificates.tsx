import { Head } from '@inertiajs/react';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import type { Certificate } from '@/types/portfolio';

interface CertificatesProps {
    certificates: Certificate[];
}

export default function CertificatesPage({ certificates }: CertificatesProps) {
    return (
        <PortfolioLayout>
            <Head title="الشهادات والتكريمات الأكاديمية والمهنية" />

            <div className="container mx-auto space-y-12 px-4 py-16 sm:px-6 md:py-24">
                <div className="max-w-3xl space-y-4">
                    <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                        التكريمات والاعتمادات
                    </Badge>
                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        الشهادات والجوائز المعتمدة
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        سجل التكريمات والشهادات التخصصية الصادرة من جامعات
                        عالمية ومحلية ومنصات تدريب احترافية مع روابط التحقق
                        الرسمي.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
                        >
                            {cert.image && (
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="size-full object-cover transition-transform duration-500 hover:scale-105"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src =
                                                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="border border-border bg-background/90 text-[10px] font-semibold text-foreground">
                                            {cert.category_label}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                        <Calendar className="size-3 text-primary" />
                                        {cert.date}
                                    </div>
                                    <h3 className="text-lg leading-snug font-bold text-foreground">
                                        {cert.title}
                                    </h3>
                                    <div className="text-xs font-semibold text-primary">
                                        الجهة: {cert.issuer}
                                    </div>
                                    <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                        {cert.description}
                                    </p>
                                </div>

                                {cert.credential_url &&
                                    cert.credential_url !== '#' && (
                                        <div className="border-t border-border/60 pt-3">
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                                            >
                                                <Award className="size-3.5" />
                                                التحقق من صحة الشهادة
                                                <ExternalLink className="size-3" />
                                            </a>
                                        </div>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PortfolioLayout>
    );
}
