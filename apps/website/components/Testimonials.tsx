'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const Testimonials = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Head of Growth, ScaleAI',
      text: 'Clawesome transformed our lead generation. What used to take a team of 10 people weeks now happens in minutes with a single swarm.',
      avatar: 'AR',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'CTO @ MetaVision',
      text: 'The vision and the execution are unmatched. It is not just another LLM wrapper; it is a full operating system for autonomous agents.',
      avatar: 'SC',
      rating: 5,
    },
    {
      name: 'Leo James',
      role: 'Independent Researcher',
      text: 'Clawesome is the missing piece for automated data research. The swarms are incredibly robust even on the most difficult websites.',
      avatar: 'LJ',
      rating: 4,
    },
    {
      name: 'Elena Kostic',
      role: 'Engineering Lead, NeoStack',
      text: 'Our CI/CD pipelines now include browser-based agentic testing. It caught bugs we didn’t even know were possible in our frontend.',
      avatar: 'EK',
      rating: 5,
    },
    {
      name: 'Michael Wright',
      role: 'Founder, AutoBiz',
      text: 'Clawesome is literally the backbone of my automated agencies. Minimal overhead, massive output.',
      avatar: 'MW',
      rating: 5,
    },
    {
      name: 'Jenna Lopez',
      role: 'Ops Director, FlowState',
      text: 'It’s like hiring 100 junior engineers for the price of a single server. Unbelievable ROI.',
      avatar: 'JL',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);


  if (!mounted) return null;

  return (
    <section className="py-24 px-8 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors flex flex-col items-center">
      {/* Background decoration */}
      <Quote size={400} className="absolute -top-20 -left-20 text-slate-50 dark:text-slate-900/40 -rotate-12 -z-0 opacity-50" />
      
      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-4">
            Trusted by operators
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black md:max-w-2xl mb-4 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
            style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
          >
            <span className="not-italic">Built for you to</span> <span className="gradient-text">move fast</span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl font-medium">
            Join 5,000+ companies and innovators scaling their operations with Clawesome.
          </p>
        </div>

        <div className="relative w-full overflow-visible py-10">
          <div className="flex items-center justify-center gap-8 md:gap-12 overflow-visible">
            {[-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + testimonials.length) % testimonials.length;
              const testimonial = testimonials[index];
              const isActive = offset === 0;

              return (
                <motion.div
                  key={testimonial.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.3, 
                    scale: isActive ? 1 : 0.8,
                    zIndex: isActive ? 10 : 0,
                    filter: isActive ? "grayscale(0%)" : "grayscale(100%) blur(2px)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1], // Standard easing
                    layout: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                  }}
                  className={cn(
                    "relative w-full max-w-[360px] p-1 rounded-2xl shrink-0",
                    isActive ? "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] shadow-[0_0_80px_rgba(140,0,255,0.3)]" : "bg-transparent"
                  )}
                >
                  <div className="w-full h-full p-8 md:p-10 rounded-2xl flex flex-col items-center text-center transition-colors duration-700 bg-white dark:bg-slate-900/95">
                    <Quote className="text-indigo-500 mb-6 opacity-20" size={32} />
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-slate-200 dark:text-slate-800"} 
                        />
                      ))}
                    </div>

                    <p className="text-sm md:text-base font-bold leading-relaxed mb-8 italic flex-1 text-slate-700 dark:text-slate-200">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] flex items-center justify-center text-white font-black text-sm border-2 border-white dark:border-slate-800 shadow-lg transition-transform group-hover:scale-110">
                        {testimonial.avatar}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-slate-900 dark:text-white font-black text-sm">{testimonial.name}</span>
                        <span className="text-slate-500 dark:text-slate-500 font-bold text-[9px] uppercase tracking-widest">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:-left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all shadow-2xl z-20 hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:-right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all shadow-2xl z-20 hover:scale-110 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                currentIndex === idx 
                  ? "w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                  : "w-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
