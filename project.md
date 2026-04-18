# Landing Page Redesign — Update Prompt for Claude Code

## Context
The project already exists (React + TypeScript + Supabase, from the original spec). The `/join` waitlist form and `/admin` dashboard are **untouched** — this update affects **only `LandingPage.tsx`** and its child components under `src/components/landing/`, plus `globals.css` (CSS variable overrides for the landing scope).

---

## What's Changing

Completely replace the dark/gold palette and current landing page layout with a new design: a **fixed-height, 5-screen slideshow** where each screen is styled like a bold social media marketing poster. The vibe is bright, light, poppy, and Gen-Z — think Instagram/TikTok creator culture, not luxury dark mode.

---

## New Design Direction

### Visual Reference
The reference is a bright social media marketing poster with:
- **Warm butter yellow** background as the dominant color
- **Hot pink / magenta** as the primary type and accent color  
- **Blush / soft white** as a neutral surface color
- Bold, chunky, all-caps display typography
- **Floating pill-shaped annotation bubbles** (like social media sticker labels) with retro cursor icons (the classic Windows pointer SVG)
- Playful, relatable humor that speaks directly to content creators

### New Palette (replace all CSS variables on the landing scope):
```css
--cr-yellow: #F9C846      /* warm butter yellow — main bg */
--cr-pink: #F03E7A        /* hot magenta pink — headlines, CTAs */
--cr-blush: #FFE8EC       /* soft blush — card surfaces */
--cr-white: #FFFFFF
--cr-dark: #1A1A1A        /* near-black for body text only */
--cr-orange: #FF7043      /* warm orange — accent pill variant */
--cr-purple: #9B5DE5      /* electric purple — occasional accent */
--cr-green: #00C896       /* mint green — success/money moments */
--cr-pill-bg: #FFE8EC     /* blush pill default */
--cr-pill-border: #F03E7A
```

### Typography (keep Fontshare imports from original):
- **Display**: `Clash Display` — 700 weight, ALL CAPS, very tight letter-spacing (`-0.02em`)
- **Body**: `Cabinet Grotesk` — 500 weight for labels, 400 for body

### Social Media Element Language
Every screen must feel like it was designed in Canva or Later for an IG story. Use these recurring design elements across the 5 screens:

**Pill annotation bubbles** — styled like social media sticker/label callouts:
```css
.annotation-pill {
  background: var(--cr-blush);
  border: 2px solid var(--cr-pink);
  border-radius: 100px;
  padding: 8px 18px;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--cr-pink);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  position: absolute;  /* positioned decoratively on each slide */
}
```

**Cursor icon** (use this inline SVG as a decorative element on pill bubbles):
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path d="M5 3l14 9-7 1-4 7L5 3z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

**Stat badge** — a bold number pill:
```css
.stat-badge {
  background: var(--cr-pink);
  color: white;
  font-family: 'Clash Display', sans-serif;
  font-weight: 700;
  font-size: 22px;
  padding: 10px 20px;
  border-radius: 100px;
  display: inline-block;
}
```

**Like/heart reaction count element** (decorative on relevant slides):
A `❤️ 4,821` or `🔥 Going viral` label in a white rounded pill.

**Floating card** (simulated phone screen or post preview):
A blush/white card with rounded corners (20px), a subtle pink border, portrait aspect ratio, mimicking a phone or IG post crop.

---

## Slideshow Architecture

### Container Setup
```tsx
// LandingPage.tsx structure
const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="slideshow-container">
      {/* Persistent Navbar */}
      <Navbar />  {/* logo left, CTA button right — always visible */}

      {/* Persistent CTA button (floating, bottom-right) */}
      <a href="/join" className="persistent-cta">
        Join the Waitlist →
      </a>

      {/* 5 slide panels */}
      <div className="slides-wrapper">
        <Slide1Hero active={activeSlide === 0} />
        <Slide2HowItWorks active={activeSlide === 1} />
        <Slide3ForCreators active={activeSlide === 2} />
        <Slide4Brands active={activeSlide === 3} />
        <Slide5FinalCTA active={activeSlide === 4} />
      </div>

      {/* Dot navigation */}
      <DotNav active={activeSlide} total={5} onChange={setActiveSlide} />
    </div>
  );
};
```

### Fixed-Height Scroll Behavior
```css
.slideshow-container {
  height: 100dvh;
  overflow: hidden;
  position: relative;
}

.slides-wrapper {
  height: 100%;
  position: relative;
}

/* Each slide is 100dvh, absolutely positioned, transitions in/out */
.slide {
  position: absolute;
  inset: 0;
  height: 100dvh;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
  pointer-events: all;
}
```

### Keyboard + Scroll Navigation
```tsx
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setActiveSlide(s => Math.min(s + 1, 4));
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setActiveSlide(s => Math.max(s - 1, 0));
  };

  // Wheel/trackpad swipe
  let lastScroll = 0;
  const handleWheel = (e: WheelEvent) => {
    const now = Date.now();
    if (now - lastScroll < 800) return;  // debounce
    lastScroll = now;
    if (e.deltaY > 30) setActiveSlide(s => Math.min(s + 1, 4));
    if (e.deltaY < -30) setActiveSlide(s => Math.max(s - 1, 0));
  };

  window.addEventListener('keydown', handleKey);
  window.addEventListener('wheel', handleWheel, { passive: true });
  return () => { window.removeEventListener('keydown', handleKey); window.removeEventListener('wheel', handleWheel); };
}, []);
```

### Dot Navigation
Small vertical dot strip, right edge of screen, centered vertically:
```css
.dot-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(240, 62, 122, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--cr-pink);
  transform: scale(1.4);
}
```

### Persistent CTA Button
Always visible, bottom-right corner, above all content:
```css
.persistent-cta {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 200;
  background: var(--cr-pink);
  color: white;
  font-family: 'Clash Display', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  box-shadow: 4px 4px 0px #1A1A1A;  /* bold flat shadow — poster style */
  transition: transform 0.15s, box-shadow 0.15s;
}

.persistent-cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1A1A1A;
}

.persistent-cta:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #1A1A1A;
}
```

---

## The 5 Slides

Each slide has a yellow (`--cr-yellow`) background unless specified. All text animates in on `.active` with CSS keyframes (staggered `animation-delay`).

```css
@keyframes popIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.slide.active .animate-item {
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
/* Stagger via nth-child or explicit delay classes */
.delay-1 { animation-delay: 0.05s; }
.delay-2 { animation-delay: 0.15s; }
.delay-3 { animation-delay: 0.28s; }
.delay-4 { animation-delay: 0.42s; }
.delay-5 { animation-delay: 0.58s; }
```

---

### Slide 1 — Hero ("Get Paid. Stay You.")
**Background**: `--cr-yellow`

**Layout** (centered, full bleed poster):
- Top: eyebrow badge pill — blush bg, pink text: `🚀 Launching Soon · Nigeria's Creator Platform`
- Center headline (Clash Display, 96px desktop / 56px mobile, pink):
  ```
  GET PAID.
  STAY YOU.
  ```
  Each line pops in with stagger.
- Below headline: sub text (Cabinet Grotesk, 18px, `--cr-dark`):
  `Post content. Work with brands. Get paid straight to your account.`
- **Floating annotation pills** (positioned absolutely, scattered around):
  - Bottom-left area: pill reading `"editing reels 📱"` with cursor icon
  - Top-right area: pill reading `"brand deal incoming 💰"` with cursor icon  
  - Bottom-right: orange pill reading `"₦42,000 earned this week"` (use `--cr-orange` bg variant)
- **Decorative phone mockup**: a tall blush/white rounded rectangle (like a phone silhouette, no screen content needed — just the shape) placed right-of-center, slightly rotated 5deg. Give it a thick pink border (4px).

---

### Slide 2 — How It Works ("3 Steps to Getting Paid")
**Background**: `--cr-pink` (invert the palette — pink bg, white/yellow text)

**Layout**:
- Section label pill (white bg, pink text): `HOW IT WORKS`
- Headline (Clash Display, white): `THREE STEPS TO YOUR FIRST BRAND DEAL`
- Three step cards in a row (desktop) / stack (mobile):
  Each card: white background, yellow number badge top-left, pink title, dark body text
  1. `01 · Apply & Get Verified` — "Fill your profile. We check you're legit."
  2. `02 · Browse Campaigns` — "Pick brand deals that match your vibe and niche."
  3. `03 · Post & Get Paid` — "Drop the content. Money hits your account."
- Decorative: a large `₦` symbol watermark behind the cards (white, 10% opacity, 200px Clash Display)
- Annotation pill floating off one card: `"avg ₦35K per deal"` with cursor

---

### Slide 3 — For Creators ("We Get the Creator Life")
**Background**: `--cr-yellow`

**Layout** (inspired directly by the reference poster — relatable humor):
- Big headline (Clash Display, pink, ~80px):
  ```
  SORRY,
  I HAVE PLANS
  TONIGHT.
  ```
- Below headline, a cluster of annotation pills arranged like the reference image:
  - `"editing reels"` + cursor (left)
  - `"batching content"` + cursor (right)
  - `"stalking brand pages for deals"` + cursor (bottom)
  - `"checking my CreatorRewards dashboard"` + cursor (bottom-right, slightly larger, orange variant)
- Sub text: `You work hard. CreatorRewards makes sure you get paid for it.`
- This slide should feel like a direct callback to the reference image — same scattered pill layout, same humor energy.

---

### Slide 4 — Platform & Niche ("Every Creator, Every Niche")
**Background**: `--cr-blush` (soft blush white)

**Layout**:
- Eyebrow: pill badge `WE SUPPORT`
- Headline (Clash Display, pink): `EVERY CREATOR. EVERY FORMAT. EVERY NICHE.`
- Two rows of pill tags:
  **Platforms row** (with emoji icons):
  `📸 Instagram · 🎵 TikTok · 📺 YouTube · 🐦 X/Twitter · 👥 Facebook`
  — Each pill: white bg, pink border, pink text

  **Niches cloud** (mix of pink/yellow/orange pills, scattered sizes):
  `Lifestyle · Fashion · Comedy · Tech · Food · Travel · Beauty · Gaming · Sports · Finance · Music · Parenting · Fitness · Entertainment`
  — Randomise sizes (some `font-size: 13px`, some `16px`, some `19px`) for a "scattered" feel. Use alternating pink, orange, purple pill backgrounds.
- Decorative: a big animated `✦` sparkle in the corner (slow spin CSS animation)

---

### Slide 5 — Final CTA ("Don't Miss Your Spot")
**Background**: `--cr-pink`

**Layout** (energetic, maximum urgency):
- Top: animated counter pill — white bg, pink text: live `[N] creators already joined` (fetch from Supabase `useWaitlistCount` hook — same hook from original spec). If count is 0, show `"Waitlist Open Now"`.
- Giant headline (Clash Display, white, 96px desktop / 60px mobile):
  ```
  DON'T
  MISS YOUR
  SPOT.
  ```
- Sub (Cabinet Grotesk, white, 20px):
  `CreatorRewards is launching soon. Waitlist closes when we hit capacity.`
- CTA button (extra large, yellow bg, dark text, thick dark flat shadow):
  `Secure My Spot → ` (links to `/join`)
  ```css
  /* On slide 5, override the persistent CTA to be hidden — the in-slide button takes over */
  ```
- Bottom: platform handles / social links row (white icon pills): `@CreatorRewards` on IG, TikTok, X
- Decorative: scattered confetti shapes (CSS-only, small circles/squares in yellow, blush, orange — positioned absolutely, some with slow spin animations)

---

## Navbar (persists across all slides)

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 150;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;  /* no bg — see-through over slides */
}
```

- **Logo**: `CR` in a hot pink rounded square badge + "CreatorRewards" in Clash Display 600, dark
- **Right**: Ghost pill CTA — `Join Waitlist` — pink border, pink text, transparent bg (secondary to the persistent bottom-right CTA)
- On slides with a pink background (slides 2 + 5), logo text switches to white. Use a CSS class toggled via `activeSlide` prop.

---

## Mobile Considerations

- All slides are responsive. On mobile (< 768px):
  - Font sizes: hero headline drops to ~52px, step 5 headline to ~48px
  - Step cards on slide 2 stack vertically, scrollable within the slide (overflow-y: auto on the cards container)
  - Annotation pills on slide 1 and 3 reduce to 2 each, repositioned so they don't overlap headline
  - Dot nav moves to bottom-center (horizontal dots row) instead of right-side vertical
  - Persistent CTA shrinks: `padding: 12px 20px; font-size: 14px; bottom: 20px; right: 20px;`

---

## Touch/Swipe (mobile)
```tsx
// Add to LandingPage
const touchStartY = useRef(0);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartY.current = e.touches[0].clientY;
};

const handleTouchEnd = (e: React.TouchEvent) => {
  const diff = touchStartY.current - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 50) return;
  if (diff > 0) setActiveSlide(s => Math.min(s + 1, 4));
  else setActiveSlide(s => Math.max(s - 1, 0));
};
```

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/styles/globals.css` | Add new `--cr-*` CSS variables for landing scope |
| `src/pages/LandingPage.tsx` | Full rewrite — slideshow container + 5 slides |
| `src/components/landing/HeroSection.tsx` | → Becomes `Slide1Hero.tsx` |
| `src/components/landing/HowItWorks.tsx` | → Becomes `Slide2HowItWorks.tsx` |
| `src/components/landing/Slide3ForCreators.tsx` | New file |
| `src/components/landing/Slide4Platforms.tsx` | New file (merges old PlatformStrip + NicheCloud) |
| `src/components/landing/Slide5FinalCTA.tsx` | New file (replaces old FinalCTA) |
| `src/components/landing/DotNav.tsx` | New file |
| `src/components/Navbar.tsx` | Update: transparent bg, accepts `lightMode` prop for pink-bg slides |
| `src/hooks/useWaitlistCount.ts` | No change needed |

**Do not touch**: `src/pages/JoinPage.tsx`, `src/pages/AdminPage.tsx`, all admin components, all form components, Supabase clients, types.

---

*Update prompt v1.0 — CreatorRewards Landing Redesign · April 2026*