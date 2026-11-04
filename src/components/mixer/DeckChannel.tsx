'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Upload, Volume2, Sliders, Disc } from 'lucide-react';
import { getAudioEngine } from '@/lib/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';

interface DeckChannelProps {
  deck: 'A' | 'B';
  onStateChange?: () => void;
}

export const DeckChannel: React.FC<DeckChannelProps> = ({ deck, onStateChange }) => {
  const engine = getAudioEngine();
  const state = deck === 'A' ? engine.stateA : engine.stateB;

  const [isPlaying, setIsPlaying] = useState(state.isPlaying);
  const [volume, setVolume] = useState(state.volume);
  const [filterFreq, setFilterFreq] = useState(state.filterFreq);
  const [trackName, setTrackName] = useState(state.trackName);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTogglePlay = async () => {
    await engine.init();
    engine.togglePlay(deck);
    setIsPlaying(deck === 'A' ? engine.stateA.isPlaying : engine.stateB.isPlaying);
    onStateChange?.();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    engine.setVolume(deck, val);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const freq = parseFloat(e.target.value);
    setFilterFreq(freq);
    engine.setFilter(deck, freq);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await engine.loadUserFile(deck, file);
    setTrackName(file.name);
    setIsPlaying(deck === 'A' ? engine.stateA.isPlaying : engine.stateB.isPlaying);
    onStateChange?.();
  };

  return (
    <div className="flex-1 bg-icee-darker p-6 flex flex-col justify-between">
      {/* Hardware Deck Header */}
      <div className="flex items-center justify-between pb-3 border-b border-icee-border mb-4">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest bg-icee-dark border border-icee-border text-white">
            DECK {deck}
          </span>
          <span
            className={`w-2.5 h-2.5 transition-all duration-300 ${
              isPlaying ? 'bg-icee-orange shadow-orange-glow' : 'bg-icee-border-light'
            }`}
          />
        </div>
        <span className="text-[11px] font-mono text-icee-text-muted">
          {isPlaying ? 'SIGNAL // LOCKED' : 'STANDBY // IDLE'}
        </span>
      </div>

      {/* Tactile Platter & Track Readout */}
      <div className="flex items-center gap-5 my-3 bg-icee-dark p-4 border border-icee-border">
        <div
          className={`relative w-20 h-20 rounded-full border-2 border-icee-border flex items-center justify-center bg-icee-darker shrink-0 ${
            isPlaying ? 'animate-[spin_3.5s_linear_infinite] border-icee-orange/70' : ''
          }`}
        >
          <div className="w-12 h-12 rounded-full border border-icee-border/50 flex items-center justify-center">
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                isPlaying ? 'bg-icee-orange' : 'bg-icee-border'
              }`}
            />
          </div>
          <Disc className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-icee-text-muted/40" />
        </div>

        <div className="min-w-0 flex-1 font-mono">
          <div className="text-[10px] text-icee-orange uppercase tracking-wider">
            CHANNEL {deck} BUFFER
          </div>
          <p className="text-xs font-bold text-white truncate mt-1">{trackName}</p>
          <div className="text-[10px] text-icee-text-muted mt-1">
            SAMPLE RATE: 44.1kHz // 32-BIT FLOAT
          </div>
        </div>
      </div>

      {/* Channel FFT Spectrum */}
      <div className="my-2">
        <AudioVisualizer deck={deck} height={48} className="rounded-none border-icee-border" />
      </div>

      {/* Transport &Biquad Filter Controls */}
      <div className="space-y-4 pt-3">
        <div className="flex gap-2">
          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              isPlaying
                ? 'bg-icee-orange text-icee-darker'
                : 'bg-icee-surface hover:bg-icee-card text-white border border-icee-border hover:border-icee-orange'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isPlaying ? 'PAUSE STREAM' : 'PLAY CUE'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Load custom audio file (.mp3, .wav)"
            className="px-3.5 py-3 bg-icee-surface hover:bg-icee-card border border-icee-border hover:border-icee-orange text-icee-text-muted hover:text-icee-orange transition-colors cursor-pointer font-mono text-[10px] flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>LOAD</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
        </div>

        {/* Channel Gain Fader */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-icee-text-muted">
            <span className="flex items-center gap-1.5 text-white">
              <Volume2 className="w-3.5 h-3.5 text-icee-orange" /> CHANNEL GAIN
            </span>
            <span className="text-icee-orange font-bold">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-icee-dark border border-icee-border appearance-none cursor-pointer accent-icee-orange"
          />
        </div>

        {/* Biquad Lowpass Cutoff */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-icee-text-muted">
            <span className="flex items-center gap-1.5 text-white">
              <Sliders className="w-3.5 h-3.5 text-icee-orange" /> BIQUAD LOWPASS CUTOFF
            </span>
            <span className="text-white font-bold">
              {filterFreq >= 1000 ? `${(filterFreq / 1000).toFixed(1)} kHz` : `${Math.round(filterFreq)} Hz`}
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="16000"
            step="100"
            value={filterFreq}
            onChange={handleFilterChange}
            className="w-full h-1.5 bg-icee-dark border border-icee-border appearance-none cursor-pointer accent-icee-orange"
          />
        </div>
      </div>
    </div>
  );
};
