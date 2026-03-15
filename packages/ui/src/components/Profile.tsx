// packages/ui/src/components/Profile.tsx
'use client';

import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Shield, 
  Camera,
  Info,
  ExternalLink
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface ProfileHeaderProps {
  name: string;
  clearanceLevel: string;
  avatar?: string;
  location?: string;
  email?: string;
  isVerified?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  clearanceLevel,
  location = "Decentralized Node",
  email,
  isVerified = true,
  onEdit,
  className
}) => {
  const { theme } = useUI();
  
  return (
    <div className={cn("glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full", className)}>
       <div className="absolute top-[-20%] right-[-5%] p-12 opacity-[0.03] pointer-events-none rotate-12 scale-150 transition-transform duration-1000 group-hover:rotate-0">
          <User size={300} />
       </div>
       
       <div className="relative group/avatar shrink-0 z-10">
          <div className={cn(
            "w-40 h-40 md:w-48 md:h-48 rounded-full p-2 border-4 transition-all duration-500 shadow-2xl",
            theme === 'dark' ? "border-slate-800 bg-slate-950 shadow-indigo-500/10" : "border-white bg-white shadow-slate-200/50"
          )}>
             <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center text-white text-6xl md:text-7xl font-black italic shadow-inner relative overflow-hidden">
                <span className="relative z-10">{name.charAt(0)}</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
             </div>
          </div>
          <button className="absolute bottom-2 right-2 p-3.5 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 text-indigo-500 opacity-0 group-hover/avatar:opacity-100 transition-all hover:scale-110 active:scale-95 group/btn overflow-hidden">
             <Camera size={20} className="relative z-10 transition-transform group-hover/btn:rotate-12" />
          </button>
       </div>

       <div className="flex-1 space-y-6 text-center md:text-left z-10 relative md:pt-6 w-full flex flex-col">
          <div className="space-y-2">
             <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">{name}</h1>
                {isVerified && (
                   <div className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-emerald-500/20 shadow-sm flex items-center gap-1.5 shrink-0 mt-2 md:mt-0">
                      <Shield size={12} className="shrink-0" /> Verified AI Admin
                   </div>
                )}
             </div>
             <p className="text-indigo-500 font-black text-sm md:text-base uppercase tracking-[0.3em]">{clearanceLevel}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium italic w-full">
             <div className="flex items-center justify-center gap-2.5"><MapPin size={16} className="text-slate-400 dark:text-slate-500"/> {location}</div>
             {email && <div className="flex items-center justify-center gap-2.5"><Mail size={16} className="text-slate-400 dark:text-slate-500"/> {email}</div>}
          </div>
          
          {onEdit && (
             <div className="pt-4 flex justify-center md:justify-start mt-auto w-full max-w-sm mx-auto md:mx-0">
               <button 
                onClick={onEdit}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:dark:bg-indigo-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm border border-transparent dark:border-slate-700 hover:border-indigo-600"
               >
                  Modify Core Identity
               </button>
             </div>
          )}
       </div>
    </div>
  );
};

export interface ProfileCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ title, icon, children, footer, className }) => {
  return (
    <div className={cn("glass-panel p-10 rounded-[2.5rem] space-y-8 flex flex-col h-full", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black italic tracking-tighter">{title}</h3>
        {icon || <Info size={16} className="text-slate-500" />}
      </div>
      <div className="flex-1">
        {children}
      </div>
      {footer && (
        <div className="pt-6 border-t border-slate-800/10 dark:border-slate-800">
          {footer}
        </div>
      )}
    </div>
  );
};

export const ProfileInfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm font-black">{value}</span>
  </div>
);

export const ProfileActionCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => {
  return (
    <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        {icon}
      </div>
      <h4 className="text-lg font-black italic tracking-tighter relative z-10">{title}</h4>
      <p className="text-white/70 text-[11px] font-medium leading-relaxed mt-2 relative z-10">
        {description}
      </p>
    </div>
  );
};
