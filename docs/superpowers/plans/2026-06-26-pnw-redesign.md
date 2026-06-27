# PNW Redesign — Color Scheme & Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the neon cyberpunk theme with a Pacific Northwest Editorial design (two switchable themes) and update all content from the new resume.

**Architecture:** All theme colors live as CSS custom properties in `style.css`; Option 1 (dark forest) is `:root`, Option 2 (misty morning) overrides via `[data-theme="light"]`. A single toggle button in the navbar persists the choice to `localStorage`. No framework, no build step — plain HTML/CSS/JS.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, Grid, Flexbox), ES6 JS. Google Fonts (Poppins, Inter). Static files only.

## Global Constraints

- Never use neon cyan (`#00ffff`), magenta (`#ff00ff`), or neon green (`#00ff88`) anywhere
- No `box-shadow` glow effects (no `rgba(0,255,255,...)` or `rgba(255,0,255,...)` in shadows)
- No gradient text (no `text-shadow` glows on text)
- No skill percentage bars in index.html
- Resume PDF download must link to `assets/Cheyenne_Resume.pdf`
- Contact email: `contact@cheyennebounds.com`
- Footer copyright: `cheyennebounds.com`
- blog.html and projects.html are placeholder pages — do not modify them
- No new fonts, no framework, no build tooling

---

## File Map

| File | What changes |
|------|-------------|
| `assets/Cheyenne_Resume.pdf` | Replaced by new PDF (copy from project root) |
| `css/style.css` | Full CSS variable replacement; remove all glow effects; add new layout component styles; add `[data-theme="light"]` block |
| `index.html` | Nav updated; hero restructured; about section redesigned; experience list replaces timeline; skills replaced with grouped tags; education simplified; CTA/footer updated with new contact info |
| `js/main.js` | Add theme toggle handler (preserves all existing nav/scroll/animation logic) |
| `contact.html` | Remove `text-gradient` from nav brand; update footer email; add theme toggle button to nav |

---

## Task 1: Copy New Resume PDF to Assets

**Files:**
- Modify: `assets/Cheyenne_Resume.pdf` (overwrite)

- [ ] **Step 1: Copy the new PDF over the old one**

Run in Bash (POSIX):
```bash
cp "c:/Users/CBounds1/.cursor/projects/Development-Projects/resume-website/Cheyenne Bounds Resume.pdf" \
   "c:/Users/CBounds1/.cursor/projects/Development-Projects/resume-website/assets/Cheyenne_Resume.pdf"
```

- [ ] **Step 2: Verify the file was replaced**

Run:
```bash
ls -lh "c:/Users/CBounds1/.cursor/projects/Development-Projects/resume-website/assets/"
```

Expected: `Cheyenne_Resume.pdf` present, size ~514KB (matching the new file).

---

## Task 2: Rewrite CSS Variables and Base Styles

**Files:**
- Modify: `css/style.css` — lines 1–125 (`:root` block) and lines 238–243 (`.text-gradient`) and lines 336–339 (`.btn-primary` hover glow) and lines 478–479 (form input focus glow) and lines 519–540 (badge neon colors) and lines 551–553 (navbar bg) and lines 558–561 (navbar scrolled) and lines 649–652 (hero background gradient) and lines 692–714 (timeline glow dots) and lines 807–812 (skill progress glow) and lines 832–834 (tag hover glow) and lines 868–873 (footer social hover glow)

- [ ] **Step 1: Replace the `:root` CSS variable block (lines 8–125)**

Replace the entire `:root { ... }` block with:

```css
:root {
  /* === Option 1: Pacific Northwest Editorial (Dark Forest) === */

  /* Core colors */
  --color-background: #244855;
  --color-surface: #2d5a6b;
  --color-surface-light: #356878;

  /* Text */
  --color-text-primary: #FBE9D0;
  --color-text-secondary: rgba(251, 233, 208, 0.85);
  --color-text-muted: rgba(251, 233, 208, 0.6);

  /* Brand colors */
  --color-primary: #E64833;
  --color-primary-light: #ea6655;
  --color-primary-dark: #cc3f2c;
  --color-secondary: #874F41;
  --color-secondary-light: #9d6356;
  --color-accent: #90AEAD;
  --color-accent-light: #a8c2c1;
  --color-olive: #687864;

  /* Borders */
  --color-border: rgba(144, 174, 173, 0.3);

  /* Semantic */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #5085A5;

  /* Nav */
  --color-navbar-bg: rgba(36, 72, 85, 0.85);
  --color-navbar-scrolled: rgba(36, 72, 85, 0.97);

  /* Hero */
  --hero-bg: linear-gradient(150deg, #244855 0%, #1a3540 100%);

  /* No glow shadows */
  --shadow-glow: none;
  --shadow-glow-accent: none;

  /* === Typography === */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-heading: 'Poppins', 'Inter', -apple-system, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;

  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* === Spacing === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* === Border Radius === */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* === Shadows (no glows) === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 10px 10px -5px rgba(0, 0, 0, 0.25);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.4);

  /* === Transitions === */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* === Z-index === */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-tooltip: 600;

  /* === Container Widths === */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}

/* === Option 2: Misty Morning (Light) === */
[data-theme="light"] {
  --color-background: #F7F9FB;
  --color-surface: #eef1f4;
  --color-surface-light: #e4e9ed;

  --color-text-primary: #1a3540;
  --color-text-secondary: #244855;
  --color-text-muted: #687864;

  --color-primary: #E64833;
  --color-primary-light: #ea6655;
  --color-primary-dark: #cc3f2c;
  --color-secondary: #31708E;
  --color-secondary-light: #4587a5;
  --color-accent: #31708E;
  --color-accent-light: #4587a5;
  --color-olive: #90AEAD;

  --color-border: rgba(36, 72, 85, 0.15);

  --color-navbar-bg: rgba(247, 249, 251, 0.9);
  --color-navbar-scrolled: rgba(247, 249, 251, 0.98);

  --hero-bg: linear-gradient(150deg, #F7F9FB 0%, #eef1f4 100%);

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.12);
}
```

- [ ] **Step 2: Update `.text-gradient` (was neon cyan glow, now plain primary color)**

Find and replace in `css/style.css`:
```css
.text-gradient {
  color: var(--color-primary);
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}
```
Replace with:
```css
.text-gradient {
  color: var(--color-primary);
}
```

- [ ] **Step 3: Remove neon glow from `.btn-primary:hover`**

Find:
```css
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), 0 0 25px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.4);
}
```
Replace with:
```css
.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

- [ ] **Step 4: Update `.btn-primary` base style (was dark bg color)**

Find:
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-background);
  box-shadow: var(--shadow-md);
}
```
Replace with:
```css
.btn-primary {
  background: var(--color-primary);
  color: #FBE9D0;
  box-shadow: var(--shadow-md);
}
```

- [ ] **Step 5: Update `.btn-outline` (was neon cyan border/text)**

Find:
```css
.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
}
```
Replace with:
```css
.btn-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-text-primary);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-text-primary);
  color: var(--color-background);
}
```

- [ ] **Step 6: Update `.card:hover` (was neon border)**

Find:
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}
```
Replace with:
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}
```

- [ ] **Step 7: Update `.card-gradient` (was neon cyan border)**

Find:
```css
.card-gradient {
  background: var(--color-surface);
  border: 1px solid rgba(0, 255, 255, 0.3);
}
```
Replace with:
```css
.card-gradient {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

- [ ] **Step 8: Update form input focus glow**

Find:
```css
.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.2), 0 0 15px rgba(0, 255, 255, 0.3);
}
```
Replace with:
```css
.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(230, 72, 51, 0.15);
}
```

- [ ] **Step 9: Update badge neon colors**

Find and replace the entire badge variant block:
```css
.badge-primary {
  background-color: rgba(0, 255, 255, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.badge-secondary {
  background-color: rgba(255, 0, 255, 0.15);
  color: var(--color-secondary);
  border: 1px solid rgba(255, 0, 255, 0.3);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.2);
  color: var(--color-success);
}

.badge-accent {
  background-color: rgba(0, 255, 136, 0.15);
  color: var(--color-accent);
  border: 1px solid rgba(0, 255, 136, 0.3);
}
```
Replace with:
```css
.badge-primary {
  background-color: rgba(230, 72, 51, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(230, 72, 51, 0.3);
}

.badge-secondary {
  background-color: rgba(135, 79, 65, 0.2);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.15);
  color: var(--color-success);
}

.badge-accent {
  background-color: rgba(144, 174, 173, 0.2);
  color: var(--color-accent);
  border: 1px solid var(--color-border);
}
```

- [ ] **Step 10: Update `.navbar` background (was hardcoded dark)**

Find:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background-color: rgba(15, 15, 17, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
  transition: all var(--transition-base);
}

.navbar.scrolled {
  background-color: rgba(15, 15, 17, 0.95);
  box-shadow: var(--shadow-lg);
}
```
Replace with:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background-color: var(--color-navbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
  transition: all var(--transition-base);
}

.navbar.scrolled {
  background-color: var(--color-navbar-scrolled);
  box-shadow: var(--shadow-lg);
}
```

- [ ] **Step 11: Update `.navbar-link` hover/active (was neon cyan)**

Find:
```css
.navbar-link:hover,
.navbar-link.active {
  color: var(--color-primary);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary-gradient);
  transition: width var(--transition-base);
}
```
Replace with:
```css
.navbar-link:hover,
.navbar-link.active {
  color: var(--color-primary);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width var(--transition-base);
}
```

- [ ] **Step 12: Update `.hero-background` (remove radial neon glow)**

Find:
```css
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%);
  z-index: -1;
}
```
Replace with:
```css
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--hero-bg);
  z-index: -1;
}
```

- [ ] **Step 13: Update timeline (remove neon dot glow)**

Find:
```css
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-primary);
}
```
Replace with:
```css
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--color-olive);
}
```

Find:
```css
.timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-8) - 6px);
  top: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-primary);
  box-shadow: 0 0 15px var(--color-primary), 0 0 30px rgba(0, 255, 255, 0.5);
  z-index: 1;
}
```
Replace with:
```css
.timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-8) - 5px);
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-primary);
  z-index: 1;
}
```

Find:
```css
.timeline-company {
  font-size: var(--text-base);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}
```
(This is fine, keep as-is — `--color-primary` is now coral red, which is correct.)

Find:
```css
.timeline-contributions h4 {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: #7ec8c8;
  margin-bottom: var(--space-3);
}
```
Replace with:
```css
.timeline-contributions h4 {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}
```

Find:
```css
.timeline-contributions li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #7ec8c8;
  font-size: var(--text-sm);
}
```
Replace with:
```css
.timeline-contributions li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: var(--text-sm);
}
```

- [ ] **Step 14: Update skill progress bar (remove neon glow)**

Find:
```css
.skill-progress {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
  box-shadow: var(--shadow-glow);
}
```
Replace with:
```css
.skill-progress {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}
```

- [ ] **Step 15: Update tag hover (remove neon glow)**

Find:
```css
.tag:hover {
  border-color: var(--color-primary);
  background-color: rgba(0, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}
```
Replace with:
```css
.tag:hover {
  border-color: var(--color-primary);
  background-color: rgba(230, 72, 51, 0.1);
}
```

- [ ] **Step 16: Update footer social hover (remove neon glow)**

Find:
```css
.footer-social-link:hover {
  background: var(--color-primary);
  color: var(--color-background);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}
```
Replace with:
```css
.footer-social-link:hover {
  background: var(--color-primary);
  color: #FBE9D0;
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

- [ ] **Step 17: Update hardcoded color values in heading and paragraph base styles**

Find:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: #ffffff;
  margin-bottom: var(--space-4);
}
```
Replace with:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}
```

Find:
```css
p {
  margin-bottom: var(--space-4);
  color: #e0e0e0;
  line-height: var(--leading-relaxed);
}
```
Replace with:
```css
p {
  margin-bottom: var(--space-4);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

Find:
```css
.timeline-description {
  color: #e0e0e0;
  line-height: var(--leading-relaxed);
}
```
Replace with:
```css
.timeline-description {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

Find:
```css
.timeline-contributions li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  color: #e0e0e0;
  line-height: var(--leading-relaxed);
}
```
Replace with:
```css
.timeline-contributions li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

Find:
```css
.card-description {
  color: #e0e0e0;
  font-size: var(--text-base);
}
```
Replace with:
```css
.card-description {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
}
```

- [ ] **Step 18: Update mobile menu background (was hardcoded surface)**

Find (in the `@media (max-width: 768px)` block):
```css
.navbar-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-surface);
  flex-direction: column;
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}
```
This is fine as-is — `--color-surface` is already themed. No change needed.

---

## Task 3: Add New Layout CSS Classes to style.css

**Files:**
- Modify: `css/style.css` — append new classes before the `@media` blocks (before line 986)

- [ ] **Step 1: Add section label, hero eyebrow, about grid, experience list, skills grid, education list, theme toggle, and CTA styles**

In `css/style.css`, find the `/* ============================\n   RESPONSIVE DESIGN` comment block and insert the following CSS block immediately **before** it:

```css
/* ============================
   SECTION LABELS
   ============================ */
.section-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.section-heading {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-12);
  line-height: var(--leading-tight);
}

/* ============================
   HERO UPDATES
   ============================ */
.hero-eyebrow {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-3);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: var(--font-extrabold);
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-accent);
  letter-spacing: 0.02em;
  margin-bottom: var(--space-4);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ============================
   ABOUT SECTION
   ============================ */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-16);
  align-items: start;
}

.about-statement h2 {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-6);
  line-height: 1.3;
}

.facts-list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 var(--space-6);
}

.facts-list dt,
.facts-list dd {
  padding: var(--space-3) 0;
  border-top: 1px solid var(--color-border);
  margin: 0;
}

.facts-list dt {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  padding-right: var(--space-4);
}

.facts-list dd {
  font-size: var(--text-base);
  color: var(--color-text-primary);
}

/* ============================
   EXPERIENCE LIST
   ============================ */
.exp-list {
  display: flex;
  flex-direction: column;
}

.exp-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-olive);
}

.exp-item:last-child {
  border-bottom: 1px solid var(--color-olive);
}

.exp-year {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-accent);
  padding-top: var(--space-1);
  line-height: 1.4;
}

.exp-role {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.exp-company {
  font-size: var(--text-base);
  color: var(--color-primary);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}

.exp-desc {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.exp-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exp-bullets li {
  position: relative;
  padding-left: var(--space-5);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  font-size: var(--text-sm);
}

.exp-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* ============================
   SKILLS GRID
   ============================ */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 var(--space-12);
}

.skill-group {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-olive);
}

.skill-group-label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.skill-group-items {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin-bottom: 0;
}

/* ============================
   EDUCATION LIST
   ============================ */
.edu-list {
  display: flex;
  flex-direction: column;
  max-width: 700px;
}

.edu-item {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-olive);
}

.edu-item:last-child {
  border-bottom: 1px solid var(--color-olive);
}

.edu-degree {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.edu-school {
  font-size: var(--text-base);
  color: var(--color-primary);
  font-weight: var(--font-medium);
  margin-bottom: 0;
}

/* ============================
   THEME TOGGLE BUTTON
   ============================ */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 1rem;
  margin-left: var(--space-4);
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* ============================
   CTA SECTION
   ============================ */
.cta-inner {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-12) 0;
}

.cta-heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-extrabold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  line-height: 1.1;
}

.cta-sub {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}
```

- [ ] **Step 2: Add responsive rules for new components to the existing `@media` blocks**

In the `@media (max-width: 768px)` block (around line 1002 after additions), append these rules inside it:

```css
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .exp-item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    font-size: var(--text-3xl);
  }
```

---

## Task 4: Rewrite index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the entire contents of index.html**

Write the following complete file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Cheyenne Bounds — Cybersecurity Engineer specializing in Zero Trust Architecture, Security Operations, and Compliance at T-Mobile.">
    <title>Cheyenne Bounds — Cybersecurity Engineer</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container navbar-container">
            <a href="index.html" class="navbar-brand">Cheyenne Bounds</a>

            <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle menu">
                <span class="navbar-toggle-bar"></span>
                <span class="navbar-toggle-bar"></span>
                <span class="navbar-toggle-bar"></span>
            </button>

            <ul class="navbar-menu" id="navbar-menu">
                <li><a href="#home" class="navbar-link active">Home</a></li>
                <li><a href="#about" class="navbar-link">About</a></li>
                <li><a href="#experience" class="navbar-link">Experience</a></li>
                <li><a href="#skills" class="navbar-link">Skills</a></li>
                <li><a href="#education" class="navbar-link">Education</a></li>
                <li><a href="contact.html" class="navbar-link">Contact</a></li>
            </ul>

            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Switch theme">◐</button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background"></div>
        <div class="container hero-content">
            <div class="animate-fade-in">
                <p class="hero-eyebrow">Cybersecurity Engineer</p>
                <h1 class="hero-title">Cheyenne Bounds</h1>
                <p class="hero-subtitle">Zero Trust Architecture · Security Operations · Compliance</p>
                <p class="hero-description">
                    Proven track record in secure network infrastructure, ZTNA implementation,
                    and compliance-aligned security programs at T-Mobile. Based in Seattle, WA.
                </p>
                <div class="hero-cta">
                    <a href="contact.html" class="btn btn-primary btn-lg">Get In Touch</a>
                    <a href="assets/Cheyenne_Resume.pdf" class="btn btn-outline btn-lg" download>Download Resume</a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <span class="section-label">About</span>
            <div class="about-grid">
                <div class="about-statement">
                    <h2>Building secure infrastructure with clarity and precision.</h2>
                    <p>
                        I'm a Cybersecurity Engineer at T-Mobile specializing in Zero Trust Network Access,
                        where I bridge the gap between security requirements and operational realities.
                        Proven track record of innovation and leadership in developing and implementing
                        secure network infrastructure solutions using ZTNA concepts and application-level segmentation.
                    </p>
                    <p>
                        I bring a security-first mindset to every layer of the stack — from identity and access management
                        to compliance documentation and audit readiness. Experienced in cyber security incident management,
                        working independently and as part of cross-functional teams.
                    </p>
                </div>
                <div class="about-facts">
                    <dl class="facts-list">
                        <dt>Role</dt>
                        <dd>Cybersecurity Engineer, ZTNA</dd>
                        <dt>Company</dt>
                        <dd>T-Mobile</dd>
                        <dt>Location</dt>
                        <dd>Seattle, WA</dd>
                        <dt>Focus</dt>
                        <dd>Zero Trust Architecture</dd>
                        <dt>Experience</dt>
                        <dd>4+ years</dd>
                        <dt>Email</dt>
                        <dd><a href="mailto:contact@cheyennebounds.com">contact@cheyennebounds.com</a></dd>
                    </dl>
                </div>
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section">
        <div class="container">
            <span class="section-label">Experience</span>
            <h2 class="section-heading">Professional History</h2>

            <div class="exp-list" style="max-width: 900px;">

                <div class="exp-item animate-fade-in">
                    <div class="exp-year">2/2025 — Present</div>
                    <div class="exp-content">
                        <h3 class="exp-role">Cybersecurity Engineer, ZTNA</h3>
                        <p class="exp-company">T-Mobile · Seattle, WA</p>
                        <p class="exp-desc">
                            Develop, implement, and maintain secure network infrastructure solutions utilizing
                            Zero Trust Network Access (ZTNA) and VPN technologies. Monitor security protocols,
                            respond to cyber security incidents, and act as a leader and mentor to junior personnel.
                        </p>
                        <ul class="exp-bullets">
                            <li>Supported identity- and policy-based access control using Zscaler, integrating SCIM provisioning and Microsoft Entra ID to enforce Zero Trust access across legacy and data center environments.</li>
                            <li>Automated 42% of previously manual security and access management tasks, increasing operational efficiency.</li>
                            <li>Participated in control effectiveness testing and remediation resulting in 100% compliance with SOX, PCI, and CPNI requirements.</li>
                            <li>Developed standardized documentation and repeatable evidence templates to improve audit readiness.</li>
                            <li>Partnered with threat, engineering, and compliance teams to identify internal vulnerabilities and strengthen the control environment.</li>
                        </ul>
                        <div class="flex gap-2" style="margin-top: var(--space-4);">
                            <span class="badge badge-primary">Zero Trust</span>
                            <span class="badge badge-accent">ZTNA</span>
                            <span class="badge badge-secondary">IAM</span>
                            <span class="badge badge-success">Compliance</span>
                        </div>
                    </div>
                </div>

                <div class="exp-item animate-fade-in">
                    <div class="exp-year">4/2024 — 2/2025</div>
                    <div class="exp-content">
                        <h3 class="exp-role">Engineer, Systems Architecture</h3>
                        <p class="exp-company">T-Mobile · Seattle, WA</p>
                        <p class="exp-desc">
                            Oversaw total life cycle focus for complex system designs from requirements development and
                            architecture creation. Partnered with SMEs, program management, and engineering leadership
                            to drive technical solutions and ensure requirements focused on "building the right thing."
                        </p>
                        <ul class="exp-bullets">
                            <li>Designed and deployed hybrid-cloud infrastructure aligned with Zero Trust and OnPrem Cloud principles.</li>
                            <li>Automated network operations, improving response times by 20% and reducing manual intervention.</li>
                            <li>Developed and enforced policies to ensure high availability and compliance with SOX, PCI, and CPNI regulations.</li>
                            <li>Mentored junior and senior engineers in troubleshooting, infrastructure best practices, and security-first design.</li>
                        </ul>
                        <div class="flex gap-2" style="margin-top: var(--space-4);">
                            <span class="badge badge-primary">Cloud Security</span>
                            <span class="badge badge-accent">Automation</span>
                            <span class="badge badge-secondary">Architecture</span>
                        </div>
                    </div>
                </div>

                <div class="exp-item animate-fade-in">
                    <div class="exp-year">9/2021 — 4/2024</div>
                    <div class="exp-content">
                        <h3 class="exp-role">Associate Engineer, Systems Architecture</h3>
                        <p class="exp-company">T-Mobile · Seattle, WA</p>
                        <p class="exp-desc">
                            Designed and developed system architectures, defining key capabilities, performance requirements,
                            and interface definitions. Developed models and architectural guidelines for current and future
                            system development.
                        </p>
                        <ul class="exp-bullets">
                            <li>Led firewall and perimeter security operations, supporting high-priority applications and audits for SOX/PCI compliance.</li>
                            <li>Streamlined approval and validation workflows, reducing firewall rule turnaround times by 25%.</li>
                            <li>Facilitated application migrations (PCF and TKE) while ensuring policy integrity and secure access during transition.</li>
                            <li>Delivered technical documentation and collaborated with security, payment, and ops teams for infrastructure-aligned change control.</li>
                        </ul>
                        <div class="flex gap-2" style="margin-top: var(--space-4);">
                            <span class="badge badge-primary">Firewall</span>
                            <span class="badge badge-accent">SOX/PCI</span>
                            <span class="badge badge-secondary">Migration</span>
                        </div>
                    </div>
                </div>

                <div class="exp-item animate-fade-in">
                    <div class="exp-year">4/2021 — 6/2021</div>
                    <div class="exp-content">
                        <h3 class="exp-role">Launch Engineer Intern</h3>
                        <p class="exp-company">Firefly Aerospace</p>
                        <p class="exp-desc">
                            Developed launch pad safety beacon and public alert systems. Automated internal workflows
                            to improve testing operations. Supported pad readiness during critical launch preparation.
                        </p>
                    </div>
                </div>

                <div class="exp-item animate-fade-in">
                    <div class="exp-year">8/2015 — 5/2016</div>
                    <div class="exp-content">
                        <h3 class="exp-role">Technical Support Specialist</h3>
                        <p class="exp-company">Wave Broadband</p>
                        <p class="exp-desc">
                            Delivered remote technical troubleshooting for broadband, TV, and voice services.
                            Reduced service disruptions by 20% through accurate diagnostics and secure data handling.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
        <div class="container">
            <span class="section-label">Skills</span>
            <h2 class="section-heading">Core Competencies</h2>

            <div class="skills-grid" style="max-width: 1000px;">
                <div class="skill-group">
                    <h4 class="skill-group-label">Zero Trust & Network Security</h4>
                    <p class="skill-group-items">Zscaler ZIA &amp; ZPA · Axis · Prisma Access · Palo Alto Firewall · Checkpoint · IAM &amp; SSO Integration · VPN Technologies · Firewall &amp; Perimeter Security</p>
                </div>
                <div class="skill-group">
                    <h4 class="skill-group-label">Security Operations</h4>
                    <p class="skill-group-items">SIEM/SOAR Tools · Splunk · Incident Response · Vulnerability Management · CASB Solutions · SaaS Security · DDoS/WAF (Cloudflare, Silverline) · NDR Tools</p>
                </div>
                <div class="skill-group">
                    <h4 class="skill-group-label">Compliance &amp; Governance</h4>
                    <p class="skill-group-items">SOX · PCI-DSS · CPNI · NIST Framework · CIS Controls · Security Documentation &amp; Audits · Access Reviews · Risk Assessment &amp; Mitigation</p>
                </div>
                <div class="skill-group">
                    <h4 class="skill-group-label">Cloud &amp; Infrastructure</h4>
                    <p class="skill-group-items">AWS · Azure · Google Cloud Platform · Cloud Migration · Configuration Auditing · Hybrid Cloud Architecture · DLP (Microsoft Purview, Conditional Access)</p>
                </div>
                <div class="skill-group">
                    <h4 class="skill-group-label">Tools &amp; Platforms</h4>
                    <p class="skill-group-items">ServiceNow · Jira · Python · Agile/Scrum · Automation Tools · Email Protection (Proofpoint, Barracuda, SpamTitan, Mimecast)</p>
                </div>
                <div class="skill-group">
                    <h4 class="skill-group-label">Leadership &amp; Communication</h4>
                    <p class="skill-group-items">Project Management · Security Documentation · Mentorship · Cross-functional Collaboration · GRC Walkthroughs · Stakeholder Communication</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="section">
        <div class="container">
            <span class="section-label">Education</span>
            <h2 class="section-heading">Academic Background</h2>

            <div class="edu-list">
                <div class="edu-item">
                    <h3 class="edu-degree">Master of Science, Information Technology — Cybersecurity</h3>
                    <p class="edu-school">Purdue University Global</p>
                </div>
                <div class="edu-item">
                    <h3 class="edu-degree">Bachelor of Science, Computer Science</h3>
                    <p class="edu-school">Colorado State University Global</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section">
        <div class="container">
            <div class="cta-inner">
                <h2 class="cta-heading">Let's connect.</h2>
                <p class="cta-sub">
                    Open to discussing cybersecurity solutions, Zero Trust architecture,
                    or new opportunities with fellow security professionals.
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <a href="contact.html" class="btn btn-primary btn-xl">Get In Touch</a>
                    <a href="https://www.linkedin.com/in/cheyenne-bounds/" class="btn btn-outline btn-xl" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container footer-content">
            <div class="footer-social">
                <a href="https://www.linkedin.com/in/cheyenne-bounds/" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
                <a href="mailto:contact@cheyennebounds.com" class="footer-social-link" aria-label="Email">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                </a>
                <a href="tel:2065956349" class="footer-social-link" aria-label="Phone">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                </a>
            </div>
            <p class="footer-text">
                &copy; 2025 Cheyenne Bounds · cheyennebounds.com · Cybersecurity Engineer
            </p>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

---

## Task 5: Add Theme Toggle to main.js

**Files:**
- Modify: `js/main.js` — prepend theme toggle logic before all existing code

- [ ] **Step 1: Read the current top of main.js to identify insertion point**

Open `js/main.js` and read the first 10 lines to confirm the file starts with a comment or `document.addEventListener`.

- [ ] **Step 2: Prepend theme toggle script at the top of main.js**

Insert the following at the very top of `js/main.js` (before any existing code):

```javascript
// Theme toggle — persists choice in localStorage
(function() {
  const saved = localStorage.getItem('cb-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('cb-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('cb-theme', 'light');
    }
  });
});
```

---

## Task 6: Update contact.html

**Files:**
- Modify: `contact.html`

- [ ] **Step 1: Remove `text-gradient` class from navbar brand in contact.html**

Find:
```html
<a href="index.html" class="navbar-brand text-gradient">Cheyenne Bounds</a>
```
Replace with:
```html
<a href="index.html" class="navbar-brand">Cheyenne Bounds</a>
```

- [ ] **Step 2: Add theme toggle button to contact.html navbar**

Find in contact.html:
```html
            <ul class="navbar-menu" id="navbar-menu">
```
(The closing `</ul>` tag for navbar-menu will be a few lines later. After that closing tag, insert the theme toggle button.)

Find the end of the navbar-menu section. The pattern will be:
```html
            </ul>
        </div>
    </nav>
```
Replace with:
```html
            </ul>
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Switch theme">◐</button>
        </div>
    </nav>
```

- [ ] **Step 3: Update footer email in contact.html**

Find (in contact.html footer or contact info):
```
cheyenne.bounds@csuglobal.edu
```
Replace with:
```
contact@cheyennebounds.com
```

Also find any occurrence of the old CSU email in links and update:
```html
href="mailto:cheyenne.bounds@csuglobal.edu"
```
Replace with:
```html
href="mailto:contact@cheyennebounds.com"
```

---

## Verification

After all tasks are complete:

- [ ] Open `index.html` in a browser (open the file directly or via a local server)
- [ ] Confirm: dark forest teal background (`#244855`), cream text, coral red accent buttons
- [ ] Confirm: no neon cyan, no magenta, no glowing shadows anywhere
- [ ] Confirm: hero shows large name with eyebrow text and two buttons
- [ ] Confirm: About section shows two-column layout with facts list
- [ ] Confirm: Experience shows clean list with year/role/company/bullets — no glowing dots
- [ ] Confirm: Skills shows grouped tag layout — no percentage bars
- [ ] Confirm: Education shows two clean text entries — no heavy cards
- [ ] Click the `◐` theme toggle button in the nav — page should switch to light cream background with dark teal text
- [ ] Reload the page — theme choice should persist
- [ ] Click the "Download Resume" button — should prompt download of the updated PDF
- [ ] Verify `contact.html` loads correctly with matching nav
