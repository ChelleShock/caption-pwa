/**
 * Clever Pixel Design Tokens - Colors
 * 
 * Brand color palette with CSS variable equivalents
 */

export const colors = {
  // Primary brand colors
  red: '#E63946',
  green: '#2A9D8F',
  blue: '#1D4ED8',
  yellow: '#F4B400',
  
  // Neutral colors
  ink: '#0F172A',      // Primary text color
  cream: '#FFFBF5',    // Background color
  
  // Semantic colors (using brand colors)
  primary: '#1D4ED8',   // Blue
  success: '#2A9D8F',   // Green
  warning: '#F4B400',   // Yellow
  error: '#E63946',     // Red
};

/**
 * CSS variable names for use in CSS/SCSS
 */
export const cssVariables = {
  '--cp-red': colors.red,
  '--cp-green': colors.green,
  '--cp-blue': colors.blue,
  '--cp-yellow': colors.yellow,
  '--cp-ink': colors.ink,
  '--cp-cream': colors.cream,
};

/**
 * Tailwind color config (for tailwind.config.js)
 */
export const tailwindColors = {
  'cp-red': colors.red,
  'cp-green': colors.green,
  'cp-blue': colors.blue,
  'cp-yellow': colors.yellow,
  'cp-ink': colors.ink,
  'cp-cream': colors.cream,
};

