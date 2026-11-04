import { CharacterClass } from '../types/character';

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Melodic summon chord
  public playSummonSound(charClass?: CharacterClass) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.12, now);
      master.connect(this.ctx.destination);

      // Rapid dice roll clicks
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140 + Math.random() * 80, now + i * 0.04);

        clickGain.gain.setValueAtTime(0.08, now + i * 0.04);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.03);

        osc.connect(clickGain);
        clickGain.connect(master);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.04);
      }

      // Class-specific musical resonance
      const chordTime = now + 0.18;
      let freqs = [330, 440, 660]; // Default resonant A major
      if (charClass === 'Warrior') {
        // Deep heroic fanfare
        freqs = [220, 330, 440, 554];
      } else if (charClass === 'Mage') {
        // Shimmering celestial harmonics
        freqs = [392, 587.33, 783.99, 1174.66];
      } else if (charClass === 'Rogue') {
        // Swift, sharp minor whisper
        freqs = [293.66, 440, 523.25, 880];
      }

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = charClass === 'Warrior' ? 'sawtooth' : charClass === 'Mage' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, chordTime + idx * 0.03);

        noteGain.gain.setValueAtTime(0.001, chordTime + idx * 0.03);
        noteGain.gain.linearRampToValueAtTime(0.1 / (idx + 1), chordTime + idx * 0.03 + 0.06);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, chordTime + 0.65);

        osc.connect(noteGain);
        noteGain.connect(master);

        osc.start(chordTime + idx * 0.03);
        osc.stop(chordTime + 0.7);
      });
    } catch {
      // Gracefully handle browser autoplay or audio policy restrictions
    }
  }

  // Quick tactile button click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  // 16-bit arcade video game jingle
  public playArcadeJingle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.09);
      });
    } catch {
      // Ignore
    }
  }

  // Regenerate power-up sound
  public playRegenerateSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.15);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
    } catch {
      // Ignore
    }
  }

  // Mystical quill and parchment story chime
  public playStoryChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.5);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new AudioSynthesizer();
