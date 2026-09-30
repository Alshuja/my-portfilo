import React, { useRef } from 'react';
import { playClickSound } from './sound-effects';
import { Layers } from 'lucide-react';

interface TechItem {
    id: string;
    name: string;
    category: string;
    brief: string;
    color: string;
    iconType: 'svg-asset' | 'custom-svg';
    iconSrc?: string;
    svgPath?: React.ReactNode;
}

const CORE_TECH_ITEMS: TechItem[] = [
    {
        id: 'python',
        name: 'Python',
        category: 'Data & AI · ML',
        brief: 'تحليل البيانات، تعلم الآلة، وبناء النماذج الذكية',
        color: '#3776AB',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/python-mono.svg',
    },
    {
        id: 'flutter',
        name: 'Flutter & Dart',
        category: 'Cross-Platform Apps',
        brief: 'تطبيقات هواتف ذكية حديثة وفائقة السرعة Android & iOS',
        color: '#02569B',
        iconType: 'custom-svg',
        svgPath: (
            <svg
                viewBox="0 0 24 24"
                className="tech-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#02569B' }}
            >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
            </svg>
        ),
    },
    {
        id: 'laravel',
        name: 'Laravel & PHP',
        category: 'Backend & APIs',
        brief: 'بناء وتأمين واجهات البرمجة RESTful APIs وهيكلة الخوادم',
        color: '#FF2D20',
        iconType: 'custom-svg',
        svgPath: (
            <svg
                viewBox="0 0 24 24"
                className="tech-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#FF2D20' }}
            >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                <line x1="6" x2="6.01" y1="6" y2="6" />
                <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
        ),
    },
    {
        id: 'docker',
        name: 'Docker',
        category: 'DevOps & Containers',
        brief: 'عزل البيئات البرمجية وتسهيل النشر السحابي والتشغيل',
        color: '#2496ED',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/docker-mono.svg',
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL / SQL',
        category: 'Relational DB',
        brief: 'تصميم قواعد البيانات، تحسين الفهارس، والاستعلامات المتقدمة',
        color: '#4169E1',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/postgresql-mono.svg',
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'NoSQL Database',
        brief: 'تخزين البيانات غير المهيكلة والتطبيقات سريعة التوسع',
        color: '#47A248',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/mongodb-mono.svg',
    },
    {
        id: 'redis',
        name: 'Redis',
        category: 'In-Memory / Cache',
        brief: 'التخزين المؤقت، إدارة الجلسات، وتسريع الاستجابة',
        color: '#DC382D',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/redis-mono.svg',
    },
    {
        id: 'javascript',
        name: 'Modern JavaScript',
        category: 'Frontend & Web',
        brief: 'تطوير واجهات تفاعلية سريعة وديناميكية ES6+',
        color: '#F7DF1E',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/javascript-mono.svg',
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Utility-First CSS',
        brief: 'تصميم واجهات مستخدم مخصصة، حديثة، ومتجاوبة بدقة',
        color: '#38BDF8',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/tailwind-css-mono.svg',
    },
    {
        id: 'firebase',
        name: 'Firebase BaaS',
        category: 'Cloud Services',
        brief: 'المصادقة، التنبيهات، وقواعد البيانات اللحظية',
        color: '#FFCA28',
        iconType: 'svg-asset',
        iconSrc: '/assets/logos/firebase-mono.svg',
    },
    {
        id: 'powerbi',
        name: 'Power BI & Excel',
        category: 'BI & Analytics',
        brief: 'لوحات تحكم تفاعلية وتقارير متقدمة لصناع القرار',
        color: '#D97706',
        iconType: 'custom-svg',
        svgPath: (
            <svg
                viewBox="0 0 24 24"
                className="tech-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#D97706' }}
            >
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
        ),
    },
    {
        id: 'git',
        name: 'Git & GitHub',
        category: 'Version Control',
        brief: 'إدارة الشيفرات، العمل التعاوني، ومسارات CI/CD',
        color: '#F05032',
        iconType: 'custom-svg',
        svgPath: (
            <svg
                viewBox="0 0 24 24"
                className="tech-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#F05032' }}
            >
                <line x1="6" x2="6" y1="3" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
        ),
    },
];

function TechCardItem({ item }: { item: TechItem }) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform =
            'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    return (
        <div
            ref={cardRef}
            className="tech-card-3d tilt-card"
            style={{ '--skill': item.color } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => playClickSound(600, 0.02)}
            role="button"
            tabIndex={0}
            aria-label={`${item.name} - ${item.category}`}
        >
            <div className="card-glare" />
            <span className="tech-glow" />

            {item.iconType === 'svg-asset' && item.iconSrc ? (
                <img
                    src={item.iconSrc}
                    alt={item.name}
                    className="tech-icon"
                    onError={(e) => {
                        // Fallback in case SVG fails
                        (e.currentTarget as HTMLImageElement).style.display =
                            'none';
                    }}
                />
            ) : (
                item.svgPath
            )}

            <h4 className="tech-name">{item.name}</h4>
            <span className="tech-category">{item.category}</span>
            <p className="tech-brief">{item.brief}</p>
        </div>
    );
}

export function CoreTechWall() {
    return (
        <div className="my-12 w-full space-y-8">
            {/* Header matching original template */}
            <div className="tech-wall-header">
                <h3 className="tech-wall-title">
                    <Layers className="size-6 text-primary" />
                    الأدوات والتقنيات الأساسية (Core Tech Stack)
                </h3>
                <p className="tech-wall-desc">
                    التقنيات والمكتبات المعتمدة في بناء مشاريع{' '}
                    <strong className="font-bold text-foreground">
                        سندباد
                    </strong>
                    ،{' '}
                    <strong className="font-bold text-foreground">
                        محفظة ريال
                    </strong>
                    ، ومنصة{' '}
                    <strong className="font-bold text-foreground">
                        فكرة مبرمج
                    </strong>
                </p>
            </div>

            {/* 3D Glowing Tech Wall Grid */}
            <div className="tech-wall-grid">
                {CORE_TECH_ITEMS.map((item) => (
                    <TechCardItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
