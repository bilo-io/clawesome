'use client';

import { useState, useRef } from 'react';
import { X, Upload, Plus, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; title: string; profilePicture: string }) => void;
}

export const CreateAgentModal = ({ isOpen, onClose, onSubmit }: CreateAgentModalProps) => {
  const { theme } = useUI();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profilePic, setProfilePic] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title) return;
    onSubmit({ name, title, profilePicture: profilePic });
    setName('');
    setTitle('');
    setProfilePic('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={cn(
              "absolute inset-0 backdrop-blur-md transition-colors",
              theme === 'dark' ? "bg-slate-950/80" : "bg-slate-900/40"
            )}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden border transition-all",
              theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-black/60" : "bg-white border-slate-100 shadow-slate-200/60"
            )}
          >
            <div className="p-10">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-5">
                   <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20 text-white">
                      <Bot size={28} />
                   </div>
                   <div>
                      <h2 className={cn("text-3xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-900")}>Deploy Soul</h2>
                      <p className={cn("text-sm font-bold uppercase tracking-widest mt-1 opacity-50", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Initialize neural identity.</p>
                   </div>
                </div>
                <button 
                  onClick={onClose}
                  className={cn(
                    "p-3 rounded-2xl transition-all border shadow-sm",
                    theme === 'dark' 
                      ? "bg-slate-950 text-slate-500 border-slate-800 hover:text-white" 
                      : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900"
                  )}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col items-center justify-center mb-8">
                   <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative w-28 h-28 rounded-[36px] border-2 border-dashed cursor-pointer overflow-hidden transition-all group flex flex-col items-center justify-center shadow-inner",
                      theme === 'dark' ? "bg-slate-950 border-slate-800 hover:border-indigo-500/50" : "bg-slate-50 border-slate-200 hover:border-indigo-400"
                    )}
                   >
                    {profilePic ? (
                      <img src={profilePic} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                      <div className={cn(
                        "flex flex-col items-center gap-2 transition-colors",
                        theme === 'dark' ? "text-slate-700 group-hover:text-indigo-500" : "text-slate-300 group-hover:text-indigo-400"
                      )}>
                        <Upload size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Aura Pic</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Plus size={24} className="text-white drop-shadow-md" />
                    </div>
                   </div>
                   <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className={cn("text-[10px] font-black uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Identity Alias</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maverick"
                      className={cn(
                        "w-full rounded-2xl px-6 py-4 text-sm font-black tracking-tight transition-all border outline-none",
                        theme === 'dark' 
                          ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                          : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={cn("text-[10px] font-black uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Designation</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. System Architect"
                      className={cn(
                        "w-full rounded-2xl px-6 py-4 text-sm font-black tracking-tight transition-all border outline-none",
                        theme === 'dark' 
                          ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                          : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                      )}
                    />
                  </div>
                </div>

                <div className="pt-8 flex gap-5">
                  <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                      "flex-1 px-8 py-4 rounded-[20px] font-black uppercase tracking-widest text-[11px] transition-all border shadow-sm",
                      theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-slate-900"
                    )}
                  >
                    Abort
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-8 py-4 rounded-[20px] bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:translate-y-1"
                  >
                    Confirm Lifecycle Ignition
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
