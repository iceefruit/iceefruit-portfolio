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
