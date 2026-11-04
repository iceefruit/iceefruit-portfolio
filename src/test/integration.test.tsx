import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Iceefruit Portfolio Full Page Integration', () => {
  it('renders all core stations, navigation, and identity branding', async () => {
    render(<Page />);
    expect(screen.getAllByText(/Iceefruit/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/DECK A/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/AUDIO MIXER & SOUND LAB/i)).toBeDefined();
    expect(screen.getByText(/SYSTEM REPOSITORIES & CODE VAULT/i)).toBeDefined();
    expect(screen.getByText(/TRANSMIT UPLINK/i)).toBeDefined();
  });
});
