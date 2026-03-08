// packages/ui/src/components/Terminal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Zap, 
  Activity, 
  Info, 
  CornerDownLeft, 
  CheckCircle2,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'warn';
  text: string;
}

export interface TerminalProps {
  initialHistory?: TerminalLine[];
  title?: string;
  subtitle?: string;
  onCommand?: (cmd: string) => TerminalLine[];
  onClose?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  isConnected?: boolean;
  className?: string;
  showChrome?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  initialHistory = [],
  title = "Neural Terminal",
  subtitle = "Direct CLI access to your agentic swarm.",
  onCommand,
  onClose,
  onMaximize,
  isMaximized = false,
  isConnected = true,
  className,
  showChrome = true,
}) => {
  const { theme } = useUI();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let newLines: TerminalLine[] = [{ type: 'input', text: input }];

    if (onCommand) {
      newLines = [...newLines, ...onCommand(cmd)];
    } else {
      // Default basic commands
      if (cmd === 'help') {
        newLines.push({ type: 'output', text: 'AVAILABLE COMMANDS: help, clear, whoami' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'whoami') {
        newLines.push({ type: 'success', text: 'USER ACTIVE: BiloDev' });
      } else {
        newLines.push({ type: 'error', text: `Command not found: ${cmd}` });
      }
    }

    setHistory(prev => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className={cn("h-full flex flex-col space-y-6", className)}>
      {showChrome && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
                  <TerminalIcon size={18} />
               </div>
               <h1 className="text-3xl font-black italic tracking-tighter uppercase">{title}</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1 text-sm tracking-tight italic opacity-70">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">Gateway Locked</span>
               <span className="text-[9px] font-bold text-slate-500 uppercase">SSHv2 / AES-256-GCM</span>
             </div>
             <div className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-emerald-500">
                <Zap size={20} className="animate-pulse" />
             </div>
          </div>
        </div>
      )}

      <div 
        className={cn(
          "flex-1 rounded-[1.5rem] border overflow-hidden flex flex-col relative min-h-[400px] transition-all duration-300",
          isMaximized 
            ? theme === 'dark' ? "bg-black/60 backdrop-blur-md border-white/10" : "bg-white/80 backdrop-blur-md border-slate-200" 
            : theme === 'dark' 
              ? "bg-black border-slate-800 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]" 
              : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={cn(
          "p-4 border-b flex items-center justify-between",
          theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
        )}>
           <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-3">
                 <div className={cn("w-3 h-3 rounded-full border", isConnected ? "bg-emerald-500/20 border-emerald-500/50" : "bg-rose-500/20 border-rose-500/50")} />
                 <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
              </div>
              <TerminalIcon size={14} className="text-emerald-500 opacity-50" />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                {title} // {isConnected ? 'CONNECTED' : 'OFFLINE'}
              </span>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                 <Activity size={12} className={isConnected ? "animate-pulse" : ""} />
                 <span>Sync: 14ms</span>
              </div>
              
              {(onMaximize || onClose) && (
                <div className="flex items-center gap-1.5 ml-4 border-l border-white/10 pl-4">
                   {onMaximize && (
                     <button onClick={onMaximize} className="p-1 hover:bg-white/5 rounded transition-colors text-slate-500 hover:text-white">
                        {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                     </button>
                   )}
                   {onClose && (
                     <button onClick={onClose} className="p-1 hover:bg-rose-500/20 rounded transition-colors text-slate-500 hover:text-rose-500">
                        <X size={12} />
                     </button>
                   )}
                </div>
              )}
           </div>
        </div>

        <div className="flex-1 p-8 font-mono text-sm overflow-y-auto no-scrollbar scroll-smooth">
           <div className="space-y-1.5">
             {history.map((line, i) => (
               <div key={i} className="flex gap-4 group">
                  {line.type === 'input' ? (
                    <>
                      <span className="text-emerald-500 font-bold shrink-0">➜</span>
                      <span className={cn("font-bold", theme === 'dark' ? "text-slate-100" : "text-slate-900")}>{line.text}</span>
                    </>
                  ) : (
                    <span className={cn(
                      "leading-relaxed break-all",
                      line.type === 'error' ? "text-rose-400" :
                      line.type === 'success' ? "text-emerald-400" :
                      line.type === 'warn' ? "text-amber-400" : 
                      (theme === 'dark' ? "text-slate-400" : "text-slate-600")
                    )}>
                      {line.text}
                    </span>
                  )}
               </div>
             ))}
             
             <form onSubmit={handleCommand} className="flex gap-4 items-center pt-2 group">
                <span className="text-emerald-500 font-bold shrink-0">➜</span>
                <input 
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={cn(
                    "flex-1 bg-transparent border-none outline-none font-bold p-0 placeholder:text-slate-800",
                    theme === 'dark' ? "text-white" : "text-slate-900"
                  )}
                  spellCheck={false}
                  autoComplete="off"
                />
                <button type="submit" className="opacity-0 group-focus-within:opacity-20 hover:opacity-100 transition-opacity p-1 text-emerald-500">
                  <CornerDownLeft size={14} />
                </button>
             </form>
             <div ref={terminalEndRef} />
           </div>
        </div>

        <div className="p-3 px-8 bg-emerald-500/5 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Cpu size={12} className="text-slate-600" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase">Local Instance</span>
              </div>
              <div className="flex items-center gap-2">
                 <Info size={12} className="text-slate-600" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">UTF-8 // zsh</span>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Encrypted Session</span>
              <CheckCircle2 size={12} className="text-emerald-500/50" />
           </div>
        </div>
      </div>
    </div>
  );
};
