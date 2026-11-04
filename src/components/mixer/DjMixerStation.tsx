'use client';

import React, { useState } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
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
    <section id="audio-lab" className="w-full border-t border-icee-border bg-icee-dark/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Chapter Header — 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 04 // ACOUSTIC HARDWARE</div>
            <div>WEB AUDIO DSP // DUAL-DECK CONSOLE</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-chapter text-white">
              AUDIO MIXER &amp; SOUND LAB
            </h2>
            <p className="mt-4 text-base text-icee-text-muted max-w-2xl leading-relaxed">
              Equal-power cosine/sine crossfading, real-time biquad lowpass filtering, procedural 128 BPM acid and 90 BPM ambient synthesizers, and custom audio buffer decoding.
            </p>
          </div>
        </div>

        {/* Main Industrial Console Frame */}
        <div className="border-l border-r border-b border-icee-border bg-icee-darker">
          {/* Master Spectrum Bus */}
          <div className="p-6 border-b border-icee-border bg-icee-dark/80">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-xs">
              <span className="flex items-center gap-2 text-white font-bold">
                <Radio className="w-4 h-4 text-icee-orange" /> MASTER FFT SPECTRUM ANALYZER (64-BIN)
              </span>
              <span className="text-icee-orange font-bold">
                BUS GAIN: {Math.round((1 - crossfader) * 100)}% DECK A // {Math.round(crossfader * 100)}% DECK B
              </span>
            </div>
            <AudioVisualizer height={72} className="rounded-none border-icee-border bg-icee-darker" />
          </div>

          {/* 3-Column Hardware Deck Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-icee-border">
            <div className="lg:col-span-5 flex">
              <DeckChannel deck="A" onStateChange={() => setRefreshKey((k) => k + 1)} />
            </div>

            {/* Central Crossfader Unit */}
            <div className="lg:col-span-2 bg-icee-surface/60 p-6 flex flex-col justify-between items-center text-center font-mono">
              <div className="w-full border-b border-icee-border pb-3">
                <span className="text-xs font-bold tracking-widest text-white block">
                  X-FADE BUS
                </span>
                <span className="text-[10px] text-icee-orange">COS / SIN LAW</span>
              </div>

              {/* Quick Cut Relays */}
              <div className="grid grid-cols-3 gap-1.5 w-full my-6">
                <button
                  onClick={handleCutA}
                  className="py-2 bg-icee-dark hover:bg-icee-card text-[10px] font-bold text-white border border-icee-border hover:border-icee-orange cursor-pointer transition-colors"
                >
                  CUT A
                </button>
                <button
                  onClick={handleCutCenter}
                  title="Center Mix"
                  className="py-2 bg-icee-dark hover:bg-icee-card flex items-center justify-center text-icee-orange border border-icee-border hover:border-icee-orange cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCutB}
                  className="py-2 bg-icee-dark hover:bg-icee-card text-[10px] font-bold text-white border border-icee-border hover:border-icee-orange cursor-pointer transition-colors"
                >
                  CUT B
                </button>
              </div>

              {/* Crossfader Linear Rail */}
              <div className="w-full space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
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
                  className="w-full h-3 bg-icee-darker border border-icee-border appearance-none cursor-pointer accent-icee-orange"
                />
                <div className="flex justify-between text-[9px] text-icee-text-muted">
                  <span>0.0</span>
                  <span>0.5</span>
                  <span>1.0</span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-icee-border w-full text-[10px] text-icee-text-muted leading-relaxed">
                BASS ENERGY DRIVES 3D WEBGL CORE SCALE
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <DeckChannel deck="B" onStateChange={() => setRefreshKey((k) => k + 1)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
