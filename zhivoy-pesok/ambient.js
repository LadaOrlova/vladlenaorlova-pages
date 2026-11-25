const ROOT = 146.8324;
const HARMONIES = [
  [1 / 2, 3 / 4, 1, 5 / 4, 3 / 2, 9 / 4],
  [1 / 2, 3 / 4, 1, 6 / 5, 3 / 2, 9 / 4],
  [1 / 2, 3 / 4, 1, 4 / 3, 3 / 2, 9 / 4],
];

const STONES = [
  { partials: [1, .40, .045], gain: .054, drift: 47, spread: .16 },
  { partials: [1, .11, .31, .044], gain: .032, drift: 29, spread: .43 },
  { partials: [1, .19, .082, .028], gain: .031, drift: 37, spread: .36 },
  { partials: [1, .52, .072, .02], gain: .028, drift: 41, spread: .19 },
  { partials: [1, .075, .18, .085], gain: .024, drift: 23, spread: .60 },
  { partials: [1, .10, .054, .14], gain: .021, drift: 31, spread: .56 },
];

const FLUTES = [
  { name: 'Бамбуковая флейта', partials: [1, .16, .24, .07, .085], air: .42, cutoff: 1550, bend: -39, attack: .44, register: 1 },
  { name: 'Глиняная окарина', partials: [1, .055, .019, .008], air: .15, cutoff: 1050, bend: -11, attack: .28, register: 1 },
  { name: 'Обертоновая свирель', partials: [1, .29, .19, .045, .127], air: .23, cutoff: 2270, bend: 18, attack: .32, register: 1.5 },
];

export const fluteAt = (x) => FLUTES[Math.min(2, Math.max(0, Math.floor(x * 3)))];
const mix = (from, to, t) => from + (to - from) * t;

export function createAmbientGarden(context, destination = context.destination) {
  const input = context.createGain();
  const volume = context.createGain();
  volume.gain.value = 0;
  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -17;
  limiter.knee.value = 12;
  limiter.ratio.value = 5;
  limiter.attack.value = .018;
  limiter.release.value = .3;
  const lowCut = context.createBiquadFilter();
  lowCut.type = 'highpass';
  lowCut.frequency.value = 42;
  const dry = context.createGain();
  input.connect(dry).connect(lowCut);
  lowCut.connect(limiter).connect(volume).connect(destination);

  const near = room(2.4, .18, 3300);
  const far = room(7.7, .53, 2050);
  const airBuffer = noiseBuffer();
  const fluteWaves = FLUTES.map(({ partials }) => wave(partials));
  const voices = STONES.map(buildVoice);
  let scene;
  let nextFlute = context.currentTime + 8;
  let lastFlute = -Infinity;
  let fluteTurn = 0;

  function wave(partials) {
    return context.createPeriodicWave(new Float32Array(partials.length + 1), Float32Array.from([0, ...partials]));
  }

  function room(seconds, buildup, cutoff) {
    const length = Math.round(context.sampleRate * seconds);
    const impulse = context.createBuffer(2, length, context.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const samples = impulse.getChannelData(ch);
      let softened = 0;
      const early = Math.round(context.sampleRate * (.024 + ch * .013));
      for (let i = early; i < length; i++) {
        const elapsed = (i - early) / context.sampleRate;
        softened += (Math.random() * 2 - 1 - softened) * .26;
        samples[i] = softened * (1 - Math.exp(-elapsed / buildup)) * Math.exp(-elapsed * 6.91 / seconds);
      }
    }
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = cutoff;
    const send = context.createGain();
    send.gain.value = 0;
    const reverb = context.createConvolver();
    reverb.buffer = impulse;
    input.connect(send).connect(filter).connect(reverb).connect(lowCut);
    return send.gain;
  }

  function noiseBuffer() {
    const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function buildVoice(profile, index) {
    const timbre = wave(profile.partials);
    const body = context.createOscillator();
    const octave = context.createOscillator();
    body.setPeriodicWave(timbre);
    octave.setPeriodicWave(timbre);
    octave.detune.value = (index % 3 - 1) * 1.3;
    const low = context.createGain();
    const high = context.createGain();
    low.gain.value = high.gain.value = 0;
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = .28;
    const swell = context.createGain();
    swell.gain.value = .76;
    const lfo = context.createOscillator();
    lfo.frequency.value = 1 / profile.drift;
    const drift = context.createGain();
    drift.gain.value = profile.spread * .33;
    const breath = context.createOscillator();
    breath.frequency.value = 1 / (9.3 + index * 1.18);
    const breathDepth = context.createGain();
    breathDepth.gain.value = 0;
    lfo.connect(drift).connect(swell.gain);
    breath.connect(breathDepth).connect(swell.gain);
    const pan = context.createStereoPanner();
    body.connect(low).connect(filter);
    octave.connect(high).connect(filter);
    filter.connect(swell).connect(pan).connect(input);
    body.start();
    octave.start();
    lfo.start();
    breath.start();
    return { body, octave, low, high, filter, breathDepth, pan };
  }

  function harmony() {
    return HARMONIES[scene.harmony] ?? HARMONIES[0];
  }

  function update(nextScene) {
    const first = !scene;
    scene = nextScene;
    const now = context.currentTime;
    const { stones, branch, breathing, muted } = scene;
    const tuning = harmony();
    volume.gain.setTargetAtTime(muted ? 0 : .82, now, .17);
    const distance = branch.x ** 1.2;
    const wet = mix(.05, .78, distance);
    const roomSize = .08 + .70 * branch.x + .22 * (1 - branch.y);
    near.setTargetAtTime(wet * mix(.86, .10, roomSize), now, 1.15);
    far.setTargetAtTime(wet * mix(.06, .91, roomSize), now, 1.35);
    dry.gain.setTargetAtTime(mix(1, .69, wet), now, 1.2);

    for (const [i, stone] of stones.entries()) {
      const { body, octave, low, high, filter, breathDepth, pan } = voices[i];
      const register = 1 - stone.y;
      const level = STONES[i].gain * (stone.active ? 1 : 0);
      const freq = ROOT * tuning[i];
      if (first) {
        body.frequency.setValueAtTime(freq, now);
        octave.frequency.setValueAtTime(freq * 2, now);
      } else {
        body.frequency.setTargetAtTime(freq, now, .58);
        octave.frequency.setTargetAtTime(freq * 2, now, .58);
      }
      low.gain.setTargetAtTime(level * mix(1.38, .31, register), now, .30);
      high.gain.setTargetAtTime(level * mix(.025, .94, register ** 1.35), now, .42);
      filter.frequency.setTargetAtTime(210 + 1980 * stone.x ** 1.8 + 430 * register, now, .25);
      pan.pan.setTargetAtTime((stone.x * 2 - 1) * .71, now, .25);
      breathDepth.gain.setTargetAtTime(breathing ? .08 + .015 * (i % 3) : 0, now, .75);
    }
    if (now >= nextFlute) {
      nextFlute = now + 19 + 12 * (.5 + .5 * Math.sin(++fluteTurn * 2.4));
      if (branch.active && !muted) playFlute(false);
    }
  }

  function playFlute(direct = true) {
    if (!scene || scene.muted || !scene.branch.active) return;
    const now = context.currentTime;
    if (now - lastFlute < (direct ? .65 : 4)) return;
    lastFlute = now;
    if (direct) nextFlute = now + 22;
    const { x, y } = scene.branch;
    const flute = fluteAt(x);
    const notes = [1, 9 / 8, harmony()[3], 3 / 2, 2];
    const slot = Math.min(4, Math.floor((1 - y) * notes.length));
    fluteNote(ROOT * 2 * notes[slot] * flute.register, now, flute, x, direct ? .084 : .060, 2.8);
    if (!direct && fluteTurn % 3 !== 0) {
      const answer = Math.max(0, slot - 1);
      fluteNote(ROOT * 2 * notes[answer] * flute.register, now + 3.75, flute, x, .043, 1.95);
    }
  }

  function fluteNote(freq, start, flute, x, level, length) {
    const tone = context.createOscillator();
    tone.setPeriodicWave(fluteWaves[FLUTES.indexOf(flute)]);
    tone.frequency.value = freq;
    tone.detune.setValueAtTime(flute.bend, start);
    tone.detune.linearRampToValueAtTime(0, start + flute.attack + .16);
    tone.detune.linearRampToValueAtTime(flute.bend * .46, start + length);
    const vibrato = context.createOscillator();
    vibrato.frequency.value = 2.6 + x * .9;
    const vibratoDepth = context.createGain();
    vibratoDepth.gain.setValueAtTime(0, start);
    vibratoDepth.gain.linearRampToValueAtTime(6 + 3 * x, start + 1.2);
    vibrato.connect(vibratoDepth).connect(tone.detune);

    const air = context.createBufferSource();
    air.buffer = airBuffer;
    air.loop = true;
    const band = context.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 900 + x * 820;
    band.Q.value = .66;
    const airLevel = context.createGain();
    airLevel.gain.setValueAtTime(0, start);
    airLevel.gain.linearRampToValueAtTime(flute.air, start + .19);
    airLevel.gain.setTargetAtTime(flute.air * .46, start + .19, .5);
    air.connect(band).connect(airLevel);
    const color = context.createBiquadFilter();
    color.type = 'lowpass';
    color.frequency.setValueAtTime(flute.cutoff * .76, start);
    color.frequency.setTargetAtTime(flute.cutoff, start + .10, .32);
    tone.connect(color);
    airLevel.connect(color);
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(level, start + flute.attack);
    envelope.gain.setTargetAtTime(level * .49, start + flute.attack, .7);
    envelope.gain.setTargetAtTime(0, start + length - .7, .31);
    const pan = context.createStereoPanner();
    pan.pan.value = (x * 2 - 1) * .44;
    color.connect(envelope).connect(pan).connect(input);
    for (const source of [tone, air, vibrato]) {
      source.start(start);
      source.stop(start + length + 1);
    }
  }

  function touch(index, strength = 1) {
    if (!scene || scene.muted) return;
    const tone = context.createOscillator();
    const level = context.createGain();
    const now = context.currentTime;
    tone.frequency.value = ROOT * harmony()[index % STONES.length] * 2;
    level.gain.setValueAtTime(0, now);
    level.gain.linearRampToValueAtTime(.033 * strength, now + .19);
    level.gain.setTargetAtTime(0, now + .19, .57);
    tone.connect(level).connect(input);
    tone.start();
    tone.stop(now + 3.2);
  }

  return { update, playFlute, touch };
}
