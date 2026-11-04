/**
 * Web Audio API Dual-Deck Engine for Iceefruit Portfolio
 * Implements equal-power crossfading, biquad EQ filtering,
 * real-time frequency analysis, custom file decoding, and procedural audio synthesis.
 */

export interface CrossfaderGains {
  gainA: number;
  gainB: number;
}

/**
 * Calculates equal-power crossfader gains using cosine/sine curves.
 * Position is clamped between 0.0 (100% Deck A) and 1.0 (100% Deck B).
 */
export function calculateCrossfaderGains(position: number): CrossfaderGains {
  const clamped = Math.max(0, Math.min(1, position));
  // Equal-power crossfade curve: cos/sin over 0 to PI/2
  const angle = clamped * 0.5 * Math.PI;
  return {
    gainA: Math.cos(angle),
    gainB: Math.sin(angle),
  };
}

export interface DeckState {
  isPlaying: boolean;
  isLooping: boolean;
  volume: number; // 0 to 1
  filterFreq: number; // 20 to 20000 Hz
  trackName: string;
  sourceType: 'synth' | 'custom' | 'none';
}

export class DualDeckAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private masterAnalyser: AnalyserNode | null = null;

  // Deck A nodes
  private gainNodeA: GainNode | null = null;
  private crossGainNodeA: GainNode | null = null;
  private filterNodeA: BiquadFilterNode | null = null;
  private analyserNodeA: AnalyserNode | null = null;
  private sourceA: AudioBufferSourceNode | null = null;
  private bufferA: AudioBuffer | null = null;
  private synthIntervalA: any = null;

  // Deck B nodes
  private gainNodeB: GainNode | null = null;
  private crossGainNodeB: GainNode | null = null;
  private filterNodeB: BiquadFilterNode | null = null;
  private analyserNodeB: AnalyserNode | null = null;
  private sourceB: AudioBufferSourceNode | null = null;
  private bufferB: AudioBuffer | null = null;
  private synthIntervalB: any = null;

  public stateA: DeckState = {
    isPlaying: false,
    isLooping: true,
    volume: 0.85,
    filterFreq: 8000,
    trackName: 'Cyber Bass // Neon Acid (Synth 128 BPM)',
    sourceType: 'synth',
  };

  public stateB: DeckState = {
    isPlaying: false,
    isLooping: true,
    volume: 0.85,
    filterFreq: 8000,
    trackName: 'Obsidian Pad // Lofi Ambient (Synth 90 BPM)',
    sourceType: 'synth',
  };

  public crossfaderPos = 0.5;
  public isInitialized = false;

  public async init(): Promise<void> {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return;
    }

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      console.warn('Web Audio API not supported in this browser.');
      return;
    }

    this.ctx = new AudioCtx();

    // Master chain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.9;

    this.masterAnalyser = this.ctx.createAnalyser();
    this.masterAnalyser.fftSize = 64;
    this.masterAnalyser.smoothingTimeConstant = 0.8;

    this.masterGain.connect(this.masterAnalyser);
    this.masterAnalyser.connect(this.ctx.destination);

    // Deck A Chain: Source -> Filter -> Gain -> CrossGain -> MasterGain
    this.filterNodeA = this.ctx.createBiquadFilter();
    this.filterNodeA.type = 'lowpass';
    this.filterNodeA.frequency.value = this.stateA.filterFreq;

    this.gainNodeA = this.ctx.createGain();
    this.gainNodeA.gain.value = this.stateA.volume;

    this.crossGainNodeA = this.ctx.createGain();
    this.analyserNodeA = this.ctx.createAnalyser();
    this.analyserNodeA.fftSize = 64;

    this.filterNodeA.connect(this.gainNodeA);
    this.gainNodeA.connect(this.crossGainNodeA);
    this.crossGainNodeA.connect(this.analyserNodeA);
    this.analyserNodeA.connect(this.masterGain);

    // Deck B Chain: Source -> Filter -> Gain -> CrossGain -> MasterGain
    this.filterNodeB = this.ctx.createBiquadFilter();
    this.filterNodeB.type = 'lowpass';
    this.filterNodeB.frequency.value = this.stateB.filterFreq;

    this.gainNodeB = this.ctx.createGain();
    this.gainNodeB.gain.value = this.stateB.volume;

    this.crossGainNodeB = this.ctx.createGain();
    this.analyserNodeB = this.ctx.createAnalyser();
    this.analyserNodeB.fftSize = 64;

    this.filterNodeB.connect(this.gainNodeB);
    this.gainNodeB.connect(this.crossGainNodeB);
    this.crossGainNodeB.connect(this.analyserNodeB);
    this.analyserNodeB.connect(this.masterGain);

    this.updateCrossfader(this.crossfaderPos);
    this.isInitialized = true;
  }

  public updateCrossfader(pos: number): void {
    this.crossfaderPos = Math.max(0, Math.min(1, pos));
    const { gainA, gainB } = calculateCrossfaderGains(this.crossfaderPos);

    if (this.crossGainNodeA && this.ctx) {
      this.crossGainNodeA.gain.setTargetAtTime(gainA, this.ctx.currentTime, 0.02);
    }
    if (this.crossGainNodeB && this.ctx) {
      this.crossGainNodeB.gain.setTargetAtTime(gainB, this.ctx.currentTime, 0.02);
    }
  }

  public setVolume(deck: 'A' | 'B', volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    if (deck === 'A') {
      this.stateA.volume = clamped;
      if (this.gainNodeA && this.ctx) {
        this.gainNodeA.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
      }
    } else {
      this.stateB.volume = clamped;
      if (this.gainNodeB && this.ctx) {
        this.gainNodeB.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
      }
    }
  }

  public setFilter(deck: 'A' | 'B', freq: number): void {
    const clamped = Math.max(100, Math.min(20000, freq));
    if (deck === 'A') {
      this.stateA.filterFreq = clamped;
      if (this.filterNodeA && this.ctx) {
        this.filterNodeA.frequency.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
      }
    } else {
      this.stateB.filterFreq = clamped;
      if (this.filterNodeB && this.ctx) {
        this.filterNodeB.frequency.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
      }
    }
  }

  public async play(deck: 'A' | 'B'): Promise<void> {
    await this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (deck === 'A') {
      this.stopDeck('A');
      this.stateA.isPlaying = true;
      if (this.bufferA) {
        this.playBuffer('A');
      } else {
        this.playProceduralSynth('A');
      }
    } else {
      this.stopDeck('B');
      this.stateB.isPlaying = true;
      if (this.bufferB) {
        this.playBuffer('B');
      } else {
        this.playProceduralSynth('B');
      }
    }
  }

  public pause(deck: 'A' | 'B'): void {
    this.stopDeck(deck);
    if (deck === 'A') {
      this.stateA.isPlaying = false;
    } else {
      this.stateB.isPlaying = false;
    }
  }

  public togglePlay(deck: 'A' | 'B'): void {
    if (deck === 'A') {
      if (this.stateA.isPlaying) this.pause('A');
      else this.play('A');
    } else {
      if (this.stateB.isPlaying) this.pause('B');
      else this.play('B');
    }
  }

  private stopDeck(deck: 'A' | 'B'): void {
    if (deck === 'A') {
      if (this.sourceA) {
        try { this.sourceA.stop(); } catch {}
        this.sourceA.disconnect();
        this.sourceA = null;
      }
      if (this.synthIntervalA) {
        clearInterval(this.synthIntervalA);
        this.synthIntervalA = null;
      }
    } else {
      if (this.sourceB) {
        try { this.sourceB.stop(); } catch {}
        this.sourceB.disconnect();
        this.sourceB = null;
      }
      if (this.synthIntervalB) {
        clearInterval(this.synthIntervalB);
        this.synthIntervalB = null;
      }
    }
  }

  private playBuffer(deck: 'A' | 'B'): void {
    if (!this.ctx) return;
    const isA = deck === 'A';
    const buffer = isA ? this.bufferA : this.bufferB;
    const filter = isA ? this.filterNodeA : this.filterNodeB;
    if (!buffer || !filter) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = isA ? this.stateA.isLooping : this.stateB.isLooping;
    source.connect(filter);
    source.start();

    if (isA) this.sourceA = source;
    else this.sourceB = source;
  }

  /**
   * Generates procedural rhythmic synth patterns for Deck A & B
   * Ensures instant sound without needing external MP3 asset downloads!
   */
  private playProceduralSynth(deck: 'A' | 'B'): void {
    if (!this.ctx) return;
    const isA = deck === 'A';
    const targetFilter = isA ? this.filterNodeA : this.filterNodeB;
    if (!targetFilter) return;

    if (isA) {
      // Cyber Bass & Arpeggio Pattern (128 BPM = ~234ms per 8th note)
      const notes = [65.41, 65.41, 77.78, 87.31, 65.41, 98.00, 110.00, 130.81]; // C2, Eb2, F2, G2...
      let step = 0;

      const triggerNote = () => {
        if (!this.ctx || !this.stateA.isPlaying) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = step % 4 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(notes[step % notes.length], now);

        noteGain.gain.setValueAtTime(0.3, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(noteGain);
        noteGain.connect(targetFilter);

        osc.start(now);
        osc.stop(now + 0.23);
        step = (step + 1) % notes.length;
      };

      triggerNote();
      this.synthIntervalA = setInterval(triggerNote, 234);
    } else {
      // Ambient Lofi Chords & Pad (90 BPM = ~666ms per chord)
      const chords = [
        [220.00, 261.63, 329.63], // Am (A3, C4, E4)
        [174.61, 220.00, 261.63], // F (F3, A3, C4)
        [196.00, 246.94, 293.66], // G (G3, B3, D4)
        [164.81, 196.00, 246.94], // Em (E3, G3, B3)
      ];
      let chordIndex = 0;

      const triggerChord = () => {
        if (!this.ctx || !this.stateB.isPlaying) return;
        const now = this.ctx.currentTime;
        const chord = chords[chordIndex % chords.length];

        chord.forEach(freq => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.12, now + 0.2);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

          osc.connect(noteGain);
          noteGain.connect(targetFilter);

          osc.start(now);
          osc.stop(now + 0.66);
        });

        chordIndex = (chordIndex + 1) % chords.length;
      };

      triggerChord();
      this.synthIntervalB = setInterval(triggerChord, 666);
    }
  }

  public async loadUserFile(deck: 'A' | 'B', file: File): Promise<void> {
    await this.init();
    if (!this.ctx) return;

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

    if (deck === 'A') {
      this.bufferA = audioBuffer;
      this.stateA.trackName = file.name;
      this.stateA.sourceType = 'custom';
      if (this.stateA.isPlaying) {
        this.stopDeck('A');
        this.playBuffer('A');
      }
    } else {
      this.bufferB = audioBuffer;
      this.stateB.trackName = file.name;
      this.stateB.sourceType = 'custom';
      if (this.stateB.isPlaying) {
        this.stopDeck('B');
        this.playBuffer('B');
      }
    }
  }

  public getFrequencyData(deck?: 'A' | 'B'): Uint8Array {
    const targetAnalyser = deck === 'A' 
      ? this.analyserNodeA 
      : deck === 'B' 
        ? this.analyserNodeB 
        : this.masterAnalyser;

    const buffer = new Uint8Array(targetAnalyser ? targetAnalyser.frequencyBinCount : 32);
    if (targetAnalyser) {
      targetAnalyser.getByteFrequencyData(buffer);
    }
    return buffer;
  }
}

// Global audio singleton for cross-section visualization
let audioSingleton: DualDeckAudioEngine | null = null;

export function getAudioEngine(): DualDeckAudioEngine {
  if (!audioSingleton) {
    audioSingleton = new DualDeckAudioEngine();
  }
  return audioSingleton;
}
