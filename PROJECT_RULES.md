# Iceefruit Portfolio - Project Rules & Anti-Slop Directives

## 1. Active Skill Stack (`top-design` + `editorial-portfolio-chapters` + `portfolio-case-study-writer` + `no-ai-design-slop`)
- **Typography as Architecture:** Load `Space Grotesk`, `Instrument Serif`, and `JetBrains Mono` via `next/font/google`. Maintain a 10:1 scale ratio between monumental display headers and body copy. Never use generic `Inter` or `Arial` as display type.
- **No AI Slop:**
  - Zero skill percentage bars. Use oversized editorial capability rows and real architectural proof.
  - Zero generic 3-column rounded icon cards. Use 12-column exposed `1px` hairline structural grids, index tables, and physical folder tabs.
  - Zero emojis in UI components. Use bespoke SVG schematics, isometric line illustrations, and halftone geometry.
  - Zero chatty filler copy or em-dashes. Every line of copy uses concrete engineering nouns and verified metrics.
- **Strict 60-30-10 Palette Compliance:**
  - **60% Dominant:** Deep dark monochromatic backgrounds (`#0B0C10`, `#121318`).
  - **30% Structural Grayscale:** Crisp monochromatic elements, silver/slate borders (`#2A2E39`, `#3E4451`), warm alabaster text (`#F1F5F9`, `#94A3B8`).
  - **10% Popping Accent:** International Signal Orange (`#FF5E00`, `#FF7700`) for focal points, active relays, glowing audio frequency bars, terminal prompts, and folder tabs.

## 2. Security & Credentials
- **Zero Token Leakage:** Never store or expose GitHub Personal Access Tokens (PAT) in client-side bundles.
- **Secure Fallbacks:** GitHub API routes must have caching headers and structured fallbacks to handle rate-limits without breaking user experience.

## 3. Audio & WebGL Best Practices
- **Autoplay Handling:** Always suspend Web Audio API until explicit user gesture to comply with browser autoplay policies.
- **WebGL Error Boundaries:** Canvas components must catch WebGL context creation errors and gracefully display a high-tech CSS fallback.

## 4. Git & Commit Discipline
- Commit every significant change to git and push to `origin/main`.
- Run Vitest verification tests before committing.
