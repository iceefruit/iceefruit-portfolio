import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CyberTerminal } from '../components/terminal/CyberTerminal';

describe('CyberTerminal Component', () => {
  it('renders initial prompt and executes help command', () => {
    render(<CyberTerminal />);
    expect(screen.getByText(/iceefruit@workstation:~/i)).toBeDefined();

    const input = screen.getByPlaceholderText(/type 'help' or 'about'.../i);
    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/AVAILABLE COMMANDS:/i)).toBeDefined();
  });
});
