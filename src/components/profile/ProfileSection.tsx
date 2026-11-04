'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Mail, RefreshCw, Palette, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { CyberTerminal } from '@/components/terminal/CyberTerminal';

interface CapabilityDomain {
  index: string;
  title: string;
  serifAccent: string;
  protocols: string[];
  proof: string;
}

const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    index: '01',
    title: 'EDGE & DISTRIBUTED',
    serifAccent: 'Systems',
    protocols: ['Next.js 15 App Router', 'FastAPI Asyncio', 'HMAC-SHA256 Ingress', 'Cloudflare / Vercel Edge'],
    proof: 'Sub-20ms TTFB media resolvers and stateless SVG cartographic compilers.',
  },
  {
    index: '02',
    title: 'QUANT & ML INFERENCE',
    serifAccent: 'Pipelines',
    protocols: ['ONNX Runtime INT8', 'Faster-Whisper CTranslate2', 'ZeroMQ Lock-Free IPC', 'MQL5 / C++ Bridges'],
    proof: '1.2ms tick-to-order execution and 4.4x CPU inference acceleration without GPU dependencies.',
  },
  {
    index: '03',
    title: 'REAL-TIME WEBGL &',
    serifAccent: 'Audio DSP',
    protocols: ['Three.js Custom Shaders', 'Web Audio API Biquad/FFT', 'Equal-Power Crossfading', '60fps Canvas'],
    proof: 'Audio-reactive 3D geometric cores and browser-native dual-deck synthesizers.',
  },
];

export const ProfileSection: React.FC = () => {
  const [pfpMode, setPfpMode] = useState<'doodle' | 'ascii'>('doodle');
  const [bannerPreset, setBannerPreset] = useState<'aura' | 'horizon' | 'brutalist'>('aura');
  const [showAsciiModal, setShowAsciiModal] = useState(false);

  const bannerMap = {
    aura: '/assets/pinterest-aura.svg',
    horizon: '/assets/pinterest-horizon.svg',
    brutalist: '/assets/pinterest-brutalist.svg',
  };

  const togglePfp = () => {
    setPfpMode((prev) => (prev === 'doodle' ? 'ascii' : 'doodle'));
  };

  return (
    <section id="profile" className="w-full border-t border-icee-border bg-icee-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Editorial Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 02 // OPERATOR DOSSIER</div>
            <div>IDENTITY &amp; SYSTEM CAPABILITIES</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-chapter text-white">
              ARCHITECTURAL{' '}
              <span className="font-serif italic font-normal text-icee-orange">
                Point of View
              </span>
            </h2>
          </div>
        </div>

        {/* 12-Column Asymmetric Dossier + Live Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-icee-border">
          {/* Left 7 Columns: Dual-PFP Identity Dossier */}
          <div className="lg:col-span-7 lg:border-r border-icee-border flex flex-col justify-between">
            {/* Pinterest Aesthetic Banner Header */}
            <div className="relative h-48 sm:h-56 w-full border-b border-icee-border overflow-hidden bg-icee-darker">
              <img
                src={bannerMap[bannerPreset]}
                alt="Iceefruit Editorial Banner"
                className="w-full h-full object-cover"
              />

              {/* Tactile Banner Selector Bar */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-icee-darker/90 border border-icee-border px-2.5 py-1 font-mono text-[10px]">
                <Palette className="w-3 h-3 text-icee-orange mr-1" />
                <span className="text-icee-text-muted mr-1">SURFACE:</span>
                {(['aura', 'horizon', 'brutalist'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBannerPreset(preset)}
                    className={`px-2 py-0.5 uppercase font-bold transition-colors cursor-pointer ${
                      bannerPreset === preset
                        ? 'bg-icee-orange text-icee-darker'
                        : 'text-icee-text-muted hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-2 left-4 font-mono text-[10px] text-white/70 bg-icee-darker/80 px-2 py-0.5 border border-icee-border/60">
                PLATE // {bannerPreset.toUpperCase()} GRADIENT
              </div>
            </div>

            {/* Operator Identity Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between -mt-16 gap-4">
                {/* Dual Avatar Frame */}
                <div className="relative inline-block">
                  <div
                    onClick={togglePfp}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') togglePfp();
                    }}
                    title="Switch between Dizzy Doodle & ASCII Matrix Avatar"
                    className="w-28 h-28 bg-icee-darker border-2 border-icee-orange p-1 shadow-orange-glow cursor-pointer transition-transform duration-300 ease-expo-out hover:scale-[1.03]"
                  >
                    {pfpMode === 'doodle' ? (
                      <img
                        src="/assets/pfp.png"
                        alt="Iceefruit Dizzy Doodle Avatar"
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center p-1">
                        <img
                          src="/assets/ascii.svg"
                          alt="Iceefruit Animated ASCII Matrix"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-icee-orange border-2 border-icee-dark" />
                </div>

                {/* Mechanical PFP Switcher Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePfp}
                    className="flex items-center gap-2 px-3.5 py-2 bg-icee-darker border border-icee-border hover:border-icee-orange font-mono text-xs text-white cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-icee-orange" />
                    <span>PFP: {pfpMode === 'doodle' ? 'DIZZY DOODLE' : 'ASCII MATRIX'}</span>
                  </button>
                  <button
                    onClick={() => setShowAsciiModal(true)}
                    title="Inspect Full Animated ASCII SVG"
                    className="p-2 bg-icee-darker border border-icee-border hover:border-icee-orange text-icee-text-muted hover:text-icee-orange cursor-pointer transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Name & Coordinates */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <div>
                  <h3 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    {profileData.name}
                    <ShieldCheck className="w-5 h-5 text-icee-orange" />
                  </h3>
                  <p className="font-mono text-xs text-icee-orange mt-1">
                    @{profileData.handle} // {profileData.title}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-icee-text-muted bg-icee-darker px-3 py-1.5 border border-icee-border self-start">
                  <MapPin className="w-3.5 h-3.5 text-icee-orange" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Editorial Statement */}
              <p className="text-base text-icee-text-bright/90 leading-relaxed max-w-2xl">
                {profileData.bio}
              </p>

              {/* Direct Uplink Strip */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-icee-border">
                {profileData.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-icee-darker hover:bg-icee-surface border border-icee-border hover:border-icee-orange font-mono text-xs text-white transition-colors"
                  >
                    {s.platform === 'GitHub' && <GithubIcon className="w-3.5 h-3.5 text-icee-orange" />}
                    {s.platform === 'Discord' && <DiscordIcon className="w-3.5 h-3.5 text-icee-orange" />}
                    {s.platform === 'Email' && <Mail className="w-3.5 h-3.5 text-icee-orange" />}
                    <span>{s.handle}</span>
                    <ArrowUpRight className="w-3 h-3 text-icee-text-muted" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Embedded Interactive Workstation CLI */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-icee-darker/60 flex flex-col justify-between">
            <div className="mb-4 font-mono text-xs text-icee-text-muted flex items-center justify-between">
              <span className="text-white font-bold">INTERACTIVE SHELL // LIVE KERNEL</span>
              <span className="text-icee-orange">TTY-01</span>
            </div>
            <CyberTerminal />
          </div>
        </div>

        {/* Oversized Editorial Capability Handoff (Replaces AI-Slop Skill Bars) */}
        <div className="pt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-icee-orange mb-8">
            [ ARCHITECTURAL CAPABILITIES &amp; PRODUCTION DOMAINS ]
          </div>
          <div className="divide-y divide-icee-border border-t border-b border-icee-border">
            {CAPABILITY_DOMAINS.map((domain) => (
              <div
                key={domain.index}
                className="group py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline hover:bg-icee-surface/30 transition-colors px-2"
              >
                <div className="lg:col-span-1 font-mono text-xs text-icee-orange font-bold">
                  /{domain.index}
                </div>
                <div className="lg:col-span-5">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-icee-orange transition-colors">
                    {domain.title}{' '}
                    <span className="font-serif italic font-normal text-icee-text-bright">
                      {domain.serifAccent}
                    </span>
                  </h3>
                </div>
                <div className="lg:col-span-6 space-y-3">
                  <p className="text-sm text-icee-text-muted leading-relaxed">
                    {domain.proof}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.protocols.map((proto) => (
                      <span
                        key={proto}
                        className="px-2.5 py-0.5 bg-icee-darker border border-icee-border font-mono text-[11px] text-icee-text-bright"
                      >
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full ASCII Art Inspection Modal */}
      {showAsciiModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="bg-icee-dark border border-icee-border max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-icee-border mb-4">
              <span className="font-mono text-xs font-bold text-icee-orange flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                ASCII TYPING MATRIX ART // @iceefruit
              </span>
              <button
                onClick={() => setShowAsciiModal(false)}
                className="px-2.5 py-1 bg-icee-surface border border-icee-border text-icee-text-muted hover:text-white text-xs font-mono cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="bg-black border border-icee-border p-4 overflow-hidden flex items-center justify-center">
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
                className="px-4 py-1.5 bg-icee-orange text-icee-dark font-bold cursor-pointer"
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
