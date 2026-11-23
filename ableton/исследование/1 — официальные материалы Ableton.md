# 01. Официальная экосистема Ableton: версия, редакции, мануал, обучающие ресурсы

Дата сбора: 19.10.2026. Источники: только официальные ресурсы Ableton (ableton.com, help.ableton.com через публичный Zendesk API, Live 12 Reference Manual, learningmusic / learningsynths / makingmusic / learn.ableton.com, официальный YouTube-канал Ableton). У каждого факта указан URL. Если что-то не удалось проверить на официальном источнике, это помечено **«не проверено»**.

Примечание о методе. Страницы help.ableton.com/hc/... отдают 403 для автоматических запросов. Поэтому статьи базы знаний читались через публичный API `help.ableton.com/api/v2/help_center/en-us/articles/<id>.json`. В тексте даны обычные человекочитаемые URL этих статей.

---

## 1. Текущая версия Live и что менялось

### 1.1. Актуальная версия на 19.10.2026

- **Стабильный релиз: Live 12.4.6 от 15.09.2026.** Исправляет только баг (зависание при рендере, bounce или consolidate). Источник: https://www.ableton.com/en/release-notes/live-12/
- **Публичная бета: 12.4.15b7 от 15.10.2026.** Источник: https://www.ableton.com/en/release-notes/live-12-beta/
- **Live 13 официально не анонсирован.** На ableton.com, в блоге и в release notes его нет. Источники: https://www.ableton.com/en/live/ (страница продукта называет текущей версией «Live 12.4»), https://www.ableton.com/en/release-notes/live-12/
- Сейчас в бете тестируется **Extensions SDK**: свои расширения Live на JavaScript/TypeScript, которые могут работать с элементами Set, показывать свой UI и подключаться к внешним сервисам. Он появился в бете 12.4.5 и в стабильном релизе пока отсутствует. Источник: https://www.ableton.com/en/release-notes/live-12-beta/ (FAQ: https://help.ableton.com/hc/en-us/articles/27303428331420; содержание FAQ не открывал, **не проверено**)
- Live 12.0 вышел **5 марта 2024**. Источник: пост «Ableton Live 12 – Out Now», https://www.ableton.com/en/blog/ableton-live-12-out-now/ (дата взята из поисковой выдачи по этому посту)
- Все 12.x бесплатны для владельцев Live 12, например: «Live 12.4… free update for all Live 12 users». Источники: https://www.ableton.com/en/live/ и https://www.ableton.com/en/blog/live-12-4-is-out-now/
- Свежий PDF мануала Live 12 датирован 2026-10-01: https://cdn-resources.ableton.com/resources/pdfs/live-manual/12/2026-10-01/live12-manual-en.pdf (ссылка «Download PDF» на https://www.ableton.com/en/live-manual/12/welcome-to-live/)

**Вывод для курса:** курс стоит писать под **Live 12.4.x**. Названия, которые сменились недавно: Help View теперь Learn View, Auto Pan теперь Auto Pan-Tremolo, у Erosion появился вариант Erosion Legacy, «Freeze and Flatten» переименован в «Bounce Track in Place».

### 1.2. Хронология Live 12.x (по официальным release notes)

Источник для всех пунктов, если не указано иное: https://www.ableton.com/en/release-notes/live-12/

**Live 12.0 (05.03.2024)**
- **MIDI Tools.** Transformations: Arpeggiate, Connect, Ornament, Quantize, Recombine, Span, Strum, Time Warp. Generators: Rhythm, Seed, Shape, Stacks. Max for Live MIDI Tools: Velocity Shaper и Euclidean (Rhythm Euclidean).
- **Scale Awareness.** Выбор Scale Mode в Control Bar и переключатели «Use Current Scale» в устройствах.
- **Tuning Systems.** Поддержка файлов .scl/.ascl, отдельный раздел Tunings в браузере. Редактор строёв: https://tuning.ableton.com/
- **Новые устройства.** **Meld**: би-тембральный MPE-синт на macro-осцилляторах, только Suite. **Roar**: сатурация и дисторшн, только Suite.
- **Browser Filtering and Tags**, **Similarity Search**, **Similar Sample Swapping** (в Simpler и Drum Rack).
- **Mixer in Arrangement**, **Toggle Clip View Alongside Device View** (stacked views).
- **CC Control**, **MIDI Note Probability Groups**, **Screen Reader Support**, **Keyboard Navigation**, UI View Styling.
- **Modulation behaviour.** У LFO, Shaper, Expression Control, Envelope Follower, Envelope MIDI и Shaper MIDI появился режим Mod: параметр можно крутить, пока он модулируется.
- **Comping** (take lanes) теперь есть во всех редакциях, включая Lite. Сама функция пришла раньше, в Live 11 (2021). Источник по Live 11, сторонний: https://djmag.com/news/ableton-announce-live-11-comping-new-devices-more. По официальным источникам: в мануале Live 12 есть глава «21. Comping», https://www.ableton.com/en/live-manual/12/comping/
- **Granulator III** (Robert Henke) входит в Live 12 Suite. Это Max for Live инструмент с режимами Classic, Loop и Cloud («для дронов и экспериментальных текстур»), MPE и записью аудио в реальном времени. Источник: https://www.ableton.com/en/packs/granulator-iii/
- Новые паки: **Lost and Found**, **Performance Pack**, **Golden Era Hip-Hop Drums**, **Trap Drums**. Источник: https://www.ableton.com/en/live/

**Live 12.1 (08.10.2024)**
- **Auto Shift**: питч-коррекция и питч-трекинг в реальном времени, во всех редакциях. **Drum Sampler**: новый инструмент, во всех редакциях.
- Обновлены **Limiter** и **Saturator**.
- Find and Select Notes, **Chop** (MIDI Tool), MPE MIDI Tools (**Glissando**, **LFO**). Scale awareness для аудиоклипов, мгновенное применение грувов, Undo History, браузер на всю высоту, авто-теги для сэмплов и плагинов.
- У Meld появились Phase Reset и Phase Spread. **Tuner** поддерживает tuning systems. У **Envelope Follower** появился Sidechain-вход.
- Новые паки: **MIDI Tools Pack** и **Sequencer Pack** (Suite). Источник: https://www.ableton.com/en/live/compare-editions/

**Live 12.2 (11.06.2025)**
- **Auto Filter redesign.** Новые типы фильтров: DJ, Comb, Vowel, Morph (4 крутизны, морфинг LP↔BP↔HP), Resampling, Notch+LP. Схемы SVF, DFM, MS2, PRD. Новые формы LFO: **Wander**, Ramp Up, Ramp Down. LFO Morph, сглаживание S&H, квантование LFO (Steps / S&H), EQ на сайдчейне, Output, Clip, Dry/Wet.
- **Bounce Track in Place** и **Bounce to New Track** (Cmd/Ctrl+B). Команда «Freeze and Flatten» переименована в Bounce Track in Place.
- Новый браузер: переделан Filter View, колонки контента, панель **Quick Tags**, свои иконки для меток.
- **Meld**: новый осциллятор **Chord** (4 пилы, умеет следовать гамме) и Scrambler LFO FX.
- **Roar**: режим маршрутизации Delay, фильтр **Dispersion**, внешний и MIDI-сайдчейн.
- **Resonators** и **Spectral Resonator** получили scale awareness и поддержку tuning systems. **Operator** теперь до 32 голосов.
- Клавиатурная работа с точками автоматизации.
- Max for Live-устройство **Expressive Chords** для всех редакций, требует Live 12.2+. Оно превращает одну ноту в аккорд и содержит 52 набора аккордов (36 от Render Audio, 16 от Ableton и Andrew Bruce). Источник: https://www.ableton.com/en/packs/expressive-chords/

**Live 12.3 (25.11.2025)**
- **Stem Separation**: локальное разделение на 4 стема (Vocals, Drums, Bass, Others), режимы High Speed и High Quality. **Только Suite.** Источник: https://help.ableton.com/hc/en-us/articles/23730994755996-Stem-Separation-in-Ableton-Live-FAQ
- **Splice Integration** в браузере, во всех редакциях, включая Lite. Нужен хотя бы бесплатный аккаунт Splice. Функция Search with Sound подбирает сэмплы под фрагмент трека. Источник: https://help.ableton.com/hc/en-us/articles/22060471916316-Splice-integration-in-Ableton-Live-FAQ
- **Auto Pan стал Auto Pan-Tremolo.** Два режима: Panning и Tremolo. Новый LFO-режим **Time** задаёт период в секундах и подходит для очень длинных циклов модуляции, что полезно в эмбиенте. Режимы Harmonic и Vintage. Старая версия сохранилась как Auto Pan Legacy.
- **Bounce Group Tracks**, **Paste Bounced Audio**, **Device A/B Comparison** (клавиша P).

**Live 12.4 (05.05.2026)**
- **Link Audio**: потоковая передача аудио между устройствами по LAN или Wi‑Fi. Есть во всех редакциях. Источник: https://www.ableton.com/en/live/compare-editions/
- **Erosion** переработан: Noise Blend, Stereo Width, задержка 2 мс. Старая версия называется Erosion Legacy.
- **Chorus-Ensemble**: режим Classic переименован в Chorus, добавлены параметры Time и Taps.
- **Delay**: LFO можно задавать в Hz, ms или долях такта, 7 форм волны, параметр Morph.
- Stem Separation: обработка выделенного фрагмента и **Merge to Single Track**.
- **Learn View** заменил Help View и встроенные уроки: модули с видео и текстом, отметки о прохождении, Picture-in-Picture. Источник: https://help.ableton.com/hc/en-us/articles/26963870210076-What-s-new-in-Live-12-4
- Quick Tags: теперь можно создавать теги прямо в панели. **Wavetable** до 16 голосов. Команда Copy Time (Cmd/Ctrl+Shift+C).
- Видео-обзор обновлённых Delay и Erosion: https://www.ableton.com/en/blog/watch-dnksaus-experiment-with-the-updated-delay/ (12.05.2026)

**Live 12.4.1–12.4.6 (май – сентябрь 2026).** Только поддержка контроллеров и багфиксы: Komplete Kontrol, Arturia MiniLab 37, Launchkey MK4 88, Max 9.1.5. Источник: https://www.ableton.com/en/release-notes/live-12/

### 1.3. Проверка пунктов из брифа

| Пункт брифа | Статус | Где / когда |
|---|---|---|
| MIDI Transformations & Generators | ✅ | 12.0, дополнены в 12.1 |
| Scale awareness (Keys and Scales) | ✅ | 12.0, для аудиоклипов с 12.1; Resonators и Spectral Resonator с 12.2 |
| Tuning systems | ✅ | 12.0 |
| Новый браузер с тегами | ✅ | 12.0, переработан в 12.2, доработан в 12.4 |
| Take lanes / comping | ✅, но появились в **Live 11** | в Live 12 доступны во всех редакциях |
| Mixer in Arrangement | ✅ | 12.0 |
| Roar, Meld | ✅ | 12.0, только Suite |
| Granulator III | ✅ | вместе с Live 12, Suite (Max for Live) |
| Drift | ✅, но появился в **Live 11.3** | во всех редакциях. https://www.ableton.com/en/blog/drift-exploring-the-new-synth-in-live-113/ |
| Auto Shift | ✅ | 12.1, все редакции |
| Auto Filter redesign | ✅ | 12.2 |
| Bounce | ✅ | 12.2 (треки), 12.3 (группы, Paste Bounced Audio) |
| Stem separation | ✅ | 12.3, только Suite |
| Splice integration | ✅ | 12.3, все редакции |
| Expressive Chords | ✅ | Max for Live-пак, все редакции, Live 12.2+ |
| Link Audio, Learn View | ✅ | 12.4 |

---

## 2. Редакции: Intro, Standard, Suite

Основной источник (разобран HTML-таблицы на 19.10.2026): https://www.ableton.com/en/live/compare-editions/

### 2.1. Цены, триал, лимиты

- **Цены** (на странице магазина, в EUR): Intro **€79**, Standard **€279**, Suite **€599**. Для Suite есть rent-to-own: €24,96 в месяц. Источник: https://www.ableton.com/en/shop/live/
  - Цены в USD на официальном сайте не видел, так как магазин показывает валюту по региону. По стороннему источнику 2024 года: $99 / $439 / $749 — **не проверено**.
- **Триал: 30 дней, полная Live 12 Suite**, включая Max for Live. Активировать можно один раз, только онлайн. После окончания нельзя сохранять и экспортировать, а Suite-устройства не откроются в Intro или Standard. В этом случае помогает freeze/flatten (bounce). Источники: https://help.ableton.com/hc/en-us/articles/209071129-Installing-the-Live-Trial и https://help.ableton.com/hc/en-us/articles/115001085364-Buying-Live-after-using-the-free-Trial. Страница триала: https://www.ableton.com/en/trial/
- **Минимальные системные требования Live 12.** macOS 11.7.10 Big Sur и новее (на Apple silicon до macOS 27), Windows 10 22H2 или 11. 8 GB RAM. Около 6–10 GB под базовую установку, до 76 GB под дополнительный контент. Источник: https://help.ableton.com/hc/en-us/articles/115001663530-Live-Minimum-System-Requirements

| Параметр | Intro | Standard | Suite |
|---|---|---|---|
| Audio + MIDI треки | 16 | без ограничений | без ограничений |
| Scenes | 16 | без ограничений | без ограничений |
| Send/Return | **2** | 12 | 12 |
| Аудио входы/выходы (моно) | 8/8 | 256/256 | 256/256 |
| Инструменты (по счётчику на странице) | 8 | 12 | 21 |
| Аудиоэффекты (по счётчику) | 27 | 36 | 59 |
| MIDI-эффекты | 12 | 13 | 14 |
| MIDI Tools | 1 (только Quantize) | 17 | 17 |
| Модуляторы | 2 | 6 | 6 |
| Паки | 4 | 16 | 33 |
| Звуки | 5+ GB | 38+ GB | 71+ GB |
| Max for Live | ✗ | ✗ | ✓ |
| Stem Separation | ✗ | ✗ | ✓ |
| Audio to MIDI, Audio-slicing, Linked-track editing, REX, POW-r | ✗ | ✓ | ✓ |
| «Modulation» (ключевая функция) | ✗ | ✓ | ✓ |
| Comping, MPE, Tuning Systems, Keys and Scales, Similarity Search, Link Audio, Splice, Learn View | ✓ | ✓ | ✓ |

Примечание. Счётчики на странице не всегда совпадают с числом строк в списках: например, у Intro в списке 9 инструментов при счётчике 8. В строке «Modulation» у Intro стоит ✗, хотя модулятор **LFO** в разделе Modulators отмечен для Intro. Как это работает на деле в Intro, я **не проверял**.

### 2.2. Полные списки по таблице сравнения

**Инструменты**
- **Intro (и выше):** Drum Rack, Impulse, Instrument Rack, Simpler, **Drift**, CV Instrument, CV Triggers, Drum Sampler, External Instrument.
- **Добавляются в Standard:** Drum Synths, **Analog**, **Collision**, **Electric**, **Tension**. С Live 12 они «Now In Live 12 Standard».
- **Только Suite:** Bass, **Operator**, Poli, **Sampler**, **Wavetable**, **Meld**, **Granulator III**.

**Аудиоэффекты**
- **Intro (и выше):** Audio Effect Rack, **Auto Filter**, Auto Pan (теперь Auto Pan-Tremolo), **Auto Shift**, **Beat Repeat**, Channel EQ, **Chorus-Ensemble**, Compressor, CV Clock In/Out, CV Envelope Follower, CV In, CV LFO, CV Shaper, CV Utility, **Delay**, EQ Three, **Erosion**, Gate, **Grain Delay**, Limiter, **Looper**, Phaser-Flanger, **Redux**, **Reverb**, **Saturator**, Tuner, **Utility**.
- **Добавляются в Standard:** Align Delay, **Drum Buss**, Dynamic Tube, **EQ Eight**, External Audio Effect, **Filter Delay**, **Glue Compressor**, Multi-band Dynamics, Overdrive, **Resonators**, Shifter, Spectrum, **Vinyl Distortion**, **Vocoder**, **Corpus** («Now In Live 12 Standard»).
- **Только Suite:** Amp, Cabinet, Color Limiter, **Convolution Reverb**, **Echo**, Gated Delay, **Hybrid Reverb**, Pedal, Pitch Hack, PitchLoop89, **Re-Enveloper**, **Spectral Blur**, **Spectral Resonator**, **Spectral Time**, Surround Panner, **Roar**.

**MIDI-эффекты**
- **Intro (и выше):** **Arpeggiator**, CC Control, **Chord**, MIDI Effect Rack, MIDI Monitor, MPE Control, Note Length, Pitch, **Random**, Rotating Rhythm Generator, **Scale**, Velocity.
- **Standard:** + **Note Echo**.
- **Suite:** + Melodic Steps.

**MIDI Tools**
- **Intro:** только Quantize.
- **Standard и Suite:** Arpeggiate, Span, Connect, Ornament, Recombine, Strum, Stacks, Rhythm, Seed, Shape, Time Warp, Euclidean Generator, Velocity Shaper, Quantize.
- В мануале также описаны Chop, Glissando и LFO (MIDI Tool): https://www.ableton.com/en/live-manual/12/midi-tools/

**Модуляторы (Max for Live)**
- **Intro:** Expression Control, **LFO**.
- **Standard и Suite:** + **Envelope Follower**, Envelope MIDI, **Shaper**, Shaper MIDI.
- Важно: Max for Live как платформа есть только в Suite. Некоторые M4L-устройства (LFO, Align Delay, Euclidean Generator, Velocity Shaper, Expressive Chords) Ableton включает и в младшие редакции.

**Паки**
- **Intro:** Chop and Swing, Beat Tools, Build and Drop, Drive and Glow.
- **Standard:** + Guitar and Bass, Drum Essentials, Grand Piano, **Mood Reel**, Skitter and Step, Electric Keyboards, Orchestral Strings, Session Drums Club, Session Drums Studio, **Synth Essentials**, Golden Era Hip-Hop Drums, Trap Drums.
- **Только Suite:** **Drone Lab**, Drum Booth, Brass Quartet, **Glitch and Wash**, **Inspired by Nature**, Latin Percussion, Orchestral Brass, Orchestral Mallets, Orchestral Woodwinds, Punch and Tilt, **Singularities**, String Quartet, Upright Piano, Voice Box, **Lost and Found**, Performance Pack, MIDI Tools Pack, Sequencer Pack.
- Примечание по Drone Lab. Страница пака указывает требование «Live 12 Intro (version 12.0 or higher)» и цену **€49**, то есть владельцы Intro и Standard могут купить его отдельно. В пак входит Max for Live-синт **Harmonic Drone Generator** (Expert Math). Источник: https://www.ableton.com/en/packs/drone-lab/

### 2.3. Устройства для ambient и hypnotic/dub techno по редакциям

| Устройство | Intro | Standard | Suite | Зачем в нашем жанре |
|---|---|---|---|---|
| Drift | ✓ | ✓ | ✓ | тёплые пэды, басы, стэбы |
| Simpler | ✓ | ✓ | ✓ | сэмплы аккордов, field recordings |
| Drum Sampler | ✓ | ✓ | ✓ | приглушённые кики, перкуссия |
| Analog | ✗ | ✓ | ✓ | пэды, дабовые аккорды |
| Collision / Tension / Electric | ✗ | ✓ | ✓ | физическое моделирование, «металл», колокола |
| Operator | ✗ | ✗ | ✓ | FM-перкуссия, суб-бас |
| Wavetable | ✗ | ✗ | ✓ | эволюционирующие пэды |
| Meld | ✗ | ✗ | ✓ | текстуры, Chord-осциллятор |
| Sampler | ✗ | ✗ | ✓ | мультисэмплы, дабовые аккорды (El Choop) |
| Granulator III | ✗ | ✗ | ✓ | облака, дроны (режим Cloud) |
| Reverb | ✓ | ✓ | ✓ | базовое пространство |
| Hybrid Reverb | ✗ | ✗ | ✓ | огромные пространства, convolution + алгоритм |
| Convolution Reverb | ✗ | ✗ | ✓ | IR-пространства |
| Delay | ✓ | ✓ | ✓ | dub-эхо (с 12.4 LFO с Morph) |
| Filter Delay | ✗ | ✓ | ✓ | трёхполосные дабовые задержки |
| Echo | ✗ | ✗ | ✓ | «тёплое» эхо, Hiss Tape, модуляции |
| Grain Delay | ✓ | ✓ | ✓ | гранулярные повторы |
| Auto Filter | ✓ | ✓ | ✓ | движение фильтра, LFO Wander |
| Auto Pan-Tremolo | ✓ | ✓ | ✓ | медленные LFO (режим Time, в секундах) |
| Chorus-Ensemble | ✓ | ✓ | ✓ | ширина пэдов |
| Erosion / Redux | ✓ | ✓ | ✓ | шумовая и лоу-фай фактура |
| Saturator | ✓ | ✓ | ✓ | тёплая сатурация |
| Roar | ✗ | ✗ | ✓ | многостадийная сатурация, фидбэк |
| Glue Compressor | ✗ | ✓ | ✓ | шина, «склейка» |
| Compressor (sidechain) | ✓ | ✓ | ✓ | пампинг от кика |
| EQ Eight | ✗ | ✓ | ✓ | точная эквализация (в Intro есть только EQ Three и Channel EQ) |
| Utility | ✓ | ✓ | ✓ | моно-бас, ширина, гейн |
| Resonators / Corpus | ✗ | ✓ | ✓ | тональные резонансы из шума |
| Spectral Resonator / Spectral Time | ✗ | ✗ | ✓ | спектральные дроны, freeze |
| Vocoder | ✗ | ✓ | ✓ | тональные текстуры из шума |
| Beat Repeat | ✓ | ✓ | ✓ | вариации, глитчи |
| Arpeggiator / Random / Scale / Chord | ✓ | ✓ | ✓ | генеративные паттерны |
| Note Echo | ✗ | ✓ | ✓ | MIDI-эхо |
| LFO (модулятор) | ✓ | ✓ | ✓ | медленная модуляция любых параметров |
| Shaper / Envelope Follower | ✗ | ✓ | ✓ | сложные кривые, реакция на сигнал |
| Stem Separation | ✗ | ✗ | ✓ | разбор референсов |

**Практический вывод для курса.** Самый жанровый набор устройств есть только в Suite: Hybrid Reverb, Echo, Wavetable, Granulator III, Spectral-эффекты, Roar. Триал даёт его на 30 дней. Поэтому в каждом уроке стоит давать **альтернативную цепочку для Intro и Standard**, например: Echo → Delay + Auto Filter + Saturator; Hybrid Reverb → Reverb; Wavetable → Drift или Analog. Отдельно стоит предупредить, что в Intro всего 2 return-трека и 16 треков.

---

## 3. Мануал Live 12 и официальный путь обучения новичка

### 3.1. Оглавление Live 12 Reference Manual

Источник: https://www.ableton.com/en/live-manual/12/welcome-to-live/. Шаблон URL: `https://www.ableton.com/en/live-manual/12/<slug>/`. PDF от 2026-10-01: https://cdn-resources.ableton.com/resources/pdfs/live-manual/12/2026-10-01/live12-manual-en.pdf. Мануал также доступен на DE, FR, JA, ZH, ES, IT. **Русской версии нет.**

1. Welcome to Live (`welcome-to-live`)
2. First Steps (`first-steps`): установка, **Learn View**, Info View, другие ресурсы, Settings
3. Live Concepts (`live-concepts`)
4. Working with the Browser (`working-with-the-browser`)
5. Managing Files and Sets (`managing-files-and-sets`)
6. Arrangement View (`arrangement-view`)
7. Session View (`session-view`)
8. Clip View (`clip-view`)
9. Audio Clips, Tempo, and Warping (`audio-clips-tempo-and-warping`)
10. Editing MIDI (`editing-midi`)
11. MIDI Tools (`midi-tools`). Transformations: Arpeggiate, Chop, Connect, Glissando, LFO, Ornament, Quantize, Recombine, Span, Strum, Time Warp, Velocity Shaper. Generative: Rhythm, Seed, Shape, Stacks, Euclidean
12. Editing MPE (`editing-mpe`)
13. Converting Audio to MIDI (`converting-audio-to-midi`)
14. Using Grooves (`using-grooves`)
15. Using Tuning Systems (`using-tuning-systems`)
16. Launching Clips (`launching-clips`)
17. Routing and I/O (`routing-and-i-o`)
18. Mixing (`mixing`): Mixer (в том числе в Arrangement), Group Tracks, Return Tracks и Main, Crossfader, Solo/Cue, Track Delays
19. Recording New Clips (`recording-new-clips`)
20. Bounce to Audio (`bounce-to-audio`)
21. Comping (`comping`)
22. Stem Separation (`stem-separation`)
23. Working with Instruments and Effects (`working-with-instruments-and-effects`)
24. Using Plug-Ins (`using-plug-ins`)
25. Instrument, Drum and Effect Racks (`instrument-drum-and-effect-racks`)
26. Automation (`automation`)
27. Clip Envelopes (`clip-envelopes`)
28. Working with Video (`working-with-video`)
29. Live Audio Effect Reference (`live-audio-effect-reference`): 42 нативных эффекта, от Amp до Vocoder, включая Auto Filter, Auto Pan-Tremolo, Auto Shift, Echo, Hybrid Reverb, Roar, Spectral Resonator, Spectral Time
30. Live MIDI Effect Reference (`live-midi-effect-reference`): Arpeggiator, CC Control, Chord, Note Length, Pitch, Random, Scale, Velocity
31. Live Instrument Reference (`live-instrument-reference`): Analog, Collision, Drift, Drum Sampler, Electric, External Instrument, Impulse, Meld, Operator, Sampler, Simpler, Tension, Wavetable
32. Max for Live (`max-for-live`)
33. Max for Live Devices (`max-for-live-devices`): DS-инструменты; Align Delay, Envelope Follower, LFO, Shaper; Envelope MIDI, Expression Control, MIDI Monitor, MPE Control, Note Echo, Shaper MIDI
34. MIDI and Key Remote Control (`midi-and-key-remote-control`)
35. Using Push 1 (`using-push-1`)
36. Using Push 2 (`using-push-2`)
37. Synchronizing with Link, Tempo Follower, and MIDI (`synchronizing-with-link-tempo-follower-and-midi`)
38. Computer Audio Resources and Strategies (`computer-audio-resources-and-strategies`)
39. Audio Fact Sheet (`audio-fact-sheet`)
40. MIDI Fact Sheet (`midi-fact-sheet`)
41. Accessibility and Keyboard Navigation (`accessibility-and-keyboard-navigation`)
42. Live Keyboard Shortcuts (`live-keyboard-shortcuts`)
43. Credits (`credits`)

Granulator III, Convolution Reverb, PitchLoop89, Re-Enveloper, Spectral Blur и другие устройства из Max for Live-паков **не описаны** в главах 29 и 31. Их документация находится на страницах паков, например https://www.ableton.com/en/packs/granulator-iii/

**Главы мануала, нужные новичку в нашем жанре:** 2, 3, 4, 6, 7, 8, 9, 10, 11, 18, 23, 25, 26, 27, 29, 31.

### 3.2. Встроенное обучение в Live: Learn View (12.4+)

- Learn View заменил Help View и «Built-in Lessons» в 12.4. Внутри модули из видео и текста, фильтр по темам, отметка «Complete Lesson» и Picture-in-Picture. Открывается через меню Help или Cmd+Option+7 / Ctrl+Alt+7. Нужен интернет. Новые модули выходят без обновления Live. Источник: https://www.ableton.com/en/live-manual/12/first-steps/ (раздел 2.2.1)
- Уроки к пакам теперь называются «Pack Info pages» и открываются через Help → Pack Overview. Источник: https://www.ableton.com/en/release-notes/live-12/ (раздел 12.4)
- Все видео Learn View собраны в YouTube-плейлисте «Ableton Live 12.4: Learn View», на 19.10.2026 в нём 22 видео: https://www.youtube.com/playlist?list=PLoh4MB-kbBmItuNKzdeg8rd6iUxwRdr38. Модули:
  - Welcome to Live 12: Introduction, Key Concepts
  - Setting Up Live 12 for Mac / for Windows: Display and Audio Interface; MIDI Controllers, Plugins, Packs and Splice; Testing your Setup
  - Playing with Live 12
  - Tour of the Live 12 Interface: Info View, Control Bar & Browser; Session vs Arrangement; Session View & Mixer; Browser & Detail View
  - Recording Audio in Live: Setup; Arrangement & Take Lanes; Session View
  - Creating With MIDI in Live: Playing MIDI Notes; Adding MIDI Notes; Programming Drums
  - Saving and Exporting your Project: Saving; Templates & Default Sets; Exporting
- Info View (клавиша «?») показывает подсказку по любому элементу интерфейса. Источник: https://www.ableton.com/en/live-manual/12/first-steps/
- Несоответствие в источниках: некоторые FAQ в базе знаний до сих пор ссылаются на «Help → Built-in Lessons → What's New in Live», например https://help.ableton.com/hc/en-us/articles/11425083250972-Keys-and-Scales-in-Live-12-FAQ. В 12.4 этот путь заменён Learn View. Остались ли уроки «What's New» внутри Learn View, **не проверено**.

### 3.3. Онлайн-ресурсы Ableton для новичка

Все они перечислены на странице https://www.ableton.com/en/live/learn-live/

**1. Learning Music**: https://learningmusic.ableton.com/
- Есть **на русском**: https://learningmusic.ableton.com/ru/index.html (проверено, страница называется «Начинаем делать музыку»). Всего 19 языков.
- Разделы: Beats, Notes and scales, Chords, Basslines, Melodies, Song structure, The playground, Advanced topics (Modes, Pentatonic, Whole tone, Octatonic, Pelog, 19-tone, Inversions, Voicings, Seventh chords и др.).
- Для нашего курса особенно полезны Advanced topics → **Modes** и **Pentatonic**: модальность (дорийский, эолийский) типична для атмосферного техно.

**2. Learning Synths**: https://learningsynths.ableton.com/
- **Русского нет.** Доступные языки: de, en, es, fi, fr, it, ja, ko, nl, pt, th, tr, vi, zh-Hans, zh-Hant. Проверено по файлу `js/musiclab.js` и по контенту `content/lessons/ru/...`, которого не существует.
- Главы: Get started; Making changes; Synth basics, включая страницу **«Slow, evolving sounds»**; Envelopes; LFOs; Oscillators; Filters; Recipes (Plucked bass, Subbass, Kick drums, Hihat, Strings, Noisy lead, Distortion и др.); Learning more. Источник: https://learningsynths.ableton.com/content/lessons/en/synthesis/lesson.json
- Патч можно экспортировать в Live. Источник: https://www.ableton.com/en/blog/new-in-learning-synths-export-to-live-record-your-creations-and-more/

**3. Ableton Learn (новый сайт)**: https://learn.ableton.com/
- Учит основам музыки прямо в браузере. Сейчас есть один курс **Beats** (https://learn.ableton.com/courses/beats) с уроками «What is a beat?» и «Boom boom bap». Уроки Keeping Time и Melodic Drums отмечены как «More lessons on the way». Есть также Starter pack, Artist lessons и Playground. Уроки про басы, мелодии и аккорды заявлены как «coming soon».
- Атрибут lang="en". Русской версии не нашёл (**не проверено** до конца).

**4. Making Music: 74 Creative Strategies for Electronic Music Producers** (Dennis DeSantis): https://makingmusic.ableton.com/ (раздел 3.4 ниже)

**5. Видеосерии Learn Live**: https://www.ableton.com/en/live/learn-live/
- Разделы: New features in Live 12, Setup, Interface, Instruments & Effects (Wavetable, Echo, Spectral Resonator, Max for Live…), Workflows (automation, MIDI editing, racks, follow actions…).

**6. Серия для новичков «Create Your First Track in Ableton Live with Bad Snacks»**: https://www.ableton.com/en/blog/create-your-first-track-in-ableton-live/
- 8 частей: Make your first beat → Write a chord progression → Build a bassline → Chop samples and write a melody → Turn your loop into a track → Record and process vocals → Mix and automate → Export and perform. Всё в Live 12 Suite, рекомендуют начать с триала.

**7. Прочее**
- Certified Training: https://www.ableton.com/en/certified-training/
- User Groups: https://www.ableton.com/en/community/user-groups/
- Официальный YouTube: https://www.youtube.com/@Ableton

### 3.4. «Making Music: 74 Creative Strategies…»: стратегии для атмосферной и гипнотической музыки

Сведения о книге: автор **Dennis DeSantis**, в то время Head of Documentation в Ableton. 340 страниц, вышла в 2015 году, печатная версия стоила $30 / €25. Три части: **Problems of Beginning** (25 глав), **Problems of Progressing** (37), **Problems of Finishing** (12). Источники: https://www.ableton.com/en/press/press-archive/ableton-publishes-making-music-book и https://www.ableton.com/en/blog/making-music-book-of-creative-strategies/

**На сайте бесплатно открыты 24 главы из 74**: https://makingmusic.ableton.com/
- Beginning: Catalog of Attributes, Active Listening, Arbitrary Constraints, Presets as Starting Points, Simple Sounds, Procrastination and Timeboxing, Thinking Like an Amateur, On Work.
- Progressing: Fuzzy Boundaries, Creating Variation 2: Mutation Over Generations, Asynchronous or Polyrhythmic Loops, Programming Beats 2: Linear Drumming, Silence and Noise, Creating Melodies 1: Contour, Linear Rhythm in Melodies, The Rhythm of Lyrics, Parallel Harmony, Humanizing With Automation Envelopes, Deliberately Bad Listening, Dramatic Arc.
- Finishing: Arranging as a Subtractive Process, Common Forms 1: Elements of Song Form, Unique Events, Diminishing Returns.
- Полный список всех 74 глав на официальных ресурсах не нашёл (**не проверено**). Рецензии упоминают ещё главы «Three Ways to End», «Listening to Music You Hate», «Write Drunk; Edit Sober» (по поисковой выдаче, источник https://attackmagazine.com/?p=27199, **не проверено** по первоисточнику).

**Стратегии, которые больше всего подходят для ambient и hypnotic/dub techno** (краткие пересказы своими словами):

1. **Silence and Noise**: https://makingmusic.ableton.com/silence-and-noise
   Промежутки между нотами (тишину или фоновый шум) стоит воспринимать как музыкальный материал. Автор прямо пишет, что **в dub techno постоянно звучит слой шума**, а в «чистых» цифровых стилях паузы пустые. Упражнения: поднять шумовой пол входа, засэмплировать выбег пластинки, утопить field recordings в реверберации, сделать петлю обратной связи на return-треке.
   *Урок курса:* «шумовая подложка» из Erosion или винилового шума, фидбэк на return.

2. **Asynchronous or Polyrhythmic Loops**: https://makingmusic.ableton.com/asynchronous-or-polyrhythmic-loops
   Петли разной длины на одном инструменте сходятся заново только через длинный цикл, и возникает «третий» составной паттерн. В примерах minimal techno, ранний acid (Hardfloor), Berlin School и *Music for Airports* Брайана Ино. Тот же приём работает с автоматизацией или LFO, длина которых не связана с длиной клипа.
   *Это ключевая техника гипнотичности.* В Live её можно реализовать клипами разной длины или через Auto Pan-Tremolo в режиме Time.

3. **Creating Variation 2: Mutation Over Generations**: https://makingmusic.ableton.com/creating-variation-2-mutation-over-generations
   Дублировать идею и делать одно «значимое» изменение, около 8 поколений подряд. Хорошо подходит для медленно эволюционирующих лупов.

4. **Dramatic Arc**: https://makingmusic.ableton.com/dramatic-arc
   Классическая драматическая дуга. Автор отдельно оговаривает, что **dub и minimal techno обычно не имеют явной кульминации**: напряжение в них создают саунд-дизайн и мелкие изменения.

5. **Arranging as a Subtractive Process**: https://makingmusic.ableton.com/arranging-as-a-subtractive-process
   Сначала за 20 секунд заполнить всю длину трека, потом вычитать лишнее. Для лупового техно это очень естественный метод.

6. **Unique Events**: https://makingmusic.ableton.com/unique-events
   Разовые события против ощущения «просто луп»: необычный сэмпл, одноразовый жест, кратковременно включённый эффект через автоматизацию.

7. **Fuzzy Boundaries**: https://makingmusic.ableton.com/fuzzy-boundaries
   Размывать границы секций: часть дорожек продлевать за границу, часть обрывать раньше («anticipation» и «hesitation»).

8. **Humanizing With Automation Envelopes**: https://makingmusic.ableton.com/humanizing-with-automation-envelopes
   Медленная автоматизация attack и decay, микро-расстройка на несколько центов. Даёт «живость» статичным пэдам.

9. **Arbitrary Constraints**: https://makingmusic.ableton.com/arbitrary-constraints
   Заранее заданные ограничения, например «все звуки из одного сэмпла». Хорошо подходит для домашних заданий курса.

10. **Catalog of Attributes**: https://makingmusic.ableton.com/catalog-of-attributes
    Описать референс (звук, гармонию, мелодию, ритм, форму) словами, отложить его и писать по описанию. Это **этичный способ учиться на ISHOME**, не копируя.

11. **Simple Sounds / Presets as Starting Points / Active Listening / Deliberately Bad Listening**: см. ссылки на https://makingmusic.ableton.com/
    Борьба с застреванием в выборе звуков и тренировка слуха.

---

## 4. Блог Ableton, One Thing и материалы об артистах по теме

Все URL проверены (HTTP 200) на 19.10.2026. Даты взяты со страниц статей. «н/д» означает, что дата на странице не указана: обычно это статьи нового формата 2025–2026 годов.

### 4.1. Туториалы: dub, techno, ambient, саунд-дизайн

| Название | URL | Дата | Что внутри |
|---|---|---|---|
| Designing Dub Chords in Ableton Live with El Choop/Pizza Hotline | https://www.ableton.com/en/blog/designing-dub-chords-in-ableton-live-with-el-chooppizza-hotline/ | 26.03.2024 | **Главный материал по dub techno.** Аккорды в Sampler; Meld (Swarm Square + BP 12 dB) с LFO random 1/16; Auto Pan как volume-stutter; цепочки Auto Filter → дисторшн → Auto Filter; модуляция send-ов; Utility M/S для пинг-понга; Multiband Dynamics (OTT) примерно на 10%. Бесплатно: Live Set и сэмплы аккордов |
| A Beginner's Guide to Generating Techno Drum Patterns | https://www.ableton.com/en/blog/generating-techno-drum-patterns/ | н/д (2026) | Rhythm и Seed (MIDI Tools), панорама в Simpler, Sound Similarity Search. Live 12.4 Suite |
| A Step-by-Step Guide for Creating Rhythmic Pads | https://www.ableton.com/en/blog/step-by-step-guide-for-creating-rhythmic-pads/ | н/д (2026) | Ритмизация пэдов автоматизацией громкости, формы и кривые автоматизации, gain staging |
| A Step-by-Step Guide for Designing Sub Bass, Chords and FX | https://www.ableton.com/en/blog/step-by-step-guide-for-sub-bass-chords-and-fx/ | н/д | «Wall of sound» на Meld: аккорды, саб, FX |
| A Beginner's Guide to Creating Chords, Arps and Basslines | https://www.ableton.com/en/blog/beginners-guide-to-chords-bass-melodies/ | н/д | MIDI-эффекты для аккордов, арпеджио и басов |
| A Beginner's Guide to Generating Acid Basslines | https://www.ableton.com/en/blog/a-beginners-guide-to-generating-acid-basslines/ | н/д | Генерация acid-басов |
| Into the Abyss: Make Ambient Drones in Live | https://www.ableton.com/en/blog/drone-tutorials/ | 21.07.2014 | Дроны через Corpus и Resonators из сэмпла и шума |
| Drone Lab: Creating Sustained Sounds in Live 11 | https://www.ableton.com/en/blog/drone-lab-creating-sustained-sounds-in-live-11/ | 07.12.2021 | Пак Drone Lab, Harmonic Drone Generator, Wavetable с двумя расстроенными голосами |
| Pad It Out: 10 Ways to Make Distinctive Pad Sounds | https://www.ableton.com/en/blog/pad-it-out-10-ways-make-distinctive-pad-sounds/ | 04.08.2020 | 10 приёмов для пэдов в Wavetable и Echo: расстройка, вибрато, LFO, unison, Hiss Tape |
| Explore Micro-Sound Design in Granulator III with dnksaus | https://www.ableton.com/en/blog/sound-design-with-granulator-iii/ | 06.11.2025 | Микро-саунд-дизайн в Granulator III |
| Against the Grain: Creative Applications of Granulator III | https://www.ableton.com/en/blog/against-the-grain-creative-applications-of-granulator-iii/ | 04.06.2024 | Field recordings со смартфона → Granulator III; советы Robert Henke |
| Freeze, Delay and Deconstruct – Sound Design with Spectral Time | https://www.ableton.com/en/blog/freeze-delay-and-deconstruct-sound-design-with-spectral-time/ | 30.08.2022 | Freeze, призрачные текстуры |
| Beyond the Echo Chamber: Inventive Effects Using Live's Delay Devices | https://www.ableton.com/en/blog/beyond-the-echo-chamber-inventive-effects-using-lives-delay-devices/ | 21.05.2020 | 6 приёмов с Delay, Echo и Grain Delay от ELPHNT |
| Watch dnksaus Experiment with Live 12.4's Updated Delay | https://www.ableton.com/en/blog/watch-dnksaus-experiment-with-the-updated-delay/ | 12.05.2026 | Новые Delay и Erosion |
| Three Creative Tips for Live 12.2 – Roar, Meld and Auto Filter | https://www.ableton.com/en/blog/three-things-to-try-in-ableton-live-12-2/ | 31.07.2025 | Roar Dispersion (лоу-фай «плавание»), Meld Chord, Auto Filter |
| Explore Auto Filter, Roar, MIDI Tools and More with ELPHNT | https://www.ableton.com/en/blog/explore-auto-filter-roar-midi-tools-elphnt/ | 11.12.2025 | 5 туториалов: фильтры, дисторшн, аранжировка, аккорды |
| Shaping Surprises: Sound Design Concepts with Meld | https://www.ableton.com/en/blog/shaping-surprises-sound-design-concepts-with-meld/ | 12.03.2024 | Meld (Side Brain) + бесплатные пресеты |
| Meld: A Look at Live 12's New Bi-Timbral Synth | https://www.ableton.com/en/blog/meld-a-look-at-live-12s-new-bi-timbral-synth/ | 30.01.2024 | История и приёмы Meld |
| Taking a Closer Look at Wavetable's Morph Filter | https://www.ableton.com/en/blog/taking-a-closer-look-at-wavetables-morph-filter/ | 23.11.2021 | Фильтр Wavetable |
| Experimental Sound Design with Feedback Loops | https://www.ableton.com/en/blog/experimental-sound-design-with-feedback-loops/ | 15.06.2022 | Фидбэк-петли (перекликается с «Silence and Noise») |
| Automation Innovation: Nine Ideas for Automating Instruments and Effects | https://www.ableton.com/en/blog/automation-innovation-nine-ideas-automating-instruments-and-effects/ | 03.08.2021 | 9 идей автоматизации |
| Take a Chance: Producing with Probability in Live 11 | https://www.ableton.com/en/blog/take-chance-producing-probability-live-11/ | 23.03.2021 | Вероятность и алеаторика: основа «живых» лупов |
| Discover Advanced Reharmonizing Techniques with Live 12.1's Auto Shift | https://www.ableton.com/en/blog/discover-advanced-reharmonizing-techniques-with-live-121s-auto-shift/ | 21.01.2025 | Rack из Auto Shift и Resonators |
| Sidechain Compression: Part 1 – Concepts and History | https://www.ableton.com/en/blog/sidechain-compression-part-1/ | 27.03.2018 | Сайдчейн |
| Sidechain Compression: Part 2 – Common and Uncommon Uses | https://www.ableton.com/en/blog/sidechain-compression-part-2-common-and-uncommon-uses/ | н/д | Сайдчейн, продолжение |
| Drop It: The Kick in Electronic Music | https://www.ableton.com/en/blog/drop-it-kick-electronic-music/ | 10.12.2019 | История и приёмы кика + бесплатные кики |
| Make a Dub Delay in Max for Live | https://www.ableton.com/en/blog/make-dub-delay-max-live/ | 18.12.2012 | Даб-делей своими руками |
| A Brief History of The Studio As An Instrument: Part 3 – Echoes From The Future | https://www.ableton.com/en/blog/studio-as-an-instrument-part-3/ | 04.11.2016 | King Tubby, Lee Perry, Conny Plank: корни даба |
| Sounds Outside: The Art of Field Recording | https://www.ableton.com/en/blog/art-of-field-recording/ | 20.06.2016 | Полевые записи (AGF, Chris Watson) |
| The Orchestra of All Things: Sampling Your Environment | https://www.ableton.com/en/blog/sampling-your-environment/ | 16.05.2023 | Сэмплирование окружения |
| Dub Machines: Analog Echos for Live | https://www.ableton.com/en/blog/dub-machines-analog-delay-max-live/ | н/д | M4L-пак Surreal Machines (Magnetic, Diffuse), €29, нужен Max for Live: https://www.ableton.com/en/packs/dub-machines/ |

### 4.2. Артисты: ambient, dub и hypnotic techno

| Название | URL | Дата | Чем полезно |
|---|---|---|---|
| Brendon Moeller: Life Begins at 170 | https://www.ableton.com/en/blog/brendon-moeller-life-begins-at-170/ | 18.02.2025 | Dub techno-ветеран (Beat Pharmacy, Echologist): пэды в Sampler, Echo, Reverb, Filter Delay, Vocoder, PitchLoop89. **Бесплатный сэмпл-пак с дронами и даб-стемами** |
| Watch Clark, Rival Consoles and Sebastian Mullaert Improvise a Live Set | https://www.ableton.com/en/blog/circle-of-live/ | 30.04.2026 | Circle of Live: импровизационная гипнотическая электроника (Mullaert) |
| Monolake: Ghosts in the Machine | https://www.ableton.com/en/blog/robert-henke-ghost/ | 11.04.2012 | Robert Henke, сооснователь Ableton, автор Granulator |
| Mathew Jonson: Rhythm, Melody and Chaos | https://www.ableton.com/en/blog/mathew-jonson-rhythm-melody-and-chaos/ | 24.02.2023 | Гипнотичные мелодии и «контролируемый хаос» |
| Aril Brikha: Remaking "Groove La Chord" with Live and Note | https://www.ableton.com/en/blog/aril-brikha-remaking-groove-la-chord-with-live-and-note/ | 20.12.2022 | Детройт-техно, аккордовая классика |
| KMRU: Spaces | https://www.ableton.com/en/blog/kmru-spaces/ | 16.11.2021 | Документальный фильм + бесплатные field recordings |
| Someone's Always Listening: KMRU on the Art of Sharing Music | https://www.ableton.com/en/blog/kmru-on-the-art-of-sharing-music/ | н/д | Эмбиент |
| Loscil: Visualizing Lake Fire | https://www.ableton.com/en/blog/loscil-visualizing-lake-fire/ | н/д | Эмбиент, Granulator |
| Caterina Barbieri: Minimalism, Modular and Live | https://www.ableton.com/en/blog/caterina-barbieri-minimalism-modular-and-live/ | 13.06.2018 | Минимализм, повторение |
| Christopher Willits: Development & Envelopment | https://www.ableton.com/en/blog/christopher-willits-development-envelopment/ | н/д | Эмбиент, развитие материала |
| Input / Output: Noémi Büchi | https://www.ableton.com/en/blog/input-output-noemi-buchi/ | 15.07.2026 | **Полный бесплатный Live Set** |
| Download the Live Set of Nadia Struiwigh's New Track "Leelow Waters" | https://www.ableton.com/en/blog/download-the-live-set-of-nadia-struiwighs-new-track-leelow-waters/ | н/д | Атмосферное техно, бесплатный Live Set |
| Download the Live Set of Artefakt's New Track "Undertow" | https://www.ableton.com/en/blog/download-the-live-set-of-artefakts-new-track/ | н/д | Глубокое техно, бесплатный Live Set |
| Download the Live Set of Merrin Karras' New Track "Still Life" | https://www.ableton.com/en/blog/download-the-live-set-of-merrin-karras-new-track-still-life/ | н/д | Эмбиент-техно, бесплатный Live Set |
| The Black Dog: From Rothko to Roland to Ableton | https://www.ableton.com/en/blog/the-black-dog-rothko-to-roland-to-ableton/ | н/д | Ambient techno |
| Nathan Fake: Live, Reshape, Repeat | https://www.ableton.com/en/blog/nathan-fake-live-reshape-repeat/ | н/д | Мелодичное атмосферное техно |
| Jon Hopkins: No Comfort Without Discomfort | https://www.ableton.com/en/blog/jon-hopkins/ | н/д | Эмбиент и техно |
| Hinako Omori: Finding Stillness | https://www.ableton.com/en/blog/hinako-omori-finding-stillness/ | н/д | Эмбиент |
| Andrey Sirotkin: In Ukraine, Music Is My Shelter | https://www.ableton.com/en/blog/andrey-sirotkin-in-ukraine-music-is-my-shelter/ | н/д | Русскоязычный регион, техно |
| Тег-ленты блога | https://www.ableton.com/en/blog/tags/genres/ambient/ , https://www.ableton.com/en/blog/tags/genres/techno/ , https://www.ableton.com/en/blog/tags/genres/dub/ , https://www.ableton.com/en/blog/tags/techniques/sound-design/ , https://www.ableton.com/en/blog/tags/techniques/delays/ | — | Для актуализации подборки |

Статьи именно про ISHOME в блоге Ableton не нашлось. Отдельного тега «dub-techno» тоже нет: https://www.ableton.com/en/blog/tags/genres/dub-techno/ отдаёт 404.

### 4.3. One Thing: короткие советы артистов

- О серии: запущена в 2017 году, короткие видео-советы из студий артистов. 30.07.2024 вышел 100-й эпизод. Страница серии: https://www.ableton.com/en/one-thing/. Обзор 100 эпизодов: https://www.ableton.com/en/blog/one-thing-leads-to-another-100-music-making-inspirations/
- Эпизоды, подходящие для ambient и hypnotic. Все ссылки взяты из обзора выше:
  - **Hainbach**, «Unsynced loops», петли, которые расходятся по фазе: https://youtu.be/RW6XZLbVDgc. Прямо иллюстрирует стратегию «Asynchronous Loops».
  - **Robert Lippok**, «Sine wave percussion»: https://youtu.be/7tiyirWNm6A
  - **Ayako Okamura**, «Tuned ambience»: https://youtu.be/hlJCSmBxR0U
  - **Kyoka**, «Exploring noise»: https://youtu.be/7V9mdNavgAg
  - **Drum & Lace**, «Re-pitching field recordings»: https://youtu.be/mn2zeJFV9lk
  - **Junichi Oguro**, field recording: https://www.youtube.com/watch?v=-6NJKrnzu2o
  - **Rojin Sharafi**, ритмические паттерны из Granulator III: https://www.youtube.com/watch?v=T2tswLayxgo
  - **Electric Indigo**, «Granular echoes»: https://youtu.be/0uGncb63wEc
  - **BlankFor.ms**, «Delay as a tone shaper»: https://youtu.be/xxH2jKktHYY
  - **Monomite**, «Delay as a sampler»: https://youtu.be/Nerfg5RtYzM
  - **Laura Escudé**, «Controlled randomness»: https://youtu.be/UaHJwSw0rVQ
  - **Computo**, «Generate rhythms»: https://youtu.be/qd6TfLHAGJ4
  - **Plastica**, «Arpeggiator for rhythms»: https://youtu.be/aSx7TDC2q10
  - **Andrew Toy**, «Improvising to automated effects»: https://youtu.be/GqOx8QosCrw
  - **Maya Shenfeld**, overtones: https://www.youtube.com/watch?v=DbZwkl17v_w

---

## 5. Что из этого следует для курса

1. **Версия.** Писать под Live 12.4 и следить за бетой 12.4.15 и Extensions SDK. Live 13 не анонсирован.
2. **Редакция.** Новичку дать выбор. Вариант A: 30-дневный триал Suite. Тогда курс должен давать результат за 30 дней, а в конце учить делать Bounce / Freeze, чтобы проекты открывались в Intro или Standard. Вариант B: работа в Intro или Standard с заменами Suite-устройств. **Intro для dub techno заметно ограничен**: 2 return-трека, нет EQ Eight, Glue Compressor, Filter Delay, Echo и Hybrid Reverb, есть только Quantize из MIDI Tools.
3. **Встроенное обучение.** Модуль 0 строить поверх Learn View (12.4) и Info View. Сами видео Learn View на английском, это надо учесть в русскоязычном курсе.
4. **Русскоязычный материал от Ableton:** **только Learning Music** (/ru/). Learning Synths, мануал, Learn View и блог доступны только на английском или других языках.
5. **Методология.** Как концептуальный каркас использовать стратегии DeSantis: Silence and Noise, Asynchronous Loops, Mutation Over Generations, Subtractive Arranging, Unique Events, Dramatic Arc с оговоркой про dub и minimal, Catalog of Attributes для разбора ISHOME.
6. **Бесплатные Live Sets для разбора:** El Choop (dub chords), Noémi Büchi, Nadia Struiwigh, Artefakt, Merrin Karras, сэмплы Brendon Moeller.

---

### Не проверено / открытые вопросы
- Цены в USD (официальный магазин показывает валюту по региону).
- Полный список 74 глав Making Music.
- Содержимое модулей Learn View сверх 22 видео в YouTube-плейлисте; сохранились ли «What's New in Live»-уроки.
- Как на практике работает «Modulation» и модулятор LFO в Intro (в таблице сравнения противоречие).
- Есть ли у learn.ableton.com локализации.
- Содержимое FAQ по Extensions SDK.
