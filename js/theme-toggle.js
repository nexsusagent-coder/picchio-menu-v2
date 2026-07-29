// ═══════════════════════════════════════════════════════
//   PICCHIO QR MENU — THEME TOGGLE (theme-toggle.js)
//   Enforces Light Theme across the entire application
// ═══════════════════════════════════════════════════════

(function () {
  const root = document.documentElement;

  function enforceLightTheme() {
    root.setAttribute('data-theme', 'light');
    try {
      localStorage.setItem('picchio_theme', 'light');
    } catch (e) {}

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = '#FAF6F0';
    }
  }

  enforceLightTheme();
})();
