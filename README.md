# Iceefruit Portfolio Website

A personal portfolio website and interactive digital workstation for **Iceefruit**.

Designed following the **60-30-10 rule**:
- **60% Dominant:** Deep dark graphite & obsidian backgrounds (`#0B0C10`, `#121318`)
- **30% Structural Grayscale:** Monochromatic surfaces, frosted glass, and silver borders (`#2A2E39`, `#94A3B8`)
- **10% Popping Accent:** Electric Neon Orange (`#FF5E00`, `#FF7700`) for focal points, audio spectrum visualizers, terminal prompts, and active controls.

---

## Key Features

1. **Interactive 3D WebGL Core (`Three.js`)**:
   - Audio-reactive geometric wireframe icosahedron and floating cybernetic dust particle field.
   - Real-time scroll-driven camera rotation, zoom, and mouse parallax tilt.
   - Built-in graceful CSS fallback for devices without WebGL support.

2. **Dual-Deck DJ Audio Mixer & Sound Lab (`Web Audio API`)**:
   - Channel A and Channel B audio decks with independent gain and low-pass filter controls.
   - Real-time HTML5 Canvas audio frequency spectrum visualizer glowing in neon orange.
   - Equal-power mathematical crossfader slider with quick-cut buttons.
   - Procedural synthetic acid bass & lofi pad generators (plays immediately out-of-the-box).
   - Drag-and-drop support to load your own custom `.mp3` and `.wav` tracks into either deck.

3. **Desktop OS Folder Explorer (`IceeOS`)**:
   - Desktop folder grid that opens draggable, maximizable OS-style window modals.
   - Built-in interactive sandboxes:
     - **8-Slot Audio Synth Pad**: Real-time sound synthesis (sub-bass, kicks, snares, lasers, arps).
     - **3D Geometry Sandbox**: Real-time 3D wireframe mesh switcher (Torus, Icosahedron, Cube, Octahedron).
     - **Classified Architecture & Code Viewer**: Interactive specifications and telemetry.

4. **Live GitHub Repository Vault (`@iceefruit`)**:
   - Dynamically fetches public repositories from GitHub with automatic rate-limit fallback.
   - Clicking public repositories opens an interactive file inspector with README previews and GitHub links.
   - Classified Internal Projects showcase (`ExML`, `GoldAlgo MT5`, `Edge Media Resolvers`, `Plexity Dashboard`) with NDA badges, verified latency benchmarks, and metrics.

5. **Interactive Cyber Terminal Shell**:
   - Full keyboard command line interface (`help`, `about`, `skills`, `projects`, `mix`, `contact`, `clear`).
   - Arrow Up / Arrow Down command history.

6. **Custom Asset Dropzones**:
   - Dedicated dropzones in `/public/assets` for `pfp.png` and `banner.png`.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI & Styling:** React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **3D Graphics:** Three.js
- **Audio DSP:** Native Web Audio API
- **Testing:** Vitest, Testing Library, JSDOM

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run automated tests
npm test

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
