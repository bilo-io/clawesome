'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, AlertTriangle, Check } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';

interface SlideToConfirmProps {
  onConfirm: () => void;
  label: string;
}

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({ onConfirm, label }) => {
  const { theme } = useUI();
  const [position, setPosition] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const maxPosition = containerRef.current ? containerRef.current.clientWidth - 56 : 0;

  const handleStart = () => { if (!isConfirmed) isDragging.current = true; };
  
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = Math.max(0, Math.min(clientX - rect.left - 24, maxPosition));
    
    setPosition(newPos);
    
    if (newPos >= maxPosition * 0.95) {
      handleConfirm();
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (!isConfirmed) {
      setPosition(0);
    }
  };

  const handleConfirm = () => {
    isDragging.current = false;
    setIsConfirmed(true);
    setPosition(maxPosition);
    setTimeout(() => {
      onConfirm();
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [maxPosition]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative h-14 rounded-2xl border transition-all duration-300 flex items-center px-2",
        isConfirmed 
          ? 'bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-500/20' 
          : (theme === 'dark' 
              ? 'bg-slate-900 border-slate-800 hover:border-rose-500/50' 
              : 'bg-slate-50 border-slate-200 hover:border-rose-300/50 shadow-sm')
      )}
    >
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 1 - position / maxPosition }}
      >
        <span className={cn(
          "text-sm font-semibold uppercase tracking-widest flex items-center gap-2",
          theme === 'dark' ? "text-slate-500" : "text-slate-400"
        )}>
          {!isConfirmed && <AlertTriangle size={14} className="text-rose-500" />}
          {label}
        </span>
      </div>

      <div
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{ transform: `translateX(${position}px)` }}
        className={cn(
          "z-10 w-10 h-10 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors shadow-lg",
          isConfirmed ? "bg-white text-emerald-600" : "bg-rose-600 text-white"
        )}
      >
        {isConfirmed ? <Check size={20} className="font-bold" /> : <ChevronRight size={20} />}
      </div>

      {isConfirmed && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in fade-in duration-500">
            <span className="text-sm font-bold text-white uppercase tracking-widest">Confirmed</span>
         </div>
      )}
    </div>
  );
};
