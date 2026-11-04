# Iceefruit Portfolio Website - Design Document

**Date:** 2026-11-04  
**Author:** Antigravity & Iceefruit  
**Status:** Approved for Builder Check  

---

## 1. Intent and Vision

The goal is to build an unforgettable, high-impact personal portfolio website for **Iceefruit**. Rather than a generic cookie-cutter resume site, this portfolio is an interactive digital experience combining cutting-edge WebGL 3D graphics, a functional dual-deck music mixer station, an OS-inspired folder/window project explorer with interactive mini-app sandboxes, and a live GitHub repository vault.

### Visual Identity & Palette
The design strictly follows the **60-30-10 Rule**:
- **60% Dominant:** Deep dark monochromatic tones (graphite `#0B0C10`, obsidian `#121318`, charcoal `#1A1C23`).
- **30% Structural Grayscale:** Crisp monochromatic elements, silver borders (`#2A2E39`, `#3E4451`), frosted glass surfaces, and clean light gray/off-white typography (`#E2E8F0`, `#94A3B8`).
- **10% Popping Accent:** Electric Neon Orange (`#FF5E00` / `#FF7700` / `#FF4500`) for focal points, glow states, active audio frequencies, hover indicators, terminal prompts, and folder tabs.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Immersive 3D Experience:** A responsive Three.js / WebGL background scene and hero core that smoothly animates and morphs based on scroll position and audio frequency, with cursor-driven parallax.
- **Dual-Deck Audio Mixer:** A real-time music player and mixer station with a dual-channel crossfader, volume & EQ filter knobs, a glowing orange Web Audio API frequency visualizer, preloaded cyber/lofi audio tracks, and custom drag-and-drop audio file support.
- **OS Folder Project Explorer:** An interactive desktop/file-system interface where users can click folders to launch modal windows featuring live interactive project demos, specs, and source code.
- **Live GitHub Repository Vault:** Integration with GitHub's public API to browse public repositories (with repo statistics, file tree inspection, and README viewer) alongside a curated "Private / NDA" project showcase displaying architecture diagrams and verified metrics without leaking private tokens.
- **Seamless Responsiveness & Performance:** 60 FPS animations with graceful fallbacks for low-power mobile devices.

### Non-Goals
- Full multi-user authentication system (visitors do not need an account to interact).
- Streaming external music services like Spotify/SoundCloud (self-contained Web Audio API engine ensures reliability without third-party API rate limits).

### Anti-Goals
- Cluttered, overwhelming UI: The 60-30-10 rule ensures clean contrast and prevents visual fatigue.
- Exposing GitHub Personal Access Tokens (PAT) on the client side: Private repositories must never expose auth tokens to visitors.

---

## 3. Approaches Considered & Trade-Offs

### Approach A: Static SPA (Vite + React)
- *Pros:* Extremely lightweight build, easy static hosting.
- *Cons:* No server-side API proxy, making secure caching and GitHub rate-limit protection difficult.

### Approach B: Multi-Window Virtual Desktop (Full OS Simulation)
- *Pros:* Highly interactive novelty.
- *Cons:* High cognitive friction for visitors looking to quickly understand who Iceefruit is, see projects, or find contact information.

### Approach C (Selected): Next.js 15 App Router + Hybrid 5-Section Narrative Flow
- *Pros:*
  - Next.js App Router provides server-side API routes for GitHub data caching and token protection.
  - Linear 5-section narrative flow allows natural scrolling while embedding rich interactive stations (3D hero, DJ mixer, OS folder explorer, GitHub vault).
  - Modern React 19 / 18, Tailwind CSS, Framer Motion, and Three.js provide industry-leading 3D rendering and micro-interactions.
- *Decision:* **Approach C** was selected during the design interview.

---

## 4. Architecture & Section Breakdown

### Section 1: Hero Station (3D Dynamic Core)
- **3D Interactive Canvas:** A morphing geometric core / cybernetic wireframe sphere surrounded by floating particle fields.
- **Scroll Logic:** As the user scrolls, the 3D camera transitions angles, wireframe density adjusts, and rotation speeds change smoothly.
- **Identity Banner:** "Iceefruit" title with glowing orange gradient typography, real-time status pill ("ONLINE / SYSTEM READY"), quick terminal bio, and CTA buttons ("Explore Files", "Launch Deck").

### Section 2: Load Profile & Cyber Terminal
- **Profile Card:** Avatar frame with glowing orange accents, custom banner container, social links (GitHub, Discord, X/Twitter, etc.).
- **Interactive Cyber Terminal:** An interactive CLI shell where visitors can type commands (`help`, `skills`, `projects`, `contact`, `clear`, `mix`) with instant responses.
- **System Metrics & Tech Stack:** Monochromatic badges with orange highlight states representing proficiencies (TypeScript, React, Python, Three.js, Node.js, Web3, etc.).

### Section 3: Dual-Deck DJ Mixer & Music Library
- **Web Audio API Engine:** Dual audio channels (Deck A & Deck B).
- **Controls:**
  - Crossfader slider smoothly interpolating volume between Deck A and Deck B.
  - Channel volume faders, play/pause/cue triggers, loop toggles.
  - Low-pass / high-pass biquad filter knobs.
- **Visualizer:** Real-time canvas frequency analyzer rendering bouncing waveform bars in electric orange.
- **Library:** Curated cyberpunk/lofi royalty-free tracks, plus a drag-and-drop zone allowing users to drop their own `.mp3` or `.wav` files into either deck.

### Section 4: OS Folder Project Explorer
- **Desktop Grid:** Custom folder icons with orange accents (e.g., `Projects/`, `Experiments/`, `Tools/`, `AudioLab/`).
- **Window Management System:** Clicking a folder or project opens an OS-style window modal:
  - Header with minimize, maximize, and close controls.
  - Sidebar showing file tree (`overview.md`, `demo.live`, `tech-stack.json`).
  - Active Preview Pane: Embedded interactive mini-app sandboxes (e.g., an interactive Audio Synth demo, a 3D Geometry Sandbox, or live Web App previews).

### Section 5: GitHub Repository Vault & Contact Uplink
- **Public Repositories:** Fetched live from `api.github.com/users/Iceefruit/repos` (or configured handle). Clicking a repo expands an interactive drawer with live commit stats, star/fork counts, language distribution, and README viewer.
- **Private Project Showcase:** Dedicated "Internal / Classified" section with NDA badge tags, architecture summaries, and metric highlights.
- **Contact Uplink:** Sleek contact card with interactive form (name, email, message) and instant copy-to-clipboard buttons for Discord handle and email.

---

## 5. Technical Specifications

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom color configuration (`icee-dark`, `icee-surface`, `icee-border`, `icee-orange`)
- **3D Graphics:** Three.js + `@react-three/fiber` + `@react-three/drei` (with fallback to pure Three.js canvas for maximum bundle efficiency and control)
- **Animation:** Framer Motion for scroll triggers, spring transitions, and window drag physics
- **Icons:** `lucide-react`
- **Audio:** Native Web Audio API (`AudioContext`, `AnalyserNode`, `BiquadFilterNode`, `GainNode`)

---

## 6. What Is Left to the Builder

- Exact layout coordinates and responsive breakpoints (mobile, tablet, desktop).
- Default sample track generation / curation (synthesized web audio loops and ambient cyberpunk soundscapes).
- Pre-built interactive mini-apps for the OS folder explorer.
- GitHub API client error handling and fallback mock data when API rate limits are encountered.
