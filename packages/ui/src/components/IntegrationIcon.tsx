import React from 'react';
import { cn } from '../utils';

export interface IntegrationIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const IntegrationIcon: React.FC<IntegrationIconProps> = ({ name, size = 20, className }) => {
  return (
    <div
      className={cn("bg-current inline-block", className)}
      style={{
        width: size,
        height: size,
        maskImage: `url(/images/org/icon-${name}.svg)`,
        WebkitMaskImage: `url(/images/org/icon-${name}.svg)`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
};
