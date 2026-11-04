'use client';

import React, { useEffect, useRef } from 'react';
import { getAudioEngine } from '@/lib/audioEngine';

interface AudioVisualizerProps {
  deck?: 'A' | 'B';
  height?: number;
  barColor?: string;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  deck,
  height = 80,
  barColor = '#FF5E00',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const engine = getAudioEngine();

    const renderFrame = () => {
      animId = requestAnimationFrame(renderFrame);

      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, h);

      // Fetch 32 bins of frequency data
      const data = engine.getFrequencyData(deck);
      const isAnyPlaying = engine.stateA.isPlaying || engine.stateB.isPlaying;

      const numBars = 32;
      const barSpacing = 3;
      const totalSpacing = barSpacing * (numBars - 1);
      const barWidth = Math.max(2, (width - totalSpacing) / numBars);

      for (let i = 0; i < numBars; i++) {
        const rawValue = data[i] || 0;
        // If nothing is playing, show a gentle idle breathing wave
        const idleWave = Math.sin(Date.now() * 0.003 + i * 0.3) * 6 + 8;
        const barHeight = isAnyPlaying 
          ? Math.max(4, (rawValue / 255) * (h - 8))
          : idleWave;

        const x = i * (barWidth + barSpacing);
        const y = h - barHeight;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, h);
        if (isAnyPlaying && rawValue > 20) {
          gradient.addColorStop(0, '#FF7700');
          gradient.addColorStop(0.5, '#FF5E00');
          gradient.addColorStop(1, '#94A3B8');
        } else {
          gradient.addColorStop(0, '#3E4451');
          gradient.addColorStop(1, '#1A1C23');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Peak dot
        if (isAnyPlaying && rawValue > 50) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x, Math.max(0, y - 2), barWidth, 2);
        }
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [deck]);

  return (
    <div className={`w-full overflow-hidden rounded bg-icee-dark/70 border border-icee-border/50 p-2 ${className}`}>
      <canvas
        ref={canvasRef}
        width={360}
        height={height}
        className="w-full h-full block"
      />
    </div>
  );
};
