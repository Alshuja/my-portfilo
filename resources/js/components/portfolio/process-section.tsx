import React from 'react';
import { Compass, GitMerge, Laptop, Rocket, Workflow } from 'lucide-react';

export function ProcessSection() {
    const steps = [
        {
            num: '01',
            icon: <Compass className="h-6 w-6 text-[#D71916]" />,
            title: 'التحليل والتخطيط المعماري',
            subtitle: 'Architecture & Discovery',
            description:
                'دراسة المشكلة بعمق، وتحديد متطلبات العمل والمستخدمين، واختيار البنية المعمارية وقواعد البيانات المناسبة لقابلية التوسع.',
            deliverables: [
                'مخطط العلاقات ERD',
                'تحديد المتطلبات الوظيفية',
                'اختيار حزمة التقنيات Stack',
            ],
        },
        {
            num: '02',
            icon: <Laptop className="h-6 w-6 text-[#FF6A32]" />,
            title: 'تصميم تجربة وواجهة المستخدم',
            subtitle: 'UI/UX Prototyping',
            description:
                'بناء النماذج الأولية والتفاعلية التوضيحية مع التركيز على سهولة الوصول وسرعة التنقل وسلاسة الحركة عبر الموبايل والويب.',
            deliverables: [
                'واجهات تفاعلية',
                'Design System متكامل',
                'محاكاة رحلة المستخدم',
            ],
        },
        {
            num: '03',
            icon: <GitMerge className="h-6 w-6 text-[#F59E0B]" />,
            title: 'التطوير البرمجي والكود النظيف',
            subtitle: 'Clean Code & Full-Stack',
            description:
                'كتابة كود معياري عالي الأداء مع تطبيق مبادئ Clean Architecture و SOLID، وبناء واجهات الـ APIs وتطبيقات Flutter المتجاوبة.',
            deliverables: [
                'Backend متين بـ Laravel',
                'تطبيقات Flutter سريعة',
                'APIs موثقة وآمنة',
            ],
        },
        {
            num: '04',
            icon: <Rocket className="h-6 w-6 text-[#10B981]" />,
            title: 'الاختبارات والنشر السحابي',
            subtitle: 'QA, CI/CD & Launch',
            description:
                'إجراء الاختبارات الآلية واليدوية، وضمان معايير الأمان والسرعة، وإطلاق المشروع على الخوادم السحابية VPS مع المراقبة المستمرة.',
            deliverables: [
                'اختبارات Pest مؤتمتة',
                'إطلاق على Cloud VPS',
                'دعم فني وتحديثات دورية',
            ],
        },
    ];

    return (
        <section
            id="process"
            className="relative overflow-hidden bg-background py-24"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center fade-in">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D71916]/20 bg-[#D71916]/10 px-3.5 py-1.5 text-xs font-bold text-[#D71916]">
                        <Workflow className="h-3.5 w-3.5" />
                        <span>منهجية العمل البرمجي</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        كيف أحول الفكرة إلى{' '}
                        <span className="text-gradient">منتج رقمي ناجح؟</span>
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        دورة حياة تطوير برمجية متماسكة تجمع بين الانضباط الهندسي
                        والمرونة العالية لضمان جودة المنتج النهائي.
                    </p>
                </div>

                {/* Steps Timeline Grid */}
                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, idx) => (
                        <div
                            key={step.num}
                            className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 hover:border-[#D71916]/40 hover:shadow-xl"
                        >
                            {/* Step Indicator */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary/80 transition-transform group-hover:scale-110">
                                    {step.icon}
                                </div>
                                <span className="text-2xl font-black text-muted-foreground/30 transition-colors group-hover:text-[#D71916]/40">
                                    {step.num}
                                </span>
                            </div>

                            {/* Content */}
                            <div>
                                <span className="mb-1 block text-[11px] font-bold tracking-wider text-[#D71916] uppercase">
                                    {step.subtitle}
                                </span>
                                <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-[#D71916]">
                                    {step.title}
                                </h3>
                                <p className="mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                    {step.description}
                                </p>
                            </div>

                            {/* Deliverables */}
                            <div className="border-t border-border/60 pt-4">
                                <span className="mb-2 block text-[11px] font-bold text-foreground/70">
                                    المخرجات الأساسية:
                                </span>
                                <div className="space-y-1.5">
                                    {step.deliverables.map((item, dIdx) => (
                                        <div
                                            key={dIdx}
                                            className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#D71916]" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
