import { describe, it, expect } from 'vitest';
import { calculateCrossfaderGains, DualDeckAudioEngine } from '../lib/audioEngine';

describe('Audio Engine Crossfader Math', () => {
  it('calculates equal-power crossfader gains correctly', () => {
    // Deck A full (position 0.0)
    const fullA = calculateCrossfaderGains(0.0);
    expect(fullA.gainA).toBeCloseTo(1.0, 2);
    expect(fullA.gainB).toBeCloseTo(0.0, 2);

    // Center mix (position 0.5 -> equal power ~0.707)
    const center = calculateCrossfaderGains(0.5);
    expect(center.gainA).toBeCloseTo(Math.cos(0.5 * 0.5 * Math.PI), 2);
    expect(center.gainB).toBeCloseTo(Math.sin(0.5 * 0.5 * Math.PI), 2);

    // Deck B full (position 1.0)
    const fullB = calculateCrossfaderGains(1.0);
    expect(fullB.gainA).toBeCloseTo(0.0, 2);
    expect(fullB.gainB).toBeCloseTo(1.0, 2);
  });

  it('clamps invalid out-of-bounds crossfader values without NaN or clipping', () => {
    const negative = calculateCrossfaderGains(-0.5);
    expect(negative.gainA).toBeCloseTo(1.0, 2);
    expect(negative.gainB).toBeCloseTo(0.0, 2);

    const overflow = calculateCrossfaderGains(1.5);
    expect(overflow.gainA).toBeCloseTo(0.0, 2);
    expect(overflow.gainB).toBeCloseTo(1.0, 2);
  });

  it('initializes DualDeckAudioEngine instance in suspended state to respect browser autoplay policy', () => {
    const engine = new DualDeckAudioEngine();
    expect(engine).toBeDefined();
    expect(engine.isInitialized).toBe(false);
  });
});
