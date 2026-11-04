'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { engineeringCaseStudies, EngineeringCaseStudy } from '@/data/case-studies';
import { TechnicalSchematic } from '@/components/illustrations/TechnicalSchematics';

export const CaseStudyChapters: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('cs-city-api');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="case-studies" className="w-full border-t border-icee-border bg-icee-dark/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Chapter Header — 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 01 // PROOF OF WORK</div>
            <div>ARCHITECTURAL MONOGRAPHS</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-chapter text-white">
              SELECTED{' '}
              <span className="font-serif italic font-normal text-icee-orange">
                Engineering
              </span>{' '}
              CASE STUDIES
            </h2>
            <p className="mt-4 text-base text-icee-text-muted max-w-2xl leading-relaxed">
              Deep-dive technical specifications into production systems: problem constraints, trade-off decisions, custom vector schematics, and verified before/after telemetry.
            </p>
          </div>
        </div>

        {/* Sequential Magazine-Cover Case Study Chapters */}
        <div className="divide-y divide-icee-border">
          {engineeringCaseStudies.map((study: EngineeringCaseStudy) => {
            const isExpanded = expandedId === study.id;

            return (
              <article
                key={study.id}
                className="py-16 md:py-24 transition-colors duration-300"
              >
                {/* Top Metadata Strip */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-4 pb-6 mb-10 border-b border-icee-border/60 font-mono text-xs">
                  <div className="md:col-span-2 text-icee-orange font-bold">
                    INDEX // {study.chapterNumber}
                  </div>
                  <div className="md:col-span-4 text-white">
                    ROLE: {study.role}
                  </div>
                  <div className="md:col-span-3 text-icee-text-muted">
                    YEAR: {study.timeline}
                  </div>
                  <div className="md:col-span-3 flex md:justify-end">
                    {study.visibility === 'PUBLIC' ? (
                      <a
                        href={study.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-white hover:text-icee-orange transition-colors font-bold"
                      >
                        <span>SOURCE REPOSITORY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-icee-orange" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-icee-orange font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>CLASSIFIED INTERNAL</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Main 12-Column Editorial Spread */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  {/* Left 5 Columns: Narrative, Problem & Key Decisions */}
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                        {study.title}
                      </h3>
                      <p className="mt-1.5 font-mono text-xs text-icee-orange">
                        {study.subtitle}
                      </p>
                    </div>

                    {/* Quantified Impact Callout */}
                    <div className="border-l-2 border-icee-orange pl-4 py-1 bg-icee-surface/40">
                      <p className="text-sm font-medium text-white leading-relaxed">
                        {study.impactHeadline}
                      </p>
                    </div>

                    {/* Overview & Problem Statement */}
                    <div className="space-y-3 text-sm text-icee-text-muted leading-relaxed">
                      <p>{study.overview}</p>
                      <div className="pt-2">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-white font-bold mb-1">
                          THE ENGINEERING BOTTLENECK
                        </div>
                        <p>{study.problem}</p>
                      </div>
                    </div>

                    {/* Stack Tags (Hairline Matrix) */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {study.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-icee-darker border border-icee-border font-mono text-[11px] text-icee-text-bright"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Disclosure Button for Deep Architecture & Learnings */}
                    <button
                      onClick={() => toggleExpand(study.id)}
                      aria-expanded={isExpanded}
                      className="w-full py-3 px-4 bg-icee-surface hover:bg-icee-card border border-icee-border hover:border-icee-orange/60 flex items-center justify-between font-mono text-xs text-white transition-all cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? 'HIDE ARCHITECTURAL DECISIONS & LEARNINGS'
                          : 'INSPECT ARCHITECTURAL DECISIONS & LEARNINGS'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-icee-orange" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-icee-orange" />
                      )}
                    </button>
                  </div>

                  {/* Right 7 Columns: Custom SVG Schematic + Quantified Results Table */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Custom Vector Schematic */}
                    <div className="overflow-hidden border border-icee-border bg-icee-darker p-2">
                      <TechnicalSchematic type={study.schematicType} />
                    </div>

                    {/* Before / After Quantified Engineering Benchmark Table */}
                    <div className="border border-icee-border bg-icee-darker">
                      <div className="px-4 py-2.5 bg-icee-surface border-b border-icee-border flex items-center justify-between font-mono text-[11px]">
                        <span className="text-white font-bold">
                          VERIFIED PRODUCTION BENCHMARKS
                        </span>
                        <span className="text-icee-orange">BEFORE VS. AFTER</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                          <thead>
                            <tr className="border-b border-icee-border/70 text-icee-text-muted text-[10px] uppercase">
                              <th className="py-2.5 px-4">METRIC</th>
                              <th className="py-2.5 px-4">BASELINE (BEFORE)</th>
                              <th className="py-2.5 px-4">ENGINEERED (AFTER)</th>
                              <th className="py-2.5 px-4 text-right">IMPACT DELTA</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-icee-border/40">
                            {study.results.map((row) => (
                              <tr key={row.metric} className="hover:bg-icee-surface/40">
                                <td className="py-3 px-4 text-white font-medium">{row.metric}</td>
                                <td className="py-3 px-4 text-icee-text-muted">{row.before}</td>
                                <td className="py-3 px-4 text-white font-bold">{row.after}</td>
                                <td className="py-3 px-4 text-right text-icee-orange font-bold">
                                  {row.delta}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Deep-Dive Drawer: Key Decisions, Pipeline & Learnings */}
                {isExpanded && (
                  <div className="mt-10 pt-8 border-t border-icee-border/70 grid grid-cols-1 md:grid-cols-12 gap-8 bg-icee-surface/30 p-6 border border-icee-border">
                    <div className="md:col-span-6 space-y-4">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-icee-orange">
                        KEY ARCHITECTURAL DECISIONS
                      </div>
                      {study.keyDecisions.map((dec, idx) => (
                        <div key={idx} className="space-y-1 border-l border-icee-border pl-4">
                          <div className="text-sm font-bold text-white">{dec.title}</div>
                          <p className="text-xs text-icee-text-muted leading-relaxed">
                            {dec.rationale}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-wider text-icee-orange mb-2">
                          EXECUTION TOPOLOGY
                        </div>
                        <ol className="space-y-1.5 font-mono text-xs text-icee-text-bright">
                          {study.architectureSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-icee-orange font-bold">0{i + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="pt-3 border-t border-icee-border/60">
                        <div className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-1">
                          POST-MORTEM &amp; ENGINEERING LEARNINGS
                        </div>
                        <p className="text-xs text-icee-text-muted leading-relaxed">
                          {study.learnings}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
