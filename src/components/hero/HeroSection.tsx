'use client';

import React from 'react';
import { ArrowDown, Radio, Sparkles, FolderGit2, Disc3 } from 'lucide-react';
import { profileData } from '@/data/profile';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden"
    >
      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface/90 border border-icee-border shadow-cyber-card backdrop-blur-md text-xs font-mono mb-8">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-icee-text-muted">{profileData.status}</span>
      </div>

      {/* Main Title */}
      <div className="relative mb-6">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white select-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400">
            ICEE
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-icee-orange via-icee-orange-glow to-amber-500 orange-glow-text">
            FRUIT
          </span>
        </h1>
        <div className="absolute -inset-1 rounded-full bg-icee-orange/10 blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Subtitle & Role */}
      <p className="text-sm sm:text-base md:text-lg font-mono font-medium text-icee-text-muted max-w-2xl mx-auto leading-relaxed mb-8">
        CREATIVE TECHNOLOGIST // FULL-STACK ARCHITECT // REAL-TIME WEB AUDIO &amp; 3D WEBGL
      </p>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <a
          href="#audio-lab"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-icee-orange text-icee-dark font-mono text-xs font-bold uppercase tracking-wider hover:bg-icee-orange-glow transition-all duration-200 shadow-orange-glow cursor-pointer"
        >
          <Disc3 className="w-4 h-4" />
          <span>LAUNCH AUDIO LAB</span>
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-icee-surface hover:bg-icee-card border border-icee-border hover:border-icee-orange/60 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-cyber-card cursor-pointer"
        >
          <FolderGit2 className="w-4 h-4 text-icee-orange" />
          <span>EXPLORE FOLDERS</span>
        </a>
      </div>

      {/* Stats Ticker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mx-auto">
        {profileData.stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-icee-surface/80 border border-icee-border rounded-xl p-4 backdrop-blur-md text-left font-mono"
          >
            <div className="text-[10px] text-icee-text-muted uppercase tracking-wider">{s.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">{s.value}</div>
            <div className="text-[11px] text-icee-orange mt-0.5 truncate">{s.subtext}</div>
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 text-icee-text-muted font-mono text-[10px] animate-bounce">
        <span>SCROLL DOWN // EXPLORE CORE</span>
        <ArrowDown className="w-3.5 h-3.5 text-icee-orange" />
      </div>
    </section>
  );
};
