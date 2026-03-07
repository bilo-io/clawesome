'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Puzzle, 
  Cpu, 
  Zap, 
  Github, 
  MessageSquare, 
  Cloud, 
  Database, 
  Shield, 
  Layers, 
  Code,
  Layout,
  Terminal,
  Activity,
  HardDrive,
  Globe,
  Lock,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  Command,
  Settings,
  Container,
  GitPullRequest,
  Coffee,
  Package,
  Layers2,
  Box,
  CreditCard,
  Target,
  FileCode,
  Smartphone,
  Server,
  Monitor,
  Key,
  DatabaseZap,
  Network,
  Wand2,
  BrainCircuit,
  MessageCircle,
  Eye,
  Wind,
  MousePointer2,
  PenTool,
  Workflow,
  ShieldCheck,
  Chrome,
  Mic,
  Mail,
  Clock,
  Webhook,
  CloudSun,
  Music,
  Volume2,
  Lightbulb,
  Moon,
  Home,
  Bot,
  Smile,
  Apple
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BackgroundVideo from '@/components/BackgroundVideo';
import BackgroundAnimated from '@/components/BackgroundAnimated';

type Category = 'All' | 'Skills' | 'Integrations' | 'Plugins' | 'MCP' | 'Automation' | 'Models' | 'Platforms';

interface MarketplaceItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isPopular?: boolean;
}

const ITEMS: MarketplaceItem[] = [
  // SKILLS (20)
  { id: '1', name: 'Neural Reasoning Engine', category: 'Skills', description: 'Deep logical analysis capability for complex problem-solving.', icon: <BrainCircuit className="w-6 h-6" />, isPopular: true },
  { id: '2', name: 'Contextual Memory Matrix', category: 'Skills', description: 'Enhanced long-term context retention for lengthy coding sessions.', icon: <HardDrive className="w-6 h-6" /> },
  { id: '3', name: 'Recursive Debugger', category: 'Skills', description: 'Self-correcting code analysis and bug fixing in real-time.', icon: <Target className="w-6 h-6" />, isNew: true },
  { id: '4', name: 'Multi-Agent Orchestrator', category: 'Skills', description: 'Coordinate complex swarms of AI agents with precision.', icon: <Workflow className="w-6 h-6" />, isPopular: true },
  { id: '5', name: 'Semantic Code Search', category: 'Skills', description: 'Find logic patterns across your codebase, not just strings.', icon: <Search className="w-6 h-6" /> },
  { id: '6', name: 'Automated Refactoring', category: 'Skills', description: 'Instant code architectural improvements and cleanup.', icon: <Code className="w-6 h-6" /> },
  { id: '7', name: 'Doc-Gen Specialist', category: 'Skills', description: 'Lightning-fast technical documentation from your source code.', icon: <FileCode className="w-6 h-6" /> },
  { id: '8', name: 'Security Vulnerability Scanner', category: 'Skills', description: 'Proactive threat detection and security auditing.', icon: <Shield className="w-6 h-6" />, isPopular: true },
  { id: '9', name: 'Performance Profiling', category: 'Skills', description: 'Deep-dive system bottleneck analysis and optimization.', icon: <Activity className="w-6 h-6" /> },
  { id: '10', name: 'Unit Test Generator', category: 'Skills', description: 'Comprehensive test coverage generation for all functions.', icon: <Settings className="w-6 h-6" /> },
  { id: '11', name: 'Dependency Map Visualizer', category: 'Skills', description: 'Visualize and manage complex project dependency graphs.', icon: <Layers className="w-6 h-6" /> },
  { id: '12', name: 'Language Translator', category: 'Skills', description: 'Polyglot assistant fluent in 100+ programming languages.', icon: <Globe className="w-6 h-6" /> },
  { id: '13', name: 'Regex Wizard', category: 'Skills', description: 'Master complex string manipulations with neural assistance.', icon: <Wand2 className="w-6 h-6" /> },
  { id: '14', name: 'Database Schema Designer', category: 'Skills', description: 'Optimized data architecture design and migration tools.', icon: <DatabaseZap className="w-6 h-6" /> },
  { id: '15', name: 'API Request Optimizer', category: 'Skills', description: 'Minimize latency and maximize throughput for your endpoints.', icon: <Zap className="w-6 h-6" /> },
  { id: '16', name: 'Cloud Infra Architect', category: 'Skills', description: 'Design serverless and K8s setups with AI-driven best practices.', icon: <Cloud className="w-6 h-6" /> },
  { id: '17', name: 'Framework Porter', category: 'Skills', description: 'Seamlessly port code between React, Vue, and Svelte.', icon: <Layout className="w-6 h-6" />, isNew: true },
  { id: '18', name: 'TypeScript Migration', category: 'Skills', description: 'Elevate legacy JavaScript to strict, safe TypeScript.', icon: <FileCode className="w-6 h-6" /> },
  { id: '19', name: 'Legacy Modernizer', category: 'Skills', description: 'Breathe life into outdated repositories and technical debt.', icon: <Cpu className="w-6 h-6" /> },
  { id: '20', name: 'Personality Tuner', category: 'Skills', description: 'Customize your AI agent\'s voice, tone, and behavior.', icon: <MessageSquare className="w-6 h-6" /> },

  // INTEGRATIONS (20)
  { id: '21', name: 'GitHub Synapse', category: 'Integrations', description: 'Deep integration with Pull Requests, Issues, and Actions.', icon: <Github className="w-6 h-6" />, isPopular: true },
  { id: '22', name: 'Discord Hive', category: 'Integrations', description: 'Real-time agent communication within your community server.', icon: <MessageCircle className="w-6 h-6" /> },
  { id: '23', name: 'Slack Nerve Center', category: 'Integrations', description: 'Execute commands and receive updates directly in Slack.', icon: <Zap className="w-6 h-6" /> },
  { id: '24', name: 'Linear Sync Flow', category: 'Integrations', description: 'Automated task tracking and progress synchronization.', icon: <Target className="w-6 h-6" /> },
  { id: '25', name: 'MCP Cyber-Link', category: 'Integrations', description: 'Universal Model Context Protocol bridge for all agents.', icon: <Network className="w-6 h-6" />, isPopular: true },
  { id: '26', name: 'Notion Knowledge Base', category: 'Integrations', description: 'Bi-directional sync between docs and codebases.', icon: <Layers2 className="w-6 h-6" /> },
  { id: '27', name: 'PostgreSQL Bridge', category: 'Integrations', description: 'Direct neural SQL querying and schema administration.', icon: <Database className="w-6 h-6" /> },
  { id: '28', name: 'AWS Cloud Hub', category: 'Integrations', description: 'Zero-config management of EC2, S3, and Lambda.', icon: <Cloud className="w-6 h-6" /> },
  { id: '29', name: 'GCP Connector', category: 'Integrations', description: 'Seamlessly manage Google Cloud resources and IAM.', icon: <Cloud className="w-6 h-6" /> },
  { id: '30', name: 'Azure Enterprise', category: 'Integrations', description: 'Enterprise-grade Microsoft Azure infrastructure tools.', icon: <Cloud className="w-6 h-6" /> },
  { id: '31', name: 'Stripe Gateway', category: 'Integrations', description: 'Neural-powered billing and payment logic integration.', icon: <CreditCard className="w-6 h-6" /> },
  { id: '32', name: 'Sentry Watchtower', category: 'Integrations', description: 'Automated error triaging and self-healing bug fixes.', icon: <Eye className="w-6 h-6" />, isNew: true },
  { id: '33', name: 'Datadog Metrics', category: 'Integrations', description: 'Visual observability and real-time dashboard sync.', icon: <Activity className="w-6 h-6" /> },
  { id: '34', name: 'Firebase Realtime', category: 'Integrations', description: 'Fast, synchronized data for web and mobile apps.', icon: <Zap className="w-6 h-6" /> },
  { id: '35', name: 'Supabase Edge', category: 'Integrations', description: 'Native support for Supabase Auth and Edge functions.', icon: <DatabaseZap className="w-6 h-6" /> },
  { id: '36', name: 'Twilio Cell-Link', category: 'Integrations', description: 'SMS, Voice, and WhatsApp neural automation.', icon: <Smartphone className="w-6 h-6" /> },
  { id: '37', name: 'Netlify Deployer', category: 'Integrations', description: 'Continuous delivery automation for modern web apps.', icon: <UploadCloud className="w-6 h-6" /> },
  { id: '38', name: 'Vercel Edge Hub', category: 'Integrations', description: 'Optimize and deploy Next.js apps with one command.', icon: <Zap className="w-6 h-6" />, isPopular: true },
  { id: '39', name: 'K8s Cluster Master', category: 'Integrations', description: 'Visual orchestration and scaling of Kubernetes clusters.', icon: <Container className="w-6 h-6" /> },
  { id: '40', name: 'Docker Forge', category: 'Integrations', description: 'Automated containerization and image management.', icon: <Box className="w-6 h-6" /> },

  // PLUGINS (10)
  { id: '41', name: 'Omni-Workflow Max', category: 'Plugins', description: 'One-click full-stack project scaffolding and setup.', icon: <Workflow className="w-6 h-6" />, isPopular: true },
  { id: '42', name: 'Quantum Speed-Code', category: 'Plugins', description: 'Predictive neural code generation at 10x speeds.', icon: <Zap className="w-6 h-6" />, isNew: true },
  { id: '43', name: 'Ethereal Live-Docs', category: 'Plugins', description: 'Floating live documentation that follows your cursor.', icon: <FileCode className="w-6 h-6" /> },
  { id: '44', name: 'Cyber-Security Shield', category: 'Plugins', description: 'Real-time intrusion detection and behavioral blocking.', icon: <Shield className="w-6 h-6" />, isPopular: true },
  { id: '45', name: 'Data-Vault Secret', category: 'Plugins', description: 'End-to-end encrypted secrets and environment variables.', icon: <Lock className="w-6 h-6" /> },
  { id: '46', name: 'Auto-Scale Prophet', category: 'Plugins', description: 'Predictive infrastructure scaling based on traffic.', icon: <Wind className="w-6 h-6" /> },
  { id: '47', name: 'Stitch Loop UI', category: 'Plugins', description: 'Real-time frontend component prototyping and testing.', icon: <Layout className="w-6 h-6" />, isPopular: true },
  { id: '48', name: 'Aesthetic Refiner', category: 'Plugins', description: 'Automated UI polish, spacing, and design consistency.', icon: <PenTool className="w-6 h-6" /> },
  { id: '49', name: 'Ghost-Writer AI', category: 'Plugins', description: 'Generative technical writing for blogs and changelogs.', icon: <MessageSquare className="w-6 h-6" /> },
  { id: '50', name: 'Nightshade Terminal', category: 'Plugins', description: 'A custom, neural-enhanced CLI theme for pro developers.', icon: <Terminal className="w-6 h-6" />, isNew: true },
  
  // MCP (5)
  { id: '51', name: 'MCP Slack Bridge', category: 'MCP', description: 'Expose Slack channels as MCP resources for your agents.', icon: <MessageSquare className="w-6 h-6" />, isPopular: true },
  { id: '52', name: 'MCP GitHub Context', category: 'MCP', description: 'Seamlessly link GitHub repositories as agent context.', icon: <Github className="w-6 h-6" />, isPopular: true },
  { id: '53', name: 'MCP Google Maps', category: 'MCP', description: 'Enable agents to \'see\' and \'navigate\' through geographical data.', icon: <Globe className="w-6 h-6" />, isNew: true },
  { id: '54', name: 'MCP Notion Knowledge', category: 'MCP', description: 'Access Notion databases and pages as MCP tools.', icon: <Layers2 className="w-6 h-6" /> },
  { id: '55', name: 'MCP SQL Explorer', category: 'MCP', description: 'Turn your SQL databases into agent-ready MCP resources.', icon: <Database className="w-6 h-6" /> },

  // COMMUNICATIONS & SECURE (NEW)
  { id: '56', name: 'Signal', category: 'Integrations', description: 'Secure, end-to-end encrypted communications for your agents.', icon: <ShieldCheck className="w-6 h-6 text-blue-500" />, isPopular: true },
  { id: '57', name: 'iMessage', category: 'Integrations', description: 'Native Apple messaging integration for seamless notification swarms.', icon: <MessageCircle className="w-6 h-6 text-blue-400" /> },

  // TOOLS & AUTOMATION
  { id: '58', name: 'Browser', category: 'Automation', description: 'Full Chrome/Chromium control and web navigation.', icon: <Chrome className="w-6 h-6 text-blue-500" />, isPopular: true },
  { id: '59', name: 'Canvas', category: 'Automation', description: 'Visual workspace + A2UI for interactive agent collaboration.', icon: <Layout className="w-6 h-6 text-orange-500" /> },
  { id: '60', name: 'Voice', category: 'Automation', description: 'Voice Wake + Talk Mode for hands-free agent interaction.', icon: <Mic className="w-6 h-6 text-purple-500" /> },
  { id: '61', name: 'Gmail', category: 'Automation', description: 'Pub/Sub email triggers and automated inbox management.', icon: <Mail className="w-6 h-6 text-red-500" /> },
  { id: '62', name: 'Cron', category: 'Automation', description: 'Powerful scheduled tasks and recurring agent workflows.', icon: <Clock className="w-6 h-6 text-amber-500" /> },
  { id: '63', name: 'Webhooks', category: 'Automation', description: 'External triggers to initiate agent actions from any service.', icon: <Webhook className="w-6 h-6 text-emerald-500" /> },
  { id: '64', name: '1Password', category: 'Automation', description: 'Secure credentials and vault management for agent identities.', icon: <Key className="w-6 h-6 text-blue-400" /> },
  { id: '65', name: 'Weather', category: 'Automation', description: 'Real-time forecasts and conditions for location-aware tasks.', icon: <CloudSun className="w-6 h-6 text-yellow-500" /> },

  // MUSIC & AUDIO & SMART HOME
  { id: '66', name: 'Spotify', category: 'Integrations', description: 'Music playback control and playlist management.', icon: <Music className="w-6 h-6 text-emerald-500" /> },
  { id: '67', name: 'Sonos', category: 'Integrations', description: 'Multi-room audio control for smart environment orchestration.', icon: <Volume2 className="w-6 h-6 text-slate-400" /> },
  { id: '68', name: 'Shazam', category: 'Integrations', description: 'Neural song recognition and audio fingerprinting.', icon: <Zap className="w-6 h-6 text-blue-500" /> },
  { id: '69', name: 'Philips Hue', category: 'Integrations', description: 'Smart lighting automation and scene management.', icon: <Lightbulb className="w-6 h-6 text-yellow-400" /> },
  { id: '70', name: '8Sleep', category: 'Integrations', description: 'Biometric-driven environment tuning and sleep optimization.', icon: <Moon className="w-6 h-6 text-indigo-400" /> },
  { id: '71', name: 'Home Assistant', category: 'Integrations', description: 'Unified home automation hub for all IoT devices.', icon: <Home className="w-6 h-6 text-blue-500" /> },

  // AI MODELS
  { id: '72', name: 'Anthropic', category: 'Models', description: 'Next-gen reasoning with Claude Pro, Max, and Opus 4.5.', icon: <Bot className="w-6 h-6 text-orange-400" />, isPopular: true },
  { id: '73', name: 'OpenAI', category: 'Models', description: 'Industry-leading intelligence with GPT-4, GPT-5, and o1.', icon: <Cpu className="w-6 h-6 text-emerald-500" />, isPopular: true },
  { id: '74', name: 'Google Gemini', category: 'Models', description: 'Multimodal power with Gemini 2.5 Pro and Flash.', icon: <Search className="w-6 h-6 text-blue-500" /> },
  { id: '75', name: 'MiniMax', category: 'Models', description: 'Advanced MiniMax-M2.5 models for efficient reasoning.', icon: <Zap className="w-6 h-6 text-pink-500" /> },
  { id: '76', name: 'xAI Grok', category: 'Models', description: 'Real-time knowledge and reasoning with Grok 3 & 4.', icon: <Sparkles className="w-6 h-6 text-slate-900 dark:text-white" /> },
  { id: '77', name: 'Vercel AI Gateway', category: 'Models', description: 'Access hundreds of models with a single unified API key.', icon: <Network className="w-6 h-6 text-slate-900 dark:text-white" /> },
  { id: '78', name: 'OpenRouter', category: 'Models', description: 'The ultimate unified API gateway for all LLMs.', icon: <Layers className="w-6 h-6 text-indigo-500" /> },
  { id: '79', name: 'Mistral', category: 'Models', description: 'Mistral Large and Codestral for high-performance tasks.', icon: <Code className="w-6 h-6 text-orange-600" /> },
  { id: '80', name: 'DeepSeek', category: 'Models', description: 'DeepSeek V3 & R1 for specialized analytical workloads.', icon: <Target className="w-6 h-6 text-blue-600" /> },
  { id: '81', name: 'GLM', category: 'Models', description: 'ChatGLM models for multilingual and diverse interactions.', icon: <MessageSquare className="w-6 h-6 text-emerald-600" /> },
  { id: '82', name: 'Perplexity', category: 'Models', description: 'Search-augmented AI for real-time web-grounded truth.', icon: <Globe className="w-6 h-6 text-cyan-500" /> },
  { id: '83', name: 'Hugging Face', category: 'Models', description: 'Access to 100k+ open-source models and datasets.', icon: <Smile className="w-6 h-6 text-yellow-500" /> },
  { id: '84', name: 'Local Models', category: 'Models', description: 'Private, on-device intelligence with Ollama and LM Studio.', icon: <HardDrive className="w-6 h-6 text-slate-400" /> },

  // PLATFORMS
  { id: '85', name: 'macOS', category: 'Platforms', description: 'Native menu bar app + Voice Wake for desktop operators.', icon: <Apple className="w-6 h-6" />, isPopular: true },
  { id: '86', name: 'iOS', category: 'Platforms', description: 'Mobile Canvas, camera integration, and Voice Wake.', icon: <Smartphone className="w-6 h-6 text-blue-500" /> },
  { id: '87', name: 'Android', category: 'Platforms', description: 'Full screen mirror, Canvas, and camera automation.', icon: <Smartphone className="w-6 h-6 text-emerald-500" /> },
  { id: '88', name: 'Windows', category: 'Platforms', description: 'Deep WSL2 integration for high-performance agent runs.', icon: <Monitor className="w-6 h-6 text-blue-400" /> },
  { id: '89', name: 'Linux', category: 'Platforms', description: 'Native kernel-level support for server-side swarms.', icon: <Terminal className="w-6 h-6 text-yellow-600" /> },
];

function UploadCloud({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = useMemo(() => {
    return ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories: Category[] = ['All', 'Integrations', 'Skills', 'Plugins', 'MCP', 'Automation', 'Models', 'Platforms'];

  return (
    <main className="min-h-screen relative transition-colors duration-500 overflow-hidden">

      {/* Decorative Background */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div> */}


      {/* Hero Animated Background */}
      <BackgroundAnimated />
      <BackgroundVideo mounted={mounted} src={"/videos/vid-space-river.mp4"} />

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Flashy Top Panel */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">The Neural Marketplace</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-slate-900 dark:text-white">
              Infinite <br />
              <span className="gradient-text italic">Capabilities.</span>
            </h1>
            <p className="text-slate-700 dark:text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              Unlock the full potential of your autonomous agents with our curated library of 50+ elite skills, integrations, and plugins.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12 max-w-2xl mx-auto w-full px-4"
          >
            <div className="relative group w-full">
              {/* High-intensity outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] rounded-[40px] blur-3xl opacity-0 group-focus-within:opacity-20 dark:group-focus-within:opacity-30 transition duration-700" />
              
              {/* Border Gradient Container */}
              <div className="relative p-[1px] rounded-[26px] bg-gradient-to-r from-[#8C00FF] to-[#008FD6] transition-all duration-500 group-focus-within:shadow-2xl shadow-purple-600/10">
                <div className="relative glass-panel rounded-[25px] flex items-center px-6 py-4 transition-all duration-300 bg-white/95 dark:bg-slate-900/95 group-focus-within:bg-white dark:group-focus-within:bg-slate-950 group-focus-within:scale-[1.005]">
                  <Search className="w-6 h-6 text-slate-400 group-focus-within:text-[#008FD6] transition-colors mr-4" />
                  <input 
                    type="text"
                    placeholder="Search for skills, plugins, or tools..."
                    className="bg-transparent border-none focus:ring-0 focus-visible:ring-0 w-full text-slate-900 dark:text-white font-bold text-lg placeholder:text-slate-400 block outline-none focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs text-slate-400 font-mono group-focus-within:border-indigo-500/30 group-focus-within:text-indigo-400 transition-colors">
                    <span className="text-xs">⌘</span>
                    <span>K</span>
                  </kbd>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                activeCategory === category 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105" 
                  : "bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm"
              )}
            >
              {category}
            </motion.button>
          ))}
        </section>

        {/* Grid */}
        <section>
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (index % 12) * 0.05,
                    layout: { duration: 0.3 }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative h-full"
                >
                  <div className="absolute -inset-px bg-gradient-to-b from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full glass-panel rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 group-hover:shadow-2xl group-hover:border-indigo-500/30 bg-white/80 dark:bg-slate-900/50 shadow-sm shadow-slate-200/50 dark:shadow-none">
                    <div className="flex items-center justify-between w-full">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div className="flex gap-2">
                        {item.isPopular && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-tighter border border-amber-500/20">
                            Popular
                          </span>
                        )}
                        {item.isNew && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-400 line-clamp-2 font-medium">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between w-full border-t border-slate-200 dark:border-slate-800/50">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ChevronRight className="w-4 h-4 text-indigo-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40"
            >
              <div className="inline-flex p-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-6">
                <Search className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No items found</h2>
              <p className="text-slate-500">Try adjusting your search or category filters.</p>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
