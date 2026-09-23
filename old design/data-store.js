/**
 * ===================================================================
 * DataStore - Centralized Portfolio Dynamic Data Management
 * Handles persistent storage for Projects, Certificates, and Skills
 * Supports localStorage persistence, Export/Import, and seed defaults
 * ===================================================================
 */

const DataStore = (() => {
  const STORAGE_KEY = 'alshujaa_portfolio_data_v1';

  // Seed default data reflecting Abdulrahman Adel Alshujaa's real accomplishments
  const defaultData = {
    projects: [
      {
        id: 'sinbad',
        title: 'منصة وتطبيق سندباد — Sinbad Marketplace',
        category: 'platform',
        categoryLabel: 'المنصات والتجارة الإلكترونية',
        brief: 'منصة تجارة إلكترونية متعددة التجار متكاملة تربط العملاء والتجار ومندوبي التوصيل مع لوحة تحكم وإدارة للمخزون والطلبات.',
        description: 'مشروع تجاري وتقني ضخم يهدف لتوفير تجربة تسوق رقمية متكاملة وسلسة. يشمل النظام لوحة تحكم إدارية متقدمة للتجار لإدارة المنتجات والطلبات والمبيعات، وواجهات برمجية RESTful APIs عالية الأداء مبنية بإطار Laravel، وتطبيقات هواتف ذكية عصرية مبنية بـ Flutter لنظامي Android و iOS، مع تتبع حي للشحنات عبر الخرائط ونظام إشعارات فوري.',
        tags: ['Laravel', 'Flutter', 'PHP', 'MySQL', 'REST API', 'Maps API'],
        image: 'images/project-1.png',
        date: '2024 - 2025',
        liveUrl: 'https://sinbadd.com',
        githubUrl: '#',
        featured: true
      },
      {
        id: 'fikrat',
        title: 'منصة ومجتمع فكرة مبرمج — Programmer Idea',
        category: 'platform',
        categoryLabel: 'التعليم التقني والمجتمع',
        brief: 'منصة تعليمية ومجتمع تقني لنشر وشرح مفاهيم البرمجة وعلوم البيانات والذكاء الاصطناعي باللغة العربية استفاد منها آلاف الطلاب.',
        description: 'مبادرة تعليمية رائدة تهدف إلى تطوير المحتوى العلمي والتقني العربي واليمني في مجالات البرمجة وهندسة البرمجيات. تقدم المنصة شروحات معمقة، مقالات تطبيقية، وسلاسل فيديوهات في مسارات Python، الذكاء الاصطناعي، قواعد البيانات، وتطوير التطبيقات عبر قنوات التلجرام، يوتيوب، والموقع الرسمي.',
        tags: ['EdTech', 'Community', 'Telegram Channels', 'Python', 'AI Education'],
        image: 'images/project-2.jpg',
        date: '2023 - مستمر',
        liveUrl: 'https://programmer-idea.tech',
        githubUrl: '#',
        featured: true
      },
      {
        id: 'rial',
        title: 'محفظة ريال الرقمية — Riyal Wallet',
        category: 'mobile',
        categoryLabel: 'تطبيقات الهواتف والـ FinTech',
        brief: 'تطبيق محفظة مالية رقمية مبني بـ Flutter يوفر تجربة دفع وتحويل إلكتروني آمنة وعصرية تدعم رموز QR والتحويل الفوري.',
        description: 'تطبيق خدمات مالية متطور يركز على سهولة الاستخدام وتأمين المعاملات المالية اللحظية. يدعم التطبيق التحويل بين الحسابات برقم الهاتف أو مسح رمز QR Code، إدارة فواتير الخدمات، سجل المعاملات المالية الموثق، مع تشفير للبيانات الحساسة وربط سحابي فوري.',
        tags: ['Flutter', 'Dart', 'FinTech', 'Firebase', 'State Management', 'RESTful API'],
        image: 'images/project-3.png',
        date: '2024',
        liveUrl: 'https://rial.cash',
        githubUrl: '#',
        featured: true
      },
      {
        id: 'sales-ai',
        title: 'نظام تحليل المبيعات والتنبؤ بالطلب — Sales AI Analytics',
        category: 'ai-data',
        categoryLabel: 'الذكاء الاصطناعي وعلم البيانات',
        brief: 'لوحة تحكم ذكية ونماذج تعلم آلي بلغة Python لتحليل بيانات سلاسل التوريد والتنبؤ بحجم المبيعات المستقبلية.',
        description: 'مشروع تحليلي متكامل قام فيه عبدالرحمن بتطبيق خوارزميات التعلم الآلي (Regression & Time-Series Models) على بيانات مبيعات ضخمة لاكتشاف الأنماط الموسمية، والتنبؤ باحتياجات المخزون، مع لوحة مؤشرات تفاعلية بـ Power BI لتسهيل اتخاذ القرارات لمديري المبيعات.',
        tags: ['Python', 'pandas', 'NumPy', 'Scikit-Learn', 'Power BI', 'Time Series'],
        image: 'images/project-4.png',
        date: '2024',
        liveUrl: '#',
        githubUrl: 'https://github.com/alshujaa',
        featured: false
      },
      {
        id: 'store-app',
        title: 'تطبيق المتجر الإلكتروني الذكي — Smart E-Store App',
        category: 'mobile',
        categoryLabel: 'تطبيقات الموبايل',
        brief: 'تطبيق تجارة إلكترونية عصري بـ Flutter يتضمن تصفح المنتجات، سلة المشتريات، المفضلة، وبوابات الدفع الإلكتروني.',
        description: 'تطبيق متكامل للشراء عبر الهاتف يتميز بتصميم عصري مستوحى من أحدث معايير تجربة المستخدم UI/UX، مع إدارة متقدمة لحالة التطبيق (State Management عبر Provider/GetX)، ودعم كامل للغتين العربية والإنجليزية مع الوضع الليلي.',
        tags: ['Flutter', 'Dart', 'State Management', 'REST API', 'UI/UX'],
        image: 'images/project-6.png',
        date: '2024',
        liveUrl: '#',
        githubUrl: 'https://github.com/alshujaa',
        featured: false
      },
      {
        id: 'inventory-system',
        title: 'نظام إدارة المخازن والفواتير — Inventory Pro',
        category: 'web',
        categoryLabel: 'تطوير الويب وقواعد البيانات',
        brief: 'نظام سحابي متكامل لإدارة المستودعات، حركات الصادر والوارد، الفواتير الضريبية، وتقارير الأرباح.',
        description: 'منظومة ويب متكاملة مبنية بـ Laravel و MySQL، تتيح للمؤسسات متابعة الأرصدة المخزنية في مستودعات متعددة، وإصدار فواتير الشراء والبيع، مع تنبيهات عند وصول المواد للحد الأدنى، ونظام صلاحيات للمستخدمين والمحاسبين.',
        tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Reports Engine'],
        image: 'images/project-3.png',
        date: '2023',
        liveUrl: '#',
        githubUrl: 'https://github.com/alshujaa',
        featured: false
      }
    ],

    certificates: [
      {
        id: 'cert-1',
        title: 'Python for Data Science, AI & Development',
        issuer: 'IBM / Coursera',
        date: '2024',
        category: 'data-ai',
        categoryLabel: 'علوم البيانات والذكاء الاصطناعي',
        image: 'images/project-1.png',
        fallbackIcon: 'fab fa-python',
        credentialUrl: 'https://coursera.org',
        description: 'شهادة احترافية معتمدة في برمجة Python المتقدمة، معالجة البيانات الضخمة بمكتبات pandas و NumPy، واستدعاء واجهات الذكاء الاصطناعي.'
      },
      {
        id: 'cert-2',
        title: 'تكريم التميز الأكاديمي — كلية الحاسوب وتقنية المعلومات',
        issuer: 'جامعة إب (Ibb University)',
        date: '2024',
        category: 'academic',
        categoryLabel: 'التكريمات الأكاديمية والجامعية',
        image: 'images/project-2.jpg',
        fallbackIcon: 'fas fa-graduation-cap',
        credentialUrl: '#',
        description: 'تكريم رسمي من رئاسة قسم علوم الحاسوب وتقنية المعلومات بجامعة إب تقديراً للتفوق الأكاديمي والمبادرات التقنية الطلابية.'
      },
      {
        id: 'cert-3',
        title: 'Machine Learning Models & Data Analytics',
        issuer: 'DeepLearning.AI',
        date: '2024',
        category: 'data-ai',
        categoryLabel: 'تعلم الآلة والنماذج التنبؤية',
        image: 'images/project-4.png',
        fallbackIcon: 'fas fa-brain',
        credentialUrl: 'https://coursera.org',
        description: 'بناء وتدريب وتقييم نماذج التعلم الآلي الخطي والتصنيفي والتجميعي، وتطبيقها على مجموعات بيانات واقعية.'
      },
      {
        id: 'cert-4',
        title: 'Power BI Data Analyst Associate',
        issuer: 'Microsoft Certified Partner',
        date: '2023',
        category: 'data-ai',
        categoryLabel: 'ذكاء الأعمال وتحليل البيانات',
        image: 'images/project-3.png',
        fallbackIcon: 'fas fa-chart-line',
        credentialUrl: '#',
        description: 'إتقان نمذجة البيانات، دوال DAX المتقدمة، وبناء لوحات المؤشرات التفاعلية وربط مصادر البيانات المتعددة.'
      },
      {
        id: 'cert-5',
        title: 'Flutter & Dart Mobile App Development',
        issuer: 'Udemy Certified Academy',
        date: '2023',
        category: 'mobile',
        categoryLabel: 'تطوير تطبيقات الهواتف',
        image: 'images/project-6.png',
        fallbackIcon: 'fas fa-mobile-alt',
        credentialUrl: '#',
        description: 'بناء تطبيقات متكاملة لنظامي Android و iOS باستخدام Flutter و Dart مع معمارية Clean Code وربط APIs.'
      },
      {
        id: 'cert-6',
        title: 'Full-Stack Web Development with Laravel & MySQL',
        issuer: 'Tech Horizons Academy',
        date: '2023',
        category: 'web',
        categoryLabel: 'تطوير الويب وقواعد البيانات',
        image: 'images/about-img.png',
        fallbackIcon: 'fab fa-laravel',
        credentialUrl: '#',
        description: 'هندسة الأنظمة الخلفية وإدارة قواعد البيانات وتأمين جلسات المستخدمين وبناء أنظمة الـ APIs المتكاملة.'
      }
    ],

    skills: [
      { id: 's-1', name: 'Python (Data & AI)', category: 'data-ai', level: 92, color: '#3776AB', icon: 'assets/logos/python-mono.svg' },
      { id: 's-2', name: 'Data Analysis & pandas', category: 'data-ai', level: 90, color: '#E4405F', icon: 'assets/logos/python-mono.svg' },
      { id: 's-3', name: 'Machine Learning Models', category: 'data-ai', level: 82, color: '#10B981', icon: 'assets/logos/mistral-ai-mono.svg' },
      { id: 's-4', name: 'Power BI & Dashboards', category: 'data-ai', level: 85, color: '#F59E0B', icon: '' },
      { id: 's-5', name: 'Flutter Development', category: 'mobile', level: 85, color: '#02569B', icon: '' },
      { id: 's-6', name: 'Dart Programming', category: 'mobile', level: 84, color: '#00B4AB', icon: '' },
      { id: 's-7', name: 'Laravel Framework (PHP)', category: 'programming', level: 82, color: '#FF2D20', icon: '' },
      { id: 's-8', name: 'C++ & Data Structures', category: 'programming', level: 85, color: '#00599C', icon: '' },
      { id: 's-9', name: 'Modern JavaScript (ES6+)', category: 'programming', level: 80, color: '#F7DF1E', icon: 'assets/logos/javascript-mono.svg' },
      { id: 's-10', name: 'HTML5 & CSS3 & UI/UX', category: 'programming', level: 90, color: '#E34F26', icon: '' },
      { id: 's-11', name: 'SQL & PostgreSQL / MySQL', category: 'tools', level: 86, color: '#4169E1', icon: 'assets/logos/postgresql-mono.svg' },
      { id: 's-12', name: 'Docker Containers', category: 'tools', level: 78, color: '#2496ED', icon: 'assets/logos/docker-mono.svg' },
      { id: 's-13', name: 'MongoDB (NoSQL)', category: 'tools', level: 76, color: '#47A248', icon: 'assets/logos/mongodb-mono.svg' },
      { id: 's-14', name: 'Redis Cache', category: 'tools', level: 75, color: '#DC382D', icon: 'assets/logos/redis-mono.svg' },
      { id: 's-15', name: 'Git & GitHub Workflow', category: 'tools', level: 85, color: '#F05032', icon: '' },
      { id: 's-16', name: 'Firebase BaaS', category: 'tools', level: 80, color: '#FFCA28', icon: 'assets/logos/firebase-mono.svg' }
    ],

    journey: [
      {
        id: 'j-1',
        title: 'تطوير منصة سندباد ومحفظة ريال الرقمية',
        role: 'Full-Stack & Flutter Mobile Developer',
        date: '2024 - 2025',
        category: 'work',
        categoryLabel: 'خبرة ومشاريع كبرى',
        icon: 'fas fa-rocket',
        description: 'المشاركة في هندسة المنصة متعددة التجار "سندباد" (Laravel & Flutter) وتطوير تطبيق "محفظة ريال" للخدمات المالية الرقمية وتطبيق نماذج التنبؤ الذكية بالمبيعات.'
      },
      {
        id: 'j-2',
        title: 'التخصص في علوم البيانات والذكاء الاصطناعي التوليدي',
        role: 'Data Science & Machine Learning Enthusiast',
        date: '2023 - 2024',
        category: 'learning',
        categoryLabel: 'تعلّم وتخصص',
        icon: 'fas fa-brain',
        description: 'إنجاز معسكرات وشهادات معتمدة في مكتبات بايثون (pandas, NumPy, Scikit-Learn)، وبناء لوحات المؤشرات بـ Power BI، ودراسة نماذج LLMs.'
      },
      {
        id: 'j-3',
        title: 'تأسيس مبادرة "فكرة مبرمج" (Programmer Idea)',
        role: 'Founder & Tech Community Lead',
        date: '2023 - مستمر',
        category: 'community',
        categoryLabel: 'مبادرة ومجتمع',
        icon: 'fas fa-lightbulb',
        description: 'إطلاق قنوات ومنصة فكرة مبرمج لتعليم البرمجة وتبسيط العلوم التقنية باللغة العربية، وتقديم شروحات عملية في مسارات بايثون وفلاتر وهندسة البرمجيات.'
      },
      {
        id: 'j-4',
        title: 'دراسة علوم الحاسوب وتقنية المعلومات — جامعة إب',
        role: 'المستوى الرابع (بكالوريوس تقنية معلومات)',
        date: '2021 - الآن',
        category: 'education',
        categoryLabel: 'تعليم أكاديمي',
        icon: 'fas fa-graduation-cap',
        description: 'دراسة متعمقة في هياكل البيانات، الخوارزميات، البرمجة كائنية التوجه OOP بـ C++، قواعد البيانات العلائقية، وهندسة البرمجيات مع التكريم الأكاديمي.'
      }
    ],

    articles: [
      {
        id: 'data-science',
        title: 'دليل المبرمج للبدء في علم البيانات وتحليلها بلغة بايثون',
        category: 'data-ai',
        categoryLabel: 'علوم البيانات والذكاء الاصطناعي',
        date: '2024',
        readingTime: '5 دقائق قراءة',
        author: 'عبدالرحمن عادل الشجاع',
        image: 'images/blog2.jpg',
        excerpt: 'خارطة طريق مبسطة لفهم مكتبات pandas و NumPy و Matplotlib وكيفية تحويل الأرقام الخام إلى رؤى وقرارات استراتيجية تنطق بالبيانات.',
        body: `<p>تعد لغة بايثون (Python) اليوم الخيار الأول عالمياً في مجالات علم البيانات، تحليل البيانات، وتعلم الآلة. لكن ما الذي يحتاجه المبرمج للانتقال من البرمجة التقليدية إلى التفكير المبني على البيانات؟</p>
        <h4>1. مكتبات الأساس الرياضي والإحصائي:</h4>
        <p>البداية تكون بفهم مكتبة <strong>NumPy</strong> التي توفر مصفوفات رقمية عالية الأداء وعمليات جبر خطي سريعة، تليها مكتبة <strong>pandas</strong> التي تمثل العمود الفقري للتعامل مع البيانات الجدولية من خلال هياكل البيانات الشهيرة (DataFrames).</p>
        <h4>2. استكشاف وتنظيف البيانات (Data Cleaning):</h4>
        <p>يقضي عالم البيانات أكثر من 70% من وقته في معالجة البيانات غير المتناسقة، والتعامل مع القيم المفقودة (Missing Values) والبيانات الشاذة (Outliers). استخدام بايثون يسمح بأتمتة هذه العمليات بدقة متناهية.</p>
        <h4>3. التمثيل البياني وتوصيل القصة (Data Storytelling):</h4>
        <p>لا فائدة من تحليل دقيق دون قدرة على عرضه بوضوح لصناع القرار. هنا يأتي دور مكتبات مثل <strong>Matplotlib</strong> و <strong>Seaborn</strong> بالإضافة إلى أدوات الـ BI مثل <strong>Power BI</strong> لتحويل الأرقام الصامتة إلى لوحات معلومات تفاعلية تنطق بالرؤى وتساعد في نمو الأعمال.</p>`
      },
      {
        id: 'ai-ml',
        title: 'مستقبل الذكاء الاصطناعي التوليدي وتطبيقاته للمطورين',
        category: 'data-ai',
        categoryLabel: 'الذكاء الاصطناعي وتعلم الآلة',
        date: '2024',
        readingTime: '6 دقائق قراءة',
        author: 'عبدالرحمن عادل الشجاع',
        image: 'images/blog3.jpg',
        excerpt: 'نظرة تحليلية عن النماذج اللغوية الكبيرة LLMs، وبناء الوكلاء الأذكياء (AI Agents)، وهندسة الأوامر المتقدمة للمبرمجين.',
        body: `<p>يشهد العالم ثورة متسارعة مع ظهور نماذج اللغة الكبيرة (LLMs) والذكاء الاصطناعي التوليدي. بالنسبة لنا كمطورين ومهندسي برمجيات، لم يعد الذكاء الاصطناعي مجرد رفاهية بل أصبح أداة أساسية في صلب دورة حياة البرمجيات.</p>
        <h4>1. ما وراء المحادثة: بناء الوكلاء الأذكياء (AI Agents):</h4>
        <p>الخطوة القادمة في الذكاء الاصطناعي تتجاوز مجرد طرح سؤال وتلقي جواب؛ بل بناء وكلاء برمجية مستقلة قادرة على التخطيط، واستدعاء واجهات الـ APIs، والبحث في قواعد البيانات، وإجراء عمليات برمجية معقدة بالنيابة عن المستخدم.</p>
        <h4>2. هندسة الأوامر (Prompt Engineering) كمهارة أساسية:</h4>
        <p>مع تطور النماذج، أصبحت صياغة الأوامر بدقة وتقديم السياق المناسب والتعليمات المنطقية (Chain of Thought) من أهم المهارات التي ترفع من جودة ودقة المخرجات البرمجية والتحليلية.</p>`
      },
      {
        id: 'flutter-secrets',
        title: 'أسرار بناء تطبيقات Flutter احترافية وقابلة للتوسع',
        category: 'mobile',
        categoryLabel: 'تطبيقات الهواتف الذكية',
        date: '2024',
        readingTime: '5 دقائق قراءة',
        author: 'عبدالرحمن عادل الشجاع',
        image: 'images/blog1.jpg',
        excerpt: 'أهم المعايير في إدارة حالة التطبيق (State Management عبر Provider/GetX)، معمارية الكود النظيف، وربط الـ APIs بسلاسة لتجربة مستخدم فائقة السرعة.',
        body: `<p>تعتبر فلاتر (Flutter) اليوم الخيار الأمثل لبناء تطبيقات الموبايل الهجينة ذات الأداء العالي والرسوميات السلسة لنظامي Android و iOS بنفس القاعدة البرمجية.</p>
        <h4>1. معمارية الكود النظيف (Clean Architecture):</h4>
        <p>فصل منطق الأعمال (Business Logic) عن واجهات المستخدم (UI Widgets) وطبقة البيانات (Data Layer) يضمن سهولة الصيانة والتوسع وقابلية الاختبار الآلي للأكواد.</p>
        <h4>2. إدارة الحالة الاحترافية (State Management):</h4>
        <p>سواء كنت تستخدم Provider أو Bloc أو GetX، فإن فهم دورة حياة الـ Widgets وتفادي إعادة رسم الشاشات دون داعٍ يرفع من سلاسة تجربة المستخدم بنسبة 60 FPS كاملة.</p>
        <h4>3. الاتصال الذكي بواجهات الـ APIs:</h4>
        <p>تنظيم استدعاءات الشبكة مع التخزين المؤقت في الذاكرة (Caching) ومعالجة حالات انقطاع الإنترنت يمنح التطبيق طابعاً احترافياً وموثوقية عالية لدى المستخدمين.</p>`
      },
      {
        id: 'products',
        title: 'من الفكرة المجردة إلى أول إطلاق: كيف تبني MVP ناجحاً؟',
        category: 'startups',
        categoryLabel: 'إدارة المنتجات والشركات الناشئة',
        date: '2025',
        readingTime: '4 دقائق قراءة',
        author: 'عبدالرحمن عادل الشجاع',
        image: 'images/project-1.png',
        excerpt: 'تجارب واقعية مستفادة من بناء منصة سندباد ومحفظة ريال حول تحديد المشكلة المحورية، هندسة الحل السريع، واختبار المنتج مع المستخدمين الأوائل.',
        body: `<p>الكثير من المبرمجين يقعون في فخ "بناء المنتج المثالي" وقضاء شهور طويلة في إضافة خصائص قد لا يحتاجها أحد. النهج الصحيح في المنتجات الرقمية الحديثة يبدأ من بناء النموذج الأولي القابل للتطبيق (Minimum Viable Product - MVP).</p>
        <h4>1. حدد المشكلة الأساسية بوضوح:</h4>
        <p>ما هي المشكلة الوحيدة التي يعالجها منتجك بشكل أفضل من غيره؟ في مشروعنا مثل منصة <strong>سندباد</strong>، كان التركيز على حل مشكلة ربط التاجر المحلي بالمشتري وتسهيل استلام الطلبات بأبسط واجهة ممكنة.</p>
        <h4>2. اختيار التقنيات السريعة والمستقرة:</h4>
        <p>استخدام أدوات قوية وسريعة التطوير مثل <strong>Flutter</strong> لتطوير تطبيق الهاتف لكلا النظامين بكود واحد، و <strong>Laravel</strong> لتوفير Backend متين، يختصر وقت الإطلاق ويسمح بالتركيز على تجربة المستخدم.</p>`
      }
    ]
  };

  // Internal load helper
  function loadAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        saveAll(defaultData);
        return JSON.parse(JSON.stringify(defaultData));
      }
      const data = JSON.parse(stored);
      // Backwards compatibility migration: ensure journey array exists
      if (!data.journey || !Array.isArray(data.journey)) {
        data.journey = JSON.parse(JSON.stringify(defaultData.journey));
        saveAll(data);
      }
      // Backwards compatibility migration: ensure articles array exists
      if (!data.articles || !Array.isArray(data.articles)) {
        data.articles = JSON.parse(JSON.stringify(defaultData.articles));
        saveAll(data);
      }
      return data;
    } catch (e) {
      console.warn('DataStore load error, falling back to defaults:', e);
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function saveAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom event so open tabs/pages can auto-update
      window.dispatchEvent(new CustomEvent('alshujaa_data_updated', { detail: data }));
    } catch (e) {
      console.error('DataStore save error:', e);
    }
  }

  // Public API
  return {
    // Projects CRUD
    getProjects() {
      const data = loadAll();
      return data.projects || [];
    },

    getProjectById(id) {
      const projects = this.getProjects();
      return projects.find(p => p.id === id) || null;
    },

    saveProject(project) {
      const data = loadAll();
      if (!project.id) {
        project.id = 'proj-' + Date.now();
      }
      const existingIndex = data.projects.findIndex(p => p.id === project.id);
      if (existingIndex >= 0) {
        data.projects[existingIndex] = { ...data.projects[existingIndex], ...project };
      } else {
        data.projects.unshift(project);
      }
      saveAll(data);
      return project;
    },

    deleteProject(id) {
      const data = loadAll();
      data.projects = data.projects.filter(p => p.id !== id);
      saveAll(data);
      return true;
    },

    // Certificates CRUD
    getCertificates() {
      const data = loadAll();
      return data.certificates || [];
    },

    getCertificateById(id) {
      const certs = this.getCertificates();
      return certs.find(c => c.id === id) || null;
    },

    saveCertificate(cert) {
      const data = loadAll();
      if (!cert.id) {
        cert.id = 'cert-' + Date.now();
      }
      const existingIndex = data.certificates.findIndex(c => c.id === cert.id);
      if (existingIndex >= 0) {
        data.certificates[existingIndex] = { ...data.certificates[existingIndex], ...cert };
      } else {
        data.certificates.unshift(cert);
      }
      saveAll(data);
      return cert;
    },

    deleteCertificate(id) {
      const data = loadAll();
      data.certificates = data.certificates.filter(c => c.id !== id);
      saveAll(data);
      return true;
    },

    // Skills CRUD
    getSkills() {
      const data = loadAll();
      return data.skills || [];
    },

    saveSkill(skill) {
      const data = loadAll();
      if (!skill.id) {
        skill.id = 'skill-' + Date.now();
      }
      const existingIndex = data.skills.findIndex(s => s.id === skill.id);
      if (existingIndex >= 0) {
        data.skills[existingIndex] = { ...data.skills[existingIndex], ...skill };
      } else {
        data.skills.push(skill);
      }
      saveAll(data);
      return skill;
    },

    deleteSkill(id) {
      const data = loadAll();
      data.skills = data.skills.filter(s => s.id !== id);
      saveAll(data);
      return true;
    },

    // Journey / Career Path CRUD
    getJourney() {
      const data = loadAll();
      return data.journey || [];
    },

    getJourneyById(id) {
      const list = this.getJourney();
      return list.find(j => j.id === id) || null;
    },

    saveJourney(item) {
      const data = loadAll();
      if (!item.id) {
        item.id = 'journey-' + Date.now();
      }
      if (!data.journey) {
        data.journey = [];
      }
      const existingIndex = data.journey.findIndex(j => j.id === item.id);
      if (existingIndex >= 0) {
        data.journey[existingIndex] = { ...data.journey[existingIndex], ...item };
      } else {
        data.journey.push(item);
      }
      saveAll(data);
      return item;
    },

    deleteJourney(id) {
      const data = loadAll();
      if (!data.journey) data.journey = [];
      data.journey = data.journey.filter(j => j.id !== id);
      saveAll(data);
      return true;
    },

    // Articles / Blog CRUD
    getArticles() {
      const data = loadAll();
      return data.articles || [];
    },

    getArticleById(id) {
      const articles = this.getArticles();
      return articles.find(a => a.id === id) || null;
    },

    saveArticle(article) {
      const data = loadAll();
      if (!article.id) {
        article.id = 'article-' + Date.now();
      }
      if (!data.articles) {
        data.articles = [];
      }
      const existingIndex = data.articles.findIndex(a => a.id === article.id);
      if (existingIndex >= 0) {
        data.articles[existingIndex] = { ...data.articles[existingIndex], ...article };
      } else {
        data.articles.unshift(article);
      }
      saveAll(data);
      return article;
    },

    deleteArticle(id) {
      const data = loadAll();
      if (!data.articles) data.articles = [];
      data.articles = data.articles.filter(a => a.id !== id);
      saveAll(data);
      return true;
    },

    // Stats Counter
    getStats() {
      const data = loadAll();
      return {
        projectsCount: (data.projects || []).length,
        certificatesCount: (data.certificates || []).length,
        skillsCount: (data.skills || []).length,
        journeyCount: (data.journey || []).length,
        articlesCount: (data.articles || []).length
      };
    },

    // Backup & Restore
    exportJSON() {
      const data = loadAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `alshujaa_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    importJSON(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed.projects && parsed.certificates && parsed.skills) {
          if (!parsed.journey) {
            parsed.journey = JSON.parse(JSON.stringify(defaultData.journey));
          }
          if (!parsed.articles) {
            parsed.articles = JSON.parse(JSON.stringify(defaultData.articles));
          }
          saveAll(parsed);
          return { success: true };
        }
        return { success: false, error: 'الملف لا يحتوي على بنية البيانات المطلوبة' };
      } catch (err) {
        return { success: false, error: 'صيغة JSON غير صحيحة' };
      }
    },

    resetToDefaults() {
      saveAll(defaultData);
      return true;
    }
  };
})();

// Expose globally
window.DataStore = DataStore;
