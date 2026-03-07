'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, Brain, Zap, Globe, Blocks, Sliders, Cpu, MessageSquare } from 'lucide-react';
import { useUI } from '@clawesome/ui';
import { useState } from 'react';

interface SidebarLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  children?: SidebarLink[];
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

export function LeftSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme } = useUI();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['AI', 'Architecture', 'Connect']);

  const sections: SidebarSection[] = [
    {
      title: 'GET STARTED',
      links: [
        { href: '/', label: 'Introduction' },
        { href: '/installation', label: 'Installation' },
        { href: '/cli', label: 'CLI Reference' },
      ]
    },
    {
      title: 'AI ENGINE',
      links: [
        { 
          href: '/ai', 
          label: 'Overview',
          children: [
            { href: '/ai/neural-network', label: 'Neural Network' },
            { href: '/ai/llms', label: 'LLMs' },
            { href: '/ai/agents', label: 'Agents' },
            { href: '/ai/swarms', label: 'Swarms' },
          ]
        },
      ]
    },
    {
      title: 'CORE SYSTEM',
      links: [
        { 
          href: '/architecture', 
          label: 'Architecture',
          children: [
            { href: '/architecture/layers', label: 'System Layers' },
            { href: '/architecture/security', label: 'Security' },
            { href: '/architecture/scalability', label: 'Scalability' },
          ]
        },
        { href: '/components', label: 'UI Components' },
      ]
    },
    {
      title: 'INTEGRATIONS',
      links: [
        { 
          href: '/connect', 
          label: 'Connect',
          children: [
            { href: '/connect/slack', label: 'Slack' },
            { href: '/connect/discord', label: 'Discord' },
            { href: '/connect/telegram', label: 'Telegram' },
            { href: '/connect/whatsapp', label: 'WhatsApp' },
          ]
        },
        { href: '/resources', label: 'Resources & MCPs' },
      ]
    },
    {
      title: 'OTHER',
      links: [
        { href: '/releases', label: 'Release Notes' },
      ]
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-0 md:top-16 left-0 z-40 w-64 h-full md:h-[calc(100vh-4rem)] border-r transition-all duration-300 overflow-y-auto no-scrollbar ${
        theme === 'dark' ? 'border-slate-800 bg-[#020617]' : 'border-slate-200 bg-slate-50'
      } ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Mobile Header (only inside drawer) */}
        <div className="flex items-center justify-between p-6 md:hidden border-b border-slate-200 dark:border-slate-800 mb-4">
          <span className="font-black tracking-tighter uppercase text-sm">Navigation</span>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
             <ChevronDown className="rotate-90" size={20} />
          </button>
        </div>
      <div className="p-6 space-y-8">
        <div className={`relative flex items-center p-2 rounded-xl transition-colors ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
          <Search size={16} className={`ml-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className={`w-full bg-transparent px-3 py-1 text-sm outline-none ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-black placeholder:text-slate-400'}`}
          />
        </div>

        <nav className="space-y-6 pb-20">
          {sections.map(section => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase px-4">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.links.map(link => (
                  <div key={link.href} className="space-y-1">
                    <Link 
                      href={link.href}
                      className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                        isActive(link.href)
                          ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600')
                          : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                      }`}
                    >
                      {link.label}
                    </Link>
                    
                    {link.children && (
                      <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-800 space-y-1 mt-1">
                        {link.children.map(child => (
                          <Link 
                            key={child.href}
                            href={child.href}
                            className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                              isActive(child.href)
                                ? (theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600 bg-indigo-50/50')
                                : (theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
    </>
  );
}
