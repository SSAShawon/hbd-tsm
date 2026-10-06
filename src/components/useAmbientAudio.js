import { useCallback, useEffect, useRef, useState } from 'react';

function createContext() {
  const Context = window.AudioContext || window.webkitAudioContext;
  return Context ? new Context() : null;
}

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = window.localStorage.getItem('tsm-sound-enabled');
      return saved === null ? true : saved === 'true';
    } catch { return true; }
  });
  const engineRef = useRef(null);
  const moodRef = useRef('warm');

  const start = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (engineRef.current) {
      if (engineRef.current.context.state === 'suspended') engineRef.current.context.resume().catch(() => {});
      return;
    }
    const context = createContext();
    if (!context) return;
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 430;
    master.gain.value = moodRef.current === 'slow' ? 0.006 : moodRef.current === 'cool' ? 0.01 : 0.018;
    filter.connect(master);
    master.connect(context.destination);
    const oscillators = [
      { frequency: 110, type: 'sine', gain: 0.38 },
      { frequency: 164.81, type: 'triangle', gain: 0.15 },
      { frequency: 220, type: 'sine', gain: 0.07 },
    ].map((setting) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = setting.type;
      oscillator.frequency.value = setting.frequency;
      voiceGain.gain.value = setting.gain;
      oscillator.connect(voiceGain);
      voiceGain.connect(filter);
      oscillator.start();
      return oscillator;
    });
    engineRef.current = { context, master, oscillators };
    if (context.state === 'suspended') context.resume().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.master.gain.cancelScheduledValues(engine.context.currentTime);
    engine.master.gain.setTargetAtTime(0, engine.context.currentTime, 0.16);
    window.setTimeout(() => {
      try {
        engine.oscillators.forEach((oscillator) => oscillator.stop());
        engine.context.close();
      } catch { /* Audio context may already be closed. */ }
      if (engineRef.current === engine) engineRef.current = null;
    }, 700);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try { window.localStorage.setItem('tsm-sound-enabled', String(next)); } catch { /* Storage is optional. */ }
    if (next) start(); else stop();
  }, [enabled, start, stop]);

  const setMood = useCallback((mood) => {
    moodRef.current = mood || 'warm';
    const engine = engineRef.current;
    if (!engine) return;
    const target = mood === 'slow' ? 0.006 : mood === 'cool' ? 0.01 : 0.018;
    engine.master.gain.cancelScheduledValues(engine.context.currentTime);
    engine.master.gain.setTargetAtTime(target, engine.context.currentTime, 0.42);
  }, []);

  const playCue = useCallback((kind = 'tap') => {
    if (!enabled) return;
    start();
    const engine = engineRef.current;
    if (!engine) return;
    const { context } = engine;
    const now = context.currentTime;
    const profiles = {
      tap: [{ f: 480, d: 0.052, v: 0.018, type: 'sine' }],
      page: [{ f: 365, d: 0.085, v: 0.022, type: 'triangle' }, { f: 540, d: 0.075, v: 0.012, type: 'sine', delay: 0.035 }],
      open: [{ f: 440, d: 0.18, v: 0.022, type: 'sine' }, { f: 659.25, d: 0.25, v: 0.017, type: 'sine', delay: 0.09 }],
      memory: [{ f: 659.25, d: 0.26, v: 0.024, type: 'sine' }, { f: 987.77, d: 0.34, v: 0.014, type: 'sine', delay: 0.07 }],
      letter: [{ f: 392, d: 0.19, v: 0.018, type: 'sine' }, { f: 587.33, d: 0.28, v: 0.018, type: 'sine', delay: 0.08 }],
      chapter: [{ f: 392, d: 0.3, v: 0.02, type: 'sine' }, { f: 523.25, d: 0.34, v: 0.019, type: 'sine', delay: 0.1 }, { f: 659.25, d: 0.48, v: 0.017, type: 'sine', delay: 0.2 }],
      birthday: [{ f: 523.25, d: 0.45, v: 0.019, type: 'sine' }, { f: 659.25, d: 0.48, v: 0.018, type: 'sine', delay: 0.08 }, { f: 783.99, d: 0.52, v: 0.016, type: 'sine', delay: 0.16 }, { f: 1046.5, d: 0.64, v: 0.011, type: 'sine', delay: 0.25 }],
      notification: [{ f: 740, end: 990, d: 0.35, v: 0.043, type: 'sine' }, { f: 660, d: 0.19, v: 0.012, type: 'sine', delay: 0.34 }],
      close: [{ f: 440, end: 330, d: 0.12, v: 0.015, type: 'sine' }],
      soft: [{ f: 523.25, end: 392, d: 0.38, v: 0.018, type: 'sine' }],
    };
    const notes = profiles[kind] || profiles.tap;
    notes.forEach((note) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = now + (note.delay || 0);
      const endAt = startAt + note.d;
      oscillator.type = note.type || 'sine';
      oscillator.frequency.setValueAtTime(note.f, startAt);
      if (note.end) oscillator.frequency.exponentialRampToValueAtTime(note.end, endAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(note.v, startAt + Math.min(0.025, note.d * 0.18));
      gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(endAt + 0.015);
    });
  }, [enabled, start]);

  useEffect(() => {
    if (!enabled) return undefined;
    const resume = () => start();
    window.addEventListener('pointerdown', resume, { once: true, passive: true });
    return () => window.removeEventListener('pointerdown', resume);
  }, [enabled, start]);

  useEffect(() => () => {
    const engine = engineRef.current;
    if (engine) {
      try { engine.oscillators.forEach((oscillator) => oscillator.stop()); } catch { /* no-op */ }
      engine.context.close().catch(() => {});
      engineRef.current = null;
    }
  }, []);

  return { enabled, toggle, playCue, setMood };
}
