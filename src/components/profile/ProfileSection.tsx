'use client';

import React, { useState } from 'react';
import { User, ShieldCheck, MapPin, Mail, RefreshCw, Palette, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { CyberTerminal } from '@/components/terminal/CyberTerminal';

export const ProfileSection: React.FC = () => {
  // Avatar Switcher: 'doodle' (uploaded hand-drawn spiral face) vs 'ascii' (animated GitHub ASCII art)
  const [pfpMode, setPfpMode] = useState<'doodle' | 'ascii'>('doodle');

  // Banner Aesthetic Selector: 'aura' | 'horizon' | 'brutalist'
  const [bannerPreset, setBannerPreset] = useState<'aura' | 'horizon' | 'brutalist'>('aura');
  const [showAsciiModal, setShowAsciiModal] = useState(false);

  const bannerMap = {
    aura: '/assets/pinterest-aura.svg',
    horizon: '/assets/pinterest-horizon.svg',
    brutalist: '/assets/pinterest-brutalist.svg',
  };

  const togglePfp = () => {
    setPfpMode(prev => (prev === 'doodle' ? 'ascii' : 'doodle'));
  };

  return (
    <section id="profile" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface border border-icee-border text-xs font-mono text-icee-orange mb-3">
          <User className="w-3.5 h-3.5" />
          <span>LOAD PROFILE // IDENTITY &amp; TELEMETRY</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          OPERATOR SPECIFICATIONS
        </h2>
        <p className="mt-2 text-sm text-icee-text-muted max-w-xl">
          Dual-avatar identity system, Pinterest aesthetic gradient banners, and interactive command terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card + Skills (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main ID Card */}
          <div className="bg-icee-surface/90 border border-icee-border rounded-2xl overflow-hidden shadow-cyber-card backdrop-blur-md">
            {/* Banner with Interactive Gradient Presets */}
            <div className="relative h-44 w-full border-b border-icee-border overflow-hidden group">
              <img
                src={bannerMap[bannerPreset]}
                alt="Iceefruit Aesthetic Banner"
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Banner Preset Selector (Pinterest Gradients) */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-icee-dark/80 backdrop-blur-md border border-icee-border/80 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-lg">
                <Palette className="w-3 h-3 text-icee-orange" />
                <span className="text-icee-text-muted mr-1 hidden sm:inline">BANNER:</span>
                {(['aura', 'horizon', 'brutalist'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBannerPreset(preset)}
                    className={`px-1.5 py-0.5 rounded uppercase font-bold transition-all cursor-pointer ${
                      bannerPreset === preset
                        ? 'bg-icee-orange text-icee-dark shadow-orange-glow'
                        : 'text-icee-text-muted hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-2 left-4 text-[10px] font-mono text-white/50 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                AESTHETIC: {bannerPreset.toUpperCase()} // PINTEREST GRADIENT
              </div>
            </div>

            <div className="p-6 pt-0 relative">
              {/* Dual Avatar Switcher with Glowing Frame */}
              <div className="flex flex-wrap items-end justify-between -mt-14 mb-4 gap-3">
                <div className="relative inline-block group">
                  <div
                    onClick={togglePfp}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePfp(); }}
                    title="Click to toggle avatar between Dizzy Doodle & ASCII Matrix"
                    className="w-28 h-28 rounded-2xl bg-icee-darker border-2 border-icee-orange p-1 shadow-orange-glow relative overflow-hidden cursor-pointer group-hover:scale-105 transition-all duration-300"
                  >
                    {pfpMode === 'doodle' ? (
                      <img
                        src="/assets/pfp.png"
                        alt="Iceefruit Dizzy Doodle Avatar"
                        className="w-full h-full rounded-xl object-contain bg-black"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center p-1">
                        <img
                          src="/assets/ascii.svg"
                          alt="Iceefruit ASCII Matrix Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-icee-dark animate-pulse" />
                </div>

                {/* Avatar Toggle Pill */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePfp}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-icee-dark border border-icee-border hover:border-icee-orange/60 text-xs font-mono text-white cursor-pointer transition-colors shadow-inner"
                  >
                    <RefreshCw className="w-3 h-3 text-icee-orange" />
                    <span>PFP: {pfpMode === 'doodle' ? 'DIZZY DOODLE' : 'ASCII MATRIX'}</span>
                  </button>
                  <button
                    onClick={() => setShowAsciiModal(true)}
                    title="View Full Animated ASCII SVG Art"
                    className="p-1.5 rounded-lg bg-icee-dark border border-icee-border hover:border-icee-orange/60 text-icee-text-muted hover:text-icee-orange cursor-pointer transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Identity Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    {profileData.name}
                    <ShieldCheck className="w-5 h-5 text-icee-orange" />
                  </h3>
                  <p className="text-xs font-mono text-icee-orange mt-0.5">
                    @{profileData.handle} // {profileData.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-icee-text-muted bg-icee-darker px-3 py-1 rounded-lg border border-icee-border self-start">
                  <MapPin className="w-3.5 h-3.5 text-icee-orange" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-icee-text-muted leading-relaxed mb-6">
                {profileData.bio}
              </p>

              {/* Social Channels */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-icee-border/50">
                {profileData.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-icee-dark hover:bg-icee-card border border-icee-border hover:border-icee-orange/50 text-xs font-mono text-white transition-colors"
                  >
                    {s.platform === 'GitHub' && <GithubIcon className="w-3.5 h-3.5 text-icee-orange" />}
                    {s.platform === 'Discord' && <DiscordIcon className="w-3.5 h-3.5 text-icee-orange" />}
                    {s.platform === 'Email' && <Mail className="w-3.5 h-3.5 text-icee-orange" />}
                    <span>{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Telemetry Breakdown */}
          <div className="bg-icee-surface/90 border border-icee-border rounded-2xl p-6 shadow-cyber-card backdrop-blur-md">
            <h4 className="text-xs font-mono font-bold tracking-widest text-icee-orange mb-4">
              TECHNICAL COMPETENCY MATRIX
            </h4>
            <div className="space-y-3">
              {profileData.skills.map((skill) => (
                <div key={skill.name} className="space-y-1 font-mono">
                  <div className="flex justify-between text-xs">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-icee-orange font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-icee-dark rounded-full overflow-hidden border border-icee-border/50">
                    <div
                      className="h-full bg-gradient-to-r from-icee-orange to-icee-orange-glow rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Shell (5 cols) */}
        <div className="lg:col-span-5 h-full">
          <div className="sticky top-24">
            <CyberTerminal />
          </div>
        </div>
      </div>

      {/* ASCII Art Modal */}
      {showAsciiModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="bg-icee-dark border border-icee-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-icee-border mb-4">
              <span className="font-mono text-xs font-bold text-icee-orange flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                ASCII TYPING MATRIX ART // @iceefruit
              </span>
              <button
                onClick={() => setShowAsciiModal(false)}
                className="px-2 py-1 rounded bg-icee-surface text-icee-text-muted hover:text-white text-xs font-mono cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="bg-black border border-icee-border/60 rounded-xl p-4 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/ascii.svg"
                alt="Iceefruit Animated ASCII SVG"
                className="max-h-[420px] w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-icee-text-muted">
              <span>SOURCE: github.com/iceefruit/iceefruit/ascii.svg</span>
              <button
                onClick={() => setShowAsciiModal(false)}
                className="px-4 py-1.5 rounded bg-icee-orange text-icee-dark font-bold cursor-pointer hover:shadow-orange-glow"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
