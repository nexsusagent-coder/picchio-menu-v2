/* ═══════════════════════════════════════════
   SCRIPT.JS — Header, Mobil Menü, Animasyonlar
   ═══════════════════════════════════════════ */

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobilePanel = document.querySelector("[data-mobile-panel]");

/* ─── Header scroll durumu ─── */
const setHeaderState = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

/* ─── Mobil menü aç/kapat ─── */
const closeMenu = () => {
  document.body.classList.remove("menu-open");
  if (mobilePanel) mobilePanel.classList.remove("is-open");
  if (menuButton) menuButton.setAttribute("aria-label", "Menüyü aç");
};

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
  });
}

if (mobilePanel) {
  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ─── Reveal animasyonları (Intersection Observer) ─── */
const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));
}

/* ─── Lucide ikonları yükle ─── */
window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
