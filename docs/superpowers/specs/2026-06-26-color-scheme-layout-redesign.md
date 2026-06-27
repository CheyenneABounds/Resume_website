# Resume Website Redesign — Color Scheme & Layout
**Date:** 2026-06-26
**Site:** cheyennebounds.com
**Stack:** Plain HTML/CSS/JS (static site, no build tools)

---

## Goal

Replace the current neon cyberpunk theme (cyan/magenta glows on black) with a Pacific Northwest nature-inspired design that feels professional and personal — not like an AI-generated template. Implement two complete themes: Option 1 (dark forest) and Option 2 (clean light), so both can be evaluated live.

---

## Option 1 — "Pacific Northwest Editorial" (Dark Forest)

### Color System

| Role | Name | Hex |
|------|------|-----|
| Page background | Deep Forest Teal | `#244855` |
| Surface / card background | Teal Midtone | `#2d5a6b` |
| Section divider / accent bg | Olive Moss | `#687864` |
| Primary accent (CTAs, active links) | Coral Red | `#E64833` |
| Secondary accent (hover, badges) | Rust Brown | `#874F41` |
| Supporting / muted elements | Sage | `#90AEAD` |
| Body text | Warm Cream | `#FBE9D0` |
| Muted text | Cream 70% | `rgba(251,233,208,0.7)` |
| Borders | Sage 30% | `rgba(144,174,173,0.3)` |

**Removed entirely:** all neon glow `box-shadow` and `text-shadow` effects. No `--color-primary: #00ffff`, no magenta, no animated glow rings.

### Typography

- **Poppins** — headings, kept as-is (strong, personal)
- **Inter** — body text, kept as-is
- Heading alignment: **left-aligned** on all sections except Hero (centered)
- Section labels: small uppercase tracked text in `#90AEAD` sage (e.g., `EXPERIENCE`, `SKILLS`)
- Hero name: `clamp(3rem, 8vw, 6rem)` — large statement, not a header

### Layout Changes

#### Navigation
- Transparent on load → solid `#244855` background on scroll
- Logo/name in `#FBE9D0` cream — no gradient text
- Nav links in `#90AEAD` sage; active link gets `#E64833` coral underline (not a pill/badge background)
- Remove all glow effects from hover states

#### Hero Section
- Full viewport height, content vertically and left-aligned (not centered block)
- Name: very large Poppins, `#FBE9D0`
- Title below in `#90AEAD` sage
- Tagline/short statement in muted cream
- Two buttons: "Get In Touch" (solid `#E64833` fill) and "Download Resume" (cream outline)
- Background: diagonal gradient `#244855` → `#1a3540` — no particles, no animated rings

#### About Section
- Two-column layout: left = short personal statement (2–3 sentences, first person), right = clean quick-facts list (location, focus, years experience)
- No icon grids, no "what I do" card rows
- Subtle `#687864` olive horizontal rule as section separator

#### Experience Section
- Left column: year in `#90AEAD` sage, bold
- Right column: role title in `#FBE9D0` cream, company name in `#E64833` coral
- Description as tight bullet points
- Entry separator: 1px `#687864` olive horizontal rule — no glowing dot timeline

#### Skills Section
- **Remove percentage bars entirely**
- Replace with grouped tag layout: category label in sage (e.g., "Zero Trust Architecture"), tools/skills listed as cream text beneath
- Groups: Security Tools | Cloud Platforms | Compliance Frameworks | Languages & Scripting
- No false-precision percentages

#### Education Section
- Two clean text entries: institution, degree, year
- No card borders, no heavy chrome

#### CTA / Footer
- Simple: large "Let's connect." heading in cream
- Single coral `#E64833` button: "Get In Touch"
- Footer: LinkedIn + email links, copyright, `cheyennebounds.com`
- No animated glow rings

---

## Option 2 — "Misty Morning" (Clean Light)

### Color System

| Role | Name | Hex |
|------|------|-----|
| Page background | Near White | `#F7F9FB` |
| Surface / card background | Light Gray | `#eef1f4` |
| Primary headings | Deep Forest Teal | `#244855` |
| Subheadings / labels | Cerulean | `#31708E` |
| Primary accent (CTAs) | Coral Red | `#E64833` |
| Supporting text | Olive Moss | `#687864` |
| Body text | Dark Teal (near black) | `#1a3540` |
| Muted text | `#687864` at 70% | `rgba(104,120,100,0.8)` |
| Borders | Light rule | `rgba(36,72,85,0.15)` |

### Layout Changes
- Same structural layout changes as Option 1 (no skill bars, editorial section labels, left-aligned headings, simplified experience list, minimal education)
- Hero: cream/white background with `#244855` text — bold name, clean
- Nav: white background, `#244855` links, `#E64833` active underline
- Buttons: `#E64833` solid for primary, `#244855` outline for secondary

---

## Shared Changes (Both Options)

1. **Remove all neon glow effects** — `box-shadow` glows, `text-shadow` glows, animated pulse rings
2. **Remove skill percentage bars** — replace with grouped tag list
3. **Remove gradient text** on nav logo and headings
4. **Section labels** become small uppercase tracked text in the muted accent color
5. **Experience timeline dots** replaced with clean horizontal rules
6. **Resume PDF swap** — "Download Resume" button links to `assets/Cheyenne_Resume.pdf`; user will replace the file when new resume is ready. No code change needed.
7. **Footer** includes `cheyennebounds.com` reference

---

## Files to Change

| File | Changes |
|------|---------|
| `css/style.css` | Full CSS variable replacement, remove glow shadows, rewrite hero/nav/skills/experience/education/footer styles |
| `css/blog.css` | Update color variable references to match new palette |
| `css/projects.css` | Update color variable references to match new palette |
| `index.html` | Update section markup for new layout (about two-col, skills groups, experience list, hero alignment) |
| `contact.html` | Color variable update only |
| `projects.html` | Color variable update only |
| `blog.html` | Color variable update only |

---

## Out of Scope

- No new pages
- No JavaScript behavior changes
- No new fonts
- No framework migration
- Resume PDF content (user will supply new PDF)
