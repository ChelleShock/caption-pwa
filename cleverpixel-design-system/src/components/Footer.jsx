import React from 'react';
import { Logo } from './Logo';

/**
 * Clever Pixel Footer Component
 * 
 * @param {Object} props
 * @param {Array} props.links - Array of footer links { href, label }
 * @param {string} props.logoSrc - Path to logo SVG
 * @param {string} props.copyrightText - Copyright text
 */
export function Footer({ 
  links = [
    { href: '#work', label: 'Work' },
    { href: '#suite', label: 'Suite' },
    { href: '#contact', label: 'Contact' },
  ],
  logoSrc = '/assets/logo.svg',
  copyrightText = 'Crafted with playful precision'
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo src={logoSrc} size="h-7 w-7" />
            <span className="font-extrabold">Clever Pixel</span>
          </div>
          
          <div className="text-sm text-black/60">
            © {currentYear} Clever Pixel, LLC · {copyrightText}
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            {links.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-[var(--cp-blue)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

