'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'stat' | 'post' | 'user';
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  animate = false,
  delay = 0,
}: CardProps) {
  const variants = {
    default:
      'bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200',
    stat: 'bg-gradient-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105',
    post: 'bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:bg-dashboard-card-hover transition-all duration-200 cursor-pointer',
    user: 'bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200',
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
      {...(animate
        ? {
            initial: 'hidden',
            animate: 'visible',
            variants: cardAnimation,
          }
        : {})}
    >
      {children}
    </Component>
  );
}
