// @ts-nocheck
'use client';
/* SHOWCASE_MOCKS_START */
// @ts-ignore
const Link = (props: any) => <a href={props.href} {...props}>{props.children}</a>;
// @ts-ignore
const Image = (props: any) => <img src={props.src} alt={props.alt} {...props} />;
// @ts-ignore
const usePathname = () => "";
// @ts-ignore
const useSearchParams = () => new URLSearchParams();
// @ts-ignore
const useTheme = () => ({ theme: 'dark', setTheme: () => {} });
/* SHOWCASE_MOCKS_END */














import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils';


export const Faqs = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is Clawesome different from a browser automation library like Playwright?",
      answer: "Playwright is a tool for developers to write scripts. Clawesome is an OS that uses LLMs and vision agents to 'see' and 'interact' with websites autonomously. You don't need to write selectors or handle cookies; the agents figure it out for you based on simple English goals."
    },
    {
      question: "Is it safe to use my real logins with Clawesome?",
      answer: "Security is built-in. Credentials are never shared with LLMs. We use a secure vault and a headless environment to execute actions. You can also define granular permissions for what each agent is allowed to click or see."
    },
    {
      question: "How many agents can I run in a single swarm?",
      answer: "The Free plan supports 5 concurrent agents. Pro and Enterprise plans allow for thousands of agents running in parallel across our distributed edge network."
    },
    {
      question: "Does it support sites with heavy CAPTCHA protection?",
      answer: "Yes. Clawesome includes advanced human-emulation and integrated CAPTCHA solvers. If a site is particularly difficult, you can enable human-in-the-loop triggers to handle the challenge manually while the agent waits."
    },
    {
      question: "Can I self-host Clawesome for high-security environments?",
      answer: "Absolutely. We offer a self-hosted enterprise version that runs entirely within your VPC. No data ever leaves your network."
    }
  ];

  return (
    <section id="faqs" className="py-24 px-8 bg-slate-50/50 dark:bg-slate-950 transition-colors flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col mb-16 items-center text-center">
          <HelpCircle size={48} className="text-[#8C00FF] mb-6 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#8C00FF] mb-4">
            Curious?
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black md:max-w-2xl mb-4 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
            style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
          >
            <span className="not-italic">F A</span><span className="gradient-text">Q</span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl font-medium">
            Everything you need to know about the platform and our swarms.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={cn(
                  "transition-all duration-300 rounded-xl border card-glow",
                  isOpen 
                    ? 'border-[#8C00FF]/30 bg-white dark:bg-indigo-500/5 shadow-xl shadow-slate-200/50 dark:shadow-none' 
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-transparent'
                )}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-7 text-left group"
                >
                  <span className={`text-xl font-black tracking-tight transition-colors ${isOpen ? 'text-[#8C00FF] dark:text-[#8C00FF]' : 'text-slate-900 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-[#8C00FF] text-white rotate-180 shadow-lg shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:bg-indigo-50 group-hover:text-white'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 text-slate-700 dark:text-slate-400 font-medium text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 glass-panel card-glow rounded-2xl bg-[#8C00FF] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-500/30">
           <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black tracking-tight">Still have questions?</h3>
              <p className="text-indigo-100 font-medium">Our team is always here to help you get started with Clawesome.</p>
           </div>
           <Link href="#" className="flex items-center gap-2 group text-white font-black tracking-widest uppercase text-xs bg-white/10 hover:bg-white/20 p-4 px-6 rounded-2xl transition-all">
              Chat with support
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
};
