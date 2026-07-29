// ═══════════════════════════════════════════════════════
//   PICCHIO QR MENU — APP.JS
//   Main application logic
// ═══════════════════════════════════════════════════════

class PicchioMenu {
  constructor() {
    this.activeCategory = 'specials';
    this.modalOpen = false;
    this.currentItem = null;
    this.particles = null;
    this.touchStartY = 0;

    // Image mapping per category
    this.categoryImages = {
      signature: 'assets/images/signature.png',
      summer:    'assets/images/summer.png',
    };

    this.init();
  }

  init() {
    this.particles = new ParticleSystem('particle-canvas');
    this.renderCategories();
    this.renderItems(this.activeCategory);
    this.bindModalEvents();
    this.bindKeyboard();
    this.animateEntrance();
  }

  // ─── Category Tabs ──────────────────────────────── //
  renderCategories() {
    const container = document.getElementById('category-tabs');
    if (!container) return;

    container.innerHTML = MENU_DATA.categories.map(cat => `
      <button
        class="cat-tab ${cat.id === this.activeCategory ? 'active' : ''}"
        data-cat="${cat.id}"
        id="tab-${cat.id}"
        aria-selected="${cat.id === this.activeCategory}"
      >
        <span class="cat-icon">${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join('');

    container.querySelectorAll('.cat-tab').forEach(btn => {
      btn.addEventListener('click', () => this.switchCategory(btn.dataset.cat));
    });
  }

  switchCategory(catId) {
    if (catId === this.activeCategory) return;
    this.activeCategory = catId;

    // Update tabs
    document.querySelectorAll('.cat-tab').forEach(btn => {
      const isActive = btn.dataset.cat === catId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    // Animate out → render → animate in
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';

    setTimeout(() => {
      this.renderItems(catId);
      // Update section header
      const cat = MENU_DATA.categories.find(c => c.id === catId);
      if (cat) {
        const title = document.getElementById('section-title');
        const num   = document.getElementById('section-num');
        const sub   = document.getElementById('section-sub');
        const idx   = MENU_DATA.categories.findIndex(c => c.id === catId);
        if (title) title.innerHTML = this.formatTitle(cat.en);
        if (num)   num.textContent = `0${idx + 1}`;
        if (sub)   sub.textContent = this.getCategorySubtitle(catId);
      }
      grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, 220);
  }

  formatTitle(title) {
    const words = title.split(' ');
    if (words.length === 1) return `<strong>${title}</strong>`;
    const last = words.pop();
    return `${words.join(' ')}<br><strong>${last}</strong>`;
  }

  getCategorySubtitle(catId) {
    const subs = {
      specials:   'İmza İçecekler • Özel Formüller • 2026',
      classic:    'Timeless Classics • Zamansız Lezzet',
      whiskey:    'Premium Distilleries • Seçkin Damıtıklar',
      votka:      'Premium Vodka Seçkisi • Arı & Smooth',
      gin:        "Botanik Gin's & Karayip Rom'ları",
      bira:       'Craft & Premium • Dünya Biracılığı',
      sarap:      'Şarap Dünyası • Kadeh & Şişe',
      likorler:   'İtalyan & İrlanda • Likör Şöleni',
      sicakkahve: 'Alkollü Sıcak Kahve • Kış Keyfi',
      shots:      "Bar Shot's • Tek Yudumda",
      kahve:      'Specialty Coffee • Barista Sanatı',
      alkolsuz:   'Alkolsüz Mokteyl • Sıfır Alkol Tam Tat',
      soft:       'Soft Drinks • Serinletici Seçenekler',
      yemek:      'Mutfaktan Sofraya • Yemek & Çerez',
      happyhour:  '1+1 Teklifler • Her Gün Farklı Kampanya'
    };
    return subs[catId] || '';
  }

  // ─── Product Grid ────────────────────────────────── //
  renderItems(catId) {
    const container = document.getElementById('product-grid');
    if (!container) return;

    // Show/hide summer banner
    const banner = document.getElementById('summer-banner');
    if (banner) banner.style.display = catId === 'specials' || catId === 'happyhour' ? 'flex' : 'none';

    // Show/hide happy hour banner
    const hhBanner = document.getElementById('happyhour-banner');
    if (hhBanner) hhBanner.style.display = catId === 'happyhour' ? 'flex' : 'none';

    const items = MENU_DATA.items[catId] || [];

    if (!items.length) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon">✦</div>
          <p style="color:var(--text-muted);font-family:var(--font-body)">Yakında eklenecek</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((item, i) => this.renderCard(item, i)).join('');

    // Bind click events
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const found = items.find(it => it.id === id);
        if (found) this.openModal(found);
      });
    });
  }

  renderCard(item, index) {
    // Map item image categories
    const imgMap = {
      signature: 'assets/images/signature.png',
      summer:    'assets/images/summer.png',
      hero:      'assets/images/hero.png',
    };
    const imgSrc = imgMap[item.imgCategory] || imgMap.signature;
    const tagsHtml = item.tags.map(t =>
      `<span class="tag tag-${t.type}">${t.label}</span>`
    ).join('');

    const delay = Math.min(index * 80, 600);

    return `
      <article
        class="product-card"
        data-id="${item.id}"
        style="animation-delay:${delay}ms"
        role="button"
        tabindex="0"
        aria-label="${item.name} - ${item.price}"
      >
        <div class="card-img-wrap">
          <img
            src="${imgSrc}"
            alt="${item.name}"
            class="card-img"
            loading="lazy"
          />
          <div class="card-img-overlay"></div>
          <span class="card-num">${item.num}</span>
          <div class="card-tags">${tagsHtml}</div>
        </div>
        <div class="card-body">
          <h3 class="card-name">${item.name}</h3>
          <p class="card-ingredients">${item.ingredients.join(' · ')}</p>
          <div class="card-footer">
            <span class="card-price">${item.price}</span>
            <span class="card-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </article>
    `;
  }

  // ─── Modal ───────────────────────────────────────── //
  openModal(item) {
    this.currentItem = item;
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    const imgMap = {
      signature: 'assets/images/signature.png',
      summer:    'assets/images/summer.png',
      hero:      'assets/images/hero.png',
    };
    const imgSrc = imgMap[item.imgCategory] || imgMap.signature;

    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-img').alt = item.name;
    document.getElementById('modal-num').textContent = item.num;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-desc').textContent = item.desc;
    document.getElementById('modal-price').textContent = item.price;
    document.getElementById('modal-allergens').textContent = item.allergens;

    const chipsContainer = document.getElementById('modal-ingredients');
    chipsContainer.innerHTML = item.ingredients
      .map(ing => `<span class="ingredient-chip">${ing}</span>`)
      .join('');

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = item.tags
      .map(t => `<span class="tag tag-${t.type}">${t.label}</span>`)
      .join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.modalOpen = true;
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    this.modalOpen = false;
    this.currentItem = null;
  }

  bindModalEvents() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    if (!overlay) return;

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    // Touch swipe down to close
    const modal = overlay.querySelector('.modal');
    if (modal) {
      modal.addEventListener('touchstart', (e) => {
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });

      modal.addEventListener('touchend', (e) => {
        const deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (deltaY > 80) this.closeModal();
      }, { passive: true });
    }
  }

  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOpen) this.closeModal();

      // Arrow keys for category navigation
      if (!this.modalOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const cats = MENU_DATA.categories;
        const idx  = cats.findIndex(c => c.id === this.activeCategory);
        const next = e.key === 'ArrowRight'
          ? Math.min(idx + 1, cats.length - 1)
          : Math.max(idx - 1, 0);
        if (next !== idx) this.switchCategory(cats[next].id);
      }
    });
  }

  // ─── Entrance Animation ───────────────────────────── //
  animateEntrance() {
    const els = document.querySelectorAll('.anim-entrance');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }
}

// ─── QR Code Generator (inline, no library) ──────────── //
function generateQRPlaceholder(containerId) {
  // Creates a decorative placeholder; real QR via URL can replace
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="none"/>
      <!-- Corner squares -->
      <rect x="2" y="2" width="22" height="22" rx="2" fill="none" stroke="#C9A96E" stroke-width="2"/>
      <rect x="6" y="6" width="14" height="14" rx="1" fill="#C9A96E" opacity="0.6"/>
      <rect x="56" y="2" width="22" height="22" rx="2" fill="none" stroke="#C9A96E" stroke-width="2"/>
      <rect x="60" y="6" width="14" height="14" rx="1" fill="#C9A96E" opacity="0.6"/>
      <rect x="2" y="56" width="22" height="22" rx="2" fill="none" stroke="#C9A96E" stroke-width="2"/>
      <rect x="6" y="60" width="14" height="14" rx="1" fill="#C9A96E" opacity="0.6"/>
      <!-- Data dots pattern -->
      ${generateQRDots()}
    </svg>
  `;
}

function generateQRDots() {
  const dots = [];
  const positions = [
    [30,6],[36,6],[42,6],[48,6],[30,12],[42,12],[48,12],
    [30,18],[36,18],[42,18],[30,24],[36,24],[48,24],
    [6,30],[12,30],[18,30],[24,30],[42,30],[54,30],[60,30],[66,30],[72,30],
    [6,36],[18,36],[30,36],[42,36],[54,36],[66,36],
    [6,42],[12,42],[24,42],[36,42],[48,42],[60,42],[72,42],
    [6,48],[18,48],[30,48],[42,48],[54,48],[66,48],
    [30,54],[36,54],[48,54],[60,54],[72,54],
    [30,60],[42,60],[54,60],[66,60],[72,60],
    [36,66],[42,66],[54,66],[60,66],
    [30,72],[42,72],[48,72],[60,72],[66,72],
  ];
  return positions.map(([x,y]) =>
    `<rect x="${x}" y="${y}" width="4" height="4" rx="0.5" fill="#C9A96E" opacity="${0.4 + Math.random() * 0.5}"/>`
  ).join('');
}

// ─── Firestore Data Loading ───────────────────────────── //
async function loadMenuData() {
  // Check if Firebase settings indicate local fallback only
  if (typeof FIREBASE_SETTINGS !== 'undefined' && FIREBASE_SETTINGS.useLocalFallbackOnly) {
    console.log("Using local menu data (fallback active).");
    return;
  }

  // Check if firebase is available
  if (typeof firebase === 'undefined' || typeof firebaseConfig === 'undefined') {
    console.warn("Firebase SDK not loaded or config missing. Using local menu data.");
    return;
  }

  // Check config keys
  if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.warn("Firebase configuration is set to default placeholders. Using local menu data.");
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();
    
    console.log("Attempting to fetch menu data from Firestore...");
    const docPath = FIREBASE_SETTINGS.documentPath || "menu/data";
    const docRef = db.doc(docPath);
    
    // Set a timeout of 5 seconds for Firestore fetch
    const fetchPromise = docRef.get();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore fetch timeout")), 5000)
    );

    const doc = await Promise.race([fetchPromise, timeoutPromise]);

    if (doc.exists) {
      const data = doc.data();
      if (data && data.categories && data.items) {
        window.MENU_DATA = data;
        console.log("Menu data successfully loaded from Firestore.");
      } else {
        console.warn("Firestore document found but structure is invalid. Using local fallback.");
      }
    } else {
      console.warn(`Firestore document at path '${docPath}' does not exist. Using local fallback.`);
    }
  } catch (error) {
    console.error("Failed to load menu data from Firestore:", error);
    console.log("Falling back to local menu-data.js.");
  }
}

// ─── Boot ─────────────────────────────────────────────── //
document.addEventListener('DOMContentLoaded', () => {
  loadMenuData().then(() => {
    // Hide loader
    const loader = document.getElementById('firestore-loader');
    if (loader) {
      loader.classList.add('fade-out');
    }
    const app = new PicchioMenu();
    generateQRPlaceholder('qr-code');
  });

  // Scroll progress indicator
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const bar = document.getElementById('scroll-bar');
    if (bar) bar.style.width = `${scrolled * 100}%`;
  });
});
