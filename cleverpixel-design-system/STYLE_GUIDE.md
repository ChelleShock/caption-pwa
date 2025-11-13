# Clever Pixel Style Guide

Complete reference guide for colors, typography, spacing, and UI patterns.

## Colors

### Primary Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Red | `#E63946` | `--cp-red` | Accents, errors |
| Green | `#2A9D8F` | `--cp-green` | Success, indicators |
| Blue | `#1D4ED8` | `--cp-blue` | Primary actions, links |
| Yellow | `#F4B400` | `--cp-yellow` | Warnings, highlights |

### Neutral Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Ink | `#0F172A` | `--cp-ink` | Primary text, buttons |
| Cream | `#FFFBF5` | `--cp-cream` | Background |

### Usage Examples

```css
/* Primary button */
.button-primary {
  background-color: var(--cp-ink);
  color: white;
}

/* Link hover */
a:hover {
  color: var(--cp-blue);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(to right, var(--cp-red), var(--cp-yellow), var(--cp-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Typography

### Font Family

**Primary:** Inter (Google Fonts)

```css
font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Weights

- **Normal:** 400
- **Semibold:** 600
- **Extrabold:** 800

### Font Sizes

| Size | Value | Usage |
|------|-------|-------|
| xs | 0.75rem (12px) | Labels, badges |
| sm | 0.875rem (14px) | Small text, captions |
| base | 1rem (16px) | Body text |
| lg | 1.125rem (18px) | Large body text |
| xl | 1.25rem (20px) | Subheadings |
| 2xl | 1.5rem (24px) | Section headings |
| 3xl | 1.875rem (30px) | Page headings |
| 4xl | 2.25rem (36px) | Hero headings |
| 5xl | 3rem (48px) | Large hero |
| 6xl | 3.75rem (60px) | Extra large hero |

### Typography Examples

```html
<h1 class="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
  Main Heading
</h1>

<p class="text-lg text-black/70 max-w-prose">
  Body text with reduced opacity for hierarchy
</p>

<span class="text-sm font-semibold uppercase tracking-wider">
  Label Text
</span>
```

## Spacing

### Scale

| Size | Value | Usage |
|------|-------|-------|
| 1 | 0.25rem (4px) | Tight spacing |
| 2 | 0.5rem (8px) | Small gaps |
| 3 | 0.75rem (12px) | Default gaps |
| 4 | 1rem (16px) | Standard spacing |
| 6 | 1.5rem (24px) | Section spacing |
| 8 | 2rem (32px) | Large spacing |
| 12 | 3rem (48px) | Section padding |
| 16 | 4rem (64px) | Large section padding |

## Border Radius

| Size | Value | Usage |
|------|-------|-------|
| md | 0.375rem (6px) | Buttons, inputs |
| lg | 0.5rem (8px) | Cards |
| xl | 0.75rem (12px) | Large cards |

## Shadows

```css
/* Small shadow */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium shadow (hover) */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Large shadow */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

## Components

### Header

- Sticky positioning
- Backdrop blur: `bg-[var(--cp-cream)]/95 backdrop-blur`
- Border: `border-b border-black/5`
- Height: `h-16` (64px)

### Buttons

**Primary Button:**
```html
<button class="px-5 py-3 rounded-md bg-[var(--cp-ink)] text-white font-semibold hover:opacity-90">
  Button Text
</button>
```

**Secondary Button:**
```html
<button class="px-5 py-3 rounded-md border border-black/10 bg-white/80 hover:bg-white font-semibold">
  Button Text
</button>
```

### Cards

```html
<div class="rounded-xl bg-white border border-black/5 p-6 shadow-sm hover:shadow-md transition">
  <!-- Card content -->
</div>
```

### Form Inputs

```html
<input 
  class="w-full rounded-md border border-black/10 bg-white px-3 py-2 shadow-sm focus:border-[var(--cp-blue)] focus:ring-1 focus:ring-[var(--cp-blue)]"
  placeholder="Placeholder text"
/>
```

## Layout Patterns

### Container

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Section Spacing

```html
<section class="py-16 sm:py-24">
  <!-- Section content -->
</section>
```

### Grid Layouts

```html
<!-- 3-column grid -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>
```

## Interactive Elements

### Hover States

- Links: `hover:text-[var(--cp-blue)]`
- Buttons: `hover:opacity-90` or `hover:bg-white`
- Cards: `hover:shadow-md transition`

### Focus States

```css
:focus-visible {
  outline: 3px solid var(--cp-blue);
  outline-offset: 2px;
}
```

## Animations

### Pulse Animation

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
```

### Rotate Square Animation

```css
@keyframes rotateSquare {
  0% { transform: rotate(0deg) scale(1) translateZ(0); }
  50% { transform: rotate(45deg) scale(1.15) translateZ(0); }
  100% { transform: rotate(90deg) scale(1) translateZ(0); }
}
```

## Accessibility

- Focus visible styles for keyboard navigation
- Semantic HTML elements
- ARIA labels for interactive elements
- Color contrast ratios meet WCAG AA standards

## Responsive Breakpoints

- Mobile: Default (< 640px)
- Tablet: `sm:` (≥ 640px)
- Desktop: `md:` (≥ 768px)
- Large: `lg:` (≥ 1024px)

