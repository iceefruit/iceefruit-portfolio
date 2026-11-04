'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/nav/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { DjMixerStation } from '@/components/mixer/DjMixerStation';
import { FolderExplorer } from '@/components/explorer/FolderExplorer';
import { RepoVault } from '@/components/github/RepoVault';
import { ContactUplink } from '@/components/contact/ContactUplink';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

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

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Narrative Flow */}
      <main className="relative z-10 flex flex-col space-y-12 md:space-y-20 pb-20">
        {/* Section 1: Hero Station */}
        <HeroSection />

        {/* Section 2: Load Profile & Cyber Terminal */}
        <ProfileSection />

        {/* Section 3: Dual-Deck DJ Mixer Station */}
        <DjMixerStation />

        {/* Section 4: OS Desktop Folder Explorer */}
        <FolderExplorer />

        {/* Section 5: GitHub Code Vault */}
        <RepoVault />

        {/* Section 6: Direct Transmission Uplink */}
        <ContactUplink />
      </main>

      {/* Cybernetic Footer */}
      <footer className="relative z-10 border-t border-icee-border/80 bg-icee-darker/90 backdrop-blur-md py-10 px-4 font-mono text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                <span className="text-icee-orange">Icee</span>fruit Core System
              </div>
              <div className="text-[11px] text-icee-text-muted">
                DESIGNED &amp; ENGINEERED FOR HIGH-IMPACT COMPUTING
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-icee-text-muted text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              ALL SYSTEMS OPERATIONAL
            </span>
            <span>60-30-10 MONOCHROME &amp; ORANGE</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Return to Core Top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-icee-surface hover:bg-icee-card border border-icee-border text-icee-text-muted hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP OF CORE</span>
            <ArrowUp className="w-3.5 h-3.5 text-icee-orange" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-icee-border/40 text-center text-[10px] text-icee-text-muted/60">
          © {new Date().getFullYear()} Iceefruit. All rights reserved. Open source under MIT license.
        </div>
      </footer>
    </div>
  );
}
