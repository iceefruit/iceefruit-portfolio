import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DjMixerStation } from '../components/mixer/DjMixerStation';

describe('DjMixerStation Component', () => {
  it('renders Deck A, Deck B, crossfader, and master visualizer section', () => {
    render(<DjMixerStation />);
    expect(screen.getAllByText(/DECK A/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/DECK B/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('slider', { name: /crossfader/i })).toBeDefined();
    expect(screen.getByText(/AUDIO MIXER & SOUND LAB/i)).toBeDefined();
  });
});
