'use client';

import React, { useState, useEffect } from 'react';
import { GitFork, Star, ExternalLink, Lock, Code, FileText, FolderGit2, X, ArrowUpRight } from 'lucide-react';
import { RepoItem } from '@/app/api/github/repos/route';
import { privateProjects } from '@/data/private-projects';

export const RepoVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        const origin =
          typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : 'http://localhost:3000';
        const res = await fetch(`${origin}/api/github/repos?username=iceefruit`);
        if (res.ok) {
          const data = await res.json();
          setRepos(data.repos || []);
        }
      } catch {
        // Fallback handled gracefully
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'typescript':
        return '#3178C6';
      case 'javascript':
        return '#F7DF1E';
      case 'python':
        return '#FF5E00';
      case 'c++':
        return '#F34B7D';
      default:
        return '#94A3B8';
    }
  };

  return (
    <section id="github-vault" className="w-full border-t border-icee-border bg-icee-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Chapter Header — 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 05 // CODE LEDGER</div>
            <div>GITHUB SYNC // @iceefruit</div>
          </div>
          <div className="lg:col-span-6">
            <h2 className="display-chapter text-white">
              SYSTEM REPOSITORIES &amp; CODE VAULT
            </h2>
          </div>
          <div className="lg:col-span-3 flex lg:justify-end">
            <div className="inline-flex border border-icee-border bg-icee-darker p-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('public')}
                className={`px-4 py-2 font-bold uppercase transition-colors cursor-pointer ${
                  activeTab === 'public'
                    ? 'bg-icee-orange text-icee-darker'
                    : 'text-icee-text-muted hover:text-white'
                }`}
              >
                PUBLIC ({repos.length || 7})
              </button>
              <button
                onClick={() => setActiveTab('private')}
                className={`px-4 py-2 font-bold uppercase transition-colors cursor-pointer ${
                  activeTab === 'private'
                    ? 'bg-icee-orange text-icee-darker'
                    : 'text-icee-text-muted hover:text-white'
                }`}
              >
                CLASSIFIED ({privateProjects.length})
              </button>
            </div>
          </div>
        </div>

        {/* Public Repositories — Editorial Index Table */}
        {activeTab === 'public' && (
          <div className="border-l border-r border-b border-icee-border bg-icee-darker">
            {loading ? (
              <div className="py-16 text-center font-mono text-xs text-icee-text-muted">
                QUERYING GITHUB REST API...
              </div>
            ) : (
              <div className="divide-y divide-icee-border">
                {/* Table Column Headers */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-icee-surface font-mono text-[10px] text-icee-text-muted uppercase tracking-wider">
                  <div className="col-span-1">INDEX</div>
                  <div className="col-span-3">REPOSITORY</div>
                  <div className="col-span-5">ARCHITECTURAL SUMMARY</div>
                  <div className="col-span-2">RUNTIME / STARS</div>
                  <div className="col-span-1 text-right">ACTION</div>
                </div>

                {repos.map((repo, idx) => (
                  <div
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setSelectedRepo(repo);
                    }}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-icee-surface/70 transition-colors cursor-pointer"
                  >
                    <div className="md:col-span-1 font-mono text-xs text-icee-orange font-bold">
                      /{String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="md:col-span-3">
                      <h3 className="text-base font-bold text-white group-hover:text-icee-orange transition-colors font-mono truncate">
                        {repo.name}
                      </h3>
                    </div>

                    <div className="md:col-span-5 text-xs text-icee-text-muted line-clamp-2 leading-relaxed">
                      {repo.description || 'Open-source engineering utility authored by Iceefruit.'}
                    </div>

                    <div className="md:col-span-2 flex items-center gap-4 font-mono text-xs text-icee-text-muted">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span className="text-white text-[11px]">{repo.language}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px]">
                        <Star className="w-3 h-3 text-icee-orange" /> {repo.stargazers_count}
                      </span>
                    </div>

                    <div className="md:col-span-1 flex md:justify-end font-mono text-[11px] text-white group-hover:text-icee-orange font-bold">
                      <span className="inline-flex items-center gap-1">
                        INSPECT <ArrowUpRight className="w-3.5 h-3.5 text-icee-orange" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Private / Classified Repositories — 2-Column Architectural Dossier */}
        {activeTab === 'private' && (
          <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-b border-icee-border divide-y md:divide-y-0">
            {privateProjects.map((p, idx) => (
              <div
                key={p.id}
                className={`bg-icee-darker p-6 sm:p-8 flex flex-col justify-between border-b border-icee-border ${
                  idx % 2 === 0 ? 'md:border-r border-icee-border' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-icee-border mb-4 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-icee-orange">
                      <Lock className="w-3.5 h-3.5" /> {p.classification}
                    </span>
                    <span className="text-[10px] text-icee-text-muted">{p.codename}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-icee-text-muted leading-relaxed mb-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[10px] font-mono bg-icee-dark border border-icee-border text-icee-text-bright"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-3 border border-icee-border divide-x divide-icee-border bg-icee-dark font-mono text-center">
                    {p.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3">
                        <div className="text-[9px] text-icee-text-muted uppercase">{m.label}</div>
                        <div className="text-xs font-bold text-icee-orange mt-1">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-icee-border/50 text-[10px] font-mono text-icee-text-muted flex justify-between">
                    <span>ROLE: {p.role}</span>
                    <span>YEAR: {p.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Public Repository Inspection Drawer Modal */}
        {selectedRepo && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="bg-icee-dark border border-icee-border max-w-2xl w-full p-6 shadow-2xl relative">
              <div className="flex items-start justify-between pb-4 border-b border-icee-border mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-icee-orange text-icee-dark">
                      PUBLIC REPO
                    </span>
                    <span className="text-xs font-mono text-icee-text-muted">
                      {selectedRepo.full_name}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1.5 font-mono">
                    {selectedRepo.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRepo(null)}
                  className="p-1.5 bg-icee-surface border border-icee-border text-icee-text-muted hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-icee-text-muted leading-relaxed mb-5">
                {selectedRepo.description || 'Open-source system authored by Iceefruit.'}
              </p>

              <div className="mb-5">
                <span className="text-[11px] font-mono text-icee-orange font-bold uppercase mb-2 block">
                  REPOSITORY TREE &amp; MANIFEST
                </span>
                <div className="bg-icee-darker border border-icee-border p-3.5 font-mono text-xs space-y-2 text-icee-text-muted">
                  <div className="flex items-center gap-2 text-white">
                    <FileText className="w-3.5 h-3.5 text-icee-orange" />
                    <span>README.md</span>
                    <span className="text-[10px] text-icee-text-muted ml-auto">ARCHITECTURE DOCS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-3.5 h-3.5 text-icee-text-muted" />
                    <span>src/</span>
                    <span className="text-[10px] text-icee-text-muted ml-auto">PRIMARY KERNEL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-icee-text-muted" />
                    <span>package.json / pyproject.toml</span>
                    <span className="text-[10px] text-icee-text-muted ml-auto">RUNTIME MANIFEST</span>
                  </div>
                </div>
              </div>

              <div className="bg-icee-darker border border-icee-border p-3.5 text-xs font-mono text-icee-text-bright mb-6">
                <div className="text-[10px] text-icee-text-muted mb-1"># {selectedRepo.name}</div>
                <div className="text-icee-text-muted">{selectedRepo.description}</div>
                <div className="text-[11px] text-icee-orange mt-2">
                  $ git clone {selectedRepo.html_url}.git
                </div>
              </div>

              <div className="flex justify-end gap-3 font-mono text-xs">
                <button
                  onClick={() => setSelectedRepo(null)}
                  className="px-4 py-2.5 bg-icee-surface border border-icee-border text-icee-text-muted hover:text-white cursor-pointer"
                >
                  CLOSE
                </button>
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-icee-orange text-icee-dark font-bold hover:bg-icee-orange-glow transition-colors"
                >
                  <span>OPEN ON GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
