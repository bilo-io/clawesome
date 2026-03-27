'use client';














import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Star, GitBranch as Github } from 'lucide-react';
import { cn } from '../../utils';

export const Donate = () => {
  return (
    <section id="donate" className="py-24 px-8 bg-slate-900 dark:bg-black transition-colors flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-4xl w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8 p-4 bg-rose-500/10 rounded-3xl"
        >
          <Heart size={48} className="text-rose-500 fill-rose-500 animate-pulse" />
        </motion.div>

        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white md:max-w-2xl mb-8 leading-[1.3] overflow-visible px-12"
          style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
        >
          <span className="not-italic">Support our</span> <span className="gradient-text">Open Source</span> mission
        </h2>
        
        <p className="text-xl text-slate-400 max-w-2xl mb-16 font-medium leading-relaxed">
          Clawesome is built by a small team of engineers dedicated to the future of autonomous agents. Every contribution helps us maintain the core OS and keep it free for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {[
            {
              icon: Coffee,
              title: "Buy us a coffee",
              amount: "$5",
              color: "text-amber-500",
              bgColor: "bg-amber-500/10",
            },
            {
              icon: Star,
              title: "Github Sponsor",
              amount: "Monthly",
              color: "text-indigo-400",
              bgColor: "bg-indigo-400/10",
              link: "https://github.com/sponsors/clawesome",
            },
            {
              icon: Github,
              title: "Star our Repo",
              amount: "Free",
              color: "text-white",
              bgColor: "bg-white/10",
              link: "https://github.com/clawesome/clawesome",
            }
          ].map((item, idx) => (
            <motion.a
                key={idx}
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center gap-4 card-glow"
            >
              <div className={cn("p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform", item.bgColor)}>
                <item.icon size={24} className={item.color} />
              </div>
              <div className="flex flex-col gap-1 items-center">
                 <span className="text-white font-black text-lg tracking-tight">{item.title}</span>
                 <span className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">{item.amount}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <button className="mt-16 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-xl shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
           Donate via Stripe
        </button>
      </div>
    </section>
  );
};
