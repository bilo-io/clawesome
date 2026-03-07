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














import React from 'react';

export const LogoCloud = () => {
  const logos = [
    { name: 'Vercel', color: 'text-slate-900 dark:text-white' },
    { name: 'Stripe', color: 'text-indigo-500' },
    { name: 'OpenAI', color: 'text-emerald-500' },
    { name: 'Anthropic', color: 'text-amber-600' },
    { name: 'Supabase', color: 'text-emerald-400' },
    { name: 'Postman', color: 'text-orange-500' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-8 flex flex-col items-center">
       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Powering workflows for</span>
       <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {logos.map((logo) => (
            <span key={logo.name} className={`text-xl font-black tracking-tighter ${logo.color}`}>
               {logo.name}
            </span>
          ))}
       </div>
    </div>
  );
};
