/* Rotary knob in the spirit of Live's device controls: drag up/down, arrows, double-click resets. */
window.Knob = function (opts) {
  'use strict';
  const min = opts.min, max = opts.max, log = !!opts.log;
  const fmt = opts.format || ((v) => String(Math.round(v * 100) / 100));
  const def = opts.def != null ? opts.def : opts.value;
  let value = opts.value;

  const toNorm = (v) => log ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min);
  const fromNorm = (n) => {
    n = Math.min(1, Math.max(0, n));
    let v = log ? min * Math.pow(max / min, n) : min + n * (max - min);
    if (opts.step) v = Math.round(v / opts.step) * opts.step;
    return Math.min(max, Math.max(min, v));
  };

  const ns = 'http://www.w3.org/2000/svg';
  const wrap = document.createElement('div');
  wrap.className = 'knob';
  wrap.tabIndex = 0;
  wrap.setAttribute('role', 'slider');
  wrap.setAttribute('aria-label', opts.name);
  wrap.setAttribute('aria-valuemin', String(min));
  wrap.setAttribute('aria-valuemax', String(max));
  if (opts.id) wrap.id = opts.id;

  const dial = document.createElement('div'); dial.className = 'knob-dial';
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 44 44');
  const bg = document.createElementNS(ns, 'path');
  bg.setAttribute('fill', 'none'); bg.setAttribute('stroke-width', '4'); bg.setAttribute('stroke-linecap', 'round');
  bg.style.stroke = 'var(--surface-3)';
  const fg = document.createElementNS(ns, 'path');
  fg.setAttribute('fill', 'none'); fg.setAttribute('stroke-width', '4'); fg.setAttribute('stroke-linecap', 'round');
  fg.style.stroke = opts.color || 'var(--dusk)';
  const ptr = document.createElementNS(ns, 'line');
  ptr.setAttribute('stroke-width', '2.2'); ptr.setAttribute('stroke-linecap', 'round');
  ptr.style.stroke = 'var(--fg)';
  svg.append(bg, fg, ptr); dial.append(svg);

  const name = document.createElement('div'); name.className = 'knob-name'; name.textContent = opts.name;
  const val = document.createElement('div'); val.className = 'knob-val';
  wrap.append(dial, name, val);

  const A0 = 135, SWEEP = 270, R = 17, C = 22;
  const pt = (deg) => { const r = (deg * Math.PI) / 180; return [C + R * Math.cos(r), C + R * Math.sin(r)]; };
  const arc = (a, b) => {
    const [x1, y1] = pt(a), [x2, y2] = pt(b);
    const large = b - a > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  bg.setAttribute('d', arc(A0, A0 + SWEEP));

  function draw() {
    const n = toNorm(value);
    const a = A0 + SWEEP * n;
    fg.setAttribute('d', n > 0.004 ? arc(A0, a) : '');
    const r = (a * Math.PI) / 180;
    ptr.setAttribute('x1', String(C + 6 * Math.cos(r))); ptr.setAttribute('y1', String(C + 6 * Math.sin(r)));
    ptr.setAttribute('x2', String(C + 15 * Math.cos(r))); ptr.setAttribute('y2', String(C + 15 * Math.sin(r)));
    val.textContent = fmt(value);
    wrap.setAttribute('aria-valuenow', String(value));
    wrap.setAttribute('aria-valuetext', fmt(value));
  }
  function set(v, silent) {
    value = Math.min(max, Math.max(min, v));
    draw();
    if (!silent && opts.onInput) opts.onInput(value);
  }

  let startY = 0, startN = 0, dragging = false;
  dial.addEventListener('pointerdown', (e) => {
    dragging = true; startY = e.clientY; startN = toNorm(value);
    dial.setPointerCapture(e.pointerId); e.preventDefault(); wrap.focus();
  });
  dial.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const k = e.shiftKey ? 600 : 160;
    set(fromNorm(startN + (startY - e.clientY) / k));
  });
  const end = () => { dragging = false; };
  dial.addEventListener('pointerup', end);
  dial.addEventListener('pointercancel', end);
  dial.addEventListener('dblclick', () => set(def));
  wrap.addEventListener('keydown', (e) => {
    const n = toNorm(value);
    let d = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') d = 0.02;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') d = -0.02;
    else if (e.key === 'PageUp') d = 0.1;
    else if (e.key === 'PageDown') d = -0.1;
    else if (e.key === 'Home') { set(min); e.preventDefault(); return; }
    else if (e.key === 'End') { set(max); e.preventDefault(); return; }
    else return;
    e.preventDefault();
    set(fromNorm(n + d));
  });

  draw();
  return { el: wrap, set, get: () => value };
};
