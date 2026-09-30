import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Rocket,
    Send,
    Download,
    Award,
    Code,
    Cpu,
    BookOpen,
    GraduationCap,
    ExternalLink,
    Github,
    Sparkles,
    CheckCircle2,
    Calendar,
    Eye,
    MessageSquare,
    Layers,
    Terminal,
    ChevronLeft,
    Phone,
    Mail,
    ArrowUpRight,
    Brain,
    Smartphone,
    Database,
    Zap,
    Search,
    Star,
    RefreshCw,
    Box,
    Globe,
    ShieldCheck,
    Heart,
    SlidersHorizontal,
    Share2,
    MousePointer,
    Check,
} from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { ProjectModal } from '@/components/portfolio/project-modal';
import { CertificateModal } from '@/components/portfolio/certificate-modal';
import { ArticleModal } from '@/components/portfolio/article-modal';
import { playClickSound, playMechanicalPress } from '@/components/portfolio/sound-effects';
import { TiltCard } from '@/components/portfolio/tilt-card';
import { fireConfetti } from '@/components/portfolio/confetti';
import { Spline3dScene } from '@/components/portfolio/spline-3d-scene';
import { CoreTechWall } from '@/components/portfolio/core-tech-wall';
import { ProjectShowcaseCard } from '@/components/portfolio/project-showcase-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type {
    Project,
    Skill,
    Certificate,
    Journey,
    Article,
    ProfileSettings,
    Service,
    Testimonial,
} from '@/types/portfolio';

interface WelcomeProps {
    featuredProjects: Project[];
    allProjects: Project[];
    services?: Service[];
    testimonials?: Testimonial[];
    skills: Skill[];
    certificates: Certificate[];
    journey: Journey[];
    recentArticles: Article[];
    settings: ProfileSettings;
    stats: {
        projects: number;
        services?: number;
        testimonials?: number;
        certificates: number;
        skills: number;
        journey: number;
        articles: number;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Welcome({
    featuredProjects,
    allProjects,
    services = [],
    testimonials = [],
    skills = [],
    certificates = [],
    journey = [],
    recentArticles = [],
    settings,
    stats,
}: WelcomeProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [projectCategory, setProjectCategory] = useState<string>('all');
    const [activeSkillTab, setActiveSkillTab] = useState<string>('data-ai');
    const [activeBlogTag, setActiveBlogTag] = useState<string>('all');

    // Contact Form with Inertia useForm
    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: 'data-ai',
        message: '',
    });

    const submitContact = (e: React.FormEvent) => {
        e.preventDefault();
        playClickSound(800, 0.04);
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                fireConfetti();
            },
        });
    };

    // Filter projects
    const filteredProjects = projectCategory === 'all'
        ? allProjects
        : allProjects.filter((p) => p.category === projectCategory);

    const projectTabs = [
        { id: 'all', label: 'جميع المشاريع' },
        { id: 'platform', label: 'المنصات والتجارة' },
        { id: 'ai-data', label: 'الذكاء الاصطناعي والبيانات' },
        { id: 'mobile', label: 'تطبيقات الهاتف' },
        { id: 'web', label: 'تطوير الويب' },
    ];

    // Detailed skills categorization fallback data matching original design exactly
    const detailedSkillsMap: Record<string, Array<{ name: string; level: number; label: string; icon: string }>> = {
        'data-ai': [
            { name: 'Python (Data & AI)', level: 92, label: 'متقدم', icon: 'Python' },
            { name: 'Data Analysis & Visualization', level: 90, label: 'متقدم', icon: 'Data' },
            { name: 'Machine Learning Models', level: 82, label: 'جيد جداً', icon: 'ML' },
            { name: 'pandas & NumPy', level: 88, label: 'متقدم', icon: 'Lib' },
            { name: 'Power BI & Advanced Excel', level: 85, label: 'متقدم', icon: 'BI' },
            { name: 'Data Storytelling & Insights', level: 86, label: 'جيد جداً', icon: 'Viz' },
        ],
        'programming': [
            { name: 'C++ & OOP & Data Structures', level: 85, label: 'متقدم', icon: 'C++' },
            { name: 'PHP & Laravel Framework', level: 80, label: 'جيد جداً', icon: 'PHP' },
            { name: 'JavaScript (ES6+)', level: 78, label: 'جيد جداً', icon: 'JS' },
            { name: 'HTML5 & CSS3 & Responsive UI', level: 90, label: 'متقدم', icon: 'UI' },
            { name: 'RESTful APIs & Integrations', level: 82, label: 'جيد جداً', icon: 'API' },
            { name: 'Software Architecture', level: 80, label: 'جيد جداً', icon: 'Arch' },
        ],
        'mobile': [
            { name: 'Flutter Development', level: 85, label: 'متقدم', icon: 'Flutter' },
            { name: 'Dart Programming', level: 84, label: 'متقدم', icon: 'Dart' },
            { name: 'UI/UX Implementation', level: 85, label: 'متقدم', icon: 'UX' },
            { name: 'State Management (Provider / GetX)', level: 78, label: 'جيد جداً', icon: 'State' },
        ],
        'tools': [
            { name: 'SQL & Relational DB (MySQL / PostgreSQL)', level: 85, label: 'متقدم', icon: 'DB' },
            { name: 'Git & GitHub Version Control', level: 84, label: 'جيد جداً', icon: 'Git' },
            { name: 'VPS & Linux Server Basics', level: 75, label: 'جيد', icon: 'Linux' },
            { name: 'Figma UI Design Basics', level: 78, label: 'جيد جداً', icon: 'Figma' },
        ],
    };

    // Fallback Services if empty
    const displayServices: Service[] = services.length > 0 ? services : [
        {
            id: 1,
            title: 'علوم البيانات والذكاء الاصطناعي',
            slug: 'data-ai',
            short_description: 'تحليل البيانات الاستكشافي، معالجة وتنظيف مجموعات البيانات الكبيرة، بناء وتدريب نماذج التعلم الآلي، وتصميم لوحات تحكم تفاعلية عبر Power BI لدعم اتخاذ القرار.',
            detailed_description: 'تحليل البيانات الاستكشافي، معالجة وتنظيف مجموعات البيانات الكبيرة، بناء وتدريب نماذج التعلم الآلي، وتصميم لوحات تحكم تفاعلية عبر Power BI لدعم اتخاذ القرار.',
            icon: 'brain',
            features: ['Exploratory Data Analysis', 'Machine Learning Models', 'Power BI Dashboards', 'Predictive Modeling'],
            order: 1,
        },
        {
            id: 2,
            title: 'تطوير تطبيقات الموبايل (Flutter)',
            slug: 'mobile',
            short_description: 'بناء تطبيقات هواتف ذكية عصرية لنظامي Android و iOS باستخدام Flutter و Dart، مع التركيز على التصميم السلس، الأداء الفائق، والربط المحكم مع الـ APIs.',
            detailed_description: 'بناء تطبيقات هواتف ذكية عصرية لنظامي Android و iOS باستخدام Flutter و Dart، مع التركيز على التصميم السلس، الأداء الفائق، والربط المحكم مع الـ APIs.',
            icon: 'smartphone',
            features: ['Cross-Platform Apps', 'Clean Architecture & BLoC', 'Responsive Adaptive UI', 'Secure Offline Storage'],
            order: 2,
        },
        {
            id: 3,
            title: 'تطوير الويب والأنظمة الخلفية (Laravel)',
            slug: 'backend',
            short_description: 'هندسة أنظمة الويب والخوادم وقواعد البيانات، وبناء واجهات البرمجة RESTful APIs الآمنة والسريعة، مع تطبيق أفضل ممارسات الحماية وهندسة البرمجيات.',
            detailed_description: 'هندسة أنظمة الويب والخوادم وقواعد البيانات، وبناء واجهات البرمجة RESTful APIs الآمنة والسريعة، مع تطبيق أفضل ممارسات الحماية وهندسة البرمجيات.',
            icon: 'server',
            features: ['RESTful APIs', 'Database Optimization', 'Authentication & Guards', 'Cloud Microservices'],
            order: 3,
        },
        {
            id: 4,
            title: 'تصميم تجربة وواجهة المستخدم UI/UX',
            slug: 'ui-ux',
            short_description: 'تحويل الأفكار إلى مخططات ونماذج تفاعلية أنيقة تركز على سهولة الاستخدام وتوافقها مع المعايير العالمية لجاذبية التصميم وسرعة الاستجابة.',
            detailed_description: 'تحويل الأفكار إلى مخططات ونماذج تفاعلية أنيقة تركز على سهولة الاستخدام وتوافقها مع المعايير العالمية لجاذبية التصميم وسرعة الاستجابة.',
            icon: 'layers',
            features: ['Interactive Prototypes', 'Modern Aesthetic Systems', 'User Journey Mapping', 'Figma to Code Accuracy'],
            order: 4,
        },
        {
            id: 5,
            title: 'تصميم وإدارة قواعد البيانات',
            slug: 'database',
            short_description: 'تصميم مخططات قواعد البيانات العلائقية (MySQL / PostgreSQL) وغير العلائقية (MongoDB)، وتحسين سرعة الاستعلامات والفهارس لتناسب الأنظمة الكبيرة.',
            detailed_description: 'تصميم مخططات قواعد البيانات العلائقية (MySQL / PostgreSQL) وغير العلائقية (MongoDB)، وتحسين سرعة الاستعلامات والفهارس لتناسب الأنظمة الكبيرة.',
            icon: 'database',
            features: ['Schema Architecture', 'Indexing & Query Tuning', 'Data Migration Pipelines', 'Redis In-Memory Caching'],
            order: 5,
        },
        {
            id: 6,
            title: 'الاستشارات التقنية وتطوير المنتجات',
            slug: 'consulting',
            short_description: 'مساعدة رواد الأعمال والشركات الناشئة في تحويل الأفكار إلى منتجات رقمية قابلة للنمو (MVPs)، واختيار البنية التقنية الأمثل لتحقيق النجاح والتوسع.',
            detailed_description: 'مساعدة رواد الأعمال والشركات الناشئة في تحويل الأفكار إلى منتجات رقمية قابلة للنمو (MVPs)، واختيار البنية التقنية الأمثل لتحقيق النجاح والتوسع.',
            icon: 'zap',
            features: ['MVP Feasibility Studies', 'Tech Stack Selection', 'Code Audit & Refactoring', 'Scalability Roadmap'],
            order: 6,
        },
    ];

    // Fallback Journey Milestones if empty
    const displayJourney = journey.length > 0 ? journey : [
        {
            id: 1,
            title: 'تطوير منصة سندباد ومحفظة ريال الرقمية',
            role: 'Full-Stack & Flutter Mobile Developer',
            date_range: '2024 - 2025',
            category: 'work',
            category_label: 'عمل ومشاريع',
            icon: 'rocket',
            description: 'المشاركة في هندسة المنصة متعددة التجار "سندباد" (Laravel & Flutter) وتطوير تطبيق "محفظة ريال" للخدمات المالية الرقمية وتطبيق نماذج التنبؤ الذكية بالمبيعات.',
            order: 1,
        },
        {
            id: 2,
            title: 'التخصص في علوم البيانات والذكاء الاصطناعي التوليدي',
            role: 'Data Science & Machine Learning Enthusiast',
            date_range: '2023 - 2024',
            category: 'learning',
            category_label: 'مسار تخصصي',
            icon: 'brain',
            description: 'إنجاز معسكرات وشهادات معتمدة في مكتبات بايثون (pandas, NumPy, Scikit-Learn)، وبناء لوحات المؤشرات بـ Power BI، ودراسة معمارية النماذج اللغوية الكبيرة LLMs.',
            order: 2,
        },
        {
            id: 3,
            title: 'تأسيس مبادرة "فكرة مبرمج" (Programmer Idea)',
            role: 'Founder & Tech Lead',
            date_range: '2023 - مستمر',
            category: 'community',
            category_label: 'مبادرة مجتمعية',
            icon: 'lightbulb',
            description: 'إطلاق قنوات ومنصة فكرة مبرمج لتعليم البرمجة وتبسيط العلوم التقنية باللغة العربية، وتقديم شروحات عملية في مسارات بايثون وفلاتر وتطوير الويب.',
            order: 3,
        },
        {
            id: 4,
            title: 'دراسة علوم الحاسوب وتقنية المعلومات — جامعة إب',
            role: 'المستوى الرابع (بكالوريوس تقنية معلومات)',
            date_range: '2021 - الآن',
            category: 'education',
            category_label: 'تعليم أكاديمي',
            icon: 'graduation-cap',
            description: 'دراسة متعمقة في هياكل البيانات (Data Structures)، الخوارزميات، البرمجة كائنية التوجه (OOP بـ C++)، قواعد البيانات العلائقية، وهندسة البرمجيات مع التكريم الأكاديمي.',
            order: 4,
        },
    ];

    // Fallback Certificates if empty
    const displayCertificates = certificates.length > 0 ? certificates : [
        {
            id: 1,
            title: 'Python for Data Science, AI & Development',
            issuer: 'IBM / Coursera',
            date: '2024',
            category: 'data-ai',
            category_label: 'علوم البيانات والذكاء الاصطناعي',
            image: '/images/project-1.png',
            credential_url: 'https://coursera.org',
            description: 'شهادة احترافية معتمدة في برمجة Python المتقدمة، معالجة البيانات بمكتبات pandas و NumPy، واستدعاء نماذج الذكاء الاصطناعي.',
            order: 1,
        },
        {
            id: 2,
            title: 'تكريم التميز الأكاديمي — كلية الحاسوب',
            issuer: 'جامعة إب (Ibb University)',
            date: '2024',
            category: 'academic',
            category_label: 'تكريم أكاديمي',
            image: '/images/project-2.jpg',
            credential_url: '#',
            description: 'تكريم رسمي من رئاسة قسم علوم الحاسوب وتقنية المعلومات بجامعة إب تقديراً للتفوق الأكاديمي والمبادرات التقنية الطلابية.',
            order: 2,
        },
        {
            id: 3,
            title: 'Machine Learning Models & Data Analytics',
            issuer: 'DeepLearning.AI',
            date: '2024',
            category: 'data-ai',
            category_label: 'تعلم الآلة والتحليلات',
            image: '/images/project-4.png',
            credential_url: 'https://coursera.org',
            description: 'بناء وتدريب وتقييم نماذج التعلم الآلي الخطي والتصنيفي والتجميعي، وتطبيقها على مجموعات بيانات واقعية.',
            order: 3,
        },
        {
            id: 4,
            title: 'Power BI Data Analyst Associate',
            issuer: 'Microsoft Certified Partner',
            date: '2023',
            category: 'data-ai',
            category_label: 'ذكاء الأعمال',
            image: '/images/project-3.png',
            credential_url: '#',
            description: 'إتقان نمذجة البيانات، دوال DAX المتقدمة، وبناء لوحات المؤشرات التفاعلية وربط مصادر البيانات المتعددة.',
            order: 4,
        },
    ];

    // Fallback Testimonials if empty
    const displayTestimonials: Testimonial[] = testimonials.length > 0 ? testimonials : [
        {
            id: 1,
            name: 'م. أحمد العريقي',
            role: 'مدير مشروع تقني',
            company: 'شريك تجاري',
            text: 'عبدالرحمن مبرمج استثنائي يتمتع بعقلية هندسية منظمة وشغف غير عادي بالتفاصيل، ساهم بشكل ملموس في بناء المنصة وتطوير واجهات التطبيق بأعلى جودة واحترافية.',
            rating: 5,
            order: 1,
        },
        {
            id: 2,
            name: 'ياسر الحميري',
            role: 'طالب علوم حاسوب',
            company: 'عضو مجتمع فكرة مبرمج',
            text: 'محتوى فكرة مبرمج الذي يقدمه عبدالرحمن كان له أثر كبير في فهمي لعلوم البيانات وبايثون. طريقته في التبسيط والعمق البرمجي جعلت المفاهيم المعقدة سهلة وممتعة.',
            rating: 5,
            order: 2,
        },
        {
            id: 3,
            name: 'م. ساهر قائد',
            role: 'مهندس برمجيات',
            company: 'زميل دراسة',
            text: 'التعامل مع عبدالرحمن في مشاريع الـ Flutter و Laravel يعطيك اطمئناناً كاملاً. التزام بالمواعيد، كود نظيف وقابل للتطوير، وفهم عميق لاحتياجات العميل الحقيقية.',
            rating: 5,
            order: 3,
        },
    ];

    // Hot Topics for Blog
    const hotTopics = [
        { title: 'الذكاء الاصطناعي وتعلم الآلة', count: '24 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=700&auto=format&fit=crop', filter: 'ذكاء' },
        { title: 'بايثون وهندسة البيانات', count: '38 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=700&auto=format&fit=crop', filter: 'بايثون' },
        { title: 'تطوير تطبيقات الموبايل بـ Flutter', count: '19 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=700&auto=format&fit=crop', filter: 'flutter' },
        { title: 'تطوير الويب والـ Full-Stack', count: '27 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=700&auto=format&fit=crop', filter: 'ويب' },
        { title: 'معمارية البرمجيات والخوارزميات', count: '16 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=700&auto=format&fit=crop', filter: 'معمارية' },
        { title: 'ريادة الأعمال والمنتجات الرقمية', count: '12 مقالاً وشرحاً', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop', filter: 'ريادة' },
    ];

    // Sanitize experience years to remove trailing plus or non-numeric characters
    const rawExpYears = settings.experience_years ? String(settings.experience_years) : '3';
    const expYears = rawExpYears.replace(/[^0-9]/g, '') || '3';

    return (
        <PortfolioLayout>
            <Head>
                <title>{`${settings.name || 'عبدالرحمن عادل الشجاع'} | مطور برمجيات ومهتم بالذكاء الاصطناعي`}</title>
                <meta
                    name="description"
                    content="الموقع الشخصي للمهندس عبدالرحمن عادل الشجاع — مبرمج، مهتم بعلوم البيانات والذكاء الاصطناعي، ومؤسس منصة فكرة مبرمج وسندباد."
                />
            </Head>

            {/* Modals */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <CertificateModal
                certificate={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />

            <ArticleModal
                article={selectedArticle}
                isOpen={!!selectedArticle}
                onClose={() => setSelectedArticle(null)}
            />

            {/* ============================================================== */}
            {/* 1. HERO SECTION (#home)                                        */}
            {/* ============================================================== */}
            <section className="home relative overflow-hidden" id="home">
                <div className="hero-wrapper">
                    <div className="hero-content">
                        {/* LEFT SIDE: Image Section (Column 1 in Desktop & Tablet) */}
                        <div className="hero-image-col image-section">
                            <TiltCard maxTilt={8} className="w-full max-w-[420px]">
                                <div className="avatar-frame">
                                    <div className="image-glow" />

                                    <img
                                        src={settings.hero_image || '/images/profile-hero.png'}
                                        alt={settings.name || 'عبدالرحمن عادل الشجاع'}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.src.includes('main-img.jpg')) {
                                                target.src = '/images/main-img.jpg';
                                            }
                                        }}
                                        className="avatar-img signature-frame-img"
                                    />

                                    {/* Experience floating badge */}
                                    <div className="image-badge-experience">
                                        <span className="badge-number">+{expYears}</span>
                                        <span className="badge-text">سنوات في البرمجة والبيانات</span>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>

                        {/* RIGHT SIDE: Content Section (Column 2 in Desktop & Tablet, pure Arabic RTL) */}
                        <div className="hero-text-col content-section space-y-5">
                            {/* Status Badge */}
                            <div className="status-badge">
                                <span className="pulse-dot"></span>
                                <span>{settings.status_badge || 'متاح للعمل الحر وتطوير المشاريع البرمجية'}</span>
                            </div>

                            {/* Hello Greeting & Main Heading */}
                            <div className="hero-title-group">
                                <span className="hello">
                                    مرحباً بك، أنا
                                </span>
                                <h1 className="hero-name">
                                    عبدالرحمن <span className="text-gradient">عادل الشجاع</span>
                                </h1>
                            </div>

                            {/* Role Badge */}
                            <div className="role-badge">
                                <Terminal className="size-4.5 text-primary shrink-0" />
                                <span>{settings.role_title || 'Computer Science & IT · Data & AI · Software Development'}</span>
                            </div>

                            {/* Hero Description */}
                            <p className="hero-description">
                                {settings.hero_desc ||
                                    'طالب علوم حاسوب وتقنية معلومات في جامعة إب، مبرمج ومؤسس منصة فكرة مبرمج. شغوف بعلوم البيانات والذكاء الاصطناعي وتطوير البرمجيات، وأسعى إلى تحويل الأفكار إلى منتجات رقمية متكاملة، عملية وقابلة للتوسع، ذات أثر حقيقي.'}
                            </p>

                            {/* Hero Actions (3 Buttons) */}
                            <div className="hero-actions">
                                <a
                                    href="#projects"
                                    onClick={() => playClickSound(650, 0.03)}
                                    className="btn btn-primary"
                                >
                                    <Rocket className="size-4" />
                                    <span>استكشف مشاريعي</span>
                                </a>

                                <a
                                    href="#contact"
                                    onClick={() => playClickSound(650, 0.03)}
                                    className="btn btn-outline"
                                >
                                    <Send className="size-4" />
                                    <span>تواصل معي</span>
                                </a>

                                <a
                                    href={settings.cv_url || '/cv'}
                                    download
                                    onClick={() => {
                                        playClickSound(650, 0.03);
                                        fireConfetti();
                                    }}
                                    className="btn btn-subtle"
                                >
                                    <Download className="size-4 text-primary" />
                                    <span>السيرة الذاتية (CV)</span>
                                </a>
                            </div>

                            {/* Social Hero (8 direct channels) */}
                            <div className="social-hero">
                                <span className="social-label">تابعني وتواصل معي:</span>
                                <div className="social-links">
                                    <a
                                        href={`https://wa.me/${(settings.whatsapp_1 || '+967773853853').replace(/\+/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="WhatsApp مباشر"
                                        aria-label="WhatsApp"
                                    >
                                        <Phone className="size-4" />
                                    </a>
                                    <a
                                        href={settings.telegram || 'https://t.me/Alshuja_ai'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Telegram شخصي"
                                        aria-label="Telegram"
                                    >
                                        <Send className="size-4" />
                                    </a>
                                    <a
                                        href="https://t.me/Programmer_Idea"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="قناة فكرة مبرمج"
                                        aria-label="Telegram Channel"
                                    >
                                        <BookOpen className="size-4" />
                                    </a>
                                    <a
                                        href={settings.instagram || 'https://www.instagram.com/alshujaa'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Instagram"
                                        aria-label="Instagram"
                                    >
                                        <Sparkles className="size-4" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@Programmer_idea"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="YouTube"
                                        aria-label="YouTube"
                                    >
                                        <ExternalLink className="size-4" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/programmerIdea.com.ye?mibextid=ZbWKwL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Facebook"
                                        aria-label="Facebook"
                                    >
                                        <Globe className="size-4" />
                                    </a>
                                    <a
                                        href={settings.github || 'https://github.com/alshujaa'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="GitHub"
                                        aria-label="GitHub"
                                    >
                                        <Github className="size-4" />
                                    </a>
                                    <a
                                        href={`mailto:${settings.email || 'Abdulrahman_Alshujaa@gmail.com'}`}
                                        title="Email"
                                        aria-label="Email"
                                    >
                                        <Mail className="size-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 2. ABOUT SECTION (#about)                                      */}
            {/* ============================================================== */}
            <section className="about" id="about">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">تعرّف علي أكثر</span>
                        <h2 className="heading">
                            عن <span>عبدالرحمن الشجاع</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    <div className="about-card-wrapper">
                        <div className="about-grid">
                            {/* Image Column */}
                            <div className="about-image-col flex justify-center items-center">
                                <div className="avatar-frame max-w-xs sm:max-w-sm">
                                    <div className="image-glow" />
                                    <img
                                        src={settings.about_image || settings.hero_image || '/images/profile-hero.png'}
                                        alt={settings.name || 'عبدالرحمن عادل الشجاع'}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (!target.src.includes('main-img.jpg')) {
                                                target.src = '/images/main-img.jpg';
                                            }
                                        }}
                                        className="avatar-img signature-frame-img"
                                    />
                                    <div className="badge-exp">
                                        <span className="num">+{expYears}</span>
                                        <span className="txt">سنوات شغف وبناء برمجيات</span>
                                    </div>
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className="about-text-col text-right space-y-4">
                                <span className="subtitle font-bold text-primary text-sm sm:text-base">
                                    شغف بالابتكار والحلول العملية
                                </span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
                                    مهندس ومطور <span className="text-gradient">يحوّل الأفكار إلى منتجات رقمية</span>
                                </h2>

                                <p className="lead-text text-sm sm:text-base text-foreground font-medium leading-relaxed">
                                    {settings.about_lead ||
                                        'أنا عبدالرحمن عادل الشجاع، طالب في جامعة إب بكلية الحاسوب وتقنية المعلومات (المستوى الرابع). أؤمن بأن التقنية والبيانات هما القوة المحركة لصناعة التغيير، ولذلك كرست وقتي لتعلم وتطبيق أحدث مهارات علم البيانات، ونماذج الذكاء الاصطناعي، وهندسة البرمجيات.'}
                                </p>

                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {settings.about_bio ||
                                        'أسست منصة ومبادرة "فكرة مبرمج" (Programmer Idea) لتبسيط علوم البرمجة والذكاء الاصطناعي وإثراء المحتوى التقني العربي، كما شاركت في بناء وتطوير مشاريع حقيقية وناجحة كمنصة "سندباد" (Sinbad) للتجارة الإلكترونية وتطبيق "محفظة ريال" (Riyal Wallet).'}
                                </p>

                                {/* 4 Highlight Cards Grid */}
                                <div className="about-highlights-grid">
                                    <TiltCard maxTilt={10}>
                                        <div className="highlight-item">
                                            <div className="card-glare" />
                                            <GraduationCap className="size-6 text-primary shrink-0" />
                                            <div>
                                                <strong>جامعة إب</strong>
                                                <span>علوم حاسوب وتكنولوجيا معلومات (المستوى 4)</span>
                                            </div>
                                        </div>
                                    </TiltCard>

                                    <TiltCard maxTilt={10}>
                                        <div className="highlight-item">
                                            <div className="card-glare" />
                                            <Brain className="size-6 text-primary shrink-0" />
                                            <div>
                                                <strong>Data & AI</strong>
                                                <span>نماذج تعلم الآلة وتحليل البيانات ببايثون</span>
                                            </div>
                                        </div>
                                    </TiltCard>

                                    <TiltCard maxTilt={10}>
                                        <div className="highlight-item">
                                            <div className="card-glare" />
                                            <Smartphone className="size-6 text-primary shrink-0" />
                                            <div>
                                                <strong>Flutter Apps</strong>
                                                <span>تطبيقات هواتف ذكية Android & iOS</span>
                                            </div>
                                        </div>
                                    </TiltCard>

                                    <TiltCard maxTilt={10}>
                                        <div className="highlight-item">
                                            <div className="card-glare" />
                                            <Rocket className="size-6 text-primary shrink-0" />
                                            <div>
                                                <strong>فكرة مبرمج</strong>
                                                <span>مبادرة ومجتمع تقني لتعليم البرمجة</span>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </div>

                                {/* About Actions */}
                                <div className="about-actions-row pt-2">
                                    <a
                                        href={settings.cv_url || '/cv'}
                                        download
                                        onClick={() => {
                                            playClickSound(650, 0.03);
                                            fireConfetti();
                                        }}
                                        className="btn btn-primary"
                                    >
                                        <Download className="size-4" />
                                        <span>تحميل السيرة الذاتية (CV)</span>
                                    </a>

                                    <a
                                        href="#contact"
                                        onClick={() => playClickSound(650, 0.03)}
                                        className="btn btn-outline"
                                    >
                                        <Send className="size-4" />
                                        <span>تواصل معي مباشرة</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 3. SKILLS & 3D STAGE SECTION (#skills)                         */}
            {/* ============================================================== */}
            <section className="skills py-20 relative" id="skills">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">قدراتي وكفاءتي البرمجية</span>
                        <h2 className="heading">
                            المهارات والبيئة <span>ثلاثية الأبعاد (3D)</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    {/* 3D Spline Interactive Showcase & Tech Wall */}
                    <div className="skills-3d-stage space-y-12">
                        <div className="stage-header max-w-3xl mx-auto text-center space-y-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                                <span className="pulse-dot"></span>
                                <Box className="size-4" />
                                <span>مجسم لوحة المفاتيح والتقنيات التفاعلي (Interactive 3D Stage)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                <MousePointer className="size-3.5 inline ml-1 text-primary" />
                                <strong>تجربة تفاعلية حية:</strong> اسحب وحرّك الماوس للتنقل ثلاثي الأبعاد داخل المشهد، واضغط على مفاتيح لوحة المفاتيح لتجربة المؤثرات الصوتية والميكانيكية الحقيقية.
                            </p>
                        </div>

                        {/* Spline 3D Scene */}
                        <div className="max-w-5xl mx-auto">
                            <Spline3dScene
                                url="/assets/3d/skills-keyboard.spline"
                                height="540px"
                                hintText="حرك المجسم ثلاثي الأبعاد أو اضغط على المفاتيح لتجربة المؤثرات الميكانيكية"
                            />
                        </div>

                        {/* 3D Glowing Tech Wall (Core Tech Stack) */}
                        <CoreTechWall />
                    </div>

                    {/* Detailed Skill Tabs with Progress Bars */}
                    <div className="mt-20 pt-12 border-t border-border/70">
                        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                            <h3 className="text-2xl font-bold text-foreground">
                                تفصيل المهارات ومستوى الإتقان
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                قياس دقيق لنسبة الكفاءة في كل مجال ومكتبة برمجية
                            </p>
                        </div>

                        {/* Category Tab Buttons */}
                        <div className="tabs-container">
                            <button
                                className={`tab-btn ${activeSkillTab === 'data-ai' ? 'active' : ''}`}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setActiveSkillTab('data-ai');
                                }}
                            >
                                <Brain className="size-4" />
                                <span>البيانات والذكاء الاصطناعي</span>
                            </button>

                            <button
                                className={`tab-btn ${activeSkillTab === 'programming' ? 'active' : ''}`}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setActiveSkillTab('programming');
                                }}
                            >
                                <Code className="size-4" />
                                <span>البرمجة وتطوير الويب</span>
                            </button>

                            <button
                                className={`tab-btn ${activeSkillTab === 'mobile' ? 'active' : ''}`}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setActiveSkillTab('mobile');
                                }}
                            >
                                <Smartphone className="size-4" />
                                <span>تطبيقات الهاتف</span>
                            </button>

                            <button
                                className={`tab-btn ${activeSkillTab === 'tools' ? 'active' : ''}`}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setActiveSkillTab('tools');
                                }}
                            >
                                <Database className="size-4" />
                                <span>الأدوات وقواعد البيانات</span>
                            </button>
                        </div>

                        {/* Tab Content Cards */}
                        <div className="skills-grid max-w-5xl mx-auto">
                            {(detailedSkillsMap[activeSkillTab] || []).map((skillItem) => (
                                <div key={skillItem.name} className="skill-box tilt-card">
                                    <div className="card-glare" />
                                    <div className="skill-info">
                                        <span className="skill-name">
                                            <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px] font-bold">
                                                {skillItem.icon}
                                            </span>
                                            {skillItem.name}
                                        </span>
                                        <span className="skill-level">
                                            {skillItem.level}% · {skillItem.label}
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <span style={{ width: `${skillItem.level}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 4. STATS COUNTER SECTION (#stats)                              */}
            {/* ============================================================== */}
            <section className="stats-section bg-muted/20 border-y border-border/60" id="stats">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="stats-grid">
                        <TiltCard maxTilt={10}>
                            <div className="stat-card">
                                <div className="card-glare" />
                                <div className="stat-icon">
                                    <Calendar className="size-6" />
                                </div>
                                <div className="stat-value">+{expYears}</div>
                                <div className="stat-label">سنوات شغف وبناء برمجيات</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={10}>
                            <div className="stat-card">
                                <div className="card-glare" />
                                <div className="stat-icon">
                                    <Code className="size-6" />
                                </div>
                                <div className="stat-value">+{stats.projects || 15}</div>
                                <div className="stat-label">مشاريع ومنصات رقمية</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={10}>
                            <div className="stat-card">
                                <div className="card-glare" />
                                <div className="stat-icon">
                                    <GraduationCap className="size-6" />
                                </div>
                                <div className="stat-value">+10,000</div>
                                <div className="stat-label">مستفيد من محتوى "فكرة مبرمج"</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={10}>
                            <div className="stat-card">
                                <div className="card-glare" />
                                <div className="stat-icon">
                                    <Award className="size-6" />
                                </div>
                                <div className="stat-value">+{stats.certificates || 6}</div>
                                <div className="stat-label">شهادات وتكريمات أكاديمية</div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 5. PROJECTS SECTION (#projects)                                */}
            {/* ============================================================== */}
            <section className="projects py-20 md:py-28 relative" id="projects">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">أعمالي ومنتجاتي التقنية</span>
                        <h2 className="heading">
                            المشاريع <span>الرقمية المنجزة</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    {/* Project Category Filter Tabs */}
                    <div className="project-filters">
                        {projectTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    playClickSound(550, 0.02);
                                    setProjectCategory(tab.id);
                                }}
                                className={`filter-btn ${projectCategory === tab.id ? 'active' : ''}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectShowcaseCard
                                key={project.id}
                                project={project}
                                onOpenModal={setSelectedProject}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 6. SERVICES SECTION (#services)                                */}
            {/* ============================================================== */}
            <section className="services py-20 md:py-28 bg-muted/20 border-t border-border/60 relative" id="services">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">حلول هندسية وتقنية</span>
                        <h2 className="heading">
                            الخدمات <span>التي أقدمها</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    <div className="services-grid">
                        {displayServices.map((service, index) => (
                            <TiltCard key={service.id} maxTilt={10} className="h-full">
                                <div className="service-card h-full">
                                    <div className="card-glare" />
                                    <span className="service-number">0{index + 1}</span>
                                    <div className="service-icon">
                                        {index === 0 && <Brain className="size-8" />}
                                        {index === 1 && <Smartphone className="size-8" />}
                                        {index === 2 && <Code className="size-8" />}
                                        {index === 3 && <Layers className="size-8" />}
                                        {index === 4 && <Database className="size-8" />}
                                        {index === 5 && <Zap className="size-8" />}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.short_description || service.detailed_description}</p>
                                    {service.features && service.features.length > 0 && (
                                        <div className="pt-4 border-t border-border/60 space-y-2 mt-auto">
                                            {service.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Check className="size-3.5 text-emerald-500 shrink-0" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 7. JOURNEY / TIMELINE SECTION (#journey)                       */}
            {/* ============================================================== */}
            <section className="timeline py-20 md:py-28 relative" id="journey">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">المسيرة والمحطات</span>
                        <h2 className="heading">
                            المسار <span>التعليمي والمهني</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    <div className="journey-compact-grid">
                        {displayJourney.map((milestone) => (
                            <TiltCard key={milestone.id} maxTilt={8}>
                                <div className="journey-mini-card">
                                    <div className="card-glare" />
                                    <div className="journey-mini-icon">
                                        <Rocket className="size-6" />
                                    </div>
                                    <div className="journey-mini-body">
                                        <div className="journey-mini-header">
                                            <h3 className="journey-mini-title">{milestone.title}</h3>
                                            <span className="journey-mini-badge">
                                                <Calendar className="size-3" />
                                                {milestone.date_range}
                                            </span>
                                        </div>
                                        <div className="journey-mini-role">
                                            <Sparkles className="size-3.5 text-amber-500" />
                                            <span>{milestone.role}</span>
                                        </div>
                                        <p className="journey-mini-desc">{milestone.description}</p>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 8. CERTIFICATES SECTION (#certificates)                        */}
            {/* ============================================================== */}
            <section className="certificates py-20 md:py-28 bg-muted/20 border-t border-border/60 relative" id="certificates">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">السجل والاعتمادات</span>
                        <h2 className="heading">
                            الشهادات <span>والجوائز الأكاديمية</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    <div className="certs-grid">
                        {displayCertificates.map((cert) => (
                            <TiltCard key={cert.id} maxTilt={8} className="h-full">
                                <div className="cert-card h-full">
                                    <div className="card-glare" />
                                    <div
                                        className="cert-thumb group"
                                        onClick={() => {
                                            playClickSound(650, 0.03);
                                            setSelectedCert(cert);
                                        }}
                                    >
                                        <img
                                            src={cert.image || '/images/project-1.png'}
                                            alt={cert.title}
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (!target.src.includes('placeholder.jpg')) {
                                                    target.src = '/images/placeholder.jpg';
                                                }
                                            }}
                                        />
                                        <span className="cert-badge-date">{cert.date}</span>
                                        <div className="cert-preview-overlay">
                                            <Search className="size-5" />
                                            <span>تكبير ومعاينة</span>
                                        </div>
                                    </div>

                                    <div className="cert-body flex flex-col flex-1">
                                        <span className="cert-issuer">
                                            <Award className="size-4" />
                                            {cert.issuer}
                                        </span>
                                        <h3>{cert.title}</h3>
                                        <p>{cert.description}</p>

                                        <div className="cert-footer mt-auto">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => {
                                                    playClickSound(650, 0.03);
                                                    setSelectedCert(cert);
                                                }}
                                            >
                                                <Eye className="size-3.5" />
                                                <span>معاينة الشهادة</span>
                                            </button>

                                            {cert.credential_url && cert.credential_url !== '#' ? (
                                                <a
                                                    href={cert.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline"
                                                >
                                                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                                                    <span>التحقق الرسمي</span>
                                                </a>
                                            ) : (
                                                <span className="btn btn-sm btn-subtle cursor-default">
                                                    <Award className="size-3.5 text-amber-500" />
                                                    <span>معتمد رسمياً</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 9. TESTIMONIALS SECTION (#testimonials)                        */}
            {/* ============================================================== */}
            <section className="testimonials py-20 md:py-28 relative" id="testimonials">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">شهادات أعتز بها</span>
                        <h2 className="heading">
                            آراء العملاء <span>والزملاء</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    <div className="testimonials-grid">
                        {displayTestimonials.map((item) => (
                            <TiltCard key={item.id} maxTilt={8} className="h-full">
                                <div className="testimonial-card h-full">
                                    <div className="card-glare" />
                                    <div>
                                        <div className="rating-stars">
                                            {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <p className="quote-text">"{item.text}"</p>
                                    </div>

                                    <div className="reviewer-meta">
                                        <div className="reviewer-avatar">
                                            <Terminal className="size-5" />
                                        </div>
                                        <div>
                                            <strong>{item.name}</strong>
                                            <span>{[item.role, item.company].filter(Boolean).join(' · ')}</span>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 10. PROGRAMMER IDEA COMMUNITY SPOTLIGHT                         */}
            {/* ============================================================== */}
            <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-muted/40 border-y border-border/60 relative">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="rounded-3xl border border-primary/30 bg-card/85 backdrop-blur-xl p-8 md:p-12 shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8 space-y-4 text-right">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white">
                                    <Sparkles className="size-3.5" />
                                    مبادرة ومجتمع تقني
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                                    منصة ومبادرة "فكرة مبرمج" — Programmer Idea
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    مبادرة تعليمية رائدة أسسها عبدالرحمن تهدف إلى تطوير المحتوى العلمي والتقني باللغة العربية في مجالات البرمجة وعلوم البيانات والذكاء الاصطناعي، وتقديم شروحات تطبيقية مجانية يستفيد منها آلاف الطلاب والمطورين.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 text-center">
                                        <div className="text-2xl font-black text-primary font-mono">+10,000</div>
                                        <div className="text-xs text-muted-foreground font-semibold">متابع ومستفيد</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 text-center">
                                        <div className="text-2xl font-black text-primary font-mono">+15</div>
                                        <div className="text-xs text-muted-foreground font-semibold">سلسلة تعليمية</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 text-center">
                                        <div className="text-2xl font-black text-primary font-mono">100%</div>
                                        <div className="text-xs text-muted-foreground font-semibold">محتوى عربي مفتوح</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                                <a
                                    href="/programmer-idea"
                                    onClick={() => playClickSound(650, 0.03)}
                                    className="btn btn-primary"
                                >
                                    <BookOpen className="size-4" />
                                    <span>استكشف تفاصيل المبادرة</span>
                                </a>

                                <a
                                    href="https://t.me/Programmer_Idea"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    <Send className="size-4" />
                                    <span>انضم لقناة تيليجرام</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 11. BLOG & ARTICLES SECTION (#blog)                            */}
            {/* ============================================================== */}
            <section className="blog py-20 md:py-28 relative" id="blog">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">المعرفة والتدوين البرمجي</span>
                        <h2 className="heading">
                            المدونة <span>والمقالات التقنية</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    {/* Hot Topics Horizontal Slider */}
                    <div className="mb-14">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                <Sparkles className="size-4" />
                                <span>المواضيع والمسارات الرائجة (Hot Topics)</span>
                            </div>
                            <Link href="/blog" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                                <span>تصفح كل المسارات</span>
                                <ChevronLeft className="size-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {hotTopics.map((topic, idx) => (
                                <div
                                    key={idx}
                                    className="group rounded-2xl overflow-hidden border border-border/80 bg-card hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm cursor-pointer"
                                    onClick={() => {
                                        playClickSound(600, 0.02);
                                        setActiveBlogTag(topic.filter);
                                    }}
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                                        <img
                                            src={topic.image}
                                            alt={topic.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-right">
                                            <h4 className="text-white text-xs font-bold leading-tight">
                                                {topic.title}
                                            </h4>
                                            <span className="text-white/70 text-[10px]">
                                                {topic.count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentArticles.map((article) => (
                            <div
                                key={article.id}
                                className="group rounded-3xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1.5 shadow-sm flex flex-col justify-between"
                            >
                                {article.image && (
                                    <div
                                        className="relative aspect-[16/10] w-full overflow-hidden bg-muted cursor-pointer"
                                        onClick={() => {
                                            playClickSound(600, 0.02);
                                            setSelectedArticle(article);
                                        }}
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src =
                                                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-background/90 text-foreground border border-border">
                                                {article.category_label || article.category}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-right">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                                            <span>{article.date}</span>
                                            <span>•</span>
                                            <span>{article.reading_time}</span>
                                        </div>
                                        <h3
                                            className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                                            onClick={() => {
                                                playClickSound(600, 0.02);
                                                setSelectedArticle(article);
                                            }}
                                        >
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                playClickSound(600, 0.02);
                                                setSelectedArticle(article);
                                            }}
                                            className="hover:underline flex items-center gap-1"
                                        >
                                            <Eye className="size-3.5" />
                                            <span>معاينة وقراءة</span>
                                        </button>
                                        <Link href={`/blog/${article.slug}`} className="hover:underline flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                            <span>الصفحة الكاملة</span>
                                            <ArrowUpRight className="size-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 12. CALL TO ACTION SECTION                                     */}
            {/* ============================================================== */}
            <section className="cta-section py-16 bg-muted/15 border-t border-border/60">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="cta-box max-w-4xl mx-auto text-center space-y-6">
                        <div className="cta-glow" />
                        <span className="cta-badge">
                            <Sparkles className="size-4" />
                            جاهز لنقل فكرتك إلى أرض الواقع
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground">
                            هل لديك فكرة مشروع أو ترغب في تطوير نظامك الرقمي؟
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                            أنا مستعد لتقديم الاستشارة البرمجية، بناء النماذج الذكية بالذكاء الاصطناعي، وتطوير التطبيقات والمنصات المتكاملة التي تلبي أهدافك بدقة.
                        </p>
                        <div className="cta-buttons flex flex-wrap justify-center gap-3 pt-2">
                            <a
                                href="#contact"
                                onClick={() => playClickSound(650, 0.03)}
                                className="btn btn-primary"
                            >
                                <Send className="size-4" />
                                <span>ابدأ محادثتك الآن</span>
                            </a>
                            <a
                                href={`https://wa.me/${(settings.whatsapp_1 || '+967773853853').replace(/\+/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                            >
                                <Phone className="size-4" />
                                <span>محادثة واتساب مباشرة</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* 13. CONTACT SECTION (#contact)                                 */}
            {/* ============================================================== */}
            <section className="contact py-20 md:py-28 relative" id="contact">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="section-title">
                        <span className="subtitle">ابدأ مشروعك الآن</span>
                        <h2 className="heading">
                            تواصل <span>معي مباشرة</span>
                        </h2>
                        <div className="heading-line" />
                    </div>

                    {/* 4 Direct Contact Cards */}
                    <div className="contact-cards-grid">
                        <a
                            href={`https://wa.me/${(settings.whatsapp_1 || '+967773853853').replace(/\+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-info-card tilt-card"
                            style={{ '--accent': '#25D366' } as React.CSSProperties}
                        >
                            <div className="card-glare" />
                            <div className="card-icon">
                                <Phone className="size-6 text-emerald-500" />
                            </div>
                            <h3>واتساب مباشر (1)</h3>
                            <span className="card-value" dir="ltr">{settings.whatsapp_1 || '+967 773 853 853'}</span>
                            <p>مراسلة فورية لمناقشة المشاريع والعمل الحر</p>
                        </a>

                        <a
                            href={`https://wa.me/${(settings.whatsapp_2 || '+967777580845').replace(/\+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-info-card tilt-card"
                            style={{ '--accent': '#128C7E' } as React.CSSProperties}
                        >
                            <div className="card-glare" />
                            <div className="card-icon">
                                <Phone className="size-6 text-teal-600" />
                            </div>
                            <h3>واتساب مباشر (2)</h3>
                            <span className="card-value" dir="ltr">{settings.whatsapp_2 || '+967 777 580 845'}</span>
                            <p>خط التواصل المباشر الثاني</p>
                        </a>

                        <a
                            href={settings.telegram || 'https://t.me/Alshuja_ai'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-info-card tilt-card"
                            style={{ '--accent': '#0088cc' } as React.CSSProperties}
                        >
                            <div className="card-glare" />
                            <div className="card-icon">
                                <Send className="size-6 text-sky-500" />
                            </div>
                            <h3>تيليجرام شخصي</h3>
                            <span className="card-value" dir="ltr">@Alshuja_ai</span>
                            <p>للمحادثات التقنية ومناقشات البرمجة</p>
                        </a>

                        <a
                            href={settings.instagram || 'https://www.instagram.com/alshujaa'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-info-card tilt-card"
                            style={{ '--accent': '#E4405F' } as React.CSSProperties}
                        >
                            <div className="card-glare" />
                            <div className="card-icon">
                                <Sparkles className="size-6 text-rose-500" />
                            </div>
                            <h3>انستغرام شخصي</h3>
                            <span className="card-value" dir="ltr">@alshujaa</span>
                            <p>متابعة التحديثات والأنشطة اليومية</p>
                        </a>
                    </div>

                    {/* Contact Layout Grid (Form + Official Ecosystem) */}
                    <div className="contact-layout-grid mt-14">
                        {/* Interactive Contact Form */}
                        <div className="contact-form-card tilt-card text-right">
                            <div className="card-glare" />
                            <div className="mb-6 space-y-1">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <Send className="size-5 text-primary" />
                                    أرسل رسالتك مباشرة
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    املأ النموذج أدناه وسيقوم عبدالرحمن بالرد عليك في أسرع وقت.
                                </p>
                            </div>

                            {recentlySuccessful && (
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2 mb-4">
                                    <CheckCircle2 className="size-5 shrink-0" />
                                    <span>تم استلام رسالتك بنجاح! سأتواصل معك في أقرب وقت.</span>
                                </div>
                            )}

                            <form onSubmit={submitContact} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        الاسم الكريم *
                                    </label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="أدخل اسمك الكريم"
                                        required
                                        className="rounded-xl border-border/80 text-right"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            البريد الإلكتروني *
                                        </label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@example.com"
                                            required
                                            className="rounded-xl border-border/80 text-right"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-destructive">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            رقم الهاتف / الواتساب
                                        </label>
                                        <Input
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+967..."
                                            className="rounded-xl border-border/80 font-mono"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        نوع المشروع أو الخدمة المطلوبة *
                                    </label>
                                    <select
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                                    >
                                        <option value="data-ai">تحليل بيانات ونماذج ذكاء اصطناعي (Data & AI)</option>
                                        <option value="mobile">تطوير تطبيق هاتف ذكي (Flutter)</option>
                                        <option value="web">تطوير منصة أو موقع ويب (Laravel / Full-Stack)</option>
                                        <option value="consulting">استشارة تقنية أو عمل حر</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        تفاصيل رسالتك أو فكرة مشروعك *
                                    </label>
                                    <Textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="اشرح باختصار متطلبات مشروعك، الميزانية المتوقعة، أو أي تفاصيل ترغب بمشاركتها..."
                                        required
                                        className="rounded-xl border-border/80 text-right"
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-destructive">{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn btn-primary btn-block py-3.5 text-base gap-2 font-bold shadow-md"
                                >
                                    <Send className="size-4" />
                                    <span>{processing ? 'جارٍ إرسال الرسالة...' : 'إرسال الرسالة الآن'}</span>
                                </button>
                            </form>
                        </div>

                        {/* Official Ecosystem Channels Card */}
                        <div className="official-channels-card tilt-card text-right">
                            <div className="card-glare" />
                            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                                <Globe className="size-5 text-primary" />
                                المنصات والقنوات الرسمية
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                                قنوات مبادرة "فكرة مبرمج" ومنصات المنتجات الرقمية:
                            </p>

                            <div className="channels-list">
                                <a
                                    href="https://sinbadd.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link sinbad"
                                >
                                    <div className="channel-icon">
                                        <Layers className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>منصة سندباد — Sinbad Marketplace</strong>
                                        <span>sinbadd.com · التجارة الإلكترونية والمنصات</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>

                                <a
                                    href="https://programmer-idea.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link fikrat"
                                >
                                    <div className="channel-icon">
                                        <GraduationCap className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>أكاديمية ومنصة فكرة مبرمج</strong>
                                        <span>programmer-idea.tech · التعليم البرمجي العربي</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>

                                <a
                                    href="https://rial.cash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link rial"
                                >
                                    <div className="channel-icon">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>محفظة ريال الرقمية — Riyal Wallet</strong>
                                        <span>rial.cash · الدفع والتحويل الإلكتروني</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>

                                <a
                                    href="https://t.me/Programmer_Idea"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link telegram"
                                >
                                    <div className="channel-icon">
                                        <Send className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>قناة فكرة مبرمج على تيليجرام</strong>
                                        <span>@Programmer_Idea · شروحات ومقاطع برمجية</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>

                                <a
                                    href="https://www.youtube.com/@Programmer_idea"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link youtube"
                                >
                                    <div className="channel-icon">
                                        <Zap className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>قناة فكرة مبرمج على يوتيوب</strong>
                                        <span>@Programmer_idea · دروس تطبيقية ومشاريع</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>

                                <a
                                    href="https://www.facebook.com/programmerIdea.com.ye?mibextid=ZbWKwL"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-link facebook"
                                >
                                    <div className="channel-icon">
                                        <Globe className="size-5" />
                                    </div>
                                    <div className="channel-info">
                                        <strong>صفحة فكرة مبرمج على فيسبوك</strong>
                                        <span>مجتمع فكرة مبرمج ومشاركات تقنية</span>
                                    </div>
                                    <ExternalLink className="size-4 text-muted-foreground" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PortfolioLayout>
    );
}
