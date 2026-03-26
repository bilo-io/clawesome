import React, { useState, useEffect } from 'react';
import {
  StackedAreaChart,
  MultiSeriesLineChart,
  GroupedBarChart,
  DonutChart,
  SpiderRadarChart,
  TimeframePicker,
} from './components/Charts';
import { cn } from './utils';

import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  useUI,
  PageHeader,
  BottomDock,
  CommandModal,
  CreateAgentModal,
  SmartHistorySearch,
  AILab,
  FilesystemSandbox,
  Sidebar,
  Surface,
  Button,
  Badge,
  Input, Textarea, SearchInput,
  Modal,
  Alert,
  Toggle,
  DocsWrapper,
  DashboardResourceHeader,
  AgentCard,
  SystemVitality,
  CostTracker,
  ProjectPulse,
  ActivityHeatmap,
  WorkspaceGallery,
  // Website Components
  Hero as WebsiteHero,
  Features,
  Faqs,
  Testimonials,
  Donate,
  Footer as WebsiteFooter,
  Navbar as WebsiteNavbar,
  LogoCloud,
  BackgroundVideo,
  BackgroundAnimated,
  AnimatedDownload,
  // Docs Components
  CodePreview,
  CommandPreview,
  LanguagePreview,
  LeftSidebar as DocsSidebar,
  SegmentedControl, SlideToConfirm, QuickActions,
  Select, Checkbox, RadioGroup, Breadcrumbs, Chip,
  Slider, FileUpload, DateTimePicker,
  TopBar,
  DocPlaceholder,
  Terminal,
  ProfileHeader,
  ProfileCard,
  ProfileActionCard,
  ProfileInfoRow,
  Carousel,
  MasonryGrid,
  CouncilChatInterface,
  CouncilResourceCard,
  AnimatedPromptInput,
  AgentAvatarStack
} from './index';

import logo from './assets/clawesome-logo.svg';
import {
  Settings, Globe, Shield, HelpCircle, Terminal as TerminalIcon, Bot, User,
  BrainCircuit, Blocks, Brain, FolderKanban, MessageCircle, ListTodo, BarChart3, Cpu, Sliders, Plug, Sparkles, Home, Layout,
  ChartPieIcon, Zap, Layers, Activity, Lock, Star, Database, Server, Code2, LayoutGrid, TrendingUp, GitBranch, MessageSquare, Search, Plus, List, Mail,
  ChevronDown, ChevronRight, File, Image as ImageIcon, FileText, Check
} from 'lucide-react';

const mockCommandResults = [
  { icon: TerminalIcon, label: 'Run: bun run server.ts', category: 'Commands' },
  { icon: HelpCircle, label: 'Neural Mesh Configuration', category: 'Documentation' },
];

const mockHistory = [
  { command: 'bun run dev --filter dashboard', date: 'DEC 14, 01:23', type: 'manual' },
  { command: 'grep -r "useSocket" ./src', date: 'DEC 14, 01:10', type: 'agent' },
  { command: 'git commit -m "feat: sidebar nav"', date: 'DEC 13, 23:45', type: 'manual' },
];

const mockSandbox = [
  { name: 'src', type: 'folder' as const, children: 12, mounted: true },
  { name: 'package.json', type: 'file' as const, mounted: true },
  { name: 'moon.yml', type: 'file' as const, mounted: true },
  { name: '.env', type: 'file' as const, mounted: false },
];

const categories = [
  {
    title: 'FOUNDATION',
    items: [
      { icon: Home, label: 'Introduction', href: '/' },
      { icon: Layout, label: 'Layouts', href: '/foundation/layouts' },
      { icon: Shield, label: 'Core', href: '/foundation/core' },
    ]
  },
  {
    title: 'AI & INTELLIGENCE',
    items: [
      { icon: Sparkles, label: 'Lab & Sandbox', href: '/ai/lab' },
      { icon: Bot, label: 'Agents', href: '/ai/agents' },
      { icon: BrainCircuit, label: 'Councils', href: '/ai/councils' },
    ]
  },
  {
    title: 'PORTALS',
    items: [
      { icon: BrainCircuit, label: 'Documentation', href: '/portals/docs' },
      { icon: Globe, label: 'Website', href: '/portals/website' },
      { icon: LayoutGrid, label: 'Dashboard', href: '/portals/dashboard' },
    ]
  },
  {
    title: 'CHARTS',
    items: [
      { icon: ChartPieIcon, label: 'Charts', href: '/charts' }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { icon: TerminalIcon, label: 'Terminal', href: '/system/terminal' },
      { icon: User, label: 'Identity', href: '/system/identity' },
    ]
  }
];

// Helper components for pages
const PageWrapper = ({ title, description, icon: Icon, children }: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const LinkComponent = ({ href, children, className }: any) => (
    <div onClick={() => navigate(href)} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DashboardResourceHeader
        title={title}
        description={description}
        badge="UI-LIB"
        statusLabel="Library:"
        statusValue="v1.0.0"
        statusColor="indigo"
        isCollection={false}
        pathname={pathname}
        LinkComponent={LinkComponent}
        hideBreadcrumbs={true}
        renderRight={
          <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all active:scale-95 group">
             <Globe size={16} className="group-hover:rotate-12 transition-transform" /> 
             View live deployment
          </button>
        }
      />
      {children}
    </div>
  );
};

const IntroductionPage = () => {
  const { theme, themePreference, setTheme } = useUI();
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center space-y-12 overflow-hidden rounded-[40px] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 md:p-16">
      <div className="absolute inset-0 z-0">
        <BackgroundAnimated />
      </div>

      {/* Theme Toggles & Logo */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Clawesome Logo" className="w-auto h-8 animate-pulse" />
          <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white -ml-4">/ui</span>
        </div>
        <div className={`flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white/40 border-slate-200'}`}>
          <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${themePreference === 'light' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Light</button>
          <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${themePreference === 'dark' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-600'}`}>Dark</button>
          <button onClick={() => setTheme('system')} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${themePreference === 'system' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>System</button>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 dark:bg-white/10 backdrop-blur-xl border border-slate-800 dark:border-white/10 text-white text-[10px] font-black uppercase tracking-widest animate-pulse shadow-2xl">
          <Sparkles size={14} className="text-indigo-400" /> V1.0 UI Infrastructure
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-900 dark:from-white dark:via-indigo-200 dark:to-emerald-200 leading-[1.1]">
          Deploy Stunning<br />
          <span className="italic">Agent Interfaces</span>
        </h1>
        
        <p className="text-xl dark:text-slate-300 text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          The central neural bridge for Clawesome OS. Premium React components hardened for high-stakes, decentralized AI operations.
        </p>
      </div>

      {/* Installation Panel */}
      <div className="relative z-10 w-full max-w-2xl mx-auto backdrop-blur-2xl bg-white/60 dark:bg-black/60 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] p-2 shadow-2xl mt-8">
        <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-indigo-500/30 to-emerald-500/30 blur-md pointer-events-none -z-10" />
        <div className="p-6 md:p-8 rounded-[28px] bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 pb-0 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <TerminalIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight uppercase text-slate-900 dark:text-white">Installation</h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Add the shared UI primitives to your workspace.</p>
            </div>
          </div>
          <CommandPreview commands={{
            npm: 'npm install @clawesome/ui',
            pnpm: 'pnpm add @clawesome/ui',
            yarn: 'yarn add @clawesome/ui',
            bun: 'bun add @clawesome/ui'
          }} />
        </div>
      </div>
      
    </div>
  );
};

// ─── Core showcase helpers ─────────────────────────────────────────────────────

const ModalAlertShowcase = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full space-y-3">
      <Alert variant="info">Deployment queued for NC-01. Estimated wait: 30s.</Alert>
      <Alert variant="success" title="Deployed!">Agent NC-01 is now running on the prod cluster.</Alert>
      <Alert variant="warning" title="Heads Up">CPU threshold at 80%. Consider scaling the mesh.</Alert>
      <Alert variant="error" title="Build Failed" onClose={() => { }} >Pipeline error on step 3: module resolution failed.</Alert>
      <div className="pt-2">
        <Button variant="primary" icon={<Layers size={14} />} onClick={() => setOpen(true)}>Open Modal</Button>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Deployment"
        description="This will spin up NC-01 on the production cluster with the current config."
        footer={
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Deploy Now</Button>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        }
      >
        <p className="text-sm text-slate-400 leading-relaxed">
          Review the agent configuration below before deploying. Once deployed, NC-01 will begin processing queued tasks immediately.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
          <div>model: claude-3-5-sonnet</div>
          <div>region: us-east-1</div>
          <div>tools: [filesystem, browser, code_exec]</div>
          <div>memory: persistent</div>
        </div>
      </Modal>
    </div>
  );
};

const TypographyShowcase = () => {
  const { theme } = useUI();
  const label = (txt: string) => (
    <span className={cn('text-[9px] font-black uppercase tracking-[0.3em] mb-1 block', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>{txt}</span>
  );
  const divCls = cn('border-b pb-4 last:border-0', theme === 'dark' ? 'border-slate-800' : 'border-slate-100');
  const base = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const muted = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="w-full space-y-4">
      <div className={divCls}>{label('Display 1')}<p className={cn('text-5xl font-black tracking-tighter leading-none', base)}>Scale with AI</p></div>
      <div className={divCls}>{label('Display 2')}<p className={cn('text-3xl font-black tracking-tighter', base)}>Agent Orchestration</p></div>
      <div className={divCls}>{label('Heading')}<p className={cn('text-xl font-black tracking-tight', base)}>Neural Fabric Architecture</p></div>
      <div className={divCls}>{label('Body')}<p className={cn('text-base leading-relaxed', muted)}>Deploy intelligent agents that browse, click, and process information. Clawesome is the first OS built for agentic workflows at scale.</p></div>
      <div className={divCls}>{label('Small / Secondary')}<p className={cn('text-sm', muted)}>Secondary descriptor text for additional context or metadata.</p></div>
      <div className="flex flex-wrap items-center gap-6">
        <div>{label('Label')}<span className={cn('text-[10px] font-black uppercase tracking-[0.25em]', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>Neural Status</span></div>
        <div>{label('Mono ID')}<code className="font-mono text-xs text-indigo-400">#agent-0xa4b2c3</code></div>
        <div>{label('Micro')}<span className={cn('text-[9px] font-bold uppercase tracking-[0.3em]', muted)}>system v2.0.1</span></div>
      </div>
    </div>
  );
};

const PALETTE = [
  { name: 'Indigo — Primary', tw: 'bg-indigo-600', hex: '#4f46e5', token: 'indigo-600' },
  { name: 'Indigo Light', tw: 'bg-indigo-400', hex: '#818cf8', token: 'indigo-400' },
  { name: 'Emerald — Success', tw: 'bg-emerald-500', hex: '#10b981', token: 'emerald-500' },
  { name: 'Rose — Error', tw: 'bg-rose-500', hex: '#f43f5e', token: 'rose-500' },
  { name: 'Amber — Warning', tw: 'bg-amber-500', hex: '#f59e0b', token: 'amber-500' },
  { name: 'Cyan — Accent', tw: 'bg-cyan-400', hex: '#22d3ee', token: 'cyan-400' },
  { name: 'Violet — AI', tw: 'bg-violet-500', hex: '#8b5cf6', token: 'violet-500' },
  { name: 'Fuchsia — Prime', tw: 'bg-fuchsia-500', hex: '#d946ef', token: 'fuchsia-500' },
  { name: 'Slate 900 (Dark)', tw: 'bg-slate-900', hex: '#0f172a', token: 'slate-900' },
  { name: 'Slate 100 (Light)', tw: 'bg-slate-100', hex: '#f1f5f9', token: 'slate-100' },
];

const ColorPaletteShowcase = () => {
  const { theme } = useUI();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full">
      {PALETTE.map(({ name, tw, hex, token }) => (
        <div key={token} className="flex flex-col gap-2">
          <div className={cn('w-full h-12 rounded-2xl border', tw, theme === 'dark' ? 'border-slate-800' : 'border-slate-200/60')} />
          <div>
            <p className={cn('text-[10px] font-black tracking-tight leading-tight', theme === 'dark' ? 'text-slate-300' : 'text-slate-700')}>{name}</p>
            <p className={cn('text-[9px] font-mono', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>{hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ICON_SET = [
  Bot, Server, Database, Zap, Activity, Shield, Lock, Star,
  Code2, Cpu, GitBranch, MessageSquare, LayoutGrid, Settings,
  Layers, Search, Database, Globe, Sparkles, BrainCircuit,
  BarChart3, FolderKanban, Blocks, Brain,
];
const ICON_LABELS = [
  'Bot', 'Server', 'Database', 'Zap', 'Activity', 'Shield', 'Lock', 'Star',
  'Code2', 'Cpu', 'GitBranch', 'MessageSquare', 'LayoutGrid', 'Settings',
  'Layers', 'Search', 'Database', 'Globe', 'Sparkles', 'BrainCircuit',
  'BarChart3', 'FolderKanban', 'Blocks', 'Brain',
];

const IconShowcase = () => {
  const { theme } = useUI();
  const [hovered, setHovered] = useState<string | null>(null);
  const sizes = [16, 20, 28] as const;

  return (
    <div className="w-full space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
        {ICON_SET.map((Icon, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(ICON_LABELS[i])}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-default transition-all',
              theme === 'dark'
                ? 'hover:bg-indigo-500/10 hover:border-indigo-500/20 border border-transparent'
                : 'hover:bg-indigo-50 hover:border-indigo-100 border border-transparent',
              hovered === ICON_LABELS[i] && (theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'),
            )}
          >
            <Icon size={20} className={cn(
              'transition-colors',
              hovered === ICON_LABELS[i] ? 'text-indigo-500' : (theme === 'dark' ? 'text-slate-400' : 'text-slate-500'),
            )} />
            <span className={cn(
              'text-[8px] font-black truncate w-full text-center',
              theme === 'dark' ? 'text-slate-600' : 'text-slate-400',
            )}>{ICON_LABELS[i]}</span>
          </div>
        ))}
      </div>
      {/* Sizing */}
      <div className={cn('flex items-center gap-8 pt-4 border-t', theme === 'dark' ? 'border-slate-800' : 'border-slate-100')}>
        <span className={cn('text-[10px] font-black uppercase tracking-widest shrink-0', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>Sizes</span>
        {sizes.map(s => (
          <div key={s} className="flex items-center gap-2">
            <Bot size={s} className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} />
            <span className={cn('font-mono text-[9px]', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>{s}px</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FoundationPage ────────────────────────────────────────────────────────────
const FoundationPage = () => {

  const { theme } = useUI();
 return (
    <PageWrapper title="Core Foundation" description="The essential building blocks of the Clawesome design system. These primitive components provide the atomic foundation for all interface patterns, ensuring consistency and type-safety across the platform." icon={Shield}>
      {/* ── Paper ─────────────────────────────────────────────── */}
      <DocsWrapper
        label="Paper"
        description="Clean opaque card — white in light mode, dark slate in dark mode. Shadow lifts on hover."
        previewHeight="min-h-[200px]"
        code={`<Surface material="paper">
  <h4>Neural Node</h4>
  <p>Primary infrastructure layer.</p>
</Surface>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { icon: Server, label: 'Neural Node', desc: 'Primary infrastructure layer for orchestration pipelines.', tag: 'ONLINE' },
            { icon: Database, label: 'Vector Store', desc: 'High-density embedding cache, 99.98% retrieval accuracy.', tag: 'SYNCED' },
            { icon: Code2, label: 'Skill Module', desc: 'Composable capability block ready for agent deployment.', tag: 'READY' },
          ].map((item) => (
            <Surface key={item.label} material="paper" animate>
              <div className="flex items-start justify-between mb-6">
                <div className={cn('p-3 rounded-2xl', theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600')}>
                  <item.icon size={20} />
                </div>
                <span className={cn('text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border', theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400')}>
                  {item.tag}
                </span>
              </div>
              <h4 className={cn('font-black text-lg tracking-tight mb-1', theme === 'dark' ? 'text-white' : 'text-slate-900')}>{item.label}</h4>
              <p className={cn('text-sm leading-relaxed', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>{item.desc}</p>
            </Surface>
          ))}
        </div>
      </DocsWrapper>

      {/* ── Glass ─────────────────────────────────────────────── */}
      <DocsWrapper
        label="Glass"
        description="Frosted translucent surface with gradient border. Shimmer refines on hover."
        previewHeight="min-h-[200px]"
        code={`<Surface material="glass">
  <Lock size={20} />
  <h4>Secure Vault</h4>
  <p>End-to-end encrypted key-value store.</p>
</Surface>`}
      >
        <div className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-[40px] w-full',
          theme === 'dark'
            ? 'bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-violet-950/40'
            : 'bg-gradient-to-br from-indigo-100/60 via-slate-100/80 to-violet-100/60',
        )}>
          {[
            { icon: Lock, label: 'Secure Vault', desc: 'End-to-end encrypted key-value store for agent secrets.' },
            { icon: Zap, label: 'Edge Runtime', desc: 'Ultra-low-latency compute layer at the network boundary.' },
            { icon: Star, label: 'Core Memory', desc: 'Persistent long-term memory with semantic recall.' },
          ].map((item) => (
            <Surface key={item.label} material="glass" animate>
              <div className={cn('inline-flex p-3 rounded-2xl mb-6', theme === 'dark' ? 'bg-white/5 text-cyan-300' : 'bg-white/60 text-cyan-600')}>
                <item.icon size={20} />
              </div>
              <h4 className={cn('font-black text-lg tracking-tight mb-1', theme === 'dark' ? 'text-white' : 'text-slate-900')}>{item.label}</h4>
              <p className={cn('text-sm leading-relaxed', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>{item.desc}</p>
            </Surface>
          ))}
        </div>
      </DocsWrapper>

      {/* ── Status ────────────────────────────────────────────── */}
      <DocsWrapper
        label="Status"
        description="Contextual color tinting on hover. Border and shadow glow match the card's semantic color prop."
        previewHeight="min-h-[140px]"
        code={`<Surface material="status" color="emerald">
  <Activity size={20} className="text-emerald-500" />
  <p className="text-2xl font-black">99.9%</p>
  <p className="text-[10px] uppercase">Uptime</p>
</Surface>`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {([
            { color: 'indigo', icon: Cpu, label: 'Agent', value: '12' },
            { color: 'emerald', icon: Activity, label: 'Uptime', value: '99.9%' },
            { color: 'rose', icon: Zap, label: 'Errors', value: '0' },
            { color: 'amber', icon: Server, label: 'Latency', value: '4ms' },
            { color: 'cyan', icon: Database, label: 'Vectors', value: '1.4M' },
            { color: 'fuchsia', icon: Star, label: 'Score', value: '98.6' },
          ] as const).map(({ color, icon: Icon, label, value }) => (
            <Surface key={label} material="status" color={color} animate padding="p-6">
              <Icon size={20} className={cn(
                'mb-4 transition-colors',
                color === 'indigo' && 'text-indigo-500',
                color === 'emerald' && 'text-emerald-500',
                color === 'rose' && 'text-rose-500',
                color === 'amber' && 'text-amber-500',
                color === 'cyan' && 'text-cyan-500',
                color === 'fuchsia' && 'text-fuchsia-500',
              )} />
              <p className={cn('text-2xl font-black tracking-tighter mb-0.5', theme === 'dark' ? 'text-white' : 'text-slate-900')}>{value}</p>
              <p className={cn('text-[10px] font-black uppercase tracking-widest', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>{label}</p>
            </Surface>
          ))}
        </div>
      </DocsWrapper>

      {/* ── Neon ──────────────────────────────────────────────── */}
      <DocsWrapper
        label="Neon"
        description="Gradient border with layered outer glow. Hover or focus intensifies the glow for maximum presence."
        previewHeight="min-h-[200px]"
        code={`<Surface material="neon" color="indigo">
  <Cpu size={22} />
  <h4>Agent Core</h4>
  <p>Primary reasoning engine.</p>
</Surface>

// color options: indigo | violet | cyan | emerald | rose | amber | sky | fuchsia`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {([
            { color: 'indigo', icon: Cpu, label: 'Agent Core', desc: 'Primary reasoning engine for autonomous neural operations.' },
            { color: 'violet', icon: Layers, label: 'Layer Stack', desc: 'Hierarchical abstraction model spanning reasoning depth.' },
            { color: 'cyan', icon: Zap, label: 'Fast Path', desc: 'Low-latency execution lane with hardware acceleration.' },
            { color: 'fuchsia', icon: Star, label: 'Prime Module', desc: 'Highest-clearance tool module for critical mission ops.' },
          ] as const).map(({ color, icon: Icon, label, desc }) => (
            <Surface key={label} material="neon" color={color} animate>
              <div className={cn(
                'inline-flex p-3 rounded-2xl mb-6',
                color === 'indigo' && (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'),
                color === 'violet' && (theme === 'dark' ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'),
                color === 'cyan' && (theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'),
                color === 'fuchsia' && (theme === 'dark' ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-fuchsia-50 text-fuchsia-600'),
              )}>
                <Icon size={22} />
              </div>
              <h4 className={cn('font-black text-lg tracking-tight mb-2', theme === 'dark' ? 'text-white' : 'text-slate-900')}>{label}</h4>
              <p className={cn('text-sm leading-relaxed', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>{desc}</p>
            </Surface>
          ))}
        </div>
      </DocsWrapper>

      {/* ── Buttons ───────────────────────────────────────────── */}
      <DocsWrapper
        label="Buttons"
        description="6 variants × 4 sizes. Loading and disabled states built-in. icon prop accepts any ReactNode."
        previewHeight="min-h-[220px]"
        code={`<Button variant="primary" size="md">Deploy</Button>
<Button variant="secondary" size="sm" icon={<Bot size={14}/>}>Agents</Button>
<Button variant="ghost" size="xs">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
<Button variant="outline">Settings</Button>
<Button isLoading>Processing</Button>
<Button disabled>Disabled</Button>`}
      >
        <div className="w-full space-y-6">
          {/* Variants */}
          <div className="flex flex-wrap gap-3 items-center">
            {(['primary', 'secondary', 'ghost', 'danger', 'success', 'outline'] as const).map(v => (
              <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
            ))}
          </div>
          {/* Sizes */}
          <div className="flex flex-wrap gap-3 items-center">
            {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
              <Button key={s} variant="primary" size={s} icon={<Zap size={s === 'xs' ? 10 : s === 'sm' ? 12 : 14} />}>{s.toUpperCase()}</Button>
            ))}
          </div>
          {/* States */}
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary" isLoading>Processing</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="outline" icon={<Star size={14} />} iconPosition="right">With Icon</Button>
          </div>
        </div>
      </DocsWrapper>

      {/* ── Badges / Pills ────────────────────────────────────── */}
      <DocsWrapper
        label="Badges & Pills"
        description="Status pills with optional animated dot indicator. 6 semantic color variants."
        previewHeight="min-h-[120px]"
        code={`<Badge variant="indigo" dot>Active</Badge>
<Badge variant="emerald" dot>Online</Badge>
<Badge variant="rose" dot>Error</Badge>
<Badge variant="amber">Warning</Badge>
<Badge variant="slate">Idle</Badge>
<Badge variant="default">Unknown</Badge>`}
      >
        <div className="flex flex-wrap gap-3 items-center">
          {([
            { v: 'indigo' as const, label: 'Active', dot: true },
            { v: 'emerald' as const, label: 'Online', dot: true },
            { v: 'rose' as const, label: 'Error', dot: true },
            { v: 'amber' as const, label: 'Warning', dot: false },
            { v: 'slate' as const, label: 'Idle', dot: false },
            { v: 'default' as const, label: 'Unknown', dot: false },
          ]).map(({ v, label, dot }) => (
            <Badge key={v} variant={v} dot={dot}>{label}</Badge>
          ))}
        </div>
      </DocsWrapper>

      {/* ── Form Elements ───────────────────────────────────────── */}
      <DocsWrapper
        label="Form Elements"
        description="A complete suite of form primitives. Fully functional with keyboard navigation, error states, and high-contrast accessibility."
        previewHeight="min-h-[260px]"
        code={`<Input label="Agent Name" placeholder="NC-01" />
<Select label="Model" options={...} value={...} />
<ImageUpload label="Avatar" onChange={...} />
<Slider label="Temperature" value={temp} onChange={...} />
<RadioGroup options={...} value={mode} />
<Checkbox label="Enable Web Search" checked={...} />
<DateTimePicker label="Schedule Tasks" value={...} />`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Column 1: Standard Inputs */}
          <div className="space-y-4">
            <Input label="Agent Name" placeholder="e.g. NC-01" />
            <Input label="With Icon" icon={<Database size={14} />} placeholder="Search store..." />
            <Input label="Error State" error="Invalid identifier format" defaultValue="!bad-id" />
            <Textarea label="Mission Briefing" placeholder="What is this agent's objective?" rows={3} />
            <SearchInput value="" onChange={() => { }} placeholder="Search agents, tools, skills..." />
          </div>

          {/* Column 2: Advanced Controls */}
          <div className="space-y-6">
            <Select 
              label="Brain Model" 
              options={[
                { value: 'gpt-4o', label: 'GPT-4o (OpenAI)' },
                { value: 'claude-3.5', label: 'Claude 3.5 Sonnet' },
                { value: 'llama-3', label: 'Llama 3 70B' }
              ]} 
              value={'claude-3.5'}
              onChange={() => {}}
            />
            
            <Slider label="Temperature" value={75} onChange={() => {}} />

            <div className="grid grid-cols-2 gap-4">
              <RadioGroup 
                options={[
                  { value: 'fast', label: 'Fast mode' },
                  { value: 'accurate', label: 'Accurate mode' }
                ]}
                value="fast"
                onChange={() => {}}
              />
              <div className="space-y-3 pt-1">
                <Checkbox label="Allow Tool Ops" checked={true} onChange={() => {}} />
                <Checkbox label="Silent Execution" checked={false} onChange={() => {}} />
              </div>
            </div>

            <DateTimePicker label="Scheduled Wake" value="2026-03-07T14:30" onChange={() => {}} />
            <FileUpload label="Agent Avatar Override" onChange={() => {}} />
          </div>
        </div>
      </DocsWrapper>

      {/* ── Modal / Toast / Banner ────────────────────────────── */}
      <DocsWrapper
        label="Modals · Alerts · Banners"
        description="Alert banners in 4 semantic variants, and a full Modal with header, body, and footer slots."
        previewHeight="min-h-[260px]"
        code={`<Alert variant="info">Deployment queued for NC-01.</Alert>
<Alert variant="success" title="Done!">Agent deployed successfully.</Alert>
<Alert variant="warning" title="Heads Up">CPU threshold at 80%.</Alert>
<Alert variant="error" title="Failed" onClose={...}>Build pipeline error.</Alert>

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)}
  title="Confirm Deploy" description="This will spin up NC-01 on prod cluster."
  footer={<><Button variant="primary">Deploy</Button><Button variant="ghost">Cancel</Button></>}
>
  <p>Review the config before deploying.</p>
</Modal>`}
      >
        <ModalAlertShowcase />
      </DocsWrapper>

      {/* ── Typography ────────────────────────────────────────── */}
      <DocsWrapper
        label="Typography"
        description="Display sizes, body copy, mono labels and utility micro-text — all using font-black / tracking conventions."
        previewHeight="min-h-[300px]"
        code={`/* Display */
<h1 className="text-6xl font-black tracking-tighter">Scale with AI</h1>
<h2 className="text-4xl font-black tracking-tighter">Agent Orchestration</h2>
<h3 className="text-2xl font-black tracking-tight">Neural Fabric</h3>
/* Body */
<p className="text-base leading-relaxed">Agent description copy here.</p>
<p className="text-sm text-slate-400">Secondary body text.</p>
/* Labels & Mono */
<span className="text-[10px] font-black uppercase tracking-[0.25em]">Status Label</span>
<code className="font-mono text-xs text-indigo-400">#agent-id-0x4a</code>`}
      >
        <TypographyShowcase />
      </DocsWrapper>

      {/* ── Color Palette ─────────────────────────────────────── */}
      <DocsWrapper
        label="Color Palette"
        description="Core design tokens: indigo (primary), emerald (success), rose (error), amber (warning), slate (neutral)."
        previewHeight="min-h-[180px]"
        code={`/* Tailwind tokens used throughout Clawesome UI */
bg-indigo-600   // Primary actions
bg-emerald-500  // Success / Online
bg-rose-500     // Error / Danger
bg-amber-500    // Warning / Caution
bg-cyan-400     // Accent / Highlight
bg-violet-500   // AI / Special
bg-fuchsia-500  // Prime / VIP
bg-slate-900    // Surface base (dark)
bg-white        // Surface base (light)`}
      >
        <ColorPaletteShowcase />
      </DocsWrapper>

      {/* ── Icons ─────────────────────────────────────────────── */}
      <DocsWrapper
        label="Icons"
        description="Lucide React icon set used throughout Clawesome. All icons scale via size prop."
        previewHeight="min-h-[160px]"
        code={`import { Bot, Server, Database, Zap, Activity, Shield,
  Lock, Star, Code2, Cpu, GitBranch, MessageSquare,
  LayoutGrid, ChartPieIcon, Settings, Search
} from 'lucide-react';

// Sizing:
<Bot size={16} />  // 16px — inline
<Bot size={20} />  // 20px — card icon
<Bot size={28} />  // 28px — feature icon
<Bot size={40} />  // 40px — hero / empty state`}
      >
        <IconShowcase />
      </DocsWrapper>

      {/* ── Form Controls & Navigation ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <DocsWrapper
          label="Selection Controls"
          description="Customized Select, Checkbox, and RadioGroup for high-density AI interfaces."
          code={`<Select options={options} value={v} onChange={setV} />
<Checkbox label="Auto-deploy" checked={c} onChange={setC} />
<RadioGroup options={opts} value={r} onChange={setR} />`}
        >
          <div className="w-full space-y-6">
            <Select
              label="Model Selection"
              value="claude-3-5"
              onChange={() => { }}
              options={[
                { value: 'claude-3-5', label: 'Claude 3.5 Sonnet', icon: <Sparkles size={14} />, description: 'Fastest & most capable model' },
                { value: 'gpt-4o', label: 'GPT-4o', icon: <Bot size={14} />, description: 'High-reasoning multimodality' },
                { value: 'deepseek-v3', label: 'DeepSeek V3', icon: <Cpu size={14} />, description: 'Optimized open-source reasoning' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Checkbox checked={true} onChange={() => { }} label="Secure Shell" description="Enable SSH access" />
                <Checkbox checked={false} onChange={() => { }} label="Web Scraper" description="Allow browser access" />
                <Checkbox checked={true} onChange={() => { }} label="Vector Store" description="Persistent memory" disabled />
              </div>
              <RadioGroup
                value="prod"
                onChange={() => { }}
                options={[
                  { value: 'dev', label: 'Development', description: 'Local sandbox' },
                  { value: 'staging', label: 'Staging', description: 'Pre-flight cluster' },
                  { value: 'prod', label: 'Production', description: 'Mission critical' },
                ]}
              />
            </div>
          </div>
        </DocsWrapper>

        <DocsWrapper
          label="Navigation & Chips"
          description="Breadcrumbs for hierarchy and Chips for tags or deletable metadata."
          code={`<Breadcrumbs items={[{ label: 'Home' }, { label: 'Agents' }]} />
<Chip label="v2.0" onDelete={() => {}} />`}
        >
          <div className="w-full space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Breadcrumbs</span>
              <Breadcrumbs items={[
                { label: 'Workspaces', icon: <LayoutGrid size={12} />, href: '#' },
                { label: 'Cloud Infra', icon: <Server size={12} />, href: '#' },
                { label: 'Agent Clusters' }
              ]} />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Chips & Tags</span>
              <div className="flex flex-wrap gap-2">
                <Chip label="v3.5" variant="indigo" icon={<Sparkles size={10} />} />
                <Chip label="Running" variant="emerald" onDelete={() => { }} />
                <Chip label="Critial" variant="rose" icon={<Activity size={10} />} />
                <Chip label="Pending" variant="amber" />
                <Chip label="Legacy" variant="slate" />
                <Chip label="Small Tag" variant="indigo" size="sm" />
              </div>
            </div>
          </div>
        </DocsWrapper>
      </div>
    </PageWrapper>
  );
};





const AILabPage = ({ historySearch, setHistorySearch }: any) => {
  const { theme } = useUI();
  return (
    <PageWrapper title="Intelligence Sandbox" description="Advanced AI experimentation environment for training, prompt engineering, and model fine-tuning. This laboratory provides the specialized interfaces needed for sophisticated agent orchestration." icon={Sparkles}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <DocsWrapper
          label="Filesystem Sandbox"
          description="Simulated file system for agent workspace testing."
          code={`<FilesystemSandbox tree={mockSandbox} />`}
        >
          <div className="w-full max-w-xl">
            <FilesystemSandbox tree={mockSandbox} mountedCount={3} totalCount={4} />
          </div>
        </DocsWrapper>

        <DocsWrapper
          label="Neural History"
          description="Trace and search agent decision logs and memory hits."
          code={`<SmartHistorySearch items={mockHistory} search={search} />`}
        >
          <div className="w-full space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Neural History</span>
            <SmartHistorySearch items={mockHistory} search={historySearch} onSearchChange={setHistorySearch} />
          </div>
        </DocsWrapper>
      </div>
    </PageWrapper>
  );
};

const MOCK_SKILLS = [
  { id: 's1', name: 'Filesystem Access', description: 'Read, write, and manage local files and directories.', icon: FolderKanban, color: 'indigo', code: 'import { fs } from "@clawesome/core";\n\n// Read context\nconst content = await fs.readFile("src/main.ts");\n\n// Write update\nawait fs.writeFile("src/main.ts", content.replace("v1", "v2"));' },
  { id: 's2', name: 'Web Browser', description: 'Navigate, click, and scrape content from any website.', icon: Globe, color: 'cyan', code: 'import { browser } from "@clawesome/core";\n\nawait browser.goto("https://clawesome.io");\nconst text = await browser.innerText("main");' },
  { id: 's3', name: 'Shell Execution', description: 'Run secure shell commands in a sandbox environment.', icon: TerminalIcon, color: 'emerald', code: '# Run build\nnpm run build --incremental\n\n# Check process\nps aux | grep node' },
  { id: 's4', name: 'Email Communication', description: 'Automate inbox management, drafting, and complex email thread reasoning.', icon: Mail, color: 'sky', code: 'import { mail } from "@clawesome/core";\n\n// Search for urgent items\nconst urgent = await mail.search("label:urgent");\n\n// Draft response with AI context\nawait mail.draft({\n  to: urgent[0].from,\n  subject: `Re: ${urgent[0].subject}`,\n  body: "Synchronizing with the neural fabric..."\n});' },
];

const AgentsPage = ({ setIsCreateAgentModalOpen, setIsAILabOpen }: any) => {
  const { theme } = useUI();
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<any>(MOCK_SKILLS[0]);

  const sectionLabel = (title: string, icon: any) => (
    <div className="flex items-center gap-2 mb-6">
      <div className={cn(
        "p-1.5 rounded-lg",
        theme === 'dark' ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"
      )}>
        {React.createElement(icon, { size: 14 })}
      </div>
      <h3 className={cn("text-xs font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
        {title}
      </h3>
    </div>
  );

  return (
    <PageWrapper title="Agent Orchestration" description="Management system for your autonomous AI workforce. Control agent lifecycles, monitor swarm performance, and configure inter-agent communication protocols." icon={Bot}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreateAgentModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={16} />
            Deploy Agent
          </button>
          <button
            onClick={() => setIsAILabOpen(true)}
            className={cn(
              "px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 flex items-center gap-2 border",
              theme === 'dark' ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
            )}
          >
            <MessageCircle size={16} />
            AI Lab
          </button>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search agents..."
            className="w-full md:w-64"
          />
          <div className={cn(
            "p-1 rounded-xl flex gap-1 border",
            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          )}>
            <button
              onClick={() => setView('grid')}
              className={cn(
                "p-1.5 rounded-lg transition-all",
                view === 'grid'
                  ? (theme === 'dark' ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600")
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('table')}
              className={cn(
                "p-1.5 rounded-lg transition-all",
                view === 'table'
                  ? (theme === 'dark' ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600")
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div className="mb-16">
        {sectionLabel("Active Nodes", Activity)}
        <div className={cn(
          view === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            : "space-y-3"
        )}>
          {MOCK_AGENTS
            .filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
            .map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent as any}
                viewMode={view === 'grid' ? 'grid' : 'table'}
              />
            ))
          }
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        {sectionLabel("Available Skills", Zap)}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            {MOCK_SKILLS.map(skill => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className={cn(
                  "w-full text-left p-4 rounded-3xl border transition-all group",
                  selectedSkill.id === skill.id
                    ? (theme === 'dark' ? "bg-indigo-600/10 border-indigo-500/30 ring-1 ring-indigo-500/30" : "bg-indigo-50 border-indigo-200 shadow-sm")
                    : (theme === 'dark' ? "bg-slate-900/40 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm")
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                    skill.color === 'indigo' && "bg-indigo-500/20 text-indigo-500",
                    skill.color === 'cyan' && "bg-cyan-500/20 text-cyan-500",
                    skill.color === 'emerald' && "bg-emerald-500/20 text-emerald-500",
                  )}>
                    <skill.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn("text-sm font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                      {skill.name}
                    </h4>
                    <p className={cn("text-xs font-medium truncate", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                      {skill.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <DocsWrapper
              label={selectedSkill.name}
              description={selectedSkill.description}
              code={selectedSkill.code}
              language="typescript"
              previewHeight="min-h-[200px]"
            >
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className={cn(
                  "w-20 h-20 rounded-[32px] flex items-center justify-center mb-6 shadow-2xl",
                  selectedSkill.color === 'indigo' && "bg-indigo-500 text-white shadow-indigo-500/40",
                  selectedSkill.color === 'cyan' && "bg-cyan-500 text-white shadow-cyan-500/40",
                  selectedSkill.color === 'emerald' && "bg-emerald-500 text-white shadow-emerald-500/40",
                )}>
                  <selectedSkill.icon size={32} />
                </div>
                <h3 className={cn("text-2xl font-black tracking-tighter mb-2", theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {selectedSkill.name}
                </h3>
                <p className={cn("max-w-md text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
                  {selectedSkill.description} This skill is ready to be utilized by any active agent in your swarm for complex automated task execution.
                </p>
              </div>
            </DocsWrapper>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};


const DocsPortalPage = () => (
  <PageWrapper title="Documentation Hub" description="A centralized repository for all Clawesome OS technical documentation, API references, and usage guides. Explore interactive code examples and comprehensive component showcases." icon={BrainCircuit}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <DocsWrapper
        label="CLI Usage"
        description="Interactive CommandPreview with package manager switching."
        code="<CommandPreview commands={...} />"
      >
        <CommandPreview commands={{
          npm: 'npm install @clawesome/cli',
          pnpm: 'pnpm add @clawesome/cli',
          yarn: 'yarn add @clawesome/cli',
          bun: 'bun add @clawesome/cli'
        }} />
      </DocsWrapper>

      <DocsWrapper
        label="Syntax Highlighting"
        description="Integrated CodePreview for technical walkthroughs."
        code="<CodePreview code={...} language='javascript' />"
      >
        <CodePreview code={`async function clawesome() {\n  const agents = await swarm.deploy(5);\n  return agents.execute('MISSION_REFACTOR');\n}`} language="javascript" />
      </DocsWrapper>

      <DocsWrapper
        label="Multi-Language"
        description="LanguagePreview for cross-platform API docs."
        code="<LanguagePreview blocks={...} />"
      >
        <LanguagePreview blocks={[
          { label: 'TypeScript', language: 'typescript', code: 'type Agent = { id: string; };' },
          { label: 'Rust', language: 'rust', code: 'struct Agent { id: String }' },
          { label: 'Python', language: 'python', code: 'class Agent: pass' }
        ]} />
      </DocsWrapper>
    </div>
  </PageWrapper>
);

const WebsitePage = () => (
  <PageWrapper title="Portal Landing" description="Marketing-focused components designed for public-facing websites and landing pages. Showcase your product with engaging hero sections, feature grids, and social proof elements." icon={Globe}>
    <DocsWrapper
      label="Hero & Navigation"
      description="Marketing navigation and hero section with animated background."
      previewHeight="min-h-[600px]"
    >
      <div className="w-full relative rounded-3xl overflow-hidden border border-slate-800">
        <BackgroundAnimated />
        <div className="relative z-10 scale-[0.85] origin-top">
          <WebsiteNavbar />
          <div className="mt-12"><WebsiteHero /></div>
          <LogoCloud />
        </div>
      </div>
    </DocsWrapper>

    <div className="flex flex-col gap-12 mt-12 pb-24">
      <DocsWrapper label="Features" description="Exhaustive feature grid.">
        <Features />
      </DocsWrapper>
      <DocsWrapper label="Social Proof" description="Testimonials and trust markers.">
        <Testimonials />
      </DocsWrapper>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <DocsWrapper label="Contextual Info" description="FAQs and conversion points.">
        <Faqs />
      </DocsWrapper>
      <DocsWrapper label="Conversion" description="Call to action and footer.">
        <div className="space-y-12">
          <Donate />
          <WebsiteFooter />
        </div>
      </DocsWrapper>
    </div>
  </PageWrapper>
);

// ─── DashboardPage ────────────────────────────────────────────────────────────

const MOCK_AGENTS = [
  { id: 'a1', name: 'Senior Dev', title: 'Full-Stack Engineer', createdAt: 1705276800000, profilePicture: '' },
  { id: 'a2', name: 'QA Agent', title: 'Test Automation', createdAt: 1706918400000, profilePicture: '' },
  { id: 'a3', name: 'Ops Node', title: 'DevOps Orchestrator', createdAt: 1710979200000, profilePicture: '' },
  { id: 'a4', name: 'Doc Writer', title: 'Technical Scribe', createdAt: 1712620800000, profilePicture: '' },
];

const DashboardPage = () => {
  const { theme } = useUI();
  const [agentView, setAgentView] = useState<'grid' | 'list'>('grid');
  const [agentSearch, setAgentSearch] = useState('');

  const sectionLabel = (label: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-3 mb-5">
      <div className={cn('p-2 rounded-xl', theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600')}>{icon}</div>
      <span className={cn('text-[10px] font-black uppercase tracking-[0.3em]', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>{label}</span>
    </div>
  );

  return (
    <PageWrapper title="Dashboard Portal" description="Comprehensive overview of the Clawesome dashboard ecosystem. These components are optimized for high-density data visualization and rapid system status assessments." icon={LayoutGrid}>
      {/* ── Resource Header ───────────────────────────────────── */}
      <DocsWrapper
        label="Dashboard Layout"
        description="Core portal navigation and resource management headers."
        code={`<DashboardResourceHeader title="Agents" ... />`}
        previewHeight="min-h-[140px]"
      >
        <DashboardResourceHeader
          title="Resource"
          badge="NC-CONTEXT"
          statusLabel="Neural Link:"
          statusValue="Active"
          statusColor="emerald"
          isCollection
          searchQuery={agentSearch}
          onSearchChange={setAgentSearch}
          viewMode={agentView}
          onViewModeChange={(m: any) => setAgentView(m)}
          searchPlaceholder="SEARCH..."
          renderRight={
            <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95">
              <Bot size={16} /> Create resource
            </button>
          }
        />
      </DocsWrapper>

      {/* ── Agent Cards ───────────────────────────────────────── */}
      <div className="mt-12">
        <DocsWrapper
          label="Agent Instances"
          description="Adaptive grid and list views for autonomous node monitoring."
          code={`<AgentCard agent={agent} viewMode="grid" />`}
        >
          <div className={cn(
            'w-full',
            agentView === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-3'
          )}>
            {MOCK_AGENTS
              .filter(a => a.name.toLowerCase().includes(agentSearch.toLowerCase()))
              .map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  viewMode={agentView === 'grid' ? 'grid' : 'table'}
                  onDelete={() => { }}
                />
              ))
            }
          </div>
        </DocsWrapper>
      </div>

      {/* ── System Vitality ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <DocsWrapper
          label="System Health"
          description="Real-time hardware and neural fabric monitoring stats."
          code="<SystemVitality />"
        >
          <SystemVitality />
        </DocsWrapper>

        <DocsWrapper
          label="Cost Analysis"
          description="Token consumption and recurring agent expenditure."
          code="<CostTracker />"
        >
          <CostTracker />
        </DocsWrapper>
      </div>

      {/* ── Project + Heatmap ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <DocsWrapper
          label="Project Activity"
          description="Aggregated commit and event stream for active workspaces."
          code="<ProjectPulse />"
        >
          <ProjectPulse />
        </DocsWrapper>

        <DocsWrapper
          label="Node Intensity"
          description="Temporal density of agentic operations across the mesh."
          code="<ActivityHeatmap />"
        >
          <ActivityHeatmap />
        </DocsWrapper>
      </div>

      {/* ── Workspace Gallery ─────────────────────────────────── */}
      <div className="mt-12">
        <DocsWrapper
          label="Workspace Mesh"
          description="Navigation layer for multi-repo agentic orchestration."
          code="<WorkspaceGallery workspaces={...} />"
        >
          <div className="w-full">
            <WorkspaceGallery viewMode="grid" workspaces={[
              { id: 'w1', icon: Database, name: 'clawesome Core', path: '~/BiloDev/clawesome', status: 'Active', color: 'indigo', agents: [{ id: 'a1', color: 'bg-indigo-500' }, { id: 'a2', color: 'bg-purple-500' }] },
              { id: 'w2', icon: Server, name: 'Cloud Infra', path: '~/cloud-configs', status: 'Idle', color: 'emerald', agents: [{ id: 'a3', color: 'bg-emerald-400' }] },
              { id: 'w3', icon: Star, name: 'Protocol X', path: '~/protocols/x', status: 'Active', color: 'amber', agents: [{ id: 'a4', color: 'bg-amber-400' }, { id: 'a5', color: 'bg-rose-400' }, { id: 'a6', color: 'bg-cyan-400' }, { id: 'a7', color: 'bg-violet-400' }] },
            ]} />
          </div>
        </DocsWrapper>
      </div>
    </PageWrapper>
  );
};

// ─── ChartsPage ────────────────────────────────────────────────────────────────

const AREA_DATA = [
  { month: 'Jan', agents: 12, ops: 40, tokens: 800 },
  { month: 'Feb', agents: 19, ops: 58, tokens: 1200 },
  { month: 'Mar', agents: 15, ops: 70, tokens: 950 },
  { month: 'Apr', agents: 28, ops: 90, tokens: 1600 },
  { month: 'May', agents: 35, ops: 110, tokens: 2100 },
  { month: 'Jun', agents: 42, ops: 138, tokens: 2800 },
];

const BAR_DATA = [
  { week: 'W1', success: 88, errors: 9, timeout: 3 },
  { week: 'W2', success: 74, errors: 18, timeout: 8 },
  { week: 'W3', success: 92, errors: 5, timeout: 3 },
  { week: 'W4', success: 81, errors: 12, timeout: 7 },
];

const RADAR_DATA = [
  { subject: 'Code', nc01: 85, nc02: 62 },
  { subject: 'Debug', nc01: 78, nc02: 90 },
  { subject: 'Review', nc01: 55, nc02: 72 },
  { subject: 'Docs', nc01: 92, nc02: 45 },
  { subject: 'Deploy', nc01: 65, nc02: 88 },
  { subject: 'Monitor', nc01: 70, nc02: 75 },
];

const DONUT_DATA = [
  { name: 'Claude 3.5', value: 48, color: '#6366f1' },
  { name: 'GPT-4o', value: 28, color: '#06b6d4' },
  { name: 'DeepSeek', value: 14, color: '#10b981' },
  { name: 'Gemini', value: 10, color: '#f59e0b' },
];

const DONUT_DATA_2 = [
  { name: 'Frontend', value: 35, color: '#6366f1' },
  { name: 'Backend', value: 25, color: '#06b6d4' },
  { name: 'Database', value: 20, color: '#10b981' },
  { name: 'DevOps', value: 20, color: '#f59e0b' },
];


const ChartsPage = () => {
  const { theme } = useUI();
  const [tf, setTf] = useState('30D');

  return (
    <PageWrapper title="Telemetrics" description="Advanced data visualization components for monitoring agent performance, system health, and operational metrics. Built with Recharts and Framer Motion for dynamic, responsive displays." icon={BarChart3}>
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12">
        <TimeframePicker value={tf} onChange={setTf} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DocsWrapper
          label="Stacked Area"
          description="Temporal density of agentic operations."
          code={`<StackedAreaChart 
  data={AREA_DATA} 
  xKey="month"
  series={[
    { key: 'tokens', color: '#6366f1', label: 'Tokens' },
    { key: 'ops', color: '#06b6d4', label: 'Ops' }
  ]} 
/>`}
        >
          <div className="w-full h-80">
            <StackedAreaChart
              data={AREA_DATA}
              xKey="month"
              series={[
                { key: 'tokens', color: '#6366f1', label: 'Tokens' },
                { key: 'ops', color: '#06b6d4', label: 'Ops' },
                { key: 'agents', color: '#10b981', label: 'Agents' },
              ]}
            />
          </div>
        </DocsWrapper>

        <DocsWrapper
          label="Multi-Series Line"
          description="Continuous metric monitoring."
          code={`<MultiSeriesLineChart 
  data={AREA_DATA} 
  series={[
    { key: 'tokens', color: '#6366f1', label: 'Tokens' }
  ]} 
/>`}
        >
          <div className="w-full h-80">
            <MultiSeriesLineChart
              data={AREA_DATA}
              xKey="month"
              series={[
                { key: 'tokens', color: '#6366f1', label: 'Tokens' },
                { key: 'ops', color: '#f43f5e', label: 'Failures' },
              ]}
            />
          </div>
        </DocsWrapper>

        <DocsWrapper
          label="Grouped Bar"
          description="Categorical comparison of successes/errors."
          code={`<GroupedBarChart 
  data={BAR_DATA} 
  series={[
    { key: 'success', color: '#10b981', label: 'Success' }
  ]} 
/>`}
        >
          <div className="w-full h-80">
            <GroupedBarChart
              data={BAR_DATA}
              xKey="week"
              series={[
                { key: 'success', color: '#10b981', label: 'Success' },
                { key: 'errors', color: '#f43f5e', label: 'Errors' },
              ]}
            />
          </div>
        </DocsWrapper>

        <DocsWrapper
          label="Spider Radar"
          description="Relative node capability scores."
          code={`<SpiderRadarChart 
  data={RADAR_DATA} 
  series={[
     { key: 'nc01', color: '#6366f1', label: 'NC-01' }
  ]} 
/>`}
        >
          <div className="w-full h-80">
            <SpiderRadarChart
              data={RADAR_DATA}
              dataKey="subject"
              series={[
                { key: 'nc01', color: '#6366f1', label: 'NC-01' },
                { key: 'nc02', color: '#ec4899', label: 'NC-02' },
              ]}
            />
          </div>
        </DocsWrapper>
      </div>

      <div className="mt-12">
        <DocsWrapper label="Donut Chart" description="Resource allocation distribution." code="<DonutChart data={DONUT_DATA} />">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full p-8">
            <div className="h-64"><DonutChart data={DONUT_DATA} /></div>
            <div className="h-64"><DonutChart data={DONUT_DATA_2} /></div>
          </div>
        </DocsWrapper>
      </div>
    </PageWrapper>
  );
};


// ─── SystemPage ────────────────────────────────────────────────────────────────

const SystemPage = ({ mode }: { mode: 'terminal' | 'identity' }) => {
  return (
    <PageWrapper title={mode === 'terminal' ? "Neural Terminal" : "Identity Matrix"} description={mode === 'terminal' ? "A low-level gateway for direct interaction with the neural fabric, enabling command execution, system diagnostics, and real-time data streaming." : "User and agent identity management, including authentication, authorization, and profile configuration. Securely manage access levels and operational clearances."} icon={mode === 'terminal' ? TerminalIcon : User}>
      {mode === 'terminal' ? (
        <DocsWrapper
          label="Neural Terminal"
          description="Low-level gateway for neural fabric synchronization and command execution."
          code={`<Terminal 
  title="Neural Terminal"
  initialHistory={[...]}
/>`}
        >
          <div className="w-full">
            <Terminal 
              title="Showcase Gateway"
              subtitle="Demonstration of the neural terminal component logic."
              initialHistory={[
                { type: 'output', text: 'Clawesome UI Showcase // Terminal v2.0' },
                { type: 'success', text: 'SYSTEM: All modules nominal.' }
              ]}
            />
          </div>
        </DocsWrapper>
      ) : (
        <div className="space-y-12">
          <DocsWrapper
            label="Identity Header"
            description="Premium user profile header with clearance levels and actions."
            code={`<ProfileHeader name="User" ... />`}
          >
            <ProfileHeader 
              name="Showcase User" 
              clearanceLevel="OP_CLEARANCE: S9 [GOD_MODE]"
              email="showcase@clawesome.io"
              onEdit={() => alert('Edit triggered')}
            />
          </DocsWrapper>

          <DocsWrapper
            label="Profile Information"
            description="Detail cards and action surfaces for user management."
            code={`<ProfileCard title="Identity">...</ProfileCard>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <ProfileCard title="Identity Configuration" icon={<Settings size={18} />}>
                  <div className="space-y-4">
                     <p className="text-slate-500 italic font-medium">"This is how the profile card looks in the showcase environment."</p>
                     <ProfileInfoRow label="Access Level" value="Unlimited" />
                     <ProfileInfoRow label="Node Region" value="Localhost" />
                  </div>
               </ProfileCard>
               <ProfileActionCard 
                  title="Secure Uplink" 
                  description="This demonstrates the action card style used for security and connection notices."
                  icon={<Shield size={100} />}
               />
            </div>
          </DocsWrapper>
        </div>
      )}
    </PageWrapper>
  );
};


// ─── Layouts Showcase helpers ─────────────────────────────────────────────────────

const FileTreeNode = ({ item, onSelect, active, depth = 0 }: any) => {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const isFile = item.type === 'file';

  const getIcon = () => {
    if (!isFile) return isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />;
    const ext = item.name.split('.').pop()?.toLowerCase();
    if (ext === 'tsx' || ext === 'ts') return <Code2 size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />;
    if (ext === 'json') return <Database size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />;
    if (ext === 'png' || ext === 'jpg' || ext === 'svg') return <ImageIcon size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />;
    if (ext === 'pdf') return <FileText size={14} className="text-rose-400 group-hover:scale-110 transition-transform" />;
    return <File size={14} className="text-slate-400 group-hover:scale-110 transition-transform" />;
  };

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center gap-3 py-2 px-3 rounded-xl cursor-not-allowed group transition-all",
          active?.name === item.name 
            ? "bg-indigo-500/15 text-indigo-400 shadow-[0_4px_12px_rgba(99,102,241,0.08)] border border-indigo-500/20" 
            : "hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-500 border border-transparent",
          item.type === 'folder' && "font-black uppercase tracking-[0.15em] text-[9px] opacity-80"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px`, cursor: 'pointer' }}
        onClick={() => isFile ? onSelect(item) : setIsOpen(!isOpen)}
      >
        <span className="shrink-0">
           {getIcon()}
        </span>
        <span className={cn(isFile ? "text-xs font-bold" : "tracking-tight font-black")}>{item.name}</span>
      </div>
      {!isFile && isOpen && item.children?.map((child: any) => (
        <FileTreeNode key={child.name} item={child} onSelect={onSelect} active={active} depth={depth + 1} />
      ))}
    </div>
  );
};

const TwoColumnGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
    {children}
  </div>
);

const LayoutsPage = () => {
  const { theme } = useUI();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // grid/list resources
  const resources = [
    { id: 'r1', name: 'Neural Gateway', status: 'Healthy', version: '2.4.0', type: 'System', icon: <Cpu size={16}/> },
    { id: 'r2', name: 'Vector Cache', status: 'Syncing', version: '1.2.1', type: 'Storage', icon: <Database size={16}/> },
    { id: 'r3', name: 'Swarm Monitor', status: 'Active', version: '3.0.0', type: 'AI', icon: <Bot size={16}/> },
    { id: 'r4', name: 'Ethical Guard', status: 'Standby', version: '0.9.5', type: 'Security', icon: <Shield size={16}/> },
    { id: 'r5', name: 'Compute Node-01', status: 'Offline', version: '1.1.0', type: 'Compute', icon: <Server size={16}/> },
  ];

  // filetree
  const fileTree = [
    { name: 'packages', type: 'folder', children: [
        { name: 'ui', type: 'folder', children: [
            { name: 'src', type: 'folder', children: [
                { name: 'App.tsx', type: 'file', content: "// App entry point\nconsole.log('Clawesome OS Initialized');\n\nexport const Core = () => {\n  return <div>Neural Core</div>;\n};" },
                { name: 'components', type: 'folder', children: [
                    { name: 'Button.tsx', type: 'file', content: "import React from 'react';\n\nexport const Button = () => (\n  <button className='px-4 py-2 bg-indigo-600 rounded-xl'>\n    Click Me\n  </button>\n);" },
                    { name: 'Sidebar.tsx', type: 'file', content: "export const Sidebar = () => (\n  <aside className='w-64 border-r'>\n    Nav\n  </aside>\n);" },
                ]},
                { name: 'assets', type: 'folder', children: [
                    { name: 'logo.png', type: 'file', content: 'https://picsum.photos/seed/clawesome/800/600' },
                    { name: 'hero.jpg', type: 'file', content: 'https://picsum.photos/seed/hero/1200/800' },
                ]},
            ]},
            { name: 'blueprint.pdf', type: 'file', content: 'BINARY_PDF_STREAM' },
            { name: 'package.json', type: 'file', content: '{\n  "name": "@clawesome/ui",\n  "version": "2.1.4",\n  "dependencies": {\n    "framer-motion": "latest",\n    "lucide-react": "latest"\n  }\n}' },
        ]},
    ]},
    { name: 'apps', type: 'folder', children: [
        { name: 'dashboard', type: 'folder', children: [] },
        { name: 'website', type: 'folder', children: [] }
    ]},
    { name: 'moon.yml', type: 'file', content: 'type: project\nlanguage: typescript\ntasks:\n  build: tsc -b && vite build' }
  ];

  const filteredResources = resources.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  // masonry
  const masonryImgs = Array.from({ length: 20 }, (_, i) => ({ 
    id: `masonry-${i}`,
    url: `https://picsum.photos/seed/${i * 42}/400/${300 + Math.floor(Math.random() * 400)}` 
  }));

  // carousel items
  const carouselItems = [
    { id: 'c1', title: 'System Pulse', desc: 'Real-time telemetry and monitoring.', color: 'from-indigo-600 to-blue-500' },
    { id: 'c2', title: 'Agent Swarm', desc: 'Coordinated task execution.', color: 'from-emerald-600 to-teal-500' },
    { id: 'c3', title: 'Vector Grid', desc: 'Secure high-density storage.', color: 'from-orange-600 to-rose-500' },
    { id: 'c4', title: 'Ethics Core', desc: 'Validated safety alignment.', color: 'from-violet-600 to-purple-500' },
  ];

  return (
    <PageWrapper title="Layout Architectures" description="Standardized structural shells for various application contexts. From complex dashboards to minimalistic content viewers, these layouts ensure responsive and accessible spatial organization." icon={Layout}>

      {/* 1. Grid/List Resource Management */}
      <DocsWrapper label="Grid & List Control" description="Responsive layout with real-time filtering and view mode persistence.">
         <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
               <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search resources..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-sm placeholder:italic focus:ring-1 focus:ring-indigo-500"
                  />
               </div>
               <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button onClick={() => setViewMode('grid')} className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-500" : "text-slate-500")}>
                     <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-500" : "text-slate-500")}>
                     <List size={16} />
                  </button>
               </div>
            </div>

            <div className={cn(
              "grid gap-4",
              viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
               {filteredResources.map(res => (
                 <Surface key={res.id} material="paper" className={cn("flex group", viewMode === 'grid' ? "flex-col p-6 h-full" : "p-4 items-center justify-between")}>
                    <div className="flex items-center gap-4">
                       <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 transition-transform group-hover:scale-110">{res.icon}</div>
                       <div className="flex flex-col">
                          <span className="font-black text-sm">{res.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{res.type} // v{res.version}</span>
                       </div>
                    </div>
                    {viewMode === 'list' ? (
                      <div className="flex items-center gap-4">
                        <Badge variant={res.status === 'Healthy' || res.status === 'Active' ? 'emerald' : res.status === 'Offline' ? 'rose' : 'amber'} dot>{res.status}</Badge>
                        <Button variant="ghost" size="xs">Config</Button>
                      </div>
                    ) : (
                        <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800/5">
                            <Badge variant={res.status === 'Healthy' || res.status === 'Active' ? 'emerald' : res.status === 'Offline' ? 'rose' : 'amber'} dot>{res.status}</Badge>
                            <Button variant="outline" size="xs">Details</Button>
                        </div>
                    )}
                 </Surface>
               ))}
            </div>
         </div>
      </DocsWrapper>

      {/* 2. Filetree & Preview */}
      <DocsWrapper label="File Explorer" description="Recursive tree structure with code preview and toggleable split-view.">
         <div className="w-full h-[500px] border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden flex bg-slate-50 dark:bg-slate-950 shadow-inner">
            {/* Tree */}
            <div className="w-64 border-r border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
               <div className="flex items-center gap-2 mb-6">
                  <FolderKanban size={16} className="text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Workspace Root</span>
               </div>
               <div className="space-y-1">
                  {fileTree.map(item => <FileTreeNode key={item.name} item={item} onSelect={setSelectedFile} active={selectedFile} />)}
               </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
               <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-mono text-slate-500 truncate">{selectedFile?.name || 'select a file...'}</span>
                  </div>
                  <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition-all">
                     {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
                  </button>
               </div>
               <div className="flex-1 flex min-h-0 relative">
                  <div className="flex-1 p-8 font-mono text-xs overflow-auto no-scrollbar bg-slate-950 text-slate-300 leading-relaxed whitespace-pre selection:bg-indigo-500/30 font-medium">
                     {selectedFile?.type === 'file' && (selectedFile.name.endsWith('.png') || selectedFile.name.endsWith('.jpg')) ? (
                        <div className="h-full flex items-center justify-center p-8 animate-in zoom-in-50 duration-500">
                           <img src={selectedFile.content} alt="Preview" className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 ring-1 ring-white/5" />
                        </div>
                     ) : selectedFile?.name?.endsWith('.pdf') ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 gap-6 text-slate-400 animate-in fade-in duration-700">
                           <div className="w-24 h-24 rounded-[2rem] bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/20">
                              <FileText size={48} />
                           </div>
                           <div className="text-center">
                              <p className="text-sm font-black uppercase tracking-[0.2em] mb-1">Neural_Blueprint.pdf</p>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Encrypted document stream</p>
                           </div>
                           <Button variant="outline" size="sm" icon={<Plus size={14} />}>Open Securely</Button>
                        </div>
                     ) : (
                        selectedFile?.content || '// No file selected. Select an asset from the Workspace tree to preview.'
                     )}
                  </div>
                  {isPreviewOpen && (
                    <div className="w-1/3 border-l border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-black/30 p-8 flex flex-col items-center justify-center text-center animate-in slide-in-from-right duration-500">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-500 text-white flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20">
                           <Code2 size={32} />
                        </div>
                        <h5 className="font-black italic uppercase tracking-tighter text-sm mb-2">{selectedFile?.name || 'File Preview'}</h5>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Metadata Optimized Asset</p>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </DocsWrapper>

      {/* 3. Carousel Layout */}
      <DocsWrapper label="Interactive Carousel" description="Motion-driven hero slider with peek-ahead depth effects.">
        <Carousel
          items={carouselItems}
          peekCount={1}
          renderItem={(item: any, isActive: boolean) => (
            <div className={cn(
              "w-[260px] h-[360px] sm:w-[320px] sm:h-[420px] rounded-[3.5rem] p-10 flex flex-col justify-end text-white overflow-hidden relative transition-all duration-700",
              "bg-gradient-to-br", item.color,
              isActive ? "shadow-2xl shadow-indigo-500/30 scale-100" : "scale-90 opacity-30 blur-sm grayscale-[0.8]"
            )}>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={140} />
              </div>
              <div className="relative z-10">
                <h5 className="text-2xl font-black italic tracking-tighter mb-2">{item.title}</h5>
                <p className="text-[11px] font-medium opacity-80 leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            </div>
          )}
        />
      </DocsWrapper>

      {/* 4. Masonry Layout */}
      {/* <TwoColumnGrid> */}
        <DocsWrapper label="Masonry Grid" description="Fluid column distribution with interactive column selectors, hover-zoom, and lightbox navigation for varied aspect ratio image assets.">
           <MasonryGrid images={masonryImgs} />
        </DocsWrapper>

       
      {/* </TwoColumnGrid> */}
    </PageWrapper>
  );
};

const CouncilsShowcase = () => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showChat, setShowChat] = useState(false);

  const mockAgents = [
    { id: 'a1', name: 'Architect', role: 'System Design', color: '#6366f1' },
    { id: 'a2', name: 'Security', role: 'Risk Mitigation', color: '#f43f5e' },
    { id: 'a3', name: 'Ethics', role: 'Alignment Guard', color: '#10b981' },
    { id: 'a4', name: 'Analyst', role: 'Data Intelligence', color: '#f59e0b' },
  ];

  const [messages, setMessages] = useState<any[]>([
    {
      id: 'm1',
      role: 'system',
      isInitialRecommendation: true,
      content: "I've analyzed your request: 'How should we handle decentralized data sovereignty?'. I recommend a Council of 4 agents to reach a consensus.",
      actions: [
        { label: 'Approve & Start', variant: 'primary', icon: <Check size={14} />, onClick: () => console.log('Approved') },
        { label: 'Edit Counselors', variant: 'secondary', onClick: () => console.log('Edit') },
      ]
    }
  ]);

  const councils = [
    { id: 'c1', title: 'Data Sovereignty Protocol', description: 'Discussion on decentralizing data ownership for S3 clearance users.', agents: mockAgents.slice(0, 3), lastActive: '2m ago', messageCount: 24, status: 'active' as const },
    { id: 'c2', title: 'Ethical Guardrail Review', description: 'Reviewing the latest alignment benchmarks for Swarm-09.', agents: [mockAgents[2], mockAgents[0]], lastActive: '1h ago', messageCount: 12, status: 'concluded' as const },
    { id: 'c3', title: 'Security Mesh Architecture', description: 'Internal deliberation on the new firewall-less neural sync.', agents: [mockAgents[1], mockAgents[0], mockAgents[3]], lastActive: 'Yesterday', messageCount: 56, status: 'archived' as const },
  ];

  if (showChat) {
    return (
      <div className="h-[85vh] animate-in fade-in zoom-in-95 duration-500">
        <CouncilChatInterface
          title="Data Sovereignty Protocol"
          agents={mockAgents}
          messages={messages}
          onSendMessage={(content) => {
            const userMsg = { id: Date.now().toString(), role: 'user', content, timestamp: 'Just now' };
            setMessages(prev => [...prev, userMsg]);
            
            setTimeout(() => {
              const agentMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                agent: mockAgents[0],
                content: "From an architectural perspective, we need to ensure the decryption keys are geographically sharded across multiple validator nodes.",
                timestamp: 'Just now'
              };
              setMessages(prev => [...prev, agentMsg]);
            }, 1000);
          }}
          onClearChat={() => setMessages([])}
        />
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-4" 
          onClick={() => setShowChat(false)}
        >
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <PageWrapper title="Councils" description="Orchestrate collaborative AI deliberations. Councils allow multiple specialized agents to discuss complex topics and reach a consensus through multi-perspective reasoning." icon={BrainCircuit}>
       <div className="space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit">
               <button onClick={() => setViewMode('grid')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'grid' ? "bg-white dark:bg-slate-800 text-indigo-500 shadow-xl" : "text-slate-500")}>Grid View</button>
               <button onClick={() => setViewMode('list')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-800 text-indigo-500 shadow-xl" : "text-slate-500")}>List View</button>
             </div>
             
             <Button variant="primary" icon={<Plus size={14} />} onClick={() => setShowChat(true)}>New Council</Button>
          </div>

          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
             {councils.map(c => (
               <CouncilResourceCard
                 key={c.id}
                 {...c}
                 viewMode={viewMode}
                 onClick={() => setShowChat(true)}
               />
             ))}
          </div>

          <DocsWrapper label="Animated Prompt Component" description="Standalone premium input used in council chats.">
             <div className="p-12 bg-slate-100 dark:bg-slate-950/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                <AnimatedPromptInput 
                  value="" 
                  onChange={() => {}} 
                  placeholder="Test the animated gradient border..."
                />
             </div>
          </DocsWrapper>
       </div>
    </PageWrapper>
  );
};

function Showcase() {
  const { theme } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const [glowIntensity, setGlowIntensity] = useState(60);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [isCreateAgentModalOpen, setIsCreateAgentModalOpen] = useState(false);
  const [isAILabOpen, setIsAILabOpen] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [activeAiTab, setActiveAiTab] = useState(0);
  const [chatMode, setChatMode] = useState<'context' | 'terminal' | 'general'>('general');

  const [aiTabs, setAiTabs] = useState([
    { id: 0, title: 'Mission 1', messages: [{ role: 'assistant' as any, content: 'Ready to analyze NC-01 context. What is the objective?' }] }
  ]);

  const thoughts = [
    { timestamp: '01:25:01', content: 'SCANNING WORKSPACE: /Users/bilolwabona/BiloDev/clawesome' },
    { timestamp: '01:25:04', content: 'CONSTRUCTING PLAN: REFACTOR_DASHBOARD_V2', type: 'success' as const },
  ];

  const LinkComponent = ({ href, children, className }: any) => {
    return (
      <div
        onClick={() => navigate(href)}
        className={className}
      >
        {children}
      </div>
    );
  };

  return (
    <div className={cn(
      'flex h-screen overflow-hidden transition-colors duration-500',
      theme === 'dark' ? 'dark bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    )}>
      <Sidebar
        categories={categories}
        currentPath={location.pathname}
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={() => setIsMobileSidebarOpen(false)}
        logoFull={logo}
        LinkComponent={LinkComponent}
        user={{ name: 'BiloDev', clearance: 'ROLE: S3' }}
      />

      {/* spacer so content isn't under the fixed sidebar on mobile */}
      <div className="md:hidden h-0 w-0 flex-none" />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-8 md:p-16 pb-32 h-full">
          <div className="max-w-7xl mx-auto">
            {/* Mobile top-bar with hamburger */}
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className={cn(
                  'p-2.5 rounded-2xl border transition-all',
                  theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600 shadow-sm',
                )}
              >
                <Layers size={18} />
              </button>
              <span className={cn('text-sm font-black uppercase tracking-widest', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
                Clawesome UI
              </span>
            </div>
            <Routes>
              <Route path="/" element={<IntroductionPage />} />
              <Route path="/foundation/core" element={<FoundationPage />} />
              <Route path="/foundation/layouts" element={<LayoutsPage />} />
              <Route path="/ai/lab" element={<AILabPage historySearch={historySearch} setHistorySearch={setHistorySearch} />} />
              <Route path="/ai/agents" element={<AgentsPage setIsCreateAgentModalOpen={setIsCreateAgentModalOpen} setIsAILabOpen={setIsAILabOpen} />} />
              <Route path="/ai/councils" element={<CouncilsShowcase />} />
              <Route path="/portals/docs" element={<DocsPortalPage />} />
              <Route path="/portals/website" element={<WebsitePage />} />
              <Route path="/portals/dashboard" element={<DashboardPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/system/terminal" element={<SystemPage mode="terminal" />} />
              <Route path="/system/identity" element={<SystemPage mode="identity" />} />
              <Route path="*" element={<div className="h-[60vh] flex items-center justify-center font-black text-slate-500 italic uppercase">Module Pending Integration</div>} />
            </Routes>
          </div>
        </main>

        <BottomDock
          glowIntensity={glowIntensity}
          onGlowIntensityChange={setGlowIntensity}
          onToggleFocusMode={() => { }}
          isFocusMode={false}
          isSidebarExpanded={isSidebarExpanded}
        />

        <CommandModal
          isOpen={isCommandModalOpen}
          onClose={() => setIsCommandModalOpen(false)}
          search={commandSearch}
          onSearchChange={setCommandSearch}
          results={mockCommandResults}
          onSelect={(res) => {
            console.log('Selected:', res);
            setIsCommandModalOpen(false);
          }}
        />

        <CreateAgentModal
          isOpen={isCreateAgentModalOpen}
          onClose={() => setIsCreateAgentModalOpen(false)}
          onSubmit={(data) => {
            console.log('Deploying Agent:', data);
            setIsCreateAgentModalOpen(false);
          }}
        />

        <AILab
          isOpen={isAILabOpen}
          onClose={() => setIsAILabOpen(false)}
          onOpen={() => setIsAILabOpen(true)}
          showThoughts={showThoughts}
          onToggleThoughts={() => setShowThoughts(!showThoughts)}
          tabs={aiTabs}
          activeTab={activeAiTab}
          onTabSelect={setActiveAiTab}
          onAddTab={() => {
            const newId = aiTabs.length;
            setAiTabs([...aiTabs, { id: newId, title: `Mission ${newId + 1}`, messages: [] }]);
            setActiveAiTab(newId);
          }}
          onSendMessage={(content) => {
            const newTabs = [...aiTabs];
            newTabs[activeAiTab].messages.push({ role: 'user' as any, content });
            
            // Mock response based on mode
            setTimeout(() => {
              if (chatMode === 'terminal') {
                newTabs[activeAiTab].messages.push({ role: 'assistant' as any, content: `SUCCESS: Execution of "${content}" finalized in 42ms.\n\nNODE_STATUS: Nominal\nMEMORY_FLUSH: 0.2%` });
              } else if (chatMode === 'context') {
                newTabs[activeAiTab].messages.push({ role: 'assistant' as any, content: `Analyzing page depth... Current context: "${location.pathname}". I see 12 components and a neural fabric active.` });
              } else {
                newTabs[activeAiTab].messages.push({ role: 'assistant' as any, content: "Neural synthesis complete. How else can I assist with the Clawesome platform?" });
              }
              setAiTabs([...newTabs]);
            }, 600);

            setAiTabs([...newTabs]);
          }}
          thoughts={thoughts}
          isThinking={false}
          chatMode={chatMode}
          onChatModeChange={setChatMode}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Showcase />
      </Router>
    </ThemeProvider>
  );
}

export default App;
