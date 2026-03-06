export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  content: string;
  isMarketplace?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  profilePicture: string;
  soulMarkdown?: string;
  createdAt: number;
}
