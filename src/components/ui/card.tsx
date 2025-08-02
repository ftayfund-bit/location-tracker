import React from 'react';
import type { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export const Card: React.FC<BaseProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const CardHeader: React.FC<BaseProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const CardTitle: React.FC<BaseProps> = ({ children, className }) => {
  return <h3 className={className}>{children}</h3>;
};

export const CardDescription: React.FC<BaseProps> = ({ children, className }) => {
  return <p className={className}>{children}</p>;
};

export const CardContent: React.FC<BaseProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Card;
