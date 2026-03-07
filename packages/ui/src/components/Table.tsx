'use client';

import React from 'react';
import { cn } from '../utils';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns, data, sortKey, sortDir, onSort, onRowClick, emptyMessage = 'No data found', className
}: TableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-slate-800', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/80">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap',
                  col.sortable && 'cursor-pointer hover:text-slate-300 select-none',
                  col.className
                )}
                onClick={() => col.sortable && onSort?.(String(col.key))}
              >
                <div className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    sortKey === String(col.key)
                      ? sortDir === 'asc' ? <ChevronUp size={12} className="text-indigo-400" /> : <ChevronDown size={12} className="text-indigo-400" />
                      : <ChevronsUpDown size={12} className="opacity-30" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-600 font-black text-xs uppercase tracking-widest italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-slate-900 last:border-0 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-slate-800/40'
                )}
              >
                {columns.map(col => (
                  <td key={String(col.key)} className={cn('px-5 py-3.5 text-slate-300', col.className)}>
                    {col.render
                      ? col.render(row[col.key as keyof T], row)
                      : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
