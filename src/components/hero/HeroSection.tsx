'use client';

import React from 'react';
import { ArrowDownRight, Disc3, FolderGit2, Layers } from 'lucide-react';
import { profileData } from '@/data/profile';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Top Structural Coordinate Bar */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-4 py-4 border-b border-icee-border font-mono text-[11px] text-icee-text-muted uppercase tracking-widest">
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-icee-orange inline-block" />
          <span className="text-white font-bold">ICEEFRUIT // MONOGRAPH 2026</span>
        </div>
        <div className="md:col-span-4 hidden md:block">
          DISCIPLINE: SYSTEMS &amp; CREATIVE ENGINEERING
        </div>
        <div className="md:col-span-4 text-right text-icee-orange font-bold">
          {profileData.status}
        </div>
      </div>

      {/* Center Asymmetric Monumental Poster Typography */}
      <div className="my-auto py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9">
            <div className="font-mono text-xs uppercase tracking-widest text-icee-orange mb-4">
              [ 00 // ARCHITECTURAL INDEX &amp; LIVE WORKSTATION ]
            </div>
            <h1 className="display-monumental text-white uppercase select-none">
              ICEE<span className="text-icee-orange">FRUIT</span>
              <span className="block font-serif italic font-normal text-icee-text-bright tracking-normal text-[0.58em] mt-2">
                Low-latency systems &amp; tactile web architecture.
              </span>
            </h1>
          </div>

          {/* Right Column Positioning Thesis */}
          <div className="lg:col-span-3 border-l border-icee-border pl-6 space-y-4">
            <p className="text-sm text-icee-text-muted leading-relaxed">
              Engineering quantized ONNX inference gateways, lock-free ZeroMQ quantitative bridges, vector cartography compilers, and real-time Web Audio / WebGL interfaces.
            </p>
            <div className="font-mono text-[11px] text-white space-y-1 pt-2 border-t border-icee-border/60">
              <div>CORE 01: NEXT.JS 15 / FASTAPI</div>
              <div>CORE 02: ONNX INT8 / ZEROMQ</div>
              <div>CORE 03: THREE.JS / WEB AUDIO DSP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 12-Column Hairline Telemetry & Action Strip (Zero Slop Rounded Cards) */}
      <div className="border-t border-b border-icee-border bg-icee-darker/85 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-icee-border">
          {/* Telemetry Cells */}
          {profileData.stats.map((s, idx) => (
            <div key={idx} className="md:col-span-2 p-4 font-mono">
              <div className="text-[10px] text-icee-text-muted uppercase tracking-wider">
                0{idx + 1} // {s.label}
              </div>
              <div className="text-lg font-bold text-white mt-1">{s.value}</div>
              <div className="text-[11px] text-icee-orange mt-0.5 truncate">{s.subtext}</div>
            </div>
          ))}

          {/* Primary Editorial Action Triggers */}
          <div className="md:col-span-4 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 bg-icee-surface/50">
            <a
              href="#case-studies"
              className="flex-1 py-3 px-4 bg-icee-orange text-icee-darker font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between hover:bg-icee-orange-glow transition-colors"
            >
              <span>CASE STUDIES</span>
              <Layers className="w-4 h-4" />
            </a>
            <a
              href="#audio-lab"
              className="flex-1 py-3 px-4 bg-icee-dark hover:bg-icee-card border border-icee-border hover:border-icee-orange text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors"
            >
              <span>AUDIO DECK</span>
              <Disc3 className="w-4 h-4 text-icee-orange" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
