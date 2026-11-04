import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

describe('useScrollProgress Hook', () => {
  it('initializes with 0 scroll progress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.scrollYProgress).toBe(0);
    expect(result.current.activeSection).toBeDefined();
  });
});
