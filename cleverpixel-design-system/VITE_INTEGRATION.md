# Vite.js Integration Guide

Step-by-step guide to integrate the Clever Pixel Design System into your Vite.js PWA.

## Step 1: Copy the Design System

Copy the entire `cleverpixel-design-system` folder into your Vite project:

```bash
# From your cleverpixel-www directory
cp -r cleverpixel-design-system /path/to/your/vite-project/src/
```

Or if you prefer to keep it separate:

```bash
cp -r cleverpixel-design-system /path/to/your/vite-project/
```

## Step 2: Install Dependencies

Make sure you have React installed in your Vite project:

```bash
cd /path/to/your/vite-project
npm install react react-dom
```

If using Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 3: Configure Tailwind (if using Tailwind)

Update your `tailwind.config.js`:

```js
import { tailwindColors } from './src/cleverpixel-design-system/src/tokens/colors';

/** @type {import('tailwindcss').Config} */
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

## Step 4: Import Base Styles

In your main CSS file (e.g., `src/index.css` or `src/main.css`):

```css
@import './cleverpixel-design-system/src/styles/base.css';

/* Or if you're using Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './cleverpixel-design-system/src/styles/base.css';
```

## Step 5: Copy Assets

Copy the logo SVG to your public folder:

```bash
cp /path/to/cleverpixel-www/assets/logo.svg /path/to/your/vite-project/public/assets/
```

## Step 6: Use Components

In your React components (e.g., `src/App.jsx`):

```jsx
import { Header, Button, Card, Footer } from './cleverpixel-design-system/src';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[var(--cp-cream)]">
      <Header 
        navItems={[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'About' },
        ]}
        onContactClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold mb-8">
          Welcome to Your PWA
        </h1>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-bold text-lg mb-2">Card Title</h3>
            <p className="text-sm text-black/70">Card content</p>
            <Button variant="primary" className="mt-4">Action</Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
```

## Step 7: Update Vite Config (Optional)

If you want to use path aliases for cleaner imports, update `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cleverpixel': path.resolve(__dirname, './src/cleverpixel-design-system'),
    },
  },
});
```

Then import like:

```jsx
import { Header } from '@cleverpixel/src';
```

## Example: Complete App Structure

```
your-vite-project/
├── public/
│   └── assets/
│       └── logo.svg
├── src/
│   ├── cleverpixel-design-system/
│   │   └── (all design system files)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Troubleshooting

### Components not rendering

- Make sure React is installed: `npm install react react-dom`
- Check that you're importing from the correct path
- Verify the design system folder is in the right location

### Styles not applying

- Ensure `base.css` is imported in your main CSS file
- If using Tailwind, make sure the design system files are in the `content` array
- Check browser console for CSS import errors

### Logo not showing

- Verify the logo SVG is in `public/assets/logo.svg`
- Check the `logoSrc` prop path matches your file structure

## Next Steps

- Customize colors by overriding CSS variables
- Add your own components following the same patterns
- Extend the design tokens with your own values
- See `STYLE_GUIDE.md` for complete design reference

