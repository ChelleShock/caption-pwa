import React from 'react';

/**
 * Clever Pixel Card Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {boolean} props.hoverable
 */
export function Card({ 
  children, 
  className = '',
  hoverable = true 
}) {
  const baseClasses = 'rounded-xl bg-white border border-black/5 p-6 shadow-sm';
  const hoverClasses = hoverable ? 'hover:shadow-md transition' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card with Color Indicator
 */
export function CardWithIndicator({ 
  color = 'blue',
  label,
  title,
  children,
  className = ''
}) {
  const colorMap = {
    red: 'bg-[var(--cp-red)]',
    green: 'bg-[var(--cp-green)]',
    blue: 'bg-[var(--cp-blue)]',
    yellow: 'bg-[var(--cp-yellow)]',
  };

  return (
    <Card className={className}>
      {label && (
        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
          <span className={`w-2.5 h-2.5 rounded-full ${colorMap[color] || colorMap.blue}`}></span>
          {label}
        </div>
      )}
      {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
      {children}
    </Card>
  );
}

