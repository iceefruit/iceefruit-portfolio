'use client';

import React, { useState } from 'react';
import { Folder, ArrowUpRight, Terminal, Cpu, Box, Radio } from 'lucide-react';
import { WindowModal } from './WindowModal';
import { privateProjects } from '@/data/private-projects';

interface ProjectFolder {
  id: string;
  index: string;
  path: string;
  name: string;
  category: string;
  appType: 'synth' | 'geometry' | 'spec';
  badge: string;
  description: string;
  size: string;
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
      index: '01',
      path: '/usr/bin/synth-matrix',
      name: 'AUDIO SYNTH LAB',
      category: 'INTERACTIVE DSP',
      appType: 'synth',
      badge: 'EXECUTABLE',
      size: '48 KB',
      description: 'Native 8-voice Web Audio synthesis matrix with procedural kicks, sub-bass, highpass noise hats, and frequency sweeps.',
    },
    {
      id: 'folder-geometry',
      index: '02',
      path: '/usr/bin/webgl-core',
      name: '3D WIREFRAME CORE',
      category: 'WEBGL / THREE.JS',
      appType: 'geometry',
      badge: 'EXECUTABLE',
      size: '112 KB',
      description: 'Hardware-accelerated 3D topology inspector supporting real-time mesh switching across Torus Knot, Icosahedron, and Octahedron.',
    },
    {
      id: 'folder-exml',
      index: '03',
      path: '/etc/spec/ex-ml-09',
      name: 'EX-ML PREDICTIVE PIPELINE',
      category: 'AI / FINANCIAL ML',
      appType: 'spec',
      badge: 'SPECIFICATION',
      size: '940 MB INT8',
      description: 'Sub-5ms low-latency inference pipeline with memory-pinned tensor buffers and custom SIMD acceleration kernels.',
      data: privateProjects[0],
    },
    {
      id: 'folder-quant',
      index: '04',
      path: '/etc/spec/xauusd-quant',
      name: 'GOLDALGO QUANT ENGINE',
      category: 'ALGO EXECUTION',
      appType: 'spec',
      badge: 'SPECIFICATION',
      size: '1.2 MS RTT',
      description: 'Zero-copy ZeroMQ socket bridge between low-level MT5 C++ DLL execution wrappers and analytical time-series engines.',
      data: privateProjects[1],
    },
    {
      id: 'folder-media',
      index: '05',
      path: '/etc/spec/edge-stream',
      name: 'EDGE MEDIA STREAM RESOLVER',
      category: 'DISTRIBUTED EDGE',
      appType: 'spec',
      badge: 'SPECIFICATION',
      size: '18 MS TTFB',
      description: 'Serverless CDN relay and media resolution gateway with HMAC-SHA256 cryptographic signature validation.',
      data: privateProjects[2],
    },
    {
      id: 'folder-telemetry',
      index: '06',
      path: '/etc/spec/plexity-ui',
      name: 'PLEXITY TELEMETRY DASHBOARD',
      category: 'SYSTEMS UI',
      appType: 'spec',
      badge: 'SPECIFICATION',
      size: '120K EVT/S',
      description: 'Real-time WebSocket streaming dashboard monitoring 250+ active infrastructure nodes with Web Worker offloaded charts.',
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
    <section id="projects" className="w-full border-t border-icee-border bg-icee-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Chapter Header — 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 03 // SPECIMEN CABINET</div>
            <div>IceeOS // FILE SYSTEM ARCHIVE</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-chapter text-white">
              INTERACTIVE{' '}
              <span className="font-serif italic font-normal text-icee-orange">
                Folder
              </span>{' '}
              VAULT &amp; SANDBOXES
            </h2>
            <p className="mt-4 text-base text-icee-text-muted max-w-2xl leading-relaxed">
              Select any indexed system folder below to mount its isolated IceeOS window, execute live DSP / WebGL sandboxes, or inspect kernel specifications.
            </p>
          </div>
        </div>

        {/* Tactile Tabbed Folder Cabinet Grid (2-Column Architectural Index, Zero Generic Slop Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-b border-icee-border divide-y md:divide-y-0">
          {folders.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => handleOpenFolder(f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenFolder(f);
              }}
              className={`group relative bg-icee-darker/80 hover:bg-icee-surface/90 p-6 sm:p-8 transition-colors duration-200 cursor-pointer flex flex-col justify-between border-b border-icee-border ${
                idx % 2 === 0 ? 'md:border-r border-icee-border' : ''
              }`}
            >
              {/* Physical Folder Tab Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-icee-border/70 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-icee-orange text-icee-darker font-bold text-[10px]">
                      DIR // {f.index}
                    </span>
                    <span className="text-icee-text-muted truncate max-w-[180px]">
                      {f.path}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 bg-icee-dark border border-icee-border text-icee-text-bright group-hover:border-icee-orange transition-colors">
                    {f.badge}
                  </span>
                </div>

                {/* Folder Title & Spec */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] text-icee-orange uppercase tracking-widest mb-1">
                      {f.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-icee-orange transition-colors">
                      {f.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-icee-dark border border-icee-border group-hover:border-icee-orange flex items-center justify-center text-icee-orange shrink-0">
                    {f.appType === 'synth' && <Radio className="w-4 h-4" />}
                    {f.appType === 'geometry' && <Box className="w-4 h-4" />}
                    {f.appType === 'spec' && <Cpu className="w-4 h-4" />}
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-icee-text-muted leading-relaxed">
                  {f.description}
                </p>
              </div>

              {/* Bottom Telemetry & Mount Action */}
              <div className="mt-6 pt-4 border-t border-icee-border/50 flex items-center justify-between font-mono text-[11px]">
                <span className="text-icee-text-muted">FOOTPRINT: {f.size}</span>
                <span className="text-white group-hover:text-icee-orange font-bold inline-flex items-center gap-1 transition-colors">
                  <span>OPEN SPECIMEN WINDOW</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-icee-orange" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active OS Window Modal */}
        <WindowModal
          id="active-os-window"
          title={activeWindow.title}
          appType={activeWindow.appType}
          data={activeWindow.data}
          isOpen={activeWindow.isOpen}
          isMaximized={activeWindow.isMaximized}
          onClose={() => setActiveWindow((w) => ({ ...w, isOpen: false }))}
          onToggleMaximize={() =>
            setActiveWindow((w) => ({ ...w, isMaximized: !w.isMaximized }))
          }
        />
      </div>
    </section>
  );
};
