import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Iceefruit Portfolio Full Page Integration', () => {
  it('renders all core stations, case study chapters, custom schematics, and identity branding', async () => {
    const { container } = render(<Page />);
    expect(screen.getAllByText(/Iceefruit/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/DECK A/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/AUDIO MIXER & SOUND LAB/i)).toBeDefined();
    expect(screen.getByText(/SYSTEM REPOSITORIES & CODE VAULT/i)).toBeDefined();
    expect(screen.getByText(/TRANSMIT UPLINK/i)).toBeDefined();

    // Verify Chapter 01 Deep-Dive Case Studies & Benchmark Tables render
    expect(screen.getByText(/City-Api Cartographic Compiler/i)).toBeDefined();
    expect(screen.getByText(/Transparent & Transcribe AI Gateway/i)).toBeDefined();
    expect(screen.getByText(/ExML & GoldAlgo Execution Core/i)).toBeDefined();
    expect(screen.getAllByText(/VERIFIED PRODUCTION BENCHMARKS/i).length).toBe(3);

    // Verify Anti-Slop constraint: zero skill percentage bars (e.g., "96%", "94%", "91%", "89%")
    expect(container.textContent).not.toMatch(/96%|94%|91%|89%/);
  });
});
