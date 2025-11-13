import React from 'react';

/**
 * Clever Pixel Button Component
 * 
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.disabled
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 */
export function Button({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[var(--cp-ink)] text-white hover:opacity-90',
    secondary: 'border border-black/10 bg-white/80 hover:bg-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

