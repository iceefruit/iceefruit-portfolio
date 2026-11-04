'use client';

import React, { useState, useEffect } from 'react';
import { GitFork, Star, ExternalLink, Lock, Globe, Code, FileText, FolderGit2, X, ChevronRight, Terminal } from 'lucide-react';
import { RepoItem } from '@/app/api/github/repos/route';
import { privateProjects } from '@/data/private-projects';
import { PrivateProject } from '@/types';

export const RepoVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await fetch('/api/github/repos?username=iceefruit');
        if (res.ok) {
          const data = await res.json();
          setRepos(data.repos || []);
        }
      } catch (err) {
        console.error('Failed to load repos', err);
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'typescript': return '#3178C6';
      case 'javascript': return '#F7DF1E';
      case 'python': return '#3572A5';
      case 'c++': return '#F34B7D';
      case 'mql5': return '#FF5E00';
      default: return '#94A3B8';
    }
  };

  return (
    <section id="github-vault" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface border border-icee-border text-xs font-mono text-icee-orange mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>CODE REPOSITORY VAULT // @iceefruit</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          SYSTEM REPOSITORIES &amp; CODE VAULT
        </h2>
        <p className="mt-2 text-sm text-icee-text-muted max-w-xl">
          Browse verified open-source public repositories or inspect classified private projects. Click any public repository to inspect its files, README, and telemetry.
        </p>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 mt-6 rounded-xl bg-icee-surface border border-icee-border">
          <button
            onClick={() => setActiveTab('public')}
            className={`px-5 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'public'
                ? 'bg-icee-orange text-icee-dark shadow-orange-glow'
                : 'text-icee-text-muted hover:text-white'
            }`}
          >
            PUBLIC REPOS ({repos.length || 7})
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`px-5 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'private'
                ? 'bg-icee-orange text-icee-dark shadow-orange-glow'
                : 'text-icee-text-muted hover:text-white'
            }`}
          >
            CLASSIFIED / PRIVATE ({privateProjects.length})
          </button>
        </div>
      </div>

      {/* Public Repos Grid */}
      {activeTab === 'public' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 font-mono text-xs text-icee-text-muted animate-pulse">
              SYNCING WITH GITHUB API ENGINE...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedRepo(repo); }}
                  className="group bg-icee-surface/80 hover:bg-icee-card border border-icee-border hover:border-icee-orange/60 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-cyber-card flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-icee-orange" />
                        <h3 className="text-sm font-bold text-white group-hover:text-icee-orange transition-colors truncate max-w-[220px]">
                          {repo.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-icee-dark border border-icee-border text-icee-text-muted">
                        PUBLIC
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-icee-text-muted line-clamp-2 leading-relaxed mb-4">
                      {repo.description || 'Open source tool authored by Iceefruit.'}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-icee-border/50 text-xs font-mono text-icee-text-muted">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span className="text-[11px] text-icee-text-bright">{repo.language}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-icee-orange" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                      </span>
                    </div>

                    <span className="text-[10px] text-icee-orange group-hover:underline flex items-center gap-0.5">
                      INSPECT <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Private / Classified Repos View */}
      {activeTab === 'private' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {privateProjects.map((p) => (
            <div
              key={p.id}
              className="bg-icee-surface/90 border border-icee-border/80 hover:border-icee-orange/50 rounded-xl p-6 transition-all duration-200 shadow-cyber-card flex flex-col justify-between relative overflow-hidden"
            >
              {/* Classified Watermark Ribbon */}
              <div className="flex items-center justify-between pb-3 border-b border-icee-border/70 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-icee-orange">
                  <Lock className="w-3.5 h-3.5" /> {p.classification}
                </span>
                <span className="text-[10px] font-mono text-icee-text-muted">
                  {p.codename}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-icee-text-muted leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-icee-dark border border-icee-border text-icee-text-bright"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-icee-darker/80 border border-icee-border p-3 rounded-lg text-center font-mono">
                  {p.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-[9px] text-icee-text-muted uppercase">{m.label}</div>
                      <div className="text-xs font-bold text-icee-orange mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-icee-border/50 text-[10px] font-mono text-icee-text-muted flex justify-between">
                <span>ROLE: {p.role}</span>
                <span>TIMELINE: {p.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Public Repo Inspection Modal */}
      {selectedRepo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div className="bg-icee-dark border border-icee-border rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-icee-border mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-icee-orange text-icee-dark">
                    PUBLIC REPO
                  </span>
                  <span className="text-xs font-mono text-icee-text-muted">
                    {selectedRepo.full_name}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedRepo.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRepo(null)}
                className="p-1 rounded bg-icee-surface hover:bg-icee-card text-icee-text-muted hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-icee-text-muted leading-relaxed mb-4">
              {selectedRepo.description || 'Open source tool authored by Iceefruit.'}
            </p>

            {/* Simulated Repo File Tree */}
            <div className="mb-4">
              <span className="text-[11px] font-mono text-icee-orange font-bold uppercase mb-2 block">
                REPOSITORY FILES &amp; CONTENTS
              </span>
              <div className="bg-icee-darker border border-icee-border rounded-lg p-3 font-mono text-xs space-y-1.5 text-icee-text-muted">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="w-3.5 h-3.5 text-icee-orange" />
                  <span>README.md</span>
                  <span className="text-[10px] text-icee-text-muted ml-auto">DOCUMENTATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-3.5 h-3.5 text-icee-text-muted" />
                  <span>src/</span>
                  <span className="text-[10px] text-icee-text-muted ml-auto">CORE SOURCE CODE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-icee-text-muted" />
                  <span>package.json / pyproject.toml</span>
                  <span className="text-[10px] text-icee-text-muted ml-auto">DEPENDENCIES</span>
                </div>
              </div>
            </div>

            {/* Quick Readme Preview */}
            <div className="bg-icee-surface/50 border border-icee-border rounded-lg p-3 text-xs font-mono text-icee-text-bright mb-6">
              <div className="text-[10px] text-icee-text-muted mb-1"># {selectedRepo.name}</div>
              <div className="text-icee-text-muted">
                {selectedRepo.description}
              </div>
              <div className="text-[11px] text-icee-orange mt-2">
                $ git clone {selectedRepo.html_url}.git
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedRepo(null)}
                className="px-4 py-2 rounded-lg bg-icee-surface hover:bg-icee-card text-xs font-mono text-icee-text-muted cursor-pointer"
              >
                CLOSE
              </button>
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-icee-orange text-icee-dark font-mono text-xs font-bold hover:shadow-orange-glow transition-all"
              >
                <span>OPEN ON GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
