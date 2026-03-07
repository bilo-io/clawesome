'use client';

import React, { useState } from 'react';
import { Eye, Code2, Copy, Check } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DocsWrapperProps {
  /** The live component preview */
  children: React.ReactNode;
  /** The source code string to display in the code panel */
  code?: string;
  /** Display label for the component name / section */
  label: string;
  /** Optional sub-description shown under the label */
  description?: string;
  /** Language for syntax highlighting label. Defaults to 'tsx' */
  language?: string;
  /** Override min-height of the preview area (Tailwind class). Defaults to 'min-h-[160px]' */
  previewHeight?: string;
  /** Extra classes applied to the root card */
  className?: string;
}

// ─── Minimal syntax tokeniser (no external deps) ─────────────────────────────

type TokenKind = 'keyword' | 'string' | 'comment' | 'tag' | 'prop' | 'value' | 'plain';

const KEYWORDS = ['import', 'from', 'export', 'const', 'let', 'var', 'function', 'return',
  'interface', 'type', 'extends', 'implements', 'class', 'default', 'true', 'false', 'null',
  'undefined', 'void', 'string', 'number', 'boolean', 'React', 'useState', 'useEffect'];

function tokenise(code: string): { kind: TokenKind; text: string }[] {
  const tokens: { kind: TokenKind; text: string }[] = [];
  const regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z][A-Za-z0-9.]*|[A-Za-z_$][A-Za-z0-9_$]*|[^])/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    const t = m[0];
    if (t.startsWith('//') || t.startsWith('/*')) {
      tokens.push({ kind: 'comment', text: t });
    } else if ((t.startsWith('"') || t.startsWith("'") || t.startsWith('`'))) {
      tokens.push({ kind: 'string', text: t });
    } else if (t.startsWith('</') || (t.startsWith('<') && /^<[A-Z]/.test(t))) {
      tokens.push({ kind: 'tag', text: t });
    } else if (t.startsWith('<') && /^<[a-z]/.test(t)) {
      tokens.push({ kind: 'tag', text: t });
    } else if (KEYWORDS.includes(t)) {
      tokens.push({ kind: 'keyword', text: t });
    } else {
      tokens.push({ kind: 'plain', text: t });
    }
  }
  return tokens;
}

const TOKEN_COLORS: Record<TokenKind, string> = {
  keyword: 'text-violet-400',
  string:  'text-emerald-400',
  comment: 'text-slate-500 italic',
  tag:     'text-sky-400',
  prop:    'text-indigo-300',
  value:   'text-amber-400',
  plain:   'text-slate-300',
};

const TOKEN_COLORS_LIGHT: Record<TokenKind, string> = {
  keyword: 'text-violet-700',
  string:  'text-emerald-700',
  comment: 'text-slate-400 italic',
  tag:     'text-sky-700',
  prop:    'text-indigo-600',
  value:   'text-amber-700',
  plain:   'text-slate-700',
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const DocsWrapper: React.FC<DocsWrapperProps> = ({
  children,
  code,
  label,
  description,
  language = 'tsx',
  previewHeight = 'min-h-[160px]',
  className,
}) => {
  const { theme } = useUI();
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokens = code ? tokenise(code) : [];
  const colorMap = isDark ? TOKEN_COLORS : TOKEN_COLORS_LIGHT;

  return (
    <div className={cn(
      'rounded-[28px] border overflow-hidden transition-all',
      isDark
        ? 'bg-slate-900/60 border-slate-800/80'
        : 'bg-white border-slate-200 shadow-sm',
      className,
    )}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className={cn(
        'flex items-center justify-between px-6 py-4 border-b',
        isDark ? 'border-slate-800' : 'border-slate-100',
      )}>
        {/* Label + description */}
        <div>
          <span className={cn(
            'text-[11px] font-black uppercase tracking-[0.22em]',
            isDark ? 'text-slate-200' : 'text-slate-700',
          )}>
            {label}
          </span>
          {description && (
            <p className={cn(
              'text-[10px] font-medium mt-0.5',
              isDark ? 'text-slate-500' : 'text-slate-400',
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Tab toggles */}
        <div className={cn(
          'flex items-center gap-1 p-1 rounded-full border',
          isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200',
        )}>
          {([
            { id: 'preview', icon: Eye,   label: 'Preview', show: true },
            { id: 'code',    icon: Code2, label: 'Code', show: !!code },
          ] as const).filter(t => t.show).map(({ id, icon: Icon, label: lbl }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              title={lbl}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest',
                tab === id
                  ? (isDark
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white text-indigo-600 shadow-sm border border-slate-200')
                  : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'),
              )}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{lbl}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Preview panel ──────────────────────────────────────── */}
      {tab === 'preview' && (
        <div className={cn(
          'p-6 flex items-center justify-center flex-wrap gap-4',
          previewHeight,
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]',
        )}>
          {children}
        </div>
      )}

      {/* ── Code panel ─────────────────────────────────────────── */}
      {tab === 'code' && (
        <div className="relative">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            title="Copy code"
            className={cn(
              'absolute top-4 right-4 z-10 p-2 rounded-xl transition-all border',
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-400'
                : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600 shadow-sm',
            )}
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>

          {/* Language label */}
          <div className={cn(
            'absolute top-4 left-5 flex items-center gap-2',
          )}>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-500/30 border border-rose-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/30 border border-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
            </div>
            <span className={cn(
              'text-[9px] font-black uppercase tracking-[0.25em]',
              isDark ? 'text-slate-600' : 'text-slate-400',
            )}>
              {language}
            </span>
          </div>

          <pre className={cn(
            'pt-12 px-5 pb-6 overflow-x-auto text-xs leading-relaxed font-mono',
            isDark ? 'bg-slate-950' : 'bg-slate-50',
          )}>
            <code>
              {tokens.map((tok, i) => (
                <span key={i} className={colorMap[tok.kind]}>{tok.text}</span>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};
