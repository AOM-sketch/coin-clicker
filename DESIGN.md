# Design Brief

## Direction

Arcade Bold — A modern game UI inspired by 90s arcade machines with dark, energetic aesthetics and warm golden accents for immediate visual feedback on interactions.

## Tone

Confident, energetic arcade aesthetic executed with modern restraint—high-contrast dark UI with punchy accent colors, bold geometric sans-serif, sharp interaction feedback.

## Differentiation

Floating "+N" animations in teal rise and fade above the central click button; upgrade shop pulses subtly with golden glow when items are affordable, creating a satisfying click loop optimized for passive income gameplay.

## Color Palette

| Token      | OKLCH        | Role                                      |
| ---------- | ------------ | ----------------------------------------- |
| background | 0.12 0 0     | Deep charcoal, game viewport foundation   |
| foreground | 0.92 0 0     | Off-white text, primary readability       |
| card       | 0.16 0 0     | Shop upgrade cards, slightly elevated     |
| primary    | 0.70 0.20 50 | Warm amber, main click button + CTAs      |
| secondary  | 0.62 0.16 190| Cool teal, accent animations + highlights |
| accent     | 0.62 0.16 190| Same as secondary, floating text color    |
| muted      | 0.22 0 0     | Dim labels, secondary UI text             |
| destructive| 0.55 0.22 25 | Red, sell/remove actions                  |

## Typography

- Display: Space Grotesk — Geometric modern sans, bold and confident for large coin counts and headers
- Body: DM Sans — Highly legible sans-serif for upgrade names, descriptions, and small UI labels
- Scale: Hero coin count `text-6xl font-bold tracking-tight`, shop labels `text-sm font-semibold uppercase tracking-widest`, upgrade names `text-base font-semibold`

## Elevation & Depth

Single-layer card elevation using border and subtle shadows; no stacked depth. Cards use `border-border` with 1px solid line, no drop shadows — keeps UI punchy and arcade-like.

## Structural Zones

| Zone    | Background | Border            | Notes                                              |
| ------- | ---------- | ----------------- | -------------------------------------------------- |
| Header  | background | border-b border   | Coin count, CPS display, left-aligned              |
| Content | background | —                 | Central click area, absolute positioned            |
| Sidebar | card       | border-l border   | Upgrade shop, scrollable if needed, right-aligned |
| Footer  | muted/40   | border-t border   | Optional: footer or decorative footer area        |

## Spacing & Rhythm

Section gaps use `gap-6`, content groups use `gap-4`. Micro-spacing (`gap-2`) for upgrade item internals (icon + label + price). Dense upgrade grid (2–3 columns on mobile, 3–4 on desktop) maximizes shop visibility without horizontal scroll.

## Component Patterns

- **Main Button**: Large circular button, 120px diameter, `bg-primary`, `text-primary-foreground`, bold font-display, pulsing glow on hover
- **Upgrade Cards**: Rounded-md, `bg-card`, `border border-border`, hover effect lightens border, shows purchased count badge in top-right
- **Score Display**: `text-primary` for count, `text-muted` for label, stacked vertical layout
- **CPS Label**: `text-xs text-muted-foreground` below score, updates in real-time

## Motion

- **Entrance**: Upgrades fade in with `opacity-0 scale-95` → `opacity-100 scale-100` on mount (0.3s)
- **Hover**: Button and card borders brighten, slight scale-up (1.02x), smooth 0.2s transition
- **Decorative**: Floating "+N" animations trigger on click, rise 60px + fade out over 0.8s in secondary/accent color; upgrade glow pulses continuously (2s cycle) when affordable

## Constraints

- Dark theme only (arcade games run 24/7, never light theme)
- Coin count always visible (top-left sticky header)
- Upgrade shop always visible (no collapse, fixed right sidebar or bottom overflow)
- Floating text must contrast against background (`secondary` teal on `background` charcoal meets WCAG AA+)
- Click button must be 100px+ diameter for mobile tap target (48px minimum, 100px+ preferred for clicker UX)

## Signature Detail

Pulsing golden glow (via `box-shadow` keyframe) on upgrade cards when they become affordable—visual affordance that tells players "this item is within reach now" without tooltip, matching the immediacy of arcade machine feedback loops.
