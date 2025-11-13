import React from 'react';

/**
 * Clever Pixel Logo Component
 * 
 * @param {Object} props
 * @param {string} props.src - Path to logo SVG file
 * @param {string} props.alt - Alt text for logo
 * @param {string} props.size - Size class (h-7 w-7, h-9 w-9, etc.)
 * @param {string} props.className - Additional CSS classes
 */
export function Logo({ 
  src = '/assets/logo.svg', 
  alt = 'Clever Pixel', 
  size = 'h-9 w-9',
  className = '' 
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${size} rounded shadow-sm ${className}`}
    />
  );
}

/**
 * Logo with Text Component
 */
export function LogoWithText({ 
  logoSrc = '/assets/logo.svg',
  showText = true,
  textColor = 'text-[var(--cp-blue)]',
  className = ''
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo src={logoSrc} size="h-9 w-9" />
      {showText && (
        <span className="font-extrabold tracking-tight text-lg">
          Clever <span className={textColor}>Pixel</span>
        </span>
      )}
    </div>
  );
}

