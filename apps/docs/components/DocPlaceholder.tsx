import { Cpu, Zap, Activity, Info } from 'lucide-react';

export default function DocPlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tight uppercase italic underline decoration-indigo-500/20 underline-offset-8">
          {title}
        </h1>
        <p className="text-xl dark:text-slate-400 text-slate-500 max-w-2xl leading-relaxed italic font-medium">
          {description}
        </p>
      </div>

      <div className="p-10 md:p-16 rounded-[60px] border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-emerald-500/0" />
         <div className="p-5 bg-indigo-500/10 text-indigo-500 rounded-3xl animate-bounce">
            <Info size={32} />
         </div>
         <div className="space-y-4">
            <h4 className="text-2xl font-black italic uppercase tracking-tighter">Documentation in Progress</h4>
            <p className="max-w-md text-sm text-slate-500 font-medium">We're actively building the next-gen neural operating system documentation. Detailed guides for <span className="text-indigo-500 font-bold">{title}</span> will land soon.</p>
         </div>
         <div className="flex gap-4">
            <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">v0.1.0 Roadmap</div>
            <div className="px-6 py-2 bg-indigo-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Coming Early Q2</div>
         </div>
      </div>
    </div>
  );
}

// Helper to wrap the placeholder for specific pages
export const Page = (title: string, desc: string) => {
  return function() { return <DocPlaceholder title={title} description={desc} /> };
}
