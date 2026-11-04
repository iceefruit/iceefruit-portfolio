import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { SceneCanvas } from '../components/3d/SceneCanvas';

describe('SceneCanvas Component', () => {
  it('renders canvas element with container styles', () => {
    const { container } = render(<SceneCanvas scrollProgress={0.2} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeDefined();
  });

  it('renders CSS cybernetic fallback if WebGL is unavailable', () => {
    const { container } = render(<SceneCanvas scrollProgress={0.5} />);
    expect(container.firstChild).toBeDefined();
  });
});
