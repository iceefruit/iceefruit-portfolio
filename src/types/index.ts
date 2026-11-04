export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'core' | 'frontend' | 'backend' | 'audio' | 'tools';
}

export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  bio: string;
  status: string;
  location: string;
  avatarUrl: string;
  bannerUrl: string;
  socials: SocialLink[];
  skills: SkillItem[];
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export interface PrivateProject {
  id: string;
  title: string;
  codename: string;
  classification: string;
  role: string;
  timeline: string;
  description: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureSummary: string;
  highlights: string[];
}

export interface PublicRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  open_issues_count?: number;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  genre: string;
  url?: string; // Built-in synthesized loop if undefined
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  appType: 'synth' | 'geometry' | 'spec' | 'markdown';
  data?: any;
}
