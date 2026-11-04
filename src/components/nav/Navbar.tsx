'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { getAudioEngine } from '@/lib/audioEngine';

export const Navbar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const engine = getAudioEngine();
    const interval = setInterval(() => {
      setIsPlaying(engine.stateA.isPlaying || engine.stateB.isPlaying);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleGlobalAudio = async () => {
    const engine = getAudioEngine();
    await engine.init();
    if (isPlaying) {
      engine.pause('A');
      engine.pause('B');
      setIsPlaying(false);
    } else {
      await engine.play('A');
      setIsPlaying(true);
    }
  };

  const navLinks = [
    { label: '01 CASE STUDIES', href: '#case-studies' },
    { label: '02 DOSSIER', href: '#profile' },
    { label: '03 SPECIMENS', href: '#projects' },
    { label: '04 AUDIO DSP', href: '#audio-lab' },
    { label: '05 CODE VAULT', href: '#github-vault' },
    { label: '06 UPLINK', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-icee-dark/90 backdrop-blur-md border-b border-icee-border transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Left Outer Edge Brand Mark */}
        <a href="#hero" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-7 h-7 bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange group-hover:border-icee-orange transition-colors">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono font-bold tracking-widest text-white text-xs uppercase">
            <span className="text-icee-orange">Icee</span>fruit
          </span>
          <span className="text-[10px] font-mono text-icee-text-muted hidden sm:inline tracking-widest">
            // REV 2026.11
          </span>
        </a>

        {/* Center Editorial Chapter Index */}
        <nav className="hidden lg:flex items-center divide-x divide-icee-border border-x border-icee-border h-full font-mono text-[10px] tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 h-full flex items-center text-icee-text-muted hover:text-white hover:bg-icee-surface/60 transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Outer Edge Station Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleGlobalAudio}
            title={isPlaying ? 'Mute Audio Engine' : 'Start Audio Mixer'}
            className={`flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-icee-orange text-icee-dark border-icee-orange font-bold shadow-orange-glow'
                : 'bg-icee-surface border-icee-border text-icee-text-muted hover:text-white hover:border-icee-orange/50'
            }`}
          >
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isPlaying ? 'DSP: ON' : 'DSP: STANDBY'}
            </span>
          </button>

          <a
            href="https://github.com/iceefruit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 bg-icee-surface hover:bg-icee-card border border-icee-border text-icee-text-muted hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 lg:hidden bg-icee-surface border border-icee-border text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-icee-dark border-b border-icee-border px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-icee-text-muted hover:text-icee-orange py-1.5 tracking-widest uppercase border-b border-icee-border/40"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
