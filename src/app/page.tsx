'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/nav/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { CaseStudyChapters } from '@/components/casestudies/CaseStudyChapters';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { FolderExplorer } from '@/components/explorer/FolderExplorer';
import { DjMixerStation } from '@/components/mixer/DjMixerStation';
import { RepoVault } from '@/components/github/RepoVault';
import { ContactUplink } from '@/components/contact/ContactUplink';
import { Terminal, ArrowUp } from 'lucide-react';

// Dynamic import with SSR disabled for Three.js canvas to ensure smooth client rendering
const SceneCanvas = dynamic(
  () => import('@/components/3d/SceneCanvas').then((mod) => mod.SceneCanvas),
  { ssr: false }
);

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-icee-dark text-icee-text-bright selection:bg-icee-orange selection:text-icee-dark overflow-x-hidden">
      {/* 3D WebGL Dynamic Background Canvas */}
      <SceneCanvas />

      {/* Persistent Outer-Edge Editorial Header */}
      <Navbar />

      {/* Main Narrative Flow — Seamless Exposed Hairline Chapters */}
      <main className="relative z-10 flex flex-col">
        {/* Chapter 00: Opening Editorial Poster & Telemetry Strip */}
        <HeroSection />

        {/* Chapter 01: Selected Engineering Case Studies & Custom SVG Schematics */}
        <CaseStudyChapters />

        {/* Chapter 02: Operator Dossier, Dual Avatar Matrix, CLI & Capability Index */}
        <ProfileSection />

        {/* Chapter 03: Interactive Specimen Cabinet & IceeOS Sandbox */}
        <FolderExplorer />

        {/* Chapter 04: Dual-Deck Web Audio DSP Console & 64-Bin FFT Visualizer */}
        <DjMixerStation />

        {/* Chapter 05: Live GitHub Code Index & Classified Vault */}
        <RepoVault />

        {/* Chapter 06: Direct Transmission Uplink Finale */}
        <ContactUplink />
      </main>

      {/* Editorial Colophon Footer */}
      <footer className="relative z-10 border-t border-icee-border bg-icee-darker py-12 px-4 md:px-8 font-mono text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex items-center gap-3.5">
            <div className="w-8 h-8 bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-widest">
                <span className="text-icee-orange">Icee</span>fruit // Precision Systems Monograph
              </div>
              <div className="text-[10px] text-icee-text-muted tracking-wider mt-0.5">
                60% OBSIDIAN (#0B0C10) · 30% STRUCTURAL HAIRLINE (#2A2E39) · 10% SIGNAL ORANGE (#FF5E00)
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-wrap items-center gap-6 text-icee-text-muted text-[10px] tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-icee-orange" />
              ALL CORES ONLINE
            </span>
            <span>ZERO AI SLOP // HAND-ENGINEERED</span>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              title="Return to Top of Monograph"
              className="flex items-center gap-2 px-4 py-2 bg-icee-surface hover:bg-icee-orange hover:text-icee-dark border border-icee-border hover:border-icee-orange text-icee-text-muted transition-colors cursor-pointer text-[10px] tracking-widest uppercase font-bold"
            >
              <span>RETURN TO 00</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-icee-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-icee-text-muted tracking-widest uppercase">
          <span>© {new Date().getFullYear()} ICEEFRUIT (@ICEEFRUIT). OPEN SOURCE UNDER MIT LICENSE.</span>
          <span>SPACE GROTESK · INSTRUMENT SERIF · JETBRAINS MONO</span>
        </div>
      </footer>
    </div>
  );
}
