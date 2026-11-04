import { NextResponse } from 'next/server';

export interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  default_branch: string;
  topics?: string[];
}

const FALLBACK_PUBLIC_REPOS: RepoItem[] = [
  {
    id: 101,
    name: 'iceefruit',
    full_name: 'iceefruit/iceefruit',
    description: 'Automated GitHub profile README generator with daily SVG stats updates, streak tracking, language analytics, and custom ASCII graphics via GitHub Actions.',
    html_url: 'https://github.com/iceefruit/iceefruit',
    stargazers_count: 5,
    forks_count: 1,
    language: 'Python',
    updated_at: '2026-11-03T12:47:26Z',
    default_branch: 'main',
    topics: ['github-actions', 'svg', 'analytics', 'automation'],
  },
  {
    id: 102,
    name: 'City-Api',
    full_name: 'iceefruit/City-Api',
    description: 'A fast, serverless-oriented API built for Vercel that resolves locations into customizable vector SVG city map posters, cartographic theme presets, and MapLibre GL specs.',
    html_url: 'https://github.com/iceefruit/City-Api',
    stargazers_count: 12,
    forks_count: 2,
    language: 'TypeScript',
    updated_at: '2026-08-10T12:47:15Z',
    default_branch: 'main',
    topics: ['cartography', 'maplibre', 'svg-export', 'serverless'],
  },
  {
    id: 103,
    name: 'Web-Music-Player',
    full_name: 'iceefruit/Web-Music-Player',
    description: 'Custom browser audio player and audio visualizer with track queueing, waveform scrubbers, and local storage state persistence.',
    html_url: 'https://github.com/iceefruit/Web-Music-Player',
    stargazers_count: 8,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-08-08T11:51:08Z',
    default_branch: 'main',
    topics: ['webaudio', 'audio-visualizer', 'music-player'],
  },
  {
    id: 104,
    name: 'Transparent-Api',
    full_name: 'iceefruit/Transparent-Api',
    description: 'Asynchronous image background removal API powered by quantized ONNX RMBG-1.4 with a Vercel Node.js gateway, FastAPI worker, and HMAC authentication.',
    html_url: 'https://github.com/iceefruit/Transparent-Api',
    stargazers_count: 14,
    forks_count: 3,
    language: 'Python',
    updated_at: '2026-08-08T07:38:06Z',
    default_branch: 'main',
    topics: ['ai-vision', 'onnx', 'background-removal', 'fastapi'],
  },
  {
    id: 105,
    name: 'Transcribe-Api',
    full_name: 'iceefruit/Transcribe-Api',
    description: 'Asynchronous speech-to-text transcription API powered by faster-whisper (int8 CPU) with a Vercel Node.js gateway, FastAPI worker, and HMAC authentication.',
    html_url: 'https://github.com/iceefruit/Transcribe-Api',
    stargazers_count: 19,
    forks_count: 4,
    language: 'Python',
    updated_at: '2026-08-08T07:38:02Z',
    default_branch: 'main',
    topics: ['whisper', 'speech-to-text', 'audio-ai', 'fastapi'],
  },
  {
    id: 106,
    name: 'anime-quotes',
    full_name: 'iceefruit/anime-quotes',
    description: 'Dynamic SVG anime quote cards for GitHub READMEs featuring AniList integration, customizable themes, character/anime filtering, and live refreshing.',
    html_url: 'https://github.com/iceefruit/anime-quotes',
    stargazers_count: 6,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-08T07:38:00Z',
    default_branch: 'main',
    topics: ['anilist', 'dynamic-svg', 'readme-card'],
  },
  {
    id: 107,
    name: 'Iris',
    full_name: 'iceefruit/Iris',
    description: 'Experimental UI framework and real-time animation toolkit for sleek, high-contrast dark interfaces.',
    html_url: 'https://github.com/iceefruit/Iris',
    stargazers_count: 4,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-08-31T14:45:06Z',
    default_branch: 'main',
    topics: ['animation', 'creative-ui', 'threejs'],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'iceefruit';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        'User-Agent': 'Iceefruit-Portfolio-App',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(
          { repos: data, source: 'live' },
          {
            headers: {
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
          }
        );
      }
    }
  } catch (error) {
    console.warn('GitHub API fetch failed or rate limited, using cached repository data.');
  }

  // Graceful fallback to verified repositories
  return NextResponse.json(
    { repos: FALLBACK_PUBLIC_REPOS, source: 'cached' },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
