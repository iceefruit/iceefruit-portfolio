import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FolderExplorer } from '../components/explorer/FolderExplorer';

describe('FolderExplorer & Window Modal', () => {
  it('renders project folders and opens window modal when a folder is clicked', () => {
    render(<FolderExplorer />);
    const folder = screen.getByText(/AUDIO SYNTH LAB/i);
    expect(folder).toBeDefined();

    fireEvent.click(folder);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/IceeOS \/\/ AUDIO SYNTH LAB/i)).toBeDefined();
  });
});
