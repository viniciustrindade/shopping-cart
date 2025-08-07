import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'purple' | 'cart';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium',
          
          // Variants
          {
            'bg-gray-100 text-gray-900': variant === 'default',
            'bg-purple-600 text-white': variant === 'purple',
            'absolute -top-2 -right-2 h-6 w-6 bg-purple-600 text-white text-xs font-bold': variant === 'cart',
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
