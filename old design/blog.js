/**
 * blog.js — Interactive script for Al-Shujaa Wren Blog Experience
 */

'use strict';

/**
 * Add event listener on multiple elements helper
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (!elements) return;
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /**
   * TOP SCROLL PROGRESS BAR
   */
  const scrollProgressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrolled}%`;
  });

  /**
   * MOBILE NAVBAR TOGGLER
   */
  const navbar = document.querySelector('[data-navbar]');
  const navTogglers = document.querySelectorAll('[data-nav-toggler]');

  const toggleNav = () => {
    if (navbar) {
      navbar.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    }
  };

  addEventOnElements(navTogglers, 'click', toggleNav);

  /**
   * HEADER & BACK TO TOP ANIMATION
   */
  const header = document.querySelector('[data-header]');
  const backTopBtn = document.querySelector('[data-back-top-btn]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (header) {
      if (scrollPos > 80) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    }

    if (backTopBtn) {
      if (scrollPos > 300) {
        backTopBtn.classList.add('active');
      } else {
        backTopBtn.classList.remove('active');
      }
    }
  });

  /**
   * TOPICS SLIDER (RTL SUPPORTED)
   */
  const slider = document.querySelector('[data-slider]');
  const sliderContainer = document.querySelector('[data-slider-container]');
  const sliderPrevBtn = document.querySelector('[data-slider-prev]');
  const sliderNextBtn = document.querySelector('[data-slider-next]');

  let currentSlidePos = 0;

  const getSliderMetrics = () => {
    if (!slider || !sliderContainer) return { visibleItems: 1, slidableItems: 0, itemWidth: 300 };
    const visibleItems = Number(getComputedStyle(slider).getPropertyValue('--slider-items')) || 1;
    const totalItems = sliderContainer.childElementCount;
    const slidableItems = Math.max(0, totalItems - visibleItems);
    const firstItem = sliderContainer.children[0];
    const itemWidth = firstItem ? firstItem.offsetWidth + 20 : 320;
    return { visibleItems, slidableItems, itemWidth };
  };

  const moveSliderItem = () => {
    if (!sliderContainer) return;
    const { itemWidth } = getSliderMetrics();
    // In RTL, sliding next shifts items to the right by positive translation
    sliderContainer.style.transform = `translateX(${currentSlidePos * itemWidth}px)`;
  };

  if (sliderNextBtn && sliderContainer) {
    sliderNextBtn.addEventListener('click', () => {
      const { slidableItems } = getSliderMetrics();
      if (currentSlidePos >= slidableItems) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }
      moveSliderItem();
    });
  }

  if (sliderPrevBtn && sliderContainer) {
    sliderPrevBtn.addEventListener('click', () => {
      const { slidableItems } = getSliderMetrics();
      if (currentSlidePos <= 0) {
        currentSlidePos = slidableItems;
      } else {
        currentSlidePos--;
      }
      moveSliderItem();
    });
  }

  window.addEventListener('resize', () => {
    const { slidableItems } = getSliderMetrics();
    if (currentSlidePos > slidableItems) {
      currentSlidePos = slidableItems;
    }
    moveSliderItem();
  });

  /**
   * DYNAMIC ARTICLES LOADING (DATASTORE)
   */
  const defaultArticles = [
    {
      id: 'road-map-ai-2026',
      title: 'خارطة طريق مهندس الذكاء الاصطناعي وعلم البيانات لعام 2026',
      category: 'علم البيانات والذكاء الاصطناعي',
      tags: ['#ذكاء_اصطناعي', '#بايثون', '#علم_البيانات'],
      readTime: '6 دقائق قراءة',
      date: '18 سبتمبر 2026',
      author: 'عبدالرحمن عادل الشجاع',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop',
      summary: 'دليل عملي شامل للانتقال من المفاهيم الرياضية والبرمجية التأسيسية إلى بناء وتدريب وتجهيز نماذج الذكاء الاصطناعي التوليدي والتعلم العميق في بيئات الإنتاج الحقيقية.',
      content: `
        <p>مع التطور المتسارع للنماذج اللغوية الضخمة (LLMs) والأنظمة المستقلة، لم يعد تخصص الذكاء الاصطناعي مجرد تدريب نماذج تقليدية داخل بيئات تجريبية، بل أصبح فرعاً هندسياً تكاملياً يجمع بين الرياضيات، هندسة البرمجيات، والعمليات التشغيلية MLOps.</p>
        
        <h3>1. إتقان الأساسيات الرياضية والبرمجية</h3>
        <p>لا غنى عن لغة بايثون والمكتبات الرياضية الجوهرية (NumPy, Pandas, SciPy, SymPy) إلى جانب فهم عميق للجبر الخطي، التفاضل والتكامل متعدد المتغيرات، ونظريات الاحتمالات والإحصاء الاستدلالي.</p>
        
        <h3>2. معمارية التعلم العميق والشبكات العصبية</h3>
        <p>دراسة المعماريات الحديثة مثل Transformers و Diffusion Models، وتطبيقها عملياً باستخدام PyTorch و TensorFlow.</p>
        
        <h3>3. العمليات وهندسة النشر (MLOps)</h3>
        <p>القدرة على وضع النماذج في حاويات Docker ونشرها عبر واجهات برمجية سريعة كـ FastAPI وربطها بقواعد بيانات متجهات (Vector Databases) لأنظمة الـ RAG.</p>
      `
    },
    {
      id: 'flutter-bloc-architecture',
      title: 'بناء معمارية تطبيقات الهواتف الكبرى باستخدام Flutter و Bloc',
      category: 'تطوير تطبيقات الهواتف',
      tags: ['#Flutter', '#Mobile', '#Bloc'],
      readTime: '8 دقائق قراءة',
      date: '10 سبتمبر 2026',
      author: 'عبدالرحمن عادل الشجاع',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop',
      summary: 'استعراض معماري لأفضل الممارسات في هيكلة وإدارة الحالة (Clean Architecture & BLoC Pattern) للتطبيقات التجارية والمالية المعقدة مثل محفظة ريال ومنصة سندباد.',
      content: `
        <p>عند بناء تطبيقات هواتف ضخمة تتعامل مع بيانات مالية حساسة أو تدفقات دفع حية، تصبح المعمارية النظيفة (Clean Architecture) وفصل طبقات العمل عن واجهات المستخدم أمراً حتمياً لضمان قابلية التوسع والصيانة الدائمة.</p>
        
        <h3>أهمية BLoC في إدارة الحالة الصارمة</h3>
        <p>يوفر BLoC نموذجاً يعتمد على الأحداث (Events) والحالات (States) بطريقة أحادية الاتجاه (Unidirectional Data Flow)، مما يجعل اختبار الكود (Unit Testing) دقيقاً ويمنع حدوث حالات غير متوقعة في التطبيق.</p>
        
        <h3>فصل الطبقات: Data, Domain, and Presentation</h3>
        <p>الاعتماد على Repository Pattern واستخدام مكتبات الحقن التبعي مثل GetIt يمنح فريق العمل مرونة هائلة في تبديل مصادر البيانات أو تحديث الواجهات بدون لمس منطق العمل الحقيقي.</p>
      `
    },
    {
      id: 'ml-production-best-practices',
      title: 'دليلك الميداني لبناء ونشر نماذج التعلم الآلي في بيئات الإنتاج الحقيقية',
      category: 'علم البيانات والذكاء الاصطناعي',
      tags: ['#MachineLearning', '#FastAPI', '#Docker'],
      readTime: '7 دقائق قراءة',
      date: '28 أغسطس 2026',
      author: 'عبدالرحمن عادل الشجاع',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop',
      summary: 'خطوات عملية لتحويل النماذج من ملفات Jupyter Notebook إلى واجهات برمجية سريعة، مستقرة، وقابلة للتحجيم تخدم آلاف المستخدمين يومياً بكفاءة عالية.',
      content: `
        <p>العديد من مشاريع الذكاء الاصطناعي تتوقف في مرحلة المفاهيم والتجارب ولا ترى النور أبداً. الفجوة بين عالم أبحاث البيانات وعالم هندسة الأنظمة الحية تتطلب تطبيق معايير هندسية صارمة.</p>
        
        <h3>تحويل الكود إلى حزم قابلة للاستدعاء المستقر</h3>
        <p>تصدير النماذج بصيغ خفيفة وعالية الكفاءة مثل ONNX أو TorchScript يساعد كثيراً في تقليل زمن الاستجابة (Latency) واستهلاك الذاكرة العشوائية على السيرفرات.</p>
        
        <h3>مراقبة انحراف البيانات (Data Drift Monitoring)</h3>
        <p>النماذج في بيئة الإنتاج تتدهور كفاءتها بمرور الوقت مع تغير سلوك المستخدمين. لذلك، إعداد أدوات المراقبة والتنبيه الآلي يعد ركيزة أساسية لنجاح واستدامة المشروع.</p>
      `
    },
    {
      id: 'software-engineering-real-world',
      title: 'أسرار هندسة البرمجيات التي لا تتعلمها في قاعات الجامعة',
      category: 'هندسة البرمجيات وتطوير الويب',
      tags: ['#هندسة_برمجيات', '#CleanCode', '#خبرات'],
      readTime: '5 دقائق قراءة',
      date: '15 أغسطس 2026',
      author: 'عبدالرحمن عادل الشجاع',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
      summary: 'رؤى وتجارب واقعية من ميدان العمل والمشاريع الريادية: من كتابة الكود النظيف والمحافظة عليه، إلى قيادة الفرق البرمجية وإدارة الديون التقنية.',
      content: `
        <p>التعليم الأكاديمي يمنحنا البنية النظرية القوية في علوم الحاسوب والخوارزميات، لكن بيئة العمل الحقيقية تطالبك بمهارات من نوع آخر: التواصل، اتخاذ القرارات المعمارية السريعة، وإدارة المخاطر والوقت.</p>
        
        <h3>الكود ليس لك وحدك — اكتبه ليفهمه غيرك</h3>
        <p>قراءة الكود تستغرق أضعاف وقت كتابته. البساطة والتسميات المعبرة والالتزام بمبادئ SOLID هي ما يصنع المطور المحترف الحقيقي وليس تعقيد الشفرات بلا داعٍ.</p>
        
        <h3>الدين التقني (Technical Debt): متى تقبله ومتى تسدده؟</h3>
        <p>في الشركات الناشئة، إطلاق المنتج مبكراً للتحقق من السوق أمر جوهري، لكن ترك المشاكل الهيكلية تتراكم دون إعادة هيكلة (Refactoring) سيؤدي في النهاية إلى شلل كامل في تطوير الميزات الجديدة.</p>
      `
    }
  ];

  // Helper to fetch articles
  const getStoredArticles = () => {
    if (window.DataStore && typeof window.DataStore.getArticles === 'function') {
      const data = window.DataStore.getArticles();
      if (Array.isArray(data) && data.length > 0) return data;
    }
    return defaultArticles;
  };

  /**
   * RENDER FEATURED POSTS
   */
  const renderFeaturedPosts = (articles) => {
    const featureContainer = document.getElementById('featuredPostsList');
    if (!featureContainer) return;

    featureContainer.innerHTML = '';
    articles.slice(0, 4).forEach((article, index) => {
      const tagsList = (article.tags || [article.category || 'تقنية'])
        .map(t => `<span class="tag-chip">${t.startsWith('#') ? t : '#' + t}</span>`)
        .join(' ');

      const card = document.createElement('li');
      card.innerHTML = `
        <div class="card feature-card">
          <figure class="card-banner img-holder" style="--width: 1602; --height: 903;">
            <img src="${article.image || 'assets/images/project-1.png'}" loading="lazy" alt="${article.title}" class="img-cover">
          </figure>

          <div class="card-content">
            <div class="card-wrapper">
              <div class="card-tag">
                ${tagsList}
              </div>

              <div class="wrapper">
                <i class="far fa-clock" style="color: var(--bg-carolina-blue);"></i>
                <span class="span">${article.readTime || '5 دقائق قراءة'}</span>
              </div>
            </div>

            <h3 class="headline headline-3">
              <a href="javascript:void(0)" class="card-title hover-2 open-article-action" data-article-id="${article.id}">
                ${article.title}
              </a>
            </h3>

            <p class="card-excerpt">
              ${article.summary || article.excerpt || ''}
            </p>

            <div class="card-wrapper">
              <div class="profile-card">
                <img src="assets/cvs/profile-hero.png" width="44" height="44" loading="lazy" alt="${article.author || 'عبدالرحمن الشجاع'}" class="profile-banner" onerror="this.src='assets/about-img.png'">
                <div>
                  <p class="card-title">${article.author || 'عبدالرحمن الشجاع'}</p>
                  <p class="card-subtitle">${article.date || 'سبتمبر 2026'}</p>
                </div>
              </div>

              <button class="card-btn open-article-action" data-article-id="${article.id}">
                <span>اقرأ المقال</span>
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      featureContainer.appendChild(card);
    });
  };

  /**
   * RENDER RECENT POSTS
   */
  const renderRecentPosts = (articles) => {
    const recentContainer = document.getElementById('recentPostsList');
    if (!recentContainer) return;

    recentContainer.innerHTML = '';
    articles.forEach(article => {
      const tagsList = (article.tags || [article.category || 'برمجة'])
        .map(t => `<span class="span hover-2">${t.startsWith('#') ? t : '#' + t}</span>`)
        .join(' ');

      const item = document.createElement('li');
      item.innerHTML = `
        <div class="recent-post-card">
          <figure class="card-banner img-holder" style="--width: 271; --height: 258;">
            <img src="${article.image || 'assets/images/project-2.jpg'}" loading="lazy" alt="${article.title}" class="img-cover">
          </figure>

          <div class="card-content">
            <a href="javascript:void(0)" class="card-badge">${article.category || 'شروحات برمجية'}</a>

            <h3 class="headline headline-3 card-title">
              <a href="javascript:void(0)" class="link hover-2 open-article-action" data-article-id="${article.id}">
                ${article.title}
              </a>
            </h3>

            <p class="card-text">
              ${article.summary || ''}
            </p>

            <div class="card-wrapper">
              <div class="card-tag">
                ${tagsList}
              </div>

              <div class="wrapper">
                <i class="far fa-clock" style="color: var(--bg-carolina-blue);"></i>
                <span class="span">${article.readTime || '4 دقائق قراءة'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      recentContainer.appendChild(item);
    });
  };

  /**
   * RENDER POPULAR POSTS ASIDE
   */
  const renderPopularAside = (articles) => {
    const popularContainer = document.getElementById('popularPostsList');
    if (!popularContainer) return;

    popularContainer.innerHTML = '';
    articles.slice(0, 5).forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="popular-card open-article-action" data-article-id="${article.id}" style="cursor: pointer;">
          <figure class="card-banner img-holder" style="--width: 65; --height: 65;">
            <img src="${article.image || 'assets/images/project-1.png'}" loading="lazy" alt="${article.title}" class="img-cover">
          </figure>

          <div class="card-content">
            <h4 class="headline headline-4 card-title hover-2">
              ${article.title}
            </h4>

            <div class="warpper">
              <p class="card-subtitle"><i class="far fa-clock"></i> ${article.readTime || '5 دقائق'}</p>
              <time class="publish-date">${article.date || '2026'}</time>
            </div>
          </div>
        </div>
      `;
      popularContainer.appendChild(li);
    });
  };

  /**
   * ARTICLE MODAL VIEWER
   */
  const modalOverlay = document.getElementById('articleModal');
  const modalTitle = document.getElementById('modalArticleTitle');
  const modalCategory = document.getElementById('modalArticleCategory');
  const modalDate = document.getElementById('modalArticleDate');
  const modalReadTime = document.getElementById('modalArticleReadTime');
  const modalImg = document.getElementById('modalArticleImg');
  const modalBody = document.getElementById('modalArticleBody');
  const modalCloseBtn = document.getElementById('closeArticleModalBtn');

  window.openBlogArticleModal = function (articleId) {
    const articles = getStoredArticles();
    const article = articles.find(a => a.id === articleId) || articles[0];
    if (!article || !modalOverlay) return;

    if (modalTitle) modalTitle.textContent = article.title;
    if (modalCategory) modalCategory.textContent = article.category || 'تقنية';
    if (modalDate) modalDate.textContent = article.date || 'سبتمبر 2026';
    if (modalReadTime) modalReadTime.textContent = article.readTime || '5 دقائق قراءة';
    if (modalImg) {
      modalImg.src = article.image || 'assets/images/project-1.png';
      modalImg.alt = article.title;
    }
    if (modalBody) {
      modalBody.innerHTML = article.content || `<p>${article.summary}</p>`;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeBlogArticleModal = function () {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBlogArticleModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeBlogArticleModal();
    });
  }

  // Delegate clicks on article open actions
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.open-article-action');
    if (target) {
      e.preventDefault();
      const articleId = target.getAttribute('data-article-id');
      if (articleId) window.openBlogArticleModal(articleId);
    }
  });

  /**
   * TAGS FILTERING
   */
  const tagButtons = document.querySelectorAll('.tag-btn');
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tagKeyword = btn.getAttribute('data-tag-keyword') || btn.textContent.trim().toLowerCase();
      const articles = getStoredArticles();

      if (tagKeyword === 'all' || tagKeyword === 'الكل') {
        renderFeaturedPosts(articles);
        renderRecentPosts(articles);
      } else {
        const filtered = articles.filter(a => {
          const inTitle = a.title.toLowerCase().includes(tagKeyword);
          const inSummary = (a.summary || '').toLowerCase().includes(tagKeyword);
          const inCategory = (a.category || '').toLowerCase().includes(tagKeyword);
          const inTags = (a.tags || []).some(t => t.toLowerCase().includes(tagKeyword));
          return inTitle || inSummary || inCategory || inTags;
        });

        renderFeaturedPosts(filtered.length ? filtered : articles);
        renderRecentPosts(filtered.length ? filtered : articles);
      }
    });
  });

  /**
   * NEWSLETTER SUBSCRIPTION
   */
  const newsletterForms = document.querySelectorAll('.newsletter-form-action');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        alert(`شكراً لاشتراكك! تم تسجيل بريدك الإلكتروني بنجاح: ${input.value}`);
        input.value = '';
      }
    });
  });

  /**
   * INITIALIZE PAGE DATA
   */
  const allArticles = getStoredArticles();
  renderFeaturedPosts(allArticles);
  renderRecentPosts(allArticles);
  renderPopularAside(allArticles);

  // Listen for storage updates
  window.addEventListener('alshujaa_data_updated', () => {
    const updated = getStoredArticles();
    renderFeaturedPosts(updated);
    renderRecentPosts(updated);
    renderPopularAside(updated);
  });

});
