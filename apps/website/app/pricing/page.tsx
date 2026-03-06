'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Building, ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useTheme } from 'next-themes';

export default function PricingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = [
    {
      name: "Operator",
      price: isAnnual ? "0" : "0",
      description: "For individuals exploring autonomous swarms.",
      features: [
        "5 Concurrent agents",
        "Public swarms",
        "Standard browsing speed",
        "Community support",
        "1GB Shared memory storage"
      ],
      icon: Zap,
      cta: "Get Started Free",
      featured: false,
    },
    {
      name: "Commander",
      price: isAnnual ? "29" : "39",
      description: "For professionals scaling their daily operations.",
      features: [
        "50 Concurrent agents",
        "Private swarms",
        "Priority browsing speed",
        "Email support",
        "10GB Dedicated memory",
        "Custom agent skills",
        "Advanced analytics"
      ],
      icon: Sparkles,
      cta: "Go Pro Now",
      featured: true,
      tag: "MOST POPULAR",
    },
    {
      name: "Legion",
      price: isAnnual ? "199" : "249",
      description: "For teams and agencies building the future.",
      features: [
        "Unlimited agents",
        "Organization workspace",
        "Enterprise-grade security",
        "Dedicated account manager",
        "SSO & Custom domains",
        "Self-hosting available",
        "SLA guarantees"
      ],
      icon: Building,
      cta: "Contact Sales",
      featured: false,
    }
  ];

  return (
    <div className="relative pt-40 pb-32 px-8 flex flex-col items-center min-h-screen bg-white dark:bg-[#020617] transition-colors isolate overflow-hidden">
      <BackgroundVideo mounted={mounted} src={"/videos/vid-space-river.mp4"} />
      <div className="max-w-7xl w-full">
         {/* Pricing Header */}
         <div className="flex flex-col items-center text-center mb-16">
            <h1 
              className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
              style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
            >
               <span className="not-italic">Pricing for the</span> <span className="gradient-text">Agentic Era</span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-400 max-w-2xl font-medium mb-12">
               Choose the plan that fits your swarm size and operational complexity.
            </p>

            {/* Toggle Switch */}
            <div className="flex items-center gap-4 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 transition-colors">
               <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${!isAnnual ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'}`}
               >
                  Monthly
               </button>
               <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${isAnnual ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'}`}
               >
                  Yearly
                  <span className="text-[10px] font-black tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">-25%</span>
               </button>
            </div>
         </div>

         {/* Plan Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-10 rounded-2xl border transition-all flex flex-col relative ${plan.featured ? 'border-indigo-500/40 bg-white dark:bg-indigo-500/5 shadow-2xl shadow-indigo-500/20 dark:shadow-none neon-glow py-16' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/20 shadow-sm'}`}
              >
                 {plan.tag && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black tracking-[0.2em] rounded-full shadow-lg">
                       {plan.tag}
                    </div>
                 )}
                 
                 <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl ${plan.featured ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-indigo-500'}`}>
                       <plan.icon size={28} />
                    </div>
                    <div className="flex flex-col">
                       <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{plan.name}</h2>
                       <p className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-500">POWERING YOUR SWARM</p>
                    </div>
                 </div>

                 <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">$</span>
                    <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
                    <span className="text-slate-500 font-bold">/mo</span>
                 </div>

                 <p className="text-slate-700 dark:text-slate-400 font-medium mb-10 leading-relaxed min-h-[48px]">
                    {plan.description}
                 </p>

                 <div className="flex flex-col gap-5 mb-12">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                         <div className={`p-1 rounded-full ${plan.featured ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>
                            <Check size={14} />
                         </div>
                         <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{feature}</span>
                      </div>
                    ))}
                 </div>

                 <button className={`w-full py-5 rounded-xl font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95 ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-black dark:hover:bg-slate-200 shadow-slate-950/20 dark:shadow-white/10'}`}>
                    {plan.cta}
                 </button>
              </motion.div>
            ))}
         </div>

         {/* Bottom CTA */}
         <div className="mt-32 w-full max-w-4xl mx-auto p-12 glass-panel card-glow rounded-2xl border-indigo-500/10 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-500/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Need a custom <span className="text-indigo-500">enterprise swarm</span>?</h3>
              <p className="text-xl text-slate-700 dark:text-slate-400 font-medium">We build bespoke autonomous systems for the world's largest companies.</p>
            </div>
            <Link href="#" className="whitespace-nowrap flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95 group shadow-2xl shadow-slate-950/20 dark:shadow-white/10">
               Talk to our experts
               <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>

         {/* FAQ Hook */}
         <div className="mt-16 text-center text-slate-500 font-bold flex items-center justify-center gap-2 group">
            <HelpCircle size={18} />
            Got more questions? 
            <Link href="/#faqs" className="text-indigo-500 hover:text-indigo-600 transition-colors">See our FAQs</Link>
         </div>
      </div>
    </div>
  );
}
