/**
 * Example Usage of Clever Pixel Design System
 * 
 * This file demonstrates how to use all components and tokens
 * in a Vite.js React application.
 */

import React from 'react';
import { 
  Header, 
  Footer, 
  Button, 
  Card, 
  CardWithIndicator,
  Logo,
  LogoWithText 
} from './src';

// Example App Component
export function ExampleApp() {
  return (
    <div className="min-h-screen bg-[var(--cp-cream)]">
      {/* Header */}
      <Header 
        navItems={[
          { href: '#work', label: 'Work' },
          { href: '#suite', label: 'Product Suite' },
          { href: '#about', label: 'About' },
        ]}
        logoSrc="/assets/logo.svg"
        onContactClick={() => {
          const contactSection = document.getElementById('contact');
          contactSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Digital products with{' '}
              <span className="bg-gradient-to-r from-[var(--cp-red)] via-[var(--cp-yellow)] to-[var(--cp-blue)] bg-clip-text text-transparent">
                playful precision
              </span>
              .
            </h1>
            <p className="mt-5 text-lg text-black/70 max-w-prose mx-auto">
              Example usage of the Clever Pixel Design System components.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" size="md">
                Start a project
              </Button>
              <Button variant="secondary" size="md">
                See our work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="work" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold">What we craft</h2>
          <p className="mt-3 text-black/70 max-w-prose">
            Example card components with different variants.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card with Indicator */}
            <CardWithIndicator 
              color="blue"
              label="Web & App UX"
              title="Product Design"
            >
              <p className="mt-2 text-sm text-black/70">
                Flows, wireframes, and pixel-perfect UI built with real component systems.
              </p>
              <ul className="mt-3 text-sm list-disc pl-5 text-black/70 space-y-1">
                <li>Design systems & tokens</li>
                <li>Interactive prototypes</li>
                <li>Accessibility first</li>
              </ul>
            </CardWithIndicator>

            <CardWithIndicator 
              color="green"
              label="Frontend"
              title="Engineering"
            >
              <p className="mt-2 text-sm text-black/70">
                React/Next.js builds with Tailwind, API hooks, and careful performance budgets.
              </p>
            </CardWithIndicator>

            {/* Simple Card */}
            <Card>
              <h3 className="font-bold text-lg mb-2">Simple Card</h3>
              <p className="text-sm text-black/70 mb-4">
                This is a basic card without an indicator.
              </p>
              <Button variant="primary" size="sm">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Logo Examples */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8">Logo Components</h2>
          <div className="flex flex-wrap items-center gap-8">
            <Logo src="/assets/logo.svg" size="h-9 w-9" />
            <LogoWithText logoSrc="/assets/logo.svg" />
            <Logo src="/assets/logo.svg" size="h-16 w-16" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Get in Touch</h2>
          <p className="mt-3 text-black/70">Example contact form styling.</p>

          <form className="mt-8 grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm font-semibold">Name</span>
              <input 
                type="text"
                className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 shadow-sm focus:border-[var(--cp-blue)] focus:ring-1 focus:ring-[var(--cp-blue)]" 
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Email</span>
              <input 
                type="email"
                className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 shadow-sm focus:border-[var(--cp-blue)] focus:ring-1 focus:ring-[var(--cp-blue)]" 
                placeholder="you@company.com"
              />
            </label>
            <Button type="submit" variant="primary" className="mt-2">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        links={[
          { href: '#work', label: 'Work' },
          { href: '#suite', label: 'Suite' },
          { href: '#contact', label: 'Contact' },
        ]}
        logoSrc="/assets/logo.svg"
        copyrightText="Crafted with playful precision"
      />
    </div>
  );
}

// Example: Using Design Tokens
export function TokenExamples() {
  // Import tokens
  const { colors } = require('./src/tokens/colors');
  
  return (
    <div>
      {/* Using CSS variables (recommended) */}
      <div style={{ color: 'var(--cp-blue)' }}>
        This text uses CSS variables
      </div>
      
      {/* Using JavaScript tokens */}
      <div style={{ backgroundColor: colors.cream, color: colors.ink }}>
        This uses JavaScript tokens
      </div>
    </div>
  );
}

