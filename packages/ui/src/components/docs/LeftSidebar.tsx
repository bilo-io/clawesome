'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';
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
  ], []);

  // Filter logic based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    const query = searchQuery.toLowerCase();

    return sections.map(section => {
      // Check if section title matches
      if (section.title.toLowerCase().includes(query)) {
        return section;
      }

      // Filter links
      const filteredLinks = section.links.map(link => {
        if (link.label.toLowerCase().includes(query)) {
          return link;
        }

        // Filter children
        if (link.children) {
          const filteredChildren = link.children.filter(child => 
            child.label.toLowerCase().includes(query)
          );
          if (filteredChildren.length > 0) {
            return { ...link, children: filteredChildren };
          }
        }
        return null;
      }).filter(Boolean) as SidebarLink[];

      if (filteredLinks.length > 0) {
        return { ...section, links: filteredLinks };
      }
      return null;
    }).filter(Boolean) as SidebarSection[];
  }, [searchQuery, sections]);

  // When search runs, auto-expand sections containing matches
  useEffect(() => {
    if (searchQuery.trim()) {
      const allExpanded = filteredSections.reduce((acc, section) => {
        section.links.forEach(link => {
          if (link.children) {
            acc[link.label] = true;
          }
        });
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedSections(prev => ({ ...prev, ...allExpanded }));
    }
  }, [searchQuery, filteredSections]);

  // Auto-expand the section that has the active pathname on mount/nav
  useEffect(() => {
    sections.forEach(section => {
      section.links.forEach(link => {
        if (link.children) {
          const hasActiveChild = link.children.some(child => pathname === child.href);
          if (hasActiveChild || pathname === link.href) {
            setExpandedSections(prev => ({ ...prev, [link.label]: true }));
          }
        }
      });
    });
  }, [pathname, sections]);

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (href: string) => pathname === href;

  const Link = LinkComponent;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed md:sticky top-0 md:top-16 left-0 md:left-auto z-[60] md:z-40 w-72 h-[100dvh] md:h-[calc(100vh-4rem)] shrink-0 border-r transition-transform duration-300 overflow-y-auto no-scrollbar",
        theme === 'dark' ? 'border-slate-800 bg-[#020617]' : 'border-slate-200 bg-slate-50',
        isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'
      )}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 md:hidden border-b border-slate-200 dark:border-slate-800 mb-4 sticky top-0 z-10 bg-inherit">
          <span className="font-black tracking-tighter uppercase text-sm flex items-center gap-2">
            Documentation
          </span>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
             <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Search Box */}
          <div className="sticky top-6 z-10">
            <div className={cn(
              "group relative flex items-center p-2 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/50",
              theme === 'dark' 
                ? 'bg-slate-900 border border-slate-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                : 'bg-white border border-slate-200 shadow-sm'
            )}>
              <Search size={16} className={cn("ml-2 transition-colors", theme === 'dark' ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600')} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..." 
                className={cn(
                  "w-full bg-transparent px-3 py-1 text-sm outline-none font-medium",
                  theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'
                )}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mr-2 p-1 rounded-full hover:bg-slate-500/20 text-slate-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <nav className="space-y-8 pb-20">
            {filteredSections.length === 0 ? (
              <div className="text-center py-10 px-4">
                <Search size={32} className="mx-auto text-slate-400 mb-3 opacity-20" />
                <p className="text-sm font-medium text-slate-500">No results found for "{searchQuery}"</p>
                <p className="text-xs text-slate-400 mt-1">Try a different search term.</p>
              </div>
            ) : (
              filteredSections.map(section => (
                <div key={section.title} className="space-y-3">
                  <h4 className="text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase px-4 flex items-center gap-2">
                    {section.title}
                  </h4>
                  <div className="space-y-0.5">
                    {section.links.map(link => {
                      const hasChildren = link.children && link.children.length > 0;
                      const isExpanded = expandedSections[link.label];
                      const active = isActive(link.href) && (!hasChildren || !isExpanded);

                      return (
                        <div key={link.href} className="flex flex-col">
                          <div className="relative group/nav-item">
                            <Link 
                              href={link.href}
                              onClick={(e: React.MouseEvent) => {
                                if (hasChildren) {
                                  // Optional: Let docs nav logic handle it OR toggle it.
                                  // toggleSection(link.label);
                                }
                              }}
                              className={cn(
                                "flex items-center justify-between px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative z-10",
                                active
                                  ? (theme === 'dark' ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50')
                                  : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                              )}
                            >
                              <span className="flex items-center gap-2">
                                {link.icon && <span className="opacity-70">{link.icon}</span>}
                                {link.label}
                              </span>
                              
                              {hasChildren && (
                                <button 
                                  onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSection(link.label);
                                  }}
                                  className={cn(
                                    "p-1 rounded-md transition-all",
                                    theme === 'dark' ? "hover:bg-slate-700 text-slate-500 hover:text-slate-300" : "hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                                  )}
                                >
                                  <ChevronRight size={14} className={cn("transition-transform duration-200", isExpanded && "rotate-90")} />
                                </button>
                              )}
                            </Link>

                          </div>
                          
                          <AnimatePresence initial={false}>
                            {hasChildren && isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className={cn(
                                  "ml-6 mt-1 mb-2 relative pt-1 pb-1 flex flex-col gap-0.5",
                                  theme === 'dark' ? "border-l border-slate-800" : "border-l border-slate-200"
                                )}>
                                  {link.children!.map((child, idx) => {
                                    const childActive = isActive(child.href);
                                    
                                    return (
                                      <div key={child.href} className="relative group/child">
                                        {/* Branch Horizontal Line */}
                                        <div className={cn(
                                          "absolute top-[15px] -left-[1px] w-3 h-[1px] transition-colors duration-300",
                                          childActive 
                                            ? (theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-400') 
                                            : (theme === 'dark' ? 'bg-slate-800 group-hover/child:bg-slate-600' : 'bg-slate-200 group-hover/child:bg-slate-300')
                                        )} />
                                        
                                        {/* Vertical selection highlight bar */}
                                        <div className={cn(
                                          "absolute top-0 -left-[1px] w-[2px] h-full transition-colors duration-300",
                                          childActive
                                            ? (theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-400')
                                            : "bg-transparent"
                                        )}/>

                                        <Link 
                                          href={child.href}
                                          className={cn(
                                            "flex items-center pl-5 pr-3 py-1.5 text-[13px] font-medium rounded-r-lg transition-all relative block",
                                            childActive
                                              ? (theme === 'dark' ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50')
                                              : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80')
                                          )}
                                        >
                                          {child.label}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
