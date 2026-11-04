import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { TechnicalSchematic } from '../components/illustrations/TechnicalSchematics';

describe('TechnicalSchematics Component', () => {
  it('renders cartography schematic with SVG nodes', () => {
    const { container } = render(<TechnicalSchematic type="cartography" />);
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.textContent).toContain('TOPOLOGICAL GEOJSON');
    expect(container.textContent).toContain('MERCATOR BBOX');
  });

  it('renders ONNX pipeline schematic with inference graph', () => {
    const { container } = render(<TechnicalSchematic type="onnx-pipeline" />);
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.textContent).toContain('HMAC-SHA256');
    expect(container.textContent).toContain('RMBG-1.4 ONNX');
  });

  it('renders quant bridge schematic with ZeroMQ sockets', () => {
    const { container } = render(<TechnicalSchematic type="quant-bridge" />);
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.textContent).toContain('ZEROMQ IPC');
    expect(container.textContent).toContain('MT5 L1/L2 TICK FEED');
  });
});
