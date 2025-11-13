# Clever Pixel Design System

A reusable design system with components, tokens, and styles extracted from the Clever Pixel website. Perfect for use in Vite.js PWAs and React applications.

## Installation

### Option 1: Copy the design system folder

Copy the `cleverpixel-design-system` folder into your Vite project:

```bash
cp -r cleverpixel-design-system /path/to/your/vite-project/src/
```

### Option 2: Install as a local package

```bash
cd cleverpixel-design-system
npm link

# In your Vite project
npm link @cleverpixel/design-system
```

## Quick Start

### 1. Import Base Styles

In your main CSS file (e.g., `src/index.css` or `src/main.css`):

```css
@import './cleverpixel-design-system/src/styles/base.css';
```

Or if using Tailwind, add to your `tailwind.config.js`:

```js
import { tailwindColors } from './cleverpixel-design-system/src/tokens/colors';

export default {
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
}
```

### 2. Use Components

```jsx
import { Header, Button, Card, Footer } from './cleverpixel-design-system/src';

function App() {
  return (
    <>
      <Header 
        navItems={[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'About' },
        ]}
        onContactClick={() => console.log('Contact clicked')}
      />
      
      <main>
        <Card>
          <h2>Hello World</h2>
          <Button variant="primary">Click me</Button>
        </Card>
      </main>
      
      <Footer />
    </>
  );
}
```

## Design Tokens

### Colors

```js
import { colors } from './cleverpixel-design-system/src/tokens/colors';

// Available colors:
colors.red      // #E63946
colors.green    // #2A9D8F
colors.blue     // #1D4ED8
colors.yellow   // #F4B400
colors.ink      // #0F172A (text)
colors.cream    // #FFFBF5 (background)
```

### CSS Variables

All colors are available as CSS variables:

```css
.my-element {
  color: var(--cp-blue);
  background: var(--cp-cream);
}
```

### Typography

```js
import { fontFamily, fontSize, fontWeight } from './cleverpixel-design-system/src/tokens/typography';
```

## Components

### Logo

```jsx
import { Logo, LogoWithText } from './cleverpixel-design-system/src';

<Logo src="/assets/logo.svg" size="h-9 w-9" />
<LogoWithText logoSrc="/assets/logo.svg" />
```

### Header

```jsx
import { Header } from './cleverpixel-design-system/src';

<Header 
  navItems={[
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
  ]}
  logoSrc="/assets/logo.svg"
  onContactClick={() => navigateToContact()}
/>
```

### Button

```jsx
import { Button } from './cleverpixel-design-system/src';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" size="lg">Secondary</Button>
```

**Props:**
- `variant`: `'primary'` | `'secondary'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `disabled`: boolean

### Card

```jsx
import { Card, CardWithIndicator } from './cleverpixel-design-system/src';

<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>

<CardWithIndicator 
  color="blue" 
  label="Frontend" 
  title="Engineering"
>
  <p>Description</p>
</CardWithIndicator>
```

### Footer

```jsx
import { Footer } from './cleverpixel-design-system/src';

<Footer 
  links={[
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ]}
  copyrightText="Crafted with playful precision"
/>
```

## Using with Tailwind CSS

If your Vite project uses Tailwind CSS, update your `tailwind.config.js`:

```js
import { tailwindColors } from './src/cleverpixel-design-system/src/tokens/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/cleverpixel-design-system/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: tailwindColors,
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## Assets

Copy the logo SVG from the original project:

```bash
cp /path/to/cleverpixel-www/assets/logo.svg /path/to/your/vite-project/public/assets/
```

## Customization

All components accept `className` props for additional styling. You can also override CSS variables:

```css
:root {
  --cp-blue: #your-custom-blue;
}
```

## Examples

See the original `index.html` for full implementation examples of:
- Hero sections with gradient text
- Card grids
- Form styling
- Interactive elements

## License

MIT

