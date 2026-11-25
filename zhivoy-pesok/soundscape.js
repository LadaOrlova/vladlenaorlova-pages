const LOOPS = ['harmony-home', 'harmony-open', 'flute', 'textures', 'leaf-pulse'];
const GESTURES = ['bowl-hit', 'stone-brush', 'flute-call'];
const clamp = (value) => Math.max(0, Math.min(1, value));

export function leafPulse(x, y) {
  return clamp(1 - Math.hypot(x - .52, y - .43) / .34);
}

export function stoneHarmony(firstX, secondX) {
  const distance = clamp(((firstX + secondX) / 2 - .43) / .25);
  return distance ** 2 * (3 - 2 * distance);
}

export async function createSoundscape(context) {
  const pieces = await Promise.all([...LOOPS, ...GESTURES].map(async (name) => {
    const url = new URL(`./audio/${name}.mp3`, import.meta.url);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Audio layer ${name}: ${response.status}`);
    return [name, await context.decodeAudioData(await response.arrayBuffer())];
  }));
  const sounds = new Map(pieces);

  // Preserve the balance and overall gain of the approved listening sketch.
  const volume = context.createGain();
  volume.gain.value = 0;
  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -6;
  limiter.knee.value = 5;
  limiter.ratio.value = 5;
  limiter.attack.value = .015;
  limiter.release.value = .38;
  volume.connect(limiter).connect(context.destination);
  const fluteNear = context.createBiquadFilter();
  fluteNear.type = 'lowpass';
  fluteNear.Q.value = .15;
  const flutePan = context.createStereoPanner();
  fluteNear.connect(flutePan).connect(volume);

  const sandNoise = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const grains = sandNoise.getChannelData(0);
  let friction = 0;
  for (let i = 0; i < grains.length; i++) {
    const grain = Math.random() * 2 - 1;
    friction += (Math.abs(grain) - friction) * .035;
    grains[i] = grain * friction ** 2;
  }
  const brush = context.createBufferSource();
  brush.buffer = sandNoise;
  brush.loop = true;
  const brushLow = context.createBiquadFilter();
  brushLow.type = 'highpass';
  brushLow.frequency.value = 320;
  const brushHigh = context.createBiquadFilter();
  brushHigh.type = 'lowpass';
  brushHigh.Q.value = .18;
  const brushPan = context.createStereoPanner();
  const brushGain = context.createGain();
  brushGain.gain.value = 0;
  brush.connect(brushLow).connect(brushHigh).connect(brushPan).connect(brushGain).connect(volume);
  brush.start();

  function sweep(side, speed) {
    if (!scene || scene.muted) return;
    const now = context.currentTime;
    const pressure = clamp(speed / 850);
    brushPan.pan.setTargetAtTime((side * 2 - 1) * .46, now, .065);
    brushHigh.frequency.setTargetAtTime(740 + pressure * 1750, now, .06);
    brushGain.gain.cancelScheduledValues(now);
    brushGain.gain.setTargetAtTime(Math.sqrt(pressure) * .55, now, .055);
    brushGain.gain.setTargetAtTime(0, now + .09, .1);
  }

  const loopLength = Math.min(...LOOPS.map((name) => sounds.get(name).duration));
  const start = context.currentTime + .05;
  const levels = new Map(LOOPS.map((name) => {
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = sounds.get(name);
    source.loop = true;
    source.loopEnd = loopLength;
    gain.gain.value = 0;
    source.connect(gain).connect(name === 'flute' ? fluteNear : volume);
    source.start(start);
    return [name, gain.gain];
  }));

  const played = new Map();
  let currentFlute;
  let scene;

  function update(settings) {
    scene = settings;
    const now = context.currentTime;
    volume.gain.setTargetAtTime(scene.muted ? 0 : 4.52, now, .32);
    levels.get('harmony-home').setTargetAtTime(1 - scene.harmony, now, .82);
    levels.get('harmony-open').setTargetAtTime(scene.harmony, now, .82);
    levels.get('textures').setTargetAtTime(1, now, .48);
    levels.get('leaf-pulse').setTargetAtTime(scene.pulse * .90, now, .45);
    const foreground = Math.max(0, 1 - scene.branchY * .55);
    const resting = currentFlute && now < currentFlute.bedReturnsAt ? .22 : 1;
    levels.get('flute').setTargetAtTime(scene.flute ? foreground * resting : 0, now, .55);
    fluteNear.frequency.setTargetAtTime(980 + 2400 * (1 - scene.branchY), now, .46);
    flutePan.pan.setTargetAtTime((scene.branchX * 2 - 1) * .30, now, .44);
    if (!scene.flute && currentFlute) {
      currentFlute.level.setTargetAtTime(0, now, .25);
    }
  }

  function play(name, side = .5, amount = 1) {
    if (!scene || scene.muted || (name === 'flute-call' && !scene.flute)) return;
    const now = context.currentTime;
    const gap = { 'bowl-hit': 2, 'stone-brush': .55, 'flute-call': 6 }[name];
    if (now - (played.get(name) ?? -Infinity) < gap) return;
    played.set(name, now);

    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = sounds.get(name);
    gain.gain.value = amount;
    if (name === 'flute-call') {
      if (currentFlute) currentFlute.level.setTargetAtTime(0, now, .42);
      const phrase = { level: gain.gain, bedReturnsAt: now + source.buffer.duration - 1.8 };
      currentFlute = phrase;
      source.connect(gain).connect(fluteNear);
      update(scene);
      source.addEventListener('ended', () => {
        if (currentFlute === phrase) {
          currentFlute = undefined;
          update(scene);
        }
      }, { once: true });
    } else {
      const pan = context.createStereoPanner();
      pan.pan.value = (side * 2 - 1) * .38;
      if (name === 'bowl-hit') {
        source.playbackRate.value = 1.18;
        const ring = context.createBiquadFilter();
        ring.type = 'highshelf';
        ring.frequency.value = 850;
        ring.gain.value = 4;
        gain.gain.value *= 1.6;
        source.connect(ring).connect(gain);
      } else {
        source.connect(gain);
      }
      gain.connect(pan).connect(volume);
    }
    source.start(now);
  }

  return { update, play, sweep };
}
