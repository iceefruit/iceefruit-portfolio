'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
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
    { label: '// 01 PROFILE', href: '#profile' },
    { label: '// 02 AUDIO LAB', href: '#audio-lab' },
    { label: '// 03 PROJECTS', href: '#projects' },
    { label: '// 04 VAULT', href: '#github-vault' },
    { label: '// 05 CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-icee-dark/85 backdrop-blur-md border-b border-icee-border/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange group-hover:border-icee-orange/60 shadow-inner transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold tracking-tight text-white text-base">
            <span className="text-icee-orange">Icee</span>fruit
          </span>
          <span className="w-2 h-2 rounded-full bg-icee-orange shadow-orange-glow animate-pulse" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-icee-text-muted hover:text-icee-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Station Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Audio Pill */}
          <button
            onClick={toggleGlobalAudio}
            title={isPlaying ? 'Mute Audio Engine' : 'Start Audio Mixer'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer ${
              isPlaying
                ? 'bg-icee-orange/15 border-icee-orange text-icee-orange shadow-orange-glow'
                : 'bg-icee-surface border-icee-border text-icee-text-muted hover:text-white'
            }`}
          >
            {isPlaying ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-bold">
              {isPlaying ? 'AUDIO ACTIVE' : 'AUDIO OFF'}
            </span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/iceefruit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-icee-surface hover:bg-icee-card border border-icee-border text-icee-text-muted hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg bg-icee-surface border border-icee-border text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-icee-dark border-b border-icee-border px-4 py-4 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-icee-text-muted hover:text-icee-orange py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
