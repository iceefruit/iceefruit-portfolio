'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { profileData } from '@/data/profile';
import { getAudioEngine } from '@/lib/audioEngine';

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

export const CyberTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 0,
      command: 'welcome',
      output: (
        <div className="space-y-1 text-icee-text-muted">
          <p className="text-white font-bold">
            IceeOS Kernel v2.4.0 [x86_64-monograph]
          </p>
          <p>
            Type <span className="text-icee-orange font-bold">help</span> to inspect available system commands.
          </p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p className="text-white font-bold mb-1">AVAILABLE COMMANDS:</p>
            <p>
              <span className="text-icee-orange w-24 inline-block">about</span> : Operator dossier &amp; architectural thesis
            </p>
            <p>
              <span className="text-icee-orange w-24 inline-block">skills</span> : Production runtimes &amp; engineering domains
            </p>
            <p>
              <span className="text-icee-orange w-24 inline-block">projects</span> : Case studies &amp; benchmark summaries
            </p>
            <p>
              <span className="text-icee-orange w-24 inline-block">mix</span> : Trigger Deck A synth stream in Audio Lab
            </p>
            <p>
              <span className="text-icee-orange w-24 inline-block">contact</span> : Direct transmission channels
            </p>
            <p>
              <span className="text-icee-orange w-24 inline-block">clear</span> : Flush terminal buffer
            </p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1.5 text-xs text-icee-text-muted leading-relaxed">
            <p className="text-white font-bold">
              {profileData.name} // {profileData.title}
            </p>
            <p>{profileData.bio}</p>
            <p className="text-icee-orange font-mono">STATUS: {profileData.status}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs text-icee-text-muted">
            <div className="border-b border-icee-border/50 py-1">
              <span className="text-icee-orange font-bold">01 EDGE &amp; API:</span>{' '}
              <span className="text-white">TypeScript, Next.js 15, FastAPI, Node.js, HMAC-SHA256</span>
            </div>
            <div className="border-b border-icee-border/50 py-1">
              <span className="text-icee-orange font-bold">02 ML &amp; QUANT:</span>{' '}
              <span className="text-white">ONNX Runtime INT8, Faster-Whisper, ZeroMQ, MQL5/C++</span>
            </div>
            <div className="py-1">
              <span className="text-icee-orange font-bold">03 GRAPHICS/DSP:</span>{' '}
              <span className="text-white">Three.js WebGL, Web Audio API, Biquad/FFT Synthesis</span>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p className="text-white font-bold">VERIFIED PRODUCTION SYSTEMS:</p>
            <p>
              [01] <span className="text-icee-orange">City-Api</span> : 310ms Vector SVG Cartographic Compiler
            </p>
            <p>
              [02] <span className="text-icee-orange">Transparent/Transcribe</span> : INT8 ONNX &amp; Whisper Mesh (-75% RAM)
            </p>
            <p>
              [03] <span className="text-icee-orange">ExML / GoldAlgo</span> : 1.2ms ZeroMQ Quantitative Bridge
            </p>
          </div>
        );
        break;

      case 'mix':
        try {
          const engine = getAudioEngine();
          engine.init().then(() => engine.play('A'));
          output = <p className="text-icee-orange">SIGNAL DISPATCHED // Deck A audio stream active.</p>;
        } catch {
          output = (
            <p className="text-red-400">
              AudioContext requires direct hardware gesture. Click PLAY CUE on Deck A.
            </p>
          );
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p>
              EMAIL:{' '}
              <a href="mailto:iceefruit.2@gmail.com" className="text-white underline">
                iceefruit.2@gmail.com
              </a>
            </p>
            <p>
              DISCORD: <span className="text-white">iceefruit</span>
            </p>
            <p>
              GITHUB:{' '}
              <a
                href="https://github.com/iceefruit"
                target="_blank"
                rel="noreferrer"
                className="text-icee-orange underline"
              >
                github.com/iceefruit
              </a>
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-xs text-red-400">
            unknown directive: {trimmed}. Type <span className="text-white underline">help</span> for command list.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        command: trimmed,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full bg-icee-dark border border-icee-border p-5 font-mono cursor-text flex flex-col justify-between min-h-[340px]"
    >
      <div>
        {/* Title Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-icee-border mb-4 text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-icee-orange" />
            <span className="font-bold text-white tracking-wider">
              iceefruit@workstation:~
            </span>
          </div>
          <div className="flex items-center gap-2 text-icee-text-muted text-[10px]">
            <span className="w-2 h-2 bg-icee-orange inline-block" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Terminal History */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 text-xs">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-white">
                <span className="text-icee-orange font-bold">icee@system:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-icee-border text-xs">
        <span className="text-icee-orange font-bold select-none">icee@system:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' or 'about'..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-icee-text-muted/40"
        />
        <CornerDownLeft className="w-3.5 h-3.5 text-icee-text-muted" />
      </div>
    </div>
  );
};
