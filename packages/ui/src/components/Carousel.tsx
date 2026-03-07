'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

export interface CarouselItem {
  id: string;
  [key: string]: unknown;
}

export interface CarouselProps<T extends CarouselItem> {
  items: T[];
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  className?: string;
  /** How many adjacent cards to show (1 = prev + active + next) */
  peekCount?: 1 | 2;
}

export const Carousel = <T extends CarouselItem>({
  items,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  className,
  peekCount = 1,
}: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta);
      setActiveIndex(prev => (prev + delta + items.length) % items.length);
    },
    [items.length]
  );

  const goNext = useCallback(() => go(1), [go]);
  const goPrev = useCallback(() => go(-1), [go]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, goNext]);

  // Compute the range of offsets to render
  const offsets: number[] = [];
  for (let o = -peekCount; o <= peekCount; o++) offsets.push(o);

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <div className="relative w-full overflow-visible py-8">
        <div className="flex items-center justify-center gap-6 overflow-visible">
          {offsets.map(offset => {
            const index = (activeIndex + offset + items.length) % items.length;
            const item = items[index];
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            return (
              <motion.div
                key={`${item.id}-${offset}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : Math.max(0, 1 - absOffset * 0.4),
                  scale: isActive ? 1 : 1 - absOffset * 0.08,
                  zIndex: isActive ? 10 : 10 - absOffset,
                  filter: isActive ? 'grayscale(0%) blur(0px)' : `grayscale(${absOffset * 40}%) blur(${absOffset * 1.5}px)`,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                  layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
                }}
                className="shrink-0"
                onClick={isActive ? undefined : () => {
                  setDirection(offset > 0 ? 1 : -1);
                  setActiveIndex(index);
                }}
                style={{ cursor: isActive ? 'default' : 'pointer' }}
              >
                {renderItem(item, isActive)}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        {showNavigation && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all shadow-2xl z-20 hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all shadow-2xl z-20 hover:scale-110 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {showDots && (
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                activeIndex === idx
                  ? 'w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
