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

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-12">
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        التكريمات والاعتمادات
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        الشهادات والجوائز المعتمدة
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        سجل التكريمات والشهادات التخصصية الصادرة من جامعات عالمية ومحلية ومنصات تدريب احترافية مع روابط التحقق الرسمي.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="rounded-3xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
                        >
                            {cert.image && (
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="size-full object-cover transition-transform duration-500 hover:scale-105"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-background/90 text-foreground text-[10px] font-semibold border border-border">
                                            {cert.category_label}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                                        <Calendar className="size-3 text-primary" />
                                        {cert.date}
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground leading-snug">
                                        {cert.title}
                                    </h3>
                                    <div className="text-xs font-semibold text-primary">
                                        الجهة: {cert.issuer}
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                        {cert.description}
                                    </p>
                                </div>

                                {cert.credential_url && cert.credential_url !== '#' && (
                                    <div className="pt-3 border-t border-border/60">
                                        <a
                                            href={cert.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
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
