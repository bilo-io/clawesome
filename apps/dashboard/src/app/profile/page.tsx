// apps/dashboard/src/app/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useProfileStore, LinkedAccount } from '@/store/useProfileStore';
import { 
  User, 
  Globe, 
  Shield, 
  Check, 
  Settings,
  Apple,
  Github,
  ExternalLink
} from 'lucide-react';
import { 
  ProfileHeader, 
  ProfileCard, 
  ProfileInfoRow, 
  ProfileActionCard 
} from '@clawesome/ui';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { theme } = useUIStore();
  const { name, description, avatar, clearanceLevel, linkedAccounts, updateProfile, toggleAccount } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState(name);
  const [formDesc, setFormDesc] = useState(description);

  const handleSave = () => {
    updateProfile({ name: formName, description: formDesc });
    setIsEditing(false);
  };

  const getAccountIcon = (provider: LinkedAccount['provider']) => {
    switch(provider) {
      case 'google': return <Globe size={20} />;
      case 'apple': return <Apple size={20} />;
      case 'github': return <Github size={20} />;
      default: return <User size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Profile Header */}
      <ProfileHeader 
        name={name}
        clearanceLevel={clearanceLevel}
        email={linkedAccounts.find(a => a.provider === 'google')?.email}
        onEdit={() => setIsEditing(!isEditing)}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Stats / Identity */}
        <div className="space-y-8 h-full flex flex-col">
           <ProfileCard 
            title="Identity Config" 
            icon={<Settings size={18} />}
           >
              {isEditing ? (
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                     <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 font-bold"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Description / Bio</label>
                     <textarea 
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 font-bold h-32 resize-none"
                     />
                   </div>
                   <button 
                    onClick={handleSave}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                   >
                     Update Identity Matrix
                   </button>
                </div>
              ) : (
                <div className="space-y-6">
                   <p className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                     "{description}"
                   </p>
                   <div className="pt-6 border-t border-slate-800/10 dark:border-slate-800 space-y-4">
                      <ProfileInfoRow label="Total Swarms" value="124" />
                      <ProfileInfoRow label="Account Age" value="2.4 Years" />
                   </div>
                </div>
              )}
           </ProfileCard>

           <div className="mt-8 flex-1">
             <ProfileActionCard 
                title="Neural Privacy" 
                description="Your profile data is encrypted using AES-256 at the edge. Only authorized agentic nodes can read your description for context."
                icon={<Shield size={100} />}
             />
           </div>
        </div>

        {/* Linked Accounts */}
        <ProfileCard 
          title="Connect Gateways" 
          icon={<Globe size={18} />}
          footer={
            <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors">
               Manage API Access Tokens <ExternalLink size={12}/>
            </button>
          }
        >
           <div className="space-y-4">
              {linkedAccounts.map((acc) => (
                <div key={acc.provider} className={cn(
                  "p-5 rounded-2xl border transition-all flex items-center justify-between group",
                  acc.connected ? "border-emerald-500/20 bg-emerald-500/5" : (theme === 'dark' ? "border-slate-800 bg-slate-900/50" : "border-slate-100 bg-slate-50/50")
                )}>
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                        acc.connected ? "bg-emerald-500 text-white shadow-lg" : (theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-white text-slate-400 border border-slate-100")
                      )}>
                         {getAccountIcon(acc.provider)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase italic tracking-tighter">{acc.provider}</span>
                        <span className="text-[10px] text-slate-500 font-bold">{acc.connected ? acc.email : 'Not connected'}</span>
                      </div>
                   </div>
                   
                   {acc.connected ? (
                     <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <Check size={14} /> Active
                     </div>
                   ) : (
                     <button 
                      onClick={() => toggleAccount(acc.provider, true)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95"
                     >
                       Connect
                     </button>
                   )}
                </div>
              ))}
           </div>
        </ProfileCard>
      </div>
    </div>
  );
}
