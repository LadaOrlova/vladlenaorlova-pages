const HARMONIES = [
  [
    { name: 'Gmaj7', notes: [43, 50, 54, 59, 62, 66] },
    { name: 'Dadd9', notes: [38, 45, 50, 54, 57, 64] },
    { name: 'Bm7', notes: [47, 54, 57, 62, 66, 69] },
  ],
  [
    { name: 'B♭maj7', notes: [46, 53, 57, 62, 65, 69] },
    { name: 'Dm9', notes: [38, 45, 50, 53, 60, 64] },
    { name: 'Gm9', notes: [43, 50, 53, 57, 58, 69] },
  ],
  [
    { name: 'G6sus2', notes: [43, 50, 57, 62, 64, 69] },
    { name: 'Dsus4/9', notes: [38, 45, 50, 55, 57, 64] },
    { name: 'Asus4', notes: [45, 52, 57, 62, 64, 69] },
  ],
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

const zone = (x) => Math.min(2, Math.max(0, Math.floor(x * 3)));
export const fluteAt = (x) => FLUTES[zone(x)];
const mix = (from, to, t) => from + (to - from) * t;
const hz = (note) => 440 * 2 ** ((note - 69) / 12);

export function scoreGarden(stones, family) {
  const active = stones.map((stone, i) => ({ ...stone, i })).filter(({ active }) => active);
  const anchor = active.find(({ i }) => i === 0) ?? active[0] ?? stones[0];
  const center = active.length ? active.reduce((sum, stone) => sum + stone.x, 0) / active.length : anchor.x;
  const chord = (HARMONIES[family] ?? HARMONIES[0])[zone(mix(anchor.x, center, .24))];
  const notes = stones.map(({ x }, i) => i < 2 ? chord.notes[i] : chord.notes[2 + (i + zone(x)) % 4]);
  const order = active.filter(({ i }) => i !== anchor.i).sort((a, b) => a.x - b.x || a.y - b.y).map(({ i }) => i);
  const spread = active.length > 1 ? active.reduce((sum, stone) => {
    const nearest = Math.min(...active.filter((other) => other !== stone).map((other) => Math.hypot(stone.x - other.x, stone.y - other.y)));
    return sum + nearest;
  }, 0) / active.length : .5;
  return { chord, notes, order, spacing: Math.min(1, spread * 3) };
}

export function createAmbientGarden(context, destination = context.destination) {
  const input = context.createGain();
  const drone = context.createGain();
  drone.connect(input);
  const volume = context.createGain();
  volume.gain.value = 0;
  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -10;
  limiter.knee.value = 8;
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
  let score;
  let nextFlute = context.currentTime + 8;
  let lastFlute = -Infinity;
  let fluteTurn = 0;
  let flutePhrase;
  let nextStoneNote = context.currentTime + 3.8;
  let stoneTurn = 0;
  let breathPhase = 0, lastUpdate = context.currentTime;

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
    const trim = context.createBiquadFilter();
    trim.type = 'highpass';
    trim.frequency.value = 145;
    const reverb = context.createConvolver();
    reverb.buffer = impulse;
    input.connect(send).connect(trim).connect(filter).connect(reverb).connect(lowCut);
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
    filter.connect(swell).connect(pan).connect(drone);
    body.start();
    octave.start();
    lfo.start();
    breath.start();
    return { body, octave, low, high, filter, breathDepth, pan };
  }

  function update(nextScene) {
    const previous = score;
    scene = nextScene;
    const now = context.currentTime;
    const { stones, branch, breathing, muted } = scene;
    score = scoreGarden(stones, scene.harmony);
    const elapsed = now - lastUpdate;
    lastUpdate = now;
    breathPhase = (breathPhase + elapsed / (10.8 + 1.4 * Math.sin(now / 17))) % 1;
    const rise = breathPhase < .35 ? breathPhase / .35 : (1 - breathPhase) / .65;
    const swell = Math.sin(Math.PI * .5 * rise) ** 2;
    drone.gain.setTargetAtTime(breathing ? mix(.21, 1.02, swell) : .80, now, .37);
    volume.gain.setTargetAtTime(muted ? 0 : .74, now, .17);
    const distance = branch.x ** 1.2;
    const wet = mix(.05, .78, distance);
    const roomSize = .08 + .70 * branch.x + .22 * (1 - branch.y);
    near.setTargetAtTime(wet * mix(.86, .10, roomSize), now, 1.15);
    far.setTargetAtTime(wet * mix(.06, .91, roomSize), now, 1.35);
    dry.gain.setTargetAtTime(mix(1, .69, wet), now, 1.2);

    for (const [i, stone] of stones.entries()) {
      const { body, octave, low, high, filter, breathDepth, pan } = voices[i];
      const register = 1 - stone.y;
      const movement = .5 + .5 * Math.sin(now * 2 * Math.PI / STONES[i].drift + i * 1.31);
      const level = stone.active ? STONES[i].gain * mix(.51, 1.22, movement) : 0;
      const freq = hz(score.notes[i]);
      if (!previous) {
        body.frequency.setValueAtTime(freq, now);
        octave.frequency.setValueAtTime(freq * 2, now);
      } else if (score.notes[i] !== previous.notes[i]) {
        body.frequency.setTargetAtTime(freq, now, .28);
        octave.frequency.setTargetAtTime(freq * 2, now, .28);
      }
      low.gain.setTargetAtTime(level * mix(1.47, .12, register), now, .30);
      high.gain.setTargetAtTime(level * mix(.02, 1.52, register ** 1.32), now, .42);
      filter.frequency.setTargetAtTime(170 + 2300 * stone.x ** 2 + 480 * register + 330 * movement, now, .28);
      pan.pan.setTargetAtTime((stone.x * 2 - 1) * .71, now, .25);
      breathDepth.gain.setTargetAtTime(breathing ? .035 : 0, now, .75);
    }
    if (now >= nextStoneNote) {
      const drift = .5 + .5 * Math.sin(++stoneTurn * 2.37);
      nextStoneNote = now + mix(4.3, 10.2, score.spacing) * mix(.84, 1.22, drift);
      if (!muted && score.order.length) {
        const index = score.order[stoneTurn % score.order.length];
        playStone(index, .43);
      }
    }
    if (now >= nextFlute) {
      nextFlute = now + 29 + 14 * (.5 + .5 * Math.sin(++fluteTurn * 2.4));
      if (branch.active && !muted) playFlute(false);
    }
    if (flutePhrase && !branch.active) flutePhrase.gain.setTargetAtTime(0, now, .28);
    return score;
  }

  function playFlute(direct = true) {
    if (!scene || scene.muted || !scene.branch.active) return;
    const now = context.currentTime;
    if (now - lastFlute < (direct ? 1.3 : 4)) return;
    lastFlute = now;
    if (direct) nextFlute = now + 34;
    const { x, y } = scene.branch;
    const flute = fluteAt(x);
    const notes = score.chord.notes.slice(2);
    const slot = Math.min(3, Math.floor((1 - y) * 4));
    if (flutePhrase) flutePhrase.gain.setTargetAtTime(0, now, .28);
    const phrase = context.createGain();
    flutePhrase = phrase;
    phrase.connect(input);
    let lastTone = fluteNote(hz(notes[slot] + 12) * flute.register, now, flute, x, direct ? .083 : .059, 5.8 + y * 1.2, phrase);
    if (!direct) {
      const offset = fluteTurn % 2 ? 1 : 3;
      const answer = (slot + offset) % notes.length;
      lastTone = fluteNote(hz(notes[answer] + 12) * flute.register, now + 8.7, flute, x, .044, 5.1 + (1 - y) * 1.4, phrase);
    }
    lastTone.addEventListener('ended', () => {
      phrase.disconnect();
      if (flutePhrase === phrase) flutePhrase = undefined;
    }, { once: true });
  }

  function fluteNote(freq, start, flute, x, level, length, phrase) {
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
    envelope.gain.linearRampToValueAtTime(level * .61, start + length * .44);
    envelope.gain.linearRampToValueAtTime(level * .83, start + length * .67);
    envelope.gain.setTargetAtTime(0, start + length - .9, .39);
    const pan = context.createStereoPanner();
    pan.pan.value = (x * 2 - 1) * .44;
    color.connect(envelope).connect(pan).connect(phrase);
    for (const source of [tone, air, vibrato]) {
      source.start(start);
      source.stop(start + length + 1);
    }
    return tone;
  }

  function playStone(index, strength = 1) {
    if (!scene || scene.muted) return;
    const stone = scene.stones[index];
    if (!stone?.active) return;
    const tone = context.createOscillator();
    const level = context.createGain();
    const pan = context.createStereoPanner();
    const color = context.createBiquadFilter();
    const now = context.currentTime;
    const octave = stone.y < .36 ? 24 : stone.y < .67 ? 12 : 0;
    tone.setPeriodicWave(wave(STONES[index].partials));
    tone.frequency.value = hz(score.notes[index] + octave);
    color.type = 'lowpass';
    color.frequency.value = 480 + 1700 * stone.x ** 1.4;
    pan.pan.value = (stone.x * 2 - 1) * .67;
    level.gain.value = 0;
    level.gain.setValueAtTime(0, now);
    level.gain.linearRampToValueAtTime(.105 * strength, now + .33);
    level.gain.setTargetAtTime(0, now + .42, 1.2);
    tone.connect(color).connect(level).connect(pan).connect(input);
    tone.start(now);
    tone.stop(now + 6);
  }

  return { update, playFlute, playStone, touch: playStone };
}
