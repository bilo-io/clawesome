// apps/dashboard/src/app/memory/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  Plus, 
  Youtube, 
  Link as LinkIcon, 
  FileText, 
  FileCode, 
  MoreVertical,
  ChevronDown,
  Loader2,
  X,
  Clock,
  ExternalLink,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

// Global Configuration
const MAX_DOCUMENTS = 10;

type DataType = 'link' | 'youtube' | 'pdf' | 'text';

interface DataPoint {
  id: string;
  type: DataType;
  name: string;
  content: string;
  status: 'processing' | 'ready';
  timestamp: string;
}

interface Memory {
  id: string;
  name: string;
  documents: DataPoint[];
  lastUpdated: string;
}

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const PDFIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h.01" />
    <path d="M12 15h.01" />
    <path d="M15 15h.01" />
  </svg>
);

export default function MemoriesPage() {
  const { theme } = useUIStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<DataType | null>(null);
  
  // Mock Data
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      name: 'Neural Architecture v2',
      documents: [
        { id: 'd1', type: 'pdf', name: 'Specification Doc', content: 'Neural specs...', status: 'ready', timestamp: '2h ago' },
        { id: 'd2', type: 'link', name: 'Reference Paper', content: 'https://arxiv.org/...', status: 'ready', timestamp: '3h ago' },
      ],
      lastUpdated: '2h ago'
    },
    {
      id: '2',
      name: 'Market Analysis Swarm',
      documents: [
        { id: 'd3', type: 'youtube', name: 'Competitor Review', content: 'youtube.com/...', status: 'ready', timestamp: '1d ago' },
        { id: 'd4', type: 'text', name: 'Raw Notes', content: 'Market trends...', status: 'ready', timestamp: '1d ago' },
      ],
      lastUpdated: '1d ago'
    }
  ]);

  const filteredMemories = useMemo(() => {
    return memories.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [memories, searchQuery]);

  // Handle adding new data point to the FIRST memory for demo purposes
  const handleAddDataPoint = (type: DataType, name: string, content: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newDataPoint: DataPoint = {
      id: newId,
      type,
      name,
      content,
      status: 'processing',
      timestamp: 'just now'
    };

    setMemories(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        // Add to the top of the specialized "documents" list of the first memory
        updated[0] = {
          ...updated[0],
          documents: [newDataPoint, ...updated[0].documents].slice(0, MAX_DOCUMENTS),
          lastUpdated: 'just now'
        };
      }
      return updated;
    });

    // Simulate processing
    setTimeout(() => {
      setMemories(prev => {
        const updated = [...prev];
        updated[0].documents = updated[0].documents.map(d => 
          d.id === newId ? { ...d, status: 'ready' } : d
        );
        return updated;
      });
    }, 4000);

    setActiveModal(null);
  };

  return (
    <main className="space-y-12 pb-20 max-w-[1600px] mx-auto transition-colors duration-300">
      <DashboardResourceHeader
        title="Memories"
        description="Persistent neural context and cognitive archives. Store and retrieve multi-modal data points to provide agents with extensive background knowledge and situational awareness."
        badge="NC-NEURAL CONTEXT"
        statusLabel="Context Capacity:"
        statusValue={`${memories.length} Clusters ACTIVE`}
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search context clusters..."
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        renderRight={
           <div className="relative">
              <button
                onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] hover:opacity-90 text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
              >
                <Plus size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Data to Core</span>
                <ChevronDown className={cn("transition-transform", isAddDropdownOpen && "rotate-180")} size={16} />
              </button>

              <AnimatePresence>
                {isAddDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsAddDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn(
                        "absolute right-0 mt-4 w-72 rounded-xl border p-2 shadow-2xl z-50 overflow-hidden",
                        theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                      )}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { type: 'link', icon: <LinkIcon size={18} />, label: 'Web URL', desc: 'Sync live research data', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)' },
                          { type: 'youtube', icon: <YoutubeIcon />, label: 'YouTube Video', desc: 'Ingest visual logic', color: '#FF0000', bgColor: 'rgba(255, 0, 0, 0.1)' },
                          { type: 'pdf', icon: <PDFIcon />, label: 'PDF Document', desc: 'Parse technical specs', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
                          { type: 'text', icon: <FileCode size={18} />, label: 'Raw Script', desc: 'Direct code injection', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
                        ].map((item) => (
                          <button
                            key={item.type}
                            onClick={() => {
                              setActiveModal(item.type as DataType);
                              setIsAddDropdownOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-4 p-3 rounded-lg transition-all text-left group",
                              theme === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-50"
                            )}
                          >
                            <div 
                              className="p-2.5 rounded-lg transition-all flex items-center justify-center"
                              style={{ 
                                backgroundColor: item.bgColor, 
                                color: item.color 
                              }}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <p className={cn("text-xs font-black uppercase tracking-widest", theme === 'dark' ? "text-white" : "text-slate-900")}>{item.label}</p>
                              <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
           </div>
        }
      />

      {/* Memory View Content */}
      <div className={cn(
        viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((memory) => (
            <motion.div 
              layout 
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {viewMode === 'grid' ? (
                <MemoryCard memory={memory} theme={theme} />
              ) : (
                <MemoryListItem memory={memory} theme={theme} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals for Add Data */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className={cn(
                "absolute inset-0 backdrop-blur-md transition-colors",
                theme === 'dark' ? "bg-slate-950/80" : "bg-slate-900/40"
              )}
            />
            
            <AddDataModal 
              type={activeModal} 
              onClose={() => setActiveModal(null)} 
              onSubmit={(name, content) => handleAddDataPoint(activeModal, name, content)}
              theme={theme}
            />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Sub-components
function MemoryCard({ memory, theme }: { memory: Memory, theme: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        "group p-8 rounded-[48px] border shadow-2xl relative overflow-hidden transition-all h-full",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-black/40" : "bg-white border-slate-100 shadow-slate-200/50"
      )}
    >
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500">
           <Brain size={28} />
        </div>
        <button className={cn(
          "p-2 rounded-full border transition-colors",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-400"
        )}>
           <MoreVertical size={16} />
        </button>
      </div>

      <div className="relative z-10">
        <h3 className={cn("text-2xl font-black tracking-tight mb-2", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {memory.name}
        </h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-8", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Updated {memory.lastUpdated}
        </p>

        <div className="space-y-3">
          {memory.documents.map((doc) => (
            <div 
              key={doc.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-full border text-sm transition-all",
                theme === 'dark' ? "bg-slate-950 border-slate-800/50" : "bg-slate-50 border-slate-100"
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0",
                  doc.type === 'youtube' ? 'text-red-500' :
                  doc.type === 'pdf' ? 'text-amber-500' :
                  doc.type === 'link' ? 'text-blue-500' : 'text-emerald-500'
                )}>
                   {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                   {doc.type === 'pdf' && <PDFIcon size={14} />}
                   {doc.type === 'link' && <LinkIcon size={14} />}
                   {doc.type === 'text' && <FileCode size={14} />}
                </div>
                <span className={cn("font-bold truncate", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                  {doc.name}
                </span>
              </div>
              
              {doc.status === 'processing' ? (
                <Loader2 size={12} className="text-indigo-500 animate-spin" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              )}
            </div>
          ))}
          {memory.documents.length === 0 && (
            <p className="text-xs text-slate-500 italic p-4 text-center">Neural void. Add data to begin.</p>
          )}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
    </div>
  );
}

function MemoryListItem({ memory, theme }: { memory: Memory, theme: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        "p-6 rounded-[32px] border transition-all flex items-center justify-between group h-full",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900" : "bg-white border-slate-100 hover:shadow-xl shadow-slate-200/50"
      )}
    >
      <div className="flex items-center gap-6">
        <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500">
           <Brain size={20} />
        </div>
        <div>
          <h3 className={cn("text-lg font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
            {memory.name}
          </h3>
          <p className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
            {memory.documents.length}/{MAX_DOCUMENTS} Units <span className="text-slate-700">•</span> Updated {memory.lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
            {memory.documents.slice(0, 3).map((doc, i) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden",
                theme === 'dark' ? "bg-slate-950 border-slate-900 shadow-xl" : "bg-white border-slate-50 shadow-sm"
              )}>
                 {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                 {doc.type === 'pdf' && <PDFIcon size={14} />}
                 {doc.type === 'link' && <LinkIcon size={14} className="text-blue-500" />}
                 {doc.type === 'text' && <FileCode size={14} className="text-emerald-500" />}
              </div>
            ))}
        </div>
        <button className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 hover:text-white" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
        )}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

interface ModalProps {
  type: DataType;
  onClose: () => void;
  onSubmit: (name: string, content: string) => void;
  theme: 'light' | 'dark';
}

function AddDataModal({ type, onClose, onSubmit, theme }: ModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  
  const iconMap = {
    youtube: <YoutubeIcon size={28} />,
    link: <LinkIcon size={28} className="text-blue-500" />,
    pdf: <PDFIcon size={28} />,
    text: <FileCode size={28} className="text-emerald-500" />
  };

  const labelMap = {
    youtube: 'Video URL',
    link: 'Resource URL',
    pdf: 'File Link / Path',
    text: 'Neural Snippet'
  };

  const titleMap = {
    youtube: 'Ingest YouTube Intelligence',
    link: 'Connect Remote Resource',
    pdf: 'Process PDF Document',
    text: 'Save Memory Fragment'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "relative w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden border transition-all z-[110]",
        theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-black/60" : "bg-white border-slate-100 shadow-slate-200/60"
      )}
    >
      <div className="p-10">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-5">
             <div className={cn(
               "p-3 rounded-full shadow-lg border transition-all",
               theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
             )}>
                {iconMap[type]}
             </div>
             <div>
                <h2 className={cn("text-3xl font-extrabold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {titleMap[type]}
                </h2>
                <p className={cn("text-sm font-medium", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                  Expand the neural context layer.
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className={cn(
              "p-3 rounded-full transition-all border shadow-sm",
              theme === 'dark' 
                ? "bg-slate-950 text-slate-500 border-slate-800 hover:text-white" 
                : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900"
            )}
          >
            <X size={20} />
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, content);
          }} 
          className="space-y-8"
        >
          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              Context Label
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Core Algorithm Specs"
              className={cn(
                "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                theme === 'dark' 
                  ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                  : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
              )}
            />
          </div>

          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {labelMap[type]}
            </label>
            {type === 'text' ? (
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter raw text context..."
                rows={4}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none resize-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            ) : (
              <input
                type="text"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...'}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            )}
          </div>

          <div className="pt-8 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 px-8 py-4 rounded-[20px] font-bold uppercase tracking-widest text-[11px] transition-all border shadow-sm",
                theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-slate-900"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-8 py-4 rounded-[20px] bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white font-bold uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 transition-all active:translate-y-1"
            >
              Initiate Ingestion
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
