'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
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
            IceeOS Shell v1.0.4 [x86_64-antigravity]
          </p>
          <p>Type <span className="text-icee-orange font-bold">help</span> to view available system commands.</p>
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

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p className="text-white font-bold mb-1">AVAILABLE COMMANDS:</p>
            <p><span className="text-icee-orange w-24 inline-block">about</span> : Read Iceefruit biography and technical focus</p>
            <p><span className="text-icee-orange w-24 inline-block">skills</span> : Output technical proficiencies and stacks</p>
            <p><span className="text-icee-orange w-24 inline-block">projects</span> : Output list of primary software systems</p>
            <p><span className="text-icee-orange w-24 inline-block">mix</span> : Trigger Deck A playback in the audio lab</p>
            <p><span className="text-icee-orange w-24 inline-block">contact</span> : Transmit uplink info (Email, Discord, GitHub)</p>
            <p><span className="text-icee-orange w-24 inline-block">clear</span> : Wipe terminal history screen</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1.5 text-xs text-icee-text-muted leading-relaxed">
            <p className="text-white font-bold">{profileData.name} — {profileData.title}</p>
            <p>{profileData.bio}</p>
            <p className="text-icee-orange font-mono">STATUS: {profileData.status}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs text-icee-text-muted">
            {profileData.skills.map((s, i) => (
              <div key={i} className="flex justify-between border-b border-icee-border/40 py-1">
                <span className="text-white">{s.name}</span>
                <span className="text-icee-orange font-bold">{s.level}%</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p className="text-white font-bold">ACTIVE ARTIFACTS:</p>
            <p>• <span className="text-icee-orange">Audio Synth Lab</span> — Web Audio API DSP synthesis engine</p>
            <p>• <span className="text-icee-orange">3D Wireframe Core</span> — Three.js hardware-accelerated scene</p>
            <p>• <span className="text-icee-orange">ExML Engine</span> — Sub-5ms predictive inference pipeline</p>
            <p>• <span className="text-icee-orange">GoldAlgo MT5</span> — Institutional quant risk architecture</p>
            <p>• <span className="text-icee-orange">City-Api</span> — Vector SVG cartography generator</p>
          </div>
        );
        break;

      case 'mix':
        try {
          const engine = getAudioEngine();
          engine.init().then(() => engine.play('A'));
          output = <p className="text-icee-orange">SIGNAL SENT // Deck A audio playback triggered.</p>;
        } catch {
          output = <p className="text-red-400">Audio context initialization blocked by browser policy. Click Play on Deck directly.</p>;
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-icee-text-muted">
            <p>• Email: <a href="mailto:iceefruit.2@gmail.com" className="text-white underline">iceefruit.2@gmail.com</a></p>
            <p>• Discord: <span className="text-white">iceefruit</span></p>
            <p>• GitHub: <a href="https://github.com/iceefruit" target="_blank" rel="noreferrer" className="text-icee-orange underline">github.com/iceefruit</a></p>
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
            command not found: {trimmed}. Type <span className="text-white underline">help</span> for command directory.
          </p>
        );
    }

    setHistory(prev => [
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
      className="w-full bg-icee-dark/95 border border-icee-border rounded-xl p-5 font-mono shadow-2xl backdrop-blur-md cursor-text"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-icee-border/70 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-icee-orange" />
          <span className="font-bold text-white tracking-wider">
            iceefruit@workstation:~
          </span>
        </div>
        <div className="flex items-center gap-2 text-icee-text-muted text-[11px]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>CONNECTED</span>
        </div>
      </div>

      {/* Terminal History */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-2 text-xs">
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

      {/* Input Prompt */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-icee-border/50 text-xs">
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
