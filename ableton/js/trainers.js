/* Interactive trainers. Each trainer mounts into a container and returns a cleanup function. */
window.h = function (tag, props) {
  const n = document.createElement(tag);
  if (props) {
    for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'style') n.style.cssText = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
  }
  const add = (c) => {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(add);
    else n.append(c.nodeType ? c : document.createTextNode(String(c)));
  };
  for (let i = 2; i < arguments.length; i++) add(arguments[i]);
  return n;
};

window.Trainers = (function () {
  'use strict';
  const h = window.h;
  const V = Snd.V;
  const NOTE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const NOTE_RU = ['до', 'до-диез', 'ре', 'ре-диез', 'ми', 'фа', 'фа-диез', 'соль', 'соль-диез', 'ля', 'ля-диез', 'си'];
  const ICON_PLAY = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5l9.5 5.5L3 12.5z"/></svg>';
  const ICON_STOP = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="2.5" width="9" height="9"/></svg>';

  const list = [
    { id: 'groove', title: 'Грув', color: 'var(--dusk)', skill: 'ритм', desc: 'Драм-машина в браузере: такт из 16 клеток, в каждой строке свой барабан. Ставь удары, делай их громче или тише, задавай вероятность и раскачивай свингом. Внутри готовые биты жанров из вкладки «ритмы».' },
    { id: 'motif', title: 'Мотив', color: 'var(--ink-2)', skill: 'мелодия', desc: 'Короткая мелодия из 3–4 нот лада, то есть набора нот, которые звучат вместе без фальши. Сделай её длиной 5 или 7 шагов поверх такта из 16: каждый круг она начнётся в новом месте такта и совпадёт с бочкой только через 5 или 7 тактов, поэтому повтор не приедается.' },
    { id: 'chords', title: 'Аккорды', color: 'var(--sodium)', skill: 'гармония', desc: 'Аккорд — это несколько нот, взятых вместе. Послушай мягкие минорные аккорды из 4–5 нот, короткий дабовый аккорд с эхом и цепочки аккордов в одном ладу. Плюс игра: угадай аккорд на слух.' },
    { id: 'synth', title: 'Синтезатор', color: 'var(--c4)', skill: 'саунд-дизайн', desc: 'Как из простой волны получается пэд, бас или плак: источник звука (осциллятор), фильтр, форма громкости (огибающая) и медленное покачивание (LFO). Играй буквами клавиатуры, как в Live, и повторяй звуки на слух.' },
    { id: 'eq', title: 'Слух: частоты', color: 'var(--c5)', skill: 'сведение', desc: 'Эквалайзер делает громче отдельные частоты: низ, середину или верх. Здесь он поднимает одну полосу, а ты угадываешь какую. Так ухо учится слышать, где гудит, а где звенит.' },
    { id: 'fx', title: 'Слух: эффекты', color: 'var(--c8)', skill: 'сведение', desc: 'Узнай эффект по звуку: ревер (зал), дилей (эхо), фильтр (срезан верх или низ), сатурация (тёплый перегруз), сайдчейн (качание от бочки), хорус (ширина и плавание).' },
    { id: 'keys', title: 'Горячие клавиши', color: 'var(--c7)', skill: 'скорость', desc: 'Карточки с сочетаниями клавиш Live на Mac: видишь действие, вспоминаешь клавиши и проверяешь себя.' },
    { id: 'ui', title: 'Названия интерфейса', color: 'var(--c0)', skill: 'интерфейс', desc: 'Найди на схеме Live нужную панель или кнопку по названию. Тренажёр открывается во вкладке «Интерфейс».', href: '#map.quiz' }
  ];

  // ---------- shared bits ----------
  const isTyping = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
  function report(id, data) { if (window.Progress) window.Progress.trainer(id, data); }
  function playBtn(onToggle, label) {
    const b = h('button', { class: 'play', type: 'button', 'aria-pressed': 'false', 'aria-label': label || 'Играть / стоп (пробел)', title: 'Играть / стоп (пробел)', html: ICON_PLAY });
    b.addEventListener('click', () => onToggle());
    b.setState = (on) => { b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.innerHTML = on ? ICON_STOP : ICON_PLAY; };
    return b;
  }
  function seg(options, value, onChange, label) {
    const wrap = h('div', { class: 'seg', role: 'group', 'aria-label': label || '' });
    const btns = options.map(([val, text]) => {
      const b = h('button', { type: 'button', 'aria-pressed': String(val === value) }, text);
      b.addEventListener('click', () => { btns.forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); onChange(val); });
      return b;
    });
    btns.forEach((b) => wrap.append(b));
    wrap.set = (val) => options.forEach(([v], i) => btns[i].setAttribute('aria-pressed', String(v === val)));
    return wrap;
  }
  function select(id, options, value, onChange) {
    const s = h('select', { id });
    options.forEach(([v, t]) => s.append(h('option', { value: v, selected: v === value ? true : null }, t)));
    s.addEventListener('change', () => onChange(s.value));
    return s;
  }
  function numberField(id, label, value, min, max, onChange) {
    const i = h('input', { id, type: 'number', min: String(min), max: String(max), value: String(value) });
    i.addEventListener('change', () => { const v = Math.min(max, Math.max(min, Number(i.value) || value)); i.value = String(v); onChange(v); });
    return h('label', { class: 'field', for: id }, label, i);
  }
  function spaceToggle(fn) {
    const k = (e) => { if (e.code === 'Space' && !isTyping(e.target) && !e.metaKey && !e.ctrlKey) { e.preventDefault(); fn(); } };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }
  function whereInLive(html) {
    return h('aside', { class: 'callout' }, h('span', { class: 'label' }, 'Как это в Ableton'), h('div', { class: 'prose', html }));
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // =====================================================================
  // Drum voices, genre grooves and rhythm words — shared by the drum machine and the rhythm atlas
  // =====================================================================
  const DRUM_ROWS = [
    { id: 'kick', name: 'Kick', ru: 'бочка', play: (t, v) => V.kick(t, v) },
    { id: 'clap', name: 'Clap', ru: 'хлопок', play: (t, v) => V.clap(t, v) },
    { id: 'rim', name: 'Rim', ru: 'римшот', play: (t, v) => V.rim(t, v) },
    { id: 'hat', name: 'Closed Hat', ru: 'закрытый хэт', play: (t, v) => V.hat(t, v) },
    { id: 'ohat', name: 'Open Hat', ru: 'открытый хэт', play: (t, v) => V.ohat(t, v) },
    { id: 'shaker', name: 'Shaker', ru: 'шейкер', play: (t, v) => V.shaker(t, v) },
    { id: 'perc', name: 'Hand Drum', ru: 'ручной барабан', play: (t, v, s) => V.perc(t, v, null, s % 8 >= 4 ? 262 : 196) }
  ];
  const VEL = { 1: 0.72, 2: 1, 3: 0.34 };
  // x = обычный удар, X = акцент, g = тихий «призрак», ? = с вероятностью 50 %
  const parsePattern = (str) => Array.from({ length: 16 }, (_, i) => {
    const ch = (str || '')[i] || '.';
    if (ch === 'x') return { v: 1, p: 100 };
    if (ch === 'X') return { v: 2, p: 100 };
    if (ch === 'g') return { v: 3, p: 100 };
    if (ch === '?') return { v: 1, p: 50 };
    return null;
  });

  const GROOVES = {
    organic: { name: 'Органик-хаус · 118', bpm: 118, swing: 0.2, rumble: false,
      title: 'Органик-хаус', range: '110–125', where: 'Geju, chillrave из сета reeto',
      traits: ['Slow house обычно играют на 110–115, клубный organic house около 122–125; пример на 118, у верхнего края нашей зоны', 'Бочка на каждой доле, но мягкая и негромкая', 'Закрытый хэт между бочками — офф-бит', 'Шейкер и ручные барабаны со свингом 15–25 % звучат как живая игра'],
      rows: { kick: 'x...x...x...x...', clap: '....g.......x...', rim: '.......?......x.', hat: '..x...x...x...x.', shaker: 'XgxgXgxgXgxgXgxg', perc: '...x..x....x..x?' } },
    downtempo: { name: 'Даунтемпо · 100', bpm: 100, swing: 0.3, rumble: false,
      title: 'Даунтемпо', range: '80–105', where: 'ISHOME «carpet watcher», миксы Delayed «Sundays are for…»',
      traits: ['Хлопок один раз за такт, на 3-й доле: темп ощущается вдвое медленнее', 'Бочка редкая, не на каждой доле', 'Хэты с призраками и заметным свингом'],
      rows: { kick: 'x.........x.....', clap: '........x.......', rim: '...?........g...', hat: 'xgx.xgx.xgx.xgx.', ohat: '..............x.', perc: '.....x.x.....x..' } },
    garage: { name: 'Гаражный шаффл · 108', bpm: 108, swing: 0.45, rumble: false,
      title: 'Гаражный шаффл, 2-step', range: '100–112', where: 'ISHOME, альбом «Confession» («Adam», «Tetra 94»); Burial «Untrue»',
      traits: ['Бочка перешагивает доли: удар на 1 и запоздалый около 3-й', 'Сильный свинг на шестнадцатых хэта', 'Хлопок на 2-й и 4-й доле'],
      rows: { kick: 'x.........x.....', clap: '....x.......x...', rim: '...........g..?.', hat: 'xgxgxgxgxgxgxgxg', ohat: '......?.........', perc: '.......x.....x..' } },
    chillrave: { name: 'Chillrave · 110', bpm: 110, swing: 0.25, rumble: false,
      title: 'Chillrave', range: '95–118', where: 'Geju, Ali Dada, feinheitsbrei — сет reeto',
      traits: ['Медленный «рейв»: прямая бочка, а энергию даёт плотная перкуссия, темп при этом невысокий', 'Этнические ручные барабаны и шейкеры, часто сыгранные вживую', 'Римшот перекликается с барабанами'],
      rows: { kick: 'x...x...x...x...', rim: '..x..x....x..x..', hat: '..x...x...x...x.', shaker: 'gxggxgxggxggxgxg', perc: 'x..x..x.x..x..x.' } },
    dub: { name: 'Даб-техно · 112', bpm: 112, swing: 0.05, rumble: true,
      title: 'Даб-техно', range: '100–125', where: 'Lowtec «Workshop 06» (112), DeepChord, Andy Stott (медленнее 100)',
      traits: ['Классика жанра бывает и 120–130, а в нашей зоне её замедляют до 100–112', 'Прямая бочка, под ней низкий гул (rumble)', 'Ритм почти голый: главное — аккорды с эхом поверх', 'Перкуссия редкая и тихая, остальное делает эхо'],
      rows: { kick: 'x...x...x...x...', rim: '.......?.......?', hat: '..g...g...g...g.', shaker: 'gggggggggggggggg' } },
    broken: { name: 'Ломаный · 112', bpm: 112, swing: 0.12, rumble: false,
      title: 'Ломаный бит, IDM', range: '100–118', where: 'Discka на TESTFM, Volodymyr Gnatenko',
      traits: ['Бочка не стоит на сетке четвертей', 'Много тихих перкуссионных деталей', 'Ритм спотыкается, но остаётся спокойным'],
      rows: { kick: 'x.....x...x.....', clap: '....x.......x...', rim: '..g....x..g.....', hat: '..x...x...x...x.', shaker: 'gxggXggxgxggXggx', perc: '...x....x.?.....' } },
    ritual: { name: 'Ритуальная перкуссия · 110', bpm: 110, swing: 0.25, rumble: false,
      title: 'Ритуальная перкуссия', range: '100–115', where: 'ритуальный тон сетов из Mutabor: Abelle & Dasha Mamba, Ugetsu Monogatari',
      traits: ['Бочка редкая, ведут ручные барабаны', 'Тресильо 3+3+2 в барабанах', 'Шейкер с акцентами качает весь такт'],
      rows: { kick: 'x.......x.......', rim: '..x....x..x...?.', shaker: 'gxggXgxggxggXgxg', perc: 'x..x..x...x..x..' } },
    ambient: { name: 'Эмбиент без бочки · 90', bpm: 90, swing: 0.1, rumble: false,
      title: 'Эмбиент без бочки', range: '60–100', where: 'миксы Delayed «Sundays are for…», Biosphere',
      traits: ['Бочки нет совсем, пульс едва угадывается', 'Редкие тихие удары с вероятностью', 'Главное — пэды, дроны и полевые записи'],
      rows: { rim: '..........?.....', shaker: 'g...g...g.?.g...', perc: '?.......?.......' } },
    cosmic: { name: 'Медленный транс · 106', bpm: 106, swing: 0, rumble: false,
      title: 'Медленный транс, cosmic', range: '95–112', where: 'Joseph Tagliabue, Phase Group Mix',
      traits: ['Ровная бочка и открытый хэт на офф-битах: пульс как в трансе, только медленно', 'Поверх — пульсирующие арпеджио и длинные пэды', 'Свинга нет: шаги идут ровно, как у машины'],
      rows: { kick: 'x...x...x...x...', hat: 'g.g.g.g.g.g.g.g.', ohat: '..x...x...x...x.', perc: '..........x.....' } },
    hypno: { name: 'Гипнотический луп · 116', bpm: 116, swing: 0.05, rumble: true,
      rows: { kick: 'x...x...x...x...', rim: 'x..x..x..x..x..x', hat: '..x...x...x...x.', ohat: '..........?.....', shaker: 'gggXgggXgggXgggX' } },
    empty: { name: 'Пустой паттерн', bpm: 118, swing: 0, rumble: false, rows: {} }
  };

  const TERMS = [
    { id: 't-four', title: 'Four-on-the-floor', ru: 'прямая бочка', bpm: 118, swing: 0, text: 'Бочка на каждой из четырёх долей такта: шаги 1, 5, 9, 13. Основа хауса и техно.', rows: { kick: 'x...x...x...x...' } },
    { id: 't-offbeat', title: 'Офф-бит', ru: 'offbeat', bpm: 118, swing: 0, text: 'Удар ровно между долями. Закрытый хэт на офф-битах даёт знакомое «тц» между бочками.', rows: { kick: 'x...x...x...x...', hat: '..x...x...x...x.' } },
    { id: 't-backbeat', title: 'Бэкбит', ru: 'backbeat', bpm: 110, swing: 0, text: 'Хлопок или малый барабан на 2-й и 4-й доле. Он отвечает бочке через долю, и ритм идёт, как шаги: левой, правой.', rows: { kick: 'x...x...x...x...', clap: '....x.......x...' } },
    { id: 't-ghost', title: 'Ghost notes', ru: 'призраки', bpm: 110, swing: 0.15, text: 'Очень тихие удары между громкими. Отдельно их почти не слышно, но без них ритм звучит механически.', rows: { kick: 'x...x...x...x...', shaker: 'XgggXgggXgggXggg' } },
    { id: 't-swing', title: 'Свинг, шаффл', ru: 'swing', bpm: 108, swing: 0.45, text: 'Каждая вторая шестнадцатая чуть опаздывает, и ритм начинает качаться. В драм-машине сравни Swing 0 % и 45 %.', rows: { kick: 'x...x...x...x...', hat: 'xxxxxxxxxxxxxxxx' } },
    { id: 't-sync', title: 'Синкопа', ru: 'syncopation', bpm: 110, swing: 0.1, text: 'Акцент там, где его не ждёшь: между долями. Ритм начинает тянуть вперёд.', rows: { kick: 'x.....x...x.....', hat: '..x...x...x...x.' } },
    { id: 't-halftime', title: 'Половинный темп', ru: 'half-time', bpm: 100, swing: 0.2, text: 'Хлопок один раз за такт, на 3-й доле. Темп тот же, а ощущается вдвое медленнее.', rows: { kick: 'x.........x.....', clap: '........x.......', hat: 'x.x.x.x.x.x.x.x.' } },
    { id: 't-twostep', title: '2-step', ru: 'ту-степ', bpm: 108, swing: 0.45, text: 'Бочка перешагивает доли: на 1 и чуть позже 3-й. Основа UK garage, у нас в медленном темпе.', rows: { kick: 'x.........x.....', clap: '....x.......x...', hat: 'xgxgxgxgxgxgxgxg' } },
    { id: 't-broken', title: 'Ломаный бит', ru: 'broken beat', bpm: 112, swing: 0.12, text: 'Бочка и перкуссия не совпадают с сеткой четвертей и друг с другом, но всё держится вместе.', rows: { kick: 'x.....x...x.....', perc: '...x....x.?.....', clap: '....x.......x...' } },
    { id: 't-tresillo', title: 'Тресильо 3+3+2', ru: 'tresillo', bpm: 110, swing: 0.15, text: 'Восемь шестнадцатых делятся на группы 3+3+2. Фигура пришла из афро-кубинской музыки и встречается во многих жанрах.', rows: { perc: 'x..x..x.x..x..x.', kick: 'x.......x.......' } },
    { id: 't-poly', title: 'Полиритм', ru: 'polyrhythm', bpm: 116, swing: 0, text: 'Узор из трёх шагов поверх такта из четырёх долей. Римшот то совпадает с бочкой, то попадает между её ударами, и ритм всё время смещается.', rows: { kick: 'x...x...x...x...', rim: 'x..x..x..x..x..x' } }
  ];

  // One shared preview clock for the atlas: starting a new pattern stops the previous one.
  let previewClock = null, previewDone = null;
  function stopPreview() {
    if (previewClock) { previewClock.stop(); previewClock = null; }
    if (previewDone) { const f = previewDone; previewDone = null; f(); }
  }
  function previewPattern(p, onUI, onStop) {
    stopPreview();
    const cells = {}; DRUM_ROWS.forEach((r) => { cells[r.id] = parsePattern((p.rows || {})[r.id]); });
    previewClock = Snd.Clock({
      bpm: p.bpm, swing: p.swing || 0,
      onStep(step, t, sd) {
        const s = step % 16;
        DRUM_ROWS.forEach((r) => {
          const c = cells[r.id][s];
          if (c && Math.random() * 100 < c.p) { r.play(t, VEL[c.v], s); if (r.id === 'kick' && p.rumble) V.rumble(t, VEL[c.v], null, sd); }
        });
      },
      onUI
    });
    previewDone = onStop || null;
    previewClock.start();
    Snd.onStop(stopPreview);
  }

  // =====================================================================
  // GROOVE — 16-step drum machine with velocity, chance and swing
  // =====================================================================
  function groove(root, arg) {
    const ROWS = DRUM_ROWS;
    const PRESETS = GROOVES;
    const st = { bpm: 118, swing: 0.2, rumble: false, mode: 'notes', cells: {} };
    const parse = parsePattern;
    const startKey = arg && GROOVES[arg] ? arg : 'organic';
    function load(key) {
      const p = PRESETS[key];
      st.bpm = p.bpm; st.swing = p.swing; st.rumble = p.rumble;
      ROWS.forEach((r) => { st.cells[r.id] = parse(p.rows[r.id]); });
      clock.bpm = st.bpm; clock.swing = st.swing;
      bpmInput.value = String(st.bpm); swingKnob.set(st.swing * 100, true); rumbleBox.checked = st.rumble;
      drawAll();
    }

    const clock = Snd.Clock({
      bpm: st.bpm, swing: st.swing,
      onStep(step, t, sd) {
        const s = step % 16;
        ROWS.forEach((r) => {
          const c = st.cells[r.id][s];
          if (c && Math.random() * 100 < c.p) {
            r.play(t, VEL[c.v], s);
            if (r.id === 'kick' && st.rumble) V.rumble(t, VEL[c.v], null, sd);
          }
        });
      },
      onUI(s) {
        cols.forEach((col) => col.forEach((b) => b.classList.remove('now')));
        if (s >= 0) cols[s % 16].forEach((b) => b.classList.add('now'));
      }
    });
    function toggle() { if (clock.running) clock.stop(); else clock.start(); pb.setState(clock.running); }

    // UI
    const pb = playBtn(toggle);
    const bpmField = numberField('g-bpm', 'Tempo', st.bpm, 60, 150, (v) => { st.bpm = v; clock.bpm = v; });
    const bpmInput = bpmField.querySelector('input');
    const swingKnob = Knob({ name: 'Swing', min: 0, max: 100, value: st.swing * 100, step: 1, format: (v) => Math.round(v) + '%', onInput: (v) => { st.swing = v / 100; clock.swing = st.swing; } });
    const rumbleBox = h('input', { type: 'checkbox', id: 'g-rumble' });
    rumbleBox.addEventListener('change', () => { st.rumble = rumbleBox.checked; });
    const presetSel = select('g-preset', Object.keys(PRESETS).map((k) => [k, PRESETS[k].name]), startKey, (v) => load(v));
    const modeSeg = seg([['notes', 'Ноты'], ['vel', 'Velocity'], ['prob', 'Chance']], 'notes', (v) => { st.mode = v; hint.textContent = HINTS[v]; }, 'Что меняет клик');
    const HINTS = {
      notes: 'Клик ставит или убирает удар.',
      vel: 'Клик по удару меняет силу: обычный → акцент (точка) → тихий «призрак» (бледный).',
      prob: 'Клик по удару меняет вероятность: 100 → 75 → 50 → 25 %. Каждый такт звучит немного иначе.'
    };
    const hint = h('span', { class: 'keys-help' }, HINTS.notes);

    const cols = Array.from({ length: 16 }, () => []);
    const grid = h('div', { class: 'seq', style: '--n:16' });
    const ruler = h('div', { class: 'seq-row ruler' }, h('div', { class: 'seq-name' }), Array.from({ length: 16 }, (_, i) => h('div', { class: 'rc' }, i % 4 === 0 ? String(i / 4 + 1) : '·')));
    grid.append(ruler);
    const btnMap = {};
    ROWS.forEach((r) => {
      const row = h('div', { class: 'seq-row' });
      row.append(h('div', { class: 'seq-name', title: r.ru }, r.name));
      btnMap[r.id] = [];
      for (let i = 0; i < 16; i++) {
        const b = h('button', { type: 'button', class: 'cell' + (i % 4 === 0 ? ' beat' : '') });
        b.addEventListener('click', () => clickCell(r, i));
        btnMap[r.id].push(b); cols[i].push(b); row.append(b);
      }
      grid.append(row);
    });
    function clickCell(r, i) {
      const arr = st.cells[r.id]; const c = arr[i];
      if (st.mode === 'notes') arr[i] = c ? null : { v: 1, p: 100 };
      else if (st.mode === 'vel') arr[i] = c ? { v: c.v === 1 ? 2 : c.v === 2 ? 3 : 1, p: c.p } : { v: 1, p: 100 };
      else arr[i] = c ? { v: c.v, p: c.p === 100 ? 75 : c.p === 75 ? 50 : c.p === 50 ? 25 : 100 } : { v: 1, p: 100 };
      if (!clock.running) { Snd.ensure(); const c2 = arr[i]; if (c2) r.play(Snd.ctx.currentTime + 0.01, VEL[c2.v], i); }
      drawCell(r, i);
    }
    function drawCell(r, i) {
      const b = btnMap[r.id][i]; const c = st.cells[r.id][i];
      b.classList.toggle('on', !!c);
      b.classList.toggle('acc', !!c && c.v === 2);
      b.classList.toggle('soft', !!c && c.v === 3);
      b.classList.toggle('prob', !!c && c.p < 100);
      if (c && c.p < 100) b.setAttribute('data-p', String(c.p)); else b.removeAttribute('data-p');
      const vel = c ? (c.v === 2 ? 'акцент' : c.v === 3 ? 'тихо' : 'обычно') : '';
      b.setAttribute('aria-label', `${r.name}, шаг ${i + 1}` + (c ? `, ${vel}` + (c.p < 100 ? `, ${c.p}%` : '') : ', пусто'));
      b.setAttribute('aria-pressed', c ? 'true' : 'false');
    }
    function drawAll() { ROWS.forEach((r) => { for (let i = 0; i < 16; i++) drawCell(r, i); }); }

    // challenges
    const on = (id) => st.cells[id].map((c, i) => (c ? i : -1)).filter((i) => i >= 0);
    const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
    const CH = [
      { t: 'Ровная бочка', d: 'Поставь бочку ровно на каждую долю — шаги 1, 5, 9 и 13 (это «four-on-the-floor», основа техно и хауса).',
        check: () => same(on('kick'), [0, 4, 8, 12]) ? [true, 'Есть ровная бочка. На ней стоят хаус, органик и chillrave, а даунтемпо и гаражный шаффл её как раз ломают.'] : [false, 'Бочка нужна на шагах 1, 5, 9, 13 и больше нигде.'] },
      { t: 'Хэт на офф-битах', d: 'Офф-бит значит удар ровно посередине между долями. Поставь закрытый хэт (Closed Hat) между ударами бочки: шаги 3, 7, 11, 15. На шагах с бочкой хэта быть не должно.',
        check: () => { const hh = on('hat'); const ok = [2, 6, 10, 14].every((i) => hh.includes(i)) && ![0, 4, 8, 12].some((i) => hh.includes(i)); return ok ? [true, 'Слышишь «тц» между бочками? Так звучит офф-бит в хаусе.'] : [false, 'Нужны хэты на 3, 7, 11, 15 и ни одного на 1, 5, 9, 13.']; } },
      { t: 'Живой шейкер', d: 'Шейкер на всех 16 шагах, но не одинаковый: минимум 4 удара сделай тихими «призраками» в режиме Velocity.',
        check: () => { const s = st.cells.shaker; const all = s.every(Boolean); const ghosts = s.filter((c) => c && c.v === 3).length; return all && ghosts >= 4 ? [true, 'Громкие и тихие удары чередуются, и шейкер звучит как рука перкуссиониста, без механического тиканья.'] : [false, all ? `Тихих ударов пока ${ghosts}, нужно хотя бы 4.` : 'Заполни шейкером все 16 шагов.']; } },
      { t: 'Узор через три', d: 'Римшот на каждом третьем шаге: 1, 4, 7, 10, 13, 16. Узор из трёх шагов идёт поперёк такта из четырёх долей: римшот то совпадает с бочкой, то попадает между её ударами.',
        check: () => same(on('rim'), [0, 3, 6, 9, 12, 15]) ? [true, 'Слышишь, как римшот «плывёт» относительно бочки? Это полиритм.'] : [false, 'Римшот нужен ровно на 1, 4, 7, 10, 13, 16.'] },
      { t: 'Немного случайности', d: 'Сделай хотя бы три удара на хэте, римшоте или ручном барабане с вероятностью меньше 100% (режим Chance).',
        check: () => { const n = ['hat', 'rim', 'perc', 'ohat'].reduce((a, id) => a + st.cells[id].filter((c) => c && c.p < 100).length, 0); return n >= 3 ? [true, 'Теперь каждый такт чуть-чуть другой. В Live это делает Chance в редакторе нот.'] : [false, `Пока таких ударов ${n}, нужно хотя бы 3.`]; } },
      { t: 'Покачивание', d: 'Поставь темп от 100 до 118 BPM и Swing от 15% до 40%. Сравни на слух со свингом 0%: в какой момент ритм начинает качаться?',
        check: () => (st.bpm >= 100 && st.bpm <= 118 && st.swing >= 0.15 && st.swing <= 0.4) ? [true, 'Свинг сдвигает каждую вторую шестнадцатую — ритм начинает качаться.'] : [false, `Сейчас темп ${st.bpm} и свинг ${Math.round(st.swing * 100)}%.`] },
      { t: 'Половинный темп', d: 'Даунтемпо-ощущение: темп не выше 104, хлопок только на шаге 9, бочка на шаге 1 и ещё где-нибудь, но не на 5 и 13.',
        check: () => { const k = on('kick'); const ok = st.bpm <= 104 && same(on('clap'), [8]) && k.includes(0) && !k.includes(4) && !k.includes(12); return ok ? [true, 'Хлопок только на третьей доле, и тот же темп ощущается вдвое медленнее.'] : [false, 'Проверь: темп ≤ 104, хлопок только на 9, бочка на 1 и не на 5 и 13.']; } },
      { t: 'Синкопа', d: 'Сломай прямую бочку: удар на шаге 1 и хотя бы один удар мимо долей (не на 5, 9 или 13), а все четыре доли подряд не ставь. Темп от 100 до 118. Так качает гаражный шаффл.',
        check: () => { const k = on('kick'); const off = k.some((i) => i % 4 !== 0); const four = [0, 4, 8, 12].every((i) => k.includes(i)); const ok = k.includes(0) && off && !four && st.bpm >= 100 && st.bpm <= 118; return ok ? [true, 'Бочка мимо доли тянет грув вперёд, и медленный темп начинает качать.'] : [false, `Проверь: бочка на 1, хотя бы один удар между долями, не все четыре доли, темп 100–118 (сейчас ${st.bpm}).`]; } },
      { t: 'Перекличка', d: 'Ручной барабан и римшот отвечают друг другу: у каждого минимум три удара, и ни разу не на одном шаге.',
        check: () => { const a = on('perc'), b = on('rim'); const clash = a.filter((i) => b.includes(i)); return a.length >= 3 && b.length >= 3 && !clash.length ? [true, 'Барабан и римшот звучат по очереди, будто отвечают друг другу.'] : [false, clash.length ? `Совпадают шаги: ${clash.map((i) => i + 1).join(', ')}.` : 'Нужно хотя бы по три удара у ручного барабана и римшота.']; } }
    ];
    let chIdx = Math.min(Number(arg) || 0, CH.length - 1);
    const chTitle = h('div', { class: 'task-t' }); const chText = h('div'); const chRes = h('div', { class: 'result', role: 'status' });
    const chSel = select('g-ch', CH.map((c, i) => [String(i), `${i + 1}. ${c.t}`]), String(chIdx), (v) => { chIdx = Number(v); drawCh(); });
    function drawCh() { chTitle.textContent = CH[chIdx].t; chText.textContent = CH[chIdx].d; chRes.textContent = ''; chRes.className = 'result'; }
    const checkBtn = h('button', { class: 'btn primary sm', type: 'button' }, 'Проверить');
    checkBtn.addEventListener('click', () => {
      const [ok, msg] = CH[chIdx].check();
      chRes.textContent = (ok ? 'Готово. ' : 'Пока нет. ') + msg; chRes.className = 'result ' + (ok ? 'ok' : 'bad');
      if (ok) report('groove', { solved: 'c' + chIdx });
    });
    drawCh();

    const clearBtn = h('button', { class: 'btn sm ghost', type: 'button' }, 'Очистить');
    clearBtn.addEventListener('click', () => { ROWS.forEach((r) => { st.cells[r.id] = Array(16).fill(null); }); drawAll(); });

    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' },
          h('div', { class: 'transport' }, pb, bpmField, h('label', { class: 'field', for: 'g-preset' }, 'Паттерн', presetSel), clearBtn),
          h('div', { class: 'transport' }, swingKnob.el, h('label', { class: 'field', for: 'g-rumble' }, rumbleBox, 'Rumble под бочкой'))),
        h('div', { class: 'panel-b' },
          h('div', { class: 'btn-row', style: 'margin-bottom:10px' }, modeSeg, hint),
          h('div', { class: 'seq-wrap' }, grid))),
      h('div', { class: 'task' }, h('div', { class: 'btn-row' }, h('span', { class: 'label' }, 'Задание'), chSel), chTitle, chText, h('div', { class: 'btn-row' }, checkBtn), chRes),
      whereInLive('<p>Каждая строка здесь — это пэд в <b>Drum Rack</b>, а сетка — <b>MIDI-клип</b> длиной в один такт. Сила удара — это <b>Velocity</b> (нижняя панель редактора нот), вероятность — <b>Chance</b>. Свинг в Live задаётся в <b>Groove Pool</b>: перетащи грув из браузера (Grooves → Swing) на клип и покрути его <b>Timing</b> или общий <b>Global Amount</b>. «Rumble» — низкий гул из ревера бочки, который проседает на каждом её ударе (это делает сайдчейн). Рецепт есть во вкладке «звук» → «Рецепты».</p><p>Биты всех твоих жанров с подписями и примерами — во вкладке <a href="#beats">ритмы</a>.</p>')
    );
    load(startKey);
    const offSpace = spaceToggle(toggle);
    return () => { offSpace(); clock.stop(); };
  }

  // =====================================================================
  // MOTIF — scale motif lab with polymeter and development tools
  // =====================================================================
  const MODES = {
    aeolian: { name: 'Aeolian · натуральный минор', iv: [0, 2, 3, 5, 7, 8, 10], ch: -1, mood: 'Самый привычный минор: ночное настроение, лёгкая грусть. С него удобно начинать.' },
    dorian: { name: 'Dorian · дорийский', iv: [0, 2, 3, 5, 7, 9, 10], ch: 5, mood: 'Минор со светлой шестой ступенью. Грусть без тяжести, тёплая «воскресная» краска.' },
    phrygian: { name: 'Phrygian · фригийский', iv: [0, 1, 3, 5, 7, 8, 10], ch: 1, mood: 'Тёмный и напряжённый: низкая вторая ступень даёт восточный, гипнотический оттенок.' },
    minpent: { name: 'Minor Pentatonic · минорная пентатоника', iv: [0, 3, 5, 7, 10], ch: -1, mood: 'Пять нот, и между соседними нет полутонов. Почти любые две ноты звучат вместе без фальши, поэтому с пентатоники удобно начинать первые мотивы.' },
    lydian: { name: 'Lydian · лидийский', iv: [0, 2, 4, 6, 7, 9, 11], ch: 3, mood: 'Мажор с поднятой четвёртой ступенью: светлая, сказочная краска.' }
  };

  function motif(root, arg) {
    const st = {
      key: 2, mode: 'dorian', len: 7, bpm: 118, drums: true, sound: 'pluck', echo: 0.35, edit: 'notes',
      steps: [{ d: 0, p: 100 }, null, { d: 4, p: 100 }, null, { d: 2, p: 100 }, { d: 5, p: 100 }, null, null, null, null, null, null, null, null, null, null]
    };
    const M = () => MODES[st.mode];
    const nDeg = () => M().iv.length; // index nDeg = octave
    const midiOf = (d) => 60 + st.key + (d >= nDeg() ? 12 + M().iv[d - nDeg()] : M().iv[d]);
    const nameOf = (d) => NOTE[(st.key + (d >= nDeg() ? M().iv[d - nDeg()] : M().iv[d])) % 12];

    const clock = Snd.Clock({
      bpm: st.bpm,
      onStep(step, t) {
        const s16 = step % 16;
        if (st.drums) {
          if (s16 % 4 === 0) V.kick(t, 0.8);
          if (s16 % 4 === 2) V.hat(t, 0.6);
          V.shaker(t, s16 % 2 ? 0.25 : 0.5);
        }
        const c = st.steps[step % st.len];
        if (c && Math.random() * 100 < c.p) {
          const f = Snd.mtof(midiOf(c.d));
          const o = { dly: st.echo, rev: 0.3 };
          if (st.sound === 'pluck') V.pluck(t, f, step % st.len === 0 ? 1 : 0.8, o);
          else if (st.sound === 'bass') V.bass(t, f / 2, 0.22, 0.9, { dly: 0, rev: 0.05 });
          else V.stab(t, [f, f * 1.5], 0.9, o);
        }
      },
      onUI(s) {
        cells.forEach((col) => col.forEach((b) => b.classList.remove('now')));
        if (s >= 0) (cells[s % st.len] || []).forEach((b) => b.classList.add('now'));
      }
    });
    function syncDelay() { Snd.setDelay((60 / st.bpm) * 0.75, 0.5, 2200); }
    function toggle() { if (clock.running) clock.stop(); else { syncDelay(); clock.start(); } pb.setState(clock.running); }

    const pb = playBtn(toggle);
    const keySel = select('m-key', NOTE.map((n, i) => [String(i), `${n} (${NOTE_RU[i]})`]), String(st.key), (v) => { st.key = Number(v); build(); });
    const modeSel = select('m-mode', Object.keys(MODES).map((k) => [k, MODES[k].name]), st.mode, (v) => {
      const oldN = nDeg(); st.mode = v; const n = nDeg();
      st.steps = st.steps.map((c) => (c ? { d: Math.min(Math.round((c.d * n) / oldN), n), p: c.p } : null));
      build();
    });
    const lenSel = select('m-len', Array.from({ length: 14 }, (_, i) => [String(i + 3), `${i + 3} шагов`]), String(st.len), (v) => { st.len = Number(v); build(); });
    const bpmField = numberField('m-bpm', 'Tempo', st.bpm, 70, 140, (v) => { st.bpm = v; clock.bpm = v; syncDelay(); });
    const drumsBox = h('input', { type: 'checkbox', id: 'm-drums', checked: true });
    drumsBox.addEventListener('change', () => { st.drums = drumsBox.checked; });
    const soundSeg = seg([['pluck', 'Плак'], ['stab', 'Стаб'], ['bass', 'Бас']], st.sound, (v) => { st.sound = v; }, 'Звук');
    const echoKnob = Knob({ name: 'Echo', min: 0, max: 0.8, value: st.echo, format: (v) => Math.round(v * 100) + '%', onInput: (v) => { st.echo = v; } });
    const editSeg = seg([['notes', 'Ноты'], ['prob', 'Chance']], 'notes', (v) => { st.edit = v; }, 'Что меняет клик');

    const mood = h('p', { class: 'muted', style: 'margin:0;font-size:14.5px;max-width:70ch' });
    const meterInfo = h('span', { class: 'keys-help' });
    const gridWrap = h('div', { class: 'seq-wrap' });
    let cells = [];

    function build() {
      const n = nDeg();
      mood.textContent = M().mood;
      const bars = lcm(st.len, 16) / 16;
      meterInfo.textContent = st.len === 16 ? 'Мотив длиной в такт: совпадает с бочкой каждый раз.' :
        `Мотив из ${st.len} шагов против такта из 16: они снова совпадут через ${bars} ${bars === 1 ? 'такт' : bars < 5 ? 'такта' : 'тактов'}.`;
      const grid = h('div', { class: 'seq', style: `--n:${st.len};min-width:${Math.max(360, 96 + st.len * 40)}px` });
      cells = Array.from({ length: st.len }, () => []);
      grid.append(h('div', { class: 'seq-row ruler' }, h('div', { class: 'seq-name' }), Array.from({ length: st.len }, (_, i) => h('div', { class: 'rc' }, String(i + 1)))));
      for (let d = n; d >= 0; d--) {
        const isRoot = d === 0 || d === n; const isChar = d === M().ch;
        const row = h('div', { class: 'seq-row', style: '--row:' + (isChar ? 'var(--sodium)' : isRoot ? 'var(--dusk)' : 'var(--ink-2)') });
        row.append(h('div', { class: 'seq-name', title: isChar ? 'характерная ступень лада' : '' },
          h('i', { style: 'background:' + (isChar ? 'var(--sodium)' : isRoot ? 'var(--dusk)' : 'var(--ink-2)') }),
          `${nameOf(d)}`, h('span', { class: 'muted mono', style: 'font-size:10.5px' }, d === n ? ' 8' : ' ' + (d + 1))));
        for (let i = 0; i < st.len; i++) {
          const c = st.steps[i];
          const onHere = c && c.d === d;
          const b = h('button', { type: 'button', class: 'cell' + (onHere ? ' on' : '') + (onHere && c.p < 100 ? ' prob' : ''), 'aria-label': `${nameOf(d)}, шаг ${i + 1}`, 'aria-pressed': onHere ? 'true' : 'false' });
          if (onHere && c.p < 100) b.setAttribute('data-p', String(c.p));
          b.addEventListener('click', () => clickCell(d, i));
          cells[i].push(b); row.append(b);
        }
        grid.append(row);
      }
      gridWrap.replaceChildren(grid);
    }
    function clickCell(d, i) {
      const c = st.steps[i];
      if (st.edit === 'prob' && c && c.d === d) st.steps[i] = { d, p: c.p === 100 ? 66 : c.p === 66 ? 33 : 100 };
      else if (c && c.d === d) st.steps[i] = null;
      else {
        st.steps[i] = { d, p: 100 };
        if (!clock.running) { Snd.ensure(); syncDelay(); V.pluck(Snd.ctx.currentTime + 0.01, Snd.mtof(midiOf(d)), 0.9, { dly: st.echo * 0.5, rev: 0.3 }); }
      }
      build();
    }
    // development tools
    const live = () => st.steps.slice(0, st.len);
    const put = (arr) => { arr.forEach((c, i) => { st.steps[i] = c; }); build(); };
    const tools = [
      ['Сдвиг →', 'Сдвинуть весь мотив на шаг вправо', () => { const a = live(); a.unshift(a.pop()); put(a); }],
      ['Задом наперёд', 'Ретроград: сыграть мотив с конца', () => put(live().reverse())],
      ['Зеркало', 'Инверсия: интервалы вверх становятся интервалами вниз от первой ноты', () => {
        const a = live(); const n = nDeg(); const first = a.find(Boolean); if (!first) return;
        put(a.map((c) => { if (!c) return null; let d = 2 * first.d - c.d; while (d < 0) d += n; while (d > n) d -= n; return { d, p: c.p }; }));
      }],
      ['Ступень вверх', 'Транспонировать внутри лада на одну ступень', () => { const n = nDeg(); put(live().map((c) => (c ? { d: c.d + 1 > n ? c.d + 1 - n : c.d + 1, p: c.p } : null))); }],
      ['Случайный', 'Собрать новый мотив из 3–4 нот лада', () => {
        const n = nDeg(); const pool = shuffle([0, 2, 4, Math.min(5, n - 1), 1, 3].filter((x) => x < n)).slice(0, 3 + Math.round(Math.random()));
        if (!pool.includes(0)) pool[0] = 0;
        put(Array.from({ length: st.len }, (_, i) => (i === 0 ? { d: 0, p: 100 } : Math.random() < 0.5 ? { d: pool[Math.floor(Math.random() * pool.length)], p: Math.random() < 0.2 ? 66 : 100 } : null)));
      }],
      ['Очистить', 'Убрать все ноты', () => put(Array(st.len).fill(null))]
    ].map(([t, title, fn]) => { const b = h('button', { class: 'btn sm', type: 'button', title }, t); b.addEventListener('click', fn); return b; });

    // challenges
    const notes = () => live().filter(Boolean);
    const CH = [
      { t: 'Три ноты, нечётная длина', d: 'Сделай мотив длиной 5 или 7 шагов, в котором ровно три разные ноты. Послушай, как он каждый такт начинается в новом месте относительно бочки.',
        check: () => { const u = new Set(notes().map((c) => c.d % nDeg())); return (st.len === 5 || st.len === 7) && u.size === 3 ? [true, 'Мотив каждый такт начинается в новом месте и долго не повторяется одинаково. На таких мотивах держатся гипнотичные треки.'] : [false, `Сейчас длина ${st.len}, разных нот ${u.size}.`]; } },
      { t: 'Тишина — тоже нота', d: 'Хотя бы треть шагов мотива оставь пустыми: в паузах будет слышно эхо.',
        check: () => { const empty = live().filter((c) => !c).length; return empty >= st.len / 3 ? [true, 'Теперь в паузах слышно хвосты эха и ревера.'] : [false, `Пустых шагов ${empty} из ${st.len}.`]; } },
      { t: 'Дорийская краска', d: 'Выбери лад Dorian и используй в мотиве шестую ступень — она подсвечена оранжевым. Это «светлая» нота, которая отличает дорийский от обычного минора.',
        check: () => st.mode === 'dorian' && notes().some((c) => c.d === 5) ? [true, 'Слышишь, как светлеет мотив на шестой ступени? Эта нота и отличает дорийский лад от натурального минора.'] : [false, 'Нужен лад Dorian и хотя бы одна нота на шестой ступени.'] },
      { t: 'Вопрос и ответ', d: 'Длина 16. В первой половине (шаги 1–8) последняя нота — не тоника, а во второй (9–16) последняя нота — тоника (нижняя или верхняя строка).',
        check: () => {
          if (st.len !== 16) return [false, 'Поставь длину 16 шагов.'];
          const a = st.steps.slice(0, 8).filter(Boolean).pop(); const b = st.steps.slice(8, 16).filter(Boolean).pop();
          const tonic = (c) => c && (c.d === 0 || c.d === nDeg());
          return a && b && !tonic(a) && tonic(b) ? [true, 'Первая половина спрашивает, вторая отвечает и «приходит домой».'] : [false, 'Проверь последнюю ноту каждой половины.'];
        } },
      { t: 'Живая вероятность', d: 'Переключись на Chance и сделай хотя бы две ноты с вероятностью ниже 100%. Мотив перестанет повторяться дословно.',
        check: () => { const n = notes().filter((c) => c.p < 100).length; return n >= 2 ? [true, 'В Live так же работает Chance у каждой ноты в MIDI-клипе.'] : [false, `Таких нот пока ${n}.`]; } }
    ];
    let chIdx = Math.min(Number(arg) || 0, CH.length - 1);
    const chTitle = h('div', { class: 'task-t' }); const chText = h('div'); const chRes = h('div', { class: 'result', role: 'status' });
    const chSel = select('m-ch', CH.map((c, i) => [String(i), `${i + 1}. ${c.t}`]), String(chIdx), (v) => { chIdx = Number(v); drawCh(); });
    function drawCh() { chTitle.textContent = CH[chIdx].t; chText.textContent = CH[chIdx].d; chRes.textContent = ''; chRes.className = 'result'; }
    const checkBtn = h('button', { class: 'btn primary sm', type: 'button' }, 'Проверить');
    checkBtn.addEventListener('click', () => {
      const [ok, msg] = CH[chIdx].check();
      chRes.textContent = (ok ? 'Готово. ' : 'Пока нет. ') + msg; chRes.className = 'result ' + (ok ? 'ok' : 'bad');
      if (ok) report('motif', { solved: 'c' + chIdx });
    });
    drawCh();

    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' },
          h('div', { class: 'transport' }, pb, bpmField,
            h('label', { class: 'field', for: 'm-key' }, 'Root', keySel),
            h('label', { class: 'field', for: 'm-mode' }, 'Scale', modeSel),
            h('label', { class: 'field', for: 'm-len' }, 'Длина', lenSel)),
          h('div', { class: 'transport' }, soundSeg, echoKnob.el, h('label', { class: 'field', for: 'm-drums' }, drumsBox, 'Ритм'))),
        h('div', { class: 'panel-b', style: 'display:grid;gap:10px' },
          mood,
          h('div', { class: 'btn-row' }, editSeg, meterInfo),
          gridWrap,
          h('div', { class: 'btn-row' }, h('span', { class: 'label' }, 'Развитие мотива'), tools))),
      h('div', { class: 'task' }, h('div', { class: 'btn-row' }, h('span', { class: 'label' }, 'Задание'), chSel), chTitle, chText, h('div', { class: 'btn-row' }, checkBtn), chRes),
      whereInLive('<p>В Live 12 лад выбирается в панели клипа: включи <b>Scale</b> (фиолетовая кнопка ♭♯), выбери <b>Root Note</b> и <b>Scale Name</b> — ноты лада подсветятся в редакторе, а кнопка <b>Fold to Scale</b> спрячет всё лишнее. Длину мотива задаёт поле <b>Length</b> в Main Clip Properties, в формате такты.доли.шестнадцатые (0.1.3 — это 7 шестнадцатых): клип на 7 шестнадцатых рядом с клипом ударных на 1 такт даёт тот же полиметр, что здесь. Вероятность каждой ноты — <b>Chance</b>, эхо — <b>Echo</b> или <b>Delay</b> на посыле.</p>')
    );
    build();
    const offSpace = spaceToggle(toggle);
    return () => { offSpace(); clock.stop(); };
  }

  // =====================================================================
  // CHORDS — diatonic chords, dub stabs, progressions, colour quiz
  // =====================================================================
  const CHORD_NAMES = { '0,3,7': 'm', '0,4,7': '', '0,3,6': 'dim', '0,4,8': 'aug', '0,3,7,10': 'm7', '0,4,7,11': 'maj7', '0,4,7,10': '7', '0,3,6,10': 'm7♭5', '0,3,6,9': 'dim7' };
  function chordName(rootPc, ivs) {
    const base = ivs.slice(0, Math.min(ivs.length, 4)).map((x) => x % 12);
    let q = CHORD_NAMES[base.join(',')];
    if (q == null) q = '?';
    if (ivs.length > 4) {
      const nine = ivs[4] % 12;
      if (nine === 2) q = q === 'm7' ? 'm9' : q === 'maj7' ? 'maj9' : q === '7' ? '9' : q + '(add9)';
      else if (nine === 1) q = q + '(♭9)';
    }
    return NOTE[rootPc % 12] + q;
  }
  function roman(i, ivs) {
    const R = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][i];
    const minor = ivs[1] % 12 === 3; const dim = minor && ivs[2] % 12 === 6;
    return (minor ? R.toLowerCase() : R) + (dim ? '°' : '');
  }

  function chords(root) {
    const st = { key: 2, mode: 'dorian', ext: 7, voicing: 'open', sound: 'stab', bpm: 116, prog: 0, drums: true };
    const PROGS = {
      aeolian: [[[0, 5, 2, 6], 'i – VI – III – VII'], [[0, 3], 'i – iv'], [[0, 6, 5, 6], 'i – VII – VI – VII']],
      dorian: [[[0, 3], 'i – IV · дорийский вамп'], [[0, 6, 0, 3], 'i – VII – i – IV'], [[0, 2, 3, 2], 'i – III – IV – III']],
      phrygian: [[[0, 1], 'i – II · фригийский поворот'], [[0, 1, 0, 6], 'i – II – i – vii']],
      lydian: [[[0, 1], 'I – II · лидийское парение'], [[0, 1, 4, 1], 'I – II – V – II']]
    };
    const modeKeys = Object.keys(PROGS);
    function diatonic(i) {
      const iv = MODES[st.mode].iv; const n = iv.length;
      const deg = (k) => iv[(i + k) % n] + 12 * Math.floor((i + k) / n);
      const count = st.ext === 3 ? 3 : st.ext === 7 ? 4 : 5;
      const raw = [0, 2, 4, 6, 8].slice(0, count).map(deg);
      const ivs = raw.map((x) => x - raw[0]);
      return { rootSemi: raw[0], ivs };
    }
    function voice(rootSemi, ivs) {
      const base = 48 + st.key + rootSemi; // around C3
      let notes = ivs.map((x) => base + x);
      if (st.voicing === 'open' && notes.length >= 3) { notes = notes.slice(); notes[1] += 12; if (notes.length > 3) notes.push(notes.splice(3, 1)[0]); notes.sort((a, b) => a - b); }
      while (notes[0] > 57) notes = notes.map((n) => n - 12);
      return notes.map(Snd.mtof);
    }
    function play(i, t) {
      const c = diatonic(i); const f = voice(c.rootSemi, c.ivs);
      if (st.sound === 'pad') V.pad(t, f, (60 / st.bpm) * 3.6); else V.stab(t, f, 1);
    }

    let curChord = 0;
    const clock = Snd.Clock({
      bpm: st.bpm,
      onStep(step, t) {
        const s16 = step % 16; const bar = Math.floor(step / 16);
        const prog = PROGS[st.mode][st.prog][0]; const ci = prog[bar % prog.length];
        if (st.drums) { if (s16 % 4 === 0) V.kick(t, 0.75); if (s16 % 4 === 2) V.hat(t, 0.55); V.shaker(t, s16 % 2 ? 0.2 : 0.4); }
        if (st.sound === 'pad') { if (s16 === 0) play(ci, t); }
        else if (s16 === 2 || s16 === 7 || s16 === 10) play(ci, t);
        if (s16 === 0) { const b = bar % prog.length; setTimeout(() => { curChord = b; drawProg(); }, Math.max(0, (t - Snd.ctx.currentTime) * 1000)); }
      }
    });
    function syncDelay() { Snd.setDelay((60 / st.bpm) * 0.75, 0.55, 1900); }
    function toggle() { if (clock.running) { clock.stop(); curChord = -1; drawProg(); } else { syncDelay(); clock.start(); } pb.setState(clock.running); }

    const pb = playBtn(toggle, 'Играть прогрессию / стоп (пробел)');
    const keySel = select('c-key', NOTE.map((n, i) => [String(i), `${n} (${NOTE_RU[i]})`]), String(st.key), (v) => { st.key = Number(v); draw(); });
    const modeSel = select('c-mode', modeKeys.map((k) => [k, MODES[k].name]), st.mode, (v) => { st.mode = v; st.prog = 0; draw(); });
    const extSeg = seg([[3, 'Трезвучия'], [7, 'Септ'], [9, 'Нон']], st.ext, (v) => { st.ext = v; draw(); }, 'Сложность аккорда');
    const voiceSeg = seg([['close', 'Тесно'], ['open', 'Широко']], st.voicing, (v) => { st.voicing = v; }, 'Расположение');
    const soundSeg = seg([['stab', 'Дабовый стаб'], ['pad', 'Пэд']], st.sound, (v) => { st.sound = v; }, 'Звук');
    const drumsBox = h('input', { type: 'checkbox', id: 'c-drums', checked: true });
    drumsBox.addEventListener('change', () => { st.drums = drumsBox.checked; });
    const chordRow = h('div', { class: 'opts' });
    const progRow = h('div', { class: 'opts' });
    const progView = h('div', { class: 'btn-row', style: 'font-family:var(--f-mono);font-size:14px' });

    function draw() {
      chordRow.replaceChildren();
      MODES[st.mode].iv.forEach((_, i) => {
        const c = diatonic(i); const nm = chordName(st.key + c.rootSemi, c.ivs);
        const b = h('button', { class: 'opt', type: 'button' }, h('span', { class: 'mono muted', style: 'font-size:11px;display:block' }, roman(i, c.ivs)), nm);
        b.addEventListener('click', () => { Snd.ensure(); syncDelay(); play(i, Snd.ctx.currentTime + 0.02); });
        chordRow.append(b);
      });
      progRow.replaceChildren();
      PROGS[st.mode].forEach(([p, label], k) => {
        const b = h('button', { class: 'opt' + (k === st.prog ? ' right' : ''), type: 'button' }, label);
        b.addEventListener('click', () => { st.prog = k; draw(); });
        progRow.append(b);
      });
      drawProg();
    }
    function drawProg() {
      const prog = PROGS[st.mode][st.prog][0];
      progView.replaceChildren(...prog.map((ci, k) => {
        const c = diatonic(ci);
        return h('span', { style: `padding:4px 10px;border-radius:2px;border:1px solid var(--line);${clock.running && k === curChord ? 'background:var(--sodium);color:var(--on-sodium);border-color:var(--sodium)' : ''}` }, chordName(st.key + c.rootSemi, c.ivs));
      }));
    }

    // quiz
    const QUIZ = [['m', [0, 3, 7], 'Минор'], ['', [0, 4, 7], 'Мажор'], ['m7', [0, 3, 7, 10], 'Минорный септаккорд (m7)'], ['maj7', [0, 4, 7, 11], 'Мажорный септаккорд (maj7)'], ['sus2', [0, 2, 7], 'sus2: ни мажор, ни минор'], ['m9', [0, 3, 7, 10, 14], 'Минорный нонаккорд (m9)']];
    let qAns = null, qRoot = 0, qOk = 0, qN = 0;
    const qOpts = h('div', { class: 'opts' }); const qRes = h('div', { class: 'result', role: 'status' }); const qScore = h('span', { class: 'score' }, '0 / 0');
    const qPlay = h('button', { class: 'btn sm', type: 'button' }, 'Сыграть ещё раз');
    const qNext = h('button', { class: 'btn primary sm', type: 'button' }, 'Новый аккорд');
    function qSound() { if (qAns == null) return; Snd.ensure(); const base = 48 + qRoot; V.pad(Snd.ctx.currentTime + 0.02, QUIZ[qAns][1].map((x) => Snd.mtof(base + x)), 1.6, { dly: 0 }); }
    function qNew() {
      qAns = Math.floor(Math.random() * QUIZ.length); qRoot = Math.floor(Math.random() * 12); qRes.textContent = ''; qRes.className = 'result';
      qOpts.replaceChildren(...QUIZ.map(([s, ivs, label], i) => {
        const b = h('button', { class: 'opt', type: 'button' }, label);
        b.addEventListener('click', () => {
          if (qOpts.dataset.done) return; qOpts.dataset.done = '1'; qN++;
          const ok = i === qAns; if (ok) qOk++;
          b.classList.add(ok ? 'right' : 'wrong'); qOpts.children[qAns].classList.add('right');
          qRes.textContent = ok ? 'Верно.' : `Это был ${QUIZ[qAns][2].toLowerCase()} — ${NOTE[qRoot]}${QUIZ[qAns][0]}.`;
          qRes.className = 'result ' + (ok ? 'ok' : 'bad'); qScore.textContent = `${qOk} / ${qN}`;
          report('chords', { score: qOk, total: qN });
        });
        return b;
      }));
      delete qOpts.dataset.done; qSound();
    }
    qPlay.addEventListener('click', qSound); qNext.addEventListener('click', qNew);

    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' },
          h('div', { class: 'transport' }, pb, h('label', { class: 'field', for: 'c-key' }, 'Root', keySel), h('label', { class: 'field', for: 'c-mode' }, 'Scale', modeSel)),
          h('div', { class: 'transport' }, soundSeg, h('label', { class: 'field', for: 'c-drums' }, drumsBox, 'Ритм'))),
        h('div', { class: 'panel-b', style: 'display:grid;gap:14px' },
          h('div', { class: 'btn-row' }, extSeg, voiceSeg),
          h('div', null, h('div', { class: 'label', style: 'margin-bottom:6px' }, 'Аккорды лада: нажми, чтобы услышать. Римская цифра — ступень лада, с которой строится аккорд: маленькая значит минорный, большая мажорный, ° уменьшённый'), chordRow),
          h('div', null, h('div', { class: 'label', style: 'margin-bottom:6px' }, 'Прогрессия — играет по кнопке ▶ или пробелу'), progRow),
          progView)),
      h('div', { class: 'task' },
        h('div', { class: 'btn-row', style: 'justify-content:space-between' }, h('span', { class: 'label' }, 'Тренировка слуха: какая краска?'), qScore),
        h('div', { class: 'btn-row' }, qNext, qPlay), qOpts, qRes),
      whereInLive('<p>В Live аккорды пишутся в <b>MIDI-клипе</b> — несколько нот друг над другом. С включённым <b>Scale</b> в панели клипа удобно ставить ноты, не выходя из лада. MIDI-эффект <b>Chord</b> складывает аккорд из одной ноты, а «дабовый стаб» — короткий аккорд, пропущенный через <b>Auto Filter</b>, а потом через <b>Echo</b> на Return-треке с большим <b>Feedback</b>, то есть с множеством повторов. Рецепт: «звук» → «Рецепты» → «Дабовый стаб».</p>')
    );
    draw(); qNew();
    const offSpace = spaceToggle(toggle);
    return () => { offSpace(); clock.stop(); };
  }

  // =====================================================================
  // SYNTH — subtractive synth playground + "match the sound"
  // =====================================================================
  function synth(root) {
    const INIT = { wave: 'sawtooth', cutoff: 1800, res: 1, attack: 0.005, decay: 0.4, sustain: 0.6, release: 0.3, lfoRate: 1, lfoAmt: 0, detune: 0 };
    const PRESETS = {
      pad: { name: 'Тёплый пэд', wave: 'sawtooth', cutoff: 850, res: 0.8, attack: 0.9, decay: 1, sustain: 0.8, release: 2.2, lfoRate: 0.2, lfoAmt: 0.3, detune: 12 },
      bass: { name: 'Мягкий бас', wave: 'triangle', cutoff: 320, res: 2, attack: 0.006, decay: 0.35, sustain: 0.6, release: 0.15, lfoRate: 1, lfoAmt: 0, detune: 0 },
      pluck: { name: 'Стеклянный плак', wave: 'square', cutoff: 2600, res: 6, attack: 0.002, decay: 0.25, sustain: 0, release: 0.4, lfoRate: 1, lfoAmt: 0, detune: 0 },
      breath: { name: 'Дыхание', wave: 'sawtooth', cutoff: 600, res: 9, attack: 1.4, decay: 0.6, sustain: 0.7, release: 2.5, lfoRate: 0.35, lfoAmt: 0.6, detune: 6 },
      stab: { name: 'Резиновый стаб', wave: 'square', cutoff: 1300, res: 4, attack: 0.003, decay: 0.18, sustain: 0, release: 0.2, lfoRate: 1, lfoAmt: 0, detune: 9 },
      lead: { name: 'Чистый свист', wave: 'sine', cutoff: 5000, res: 0.7, attack: 0.05, decay: 0.3, sustain: 0.8, release: 0.5, lfoRate: 5.5, lfoAmt: 0.05, detune: 0 }
    };
    const p = Object.assign({}, PRESETS.pad);
    const fmtS = (v) => (v < 1 ? Math.round(v * 1000) + ' ms' : v.toFixed(2) + ' s');
    const K = {};
    const defs = [
      ['cutoff', 'Filter Freq', { min: 60, max: 12000, log: true, format: (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' kHz' : Math.round(v) + ' Hz') }],
      ['res', 'Resonance', { min: 0.1, max: 18, format: (v) => v.toFixed(1) }],
      ['attack', 'Attack', { min: 0.001, max: 3, log: true, format: fmtS }],
      ['decay', 'Decay', { min: 0.02, max: 3, log: true, format: fmtS }],
      ['sustain', 'Sustain', { min: 0, max: 1, format: (v) => Math.round(v * 100) + '%' }],
      ['release', 'Release', { min: 0.01, max: 5, log: true, format: fmtS }],
      ['lfoRate', 'LFO Rate', { min: 0.05, max: 12, log: true, format: (v) => v.toFixed(2) + ' Hz' }],
      ['lfoAmt', 'LFO Amount', { min: 0, max: 1, format: (v) => Math.round(v * 100) + '%' }],
      ['detune', 'Detune', { min: 0, max: 30, step: 0.5, format: (v) => v.toFixed(1) + ' ct' }]
    ];
    const knobsWrap = h('div', { class: 'knobs' });
    defs.forEach(([k, name, o]) => {
      K[k] = Knob(Object.assign({ name, value: p[k], def: INIT[k], onInput: (v) => { p[k] = v; } }, o));
      knobsWrap.append(K[k].el);
    });
    const waveSeg = seg([['sine', 'Sine'], ['triangle', 'Triangle'], ['sawtooth', 'Saw'], ['square', 'Square']], p.wave, (v) => { p.wave = v; }, 'Форма волны');
    function setAll(src) { Object.assign(p, src); defs.forEach(([k]) => K[k].set(p[k], true)); waveSeg.set(p.wave); }
    const presetSel = select('s-preset', Object.keys(PRESETS).map((k) => [k, PRESETS[k].name]), 'pad', (v) => setAll(PRESETS[v]));

    // playing: on-screen piano + computer keyboard (Live's Computer MIDI Keyboard layout)
    let octave = 4;
    const KEYMAP = { KeyA: 0, KeyW: 1, KeyS: 2, KeyE: 3, KeyD: 4, KeyF: 5, KeyT: 6, KeyG: 7, KeyY: 8, KeyH: 9, KeyU: 10, KeyJ: 11, KeyK: 12, KeyO: 13, KeyL: 14 };
    const held = new Map();
    const octLabel = h('span', { class: 'mono' }, 'C' + (octave - 1));
    const piano = h('div', { class: 'piano', 'aria-label': 'Клавиатура' });
    const keysBtns = [];
    for (let i = 0; i <= 14; i++) {
      const pc = i % 12; const blk = [1, 3, 6, 8, 10].includes(pc);
      const b = h('button', { type: 'button', class: blk ? 'blk' : '', 'aria-label': NOTE[pc] }, ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L'][i]);
      if (blk) { const whitesBefore = Array.from({ length: i }, (_, j) => j).filter((j) => ![1, 3, 6, 8, 10].includes(j % 12)).length; const bw = (100 / 9) * 0.62; b.style.left = `calc(${(whitesBefore / 9) * 100 - bw / 2}% )`; b.style.width = bw + '%'; }
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); noteOn('p' + i, i); });
      const offFn = () => noteOff('p' + i);
      b.addEventListener('pointerup', offFn); b.addEventListener('pointerleave', offFn); b.addEventListener('pointercancel', offFn);
      keysBtns.push(b); piano.append(b);
    }
    function noteOn(id, semi, params) {
      Snd.ensure(); if (held.has(id)) return;
      const v = V.synth(params || p, Snd.mtof(12 * (octave + 1) + semi), Snd.ctx.currentTime + 0.005, { rev: 0.18 });
      held.set(id, { v, semi }); if (keysBtns[semi]) keysBtns[semi].classList.add('hit');
    }
    function noteOff(id) { const n = held.get(id); if (!n) return; n.v.off(); held.delete(id); if (keysBtns[n.semi]) keysBtns[n.semi].classList.remove('hit'); }
    const kd = (e) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code === 'KeyZ') { octave = Math.max(1, octave - 1); octLabel.textContent = 'C' + (octave - 1); return; }
      if (e.code === 'KeyX') { octave = Math.min(6, octave + 1); octLabel.textContent = 'C' + (octave - 1); return; }
      if (e.code in KEYMAP) { e.preventDefault(); if (!e.repeat) noteOn(e.code, KEYMAP[e.code]); }
    };
    const ku = (e) => { if (e.code in KEYMAP) noteOff(e.code); };
    const blur = () => { Array.from(held.keys()).forEach(noteOff); };
    document.addEventListener('keydown', kd); document.addEventListener('keyup', ku); window.addEventListener('blur', blur);

    // phrase for comparisons
    function phrase(params) {
      Snd.ensure(); const t = Snd.ctx.currentTime + 0.05;
      const gate = params.attack > 0.5 ? 1.6 : 0.5;
      [[0, 0], [5, gate + 0.35], [7, 2 * (gate + 0.35)]].forEach(([semi, dt]) => {
        const v = V.synth(params, Snd.mtof(50 + semi), t + dt, { rev: 0.18 });
        v.off(t + dt + gate);
      });
    }

    // match game
    const LEVELS = { 1: ['wave', 'cutoff'], 2: ['wave', 'cutoff', 'attack', 'release'], 3: ['wave', 'cutoff', 'res', 'attack', 'decay', 'sustain', 'release', 'lfoAmt'] };
    let level = 1, target = null, solved = 0;
    const gRes = h('div', { class: 'result', role: 'status' }); const gScore = h('span', { class: 'score' }, 'угадано: 0');
    const gInfo = h('div', { class: 'keys-help' });
    function newTarget() {
      const keys = Object.keys(PRESETS); const base = PRESETS[keys[Math.floor(Math.random() * keys.length)]];
      target = Object.assign({}, base);
      // start the player from the same patch but with the tested parameters scrambled
      const start = Object.assign({}, base);
      LEVELS[level].forEach((k) => {
        if (k === 'wave') start.wave = ['sine', 'triangle', 'sawtooth', 'square'].filter((w) => w !== base.wave)[Math.floor(Math.random() * 3)];
        else { const d = defs.find((x) => x[0] === k)[2]; const n = Math.random(); start[k] = d.log ? d.min * Math.pow(d.max / d.min, n) : d.min + n * (d.max - d.min); }
      });
      setAll(start);
      gInfo.textContent = 'Меняются: ' + LEVELS[level].map((k) => (k === 'wave' ? 'Waveform' : defs.find((x) => x[0] === k)[1])).join(', ') + '. Остальные ручки уже как у цели.';
      gRes.textContent = ''; gRes.className = 'result';
    }
    function compare() {
      if (!target) return;
      const tips = [];
      LEVELS[level].forEach((k) => {
        if (k === 'wave') { if (p.wave !== target.wave) tips.push('форма волны другая'); return; }
        const d = defs.find((x) => x[0] === k); const name = d[1];
        if (d[2].log) {
          const r = Math.log2(p[k] / target[k]);
          const tol = k === 'cutoff' ? 0.6 : 1;
          if (Math.abs(r) > tol) tips.push(`${name}: ${r > 0 ? 'слишком много' : 'слишком мало'}`);
        } else {
          const range = d[2].max - d[2].min; const r = (p[k] - target[k]) / range;
          if (Math.abs(r) > 0.18) tips.push(`${name}: ${r > 0 ? 'слишком много' : 'слишком мало'}`);
        }
      });
      if (!tips.length) { solved++; gScore.textContent = 'угадано: ' + solved; gRes.textContent = `Похоже! Это был пресет «${target.name}».`; gRes.className = 'result ok'; report('synth', { solved, level }); }
      else { const t = tips.join('; '); gRes.textContent = 'Почти. ' + t.charAt(0).toUpperCase() + t.slice(1) + '.'; gRes.className = 'result bad'; }
    }
    const lvlSeg = seg([[1, 'Уровень 1'], [2, 'Уровень 2'], [3, 'Уровень 3']], 1, (v) => { level = v; newTarget(); }, 'Уровень');
    const bT = h('button', { class: 'btn sm', type: 'button' }, '▶ Цель'); bT.addEventListener('click', () => target && phrase(target));
    const bM = h('button', { class: 'btn sm', type: 'button' }, '▶ Мой звук'); bM.addEventListener('click', () => phrase(p));
    const bC = h('button', { class: 'btn primary sm', type: 'button' }, 'Сравнить'); bC.addEventListener('click', compare);
    const bN = h('button', { class: 'btn sm ghost', type: 'button' }, 'Новая цель'); bN.addEventListener('click', newTarget);
    let gameOn = false;
    const gameBody = h('div', { style: 'display:grid;gap:10px', hidden: true }, h('div', { class: 'btn-row' }, lvlSeg, gScore), gInfo, h('div', { class: 'btn-row' }, bT, bM, bC, bN), gRes);
    const startGame = h('button', { class: 'btn primary sm', type: 'button' }, 'Начать');
    startGame.addEventListener('click', () => { gameOn = !gameOn; gameBody.hidden = !gameOn; startGame.textContent = gameOn ? 'Выйти из игры' : 'Начать'; if (gameOn) newTarget(); });

    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' },
          h('div', { class: 'transport' }, h('label', { class: 'field', for: 's-preset' }, 'Пресет', presetSel), waveSeg),
          h('div', { class: 'transport keys-help' }, 'Октава ', octLabel, ' · Z / X — ниже / выше')),
        h('div', { class: 'panel-b', style: 'display:grid;gap:16px' },
          knobsWrap,
          piano,
          h('p', { class: 'keys-help', style: 'margin:0' }, 'Играй мышкой или с клавиатуры: ряд A S D F G H J K — белые клавиши, W E T Y U — чёрные. Это та же раскладка, что у Computer MIDI Keyboard в Live (включается клавишей M).'))),
      h('div', { class: 'task' },
        h('div', { class: 'btn-row', style: 'justify-content:space-between' }, h('span', { class: 'label' }, 'Игра «Повтори звук»'), startGame),
        h('div', null, 'Слушай цель, крути ручки, сравнивай. Начни с первого уровня: там меняются только форма волны и фильтр.'),
        gameBody),
      whereInLive('<p>Эти ручки есть почти в любом синтезаторе Live. В <b>Drift</b> — секции <b>Oscillator</b>, <b>Filter</b> (Freq, Res), <b>Env 1</b>, огибающая громкости (Attack, Decay, Sustain, Release) и <b>LFO</b>. В <b>Wavetable</b> и <b>Analog</b> они называются так же. Мягкий пэд в нашем жанре: медленная атака, длинный релиз, фильтр прикрыт и чуть «плавает» от LFO.</p>')
    );
    return () => { document.removeEventListener('keydown', kd); document.removeEventListener('keyup', ku); window.removeEventListener('blur', blur); blur(); };
  }

  // =====================================================================
  // EQ EAR TRAINING — guess the boosted band
  // =====================================================================
  function eq(root) {
    const BANDS = [
      [60, '60 Hz', 'саб, давление'], [125, '125 Hz', 'тело бочки и баса'], [250, '250 Hz', 'бубнение, муть'], [500, '500 Hz', 'коробка, картон'],
      [1000, '1 kHz', 'нос, середина'], [2000, '2 kHz', 'присутствие, напор'], [4000, '4 kHz', 'резкость, атака'], [8000, '8 kHz', 'блеск, шипение'], [12000, '12 kHz', 'воздух']
    ];
    const SETS = { easy: [1, 3, 5, 7], mid: [1, 2, 3, 4, 5, 6, 7], hard: [0, 1, 2, 3, 4, 5, 6, 7, 8] };
    const st = { level: 'easy', source: 'pink', ab: 'eq', ans: null, ok: 0, n: 0, playing: false };
    let srcNode = null, bus = null, peq = null, clock = null;

    function buildChain() {
      Snd.ensure(); const ctx = Snd.ctx;
      bus = ctx.createGain(); peq = Snd.filt('peaking', 1000, 1.3); peq.gain.value = 0;
      const g = ctx.createGain(); g.gain.value = 0.9;
      bus.connect(peq); peq.connect(g); g.connect(Snd.out);
    }
    function applyEq() {
      if (!peq) return;
      const boost = st.level === 'easy' ? 12 : st.level === 'mid' ? 9 : 7;
      const f = st.ans != null ? BANDS[st.ans][0] : 1000;
      peq.frequency.setValueAtTime(f, Snd.ctx.currentTime);
      peq.gain.setTargetAtTime(st.ab === 'eq' && st.ans != null ? boost : 0, Snd.ctx.currentTime, 0.03);
    }
    function start() {
      if (!bus) buildChain();
      stop(true);
      const ctx = Snd.ctx;
      if (st.source === 'pink') {
        srcNode = ctx.createBufferSource(); srcNode.buffer = Snd.makePink(4); srcNode.loop = true;
        const g = ctx.createGain(); g.gain.value = 0.55; srcNode.connect(g); g.connect(bus); srcNode.start();
      } else {
        const o = { dest: bus, rev: 0, dly: 0 };
        clock = Snd.Clock({ bpm: 120, onStep(step, t) {
          const s = step % 16;
          if (s % 4 === 0) V.kick(t, 0.9, o);
          if (s % 4 === 2) V.hat(t, 0.7, o);
          V.shaker(t, s % 2 ? 0.35 : 0.6, o);
          if (s === 4 || s === 12) V.clap(t, 0.6, o);
          if (step % 32 === 0) V.pad(t, [146.8, 174.6, 220, 261.6], 3.6, o);
          if (s === 3 || s === 11) V.bass(t, 73.4, 0.2, 0.8, o);
        } });
        clock.start();
      }
      st.playing = true; pb.setState(true); applyEq();
    }
    function stop(silent) {
      if (srcNode) { try { srcNode.stop(); } catch (e) { /* already stopped */ } srcNode = null; }
      if (clock) { clock.stop(); clock = null; }
      st.playing = false; if (!silent) pb.setState(false);
    }
    const pb = playBtn(() => (st.playing ? stop() : start()), 'Слушать / стоп');
    const offStop = Snd.onStop(() => stop());
    const srcSeg = seg([['pink', 'Розовый шум'], ['groove', 'Грув']], 'pink', (v) => { st.source = v; if (st.playing) start(); }, 'Источник');
    const abSeg = seg([['dry', 'Без EQ'], ['eq', 'С EQ']], 'eq', (v) => { st.ab = v; applyEq(); }, 'Сравнение');
    const lvlSeg = seg([['easy', '4 полосы'], ['mid', '7 полос'], ['hard', '9 полос']], 'easy', (v) => { st.level = v; next(); }, 'Сложность');
    const opts = h('div', { class: 'opts' }); const res = h('div', { class: 'result', role: 'status' }); const score = h('span', { class: 'score' }, '0 / 0');
    const nextBtn = h('button', { class: 'btn primary sm', type: 'button' }, 'Следующий');
    nextBtn.addEventListener('click', () => next());
    function next() {
      const set = SETS[st.level];
      st.ans = set[Math.floor(Math.random() * set.length)];
      res.textContent = ''; res.className = 'result';
      opts.replaceChildren(...set.map((bi) => {
        const b = h('button', { class: 'opt', type: 'button', 'data-b': String(bi) }, h('b', { class: 'mono' }, BANDS[bi][1]), h('span', { class: 'muted', style: 'display:block;font-size:12px' }, BANDS[bi][2]));
        b.addEventListener('click', () => {
          if (opts.dataset.done) return; opts.dataset.done = '1'; st.n++;
          const ok = bi === st.ans; if (ok) st.ok++;
          b.classList.add(ok ? 'right' : 'wrong'); opts.querySelector(`[data-b="${st.ans}"]`).classList.add('right');
          res.textContent = ok ? 'Верно.' : `Это было ${BANDS[st.ans][1]} — ${BANDS[st.ans][2]}.`; res.className = 'result ' + (ok ? 'ok' : 'bad');
          score.textContent = `${st.ok} / ${st.n}`; report('eq', { score: st.ok, total: st.n });
        });
        return b;
      }));
      delete opts.dataset.done; applyEq();
    }
    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' }, h('div', { class: 'transport' }, pb, srcSeg, abSeg), h('div', { class: 'transport' }, lvlSeg, score)),
        h('div', { class: 'panel-b', style: 'display:grid;gap:12px' },
          h('p', { style: 'margin:0' }, 'Нажми ▶ и переключай «Без EQ / С EQ». Какую полосу поднял эквалайзер? Начни с розового шума: это ровное шипение, на нём подъём слышно лучше всего. Потом переключись на «Грув».'),
          opts, h('div', { class: 'btn-row' }, nextBtn), res)),
      whereInLive('<p>В Live это <b>EQ Eight</b>. Приём «поиска» проблемы: подними узкую полосу (большой <b>Q</b>, то есть узкая полоса, и <b>Gain</b> +10 dB), проведи ей по частотам: где звук загудел или зазвенел сильнее всего, там и режь. В этом жанре чаще всего чистят <b>250–500 Hz</b> на пэдах (муть) и срезают низ у всего, кроме бочки и баса.</p>')
    );
    next();
    return () => { offStop(); stop(true); };
  }

  // =====================================================================
  // FX EAR TRAINING — name the effect
  // =====================================================================
  function fx(root) {
    const FX = [
      { id: 'rev', name: 'Reverb', ru: 'ревербератор', live: 'Reverb или Hybrid Reverb', build: (ctx, inp, outp) => { const c = ctx.createConvolver(); c.buffer = Snd.makeIR(3.5, 2); const w = ctx.createGain(); w.gain.value = 0.9; inp.connect(outp); inp.connect(c); c.connect(w); w.connect(outp); } },
      { id: 'dly', name: 'Delay', ru: 'эхо', live: 'Echo или Delay', build: (ctx, inp, outp) => { const d = ctx.createDelay(2); d.delayTime.value = (60 / 116) * 0.75; const f = ctx.createGain(); f.gain.value = 0.55; const w = ctx.createGain(); w.gain.value = 0.7; inp.connect(outp); inp.connect(d); d.connect(f); f.connect(d); d.connect(w); w.connect(outp); } },
      { id: 'lp', name: 'Low-pass фильтр', ru: 'срезаны верха', live: 'Auto Filter, режим Low-pass', build: (ctx, inp, outp) => { const f = Snd.filt('lowpass', 650, 1.2); inp.connect(f); f.connect(outp); } },
      { id: 'hp', name: 'High-pass фильтр', ru: 'срезан низ', live: 'Auto Filter или EQ Eight, режим High-pass', build: (ctx, inp, outp) => { const f = Snd.filt('highpass', 1400, 0.9); inp.connect(f); f.connect(outp); } },
      { id: 'sat', name: 'Сатурация', ru: 'перегруз, плотность', live: 'Saturator или Roar', build: (ctx, inp, outp) => { const ws = ctx.createWaveShaper(); const n = 2048; const c = new Float32Array(n); for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.tanh(x * 7) / Math.tanh(7); } ws.curve = c; ws.oversample = '2x'; const pre = ctx.createGain(); pre.gain.value = 1.6; const post = ctx.createGain(); post.gain.value = 0.55; inp.connect(pre); pre.connect(ws); ws.connect(post); post.connect(outp); } },
      { id: 'sc', name: 'Сайдчейн', ru: 'качание от бочки', live: 'Compressor с Sidechain от бочки', duck: true, build: (ctx, inp, outp, duck) => { inp.connect(duck); duck.connect(outp); } },
      { id: 'cho', name: 'Хорус', ru: 'ширина, плавание', live: 'Chorus-Ensemble', build: (ctx, inp, outp) => { const d = ctx.createDelay(0.1); d.delayTime.value = 0.018; const l = ctx.createOscillator(); l.frequency.value = 0.9; const lg = ctx.createGain(); lg.gain.value = 0.006; l.connect(lg); lg.connect(d.delayTime); l.start(); const w = ctx.createGain(); w.gain.value = 0.8; inp.connect(outp); inp.connect(d); d.connect(w); w.connect(outp); fxNodes.push(l); } }
    ];
    let fxNodes = [];
    const st = { ans: null, ab: 'fx', ok: 0, n: 0, playing: false };
    let clock = null, inBus = null, dryBus = null, fxBus = null, duckGain = null, abDry = null, abFx = null;

    function rebuild() {
      Snd.ensure(); const ctx = Snd.ctx;
      fxNodes.forEach((n) => { try { n.stop(); } catch (e) { /* noop */ } }); fxNodes = [];
      if (inBus) { try { inBus.disconnect(); } catch (e) { /* noop */ } }
      if (fxBus) { try { fxBus.disconnect(); } catch (e) { /* noop */ } }
      inBus = ctx.createGain();
      abDry = ctx.createGain(); abFx = ctx.createGain(); fxBus = ctx.createGain();
      duckGain = ctx.createGain();
      inBus.connect(abDry); abDry.connect(Snd.out);
      inBus.connect(abFx); abFx.connect(fxBus);
      FX[st.ans].build(ctx, fxBus, Snd.out, duckGain);
      setAB();
    }
    function setAB() {
      if (!abDry) return; const t = Snd.ctx.currentTime;
      abDry.gain.setTargetAtTime(st.ab === 'dry' ? 1 : 0, t, 0.02);
      abFx.gain.setTargetAtTime(st.ab === 'fx' ? 1 : 0, t, 0.02);
    }
    function start() {
      Snd.ensure(); rebuild(); if (clock) clock.stop();
      const notes = [62, null, 69, null, 65, 71, null, 69, 62, null, 67, null, 65, null, 69, 72];
      clock = Snd.Clock({ bpm: 116, onStep(step, t) {
        const s = step % 16; const o = { dest: inBus, rev: 0, dly: 0 };
        if (s % 4 === 0) V.kick(t, 0.85);
        if (s % 4 === 0 && FX[st.ans].duck && st.ab === 'fx') {
          const sd = 60 / 116; duckGain.gain.cancelScheduledValues(t); duckGain.gain.setValueAtTime(0.08, t); duckGain.gain.linearRampToValueAtTime(1, t + sd * 0.6);
        }
        if (s % 4 === 2) V.hat(t, 0.6, o);
        V.shaker(t, s % 2 ? 0.25 : 0.45, o);
        if (notes[s] != null) V.pluck(t, Snd.mtof(notes[s]), 0.9, o, 0.5);
        if (step % 32 === 0) V.pad(t, [146.8, 174.6, 220], 3.8, o);
      } });
      clock.start(); st.playing = true; pb.setState(true);
    }
    function stop() { if (clock) { clock.stop(); clock = null; } fxNodes.forEach((n) => { try { n.stop(); } catch (e) { /* noop */ } }); fxNodes = []; st.playing = false; pb.setState(false); }
    const pb = playBtn(() => (st.playing ? stop() : start()), 'Слушать / стоп');
    const offStop = Snd.onStop(stop);
    const abSeg = seg([['dry', 'Сухой'], ['fx', 'С эффектом']], 'fx', (v) => { st.ab = v; setAB(); }, 'Сравнение');
    const opts = h('div', { class: 'opts' }); const res = h('div', { class: 'result', role: 'status' }); const score = h('span', { class: 'score' }, '0 / 0');
    const nextBtn = h('button', { class: 'btn primary sm', type: 'button' }, 'Следующий');
    nextBtn.addEventListener('click', () => next());
    function next() {
      st.ans = Math.floor(Math.random() * FX.length);
      const choices = shuffle([st.ans].concat(shuffle(FX.map((_, i) => i).filter((i) => i !== st.ans)).slice(0, 3)));
      res.textContent = ''; res.className = 'result';
      opts.replaceChildren(...choices.map((i) => {
        const b = h('button', { class: 'opt', type: 'button', 'data-i': String(i) }, FX[i].name);
        b.addEventListener('click', () => {
          if (opts.dataset.done) return; opts.dataset.done = '1'; st.n++;
          const ok = i === st.ans; if (ok) st.ok++;
          b.classList.add(ok ? 'right' : 'wrong'); opts.querySelector(`[data-i="${st.ans}"]`).classList.add('right');
          res.textContent = (ok ? 'Верно. ' : `Это ${FX[st.ans].name.toLowerCase()} (${FX[st.ans].ru}). `) + `В Live: ${FX[st.ans].live}.`;
          res.className = 'result ' + (ok ? 'ok' : 'bad'); score.textContent = `${st.ok} / ${st.n}`; report('fx', { score: st.ok, total: st.n });
        });
        return b;
      }));
      delete opts.dataset.done;
      if (st.playing) start();
    }
    root.append(
      h('div', { class: 'panel' },
        h('div', { class: 'panel-h' }, h('div', { class: 'transport' }, pb, abSeg), score),
        h('div', { class: 'panel-b', style: 'display:grid;gap:12px' },
          h('p', { style: 'margin:0' }, 'Нажми ▶ и сравни «Сухой» и «С эффектом». Бочка всегда сухая, эффект стоит на всём остальном.'),
          opts, h('div', { class: 'btn-row' }, nextBtn), res)),
      whereInLive('<p>Эффекты пространства (<b>Reverb</b>, <b>Echo</b>) в Live ставят на <b>Return</b>-треки и отправляют туда звук ручками <b>Sends</b>. Фильтры и сатурацию — прямо на дорожку. Сайдчейн — это <b>Compressor</b>, у которого раскрыт и включён раздел <b>Sidechain</b>, а в Audio From выбран трек с бочкой.</p>')
    );
    next();
    return () => { offStop(); stop(); };
  }

  // =====================================================================
  // KEYS — shortcut flashcards
  // =====================================================================
  function keys(root) {
    const all = (window.REF && window.REF.shortcuts) || [];
    if (!all.length) { root.append(h('div', { class: 'empty' }, 'Карточки появятся, когда будет готов список горячих клавиш.')); return () => {}; }
    let deck = shuffle(all), cur = null, shown = false, known = 0;
    const big = h('div', { class: 'big' }); const keysEl = h('div', { class: 'keys', hidden: true }); const note = h('div', { class: 'muted', hidden: true, style: 'max-width:52ch;font-size:14.5px' });
    const count = h('span', { class: 'score' });
    const showB = h('button', { class: 'btn primary', type: 'button' }, 'Показать клавиши');
    const yesB = h('button', { class: 'btn primary', type: 'button', hidden: true }, 'Помню');
    const noB = h('button', { class: 'btn', type: 'button', hidden: true }, 'Ещё повторю');
    function draw() {
      count.textContent = `осталось ${deck.length} · запомнено ${known}`;
      if (!deck.length) { big.textContent = 'Колода пройдена: все карточки отмечены как «Помню».'; keysEl.hidden = true; note.hidden = true; showB.hidden = true; yesB.hidden = true; noB.hidden = true; report('keys', { known }); return; }
      cur = deck[0]; shown = false;
      big.textContent = cur.action; keysEl.replaceChildren(h('kbd', null, String(cur.keys)));
      note.textContent = cur.note || '';
      keysEl.hidden = true; note.hidden = true; showB.hidden = false; yesB.hidden = true; noB.hidden = true;
    }
    showB.addEventListener('click', () => { shown = true; keysEl.hidden = false; note.hidden = !cur.note; showB.hidden = true; yesB.hidden = false; noB.hidden = false; });
    yesB.addEventListener('click', () => { deck.shift(); known++; draw(); });
    noB.addEventListener('click', () => { deck.push(deck.shift()); draw(); });
    const restart = h('button', { class: 'btn sm ghost', type: 'button' }, 'Начать заново');
    restart.addEventListener('click', () => { deck = shuffle(all); known = 0; draw(); });
    root.append(h('div', { class: 'btn-row', style: 'justify-content:space-between' }, count, restart), h('div', { class: 'flash' }, big, keysEl, note, h('div', { class: 'btn-row' }, showB, yesB, noB)));
    draw();
    return () => {};
  }

  const impl = { groove, motif, chords, synth, eq, fx, keys };
  let cleanup = null;
  function unmount() { if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; } Snd.stopAll(); }
  function mount(root, id, arg) {
    unmount();
    const fn = impl[id];
    if (!fn) return false;
    cleanup = fn(root, arg) || null;
    return true;
  }
  return { list, mount, unmount, MODES, NOTE, GROOVES, TERMS, DRUM_ROWS, parsePattern, previewPattern, stopPreview };
})();
