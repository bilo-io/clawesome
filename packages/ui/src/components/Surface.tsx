'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SurfaceMaterial = 'paper' | 'glass' | 'status' | 'neon';

export type SurfaceColor =
  | 'indigo'
  | 'violet'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'sky'
  | 'fuchsia';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual treatment for the card surface. Defaults to 'paper'. */
  material?: SurfaceMaterial;
  /**
   * Semantic color used by 'status' (hover glow tint) and 'neon' (gradient hue).
   * Defaults to 'indigo'.
   */
  color?: SurfaceColor;
  /** Tailwind border-radius override, e.g. 'rounded-2xl'. Defaults per material. */
  radius?: string;
  /** Tailwind padding override, e.g. 'p-6'. Defaults per material. */
  padding?: string;
  /** Whether to animate in on mount. */
  animate?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ─── Color palettes ───────────────────────────────────────────────────────────

const COLOR_MAP: Record<SurfaceColor, {
  glow: string;        // rgba for box-shadow
  border: string;      // Tailwind border color class (hover)
  bg: string;          // Tailwind bg tint class (hover, status)
  gradient: string;    // CSS gradient string (neon)
  glowHex: string;     // hex for neon outer glow
}> = {
  indigo:  { glow: 'rgba(99,102,241,0.25)',  border: 'indigo-500/40',  bg: 'indigo-500/8',  gradient: 'from-indigo-500 via-violet-500 to-indigo-400',   glowHex: '#6366f1' },
  violet:  { glow: 'rgba(139,92,246,0.25)',  border: 'violet-500/40',  bg: 'violet-500/8',  gradient: 'from-violet-500 via-purple-500 to-violet-400',   glowHex: '#8b5cf6' },
  cyan:    { glow: 'rgba(6,182,212,0.25)',   border: 'cyan-500/40',    bg: 'cyan-500/8',    gradient: 'from-cyan-400 via-sky-400 to-cyan-300',          glowHex: '#06b6d4' },
  emerald: { glow: 'rgba(16,185,129,0.25)', border: 'emerald-500/40', bg: 'emerald-500/8', gradient: 'from-emerald-400 via-teal-400 to-emerald-300',    glowHex: '#10b981' },
  rose:    { glow: 'rgba(244,63,94,0.25)',   border: 'rose-500/40',    bg: 'rose-500/8',    gradient: 'from-rose-500 via-pink-500 to-rose-400',          glowHex: '#f43f5e' },
  amber:   { glow: 'rgba(245,158,11,0.25)', border: 'amber-500/40',   bg: 'amber-500/8',   gradient: 'from-amber-400 via-orange-400 to-amber-300',      glowHex: '#f59e0b' },
  sky:     { glow: 'rgba(14,165,233,0.25)',  border: 'sky-500/40',     bg: 'sky-500/8',     gradient: 'from-sky-500 via-blue-500 to-sky-400',            glowHex: '#0ea5e9' },
  fuchsia: { glow: 'rgba(217,70,239,0.25)', border: 'fuchsia-500/40', bg: 'fuchsia-500/8', gradient: 'from-fuchsia-500 via-pink-500 to-fuchsia-400',    glowHex: '#d946ef' },
};

// ─── Paper ─────────────────────────────────────────────────────────────────

const PaperSurface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ radius, padding, className, children, animate, ...rest }, ref) => {
    const { theme } = useUI();
    const r = radius ?? 'rounded-[32px]';
    const p = padding ?? 'p-8';

    const Tag = animate ? motion.div : 'div';
    const motionProps = animate
      ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } }
      : {};

    return (
      <Tag
        ref={ref}
        className={cn(
          r, p,
          'border transition-all duration-300',
          theme === 'dark'
            ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700 hover:shadow-xl hover:shadow-black/30'
            : 'bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300',
          className,
        )}
        {...motionProps}
        {...(rest as object)}
      >
        {children}
      </Tag>
    );
  }
);
PaperSurface.displayName = 'PaperSurface';

// ─── Glass ─────────────────────────────────────────────────────────────────

const GlassSurface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ radius, padding, className, children, animate, ...rest }, ref) => {
    const { theme } = useUI();
    const r = radius ?? 'rounded-[32px]';
    const p = padding ?? 'p-8';

    const Tag = animate ? motion.div : 'div';
    const motionProps = animate
      ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } }
      : {};

    return (
      // Gradient border wrapper
      <div
        className={cn(
          r,
          'p-[1px] transition-all duration-500',
          theme === 'dark'
            ? 'bg-gradient-to-br from-white/15 via-white/5 to-white/10 hover:from-white/25 hover:via-white/10 hover:to-white/20'
            : 'bg-gradient-to-br from-slate-300/80 via-slate-100/50 to-slate-200/60 hover:from-indigo-200/80 hover:via-white/60 hover:to-violet-200/70',
        )}
      >
        <Tag
          ref={ref}
          className={cn(
            r,
            p,
            'w-full h-full backdrop-blur-xl transition-all duration-300',
            theme === 'dark'
              ? 'bg-slate-950/60 hover:bg-slate-950/40'
              : 'bg-white/70 hover:bg-white/80',
            className,
          )}
          {...motionProps}
          {...(rest as object)}
        >
          {children}
        </Tag>
      </div>
    );
  }
);
GlassSurface.displayName = 'GlassSurface';

// ─── Status ────────────────────────────────────────────────────────────────

const StatusSurface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ radius, padding, color = 'indigo', className, children, animate, ...rest }, ref) => {
    const { theme } = useUI();
    const palette = COLOR_MAP[color];
    const r = radius ?? 'rounded-[32px]';
    const p = padding ?? 'p-8';

    const Tag = animate ? motion.div : 'div';
    const motionProps = animate
      ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } }
      : {};

    return (
      <Tag
        ref={ref}
        style={{ '--status-glow': palette.glow } as React.CSSProperties}
        className={cn(
          r, p,
          'group border transition-all duration-300 relative overflow-hidden',
          theme === 'dark'
            ? 'bg-slate-900/60 border-slate-800 hover:border-opacity-60'
            : 'bg-white border-slate-200 shadow-sm hover:shadow-lg',
          // Hover: tint border by color
          `hover:border-${palette.border} hover:shadow-[0_0_32px_var(--status-glow)]`,
          className,
        )}
        {...motionProps}
        {...(rest as object)}
      >
        {/* Subtle background tint on hover */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit',
            `bg-${palette.bg}`,
          )}
        />
        <div className="relative z-10">{children}</div>
      </Tag>
    );
  }
);
StatusSurface.displayName = 'StatusSurface';

// ─── Neon ──────────────────────────────────────────────────────────────────

const NeonSurface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ radius, padding, color = 'indigo', className, children, animate, ...rest }, ref) => {
    const { theme } = useUI();
    const palette = COLOR_MAP[color];
    const r = radius ?? 'rounded-[32px]';
    const p = padding ?? 'p-8';

    const Tag = animate ? motion.div : 'div';
    const motionProps = animate
      ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } }
      : {};

    return (
      <div className={cn('relative group', r)}>
        {/* Outer glow — intensifies on hover */}
        <div
          className={cn(
            'absolute -inset-[2px] rounded-[34px] opacity-40 blur-[10px] group-hover:opacity-80 group-focus-within:opacity-80 transition-all duration-500',
            `bg-gradient-to-br ${palette.gradient}`,
          )}
        />
        {/* Gradient border (1px via padding trick) */}
        <div
          className={cn(
            'relative p-[1px] rounded-[32px] transition-all duration-500',
            `bg-gradient-to-br ${palette.gradient}`,
            'opacity-70 group-hover:opacity-100 group-focus-within:opacity-100',
          )}
        >
          <Tag
            ref={ref}
            className={cn(
              r, p,
              'relative w-full h-full transition-all duration-300',
              theme === 'dark'
                ? 'bg-slate-950/90 backdrop-blur-sm'
                : 'bg-white/95 backdrop-blur-sm',
              className,
            )}
            {...motionProps}
            {...(rest as object)}
          >
            {children}
          </Tag>
        </div>
      </div>
    );
  }
);
NeonSurface.displayName = 'NeonSurface';

// ─── Main Surface export ───────────────────────────────────────────────────

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ material = 'paper', ...props }, ref) => {
    switch (material) {
      case 'glass':  return <GlassSurface  ref={ref} {...props} />;
      case 'status': return <StatusSurface ref={ref} {...props} />;
      case 'neon':   return <NeonSurface   ref={ref} {...props} />;
      case 'paper':
      default:       return <PaperSurface  ref={ref} {...props} />;
    }
  }
);
Surface.displayName = 'Surface';
