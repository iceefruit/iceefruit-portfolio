'use client';

import React, { useState } from 'react';
import { Folder, FolderGit2, Cpu, Box, Sparkles, Terminal, ChevronRight } from 'lucide-react';
import { WindowModal } from './WindowModal';
import { privateProjects } from '@/data/private-projects';

interface ProjectFolder {
  id: string;
  name: string;
  category: string;
  appType: 'synth' | 'geometry' | 'spec';
  badge: string;
  description: string;
  data?: any;
}

export const FolderExplorer: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<{
    isOpen: boolean;
    isMaximized: boolean;
    title: string;
    appType: 'synth' | 'geometry' | 'spec';
    data?: any;
  }>({
    isOpen: false,
    isMaximized: false,
    title: '',
    appType: 'synth',
  });

  const folders: ProjectFolder[] = [
    {
      id: 'folder-audio',
      name: 'AUDIO SYNTH LAB',
      category: 'INTERACTIVE DSP',
      appType: 'synth',
      badge: 'LIVE DEMO',
      description: 'Native 8-slot Web Audio synthesis engine with kicks, sub-bass, hi-hats, and laser effects.',
    },
    {
      id: 'folder-geometry',
      name: '3D WIREFRAME CORE',
      category: 'WEBGL / THREE.JS',
      appType: 'geometry',
      badge: 'INTERACTIVE 3D',
      description: 'Hardware-accelerated 3D wireframe sandbox supporting real-time geometric mesh deformation.',
    },
    {
      id: 'folder-exml',
      name: 'EX-ML PREDICTIVE PIPELINE',
      category: 'AI / FINANCIAL ML',
      appType: 'spec',
      badge: 'CLASSIFIED',
      description: 'Sub-5ms low latency inference pipeline with memory-pinned tensor buffers and custom SIMD kernels.',
      data: privateProjects[0],
    },
    {
      id: 'folder-quant',
      name: 'GOLDALGO QUANT ENGINE',
      category: 'ALGO TRADING',
      appType: 'spec',
      badge: 'INTERNAL',
      description: 'Zero-copy socket bridge between MT5 C++ DLL execution wrappers and analytical engines.',
      data: privateProjects[1],
    },
    {
      id: 'folder-media',
      name: 'EDGE MEDIA STREAM RESOLVER',
      category: 'DISTRIBUTED SYSTEMS',
      appType: 'spec',
      badge: 'VERCEL EDGE',
      description: 'Serverless CDN relay and video resolution gateway with cryptographic signature validation.',
      data: privateProjects[2],
    },
    {
      id: 'folder-telemetry',
      name: 'PLEXITY TELEMETRY DASHBOARD',
      category: 'FRONTEND ARCHITECTURE',
      appType: 'spec',
      badge: 'INTERNAL',
      description: 'Real-time WebSocket streaming dashboard monitoring over 250 active edge infrastructure nodes.',
      data: privateProjects[3],
    },
  ];

  const handleOpenFolder = (folder: ProjectFolder) => {
    setActiveWindow({
      isOpen: true,
      isMaximized: false,
      title: folder.name,
      appType: folder.appType,
      data: folder.data,
    });
  };

  return (
    <section id="projects" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Station Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface border border-icee-border text-xs font-mono text-icee-orange mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>IceeOS // DESKTOP FILE SYSTEM EXPLORER</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          PROJECT DIRECTORY &amp; MINI-APPS
        </h2>
        <p className="mt-2 text-sm text-icee-text-muted max-w-xl">
          Click any system folder to launch its dedicated OS window, run live interactive micro-apps, or inspect classified architecture specifications.
        </p>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {folders.map((f) => (
          <div
            key={f.id}
            onClick={() => handleOpenFolder(f)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenFolder(f); }}
            className="group relative bg-icee-surface/80 hover:bg-icee-card/90 border border-icee-border hover:border-icee-orange/60 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-cyber-card backdrop-blur-md overflow-hidden flex flex-col justify-between"
          >
            {/* Top Tab Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-icee-border group-hover:bg-icee-orange transition-colors" />

            <div>
              {/* Folder Icon + Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-icee-dark border border-icee-border group-hover:border-icee-orange/50 flex items-center justify-center text-icee-orange transition-transform duration-200 group-hover:scale-105 shadow-inner">
                  {f.appType === 'synth' && <Sparkles className="w-5 h-5" />}
                  {f.appType === 'geometry' && <Box className="w-5 h-5" />}
                  {f.appType === 'spec' && <Cpu className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-icee-darker border border-icee-border text-icee-text-muted group-hover:text-icee-orange group-hover:border-icee-orange/40 transition-colors">
                  {f.badge}
                </span>
              </div>

              {/* Title & Category */}
              <div className="text-[11px] font-mono text-icee-orange/80 tracking-widest uppercase mb-1">
                {f.category}
              </div>
              <h3 className="text-base font-bold text-white tracking-wide group-hover:text-icee-orange transition-colors">
                {f.name}
              </h3>
              <p className="mt-2 text-xs text-icee-text-muted leading-relaxed">
                {f.description}
              </p>
            </div>

            {/* Bottom Action Hint */}
            <div className="mt-5 pt-3 border-t border-icee-border/50 flex items-center justify-between text-[11px] font-mono text-icee-text-muted group-hover:text-white transition-colors">
              <span>LAUNCH WINDOW</span>
              <ChevronRight className="w-3.5 h-3.5 text-icee-orange group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Draggable / Maximizable Window Modal */}
      <WindowModal
        id="active-os-window"
        title={activeWindow.title}
        appType={activeWindow.appType}
        data={activeWindow.data}
        isOpen={activeWindow.isOpen}
        isMaximized={activeWindow.isMaximized}
        onClose={() => setActiveWindow(w => ({ ...w, isOpen: false }))}
        onToggleMaximize={() => setActiveWindow(w => ({ ...w, isMaximized: !w.isMaximized }))}
      />
    </section>
  );
};
