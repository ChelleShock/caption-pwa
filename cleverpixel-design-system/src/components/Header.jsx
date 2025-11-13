import React, { useState } from 'react';
import { LogoWithText } from './Logo';

/**
 * Clever Pixel Header Component
 * 
 * @param {Object} props
 * @param {Array} props.navItems - Array of navigation items { href, label }
 * @param {string} props.logoSrc - Path to logo SVG
 * @param {Function} props.onContactClick - Callback for contact button
 */
export function Header({ 
  navItems = [
    { href: '#work', label: 'Work' },
    { href: '#suite', label: 'Product Suite' },
    { href: '#about', label: 'About' },
  ],
  logoSrc = '/assets/logo.svg',
  onContactClick = null
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactClick = (e) => {
    if (onContactClick) {
      e.preventDefault();
      onContactClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--cp-cream)]/95 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3">
            <LogoWithText logoSrc={logoSrc} />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-semibold">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="hover:text-[var(--cp-blue)]"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={handleContactClick}
              className="px-3 py-2 rounded-md bg-[var(--cp-ink)] text-white hover:opacity-90"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            id="menuBtn"
            className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-black/5" 
            aria-label="Open menu" 
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} border-t border-black/5`}>
        <nav className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => {
              handleContactClick(e);
              setMobileMenuOpen(false);
            }}
            className="block py-2 font-semibold text-white bg-[var(--cp-ink)] rounded-md text-center"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

