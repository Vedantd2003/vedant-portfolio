# Design System — Field & Signal

> Version 1.0 | Portfolio: Vedant — AI/ML & Full-Stack Engineer

---

## Concept

**"Field & Signal"**

One moving amber spotlight follows the cursor through a Three.js hero scene. The signature 3D object morphs per section — neural lattice → circuit mesh → mechanical arm → creative polyhedron. One light, one object, one idea. The amber color is the only warm element in an otherwise cold, dark environment; it becomes the signature signal of Vedant's creative identity.

---

## Typography

### Typefaces

| Role | Family | Weights | Delivery |
|------|--------|---------|----------|
| Display | **PP Neue Montreal** | 400 / 500 / 700 | Self-hosted woff2, subset, `font-display: swap` |
| Body | **General Sans** | 400 / 500 | Self-hosted woff2, `font-display: swap` |
| Mono | **JetBrains Mono** | 400 | Self-hosted woff2 (or Google Fonts CDN fallback) |

> **Note:** woff2 files for PP Neue Montreal and General Sans must be placed in `/public/fonts/`. These are licensed fonts — obtain them from Pangram Pangram (PP Neue Montreal) and Fontshare (General Sans) before deployment. JetBrains Mono is available via Google Fonts CDN as a fallback.

### Font-face Declarations (Reference)

```css
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'General Sans';
  src: url('/fonts/GeneralSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'General Sans';
  src: url('/fonts/GeneralSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

### Fluid Type Scale

All sizes use `clamp()` for viewport-responsive scaling. No media query breakpoints needed for type.

```css
--text-hero:    clamp(4rem, 10vw, 12rem);    /* Hero headline */
--text-display: clamp(2.5rem, 5vw, 6rem);    /* Section titles */
--text-title:   clamp(1.5rem, 3vw, 3rem);    /* Sub-section titles */
--text-body:    clamp(0.9rem, 1.2vw, 1.1rem); /* Body paragraphs */
--text-label:   clamp(0.7rem, 0.9vw, 0.85rem);/* Captions, labels, tags */
```

### Type Settings

- **Line height:** 1.0 for display/hero (tight); 1.6 for body
- **Letter spacing:** -0.02em for display sizes; 0.08em for labels/mono
- **Measure (max line length):** 68ch for body text blocks
- **Word spacing:** default (never increase)

---

## Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-base` | `#0e0e0e` | Page background (near-black, not pure black — retains depth) |
| `--color-surface` | `#161616` | Card and panel backgrounds, elevated surfaces |
| `--color-border` | `#2a2a2a` | Subtle dividers, lines, borders |
| `--color-text-primary` | `#f0ece5` | Primary text (warm off-white) |
| `--color-text-secondary` | `#8a8680` | Secondary text, captions, muted labels |
| `--color-accent` | `#e8a94d` | Amber spotlight — use sparingly, signal not noise |
| `--color-accent-dim` | `#e8a94d26` | Accent at ~15% opacity — glows, hover halos |

### Accessibility

WCAG 2.1 AA minimum contrast ratio is 4.5:1 for normal text, 3:1 for large text.

| Combination | Ratio | Result |
|-------------|-------|--------|
| `#f0ece5` (primary text) on `#0e0e0e` (base) | **15.3:1** | ✓ AAA |
| `#e8a94d` (accent) on `#0e0e0e` (base) | **7.8:1** | ✓ AAA |
| `#8a8680` (secondary) on `#0e0e0e` (base) | **5.1:1** | ✓ AA |
| `#f0ece5` (primary text) on `#161616` (surface) | **13.7:1** | ✓ AAA |

### Color Usage Rules

1. **Accent is sacred** — `--color-accent` appears only on interactive highlights, the spotlight, and one key stat per section. Overuse kills the effect.
2. **Never pure black** — `#0e0e0e` not `#000000`. Pure black reads as a void; near-black reads as depth.
3. **No color gradients** — the amber spotlight in Three.js provides the only gradient; CSS backgrounds stay flat.
4. **Opacity layers** — use `--color-accent-dim` for hover halos, not a new color.

---

## Motion System

### Easing Curves

```css
--ease-expo:   cubic-bezier(0.16, 1, 0.3, 1);           /* Primary reveal — fast in, graceful out */
--ease-soft:   cubic-bezier(0.25, 0.46, 0.45, 0.94);    /* Subtle transitions — UI state changes */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);       /* Cursor + magnetic only — has overshoot */
```

> **Rule:** `--ease-spring` is the only curve with overshoot (bounce). It is reserved exclusively for cursor movement and magnetic element interactions. Nothing else bounces.

### Durations

```css
--dur-fast: 0.3s;   /* Micro-interactions: hover states, button feedback */
--dur-base: 0.6s;   /* Standard transitions: nav, tooltips, small reveals */
--dur-slow: 1.2s;   /* Large reveals: section entries, headline animations */
--dur-page: 1.8s;   /* Page-level transitions: preloader exit, overlay slides */
```

### Stagger Values

| Context | Stagger | Total max |
|---------|---------|-----------|
| Per-line text reveals | 0.07s | ~0.35s for 5 lines |
| Per-word opacity reveal | 0.04s | ~1.6s for 40 words |
| List item stagger (nav, caps) | 0.08s | ~0.4s for 5 items |
| Card/grid stagger | 0.1s | ~0.3s for 3 items |

### Scroll Animation Rules

- All scroll-triggered animations use GSAP ScrollTrigger
- `scrub: true` for parallax and progress-based effects
- `scrub: 1` (1s lag) for text opacity reveals — smoother feel
- Trigger markers removed in production
- All animations wrapped in `prefers-reduced-motion` check

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* All animated elements are visible at final state immediately */
  /* No transforms, no fades, no parallax */
  /* WebGL canvas still renders, but pauses animation loop */
}
```

---

## Grid System

### Layout Variables

```css
--gutter:    clamp(1rem, 3vw, 2rem);   /* Column gap, responsive */
--container: min(90vw, 1440px);         /* Max content width */
--cols:      12;                        /* Column count */
```

### Container Usage

```css
.container {
  width: var(--container);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
}
```

### Responsive Breakpoints

| Name | Width | Columns | Notes |
|------|-------|---------|-------|
| Mobile | < 640px | 4 | Stack everything, no sticky effects |
| Tablet | 640–1024px | 8 | Partial horizontal layouts |
| Desktop | > 1024px | 12 | Full layout intended |
| Wide | > 1440px | 12 | Container maxes out, gutters grow |

---

## Spacing Scale

Base unit: **8px**

```css
--space-1:  4px;   /* Tight internal padding (tags, badges) */
--space-2:  8px;   /* Base unit — icon gaps, tight stacks */
--space-3:  12px;  /* Small gaps within components */
--space-4:  16px;  /* Standard component padding */
--space-6:  24px;  /* Section sub-items, card padding */
--space-8:  32px;  /* Component vertical rhythm */
--space-12: 48px;  /* Section sub-section spacing */
--space-16: 64px;  /* Large internal section gaps */
--space-24: 96px;  /* Section vertical padding */
--space-32: 128px; /* Major section separators */
--space-48: 192px; /* Hero / full-section breathing room */
```

### Spacing Rules

1. Always use the scale — never arbitrary pixel values
2. Section vertical padding: `var(--space-24)` top + bottom minimum
3. Hero section: `var(--space-48)` padding
4. Card internal padding: `var(--space-6)` on mobile, `var(--space-8)` on desktop

---

## Component Patterns

### Text Reveal Animation

```
overflow: hidden wrapper
  └── span (or p) — translateY(100%) → translateY(0)
       duration: var(--dur-slow)
       ease: var(--ease-expo)
       stagger: 0.07s per line
```

### Magnetic Button

```
data-magnetic attribute on element
  ├── useMagnetic hook tracks mousemove near bounding box
  ├── lerps element transform toward cursor (strength: 0.4)
  ├── --ease-spring on release
  └── disabled on touch devices
```

### Project Card

```
card
  ├── number — mono, --text-label, --color-text-secondary
  ├── image area — 16:9, bg --color-surface
  ├── title — display font, --text-title
  ├── tech pills — small, --color-border background
  ├── stat — mono, --color-accent
  └── hover: scale(1.02) on image, "View Project →" button appears
```

### Nav Link (Text-Roll)

```html
<a class="nav-link">
  <span class="nav-link__inner" aria-hidden="true">Work</span>
  <span class="nav-link__hover">Work</span>
</a>
```

On hover: both spans move `translateY(-100%)` via GSAP (duration: 0.3s, ease: --ease-soft).

---

## Three.js / WebGL System

### Canvas Architecture

- **One shared R3F Canvas** at root level (`layout.tsx`)
- Sections interact with the 3D scene via React context + zustand (or `atom`)
- No per-section canvases — GPU memory is precious

### Scene Composition

```
Canvas (full-page, position: fixed, z-index: 0, pointer-events: none)
  └── HeroScene
       ├── fog (#0e0e0e, near: 8, far: 25)
       ├── ambientLight (intensity: 0.05)
       ├── SpotLight (amber, follows cursor)
       ├── SignalObject (morphing central object)
       └── EffectComposer
            ├── Noise (opacity: 0.04)
            └── ChromaticAberration (offset: 0.0005, disabled mobile)
```

### Performance Budget

| Setting | Desktop | Mobile |
|---------|---------|--------|
| DPR cap | `Math.min(devicePixelRatio, 2)` | `Math.min(devicePixelRatio, 1.5)` |
| Antialias | On | Off |
| Post-processing | Full | Disabled |
| Shadow map | On | Off |
| Geometry detail | High (IcosahedronGeometry subdivisions: 3) | Low (subdivisions: 1) |

### SignalObject Morph States

| Index | Section | Geometry Concept | Distortion |
|-------|---------|-----------------|------------|
| 0 | Hero | Neural lattice — IcosahedronGeometry, high subdivisions | Low, organic pulse |
| 1 | Work | Circuit mesh — TorusKnotGeometry variant | Medium, angular |
| 2 | Capabilities | Mechanical arm — octahedron-derived | High, sharp |
| 3 | Contact | Creative polyhedron — DodecahedronGeometry | Low, crystalline |

---

## Icon System

- No icon library dependency
- All icons: inline SVG, 24×24 viewBox, `currentColor` stroke
- Arrow icon (scroll cue, CTAs): custom SVG
- Social icons: GitHub, LinkedIn, Twitter — custom SVG only
- No emoji in code (brand risk, rendering inconsistency)

---

## Accessibility Standards

1. **WCAG 2.1 AA** minimum; AAA for primary text (already achieved with chosen palette)
2. **Focus indicators:** visible, amber-colored (`outline: 2px solid var(--color-accent); outline-offset: 4px`)
3. **Skip link:** "Skip to main content" first focusable element
4. **Reduced motion:** full graceful degradation (all animations disabled, content still accessible)
5. **Screen readers:** `aria-hidden="true"` on all decorative SVGs and the Three.js canvas
6. **Semantic HTML:** `<main>`, `<nav>`, `<section aria-labelledby>`, `<footer>` throughout
7. **No `user-scalable=no`** — never added (noted in Avoid List)
8. **Alt text:** all images use `alt="{{IMAGE_ALT_TEXT}}"` placeholders until real content is available

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 200ms |
| Total JS (compressed) | < 400KB |
| WebGL init time | < 800ms |
| Font load (FOUT) | Mitigated by `font-display: swap` + preload |

### Optimization Strategies

- Font subsetting (Latin only, no extended charset)
- Image: WebP + AVIF via Next.js `<Image>`, `sizes` attribute on all images
- Three.js: pause render loop when `document.visibilityState === 'hidden'`
- GSAP: import only used plugins (`ScrollTrigger`, `ScrollSmoother` not used — Lenis preferred)
- Code splitting: each section is a lazy-loaded component
- `PerformanceMonitor` from @react-three/drei auto-reduces DPR under load

---

## File Conventions

```
/public/fonts/          ← woff2 font files (not committed, added to .gitignore note)
/public/images/         ← project images, OG image, favicon
/src/shaders/           ← .glsl files imported as raw strings
/src/components/        ← all React components
/src/hooks/             ← custom hooks only (no component logic)
```

### Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Shaders: `name.vert.glsl` / `name.frag.glsl`
- CSS classes: `kebab-case`
- CSS custom properties: `--kebab-case`
- TypeScript interfaces: `IPascalCase` or `PascalCaseProps`

---

*End of Design System — Field & Signal v1.0*
