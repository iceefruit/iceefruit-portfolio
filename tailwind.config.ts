import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'icee-dark': '#0B0C10',
        'icee-darker': '#07080A',
        'icee-surface': '#121318',
        'icee-card': '#161820',
        'icee-border': '#2A2E39',
        'icee-border-light': '#3E4451',
        'icee-text-muted': '#94A3B8',
        'icee-text-bright': '#F1F5F9',
        'icee-orange': '#FF5E00',
        'icee-orange-glow': '#FF7700',
        'icee-orange-dark': '#D44E00',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        serif: ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'editorial': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      boxShadow: {
        'orange-glow': '0 0 25px -5px rgba(255, 94, 0, 0.45)',
        'orange-glow-lg': '0 0 40px -5px rgba(255, 94, 0, 0.65)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
