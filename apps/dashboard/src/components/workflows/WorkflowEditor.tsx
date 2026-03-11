'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { 
  Plus, 
  Play, 
  StopCircle, 
  Settings, 
  Share2, 
  Download, 
  Code, 
  List as ListIcon, 
  LayoutDashboard,
  ChevronRight,
  Zap,
  Bot,
  Plug,
  MoreVertical,
  Maximize2,
  Minimize2,
  Database,
  Clock,
  GitBranch,
  Upload,
  MessageSquare,
  Search,
  Check,
  X
} from 'lucide-react';
import { 
  ReactFlow, 
  addEdge, 
  Background, 
  Controls, 
  MiniMap, 
  Connection, 
  Edge, 
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { Workflow, WorkflowNode, WorkflowEdge } from '@antigravity/core';

// --- Custom Node Types ---

interface CustomNodeData {
  label: string;
  description?: string;
  type?: string;
  status?: 'idle' | 'running' | 'completed' | 'failed';
  input?: any;
  output?: any;
  [key: string]: any;
}

const CustomNode = ({ data, selected }: NodeProps<Node<CustomNodeData>>) => {
  const { theme } = useUIStore();
  const isTrigger = data.type?.toLowerCase() === 'trigger';
  
  const getNodeIcon = () => {
    if (data.status === 'completed') return <Check size={14} className="text-emerald-500" />;
    if (data.status === 'failed') return <X size={14} className="text-rose-500" />;
    
    switch (data.type?.toLowerCase()) {
      case 'start': return <Play size={14} fill="currentColor" />;
      case 'trigger': return <Zap size={14} />;
      case 'agent': return <Bot size={14} />;
      case 'logic': return <GitBranch size={14} />;
      case 'tool':
        if (data.label?.toLowerCase().includes('slack')) return <MessageSquare size={14} />;
        if (data.label?.toLowerCase().includes('upload')) return <Upload size={14} />;
        return <Database size={14} />;
      default: return <Zap size={14} />;
    }
  };

  return (
    <div className={cn(
      "px-4 py-3 rounded-2xl border min-w-[200px] shadow-2xl transition-all relative",
      selected 
        ? "border-indigo-500 shadow-indigo-500/20 scale-105" 
        : (theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"),
      isTrigger && (theme === 'dark' 
        ? "border-indigo-500/50 bg-indigo-500/5 shadow-[0_0_20px_rgba(99,102,241,0.1)]" 
        : "border-indigo-200 bg-indigo-50/50 shadow-[0_0_20px_rgba(99,102,241,0.05)]")
    )}>
      {data.status === 'running' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10 overflow-visible">
           <rect x="0" y="0" width="100%" height="100%" rx="16" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="12 12" className="text-indigo-500">
             <animate attributeName="stroke-dashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
           </rect>
        </svg>
      )}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
        {isTrigger && (
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <Zap size={40} className="text-indigo-500" />
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-indigo-500 border-2 border-slate-950 z-20" />
      
      <div className="relative flex items-center justify-between mb-2 z-20">
         <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                {getNodeIcon()}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {data.type || 'Step'}
            </span>
         </div>
      </div>

      <div className="space-y-1">
         <h4 className={cn("text-xs font-black uppercase truncate", theme === 'dark' ? "text-white" : "text-black")}>
            {data.label}
         </h4>
         <p className="text-[9px] text-slate-500 font-medium line-clamp-2">
            {data.description}
         </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/50 flex justify-between items-center">
         <div className={cn(
            "w-2 h-2 rounded-full",
            data.status === 'completed' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
            data.status === 'running' ? "bg-amber-500 animate-pulse" :
            "bg-slate-700"
         )} />
         {isTrigger ? (
           <div className="flex gap-1.5">
             {['HTTP', 'SCHED', 'MAN'].map(t => (
               <span key={t} className="text-[7px] font-black px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-500/80 border border-slate-700">
                 {t}
               </span>
             ))}
           </div>
         ) : (
           <button className="text-[8px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors flex items-center gap-1">
              <Database size={8} /> Data Archive
           </button>
         )}
      </div>

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-indigo-500 border-2 border-slate-950" />
    </div>
  );
};

const nodeTypes = {
  start: CustomNode,
  agent: CustomNode,
  tool: CustomNode,
  logic: CustomNode,
  trigger: CustomNode,
};

// --- Tooltip Component ---
const Tooltip = ({ children, label }: { children: React.ReactNode, label: string }) => {
  const [show, setShow] = useState(false);
  const { theme } = useUIStore();

  return (
    <div className="relative flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border shadow-xl z-[60] pointer-events-none whitespace-nowrap",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-600"
            )}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Available Node Menu ---
const AVAILABLE_NODES = [
  { type: 'trigger', label: 'HTTP Endpoint', description: 'Webhook listener for external events', icon: Plug },
  { type: 'trigger', label: 'Cron Schedule', description: 'Run on a recurring time interval', icon: Clock },
  { type: 'agent', label: 'Image Agent', description: 'Generate visual assets using DALL-E/Midjourney', icon: Bot },
  { type: 'agent', label: 'Video Agent', description: 'Synthesize video clips from scripts', icon: Bot },
  { type: 'agent', label: 'Music Agent', description: 'Compose audio tracks and melodies', icon: Bot },
  { type: 'tool', label: 'Slack Post', description: 'Send notifications to team channels', icon: Share2 },
  { type: 'tool', label: 'GDrive Upload', description: 'Persist files to cloud storage', icon: Database },
  { type: 'tool', label: 'JSON Parser', description: 'Transform and filter data payloads', icon: Code },
];

// --- Editor Component ---

interface WorkflowEditorProps {
  workflow: Workflow;
  onUpdate: (updates: Partial<Workflow>) => void;
}

export function WorkflowEditor({ workflow, onUpdate }: WorkflowEditorProps) {
  const { theme } = useUIStore();
  const [view, setView] = useState<'graph' | 'list' | 'json'>('graph');
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes as Node[]);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges as Edge[]);
  const [isRunning, setIsRunning] = useState(false);
  
  // Modals / UI State
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBranches, setActiveBranches] = useState<Record<string, number>>({});

  const toggleBranch = (nodeId: string, index: number) => {
    setActiveBranches((prev: Record<string, number>) => ({ ...prev, [nodeId]: index }));
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      const nextIndex = nodes.findIndex(n => n.data.status !== 'completed' && n.data.status !== 'failed');
      if (nextIndex >= 0) {
        const currentNode = nodes[nextIndex];
        
        if (currentNode.data.status !== 'running') {
          setNodes(nds => nds.map((n, i) => i === nextIndex ? { ...n, data: { ...n.data, status: 'running' } } : n));
        } else {
          timer = setTimeout(() => {
            const isFailure = Math.random() < 0.05; 
            const payload = {
              type: isFailure ? 'error' : 'success',
              text: `[${(currentNode.data.type as string | undefined)?.toUpperCase() || 'NODE'}] ${currentNode.data.label} executed ${isFailure ? 'unsuccessfully' : 'successfully'}...`
            };
            
            window.dispatchEvent(new CustomEvent('terminal-log', { detail: payload }));
            
            setNodes(nds => nds.map((n, i) => i === nextIndex ? { ...n, data: { ...n.data, status: isFailure ? 'failed' : 'completed' } } : n));
            
            if (isFailure) {
              setIsRunning(false); 
            } else {
              window.dispatchEvent(new CustomEvent('terminal-log', { detail: { 
                 type: 'output', 
                 text: `   > Output: {\n      "status": 200,\n      "node": "${currentNode.data.label}",\n      "timestamp": "${new Date().toISOString()}"\n   }` 
              }}));
            }

          }, 1000);
        }
      } else {
        setIsRunning(false);
        window.dispatchEvent(new CustomEvent('terminal-log', { detail: { type: 'success', text: 'ORCHESTRATION ENGINE COMPLETED WORKFLOW.' } }));
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, nodes]);

  const handlePlayToggle = () => {
    if (!isRunning) {
      const allDone = nodes.every(n => n.data.status === 'completed' || n.data.status === 'failed');
      if (allDone) {
         setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, status: 'idle' } })));
      }
      setIsRunning(true);
      window.dispatchEvent(new CustomEvent('terminal-log', { detail: { type: 'warn', text: 'INITIALIZING WORKFLOW EXECUTION LAYER...' } }));
    } else {
      setIsRunning(false);
      window.dispatchEvent(new CustomEvent('terminal-log', { detail: { type: 'warn', text: 'WORKFLOW EXECUTION HALTED BY USER.' } }));
    }
  };

  // Sync with store
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const next = applyNodeChanges(changes, nds);
        onUpdate({ nodes: next as WorkflowNode[] });
        return next;
      });
    },
    [onUpdate]
  );
  
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const next = applyEdgeChanges(changes, eds);
        onUpdate({ edges: next as WorkflowEdge[] });
        return next;
      });
    },
    [onUpdate]
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const next = addEdge(params, eds);
        onUpdate({ edges: next as WorkflowEdge[] });
        return next;
      });
    },
    [onUpdate]
  );

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeData(node);
  }, []);

  const addNewNode = (nodeTemplate: typeof AVAILABLE_NODES[0]) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type: nodeTemplate.type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: nodeTemplate.label, 
        description: nodeTemplate.description,
        type: nodeTemplate.type.toUpperCase()
      },
    };
    const nextNodes = nodes.concat(newNode);
    setNodes(nextNodes);
    onUpdate({ nodes: nextNodes as WorkflowNode[] });
    setShowAddMenu(false);
  };

  const filteredNewNodes = AVAILABLE_NODES.filter(n => 
    n.label.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Traversal logic for the list view
  const getRenderedPath = (): React.ReactNode[] => {
    const startNodes = nodes.filter(n => n.type === 'start' || n.type === 'trigger');
    const renderedPath: React.ReactNode[] = [];
    const processedNodeIds = new Set<string>();

    let currentNode: Node | undefined = startNodes[0];
    
    while (currentNode && !processedNodeIds.has(currentNode.id)) {
      processedNodeIds.add(currentNode.id);
      const nodeKey: string = currentNode.id;
      const nodeForClosure: Node = currentNode;
      const isBranch: boolean = currentNode.type === 'logic';
      const outgoingEdges: Edge[] = edges.filter(e => e.source === nodeKey);
      const activeBranchIndex: number = activeBranches[nodeKey] || 0;
      
      renderedPath.push(
        <motion.div 
          key={nodeKey}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "w-full p-8 rounded-[48px] border relative transition-all group",
            theme === 'dark' ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-100 shadow-2xl shadow-slate-200/40"
          )}
        >
           {nodeForClosure.data.status === 'running' && (
             <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[48px] z-10 overflow-visible">
               <rect x="0" y="0" width="100%" height="100%" rx="48" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="16 16" className="text-indigo-500">
                 <animate attributeName="stroke-dashoffset" values="0;32" dur="1s" repeatCount="indefinite" />
               </rect>
             </svg>
           )}
           <div className="flex items-center gap-6 relative z-20">
               <div className={cn(
                  "w-16 h-16 rounded-[28px] border flex items-center justify-center transition-all z-20",
                  theme === 'dark' ? "bg-slate-950 border-slate-800 text-indigo-500" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                )}>
                   {(() => {
                      if (nodeForClosure.data.status === 'completed') return <Check size={28} className="text-emerald-500" />;
                      if (nodeForClosure.data.status === 'failed') return <X size={28} className="text-rose-500" />;
                      
                      const label = (nodeForClosure.data?.label as string) || '';
                      switch (nodeForClosure.type?.toLowerCase()) {
                        case 'start': return <Play size={24} fill="currentColor" />;
                        case 'trigger': return <Zap size={24} />;
                        case 'agent': return <Bot size={24} />;
                        case 'logic': return <GitBranch size={24} />;
                        case 'tool':
                          if (label.toLowerCase().includes('slack')) return <MessageSquare size={24} />;
                          if (label.toLowerCase().includes('upload')) return <Upload size={24} />;
                          return <Database size={24} />;
                        default: return <Zap size={24} />;
                      }
                   })()}
                </div>
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">
                       {nodeForClosure.type?.toUpperCase()}
                    </span>
                    {processedNodeIds.size === 1 && (
                       <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest">Initial Entry</span>
                    )}
                 </div>
                 <h4 className={cn("text-xl font-black uppercase tracking-tight truncate", theme === 'dark' ? "text-white" : "text-black")}>
                    {(nodeForClosure.data?.label as string) || 'Untitled Step'}
                 </h4>
                 <p className="text-[11px] text-slate-500 font-bold tracking-widest uppercase opacity-60">
                    ID: {nodeForClosure.id.split('-')[0]}
                 </p>
              </div>
              <Tooltip label="Expand">
                <button 
                  onClick={() => setSelectedNodeData(nodeForClosure)}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-950 border border-transparent dark:border-slate-800 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/20 transition-all active:scale-95"
                >
                   <Maximize2 size={20} />
                </button>
              </Tooltip>
           </div>

           {isBranch && outgoingEdges.length > 1 && (
              <div className="mt-8 pt-8 border-t border-slate-800/10 flex flex-col items-center">
                 <div className="flex items-center justify-between w-full mb-6">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Select Branch Path</span>
                    <div className="flex gap-1.5">
                       {outgoingEdges.map((_, i: number) => (
                          <button
                            key={i}
                            onClick={() => toggleBranch(nodeKey, i)}
                            className={cn(
                              "h-1.5 rounded-full transition-all",
                              i === activeBranchIndex ? "bg-indigo-500 w-6" : "bg-slate-800 hover:bg-slate-700 w-1.5"
                            )} 
                          />
                       ))}
                    </div>
                 </div>
                 <div className="w-full">
                    <div className={cn(
                      "p-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest flex items-center justify-between",
                      theme === 'dark' ? "bg-black border-slate-800 text-slate-400" : "bg-slate-50 border-slate-100 text-indigo-700 shadow-inner"
                    )}>
                       <span>Path: {(outgoingEdges[activeBranchIndex]?.label as string) || `Condition ${activeBranchIndex + 1}`}</span>
                       <ChevronRight size={14} className="opacity-50" />
                    </div>
                 </div>
              </div>
           )}
        </motion.div>
      );

      if (outgoingEdges.length > 0) {
        renderedPath.push(
          <motion.div 
            key={`arrow-${nodeKey}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="py-1"
          >
             <div className="flex flex-col items-center">
                <div className="w-0.5 h-10 bg-gradient-to-b from-indigo-500/50 to-indigo-500 opacity-20" />
                <div className="w-3 h-3 border-r-2 border-b-2 border-indigo-500 rotate-45 -mt-3 opacity-50" />
             </div>
          </motion.div>
        );
        
        const nextEdge: Edge = outgoingEdges[activeBranchIndex] || outgoingEdges[0];
        currentNode = nodes.find(n => n.id === nextEdge.target);
      } else {
        currentNode = undefined;
        // If we reached the end and there's only one node (trigger), or just want an empty state button
        if (processedNodeIds.size === 1) {
          renderedPath.push(
            <motion.div 
              key="empty-plus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent opacity-20" />
              <button 
                onClick={() => setShowAddMenu(true)}
                className={cn(
                  "w-24 h-24 rounded-[32px] border-2 border-dashed flex items-center justify-center transition-all hover:scale-105 active:scale-95 group",
                  theme === 'dark' ? "border-slate-800 text-slate-700 hover:border-indigo-500 hover:text-indigo-500" : "border-slate-200 text-slate-300 hover:border-indigo-400 hover:text-indigo-400"
                )}
              >
                <Plus size={40} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connect First Module</span>
            </motion.div>
          );
        }
      }
    }
    return renderedPath;
  };

  return (
    <div className={cn(
      "h-full flex flex-col rounded-[32px] overflow-hidden border relative",
      theme === 'dark' ? "bg-[#0A0A0B] border-slate-900" : "bg-slate-50 border-slate-200"
    )}>
      {/* Top Toolbar */}
      <div className={cn(
        "p-4 border-b flex items-center justify-between z-30",
        theme === 'dark' ? "border-slate-800 bg-black/40 backdrop-blur-xl" : "border-slate-200 bg-white/80 backdrop-blur-xl"
      )}>
        {/* Left: Toolbar Actions */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center p-1 rounded-full border shadow-2xl transition-colors",
            theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-slate-200/50"
          )}>
            <Tooltip label="Add Node">
              <button 
                onClick={() => setShowAddMenu(!showAddMenu)}
                className={cn(
                  "p-2.5 rounded-full transition-all active:scale-95 text-slate-400 hover:text-indigo-500",
                  showAddMenu ? "bg-indigo-600 text-white hover:text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Plus size={18} />
              </button>
            </Tooltip>
            <div className={cn("w-[1px] h-4 mx-1", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")} />
            <Tooltip label={isRunning ? "Stop" : "Run"}>
              <button 
                onClick={handlePlayToggle}
                className={cn(
                  "p-2.5 rounded-full transition-all active:scale-95",
                  isRunning 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" 
                    : cn("bg-emerald-500/10 text-emerald-500", theme === 'dark' ? "hover:bg-emerald-500/20" : "hover:bg-emerald-500/20 border border-emerald-500/20 shadow-sm")
                )}
              >
                {isRunning ? <StopCircle size={18} /> : <Play size={18} />}
              </button>
            </Tooltip>
            <div className={cn("w-[1px] h-4 mx-1", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")} />
            <Tooltip label="Settings">
              <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-all active:scale-95">
                <Settings size={18} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Center: Mission Info */}
        <div className="hidden lg:flex flex-col items-center">
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em]">
              ORCHESTRATION ENGINE V4.2
          </span>
          <span className={cn("text-sm font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {workflow.name}
          </span>
        </div>

        {/* Right: View Toggles */}
        <div className="flex items-center gap-3">
           <div className={cn(
             "p-1 rounded-full border flex shadow-2xl transition-colors",
             theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-slate-200/50"
           )}>
              <Tooltip label="Graph">
                <button 
                  onClick={() => setView('graph')}
                  className={cn(
                    "p-2.5 rounded-full transition-all active:scale-95 flex items-center justify-center",
                    view === 'graph' 
                      ? (theme === 'dark' ? "bg-slate-800 text-white border border-slate-700 shadow-inner" : "bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm")
                      : "text-slate-500 hover:text-indigo-500"
                  )}
                >
                  <LayoutDashboard size={16} />
                </button>
              </Tooltip>
              <Tooltip label="List">
                <button 
                  onClick={() => setView('list')}
                  className={cn(
                    "p-2.5 rounded-full transition-all active:scale-95 flex items-center justify-center",
                    view === 'list' 
                      ? (theme === 'dark' ? "bg-slate-800 text-white border border-slate-700 shadow-inner" : "bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm")
                      : "text-slate-500 hover:text-indigo-500"
                  )}
                >
                  <ListIcon size={16} />
                </button>
              </Tooltip>
              <Tooltip label="JSON">
                <button 
                  onClick={() => setView('json')}
                  className={cn(
                    "p-2.5 rounded-full transition-all active:scale-95 flex items-center justify-center",
                    view === 'json' 
                      ? (theme === 'dark' ? "bg-slate-900 text-white border border-slate-700 shadow-inner" : "bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm")
                      : "text-slate-500 hover:text-indigo-500"
                  )}
                >
                  <Code size={16} />
                </button>
              </Tooltip>
           </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative overflow-hidden">
         <AnimatePresence mode="wait">
            {view === 'graph' && (
               <motion.div
                 key="graph"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full w-full"
               >
                 <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    colorMode={theme === 'dark' ? 'dark' : 'light'}
                 >
                    <Background color={theme === 'dark' ? '#1E293B' : '#E2E8F0'} gap={20} className="opacity-20" />
                    <Controls className="!bg-slate-900 !border-slate-800 !fill-white rounded-xl overflow-hidden" />
                    <MiniMap 
                      nodeStrokeColor={theme === 'dark' ? '#334155' : '#CBD5E1'}
                      nodeColor={theme === 'dark' ? '#0F172A' : '#F8FAFC'}
                      className="!bg-slate-900/50 !border-slate-800 !rounded-3xl !bottom-4 !right-4 overflow-hidden"
                      maskColor={theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}
                    />
                     
                     {nodes.length === 1 && (
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="flex flex-col items-center gap-6 p-12 rounded-[64px] bg-slate-950/20 backdrop-blur-md border border-indigo-500/10"
                         >
                            <button 
                              onClick={() => setShowAddMenu(true)}
                              className="w-32 h-32 rounded-[40px] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all pointer-events-auto"
                            >
                               <Plus size={48} />
                            </button>
                            <div className="text-center">
                               <h3 className="text-lg font-black text-white uppercase tracking-widest">Initialization Pending</h3>
                               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Add your first neural module to begin</p>
                            </div>
                         </motion.div>
                       </div>
                     )}
                  </ReactFlow>
               </motion.div>
            )}

            {view === 'list' && (
               <motion.div
                 key="list"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth"
               >
                 <div className="max-w-3xl mx-auto py-20 px-6 flex flex-col items-center gap-4">
                    {getRenderedPath()}
                 </div>
               </motion.div>
            )}

            {view === 'json' && (
               <motion.div
                 key="json"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="h-full w-full p-8"
               >
                  <pre className={cn(
                    "h-full w-full p-12 rounded-[48px] border font-mono text-[11px] overflow-auto no-scrollbar shadow-inner",
                    theme === 'dark' 
                      ? "bg-[#050505] border-slate-900 text-indigo-400/80 selection:bg-indigo-500/20" 
                      : "bg-white border-slate-200 text-indigo-700 selection:bg-indigo-100"
                  )}>
                    <code className="block py-4">
                      {JSON.stringify({ ...workflow, nodes, edges }, null, 2)}
                    </code>
                  </pre>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* --- Overlay Modals --- */}

      {/* Add Node Menu */}
      <AnimatePresence>
        {showAddMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={cn(
                "absolute left-4 top-20 z-50 w-[320px] rounded-[32px] border p-2 shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[500px] backdrop-blur-2xl",
                theme === 'dark' ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-100"
              )}
            >
              <div className={cn(
                "p-4 border-b rounded-t-[28px] overflow-hidden",
                theme === 'dark' ? "border-slate-900/50 bg-black/20" : "border-slate-100 bg-slate-50/50"
              )}>
                 <div className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-full border transition-all",
                   theme === 'dark' ? "bg-black/40 border-slate-800 focus-within:border-indigo-500/50" : "bg-white border-slate-200 focus-within:border-indigo-300"
                 )}>
                   <Search size={14} className="text-slate-500" />
                   <input 
                    type="text" 
                    autoFocus
                    placeholder="SEARCH NODES..."
                    className="w-full bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-indigo-400 placeholder:text-slate-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
                {filteredNewNodes.map((node, i) => (
                  <button
                    key={i}
                    onClick={() => addNewNode(node)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl group transition-all text-left mb-1",
                      theme === 'dark' ? "hover:bg-slate-900" : "hover:bg-slate-50"
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                      <node.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className={cn("text-xs font-black uppercase truncate", theme === 'dark' ? "text-white" : "text-black")}>
                        {node.label}
                      </h5>
                      <p className="text-[9px] text-slate-500 font-bold truncate tracking-widest uppercase">
                        {node.type}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Node Data Modal */}
      <AnimatePresence>
        {selectedNodeData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-xl"
               onClick={() => setSelectedNodeData(null)}
            />
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className={cn(
                  "relative w-full max-w-2xl rounded-[48px] border overflow-hidden shadow-[0_64px_120px_rgba(0,0,0,0.8)]",
                  theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-white"
               )}
            >
               <div className="p-10 border-b border-slate-800 bg-black/40 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2 block">
                       Node Telemetry Archive
                    </span>
                    <h3 className={cn("text-3xl font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-black")}>
                        {selectedNodeData.data.label as string}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedNodeData(null)}
                    className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
               </div>

               <div className="p-10 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Lifecycle Status</label>
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                           <span className={cn("text-sm font-black uppercase", theme === 'dark' ? "text-white" : "text-black")}>SYNCED / COMPLETED</span>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Execution Clock</label>
                        <div className="flex items-center gap-3 text-slate-400">
                           <Clock size={16} />
                           <span className="text-sm font-black uppercase tracking-tighter">1.2ms Processed</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <Database size={10} /> Data Payload (I/O)
                     </label>
                     <div className={cn(
                        "p-6 rounded-3xl border font-mono text-[11px] overflow-auto max-h-[300px] no-scrollbar",
                        theme === 'dark' ? "bg-black border-slate-900 text-emerald-500/80" : "bg-slate-50 border-slate-200 text-indigo-700"
                     )}>
                        <pre>{JSON.stringify({
                           input: { prompt: "Generate high-fidelity assets...", context: "Global-HQ" },
                           output: { status: "success", asset_id: "7721-XA", urls: ["https://cdn.clawesome.io/x1.png"] }
                        }, null, 2)}</pre>
                     </div>
                  </div>
               </div>

               <div className="px-10 py-8 bg-black/20 border-t border-slate-900 flex justify-end gap-3">
                  <button className="px-8 py-3 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                     Download Log
                  </button>
                  <button className="px-8 py-3 rounded-full bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                     Audit Trace
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Breadcrumb / Status Footer */}
      <div className={cn(
        "px-6 md:px-12 lg:px-24 py-5 border-t flex items-center justify-between z-30 transition-all",
        theme === 'dark' ? "border-slate-800 bg-black/40 backdrop-blur-md" : "border-slate-200 bg-white/80 backdrop-blur-md"
      )}>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className={cn("w-2.5 h-2.5 rounded-full shadow-lg", isRunning ? "bg-emerald-500 animate-pulse shadow-emerald-500/20" : "bg-slate-700")} />
               <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                  {isRunning ? 'Orchestration Active' : 'Engine Idle'}
               </span>
            </div>
            <div className={cn("w-[1px] h-4", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")} />
            <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
               Nodes: {nodes.length} <span className="mx-2 opacity-30">|</span> Edges: {edges.length}
            </span>
         </div>
          <div className="flex items-center gap-4">
            <Tooltip label="Share">
              <button className={cn(
                "p-2.5 rounded-xl transition-all active:scale-95 group",
                theme === 'dark' ? "bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-white" : "bg-slate-50 border border-slate-200 text-slate-400 hover:text-indigo-600 shadow-sm"
              )}>
                 <Share2 size={16} className="transition-transform group-hover:scale-110" />
              </button>
            </Tooltip>
            <Tooltip label="Download">
              <button className={cn(
                "p-2.5 rounded-xl transition-all active:scale-95 group",
                theme === 'dark' ? "bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-white" : "bg-slate-50 border border-slate-200 text-slate-400 hover:text-indigo-600 shadow-sm"
              )}>
                 <Download size={16} className="transition-transform group-hover:scale-110" />
              </button>
            </Tooltip>
          </div>
      </div>
    </div>
  );
}
