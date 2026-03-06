import pc from 'picocolors';

export interface ModelInfo {
  value: string;
  label: string;
  isOpenSource: boolean;
}

export interface ProviderInfo {
  label: string;
  models: ModelInfo[];
}

export const PROVIDERS: Record<string, ProviderInfo> = {
  openai: {
    label: 'OpenAI',
    models: [
      { value: 'gpt-5.4', label: 'GPT-5.4 (Flagship Reasoning) — Recommended', isOpenSource: false },
      { value: 'gpt-5.2-codex', label: 'GPT-5.2 Codex (Agentic Expert)', isOpenSource: false },
      { value: 'gpt-oss-120b', label: 'GPT-OSS 120B (Open Weight)', isOpenSource: true },
      { value: 'o4-mini', label: 'o4 Mini (Efficient Reasoning)', isOpenSource: false },
      { value: 'gpt-5.3-instant', label: 'GPT-5.3 Instant', isOpenSource: false },
      { value: 'gpt-oss-20b', label: 'GPT-OSS 20B (Edge Open Weight)', isOpenSource: true },
      { value: 'o1', label: 'o1-preview (Legacy Reasoning)', isOpenSource: false },
      { value: 'gpt-4o', label: 'GPT-4o (Legacy)', isOpenSource: false },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', isOpenSource: false },
      { value: 'text-embedding-3-large', label: 'Embeddings v3 Large', isOpenSource: false },
    ],
  },
  anthropic: {
    label: 'Anthropic',
    models: [
      { value: 'claude-4.6-sonnet', label: 'Claude 4.6 Sonnet (Coding King) — Recommended', isOpenSource: false },
      { value: 'claude-4.6-opus', label: 'Claude 4.6 Opus (SOTA Reasoning)', isOpenSource: false },
      { value: 'claude-4.5-haiku', label: 'Claude 4.5 Haiku (Performance)', isOpenSource: false },
      { value: 'claude-sonnet-4.5', label: 'Claude 4.5 Sonnet', isOpenSource: false },
      { value: 'claude-opus-4.5', label: 'Claude 4.5 Opus', isOpenSource: false },
      { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet', isOpenSource: false },
      { value: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet (Legacy)', isOpenSource: false },
      { value: 'claude-3-5-haiku-latest', label: 'Claude 3.5 Haiku', isOpenSource: false },
      { value: 'claude-3-opus-latest', label: 'Claude 3 Opus', isOpenSource: false },
      { value: 'claude-2.1', label: 'Claude 2.1 (Stability Mode)', isOpenSource: false },
    ],
  },
  gemini: {
    label: 'Google Gemini',
    models: [
      { value: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro (1M Context) — Recommended', isOpenSource: false },
      { value: 'gemini-3.1-flash', label: 'Gemini 3.1 Flash (Vibe Coding)', isOpenSource: false },
      { value: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite (Fast)', isOpenSource: false },
      { value: 'gemini-3-deep-think', label: 'Gemini 3 Deep Think (Reasoning)', isOpenSource: false },
      { value: 'gemma-4-27b', label: 'Gemma 4 (27B) — Open Weight', isOpenSource: true },
      { value: 'gemma-4-9b', label: 'Gemma 4 (9B) — Open Weight', isOpenSource: true },
      { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', isOpenSource: false },
      { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', isOpenSource: false },
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', isOpenSource: false },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Legacy)', isOpenSource: false },
    ],
  },
  mistral: {
    label: 'Mistral AI',
    models: [
      { value: 'mistral-large-3', label: 'Mistral Large 3 (MoE) — Recommended', isOpenSource: true },
      { value: 'ministral-3-14b', label: 'Ministral 3 (14B High-Density)', isOpenSource: true },
      { value: 'ministral-3-8b', label: 'Ministral 3 (8B Workhorse)', isOpenSource: true },
      { value: 'ministral-3-3b', label: 'Ministral 3 (3B Edge)', isOpenSource: true },
      { value: 'codestral-25-08', label: 'Codestral (SOTA Coding)', isOpenSource: true },
      { value: 'pixtral-large-latest', label: 'Pixtral Large (Vision)', isOpenSource: true },
      { value: 'mistral-large-2', label: 'Mistral Large 2', isOpenSource: true },
      { value: 'mixtral-8x22b-v0.3', label: 'Mixtral 8x22B (Large Open)', isOpenSource: true },
      { value: 'mistral-medium-latest', label: 'Mistral Medium (API Only)', isOpenSource: false },
      { value: 'mistral-small-latest', label: 'Mistral Small', isOpenSource: true },
    ],
  },
  deepseek: {
    label: 'DeepSeek',
    models: [
      { value: 'deepseek-v3.2-speciale', label: 'DeepSeek V3.2 Speciale — Recommended', isOpenSource: true },
      { value: 'deepseek-v3.2', label: 'DeepSeek V3.2 (Standard)', isOpenSource: true },
      { value: 'deepseek-r1-0528', label: 'DeepSeek R1 (Advanced Reasoning)', isOpenSource: true },
      { value: 'deepseek-v3-0324', label: 'DeepSeek V3 (Post-RL)', isOpenSource: true },
      { value: 'deepseek-r1-distill-llama-70b', label: 'DeepSeek-R1-Llama-70B', isOpenSource: true },
      { value: 'deepseek-r1-distill-qwen-32b', label: 'DeepSeek-R1-Qwen-32B', isOpenSource: true },
      { value: 'deepseek-vl2', label: 'DeepSeek VL2 (Visual Expert)', isOpenSource: true },
      { value: 'deepseek-prover-v2', label: 'DeepSeek Prover V2 (Math)', isOpenSource: true },
      { value: 'deepseek-chat', label: 'DeepSeek Chat V3', isOpenSource: true },
      { value: 'deepseek-coder-v2.5', label: 'DeepSeek Coder V2.5', isOpenSource: true },
    ],
  },
  groq: {
    label: 'Groq (LPUs)',
    models: [
      { value: 'llama-4-scout-17b', label: 'Llama 4 Scout (10M Context) — Recommended', isOpenSource: true },
      { value: 'llama-4-maverick-70b', label: 'Llama 4 Maverick (70B)', isOpenSource: true },
      { value: 'gpt-oss-120b', label: 'GPT-OSS 120B (Hosted Open Weight)', isOpenSource: true },
      { value: 'qwen-3-235b', label: 'Qwen 3 (235B Flagship)', isOpenSource: true },
      { value: 'qwen-3-coder-32b', label: 'Qwen 3 Coder (32B)', isOpenSource: true },
      { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', isOpenSource: true },
      { value: 'mixtral-8x22b-32768', label: 'Mixtral 8x22B (LPU Speed)', isOpenSource: true },
      { value: 'gemma-2-27b-it', label: 'Gemma 2 27B', isOpenSource: true },
      { value: 'llama-guard-4-12b', label: 'Llama Guard 4 (Safety)', isOpenSource: true },
      { value: 'whisper-large-v3-turbo', label: 'Whisper V3 Turbo', isOpenSource: true },
    ],
  },
};

export const MAIN_MENU_CHOICES = [
  { name: '🚀   Start Gateway', value: 'start' },
  { name: '🛑   Stop Gateway', value: 'stop' },
  { name: '⚙️   Setup', value: 'setup' },
  { name: '🩺   Doctor', value: 'doctor' },
  { name: '🔍   Version', value: 'version' },
  { name: '❌   Exit', value: 'exit' },
];

export const bullet = (msg: string) => pc.bold(pc.cyan(`◆  ${msg}`));
export const formatMessage = (msg: string) => pc.bold(pc.cyan(`● ${msg}`));

export const SETUP_QUESTIONS = {
  agentName: {
    message: 'What would you like to call your primary agent?',
    placeholder: 'Aura',
  },
  projectName: {
    message: 'What is your project name?',
    placeholder: 'clawesome-monorepo',
  },
  provider: {
    message: 'Which LLM provider should power your agents?',
  },
  enableRag: {
    message: 'Enable local RAG (Vector database)?',
  },
  gatewayPort: {
    message: 'Gateway port',
    placeholder: '17879',
  },
  apiKey: {
    message: 'Enter your API Key for the selected provider',
  },
};
