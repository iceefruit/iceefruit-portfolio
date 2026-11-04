import '@testing-library/jest-dom';

// Mock Web Audio API for JSDOM test environment
if (typeof window !== 'undefined') {
  class MockAudioContext {
    state = 'suspended';
    resume = async () => { this.state = 'running'; };
    suspend = async () => { this.state = 'suspended'; };
    createGain = () => ({
      gain: { value: 1, setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {},
      disconnect: () => {},
    });
    createBiquadFilter = () => ({
      frequency: { value: 1000, setValueAtTime: () => {} },
      type: 'lowpass',
      connect: () => {},
      disconnect: () => {},
    });
    createAnalyser = () => ({
      fftSize: 64,
      frequencyBinCount: 32,
      getByteFrequencyData: (arr: Uint8Array) => { arr.fill(128); },
      connect: () => {},
      disconnect: () => {},
    });
    createBufferSource = () => ({
      buffer: null,
      loop: false,
      connect: () => {},
      disconnect: () => {},
      start: () => {},
      stop: () => {},
    });
    decodeAudioData = async () => ({
      duration: 10,
      numberOfChannels: 2,
      sampleRate: 44100,
    });
  }

  (window as any).AudioContext = MockAudioContext;
  (window as any).webkitAudioContext = MockAudioContext;

  // Mock HTMLMediaElement play/pause
  window.HTMLMediaElement.prototype.play = async () => {};
  window.HTMLMediaElement.prototype.pause = () => {};
}
