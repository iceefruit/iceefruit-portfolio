# Iceefruit Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a sleek, high-impact personal portfolio website for Iceefruit featuring a 60-30-10 grayscale/electric-orange aesthetic, scroll-driven dynamic 3D WebGL core, dual-deck DJ audio mixer with real-time frequency visualizer, desktop OS-style folder project explorer with interactive mini-app sandboxes, and a live GitHub repository vault.

**Architecture:** Next.js 15 App Router application with client-side Three.js canvas for 3D graphics, native Web Audio API singleton for dual-channel audio mixing and frequency analysis, Framer Motion for scroll-driven animations and draggable OS window modals, and server-side API routes for GitHub repository caching and token-protected private showcase.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, Framer Motion, Lucide React, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-04-iceefruit-portfolio-design.md`

## Global Constraints

- Palette strictly adheres to the 60-30-10 rule: 60% deep dark graphite (`#0B0C10`, `#121318`), 30% structural grayscale & silver borders (`#2A2E39`, `#94A3B8`, `#E2E8F0`), 10% electric neon orange (`#FF5E00`, `#FF7700`).
- Responsive across mobile, tablet, and desktop (>=320px to 4K).
- GitHub Personal Access Tokens (PAT) must NEVER be exposed to the client browser.
- Audio engine must provide built-in synthesized or royalty-free audio tracks so the site works immediately without external media hosting dependencies.
- 3D WebGL canvas must have a graceful CSS fallback if WebGL is disabled or unsupported.

## Review Focus

1. **Audio Context Autoplay Policy:** Browsers block audio playback before user interaction; engine must stay suspended gracefully without throwing errors until user initiates playback.
2. **GitHub API Rate Limiting (403):** Public unauthenticated GitHub API has a 60 req/hour limit; server API route must cache results and gracefully serve structured fallback mock data if rate-limited.
3. **WebGL Context Loss / Unsupported Device:** Three.js canvas must gracefully handle context loss or unsupported WebGL without crashing the page layout.
4. **Drag Boundaries on Mobile for OS Windows:** Draggable modals must remain within viewport bounds and be fully usable on touch screens.
5. **Crossfader Audio Clamping:** Crossfader math must linearly or equal-power clamp values between 0.0 and 1.0 without audio clipping or NaN volume levels.

---

### Task 1: Project Scaffolding, Tailwind Config & Test Harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Test: `src/test/scaffolding.test.ts`

**Interfaces:**
- Consumes: None
- Produces: Base Next.js app with Tailwind palette tokens (`icee-dark`, `icee-surface`, `icee-border`, `icee-orange`), fonts, and Vitest test runner.

- [ ] **Step 1: Write the failing test for theme tokens and layout setup**

```typescript
// src/test/scaffolding.test.ts
import { describe, it, expect } from 'vitest';
import tailwindConfig from '../../tailwind.config';

describe('Design Tokens & Palette Configuration', () => {
  it('defines the strict 60-30-10 orange and grayscale palette', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>;
    expect(colors).toBeDefined();
    expect(colors['icee-dark']).toBe('#0B0C10');
    expect(colors['icee-surface']).toBe('#121318');
    expect(colors['icee-border']).toBe('#2A2E39');
    expect(colors['icee-orange']).toBe('#FF5E00');
    expect(colors['icee-orange-glow']).toBe('#FF7700');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/scaffolding.test.ts`  
Expected: FAIL (missing config or dependencies)

- [ ] **Step 3: Implement project scaffolding, Tailwind config, and Next.js layout**

Initialize `package.json` with Next.js 15, React 19, Tailwind CSS, Lucide React, Three.js, Framer Motion, and Vitest. Configure `tailwind.config.ts` with the exact 60-30-10 hex tokens. Create `globals.css` with dark theme defaults and custom scrollbars.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/scaffolding.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.mjs tailwind.config.ts vitest.config.ts src/
git commit -m "chore: scaffold Next.js app with 60-30-10 Tailwind theme and Vitest test runner"
```

---

### Task 2: Core Data Stores & TypeScript Models

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/private-projects.ts`
- Test: `src/test/data.test.ts`

**Interfaces:**
- Consumes: None
- Produces:
  - `ProfileData`: `{ name: string; handle: string; title: string; bio: string; status: string; avatarUrl: string; bannerUrl: string; socials: SocialLink[]; skills: SkillGroup[] }`
  - `PrivateProject`: `{ id: string; title: string; codename: string; classification: string; description: string; techStack: string[]; metrics: { label: string; value: string }[]; architectureSummary: string }`

- [ ] **Step 1: Write the failing test for profile data and private project records**

```typescript
// src/test/data.test.ts
import { describe, it, expect } from 'vitest';
import { profileData } from '../data/profile';
import { privateProjects } from '../data/private-projects';

describe('Core Data & Identity', () => {
  it('exposes Iceefruit profile data with required fields', () => {
    expect(profileData.name).toBe('Iceefruit');
    expect(profileData.handle).toBe('Iceefruit');
    expect(profileData.status).toContain('ONLINE');
    expect(profileData.socials.length).toBeGreaterThan(0);
    expect(profileData.skills.length).toBeGreaterThan(0);
  });

  it('exposes curated private projects with NDA badges and metrics', () => {
    expect(privateProjects.length).toBeGreaterThanOrEqual(2);
    privateProjects.forEach(proj => {
      expect(proj.classification).toBe('CLASSIFIED / INTERNAL');
      expect(proj.techStack.length).toBeGreaterThan(0);
      expect(proj.metrics.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/data.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement TypeScript types and data stores**

Define typed models in `src/types/index.ts`. Create `src/data/profile.ts` with Iceefruit's bio, skills, and drop-in image paths (`/assets/pfp.png`, `/assets/banner.png`). Create `src/data/private-projects.ts` with high-tech internal projects.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/data.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/data/
git commit -m "feat: add profile data and private projects data model"
```

---

### Task 3: Web Audio API Engine & Crossfader Math

**Files:**
- Create: `src/lib/audioEngine.ts`
- Test: `src/test/audioEngine.test.ts`

**Interfaces:**
- Consumes: Web Audio API standard interfaces (`AudioContext`, `GainNode`, `BiquadFilterNode`, `AnalyserNode`)
- Produces:
  - `class DualDeckAudioEngine`:
    - `init(): Promise<void>`
    - `setCrossfader(value: number): void` (0.0 = 100% Deck A, 1.0 = 100% Deck B)
    - `setDeckGain(deck: 'A' | 'B', volume: number): void`
    - `setDeckFilter(deck: 'A' | 'B', frequency: number): void`
    - `play(deck: 'A' | 'B'): Promise<void>`
    - `pause(deck: 'A' | 'B'): void`
    - `getFrequencyData(deck?: 'A' | 'B'): Uint8Array`
    - `loadSampleAudio(deck: 'A' | 'B', trackId: string): Promise<void>`
    - `loadUserFile(deck: 'A' | 'B', file: File): Promise<void>`
    - `calculateCrossfaderGains(pos: number): { gainA: number; gainB: number }` (Equal-power crossfade curve)

- [ ] **Step 1: Write the failing test for crossfader curves and audio engine calculations**

```typescript
// src/test/audioEngine.test.ts
import { describe, it, expect } from 'vitest';
import { calculateCrossfaderGains } from '../lib/audioEngine';

describe('Audio Engine Crossfader Math', () => {
  it('calculates equal-power crossfader gains correctly', () => {
    // Deck A full
    const fullA = calculateCrossfaderGains(0.0);
    expect(fullA.gainA).toBeCloseTo(1.0, 2);
    expect(fullA.gainB).toBeCloseTo(0.0, 2);

    // Center mix (equal power ~0.707)
    const center = calculateCrossfaderGains(0.5);
    expect(center.gainA).toBeCloseTo(Math.cos(0.5 * 0.5 * Math.PI), 2);
    expect(center.gainB).toBeCloseTo(Math.sin(0.5 * 0.5 * Math.PI), 2);

    // Deck B full
    const fullB = calculateCrossfaderGains(1.0);
    expect(fullA.gainA).toBeCloseTo(1.0, 2);
    expect(fullB.gainB).toBeCloseTo(1.0, 2);
  });

  it('clamps invalid out-of-bounds crossfader values', () => {
    const negative = calculateCrossfaderGains(-0.5);
    expect(negative.gainA).toBeCloseTo(1.0, 2);
    expect(negative.gainB).toBeCloseTo(0.0, 2);

    const overflow = calculateCrossfaderGains(1.5);
    expect(overflow.gainA).toBeCloseTo(0.0, 2);
    expect(overflow.gainB).toBeCloseTo(1.0, 2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/audioEngine.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement Web Audio API Engine and synthesized audio generator**

Implement `calculateCrossfaderGains` with equal-power cosine/sine crossfade law. Implement `DualDeckAudioEngine` class supporting browser audio context lifecycle, procedural synthesized beats (synth bass + hi-hat + arpeggio) as default sample tracks, and audio file decoding.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/audioEngine.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/audioEngine.ts src/test/audioEngine.test.ts
git commit -m "feat: implement Web Audio API dual-deck engine with equal-power crossfader"
```

---

### Task 4: Dual-Deck DJ Mixer UI & Glowing Audio Visualizer

**Files:**
- Create: `src/components/mixer/AudioVisualizer.tsx`
- Create: `src/components/mixer/DeckChannel.tsx`
- Create: `src/components/mixer/DjMixerStation.tsx`
- Test: `src/test/DjMixerStation.test.tsx`

**Interfaces:**
- Consumes: `DualDeckAudioEngine`, `calculateCrossfaderGains`
- Produces:
  - `<DjMixerStation />`: Interactive dual-channel DJ console with crossfader, play/cue buttons, knobs, and frequency visualizer.
  - `<AudioVisualizer analyserNode={AnalyserNode | null} />`: High-speed HTML5 Canvas rendering glowing orange audio bars.

- [ ] **Step 1: Write the failing test for mixer controls rendering and user interaction**

```typescript
// src/test/DjMixerStation.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DjMixerStation } from '../components/mixer/DjMixerStation';

describe('DjMixerStation Component', () => {
  it('renders Deck A, Deck B, crossfader, and visualizer container', () => {
    render(<DjMixerStation />);
    expect(screen.getByText(/DECK A/i)).toBeDefined();
    expect(screen.getByText(/DECK B/i)).toBeDefined();
    expect(screen.getByRole('slider', { name: /crossfader/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/DjMixerStation.test.tsx`  
Expected: FAIL

- [ ] **Step 3: Implement DjMixerStation, DeckChannel, and AudioVisualizer**

Build the mixer UI in the 60-30-10 palette with dark frosted panels, silver border accents, glowing orange active states, interactive knobs/sliders, drag-and-drop audio dropzones, and requestAnimationFrame canvas visualizer.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/DjMixerStation.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/mixer/
git commit -m "feat: build dual-deck DJ mixer station and neon orange visualizer"
```

---

### Task 5: Interactive 3D WebGL Canvas & Scroll Logic

**Files:**
- Create: `src/components/3d/HeroCore.tsx`
- Create: `src/components/3d/ParticleField.tsx`
- Create: `src/components/3d/SceneCanvas.tsx`
- Create: `src/hooks/useScrollProgress.ts`
- Test: `src/test/scrollHook.test.ts`

**Interfaces:**
- Consumes: Three.js WebGLRenderer, Scene, PerspectiveCamera, Mesh, BufferGeometry
- Produces:
  - `useScrollProgress()`: Returns `{ scrollYProgress: number; activeSection: string }`
  - `<SceneCanvas />`: Dynamic 3D canvas positioned in background with pointer parallax, scroll-driven camera rotation, and fallback for non-WebGL browsers.

- [ ] **Step 1: Write the failing test for useScrollProgress hook**

```typescript
// src/test/scrollHook.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

describe('useScrollProgress Hook', () => {
  it('initializes with 0 scroll progress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.scrollYProgress).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/scrollHook.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement 3D canvas, geometric core, and scroll listener**

Create `HeroCore.tsx` rendering an icosahedron/torus knot wireframe with neon orange vertex highlights, `ParticleField.tsx` rendering floating cyber dust particles, and `SceneCanvas.tsx` with requestAnimationFrame loop, pointer tracking, and WebGL error boundary.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/scrollHook.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/3d/ src/hooks/
git commit -m "feat: add 3D WebGL hero core with scroll-driven camera rotation and particle field"
```

---

### Task 6: OS Folder Explorer & Interactive Mini-App Sandboxes

**Files:**
- Create: `src/components/explorer/WindowModal.tsx`
- Create: `src/components/explorer/MiniAppSandbox.tsx`
- Create: `src/components/explorer/FolderExplorer.tsx`
- Test: `src/test/FolderExplorer.test.tsx`

**Interfaces:**
- Consumes: Framer Motion `motion.div`
- Produces:
  - `<FolderExplorer />`: Desktop-style folder grid (`Projects/`, `Lab/`, `Tools/`)
  - `<WindowModal />`: OS window modal with title bar, minimize, maximize, close, and drag capability.
  - Interactive mini-apps:
    - *Mini Synth Pad*: 8-key interactive audio pad with neon orange glow on press.
    - *3D Geometry Sandbox*: Interactive rotatable 3D wireframe preview.
    - *Project Spec Viewer*: Tabbed code, architecture breakdown, and live preview links.

- [ ] **Step 1: Write the failing test for FolderExplorer and WindowModal open/close state**

```typescript
// src/test/FolderExplorer.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FolderExplorer } from '../components/explorer/FolderExplorer';

describe('FolderExplorer & Window Modal', () => {
  it('renders project folders and opens window modal when a folder is clicked', () => {
    render(<FolderExplorer />);
    const folder = screen.getByText(/Interactive Audio Lab/i);
    expect(folder).toBeDefined();
    fireEvent.click(folder);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/IceeOS Window/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/FolderExplorer.test.tsx`  
Expected: FAIL

- [ ] **Step 3: Implement FolderExplorer, WindowModal, and MiniAppSandbox**

Build the folder grid with glowing orange hover accents, OS title bar with close/minimize buttons, draggable window container via Framer Motion, and embedded interactive mini-apps.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/FolderExplorer.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/explorer/
git commit -m "feat: implement OS desktop folder explorer with draggable window modals and mini-apps"
```

---

### Task 7: GitHub Repository Vault & Cyber Terminal

**Files:**
- Create: `src/app/api/github/repos/route.ts`
- Create: `src/components/github/RepoVault.tsx`
- Create: `src/components/terminal/CyberTerminal.tsx`
- Test: `src/test/githubApi.test.ts`
- Test: `src/test/CyberTerminal.test.tsx`

**Interfaces:**
- Consumes: GitHub REST API (`https://api.github.com/users/{username}/repos`)
- Produces:
  - `GET /api/github/repos?username=Iceefruit`: Returns array of public repositories with caching, star count, languages, and rate-limit fallback.
  - `<RepoVault />`: Tabbed view for Public Repositories (live from API with README/inspect drawer) and Classified Private Repositories (with NDA tags and verified metrics).
  - `<CyberTerminal />`: Interactive command line shell (`help`, `about`, `skills`, `projects`, `mix`, `contact`, `clear`).

- [ ] **Step 1: Write the failing test for GitHub API route and CyberTerminal command execution**

```typescript
// src/test/githubApi.test.ts
import { describe, it, expect } from 'vitest';
import { GET } from '../app/api/github/repos/route';

describe('GitHub Repos API Route', () => {
  it('returns valid JSON array with repo schema even under network fallback', async () => {
    const req = new Request('http://localhost:3000/api/github/repos?username=Iceefruit');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.repos)).toBe(true);
    expect(data.repos.length).toBeGreaterThan(0);
    expect(data.repos[0]).toHaveProperty('name');
    expect(data.repos[0]).toHaveProperty('stargazers_count');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/githubApi.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement GitHub API route, RepoVault, and CyberTerminal**

Build server route with caching headers and mock data fallback. Implement RepoVault with public and private tabs, repository search, language badges, and inspect drawer. Implement CyberTerminal with full keyboard input history (Up/Down arrow keys) and custom commands.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/githubApi.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/api/github/ src/components/github/ src/components/terminal/
git commit -m "feat: add GitHub repo vault with public/private showcase and interactive cyber terminal"
```

---

### Task 8: Hero Profile, Navigation, Contact Uplink & Full Page Integration

**Files:**
- Create: `src/components/hero/HeroSection.tsx`
- Create: `src/components/profile/ProfileSection.tsx`
- Create: `src/components/contact/ContactUplink.tsx`
- Create: `src/components/nav/Navbar.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/test/integration.test.tsx`

**Interfaces:**
- Consumes: All section components from Tasks 2-7
- Produces: Integrated 5-section narrative page with sticky navigation, audio playback indicator, and contact form.

- [ ] **Step 1: Write the failing integration test for the full portfolio page**

```typescript
// src/test/integration.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Iceefruit Portfolio Full Page Integration', () => {
  it('renders all 5 core stations and navigation bar', async () => {
    render(<Page />);
    expect(screen.getByText(/Iceefruit/i)).toBeDefined();
    expect(screen.getByText(/DECK A/i)).toBeDefined();
    expect(screen.getByText(/SYSTEM REPOSITORIES/i)).toBeDefined();
    expect(screen.getByText(/TRANSMIT UPLINK/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/integration.test.tsx`  
Expected: FAIL

- [ ] **Step 3: Implement HeroSection, ProfileSection, ContactUplink, Navbar, and assemble `page.tsx`**

Integrate all components with scroll triggers, navbar active section tracking, contact form with instant copy for Discord/email, and responsive layout.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/test/integration.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: complete 5-section portfolio integration with hero, profile, nav, and contact uplink"
```

---

### Task 9: Production Build & Asset Dropzone Preparation

**Files:**
- Create: `public/assets/README.md`
- Create: `public/assets/pfp.png` (Cybernetic SVG/PNG placeholder)
- Create: `public/assets/banner.png` (Cybernetic SVG/PNG placeholder)
- Test: Full production build command

**Interfaces:**
- Consumes: All files
- Produces: Production Next.js build (`next build`) and ready-to-run development/production server.

- [ ] **Step 1: Write placeholder cybernetic avatar and banner SVGs**
- [ ] **Step 2: Run full test suite across all tasks**

Run: `npx vitest run`  
Expected: All test suites PASS

- [ ] **Step 3: Run production build check**

Run: `npm run build`  
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add public/assets/
git commit -m "chore: add avatar and banner dropzone assets and verify production build"
```
