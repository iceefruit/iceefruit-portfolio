# Iceefruit Portfolio - Project Rules & Guidelines

## 1. Visual & Design Standards
- **Strict 60-30-10 Palette Compliance:**
  - **60% Dominant:** Deep dark monochromatic backgrounds (`#0B0C10`, `#121318`).
  - **30% Structural Grayscale:** Crisp monochromatic elements, silver/slate borders (`#2A2E39`, `#3E4451`), light gray text (`#E2E8F0`, `#94A3B8`).
  - **10% Popping Accent:** Electric Neon Orange (`#FF5E00`, `#FF7700`) for focal points, active states, glowing audio frequency bars, terminal prompts, and folder badges.
- **Glassmorphism & Depth:** Subtle backdrop blur (`backdrop-blur-md`), dark transluscent panels (`bg-black/60`), and hairline border lines.

## 2. Security & Credentials
- **Zero Token Leakage:** Never store or expose GitHub Personal Access Tokens (PAT) in client-side bundles.
- **Secure Fallbacks:** GitHub API routes must have caching headers and structured mock fallbacks to handle rate-limits without breaking user experience.

## 3. Audio & WebGL Best Practices
- **Autoplay Handling:** Always suspend Web Audio API until explicit user gesture (click play / drag crossfader) to comply with browser autoplay policies.
- **WebGL Error Boundaries:** Canvas components must catch WebGL context creation errors and gracefully display a high-tech CSS fallback.

## 4. Git & Commit Discipline
- Commit incrementally for every feature, task, and architectural enhancement.
- Clear commit message formatting (`feat:`, `fix:`, `chore:`, `docs:`).
