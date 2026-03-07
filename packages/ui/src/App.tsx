import { useState } from 'react';
import { 
  ThemeProvider, 
  useUI, 
  // TestComponent,
  PageHeader,
  // SegmentedControl,
  // SlideToConfirm,
  // ContextAccordion,
  // CodeBlock,
  // SkillCard,
  // AgentCard,
  // PermissionToggle,
  // QuickActions,
  // SystemVitality,
  // ActivityHeatmap,
  // GitHeatmap,
  // ResourceChart,
  // NetworkRadial,
  // ContainerMonitor,
  // ProjectPulse,
  // CostTracker,
  // DashboardResourceHeader,
  // IntegrationCard,
  // WorkspaceGallery,
  // WorkspaceTabs,
  BottomDock,
  CommandModal,
  CreateAgentModal,
  SmartHistorySearch,
  AILab,
  FilesystemSandbox,
  Sidebar,
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
  TopBar,
  DocPlaceholder
} from './index';
import logo from './assets/clawesome-logo.svg';
import { 
  Settings, Globe, /* User as UserIcon, Zap, Code, */ Shield, /* Activity, Layers, Briefcase, Globe, */ HelpCircle, Terminal, Bot, 
  /* LayoutDashboard, Layout, MessageSquare, */ BrainCircuit, Blocks, Brain, FolderKanban, MessageCircle, ListTodo, BarChart3, Cpu, Sliders, Plug, /* ShieldAlert, */ Sparkles
} from 'lucide-react';

/*
const mockIntegration = {
  id: 'slack',
  name: 'Slack',
  description: 'Sync neural signals across team communication channels.',
  icon: MessageSquare,
  status: 'active' as const,
  orgId: 'slack'
};

const mockWorkspaces = [
  { 
    id: '1', 
    icon: Briefcase, 
    name: 'clawesome Core', 
    path: '~/BiloDev/clawesome', 
    status: 'Active', 
    color: 'indigo',
    agents: [{ id: 'a1', color: 'bg-indigo-500' }, { id: 'a2', color: 'bg-emerald-500' }]
  },
  { 
    id: '2', 
    icon: Globe, 
    name: 'Cloud Infra', 
    path: '~/cloud-configs', 
    status: 'Idle', 
    color: 'emerald',
    agents: [{ id: 'a3', color: 'bg-emerald-400' }]
  },
];

const mockTabs = [
  { id: '1', title: 'Local', type: 'system' },
  { id: '2', title: 'Sandbox 1', type: 'app' },
];
*/

const mockCommandResults = [
  { icon: Terminal, label: 'Run: bun run server.ts', category: 'Commands' },
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

const mockSidebarCategories = [
  {
    title: 'AI',
    items: [
      { icon: Bot, label: 'Agents', href: '/agents' },
      { icon: BrainCircuit, label: 'Swarms', href: '/swarms' },
      { icon: Blocks, label: 'Skills', href: '/skills' },
      { icon: Brain, label: 'Memories', href: '/memory' },
      { icon: FolderKanban, label: 'Projects', href: '/projects' },
    ]
  },
  {
    title: 'OPS',
    items: [
      { icon: MessageCircle, label: 'Chats', status: 'active' as const, href: '/chat' },
      { icon: ListTodo, label: 'Logs', href: '/logs' },
      { icon: BarChart3, label: 'Usage', href: '/usage' },
      { icon: Cpu, label: 'Analytics', href: '/analytics' },
    ]
  },
  {
    title: 'Sys',
    items: [
      { icon: Sliders, label: 'Config', href: '/config' },
      { icon: Plug, label: 'Integrations', href: '/integrations', status: 'active' as const },
      { icon: Settings, label: 'Settings', href: '/settings' },
      { icon: Shield, label: 'Security', href: '/security' },
    ]
  },
  {
    title: 'Portal Components',
    items: [
      { icon: BrainCircuit, label: 'Docs System', href: '#docs' },
      { icon: MessageCircle, label: 'Website Landing', href: '#website' },
    ]
  }
];

function Showcase() {
  const { theme, setTheme } = useUI();
  // const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [glowIntensity, setGlowIntensity] = useState(60);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [isCreateAgentModalOpen, setIsCreateAgentModalOpen] = useState(false);
  const [isAILabOpen, setIsAILabOpen] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [aiTabs, setAiTabs] = useState([
    { id: 0, title: 'Mission 1', messages: [{ role: 'assistant' as const, content: 'Ready to analyze NC-01 context. What is the objective?' }] }
  ]);
  const [activeAiTab, setActiveAiTab] = useState(0);

  /*
  const demoSkill = {
    id: 'demo-skill',
    name: 'Neural Refactor',
    description: 'Autonomous code analysis and optimization engine with real-time feedback loop.',
    icon: 'Terminal',
    content: 'npx clawesome refactor --target ./src',
    isMarketplace: false
  };
  */

  /*
  const demoAgent = {
    id: 'demo-agent-uuid-001',
    name: 'ELARA-7',
    title: 'Senior Logic Architect',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop',
    createdAt: Date.now()
  };
  */

  const thoughts = [
    { timestamp: '01:25:01', content: 'SCANNING WORKSPACE: /Users/bilolwabona/BiloDev/clawesome' },
    { timestamp: '01:25:04', content: 'CONSTRUCTING PLAN: REFACTOR_DASHBOARD_V2', type: 'success' as const },
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <Sidebar 
        categories={mockSidebarCategories}
        currentPath="/chat"
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        logoFull={logo}
        user={{
           name: 'BiloDev',
           clearance: 'OP_CLEARANCE: S3'
        }}
      />

      <div className="flex-1 max-w-7xl mx-auto p-8 md:p-16 space-y-24 overflow-y-auto h-screen no-scrollbar">
        
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-800/20 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <a 
                href={(import.meta as any).env.VITE_DASHBOARD_URL || 'http://localhost:3000'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Open Dashboard"
              >
                <img src={logo} alt="Clawesome Logo" className="w-16 h-16" />
              </a>
              <h1 className="text-6xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">@clawesome</span>
                <span className={theme === 'dark' ? "text-white" : "text-black"}>/ui</span>
              </h1>
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">
              Shared Component Infrastructure for NightClaw OS
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/40 p-2 rounded-full border border-slate-800">
            <button 
              onClick={() => setTheme('light')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Dark
            </button>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><Shield size={20} /></span>
              Foundation
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {/* <TestComponent /> */}
            
            <PageHeader 
              title="NETWORK TOPOLOGY" 
              statusLabel="System Integrity:"
              statusValue="High-Fidelity"
              statusColor="emerald"
              description="Visual interface for monitoring neural connections and node vitality across the decentralized workforce cluster."
            />
          </div>
        </section>

        {/* System Intelligence Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><Sparkles size={20} /></span>
              Intelligence & Sandbox
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
             <div className="max-w-xl">
               <FilesystemSandbox 
                 tree={mockSandbox}
                 mountedCount={3}
                 totalCount={4}
               />
             </div>
             <div className="space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">History Feed</span>
                <SmartHistorySearch 
                  items={mockHistory}
                  search={historySearch}
                  onSearchChange={setHistorySearch}
                />
             </div>
          </div>
        </section>

        {/* Modal & Overlay Section */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-slate-500/10 text-slate-500 rounded-xl"><Terminal size={20} /></span>
              Modals & Overlays
            </h2>
            <div className="h-1 w-20 bg-slate-500 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-6">
             <button 
               onClick={() => setIsCommandModalOpen(true)}
               className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-3"
             >
                <Terminal size={18} />
                Open Command Modal
                <span className="px-2 py-0.5 bg-indigo-700 rounded border border-indigo-400/30 text-[9px]">⌘K</span>
             </button>

             <button 
               onClick={() => setIsCreateAgentModalOpen(true)}
               className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 flex items-center gap-3"
             >
                <Bot size={18} />
                Deploy New Soul
             </button>

             <button 
               onClick={() => setIsAILabOpen(true)}
               className="px-8 py-4 rounded-2xl bg-slate-800 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-black/20 hover:bg-slate-700 transition-all active:scale-95 flex items-center gap-3 border border-slate-700"
             >
                <MessageCircle size={18} />
                Open AI Lab
             </button>
          </div>

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
               setAiTabs(newTabs);
            }}
            thoughts={thoughts}
            isThinking={false}
          />
        </section>

        {/* Doc Portal Section */}
        <section id="docs" className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl"><BrainCircuit size={20} /></span>
              Doc Portal
            </h2>
            <div className="h-1 w-20 bg-emerald-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Code Preview</span>
                <CodePreview 
                  code={`async function clawesome() {\n  const agents = await swarm.deploy(5);\n  return agents.execute('MISSION_REFACTOR');\n}`}
                  language="javascript"
                />
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Command Runner</span>
                <CommandPreview commands={{
                  npm: 'npm install @clawesome/cli',
                  pnpm: 'pnpm add @clawesome/cli',
                  yarn: 'yarn add @clawesome/cli',
                  bun: 'bun add @clawesome/cli'
                }} />
             </div>
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Language Variants</span>
                <LanguagePreview 
                  blocks={[
                    { label: 'TypeScript', language: 'typescript', code: 'type Agent = { id: string; };' },
                    { label: 'Rust', language: 'rust', code: 'struct Agent { id: String }' },
                    { label: 'Python', language: 'python', code: 'class Agent: pass' }
                  ]}
                />
             </div>
          </div>
          
          <div className="p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden relative">
             <div className="flex gap-8 items-start">
                <div className="w-64 shrink-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden h-[400px]">
                   <DocsSidebar />
                </div>
                <div className="flex-1 space-y-8">
                   <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <TopBar />
                   </div>
                   <DocPlaceholder title="Neural Fabric" description="The backbone of autonomous agentic swarms." />
                </div>
             </div>
          </div>
        </section>

        {/* Website Landing Section */}
        <section id="website" className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><Globe size={20} /></span>
              Portal Landing
            </h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>

          <div className="space-y-24 border border-slate-200 dark:border-slate-800 p-8 rounded-[64px] bg-slate-50/30 dark:bg-black/40 overflow-hidden relative">
             <BackgroundAnimated />
             <WebsiteNavbar />
             <div className="scale-90 origin-top">
                <WebsiteHero />
             </div>
             <LogoCloud />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Features />
                <div className="space-y-12">
                   <Faqs />
                   <Donate />
                </div>
             </div>
             <Testimonials />
             <WebsiteFooter />
          </div>
        </section>

        {/* Floating Controls */}
        <BottomDock 
          glowIntensity={glowIntensity}
          onGlowIntensityChange={setGlowIntensity}
          onToggleFocusMode={() => {}}
          isFocusMode={false}
          isSidebarExpanded={isSidebarExpanded}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}

export default App;
