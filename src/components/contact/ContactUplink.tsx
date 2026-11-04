'use client';

import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquare, Mail, Terminal, Radio } from 'lucide-react';

export const ContactUplink: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSent(true);
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Station Title */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icee-surface border border-icee-border text-xs font-mono text-icee-orange mb-3">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>DIRECT TRANSMISSION // ENCRYPTED UPLINK</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          TRANSMIT UPLINK
        </h2>
        <p className="mt-2 text-sm text-icee-text-muted max-w-xl">
          Initiate direct communication with Iceefruit for architecture contracts, system engineering, WebGL visual design, or collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Direct Connection Channels */}
        <div className="bg-icee-surface/90 border border-icee-border rounded-2xl p-6 md:p-8 shadow-cyber-card backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              INSTANT DIRECT CHANNELS
            </h3>
            <p className="text-xs text-icee-text-muted leading-relaxed mb-6">
              Prefer asynchronous direct messages? Connect instantly via Discord or primary transmission email.
            </p>

            <div className="space-y-4">
              {/* Discord Card */}
              <div className="bg-icee-dark border border-icee-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-icee-text-muted">DISCORD USER</div>
                    <div className="text-sm font-bold text-white">iceefruit</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('iceefruit', 'discord')}
                  className="px-3 py-1.5 rounded-lg bg-icee-surface hover:bg-icee-card text-xs font-mono text-icee-text-muted hover:text-white border border-icee-border flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedType === 'discord' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="bg-icee-dark border border-icee-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-icee-text-muted">PRIMARY EMAIL</div>
                    <div className="text-sm font-bold text-white truncate max-w-[170px] sm:max-w-none">
                      iceefruit.2@gmail.com
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('iceefruit.2@gmail.com', 'email')}
                  className="px-3 py-1.5 rounded-lg bg-icee-surface hover:bg-icee-card text-xs font-mono text-icee-text-muted hover:text-white border border-icee-border flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-icee-border/50 text-[11px] font-mono text-icee-text-muted">
            <span className="text-icee-orange font-bold">AVG RESPONSE TIME:</span> &lt; 4 HOURS
          </div>
        </div>

        {/* Right Column: Encrypted Transmission Form */}
        <div className="bg-icee-surface/90 border border-icee-border rounded-2xl p-6 md:p-8 shadow-cyber-card backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-2">
            TRANSMIT PACKET
          </h3>
          <p className="text-xs text-icee-text-muted leading-relaxed mb-6">
            Dispatch an asynchronous inquiry packet directly to the operator workstation.
          </p>

          {formSent ? (
            <div className="p-6 rounded-xl bg-icee-dark border border-icee-orange/40 text-center space-y-3 font-mono">
              <span className="w-10 h-10 rounded-full bg-icee-orange/20 text-icee-orange flex items-center justify-center mx-auto text-xl">
                ✓
              </span>
              <h4 className="text-base font-bold text-white">TRANSMISSION RECEIVED</h4>
              <p className="text-xs text-icee-text-muted">
                Packet queued in primary pipeline. Iceefruit will acknowledge receipt shortly.
              </p>
              <button
                onClick={() => { setFormSent(false); setFormData({ name: '', email: '', message: '' }); }}
                className="mt-4 px-4 py-2 rounded bg-icee-surface border border-icee-border text-xs text-white hover:text-icee-orange cursor-pointer"
              >
                TRANSMIT ANOTHER PACKET
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[11px] text-icee-text-muted mb-1 uppercase tracking-wider">
                  NAME / IDENTIFIER
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-icee-text-muted mb-1 uppercase tracking-wider">
                  RETURN ADDRESS / EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@vance.engineering"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-icee-text-muted mb-1 uppercase tracking-wider">
                  TRANSMISSION PAYLOAD
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter project scope, contract specs, or message..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-icee-orange text-icee-dark font-bold uppercase tracking-wider hover:bg-icee-orange-glow transition-all flex items-center justify-center gap-2 shadow-orange-glow cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
