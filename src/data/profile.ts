import { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: 'Iceefruit',
  handle: 'iceefruit',
  title: 'Creative Technologist & Full-Stack Architect',
  bio: 'Engineering high-performance web applications, interactive 3D WebGL experiences, algorithmic audio systems, and modern digital interfaces. Obsessed with high aesthetic density and ultra-low latency.',
  status: 'ONLINE // AVAILABLE FOR CONTRACTS & COLLABS',
  location: 'Global / Remote',
  avatarUrl: '/assets/pfp.png',
  bannerUrl: '/assets/banner.png',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/iceefruit',
      handle: '@iceefruit',
      icon: 'Github',
    },
    {
      platform: 'Discord',
      url: 'https://discord.com',
      handle: 'iceefruit',
      icon: 'MessageSquare',
    },
    {
      platform: 'Email',
      url: 'mailto:iceefruit.2@gmail.com',
      handle: 'iceefruit.2@gmail.com',
      icon: 'Mail',
    },
  ],
  stats: [
    {
      label: 'PUBLIC REPOSITORIES',
      value: '12+',
      subtext: 'Open Source Tools & APIs',
    },
    {
      label: 'PRODUCTION STACKS',
      value: 'Next.js / FastAPI',
      subtext: 'Microservices & Full-Stack',
    },
    {
      label: 'GRAPHICS & AUDIO',
      value: 'Three.js / WebAudio',
      subtext: 'Real-time Interactive Systems',
    },
    {
      label: 'SYSTEM LATENCY',
      value: '< 45ms',
      subtext: 'Edge Runtime Optimized',
    },
  ],
  skills: [
    { name: 'TypeScript & JavaScript', level: 95, category: 'core' },
    { name: 'React 19 & Next.js 15', level: 94, category: 'frontend' },
    { name: 'Three.js & WebGL', level: 88, category: 'frontend' },
    { name: 'Tailwind CSS & Framer Motion', level: 92, category: 'frontend' },
    { name: 'Node.js & Bun', level: 90, category: 'backend' },
    { name: 'Python & FastAPI', level: 89, category: 'backend' },
    { name: 'Web Audio API & DSP Synthesis', level: 86, category: 'audio' },
    { name: 'Git & Linux Workstations', level: 91, category: 'tools' },
  ],
};
