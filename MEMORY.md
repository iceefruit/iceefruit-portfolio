# Iceefruit Portfolio - Project Memory & Decisions

## Context
- **Owner:** Iceefruit (`iceefruit` on GitHub, `iceefruit.2@gmail.com`)
- **Project Type:** High-end Cybernetic/Monochrome Personal Portfolio & Interactive Hub
- **GitHub Target:** `iceefruit/iceefruit-portfolio`

## Key Architecture Decisions
1. **Framework:** Next.js 15 App Router with TypeScript.
2. **Audio System:** Native Web Audio API with a Dual-Deck mixing architecture (Deck A and Deck B), equal-power crossfader, biquad lowpass/highpass filter, real-time frequency spectrum analyser, and procedural synthetic beats (so no external audio hosting is required to enjoy the mixer immediately).
3. **Interactive 3D:** Three.js canvas with an audio-reactive icosahedron/wireframe core and floating cyber particles that rotate with scroll progress and mouse position.
4. **OS Window / Folder Explorer:** `IceeOS` interface with draggable/collapsible window modals hosting interactive mini-applications (audio synth pad, 3D wireframe sandbox, code viewer).
5. **GitHub Integration:** Dynamic server API route at `/api/github/repos` fetching live public repositories, paired with a curated "Private / Classified Projects" showcase reflecting real projects (such as `ExML`, `MeraGold`, `GoldAlgo`, `PlexityJs`, `Instagram-Api`, `TikTok-Api`).
