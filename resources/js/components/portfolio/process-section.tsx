import React from 'react';
import { Compass, GitMerge, Laptop, Rocket, Workflow } from 'lucide-react';

export function ProcessSection() {
    const steps = [
        {
            num: '01',
            icon: <Compass className="h-6 w-6 text-[#D71916]" />,
            title: 'التحليل والتخطيط المعماري',
            subtitle: 'Architecture & Discovery',
            description: 'دراسة المشكلة بعمق، وتحديد متطلبات العمل والمستخدمين، واختيار البنية المعمارية وقواعد البيانات المناسبة لقابلية التوسع.',
            deliverables: ['مخطط العلاقات ERD', 'تحديد المتطلبات الوظيفية', 'اختيار حزمة التقنيات Stack'],
        },
        {
            num: '02',
            icon: <Laptop className="h-6 w-6 text-[#FF6A32]" />,
            title: 'تصميم تجربة وواجهة المستخدم',
            subtitle: 'UI/UX Prototyping',
            description: 'بناء النماذج الأولية والتفاعلية التوضيحية مع التركيز على سهولة الوصول وسرعة التنقل وسلاسة الحركة عبر الموبايل والويب.',
            deliverables: ['واجهات تفاعلية', 'Design System متكامل', 'محاكاة رحلة المستخدم'],
        },
        {
            num: '03',
            icon: <GitMerge className="h-6 w-6 text-[#F59E0B]" />,
            title: 'التطوير البرمجي والكود النظيف',
            subtitle: 'Clean Code & Full-Stack',
            description: 'كتابة كود معياري عالي الأداء مع تطبيق مبادئ Clean Architecture و SOLID، وبناء واجهات الـ APIs وتطبيقات Flutter المتجاوبة.',
            deliverables: ['Backend متين بـ Laravel', 'تطبيقات Flutter سريعة', 'APIs موثقة وآمنة'],
        },
        {
            num: '04',
            icon: <Rocket className="h-6 w-6 text-[#10B981]" />,
            title: 'الاختبارات والنشر السحابي',
            subtitle: 'QA, CI/CD & Launch',
            description: 'إجراء الاختبارات الآلية واليدوية، وضمان معايير الأمان والسرعة، وإطلاق المشروع على الخوادم السحابية VPS مع المراقبة المستمرة.',
            deliverables: ['اختبارات Pest مؤتمتة', 'إطلاق على Cloud VPS', 'دعم فني وتحديثات دورية'],
        },
    ];

    return (
        <section id="process" className="py-24 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D71916]/10 text-[#D71916] text-xs font-bold mb-4 border border-[#D71916]/20">
                        <Workflow className="h-3.5 w-3.5" />
                        <span>منهجية العمل البرمجي</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                        كيف أحول الفكرة إلى <span className="text-gradient">منتج رقمي ناجح؟</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                        دورة حياة تطوير برمجية متماسكة تجمع بين الانضباط الهندسي والمرونة العالية لضمان جودة المنتج النهائي.
                    </p>
                </div>

                {/* Steps Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={step.num}
                            className="relative flex flex-col justify-between rounded-3xl p-7 bg-card border border-border/80 hover:border-[#D71916]/40 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Step Indicator */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border group-hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>
                                <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-[#D71916]/40 transition-colors">
                                    {step.num}
                                </span>
                            </div>

                            {/* Content */}
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D71916] block mb-1">
                                    {step.subtitle}
                                </span>
                                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#D71916] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                                    {step.description}
                                </p>
                            </div>

                            {/* Deliverables */}
                            <div className="pt-4 border-t border-border/60">
                                <span className="text-[11px] font-bold text-foreground/70 block mb-2">المخرجات الأساسية:</span>
                                <div className="space-y-1.5">
                                    {step.deliverables.map((item, dIdx) => (
                                        <div key={dIdx} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#D71916]" />
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
