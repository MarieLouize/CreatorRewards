# Landing Page Redesign v2 — Refined & Sophisticated
## Update Prompt for Claude Code

## What Changed From v1
The previous direction (flat yellow poster + cartoon pill callouts) is scrapped. The new direction is **editorial and sophisticated** — each slide uses a full-bleed photo-style gradient background with **real-looking phone UI widgets floating on top** (Spotify/music players, iMessage bubbles, DM notifications, Instagram engagement bars). Inspired by polished Instagram carousel ads. The social media elements now look like actual app UI, not decorative stickers.

---

## New Design Direction

### Aesthetic
**Editorial Lifestyle × Phone UI Collage.** Each slide looks like a full-bleed lifestyle photo (simulated with CSS gradient backgrounds + abstract shapes) with authentic-looking smartphone interface elements layered on top — as if screenshotted from a real phone. Refined, aspirational, creator-coded. The overall feel is the kind of content a Nigerian fashion/lifestyle creator would make for their brand partnerships page.

### Reference Breakdown (from provided screenshots)
- **Image 1**: Earthy olive/green photo background, bold white editorial serif headline overlaid directly on the photo, bottom carousel dots, engagement sidebar icons
- **Image 2**: Neutral street photo, a **hot pink Spotify/podcast player card** floating in the upper third, a **white iMessage-style note card** in the lower third, gold pin emoji accent — all layered over the photo realistically

### Typography (update from v1)
- **Display**: `Cormorant Garamond` — elegant, editorial, high contrast. For hero/slide headlines. Load via Google Fonts.
- **UI Text**: `DM Sans` — clean, modern, works perfectly for simulated phone UI elements. Load via Google Fonts.
- **Accent/Labels**: `Clash Display` — keep for short all-caps labels/badges only (not headlines)

```html
<!-- In index.html, replace Fontshare link with: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<!-- Keep Fontshare for Clash Display labels -->
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap" rel="stylesheet">
```

### New Palette
```css
/* Slide backgrounds — each slide gets its own bg treatment */
--slide-1-bg-start: #2D3A2E;   /* deep forest green */
--slide-1-bg-end: #4A5C3F;     /* olive */
--slide-2-bg-start: #C9BEB4;   /* warm taupe */
--slide-2-bg-end: #E8DDD5;     /* soft linen */
--slide-3-bg-start: #1C1C1E;   /* near-black */
--slide-3-bg-end: #2C2C2E;     /* dark charcoal */
--slide-4-bg-start: #F5EFE8;   /* cream */
--slide-4-bg-end: #EDE4D8;     /* warm parchment */
--slide-5-bg-start: #FF2D78;   /* hot pink */
--slide-5-bg-end: #FF6BA8;     /* lighter pink */

/* UI widget colors */
--widget-pink: #FF2D78         /* Spotify-style hot pink widget bg */
--widget-white: #FFFFFF
--widget-dark: #1C1C1E         /* dark widget bg */
--widget-overlay: rgba(255,255,255,0.92)  /* frosted card */

/* Text */
--text-on-dark: #FFFFFF
--text-on-light: #1C1C1E
--text-muted-dark: rgba(255,255,255,0.65)
--text-muted-light: #6B6B6B

/* Accents */
--accent-pink: #FF2D78
--accent-gold: #C9A84C         /* muted, sophisticated gold — NOT garish */
--accent-green: #34C759        /* iOS green */
```

---

## Reusable Widget Components

Build these as React components that appear across slides. They should look **extremely realistic** — copy the exact feel of real iOS UI elements.

### `<SpotifyPlayerWidget />`
```
Hot pink background (#FF2D78), white text, rounded 20px corners, ~300px wide
Layout (top to bottom):
  Row 1: [Album art thumbnail — 48x48px rounded square, placeholder gradient] [Title + Artist name]
  Row 2: Progress bar (thin, white 30% opacity track, white filled portion, white dot handle)
  Row 3: [time stamp left "0:44"] [play/skip controls right — DM Sans, use ▶▶ text symbol]
  
Props: title, artist, albumColor (gradient css string), progress (0-1)
Width: ~320px, position: absolute (parent handles placement)
```

### `<iMessageBubble />`
```
White background, shadow (0 4px 20px rgba(0,0,0,0.12)), rounded 18px (less rounded on one corner — like real iMessage)
Header: small muted text "Feb 3, 2026 at 2:27 PM" — DM Sans 11px, #8E8E93
Title: DM Sans 700, 15px, dark
Body: DM Sans 400, 14px, dark, line-height 1.5
Width: ~280px, max 85% of slide, position: absolute
```

### `<InstagramEngagementBar />`
```
Frosted white background (rgba 92% opacity), blur backdrop, rounded 14px, padding 12px 16px
Row: [❤️ icon] [count] [💬 icon] [count] [↗️ send icon] [count]
Caption below: small text truncated — "@username · sponsored"
This mimics the Instagram engagement sidebar turned horizontal
```

### `<DMNotificationCard />`
```
Dark background (#1C1C1E), white text, iOS notification style
Rounded 20px, ~280px wide
Header row: [App icon — small circle] ["Direct Message"] [timestamp muted]
Avatar row: [circular avatar placeholder] [username bold] [message preview text muted]
Bottom: "Reply" pill button — white bg, dark text
```

### `<CreatorEarningsWidget />`
```
Frosted white card, rounded 20px, ~260px wide
Header: "This Month" — DM Sans 12px muted
Amount: "₦ 187,500" — Cormorant Garamond 600 36px, dark
Sub-row: green up-arrow + "+23% vs last month" — DM Sans 12px green
Progress bar: thin, green fill, shows "Goal: ₦250K"
```

### `<BrandDealCard />`
```
White card, rounded 16px, border 1px solid #E5E5EA, ~280px wide
Logo placeholder: colored circle with brand initial
Brand name: DM Sans 600
Deal type badge: pink pill "Sponsored Post"
Rate: "₦45,000" bold
Status dot: green dot + "Deal Active"
```

---

## Background Simulation (No Real Photos Needed)

Since we can't use real photography, simulate lifestyle photo backgrounds with layered CSS:

```css
/* Pattern for each slide bg — creates an organic, photographic feel */
.slide-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, var(--bg-start), var(--bg-end));
  overflow: hidden;
}

/* Abstract photo-like shapes — blurred blobs that suggest a person/scene */
.slide-bg::before {
  content: '';
  position: absolute;
  /* Large organic blob — suggests a figure */
  width: 55%;
  height: 80%;
  border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
  background: rgba(255,255,255,0.06);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(2px);
}

.slide-bg::after {
  content: '';
  position: absolute;
  /* Lighting blob — top, suggests natural light */
  width: 70%;
  height: 40%;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  top: -10%;
  left: 15%;
  filter: blur(40px);
}
```

Each slide gets unique blob shapes via a child `.bg-figure` div positioned absolutely.

---

## The 5 Slides (Revised)

### Slide 1 — Hero
**Background**: Deep forest green gradient (`#2D3A2E` → `#4A5C3F`)  
Simulates: outdoor street/lifestyle photo (like Image 1 reference)

**Layout**:
- **Top-left headline** (Cormorant Garamond 600 italic, white, large — direct text overlay on the bg like Image 1):
  ```
  on your way to
  your next
  brand deal —
  ```
  Small line (DM Sans 500, 14px, white 70% opacity): `YOUR CREATOR PLATFORM IS HERE`

- **Large editorial statement** (Cormorant Garamond 700, white, ~72px desktop / 52px mobile, no line-height space):
  ```
  Creator
  Rewards.
  ```
  
- **Floating widget — positioned center-right**: `<InstagramEngagementBar />` with fake counts (❤️ 4,821 · 💬 312 · ↗️ 9K)

- **Bottom text strip** (white, DM Sans 500, 13px, muted):
  `✦ Nigeria's creator monetisation platform · Launching 2025`

- **Slide dots** at bottom-center (white dots, matches image 1 reference exactly)

---

### Slide 2 — The Earnings Story
**Background**: Warm taupe gradient (`#C9BEB4` → `#E8DDD5`)  
Simulates: neutral, soft lifestyle photo

**Layout**:
- **Top-center**: `<SpotifyPlayerWidget />` — pink bg, title "Your Brand Deal Alert 🔔", artist "CreatorRewards · Just Now"  
  This is the exact design from Image 2 reference — pink card, white text, progress bar

- **Bottom-center**: `<iMessageBubble />` styled as a "note" card:
  ```
  February 2026
  
  THIS MONTH'S EARNINGS
  
  You've earned ₦187,500 across
  4 brand campaigns this month.
  Your engagement rate: 6.2%
  Brands love working with you.
  ```

- **Small gold pin accent** (top-right corner of the iMessage card — `📌` emoji at 18px, or a CSS circle in `--accent-gold`)

- **No headline** — let the widgets tell the story

---

### Slide 3 — How It Works
**Background**: Near-black (`#1C1C1E` → `#2C2C2E`)  
Simulates: dark, moody night shot

**Layout**:
- **Top editorial label** (Clash Display 600, 11px, letter-spacing 0.15em, white 50% opacity): `HOW IT WORKS`

- **Left-aligned headline** (Cormorant Garamond 600, white, 58px desktop / 40px mobile, line-height 1.1):
  ```
  Three steps
  to your first
  brand deal.
  ```

- **Three `<iMessageBubble />` cards**, stacked with slight offset/rotation, positioned right-half of slide:
  ```
  Card 1 (rotated -2deg):
  "01 — Apply"
  Fill your creator profile in minutes.
  We verify you're legit.
  
  Card 2 (rotated 1deg, slightly overlapping):
  "02 — Browse"
  Pick campaigns that match your niche.
  
  Card 3 (rotated -1deg):
  "03 — Get Paid"
  Post content, earn real ₦.
  Direct to your account.
  ```
  Cards are white/frosted on the dark bg — creates strong contrast

- **Bottom-left**: `<CreatorEarningsWidget />` partially visible (cropped by slide edge — feels organic)

---

### Slide 4 — Platform Support
**Background**: Warm cream (`#F5EFE8` → `#EDE4D8`)  
Simulates: bright, airy lifestyle shot

**Layout**:
- **Top-right corner headline** (Cormorant Garamond 700 italic, dark, 60px):
  ```
  Every
  creator.
  Every
  platform.
  ```

- **Left side**: vertical stack of `<BrandDealCard />` widgets — 2 visible, 3rd partially cropped at bottom:
  ```
  Card 1: "Lagos Fashion Week" · Sponsored Post · ₦80,000
  Card 2: "Bolt Nigeria" · UGC Content · ₦45,000  
  Card 3 (partial): "Flutterwave" · Ambassador · ...
  ```

- **Platform pills row** (bottom of slide) — clean white pills, dark text, subtle border, real platform names with SVG icon:
  `Instagram · TikTok · YouTube · X · Facebook`

- **Floating `<DMNotificationCard />`** positioned upper-left:
  ```
  "New brand inquiry from: ZARA NG
  Hi! We love your content. Are you 
  open to a collaboration?..."
  ```

---

### Slide 5 — Final CTA
**Background**: Hot pink gradient (`#FF2D78` → `#FF6BA8`)  
Simulates: vibrant, high-energy shot

**Layout**:
- **Top**: Live count badge — white pill, pink text: `[N] creators already on the waitlist` (live Supabase count)

- **Center headline** (Cormorant Garamond 700 italic, white, 80px desktop / 56px mobile, tight line-height):
  ```
  Don't miss
  your spot.
  ```

- **Sub** (DM Sans 400, white 85% opacity, 18px):
  `CreatorRewards launches soon. Waitlist closes at capacity.`

- **Large CTA button** (white bg, pink text, DM Sans 700, full-width on mobile / 360px desktop):
  `Secure My Spot →`
  Hover: scale up slightly, deepen shadow

- **`<InstagramEngagementBar />`** at bottom — dark variant — shows the live count as a "like" count

- **Decorative**: 3–4 scattered white circles at various opacities + sizes (CSS, abstract background texture suggestion)

---

## Slideshow & Persistence (from v1 — keep unchanged)

All navigation mechanics from v1 spec remain:
- Fixed `100dvh` height, CSS opacity fade (0.5s ease)
- Wheel + keyboard + touch swipe navigation (debounced)
- Dot nav: bottom-center on all slides (horizontal row), matches the Instagram carousel dots in reference images
- Persistent CTA: **update style** — now `white` background with `--accent-pink` text (more refined than the bold flat shadow from v1). Smaller, more pill-like.

```css
.persistent-cta {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  background: white;
  color: var(--accent-pink);
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 100px;
  text-decoration: none;
  border: 1.5px solid rgba(255,45,120,0.2);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.persistent-cta:hover {
  background: var(--accent-pink);
  color: white;
  border-color: transparent;
  transform: translateY(-1px);
}
```

**On slides with light backgrounds (slides 2, 4)**: switch the CTA to `background: var(--accent-pink); color: white` for contrast — toggle via `activeSlide` prop.

---

## Navbar (refined)

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 150;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Frosted glass effect — sophisticated, not flat */
  background: rgba(0,0,0,0.0);   /* starts transparent */
}
```

- **Logo**: "CreatorRewards" — Cormorant Garamond 600, white (or dark based on slide bg)
- No secondary nav button — the persistent CTA handles this

---

## Dot Navigation (update from v1)

Change from right-side vertical dots to **bottom-center horizontal dots** — matches Instagram carousel UX exactly (as seen in both reference images):

```css
.dot-nav {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 6px;
  z-index: 100;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 20px;     /* elongated pill when active — Instagram-style */
  border-radius: 3px;
  background: white;
}
```

On slides 2 and 4 (light backgrounds), use dark dots instead:
```css
.dot { background: rgba(0,0,0,0.25); }
.dot.active { background: rgba(0,0,0,0.7); }
```

---

## Animation (refined from v1)

Replace the bouncy `popIn` with more refined entrance animations:

```css
/* Headline text — elegant fade up */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Widgets — subtle slide in from slightly off-screen + fade */
@keyframes widgetIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Stagger delays */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.25s; }
.delay-3 { animation-delay: 0.4s; }
.delay-4 { animation-delay: 0.58s; }

.slide.active .headline { animation: fadeUp 0.7s cubic-bezier(0.25, 0, 0, 1) both; }
.slide.active .widget   { animation: widgetIn 0.6s cubic-bezier(0.25, 0, 0, 1) both; }
```

---

## File Changes

| File | Action |
|------|--------|
| `src/styles/globals.css` | Replace `--cr-*` variables with new palette |
| `src/pages/LandingPage.tsx` | Update: same slideshow shell, swap slide components |
| `src/components/landing/widgets/SpotifyPlayerWidget.tsx` | **New** |
| `src/components/landing/widgets/iMessageBubble.tsx` | **New** |
| `src/components/landing/widgets/InstagramEngagementBar.tsx` | **New** |
| `src/components/landing/widgets/DMNotificationCard.tsx` | **New** |
| `src/components/landing/widgets/CreatorEarningsWidget.tsx` | **New** |
| `src/components/landing/widgets/BrandDealCard.tsx` | **New** |
| `src/components/landing/Slide1Hero.tsx` | Full rewrite |
| `src/components/landing/Slide2Earnings.tsx` | Full rewrite |
| `src/components/landing/Slide3HowItWorks.tsx` | Full rewrite |
| `src/components/landing/Slide4Platforms.tsx` | Full rewrite |
| `src/components/landing/Slide5FinalCTA.tsx` | Full rewrite |
| `src/components/Navbar.tsx` | Update: Cormorant logo, slide-aware light/dark |
| `index.html` | Update font links |

**Do not touch**: All form components, admin components, Supabase clients, types, hooks.

---

*Update prompt v2.0 — CreatorRewards Refined Landing · April 2026*