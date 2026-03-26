'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Plus, 
  ChevronDown,
  ChevronLeft,
  Search,
  AudioLines,
  Presentation,
  Video,
  Network,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useMemoryStore, MAX_DOCUMENTS, DataType } from '@/store/useMemoryStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { YoutubeIcon, PDFIcon, AddDataModal } from '../components/AddDataModal';
import { FileCode, Link as LinkIcon } from 'lucide-react';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentListItem } from '../components/DocumentListItem';

export default function MemoryDetailPage() {
  const { theme } = useUIStore();
  const { id } = useParams() as { id: string };
  const router = useRouter();
  
  const { memories, addDataPoint, updateDataPointStatus } = useMemoryStore();
  const memory = memories.find((m) => m.id === id);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<DataType | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  if (!memory) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <h1 className="text-2xl font-bold">Memory Not Found</h1>
        <button onClick={() => router.push('/ai/memory')} className="px-6 py-2 rounded-full border border-slate-200">Go Back</button>
      </div>
    );
  }

  const filteredDocs = useMemo(() => {
    return memory.documents.filter((d: any) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [memory.documents, searchQuery]);

  const handleAddDataPoint = (type: DataType, name: string, content: string) => {
    addDataPoint(memory.id, type, name, content);
    
    // Simulate processing
    setTimeout(() => {
       const newestDoc = useMemoryStore.getState().memories.find(m => m.id === memory.id)?.documents[0];
       if (newestDoc) {
          updateDataPointStatus(memory.id, newestDoc.id, 'ready');
       }
    }, 4000);

    setActiveModal(null);
  };

  return (
    <main className="space-y-12 pb-20 max-w-[1600px] mx-auto transition-colors duration-300">
      <DashboardResourceHeader
        title={memory.name}
        description={`Manage the neural context and cognitive archives for this cluster. Max capacity is ${MAX_DOCUMENTS} data sources per memory.`}
        badge="NC-NEURAL CONTEXT"
        statusLabel="Context Capacity:"
        statusValue={`${memory.documents.length} / ${MAX_DOCUMENTS} ACTIVE`}
        statusColor="emerald"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search data points..."
        viewMode={viewMode}
        onViewModeChange={(v: any) => setViewMode(v)}
        renderRight={
           <div className="relative">
              <button
                disabled={memory.documents.length >= MAX_DOCUMENTS}
                onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-full font-bold shadow-xl transition-all active:translate-y-1",
                  memory.documents.length >= MAX_DOCUMENTS 
                   ? "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed opacity-50" 
                   : "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] hover:opacity-90 text-white shadow-purple-600/20"
                )}
              >
                <Plus size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add to Memory</span>
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
                          { type: 'youtube', icon: <YoutubeIcon size={18} />, label: 'YouTube Video', desc: 'Ingest visual logic', color: '#FF0000', bgColor: 'rgba(255, 0, 0, 0.1)' },
                          { type: 'pdf', icon: <PDFIcon size={18} />, label: 'PDF Document', desc: 'Parse technical specs', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
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

      <div className="flex px-4 items-center gap-4 -mt-6">
        <button 
          onClick={() => router.push('/ai/memory')}
          className={cn(
             "flex items-center gap-2 p-2 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest",
             theme === 'dark' ? "text-slate-400 hover:bg-slate-900 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <ChevronLeft size={16} /> Back to Clusters
        </button>
      </div>

      {/* Memory Sources Content */}
      <div className={cn(
        viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredDocs.map((doc: any) => (
            <motion.div 
              layout 
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {viewMode === 'grid' ? (
                <DocumentCard doc={doc} theme={theme} onClick={() => setPreviewDoc(doc)} />
              ) : (
                <DocumentListItem doc={doc} theme={theme} onClick={() => setPreviewDoc(doc)} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredDocs.length === 0 && (
          <div className={cn(
             "col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-[48px]",
             theme === 'dark' ? "border-slate-800" : "border-slate-200"
          )}>
            <div className={cn(
               "p-6 rounded-full mb-6",
               theme === 'dark' ? "bg-slate-900 text-slate-700" : "bg-slate-50 text-slate-200"
            )}>
              <FileCode size={48} />
            </div>
            <h2 className={cn("text-xl font-black mb-2", theme === 'dark' ? "text-white" : "text-slate-800")}>
              No Data Synthesized
            </h2>
            <p className={cn("text-sm max-w-sm", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
              Add data sources using the button in the header. Each cluster supports up to {MAX_DOCUMENTS} specific sources to inform agent actions.
            </p>
          </div>
        )}
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

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewDoc(null)}
              className={cn(
                "absolute inset-0 backdrop-blur-lg transition-colors",
                theme === 'dark' ? "bg-slate-950/90" : "bg-slate-900/60"
              )}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full max-w-4xl h-[80vh] flex flex-col rounded-[40px] shadow-2xl overflow-hidden border",
                theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
              )}
            >
              <div className="flex items-center justify-between p-6 px-8 border-b border-slate-800/10 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-xl", theme === 'dark' ? "bg-slate-900" : "bg-slate-100")}>
                     {previewDoc.type === 'youtube' && <YoutubeIcon size={20} />}
                     {previewDoc.type === 'pdf' && <PDFIcon size={20} />}
                     {previewDoc.type === 'link' && <LinkIcon size={20} />}
                     {previewDoc.type === 'text' && <FileCode size={20} />}
                  </div>
                  <h3 className={cn("text-xl font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                    {previewDoc.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors pointer-events-auto"
                >
                  <div className={cn("p-2 rounded-full border transition-colors", theme === 'dark' ? "bg-slate-900 border-slate-800 hover:text-white" : "bg-slate-50 border-slate-200 hover:text-slate-900")}>
                    <ChevronDown size={20} className="rotate-45" />
                  </div>
                </button>
              </div>
              <div className="flex-1 w-full relative bg-slate-100 dark:bg-[#020617] p-4 md:p-8 overflow-hidden rounded-b-[40px]">
                {previewDoc.type === 'youtube' && (
                  <iframe 
                    className="w-full h-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800"
                    src={`https://www.youtube.com/embed/${previewDoc.content.includes('v=') ? previewDoc.content.split('v=')[1]?.split('&')[0] : 'dQw4w9WgXcQ'}`} 
                    allowFullScreen 
                  />
                )}
                {previewDoc.type === 'pdf' && (
                  <iframe 
                    className="w-full h-full rounded-2xl shadow-xl bg-white border border-slate-200 dark:border-slate-800"
                    src={previewDoc.content.startsWith('http') ? previewDoc.content : `${previewDoc.content}#toolbar=0`}
                  />
                )}
                {previewDoc.type === 'text' && (
                  <div className="w-full h-full overflow-y-auto rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                     <pre className="font-mono text-sm whitespace-pre-wrap">{previewDoc.content}</pre>
                  </div>
                )}
                {previewDoc.type === 'link' && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-10 text-center">
                     <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <ExternalLink size={40} />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold mb-2">Remote Resource Preview</h3>
                       <p className="text-sm text-slate-500 max-w-sm mb-8">This resource is an external web link. Click below to securely open it in a new tab.</p>
                       <a 
                         href={previewDoc.content.startsWith('http') ? previewDoc.content : `https://${previewDoc.content}`} 
                         target="_blank" 
                         rel="noreferrer"
                         className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                       >
                         Open Source Link
                       </a>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Summary Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full border shadow-2xl backdrop-blur-xl transition-all",
          theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
             <Sparkles size={16} className="text-white" />
          </div>
          <div className={cn("w-[1px] h-6 mx-2", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")} />
          
          <button className={cn("p-2 rounded-full transition-all group", theme === 'dark' ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500")} title="Audio Summary">
             <AudioLines size={18} className="group-hover:text-[#008FD6]" />
          </button>
          <button className={cn("p-2 rounded-full transition-all group", theme === 'dark' ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500")} title="Slideshow Summary">
             <Presentation size={18} className="group-hover:text-amber-500" />
          </button>
          <button className={cn("p-2 rounded-full transition-all group", theme === 'dark' ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500")} title="Video Summary">
             <Video size={18} className="group-hover:text-red-500" />
          </button>
          <button className={cn("p-2 rounded-full transition-all group", theme === 'dark' ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500")} title="Mind Map Summary">
             <Network size={18} className="group-hover:text-emerald-500" />
          </button>
        </div>
      </div>
    </main>
  );
}
