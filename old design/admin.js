/**
 * ===================================================================
 * Abdulrahman Adel Alshujaa | Admin Dashboard Engine
 * CRUD Operations for Certificates, Projects, and Skills
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const PASSCODE = 'alshujaa2026';
  const SESSION_KEY = 'alshujaa_admin_auth';

  // --- Theme Sync (Exact match to main website) ---
  const adminThemeToggler = document.getElementById('adminThemeToggler');
  const body = document.body;
  const themeIcon = adminThemeToggler ? adminThemeToggler.querySelector('i') : null;

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('alshujaa_theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      body.classList.remove('dark-theme');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
  }

  applySavedTheme();

  if (adminThemeToggler) {
    adminThemeToggler.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');
      localStorage.setItem('alshujaa_theme', isDark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }
      showToast(isDark ? 'تم تفعيل الوضع الليلي 🌙' : 'تم تفعيل الوضع النهاري ☀️', 'info');
    });
  }

  // --- Auth Check ---
  const loginScreen = document.getElementById('loginScreen');
  const adminDashboard = document.getElementById('adminDashboard');
  const loginForm = document.getElementById('loginForm');
  const adminPasscode = document.getElementById('adminPasscode');
  const logoutBtn = document.getElementById('logoutBtn');

  function checkAuth() {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      loginScreen.style.display = 'none';
      adminDashboard.style.display = 'block';
      loadAllDashboardData();
    } else {
      loginScreen.style.display = 'flex';
      adminDashboard.style.display = 'none';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (adminPasscode.value.trim() === PASSCODE) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        showToast('تم تسجيل الدخول بنجاح! مرحباً بك يا بشمهندس عبدالرحمن', 'success');
        checkAuth();
      } else {
        showToast('رمز الدخول غير صحيح! حاول مجدداً', 'error');
        adminPasscode.value = '';
        adminPasscode.focus();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      showToast('تم تسجيل الخروج بنجاح', 'info');
      checkAuth();
    });
  }

  // --- Toast Notification Helper ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle text-green';
    if (type === 'error') icon = 'fas fa-exclamation-triangle text-red';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- Tab Switching ---
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.tab;
      tabLinks.forEach(l => l.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  // --- Modal Helpers ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.close;
      closeModal(target);
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.admin-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });

  // ===================================================================
  // SMART CLIENT-SIDE IMAGE COMPRESSOR (HTML5 Canvas)
  // ===================================================================
  function compressAndProcessImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file.type.match(/image.*/)) {
        reject(new Error('الملف المختار ليس صورة صالحة'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio while bounding to maxWidth/maxHeight
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Always compress to JPEG for optimal localStorage footprint
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          const approxKb = Math.round((compressedDataUrl.length * 3 / 4) / 1024);

          resolve({
            dataUrl: compressedDataUrl,
            fileName: file.name,
            sizeKb: approxKb,
            width,
            height
          });
        };
        img.onerror = () => reject(new Error('فشل تحميل بيانات الصورة'));
        img.src = readerEvent.target.result;
      };
      reader.onerror = () => reject(new Error('تعذر قراءة الملف'));
      reader.readAsDataURL(file);
    });
  }

  // Setup Drag and Drop Zone Controller
  function setupUploadZone({
    dropZoneId,
    fileInputId,
    promptId,
    previewCardId,
    previewImgId,
    fileNameId,
    fileSizeId,
    removeBtnId,
    hiddenInputId,
    toggleUrlBtnId,
    urlWrapperId,
    manualUrlInputId
  }) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(fileInputId);
    const prompt = document.getElementById(promptId);
    const previewCard = document.getElementById(previewCardId);
    const previewImg = document.getElementById(previewImgId);
    const fileNameEl = document.getElementById(fileNameId);
    const fileSizeEl = document.getElementById(fileSizeId);
    const removeBtn = document.getElementById(removeBtnId);
    const hiddenInput = document.getElementById(hiddenInputId);
    const toggleUrlBtn = document.getElementById(toggleUrlBtnId);
    const urlWrapper = document.getElementById(urlWrapperId);
    const manualUrlInput = document.getElementById(manualUrlInputId);

    if (!dropZone || !fileInput || !hiddenInput) return;

    function showPreview(dataUrl, name, sizeText) {
      hiddenInput.value = dataUrl;
      if (previewImg) previewImg.src = dataUrl;
      if (fileNameEl) fileNameEl.textContent = name || 'صورة مرفوعة';
      if (fileSizeEl) fileSizeEl.textContent = sizeText || 'جاهزة للعرض';
      if (prompt) prompt.style.display = 'none';
      if (previewCard) previewCard.style.display = 'flex';
    }

    function clearUpload() {
      hiddenInput.value = '';
      fileInput.value = '';
      if (previewImg) previewImg.src = '';
      if (manualUrlInput) manualUrlInput.value = '';
      if (previewCard) previewCard.style.display = 'none';
      if (prompt) prompt.style.display = 'flex';
    }

    async function handleFile(file) {
      if (!file) return;
      try {
        showToast('جاري ضغط وتحسين الصورة...', 'info');
        const result = await compressAndProcessImage(file);
        showPreview(result.dataUrl, result.fileName, `حجم خفيف: ~${result.sizeKb} KB`);
        showToast('تم رفع الصورة وضغطها بنجاح!', 'success');
      } catch (err) {
        showToast('خطأ أثناء معالجة الصورة: ' + err.message, 'error');
      }
    }

    // Input change
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });

    // Click on drop zone to pick file directly from device
    dropZone.addEventListener('click', (e) => {
      if (e.target.closest('#' + removeBtnId) || e.target.closest('.remove-upload-btn')) return;
      fileInput.click();
    });

    // Drag and Drop events
    ['dragenter', 'dragover'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    // Remove button
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearUpload();
      });
    }

    // Manual URL fallback toggle
    if (toggleUrlBtn && urlWrapper && manualUrlInput) {
      toggleUrlBtn.addEventListener('click', () => {
        const isHidden = urlWrapper.style.display === 'none';
        urlWrapper.style.display = isHidden ? 'block' : 'none';
      });

      manualUrlInput.addEventListener('input', () => {
        const val = manualUrlInput.value.trim();
        if (val) {
          showPreview(val, 'رابط صورة خارجي', 'رابط مباشر');
        } else {
          clearUpload();
        }
      });
    }

    dropZone._showPreview = showPreview;
    dropZone._clearUpload = clearUpload;
  }

  // Initialize Certificate Drop Zone
  setupUploadZone({
    dropZoneId: 'certDropZone',
    fileInputId: 'certFileInput',
    promptId: 'certDropPrompt',
    previewCardId: 'certUploadPreview',
    previewImgId: 'certPreviewImg',
    fileNameId: 'certFileName',
    fileSizeId: 'certFileSize',
    removeBtnId: 'removeCertUploadBtn',
    hiddenInputId: 'certImage',
    toggleUrlBtnId: 'toggleCertUrlInput',
    urlWrapperId: 'certUrlInputWrapper',
    manualUrlInputId: 'certImageUrlManual'
  });

  // Initialize Project Drop Zone
  setupUploadZone({
    dropZoneId: 'projectDropZone',
    fileInputId: 'projectFileInput',
    promptId: 'projectDropPrompt',
    previewCardId: 'projectUploadPreview',
    previewImgId: 'projectPreviewImg',
    fileNameId: 'projectFileName',
    fileSizeId: 'projectFileSize',
    removeBtnId: 'removeProjectUploadBtn',
    hiddenInputId: 'projectImage',
    toggleUrlBtnId: 'toggleProjectUrlInput',
    urlWrapperId: 'projectUrlInputWrapper',
    manualUrlInputId: 'projectImageUrlManual'
  });

  // Initialize Article Drop Zone
  setupUploadZone({
    dropZoneId: 'articleDropZone',
    fileInputId: 'articleFileInput',
    promptId: 'articleDropPrompt',
    previewCardId: 'articleUploadPreview',
    previewImgId: 'articlePreviewImg',
    fileNameId: 'articleFileName',
    fileSizeId: 'articleFileSize',
    removeBtnId: 'removeArticleUploadBtn',
    hiddenInputId: 'articleAdminImage',
    toggleUrlBtnId: 'toggleArticleUrlInput',
    urlWrapperId: 'articleUrlInputWrapper',
    manualUrlInputId: 'articleImageUrlManual'
  });

  // Update color hex display on input
  const skillColor = document.getElementById('skillColor');
  const skillColorHex = document.getElementById('skillColorHex');
  if (skillColor && skillColorHex) {
    skillColor.addEventListener('input', () => {
      skillColorHex.textContent = skillColor.value.toUpperCase();
    });
  }

  // ===================================================================
  // 1. STATS OVERVIEW
  // ===================================================================
  function updateStats() {
    const stats = DataStore.getStats();
    const projEl = document.getElementById('statsProjectsCount');
    const certEl = document.getElementById('statsCertsCount');
    const skillEl = document.getElementById('statsSkillsCount');
    const journeyEl = document.getElementById('statsJourneyCount');
    const articleEl = document.getElementById('statsArticlesCount');

    if (projEl) projEl.textContent = stats.projectsCount || 0;
    if (certEl) certEl.textContent = stats.certificatesCount || 0;
    if (skillEl) skillEl.textContent = stats.skillsCount || 0;
    if (journeyEl) journeyEl.textContent = stats.journeyCount || 0;
    if (articleEl) articleEl.textContent = stats.articlesCount || 0;
  }

  // ===================================================================
  // 2. CERTIFICATES MANAGEMENT
  // ===================================================================
  const certsListContainer = document.getElementById('certsListContainer');
  const openAddCertModalBtn = document.getElementById('openAddCertModalBtn');
  const certForm = document.getElementById('certForm');

  function renderCertificates() {
    if (!certsListContainer) return;
    const certs = DataStore.getCertificates();
    certsListContainer.innerHTML = '';

    if (certs.length === 0) {
      certsListContainer.innerHTML = `<div class="empty-state">لا توجد شهادات مسجلة حتى الآن. أضف شهادتك الأولى!</div>`;
      return;
    }

    certs.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      const imgSrc = cert.image || 'images/placeholder.jpg';

      card.innerHTML = `
        <div class="admin-card-thumb">
          <img src="${imgSrc}" alt="${cert.title}" onerror="this.src='images/placeholder.jpg'">
          <span class="admin-card-badge">${cert.date || '2024'}</span>
        </div>
        <div class="admin-card-body">
          <h4 class="admin-card-title">${cert.title}</h4>
          <div class="admin-card-meta">
            <span><i class="fas fa-university"></i> ${cert.issuer || 'جهة معتمدة'}</span>
          </div>
          <p class="admin-card-desc">${cert.description || 'شهادة تخصصية معتمدة.'}</p>
          <div class="admin-card-footer">
            <button class="btn btn-sm btn-subtle edit-cert-btn" data-id="${cert.id}">
              <i class="fas fa-edit"></i> تعديل
            </button>
            <button class="btn btn-sm btn-danger-outline delete-cert-btn" data-id="${cert.id}">
              <i class="fas fa-trash"></i> حذف
            </button>
          </div>
        </div>
      `;

      certsListContainer.appendChild(card);
    });

    // Attach edit & delete events
    document.querySelectorAll('.edit-cert-btn').forEach(btn => {
      btn.addEventListener('click', () => editCertificate(btn.dataset.id));
    });

    document.querySelectorAll('.delete-cert-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteCertificate(btn.dataset.id));
    });
  }

  const certDropZoneEl = document.getElementById('certDropZone');

  if (openAddCertModalBtn) {
    openAddCertModalBtn.addEventListener('click', () => {
      certForm.reset();
      document.getElementById('certId').value = '';
      document.getElementById('certModalTitle').innerHTML = '<i class="fas fa-award"></i> إضافة شهادة جديدة';
      if (certDropZoneEl && certDropZoneEl._clearUpload) certDropZoneEl._clearUpload();
      openModal('certModal');
    });
  }

  function editCertificate(id) {
    const cert = DataStore.getCertificateById(id);
    if (!cert) return;

    document.getElementById('certId').value = cert.id;
    document.getElementById('certTitle').value = cert.title;
    document.getElementById('certIssuer').value = cert.issuer || '';
    document.getElementById('certDate').value = cert.date || '';
    document.getElementById('certCategory').value = cert.category || 'data-ai';
    document.getElementById('certImage').value = cert.image || '';
    document.getElementById('certCredentialUrl').value = cert.credentialUrl || '';
    document.getElementById('certDescription').value = cert.description || '';

    if (cert.image && certDropZoneEl && certDropZoneEl._showPreview) {
      certDropZoneEl._showPreview(cert.image, cert.title, 'الصورة الحالية');
    } else if (certDropZoneEl && certDropZoneEl._clearUpload) {
      certDropZoneEl._clearUpload();
    }

    document.getElementById('certModalTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل الشهادة';
    openModal('certModal');
  }

  function deleteCertificate(id) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذه الشهادة نهائياً؟')) {
      DataStore.deleteCertificate(id);
      showToast('تم حذف الشهادة بنجاح', 'success');
      renderCertificates();
      updateStats();
    }
  }

  if (certForm) {
    certForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const certData = {
        id: document.getElementById('certId').value || null,
        title: document.getElementById('certTitle').value.trim(),
        issuer: document.getElementById('certIssuer').value.trim(),
        date: document.getElementById('certDate').value.trim(),
        category: document.getElementById('certCategory').value,
        image: document.getElementById('certImage').value.trim() || 'images/placeholder.jpg',
        credentialUrl: document.getElementById('certCredentialUrl').value.trim() || '#',
        description: document.getElementById('certDescription').value.trim()
      };

      DataStore.saveCertificate(certData);
      showToast('تم حفظ الشهادة بنجاح وستظهر في الموقع فوراً!', 'success');
      closeModal('certModal');
      renderCertificates();
      updateStats();
    });
  }

  // ===================================================================
  // 3. PROJECTS MANAGEMENT
  // ===================================================================
  const projectsListContainer = document.getElementById('projectsListContainer');
  const openAddProjectModalBtn = document.getElementById('openAddProjectModalBtn');
  const projectForm = document.getElementById('projectForm');

  function renderProjects() {
    if (!projectsListContainer) return;
    const projects = DataStore.getProjects();
    projectsListContainer.innerHTML = '';

    if (projects.length === 0) {
      projectsListContainer.innerHTML = `<div class="empty-state">لا توجد مشاريع مسجلة حتى الآن. أضف مشروعك الأول!</div>`;
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      const imgSrc = project.image || 'images/placeholder.jpg';
      const tagsHtml = (project.tags || []).map(t => `<span>${t}</span>`).join('');

      card.innerHTML = `
        <div class="admin-card-thumb">
          <img src="${imgSrc}" alt="${project.title}" onerror="this.src='images/placeholder.jpg'">
          <span class="admin-card-badge">${project.date || '2024'}</span>
        </div>
        <div class="admin-card-body">
          <h4 class="admin-card-title">${project.title}</h4>
          <div class="admin-card-meta">
            <span><i class="fas fa-tag"></i> ${project.categoryLabel || project.category}</span>
            ${project.featured ? '<span class="text-gold"><i class="fas fa-star"></i> رئيسي</span>' : ''}
          </div>
          <p class="admin-card-desc">${project.brief || project.description}</p>
          <div class="admin-card-tags">${tagsHtml}</div>
          <div class="admin-card-footer">
            <button class="btn btn-sm btn-subtle edit-project-btn" data-id="${project.id}">
              <i class="fas fa-edit"></i> تعديل
            </button>
            <button class="btn btn-sm btn-danger-outline delete-project-btn" data-id="${project.id}">
              <i class="fas fa-trash"></i> حذف
            </button>
          </div>
        </div>
      `;

      projectsListContainer.appendChild(card);
    });

    // Attach edit & delete events
    document.querySelectorAll('.edit-project-btn').forEach(btn => {
      btn.addEventListener('click', () => editProject(btn.dataset.id));
    });

    document.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteProject(btn.dataset.id));
    });
  }

  const projectDropZoneEl = document.getElementById('projectDropZone');

  if (openAddProjectModalBtn) {
    openAddProjectModalBtn.addEventListener('click', () => {
      projectForm.reset();
      document.getElementById('projectId').value = '';
      document.getElementById('projectModalTitle').innerHTML = '<i class="fas fa-laptop-code"></i> إضافة مشروع جديد';
      if (projectDropZoneEl && projectDropZoneEl._clearUpload) projectDropZoneEl._clearUpload();
      openModal('projectModal');
    });
  }

  function editProject(id) {
    const project = DataStore.getProjectById(id);
    if (!project) return;

    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDate').value = project.date || '';
    document.getElementById('projectCategory').value = project.category || 'platform';
    document.getElementById('projectTags').value = (project.tags || []).join(', ');
    document.getElementById('projectBrief').value = project.brief || '';
    document.getElementById('projectDescription').value = project.description || '';
    document.getElementById('projectLiveUrl').value = project.liveUrl !== '#' ? project.liveUrl : '';
    document.getElementById('projectGithubUrl').value = project.githubUrl !== '#' ? project.githubUrl : '';
    document.getElementById('projectImage').value = project.image || '';
    document.getElementById('projectFeatured').checked = !!project.featured;

    if (project.image && projectDropZoneEl && projectDropZoneEl._showPreview) {
      projectDropZoneEl._showPreview(project.image, project.title, 'الصورة الحالية');
    } else if (projectDropZoneEl && projectDropZoneEl._clearUpload) {
      projectDropZoneEl._clearUpload();
    }

    document.getElementById('projectModalTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل المشروع';
    openModal('projectModal');
  }

  function deleteProject(id) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) {
      DataStore.deleteProject(id);
      showToast('تم حذف المشروع بنجاح', 'success');
      renderProjects();
      updateStats();
    }
  }

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tags = document.getElementById('projectTags').value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const categoryVal = document.getElementById('projectCategory').value;
      const categoryLabels = {
        'platform': 'المنصات والتجارة الإلكترونية',
        'ai-data': 'الذكاء الاصطناعي وعلم البيانات',
        'mobile': 'تطبيقات الموبايل',
        'web': 'تطوير الويب'
      };

      const projectData = {
        id: document.getElementById('projectId').value || null,
        title: document.getElementById('projectTitle').value.trim(),
        date: document.getElementById('projectDate').value.trim(),
        category: categoryVal,
        categoryLabel: categoryLabels[categoryVal] || categoryVal,
        tags: tags,
        brief: document.getElementById('projectBrief').value.trim(),
        description: document.getElementById('projectDescription').value.trim(),
        liveUrl: document.getElementById('projectLiveUrl').value.trim() || '#',
        githubUrl: document.getElementById('projectGithubUrl').value.trim() || '#',
        image: document.getElementById('projectImage').value.trim() || 'images/placeholder.jpg',
        featured: document.getElementById('projectFeatured').checked
      };

      DataStore.saveProject(projectData);
      showToast('تم حفظ المشروع بنجاح ويظهر الآن في الموقع!', 'success');
      closeModal('projectModal');
      renderProjects();
      updateStats();
    });
  }

  // ===================================================================
  // 4. SKILLS MANAGEMENT
  // ===================================================================
  const skillsListContainer = document.getElementById('skillsListContainer');
  const openAddSkillModalBtn = document.getElementById('openAddSkillModalBtn');
  const skillForm = document.getElementById('skillForm');

  function renderSkills() {
    if (!skillsListContainer) return;
    const skills = DataStore.getSkills();
    skillsListContainer.innerHTML = '';

    const categoryNames = {
      'data-ai': 'البيانات والذكاء الاصطناعي',
      'programming': 'البرمجة وتطوير الويب',
      'mobile': 'تطبيقات الهواتف الذكية',
      'tools': 'الأدوات وقواعد البيانات'
    };

    skills.forEach(skill => {
      const tr = document.createElement('tr');
      const catLabel = categoryNames[skill.category] || skill.category;

      tr.innerHTML = `
        <td><strong>${skill.name}</strong></td>
        <td><span class="badge-tag">${catLabel}</span></td>
        <td>
          <div class="skill-bar-preview"><span style="width: ${skill.level}%; background: ${skill.color || '#D71916'};"></span></div>
          <span>${skill.level}%</span>
        </td>
        <td>
          <span style="display:inline-block; width:16px; height:16px; border-radius:50%; background:${skill.color || '#D71916'}; vertical-align:middle; margin-left:6px;"></span>
          <code>${skill.color || '#D71916'}</code>
        </td>
        <td>
          <button class="btn btn-sm btn-subtle edit-skill-btn" data-id="${skill.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger-outline delete-skill-btn" data-id="${skill.id}"><i class="fas fa-trash"></i></button>
        </td>
      `;

      skillsListContainer.appendChild(tr);
    });

    document.querySelectorAll('.edit-skill-btn').forEach(btn => {
      btn.addEventListener('click', () => editSkill(btn.dataset.id));
    });

    document.querySelectorAll('.delete-skill-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteSkill(btn.dataset.id));
    });
  }

  if (openAddSkillModalBtn) {
    openAddSkillModalBtn.addEventListener('click', () => {
      skillForm.reset();
      document.getElementById('skillId').value = '';
      document.getElementById('skillModalTitle').innerHTML = '<i class="fas fa-tools"></i> إضافة مهارة جديدة';
      document.getElementById('skillColor').value = '#FF6A32';
      document.getElementById('skillColorHex').textContent = '#FF6A32';
      openModal('skillModal');
    });
  }

  function editSkill(id) {
    const skills = DataStore.getSkills();
    const skill = skills.find(s => s.id === id);
    if (!skill) return;

    document.getElementById('skillId').value = skill.id;
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillCategory').value = skill.category;
    document.getElementById('skillLevel').value = skill.level;
    document.getElementById('skillColor').value = skill.color || '#FF6A32';
    document.getElementById('skillColorHex').textContent = skill.color || '#FF6A32';

    document.getElementById('skillModalTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل المهارة';
    openModal('skillModal');
  }

  function deleteSkill(id) {
    if (confirm('هل أنت متأكد من حذف هذه المهارة؟')) {
      DataStore.deleteSkill(id);
      showToast('تم حذف المهارة بنجاح', 'success');
      renderSkills();
      updateStats();
    }
  }

  if (skillForm) {
    skillForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const skillData = {
        id: document.getElementById('skillId').value || null,
        name: document.getElementById('skillName').value.trim(),
        category: document.getElementById('skillCategory').value,
        level: parseInt(document.getElementById('skillLevel').value, 10),
        color: document.getElementById('skillColor').value
      };

      DataStore.saveSkill(skillData);
      showToast('تم حفظ المهارة بنجاح!', 'success');
      closeModal('skillModal');
      renderSkills();
      updateStats();
    });
  }

  // ===================================================================
  // 4. JOURNEY / CAREER PATH MANAGEMENT
  // ===================================================================
  const journeyListContainer = document.getElementById('journeyListContainer');
  const openAddJourneyModalBtn = document.getElementById('openAddJourneyModalBtn');
  const journeyForm = document.getElementById('journeyForm');
  const journeyIconInput = document.getElementById('journeyIcon');
  const journeyIconPreview = document.getElementById('journeyIconPreview');

  // Live icon preview
  if (journeyIconInput && journeyIconPreview) {
    journeyIconInput.addEventListener('input', () => {
      const iconClass = journeyIconInput.value.trim() || 'fas fa-rocket';
      journeyIconPreview.innerHTML = `<i class="${iconClass}"></i>`;
    });
  }

  const journeyCategoryLabels = {
    'work': 'خبرة ومشاريع كبرى',
    'learning': 'تعلّم وتخصص',
    'community': 'مبادرة ومجتمع',
    'education': 'تعليم أكاديمي وجامعي'
  };

  function renderJourney() {
    if (!journeyListContainer) return;
    const items = DataStore.getJourney();
    journeyListContainer.innerHTML = '';

    if (items.length === 0) {
      journeyListContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
          <i class="fas fa-route" style="font-size: 4rem; color: var(--main-color); margin-bottom: 1.5rem; display: block;"></i>
          <h3 style="font-size: 2rem; color: var(--primary-text-color); margin-bottom: 0.8rem;">لا توجد محطات مسجلة في المسار</h3>
          <p style="color: var(--secondary-text-color);">اضغط على زر "إضافة محطة جديدة" لإضافة أول محطة في مسيرتك المهنية والتعليمية.</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      const catLabel = item.categoryLabel || journeyCategoryLabels[item.category] || item.category;

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 1.6rem; margin-bottom: 1.2rem;">
          <div style="width: 4.8rem; height: 4.8rem; border-radius: 1.4rem; background: rgba(215, 25, 22, 0.1); border: 1px solid rgba(215, 25, 22, 0.2); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: var(--main-color, #D71916); flex-shrink: 0;">
            <i class="${item.icon || 'fas fa-rocket'}"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: 0.4rem; flex-wrap: wrap;">
              <h3 style="margin: 0; font-size: 1.7rem; font-weight: 700; color: var(--primary-text-color);">${item.title}</h3>
              <span class="badge-tag" style="background: rgba(215, 25, 22, 0.08); color: var(--main-color); border: 1px solid rgba(215, 25, 22, 0.2); font-weight: 700;">${item.date}</span>
            </div>
            <div style="font-size: 1.35rem; color: var(--accent-color); font-weight: 600; margin-bottom: 0.6rem;">
              <i class="fas fa-user-tag text-gold"></i> ${item.role}
            </div>
            <span class="badge-tag" style="font-size: 1.15rem; margin-bottom: 0.8rem; display: inline-block;">${catLabel}</span>
            <p style="font-size: 1.35rem; color: var(--secondary-text-color); line-height: 1.6; margin: 0;">${item.description}</p>
          </div>
        </div>
        <div class="admin-card-actions" style="margin-top: 1.2rem; border-top: 1px solid var(--card-border); padding-top: 1rem;">
          <button class="btn btn-sm btn-subtle edit-journey-btn" data-id="${item.id}"><i class="fas fa-edit"></i> تعديل</button>
          <button class="btn btn-sm btn-danger-outline delete-journey-btn" data-id="${item.id}"><i class="fas fa-trash"></i> حذف</button>
        </div>
      `;

      journeyListContainer.appendChild(card);
    });

    document.querySelectorAll('.edit-journey-btn').forEach(btn => {
      btn.addEventListener('click', () => editJourney(btn.dataset.id));
    });

    document.querySelectorAll('.delete-journey-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteJourney(btn.dataset.id));
    });
  }

  if (openAddJourneyModalBtn) {
    openAddJourneyModalBtn.addEventListener('click', () => {
      journeyForm.reset();
      document.getElementById('journeyId').value = '';
      document.getElementById('journeyModalTitle').innerHTML = '<i class="fas fa-route"></i> إضافة محطة جديدة في المسار';
      document.getElementById('journeyIcon').value = 'fas fa-rocket';
      if (journeyIconPreview) journeyIconPreview.innerHTML = '<i class="fas fa-rocket"></i>';
      openModal('journeyModal');
    });
  }

  function editJourney(id) {
    const item = DataStore.getJourneyById(id);
    if (!item) return;

    document.getElementById('journeyId').value = item.id;
    document.getElementById('journeyTitle').value = item.title;
    document.getElementById('journeyRole').value = item.role;
    document.getElementById('journeyDate').value = item.date;
    document.getElementById('journeyCategory').value = item.category || 'work';
    document.getElementById('journeyIcon').value = item.icon || 'fas fa-rocket';
    document.getElementById('journeyDescription').value = item.description;

    if (journeyIconPreview) {
      journeyIconPreview.innerHTML = `<i class="${item.icon || 'fas fa-rocket'}"></i>`;
    }

    document.getElementById('journeyModalTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل محطة المسار';
    openModal('journeyModal');
  }

  function deleteJourney(id) {
    if (confirm('هل أنت متأكد من حذف هذه المحطة من المسار؟')) {
      DataStore.deleteJourney(id);
      showToast('تم حذف المحطة بنجاح', 'success');
      renderJourney();
      updateStats();
    }
  }

  if (journeyForm) {
    journeyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const catVal = document.getElementById('journeyCategory').value;
      const journeyData = {
        id: document.getElementById('journeyId').value || null,
        title: document.getElementById('journeyTitle').value.trim(),
        role: document.getElementById('journeyRole').value.trim(),
        date: document.getElementById('journeyDate').value.trim(),
        category: catVal,
        categoryLabel: journeyCategoryLabels[catVal] || 'محطة في المسار',
        icon: document.getElementById('journeyIcon').value.trim() || 'fas fa-rocket',
        description: document.getElementById('journeyDescription').value.trim()
      };

      DataStore.saveJourney(journeyData);
      showToast('تم حفظ محطة المسار بنجاح!', 'success');
      closeModal('journeyModal');
      renderJourney();
      updateStats();
    });
  }

  // ===================================================================
  // 5. ARTICLES / BLOG MANAGEMENT
  // ===================================================================
  const articlesListContainer = document.getElementById('articlesListContainer');
  const openAddArticleModalBtn = document.getElementById('openAddArticleModalBtn');
  const articleAdminForm = document.getElementById('articleAdminForm');
  const articleDropZone = document.getElementById('articleDropZone');

  const articleCategoryLabels = {
    'data-ai': 'علوم البيانات والذكاء الاصطناعي',
    'mobile': 'تطبيقات الهواتف الذكية',
    'programming': 'البرمجة وتطوير الويب',
    'startups': 'ريادة الأعمال والمنتجات الرقمية'
  };

  function renderArticles() {
    if (!articlesListContainer) return;
    const articles = DataStore.getArticles();
    articlesListContainer.innerHTML = '';

    if (articles.length === 0) {
      articlesListContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
          <i class="fas fa-newspaper" style="font-size: 4rem; color: var(--main-color); margin-bottom: 1.5rem; display: block;"></i>
          <h3 style="font-size: 2rem; color: var(--primary-text-color); margin-bottom: 0.8rem;">لا توجد مقالات منشورة حالياً</h3>
          <p style="color: var(--secondary-text-color);">اضغط على زر "كتابة مقال جديد" لنشر أول مقال في مدونتك التقنية.</p>
        </div>
      `;
      return;
    }

    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      const catLabel = article.categoryLabel || articleCategoryLabels[article.category] || article.category;
      const imgSrc = article.image || 'images/blog2.jpg';

      card.innerHTML = `
        <div class="admin-card-img" style="height: 18rem; position: relative; overflow: hidden; border-radius: 1.2rem; margin-bottom: 1.4rem;">
          <img src="${imgSrc}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/blog2.jpg'">
          <span class="badge-tag" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.65); color: #fff; backdrop-filter: blur(4px); font-size: 1.2rem;">${catLabel}</span>
        </div>
        <div class="admin-card-body">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 0.6rem; font-size: 1.25rem; color: var(--muted-text-color);">
            <span><i class="far fa-calendar-alt"></i> ${article.date || '2025'}</span>
            <span><i class="far fa-clock"></i> ${article.readingTime || '5 دقائق قراءة'}</span>
          </div>
          <h3 style="font-size: 1.7rem; font-weight: 700; color: var(--primary-text-color); margin-bottom: 0.8rem; line-height: 1.4;">${article.title}</h3>
          <p style="font-size: 1.35rem; color: var(--secondary-text-color); line-height: 1.6; margin-bottom: 1.2rem;">${article.excerpt || ''}</p>
          <div style="font-size: 1.25rem; color: var(--accent-color); font-weight: 600; margin-bottom: 1rem;">
            <i class="fas fa-pen-nib"></i> ${article.author || 'عبدالرحمن عادل الشجاع'}
          </div>
        </div>
        <div class="admin-card-actions" style="border-top: 1px solid var(--card-border); padding-top: 1.2rem; display: flex; gap: 1rem;">
          <button class="btn btn-sm btn-subtle edit-article-btn" data-id="${article.id}"><i class="fas fa-edit"></i> تعديل المقال</button>
          <button class="btn btn-sm btn-danger-outline delete-article-btn" data-id="${article.id}"><i class="fas fa-trash"></i> حذف</button>
        </div>
      `;

      articlesListContainer.appendChild(card);
    });

    document.querySelectorAll('.edit-article-btn').forEach(btn => {
      btn.addEventListener('click', () => editArticle(btn.dataset.id));
    });

    document.querySelectorAll('.delete-article-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteArticle(btn.dataset.id));
    });
  }

  if (openAddArticleModalBtn) {
    openAddArticleModalBtn.addEventListener('click', () => {
      articleAdminForm.reset();
      document.getElementById('articleAdminId').value = '';
      document.getElementById('articleAdminModalTitle').innerHTML = '<i class="fas fa-newspaper"></i> كتابة مقال تقني جديد';
      document.getElementById('articleAdminAuthor').value = 'عبدالرحمن عادل الشجاع';
      document.getElementById('articleAdminDate').value = '2025';
      document.getElementById('articleAdminReadingTime').value = '5 دقائق قراءة';
      const tagsInput = document.getElementById('articleAdminTags');
      if (tagsInput) tagsInput.value = 'ذكاء_اصطناعي, بايثون, علم_البيانات';
      const linkInput = document.getElementById('articleAdminLink');
      if (linkInput) linkInput.value = '';
      document.getElementById('articleAdminImage').value = 'images/blog2.jpg';
      if (articleDropZone && articleDropZone._clearUpload) {
        articleDropZone._clearUpload();
      }
      openModal('articleAdminModal');
    });
  }

  function editArticle(id) {
    const article = DataStore.getArticleById(id);
    if (!article) return;

    document.getElementById('articleAdminId').value = article.id;
    document.getElementById('articleAdminTitle').value = article.title;
    document.getElementById('articleAdminCategory').value = article.category || 'data-ai';
    document.getElementById('articleAdminAuthor').value = article.author || 'عبدالرحمن عادل الشجاع';
    document.getElementById('articleAdminDate').value = article.date || '2025';
    document.getElementById('articleAdminReadingTime').value = article.readingTime || '5 دقائق قراءة';
    const tagsInput = document.getElementById('articleAdminTags');
    if (tagsInput) {
      tagsInput.value = (article.tags || []).map(t => t.replace('#', '')).join(', ');
    }
    const linkInput = document.getElementById('articleAdminLink');
    if (linkInput) {
      linkInput.value = article.link || article.url || '';
    }
    document.getElementById('articleAdminExcerpt').value = article.excerpt || '';
    document.getElementById('articleAdminBody').value = article.body || '';

    const imgVal = article.image || 'images/blog2.jpg';
    document.getElementById('articleAdminImage').value = imgVal;
    if (articleDropZone && articleDropZone._showPreview) {
      articleDropZone._showPreview(imgVal, 'الغلاف المحفوظ', 'صورة حالية');
    }

    document.getElementById('articleAdminModalTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل المقال التقني';
    openModal('articleAdminModal');
  }

  function deleteArticle(id) {
    if (confirm('هل أنت متأكد من حذف هذا المقال من المدونة؟')) {
      DataStore.deleteArticle(id);
      showToast('تم حذف المقال بنجاح', 'success');
      renderArticles();
      updateStats();
    }
  }

  if (articleAdminForm) {
    articleAdminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const catVal = document.getElementById('articleAdminCategory').value;
      const rawTags = (document.getElementById('articleAdminTags')?.value || '').trim();
      const tagsList = rawTags
        ? rawTags.split(/[,،\s]+/).filter(Boolean).map(t => t.startsWith('#') ? t : '#' + t)
        : ['#مقال_تقني'];

      const bodyVal = document.getElementById('articleAdminBody').value.trim();
      let excerptVal = document.getElementById('articleAdminExcerpt').value.trim();
      if (!excerptVal) {
        // Strip HTML tags for clean excerpt
        const plainText = bodyVal.replace(/<[^>]*>?/gm, '');
        excerptVal = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
      }

      const articleData = {
        id: document.getElementById('articleAdminId').value || null,
        title: document.getElementById('articleAdminTitle').value.trim(),
        category: catVal,
        categoryLabel: articleCategoryLabels[catVal] || 'مقال تقني',
        tags: tagsList,
        author: document.getElementById('articleAdminAuthor').value.trim(),
        date: document.getElementById('articleAdminDate').value.trim(),
        readingTime: document.getElementById('articleAdminReadingTime').value.trim(),
        link: (document.getElementById('articleAdminLink')?.value || '').trim(),
        image: document.getElementById('articleAdminImage').value || 'images/blog2.jpg',
        excerpt: excerptVal,
        body: bodyVal
      };

      DataStore.saveArticle(articleData);
      showToast('تم نشر وحفظ المقال بنجاح!', 'success');
      closeModal('articleAdminModal');
      renderArticles();
      updateStats();
    });
  }

  // ===================================================================
  // 6. BACKUP & EXPORT / IMPORT
  // ===================================================================
  const exportBtn = document.getElementById('exportDataBtn');
  const importFileInput = document.getElementById('importFileInput');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      DataStore.exportJSON();
      showToast('تم تحميل ملف النسخة الاحتياطية بنجاح!', 'success');
    });
  }

  if (importFileInput) {
    importFileInput.addEventListener('change', () => {
      const file = importFileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const res = DataStore.importJSON(e.target.result);
          if (res.success) {
            showToast('تم استيراد البيانات وتحديث الموقع بنجاح!', 'success');
            loadAllDashboardData();
          } else {
            showToast('خطأ في استيراد البيانات: ' + res.error, 'error');
          }
        };
        reader.readAsText(file);
      }
    });
  }

  // Master Loader
  function loadAllDashboardData() {
    updateStats();
    renderCertificates();
    renderProjects();
    renderSkills();
    renderJourney();
    renderArticles();
  }

  // Initial check
  checkAuth();
});
