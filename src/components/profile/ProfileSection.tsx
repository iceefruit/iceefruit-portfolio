'use client';

import React from 'react';
import { User, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { CyberTerminal } from '@/components/terminal/CyberTerminal';

export const ProfileSection: React.FC = () => {
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
          Architect profile, hardware telemetry, proficiency breakdowns, and interactive command terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card + Skills (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main ID Card */}
          <div className="bg-icee-surface/90 border border-icee-border rounded-2xl overflow-hidden shadow-cyber-card backdrop-blur-md">
            {/* Banner Dropzone / Container */}
            <div className="relative h-36 w-full bg-gradient-to-r from-icee-dark via-icee-card to-icee-surface border-b border-icee-border overflow-hidden">
              <img
                src="/assets/banner.svg"
                alt="Iceefruit Banner"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
              <div className="absolute bottom-2 right-4 text-[10px] font-mono text-icee-text-muted/60 bg-icee-darker/70 px-2 py-0.5 rounded">
                DROPZONE // /public/assets/banner.png
              </div>
            </div>

            <div className="p-6 pt-0 relative">
              {/* Avatar Dropzone with Glowing Frame */}
              <div className="relative -mt-12 mb-4 inline-block">
                <div className="w-24 h-24 rounded-2xl bg-icee-dark border-2 border-icee-orange p-1 shadow-orange-glow relative overflow-hidden group">
                  <img
                    src="/assets/pfp.svg"
                    alt="Iceefruit Avatar"
                    className="w-full h-full rounded-xl object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-icee-dark animate-pulse" />
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
    </section>
  );
};
