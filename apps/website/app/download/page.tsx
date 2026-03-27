'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Download as DownloadIcon, 
  ChevronRight,
  Zap,
  Cloud
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedDownload } from '@/components/AnimatedDownload';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import BackgroundVideo from '@/components/BackgroundVideo';

export default function DownloadPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [detectedOs, setDetectedOs] = useState<'mac' | 'windows' | 'linux' | null>(null);

  useEffect(() => {
    setMounted(true);
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('mac') !== -1) setDetectedOs('mac');
    else if (ua.indexOf('win') !== -1) setDetectedOs('windows');
    else if (ua.indexOf('linux') !== -1) setDetectedOs('linux');
  }, []);

  const allVersions = [
    {
      id: 'mac',
      os: "MacOS",
      iconPath: "/images/org/icon-apple.svg",
      version: "v2.0.4-stable",
      size: "84MB",
      link: "/downloads/Clawesome-Mac.dmg",
      featured: true,
      extension: '.dmg'
    },
    {
      id: 'linux',
      os: "Linux",
      iconPath: "/images/org/icon-linux.svg",
      version: "v2.0.4-beta",
      size: "76MB",
      link: "/downloads/Clawesome-Linux.AppImage",
      extension: '.AppImage'
    },
    {
      id: 'windows',
      os: "Windows",
      iconPath: "/images/org/icon-windows.svg",
      version: "v2.0.4-beta",
      size: "92MB",
      link: "/downloads/Clawesome-Windows.exe",
      extension: '.exe'
    }
  ];

  // Reorder so detected OS is in center (index 1)
  const versions = useMemo(() => {
    if (!detectedOs) return allVersions;
    const detected = allVersions.find(v => v?.id === detectedOs);
    const others = allVersions.filter(v => v?.id !== detectedOs);
    if (!detected) return allVersions;
    
    // Put detected in center, others on sides
    return [others[0], detected, others[1]];
  }, [detectedOs]);

  return (
    <div className="relative pt-40 pb-32 px-8 flex flex-col items-center min-h-[90vh] isolate overflow-hidden">
      <BackgroundVideo mounted={mounted} src={"/videos/vid-space-stars.mp4"} />

      <div className="max-w-5xl w-full">
         {/* Feature Header — title & subtitle only */}
         <div className="flex flex-col items-center text-center mb-12">
            <h1 
              className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
              style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
            >
              <span className="not-italic">Just click</span><br /><span className="gradient-text">Download</span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-400 max-w-2xl font-medium">
              Experience the power of a fully autonomous AI operating system on your local machine.
            </p>
        </div>
        
        {/* Animated Download tray — between grid and alternative methods */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedDownload size={100} />
          </motion.div>
        </div>

         {/* OS Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-8">
            {versions.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-10 rounded-2xl border transition-all flex flex-col items-center text-center",
                  v?.featured 
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl z-10 scale-105' 
                    : 'glass-panel bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-white/20 dark:border-slate-800 shadow-2xl scale-95 opacity-80 hover:opacity-100 hover:scale-100'
                )}
              >
                 <div className="relative group">
                   <div 
                     className={cn(
                       "w-16 h-16 transition-transform group-hover:scale-110",
                       v?.featured ? "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6]" : "bg-slate-400 dark:bg-slate-600"
                     )}
                     style={{
                        maskImage: `url(${v?.iconPath})`,
                        WebkitMaskImage: `url(${v?.iconPath})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                     }}
                   />
                 </div>
                 <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white">{v?.os}</h2>
                 <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">{v?.version} — {v?.size}</p>
                 <div className="w-full mt-10 block">
                   {v?.featured ? (
                     <a href={v?.link} download className="relative w-full inline-flex items-center justify-center font-bold overflow-hidden transition-all shadow-xl group px-8 py-4 text-base rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                        <span className="relative z-10 flex items-center">
                          <DownloadIcon size={20} className="mr-2 transition-transform group-hover:rotate-12" />
                          Download ({v?.extension})
                        </span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
                     </a>
                   ) : (
                     <a href={v?.link} download className="px-6 py-4 w-full rounded-xl font-semibold whitespace-nowrap text-sm flex flex-row items-center justify-center transition-all shadow-lg bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800">
                        <DownloadIcon size={20} className="mr-2" />
                        <span>Download ({v?.extension})</span>
                     </a>
                   )}
                 </div>
              </motion.div>
            ))}
         </div>

         

          {/* Alternative Methods */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="p-8 glass-panel rounded-2xl flex items-start gap-6 border-indigo-500/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
               <div className="p-4 bg-indigo-500/10 rounded-xl">
                  <Cloud size={24} className="text-indigo-500" />
               </div>
               <div className="flex flex-col gap-2">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white">Cloud IDE</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Run Clawesome in our managed cloud environment. No installation required.</p>
                  <Link href="/login" className="mt-2 flex items-center gap-2 text-indigo-500 font-bold text-sm group">
                     Open in Browser
                     <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>

            <div className="p-8 glass-panel rounded-2xl flex items-start gap-6 border-indigo-500/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50">
               <div className="p-4 bg-emerald-500/10 rounded-xl">
                  <Zap size={24} className="text-emerald-500" />
               </div>
               <div className="flex flex-col gap-2">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white">Clawesome CLI</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium font-mono text-sm px-3 py-1 bg-slate-100 dark:bg-black rounded-lg w-fit">npm i -g @clawesome/cli</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">FOR POWER OPERATORS</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
