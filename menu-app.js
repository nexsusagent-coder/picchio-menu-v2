const state = {
  payload: null,
  path: [],
};

const stage      = document.querySelector("[data-flow-stage]");
const breadcrumb = document.querySelector("[data-flow-breadcrumb]");
const siblings   = document.querySelector("[data-flow-siblings]");
const subtitle   = document.querySelector("[data-flow-subtitle]");
const shell      = document.querySelector(".menu-flow-shell");

/* ─── Yardımcı fonksiyonlar ─── */
function applyConfigurableText(id, value, visible = true) {
  const el = document.getElementById(id);
  if (!el) return;

  const shouldShow =
    visible !== false &&
    typeof value === "string" &&
    value.length > 0;

  el.textContent = typeof value === "string" ? value : "";
  el.hidden = !shouldShow;
  el.style.display = shouldShow ? "" : "none";
}

const scrollToMenuTop = () => {
  document.querySelector(".menu-flow-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Restoran kısmı yok — direkt kategorilere gir
const rootNodes = () => state.payload?.categories || [];

/* ─── History API entegrasyonu ─── */
const currentHistoryPath = () => {
  const path = history.state?.menuPath;
  return Array.isArray(path) ? path.map(String) : [];
};

const writeHistory = (mode = "push") => {
  const payload = { ...(history.state || {}), menuPath: [...state.path] };
  const url = `${window.location.pathname}${window.location.search}`;
  const method = mode === "replace" ? "replaceState" : "pushState";
  history[method](payload, "", url);
};

const setMenuPath = (path, options = {}) => {
  const { historyMode = "push", scroll = true } = options;
  state.path = path.map(String);
  render();
  writeHistory(historyMode);
  if (scroll) scrollToMenuTop();
};

/* ─── Ağaç yapısında düğüm bulma ─── */
const findNode = (nodes, id) => {
  for (const node of nodes) {
    if (String(node.id) === String(id)) return node;
    const found = findNode(node.children || [], id);
    if (found) return found;
  }
  return null;
};

const selectedNodes = () => {
  const nodes = [];
  let currentNodes = rootNodes();
  for (const id of state.path) {
    const node = currentNodes.find((item) => String(item.id) === String(id));
    if (!node) break;
    nodes.push(node);
    currentNodes = node.children || [];
  }
  return nodes;
};

const currentNode  = () => selectedNodes().at(-1) || null;
const visibleChildren = () => {
  const node = currentNode();
  return node ? node.children || [] : rootNodes();
};
const visibleItems = () => {
  const node = currentNode();
  return node ? node.items || [] : [];
};

const siblingNodes = () => {
  if (!state.path.length) return [];
  const parentPath = state.path.slice(0, -1);
  let nodes = rootNodes();
  for (const id of parentPath) {
    const node = nodes.find((item) => String(item.id) === String(id));
    if (!node) return [];
    nodes = node.children || [];
  }
  return nodes;
};

/* ═══════════════════════════════════════════
   RENDER FONKSİYONLARI
   ═══════════════════════════════════════════ */

/* ─── Çift dil başlık ─── */
const renderNodeName = (node, className = "dual-title") => `
  <span class="${className}">
    <span>${node.name}</span>
    ${node.titleEn ? `<em>${node.titleEn}</em>` : ""}
  </span>
`;

const nodeText = (node) => (node.titleEn ? `${node.name} / ${node.titleEn}` : node.name);

/* ─── Açıklama (TR/EN) ─── */
const renderDescription = (item) => {
  const tr = item.description || "";
  const en = item.descriptionEn || "";
  if (!tr && !en) return "";
  return `
    <div class="menu-description">
      ${tr ? `<p class="menu-desc-tr">${tr}</p>` : ""}
      ${en ? `<p class="menu-desc-en">${en}</p>` : ""}
    </div>
  `;
};

/* ─── Tat notları (şarap üzüm çeşidi vb.) ─── */
const renderTastesLike = (item) => {
  const values = (item.tastesLike || []).map((v) => String(v || "").trim()).filter(Boolean);
  if (!values.length) return "";
  return `
    <div class="menu-taste-notes" aria-label="Tat ve stil bilgisi">
      <div>${values.map((v) => `<b>${v}</b>`).join("")}</div>
    </div>
  `;
};

/* ─── Alerjen meta verileri ─── */
const allergenMeta = {
  milk:      { label: "Süt",             icon: "droplet" },
  gluten:    { label: "Gluten",          icon: "wheat" },
  egg:       { label: "Yumurta",         icon: "egg" },
  fish:      { label: "Balık",           icon: "fish" },
  shellfish: { label: "Kabuklu deniz ürünü", icon: "shell" },
  tree_nuts: { label: "Kuruyemiş",       icon: "nut" },
  peanuts:   { label: "Yer fıstığı",    icon: "nut" },
  sesame:    { label: "Susam",           icon: "seed" },
  soy:       { label: "Soya",           icon: "bean" },
  sulfites:  { label: "Sülfit",         icon: "spark" },
  mustard:   { label: "Hardal",         icon: "seed" },
  celery:    { label: "Kereviz",        icon: "leaf" },
  alcohol:   { label: "Alkol",          icon: "glass" },
};

const tagMeta = {
  vegetarian: { label: "Vejetaryen", icon: "leaf" },
  vegan:      { label: "Vegan",      icon: "leaf" },
  spicy:      { label: "Acılı",      icon: "flame" },
  seafood:    { label: "Deniz ürünü", icon: "fish" },
};

const nutritionLabel = (value, type = "allergen") =>
  (type === "tag" ? tagMeta[value]?.label : allergenMeta[value]?.label) || value;

/* ─── SVG ikon kütüphanesi ─── */
const nutritionIcon = (name) => {
  const icons = {
    droplet:  `<path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10Z"></path>`,
    wheat:    `<path d="M12 3v18"></path><path d="M8 7c2 0 4 1.5 4 4-2 0-4-1.5-4-4Z"></path><path d="M16 7c-2 0-4 1.5-4 4 2 0 4-1.5 4-4Z"></path><path d="M8 13c2 0 4 1.5 4 4-2 0-4-1.5-4-4Z"></path><path d="M16 13c-2 0-4 1.5-4 4 2 0 4-1.5 4-4Z"></path>`,
    egg:      `<path d="M17 14c0 4-2.5 7-5 7s-5-3-5-7 2.2-11 5-11 5 7 5 11Z"></path>`,
    fish:     `<path d="M4 12s4-6 10-3c2 1 3 3 6 3-3 0-4 2-6 3-6 3-10-3-10-3Z"></path><path d="M4 12l-2-3v6l2-3Z"></path><circle cx="14" cy="11" r=".7"></circle>`,
    shell:    `<path d="M4 18c1-6 4-11 8-14 4 3 7 8 8 14H4Z"></path><path d="M12 4v14"></path><path d="M7 18c1-4 2.5-7.5 5-14"></path><path d="M17 18c-1-4-2.5-7.5-5-14"></path>`,
    nut:      `<path d="M8 12c0-5 3-8 6-8 2 0 4 2 4 5 0 6-4 11-8 11-2 0-4-2-4-5 0-1 .5-2 2-3Z"></path><path d="M10 8c2 1 4 1 6 0"></path>`,
    seed:     `<path d="M12 4c4 3 5 7 2 10-2 2-5 2-7 0 0-4 2-8 5-10Z"></path><path d="M8 18c3 1 6 1 8 0"></path>`,
    bean:     `<path d="M8 13c-2-3-1-7 2-9 4 1 7 4 7 8 0 4-3 7-7 7-3 0-5-3-2-6Z"></path>`,
    spark:    `<path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"></path>`,
    leaf:     `<path d="M5 19c9 0 14-5 14-14-9 0-14 5-14 14Z"></path><path d="M5 19c3-5 7-8 12-10"></path>`,
    glass:    `<path d="M8 3h8l-1 8a3 3 0 0 1-6 0L8 3Z"></path><path d="M12 14v7"></path><path d="M9 21h6"></path>`,
    flame:    `<path d="M12 21c-3 0-6-2-6-6 0-3 2-5 4-7 0 2 1 3 2 4 1-3 0-6 3-9 2 3 4 6 4 10 0 5-3 8-7 8Z"></path>`,
    bolt:     `<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z"></path>`,
    chevron:  `<path d="m6 9 6 6 6-6"></path>`,
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
};

/* ─── Alerjen ikon chip'i ─── */
const renderIconChip = (value, type = "allergen", variant = "") => {
  const meta = type === "tag" ? tagMeta[value] : allergenMeta[value];
  const label = nutritionLabel(value, type);
  const icon = meta?.icon || "spark";
  return `<span class="nutrition-icon ${variant}" tabindex="0" role="img" aria-label="${label}" data-tooltip="${label}">${nutritionIcon(icon)}</span>`;
};

/* ─── Makro chip'i (Kalori, Protein vb.) ─── */
const renderMacroChip = (icon, label, value) => `
  <b class="nutrition-macro-chip">
    ${nutritionIcon(icon)}
    <span>${label}</span>
    <em>${value}</em>
  </b>
`;

/* ─── Besin & alerjen paneli (accordion) ─── */
const renderNutrition = (item) => {
  const n = item.nutrition || {};

  const macros = [
    n.caloriesKcal ? renderMacroChip("flame", "Kalori", `${n.caloriesKcal} kcal`) : "",
    n.proteinG != null ? renderMacroChip("bolt", "Protein", `${n.proteinG}g`) : "",
    n.carbsG != null ? renderMacroChip("wheat", "Karb.", `${n.carbsG}g`) : "",
    n.fatG != null ? renderMacroChip("droplet", "Yağ", `${n.fatG}g`) : "",
  ].filter(Boolean);

  const allergens = (n.allergens || []).slice(0, 6);
  const mayContain = (n.mayContain || []).slice(0, 4);

  const hasData = macros.length || allergens.length || mayContain.length || n.portionNote;

  return `
    <div class="nutrition-panel" data-nutrition-panel>
      <button class="nutrition-summary" type="button" data-nutrition-toggle aria-expanded="false">
        <span class="nutrition-summary-title">${nutritionIcon("spark")} Besin & Alerjen</span>
        <span class="nutrition-summary-angle">${nutritionIcon("chevron")}</span>
      </button>
      <div class="nutrition-content" hidden>
        ${hasData ? `
          ${n.portionNote ? `<p class="nutrition-serving-basis">Ölçü: ${n.portionNote}</p>` : ""}
          ${macros.length ? `<div class="nutrition-macros">${macros.join("")}</div>` : ""}
          ${allergens.length ? `<div class="nutrition-tags nutrition-icons"><span>Alerjen</span>${allergens.map((v) => renderIconChip(v)).join("")}</div>` : ""}
          ${mayContain.length ? `<div class="nutrition-tags nutrition-icons"><span>Eser miktarda</span>${mayContain.map((v) => renderIconChip(v, "allergen", "is-muted")).join("")}</div>` : ""}
        ` : `
          <p class="nutrition-serving-basis">Bu ürün için henüz besin ve alerjen bilgisi girilmemiştir.</p>
        `}
      </div>
    </div>
  `;
};

/* ─── Set menü başlığı ─── */
const renderSetHeader = (node) => {
  if (!node?.sideText) return "";
  const groupNote = node.name?.toLowerCase().includes("fix")
    ? {
        tr: "Fix menülerimiz, minimum 10 kişilik misafir grupları için sunulmaktadır.",
        en: "Our set menus are served for guest groups of at least 10 people.",
      }
    : null;

  return `
    <div class="menu-set-header">
      <div>
        ${renderNodeName(node, "menu-set-title")}
        ${node.insideNote ? `<p>${node.insideNote}</p>` : ""}
        ${groupNote ? `<p class="menu-set-note">${groupNote.tr}<em>${groupNote.en}</em></p>` : ""}
      </div>
      <strong>${node.sideText}</strong>
    </div>
  `;
};

/* ═══════════════════════════════════════════
   SIBLING NAVİGASYONU
   ═══════════════════════════════════════════ */
const updateSiblingRailState = () => {
  if (!siblings) return;
  const track = siblings.querySelector("[data-sibling-track]");
  if (!track) return;
  const isScrollable = track.scrollWidth > track.clientWidth + 2;
  siblings.classList.toggle("is-scrollable", isScrollable);
};

const centerActiveSibling = () => {
  if (!siblings) return;
  const track = siblings.querySelector("[data-sibling-track]");
  const active = siblings.querySelector("[data-sibling-node].is-active");
  if (!track || !active) return;
  const targetLeft = active.offsetLeft - (track.clientWidth - active.offsetWidth) / 2;
  track.scrollTo({ left: Math.max(0, targetLeft), behavior: "auto" });
};

/* ═══════════════════════════════════════════
   ANA RENDER FONKSİYONLARI
   ═══════════════════════════════════════════ */

const renderBreadcrumb = () => {
  const nodes = selectedNodes();
  const parts = [
    `<button type="button" data-depth="0">Ana Menü</button>`,
    ...nodes.map((node, i) => {
      const depth = i + 1;
      const isLast = i === nodes.length - 1;
      return isLast
        ? `<span>${node.name}</span>`
        : `<button type="button" data-depth="${depth}">${node.name}</button>`;
    }),
  ];
  breadcrumb.innerHTML = parts.join(`<i data-lucide="chevron-right" aria-hidden="true"></i>`);
};

const renderSiblings = () => {
  const nodes = siblingNodes();
  const currentId = state.path.at(-1);

  if (!siblings || nodes.length <= 1) {
    if (siblings) siblings.innerHTML = "";
    return;
  }

  siblings.innerHTML = `
    <div class="flow-siblings-head">
      <span class="flow-siblings-label">Aynı bölümde</span>
      <div class="flow-siblings-actions">
        <button type="button" data-sibling-scroll="-1" aria-label="Önceki kategoriler">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
        </button>
        <button type="button" data-sibling-scroll="1" aria-label="Sonraki kategoriler">
          <i data-lucide="chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="flow-siblings-track" data-sibling-track>
      ${nodes.map((node) => `
        <button class="${String(node.id) === String(currentId) ? "is-active" : ""}" type="button" data-sibling-node="${node.id}">
          ${renderNodeName(node, "flow-sibling-title")}
        </button>
      `).join("")}
    </div>
  `;

  requestAnimationFrame(() => {
    updateSiblingRailState();
    centerActiveSibling();
  });
};

/* ─── Kategori seçim adımı ─── */
const renderChoiceStep = () => {
  if (shell) shell.dataset.flowMode = "choice";
  const node = currentNode();
  const children = visibleChildren();
  const label = node ? node.name : "Ana Menü";

  if (subtitle) {
    subtitle.textContent = node
      ? `${label} içinden bir bölüm seçin.`
      : "Görüntülemek istediğiniz kategoriyi seçin.";
  }

  stage.className = "flow-stage flow-choice-grid";
  stage.innerHTML = children.map((child) => {
    const itemCount = (child.items || []).length;
    const childCount = (child.children || []).length;
    const countText = childCount ? `${childCount} bölüm` : `${itemCount} ürün`;
    return `
      <button class="flow-choice-card scroll-reveal" type="button" data-node="${child.id}">
        <span class="flow-choice-parent">${label}</span>
        ${renderNodeName(child, "flow-choice-title")}
        <small class="flow-choice-meta">${child.sideText ? `${child.sideText} · ` : ""}${countText}</small>
      </button>
    `;
  }).join("");
};

/* ─── Ürün listesi adımı ─── */
const renderItemsStep = () => {
  if (shell) shell.dataset.flowMode = "items";
  const node = currentNode();
  const parents = selectedNodes().map((item) => item.name).join(" / ");
  if (subtitle) subtitle.textContent = parents;
  stage.className = "flow-stage lux-menu-grid";

  const items = visibleItems();
  if (!items.length) {
    stage.innerHTML = `<p class="menu-loading">Bu bölümde ürün bulunamadı.</p>`;
    return;
  }

  const itemCards = items.map((item) => {
    const isOutOfStock = item.inStock === false;
    const isDimmed = isOutOfStock && item.stockCardDimmed !== false;
    const isStampEnabled = isOutOfStock && item.stockStampEnabled !== false;

    const rawStockLabel = item.stockLabel !== undefined ? item.stockLabel : "STOKTA YOK";
    const stockLabel = String(rawStockLabel || "").trim();

    const stampTextColor = item.stockStampTextColor || item.stockStampColor || "#C44747";
    const stampBorderColor = item.stockStampBorderColor || item.stockStampColor || "#C44747";
    const stampBgColor = item.stockStampBackgroundColor || "rgba(255,250,247,0.40)";
    const stampOpacity = item.stockStampOpacity !== undefined && item.stockStampOpacity !== null ? Number(item.stockStampOpacity) : 0.52;
    const stampSize = item.stockStampSize || "medium";

    const cardClasses = [
      "lux-menu-card",
      "scroll-reveal",
      item.imageUrl ? "has-image" : "",
      isOutOfStock ? "is-out-of-stock" : "",
      isDimmed ? "is-dimmed" : ""
    ].filter(Boolean).join(" ");

    return `
      <article class="${cardClasses}">
        ${isStampEnabled && stockLabel ? `
        <div class="stock-diagonal-stamp stamp-size-${stampSize}" style="color: ${stampTextColor}; border-color: ${stampBorderColor}; background-color: ${stampBgColor}; opacity: ${stampOpacity};">
          <span>${stockLabel}</span>
        </div>
        ` : ""}
        ${item.imageUrl ? `
        <div class="lux-menu-card-image" data-lightbox-src="${item.imageUrl}" style="cursor: pointer;">
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
        </div>
        ` : ""}
        <div class="lux-menu-card-content">
          <div class="card-header-row">
            ${renderNodeName(node, "menu-card-category")}
            <div class="card-badges">
              ${item.featured ? `<mark>Şefin seçimi</mark>` : ""}
            </div>
          </div>
          <h2>${item.title}</h2>
          ${item.titleEn ? `<em>${item.titleEn}</em>` : ""}
          ${renderDescription(item)}
          ${renderTastesLike(item)}
          <footer>
            ${item.price ? `<strong>${item.price}</strong>` : node?.sideText ? "" : `<strong>Sorunuz</strong>`}
            ${renderNutrition(item)}
          </footer>
        </div>
      </article>
    `;
  }).join("");

  stage.innerHTML = `${renderSetHeader(node)}${itemCards}`;
};

/* ─── Scroll-Reveal IntersectionObserver ─── */
let scrollRevealObserver = null;

const setupScrollReveal = () => {
  if (scrollRevealObserver) scrollRevealObserver.disconnect();

  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    scrollRevealObserver.observe(el);
  });
};

/* ─── Ana render ─── */
const render = () => {
  renderBreadcrumb();
  renderSiblings();
  const children = visibleChildren();
  const items = visibleItems();

  if (children.length || !items.length) {
    renderChoiceStep();
  } else {
    renderItemsStep();
  }

  if (window.lucide) window.lucide.createIcons();

  // Activate scroll-reveal animations
  requestAnimationFrame(setupScrollReveal);
};

/* ═══════════════════════════════════════════
   VERİ YÜKLEME & OLAY DİNLEYİCİLER
   ═══════════════════════════════════════════ */

window.applyGlobalSettings = function(settings) {
  if (!settings) return;

  // 1. Renkler
  if (settings.colors) {
    if (settings.colors.wine) document.documentElement.style.setProperty('--wine', settings.colors.wine);
    if (settings.colors.gold) document.documentElement.style.setProperty('--gold', settings.colors.gold);
  }

  // 1.b Yazı Tipleri (Fonts)
  if (settings.fonts) {
    if (settings.fonts.heading) {
      document.documentElement.style.setProperty('--font-heading', settings.fonts.heading);
      document.documentElement.style.setProperty('--font-display', settings.fonts.heading);
      document.documentElement.style.setProperty('--font-caps', settings.fonts.heading);
    }
    if (settings.fonts.body) {
      document.documentElement.style.setProperty('--font-body', settings.fonts.body);
      document.documentElement.style.setProperty('--font-body-alt', settings.fonts.body);
    }
  }

  // 2. İletişim Numaraları (href güncelleme)
  if (settings.contact) {
    if (settings.contact.whatsapp) {
      document.querySelectorAll('.whatsapp-link, a[href*="wa.me"]').forEach(el => {
        let cleanNum = settings.contact.whatsapp.replace(/[^0-9+]/g, "");
        el.href = `https://wa.me/${cleanNum}`;
      });
    }
    if (settings.contact.phone) {
      document.querySelectorAll('.phone-link, a[href^="tel:"]').forEach(el => {
        let cleanNum = settings.contact.phone.replace(/[^0-9+]/g, "");
        el.href = `tel:${cleanNum}`;
      });
    }
  }


  // 4. Marka
  if (settings.brand) {
    const w1 = settings.brand.word1 || "Picchio";
    const w2 = settings.brand.word2 || "Cocktail";
    const brandHtml = `${w1}<em>${w2}</em>`;
    const hb = document.getElementById("headerBrand");
    if (hb && hb.tagName !== 'IMG') hb.innerHTML = brandHtml;
    if (hb && hb.tagName === 'IMG') hb.alt = `${w1} ${w2}`;
    const fb = document.getElementById("footerBrand");
    if (fb && fb.tagName !== 'IMG') fb.innerHTML = brandHtml;
    if (fb && fb.tagName === 'IMG') fb.alt = `${w1} ${w2}`;
  }

  // 5. Başlıklar & Metinler
  if (settings.texts || settings.visibility) {
    const texts = settings.texts || {};
    const visibility = settings.visibility || {};

    const heroTaglineVal = texts.heroTagline ?? "Premium Cocktail Bar";
    const heroTaglineVis = visibility.heroTagline !== false;
    applyConfigurableText("heroTagline", heroTaglineVal, heroTaglineVis);

    const heroEyebrowVal = texts.heroEyebrow ?? "Dijital Menü";
    const heroEyebrowVis = visibility.heroEyebrow !== false;
    applyConfigurableText("heroEyebrow", heroEyebrowVal, heroEyebrowVis);

    const applyText = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };
    
    applyText("heroTitle", texts.heroTitle);
    applyText("heroSubtitle", texts.heroSubtitle);
    applyText("contactTitle", texts.contactTitle);
    applyText("contactSubtitle", texts.contactSubtitle);
    
    applyText("navMenuDesk", texts.navMenu);
    applyText("navMenuMob", texts.navMenu);
    applyText("footerMenu", texts.navMenu);
    
    applyText("navContactDesk", texts.navContact);
    applyText("navContactMob", texts.navContact);
    applyText("footerContact", texts.navContact);
    
    applyText("navReserveDesk", texts.navReserve);
    applyText("navReserveMob", texts.navReserve);
    
    applyText("loadingText", texts.loadingText);
    applyText("contactWhatsappText", texts.whatsappBtn);
  }
  
  // Ekranda Görünen Telefon Butonu Metni
  if (settings.contact && settings.contact.phone) {
    const pt = document.getElementById("contactPhoneText");
    if (pt) pt.textContent = "Telefon";
  }

  // 3. Konum, Harita ve Çalışma Saatleri Kartları
  if (settings.contact) {
    const addressCard = document.getElementById("contactAddressCard");
    const addressText = document.getElementById("contactAddressText");
    const mapsLink = document.getElementById("contactMapsLink");
    
    if (addressCard) {
      if (settings.contact.address || settings.contact.mapsUrl) {
        addressCard.style.display = "";
        if (addressText) addressText.textContent = settings.contact.address || "Adres belirtilmemiş";
        if (mapsLink) {
          if (settings.contact.mapsUrl) {
            mapsLink.href = settings.contact.mapsUrl;
            mapsLink.style.display = "inline-flex";
          } else if (settings.contact.address) {
            mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.contact.address)}`;
            mapsLink.style.display = "inline-flex";
          } else {
            mapsLink.style.display = "none";
          }
        }
      } else {
        addressCard.style.display = "none";
      }
    }

    const hoursCard = document.getElementById("contactHoursCard");
    const hoursText = document.getElementById("contactWorkingHoursText");
    if (hoursCard) {
      if (settings.contact.workingHours) {
        hoursCard.style.display = "";
        if (hoursText) hoursText.textContent = settings.contact.workingHours;
      } else {
        hoursCard.style.display = "none";
      }
    }
  }

  // 6. Sosyal Medya (Instagram)
  if (settings.social) {
    const ig = document.getElementById("contactInstagram");
    if (ig) {
      if (settings.social.instagram) {
        ig.href = settings.social.instagram;
        ig.style.display = "inline-flex";
      } else {
        ig.style.display = "none";
      }
  // 7. Açılış Görseli / Karşılama Popup'ı
  if (settings.openingPopup) {
    checkAndShowOpeningPopup(settings.openingPopup);
  }

  if (window.lucide) window.lucide.createIcons();
};

function checkAndShowOpeningPopup(popupConfig) {
  if (!popupConfig) return;
  if (popupConfig.enabled === false) return;
  if (!popupConfig.imageUrl || !popupConfig.imageUrl.trim()) return;

  const displayMode = popupConfig.displayMode || "once_per_session";
  const closePosition = popupConfig.closeButtonPosition === "left" ? "left" : "right";
  const imageUrl = popupConfig.imageUrl.trim();
  const popupVersion = popupConfig.updatedAt || popupConfig.version || imageUrl;

  const sessionKey = `picchio_opening_popup_session_${popupVersion}`;
  const dailyKey = `picchio_opening_popup_daily_${popupVersion}`;
  const todayStr = new Date().toISOString().slice(0, 10);

  if (displayMode === "once_per_session") {
    if (sessionStorage.getItem(sessionKey) === "dismissed") {
      return;
    }
  } else if (displayMode === "once_per_day") {
    if (localStorage.getItem(dailyKey) === todayStr) {
      return;
    }
  }

  const existingOverlay = document.getElementById("openingPopupOverlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.id = "openingPopupOverlay";
  overlay.className = "opening-popup-overlay";

  const closeBtnClass = closePosition === "left" ? "opening-popup-close close-left" : "opening-popup-close close-right";

  overlay.innerHTML = `
    <div class="opening-popup-content">
      <button type="button" class="${closeBtnClass}" aria-label="Kapat" id="openingPopupCloseBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img src="${imageUrl}" alt="Açılış Görseli" class="opening-popup-image" id="openingPopupImg" />
    </div>
  `;

  document.body.appendChild(overlay);

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  let closed = false;
  function closePopup() {
    if (closed) return;
    closed = true;
    overlay.remove();
    document.body.style.overflow = prevOverflow || "";
    document.removeEventListener("keydown", handleKeyDown);

    if (displayMode === "once_per_session") {
      sessionStorage.setItem(sessionKey, "dismissed");
    } else if (displayMode === "once_per_day") {
      localStorage.setItem(dailyKey, todayStr);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  const closeBtn = document.getElementById("openingPopupCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("opening-popup-content")) {
      closePopup();
    }
  });

  document.addEventListener("keydown", handleKeyDown);

  const imgEl = document.getElementById("openingPopupImg");
  if (imgEl) {
    imgEl.addEventListener("error", () => {
      closePopup();
    });
  }
}

const API_CACHE_KEY = "picchio_menu_api_cache_v1";

function loadAndRenderMenu(isBackgroundCheck = false) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  fetch("/api/menu", { cache: "no-store", signal: controller.signal })
    .then((r) => {
      clearTimeout(timeoutId);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then((res) => {
      if (res && res.data && res.data.categories && Array.isArray(res.data.categories) && res.data.categories.length > 0) {
        // If background check and version hasn't changed, do nothing
        if (isBackgroundCheck && state.version && state.version === res.version) {
          return;
        }

        const isVersionChanged = state.version && state.version !== res.version;
        state.payload = res.data;
        state.version = res.version;

        try {
          localStorage.setItem(API_CACHE_KEY, JSON.stringify({
            data: res.data,
            version: res.version,
            updatedAt: res.updatedAt
          }));
          // Clean up deprecated keys
          localStorage.removeItem("picchio_menu_cache");
          localStorage.removeItem("picchio_menu_data");
        } catch(e) {}

        if (!isBackgroundCheck || isVersionChanged) {
          if (!isBackgroundCheck) {
            state.path = currentHistoryPath();
          }
          render();
          if (state.payload && state.payload.settings) {
            window.applyGlobalSettings(state.payload.settings);
          }
          if (!isBackgroundCheck) {
            writeHistory("replace");
          }
        }
        return;
      }
      throw new Error("Invalid API payload");
    })
    .catch((err) => {
      clearTimeout(timeoutId);
      if (isBackgroundCheck) return; // Silent failure on background polling

      console.warn("Central API fetch failed or timed out, trying offline cache fallback:", err.message);

      // Try LocalStorage Cache v1
      let cached = null;
      try {
        const storedCache = localStorage.getItem(API_CACHE_KEY);
        if (storedCache) {
          const parsed = JSON.parse(storedCache);
          cached = parsed.data ? parsed.data : parsed;
          if (parsed.version) state.version = parsed.version;
        }
      } catch(e) {}

      if (cached && cached.categories && Array.isArray(cached.categories) && cached.categories.length > 0) {
        state.payload = cached;
        state.path = currentHistoryPath();
        render();
        if (state.payload && state.payload.settings) {
          window.applyGlobalSettings(state.payload.settings);
        }
        writeHistory("replace");
        return;
      }

      // Static menu-data.json fallback
      fetch("menu-data.json")
        .then((r) => r.json())
        .then((fallback) => {
          state.payload = fallback;
          state.path = currentHistoryPath();
          render();
          if (state.payload && state.payload.settings) {
            window.applyGlobalSettings(state.payload.settings);
          }
          writeHistory("replace");
        })
        .catch(() => {
          if (stage) stage.innerHTML = `<p class="menu-loading">Menü yüklenirken hata oluştu. Lütfen sayfayı yenileyin.</p>`;
        });
    });
}

loadAndRenderMenu();

// Background 60s auto-refresh & visibility/focus triggers
setInterval(() => loadAndRenderMenu(true), 60000);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    loadAndRenderMenu(true);
  }
});

window.addEventListener("focus", () => {
  loadAndRenderMenu(true);
});

window.addEventListener("storage", (e) => {
  if (e.key === API_CACHE_KEY) {
    loadAndRenderMenu(true);
  }
});

/* ─── Kategori kart tıklama ─── */
stage.addEventListener("click", (e) => {
  const button = e.target.closest("[data-node]");
  if (!button) return;
  setMenuPath([...state.path, button.dataset.node]);
});

/* ─── Breadcrumb tıklama ─── */
breadcrumb.addEventListener("click", (e) => {
  const button = e.target.closest("[data-depth]");
  if (!button) return;
  const depth = Number(button.dataset.depth);
  setMenuPath(state.path.slice(0, depth));
});

/* ─── Sibling navigasyonu ─── */
siblings.addEventListener("click", (e) => {
  const scrollBtn = e.target.closest("[data-sibling-scroll]");
  if (scrollBtn) {
    const track = siblings.querySelector("[data-sibling-track]");
    if (!track) return;
    const dir = Number(scrollBtn.dataset.siblingScroll);
    track.scrollBy({ left: dir * track.clientWidth * 0.7, behavior: "smooth" });
    requestAnimationFrame(updateSiblingRailState);
    return;
  }

  const btn = e.target.closest("[data-sibling-node]");
  if (!btn) return;
  if (btn.classList.contains("is-active")) return;
  setMenuPath([...state.path.slice(0, -1), btn.dataset.siblingNode], { scroll: false });
});

siblings.addEventListener("scroll", updateSiblingRailState, true);
window.addEventListener("resize", updateSiblingRailState);

/* ─── Besin paneli aç/kapat ─── */
document.addEventListener("click", (e) => {
  const toggle = e.target.closest("[data-nutrition-toggle]");
  if (!toggle) return;

  e.preventDefault();
  const sx = window.scrollX;
  const sy = window.scrollY;
  const panel = toggle.closest("[data-nutrition-panel]");
  const content = panel?.querySelector(".nutrition-content");

  const restoreScroll = () => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(sx, sy);
    document.documentElement.style.scrollBehavior = prev;
  };

  if (panel && content) {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    content.hidden = !isOpen;
  }
  restoreScroll();
  requestAnimationFrame(restoreScroll);
  setTimeout(restoreScroll, 0);
  setTimeout(restoreScroll, 80);
}, true);

/* ─── Tarayıcı geri/ileri butonları ─── */
window.addEventListener("popstate", () => {
  state.path = currentHistoryPath();
  render();
});

/* ═══ LIGHTBOX ═══ */
window.openLightbox = function(src) {
  const lightbox = document.getElementById("imageLightbox");
  const img = document.getElementById("lightboxImage");
  if (!lightbox || !img) return;
  img.src = src;
  lightbox.hidden = false;
};

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("imageLightbox");
  const closeBtn = document.getElementById("lightboxCloseBtn");

  if (lightbox && closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.hidden = true;
      document.getElementById("lightboxImage").src = "";
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.hidden = true;
        document.getElementById("lightboxImage").src = "";
      }
    });
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox-src]");
    if (trigger) {
      window.openLightbox(trigger.dataset.lightboxSrc);
    }
  });
});
