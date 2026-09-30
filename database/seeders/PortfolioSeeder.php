<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Certificate;
use App\Models\Journey;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Projects Seeding
        $projects = [
            [
                'title' => 'منصة وتطبيق سندباد — Sinbad Marketplace',
                'slug' => 'sinbad',
                'category' => 'platform',
                'category_label' => 'المنصات والتجارة الإلكترونية',
                'brief' => 'منصة تجارة إلكترونية متعددة التجار متكاملة تربط العملاء والتجار ومندوبي التوصيل مع لوحة تحكم وإدارة للمخزون والطلبات.',
                'description' => 'مشروع تجاري وتقني ضخم يهدف لتوفير تجربة تسوق رقمية متكاملة وسلسة. يشمل النظام لوحة تحكم إدارية متقدمة للتجار لإدارة المنتجات والطلبات والمبيعات، وواجهات برمجية RESTful APIs عالية الأداء مبنية بإطار Laravel، وتطبيقات هواتف ذكية عصرية مبنية بـ Flutter لنظامي Android و iOS، مع تتبع حي للشحنات عبر الخرائط ونظام إشعارات فوري.',
                'tags' => ['Laravel', 'Flutter', 'PHP', 'MySQL', 'REST API', 'Maps API'],
                'image' => '/images/project-1.png',
                'gallery' => [
                    '/images/project-1.png',
                    '/images/img1.jpg',
                    '/images/s5.png',
                ],
                'problem' => 'صعوبة إدارة عمليات البيع والشراء المتعددة الأطراف بين المتاجر المحلية ومندوبي التوصيل والزبائن في السوق، بالإضافة إلى بطء التحديثات اللحظية لحالة الطلبات وتتبع السائقين وغياب لوحة مركزية موثوقة لإدارة الفواتير والمخزون.',
                'solution' => 'هندسة معمارية متكاملة تعتمد على Laravel للـ Backend وتوفير RESTful APIs مؤمنة وقابلة للتوسع، مع قاعدة بيانات مصممة للتحمل العالي، وتطبيقات Flutter متجاوبة لكل من الزبون، التاجر، ومندوب التوصيل، مع ربط خدمات الخرائط اللحظية ونظام إشعارات فوري عبر WebSockets و Firebase Cloud Messaging.',
                'features' => [
                    'لوحة تحكم إدارية شاملة للمتاجر لمراقبة المخزون، المبيعات، والفواتير اللحظية',
                    'تطبيق هاتف هجين بـ Flutter فائق السلاسة يدعم الوضعين الداكن والفاتح',
                    'تتبع حي للشحنات ومندوبي التوصيل عبر خرائط تفاعلية دقيقة',
                    'بوابات دفع إلكترونية متعددة مع دعم الدفع عند الاستلام ونظام المحفظة',
                    'نظام إشعارات ذكي وفوري لتنبيه المستخدم بالطلبات وتحديثات الشحن',
                    'نظام تقييمات ومراجعات للمنتجات والتجار لضمان جودة الخدمة',
                ],
                'role' => 'قائد فريق التطوير ومطور واجهات وتطبيقات (Lead Full-Stack & Mobile Developer)',
                'client' => 'شركة سندباد للتجارة والتسويق الإلكتروني',
                'date_range' => '2024 - 2026',
                'live_url' => 'https://sinbadd.com',
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'منصة ومجتمع فكرة مبرمج — Programmer Idea',
                'slug' => 'fikrat',
                'category' => 'platform',
                'category_label' => 'التعليم التقني والمجتمع',
                'brief' => 'منصة تعليمية ومجتمع تقني لنشر وشرح مفاهيم البرمجة وعلوم البيانات والذكاء الاصطناعي باللغة العربية استفاد منها آلاف الطلاب.',
                'description' => 'مبادرة تعليمية رائدة تهدف إلى تطوير المحتوى العلمي والتقني العربي واليمني في مجالات البرمجة وهندسة البرمجيات. تقدم المنصة شروحات معمقة، مقالات تطبيقية، وسلاسل فيديوهات في مسارات Python، الذكاء الاصطناعي، قواعد البيانات، وتطوير التطبيقات عبر قنوات التلجرام، يوتيوب، والموقع الرسمي.',
                'tags' => ['EdTech', 'Community', 'Telegram Channels', 'Python', 'AI Education'],
                'image' => '/images/project-2.jpg',
                'gallery' => [
                    '/images/project-2.jpg',
                    '/images/img2.jpg',
                    '/images/s6.png',
                ],
                'problem' => 'شح المحتوى التقني العربي واليمني التطبيقي والعملي في علوم البيانات والذكاء الاصطناعي وبناء التطبيقات، ووجود فجوة كبيرة بين الدراسة الأكاديمية النظرية ومتطلبات سوق العمل البرمجي الحقيقي.',
                'solution' => 'إنشاء منصة ومجتمع تفاعلي متكامل يضم قنوات برمجية متخصصة وموقعاً رقمياً يقدم مسارات تعليمية عملية، وشروحات تفصيلية لأحدث التقنيات مثل Python، فلاتر، نماذج التعلم الآلي، وأدوات تحليل البيانات، مع جلسات توجيهية ومشاريع تطبيقية مفتوحة المصدر.',
                'features' => [
                    'مسارات تعليمية متسلسلة من الصفر حتى الاحتراف في علوم الحاسوب وبايثون',
                    'شروحات كود عملية وتطبيقات واقعية مفتوحة المصدر على GitHub',
                    'مجتمع نقاشات برمجية تفاعلي يضم أكثر من 10,000 طالب ومطور عربي',
                    'مكتبة مقالات ومراجع تقنية متجددة تشرح الخوارزميات وهندسة البرمجيات',
                    'جلسات إرشاد مهني للطلاب والمبتدئين للمساعدة في دخول سوق العمل',
                ],
                'role' => 'المؤسس ومهندس المنصة وصانع المحتوى التقني',
                'client' => 'مبادرة فكرة مبرمج التعليمية والمجتمع التقني',
                'date_range' => '2023 - مستمر',
                'live_url' => 'https://t.me/Programmer_Idea',
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'محفظة ريال الرقمية — Riyal Wallet',
                'slug' => 'rial',
                'category' => 'mobile',
                'category_label' => 'تطبيقات الهواتف والـ FinTech',
                'brief' => 'تطبيق محفظة مالية رقمية مبني بـ Flutter يوفر تجربة دفع وتحويل إلكتروني آمنة وعصرية تدعم رموز QR والتحويل الفوري.',
                'description' => 'تطبيق خدمات مالية متطور يركز على سهولة الاستخدام وتأمين المعاملات المالية اللحظية. يدعم التطبيق التحويل بين الحسابات برقم الهاتف أو مسح رمز QR Code، إدارة فواتير الخدمات، سجل المعاملات المالية الموثق، مع تشفير للبيانات الحساسة وربط سحابي فوري.',
                'tags' => ['Flutter', 'Dart', 'FinTech', 'Firebase', 'State Management', 'RESTful API'],
                'image' => '/images/project-3.png',
                'gallery' => [
                    '/images/project-3.png',
                    '/images/img3.jpg',
                    '/images/s1.png',
                ],
                'problem' => 'تعقيد المعاملات المالية اليومية وصعوبة التحويل النقدي السريع بين الأفراد والتجار، مع الحاجة الماسة إلى معايير أمان وتشفير فائقة تمنع الاحتيال وتضمن سرعة إتمام الحوالات في أجزاء من الثانية.',
                'solution' => 'بناء وتصميم واجهة مستخدم ناعمة وبسيطة بـ Flutter مع اعتماد بروتوكولات تشفير متطورة للتحقق برمز PIN والبصمة، وربط المحفظة بخوادم آمنة لإجراء العمليات المالية والتحويل التلقائي مع إصدار وصولات رقمية موثقة.',
                'features' => [
                    'تحويل مالي فوري وآمن بين المستخدمين عبر أرقام الهواتف أو معرف الحساب',
                    'دفع سريع لدى المتاجر ونقاط البيع عبر مسح رمز الاستجابة السريع QR Code',
                    'لوحة إحصائية تفاعلية لمتابعة المصروفات والمدخرات وتصنيف المشتريات شهرياً',
                    'حماية فائقة بمصادقة ثنائية ودعم الدخول عبر البصمة الحيوية والتعرف على الوجه',
                    'إمكانية دفع فواتير الخدمات العامة والاشتراكات الشهرية بضغطة زر واحدة',
                ],
                'role' => 'مهندس تطبيقات الموبايل وتجربة المستخدم (Mobile & FinTech Developer)',
                'client' => 'مشروع محفظة ريال التقني',
                'date_range' => '2024',
                'live_url' => null,
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'title' => 'منظومة تحليل بيانات المبيعات ولوحات Power BI الذكية',
                'slug' => 'data-analytics',
                'category' => 'ai-data',
                'category_label' => 'علوم البيانات والذكاء الاصطناعي',
                'brief' => 'مشروع متكامل لمعالجة وتنظيف ملايين السجلات وتحويلها للوحات تحكم تنفيذية تدعم اتخاذ القرارات التنبؤية.',
                'description' => 'مشروع هندسة وتحليل بيانات استراتيجي يهدف إلى معالجة البيانات الخام واستخراج مؤشرات الأداء الرئيسية (KPIs). تم استخدام لغة Python ومكتبات pandas و NumPy في عمليات المعالجة والتنظيف وإعادة الهيكلة، تلاها بناء نماذج لوحات قيادة تفاعلية مذهلة بواسطة Microsoft Power BI مع حساب مقاييس DAX المعقدة.',
                'tags' => ['Python', 'pandas', 'Power BI', 'DAX', 'SQL', 'Data Modeling'],
                'image' => '/images/project-4.png',
                'gallery' => [
                    '/images/project-4.png',
                    '/images/img4.jpg',
                    '/images/s3.png',
                ],
                'problem' => 'تشتت البيانات في مصادر وجداول متفرقة وغير منسقة، واحتواؤها على قيم مفقودة ومكررة حالت دون قدرة الإدارة العليا على استقراء مؤشرات النمو الفعلي أو توقع فترات الركود والطلب الموسمي.',
                'solution' => 'بناء خط معالجة بيانات (ETL Pipeline) باستخدام نصوص بايثون مؤتمتة لتنظيف ومعايرة البيانات، وتخزينها في مستودع بيانات مهيكل، وتطوير تقارير داشبورد ديناميكية بـ Power BI توفر فلاتر لحظية للمناطق والمنتجات ونسب الأرباح وهوامش التكلفة.',
                'features' => [
                    'معالجة وتنظيف أكثر من 500,000 سجل بيع مع معالجة القيم الشاذة والمفقودة آلياً',
                    'لوحة قيادة تفاعلية تنفيذية بـ Power BI تربط المبيعات بالأرباح وتوزع العملاء الجغرافي',
                    'معادلات DAX متقدمة لحساب معدلات النمو السنوي (YoY) ومؤشرات الاحتفاظ بالعملاء',
                    'تحليل تنبؤي دقيق لاتجاهات الشراء وسلوك المستهلكين لدعم اتخاذ القرارات التسويقية',
                    'تصدير تقارير دورية مؤتمتة بصيغة PDF وجداول Excel موجهة لمديري الأقسام',
                ],
                'role' => 'محلل ومطور حلول بيانات (Data Analyst & BI Specialist)',
                'client' => 'قطاع تجاري ومؤسسي',
                'date_range' => '2024 - 2025',
                'live_url' => null,
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => true,
                'order' => 4,
            ],
            [
                'title' => 'متجر الإلكترونيات الذكي متعدد المنصات — Smart Store App',
                'slug' => 'store-app',
                'category' => 'mobile',
                'category_label' => 'تطبيقات الموبايل',
                'brief' => 'تطبيق تجارة إلكترونية عصري بـ Flutter يتضمن تصفح المنتجات، سلة المشتريات، المفضلة، وبوابات الدفع الإلكتروني.',
                'description' => 'تطبيق متكامل للشراء عبر الهاتف يتميز بتصميم عصري مستوحى من أحدث معايير تجربة المستخدم UI/UX، مع إدارة متقدمة لحالة التطبيق (State Management عبر Provider/GetX)، ودعم كامل للغتين العربية والإنجليزية مع الوضع الليلي.',
                'tags' => ['Flutter', 'Dart', 'State Management', 'REST API', 'UI/UX'],
                'image' => '/images/s1.png',
                'gallery' => [
                    '/images/s1.png',
                    '/images/img5.jpg',
                    '/images/project-6.png',
                ],
                'problem' => 'ارتفاع معدلات التخلي عن سلة الشراء في التطبيقات التقليدية بسبب التعقيد في تصفح المنتجات وبطء استجابة واجهات المستخدم وصعوبة خطوات الدفع.',
                'solution' => 'تصميم وتطوير تطبيق موبايل بـ Flutter يعتمد أعلى معايير الـ Micro-interactions والانتقالات الناعمة، مع بنية معمارية منفصلة تفصل واجهات العرض عن معالجة البيانات، وتسهل فرز وتصفية المنتجات مع إمكانية إتمام الشراء في خطوتين فقط.',
                'features' => [
                    'واجهة مستخدم عصرية بتصميم زجاجي وتأثيرات بصرية راقية',
                    'نظام فلترة وبحث ذكي وفوري مع اقتراحات تلقائية للمنتجات',
                    'سلة شراء مرنة مع إمكانية تعديل الكميات وحفظ المنتجات لوقت لاحق',
                    'دعم كامل للغتين العربية والإنجليزية وتغيير الثيم الليلي والنهاري',
                    'تتبع حالة الطلب خطوة بخطوة مع إشعارات دفع مخصصة',
                ],
                'role' => 'مطور تطبيقات فلاتر وتجربة المستخدم (Flutter & UI/UX Specialist)',
                'client' => 'متاجر تجزئة ومشاريع ناشئة',
                'date_range' => '2024 - 2026',
                'live_url' => null,
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => false,
                'order' => 5,
            ],
            [
                'title' => 'نظام إدارة المخازن والفواتير — Inventory Pro',
                'slug' => 'inventory-system',
                'category' => 'web',
                'category_label' => 'تطوير الويب وقواعد البيانات',
                'brief' => 'نظام سحابي متكامل لإدارة المستودعات، حركات الصادر والوارد، الفواتير الضريبية، وتقارير الأرباح.',
                'description' => 'منظومة ويب متكاملة مبنية بـ Laravel و MySQL، تتيح للمؤسسات متابعة الأرصدة المخزنية في مستودعات متعددة، وإصدار فواتير الشراء والبيع، مع تنبيهات عند وصول المواد للحد الأدنى، ونظام صلاحيات للمستخدمين والمحاسبين.',
                'tags' => ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Reports Engine'],
                'image' => '/images/project-6.png',
                'gallery' => [
                    '/images/project-6.png',
                    '/images/img6.jpg',
                    '/images/s2.png',
                ],
                'problem' => 'الأخطاء اليدوية المستمرة في جرد المستودعات المتعددة وضياع الفواتير وعدم وجود تزامن بين المشتريات والمبيعات مما يسبب عجزاً مالياً ومخزنياً غير مبرر.',
                'solution' => 'تطوير منظومة ويب قوية مبنية بـ Laravel ونظام قواعد بيانات علائقية MySQL دقيقة العلاقات والمعاملات (Transactions)، تضمن عدم حدوث أي تضارب، مع نظام صلاحيات دقيق (RBAC) وطباعة فواتير حرارية ورسمية معتمدة وتقارير أرباح وخسائر آلية.',
                'features' => [
                    'إدارة مستودعات وفروع متعددة مع إمكانية التحويل الداخلي بين المخازن',
                    'نظام فوترة إلكتروني فوري يدعم الفواتير الضريبية وطباعة الباركود',
                    'تنبيهات فورية عند وصول كمية أي صنف إلى حد الطلب الأدنى',
                    'نظام صلاحيات متقدم للمحاسبين وأمناء المستودعات ومديري الفروع',
                    'تقارير مالية وجردية دورية تلقائية مع رسوم بيانية توضيحية للأرباح',
                ],
                'role' => 'مهندس Backend وقواعد بيانات (Full-Stack Laravel Developer)',
                'client' => 'شركات توريد وتوزيع تجارية',
                'date_range' => '2023 - 2025',
                'live_url' => null,
                'github_url' => 'https://github.com/alshujaa',
                'is_featured' => false,
                'order' => 6,
            ],
        ];

        foreach ($projects as $item) {
            Project::updateOrCreate(['slug' => $item['slug']], $item);
        }

        // 2. Services Seeding (From ABCD & saher-qaid-portfolio-main)
        $services = [
            [
                'title' => 'تطوير تطبيقات الهاتف المتكاملة',
                'slug' => 'mobile-apps-development',
                'short_description' => 'بناء تطبيقات Flutter عصرية وتجارب مستخدم فائقة السرعة لنظامي Android و iOS.',
                'detailed_description' => 'بناء تطبيقات هواتف ذكية متكاملة باستخدام إطار Flutter ولغة Dart مع ربط كامل بالواجهات الخلفية RESTful APIs وقواعد البيانات السحابية، وإدارة احترافية للحالة وتجربة مستخدم سلسة.',
                'additional_info' => 'دعم التوافق مع أنظمة Android و iOS، إشعارات الدفع FCM، وبوابات الدفع الإلكتروني.',
                'icon' => '/images/s1.png',
                'features' => ['Flutter & Dart', 'RESTful APIs', 'Modern UI/UX', 'Cross-Platform Performance', 'Offline Storage'],
                'technologies' => ['Flutter', 'Dart', 'Android', 'iOS', 'Firebase', 'SQLite'],
                'gallery' => ['/images/project-3.png', '/images/s1.png'],
                'order' => 1,
            ],
            [
                'title' => 'تطوير منصات وتطبيقات الويب',
                'slug' => 'web-development',
                'short_description' => 'تطوير مواقع ومنصات ويب متقدمة وقابلة للتوسع باستخدام Laravel و React و Tailwind.',
                'detailed_description' => 'تصميم وتطوير تطبيقات الويب الحديثة وحلول الـ SaaS ولوحات التحكم الإدارية ذات الأداء العالي والأمان المتين المبنية على Laravel و React و Inertia.js مع معمارية نظيفة وقواعد بيانات سريعة.',
                'additional_info' => 'مواقع متجاوبة 100% مع الهواتف، متوافقة مع محركات البحث SEO، وقابلة للتوسع العالي.',
                'icon' => '/images/s2.png',
                'features' => ['Laravel Backend', 'React & Inertia SPA', 'Tailwind CSS v4', 'RESTful APIs', 'High Scalability'],
                'technologies' => ['Laravel', 'PHP', 'React', 'JavaScript', 'Tailwind CSS', 'MySQL'],
                'gallery' => ['/images/project-1.png', '/images/s2.png'],
                'order' => 2,
            ],
            [
                'title' => 'تحليل البيانات ورؤى الأعمال (BI)',
                'slug' => 'data-analytics',
                'short_description' => 'تنظيف وتحليل البيانات وتحويلها إلى لوحات تحكم تفاعلية ورؤى دقيقة تدعم القرارات.',
                'detailed_description' => 'معالجة وتنظيف البيانات الضخمة باستخدام Python و pandas و SQL، واستخراج مؤشرات الأداء الحيوية، وبناء لوحات بيانات تفاعلية مذهلة عبر Power BI لمساعدة أصحاب الأعمال في اتخاذ قرارات مبنية على الأرقام.',
                'additional_info' => 'تقارير دورية مؤتمتة ومقاييس DAX وحلول استكشافية متقدمة للبيانات.',
                'icon' => '/images/s3.png',
                'features' => ['Data Cleaning & Prep', 'Exploratory Data Analysis', 'Power BI Dashboards', 'DAX Formulas', 'Decision Support'],
                'technologies' => ['Python', 'pandas', 'NumPy', 'Power BI', 'SQL', 'Excel'],
                'gallery' => ['/images/project-4.png', '/images/s3.png'],
                'order' => 3,
            ],
            [
                'title' => 'علوم البيانات والذكاء الاصطناعي (AI)',
                'slug' => 'ai-and-data-science',
                'short_description' => 'استكشاف البيانات وبناء وتدريب نماذج تعلم الآلة (Machine Learning) وتطبيق حلول الـ AI.',
                'detailed_description' => 'بناء وتدريب نماذج التعلم الآلي والذكاء الاصطناعي وتطبيقات التنبؤ والتصنيف ومعالجة اللغات الطبيعية باستخدام scikit-learn و Python مع ربط النماذج بالأنظمة البرمجية الواقعية.',
                'additional_info' => 'حلول تنبؤية وتصنيفية ووكلاء أذكياء AI Agents.',
                'icon' => '/images/s4.png',
                'features' => ['Machine Learning Models', 'Predictive Analytics', 'Pattern Recognition', 'Feature Engineering', 'AI Integration'],
                'technologies' => ['Python', 'scikit-learn', 'Machine Learning', 'Data Modeling', 'Algorithms'],
                'gallery' => ['/images/s4.png', '/images/img5.jpg'],
                'order' => 4,
            ],
            [
                'title' => 'هندسة وبناء المنصات الرقمية المتكاملة',
                'slug' => 'digital-products-platforms',
                'short_description' => 'تحويل الأفكار المبتكرة إلى منتجات رقمية ومنصات تجارة إلكترونية متكاملة من الصفر حتى الإطلاق.',
                'detailed_description' => 'تصميم وبناء البنية التحتية الشاملة للمنصات الرقمية (Marketplaces) تشمل الواجهات الأمامية، الواجهات الخلفية، قواعد البيانات، استضافة الخوادم (VPS)، وتكامل بوابات الدفع الإلكتروني.',
                'additional_info' => 'مواكبة دورة حياة المنتج البرمجي الكاملة (MVP) واختبارات القبول.',
                'icon' => '/images/s5.png',
                'features' => ['End-to-End Architecture', 'E-Commerce Marketplaces', 'Cloud VPS Hosting', 'API Gateway', 'Payment Integration'],
                'technologies' => ['Laravel', 'Flutter', 'React', 'Linux VPS', 'Docker', 'MySQL'],
                'gallery' => ['/images/project-1.png', '/images/s5.png'],
                'order' => 5,
            ],
            [
                'title' => 'المحتوى التقني والتعليم البرمجي العربي',
                'slug' => 'technical-content-education',
                'short_description' => 'إعداد وتقديم محتوى تعليمي وبرمجي احترافي ومسارات تدريبية عبر منصة "فكرة مبرمج".',
                'detailed_description' => 'إعداد شروحات ودروس برمجية متخصصة ومقالات تطبيقية باللغة العربية تهدف إلى تمكين المطورين والطلاب من إتقان علوم الحاسوب ولغات البرمجة وبناء المشاريع الحقيقية.',
                'additional_info' => 'مجتمع تفاعلي يضم آلاف الطلاب والمبرمجين العرب مع مراجع وشروحات مفتوحة المصدر.',
                'icon' => '/images/s6.png',
                'features' => ['Arabic Video Tutorials', 'Open Source Projects', 'Technical Mentorship', 'Curated Roadmaps', 'Interactive Community'],
                'technologies' => ['Programming', 'EdTech', 'Community Management', 'YouTube', 'Telegram'],
                'gallery' => ['/images/project-2.jpg', '/images/s6.png'],
                'order' => 6,
            ],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], $srv);
        }

        // 3. Testimonials Seeding (From ABCD & saher-qaid-portfolio-main)
        $testimonials = [
            [
                'name' => 'فريق إدارة منصة سندباد',
                'role' => 'شركاء المؤسسة',
                'company' => 'Sinbad Marketplace',
                'avatar' => '/images/about-img.png',
                'text' => 'العمل مع عبدالرحمن الشجاع كان نقطة تحول لمنصة سندباد. تميز في هندسة البنية التحتية لـ Laravel وبناء تطبيق Flutter متناسق وسلس جداً، مع التزام عالي بالمواعيد وأداء برمجي استثنائي.',
                'rating' => 5,
                'order' => 1,
            ],
            [
                'name' => 'مجتمع ومتابعي فكرة مبرمج',
                'role' => 'طلاب ومطورو المجتمع العربي',
                'company' => 'Programmer Idea Community',
                'avatar' => '/images/profile-hero.png',
                'text' => 'شروحات عبدالرحمن ومحتواه التعليمي يتميز بالعمق العملي والتبسيط الفائق. ساعدتني مقالاته ومساراته البرمجية في فهم هياكل البيانات وعلوم البيانات والانتقال إلى مشاريع حقيقية بثقة تامة.',
                'rating' => 5,
                'order' => 2,
            ],
            [
                'name' => 'إدارة مشروع محفظة ريال',
                'role' => 'فريق الابتكار الرقمي',
                'company' => 'Riyal Wallet Project',
                'avatar' => '/images/main-img.jpg',
                'text' => 'أظهر عبدالرحمن مهارة فائقة في تصميم وتطوير واجهات وتجربة مستخدم محفظة ريال الرقمية بـ Flutter. حرصه الشديد على الأمان وسرعة الاستجابة جعل التجربة سلسة للغاية وموثوقة.',
                'rating' => 5,
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $tst) {
            Testimonial::updateOrCreate(['name' => $tst['name']], $tst);
        }

        // 4. Skills Seeding
        $skills = [
            ['name' => 'Python (Data & AI)', 'category' => 'data-ai', 'level' => 92, 'color' => '#3776AB', 'icon' => 'python', 'order' => 1],
            ['name' => 'Data Analysis & pandas', 'category' => 'data-ai', 'level' => 90, 'color' => '#E4405F', 'icon' => 'table', 'order' => 2],
            ['name' => 'Machine Learning Models', 'category' => 'data-ai', 'level' => 82, 'color' => '#10B981', 'icon' => 'brain', 'order' => 3],
            ['name' => 'Power BI & Dashboards', 'category' => 'data-ai', 'level' => 85, 'color' => '#F59E0B', 'icon' => 'bar-chart-2', 'order' => 4],
            ['name' => 'Flutter Development', 'category' => 'mobile', 'level' => 85, 'color' => '#02569B', 'icon' => 'smartphone', 'order' => 5],
            ['name' => 'Dart Programming', 'category' => 'mobile', 'level' => 84, 'color' => '#00B4AB', 'icon' => 'code', 'order' => 6],
            ['name' => 'Laravel Framework (PHP)', 'category' => 'programming', 'level' => 86, 'color' => '#FF2D20', 'icon' => 'server', 'order' => 7],
            ['name' => 'C++ & Data Structures', 'category' => 'programming', 'level' => 85, 'color' => '#00599C', 'icon' => 'cpu', 'order' => 8],
            ['name' => 'Modern JavaScript (ES6+)', 'category' => 'programming', 'level' => 82, 'color' => '#F7DF1E', 'icon' => 'code-2', 'order' => 9],
            ['name' => 'HTML5 & CSS3 & UI/UX', 'category' => 'programming', 'level' => 90, 'color' => '#E34F26', 'icon' => 'palette', 'order' => 10],
            ['name' => 'SQL & PostgreSQL / MySQL', 'category' => 'tools', 'level' => 86, 'color' => '#4169E1', 'icon' => 'database', 'order' => 11],
            ['name' => 'Docker Containers', 'category' => 'tools', 'level' => 78, 'color' => '#2496ED', 'icon' => 'box', 'order' => 12],
            ['name' => 'MongoDB (NoSQL)', 'category' => 'tools', 'level' => 76, 'color' => '#47A248', 'icon' => 'hard-drive', 'order' => 13],
            ['name' => 'Redis Cache', 'category' => 'tools', 'level' => 75, 'color' => '#DC382D', 'icon' => 'zap', 'order' => 14],
            ['name' => 'Git & GitHub Workflow', 'category' => 'tools', 'level' => 85, 'color' => '#F05032', 'icon' => 'git-branch', 'order' => 15],
            ['name' => 'Firebase BaaS', 'category' => 'tools', 'level' => 80, 'color' => '#FFCA28', 'icon' => 'flame', 'order' => 16],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(['name' => $skill['name']], $skill);
        }

        // 5. Certificates Seeding (Using authentic local certificate scans img1.jpg - img9.jpg)
        $certificates = [
            [
                'title' => 'Python for Data Science, AI & Development',
                'issuer' => 'IBM / Coursera',
                'date' => '2024',
                'category' => 'data-ai',
                'category_label' => 'علوم البيانات والذكاء الاصطناعي',
                'image' => '/images/img1.jpg',
                'fallback_icon' => 'brain',
                'credential_url' => 'https://coursera.org',
                'description' => 'شهادة تخصصية معتمدة من IBM في لغة Python، شملت معالجة البيانات باستخدام pandas و NumPy والتعامل مع واجهات برمجة التطبيقات (APIs) وتحليل البيانات الإحصائي.',
                'order' => 1,
            ],
            [
                'title' => 'Machine Learning Foundations & Supervised Learning',
                'issuer' => 'Stanford Online / DeepLearning.AI',
                'date' => '2024',
                'category' => 'data-ai',
                'category_label' => 'علوم البيانات والذكاء الاصطناعي',
                'image' => '/images/img2.jpg',
                'fallback_icon' => 'brain',
                'credential_url' => 'https://coursera.org',
                'description' => 'دراسة معمقة لخوارزميات التعلم الخاضع للإشراف (Supervised Learning)، الانحدار الخطي واللوجستي، والشبكات العصبية وكيفية تقييم وتدريب النماذج.',
                'order' => 2,
            ],
            [
                'title' => 'Business Analytics & Data Modeling with Power BI',
                'issuer' => 'Microsoft Certified Partner',
                'date' => '2024',
                'category' => 'data-ai',
                'category_label' => 'علوم البيانات والذكاء الاصطناعي',
                'image' => '/images/img3.jpg',
                'fallback_icon' => 'bar-chart-2',
                'credential_url' => '#',
                'description' => 'إتقان نمذجة البيانات العلائقية داخل Power BI، كتابة معادلات DAX المتقدمة، وبناء تقارير داشبورد تفاعلية ومؤشرات أداء تنفيذية.',
                'order' => 3,
            ],
            [
                'title' => 'The Complete Flutter & Dart Development Bootcamp',
                'issuer' => 'Google Developers & Udemy',
                'date' => '2023',
                'category' => 'mobile',
                'category_label' => 'تطبيقات الهواتف الذكية',
                'image' => '/images/img4.jpg',
                'fallback_icon' => 'smartphone',
                'credential_url' => '#',
                'description' => 'تطوير تطبيقات الهواتف الذكية الهجينة بـ Flutter لنظامي Android و iOS، وإدارة حالة التطبيقات باستخدام Provider و GetX والتكامل مع Firebase و REST APIs.',
                'order' => 4,
            ],
            [
                'title' => 'Advanced Backend Engineering with Laravel & PHP',
                'issuer' => 'Laracasts / Web Certification',
                'date' => '2023',
                'category' => 'web',
                'category_label' => 'تطوير الويب وقواعد البيانات',
                'image' => '/images/img5.jpg',
                'fallback_icon' => 'server',
                'credential_url' => '#',
                'description' => 'إتقان بناء وتأمين واجهات RESTful APIs، هندسة قواعد البيانات MySQL، المعاملات البنكية (Database Transactions)، ونظام المصادقة والصلاحيات المعقد.',
                'order' => 5,
            ],
            [
                'title' => 'Database Design & SQL Mastery',
                'issuer' => 'Oracle Academy / University of Ibb',
                'date' => '2023',
                'category' => 'web',
                'category_label' => 'تطوير الويب وقواعد البيانات',
                'image' => '/images/img6.jpg',
                'fallback_icon' => 'database',
                'credential_url' => '#',
                'description' => 'تصميم قواعد البيانات العلائقية، التطبيع المعياري (Normalization)، كتابة الاستعلامات المعقدة وتحسين الفهارس لرفع سرعة الاستجابة.',
                'order' => 6,
            ],
            [
                'title' => 'Computer Science & Software Engineering Core',
                'issuer' => 'جامعة إب — كلية الحاسوب وتقنية المعلومات',
                'date' => '2022 - 2026',
                'category' => 'academic',
                'category_label' => 'الشهادات الأكاديمية والجامعية',
                'image' => '/images/img7.jpg',
                'fallback_icon' => 'graduation-cap',
                'credential_url' => '#',
                'description' => 'سجل أكاديمي متميز في كلية الحاسوب وتقنية المعلومات بجامعة إب، شملت دراسة هياكل البيانات، الخوارزميات، نظرية الحوسبة، وهندسة البرمجيات.',
                'order' => 7,
            ],
            [
                'title' => 'Object-Oriented Programming (OOP) with C++',
                'issuer' => 'جامعة إب — قسم تقنية المعلومات',
                'date' => '2022',
                'category' => 'academic',
                'category_label' => 'الشهادات الأكاديمية والجامعية',
                'image' => '/images/img8.jpg',
                'fallback_icon' => 'cpu',
                'credential_url' => '#',
                'description' => 'إتقان البرمجة كائنية التوجه (OOP)، الوراثة، تعدد الأشكال (Polymorphism)، إدارة الذاكرة اليدوية، والتعامل مع المؤشرات (Pointers).',
                'order' => 8,
            ],
            [
                'title' => 'Git, GitHub & Collaborative DevOps Workflows',
                'issuer' => 'Coursera Project Network',
                'date' => '2023',
                'category' => 'web',
                'category_label' => 'تطوير الويب وقواعد البيانات',
                'image' => '/images/img9.jpg',
                'fallback_icon' => 'git-branch',
                'credential_url' => '#',
                'description' => 'إدارة النسخ الاحتياطية وإصدارات الأكواد عبر Git، وحل التضاربات، واستخدام GitHub Actions للدمج المستمر والنشر التلقائي CI/CD.',
                'order' => 9,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(['title' => $cert['title']], $cert);
        }

        // 6. Journeys Seeding
        $journeys = [
            [
                'title' => 'طالب في كلية الحاسوب وتقنية المعلومات',
                'role' => 'جامعة إب — المستوى الرابع',
                'date_range' => '2022 - حتى الآن',
                'category' => 'education',
                'category_label' => 'المسيرة الأكاديمية',
                'icon' => 'fas fa-graduation-cap',
                'description' => 'دراسة متعمقة في علوم الحاسوب وتقنية المعلومات، التخصص في معمارية البرمجيات، هياكل البيانات والخوارزميات، ونظم إدارة قواعد البيانات وشبكات الحاسوب.',
                'order' => 1,
            ],
            [
                'title' => 'تأسيس منصة ومبادرة "فكرة مبرمج" (Programmer Idea)',
                'role' => 'المؤسس ومعد المحتوى التقني والتعليمي',
                'date_range' => '2023 - حتى الآن',
                'category' => 'community',
                'category_label' => 'المبادرات والمجتمع',
                'icon' => 'fas fa-lightbulb',
                'description' => 'إطلاق منصة تعليمية وقنوات برمجية عربية متخصصة تهدف إلى نقل المعرفة العملية لآلاف الطلاب والمهتمين بالبرمجة في اليمن والوطن العربي مع مشاريع كود حية.',
                'order' => 2,
            ],
            [
                'title' => 'تطوير وإطلاق منصة وتطبيق سندباد (Sinbad)',
                'role' => 'Lead Full-Stack & Mobile Developer',
                'date_range' => '2024 - 2026',
                'category' => 'work',
                'category_label' => 'المشاريع والعمل الحر',
                'icon' => 'fas fa-store',
                'description' => 'قيادة بناء الجانب التقني لمنصة تجارة إلكترونية متعددة التجار باستخدام Laravel وتطبيقات Flutter متوافقة مع الخرائط وبوابات الدفع الإلكتروني.',
                'order' => 3,
            ],
            [
                'title' => 'بناء محفظة ريال الرقمية (Riyal Wallet)',
                'role' => 'Flutter & FinTech Developer',
                'date_range' => '2024 - حتى الآن',
                'category' => 'work',
                'category_label' => 'المشاريع والعمل الحر',
                'icon' => 'fas fa-wallet',
                'description' => 'ابتكار وتطوير تطبيق محفظة مالية رقمية متطورة للدفع والتحويل الفوري عبر الهواتف، مع التركيز على الأمن السيبراني وسهولة تجربة المستخدم.',
                'order' => 4,
            ],
            [
                'title' => 'التوسع في علوم البيانات وتحليل الأعمال بالذكاء الاصطناعي',
                'role' => 'Data Analyst & AI Engineer',
                'date_range' => '2024 - حتى الآن',
                'category' => 'learning',
                'category_label' => 'التطوير المستمر',
                'icon' => 'fas fa-chart-line',
                'description' => 'تنفيذ مشاريع تحليل بيانات واقعية وبناء لوحات Power BI تفاعلية ودمج نماذج Machine Learning ونماذج الذكاء الاصطناعي في المنظومات البرمجية.',
                'order' => 5,
            ],
        ];

        foreach ($journeys as $j) {
            Journey::updateOrCreate(['title' => $j['title']], $j);
        }

        // 7. Articles Seeding (Using authentic local blog images blog1.jpg - blog6.jpg)
        $articles = [
            [
                'title' => 'دليلك الشامل للدخول في عالم علوم البيانات والذكاء الاصطناعي بـ Python',
                'slug' => 'python-data-science-guide',
                'category' => 'ai-data',
                'category_label' => 'علوم البيانات والذكاء الاصطناعي',
                'reading_time' => '6 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog1.jpg',
                'excerpt' => 'خارطة طريق واضحة ومجربة للطلاب والمبرمجين للانتقال من تعلم أساسيات بايثون إلى بناء مشاريع تحليل بيانات حقيقية وتدريب نماذج التعلم الآلي.',
                'body' => '<p>يعتبر مجال علوم البيانات والذكاء الاصطناعي اليوم من أسرع المجالات نمواً وأكثرها طلباً في سوق العمل التقني الحديث. ولكن بالنسبة للكثير من الطلاب والمبتدئين، يظل السؤال المحير: <strong>من أين أبدأ وكيف أنتقل من النظري إلى العملي؟</strong></p>
                <h3>1. إتقان أساسيات لغة Python:</h3>
                <p>البداية الحقيقية تكون بفهم هياكل البيانات الأساسية في بايثون (Lists, Dictionaries, Sets)، ومفاهيم البرمجة كائنية التوجه (OOP)، وكيفية كتابة كود نظيف وفعال.</p>
                <h3>2. مكتبات معالجة البيانات وتحليلها:</h3>
                <p>بعد الأساسيات، يأتي الدور على الثنائي الذهبي: <strong>NumPy</strong> للتعامل مع المصفوفات والعمليات الرياضية السريعة، و <strong>pandas</strong> لتنظيف وهيكلة الجداول ومعالجة البيانات الواقعية المفقودة.</p>
                <h3>3. استكشاف البيانات بصرياً (Visualization):</h3>
                <p>استخدام مكتبات مثل Matplotlib و Seaborn، أو أدوات مثل Power BI يساعدك على قراءة الأنماط واكتشاف العلاقات الخفية بين المتغيرات قبل الانتقال إلى تدريب النماذج الذكية.</p>',
                'tags' => ['Python', 'Data Science', 'Pandas', 'AI Roadmap', 'Machine Learning'],
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'لماذا يُعد Laravel الخيار الأقوى لبناء الأنظمة والواجهات الخلفية (Backends)؟',
                'slug' => 'laravel-backend-power',
                'category' => 'web',
                'category_label' => 'هندسة الويب والـ Backend',
                'reading_time' => '5 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog2.jpg',
                'excerpt' => 'استعراض معماري للأسباب التي تجعل إطار عمل Laravel مثالياً للمشاريع الكبيرة والمنصات متعددة الأطراف كمنصة سندباد.',
                'body' => '<p>إطار عمل Laravel ليس مجرد إطار PHP عادي؛ بل هو منظومة متكاملة (Ecosystem) تم تصميمها بعناية فائقة لتوفير أفضل تجربة للمطور مع أقصى درجات الأمان والأداء.</p>
                <h3>1. نظام الـ Eloquent ORM:</h3>
                <p>يتيح لك التعامل مع قواعد البيانات المعقدة بكتابة دوال واضحة وقابلة للقراءة بدلاً من استعلامات SQL الطويلة، مع دعم كامل للعلاقات والـ Eager Loading لتفادي مشاكل الأداء N+1.</p>
                <h3>2. المعالجة في الخلفية وقوائم الانتظار (Queues & Jobs):</h3>
                <p>في منصة ضخمة مثل <strong>سندباد</strong>، إرسال الإشعارات ومعالجة الفواتير يتم ترحيله إلى الخلفية عبر Redis Queues حتى لا ينتظر العميل أي تأخير في التطبيق.</p>
                <h3>3. منظومة أمان متكاملة:</h3>
                <p>الحماية الافتراضية ضد هجمات CSRF، والـ SQL Injection، وتشفير كلمات المرور والبيانات الحساسة يجعل Laravel الخيار الموثوق للمؤسسات.</p>',
                'tags' => ['Laravel', 'PHP', 'Backend', 'Software Architecture', 'Web Development'],
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'كيف تصنع لوحات تحكم (Dashboards) تفاعلية بـ Power BI تبهر أصحاب الأعمال؟',
                'slug' => 'power-bi-dashboards',
                'category' => 'ai-data',
                'category_label' => 'ذكاء الأعمال وتحليل البيانات',
                'reading_time' => '7 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog3.jpg',
                'excerpt' => 'أفضل الممارسات في تصميم لوحات معلومات تفاعلية، بدءاً من نمذجة الجداول والارتباطات إلى صياغة مقاييس DAX الحيوية وسرد القصة بالبيانات (Data Storytelling).',
                'body' => '<p>البيانات بدون عرض بصري ذكي تشبه الكتب المغلقة في خزانة مظلمة. القوة الحقيقية لمحلل البيانات تكمن في قدرته على سرد قصة واضحة وسريعة القراءة للمديرين التنفيذيين.</p>
                <h3>1. نموذج البيانات النجمي (Star Schema):</h3>
                <p>تصميم الجداول وربط جدول الحقائق (Fact Table) بجداول الأبعاد (Dimension Tables) بعلاقات One-to-Many هو الأساس الذي يمنع بطء التصفية ويسهل الحسابات التراكمية.</p>
                <h3>2. احتراف مقاييس DAX:</h3>
                <p>استخدام دوال مثل CALCULATE و FILTER و DATESYTD يمنح لوحة التحكم مرونة لحساب مقارنات النمو مع الشهور والأعوام السابقة ديناميكياً عند اختيار أي شهر أو فرع.</p>
                <h3>3. البساطة والتسلسل البصري:</h3>
                <p>تجنب تكديس الرسوم البيانية؛ ضع بطاقات الأرقام الكبرى (KPIs) في الأعلى، تليها المخططات الزمنية، ثم التفاصيل الجغرافية ومخططات المقارنة.</p>',
                'tags' => ['Power BI', 'DAX', 'Data Visualization', 'Business Intelligence', 'Analytics'],
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'الذكاء الاصطناعي التوليدي والوكلاء الأذكياء (AI Agents): مستقبل البرمجة',
                'slug' => 'ai-agents-future',
                'category' => 'ai-data',
                'category_label' => 'الذكاء الاصطناعي والتقنيات الحديثة',
                'reading_time' => '4 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog4.jpg',
                'excerpt' => 'نظرة تحليلية عن النماذج اللغوية الكبيرة LLMs، وبناء الوكلاء الأذكياء (AI Agents)، وهندسة الأوامر المتقدمة للمبرمجين.',
                'body' => '<p>يشهد العالم ثورة متسارعة مع ظهور نماذج اللغة الكبيرة (LLMs) والذكاء الاصطناعي التوليدي. بالنسبة لنا كمطورين ومهندسي برمجيات، لم يعد الذكاء الاصطناعي مجرد رفاهية بل أصبح أداة أساسية في صلب دورة حياة البرمجيات.</p>
                <h3>1. ما وراء المحادثة: بناء الوكلاء الأذكياء (AI Agents):</h3>
                <p>الخطوة القادمة في الذكاء الاصطناعي تتجاوز مجرد طرح سؤال وتلقي جواب؛ بل بناء وكلاء برمجية مستقلة قادرة على التخطيط، واستدعاء واجهات الـ APIs، والبحث في قواعد البيانات، وإجراء عمليات برمجية معقدة بالنيابة عن المستخدم.</p>
                <h3>2. هندسة الأوامر (Prompt Engineering) كمهارة أساسية:</h3>
                <p>مع تطور النماذج، أصبحت صياغة الأوامر بدقة وتقديم السياق المناسب والتعليمات المنطقية (Chain of Thought) من أهم المهارات التي ترفع من جودة ودقة المخرجات البرمجية والتحليلية.</p>',
                'tags' => ['AI', 'LLM', 'AI Agents', 'Prompt Engineering', 'Python'],
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'أسرار بناء تطبيقات Flutter احترافية وقابلة للتوسع',
                'slug' => 'flutter-secrets',
                'category' => 'mobile',
                'category_label' => 'تطبيقات الهواتف الذكية',
                'reading_time' => '5 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog5.jpg',
                'excerpt' => 'أهم المعايير في إدارة حالة التطبيق (State Management عبر Provider/GetX)، معمارية الكود النظيف، وربط الـ APIs بسلاسة لتجربة مستخدم فائقة السرعة.',
                'body' => '<p>تعتبر فلاتر (Flutter) اليوم الخيار الأمثل لبناء تطبيقات الموبايل الهجينة ذات الأداء العالي والرسوميات السلسة لنظامي Android و iOS بنفس القاعدة البرمجية.</p>
                <h3>1. معمارية الكود النظيف (Clean Architecture):</h3>
                <p>فصل منطق الأعمال (Business Logic) عن واجهات المستخدم (UI Widgets) وطبقة البيانات (Data Layer) يضمن سهولة الصيانة والتوسع وقابلية الاختبار الآلي للأكواد.</p>
                <h3>2. إدارة الحالة الاحترافية (State Management):</h3>
                <p>سواء كنت تستخدم Provider أو Bloc أو GetX، فإن فهم دورة حياة الـ Widgets وتفادي إعادة رسم الشاشات دون داعٍ يرفع من سلاسة تجربة المستخدم بنسبة 60 FPS كاملة.</p>
                <h3>3. الاتصال الذكي بواجهات الـ APIs:</h3>
                <p>تنظيم استدعاءات الشبكة مع التخزين المؤقت في الذاكرة (Caching) ومعالجة حالات انقطاع الإنترنت يمنح التطبيق طابعاً احترافياً وموثوقية عالية لدى المستخدمين.</p>',
                'tags' => ['Flutter', 'Dart', 'Mobile Dev', 'Clean Architecture'],
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'من الفكرة المجردة إلى أول إطلاق: كيف تبني MVP ناجحاً؟',
                'slug' => 'products',
                'category' => 'startups',
                'category_label' => 'إدارة المنتجات والشركات الناشئة',
                'reading_time' => '4 دقائق قراءة',
                'author' => 'عبدالرحمن عادل الشجاع',
                'date' => '2026',
                'image' => '/images/blog6.jpg',
                'excerpt' => 'تجارب واقعية مستفادة من بناء منصة سندباد ومحفظة ريال حول تحديد المشكلة المحورية، هندسة الحل السريع، واختبار المنتج مع المستخدمين الأوائل.',
                'body' => '<p>الكثير من المبرمجين يقعون في فخ "بناء المنتج المثالي" وقضاء شهور طويلة في إضافة خصائص قد لا يحتاجها أحد. النهج الصحيح في المنتجات الرقمية الحديثة يبدأ من بناء النموذج الأولي القابل للتطبيق (Minimum Viable Product - MVP).</p>
                <h3>1. حدد المشكلة الأساسية بوضوح:</h3>
                <p>ما هي المشكلة الوحيدة التي يعالجها منتجك بشكل أفضل من غيره؟ في مشروعنا مثل منصة <strong>سندباد</strong>، كان التركيز على حل مشكلة ربط التاجر المحلي بالمشتري وتسهيل استلام الطلبات بأبسط واجهة ممكنة.</p>
                <h3>2. اختيار التقنيات السريعة والمستقرة:</h3>
                <p>استخدام أدوات قوية وسريعة التطوير مثل <strong>Flutter</strong> لتطوير تطبيق الهاتف لكلا النظامين بكود واحد، و <strong>Laravel</strong> لتوفير Backend متين، يختصر وقت الإطلاق ويسمح بالتركيز على تجربة المستخدم.</p>',
                'tags' => ['MVP', 'Startups', 'Product Management', 'Laravel', 'Flutter'],
                'is_published' => true,
                'published_at' => now(),
            ],
        ];

        foreach ($articles as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }

        // 8. Profile Settings Seeding
        $settings = [
            'name' => 'عبدالرحمن عادل الشجاع',
            'name_en' => 'Abdulrahman Adel Alshujaa',
            'role_title' => 'Computer Science & IT · Data & AI · Software Development',
            'status_badge' => 'متاح للعمل الحر وتطوير المشاريع البرمجية',
            'hero_desc' => 'طالب علوم حاسوب وتقنية معلومات بجامعة إب، مبرمج ومؤسس منصة فكرة مبرمج. شغوف بعلوم البيانات والذكاء الاصطناعي، وتطوير منصات الويب والموبايل، وأعمل على تحويل الأفكار إلى منتجات رقمية متكاملة وقابلة للتوسع ذات أثر حقيقي.',
            'about_lead' => 'أنا عبدالرحمن عادل الشجاع، طالب في جامعة إب بكلية الحاسوب وتقنية المعلومات (المستوى الرابع). أؤمن بأن التقنية والبيانات هما القوة المحركة لصناعة التغيير، ولذلك كرست وقتي لتعلم وتطبيق أحدث مهارات علم البيانات، ونماذج الذكاء الاصطناعي، وهندسة البرمجيات.',
            'about_bio' => 'أسست منصة ومبادرة "فكرة مبرمج" (Programmer Idea) لتبسيط علوم البرمجة والذكاء الاصطناعي وإثراء المحتوى التقني العربي واليمني، كما شاركت في بناء وتطوير مشاريع حقيقية وناجحة كمنصة "سندباد" (Sinbad) للتجارة الإلكترونية وتطبيق "محفظة ريال" (Riyal Wallet).',
            'hero_image' => '/images/profile-hero.png',
            'main_image' => '/images/main-img.jpg',
            'about_image' => '/images/about-img.png',
            'whatsapp_1' => '+967773853853',
            'whatsapp_2' => '+967777580845',
            'telegram' => 'https://t.me/Alshuja_ai',
            'telegram_channel' => 'https://t.me/Programmer_Idea',
            'youtube' => 'https://www.youtube.com/@Programmer_idea',
            'instagram' => 'https://www.instagram.com/programmer_idea1',
            'github' => 'https://github.com/alshujaa',
            'linkedin' => 'https://www.linkedin.com/in/alshujaa',
            'email' => 'Abdulrahman_Alshujaa@gmail.com',
            'cv_url' => '/cv',
            'cv_pdf' => '/assets/cvs/TamZyn CV.pdf',
            'experience_years' => '3',
            'completed_projects' => '15+',
            'happy_clients' => '100+',
            'community_members' => '10K+',
        ];

        foreach ($settings as $key => $value) {
            ProfileSetting::setValue($key, $value);
        }
    }
}
