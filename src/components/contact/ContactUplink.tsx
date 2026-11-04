'use client';

import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquare, Mail } from 'lucide-react';

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
    <section id="contact" className="w-full border-t border-icee-border bg-icee-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Chapter Header — 12-Column Asymmetric Finale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-icee-border items-end">
          <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest text-icee-text-muted space-y-1">
            <div className="text-icee-orange font-bold">CHAPTER 06 // FINALE</div>
            <div>DIRECT SIGNAL TRANSMISSION</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display-chapter text-white">
              TRANSMIT UPLINK
            </h2>
            <p className="mt-4 text-base text-icee-text-muted max-w-2xl leading-relaxed">
              Available for systems architecture contracts, low-latency ML/quant pipelines, custom Web Audio DSP instruments, and creative WebGL engineering.
            </p>
          </div>
        </div>

        {/* 12-Column Hairline Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-l border-r border-b border-icee-border">
          {/* Left 5 Columns: Direct Endpoints */}
          <div className="lg:col-span-5 lg:border-r border-icee-border p-6 sm:p-10 flex flex-col justify-between bg-icee-dark">
            <div className="space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-icee-orange font-bold">
                [ VERIFIED ENDPOINTS ]
              </div>

              <div className="divide-y divide-icee-border border border-icee-border bg-icee-darker">
                {/* Discord Row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-icee-text-muted">DISCORD HANDLE</div>
                      <div className="text-sm font-bold text-white font-mono">iceefruit</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('iceefruit', 'discord')}
                    className="px-3 py-1.5 bg-icee-surface hover:bg-icee-card text-xs font-mono text-white border border-icee-border hover:border-icee-orange flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedType === 'discord' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-icee-orange" />
                        <span className="text-icee-orange">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Email Row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-icee-surface border border-icee-border flex items-center justify-center text-icee-orange">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-icee-text-muted">PRIMARY ELECTRONIC MAIL</div>
                      <div className="text-sm font-bold text-white font-mono truncate max-w-[175px] sm:max-w-none">
                        iceefruit.2@gmail.com
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('iceefruit.2@gmail.com', 'email')}
                    className="px-3 py-1.5 bg-icee-surface hover:bg-icee-card text-xs font-mono text-white border border-icee-border hover:border-icee-orange flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-icee-orange" />
                        <span className="text-icee-orange">COPIED</span>
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

            <div className="mt-8 pt-4 border-t border-icee-border font-mono text-[11px] text-icee-text-muted flex justify-between">
              <span>SLA RESPONSE WINDOW</span>
              <span className="text-icee-orange font-bold">&lt; 4 HOURS UTC</span>
            </div>
          </div>

          {/* Right 7 Columns: Packet Dispatch Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-icee-darker">
            <div className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-6">
              [ ASYNCHRONOUS PACKET DISPATCH ]
            </div>

            {formSent ? (
              <div className="p-8 bg-icee-dark border border-icee-orange text-center space-y-4 font-mono">
                <div className="w-10 h-10 bg-icee-orange text-icee-darker flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">PACKET ACKNOWLEDGED</h4>
                <p className="text-xs text-icee-text-muted max-w-md mx-auto">
                  Transmission logged in primary queue. Operator Iceefruit will respond to {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2 bg-icee-surface border border-icee-border text-xs text-white hover:border-icee-orange cursor-pointer"
                >
                  NEW TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-icee-text-muted mb-1.5 uppercase tracking-wider">
                      01 / SENDER IDENTIFIER
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name or Organization"
                      className="w-full px-3.5 py-3 bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-icee-text-muted mb-1.5 uppercase tracking-wider">
                      02 / RETURN ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-3 bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-icee-text-muted mb-1.5 uppercase tracking-wider">
                    03 / SPECIFICATION PAYLOAD
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Scope, timeline, architectural requirements..."
                    className="w-full px-3.5 py-3 bg-icee-dark border border-icee-border focus:border-icee-orange outline-none text-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-icee-orange text-icee-darker font-bold uppercase tracking-wider hover:bg-icee-orange-glow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
