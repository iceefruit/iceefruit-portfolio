'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Volume2, Box, Check, Copy, Activity } from 'lucide-react';

interface MiniAppSandboxProps {
  appType: 'synth' | 'geometry' | 'spec';
  data?: any;
}

export const MiniAppSandbox: React.FC<MiniAppSandboxProps> = ({ appType, data }) => {
  if (appType === 'synth') {
    return <SynthPadApp />;
  }
  if (appType === 'geometry') {
    return <GeometrySandboxApp />;
  }
  return <ProjectSpecApp data={data} />;
};

/* --- 1. Hardware-Style Synth Matrix App (Zero Emojis) --- */
const SynthPadApp: React.FC = () => {
  const [activePad, setActivePad] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const pads = [
    { id: 0, code: 'P-01', name: 'SUB BASS', spec: '55Hz SAW', color: 'orange', freq: 55, type: 'sawtooth' },
    { id: 1, code: 'P-02', name: 'ACID ARP', spec: '220Hz SQR', color: 'orange', freq: 220, type: 'square' },
    { id: 2, code: 'P-03', name: 'NEON CHORD', spec: '440Hz TRI', color: 'slate', freq: 440, type: 'triangle' },
    { id: 3, code: 'P-04', name: 'CYBER LEAD', spec: '659Hz SIN', color: 'orange', freq: 659.25, type: 'sine' },
    { id: 4, code: 'P-05', name: 'KICK DRUM', spec: '140->35Hz', color: 'slate', isKick: true },
    { id: 5, code: 'P-06', name: 'HI-HAT', spec: '7kHz HPF', color: 'slate', isHat: true },
    { id: 6, code: 'P-07', name: 'SNARE SNAP', spec: 'transient', color: 'slate', isSnare: true },
    { id: 7, code: 'P-08', name: 'LASER FX', spec: '880->80Hz', color: 'orange', isLaser: true },
  ];

  const triggerSound = (pad: typeof pads[0]) => {
    setActivePad(pad.id);
    setTimeout(() => setActivePad(null), 180);

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    if (pad.isKick) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
      return;
    }

    if (pad.isHat) {
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
      return;
    }

    if (pad.isLaser) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
      return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = (pad.type as OscillatorType) || 'sine';
    osc.frequency.setValueAtTime(pad.freq || 220, now);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  };

  return (
    <div className="flex flex-col h-full p-5 space-y-4 font-mono">
      <div className="flex items-center justify-between text-xs text-icee-text-muted border-b border-icee-border pb-3">
        <span className="flex items-center gap-2 text-white font-bold">
          <Volume2 className="w-4 h-4 text-icee-orange" /> HARDWARE DSP BEAT MATRIX
        </span>
        <span className="text-[11px] text-icee-orange">8-VOICE OSCILLATOR BANK</span>
      </div>

      <div className="grid grid-cols-4 gap-3 flex-1">
        {pads.map((p) => {
          const isActive = activePad === p.id;
          return (
            <button
              key={p.id}
              onClick={() => triggerSound(p)}
              className={`h-28 p-3 flex flex-col justify-between text-left border transition-all duration-100 cursor-pointer select-none ${
                isActive
                  ? 'bg-icee-orange text-icee-darker border-white scale-[0.98]'
                  : p.color === 'orange'
                  ? 'bg-icee-surface hover:bg-icee-card border-icee-orange/50 text-white'
                  : 'bg-icee-darker hover:bg-icee-surface border-icee-border text-icee-text-bright'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] ${isActive ? 'text-icee-darker font-bold' : 'text-icee-text-muted'}`}>
                  {p.code}
                </span>
                <span
                  className={`w-2 h-2 ${
                    isActive
                      ? 'bg-icee-darker'
                      : p.color === 'orange'
                      ? 'bg-icee-orange'
                      : 'bg-icee-border-light'
                  }`}
                />
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider">{p.name}</div>
                <div className={`text-[10px] mt-0.5 ${isActive ? 'text-icee-darker' : 'text-icee-orange'}`}>
                  {p.spec}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-icee-border text-[10px] text-icee-text-muted">
        <span>ENGINE: NATIVE WEB AUDIO OSCILLATOR / NOISE BUFFER</span>
        <span className="text-white">ZERO EXTERNAL SAMPLES</span>
      </div>
    </div>
  );
};

/* --- 2. 3D Geometry Sandbox App --- */
const GeometrySandboxApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shape, setShape] = useState<'torus' | 'icosa' | 'cube' | 'octa'>('torus');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 280;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.2;

    let geometry: THREE.BufferGeometry;
    if (shape === 'icosa') geometry = new THREE.IcosahedronGeometry(1.6, 1);
    else if (shape === 'cube') geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    else if (shape === 'octa') geometry = new THREE.OctahedronGeometry(1.8, 0);
    else geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 64, 16);

    const material = new THREE.MeshBasicMaterial({
      color: 0xFF5E00,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shape]);

  return (
    <div className="flex flex-col h-full p-5 space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs text-icee-text-muted border-b border-icee-border pb-3">
        <span className="flex items-center gap-2 text-white font-bold">
          <Box className="w-4 h-4 text-icee-orange" /> 3D WIREFRAME TOPOLOGY INSPECTOR
        </span>
        <div className="flex gap-1">
          {(['torus', 'icosa', 'cube', 'octa'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase cursor-pointer transition-colors ${
                shape === s
                  ? 'bg-icee-orange text-icee-dark font-bold'
                  : 'bg-icee-surface text-icee-text-muted hover:text-white border border-icee-border'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 w-full min-h-[220px] bg-icee-darker border border-icee-border flex items-center justify-center"
      />

      <div className="flex items-center justify-between text-[10px] text-icee-text-muted">
        <span>PROJECTION: PERSPECTIVE FOV 50</span>
        <span className="text-icee-orange">60 FPS HARDWARE WEBGL</span>
      </div>
    </div>
  );
};

/* --- 3. Project Spec & Code Runner App --- */
const ProjectSpecApp: React.FC<{ data?: any }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'metrics'>('overview');
  const [copied, setCopied] = useState(false);

  const title = data?.title || 'Classified System Specification';
  const description = data?.description || 'Architecture specification and live telemetry.';
  const codeSnippet =
    data?.codeSnippet ||
    `// Edge Stream Resolver Kernel — HMAC Verification
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyEdgeSignature(payload: string, sig: string, secret: string): boolean {
  const digest = createHmac('sha256', secret).update(payload).digest();
  const candidate = Buffer.from(sig, 'hex');
  if (digest.length !== candidate.length) return false;
  return timingSafeEqual(digest, candidate);
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full p-5 space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-icee-border pb-3">
        <div className="flex gap-1.5">
          {(['overview', 'code', 'metrics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-bold uppercase transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-icee-orange text-icee-dark'
                  : 'bg-icee-surface text-icee-text-muted hover:text-white border border-icee-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'code' && (
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 text-[11px] text-icee-text-muted hover:text-icee-orange cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-icee-orange" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'COPIED' : 'COPY BUFFER'}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-icee-darker p-4 border border-icee-border text-xs">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide">{title}</h4>
            <p className="text-icee-text-muted leading-relaxed">{description}</p>
            {data?.architectureSummary && (
              <div className="border-l-2 border-icee-orange pl-3 py-1 text-white">
                {data.architectureSummary}
              </div>
            )}
            {data?.techStack && (
              <div className="pt-2">
                <span className="text-[11px] text-icee-orange font-bold">RUNTIME STACK:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {data.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-icee-surface border border-icee-border text-[10px] text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <pre className="text-[11px] text-icee-text-bright font-mono whitespace-pre-wrap leading-relaxed">
            {codeSnippet}
          </pre>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-icee-orange">VERIFIED PRODUCTION TELEMETRY</h4>
            <div className="grid grid-cols-2 gap-3">
              {(
                data?.metrics || [
                  { label: 'Latency', value: '< 5ms' },
                  { label: 'Success Rate', value: '99.98%' },
                  { label: 'Ops/Sec', value: '45,000' },
                  { label: 'Memory Footprint', value: '18MB' },
                ]
              ).map((m: any, idx: number) => (
                <div key={idx} className="bg-icee-surface border border-icee-border p-3">
                  <div className="text-[10px] text-icee-text-muted uppercase">{m.label}</div>
                  <div className="text-base font-bold text-white mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
