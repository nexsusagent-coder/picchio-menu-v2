const fs = require('fs');
const filePath = 'styles.css';
let css = fs.readFileSync(filePath, 'utf-8');
css = css.replace(/\r\n/g, '\n');

let changes = 0;
const misses = [];

function r(from, to) {
  if (css.includes(from)) {
    css = css.replace(from, to);
    changes++;
  } else {
    misses.push(from.substring(0, 70).replace(/\n/g, '\\n'));
  }
}

// ═══════════════════════════════════════
// ROOT: Add glass custom properties
// ═══════════════════════════════════════
r('--shadow: 0 24px 80px rgba(4, 7, 8, 0.40);',
  '--shadow: 0 24px 80px rgba(4, 7, 8, 0.40);\n  --glass-bg: rgba(255, 255, 255, 0.035);\n  --glass-border: rgba(255, 255, 255, 0.07);\n  --glass-hover: rgba(255, 255, 255, 0.07);\n  --gold-glow: 0 0 20px rgba(200, 148, 47, 0.12);');

// ═══════════════════════════════════════
// MENU FLOW SHELL: Dark mode
// ═══════════════════════════════════════
r('background: var(--ivory);\n  color: var(--ink);',
  'background: linear-gradient(180deg, #0d0f0e 0%, #080a09 50%, #0a0c0b 100%);\n  color: var(--ivory);');

// H1 gold gradient
r('linear-gradient(135deg, var(--ink) 30%, var(--wine) 100%)',
  'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, #e8c068 100%)');

// Eyebrow
r('.menu-flow-shell .eyebrow { color: var(--wine); }',
  '.menu-flow-shell .eyebrow { color: var(--gold); letter-spacing: 0.2em; }');

// Flow shell paragraph
r('margin: 10px 0 0;\n  color: rgba(14, 16, 15, 0.56);\n  font-size: 15px;',
  'margin: 10px 0 0;\n  color: rgba(245, 239, 227, 0.45);\n  font-size: 15px;');

// ═══════════════════════════════════════
// LOADING
// ═══════════════════════════════════════
r('padding: 60px 0;\n  color: rgba(14, 16, 15, 0.50);\n  font-size: 15px;',
  'padding: 60px 0;\n  color: rgba(245, 239, 227, 0.45);\n  font-size: 15px;');

r('border: 2.5px solid rgba(14, 16, 15, 0.12);\n  border-top-color: var(--wine);',
  'border: 2.5px solid rgba(255, 255, 255, 0.10);\n  border-top-color: var(--gold);');

// ═══════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════
r('margin-bottom: 20px;\n  color: rgba(14, 16, 15, 0.50);\n  font-size: 11px;',
  'margin-bottom: 20px;\n  color: rgba(245, 239, 227, 0.40);\n  font-size: 11px;');

r('.flow-breadcrumb button {\n  padding: 4px 8px;\n  border: 0;\n  border-radius: 6px;\n  color: var(--wine);',
  '.flow-breadcrumb button {\n  padding: 4px 8px;\n  border: 0;\n  border-radius: 6px;\n  color: var(--gold);');

r('background: rgba(107, 36, 48, 0.08);',
  'background: rgba(200, 148, 47, 0.12);');

r('.flow-breadcrumb span {\n  color: rgba(14, 16, 15, 0.72);\n}',
  '.flow-breadcrumb span {\n  color: rgba(245, 239, 227, 0.72);\n}');

// ═══════════════════════════════════════
// SIBLING NAV
// ═══════════════════════════════════════
r('.flow-siblings-label {\n  color: rgba(14, 16, 15, 0.40);',
  '.flow-siblings-label {\n  color: rgba(245, 239, 227, 0.35);');

r('.flow-siblings-actions button {\n  width: 28px;\n  height: 26px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(14, 16, 15, 0.10);\n  border-radius: 6px;\n  color: var(--wine);\n  background: rgba(255, 250, 241, 0.7);',
  '.flow-siblings-actions button {\n  width: 28px;\n  height: 26px;\n  display: grid;\n  place-items: center;\n  border: 1px solid var(--glass-border);\n  border-radius: 6px;\n  color: var(--gold);\n  background: var(--glass-bg);');

r('.flow-siblings-actions button:hover {\n  background: white;\n}',
  '.flow-siblings-actions button:hover {\n  background: var(--glass-hover);\n}');

r('.flow-siblings-track button {\n  flex: 0 0 auto;\n  min-width: 120px;\n  max-width: 180px;\n  min-height: 50px;\n  padding: 9px 12px;\n  border: 1px solid rgba(14, 16, 15, 0.10);\n  border-radius: 10px;\n  color: var(--ink);\n  background: rgba(255, 250, 241, 0.8);',
  '.flow-siblings-track button {\n  flex: 0 0 auto;\n  min-width: 120px;\n  max-width: 180px;\n  min-height: 50px;\n  padding: 9px 12px;\n  border: 1px solid var(--glass-border);\n  border-radius: 10px;\n  color: var(--ivory);\n  background: var(--glass-bg);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);');

r('.flow-siblings-track button.is-active {\n  border-color: rgba(107, 36, 48, 0.30);\n  background: var(--wine);\n  color: var(--ivory);\n}',
  '.flow-siblings-track button.is-active {\n  border-color: rgba(200, 148, 47, 0.40);\n  background: rgba(200, 148, 47, 0.15);\n  color: var(--gold);\n  box-shadow: var(--gold-glow);\n}');

r('.flow-siblings-track button:hover {\n  border-color: rgba(107, 36, 48, 0.24);\n  background: white;\n  transform: translateY(-1px);\n}',
  '.flow-siblings-track button:hover {\n  border-color: var(--glass-hover-border, rgba(200, 148, 47, 0.30));\n  background: var(--glass-hover);\n  transform: translateY(-1px);\n}');

r('.flow-siblings-track button.is-active:hover {\n  background: var(--wine);\n  transform: none;\n}',
  '.flow-siblings-track button.is-active:hover {\n  background: rgba(200, 148, 47, 0.18);\n  transform: none;\n}');

r('.flow-sibling-title em {\n  overflow: hidden;\n  color: rgba(14, 16, 15, 0.46);',
  '.flow-sibling-title em {\n  overflow: hidden;\n  color: rgba(245, 239, 227, 0.40);');

r('.flow-siblings-track button.is-active .flow-sibling-title em {\n  color: rgba(245, 239, 227, 0.65);\n}',
  '.flow-siblings-track button.is-active .flow-sibling-title em {\n  color: rgba(200, 148, 47, 0.70);\n}');

// ═══════════════════════════════════════
// CHOICE CARDS: Dark glassmorphism
// ═══════════════════════════════════════
r('.flow-choice-card {\n  min-height: 130px;\n  display: grid;\n  align-content: center;\n  justify-items: start;\n  gap: 8px;\n  padding: 24px;\n  border: 1px solid rgba(14, 16, 15, 0.10);\n  border-radius: 16px;\n  color: var(--ink);\n  background: #fffbf3;\n  text-align: left;\n  box-shadow: 0 8px 28px rgba(14, 16, 15, 0.04);\n  cursor: pointer;\n  transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease;\n}',
  '.flow-choice-card {\n  min-height: 130px;\n  display: grid;\n  align-content: center;\n  justify-items: start;\n  gap: 8px;\n  padding: 24px;\n  border: 1px solid var(--glass-border);\n  border-radius: 16px;\n  color: var(--ivory);\n  background: var(--glass-bg);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  text-align: left;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.20);\n  cursor: pointer;\n  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), background 300ms ease, box-shadow 300ms ease, border-color 300ms ease;\n}');

r('.flow-choice-card:hover {\n  background: white;\n  transform: translateY(-3px);\n  box-shadow: 0 16px 48px rgba(14, 16, 15, 0.10);\n}',
  '.flow-choice-card:hover {\n  background: var(--glass-hover);\n  border-color: rgba(200, 148, 47, 0.30);\n  transform: translateY(-4px) scale(1.01);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.30), var(--gold-glow);\n}');

r('.flow-choice-parent {\n  color: var(--wine);',
  '.flow-choice-parent {\n  color: var(--gold);');

r('.flow-choice-title em {\n  color: rgba(14, 16, 15, 0.46);',
  '.flow-choice-title em {\n  color: rgba(245, 239, 227, 0.40);');

r('.flow-choice-meta {\n  color: rgba(14, 16, 15, 0.50);',
  '.flow-choice-meta {\n  color: rgba(245, 239, 227, 0.45);');

// ═══════════════════════════════════════
// MENU SET HEADER
// ═══════════════════════════════════════
r('border: 1px solid rgba(107, 36, 48, 0.16);\n  border-radius: 14px;\n  background: rgba(107, 36, 48, 0.06);',
  'border: 1px solid rgba(200, 148, 47, 0.15);\n  border-radius: 14px;\n  background: rgba(200, 148, 47, 0.06);');

r('.menu-set-header p {\n  max-width: 520px;\n  margin: 8px 0 0;\n  color: rgba(14, 16, 15, 0.56);\n}',
  '.menu-set-header p {\n  max-width: 520px;\n  margin: 8px 0 0;\n  color: rgba(245, 239, 227, 0.50);\n}');

r('.menu-set-note {\n  display: grid;\n  gap: 3px;\n  color: rgba(107, 36, 48, 0.70) !important;',
  '.menu-set-note {\n  display: grid;\n  gap: 3px;\n  color: rgba(200, 148, 47, 0.70) !important;');

r('.menu-set-note em {\n  color: rgba(14, 16, 15, 0.46);',
  '.menu-set-note em {\n  color: rgba(245, 239, 227, 0.40);');

r('.menu-set-header > strong {\n  color: var(--sage);',
  '.menu-set-header > strong {\n  color: var(--gold);');

// ═══════════════════════════════════════
// MENU CARDS: Dark glassmorphism
// ═══════════════════════════════════════
r('.lux-menu-card {\n  min-height: 200px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 22px;\n  border: 1px solid rgba(14, 16, 15, 0.08);\n  border-radius: 16px;\n  background: #fffbf3;\n  box-shadow: 0 6px 22px rgba(14, 16, 15, 0.04);\n  transition: transform 220ms ease, box-shadow 220ms ease;\n}',
  '.lux-menu-card {\n  min-height: 200px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 22px;\n  border: 1px solid var(--glass-border);\n  border-radius: 16px;\n  background: var(--glass-bg);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.20);\n  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 300ms ease, border-color 300ms ease;\n}');

r('.lux-menu-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 40px rgba(14, 16, 15, 0.08);\n}',
  '.lux-menu-card:hover {\n  transform: translateY(-3px) scale(1.005);\n  border-color: rgba(200, 148, 47, 0.25);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.30), var(--gold-glow);\n}');

// Card image frame
r('border: 1px solid rgba(200, 148, 47, 0.4); /* Çerçeve rengi (gold/bronze tonu) */\n  padding: 3px; /* Çerçeve ile görsel arasındaki boşluk */\n  background: #fff;',
  'border: 1px solid rgba(200, 148, 47, 0.35);\n  padding: 3px;\n  background: rgba(200, 148, 47, 0.08);');

// Card text colors
r('.menu-card-category,\n.lux-menu-card mark {\n  color: var(--wine);',
  '.menu-card-category,\n.lux-menu-card mark {\n  color: var(--gold);');

r('.menu-card-category em {\n  color: rgba(107, 36, 48, 0.55);',
  '.menu-card-category em {\n  color: rgba(200, 148, 47, 0.55);');

r('-webkit-text-fill-color: var(--ink);',
  '-webkit-text-fill-color: var(--ivory);');

r('.lux-menu-card em {\n  color: rgba(14, 16, 15, 0.46);',
  '.lux-menu-card em {\n  color: rgba(245, 239, 227, 0.40);');

r('.lux-menu-card p { margin: 0; color: rgba(14, 16, 15, 0.58); font-size: 14px; }',
  '.lux-menu-card p { margin: 0; color: rgba(245, 239, 227, 0.55); font-size: 14px; }');

r('.menu-desc-tr { color: rgba(14, 16, 15, 0.62); font-size: 14px; }',
  '.menu-desc-tr { color: rgba(245, 239, 227, 0.60); font-size: 14px; }');

r('.menu-desc-en {\n  color: rgba(14, 16, 15, 0.40);',
  '.menu-desc-en {\n  color: rgba(245, 239, 227, 0.35);');

// Taste notes
r('border: 1px solid rgba(107, 36, 48, 0.14);\n  border-radius: 20px;\n  background: rgba(107, 36, 48, 0.04);\n  color: rgba(14, 16, 15, 0.72);',
  'border: 1px solid rgba(200, 148, 47, 0.20);\n  border-radius: 20px;\n  background: rgba(200, 148, 47, 0.08);\n  color: rgba(245, 239, 227, 0.70);');

// Price color
r('.lux-menu-card strong {\n  color: var(--sage);',
  '.lux-menu-card strong {\n  color: var(--gold);');

// ═══════════════════════════════════════
// NUTRITION PANEL
// ═══════════════════════════════════════
r('color: var(--wine);\n  background: transparent;\n  cursor: pointer;\n  font-size: 10px;',
  'color: var(--gold);\n  background: transparent;\n  cursor: pointer;\n  font-size: 10px;');

r('padding-top: 10px;\n  border-top: 1px solid rgba(14, 16, 15, 0.08);',
  'padding-top: 10px;\n  border-top: 1px solid var(--glass-border);');

r('.nutrition-content p {\n  margin: 0;\n  color: rgba(14, 16, 15, 0.50);',
  '.nutrition-content p {\n  margin: 0;\n  color: rgba(245, 239, 227, 0.45);');

r('.nutrition-serving-basis {\n  color: rgba(14, 16, 15, 0.56);',
  '.nutrition-serving-basis {\n  color: rgba(245, 239, 227, 0.50);');

r('border: 1px solid rgba(14, 16, 15, 0.08);\n  border-radius: 8px;\n  color: rgba(14, 16, 15, 0.62);',
  'border: 1px solid var(--glass-border);\n  border-radius: 8px;\n  color: rgba(245, 239, 227, 0.60);');

r('.nutrition-macro-chip span {\n  color: rgba(14, 16, 15, 0.48);',
  '.nutrition-macro-chip span {\n  color: rgba(245, 239, 227, 0.45);');

r('.nutrition-macro-chip em {\n  color: rgba(14, 16, 15, 0.72);',
  '.nutrition-macro-chip em {\n  color: rgba(245, 239, 227, 0.70);');

r('stroke: var(--wine);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;',
  'stroke: var(--gold);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;');

r('.nutrition-tags span {\n  color: rgba(14, 16, 15, 0.40);',
  '.nutrition-tags span {\n  color: rgba(245, 239, 227, 0.40);');

r('.nutrition-icon {\n  position: relative;\n  width: 28px;\n  height: 28px;\n  display: inline-grid;\n  place-items: center;\n  border: 1px solid rgba(107, 36, 48, 0.18);\n  border-radius: 8px;\n  color: var(--wine);',
  '.nutrition-icon {\n  position: relative;\n  width: 28px;\n  height: 28px;\n  display: inline-grid;\n  place-items: center;\n  border: 1px solid rgba(200, 148, 47, 0.20);\n  border-radius: 8px;\n  color: var(--gold);');

r('.nutrition-icon.is-muted {\n  border-color: rgba(122, 139, 111, 0.24);\n  color: var(--sage);\n}',
  '.nutrition-icon.is-muted {\n  border-color: rgba(200, 148, 47, 0.12);\n  color: rgba(200, 148, 47, 0.50);\n}');

r('.nutrition-icon:hover,\n.nutrition-icon:focus-visible {\n  border-color: rgba(107, 36, 48, 0.42);\n  background: rgba(255, 255, 255, 0.28);\n}',
  '.nutrition-icon:hover,\n.nutrition-icon:focus-visible {\n  border-color: rgba(200, 148, 47, 0.40);\n  background: rgba(200, 148, 47, 0.10);\n}');

r('color: rgba(107, 36, 48, 0.7);',
  'color: rgba(200, 148, 47, 0.7);');

// ═══════════════════════════════════════
// REMOVE OLD CARD ANIMATION (replaced by scroll-reveal)
// ═══════════════════════════════════════
r('.flow-choice-card,\n.lux-menu-card {\n  animation: cardIn 400ms ease both;\n}\n\n.flow-choice-card:nth-child(1), .lux-menu-card:nth-child(1) { animation-delay: 0ms; }\n.flow-choice-card:nth-child(2), .lux-menu-card:nth-child(2) { animation-delay: 50ms; }\n.flow-choice-card:nth-child(3), .lux-menu-card:nth-child(3) { animation-delay: 100ms; }\n.flow-choice-card:nth-child(4), .lux-menu-card:nth-child(4) { animation-delay: 150ms; }\n.flow-choice-card:nth-child(5), .lux-menu-card:nth-child(5) { animation-delay: 200ms; }\n.flow-choice-card:nth-child(6), .lux-menu-card:nth-child(6) { animation-delay: 250ms; }\n.flow-choice-card:nth-child(7), .lux-menu-card:nth-child(7) { animation-delay: 300ms; }\n.flow-choice-card:nth-child(8), .lux-menu-card:nth-child(8) { animation-delay: 350ms; }\n.flow-choice-card:nth-child(9), .lux-menu-card:nth-child(9) { animation-delay: 400ms; }\n.flow-choice-card:nth-child(10), .lux-menu-card:nth-child(10) { animation-delay: 450ms; }',
  '/* Card animations handled by scroll-reveal */');

// ═══════════════════════════════════════
// APPEND: Gold glow, scroll-reveal, hero, micro-animations
// ═══════════════════════════════════════
css += `

/* ═══════════════════════════════════════════
   GOLD GLOW ANİMASYONLARI
   ═══════════════════════════════════════════ */
@keyframes goldBorderGlow {
  0%, 100% { border-color: var(--glass-border); }
  50% { border-color: rgba(200, 148, 47, 0.20); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes heroGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Premium hero shimmer divider */
.hero-divider {
  width: 80px;
  height: 1px;
  margin: 0 auto;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

/* ═══════════════════════════════════════════
   SCROLL-TRIGGERED ANİMASYONLAR
   ═══════════════════════════════════════════ */
.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.scroll-reveal:nth-child(1) { transition-delay: 0ms; }
.scroll-reveal:nth-child(2) { transition-delay: 60ms; }
.scroll-reveal:nth-child(3) { transition-delay: 120ms; }
.scroll-reveal:nth-child(4) { transition-delay: 180ms; }
.scroll-reveal:nth-child(5) { transition-delay: 240ms; }
.scroll-reveal:nth-child(6) { transition-delay: 300ms; }
.scroll-reveal:nth-child(7) { transition-delay: 360ms; }
.scroll-reveal:nth-child(8) { transition-delay: 420ms; }
.scroll-reveal:nth-child(9) { transition-delay: 480ms; }
.scroll-reveal:nth-child(10) { transition-delay: 540ms; }

/* ═══════════════════════════════════════════
   PREMIUM HERO SEKSİYONU
   ═══════════════════════════════════════════ */
.premium-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0 28px;
}

.hero-logo-glow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hero-logo-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(200, 148, 47, 0.10) 0%, transparent 70%);
  pointer-events: none;
  animation: heroGlow 4s ease-in-out infinite;
}

.hero-brand-large {
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(36px, 7vw, 52px);
  font-weight: 800;
  color: var(--ivory);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.hero-brand-large em {
  font-style: normal;
  background: linear-gradient(135deg, var(--gold), var(--gold-light), #e8c068);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: rgba(200, 148, 47, 0.55);
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════════
   ENHANCED MICRO-ANİMASYONLAR
   ═══════════════════════════════════════════ */
.flow-choice-card:active {
  transform: scale(0.97) !important;
  transition-duration: 100ms !important;
}

.lux-menu-card:active {
  transform: scale(0.98) !important;
  transition-duration: 100ms !important;
}

/* Subtle border glow on featured items */
.lux-menu-card:has(mark) {
  border-color: rgba(200, 148, 47, 0.15);
  animation: goldBorderGlow 4s ease-in-out infinite;
}

/* Smooth focus states */
.flow-choice-card:focus-visible,
.lux-menu-card:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}
`;

// Write result
fs.writeFileSync(filePath, css, 'utf-8');

console.log(`✅ Applied ${changes} replacements.`);
if (misses.length) {
  console.log(`⚠️  ${misses.length} targets not found:`);
  misses.forEach(m => console.log(`   - ${m}`));
}
