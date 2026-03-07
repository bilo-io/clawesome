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
    <div className={cn("relative group", className)}>
      <div className={cn(
        "p-12 rounded-[3.5rem] border shadow-2xl relative overflow-hidden",
        theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
      )}>
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <User size={200} />
         </div>
         
         <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative group/avatar">
               <div className={cn(
                 "w-36 h-36 rounded-[2.5rem] p-1 border-2",
                 theme === 'dark' ? "border-indigo-500/30 bg-slate-950" : "border-slate-200 bg-slate-50"
               )}>
                  <div className="w-full h-full rounded-[2.2rem] bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white text-5xl font-black italic shadow-inner">
                     {name.charAt(0)}
                  </div>
               </div>
               <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-indigo-500 opacity-0 group-hover/avatar:opacity-100 transition-all hover:scale-110">
                  <Camera size={18} />
               </button>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
               <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                     <h1 className="text-4xl font-black tracking-tight">{name}</h1>
                     {isVerified && (
                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Verified AI Admin</div>
                     )}
                  </div>
                  <p className="text-indigo-500 font-black text-sm uppercase tracking-[0.3em]">{clearanceLevel}</p>
               </div>
               <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-500 font-medium italic">
                  <div className="flex items-center gap-2"><MapPin size={16}/> {location}</div>
                  {email && <div className="flex items-center gap-2"><Mail size={16}/> {email}</div>}
               </div>
               {onEdit && (
                 <button 
                  onClick={onEdit}
                  className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                 >
                    Modify Core Identity
                 </button>
               )}
            </div>
         </div>
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
