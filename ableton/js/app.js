/* App shell: routing, progress (db + localStorage), lesson rendering, mentor (Claude), reference pages. */
(function () {
  'use strict';
  const h = window.h;
  const view = document.getElementById('view');
  const MODS = (window.COURSE_MODULES || []).slice().sort((a, b) => a.n - b.n);
  const LESSONS = [];
  MODS.forEach((m) => m.lessons.forEach((l, k) => LESSONS.push({ m, l, k })));
  const byId = {}; LESSONS.forEach((x) => { byId[x.l.id] = x; });
  const REF = window.REF || {};
  // Claude answers only inside claude.ai; elsewhere the mentor is hidden completely.
  const HAS_MENTOR = !!(window.claude && typeof window.claude.use === 'function');

  // =====================================================================
  // Progress store: localStorage first, then the viewer's private db doc
  // =====================================================================
  const Store = {
    key: 'tihiy-hod-progress-v1',
    s: { done: {}, steps: {}, quiz: {}, tr: {}, notes: {}, sub: null, last: null, updated: 0 },
    doc: null, timer: null, writing: false, dirty: false,
    load() {
      try { const raw = localStorage.getItem(this.key); if (raw) this.merge(JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
    },
    merge(r) {
      if (!r || typeof r !== 'object') return;
      const s = this.s;
      Object.keys(r.done || {}).forEach((k) => { if (!s.done[k]) s.done[k] = r.done[k]; });
      Object.keys(r.steps || {}).forEach((k) => { const a = s.steps[k] || []; (r.steps[k] || []).forEach((v, i) => { a[i] = !!(a[i] || v); }); s.steps[k] = a; });
      Object.keys(r.quiz || {}).forEach((k) => { const a = s.quiz[k], b = r.quiz[k]; if (!a || (b && b.right > a.right)) s.quiz[k] = b; });
      Object.keys(r.tr || {}).forEach((k) => {
        const a = s.tr[k] || {}, b = r.tr[k] || {};
        const solved = Array.from(new Set([].concat(a.solved || [], b.solved || [])));
        const seen = Array.from(new Set([].concat(a.seen || [], b.seen || []))).slice(0, 200);
        const best = Math.max(a.best || 0, b.best || 0);
        s.tr[k] = Object.assign({}, b, a, { solved, seen, best });
      });
      Object.keys(r.notes || {}).forEach((k) => { if (!s.notes[k] || (r.updated > s.updated && r.notes[k])) s.notes[k] = r.notes[k]; });
      if (r.last && (!s.last || r.updated > s.updated)) s.last = r.last;
      if (r.sub && (!s.sub || (s.sub.state !== 'yes' && (r.sub.state === 'yes' || (r.sub.at || 0) > (s.sub.at || 0))))) s.sub = r.sub;
      s.updated = Math.max(s.updated || 0, r.updated || 0);
    },
    save() {
      this.s.updated = Date.now();
      try { localStorage.setItem(this.key, JSON.stringify(this.s)); } catch (e) { /* storage unavailable */ }
      clearTimeout(this.timer); this.timer = setTimeout(() => this.persist(), 1200);
      updateLcd();
    },
    async persist() {
      if (!this.doc) return;
      if (this.writing) { this.dirty = true; return; }
      this.writing = true;
      try { await this.doc.set(JSON.parse(JSON.stringify(this.s))); }
      catch (e) { if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) this.doc = null; }
      this.writing = false;
      if (this.dirty) { this.dirty = false; this.persist(); }
    },
    async connect() {
      const c = window.claude;
      if (!c || typeof c.use !== 'function') return;
      try {
        const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
        if (!db || !user) return;
        const id = await user.id();
        if (!id) return;
        this.doc = db.doc('data/users/' + id + '/progress');
        const snap = await this.doc.get();
        if (snap.exists) this.merge(snap.data());
        try { localStorage.setItem(this.key, JSON.stringify(this.s)); } catch (e) { /* noop */ }
        this.persist();
        updateLcd();
        const cur = (location.hash || '#course').slice(1);
        if (cur === 'course' || cur === 'trainers') route(true);
      } catch (e) { this.doc = null; }
    }
  };

  window.Progress = {
    trainer(id, data) {
      const t = Store.s.tr[id] || (Store.s.tr[id] = {});
      if (data.solved) t.solved = Array.from(new Set([].concat(t.solved || [], [data.solved])));
      if (data.seen) t.seen = Array.from(new Set([].concat(t.seen || [], [data.seen]))).slice(0, 200);
      if (data.total) { t.last = { score: data.score, total: data.total }; if (data.total >= 5) t.best = Math.max(t.best || 0, Math.round((100 * data.score) / data.total)); }
      if (data.known) t.known = Math.max(t.known || 0, data.known);
      if (data.level) t.level = Math.max(t.level || 0, data.level);
      Store.save();
    }
  };

  function doneCount() { return LESSONS.filter((x) => Store.s.done[x.l.id]).length; }
  function updateLcd() {
    const d = doneCount(), n = LESSONS.length;
    document.getElementById('lcd-val').textContent = `${d} из ${n}`;
    document.getElementById('lcd-meter').style.width = n ? (100 * d) / n + '%' : '0';
  }
  function nextLesson() { return LESSONS.find((x) => !Store.s.done[x.l.id]) || null; }
  function toast(msg) {
    const t = h('div', { class: 'toast', role: 'status' }, msg);
    document.body.append(t); setTimeout(() => t.remove(), 2200);
  }
  const strip = (html) => String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  function safeHtml(html) {
    const d = h('div', { html: html || '' });
    d.querySelectorAll('script,style,iframe,object,embed').forEach((n) => n.remove());
    d.querySelectorAll('*').forEach((n) => Array.from(n.attributes).forEach((a) => { if (/^on/i.test(a.name)) n.removeAttribute(a.name); }));
    d.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (/^#[A-Za-z0-9._~-]+$/.test(href)) return; // internal link inside the course
      if (!/^https:\/\//.test(href)) { a.removeAttribute('href'); return; }
      a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
    });
    return d.innerHTML;
  }

  // =====================================================================
  // Mentor: ask Claude through the `sample` capability
  // =====================================================================
  let samplePromise = null;
  function getSample() {
    if (!samplePromise) {
      const c = window.claude;
      samplePromise = c && typeof c.use === 'function' ? c.use('sample').catch(() => null) : Promise.resolve(null);
    }
    return samplePromise;
  }
  const RULES = 'Ты — наставник курса «calm ass techno»: Ableton Live 12.4 для спокойной, органичной, мелодичной медленной электроники (примерно 90–118 BPM; зона между ambient и dub techno, organic house, downtempo и IDM). Референсы ученицы: ISHOME, Geju, миксы Delayed «Sundays are for…», Volodymyr Gnatenko, а ещё диджейские миксы: Abelle & Dasha Mamba и Ugetsu Monogatari из Mutabor, Discka на TESTFM, Joseph Tagliabue (psychedelic ambient, cosmic, slow trance), chillrave-сет reeto и ONNA на Deep House Moscow. Ученица начинает с нуля, работает в Live 12 Suite на ноутбуке с наушниками, MIDI-клавиатуры нет. ' +
    'Отвечай по-русски, тепло и по делу: 3–8 предложений или короткий нумерованный список шагов. Названия элементов, устройств и параметров Live пиши по-английски, как они подписаны в программе (Main, а не Master; Learn View, а не Help View; Settings, а не Preferences; Clip View и Device View, а не Detail View). Сочетания клавиш пиши словами, как подписано на клавишах Mac: Cmd + B, Option + Cmd + B, Shift + Tab. Объясняй через звук и конкретные действия в Live. ' +
    'Если не уверен в детали интерфейса или в факте о музыканте, честно скажи об этом и подскажи, где проверить (Info View, Learn View, руководство Live). Без таблиц и без длинных вступлений.';
  const ERR = {
    not_granted: 'Наставнику не разрешено отвечать на этой странице. Разрешение можно дать в меню артефакта.',
    sampling_disabled: 'Claude недоступен для этого аккаунта.',
    rate_limited: 'Слишком много вопросов подряд. Попробуй через минуту.',
    session_expired: 'Нужно заново войти в claude.ai.',
    refused: 'На этот вопрос наставник не ответит. Попробуй сформулировать иначе.',
    prompt_too_large: 'Вопрос получился слишком длинным. Сократи его.',
    upstream_error: 'Связь прервалась. Попробуй ещё раз.'
  };

  function Mentor(root, opts) {
    const box = h('section', { class: 'mentor', 'aria-label': 'Наставник' });
    const log = h('div', { class: 'mentor-log', 'aria-live': 'polite' });
    const ta = h('textarea', { id: 'mentor-input-' + (opts.key || 'g'), placeholder: 'Спроси про этот урок, про Ableton или про свой трек…', rows: '2' });
    const send = h('button', { class: 'btn primary', type: 'submit' }, 'Спросить');
    const stop = h('button', { class: 'btn ghost', type: 'button', hidden: true }, 'Стоп');
    const form = h('form', { class: 'mentor-form' }, ta, send, stop);
    const chips = h('div', { class: 'chips' });
    const turns = []; let ctl = null;
    box.append(h('div', { class: 'mentor-h' }, h('b', null, opts.title || 'Спросить наставника'), h('span', { class: 'label' }, 'Claude')), log, chips, form);
    root.append(box);

    function bubble(cls, text) { const m = h('div', { class: 'msg ' + cls }, text); log.append(m); log.scrollTop = log.scrollHeight; return m; }
    const clean = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^#+\s*/gm, '');

    getSample().then((sample) => {
      if (!sample) {
        bubble('ai', 'Наставник отвечает в опубликованной версии курса на claude.ai. Здесь он пока недоступен.');
        form.hidden = true; chips.hidden = true;
        return;
      }
      if (opts.intro) bubble('ai', opts.intro);
      (opts.suggest || []).forEach((q) => {
        const c = h('button', { class: 'chip', type: 'button' }, q);
        c.addEventListener('click', () => { ta.value = q; ask(sample); });
        chips.append(c);
      });
      form.addEventListener('submit', (e) => { e.preventDefault(); ask(sample); });
      ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(sample); } });
      stop.addEventListener('click', () => ctl && ctl.abort());
    });

    async function ask(sample) {
      const q = ta.value.trim();
      if (!q || ctl) return;
      ta.value = '';
      bubble('me', q);
      turns.push({ role: 'user', content: q });
      while (turns.length > 12) turns.splice(0, 2);
      const ans = bubble('ai thinking', 'Думаю…');
      ctl = new AbortController(); send.disabled = true; stop.hidden = false;
      try {
        const ctx = typeof opts.context === 'function' ? opts.context() : opts.context || '';
        const { text, truncated } = await sample([{ role: 'user', content: RULES + '\n\n' + ctx }].concat(turns), {
          cache: false, signal: ctl.signal,
          onText: ({ text: t }) => { ans.classList.remove('thinking'); ans.textContent = clean(t); log.scrollTop = log.scrollHeight; }
        });
        ans.classList.remove('thinking'); ans.textContent = clean(text) + (truncated ? '\n\n(Ответ оборвался. Задай вопрос по частям.)' : '');
        turns.push({ role: 'assistant', content: text });
      } catch (e) {
        ans.classList.remove('thinking');
        if (e && e.code === 'cancelled') { ans.textContent = e.text ? clean(e.text) : 'Остановлено.'; }
        else {
          ans.textContent = (e && e.text ? clean(e.text) + '\n\n' : '') + (ERR[e && e.code] || ERR.upstream_error);
          if (e && (e.code === 'not_granted' || e.code === 'sampling_disabled')) { form.hidden = true; chips.hidden = true; }
        }
        turns.pop();
      } finally { ctl = null; send.disabled = false; stop.hidden = true; }
    }
  }

  // =====================================================================
  // Views
  // =====================================================================
  const PLAY_SVG = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5l9.5 5.5L3 12.5z"/></svg>';
  function pageHead(title, sub, back) {
    return h('div', { class: 'page-head' }, back || null, h('h1', null, title), sub ? h('p', null, sub) : null);
  }
  const pad2 = (n) => String(n).padStart(2, '0');

  // Echo cover: one ring per finished lesson, emitted from two ping-pong sources like Live's Echo.
  let coverRAF = 0;
  function startCover(canvas, done) {
    cancelAnimationFrame(coverRAF);
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rings = 12 + done;
    let w = 0, ht = 0, dpr = 1, last = 0;
    function size() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(r.width * dpr)); ht = Math.max(1, Math.round(r.height * dpr));
      canvas.width = w; canvas.height = ht;
    }
    function draw(t) {
      if (!canvas.isConnected) return;
      if (Math.abs(canvas.getBoundingClientRect().width * dpr - w) > 1) size();
      if (t - last > 33 || !last) {
        last = t;
        ctx.clearRect(0, 0, w, ht);
        const s = Math.min(w, ht), step = s * 0.043;
        const src = [[0.35 * w, 0.6 * ht], [0.65 * w, 0.4 * ht]];
        ctx.lineWidth = 1.15 * dpr;
        for (let k = 0; k < rings; k++) {
          const [cx, cy] = src[k % 2];
          const breath = reduce ? 0 : Math.sin(t * 0.00035 + k * 0.55) * step * 0.12;
          const r = step * 0.9 + Math.floor(k / 2) * step + breath;
          const a = 0.9 * Math.pow(0.962, k);
          ctx.strokeStyle = `rgba(238,240,234,${a.toFixed(3)})`;
          ctx.beginPath(); ctx.arc(cx, cy, Math.max(1, r), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = '#E8A13A';
        src.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 3 * dpr, 0, Math.PI * 2); ctx.fill(); });
      }
      if (!reduce) coverRAF = requestAnimationFrame(draw);
    }
    size(); draw(0);
  }

  function renderCourse() {
    const nx = nextLesson(); const d = doneCount();
    const totalMin = LESSONS.reduce((a, x) => a + (x.l.minutes || 0), 0);
    const canvas = h('canvas');
    const cover = h('figure', { style: 'margin:0' },
      h('div', { class: 'cover', role: 'img', 'aria-label': `Обложка курса: колец эха ${12 + d}` }, canvas,
        h('div', { class: 'cover-cap' }, h('span', null, 'calm ass techno'), h('span', null, `${d} / ${LESSONS.length}`))),
      h('figcaption', { class: 'cover-note' }, 'Каждый пройденный урок добавляет на обложку ещё одно кольцо эха.'));

    const intro = h('div', null,
      h('h1', { class: 'wordmark-xl', html: 'calm ass<br>techno' }),
      h('p', { class: 'hero-sub' }, 'курс ableton live 12 для медленной, тёплой электроники'),
      h('p', { class: 'hero-text' }, `${MODS.length} модулей от первого запуска Ableton до трека на SoundCloud. Заранее ничего знать не нужно: ни нот, ни программы. По дороге научишься делать медленный ритм со свингом и тихими ударами между долями, короткие мелодии из трёх нот, эхо и пространство, как в даб-техно, и сводить трек так, чтобы бочка, бас и пэд не мешали друг другу. Ориентиры по звуку: ISHOME, Geju и воскресные миксы Delayed.`),
      h('div', { class: 'resume' },
        h('span', { class: 'label' }, nx ? (d ? 'Дальше по курсу' : 'Начать отсюда') : 'Курс пройден'),
        nx ? h('a', { class: 'resume-title', href: '#l-' + nx.l.id }, nx.l.title) : h('span', { class: 'resume-title' }, 'Все уроки пройдены. «Трек №1» готов, можно начинать второй.'),
        nx ? h('span', { class: 'muted', style: 'font-size:15px' }, `${nx.m.n}.${nx.k + 1} · ${nx.m.title} · ${nx.l.minutes} мин`) : null,
        h('div', { class: 'btn-row' },
          nx ? h('a', { class: 'btn primary', href: '#l-' + nx.l.id }, d ? 'Продолжить урок' : 'Начать первый урок') : null,
          h('a', { class: 'btn', href: '#trainers' }, 'Открыть тренажёры'),
          h('a', { class: 'btn ghost', href: '#beats' }, 'Послушать биты жанров →'))));

    const list = h('ol', { class: 'tracklist' });
    MODS.forEach((m) => {
      const mins = m.lessons.reduce((a, l) => a + (l.minutes || 0), 0);
      const isNow = nx && nx.m === m;
      const lessons = h('ol', { class: 'trk-lessons', hidden: !isNow, id: 'trk-' + m.id },
        m.lessons.map((l, k) => h('li', null, h('a', { href: '#l-' + l.id, class: Store.s.done[l.id] ? 'done' : null },
          h('span', { class: 'tl-n' }, Store.s.done[l.id] ? '✓' : `${m.n}.${k + 1}`), h('span', { class: 'tl-t' }, l.title), h('span', { class: 'tl-m' }, `${l.minutes} мин`)))));
      const row = h('button', { class: 'trk-row', type: 'button', 'aria-expanded': String(!!isNow), 'aria-controls': 'trk-' + m.id },
        h('span', { class: 'trk-n' }, pad2(m.n)),
        h('span', { class: 'trk-title' }, m.title),
        h('span', { class: 'trk-goal' }, m.goal || ''),
        h('span', { class: 'trk-dots', 'aria-label': `пройдено ${m.lessons.filter((l) => Store.s.done[l.id]).length} из ${m.lessons.length}` }, m.lessons.map((l) => h('i', { class: Store.s.done[l.id] ? 'on' : null }))),
        h('span', { class: 'trk-time' }, `${mins} мин`));
      row.addEventListener('click', () => { const open = lessons.hidden; lessons.hidden = !open; row.setAttribute('aria-expanded', String(open)); });
      list.append(h('li', { class: 'trk' + (isNow ? ' now' : '') }, row, lessons));
    });

    view.replaceChildren(
      h('section', { class: 'home-hero' }, cover, intro),
      h('section', { class: 'sec' },
        h('div', { class: 'sec-h' }, h('h2', null, 'трек-лист'), h('span', { class: 'mono muted', style: 'font-size:13px' }, `${MODS.length} модулей · ${LESSONS.length} уроков · около ${Math.round(totalMin / 60)} ч`)),
        MODS.length ? list : h('p', { class: 'empty' }, 'Уроки ещё загружаются.')),
      h('section', { class: 'colophon' },
        h('div', null, h('h3', null, 'Как идти по курсу'), h('p', null, 'Урок — это короткое объяснение и шаги «Сделай в Ableton» с галочками. Потом тренажёр, чтобы услышать идею в браузере, и домашка: с ней ты делаешь следующий шаг в своём «Треке №1». Это один трек, который растёт через весь курс: от пустого проекта до готового файла на SoundCloud.')),
        h('div', null, h('h3', null, 'Что понадобится'), h('p', null, 'Ableton Live 12 Suite: бесплатный триал на 30 дней даёт полную Suite, а для Standard и Intro в уроках есть замены. После триала сохранять и экспортировать нельзя, поэтому к концу месяца реши, какую редакцию брать. Наушники, которые не приукрашивают звук: студийные или обычные закрытые без усиленного баса. MIDI-клавиатура не нужна. Три–пять часов в неделю плюс по двадцать минут на маленький ежедневный набросок.')),
        h('div', null, h('h3', null, 'Если застряла'), h('p', null, (HAS_MENTOR ? 'Внизу каждого урока есть наставник: спроси его своими словами, он знает, где ты сейчас. ' : '') + 'Названия кнопок ищи во вкладке «интерфейс», незнакомые слова — в «словаре», а как звучат биты твоих жанров — во вкладке «ритмы». Прямо в Live подсказку по любой кнопке показывает Info View в левом нижнем углу окна.')),
        h('div', null, h('h3', null, 'Темп'), h('p', null, 'Один модуль в неделю — нормальный темп. На 30-дневном триале за месяц пройдёшь примерно четыре модуля, дальше понадобится купленная редакция. Регулярность важнее длинных сессий: двадцать минут каждый день дают больше, чем пять часов в воскресенье.'))));
    startCover(canvas, d);
  }

  const NOTE_TYPES = { tip: 'Совет', warn: 'Частая ошибка', ear: 'Послушай', edition: 'Нет Suite?' };
  function noteEl(b) {
    return h('aside', { class: 'note ' + b.type }, h('span', { class: 'note-k' }, b.title || NOTE_TYPES[b.type]), h('div', { html: safeHtml(b.html) }));
  }
  function renderBlock(b, lid, bi) {
    switch (b.type) {
      case 'text': return h('div', { class: 'prose', html: safeHtml(b.html) });
      case 'tip': case 'warn': case 'ear': case 'edition': return noteEl(b);
      case 'steps': {
        const key = lid + ':' + bi + ':v2'; // v2: steps were rewritten with reasons, older ticks no longer line up
        const arr = Store.s.steps[key] || [];
        const ol = h('ol', { class: 'steps' });
        (b.items || []).forEach((it, i) => {
          const id = `st-${lid}-${bi}-${i}`;
          const cb = h('input', { type: 'checkbox', id, checked: arr[i] ? true : null });
          const doHtml = typeof it === 'string' ? it : it.do;
          const label = h('label', { for: id }, h('span', { html: safeHtml(doHtml) }), typeof it === 'object' && it.why ? h('span', { class: 'step-why' }, it.why) : null);
          const li = h('li', { class: arr[i] ? 'is-done' : '' }, h('span', { class: 'n', 'aria-hidden': 'true' }, String(i + 1)), cb, label);
          cb.addEventListener('change', () => { const a = Store.s.steps[key] || []; a[i] = cb.checked; Store.s.steps[key] = a; li.classList.toggle('is-done', cb.checked); Store.save(); });
          ol.append(li);
        });
        return h('div', null, h('div', { class: 'kicker' }, b.title || 'Сделай в Ableton'),
          b.why ? h('p', { class: 'steps-why' }, h('b', null, 'Зачем. '), b.why) : null, ol);
      }
      case 'listen':
        return h('div', null, h('div', { class: 'kicker' }, b.title || 'Послушать'),
          h('div', { class: 'listen' }, (b.items || []).map((it) => h('div', { class: 'listen-item' },
            h('div', { class: 'who' }, h('b', null, it.artist), it.title ? ' — ' + it.title : ''),
            it.url && /^https:\/\//.test(it.url) ? h('a', { class: 'ext', href: it.url, target: '_blank', rel: 'noopener' }, 'слушать ↗') : h('span'),
            it.note ? h('p', null, it.note) : null))));
      case 'recipe': return recipeEl(b);
      case 'keys':
        return h('div', { class: 'tbl-wrap' }, h('table', { class: 'kb-table' }, h('tbody', null, (b.items || []).map(([k, a]) => h('tr', null, h('td', null, kbdEl(k)), h('td', null, a))))));
      case 'trainer': {
        const t = window.Trainers.list.find((x) => x.id === b.id);
        if (!t) return null;
        const href = t.href || ('#t-' + t.id + (b.task != null ? '.' + b.task : ''));
        return h('div', { class: 'tlink' }, h('span', { class: 'tlink-ic', html: PLAY_SVG }),
          h('div', { style: 'min-width:0' }, h('b', null, 'Тренажёр «' + t.title.toLowerCase() + '»'), h('p', null, b.text || t.desc)),
          h('a', { class: 'btn', href }, 'Открыть'));
      }
      case 'ui': {
        const wrapEl = h('div', null, b.text ? h('p', { class: 'muted', style: 'margin:0 0 10px;font-size:15.5px' }, b.text) : null);
        const holder = h('div');
        wrapEl.append(holder);
        window.UIMap.mount(holder, { view: b.view || 'session', bottom: b.bottom || 'clip', focus: b.focus || [] });
        return wrapEl;
      }
      case 'quiz': return h('div', null, h('div', { class: 'kicker' }, 'Проверь себя'), quizEl(b, lid));
      default: return null;
    }
  }
  function kbdEl(k) { return String(k).split(' / ').map((part, i) => [i ? ' или ' : '', h('kbd', null, part)]); }
  function recipeEl(r) {
    const chain = h('div', { class: 'chain' });
    (r.chain || []).forEach((d, i) => {
      if (i) chain.append(h('span', { class: 'chain-arrow', 'aria-hidden': 'true' }, '→'));
      chain.append(h('div', { class: 'dev' }, h('div', { class: 'dev-h' }, d.device),
        h('div', { class: 'dev-b' }, (d.params || []).map(([k, v]) => h('div', { class: 'dev-p' }, h('span', null, k), h('span', null, v))), d.note ? h('div', { class: 'dev-note' }, d.note) : null)));
    });
    return h('div', null,
      h('div', { class: 'recipe-t' }, h('span', { class: 'label' }, 'Цепочка устройств'), r.title ? h('b', null, r.title) : null),
      r.use ? h('p', { class: 'recipe-p', style: 'margin:0 0 10px' }, r.use) : null,
      h('div', { class: 'chain-wrap' }, chain),
      r.note || r.notes ? h('p', { class: 'recipe-p' }, r.note || r.notes) : null,
      r.edition ? h('p', { class: 'recipe-p' }, h('span', { class: 'note-k', style: 'display:inline;color:var(--sodium-ink)' }, 'Нет Suite? '), r.edition) : null);
  }
  function quizEl(b, lid) {
    const wrapEl = h('div', { class: 'quiz' });
    const res = { right: 0, answered: 0, total: (b.questions || []).length };
    (b.questions || []).forEach((q, qi) => {
      const ex = h('div', { class: 'q-ex', hidden: true });
      const optsEl = h('div', { class: 'q-opts' });
      let done = false;
      q.options.forEach((o, oi) => {
        const btn = h('button', { class: 'q-opt', type: 'button' }, o);
        btn.addEventListener('click', () => {
          if (done) return; done = true; res.answered++;
          const ok = oi === q.answer; if (ok) res.right++;
          btn.classList.add(ok ? 'right' : 'wrong');
          if (!ok && optsEl.children[q.answer]) optsEl.children[q.answer].classList.add('right');
          ex.hidden = false; ex.textContent = (ok ? 'Верно. ' : 'Не совсем. ') + (q.explain || '');
          if (res.answered === res.total) {
            const prev = Store.s.quiz[lid];
            if (!prev || res.right >= prev.right) Store.s.quiz[lid] = { right: res.right, total: res.total };
            Store.save();
          }
        });
        optsEl.append(btn);
      });
      wrapEl.append(h('div', { class: 'q' }, h('div', { class: 'q-t' }, `${qi + 1}. ${q.q}`), optsEl, ex));
    });
    return wrapEl;
  }

  function renderLesson(id) {
    const x = byId[id];
    if (!x) { view.replaceChildren(h('p', { class: 'empty' }, 'Такого урока нет. ', h('a', { href: '#course' }, 'Вернуться к трек-листу'))); return; }
    const { m, l, k } = x;
    if (Store.s.last !== id) { Store.s.last = id; Store.save(); }
    const idx = LESSONS.indexOf(x); const prev = LESSONS[idx - 1]; const next = LESSONS[idx + 1];

    const toc = h('nav', { class: 'toc', 'aria-label': 'Уроки модуля' },
      h('div', { class: 'toc-mod' }, `модуль ${m.n} из ${MODS.length}`),
      h('div', { class: 'toc-title' }, m.title),
      h('ol', null, m.lessons.map((ll, kk) => h('li', null, h('a', { href: '#l-' + ll.id, class: Store.s.done[ll.id] ? 'done' : null, 'aria-current': ll.id === id ? 'page' : null },
        h('span', { class: 'n' }, Store.s.done[ll.id] ? '✓' : `${m.n}.${kk + 1}`), h('span', null, ll.title))))),
      m.draft ? h('p', { class: 'toc-draft' }, h('b', null, 'Трек №1'), m.draft) : null,
      h('div', { class: 'toc-mods', 'aria-label': 'Все модули' }, MODS.map((mm) => h('a', { href: '#l-' + mm.lessons[0].id, 'aria-current': mm === m ? 'true' : null, title: mm.title }, pad2(mm.n)))));

    const art = h('article', { class: 'lesson' },
      h('div', { class: 'l-meta' }, `${m.n}.${k + 1} · ${l.minutes} мин`),
      h('h1', null, l.title),
      l.lead ? h('p', { class: 'lead' }, l.lead) : null);
    let row = null;
    const newRow = (wide) => { const main = h('div', { style: 'min-width:0' }); const side = h('div', { class: 'row-side' }); const el = h('div', { class: 'row' + (wide ? ' wide' : '') }, main, side); art.append(el); return { main, side }; };
    (l.blocks || []).forEach((b, bi) => {
      if (NOTE_TYPES[b.type]) { (row || (row = newRow(false))).side.append(noteEl(b)); return; }
      const el = renderBlock(b, id, bi); if (!el) return;
      row = newRow(b.type === 'ui' || b.type === 'recipe');
      row.main.append(el);
    });
    if (l.homework) art.append(h('section', { class: 'homework' }, h('h3', null, 'домашка'), h('div', { class: 'prose', html: safeHtml(l.homework) })));

    const notesId = 'notes-' + id;
    const notes = h('textarea', { id: notesId, placeholder: 'Что получилось, что нет, какие пресеты понравились…' });
    notes.value = Store.s.notes[id] || '';
    let nt = null;
    notes.addEventListener('input', () => { clearTimeout(nt); nt = setTimeout(() => { Store.s.notes[id] = notes.value; Store.save(); }, 600); });
    art.append(h('div', { class: 'notes' }, h('label', { class: 'label', for: notesId }, 'Мои заметки к уроку'), notes));

    const lessonText = () => [l.title, l.lead].concat((l.blocks || []).map((b) => {
      if (b.html) return strip(b.html);
      if (b.items && b.type === 'steps') return (b.why ? 'Зачем: ' + b.why + ' ' : '') + b.items.map((it) => strip(typeof it === 'string' ? it : it.do + ' (' + (it.why || '') + ')')).join(' ');
      if (b.type === 'recipe') return (b.title || '') + ': ' + (b.chain || []).map((d) => d.device + ' ' + (d.params || []).map((p) => p.join(' ')).join(', ')).join(' → ');
      return '';
    })).join('\n').slice(0, 7000);
    if (HAS_MENTOR) Mentor(art, {
      key: id, title: 'спросить наставника',
      suggest: (l.ask && l.ask.length ? l.ask : ['Объясни этот урок проще', 'Что здесь самое важное для моего жанра?']).slice(0, 3),
      context: () => `Сейчас ученица проходит модуль ${m.n} «${m.title}», урок «${l.title}». Текст урока:\n${lessonText()}`
    });

    const doneBtn = h('button', { class: 'btn ' + (Store.s.done[id] ? '' : 'primary'), type: 'button' }, Store.s.done[id] ? '✓ Урок пройден' : 'Отметить пройденным');
    doneBtn.addEventListener('click', () => {
      if (Store.s.done[id]) delete Store.s.done[id]; else Store.s.done[id] = Date.now();
      Store.save();
      if (Store.s.done[id] && next) { toast('Урок пройден'); location.hash = '#l-' + next.l.id; } else route(true);
    });
    art.append(h('div', { class: 'lesson-foot' },
      prev ? h('a', { href: '#l-' + prev.l.id }, '← ' + prev.l.title) : h('span'),
      doneBtn,
      next ? h('a', { class: 'nx', href: '#l-' + next.l.id }, next.l.title + ' →') : h('span')));

    view.replaceChildren(h('div', { class: 'lesson-wrap' }, toc, art));
  }

  function trainerStat(t) {
    const s = Store.s.tr[t.id];
    if (!s) return 'ещё не открыт';
    if (s.solved && s.solved.length) return `заданий решено: ${s.solved.length}`;
    if (s.best) return `лучший результат ${s.best}%`;
    if (s.known) return `запомнено карточек: ${s.known}`;
    if (s.seen && s.seen.length) return `изучено элементов: ${s.seen.length}`;
    if (s.last) return `последний раз ${s.last.score} из ${s.last.total}`;
    return 'открыт';
  }
  function renderTrainers() {
    view.replaceChildren(pageHead('тренажёры', 'Звук включается кнопкой ▶ или пробелом, лучше в наушниках. Ручки и названия здесь те же, что в Ableton.'),
      h('ol', { class: 'inst-list' }, window.Trainers.list.map((t) => h('li', null, h('a', { class: 'inst', href: t.href || '#t-' + t.id },
        h('span', { class: 'inst-name' }, t.title), h('p', null, t.desc), h('span', { class: 'inst-stat' }, trainerStat(t)), h('span', { class: 'inst-go', 'aria-hidden': 'true' }, '→'))))));
  }
  function renderTrainer(id, arg) {
    const t = window.Trainers.list.find((x) => x.id === id);
    if (!t || t.href) { location.hash = t && t.href ? t.href : '#trainers'; return; }
    const holder = h('div', { class: 'trainer' });
    view.replaceChildren(pageHead(t.title, t.desc, h('a', { href: '#trainers', class: 'back' }, '← все тренажёры')), holder);
    window.Trainers.mount(holder, id, arg);
  }
  function renderMap(mode) {
    const holder = h('div');
    view.replaceChildren(pageHead('интерфейс', 'Упрощённое окно Ableton Live 12.4. Наведи курсор, чтобы увидеть название, щёлкни, чтобы прочитать подробности. В режимах «Найди» и «Назови» проверь себя.'), holder);
    window.UIMap.mount(holder, { full: true, mode: mode === 'quiz' ? 'find' : 'explore' });
  }

  function subnav(tabs, cur, onPick) {
    const bar = h('div', { class: 'subnav', role: 'group', 'aria-label': 'Раздел' });
    tabs.forEach(([k, t]) => { const b = h('button', { type: 'button', 'aria-pressed': String(k === cur) }, t); b.addEventListener('click', () => onPick(k)); bar.append(b); });
    return bar;
  }
  function listenRow(it) {
    return h('div', { class: 'listen-item' },
      h('div', { class: 'who' }, h('b', null, it.artist), it.work ? ' — ' + it.work : ''),
      it.url && /^https:\/\//.test(it.url) ? h('a', { class: 'ext', href: it.url, target: '_blank', rel: 'noopener' }, 'слушать ↗') : h('span'),
      it.listen ? h('p', null, it.listen) : null);
  }


  // Rhythm atlas: genre beats and rhythm words as step grids you can play or open in the drum machine.
  function miniGrid(p) {
    const T = window.Trainers;
    const rows = T.DRUM_ROWS.filter((r) => (p.rows || {})[r.id] && /[xXg?]/.test(p.rows[r.id]));
    const cols = Array.from({ length: 16 }, () => []);
    const grid = h('div', { class: 'mg', role: 'img', 'aria-label': 'Сетка ритма: ' + rows.map((r) => r.ru).join(', ') });
    rows.forEach((r) => {
      const row = h('div', { class: 'mg-row' }, h('span', { class: 'mg-name', title: r.name }, r.ru));
      T.parsePattern(p.rows[r.id]).forEach((c, i) => {
        const el = h('i', { class: 'mg-c' + (i % 4 === 0 ? ' down' : '') + (c ? ' on' + (c.v === 2 ? ' acc' : c.v === 3 ? ' soft' : '') + (c.p < 100 ? ' prob' : '') : '') });
        cols[i].push(el); row.append(el);
      });
      grid.append(row);
    });
    grid.setNow = (s) => { cols.forEach((col) => col.forEach((e) => e.classList.remove('now'))); if (s >= 0) cols[s % 16].forEach((e) => e.classList.add('now')); };
    return grid;
  }
  function beatPlayButton(p, grid) {
    const b = h('button', { class: 'btn sm', type: 'button', 'aria-pressed': 'false' }, '▶ Слушать');
    const reset = () => { b.setAttribute('aria-pressed', 'false'); b.textContent = '▶ Слушать'; grid.setNow(-1); };
    b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') { window.Trainers.stopPreview(); return; }
      Snd.ensure();
      window.Trainers.previewPattern(p, (s) => grid.setNow(s), reset);
      b.setAttribute('aria-pressed', 'true'); b.textContent = '■ Стоп';
    });
    return b;
  }
  function renderBeats(anchor) {
    const T = window.Trainers;
    const list = h('div', { class: 'beat-list' });
    Object.keys(T.GROOVES).filter((k) => T.GROOVES[k].title).forEach((k) => {
      const g = T.GROOVES[k]; const grid = miniGrid(g);
      list.append(h('section', { class: 'beat-card', id: 'beat-' + k },
        h('div', { style: 'min-width:0' },
          h('h2', null, g.title),
          h('div', { class: 'beat-meta mono' }, `${g.range} BPM · пример на ${g.bpm} · свинг ${Math.round(g.swing * 100)} %` + (g.rumble ? ' · rumble' : '')),
          h('ul', { class: 'beat-traits' }, g.traits.map((t) => h('li', null, t))),
          h('p', { class: 'beat-where' }, 'Где слышно: ', g.where),
          h('div', { class: 'btn-row' }, beatPlayButton(g, grid), h('a', { class: 'btn sm ghost', href: '#t-groove.' + k }, 'Открыть в драм-машине →'))),
        h('div', { class: 'mg-wrap' }, grid)));
    });
    const terms = h('div', { class: 'term-list' });
    T.TERMS.forEach((t) => {
      const grid = miniGrid(t);
      terms.append(h('section', { class: 'term-card', id: 'beat-' + t.id },
        h('h3', null, t.title, h('span', null, t.ru)), h('p', null, t.text), h('div', { class: 'mg-wrap' }, grid),
        h('div', { class: 'btn-row' }, beatPlayButton(t, grid), h('span', { class: 'mono muted', style: 'font-size:12.5px' }, `${t.bpm} BPM` + (t.swing ? ` · свинг ${Math.round(t.swing * 100)} %` : '')))));
    });
    const legend = h('div', { class: 'mg-legend', 'aria-hidden': 'true' },
      h('span', null, h('i', { class: 'mg-c on' }), 'удар'), h('span', null, h('i', { class: 'mg-c on acc' }), 'акцент'),
      h('span', null, h('i', { class: 'mg-c on soft' }), 'тихий «призрак»'), h('span', null, h('i', { class: 'mg-c on prob' }), 'звучит через раз'),
      h('span', null, h('i', { class: 'mg-c down' }), 'начало доли'));
    view.replaceChildren(
      pageHead('ритмы', 'Как выглядят и звучат биты твоих жанров. Каждая строка — один инструмент, 16 клеток — один такт, выделенные столбцы — четыре доли. Нажми ▶, чтобы услышать, или открой бит в драм-машине и меняй сама.'),
      legend,
      h('section', null, h('div', { class: 'sec-h' }, h('h2', null, 'биты жанров'), h('span', { class: 'mono muted', style: 'font-size:13px' }, 'темп у бита — ориентир, а не правило')), list),
      h('section', { class: 'sec' }, h('div', { class: 'sec-h' }, h('h2', null, 'слова ритма'), h('span', { class: 'mono muted', style: 'font-size:13px' }, 'как это называется')), terms));
    if (anchor) {
      const el = document.getElementById('beat-' + anchor);
      if (el) requestAnimationFrame(() => { el.scrollIntoView({ block: 'start' }); el.classList.add('hl'); setTimeout(() => el.classList.remove('hl'), 2400); });
    }
  }

  let soundTab = 'listen';
  function renderSound() {
    const body = h('div');
    if (soundTab === 'listen') {
      const items = REF.listening || [];
      const groups = Array.from(new Set(items.map((i) => i.group || 'Слушать')));
      if (!items.length) body.append(h('p', { class: 'empty' }, 'Список прослушивания скоро появится.'));
      groups.forEach((g, gi) => body.append(h('section', { style: gi ? 'margin-top:48px' : null },
        h('div', { class: 'sec-h' }, h('h2', null, g)), h('div', { class: 'listen' }, items.filter((i) => (i.group || 'Слушать') === g).map(listenRow)))));
    } else if (soundTab === 'recipes') {
      const rs = REF.recipes || [];
      if (!rs.length) body.append(h('p', { class: 'empty' }, 'Рецепты скоро появятся.'));
      rs.forEach((r, i) => body.append(h('section', { style: i ? 'margin-top:44px' : null }, recipeEl(r))));
    } else if (soundTab === 'tempos') {
      const ts = REF.tempos || [], ed = REF.editions || [];
      body.append(h('section', null, h('div', { class: 'sec-h' }, h('h2', null, 'темпы нашей зоны')),
        h('div', { class: 'tbl-wrap' }, h('table', { class: 'kb-table' }, h('tbody', null, ts.map((t) => h('tr', null, h('td', null, t.style), h('td', { class: 'mono' }, t.bpm + ' BPM'), h('td', { class: 'muted' }, t.feel))))))));
      const yes = (v) => (v ? '●' : '·');
      body.append(h('section', { style: 'margin-top:56px' }, h('div', { class: 'sec-h' }, h('h2', null, 'intro, standard или suite')),
        h('div', { class: 'tbl-wrap' }, h('table', { class: 'kb-table' },
          h('thead', null, h('tr', null, ['Устройство', 'Тип', 'Intro', 'Standard', 'Suite', 'Чем заменить'].map((x) => h('td', null, x)))),
          h('tbody', null, ed.map((d) => h('tr', null, h('td', null, d.device), h('td', { class: 'muted' }, d.kind), h('td', { class: 'mono' }, yes(d.intro)), h('td', { class: 'mono' }, yes(d.standard)), h('td', { class: 'mono' }, yes(d.suite)), h('td', { class: 'muted' }, d.alt || ''))))))));
    } else {
      body.append(h('div', { class: 'listen' }, (REF.resources || []).map((r) => h('div', { class: 'listen-item' },
        h('div', { class: 'who' }, h('b', null, r.title)),
        r.url && /^https:\/\//.test(r.url) ? h('a', { class: 'ext', href: r.url, target: '_blank', rel: 'noopener' }, 'открыть ↗') : h('span'),
        r.what ? h('p', null, r.what) : null))));
    }
    view.replaceChildren(pageHead('звук', 'Что слушать, какие цепочки устройств ставить и в каком темпе работать. Значения в рецептах — точка старта, дальше решают уши.'),
      subnav([['listen', 'Слушать'], ['recipes', 'Рецепты'], ['tempos', 'Темпы и редакции'], ['resources', 'Где учиться дальше']], soundTab, (k) => { soundTab = k; renderSound(); }), body);
  }

  const BEAT_TERMS = { 'Four-on-the-floor': 't-four', 'Offbeat': 't-offbeat', 'Ghost note': 't-ghost', 'Swing': 't-swing', 'Syncopation': 't-sync', 'Half-time': 't-halftime', 'Polymeter': 't-poly' };
  let glTab = 'terms', glQuery = '';
  function renderGlossary() {
    const search = h('input', { class: 'search', id: 'gl-search', type: 'search', placeholder: glTab === 'terms' ? 'warp, send, chance…' : 'действие или клавиша…', value: glQuery, 'aria-label': 'Поиск' });
    const list = h('div');
    function draw() {
      const q = glQuery.toLowerCase().replace(/\s*\+\s*/g, ' ').trim();
      if (glTab === 'terms') {
        const items = (REF.glossary || []).filter((g) => !q || (g.term + ' ' + g.ru + ' ' + g.def + ' ' + (g.cat || '')).toLowerCase().replace(/\s*\+\s*/g, ' ').includes(q))
          .slice().sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
        if (!items.length) { list.replaceChildren(h('p', { class: 'empty' }, 'Ничего не нашлось. Попробуй английское название из Live или русское слово.')); return; }
        const dict = h('div', { class: 'dict' });
        let letter = '';
        items.forEach((g) => {
          const L = g.term.charAt(0).toUpperCase();
          if (L !== letter) { letter = L; dict.append(h('div', { class: 'dict-letter', 'aria-hidden': 'true' }, L)); }
          const beat = BEAT_TERMS[g.term];
          dict.append(h('dl', { class: 'dict-e', style: 'margin:0' }, h('dt', null, g.term, h('span', null, g.ru)), h('dd', null, g.def, beat ? h('a', { class: 'ext', href: '#beats.' + beat, style: 'display:block;margin-top:4px' }, 'послушать во вкладке «ритмы» →') : null, g.cat ? h('span', { class: 'cat' }, g.cat) : null)));
        });
        list.replaceChildren(dict);
      } else {
        const items = (REF.shortcuts || []).filter((s) => !q || (s.keys + ' ' + keyWords(s.keys) + ' ' + s.action + ' ' + (s.cat || '') + ' ' + (s.note || '')).toLowerCase().replace(/\s*\+\s*/g, ' ').includes(q));
        const cats = Array.from(new Set(items.map((s) => s.cat || 'Разное')));
        list.replaceChildren(...cats.map((c, ci) => h('section', { style: 'margin-top:' + (ci ? 44 : 24) + 'px' }, h('div', { class: 'sec-h' }, h('h2', null, c)),
          h('div', { class: 'tbl-wrap' }, h('table', { class: 'kb-table' }, h('tbody', null, items.filter((s) => (s.cat || 'Разное') === c).map((s) => h('tr', null, h('td', null, kbdEl(s.keys)), h('td', null, s.action, s.note ? h('div', { class: 'muted', style: 'font-size:13.5px' }, s.note) : null)))))))),
        h('p', { class: 'muted', style: 'margin-top:24px' }, 'Запоминать удобнее карточками: ', h('a', { href: '#t-keys' }, 'тренажёр «горячие клавиши»'), '.'));
      }
    }
    search.addEventListener('input', () => { glQuery = search.value; draw(); });
    view.replaceChildren(pageHead('словарь', 'Все названия так, как они подписаны в Live 12.4, и объяснение по-русски.'),
      subnav([['terms', 'Термины'], ['keys', 'Горячие клавиши']], glTab, (k) => { glTab = k; renderGlossary(); }), search, list);
    draw();
  }

  function renderMentor() {
    const holder = h('div');
    view.replaceChildren(pageHead('наставник', 'Спрашивай про Ableton, звук и свой трек своими словами. Наставник — это Claude: он знает программу курса и где ты сейчас. Ответы тратят лимит твоего аккаунта Claude.'), holder);
    Mentor(holder, {
      key: 'global', title: 'разговор',
      intro: 'Привет! Расскажи, что сейчас делаешь в Ableton или что не получается, и разберёмся по шагам.',
      suggest: ['Почему мой трек звучит плоско?', 'Придумай мне задание на 20 минут', 'Как сделать мотив, который не надоедает?', 'Чем Geju отличается от даб-техно?'],
      context: () => {
        const done = LESSONS.filter((x) => Store.s.done[x.l.id]).map((x) => `${x.m.n}.${x.k + 1} ${x.l.title}`);
        const last = Store.s.last && byId[Store.s.last] ? byId[Store.s.last].l.title : 'ещё не начинала';
        return `Программа курса: ${MODS.map((m) => `${m.n}. ${m.title}`).join('; ')}.\nПройдено уроков: ${done.length} из ${LESSONS.length}${done.length ? ' (' + done.slice(-8).join('; ') + ')' : ''}. Последний открытый урок: ${last}.`;
      }
    });
  }

  // =====================================================================
  // Channel invite: shown once; "later" asks again in three days. The answer stays in this browser.
  // =====================================================================
  const CHANNEL = 'https://t.me/ladavibecodit';
  function shouldAskSub() {
    const sub = Store.s.sub;
    if (!sub) return true;
    if (sub.state === 'yes') return false;
    return Date.now() - (sub.at || 0) > 3 * 864e5;
  }
  function ringsSvg() {
    const src = [[180, 92], [300, 58]];
    let out = '<svg viewBox="0 0 480 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    for (let k = 0; k < 20; k++) {
      const [cx, cy] = src[k % 2];
      const r = 12 + Math.floor(k / 2) * 13;
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(238,240,234,${(0.9 * Math.pow(0.955, k)).toFixed(3)})" stroke-width="1.1"/>`;
    }
    src.forEach(([x, y]) => { out += `<circle cx="${x}" cy="${y}" r="3" fill="#E8A13A"/>`; });
    return out + '</svg>';
  }
  function askSub() {
    if (!shouldAskSub() || document.querySelector('.sub-dialog')) return;
    const go = h('a', { class: 'btn primary', href: CHANNEL, target: '_blank', rel: 'noopener' }, 'Открыть канал в Telegram ↗');
    const later = h('button', { class: 'btn ghost', type: 'button' }, 'Позже');
    const dlg = h('dialog', { class: 'sub-dialog', 'aria-labelledby': 'sub-title' },
      h('div', { class: 'sub-band', html: ringsSvg() }, h('span', { class: 'sub-cap' }, 't.me/ladavibecodit')),
      h('div', { class: 'sub-body' },
        h('h2', { id: 'sub-title' }, 'подпишись на канал'),
        h('p', null, 'Курс собрала Лада Орлова. Если хочешь поддержать курс, подпишись на её телеграм-канал.'),
        h('div', { class: 'btn-row' }, go, later)));
    let answered = false;
    function finish(state) {
      if (answered) return;
      answered = true;
      Store.s.sub = { state, at: Date.now() };
      Store.save();
      if (dlg.open) dlg.close();
      setTimeout(() => dlg.remove(), 0); // after the link has opened the channel
    }
    go.addEventListener('click', () => finish('yes'));
    later.addEventListener('click', () => finish('later'));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) finish('later'); }); // click on the dimmed backdrop
    dlg.addEventListener('cancel', () => finish('later')); // Esc
    dlg.addEventListener('close', () => finish('later'));
    document.body.append(dlg);
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.remove();
  }

  // =====================================================================
  // Shortcuts: Mac symbols become the words printed on the keys, one box per key with "+"
  // between; a comma or full stop also shows the Russian letter on the same key.
  // =====================================================================
  const KEY_LABEL = { '⌘': 'Cmd', '⌥': 'Option', '⇧': 'Shift', '⌃': 'Control' };
  const RU_KEY = { ',': 'Б', '.': 'Ю', ';': 'Ж', "'": 'Э', '[': 'Х', ']': 'Ъ' };
  const QWERTY = 'QWERTYUIOPASDFGHJKLZXCVBNM', YCUKEN = 'ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ';
  const KEY_GROUPS = /\s+(…|\/|или)\s+(?=\S)/;
  function keyWord(k) {
    if (KEY_LABEL[k]) return KEY_LABEL[k];
    if (RU_KEY[k]) return `${k} (на русской раскладке — ${RU_KEY[k]})`;
    if (k === '?' || k === '/') return `${k} (клавиша слева от правого Shift)`;
    const i = k.length === 1 ? QWERTY.indexOf(k) : -1;
    return i >= 0 ? `${k} (на русской раскладке — ${YCUKEN[i]})` : k;
  }
  function keyWords(text) {
    return String(text).trim().split(KEY_GROUPS).map((g, i) => (i % 2 ? g : g.split(/\s+/).filter(Boolean).map(keyWord).join(' + '))).join(' ');
  }
  function comboEl(text) {
    const wrap = h('span', { class: 'kc', title: keyWords(text) });
    String(text).trim().split(KEY_GROUPS).forEach((g, gi) => {
      if (gi % 2) { wrap.append(` ${g} `); return; }
      g.split(/\s+/).filter(Boolean).forEach((t, i) => {
        if (i) wrap.append(h('span', { class: 'kp', 'aria-hidden': 'true' }, '+'));
        wrap.append(h('kbd', { 'data-k': '' }, KEY_LABEL[t] || t, RU_KEY[t] ? h('span', { class: 'kru' }, RU_KEY[t]) : null));
      });
    });
    return wrap;
  }
  function upgradeKeys(root) {
    const list = root.matches && root.matches('kbd:not([data-k])') ? [root] : Array.from(root.querySelectorAll('kbd:not([data-k])'));
    list.forEach((k) => { if (k.parentNode) k.replaceWith(comboEl(k.textContent)); });
  }
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) upgradeKeys(n); })))
    .observe(document.body, { childList: true, subtree: true });

  // =====================================================================
  // Router
  // =====================================================================
  let lastHash = null;
  function route(force) {
    const hash = (location.hash || '#course').slice(1);
    if (!force && hash === lastHash) return;
    const sameView = hash === lastHash;
    lastHash = hash;
    window.Trainers.unmount();
    let tab = 'course';
    if (hash.startsWith('l-')) { renderLesson(hash.slice(2)); tab = 'course'; }
    else if (hash.startsWith('t-')) { const [id, arg] = hash.slice(2).split('.'); renderTrainer(id, arg); tab = 'trainers'; }
    else if (hash.startsWith('map')) { renderMap(hash.split('.')[1]); tab = 'map'; }
    else if (hash.startsWith('beats')) { renderBeats(hash.split('.')[1]); tab = 'beats'; }
    else if (hash === 'trainers') { renderTrainers(); tab = 'trainers'; }
    else if (hash === 'sound') { renderSound(); tab = 'sound'; }
    else if (hash === 'glossary') { renderGlossary(); tab = 'glossary'; }
    else if (hash === 'mentor' && HAS_MENTOR) { renderMentor(); tab = 'mentor'; }
    else { renderCourse(); tab = 'course'; }
    document.querySelectorAll('#tabs .tab').forEach((a) => { if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (!sameView) { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
  }

  // Theme: fog (day) by default, night on request; the choice is remembered in this browser.
  const themeBtn = document.getElementById('theme-btn');
  function paintThemeBtn() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = dark ? 'день' : 'ночь';
    themeBtn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
  }
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('tihiy-hod-theme', next); } catch (e) { /* storage unavailable */ }
    paintThemeBtn();
  });
  paintThemeBtn();
  if (!HAS_MENTOR) { const t = document.querySelector('#tabs [data-tab="mentor"]'); if (t) t.remove(); }

  // Footer donation line: two jokes take turns, a new one on every visit.
  (function () {
    const TIPS = [
      ['Курс бесплатный и таким останется. А автор радуется монетам, как хэт — свингу: ', 'закинуть\u00a0↗'],
      ['Курс бесплатный. А порадовать автора — бесценно: ', 'закинуть монет\u00a0↗']
    ];
    const lead = document.getElementById('tip-lead'), link = document.getElementById('tip-link');
    if (!lead || !link) return;
    let n = Math.floor(Math.random() * TIPS.length);
    try { n = Number(localStorage.getItem('tihiy-hod-tip')) || 0; localStorage.setItem('tihiy-hod-tip', String((n + 1) % TIPS.length)); } catch (e) { /* storage unavailable: pick at random */ }
    const [a, b] = TIPS[n % TIPS.length];
    lead.textContent = a; link.textContent = b;
  })();

  Store.load();
  updateLcd();
  window.addEventListener('hashchange', () => route());
  route(true);
  // On claude.ai the saved answer arrives with the viewer's progress, so ask only after it loads.
  Store.connect().then(() => setTimeout(askSub, 900));
})();
