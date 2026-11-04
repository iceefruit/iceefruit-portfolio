import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { CaseStudyChapters } from '../components/casestudies/CaseStudyChapters';

describe('CaseStudyChapters Component', () => {
  it('renders all three deep-dive case studies with before/after metrics', () => {
    const { container } = render(<CaseStudyChapters />);
    expect(container.textContent).toContain('City-Api Cartographic Compiler');
    expect(container.textContent).toContain('Transparent & Transcribe AI Gateway');
    expect(container.textContent).toContain('ExML & GoldAlgo Execution Core');
    expect(container.textContent).toContain('Cold-Start Render Latency');
    expect(container.textContent).toContain('-93.5%');
  });

  it('renders technical schematics within each case study chapter', () => {
    const { container } = render(<CaseStudyChapters />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(2);
  });
});
