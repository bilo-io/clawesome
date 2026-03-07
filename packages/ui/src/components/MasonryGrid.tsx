'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, LayoutGrid, Columns, LayoutPanelLeft } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface MasonryImage {
  id: string | number;
  url: string;
  alt?: string;
}

export interface MasonryGridProps {
  images: MasonryImage[];
  className?: string;
}

export function MasonryGrid({ images, className }: MasonryGridProps) {
  const { theme } = useUI();
  const [columns, setColumns] = useState<2 | 3 | 4>(3);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Floating Column Selector */}
      <div className="sticky top-4 z-20 flex justify-end mb-4 pointer-events-none">
        <div className={cn(
          "pointer-events-auto flex items-center p-1.5 rounded-2xl border shadow-2xl backdrop-blur-sm transition-all",
          theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
        )}>
          {([
            { cols: 2, icon: LayoutPanelLeft, tooltip: '2 Columns' },
            { cols: 3, icon: Columns, tooltip: '3 Columns' },
            { cols: 4, icon: LayoutGrid, tooltip: '4 Columns' },
          ] as const).map(({ cols, icon: Icon, tooltip }) => (
            <button
              key={cols}
              onClick={() => setColumns(cols as any)}
              title={tooltip}
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                columns === cols
                  ? (theme === 'dark' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-indigo-100 text-indigo-600 shadow-sm")
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")
              )}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Layout */}
      <div className={cn(
        "gap-4 space-y-4",
        columns === 2 && "columns-1 sm:columns-2",
        columns === 3 && "columns-2 md:columns-3",
        columns === 4 && "columns-2 md:columns-4"
      )}>
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            layoutId={`masonry-img-${img.id}`}
            onClick={() => setSelectedIndex(i)}
            className="break-inside-avoid rounded-2xl overflow-hidden border border-slate-800/10 dark:border-slate-800/50 group bg-slate-100 dark:bg-slate-900 shadow-sm relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <img 
              src={img.url} 
              alt={img.alt || `Image ${i}`} 
              className="w-full h-auto grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-[1.15] transition-all duration-700 ease-in-out" 
            />
            {/* Minimal overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                <span className="font-black text-xs uppercase tracking-widest leading-none mt-0.5">View</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 hover:rotate-90 duration-300"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button 
              className="absolute left-6 p-4 rounded-full bg-white/5 text-white/50 hover:bg-white/20 hover:text-white transition-all z-50 hover:-translate-x-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null));
              }}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button 
              className="absolute right-6 p-4 rounded-full bg-white/5 text-white/50 hover:bg-white/20 hover:text-white transition-all z-50 hover:translate-x-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null));
              }}
            >
              <ChevronRight size={32} />
            </button>

            {/* Main Image */}
            <div 
              className="max-w-5xl max-h-[85vh] w-full h-full relative flex items-center justify-center px-16"
              onClick={(e) => e.stopPropagation()} // Prevent bubbling to backdrop
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 text-white font-black uppercase tracking-widest text-[11px] backdrop-blur-md">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
