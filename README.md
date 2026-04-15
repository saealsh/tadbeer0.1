<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>تدّبير — مخططك المالي الذكي</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

:root {
  --black: #020202;
  --white: #fafafa;
  --gold: #c9a84c;
  --gold-light: #f0d98a;
  --gold-dim: rgba(201,168,76,0.12);
  --text: #f0f0f0;
  --text-muted: rgba(240,240,240,0.45);
  --text-faint: rgba(240,240,240,0.2);
  --border: rgba(255,255,255,0.08);
  --border-gold: rgba(201,168,76,0.3);
  --green: #10b981;
  --danger: #ef4444;
  --surface: rgba(255,255,255,0.04);
  --surface-hover: rgba(255,255,255,0.07);
  --font: 'IBM Plex Sans Arabic', 'Gumela', sans-serif;
  --r: 16px;
  --r-lg: 24px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font);
  background: var(--black);
  color: var(--text);
  overflow-x: hidden;
  line-height: 1.7;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 45% at 50% -5%, rgba(201,168,76,0.07) 0%, transparent 65%),
    radial-gradient(ellipse 40% 35% at 90% 80%, rgba(201,168,76,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 30% 25% at 10% 60%, rgba(201,168,76,0.03) 0%, transparent 50%);
}

/* ─── NOISE TEXTURE ─── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}

section, header, footer, nav, main { position: relative; z-index: 1; }

/* ─── NAV ─── */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: rgba(2,2,2,0.88);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-bottom: 1px solid var(--border);
  padding: 0 5%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.nav-logo-icon {
  width: 36px; height: 36px;
  flex-shrink: 0;
}

.nav-logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.18s;
}
.nav-links a:hover { color: var(--text); }

.nav-cta {
  background: var(--gold);
  color: #0a0600;
  border: none;
  border-radius: 10px;
  padding: 9px 22px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 5% 80px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 100px;
  padding: 6px 18px;
  margin-bottom: 32px;
}

.hero-logo-mark {
  width: 80px; height: 80px;
  margin: 0 auto 24px;
  opacity: 0.92;
  animation: floatLogo 6s ease-in-out infinite;
}

@keyframes floatLogo {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero h1 {
  font-size: clamp(42px, 7vw, 88px);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -2.5px;
  color: #fff;
  margin-bottom: 10px;
}

.hero h1 .accent {
  color: var(--gold);
  position: relative;
}

.hero-tagline {
  font-size: clamp(16px, 2.5vw, 22px);
  color: var(--text-muted);
  font-weight: 400;
  margin-bottom: 40px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 72px;
}

.btn-primary {
  background: var(--gold);
  color: #0a0600;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,168,76,0.28); }

.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 28px;
  font-size: 15px;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.18s;
  text-decoration: none;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: var(--text); }

.hero-stats {
  display: flex;
  align-items: center;
  gap: 48px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-stat-item {
  text-align: center;
}

.hero-stat-num {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -1px;
  display: block;
}

.hero-stat-lbl {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

.hero-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

/* ─── MOCKUP CARD ─── */
.hero-mockup {
  margin-top: 80px;
  max-width: 420px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* ─── SECTION COMMONS ─── */
.section {
  padding: 100px 5%;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(28px, 4.5vw, 48px);
  font-weight: 700;
  letter-spacing: -1.5px;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 16px;
}

.section-sub {
  font-size: 17px;
  color: var(--text-muted);
  max-width: 540px;
  line-height: 1.7;
}

/* ─── FEATURES GRID ─── */
.features-section {
  padding: 100px 5%;
  text-align: center;
}

.features-header {
  max-width: 600px;
  margin: 0 auto 64px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 28px;
  text-align: right;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-card:hover {
  background: var(--surface-hover);
  border-color: rgba(201,168,76,0.18);
  transform: translateY(-3px);
}

.feature-card:hover::before { opacity: 1; }

.feature-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}

.feature-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ─── HOW IT WORKS ─── */
.how-section {
  padding: 100px 5%;
  max-width: 1100px;
  margin: 0 auto;
}

.how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-top: 56px;
}

.how-steps {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.how-step {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.how-step-num {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border-gold);
  background: var(--gold-dim);
  color: var(--gold);
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 3px;
}

.how-step-body h4 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}

.how-step-body p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.65;
}

.how-visual {
  position: relative;
}

/* ─── APP CARD MOCKUP ─── */
.app-card-mock {
  background: #0a0a0a;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.8);
  position: relative;
  overflow: hidden;
}

.app-card-mock::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.7), rgba(240,217,138,1), rgba(201,168,76,0.7), transparent);
}

.mock-balance-lbl {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 6px;
}

.mock-balance {
  font-size: 38px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -2px;
  margin-bottom: 4px;
}

.mock-balance span {
  font-size: 16px;
  opacity: 0.4;
  font-weight: 400;
  letter-spacing: 0;
}

.mock-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
}

.mock-stat {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px;
  padding: 10px;
}

.mock-stat-icon { font-size: 15px; margin-bottom: 4px; }
.mock-stat-val {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
}
.mock-stat-lbl {
  font-size: 9px;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 2px;
}

.mock-bar-wrap {
  margin-top: 16px;
}
.mock-bar-lbl {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: rgba(255,255,255,0.3);
  margin-bottom: 6px;
}
.mock-bar-track {
  height: 5px;
  background: rgba(255,255,255,0.08);
  border-radius: 5px;
  overflow: hidden;
}
.mock-bar-fill {
  height: 100%;
  width: 64%;
  background: linear-gradient(90deg, rgba(201,168,76,0.5), rgba(240,217,138,0.85));
  border-radius: 5px;
  animation: barFill 2s ease forwards;
}
@keyframes barFill {
  from { width: 0%; }
  to { width: 64%; }
}

/* mini items */
.mock-items { margin-top: 20px; display: flex; flex-direction: column; gap: 8px; }
.mock-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 9px 12px;
}
.mock-item-icon {
  width: 28px; height: 28px;
  border-radius: 7px;
  background: rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}
.mock-item-name { flex: 1; font-size: 12px; color: rgba(255,255,255,0.7); }
.mock-item-amt { font-size: 12px; font-weight: 700; }
.mock-item-amt.inc { color: var(--green); }
.mock-item-amt.exp { color: var(--danger); }

/* ─── STREAK / WALLET SECTION ─── */
.wallet-section {
  padding: 100px 5%;
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%);
}

.wallet-tiers {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 56px;
  flex-wrap: wrap;
}

.tier-card {
  border-radius: 20px;
  padding: 32px 24px;
  width: 200px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s;
}
.tier-card:hover { transform: translateY(-6px); }

.tier-card.bronze {
  background: linear-gradient(145deg, #1a0e00, #120a00);
  border: 1px solid rgba(205,127,50,0.25);
}
.tier-card.gold {
  background: linear-gradient(145deg, #1a1400, #100d00);
  border: 1px solid rgba(201,168,76,0.3);
  transform: scale(1.05);
}
.tier-card.gold:hover { transform: scale(1.05) translateY(-6px); }
.tier-card.obsidian {
  background: linear-gradient(145deg, #0a0a0a, #050505);
  border: 1px solid rgba(180,180,200,0.2);
}

.tier-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}
.tier-card.bronze .tier-line { background: linear-gradient(90deg, transparent, #cd7f32, transparent); }
.tier-card.gold .tier-line { background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent); }
.tier-card.obsidian .tier-line { background: linear-gradient(90deg, transparent, #a0a0b0, transparent); }

.tier-badge {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
}
.tier-card.bronze .tier-badge { color: #e8a060; }
.tier-card.gold .tier-badge { color: var(--gold-light); }
.tier-card.obsidian .tier-badge { color: #c0c0d0; }

.tier-days {
  font-size: 52px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}
.tier-card.bronze .tier-days { color: #e8a060; }
.tier-card.gold .tier-days { color: var(--gold-light); }
.tier-card.obsidian .tier-days { color: #d0d0e0; }

.tier-label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.tier-card.bronze .tier-label { color: rgba(232,160,96,0.5); }
.tier-card.gold .tier-label { color: rgba(201,168,76,0.5); }
.tier-card.obsidian .tier-label { color: rgba(160,160,176,0.5); }

.tier-desc {
  font-size: 13px;
  line-height: 1.55;
}
.tier-card.bronze .tier-desc { color: rgba(232,160,96,0.55); }
.tier-card.gold .tier-desc { color: rgba(240,217,138,0.55); }
.tier-card.obsidian .tier-desc { color: rgba(192,192,208,0.5); }

/* ─── PRO SECTION ─── */
.pro-section {
  padding: 100px 5%;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.pro-card {
  background: #0a0a0a;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 28px;
  padding: 56px 48px;
  position: relative;
  overflow: hidden;
  margin-top: 48px;
}

.pro-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
}

.pro-price {
  font-size: 64px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -3px;
  line-height: 1;
  margin: 24px 0 6px;
}

.pro-price span {
  font-size: 22px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0;
}

.pro-period {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 36px;
}

.pro-features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  text-align: right;
  margin-bottom: 36px;
}

.pro-feat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255,255,255,0.75);
}

.pro-feat-check {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(16,185,129,0.12);
  border: 1px solid rgba(16,185,129,0.25);
  color: var(--green);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─── TESTIMONIALS ─── */
.testimonials-section {
  padding: 100px 5%;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 56px;
}

.testimonial-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 28px;
  text-align: right;
  transition: border-color 0.2s;
}
.testimonial-card:hover { border-color: rgba(201,168,76,0.2); }

.testimonial-stars {
  color: var(--gold);
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 14px;
}

.testimonial-text {
  font-size: 15px;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--gold-dim);
  border: 1px solid var(--border-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  flex-shrink: 0;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
}

.author-role {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 1px;
}

/* ─── CTA SECTION ─── */
.cta-section {
  padding: 120px 5%;
  text-align: center;
}

.cta-box {
  max-width: 700px;
  margin: 0 auto;
  background: linear-gradient(145deg, #0f0c04, #0a0800);
  border: 1px solid rgba(201,168,76,0.22);
  border-radius: 32px;
  padding: 72px 48px;
  position: relative;
  overflow: hidden;
}

.cta-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
}

.cta-box::after {
  content: '';
  position: absolute;
  bottom: -60px; left: 50%;
  transform: translateX(-50%);
  width: 400px; height: 200px;
  background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.cta-logo {
  width: 60px; height: 60px;
  margin: 0 auto 24px;
}

.cta-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -1.5px;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 16px;
}

.cta-sub {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 36px;
  line-height: 1.7;
}

/* ─── FOOTER ─── */
footer {
  border-top: 1px solid var(--border);
  padding: 48px 5% 32px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-brand-text {
  font-size: 18px;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
}

.footer-tagline {
  font-size: 13px;
  color: var(--text-faint);
  margin-top: 4px;
}

.footer-copy {
  font-size: 12px;
  color: var(--text-faint);
  text-align: left;
}

/* ─── SCROLL ANIMATIONS ─── */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  nav { padding: 0 4%; }
  .nav-links { display: none; }
  .hero { padding: 100px 4% 60px; }
  .hero h1 { letter-spacing: -1.5px; }
  .how-grid { grid-template-columns: 1fr; gap: 40px; }
  .pro-features-list { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .tier-card.gold { transform: scale(1); }
  .tier-card.gold:hover { transform: translateY(-6px); }
  .cta-box { padding: 48px 28px; }
  footer { grid-template-columns: 1fr; }
  .footer-copy { text-align: right; }
}

/* ─── DIVIDER LINE ─── */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  max-width: 1100px;
  margin: 0 auto;
}
</style>
</head>
<body>

<!-- ═══ NAV ═══ -->
<nav>
  <a href="#" class="nav-logo">
    <svg class="nav-logo-icon" viewBox="579 257 274 290" xmlns="http://www.w3.org/2000/svg">
      <path d="M 696.019531 274.660156 C 700.972656 264.074219 709.1875 258.191406 720.722656 257.789062 C 730.949219 257.429688 740.335938 262.171875 745.921875 272.554688 C 749.960938 280.058594 750.703125 288.234375 750.054688 296.601562 C 749.03125 309.828125 744.488281 322.011719 738.839844 333.824219 C 732.789062 346.480469 727.023438 359.246094 722.515625 372.550781 C 722.300781 373.1875 722.199219 373.917969 721.511719 374.308594 C 720.632812 374.261719 720.617188 373.5 720.429688 372.941406 C 715.859375 359.167969 709.957031 345.957031 703.6875 332.890625 C 699.234375 323.609375 695.488281 314.050781 693.746094 303.839844 C 692.171875 294.640625 691.980469 285.488281 695.242188 276.539062 C 695.460938 275.945312 695.726562 275.367188 696.019531 274.660156 Z" fill="white"/>
      <path d="M 839.804688 365.90625 C 852.660156 373.285156 855.777344 389.179688 849.320312 400.796875 C 845.71875 407.277344 839.902344 411.226562 832.960938 413.355469 C 822.273438 416.632812 811.609375 415.292969 801.027344 412.566406 C 789.351562 409.5625 778.339844 404.78125 767.398438 399.839844 C 757.03125 395.15625 746.53125 390.816406 735.546875 387.761719 C 734.027344 386.859375 735.078125 385.875 737.667969 385.546875 C 748.609375 382.824219 759.25 379.214844 769.671875 374.929688 C 780.933594 370.296875 792.214844 365.738281 804.1875 363.167969 C 813.496094 361.167969 822.789062 360.710938 832.125 362.925781 C 834.78125 363.558594 837.300781 364.535156 839.804688 365.90625 Z" fill="white"/>
      <path d="M 679.117188 377.570312 C 688.652344 381.199219 698.277344 384.101562 707.984375 386.472656 C 706.972656 387.644531 694.023438 390.90625 669.980469 402.164062 C 660.292969 406.65625 650.4375 410.75 639.984375 413.191406 C 633.773438 414.640625 627.503906 415.625 621.121094 415.132812 C 613.320312 414.535156 605.769531 412.945312 599.492188 407.84375 C 593.121094 402.667969 590.515625 395.703125 590.546875 387.691406 C 590.597656 374.574219 599.765625 365.625 611.015625 362.910156 C 620.632812 360.59375 630.117188 361.261719 639.613281 363.425781 C 649.667969 365.714844 659.21875 369.46875 668.714844 373.398438 C 672.125 374.808594 675.566406 376.148438 679.117188 377.570312 Z" fill="white"/>
      <path d="M 735.25 506.796875 C 744.660156 506.796875 753.902344 506.746094 763.144531 506.835938 C 765.4375 499.785156 763.71875 495.625 761.019531 491.847656 C 756.039062 484.878906 749.449219 479.902344 741.097656 478.035156 C 734.554688 476.578125 732.292969 470.546875 731.824219 465.566406 C 749.238281 465.246094 761.648438 471.929688 769.875 485.570312 C 776.359375 503.265625 781.0625 506.789062 787.71875 506.792969 C 804.871094 506.796875 822.023438 506.796875 839.175781 506.796875 C 841.6875 504.3125 841.691406 474.167969 841.691406 474.167969 C 841.6875 467.933594 845.605469 463.964844 851.875 463.835938 C 853.777344 467.132812 853.769531 479.835938 853.753906 505.25 C 853.753906 508.714844 853 511.867188 850.433594 514.421875 C 848.230469 516.617188 845.605469 517.738281 842.515625 517.738281 C 824.089844 517.746094 805.667969 517.761719 787.246094 517.726562 C 776.15625 512.503906 774.632812 511.039062 771.894531 514.945312 C 770.085938 516.785156 767.910156 517.71875 765.386719 517.722656 C 750.949219 517.753906 736.507812 517.746094 722.070312 517.734375 C 721.5625 510.671875 725.445312 506.355469 731.609375 506.785156 C 732.761719 506.863281 733.917969 506.796875 735.25 506.796875 Z" fill="white"/>
      <path d="M 609.828125 518.441406 C 622.226562 511.53125 621.976562 513.492188 621.949219 517.816406 C 618.6875 536.339844 612.007812 541.859375 602.300781 544.058594 C 597.019531 545.257812 591.855469 544.667969 586.84375 542.703125 C 580.605469 536.605469 584.113281 536.980469 591.144531 536.941406 C 597.621094 536.304688 603.25 534.050781 606.941406 528.285156 C 608.835938 525.328125 609.550781 522.035156 609.828125 518.441406 Z" fill="white"/>
    </svg>
    <span class="nav-logo-text">تدّبير</span>
  </a>
  <ul class="nav-links">
    <li><a href="#features">المزايا</a></li>
    <li><a href="#how">كيف يعمل</a></li>
    <li><a href="#wallet">البطاقة</a></li>
    <li><a href="#pricing">الأسعار</a></li>
  </ul>
  <a href="#pricing" class="nav-cta">ابدأ مجاناً</a>
</nav>

<!-- ═══ HERO ═══ -->
<section class="hero">
  <div class="hero-eyebrow">✦ مخططك المالي الذكي</div>

  <svg class="hero-logo-mark" viewBox="579 257 274 290" xmlns="http://www.w3.org/2000/svg">
    <path d="M 696.019531 274.660156 C 700.972656 264.074219 709.1875 258.191406 720.722656 257.789062 C 730.949219 257.429688 740.335938 262.171875 745.921875 272.554688 C 749.960938 280.058594 750.703125 288.234375 750.054688 296.601562 C 749.03125 309.828125 744.488281 322.011719 738.839844 333.824219 C 732.789062 346.480469 727.023438 359.246094 722.515625 372.550781 C 721.511719 374.308594 720.429688 372.941406 715.859375 359.167969 C 709.957031 345.957031 703.6875 332.890625 699.234375 323.609375 C 695.488281 314.050781 693.746094 303.839844 692.171875 294.640625 C 691.980469 285.488281 695.242188 276.539062 696.019531 274.660156 Z" fill="rgba(201,168,76,0.95)"/>
    <path d="M 839.804688 365.90625 C 852.660156 373.285156 855.777344 389.179688 849.320312 400.796875 C 845.71875 407.277344 839.902344 411.226562 832.960938 413.355469 C 822.273438 416.632812 811.609375 415.292969 801.027344 412.566406 C 789.351562 409.5625 769.671875 374.929688 769.671875 374.929688 C 780.933594 370.296875 792.214844 365.738281 804.1875 363.167969 C 813.496094 361.167969 822.789062 360.710938 832.125 362.925781 C 834.78125 363.558594 837.300781 364.535156 839.804688 365.90625 Z" fill="rgba(240,217,138,0.85)"/>
    <path d="M 679.117188 377.570312 C 688.652344 381.199219 698.277344 384.101562 707.984375 386.472656 C 694.023438 390.90625 669.980469 402.164062 660.292969 406.65625 C 650.4375 410.75 639.984375 413.191406 633.773438 414.640625 C 621.121094 415.132812 613.320312 414.535156 605.769531 412.945312 C 599.492188 407.84375 590.597656 374.574219 599.765625 365.625 C 611.015625 362.910156 620.632812 360.59375 639.613281 363.425781 C 649.667969 365.714844 659.21875 369.46875 679.117188 377.570312 Z" fill="rgba(201,168,76,0.7)"/>
    <path d="M 609.828125 518.441406 C 622.226562 511.53125 621.976562 516.328125 621.949219 515.351562 C 609.925781 502.007812 621.925781 494.066406 628.636719 506.804688 C 634.808594 506.75 639.949219 506.75 652.320312 504.761719 C 652.25 496.445312 664.238281 492.621094 664.574219 498.140625 C 665.636719 503.386719 674.550781 506.75 681.191406 506.8125 C 695.988281 504.929688 695.988281 473.390625 701.867188 464.902344 C 707.96875 464.054688 707.976562 479.675781 707.957031 506.707031 C 706.488281 514.179688 702.136719 517.707031 696.914062 517.738281 C 690.445312 517.773438 663.359375 511.421875 662.484375 512.042969 C 660.160156 516.039062 652.070312 517.730469 636.472656 517.746094 C 629.582031 517.75 622.226562 511.53125 609.828125 518.441406 Z" fill="rgba(201,168,76,0.85)"/>
  </svg>

  <h1>تدّبير<br><span class="accent">ذكاءٌ مالي</span></h1>
  <p class="hero-tagline">تتبّع دخلك ومصاريفك، خطّط لمستقبلك، وحقّق أهدافك المالية بسهولة تامة</p>

  <div class="hero-actions">
    <a href="#pricing" class="btn-primary">ابدأ مجاناً ✦</a>
    <a href="#features" class="btn-ghost">اكتشف المزايا</a>
  </div>

  <div class="hero-stats">
    <div class="hero-stat-item">
      <span class="hero-stat-num">+١٢ك</span>
      <span class="hero-stat-lbl">مستخدم نشط</span>
    </div>
    <div class="hero-divider"></div>
    <div class="hero-stat-item">
      <span class="hero-stat-num">٢.٥٪</span>
      <span class="hero-stat-lbl">نسبة الزكاة الدقيقة</span>
    </div>
    <div class="hero-divider"></div>
    <div class="hero-stat-item">
      <span class="hero-stat-num">٤ مذاهب</span>
      <span class="hero-stat-lbl">فقهية مدعومة</span>
    </div>
    <div class="hero-divider"></div>
    <div class="hero-stat-item">
      <span class="hero-stat-num">١٠٠٪</span>
      <span class="hero-stat-lbl">آمن وخاص</span>
    </div>
  </div>

  <!-- mini app mockup -->
  <div class="hero-mockup fade-in" style="margin-top:72px">
    <div class="app-card-mock">
      <div class="mock-balance-lbl">الرصيد المتاح</div>
      <div class="mock-balance"><span>﷼ </span>٨٬٣٤٧</div>
      <div class="mock-stats">
        <div class="mock-stat">
          <div class="mock-stat-icon">💵</div>
          <div class="mock-stat-val">١٢٬٠٠٠</div>
          <div class="mock-stat-lbl">الدخل</div>
        </div>
        <div class="mock-stat">
          <div class="mock-stat-icon">💸</div>
          <div class="mock-stat-val">٣٬٦٥٣</div>
          <div class="mock-stat-lbl">المصاريف</div>
        </div>
        <div class="mock-stat">
          <div class="mock-stat-icon">🏦</div>
          <div class="mock-stat-val">٨٬٣٤٧</div>
          <div class="mock-stat-lbl">التوفير</div>
        </div>
      </div>
      <div class="mock-bar-wrap">
        <div class="mock-bar-lbl"><span>نسبة الإنفاق</span><span>٣٠٪</span></div>
        <div class="mock-bar-track"><div class="mock-bar-fill"></div></div>
      </div>
      <div class="mock-items">
        <div class="mock-item">
          <div class="mock-item-icon">💼</div>
          <div class="mock-item-name">راتب نوفمبر</div>
          <div class="mock-item-amt inc">+١٢٬٠٠٠ ﷼</div>
        </div>
        <div class="mock-item">
          <div class="mock-item-icon">🏠</div>
          <div class="mock-item-name">إيجار شهري</div>
          <div class="mock-item-amt exp">-٢٬٠٠٠ ﷼</div>
        </div>
        <div class="mock-item">
          <div class="mock-item-icon">🍽️</div>
          <div class="mock-item-name">مطاعم وكافيهات</div>
          <div class="mock-item-amt exp">-٨٥٣ ﷼</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ FEATURES ═══ -->
<section class="features-section fade-in" id="features">
  <div class="features-header">
    <div class="section-tag">✦ المزايا</div>
    <h2 class="section-title">كل ما تحتاجه في مكانٍ واحد</h2>
    <p class="section-sub">تدّبير ليس مجرد تطبيق — هو شريكك المالي الذكي الذي يفهم احتياجاتك</p>
  </div>

  <div class="features-grid">
    <div class="feature-card fade-in">
      <div class="feature-icon">📊</div>
      <div class="feature-title">تتبّع دخيل ومصاريفك</div>
      <p class="feature-desc">سجّل مصادر دخلك ومصاريفك الثابتة والمتغيرة بضغطة واحدة مع تصنيف ذكي آلي</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">🧠</div>
      <div class="feature-title">تحليل ذكاء اصطناعي</div>
      <p class="feature-desc">اكتشف تسرّباتك المالية واحصل على توصيات شخصية مبنية على سلوكك الفعلي</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">🌙</div>
      <div class="feature-title">حاسبة الزكاة</div>
      <p class="feature-desc">احسب زكاتك بدقة وفق المذاهب الأربعة — حنفي، مالكي، شافعي، وحنبلي</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">🎯</div>
      <div class="feature-title">أهداف مالية ذكية</div>
      <p class="feature-desc">حدّد أهدافك المالية وتابع تقدّمك نحوها مع خطط ادخار يومية مقترحة</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">🛡️</div>
      <div class="feature-title">ميزانية الفئات</div>
      <p class="feature-desc">حدّد سقفاً لكل فئة إنفاق وتلقّ تنبيهات فورية عند الاقتراب من الحد</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">📅</div>
      <div class="feature-title">تتبّع المستحقات</div>
      <p class="feature-desc">لا تنسَ أي فاتورة أو قسط — نظام تنبيهات ذكي يذكّرك قبل الاستحقاق</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">📈</div>
      <div class="feature-title">تقارير وإحصاءات</div>
      <p class="feature-desc">تقارير شهرية وسنوية شاملة مع رسوم بيانية توضّح نمط إنفاقك وتوفيرك</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">🔥</div>
      <div class="feature-title">نظام المتابعة اليومية</div>
      <p class="feature-desc">بنِ عادة التخطيط المالي يوماً بيوم واكسب نقاطاً وإنجازات على طول الطريق</p>
    </div>
    <div class="feature-card fade-in">
      <div class="feature-icon">💼</div>
      <div class="feature-title">توصيات استثمارية</div>
      <p class="feature-desc">احصل على أفكار استثمارية مناسبة لحجم مدخراتك مع تقييم المخاطر</p>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ HOW IT WORKS ═══ -->
<section class="section" id="how">
  <div class="how-section">
    <div class="section-tag">✦ كيف يعمل</div>
    <h2 class="section-title">بسيط، سريع، فعّال</h2>
    <p class="section-sub">ثلاث خطوات فقط تفصلك عن السيطرة الكاملة على مالك</p>

    <div class="how-grid fade-in">
      <div class="how-steps">
        <div class="how-step">
          <div class="how-step-num">١</div>
          <div class="how-step-body">
            <h4>سجّل دخلك</h4>
            <p>أضف مصادر دخلك — راتب، فريلانس، تجارة — مع تحديد يوم نزول الراتب</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">٢</div>
          <div class="how-step-body">
            <h4>تابع مصاريفك يومياً</h4>
            <p>سجّل مصاريفك بضغطة واحدة من شريط الإدخال السريع في أسفل الشاشة</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">٣</div>
          <div class="how-step-body">
            <h4>اقرأ تقاريرك</h4>
            <p>اطّلع على تحليلات شاملة وتوصيات ذكية لتحسين وضعك المالي باستمرار</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">٤</div>
          <div class="how-step-body">
            <h4>احصل على بطاقتك</h4>
            <p>بعد ٣٠ يوماً متتالياً تحصل على بطاقة تدّبير البرونزية — ثم ذهب وأوبسيديان</p>
          </div>
        </div>
      </div>

      <div class="how-visual fade-in">
        <div class="app-card-mock">
          <div style="font-size:11px;font-weight:700;color:rgba(201,168,76,0.7);letter-spacing:2px;margin-bottom:14px">🔍 تحليل ذكي</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;margin-bottom:16px">
            ⚡ مصاريف المطاعم وصلت لـ <span style="color:#ef4444;font-weight:700">٨٥٣ ﷼</span> هذا الشهر — لو خفّضتها ٣٠٪ ستوفر <span style="color:#10b981;font-weight:700">٢٥٦ ﷼/شهر</span>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
            <span style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);color:#10b981;font-size:12px;padding:4px 12px;border-radius:20px">✅ توفيرك ٦٩٪</span>
            <span style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);color:#f97316;font-size:12px;padding:4px 12px;border-radius:20px">⚠️ الترفيه يرتفع</span>
          </div>
          <div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:14px">
            <div style="font-size:11px;color:rgba(201,168,76,0.6);margin-bottom:8px;letter-spacing:1.5px">💡 خطة ادخار يومية</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">
              <div>
                <div style="font-size:18px;font-weight:700;color:#f0d98a">٢٠</div>
                <div style="font-size:10px;color:rgba(240,217,138,0.5)">يومياً</div>
              </div>
              <div>
                <div style="font-size:18px;font-weight:700;color:#f0d98a">٦٠٨</div>
                <div style="font-size:10px;color:rgba(240,217,138,0.5)">شهرياً</div>
              </div>
              <div>
                <div style="font-size:18px;font-weight:700;color:#f0d98a">٧٣٠٠</div>
                <div style="font-size:10px;color:rgba(240,217,138,0.5)">سنوياً</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ WALLET / STREAK ═══ -->
<section class="wallet-section fade-in" id="wallet">
  <div class="section-tag">✦ بطاقة تدّبير</div>
  <h2 class="section-title">اكسب بطاقتك بالستريك اليومي</h2>
  <p class="section-sub" style="margin:0 auto">كل يوم تسجّل فيه حضورك يقرّبك من مستوى أعلى — من البرونز إلى الأوبسيديان</p>

  <div class="wallet-tiers">
    <div class="tier-card bronze fade-in">
      <div class="tier-line"></div>
      <span class="tier-badge">BRONZE</span>
      <div class="tier-days">٣٠</div>
      <div class="tier-label">يوم</div>
      <p class="tier-desc">ابدأ رحلتك المالية وافتح أولى مكافآتك</p>
    </div>
    <div class="tier-card gold fade-in">
      <div class="tier-line"></div>
      <span class="tier-badge">GOLD ✦</span>
      <div class="tier-days">٦٠</div>
      <div class="tier-label">يوم</div>
      <p class="tier-desc">شهران من الانضباط يُثبتان عادة مالية راسخة</p>
    </div>
    <div class="tier-card obsidian fade-in">
      <div class="tier-line"></div>
      <span class="tier-badge">OBSIDIAN</span>
      <div class="tier-days">٩٠</div>
      <div class="tier-label">يوم</div>
      <p class="tier-desc">ثلاثة أشهر تعني أنك بالفعل مخطّط مالي محترف</p>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ PRICING ═══ -->
<section class="pro-section fade-in" id="pricing">
  <div class="section-tag">✦ الاشتراك</div>
  <h2 class="section-title">بسيط وشفاف</h2>
  <p class="section-sub" style="margin:0 auto">نسخة مجانية كاملة، وترقية اختيارية لمن يريد أكثر</p>

  <div class="pro-card">
    <div style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:2px;color:var(--gold);background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:100px;padding:5px 16px;margin-bottom:8px">👑 PRO</div>
    <div class="pro-price">١٠ <span>ريال/شهر</span></div>
    <p class="pro-period">أو ١٠٠ ريال سنوياً — وفّر شهرين</p>

    <div class="pro-features-list">
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>تحليل الذكاء الاصطناعي</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>تقارير PDF وCSV</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>توصيات استثمارية</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>بطاقة Apple Wallet</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>تنبيهات المستحقات</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>كشف تسرّب مالي</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>رسوم بيانية متقدمة</span>
      </div>
      <div class="pro-feat-item">
        <div class="pro-feat-check">✓</div>
        <span>أولوية الدعم الفني</span>
      </div>
    </div>

    <a href="#" class="btn-primary" style="width:100%;justify-content:center;font-size:16px;padding:16px">اشترك الآن — ١٠ ﷼/شهر ✦</a>
    <p style="font-size:12px;color:var(--text-muted);margin-top:14px">يُلغى في أي وقت · لا عقود · لا رسوم خفية</p>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="testimonials-section fade-in">
  <div class="section-tag">✦ آراء تهمّك</div>
  <h2 class="section-title">يقولون عن تدّبير</h2>

  <div class="testimonials-grid">
    <div class="testimonial-card fade-in">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"كنت أصرف الراتب في أسبوعين ولا أعرف وين! تدّبير خلّاني أشوف وين تروح فلوسي وأوقف الصرف الغير مبرر"</p>
      <div class="testimonial-author">
        <div class="author-avatar">خ</div>
        <div>
          <div class="author-name">خالد العمري</div>
          <div class="author-role">مهندس — الرياض</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card fade-in">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"حاسبة الزكاة وحدها تستاهل — أخيراً أقدر أحسب زكاتي بثقة وفق المذهب الصحيح"</p>
      <div class="testimonial-author">
        <div class="author-avatar">ن</div>
        <div>
          <div class="author-name">نورة السهلي</div>
          <div class="author-role">معلمة — جدة</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card fade-in">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"بعد ٦٠ يوم مع تدّبير وفّرت أكثر مما وفّرته في سنة كاملة ,التحليل الذكي غيّر طريقة تفكيري"</p>
      <div class="testimonial-author">
        <div class="author-avatar">م</div>
        <div>
          <div class="author-name">محمد الزهراني</div>
          <div class="author-role">رائد أعمال — الدمام</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ═══ CTA ═══ -->
<section class="cta-section fade-in">
  <div class="cta-box">
    <svg class="cta-logo" viewBox="579 257 274 290" xmlns="http://www.w3.org/2000/svg">
      <path d="M 696.019531 274.660156 C 700.972656 264.074219 709.1875 258.191406 720.722656 257.789062 C 730.949219 257.429688 740.335938 262.171875 745.921875 272.554688 C 749.960938 280.058594 750.703125 288.234375 750.054688 296.601562 C 749.03125 309.828125 744.488281 322.011719 738.839844 333.824219 C 732.789062 346.480469 727.023438 359.246094 722.515625 372.550781 C 721.511719 374.308594 720.429688 372.941406 715.859375 359.167969 C 709.957031 345.957031 699.234375 323.609375 695.242188 276.539062 C 695.460938 275.945312 695.726562 275.367188 696.019531 274.660156 Z" fill="rgba(201,168,76,0.9)"/>
      <path d="M 839.804688 365.90625 C 852.660156 373.285156 855.777344 389.179688 849.320312 400.796875 C 845.71875 407.277344 832.960938 413.355469 822.273438 416.632812 C 811.609375 415.292969 801.027344 412.566406 769.671875 374.929688 C 780.933594 370.296875 792.214844 365.738281 804.1875 363.167969 C 813.496094 361.167969 822.789062 360.710938 832.125 362.925781 C 834.78125 363.558594 837.300781 364.535156 839.804688 365.90625 Z" fill="rgba(240,217,138,0.7)"/>
      <path d="M 679.117188 377.570312 C 688.652344 381.199219 698.277344 384.101562 707.984375 386.472656 C 694.023438 390.90625 669.980469 402.164062 660.292969 406.65625 C 639.984375 413.191406 613.320312 414.535156 605.769531 412.945312 C 599.492188 407.84375 590.597656 374.574219 599.765625 365.625 C 611.015625 362.910156 620.632812 360.59375 639.613281 363.425781 C 649.667969 365.714844 659.21875 369.46875 679.117188 377.570312 Z" fill="rgba(201,168,76,0.65)"/>
    </svg>
    <h2 class="cta-title">ابدأ رحلتك المالية اليوم</h2>
    <p class="cta-sub">انضم لآلاف المستخدمين الذين سيطروا على مالهم مع تدّبير. مجاني للبدء، قوي للنمو.</p>
    <a href="#" class="btn-primary" style="font-size:16px;padding:16px 40px">ابدأ مجاناً الآن ✦</a>
    <p style="font-size:12px;color:rgba(255,255,255,0.28);margin-top:20px">لا يتطلب بطاقة ائتمانية · يعمل على كل الأجهزة</p>
  </div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer>
  <div>
    <div class="footer-brand">
      <svg width="28" height="28" viewBox="579 257 274 290" xmlns="http://www.w3.org/2000/svg">
        <path d="M 696.019531 274.660156 C 700.972656 264.074219 709.1875 258.191406 720.722656 257.789062 C 730.949219 257.429688 740.335938 262.171875 745.921875 272.554688 C 749.960938 280.058594 750.703125 288.234375 750.054688 296.601562 C 749.03125 309.828125 744.488281 322.011719 738.839844 333.824219 C 732.789062 346.480469 722.515625 372.550781 720.429688 372.941406 C 715.859375 359.167969 699.234375 323.609375 695.242188 276.539062 C 695.460938 275.945312 695.726562 275.367188 696.019531 274.660156 Z" fill="rgba(201,168,76,0.7)"/>
        <path d="M 839.804688 365.90625 C 852.660156 373.285156 849.320312 400.796875 822.273438 416.632812 C 801.027344 412.566406 769.671875 374.929688 780.933594 370.296875 C 792.214844 365.738281 804.1875 363.167969 822.125 362.925781 C 834.78125 363.558594 837.300781 364.535156 839.804688 365.90625 Z" fill="rgba(240,217,138,0.6)"/>
        <path d="M 679.117188 377.570312 C 688.652344 381.199219 698.277344 384.101562 707.984375 386.472656 C 694.023438 390.90625 660.292969 406.65625 639.984375 413.191406 C 613.320312 414.535156 599.492188 407.84375 590.597656 374.574219 C 599.765625 365.625 620.632812 360.59375 639.613281 363.425781 C 649.667969 365.714844 679.117188 377.570312 679.117188 377.570312 Z" fill="rgba(201,168,76,0.55)"/>
      </svg>
      <span class="footer-brand-text">تدّبير</span>
    </div>
    <p class="footer-tagline">مخططك المالي الذكي</p>
  </div>
  <div class="footer-copy">© 2026 تدّبير · جميع الحقوق محفوظة</div>
</footer>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  observer.observe(el);
});
</script>
</body>
</html>
