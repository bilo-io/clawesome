import { CodePreview } from "../../components/CodePreview";

export default function ArchitecturePage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">System Architecture</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Learn how the monolithic frontend separates concerns while keeping state synchronized dynamically via React Context and LocalStorage.
        </p>
      </header>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-3">
             <h3 className="text-xl font-bold tracking-tight">Decentralized Tools</h3>
             <p className="text-sm leading-relaxed text-slate-500">Skills and Agents act as standalone entities linked into memory via UUIDs. This separation reduces monolithic friction.</p>
          </div>
          <div className="p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-3">
             <h3 className="text-xl font-bold tracking-tight">Unified UI</h3>
             <p className="text-sm leading-relaxed text-slate-500">Instead of rewriting UI logic across instances, the <code>/ui</code> package enforces design language system-wide.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Neural Data Mesh
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
           Underneath the hood, React Context distributes the currently active UI configurations, including `ThemeProvider` which handles both theme switching and glow adjustments.
        </p>
        <CodePreview 
          language="typescript"
          code={`// Global Theme Injection in Next.js\nimport { ThemeProvider } from '@clawesome/ui';\n\nexport default function RootLayout({ children }) {\n  return (\n    <ThemeProvider>\n      {children}\n    </ThemeProvider>\n  );\n}`} 
        />
      </section>
    </div>
  );
}
