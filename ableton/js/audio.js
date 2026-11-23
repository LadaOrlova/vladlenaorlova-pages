/* Sound engine for the trainers: Web Audio voices, sends (reverb, dub delay) and a lookahead clock. */
window.Snd = (function () {
  'use strict';
  let ctx = null, out, comp, dry, revIn, dlyIn, dly, fb, dlyLP, noiseBuf;
  const clocks = new Set();
  const stoppers = new Set();

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14; comp.ratio.value = 3; comp.knee.value = 8;
      comp.attack.value = 0.008; comp.release.value = 0.25;
      out = ctx.createGain(); out.gain.value = 0.8;
      out.connect(comp); comp.connect(ctx.destination);
      dry = ctx.createGain(); dry.connect(out);

      // Return A: long dark reverb
      revIn = ctx.createGain();
      const revHP = ctx.createBiquadFilter(); revHP.type = 'highpass'; revHP.frequency.value = 200;
      const conv = ctx.createConvolver(); conv.buffer = makeIR(3.4, 2.4);
      const revOut = ctx.createGain(); revOut.gain.value = 0.85;
      revIn.connect(revHP); revHP.connect(conv); conv.connect(revOut); revOut.connect(out);

      // Return B: dub echo (filtered feedback)
      dlyIn = ctx.createGain();
      dly = ctx.createDelay(3.0); dly.delayTime.value = 0.375;
      fb = ctx.createGain(); fb.gain.value = 0.45;
      dlyLP = ctx.createBiquadFilter(); dlyLP.type = 'lowpass'; dlyLP.frequency.value = 2400;
      const dlyHP = ctx.createBiquadFilter(); dlyHP.type = 'highpass'; dlyHP.frequency.value = 350;
      const dlyOut = ctx.createGain(); dlyOut.gain.value = 0.7;
      const dlyToRev = ctx.createGain(); dlyToRev.gain.value = 0.25;
      dlyIn.connect(dly); dly.connect(dlyLP); dlyLP.connect(dlyHP); dlyHP.connect(fb); fb.connect(dly);
      dlyHP.connect(dlyOut); dlyOut.connect(out); dlyHP.connect(dlyToRev); dlyToRev.connect(revIn);

      noiseBuf = makeNoise(2);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function makeNoise(sec) {
    const len = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  function makePink(sec) {
    const len = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return b;
  }

  function makeIR(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec);
    const b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      let y = 0;
      for (let i = 0; i < len; i++) {
        const k = i / len;
        const a = 0.55 - 0.45 * k; // tail gets darker
        y += a * ((Math.random() * 2 - 1) - y);
        d[i] = y * Math.pow(1 - k, decay) * (i < ctx.sampleRate * 0.012 ? i / (ctx.sampleRate * 0.012) : 1);
      }
    }
    return b;
  }

  // ---------- helpers ----------
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function filt(type, f, q) { const n = ctx.createBiquadFilter(); n.type = type; n.frequency.value = f; if (q != null) n.Q.value = q; return n; }
  function noiseSrc() { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s; }
  function pan(p) {
    if (!ctx.createStereoPanner) return ctx.createGain();
    const n = ctx.createStereoPanner(); n.pan.value = p; return n;
  }
  function route(node, o) {
    o = o || {};
    node.connect(o.dest || dry);
    if (o.rev) { const s = ctx.createGain(); s.gain.value = o.rev; node.connect(s); s.connect(o.revDest || revIn); }
    if (o.dly) { const s = ctx.createGain(); s.gain.value = o.dly; node.connect(s); s.connect(o.dlyDest || dlyIn); }
  }
  function percEnv(g, t, peak, a, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function rnd(a) { return (Math.random() * 2 - 1) * a; }

  // ---------- drum voices ----------
  const V = {};
  V.kick = function (t, v, o) {
    v = v == null ? 1 : v;
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.06);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.35);
    const g = ctx.createGain(); percEnv(g, t, 0.95 * v, 0.003, 0.5);
    osc.connect(g); route(g, o); osc.start(t); osc.stop(t + 0.6);
    const n = noiseSrc(); const hp = filt('highpass', 2500); const ng = ctx.createGain(); percEnv(ng, t, 0.09 * v, 0.001, 0.012);
    n.connect(hp); hp.connect(ng); route(ng, o); n.start(t); n.stop(t + 0.03);
  };
  V.rumble = function (t, v, o, stepDur) {
    // reverb-ish low tail that follows the kick, like a "rumble" bus
    const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 46 + rnd(1.5);
    const lp = filt('lowpass', 120, 0.7);
    const g = ctx.createGain(); const d = (stepDur || 0.12) * 3.4;
    g.gain.setValueAtTime(0.0001, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.32 * (v == null ? 1 : v), t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); route(g, o); osc.start(t); osc.stop(t + d + 0.05);
  };
  V.hat = function (t, v, o) {
    v = v == null ? 1 : v;
    const n = noiseSrc(); const hp = filt('highpass', 7600); const bp = filt('peaking', 10500, 1); bp.gain.value = 4;
    const g = ctx.createGain(); percEnv(g, t, 0.26 * v, 0.001, 0.04 + rnd(0.006));
    const p = pan(0.18);
    n.connect(hp); hp.connect(bp); bp.connect(g); g.connect(p); route(p, o); n.start(t); n.stop(t + 0.1);
  };
  V.ohat = function (t, v, o) {
    v = v == null ? 1 : v;
    const n = noiseSrc(); const hp = filt('highpass', 7000);
    const g = ctx.createGain(); percEnv(g, t, 0.18 * v, 0.004, 0.32);
    const p = pan(-0.12);
    n.connect(hp); hp.connect(g); g.connect(p); route(p, Object.assign({ rev: 0.12 }, o)); n.start(t); n.stop(t + 0.4);
  };
  V.shaker = function (t, v, o) {
    v = v == null ? 1 : v;
    const n = noiseSrc(); const bp = filt('bandpass', 5800, 1.3); const hp = filt('highpass', 3000);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3 * v, t + 0.014 + rnd(0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.085 + rnd(0.01));
    const p = pan(-0.3);
    n.connect(bp); bp.connect(hp); hp.connect(g); g.connect(p); route(p, o); n.start(t); n.stop(t + 0.12);
  };
  V.rim = function (t, v, o) {
    v = v == null ? 1 : v;
    const osc = ctx.createOscillator(); osc.type = 'triangle'; osc.frequency.setValueAtTime(1650, t); osc.frequency.exponentialRampToValueAtTime(1300, t + 0.03);
    const g = ctx.createGain(); percEnv(g, t, 0.22 * v, 0.001, 0.035);
    const n = noiseSrc(); const bp = filt('bandpass', 2600, 5); const ng = ctx.createGain(); percEnv(ng, t, 0.25 * v, 0.001, 0.03);
    const p = pan(0.22);
    osc.connect(g); g.connect(p); n.connect(bp); bp.connect(ng); ng.connect(p);
    route(p, Object.assign({ rev: 0.18, dly: 0.12 }, o));
    osc.start(t); osc.stop(t + 0.06); n.start(t); n.stop(t + 0.06);
  };
  V.clap = function (t, v, o) {
    v = v == null ? 1 : v;
    const n = noiseSrc(); const bp = filt('bandpass', 1350, 0.9); const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    [0, 0.011, 0.022].forEach((dt) => {
      g.gain.setValueAtTime(0.0001, t + dt);
      g.gain.exponentialRampToValueAtTime(0.42 * v, t + dt + 0.002);
      g.gain.exponentialRampToValueAtTime(0.05 * v, t + dt + 0.009);
    });
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    n.connect(bp); bp.connect(g); route(g, Object.assign({ rev: 0.3 }, o)); n.start(t); n.stop(t + 0.3);
  };
  V.perc = function (t, v, o, f) {
    v = v == null ? 1 : v; f = f || 196;
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(f * 1.3, t); osc.frequency.exponentialRampToValueAtTime(f, t + 0.025);
    const g = ctx.createGain(); percEnv(g, t, 0.42 * v, 0.002, 0.26);
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2.6;
    const g2 = ctx.createGain(); percEnv(g2, t, 0.06 * v, 0.001, 0.05);
    const p = pan(0.35);
    osc.connect(g); o2.connect(g2); g.connect(p); g2.connect(p);
    route(p, Object.assign({ rev: 0.22 }, o));
    osc.start(t); osc.stop(t + 0.32); o2.start(t); o2.stop(t + 0.1);
  };

  // ---------- tonal voices ----------
  V.pluck = function (t, freq, v, o, len) {
    v = v == null ? 1 : v; len = len || 0.9;
    const lp = filt('lowpass', 3800, 0.4);
    const g = ctx.createGain(); percEnv(g, t, 0.32 * v, 0.003, len);
    const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = freq * 3.98;
    const g2 = ctx.createGain(); percEnv(g2, t, 0.12 * v, 0.001, 0.09);
    const o3 = ctx.createOscillator(); o3.type = 'triangle'; o3.frequency.value = freq * 2.001;
    const g3 = ctx.createGain(); percEnv(g3, t, 0.05 * v, 0.002, len * 0.5);
    o1.connect(g); o2.connect(g2); g2.connect(g); o3.connect(g3); g3.connect(g); g.connect(lp);
    route(lp, Object.assign({ rev: 0.35, dly: 0.3 }, o));
    [o1, o2, o3].forEach((x) => { x.start(t); x.stop(t + len + 0.1); });
  };
  V.bass = function (t, freq, dur, v, o) {
    v = v == null ? 1 : v;
    const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = freq;
    const g2 = ctx.createGain(); g2.gain.value = 0.25;
    const lp = filt('lowpass', 380, 0.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5 * v, t + 0.01);
    g.gain.setTargetAtTime(0.0001, t + dur * 0.8, 0.05);
    osc.connect(g); o2.connect(g2); g2.connect(g); g.connect(lp); route(lp, o);
    osc.start(t); osc.stop(t + dur + 0.3); o2.start(t); o2.stop(t + dur + 0.3);
  };
  V.pad = function (t, freqs, dur, o) {
    const lp = filt('lowpass', 1100, 0.5);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18; const lg = ctx.createGain(); lg.gain.value = 380;
    lfo.connect(lg); lg.connect(lp.frequency);
    const g = ctx.createGain(); const peak = 0.11 / Math.sqrt(freqs.length);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.7);
    g.gain.setValueAtTime(peak, t + Math.max(dur - 0.05, 0.75));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 1.6);
    const end = t + dur + 1.7;
    freqs.forEach((f, i) => {
      [-7, 7].forEach((cents) => {
        const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = f; osc.detune.value = cents + rnd(2);
        const p = pan(cents < 0 ? -0.35 : 0.35);
        osc.connect(p); p.connect(lp); osc.start(t); osc.stop(end);
      });
    });
    lp.connect(g); route(g, Object.assign({ rev: 0.55, dly: 0.1 }, o));
    lfo.start(t); lfo.stop(end);
  };
  V.stab = function (t, freqs, v, o) {
    v = v == null ? 1 : v;
    const lp = filt('lowpass', 2600, 2);
    lp.frequency.setValueAtTime(2600, t); lp.frequency.exponentialRampToValueAtTime(480, t + 0.22);
    const g = ctx.createGain(); percEnv(g, t, (0.2 / Math.sqrt(freqs.length)) * v, 0.004, 0.32);
    freqs.forEach((f) => {
      ['sawtooth', 'square'].forEach((type, k) => {
        const osc = ctx.createOscillator(); osc.type = type; osc.frequency.value = f; osc.detune.value = k ? 6 : -6;
        osc.connect(lp); osc.start(t); osc.stop(t + 0.45);
      });
    });
    lp.connect(g); route(g, Object.assign({ rev: 0.28, dly: 0.55 }, o));
  };

  // Subtractive synth voice, parameters named after Ableton's Drift/Analog panels
  V.synth = function (p, freq, t, o) {
    const end0 = 30;
    const osc = ctx.createOscillator(); osc.type = p.wave; osc.frequency.value = freq;
    let osc2 = null;
    if (p.detune > 0) { osc2 = ctx.createOscillator(); osc2.type = p.wave; osc2.frequency.value = freq; osc2.detune.value = p.detune; }
    const f = filt('lowpass', p.cutoff, p.res);
    let lfo = null;
    if (p.lfoAmt > 0) {
      lfo = ctx.createOscillator(); lfo.frequency.value = p.lfoRate;
      const lg = ctx.createGain(); lg.gain.value = p.cutoff * 0.9 * p.lfoAmt;
      lfo.connect(lg); lg.connect(f.frequency); lfo.start(t);
    }
    const g = ctx.createGain(); const peak = 0.32;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + Math.max(p.attack, 0.003));
    g.gain.setTargetAtTime(peak * p.sustain, t + Math.max(p.attack, 0.003), Math.max(p.decay, 0.01) / 3);
    osc.connect(f); if (osc2) { const h = ctx.createGain(); h.gain.value = 0.7; osc2.connect(h); h.connect(f); }
    f.connect(g); route(g, o);
    osc.start(t); if (osc2) osc2.start(t);
    let stopped = false;
    const voice = {
      off(when) {
        if (stopped) return; stopped = true;
        const tt = Math.max(when || ctx.currentTime, ctx.currentTime);
        g.gain.cancelScheduledValues(tt);
        g.gain.setValueAtTime(g.gain.value, tt);
        g.gain.setTargetAtTime(0, tt, Math.max(p.release, 0.01) / 4);
        const stopAt = tt + Math.max(p.release, 0.01) * 1.4 + 0.05;
        osc.stop(stopAt); if (osc2) osc2.stop(stopAt); if (lfo) lfo.stop(stopAt);
      }
    };
    // safety stop
    osc.stop(t + end0); if (osc2) osc2.stop(t + end0); if (lfo) lfo.stop(t + end0);
    return voice;
  };

  // ---------- clock ----------
  function Clock(opts) {
    const self = {
      bpm: opts.bpm || 120, swing: opts.swing || 0, running: false, step: 0,
      onStep: opts.onStep, onUI: opts.onUI,
      start() {
        ensure(); if (self.running) return;
        self.running = true; self.step = 0; next = ctx.currentTime + 0.08;
        timer = setInterval(tick, 25); clocks.add(self);
      },
      stop() {
        self.running = false; clearInterval(timer); timer = null; clocks.delete(self);
        uiTimers.forEach(clearTimeout); uiTimers.clear();
        if (self.onUI) self.onUI(-1);
      },
      stepDur() { return 60 / self.bpm / 4; }
    };
    let timer = null, next = 0; const uiTimers = new Set();
    function tick() {
      const sd = self.stepDur();
      while (next < ctx.currentTime + 0.12) {
        let t = next;
        if (self.step % 2 === 1) t += sd * self.swing * 0.42;
        self.onStep(self.step, t, sd);
        if (self.onUI) {
          const s = self.step; const ms = Math.max(0, (t - ctx.currentTime) * 1000);
          const id = setTimeout(() => { uiTimers.delete(id); if (self.running) self.onUI(s); }, ms);
          uiTimers.add(id);
        }
        next += sd; self.step++;
      }
    }
    return self;
  }

  function stopAll() {
    clocks.forEach((c) => c.stop());
    stoppers.forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } });
    stoppers.clear();
  }

  function setDelay(sec, feedback, tone) {
    ensure();
    const t = ctx.currentTime;
    dly.delayTime.setTargetAtTime(Math.min(sec, 2.9), t, 0.02);
    if (feedback != null) fb.gain.setTargetAtTime(feedback, t, 0.02);
    if (tone != null) dlyLP.frequency.setTargetAtTime(tone, t, 0.02);
  }

  return {
    ensure, mtof, Clock, stopAll, setDelay, V, filt, pan, route, makePink, makeIR,
    noiseSrc: () => noiseSrc(),
    onStop(fn) { stoppers.add(fn); return () => stoppers.delete(fn); },
    get ctx() { return ctx; }, get dry() { return dry; }, get out() { return out; },
    get revIn() { return revIn; }, get dlyIn() { return dlyIn; }
  };
})();
