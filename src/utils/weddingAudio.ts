// Romantic Web Audio API Synthesizer for the Wedding Invitation
// Works 100% offline/sandbox without external MP3 CORS failures

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private stepIndex: number = 0;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();

  // Serene Raag Yaman / Lydian Romantic Melody Notes (Frequencies in Hz)
  private melodySequence: Array<{ note: number; bass?: number; chord?: number[]; duration: number }> = [
    { note: 523.25, bass: 130.81, chord: [261.63, 329.63, 392.0], duration: 1.6 }, // C5 over C maj
    { note: 587.33, duration: 0.8 }, // D5
    { note: 659.25, duration: 1.4 }, // E5
    { note: 739.99, bass: 146.83, chord: [293.66, 369.99, 440.0], duration: 1.2 }, // F#5 (Yaman Tivra Ma)
    { note: 783.99, duration: 1.6 }, // G5
    { note: 659.25, duration: 1.0 }, // E5
    { note: 587.33, bass: 196.0, chord: [246.94, 293.66, 392.0], duration: 1.4 }, // D5 over G
    { note: 493.88, duration: 1.2 }, // B4
    { note: 523.25, bass: 130.81, chord: [261.63, 329.63, 493.88], duration: 1.8 }, // C5 over Cmaj7
    { note: 659.25, duration: 0.9 }, // E5
    { note: 783.99, duration: 1.2 }, // G5
    { note: 880.0, bass: 174.61, chord: [261.63, 349.23, 440.0], duration: 1.5 }, // A5
    { note: 783.99, duration: 1.1 }, // G5
    { note: 659.25, bass: 196.0, chord: [293.66, 392.0, 493.88], duration: 1.3 }, // E5
    { note: 587.33, duration: 1.2 }, // D5
    { note: 523.25, bass: 130.81, chord: [261.63, 329.63, 392.0], duration: 2.2 }, // C5
  ];

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.28;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean, muted: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying, this.isMuted);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.isMuted));
  }

  public startMusic() {
    this.ensureContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.28, this.ctx.currentTime, 0.2);
    }
    this.playStep();
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying && !this.isMuted) {
        this.playStep();
      }
    }, 950);
    this.notify();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  public toggleMute() {
    if (!this.isPlaying) {
      this.startMusic();
      return;
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0.0001 : 0.28, this.ctx.currentTime, 0.15);
    }
    this.notify();
  }

  public getState() {
    return { isPlaying: this.isPlaying, isMuted: this.isMuted };
  }

  private playStep() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const item = this.melodySequence[this.stepIndex % this.melodySequence.length];
    this.stepIndex++;

    // Plucked Harp / Santoor Bell Tone
    this.playPluck(item.note, now, item.duration, 0.22);
    // Subtle shimmer octave harmonic
    this.playPluck(item.note * 2, now + 0.04, item.duration * 0.7, 0.05);

    // Warm Pad Chord if present
    if (item.chord) {
      item.chord.forEach((freq, idx) => {
        this.playPad(freq, now + idx * 0.06, 2.6, 0.055);
      });
    }

    // Soft Warm Bass
    if (item.bass) {
      this.playPad(item.bass, now, 2.8, 0.09);
    }
  }

  private playPluck(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private playPad(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  // Interactive Sound Effect: Romantic Heart Chime
  public playHeartChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, i) => {
      this.playPluck(n, now + i * 0.09, 1.8, 0.18);
    });
  }

  // Interactive Sound Effect: Mehndi Dholak Festive Beat
  public playDholakBeat() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const hits = [
      { time: 0, freq: 110, dur: 0.18, vol: 0.35 },
      { time: 0.22, freq: 240, dur: 0.12, vol: 0.25 },
      { time: 0.36, freq: 260, dur: 0.12, vol: 0.22 },
      { time: 0.55, freq: 105, dur: 0.22, vol: 0.35 },
      { time: 0.78, freq: 280, dur: 0.15, vol: 0.28 },
    ];
    hits.forEach((h) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(h.freq * 1.4, now + h.time);
      osc.frequency.exponentialRampToValueAtTime(h.freq * 0.65, now + h.time + h.dur);
      gain.gain.setValueAtTime(h.vol, now + h.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + h.time + h.dur);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + h.time);
      osc.stop(now + h.time + h.dur + 0.02);
    });
  }

  // Interactive Sound Effect: Soft Scratch / Sparkle Shimmer
  public playSparkleTick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const randomFreq = 1200 + Math.random() * 1400;
    this.playPluck(randomFreq, now, 0.25, 0.04);
  }
}

export const weddingAudio = new WeddingAudioEngine();
