# Phase 1 — Reference Site Analysis

> Compiled: 2026-10-17 | Analyst: Claude (Senior Creative Dev)

---

## 1. iventions.com

**SOTD + Developer Award + CSSDA Website of the Month**

### Layout & Section Order
1. Sticky nav (logo left, 8 menu items center, "got a project?" CTA right)
2. Hero — full-viewport "Step into the Spotlight" with muted showreel autoplay and mute toggle
3. Project carousel — 6 projects, full-bleed images, category + city tags, odd/even scale-rotate on scroll
4. Client logo marquee — 12-column sticky row, "We are proud to have worked with"
5. Service sections ×4 (Events / Exhibits / Congresses / Sports) — sticky parallax, each with a unique pastel bg
6. Quote + dual CTA closing section with dark-masked image overlay
7. Footer — address blocks (Barcelona + London), legal, social

### Typography
- **Display / headings**: Söhne (Klim Type) — weights 300 / 500 / 600; tight tracking at large sizes
- **Accent / editorial**: ABC Arizona Mix — weights 300 / 500; likely used for labels and italics
- Scale: very large display type (~10–14vw), mid-size section intros (~3–4vw), small body (~16–18px)
- Text reveals: `overflow: hidden` wrappers + `translateY(100%)` → `(0)` per line

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--primary-black` | `#101417` | Dark section backgrounds |
| `--overlay-bg` | `#141414` | Video/modal overlays |
| `--primary-white` | `#F3EFEB` | Body text on dark |
| `--primary-yellow` | `#FFFD99` | CTAs, progress bars, accents |
| Events bg | `#f7ffdc` | Light section |
| Exhibits bg | `#d1f3f5` | Light section |
| Congresses bg | `#ddd9ff` | Light section |
| Sports bg | `#ffddc4` | Light section |

### Motion Language
- Easing: `var(--easeOutQuart)` (~`cubic-bezier(0.25,1,0.5,1)`) at ~0.8s for overlays
- Scroll-driven: `--progress` CSS variable updated in JS, used for `calc(1 - var(--progress) * 0.4)` scale
- Clip-path polygon morphing between section dividers
- `will-change: transform` applied throughout

### Signature Effects & Implementation
1. **Spotlight hero**: Cursor-following point light in Three.js scene with fog; showreel plane lit from above
2. **Carousel scale-rotate**: Each project card scales down + rotates ±10deg on scroll via `--progress`
3. **Sticky parallax sections**: `position: sticky; top: calc(50vh - h/2)` layers clip-path panels
4. **Video mute toggle**: ScaleX fill bar synced to `video.muted` state
5. **Image lazy loading**: Next.js `<Image>` with `w=64&q=10` blur placeholder → `w=1920&q=70` full

### Navigation Behavior
Sticky header; desktop: inline menu; menu items likely have text-roll hover (not confirmed from source)

### Cursor Behavior
Custom cursor present — 3D perspective hover on buttons (`transform-style: preserve-3d`); exact dot/ring pattern not confirmed from source

### Loading Strategy
Next.js App Router; image preload for hero SVG mask; GTM + Cookiebot deferred

### Audio
Muted showreel autoplay; user-controlled mute toggle with visual progress bar

### Mobile Behavior
- Hero: `min-height: 100svh` (vs `200svh` desktop)
- Grid: 6-col mobile → 8-col tablet → 12-col desktop
- Sticky sections disabled below 75rem
- Carousel controls move to bottom

---

## 2. uncommondesign.group

**SOTD + Developer Award + FWA**

### Layout & Section Order
1. Nav — Mel / Team / Work / Studio / Services / Awards / Contact
2. Hero — large editorial statement + featured project video (Yondr) with Play Reel pill
3. "Scroll for more" cue
4. All Work gallery — grid with project thumbnails
5. Our Services — with Lottie micro-animations (DesignSprints, StrategicDesign, etc.)
6. Studio presentation
7. Communication blocks ×5 with images
8. Footer / contact

### Typography
- Fonts loaded as woff2 via Next.js static assets (hashed filenames — exact family names not exposed)
- Strong editorial character: large statement text fills most of the viewport width
- Inferred from visual: likely a geometric sans-serif display + clean grotesque body
- "Play reel" pill: small label with a distinctive rounded pill shape

### Color Tokens
- Light/white base (inverted from the other two — notable outlier)
- Dark text on white — clean editorial
- Accent: not confirmed from source

### Motion Language
- GSAP + WebGL layered: scroll-driven reveals, video integrations
- Lottie for process/service icons (5 custom animations)
- "ScrollRig" visibility class pattern suggests Intersection Observer triggers
- Nav labels likely use duplicated-text roll hover (confirmed from brief)

### Signature Effects & Implementation
1. **Text-roll nav hover**: Two copies of each nav label; on hover, the visible copy slides up while a duplicate slides in from below — CSS `overflow: hidden` + GSAP `translateY`
2. **Play reel pill**: Floating control overlaid on hero video; morphs between play/pause states
3. **Editorial hero statement**: Type fills full viewport width — likely `font-size: clamp()` or viewport units
4. **Lottie service icons**: SVG morphing micro-interactions that play on scroll into view

### Navigation Behavior
Clean horizontal nav; likely full-screen overlay menu on mobile; text-roll hover on all links

### Cursor Behavior
Not confirmed from source; brief indicates custom cursor present

### Loading Strategy
Next.js RSC; Strapi CMS for media; srcset responsive images; code-split chunk bundles

### Audio
None detected

### Mobile Behavior
`maximum-scale=1, user-scalable=no` — strictly responsive; separate mobile image assets

---

## 3. minhpham.design

**SOTD**

### Layout & Section Order
1. Preloader — "00%" counting up to "100%" + "Start" gate button
2. Nav — About / Work / Contact (minimal)
3. Hero — "making good shit since 2009" + dual-layer mask reveal active
4. About / What I Do — 5 skill cards (3D, Visual, Motion, Product, Tutorial)
5. Experience timeline
6. Clients grid (Ford, UFC, Lincoln, Royal Caribbean, NFL, SleepiQ)
7. Testimonials carousel (stacked cards)
8. Motto quote (Dieter Rams)
9. Social + Contact

### Typography
- Near-black background: `#0d0d0d` (inferred from brief)
- Bold, irreverent, personal tone — large display type
- Rotating text ring on cursor: SVG text path (`ic-text-ring.svg`)
- No explicit font families confirmed from source; inferred: a strong grotesque display

### Color Tokens
| Token | Inferred Value | Usage |
|-------|---------------|-------|
| Base bg | `#0d0d0d` | Full page background |
| Text | off-white | Headings and body |
| Accent | not confirmed | Sparse use |

### Motion Language
- GSAP + Lenis (smooth scroll confirmed)
- Three.js for 3D planet
- Scroll-driven `--progress` pattern
- Stacked testimonial card parallax on scroll

### Signature Effects & Implementation
1. **00% preloader counter**: Real asset progress tracked (likely `THREE.LoadingManager` + counter animation); ends in a "Start" CTA that user must click — creates intent, audio consent
2. **Dual-layer circular mask**: Two full-page layers stacked — "serious" version on top, "honest/funny" version below. A circular CSS `clip-path` or WebGL discard mask follows the cursor. Radius eases with cursor velocity using `lerp()`. On touch: replaced by tap toggle
3. **Rotating text-ring cursor**: SVG text path (`ic-text-ring.svg`) rotates on a custom cursor wrapper; the text itself could be "VIEW WORK • VIEW WORK •" repeating
4. **Sound toggle**: Ambient audio (Howler.js likely); `Sound On / Sound Off` toggle; UI hover ticks at low volume
5. **3D planet**: Three.js sphere with custom shader or displacement map; likely in the hero section
6. **Scroll-hidden scrollbar**: `scrollbar-width: none` + webkit variant across all browsers

### Navigation Behavior
Minimal 3-item nav; full-screen menu implied for mobile

### Cursor Behavior
- Rotating text-ring SVG mounted to cursor
- Hides on touch devices
- Enlarges or changes label on media hover

### Loading Strategy
- Preloader with real progress tied to Three.js `LoadingManager`
- Separate mobile image assets (`work-mobile-50.jpg`)
- Scroll restoration manually disabled

### Audio
Ambient site audio; toggle present; UI hover ticks at low vol; off by default

### Mobile Behavior
Separate mobile image assets; dual-layer mask replaced with tap toggle; custom cursor hidden

---

## Shared Patterns Across All Three

1. **Next.js App Router** — all three use it; confirmed production choice
2. **Large editorial type fills viewport** — shared compositional language
3. **Scroll-driven progress variable** — `--progress` or equivalent JS → CSS var
4. **Dark-leaning aesthetic** (2 of 3 dark; 1 light but high-contrast)
5. **`overflow: hidden` line/word reveals** with `translateY`
6. **Custom cursor** — all three have bespoke cursors (dot/ring/label/ring-text)
7. **Muted video** with user-controlled sound toggle
8. **GSAP** as animation backbone (confirmed 2/3, strongly implied 3/3)
9. **Minimal navigation** with interactive hover states
10. **Work is the hero** — no busy decorative elements; the projects carry the page

---

## Steal List — 8–10 Strongest Ideas

| # | Idea | Source | How it serves this project |
|---|------|--------|---------------------------|
| 1 | **Spotlight cursor** — Three.js point light follows cursor, illuminates hero object | iventions | Makes Vedant's 3D signature object feel alive; rewards exploration |
| 2 | **00% preloader → "Enter" gate** | Minh Pham | Creates intent, gates the full experience, allows audio consent — essential for ambient sound |
| 3 | **Dual-layer circular mask reveal** | Minh Pham | "What I build" vs "How it works" — a unique conceptual hook that shows depth without gimmick |
| 4 | **Text-roll nav hover** | Uncommon | Cheap, high-polish, zero overhead — instant quality signal |
| 5 | **Scroll-scrubbed word-by-word opacity** | (implied in all) | Turns the about/statement section into a reading experience |
| 6 | **Full-bleed project slider with tech tags + stat counter** | iventions | Lets the work speak loudly; numbers give instant credibility |
| 7 | **Numbered services list (01–04) with cursor-following image reveal** | iventions | Clean structure for Vedant's 4 capability areas; image/3D thumb lifts it |
| 8 | **Rotating text-ring cursor** | Minh Pham | Distinctive brand signature — customizable to Vedant's identity |
| 9 | **Oversized "Play reel" / CTA pill** | Uncommon | Reusable contact CTA pattern — big, magnetic, satisfying |
| 10 | **Vertical timeline with scroll-drawn line** | (implied/common Awwwards pattern) | Communicates experience progression elegantly |

---

## Avoid List

| Thing to Avoid | Reason |
|----------------|--------|
| Multiple WebGL canvases (one per section) | GPU memory explosion; stutters on mid-range laptops |
| Ambient audio ON by default | Accessibility failure; startles users |
| Dual-layer mask on touch without fallback | Breaks on mobile; must gracefully degrade to tap toggle |
| `user-scalable=no` (iventions/uncommon pattern) | WCAG 2.1 AA violation — do not copy this |
| `will-change: transform` everywhere | Creates too many composite layers; GPU RAM spike on mobile |
| Fake testimonials, made-up client logos | Brief says never invent — maintain integrity |
| Lottie for complex animations (uncommon) | Heavy bundle; custom GSAP is lighter and more controllable |
| Full-bleed video autoplay on mobile | Data cost + battery drain; use poster image + tap-to-play |
| Infinite scroll or pagination without keyboard support | Accessibility fail |
| Pastel section backgrounds (iventions style) | Wrong for Vedant's tone — keep dark, technical, premium |
