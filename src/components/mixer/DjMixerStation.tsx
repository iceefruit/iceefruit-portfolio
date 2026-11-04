'use client';

import React, { useState } from 'react';
import { Radio, Activity, RefreshCw } from 'lucide-react';
import { getAudioEngine } from '@/lib/audioEngine';
import { DeckChannel } from './DeckChannel';
import { AudioVisualizer } from './AudioVisualizer';

export const DjMixerStation: React.FC = () => {
  const engine = getAudioEngine();
  const [crossfader, setCrossfader] = useState(engine.crossfaderPos);
  const [, setRefreshKey] = useState(0);

  const handleCrossfaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCrossfader(val);
    engine.updateCrossfader(val);
  };

  const handleCutA = () => {
    setCrossfader(0.0);
    engine.updateCrossfader(0.0);
  };

  const handleCutCenter = () => {
    setCrossfader(0.5);
    engine.updateCrossfader(0.5);
  };

  const handleCutB = () => {
    setCrossfader(1.0);
    engine.updateCrossfader(1.0);
  };

  return (
    <section id="audio-lab" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Station Title */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface border border-icee-border text-xs font-mono text-icee-orange mb-3">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME WEB AUDIO DSP // DUAL-DECK STATION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          AUDIO MIXER &amp; SOUND LAB
        </h2>
        <p className="mt-2 text-sm text-icee-text-muted max-w-xl">
          Interact with the live crossfader, adjust analog-style biquad lowpass filters, preview synthesized acid and lofi stems, or drop in your own audio tracks.
        </p>
      </div>

      {/* Main Console Box */}
      <div className="bg-icee-dark/80 border border-icee-border rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

        {/* Master Visualizer Display */}
        <div className="mb-6 p-4 rounded-xl bg-icee-darker/90 border border-icee-border flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 px-2 text-xs font-mono text-icee-text-muted">
            <span className="flex items-center gap-1.5 text-white">
              <Radio className="w-3.5 h-3.5 text-icee-orange" /> MASTER SPECTRUM
            </span>
            <span className="text-[11px] text-icee-orange">
              CROSSFADER: {Math.round((1 - crossfader) * 100)}% A / {Math.round(crossfader * 100)}% B
            </span>
          </div>
          <AudioVisualizer height={70} className="border-none bg-transparent" />
        </div>

        {/* Dual Decks + Mixer Column */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Deck A */}
          <DeckChannel deck="A" onStateChange={() => setRefreshKey(k => k + 1)} />

          {/* Central Crossfader Section */}
          <div className="w-full lg:w-64 bg-icee-surface/70 border border-icee-border rounded-xl p-5 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <span className="text-xs font-mono font-bold tracking-widest text-icee-text-bright">
                MIXER CONTROLLER
              </span>
              <p className="text-[10px] font-mono text-icee-text-muted mt-0.5">
                EQUAL-POWER CURVE
              </p>
            </div>

            {/* Quick Cut Buttons */}
            <div className="flex gap-2 w-full my-4">
              <button
                onClick={handleCutA}
                className="flex-1 py-1.5 rounded bg-icee-card hover:bg-icee-border text-[10px] font-mono font-semibold text-white border border-icee-border cursor-pointer transition-colors"
              >
                100% A
              </button>
              <button
                onClick={handleCutCenter}
                title="Center Crossfade"
                className="p-1.5 rounded bg-icee-card hover:bg-icee-border text-icee-orange border border-icee-border cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCutB}
                className="flex-1 py-1.5 rounded bg-icee-card hover:bg-icee-border text-[10px] font-mono font-semibold text-white border border-icee-border cursor-pointer transition-colors"
              >
                100% B
              </button>
            </div>

            {/* Crossfader Slider */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className={crossfader < 0.4 ? 'text-icee-orange' : 'text-icee-text-muted'}>
                  DECK A
                </span>
                <span className={crossfader > 0.6 ? 'text-icee-orange' : 'text-icee-text-muted'}>
                  DECK B
                </span>
              </div>
              <input
                type="range"
                aria-label="crossfader"
                min="0"
                max="1"
                step="0.01"
                value={crossfader}
                onChange={handleCrossfaderChange}
                className="w-full h-3 bg-icee-dark border border-icee-border rounded-lg appearance-none cursor-pointer accent-icee-orange shadow-inner"
              />
              <div className="flex justify-between text-[10px] font-mono text-icee-text-muted">
                <span>CH A</span>
                <span>CENTER</span>
                <span>CH B</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-icee-border/50 w-full text-[10px] font-mono text-icee-text-muted">
              DROP AUDIO FILE ONTO EITHER DECK TO MIX
            </div>
          </div>

          {/* Deck B */}
          <DeckChannel deck="B" onStateChange={() => setRefreshKey(k => k + 1)} />
        </div>
      </div>
    </section>
  );
};
