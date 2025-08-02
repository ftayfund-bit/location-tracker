import React from 'react';
import type { ReactNode } from 'react';

export interface BadgeProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

export default Badge;
