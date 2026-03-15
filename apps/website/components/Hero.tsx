'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Command, Terminal, Sparkles, ChevronRight, Play, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { PrimaryButton } from '@/components/PrimaryButton';
import BackgroundVideo from './BackgroundVideo';

export const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden min-h-[90vh] flex flex-col justify-center items-center text-center isolate">
      {/* Background Video */}
      <BackgroundVideo mounted={mounted} src="/videos/vid-galaxy-bg.mp4" />
      

      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-1 px-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2 group"
      >
        {/* <Sparkles size={14} className="text-indigo-500 group-hover:animate-spin-slow" /> */}
        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
          <strong>v2026.3.1</strong>
        </span>
        {/* <ChevronRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform" /> */}
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-8"
      >
        <img 
          src="/clawesome-logo.svg" 
          alt="Clawesome Logo" 
          className="h-16 md:h-20 w-auto"
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-black md:max-w-5xl mb-12 leading-[1.3] text-slate-900 dark:text-white px-4 overflow-visible text-center"
        // style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
      >
        <span className="not-italic inline-block mb-2">Scale with custom</span><br /><span className="gradient-text">ai agent swarms</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 font-medium"
      >
        Deploy intelligent agents that browse, click, and process information. Clawesome is the first OS built for agentic workflows at scale.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-6"
      >
        <PrimaryButton 
          href="/download" 
          icon={<Terminal size={20} />}
        >
          It's clawesome
        </PrimaryButton>
        <button className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-black text-lg transition-all hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-95 group">
          <div className="p-1 px-1 bg-indigo-500/10 rounded-full group-hover:bg-indigo-500/20 transition-colors">
            <Play size={16} className="text-indigo-500 fill-indigo-500" />
          </div>
          Watch the Demo
        </button>
      </motion.div>

      {/* App Preview Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 w-full max-w-xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 p-1.5 bg-white/20 dark:bg-slate-900/50 glass-panel card-glow shadow-2xl"
      >
        <div className="w-full aspect-[840/708] bg-slate-50 dark:bg-black rounded-2xl border border-slate-200 dark:border-slate-900 overflow-hidden relative flex flex-col group/window">
          {/* macOS Title Bar */}
          <div className="h-10 px-4 flex items-center justify-between bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0 select-none">
            <div className="flex gap-2 w-20">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-inner shadow-black/10" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner shadow-black/10" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-inner shadow-black/10" />
            </div>
            
            <div className="flex-1 flex justify-center">
               <div className="px-5 py-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/5 flex items-center gap-3 scale-90 md:scale-100">
                  <Terminal size={12} className="text-indigo-500" />
                  <span className="text-[11px] font-mono font-bold tracking-tight text-slate-500 dark:text-slate-400">
                    npm install -g @clawesome/cli
                  </span>
               </div>
            </div>

            <div className="w-20 flex justify-end">
               <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors group/copy">
                 <Copy size={14} className="text-slate-400 group-hover/copy:text-indigo-500 transition-colors" />
               </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
             <video 
               src="/videos/vid-clawesome-cli.mov" 
               autoPlay 
               loop 
               muted 
               playsInline 
               className="w-full aspect-[840/708] object-cover"
             />
             
             {/* Subtle overlay gradient */}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
