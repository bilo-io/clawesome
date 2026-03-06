'use client';

import { PageHeader, ContextAccordion, SkillCard, AgentCard, CodeBlock, SegmentedControl, SlideToConfirm, PermissionToggle, QuickActions, SystemVitality } from "@clawesome/ui";

export default function ComponentsPage() {
  const demoSkill = {
    id: "docs-skill",
    name: "Doc Gen",
    description: "Automatically parses code into developer-friendly markdown instructions.",
    icon: "FileText",
    content: "pnpm run docs:generate",
    isMarketplace: false
  };

  const demoAgent = {
    id: "docs-agent",
    name: "C-3PO",
    title: "Protocol Droid Analyst",
    profilePicture: "https://images.unsplash.com/photo-1531297172864-45d0b9815bb2?w=200&h=200&auto=format&fit=crop",
    createdAt: Date.now()
  };

  return (
    <div className="space-y-24 animate-in fade-in duration-500 pb-32">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Component Library</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          The central atomic design system for Clawesome UI. All visual components below are imported from `packages/ui`.
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Headers & Typography
        </h2>
        <PageHeader 
          title="Component Page" 
          statusLabel="Stability Index:"
          statusValue="Stable 1.0"
          statusColor="emerald"
          description="A standard PageHeader used across Clawesome interfaces."
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Accordions
        </h2>
        <ContextAccordion title="UI CONFIGURATION" defaultOpen>
          <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Configure global style tokens like rounded corners and glow values inside your custom ThemeProvider block. Everything syncs via React Context.
          </div>
        </ContextAccordion>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCard skill={demoSkill} viewMode="grid" />
          <AgentCard agent={demoAgent} viewMode="grid" />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Interaction Elements
        </h2>
        <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-12 bg-slate-50/20 backdrop-blur-sm dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 p-12 rounded-[40px]">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Controls</span>
            <SegmentedControl options={['Active', 'Archived', 'All']} value="Active" onChange={() => {}} />
            <div className="pt-4">
              <SlideToConfirm label="SLIDE FOR MORE" onConfirm={() => {}} />
            </div>
          </div>
          <div className="space-y-4">
             <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Toggles</span>
             <PermissionToggle />
          </div>
        </div>
      </section>

      <section className="space-y-8">
         <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Metrics & Dashboards
        </h2>
        <SystemVitality />
      </section>
      
      <section className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Quick Actions Menu
        </h2>
         <QuickActions />
      </section>
      
    </div>
  );
}
