import { useState } from 'react';
import { 
  DashboardResourceHeader, 
  TestComponent, 
  Button, 
  Card,
  ThemeProvider,
  useUI
} from './index';

function Showcase() {
  const { theme, toggleTheme } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className={`min-h-screen p-8 transition-colors ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-[1400px] mx-auto space-y-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Clawesome UI Showcase</h1>
            <p className="text-slate-500 font-bold tracking-widest text-[10px] uppercase mt-2 italic">Neural Component System • V1.0.0</p>
          </div>
          <Button onClick={toggleTheme} variant="outline" size="sm">
            TOGGLE {theme === 'dark' ? 'LIGHT' : 'DARK'} MODE
          </Button>
        </header>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Foundation</h2>
             <div className="h-px flex-1 bg-gradient-to-l from-indigo-500/50 to-transparent" />
          </div>
          
          <DashboardResourceHeader
            title="UI Explorer"
            description="A comprehensive view of all shared components in the Clawesome design system. Use this to verify styles, transitions, and theme responsiveness."
            badge="SYSTEM_CORE"
            statusLabel="Library Status:"
            statusValue="Active & Synced"
            statusColor="indigo"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isCollection={true}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSelectAll={() => console.log('Select All clicked')}
          />
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Atomic Components</h2>
             <div className="h-px flex-1 bg-gradient-to-l from-emerald-500/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4">
              <h3 className="text-lg font-bold tracking-tight mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </Card>

            <Card className="p-8 space-y-4">
              <h3 className="text-lg font-bold tracking-tight mb-4">Verification</h3>
              <TestComponent />
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}
