'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, List, Plus, Filter, LayoutGrid, ChevronLeft, Home, ChevronRight } from 'lucide-react';
import { PageHeader, PageHeaderStatusColor } from './PageHeader';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export interface DashboardResourceHeaderProps {
  // Level 1: Page Identity
  title: string;
  badge: string;
  statusLabel: string;
  statusValue: string;
  statusColor?: PageHeaderStatusColor;

  // Optional Back Link
  backLink?: {
    label: string;
    href: string;
  };

  // Breadcrumb Override (e.g. for resource name in ID slot)
  breadcrumbTitle?: string;

  // Visibility control for collection-specific toolbar
  isCollection?: boolean;

  // Page description for tooltip
  description?: string;

  // Level 2: Toolbar & Controls (Only if isCollection is true)
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // View Controls
  viewMode?: string;
  onViewModeChange?: (mode: any) => void;

  // Optional Filter
  onFilterClick?: () => void;
  showFilter?: boolean;

  // Render Props / Slots
  renderRight?: React.ReactNode | (() => React.ReactNode); // Top right slot
  toolbarActions?: React.ReactNode; // Extra things next to View Toggles (Level 2)
}

export function DashboardResourceHeader({
  title,
  badge,
  description,
  statusLabel,
  statusValue,
  statusColor = 'indigo',
  backLink,
  breadcrumbTitle,
  isCollection = true,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'SEARCH...',
  viewMode,
  onViewModeChange,
  onFilterClick,
  showFilter = false,
  renderRight,
  toolbarActions,
}: DashboardResourceHeaderProps) {
  const { theme } = useUIStore();
  const pathname = usePathname();

  const renderedRight = typeof renderRight === 'function' ? renderRight() : renderRight;

  // Breadcrumb Logic
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    // Smart label replacement
    let label = segment.replace(/-/g, ' ');

    // If it's an ID-like segment or the last segment and we have a breadcrumbTitle/title
    const idParentSegments = ['chat', 'projects', 'skills', 'agents', 'swarms', 'logs', 'integrations'];
    const isId = /^[0-9a-fA-F-]+$/.test(segment) || idParentSegments.includes(segments[index - 1]);

    if (isLast) {
      label = title;
    } else if (isId) {
      label = breadcrumbTitle || label;
    }

    return { label, href, isLast };
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Back Link Row */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
          <Link href="/" className="text-slate-500 hover:text-indigo-500 transition-colors flex items-center gap-1.5">
            <Home size={13} className="mb-0.5" />
          </Link>
          {breadcrumbs.map((bc, i) => (
            <React.Fragment key={bc.href}>
              <ChevronRight size={10} className="text-slate-700 opacity-20" />
              {bc.isLast ? (
                <span className="text-indigo-500 truncate max-w-[200px]">{bc.label}</span>
              ) : (
                <Link href={bc.href} className="text-slate-500 hover:text-indigo-500 transition-colors truncate max-w-[150px]">
                  {bc.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {backLink && (
          <Link
            href={backLink.href}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-indigo-500 transition-colors w-fit"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {backLink.label}
          </Link>
        )}
      </div>

      {/* Level 1: Page Identity & Primary Actions */}
      <PageHeader
        title={title}
        badge={badge}
        description={description}
        statusLabel={statusLabel}
        statusValue={statusValue}
        statusColor={statusColor}
      >
        <div className="flex items-center gap-4">
          {renderedRight}
        </div>
      </PageHeader>

      {/* Level 2: Toolbar (Only if isCollection is true) */}
      {isCollection && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Search Bar - Fancy Styled */}
          <div className="relative flex-1 group w-full perspective-1000">
            <div className={cn(
              "relative p-[1px] rounded-full transition-all duration-500 shadow-sm",
              "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6]",
              "focus-within:scale-[1.01] focus-within:shadow-[0_48px_100px_rgba(140,0,255,0.15)]"
            )}>
                <div className={cn(
                  "relative rounded-full flex items-center transition-all duration-700 px-4",
                  theme === 'dark' ? "bg-slate-950/95" : "bg-white/95"
                )}>
                <div className="flex items-center justify-center p-4 rounded-full transition-colors relative ml-2">
                   <Search 
                    size={20} 
                    className={cn(
                      "transition-colors",
                      theme === 'dark' ? "text-slate-600 group-focus-within:text-white" : "text-slate-400 group-focus-within:text-indigo-600"
                    )} 
                   />
                </div>
                 <input
                  type="text"
                  placeholder={searchPlaceholder.toUpperCase()}
                  className={cn(
                    "w-full py-3 px-4 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 font-bold text-sm tracking-widest uppercase transition-all bg-transparent",
                    theme === 'dark'
                      ? "text-white placeholder:text-slate-700"
                      : "text-black placeholder:text-slate-400"
                  )}
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Controls (Filter, View Toggles, Additional Actions) */}
          <div className="flex items-center gap-4 h-full">
            {toolbarActions}

            <div className={cn(
              "relative p-[1px] rounded-full transition-all duration-500 shadow-sm h-full",
              "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6]"
            )}>
              <div className={cn(
                "flex items-center gap-3 p-1 px-2 rounded-full backdrop-blur-2xl transition-all h-full",
                theme === 'dark' ? "bg-slate-950/95" : "bg-white/95"
              )}>
                 {showFilter && (
                  <button
                    onClick={onFilterClick}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all group active:scale-95",
                      theme === 'dark' ? "bg-slate-900 border-white/5 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900 shadow-sm"
                    )}
                  >
                    <Filter size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Filter</span>
                  </button>
                )}

                {viewMode && onViewModeChange && (
                  <div className={cn(
                    "rounded-full flex p-1 transition-all",
                    theme === 'dark' ? "bg-slate-900/60" : "bg-slate-100/60"
                  )}>
                    <button
                      onClick={() => onViewModeChange('grid')}
                      className={cn(
                        "p-2.5 rounded-full transition-all active:scale-95",
                        viewMode === 'grid'
                          ? (theme === 'dark' ? "bg-slate-800 shadow-inner" : "bg-white border border-slate-100 shadow-sm")
                          : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <LayoutGrid 
                        size={18} 
                        className={cn(
                          "transition-colors",
                          viewMode === 'grid' ? "text-indigo-500" : ""
                        )}
                        style={viewMode === 'grid' ? { filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.3))' } : {}}
                      />
                    </button>
                    <button
                      onClick={() => onViewModeChange('list')}
                      className={cn(
                        "p-2.5 rounded-full transition-all active:scale-95",
                        viewMode === 'list'
                          ? (theme === 'dark' ? "bg-slate-800 shadow-inner" : "bg-white border border-slate-100 shadow-sm")
                          : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <List 
                        size={20} 
                        className={cn(
                          "transition-colors",
                          viewMode === 'list' ? "text-indigo-500" : ""
                        )}
                        style={viewMode === 'list' ? { filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.3))' } : {}}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
