/* ═══════════════════════════════════════════
   ADMIN.JS — Menü Yönetim Paneli
   Tüm CRUD işlemleri, localStorage, import/export
   ═══════════════════════════════════════════ */

const STORAGE_KEY = "picchio_menu_data";
const PASS_KEY    = "picchio_admin_pass";
const DEFAULT_PASS = "admin";

/* ═══ YARDIMCILAR ═══ */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const genId = () => String(Date.now()) + Math.random().toString(36).slice(2, 6);

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ═══ VERİ YÖNETİMİ ═══ */
let menuData = null;
let selectedCatPath = []; // [catId, subCatId, ...]
let editingItemIndex = -1;

let currentItemImage = "";

async function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 800;
        
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function loadData() {
  try {
    const res = await fetch("/api/admin/menu", {
      credentials: "include",
      headers: { "Accept": "application/json" }
    });

    if (res.status === 401) {
      showLogin();
      return;
    }

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.categories) {
        menuData = json.data;
        updatePublishStatus(json.version, json.updatedAt);
        renderTree();
        updateStats();
        return;
      }
    }
  } catch (err) {
    console.warn("Central API load failed, falling back to static/draft data:", err.message);
  }

  // Fallback to static menu-data.json
  try {
    const res = await fetch("menu-data.json");
    menuData = await res.json();
  } catch (err) {
    menuData = { version: Date.now(), categories: [], settings: {} };
  }

  renderTree();
  updateStats();
}

const API_CACHE_KEY = "picchio_menu_api_cache_v1";

function updatePublishStatus(version, updatedAt) {
  const statusEl = document.getElementById("publishStatus");
  if (statusEl) {
    const dateStr = updatedAt ? new Date(updatedAt).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) : '';
    statusEl.textContent = `v${version || 1} • ${dateStr}`;
  }
}

async function saveMenuToCentralApi() {
  if (!menuData || !menuData.categories || menuData.categories.length === 0) {
    alert("Hata: Menü verisi boş olamaz!");
    return;
  }

  const publishBtn = document.getElementById("publishBtn");
  if (publishBtn) {
    publishBtn.disabled = true;
    publishBtn.innerHTML = `<i data-lucide="loader"></i> Kaydediliyor...`;
    if (window.lucide) window.lucide.createIcons();
  }

  try {
    const res = await fetch("/api/admin/menu", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(menuData)
    });

    if (res.status === 401) {
      alert("Oturum süreniz doldu. Lütfen tekrar giriş yapın.");
      showLogin();
      return;
    }

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || ("HTTP " + res.status));
    }

    const updated = await res.json();
    if (updated && updated.data) {
      menuData = updated.data;
      updatePublishStatus(updated.version, updated.updatedAt);

      // Update API cache
      try {
        localStorage.setItem(API_CACHE_KEY, JSON.stringify({
          data: updated.data,
          version: updated.version,
          updatedAt: updated.updatedAt
        }));
      } catch(e) {}

      toast("Değişiklikler kaydedildi ve tüm cihazlarda yayınlandı. ✓");
    }
  } catch (err) {
    alert("Sunucuya ulaşılamadı. Değişiklikler yayınlanmadı: " + err.message);
  } finally {
    if (publishBtn) {
      publishBtn.disabled = false;
      publishBtn.innerHTML = `<i data-lucide="cloud-upload"></i> Değişiklikleri Yayınla`;
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

function saveData() {
  saveMenuToCentralApi();
}

function publishCentralMenu() {
  saveMenuToCentralApi();
}

/* ─── Ağaçta düğüm bulma ─── */
function findNodeByPath(path) {
  let nodes = menuData.categories;
  let node = null;
  for (const id of path) {
    node = nodes.find((n) => String(n.id) === String(id));
    if (!node) return null;
    nodes = node.children || [];
  }
  return node;
}

function findParentNodes(path) {
  if (path.length <= 1) return menuData.categories;
  const parentPath = path.slice(0, -1);
  const parent = findNodeByPath(parentPath);
  return parent ? parent.children || [] : menuData.categories;
}

/* ─── İstatistikleri say ─── */
function countAll(nodes) {
  let cats = 0, items = 0, featured = 0;
  for (const n of nodes) {
    cats++;
    const nodeItems = n.items || [];
    items += nodeItems.length;
    featured += nodeItems.filter((i) => i.featured).length;
    if (n.children?.length) {
      const sub = countAll(n.children);
      cats += sub.cats;
      items += sub.items;
      featured += sub.featured;
    }
  }
  return { cats, items, featured };
}

function updateStats() {
  const { cats, items, featured } = countAll(menuData.categories || []);
  $("#statCategories").textContent = cats;
  $("#statItems").textContent = items;
  $("#statFeatured").textContent = featured;
}

/* ═══ GİRİŞ SİSTEMİ ═══ */
async function initLogin() {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        showAdmin();
        return;
      }
    }
  } catch(e) {
    console.warn("Auth check failed:", e);
  }

  showLogin();

  const loginBtn = $("#loginBtn");
  if (loginBtn) {
    loginBtn.onclick = async () => {
      const passInput = $("#loginPassword");
      const pass = passInput ? passInput.value : "";

      if (!pass) {
        $("#loginError").hidden = false;
        $("#loginError").textContent = "Lütfen şifrenizi girin.";
        return;
      }

      loginBtn.disabled = true;
      loginBtn.textContent = "Giriş Yapılıyor...";

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pass })
        });

        if (passInput) passInput.value = "";

        if (res.ok) {
          showAdmin();
        } else {
          $("#loginError").hidden = false;
          if (res.status === 400) {
            $("#loginError").textContent = "Giriş isteği geçersiz.";
          } else if (res.status === 401) {
            $("#loginError").textContent = "Parola hatalı.";
          } else if (res.status === 403) {
            $("#loginError").textContent = "Bu ortamdan girişe izin verilmiyor.";
          } else if (res.status === 429) {
            $("#loginError").textContent = "Çok fazla giriş denemesi yapıldı. Bir süre bekleyin.";
          } else if (res.status >= 500) {
            $("#loginError").textContent = "Sunucu hatası oluştu.";
          } else {
            $("#loginError").textContent = "Giriş başarısız (" + res.status + ").";
          }
        }
      } catch (err) {
        $("#loginError").hidden = false;
        $("#loginError").textContent = "Sunucuya ulaşılamıyor.";
      } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Giriş Yap";
      }
    };
  }

  $("#loginPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("#loginBtn")?.click();
  });
}

function showLogin() {
  $("#adminShell").style.display = "none";
  $("#adminShell").hidden = true;
  $("#loginShell").style.display = "flex";
  $("#loginShell").hidden = false;
}

function showAdmin() {
  $("#loginShell").style.display = "none";
  $("#loginShell").hidden = true;
  $("#adminShell").style.display = "block";
  $("#adminShell").hidden = false;

  loadData();
  if (window.lucide) window.lucide.createIcons();

  document.getElementById("summerImageFile")?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      currentSummerImage = await compressImage(file);
      const preview = document.getElementById("summerImagePreview");
      preview.src = currentSummerImage;
      preview.style.display = "block";
      document.getElementById("summerImageRemoveBtn").style.display = "block";
    }
  });

  document.getElementById("summerImageRemoveBtn")?.addEventListener("click", () => {
    currentSummerImage = "";
    document.getElementById("summerImageFile").value = "";
    document.getElementById("summerImagePreview").style.display = "none";
    document.getElementById("summerImageRemoveBtn").style.display = "none";
  });

  document.getElementById("happyImageFile")?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      currentHappyImage = await compressImage(file);
      const preview = document.getElementById("happyImagePreview");
      preview.src = currentHappyImage;
      preview.style.display = "block";
      document.getElementById("happyImageRemoveBtn").style.display = "block";
    }
  });

  document.getElementById("happyImageRemoveBtn")?.addEventListener("click", () => {
    currentHappyImage = "";
    document.getElementById("happyImageFile").value = "";
    document.getElementById("happyImagePreview").style.display = "none";
    document.getElementById("happyImageRemoveBtn").style.display = "none";
  });

  // DRAG AND DROP EVENTS
  let draggedPath = null;
  
  document.getElementById("itemImageFile")?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      currentItemImage = await compressImage(file);
      const preview = document.getElementById("itemImagePreview");
      preview.src = currentItemImage;
      preview.style.display = "block";
      document.getElementById("itemImageRemoveBtn").style.display = "block";
    }
  });

  document.getElementById("itemImageRemoveBtn")?.addEventListener("click", () => {
    currentItemImage = "";
    document.getElementById("itemImageFile").value = "";
    document.getElementById("itemImagePreview").style.display = "none";
    document.getElementById("itemImageRemoveBtn").style.display = "none";
  });

  $("#catTree").addEventListener("dragstart", (e) => {
    const node = e.target.closest(".cat-node");
    if (!node) return;
    draggedPath = node.dataset.path;
    e.dataTransfer.effectAllowed = "move";
    node.classList.add("dragging");
  });

  $("#catTree").addEventListener("dragover", (e) => {
    e.preventDefault();
    const node = e.target.closest(".cat-node");
    if (!node) return;
    node.classList.add("drag-over");
  });

  $("#catTree").addEventListener("dragleave", (e) => {
    const node = e.target.closest(".cat-node");
    if (!node) return;
    node.classList.remove("drag-over");
  });

  $("#catTree").addEventListener("dragend", (e) => {
    const node = e.target.closest(".cat-node");
    if (node) node.classList.remove("dragging");
    $$(".cat-node").forEach(el => el.classList.remove("drag-over"));
    draggedPath = null;
  });

  $("#catTree").addEventListener("drop", (e) => {
    e.preventDefault();
    const node = e.target.closest(".cat-node");
    if (!node || !draggedPath) return;
    
    node.classList.remove("drag-over");
    
    const targetPathStr = node.dataset.path;
    if (draggedPath === targetPathStr) return; 

    if (targetPathStr.startsWith(draggedPath + ",")) {
      toast("Kategori kendi alt kategorisine taşınamaz.");
      return;
    }

    moveCategory(draggedPath.split(","), targetPathStr.split(","));
  });

  initAdmin().catch(err => {
    alert("Admin paneli yüklenirken hata oluştu: " + err.message);
  });
}

function moveCategory(sourcePath, targetPath) {
  const sId = sourcePath[sourcePath.length - 1];
  const tId = targetPath[targetPath.length - 1];
  
  let sourceArray = menuData.categories;
  if (sourcePath.length > 1) {
    const p = findNodeByPath(sourcePath.slice(0, -1));
    if (p) sourceArray = p.children || [];
  }
  
  const sIndex = sourceArray.findIndex(c => c.id === sId);
  if (sIndex === -1) return;
  const sourceNode = sourceArray[sIndex];

  const isSibling = sourcePath.slice(0, -1).join(",") === targetPath.slice(0, -1).join(",");
  
  if (isSibling) {
    sourceArray.splice(sIndex, 1);
    const tIndex = sourceArray.findIndex(c => c.id === tId);
    sourceArray.splice(tIndex, 0, sourceNode);
  } else {
    const targetNode = findNodeByPath(targetPath);
    if (!targetNode) return;
    
    sourceArray.splice(sIndex, 1);
    if (!targetNode.children) targetNode.children = [];
    targetNode.children.push(sourceNode);
  }
  
  if (selectedCatPath.join(",").startsWith(sourcePath.join(","))) {
    selectedCatPath = [];
    $("#categoryEditor").hidden = true;
    $("#emptyState").hidden = false;
  }
  
  saveData();
  renderTree();
  toast("Kategori taşındı.");
}

/* ═══ ADMIN BAŞLAT ═══ */
async function initAdmin() {
  await loadData();
  ensureSettings();
  renderTree();
  updateStats();
  initIcons();
  bindEvents();
}

function ensureSettings() {
  if (!menuData.settings) {
    menuData.settings = {};
  }
  if (!menuData.settings.colors) menuData.settings.colors = { wine: "#6b2430", gold: "#c8942f" };
  if (!menuData.settings.contact) menuData.settings.contact = { whatsapp: "+905558928833", phone: "+905558928833", address: "Uncubozköy, 5518. Sk. No:35/A, 45125 Yunusemre/Manisa", mapsUrl: "https://maps.app.goo.gl/v5GvuNbJLZMRkTnV6", workingHours: "Her gün: 12:00 – 02:00" };
  if (!menuData.settings.announcements) {
    menuData.settings.announcements = {
      summerBanner: { active: true, title: "Picchio Signature Kokteyller", text: "Özel formüller, premium malzemeler — her gün taze hazırlanır." },
      happyHour: { active: false, title: "Happy Hour Kampanyaları", text: "1+1 teklifler — her gün farklı kampanya, çift tat tek fiyat!" }
    };
  }
  if (!menuData.settings.brand) menuData.settings.brand = { word1: "Picchio", word2: "Cocktail" };
  if (!menuData.settings.texts) {
    menuData.settings.texts = {
      heroEyebrow: "Dijital Menü",
      heroTitle: "Menü",
      heroSubtitle: "Görüntülemek istediğiniz kategoriyi seçin.",
      loadingText: "Menü hazırlanıyor...",
      navMenu: "Menü",
      navContact: "İletişim",
      navReserve: "Rezervasyon",
      contactTitle: "Rezervasyon & Bilgi",
      contactSubtitle: "İletişim",
      whatsappBtn: "WhatsApp"
    };
  }
  if (!menuData.settings.social) menuData.settings.social = { instagram: "https://www.instagram.com/picchiococktail?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" };
}

function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/* ═══ KATEGORİ AĞACI RENDER ═══ */
function renderTree() {
  const tree = $("#catTree");
  tree.innerHTML = renderNodes(menuData.categories, []);
  initIcons();
}

function renderNodes(nodes, parentPath) {
  return nodes.map((node) => {
    const path = [...parentPath, node.id];
    const pathStr = path.join(",");
    const isActive = selectedCatPath.join(",") === pathStr;
    const itemCount = (node.items || []).length;
    const childCount = (node.children || []).length;
    const countLabel = childCount ? `${childCount}` : `${itemCount}`;

    let html = `
      <div class="cat-node" draggable="true" data-path="${pathStr}">
        <button class="cat-node-btn ${isActive ? "is-active" : ""}" data-path="${pathStr}">
          <i data-lucide="${childCount ? "folder" : "file-text"}"></i>
          <span>${node.name}</span>
          <span class="cat-count">${countLabel}</span>
        </button>
    `;

    if (node.children?.length) {
      html += `<div class="cat-children">${renderNodes(node.children, path)}</div>`;
    }

    html += `</div>`;
    return html;
  }).join("");
}

/* ═══ KATEGORİ SEÇİMİ ═══ */
function selectCategory(path) {
  selectedCatPath = path;
  renderTree();
  renderCategoryEditor();
  updateStats();
}

function renderCategoryEditor() {
  const node = findNodeByPath(selectedCatPath);
  if (!node) {
    $("#categoryEditor").hidden = true;
    $("#settingsEditor").hidden = true;
    $("#emptyState").hidden = false;
    return;
  }

  $("#emptyState").hidden = true;
  $("#settingsEditor").hidden = true;
  $("#categoryEditor").hidden = false;

  // Breadcrumb
  const parents = [];
  for (let i = 1; i <= selectedCatPath.length; i++) {
    const n = findNodeByPath(selectedCatPath.slice(0, i));
    if (n) parents.push(n.name);
  }
  $("#editorBreadcrumb").textContent = parents.join(" › ");
  $("#editorTitle").textContent = node.name;

  // Form doldur
  const form = $("#categoryForm");
  form.name.value = node.name || "";
  form.titleEn.value = node.titleEn || "";
  form.sideText.value = node.sideText || "";
  form.insideNote.value = node.insideNote || "";

  // Ürün listesi
  renderItemsList(node);
}

/* ═══ SİTE AYARLARI ═══ */
function renderSettingsEditor() {
  selectedCatPath = [];
  renderTree();
  $("#emptyState").hidden = true;
  $("#categoryEditor").hidden = true;
  $("#settingsEditor").hidden = false;

  const s = menuData.settings || {};
  const v = s.visibility || {};
  const t = s.texts || {};
  const form = $("#settingsForm");

  if (form.fontPresetSelect) form.fontPresetSelect.value = s.fonts?.preset || "playfair_inter";
  if (form.fontHeadingSelect) form.fontHeadingSelect.value = s.fonts?.heading || "'Playfair Display', Georgia, serif";
  if (form.fontBodySelect) form.fontBodySelect.value = s.fonts?.body || "'Inter', system-ui, sans-serif";
  updateFontPreview();

  form.colorWine.value = s.colors?.wine || "#6b2430";
  form.colorGold.value = s.colors?.gold || "#c8942f";
  
  form.brandWord1.value = s.brand?.word1 || "Picchio";
  form.brandWord2.value = s.brand?.word2 || "Cocktail";

  if ($("#heroTaglineInput")) $("#heroTaglineInput").value = t.heroTagline ?? "Premium Cocktail Bar";
  if ($("#heroTaglineShowCheckbox")) $("#heroTaglineShowCheckbox").checked = v.heroTagline !== false;
  
  if (form.heroEyebrowInput) form.heroEyebrowInput.value = t.heroEyebrow ?? "Dijital Menü";
  if ($("#heroEyebrowShowCheckbox")) $("#heroEyebrowShowCheckbox").checked = v.heroEyebrow !== false;

  form.navMenuInput.value = t.navMenu || "Menü";
  form.navContactInput.value = t.navContact || "İletişim";
  form.navReserveInput.value = t.navReserve || "Rezervasyon";
  form.loadingTextInput.value = t.loadingText || "Menü hazırlanıyor...";
  
  form.heroTitleInput.value = t.heroTitle || "Menü";
  form.heroSubtitleInput.value = t.heroSubtitle || "Görüntülemek istediğiniz kategoriyi seçin.";
  
  form.contactTitleInput.value = t.contactTitle || "Rezervasyon & Bilgi";
  form.contactSubtitleInput.value = t.contactSubtitle || "İletişim";
  form.whatsappBtnInput.value = t.whatsappBtn || "WhatsApp";
  
  form.instagramUrl.value = s.social?.instagram || "";
  
  form.whatsappNum.value = s.contact?.whatsapp || "";
  form.phoneNum.value = s.contact?.phone || "";
  if (form.addressInput) form.addressInput.value = s.contact?.address || "";
  if (form.mapsUrlInput) form.mapsUrlInput.value = s.contact?.mapsUrl || "";
  if (form.workingHoursInput) form.workingHoursInput.value = s.contact?.workingHours || "";
}

const FONT_PRESETS = {
  playfair_inter: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif"
  },
  cormorant_outfit: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Outfit', system-ui, sans-serif"
  },
  cinzel_montserrat: {
    heading: "'Cinzel', Georgia, serif",
    body: "'Montserrat', sans-serif"
  },
  bodoni_jakarta: {
    heading: "'Bodoni Moda', Georgia, serif",
    body: "'Plus Jakarta Sans', sans-serif"
  },
  lora_inter: {
    heading: "'Lora', Georgia, serif",
    body: "'Inter', sans-serif"
  },
  syne_inter: {
    heading: "'Syne', sans-serif",
    body: "'Inter', sans-serif"
  }
};

function updateFontPreview() {
  const hFont = $("#fontHeadingSelect")?.value;
  const bFont = $("#fontBodySelect")?.value;
  const hPreview = $("#fontPreviewHeading");
  const bPreview = $("#fontPreviewBody");
  if (hPreview && hFont) hPreview.style.fontFamily = hFont;
  if (bPreview && bFont) bPreview.style.fontFamily = bFont;
}

/* ═══ KATEGORİ LİSTESİ HELPER ═══ */
function getAllCategoriesFlat(nodes = menuData.categories, currentPathIds = [], currentNames = []) {
  let list = [];
  for (const node of nodes) {
    const pathIds = [...currentPathIds, node.id];
    const names = [...currentNames, node.name];
    list.push({
      path: pathIds,
      pathStr: names.join(" › "),
      id: node.id,
      name: node.name
    });
    if (node.children?.length) {
      list = list.concat(getAllCategoriesFlat(node.children, pathIds, names));
    }
  }
  return list;
}

function populateCategoryOptions(selectElement, currentPath = []) {
  if (!selectElement) return;
  const categories = getAllCategoriesFlat();
  const currentPathStr = currentPath.join(",");
  selectElement.innerHTML = categories.map(cat => {
    const catPathStr = cat.path.join(",");
    const isSelected = catPathStr === currentPathStr ? "selected" : "";
    return `<option value="${catPathStr}" ${isSelected}>${cat.pathStr}</option>`;
  }).join("");
}

function moveItemToCategory(sourcePath, itemIndex, targetPath) {
  const sourceNode = findNodeByPath(sourcePath);
  const targetNode = findNodeByPath(targetPath);
  
  if (!sourceNode || !sourceNode.items?.[itemIndex] || !targetNode) {
    toast("Taşıma işlemi gerçekleştirilemedi.");
    return;
  }
  
  const [item] = sourceNode.items.splice(itemIndex, 1);
  if (!targetNode.items) targetNode.items = [];
  targetNode.items.push(item);
  
  saveData();
  renderCategoryEditor();
  updateStats();
  toast(`"${item.title}" ürünü ${targetNode.name} kategorisine taşındı ✓`);
}

function moveItemOrder(index, direction) {
  const node = findNodeByPath(selectedCatPath);
  if (!node || !node.items) return;
  
  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= node.items.length) return;
  
  const temp = node.items[index];
  node.items[index] = node.items[newIndex];
  node.items[newIndex] = temp;
  
  saveData();
  renderCategoryEditor();
}

let quickMoveItemIndex = -1;

function openQuickMoveModal(index) {
  quickMoveItemIndex = index;
  const node = findNodeByPath(selectedCatPath);
  if (!node || !node.items?.[index]) return;
  
  const item = node.items[index];
  const nameEl = $("#moveModalItemName");
  if (nameEl) nameEl.textContent = `Ürün: ${item.title}`;
  populateCategoryOptions($("#quickMoveCategorySelect"), selectedCatPath);
  $("#moveItemModal").hidden = false;
}

function closeQuickMoveModal() {
  $("#moveItemModal").hidden = true;
  quickMoveItemIndex = -1;
}

function confirmQuickMove() {
  if (quickMoveItemIndex < 0) return;
  const targetPathStr = $("#quickMoveCategorySelect").value;
  const targetPath = targetPathStr.split(",");
  
  if (targetPathStr === selectedCatPath.join(",")) {
    toast("Ürün zaten bu kategoride!");
    closeQuickMoveModal();
    return;
  }
  
  moveItemToCategory(selectedCatPath, quickMoveItemIndex, targetPath);
  closeQuickMoveModal();
}

/* ═══ ÜRÜN LİSTESİ ═══ */
function renderItemsList(node) {
  const items = node.items || [];
  const list = $("#itemsList");
  const count = $("#itemCount");
  count.textContent = `${items.length} ürün`;

  if (!items.length) {
    list.innerHTML = `<div class="items-empty">Bu kategoride henüz ürün yok.</div>`;
    return;
  }

  list.innerHTML = items.map((item, index) => `
    <div class="item-row" draggable="true" data-item-index="${index}">
      <span class="item-drag-handle" title="Sıralamak için sürükleyin"><i data-lucide="grip-vertical"></i></span>
      <div class="item-info">
        <strong>${item.title}</strong>
        <small>${item.titleEn || ""}${item.description ? " — " + item.description.slice(0, 50) + (item.description.length > 50 ? "..." : "") : ""}</small>
      </div>
      ${item.price ? `<span class="item-price">${item.price}</span>` : ""}
      ${item.featured ? `<span class="item-featured">⭐ Öne Çıkan</span>` : ""}
      <div class="item-actions">
        <button class="btn btn-outline btn-xs" data-move-item="up" data-index="${index}" ${index === 0 ? "disabled style='opacity:0.3;cursor:default;'" : ""} title="Yukarı Taşı">
          <i data-lucide="chevron-up"></i>
        </button>
        <button class="btn btn-outline btn-xs" data-move-item="down" data-index="${index}" ${index === items.length - 1 ? "disabled style='opacity:0.3;cursor:default;'" : ""} title="Aşağı Taşı">
          <i data-lucide="chevron-down"></i>
        </button>
        <button class="btn btn-outline btn-xs" data-quick-move-item="${index}" title="Başka Kategoriye Taşı">
          <i data-lucide="folder-output"></i> Taşı
        </button>
        <button class="btn btn-outline btn-xs" data-edit-item="${index}" title="Düzenle">
          <i data-lucide="pencil"></i>
        </button>
        <button class="btn btn-outline btn-xs btn-danger" data-delete-item="${index}" title="Sil">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join("");

  initIcons();
  setupItemDragAndDrop();
}

let draggedItemIndex = null;

function setupItemDragAndDrop() {
  const list = $("#itemsList");
  if (!list || list.dataset.dragBound) return;
  list.dataset.dragBound = "true";

  list.addEventListener("dragstart", (e) => {
    const row = e.target.closest(".item-row");
    if (!row) return;
    draggedItemIndex = Number(row.dataset.itemIndex);
    e.dataTransfer.effectAllowed = "move";
    row.classList.add("dragging");
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const row = e.target.closest(".item-row");
    if (!row) return;
    row.classList.add("drag-over");
  });

  list.addEventListener("dragleave", (e) => {
    const row = e.target.closest(".item-row");
    if (!row) return;
    row.classList.remove("drag-over");
  });

  list.addEventListener("dragend", (e) => {
    const row = e.target.closest(".item-row");
    if (row) row.classList.remove("dragging");
    $$(".item-row").forEach(el => el.classList.remove("drag-over"));
    draggedItemIndex = null;
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const row = e.target.closest(".item-row");
    if (!row || draggedItemIndex === null) return;
    row.classList.remove("drag-over");
    const targetIndex = Number(row.dataset.itemIndex);
    if (draggedItemIndex === targetIndex) return;

    const node = findNodeByPath(selectedCatPath);
    if (!node || !node.items) return;

    const [movedItem] = node.items.splice(draggedItemIndex, 1);
    node.items.splice(targetIndex, 0, movedItem);

    saveData();
    renderCategoryEditor();
    toast("Ürün sırası değiştirildi ✓");
  });
}

/* ═══ ÜRÜN MODAL ═══ */
function openItemModal(item = null, index = -1) {
  editingItemIndex = index;
  const modal = $("#itemModal");
  const form = $("#itemForm");
  const title = $("#modalTitle");

  title.textContent = item ? "Ürünü Düzenle" : "Yeni Ürün";
  modal.hidden = false;

  // Form temizle
  form.reset();
  $$('[name="allergen"]').forEach((cb) => (cb.checked = false));
  currentItemImage = "";
  document.getElementById("itemImagePreview").style.display = "none";
  document.getElementById("itemImageRemoveBtn").style.display = "none";

  populateCategoryOptions($("#itemCategorySelect"), selectedCatPath);

  if (item) {
    form.title.value = item.title || "";
    form.titleEn.value = item.titleEn || "";
    form.description.value = item.description || "";
    form.descriptionEn.value = item.descriptionEn || "";
    form.price.value = item.price || "";
    form.tastesLike.value = (item.tastesLike || []).join(", ");
    form.featured.checked = !!item.featured;

    if ($("#itemInStockCheckbox")) $("#itemInStockCheckbox").checked = item.inStock !== false;
    if ($("#itemStockLabelInput")) $("#itemStockLabelInput").value = item.stockLabel !== undefined ? item.stockLabel : "Stokta Yok";
    
    currentItemImage = item.imageUrl || "";
    if (currentItemImage) {
      document.getElementById("itemImagePreview").src = currentItemImage;
      document.getElementById("itemImagePreview").style.display = "block";
      document.getElementById("itemImageRemoveBtn").style.display = "block";
    } else {
      document.getElementById("itemImagePreview").style.display = "none";
      document.getElementById("itemImageRemoveBtn").style.display = "none";
    }

    if (item.nutrition) {
      form.portionNote.value = item.nutrition.portionNote || "";
      form.caloriesKcal.value = item.nutrition.caloriesKcal || "";
      form.proteinG.value = item.nutrition.proteinG ?? "";
      form.carbsG.value = item.nutrition.carbsG ?? "";
      form.fatG.value = item.nutrition.fatG ?? "";
      form.mayContain.value = (item.nutrition.mayContain || []).join(", ");

      (item.nutrition.allergens || []).forEach((a) => {
        const cb = form.querySelector(`[name="allergen"][value="${a}"]`);
        if (cb) cb.checked = true;
      });
    }
  }
}

function closeItemModal() {
  $("#itemModal").hidden = true;
  editingItemIndex = -1;
}

function saveItem(formData) {
  const node = findNodeByPath(selectedCatPath);
  if (!node) return;

  if (!node.items) node.items = [];

  const tastesLike = formData.tastesLike
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const allergens = $$('[name="allergen"]:checked').map((cb) => cb.value);

  const mayContain = formData.mayContain
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const hasNutrition =
    formData.caloriesKcal || formData.proteinG || formData.carbsG || formData.fatG || allergens.length || formData.portionNote;

  const item = {
    title: formData.title,
    titleEn: formData.titleEn || null,
    description: formData.description || null,
    descriptionEn: formData.descriptionEn || null,
    price: formData.price || null,
    tastesLike,
    featured: formData.featured,
    inStock: formData.inStock !== false,
    stockLabel: formData.stockLabel !== undefined ? formData.stockLabel : "Stokta Yok",
    imageUrl: currentItemImage || null,
    nutrition: hasNutrition
      ? {
          portionNote: formData.portionNote || null,
          caloriesKcal: formData.caloriesKcal ? Number(formData.caloriesKcal) : null,
          proteinG: formData.proteinG ? Number(formData.proteinG) : null,
          carbsG: formData.carbsG ? Number(formData.carbsG) : null,
          fatG: formData.fatG ? Number(formData.fatG) : null,
          allergens,
          mayContain,
        }
      : null,
  };

  const targetPathStr = formData.targetCategoryPath;
  const currentPathStr = selectedCatPath.join(",");

  if (targetPathStr && targetPathStr !== currentPathStr) {
    const targetPath = targetPathStr.split(",");
    const targetNode = findNodeByPath(targetPath);
    if (!targetNode) {
      toast("Hedef kategori bulunamadı!");
      return;
    }
    if (!targetNode.items) targetNode.items = [];
    targetNode.items.push(item);

    if (editingItemIndex >= 0) {
      node.items.splice(editingItemIndex, 1);
    }
    saveData();
    renderCategoryEditor();
    updateStats();
    closeItemModal();
    toast(`Ürün "${targetNode.name}" kategorisine taşındı ✓`);
    return;
  }

  if (editingItemIndex >= 0) {
    node.items[editingItemIndex] = item;
    toast("Ürün güncellendi ✓");
  } else {
    node.items.push(item);
    toast("Yeni ürün eklendi ✓");
  }

  saveData();
  renderCategoryEditor();
  closeItemModal();
}

/* ═══ KATEGORİ CRUD ═══ */
function addCategory(parentPath, name = "Yeni Kategori") {
  const newCat = {
    id: genId(),
    name,
    titleEn: "",
    children: [],
    items: [],
    sideText: null,
    insideNote: null,
  };

  if (parentPath.length === 0) {
    menuData.categories.push(newCat);
  } else {
    const parent = findNodeByPath(parentPath);
    if (!parent) return;
    if (!parent.children) parent.children = [];
    parent.children.push(newCat);
  }

  saveData();
  renderTree();
  updateStats();
  selectCategory([...parentPath, newCat.id]);
  toast("Yeni kategori eklendi ✓");
}

function deleteCategory(path) {
  if (!confirm("Bu kategoriyi ve tüm içeriğini silmek istediğinize emin misiniz?")) return;

  const catId = path[path.length - 1];
  const siblings = findParentNodes(path);
  const index = siblings.findIndex((n) => String(n.id) === String(catId));
  if (index >= 0) {
    siblings.splice(index, 1);
    saveData();
    selectedCatPath = [];
    renderTree();
    renderCategoryEditor();
    updateStats();
    toast("Kategori silindi ✓");
  }
}

function deleteItem(index) {
  if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
  const node = findNodeByPath(selectedCatPath);
  if (!node || !node.items) return;
  node.items.splice(index, 1);
  saveData();
  renderCategoryEditor();
  updateStats();
  toast("Ürün silindi ✓");
}

/* ═══ IMPORT / EXPORT ═══ */
function exportData() {
  const blob = new Blob([JSON.stringify(menuData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `picchio-menu-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("JSON dosyası indirildi ✓");
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.categories && !data.venues) {
        toast("Geçersiz menü dosyası!");
        return;
      }
      // venues formatını categories'e çevir
      if (data.venues && !data.categories) {
        data.categories = data.venues;
        delete data.venues;
      }
      menuData = data;
      saveData();
      selectedCatPath = [];
      renderTree();
      renderCategoryEditor();
      updateStats();
      toast("Menü verisi yüklendi ✓");
    } catch (err) {
      toast("JSON dosyası okunamadı!");
    }
  };
  reader.readAsText(file);
}

/* ═══ OLAY DİNLEYİCİLER ═══ */
function bindEvents() {
  // Kategori ağacı tıklama
  $("#catTree").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-path]");
    if (!btn) return;
    const path = btn.dataset.path.split(",");
    selectCategory(path);
  });

  // Site Ayarları butonu
  $("#siteSettingsBtn").addEventListener("click", renderSettingsEditor);

  // Font Presets & Change events
  $("#fontPresetSelect")?.addEventListener("change", (e) => {
    const val = e.target.value;
    if (FONT_PRESETS[val]) {
      $("#fontHeadingSelect").value = FONT_PRESETS[val].heading;
      $("#fontBodySelect").value = FONT_PRESETS[val].body;
      updateFontPreview();
    }
  });

  $("#fontHeadingSelect")?.addEventListener("change", updateFontPreview);
  $("#fontBodySelect")?.addEventListener("change", updateFontPreview);

  // Site Ayarları kaydet
  $("#settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    menuData.settings = {
      fonts: {
        preset: form.fontPresetSelect.value,
        heading: form.fontHeadingSelect.value,
        body: form.fontBodySelect.value
      },
      colors: {
        wine: form.colorWine.value,
        gold: form.colorGold.value
      },
      brand: {
        word1: form.brandWord1.value,
        word2: form.brandWord2.value
      },
      texts: {
        heroTagline: $("#heroTaglineInput") ? $("#heroTaglineInput").value : "Premium Cocktail Bar",
        heroEyebrow: form.heroEyebrowInput.value,
        heroTitle: form.heroTitleInput.value,
        heroSubtitle: form.heroSubtitleInput.value,
        loadingText: form.loadingTextInput.value,
        navMenu: form.navMenuInput.value,
        navContact: form.navContactInput.value,
        navReserve: form.navReserveInput.value,
        contactTitle: form.contactTitleInput.value,
        contactSubtitle: form.contactSubtitleInput.value,
        whatsappBtn: form.whatsappBtnInput.value
      },
      visibility: {
        heroTagline: $("#heroTaglineShowCheckbox") ? $("#heroTaglineShowCheckbox").checked : true,
        heroEyebrow: $("#heroEyebrowShowCheckbox") ? $("#heroEyebrowShowCheckbox").checked : true,
      },
      social: {
        instagram: form.instagramUrl.value
      },
      contact: {
        whatsapp: form.whatsappNum.value,
        phone: form.phoneNum.value,
        address: form.addressInput ? form.addressInput.value : "",
        mapsUrl: form.mapsUrlInput ? form.mapsUrlInput.value : "",
        workingHours: form.workingHoursInput ? form.workingHoursInput.value : ""
      },
    };
    saveData();
    toast("Site ayarları güncellendi ✓");
  });

  // Kök kategori ekle
  $("#addRootCatBtn").addEventListener("click", () => {
    const name = prompt("Yeni kategori adı:");
    if (name?.trim()) addCategory([], name.trim());
  });

  // Alt kategori ekle
  $("#addSubCatBtn").addEventListener("click", () => {
    const name = prompt("Alt kategori adı:");
    if (name?.trim()) addCategory(selectedCatPath, name.trim());
  });

  // Kategori sil
  $("#deleteCatBtn").addEventListener("click", () => {
    deleteCategory(selectedCatPath);
  });

  // Kategori formu kaydet
  $("#categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const node = findNodeByPath(selectedCatPath);
    if (!node) return;
    const fd = new FormData(e.target);
    node.name = fd.get("name") || node.name;
    node.titleEn = fd.get("titleEn") || "";
    node.sideText = fd.get("sideText") || null;
    node.insideNote = fd.get("insideNote") || null;
    saveData();
    renderTree();
    renderCategoryEditor();
    toast("Kategori güncellendi ✓");
  });

  // Yeni ürün ekle
  $("#addItemBtn").addEventListener("click", () => openItemModal());

  // Ürün düzenle / sil / yukarı-aşağı taşı / kategori değiştir
  $("#itemsList").addEventListener("click", (e) => {
    const moveUpBtn = e.target.closest("[data-move-item='up']");
    if (moveUpBtn) {
      moveItemOrder(Number(moveUpBtn.dataset.index), "up");
      return;
    }

    const moveDownBtn = e.target.closest("[data-move-item='down']");
    if (moveDownBtn) {
      moveItemOrder(Number(moveDownBtn.dataset.index), "down");
      return;
    }

    const quickMoveBtn = e.target.closest("[data-quick-move-item]");
    if (quickMoveBtn) {
      openQuickMoveModal(Number(quickMoveBtn.dataset.quickMoveItem));
      return;
    }

    const editBtn = e.target.closest("[data-edit-item]");
    if (editBtn) {
      const idx = Number(editBtn.dataset.editItem);
      const node = findNodeByPath(selectedCatPath);
      if (node?.items?.[idx]) openItemModal(node.items[idx], idx);
      return;
    }

    const delBtn = e.target.closest("[data-delete-item]");
    if (delBtn) {
      deleteItem(Number(delBtn.dataset.deleteItem));
    }
  });

  // Kategoriye Taşı Modalı Kapat / Onayla
  $("#moveModalClose")?.addEventListener("click", closeQuickMoveModal);
  $("#moveModalCancelBtn")?.addEventListener("click", closeQuickMoveModal);
  $("#moveModalConfirmBtn")?.addEventListener("click", confirmQuickMove);
  $("#moveItemModal")?.addEventListener("click", (e) => {
    if (e.target === $("#moveItemModal")) closeQuickMoveModal();
  });

  // Modal kapat
  $("#modalClose").addEventListener("click", closeItemModal);
  $("#modalCancelBtn").addEventListener("click", closeItemModal);
  $("#itemModal").addEventListener("click", (e) => {
    if (e.target === $("#itemModal")) closeItemModal();
  });

  // Ürün formu kaydet
  $("#itemForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    saveItem({
      targetCategoryPath: fd.get("targetCategoryPath"),
      title: fd.get("title"),
      titleEn: fd.get("titleEn"),
      description: fd.get("description"),
      descriptionEn: fd.get("descriptionEn"),
      price: fd.get("price"),
      tastesLike: fd.get("tastesLike") || "",
      featured: !!fd.get("featured"),
      inStock: fd.get("inStock") !== null,
      stockLabel: fd.get("stockLabel") ?? "Stokta Yok",
      portionNote: fd.get("portionNote"),
      caloriesKcal: fd.get("caloriesKcal"),
      proteinG: fd.get("proteinG"),
      carbsG: fd.get("carbsG"),
      fatG: fd.get("fatG"),
      mayContain: fd.get("mayContain") || "",
    });
  });

  // Değişiklikleri Yayınla (Central API Push)
  $("#publishBtn")?.addEventListener("click", publishCentralMenu);

  // Export
  $("#exportBtn")?.addEventListener("click", exportData);

  // Import
  $("#importFile")?.addEventListener("change", (e) => {
    if (e.target.files[0]) importData(e.target.files[0]);
    e.target.value = "";
  });

  // Çıkış (Logout API)
  $("#logoutBtn")?.addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch(e) {}
    showLogin();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!$("#itemModal").hidden) closeItemModal();
      if (!$("#moveItemModal").hidden) closeQuickMoveModal();
    }
  });
}

/* ═══ BAŞLAT ═══ */
initLogin();
