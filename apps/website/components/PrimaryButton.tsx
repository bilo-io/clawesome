'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  icon,
  size = 'md',
}) => {
  const baseStyles = "relative group overflow-hidden font-semibold whitespace-nowrap transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 text-white shadow-2xl";
  
  const sizeStyles = {
    sm: "px-5 py-2 rounded-full text-sm",
    md: "px-8 py-4 rounded-full text-lg",
    lg: "px-10 py-5 rounded-full text-xl",
  };

  const gradientStyles = "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] hover:brightness-110 shadow-purple-600/30";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 transition-transform group-hover:rotate-12">{icon}</span>}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
    </>
  );

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link 
          href={href} 
          className={cn(baseStyles, sizeStyles[size], gradientStyles, className)}
        >
          {content}
        </Link>
      );
    }
    return (
      <a 
        href={href} 
        className={cn(baseStyles, sizeStyles[size], gradientStyles, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, sizeStyles[size], gradientStyles, className)}
    >
      {content}
    </button>
  );
};
