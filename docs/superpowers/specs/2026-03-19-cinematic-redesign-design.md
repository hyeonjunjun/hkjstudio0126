# HKJ Studio — Cinematic Redesign

**Date:** 2026-03-19
**Status:** Approved
**Author:** Ryan Jun + Claude

## 1. Overview

A complete visual and structural redesign of hkjstudio.com, shifting from a warm light editorial aesthetic to a cool dark cinematic direction. The site adopts a **layered register** approach: the homepage and transitions carry cinematic, atmospheric energy (video, mood, drama), while case studies and inner pages remain clean, typographic, and professional. Two registers that complement each other — you lead with feeling, then deliver substance.

### Design References

- **Cathydolle** (cathydolle.com) — Full-viewport List/Slider homepage pattern, minimal UX, opacity-based hover interactions, toggle between text list and visual slider
- **Tomoya Okada** (tomoya-okada.com) — Bold parallax, WebGL transitions, fluid expression, Lenis smooth scroll integration
- **Wuthering Waves** — Atmospheric depth, dramatic lighting, letterboxed framing, fog/particles, moody cinematic color grading

### What This Replaces

- Dictionary-style homepage (headword, phonetic, definitions) — removed entirely
- Warm light palette (#F5F2ED background) — replaced with cool dark
- Separate `/works` route — homepage absorbs project index
- Time-based theming (dawn/day/dusk/night) — replaced with single cool dark theme

## 2. Site Architecture

| Route | Register | Purpose |
|-------|----------|---------|
| `/` | Cinematic | Homepage — List/Slider project index, full-viewport, no scroll |
| `/work/[slug]` | Professional | Case study — clean editorial, magazine-spread layout |
| `/about` | Professional | About — typography-forward, single-column |
| `/coddiwomple` | Atmospheric | Visual explorations — masonry gallery, bridges both registers |

No separate `/works` page. The homepage IS the project index (Cathydolle pattern).

## 3. Color Palette

Cool atmospheric dark theme. Single theme (no time-based variants).

| Token | Hex | Role |
|-------|-----|------|
| `--color-bg` | `#0C0D10` | Deep dark background |
| `--color-surface` | `#141619` | Cards, elevated areas |
| `--color-elevated` | `#1A1E26` | Hover states, active surfaces |
| `--color-text` | `#D4D0CA` | Primary text (warm off-white) |
| `--color-text-secondary` | `#8A8580` | Secondary/supporting text |
| `--color-text-dim` | `#555250` | Tertiary text, inactive UI |
| `--color-text-ghost` | `#333130` | Subtle UI elements, dividers |
| `--color-accent` | `#8BA4B8` | Cool steel-blue accent |
| `--color-warm` | `#B89A78` | Warm accent (used sparingly) |

### Rationale

The cool dark palette creates cinematic atmosphere on the homepage and slider while maintaining readability for professional content on inner pages. Warm off-white text (#D4D0CA) prevents the harsh feel of pure white on dark backgrounds. The warm accent (#B89A78) provides continuity from the original design and draws attention sparingly.

## 4. Typography

Fonts remain unchanged. The restraint is the point.

| Font | Variable | Usage |
|------|----------|-------|
| GT Alpina | `--font-display` | Display serif — project titles in slider, email, headings, pull quotes |
| Sohne | `--font-sans` | Body sans — case study body, about page content |
| JetBrains Mono | `--font-mono` | Chrome UI — nav, counters, tags, list mode rows, labels, metadata |

### Type Scale (unchanged)

```
--text-display: clamp(1.8rem, 3vw, 2.8rem)
--text-body:    clamp(0.92rem, 1.05vw, 1.02rem)
--text-small:   clamp(0.72rem, 0.82vw, 0.8rem)
--text-micro:   clamp(0.6rem, 0.68vw, 0.68rem)
```

Homepage chrome: 10-11px JetBrains Mono uppercase throughout.

## 5. Homepage — List/Slider

Full-viewport, no scroll. Two view modes toggled by user.

### 5.1 List Mode (Default)

The default view. Clean text-only project index.

**Layout:**
- Full viewport height (`100dvh`)
- Single-column project rows, vertically centered
- Each row: `{number}  {title}  {tags}  {year}` in JetBrains Mono, 10-11px, uppercase
- Rows spaced with consistent gap (~28-32px)

**Interactions:**
- Hover a row: sibling rows fade to `opacity: 0.3`, hovered row stays `1.0`
- Click/tap navigates to case study with cinematic page transition
- Transition: `opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)` for hover fade

**Chrome:**
- Top-left: "hkj" wordmark (JetBrains Mono, small)
- Top-right: nav links (About, Coddiwomple)
- Bottom-left: email in GT Alpina italic
- Bottom-right: location + List/Slider toggle
- Toggle: `[LIST]  SLIDER` or `LIST  [SLIDER]` — active state indicated by brackets or underline

### 5.2 Slider Mode

Cinematic video card carousel. Each project gets a generous frame.

**Layout:**
- Full viewport, single card visible at a time
- Card contains ambient video loop (letterboxed, 16:9 or 2.39:1 aspect)
- Video plays inline, muted, looping (`autoplay muted loop playsinline`)
- Next card peeks ~60px from right edge (visual affordance for swiping)

**Card structure:**
```
┌─────────────────────────────────────────────┐
│                                             │
│           ┌───────────────────────┐         │
│           │                       │         │
│           │   Ambient Video Loop  │         │
│           │                       │         │
│           └───────────────────────┘         │
│                                             │
│  01                                         │
│  GYEOL · 결                                 │
│  MATERIAL · DIGITAL                  2024   │
└─────────────────────────────────────────────┘
```

- Number: JetBrains Mono, 10px, top of metadata
- Title: GT Alpina, display size, below number
- Tags + year: JetBrains Mono, 10px, bottom row

**Navigation:**
- Drag/swipe horizontally (Framer Motion drag)
- Arrow keys (left/right)
- Counter in bottom-right: `01 / 07`
- Same chrome as list mode (wordmark, nav, email, toggle)

**Transitions between modes:**
- List → Slider: rows dissolve, first card scales in from center
- Slider → List: card fades, rows stagger in
- Duration: 600-800ms, `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)

## 6. Case Studies (`/work/[slug]`)

Professional register. Clean, editorial, trustworthy.

**Layout:**
- Existing 12-column magazine-spread grid
- Hero section at top: full-width project image or video (cinematic entry point)
- Body: Sohne, well-spaced, max ~700px reading width for text blocks
- Images span various column widths (full-bleed, 7-col, etc.)

**Palette application:**
- Same cool dark background (`--color-bg`)
- Text in `--color-text` (primary) and `--color-text-secondary`
- No atmospheric effects — typography and imagery do the work

**Navigation within:**
- "Next Project" link at bottom with cinematic transition to next case study
- Back to homepage via nav or browser back

## 7. About Page (`/about`)

Professional register. Typography-forward.

**Layout:**
- Single-column, max-width ~560px, centered
- GT Alpina for headings and callouts
- Sohne for body paragraphs
- JetBrains Mono for labels and metadata

**Content structure unchanged**, just palette swap to cool dark.

## 8. Coddiwomple (`/coddiwomple`)

Bridges cinematic and professional registers.

**Layout:**
- Masonry grid gallery (existing pattern)
- Cool dark palette applied
- Images carry the atmospheric weight
- Fix existing accessibility bug: remove inline `opacity: 0` that hides content without animation fallback

## 9. Navigation

### Global Nav
- Hidden on homepage (homepage has its own chrome)
- Visible on all inner pages
- Scroll-direction show/hide (scroll down = hide, scroll up = reveal)
- Dark transparent background with backdrop-blur on inner pages
- Links: JetBrains Mono, 10px, uppercase

### Mobile Menu
- Full-screen overlay on dark background
- Same links as desktop nav
- Smooth open/close animation

## 10. Page Transitions

Cinematic quality transitions between all pages.

**Mechanism:**
- Existing `TransitionLink` + Zustand store pattern (`isTransitioning`, `pendingRoute`, `startTransition`, `endTransition`)
- `PageTransition` component handles the overlay

**Animation:**
- Full-screen overlay fades in (`opacity 0 → 1`), content behind fades out
- Route changes while overlay is opaque
- Overlay fades out, new content fades in with staggered reveals
- Easing: `cubic-bezier(0.86, 0, 0.07, 1)` at 1-1.5s total duration
- Content entrance: elements stagger in with `[0.16, 1, 0.3, 1]` (expo-out) at 0.6-0.9s

## 11. Technology Stack

| Tool | Role | Notes |
|------|------|-------|
| Next.js 16 | Framework | App router, React 19 |
| Tailwind CSS v4 | Styling | Utility-first, custom tokens in globals.css |
| GSAP + ScrollTrigger | Animation | Scroll-triggered reveals, timeline sequences |
| Framer Motion | Transitions | AnimatePresence, layoutId, drag (slider), imperative animate |
| Lenis | Smooth scroll | Inner pages only (homepage is full-viewport, no scroll) |
| Zustand | State | isLoaded, navVisible, mobileMenuOpen, isTransitioning, viewMode |
| HTML5 Video | Slider cards | Self-hosted, optimized (compressed MP4, poster frames) |
| Three.js/WebGL | Future | Available for atmospheric effects if needed later |

### New State

Add to Zustand store:
- `viewMode: 'list' | 'slider'` — homepage view toggle
- `activeProjectIndex: number` — current project in slider mode

## 12. Components — What Changes

### New Components
| Component | Purpose |
|-----------|---------|
| `HomepageList` | List mode — project rows with hover fade |
| `HomepageSlider` | Slider mode — cinematic video card carousel |
| `HomepageChrome` | Shared top/bottom bars (wordmark, nav, email, toggle) |
| `ViewToggle` | List/Slider toggle control |
| `VideoCard` | Individual project card with video, metadata overlay |

### Modified Components
| Component | Changes |
|-----------|---------|
| `GlobalNav` | Palette swap, remove redundant desktop "Menu" button |
| `MobileMenu` | Palette swap to cool dark |
| `PageTransition` | Enhanced cinematic animation (overlay + stagger) |
| `globals.css` | Complete palette overhaul, remove time-based themes |

### Removed Components
| Component | Reason |
|-----------|--------|
| `Hero` | Dictionary concept replaced by HomepageList/Slider |
| `WorkIndex` | Absorbed into HomepageList |
| `TimeProvider` | Time-based theming removed |

### Removed Routes
| Route | Reason |
|-------|--------|
| `/works` | Homepage is now the project index |

## 13. Responsive Behavior

### Desktop (>1024px)
- Full layout as described
- Slider: drag + arrow key navigation
- List: hover fade interactions

### Tablet (768-1024px)
- Same layout, slightly tighter spacing
- Slider: swipe navigation

### Mobile (<768px)
- List mode: single column, full-width rows, tap to navigate
- Slider mode: full-width cards, swipe navigation, no peek (card fills viewport)
- Nav: hamburger menu → full-screen mobile menu
- Bottom bar: stacked (email above, toggle + location below)

## 14. Performance Considerations

- **Video optimization:** Compress slider videos aggressively (target <5MB per clip, 10-15s loops). Use `poster` attribute for instant visual before video loads. Lazy-load videos not in viewport.
- **Preloading:** Preload the next/prev video in slider mode for smooth transitions.
- **No WebGL on initial load:** Three.js is available but not loaded until explicitly needed.
- **Existing optimizations:** GSAP/Lenis sync pattern, Tailwind purging, Next.js image optimization all continue.

## 15. Success Criteria

1. Homepage loads and displays list mode within 2s on broadband
2. List/Slider toggle feels instant (<300ms visual response)
3. Slider video cards play without visible buffering on broadband
4. Page transitions feel cinematic — smooth, intentional, not janky
5. Case studies are readable and professional — no atmosphere getting in the way of content
6. Mobile experience is polished — swipe works, text is legible, no layout breaks
7. Lighthouse performance score stays above 80
