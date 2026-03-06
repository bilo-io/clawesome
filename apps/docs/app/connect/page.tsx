import { MessageSquare, Globe, Target, Send, Zap } from 'lucide-react';

export default function ConnectPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight uppercase italic underline decoration-indigo-500/50 underline-offset-8">Direct Connect</h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
          Integrate Clawesome OS with your preferred communication platforms. Every connection acts as a neural gateway for your AI agents.
        </p>
      </div>

      <nav className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <MessageSquare />, name: 'Slack', color: 'bg-emerald-500', link: '/connect/slack' },
          { icon: <Globe />, name: 'Discord', color: 'bg-indigo-500', link: '/connect/discord' },
          { icon: <Target />, name: 'Telegram', color: 'bg-blue-500', link: '/connect/telegram' },
          { icon: <Send />, name: 'WhatsApp', color: 'bg-green-500', link: '/connect/whatsapp' }
        ].map(platform => (
          <div key={platform.name} className="p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950 flex flex-col items-center group cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500/30">
            <div className={`p-4 rounded-3xl ${platform.color} bg-opacity-10 text-white mb-4 group-hover:scale-110 transition-transform`}>
               {platform.icon}
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{platform.name}</span>
          </div>
        ))}
      </nav>

      <div className="p-10 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
         <Zap className="text-indigo-500" size={32} />
         <h4 className="text-xl font-bold italic tracking-tighter">Need a custom integration?</h4>
         <p className="text-sm text-slate-500 max-w-sm">Use our Open Source SDK and MCP definitions to build a connector for any platform in minutes.</p>
         <button className="px-10 py-3 bg-indigo-500 text-white font-black uppercase tracking-tighter text-[10px] rounded-full active:scale-95 transition-all">
            See the SDK Docs
         </button>
      </div>
    </div>
  );
}
