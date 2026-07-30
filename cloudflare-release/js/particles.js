// ═══════════════════════════════════════════════════════
//   VERA QR MENU — PARTICLES.JS
//   Canvas-based floating particle system
// ═══════════════════════════════════════════════════════

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animFrame = null;
    this.mouse = { x: -999, y: -999 };
    this.paused = false;

    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth * 0.06));

    const colors = [
      { r: 201, g: 169, b: 110 }, // gold
      { r: 232, g: 200, b: 122 }, // gold bright
      { r: 26,  g: 173, b: 170 }, // teal
      { r: 255, g: 123, b: 107 }, // coral
      { r: 255, g: 255, b: 255 }, // white
    ];

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x:     Math.random() * this.canvas.width,
        y:     Math.random() * this.canvas.height,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4 - 0.1,
        r:     Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        twinkle: Math.random() > 0.7,
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener('visibilitychange', () => {
      this.paused = document.hidden;
      if (!this.paused) this.animate();
    });
  }

  animate() {
    if (this.paused) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      // Update
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // Wrap around
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Mouse repel (gentle)
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.5;
        p.vx += (dx / dist) * force * 0.05;
        p.vy += (dy / dist) * force * 0.05;
        // Dampen
        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      // Draw
      const pulsedAlpha = p.twinkle
        ? p.alpha * (0.5 + 0.5 * Math.sin(p.pulse))
        : p.alpha;

      const { r, g, b } = p.color;
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      gradient.addColorStop(0, `rgba(${r},${g},${b},${pulsedAlpha})`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
