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
    <div className="flex-1 bg-icee-surface/90 border border-icee-border rounded-xl p-5 shadow-cyber-card backdrop-blur-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-icee-border/70 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-widest bg-icee-dark border border-icee-border text-white">
            DECK {deck}
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-icee-orange shadow-orange-glow animate-pulse'
                : 'bg-icee-border-light'
            }`}
          />
        </div>
        <span className="text-[11px] font-mono text-icee-text-muted">
          {isPlaying ? 'ACTIVE // STREAMING' : 'STANDBY // READY'}
        </span>
      </div>

      {/* Turntable Vinyl Graphic */}
      <div className="flex flex-col items-center justify-center my-3">
        <div
          className={`relative w-28 h-28 rounded-full border-4 border-icee-border flex items-center justify-center bg-gradient-to-tr from-icee-darker via-icee-surface to-icee-dark shadow-inner transition-transform duration-700 ${
            isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
          }`}
        >
          {/* Vinyl grooves */}
          <div className="w-20 h-20 rounded-full border border-icee-border/40 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-icee-border/60 flex items-center justify-center bg-icee-dark">
              <div
                className={`w-5 h-5 rounded-full transition-colors duration-300 ${
                  isPlaying ? 'bg-icee-orange shadow-orange-glow' : 'bg-icee-border'
                }`}
              />
            </div>
          </div>
          <Disc className="absolute top-2 right-2 w-4 h-4 text-icee-text-muted/40" />
        </div>

        {/* Track Title */}
        <p className="mt-3 text-xs font-mono font-medium text-icee-text-bright text-center truncate max-w-[220px]">
          {trackName}
        </p>
      </div>

      {/* Mini Visualizer */}
      <div className="my-2">
        <AudioVisualizer deck={deck} height={45} />
      </div>

      {/* Controls & Sliders */}
      <div className="space-y-4 pt-2">
        {/* Play / Cue Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              isPlaying
                ? 'bg-icee-orange text-icee-darker shadow-orange-glow'
                : 'bg-icee-card hover:bg-icee-border text-white border border-icee-border hover:border-icee-orange/50'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isPlaying ? 'PAUSE' : 'PLAY CUE'}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload custom audio track (.mp3, .wav)"
            className="p-2.5 rounded-lg bg-icee-card hover:bg-icee-border border border-icee-border text-icee-text-muted hover:text-icee-orange transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
        </div>

        {/* Channel Volume Fader */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-icee-text-muted">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-icee-orange" /> GAIN
            </span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-icee-dark rounded-lg appearance-none cursor-pointer accent-icee-orange"
          />
        </div>

        {/* Filter Cutoff Knob */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-icee-text-muted">
            <span className="flex items-center gap-1">
              <Sliders className="w-3 h-3 text-icee-orange" /> LOWPASS
            </span>
            <span>{filterFreq >= 1000 ? `${(filterFreq / 1000).toFixed(1)}kHz` : `${Math.round(filterFreq)}Hz`}</span>
          </div>
          <input
            type="range"
            min="200"
            max="16000"
            step="100"
            value={filterFreq}
            onChange={handleFilterChange}
            className="w-full h-1.5 bg-icee-dark rounded-lg appearance-none cursor-pointer accent-icee-orange"
          />
        </div>
      </div>
    </div>
  );
};
