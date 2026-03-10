'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  X, 
  Hash, 
  Zap, 
  Cpu, 
  Globe, 
  Share2, 
  Terminal, 
  Info, 
  Layout as LayoutIcon,
  Layers
} from 'lucide-react';
import { useUI } from '../../ThemeContext';
import { cn } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';

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

interface LeftSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  pathname?: string;
  LinkComponent?: React.ComponentType<any>;
}

export function LeftSidebar({ 
  isOpen = false, 
  onClose = () => {}, 
  pathname = '', 
  LinkComponent = ({ children, ...props }) => <a {...props}>{children}</a> 
}: LeftSidebarProps) {
  const { theme } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const sections: SidebarSection[] = useMemo(() => [
    {
      title: 'GET STARTED',
      links: [
        { href: '/', label: 'Introduction', icon: <Info size={16} /> },
        { href: '/installation', label: 'Installation', icon: <Hash size={16} /> },
        { href: '/cli', label: 'CLI Reference', icon: <Terminal size={16} /> },
      ]
    },
    {
      title: 'AI ENGINE',
      links: [
        { 
          href: '/ai', 
          label: 'Overview',
          icon: <Cpu size={16} />,
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
          icon: <Zap size={16} />,
          children: [
            { href: '/architecture/layers', label: 'System Layers' },
            { href: '/architecture/security', label: 'Security' },
            { href: '/architecture/scalability', label: 'Scalability' },
          ]
        },
        { href: '/components', label: 'UI Components', icon: <LayoutIcon size={16} /> },
      ]
    },
    {
      title: 'INTEGRATIONS',
      links: [
        { 
          href: '/connect', 
          label: 'Connect',
          icon: <Globe size={16} />,
          children: [
            { href: '/connect/slack', label: 'Slack' },
            { href: '/connect/discord', label: 'Discord' },
            { href: '/connect/telegram', label: 'Telegram' },
            { href: '/connect/whatsapp', label: 'WhatsApp' },
          ]
        },
        { href: '/resources', label: 'Resources & MCPs', icon: <Share2 size={16} /> },
      ]
    },
    {
      title: 'OTHER',
      links: [
        { href: '/releases', label: 'Release Notes', icon: <Hash size={16} /> },
      ]
    }
  ], []);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.map(section => {
      const matchS = section.title.toLowerCase().includes(q);
      const matchedLinks = section.links.map(link => {
        const matchL = link.label.toLowerCase().includes(q);
        const matchedC = link.children?.filter(c => c.label.toLowerCase().includes(q));
        if (matchL || (matchedC && matchedC.length > 0)) {
          return { ...link, children: (matchedC && matchedC.length > 0) ? matchedC : link.children };
        }
        return null;
      }).filter(Boolean) as SidebarLink[];
      if (matchS || matchedLinks.length > 0) return { ...section, links: matchedLinks.length > 0 ? matchedLinks : section.links };
      return null;
    }).filter(Boolean) as SidebarSection[];
  }, [searchQuery, sections]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) onClose();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const exp: Record<string, boolean> = {};
      filteredSections.forEach(s => s.links.forEach(l => { if (l.children) exp[l.label] = true; }));
      setExpandedSections(prev => ({ ...prev, ...exp }));
    }
  }, [searchQuery, filteredSections]);

  useEffect(() => {
    sections.forEach(s => s.links.forEach(l => {
      if (l.children) {
        const active = l.children.some(c => pathname === c.href) || pathname === l.href;
        if (active) setExpandedSections(prev => ({ ...prev, [l.label]: true }));
      }
    }));
  }, [pathname, sections]);

  const toggleSection = (label: string) => setExpandedSections(p => ({ ...p, [label]: !p[label] }));
  const isActive = (href: string) => pathname === href;
  const Link = LinkComponent;

  const NavItem = ({ link, isChild = false }: { link: SidebarLink, isChild?: boolean }) => {
    const hasChildren = link.children && link.children.length > 0;
    const isExpanded = expandedSections[link.label];
    const active = isActive(link.href);

    return (
      <div className="flex flex-col">
        <Link 
          href={link.href}
          onClick={(e: React.MouseEvent) => {
            if (hasChildren) {
              e.preventDefault();
              toggleSection(link.label);
            } else if (isOpen) {
              onClose();
            }
          }}
          className={cn(
            "group relative flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 text-[13px] font-bold",
            active
              ? (theme === 'dark' ? "text-white bg-indigo-500/20" : "text-indigo-600 bg-indigo-50")
              : (theme === 'dark' ? "text-slate-500 hover:text-slate-200 hover:bg-slate-900" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"),
            isChild && "pl-10 text-[12px] font-medium"
          )}
        >
          <div className="flex items-center gap-2.5">
            {!isChild && link.icon && (
              <span className={cn("transition-colors", active ? "text-indigo-500" : "text-slate-500 group-hover:text-slate-400")}>{link.icon}</span>
            )}
            {link.label}
          </div>
          {hasChildren && <ChevronRight size={14} className={cn("transition-transform duration-200 opacity-40", isExpanded && "rotate-90")} />}
        </Link>
        <AnimatePresence initial={false}>
          {hasChildren && isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="mt-1 space-y-0.5 border-l border-slate-100 dark:border-slate-800 ml-[23px]">
                {link.children!.map(child => <NavItem key={child.href} link={child} isChild />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const SidebarContent = ({ isDrawer = false }) => (
    <div className={cn(
      "flex flex-col h-full w-full relative z-[101] !opacity-100",
      theme === 'dark' ? "bg-slate-950" : "bg-white"
    )}>
      {isDrawer && (
        <div className="h-16 flex items-center px-8 shrink-0">
          <button 
            onClick={onClose} 
            className={cn(
              "p-2 -ml-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
              theme === 'dark' ? "text-slate-400 hover:text-white hover:bg-slate-900" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <X size={24} />
          </button>
        </div>
      )}

      <div className={cn("p-6 shrink-0", !isDrawer && "pt-8")}>
        <div className="relative group perspective-1000">
          <div className={cn(
            "relative p-[4px] rounded-xl transition-all duration-500 shadow-lg",
            "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6]",
            "focus-within:shadow-[0_0_20px_rgba(140,0,255,0.25)]"
          )}>
            <div className={cn(
              "relative rounded-[11px] flex items-center transition-all duration-700 px-3 py-2",
              theme === 'dark' ? "bg-slate-950" : "bg-white"
            )}>
              <Search 
                size={14} 
                className={cn(
                  "shrink-0 transition-colors",
                  theme === 'dark' ? "text-slate-700 group-focus-within:text-white" : "text-slate-400 group-focus-within:text-indigo-600"
                )} 
              />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className={cn(
                  "w-full bg-transparent ml-2 text-[12px] outline-none font-bold placeholder:font-medium tracking-wide",
                  theme === 'dark' ? "text-white placeholder:text-slate-800" : "text-slate-900 placeholder:text-slate-400"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar p-6 pt-0 pb-10 space-y-8">
        {filteredSections.map(section => (
          <div key={section.title} className="space-y-3">
            <h4 className="px-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.links.map(link => <NavItem key={link.href} link={link} />)}
            </div>
          </div>
        ))}
      </nav>

      <div className={cn(
        "p-6 border-t shrink-0",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50"
      )}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-[12px] shadow-lg shadow-indigo-600/30">OS</div>
          <div className="flex flex-col">
            <span className={cn("text-[11px] font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>Clawesome Docs</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider">v1.2.4-STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn(
        "hidden lg:block w-72 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20 transition-colors bg-white dark:bg-slate-950",
        theme === 'dark' ? "border-r border-slate-900" : "border-r border-slate-200"
      )}>
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0 backdrop-blur-3xl transition-colors duration-500",
                theme === 'dark' ? "bg-slate-950/90" : "bg-white/80"
              )}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "absolute inset-y-0 left-0 w-80 shadow-[20px_0_60px_rgba(0,0,0,0.5)] flex flex-col z-[100000] overflow-hidden !opacity-100",
                theme === 'dark' ? "bg-slate-950 border-r border-slate-800" : "bg-white border-r border-slate-200"
              )}
            >
              <SidebarContent isDrawer />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
