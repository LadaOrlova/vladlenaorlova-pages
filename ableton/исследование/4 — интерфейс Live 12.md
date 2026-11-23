# 04. Анатомия интерфейса Ableton Live 12: исследование для интерактивной карты

Дата исследования: 2026-10-19. Язык: русский. Названия элементов интерфейса даны по-английски, точно как в Live и официальном руководстве.

Условные отметки:
- **[M]** проверено по официальному Live 12 Reference Manual (онлайн-версия; PDF руководства датирован 2026-10-01).
- **[RN]** проверено по официальным Live 12 Release Notes.
- **[SS]** проверено по скриншоту из руководства или с ableton.com (сам скриншот я смотрел).
- **[?]** не проверено или проверено частично: формулировка моя или взята из неофициального источника. Перед публикацией квиза такие пункты нужно перепроверить.

---

## 0. Версия и источники

- **Текущая стабильная версия: Live 12.4.6**, вышла 15 сентября 2026 **[RN]**. Ветка 12.4 вышла 5 мая 2026. Публичная бета на 15 октября 2026: 12.4.15b7. В бете есть Extensions SDK, в релизе его пока нет, и в курс его включать не нужно.
- Руководство: https://www.ableton.com/en/live-manual/12/ . PDF: https://cdn-resources.ableton.com/resources/pdfs/live-manual/12/2026-10-01/live12-manual-en.pdf . Руководство уже описывает Learn View, Link Audio, Splice и Bounce, то есть соответствует 12.4.
- **help.ableton.com** отдавал 403 (Cloudflare) и для WebFetch, и для curl. Статьи базы знаний поэтому не использованы, вместо них взяты руководство и release notes.
- Скриншоты в руководстве сделаны в светлом оформлении (Light). Для тёмного оформления цвета я снял с промо-скриншота Live 12 на ableton.com.

---

## 1. Главное окно: регионы и их точные названия

### 1.1. Сводная таблица регионов (для кликабельной карты)

| # | Точное название (EN) | Где находится | Что это / что делает (RU) | Статус |
|---|---|---|---|---|
| 1 | **Control Bar** | Полоса вдоль всего верха окна | Транспорт, темп, метроном, квантизация запуска, лады, петля аранжировки, режимы рисования и маппинга, загрузка CPU, переключатель видов. С 12.0 разбита на 9 секций (см. раздел 2) | [M][SS] |
| 2 | **Browser** | Левая колонка под Control Bar | Библиотека: звуки, устройства, плагины, сэмплы, клипы, паки, папки. Скрывается кнопкой Show/Hide Browser или Cmd+Opt+B / Cmd+Opt+5 | [M][SS] |
| 3 | **Session View** | Центр (один из двух основных видов) | Сетка клипов: треки идут столбцами, сцены строками. Клипы запускаются в любом порядке, в реальном времени | [M][SS] |
| 4 | **Arrangement View** | Центр (второй основной вид) | Линейная таймлайн-аранжировка: треки сложены по вертикали, время идёт слева направо | [M][SS] |
| 5 | **Mixer** | Под Session или Arrangement View, общий для обоих видов | In/Out, Sends, Returns, Volume, Pan, Track Activator, Solo, Arm, Crossfader, Track Delay, Performance Impact. В Arrangement появился с Live 12.0 | [M][RN][SS] |
| 6 | **Clip View** | Нижняя панель | Свойства и содержимое выбранного клипа: Sample Editor, MIDI Note Editor, Envelope Editor, MPE Editor | [M][SS] |
| 7 | **Device View** | Нижняя панель (может стоять в стопке с Clip View) | Цепочка устройств выбранного трека (MIDI-эффекты → инструмент → аудиоэффекты) | [M][SS] |
| 8 | **Scene View** | Нижняя панель (открывается при выборе сцены) | Темп, размер и Follow Actions выбранной сцены | [M] |
| 9 | **Info View** | Левый нижний угол (под браузером) | Показывает название и назначение элемента под курсором. Сюда же пишется собственный Info Text. Клавиша ? (Shift+?) | [M][SS] |
| 10 | **Learn View** | Правая колонка окна | Встроенные видеоуроки. В 12.4 **заменил Help View и Lessons**. Cmd+Opt+7 | [M][RN][SS] |
| 11 | **Status Bar** | Нижняя строка всего окна | Сообщения, ошибки, обновления. В MIDI-редакторе показывает позицию, высоту, velocity и probability ноты. Справа в этой же строке стоят селекторы Clip/Device View и переключатель микшера | [M][SS] |
| 12 | **Groove Pool** | Внутри области браузера (открывается через Browser Config Menu) | Список грувов Сета и их параметры. Cmd+Opt+6 | [M][RN] |
| 13 | **Tuning** (панель Tuning) | Внутри области браузера (Browser Config Menu) | Загруженная система строя (.ascl/.scl) | [M][RN] |
| 14 | Нижние правые переключатели: **Clip View Selector** / **Clip View Toggle**, **Device View Selector** / toggle, **Mixer View toggle**, **Mixer Config Menu** | Правый край Status Bar | Открывают и складывают в стопку Clip/Device View, показывают и скрывают микшер, выбирают видимые секции микшера | [M][SS] |
| 15 | **Info View toggle** | Левый край Status Bar (иконка ⓘ) | Показывает или скрывает Info View | [M][SS] |
| 16 | **Second Window** | Отдельное окно | Второе окно Live, например Session на одном мониторе и Arrangement на другом. Cmd+Shift+W | [M] |

**Важно про термин «Detail View».** В руководстве Live 12 словосочетание «Detail View» **не встречается ни разу**: я проверил поиском по всем скачанным главам. Нижняя область описывается как Clip View и Device View, которые можно ставить в стопку (stacked). В Live 11 был шорткат «Hide/Show Detail View» Cmd+Opt+L, в шорткатах Live 12 его нет. В Learn View, судя по скриншоту, «Detail View» ещё осталось как тема-фильтр уроков. В квизе лучше спрашивать про «Clip View» и «Device View».

### 1.2. Browser (браузер)

Общая структура (рис. «The Browser's Layout», нумерация по руководству) **[M][SS]**:
1. **Sidebar** с тремя секциями: **Collections**, **Library**, **Places**.
2. **Browse Back / Browse Forward** (стрелки ‹ ›): история браузера. Cmd+[ и Cmd+].
3. **Search field** (поиск; подсказка «Search (Cmd + F)»). Поддерживает поиск по тегам через # (например #Drums).
4. **Show/Hide Filter View toggle** (жёлтая кнопка-воронка) и рядом **Filter View menu** (▼). В меню включаются группы фильтров, **Tag Editor**, **Quick Tags**, **Auto Tags**. Toggle появился в 12.2 вместо заголовка «Filters».
5. **Filter View**: группы фильтров (filter groups) с тегами, например Type, Sounds, Character, Devices, Creator.
6. **Results bar**: появляется при поиске или фильтрации. Показывает число фильтров («2 Filters»), кнопку **Clear** и кнопку **Add Label** (сохраняет результаты как пользовательский лейбл).
7. **Content pane**: список элементов. Колонка **Name** видна всегда, остальные колонки включаются в **Content Options menu** (кнопка «…»).
8. **Quick Tags** (строка «Tags: … Add…»): теги выбранного элемента. Добавлена в 12.2.
9. **Preview tab**: внизу браузера. Слева кнопка **Preview** (иконка наушников, включает автопрослушивание), в середине волна со scrub area, справа кнопка **Raw** (прослушивание в исходном темпе, без синхронизации).

**Collections** **[M][SS]**: цветные лейблы **Favorites** (красный) и цветные коллекции (на скриншотах Green, Blue, Purple, Gray, а также Orange/Yellow [?]). Назначаются клавишами 1…7, сбрасываются клавишей 0. Набор видимых лейблов меняется кнопкой Edit.

**Library** (лейблы по руководству, раздел 4.6) **[M][SS]**:
| Лейбл | Что внутри |
|---|---|
| **All** | Всё сразу: сначала устройства, затем файлы |
| **Sounds** | Instrument Racks и пресеты инструментов, сгруппированные по типу звука |
| **Drums** | Drum Racks, отдельные барабанные звуки, драм-лупы и ван-шоты |
| **Instruments** | Инструменты Live и их пресеты, сгруппированные по устройству |
| **Audio Effects** | Аудиоэффекты, их пресеты и Audio Effect Racks |
| **MIDI Effects** | MIDI-эффекты, их пресеты и MIDI Effect Racks |
| **Modulators** | Устройства-модуляторы (Max for Live: LFO, Envelope и т. п.) |
| **Max for Live** | Все устройства и пресеты Max for Live |
| **Plug-Ins** | Сторонние VST и AU (AU только на macOS). Пишется именно **Plug-Ins** |
| **Clips** | Live Clips (.alc) |
| **Samples** | Аудиосэмплы |
| **Grooves** | Грувы (.agr) |
| **Tunings** | Системы строя (.ascl, .scl). Добавлены в 12.0 |
| **Templates** | Шаблонные Сеты |

Порядок на скриншотах 12.x: All, Sounds, Drums, Instruments, Audio Effects, MIDI Effects, Modulators, Max for Live, Plug-Ins, Clips, Samples, Grooves, **Tunings, Templates**. В тексте руководства Templates стоит перед Tunings, но в интерфейсе на скриншоте Tunings выше. Для макета берите порядок со скриншота.

**Places** **[M][SS]**: **Packs** (Core Library, установленные паки, обновления, доступные к загрузке паки), **Splice** (с 12.3), **Cloud** (Ableton Cloud: Сеты с Note и Move), **Push** (файлы с Push 3 в Standalone), **User Library**, **Current Project**, пользовательские папки (**User Folders**) и пункт **Add Folder…**. Splice, Cloud и Push можно скрыть через «Hide from Sidebar».

Прочее о браузере:
- **Similarity Search**: иконка **Show Similar Files** рядом с выбранным сэмплом, Cmd+Shift+F **[M]**.
- **Hot-Swap**: клавиша Q или кнопка Hot-Swap в заголовке устройства. Браузер переходит в режим замены пресета или сэмпла **[M]**.
- **Browser Config Menu** (▼ рядом с кнопкой браузера в Control Bar): **Full-Height Browser**, показ **Groove Pool** и **Tuning** **[M]**.

### 1.3. Session View

Элементы (точные названия) **[M][SS]**:
- **Track title bar**: цветной заголовок трека над столбцом. Двойной клик открывает Device View. У Group Track здесь есть кнопка **Unfold Group** (◎▼).
- **Clip slot**: ячейка сетки. В занятой ячейке находится клип с кнопкой **Clip Launch button** (треугольник ▶ слева).
- **Clip Stop button**: квадрат ■ в пустой ячейке. Его можно убрать командой «Add/Remove Stop Button» (Cmd+E).
- **Clip Record button**: круглая кнопка записи, появляется в пустых слотах трека в режиме Arm.
- **Scene**: горизонтальная строка. **Scene Launch button** (▶) находится в столбце **Main track** справа, номера сцен стоят в правом краю.
- **Main track**: правый столбец (до Live 11.x назывался **Master**). В Session View в его Track Status field находятся кнопки **Stop All Clips** и **Back to Arrangement**. Рядом с Back to Arrangement расположена **Enable Follow Actions Globally**.
- **Scene Tempo / Scene Time Signature** controls: поля в Main track, их видно, если потянуть левый край заголовка Main track.
- **Track Status field**: строка над микшером. Значки: pie-chart (луп, с числами), progress bar (one-shot), микрофон или клавиатура (мониторинг), мини-аранжировка (трек играет Arrangement).
- **Group slots** у Group Track: заштрихованные ячейки с собственными кнопками запуска и остановки.
- **Return tracks** (A Reverb, B Delay в дефолтном Сете [?]): стоят между обычными треками и Main.
- Свободная зона справа от треков служит drop area: если перетащить туда файл или устройство, создаётся новый трек **[M]**. Надпись на ней не проверена **[?]**.
- **Scene View** (нижняя панель): Tempo/Signature и Follow Action выбранной сцены **[M]**.

### 1.4. Arrangement View

Верхняя часть (рис. «The Upper Area of the Arrangement View») **[M][SS]**:
1. **Overview**: полоса-миниатюра всей аранжировки. Чёрная рамка показывает видимую часть; клик и перетаскивание прокручивают и масштабируют.
2. **Beat-time ruler**: такты, доли и шестнадцатые. Перетаскивание прокручивает и масштабирует.
3. **Scrub area**: клик запускает воспроизведение с этого места. Здесь ставятся **Locators** (▷ с именами: Intro, Verse…).
4. **Locators**: маркеры для запуска частей аранжировки.
5. **Set Locator button** («Set»; на выбранном локаторе превращается в **Delete Locator**, «Del») и под ней **Previous / Next Locator** (← →).
6. **Automation Mode toggle**: показывает automation lanes (клавиша A).
7. **Lock Envelopes toggle** (замок): привязывает огибающие к позиции в песне, а не к клипам.
8. **Back to Arrangement button**: в правом верхнем углу scrub area (оранжевая ▶≡, когда горит). Такая же кнопка есть у каждого трека в заголовке.

Основная часть и низ **[M][SS]**:
- **Track header** / **track title bar**: имя трека, кнопка **Unfold Track** (◎▶ или ◎▼).
- **Main lane**: основная дорожка трека с клипами. **Take lanes**: дубли для comping (Cmd+Opt+U). **Automation lanes**: Device chooser, Automation Control chooser, кнопки **Add Automation Lane** и **Remove Automation Lane**.
- **Arrangement Track Controls**: справа от заголовков. In/Out (Input type, Input channel, Monitor In/Auto/Off, Output), Track Activator (оранжевый номер), Solo (S), Arm, Volume, Pan, Sends; узкий индикатор уровня справа.
- **Mixer Drop Area**: пустое место под треками; если бросить туда устройство, создаётся трек.
- **Insert Marker**: мигающий синий маркер, с которого начинается воспроизведение. Его позицию показывает Status Bar.
- **Loop Brace**: скобка петли аранжировки над дорожками. Cmd+L.
- **Time signature markers**: под beat-time ruler. Область скрыта, если смен размера нет.
- **Time ruler** (внизу): минуты:секунды:миллисекунды.
- В правом нижнем углу: **Waveform Vertical Zoom** toggle и слайдер уровня (например «1.00x»), **Optimize Height (H)** и **Optimize Width (W)** toggles. Над time ruler показан текущий шаг сетки (например «1/2»).
- **Linked-track indicator**: появляется в заголовках связанных треков (Linked-Track Editing).

### 1.5. Mixer (Session и Arrangement)

Секции микшера (View → Mixer Controls; меню **Mixer Config Menu** справа внизу) **[M][RN][SS]**:
- **In/Out**: «Audio From / MIDI From» (input type и input channel), **Monitor** (**In / Auto / Off**), «Audio To / MIDI To» (output). У Main track здесь **Cue Out** и **Main Out**.
- **Sends**: ручки посылов (A, B…) на return-треки.
- **Returns** (Return Tracks): возвратные треки. У каждого есть **Pre/Post** toggle (на скриншоте «Post»).
- **Volume** (секция с метром): **Volume** control, **Meter** (peak и RMS), **peak level** indicator (поле «-∞»), числовое поле громкости.
- **Pan** control: Stereo Pan Mode или Split Stereo Pan Mode.
- **Track Activator** switch: оранжевая кнопка с номером трека (у return-треков буквой). Выключение глушит трек.
- **Solo** switch («S»). В режиме Cue он превращается в **Cue** (иконка наушников).
- **Arm Recording** button (Arm, иконка ● или ◐).
- **Crossfade Assign** buttons **A / B** и **Crossfader**: секция Crossfader, по умолчанию скрыта.
- **Track Delay** (Track Options): по умолчанию скрыт.
- **Performance Impact** indicators: 6 прямоугольников, показывают нагрузку трека на CPU.
- У Main track: **Solo/Cue Mode** switch (кнопка «Solo»), **Preview/Cue Volume** knob (синяя ручка с наушниками), Cue Out и Main Out.
- **Mixer View toggle** (иконка столбиков) и **Mixer Config Menu** (▼): правый нижний угол окна. Cmd+Opt+M.

### 1.6. Clip View

Структура (глава 8; в 12.x перерисована) **[M][SS]**:
- **Clip title bar**: **Clip Activator** toggle (квадрат), имя и цвет клипа; у аудиоклипов ещё **Save Default Clip** button. Двойной клик складывает панели (**Fold**).
- **Clip panels** (слева; раскладываются горизонтально или вертикально):
  - **Main Clip Properties**: Start/End и кнопки **Set**, **Loop** (Clip Loop toggle), Position/Length, **Signature** (Clip Time Signature), **Groove** (**Clip Groove chooser**, кнопки Hot-Swap Groove и **Commit**), **Scale** (**Scale Mode** toggle, **Root Note** chooser, **Scale Name** chooser). У MIDI-клипа ещё кнопка **Duplicate** (Duplicate Loop).
  - **Extended Clip Properties**: **Launch Mode**, **Legato**, **Quantization** (Clip Launch Quantization), **Velocity**, **Follow Actions**, Nudge Backward/Forward (только для Session-клипов). У MIDI-клипа также **Bank/Sub-Bank/Program**.
  - Аудиоклипы: **Audio Utilities** panel. В ней **Warp** toggle, **Lead/Follow** toggle (на кнопке надпись «Follow»), **Warp Mode** chooser (Beats, Tones, Texture, Re-Pitch, Complex, Complex Pro), параметры режима (в Beats: Preserve, Transient Loop Mode, Transient Envelope), поле **BPM** и кнопки **/2** и **×2**, **Reverse**, **Edit**, **RAM**, **HiQ**, **Clip Fade** (только в Session), **Gain**, **Pitch** (полутоны и центы).
  - MIDI-клипы: **Pitch and Time Utilities** panel. Pitch: Transpose, **Fit to Scale**, **Invert**, Interval Size и **Add Interval**. Time: **Stretch**, ×2 и /2, Duration и **Set Length**, Humanize, **Reverse**, **Legato**. Раньше эта панель называлась Notes tab (переименована в 12.0).
  - **Transform** и **Generate** panels (MIDI Tools). Transformations: Arpeggiate, Chop, Connect, Glissando, LFO, Ornament, Quantize, Recombine, Span, Strum, Time Warp, Velocity Shaper. Generators: Rhythm, Seed, Shape, Stacks, Euclidean. У аудиоклипа есть только Transform с Quantize.
- **Editor** (справа) и вкладки-режимы в заголовке:
  - Аудио: вкладки **Sample** и **Envelopes** (Sample Editor, Envelope Editor).
  - MIDI: вкладки **Notes**, **Envelopes**, **MPE** (MIDI Note Editor, Envelope Editor, MPE Editor).
  - Справа в заголовке редактора находится выбор сетки (например «1/4 ▼»).
- **MIDI Note Editor**: **time ruler**, **note ruler**, **piano ruler**. Кнопки в заголовке: **Fold** (Fold to Notes, клавиша F), **Scale** (Fold to Scale, клавиша G), **Highlight Scale** (клавиша K), **Find and Select Notes** toggle (MIDI Note Filters). Ещё здесь **Preview** switch над piano ruler, **Clip scrub area**, **Loop Brace**, **Start/End markers**.
- Дорожки под нотами: **Velocity Editor** (виден по умолчанию), **Chance Editor** (probability, по умолчанию скрыт), **Release Velocity Editor**. Переключаются через **Lane Selector** (▼); кнопка **Show/Hide All Expression Editors**.
- **Clip Content Toolbar** (внизу): Velocity, **Randomize**, Randomization Amount, **Ramp**, **Deviation**. Для Chance: Play All, Play One, Ungroup.
- **Sample Editor**: волна, **Warp Markers** (жёлтые), **transient markers** (серые сверху), pseudo-warp markers. В заголовке: имя файла, частота, разрядность, число каналов.
- **Clip View Selector** (правый нижний угол окна): миниатюра всего клипа, умеет масштабировать и прокручивать. Рядом **Clip View Toggle** (▲).
- Шорткаты: Cmd+Opt+3 (Clip View), Opt+Tab (переключить вкладки), Cmd+Opt+E (Clip View на всю высоту).

### 1.7. Device View, Racks, Drum Rack

**[M][SS]**
- **Device chain**: устройства слева направо. Сигнал идёт MIDI effects → instrument → audio effects. Между устройствами стоят **level meters**. В конце цепочки drop area (на скриншоте надпись «Drop Audio Effects Here»).
- **Device title bar**: **Activator** toggle (кружок), имя, **Expanded View** toggle (стрелка), **Show Options** toggle (кнопка меню, с 12.2), **Save Preset** button, у некоторых устройств **Use Current Scale** toggle (scale awareness). С 12.3 есть **A/B Compare** (клавиша P).
- **Racks**: Instrument Rack, Drum Rack, Audio Effect Rack, MIDI Effect Rack. Скругление и скобки обозначают границы рэка.
  - **View column** (слева) с view selectors: Macro Controls, Chain List, Devices, **Macro Variations**.
  - **Macro Controls**: по умолчанию 8 ручек, максимум 16. **Map** mode. **Randomize** (рандомизация макросов).
  - **Chain List**: цепочки; у каждой **Chain Activator**, **Solo**, **Hot-Swap**. Зоны: **Key Zones**, **Velocity Zones**, **Chain Select Zones**.
  - **Drum Rack**: **Pad View** (видно 16 падов, справа обзор всех падов), до 6 **return chains**. Клавиша D переключает цель Hot-Swap между рэком и последним выбранным падом.
- **Device View Selector** (правый нижний угол): имя трека и миниатюры устройств. Правый клик открывает иерархический список устройств трека.
- Шорткаты: Cmd+Opt+4 (Device View), Shift+Tab (переключение Clip ↔ Device), Opt+клик по переключателю (обе панели сразу).

### 1.8. Info View, Learn View, Status Bar, Groove Pool

- **Info View** **[M]**: левый нижний угол. Показывает название и описание элемента под мышью (на скриншоте: «Punch-In — Enable this toggle…»). Через «Edit Info Text» можно писать свои заметки. Клавиша ? (Shift+?).
- **Learn View** **[M][RN]**: с 12.4 **заменил Help View и Lessons**. Открывается справа, показан по умолчанию при первом запуске. Внутри модули с видео и текстом, «Filter by Topics», кнопка **Complete Lesson**, режим Picture-in-Picture. Нужен интернет. Cmd+Opt+7. Бывшие «Pack lessons» теперь называются **Pack Info pages** (Help → Pack Overview).
- **Status Bar** **[M]**: нижняя строка. В ней сообщения, ошибки, прогресс анализа (кнопка Pause), подсказки по нотам и маркерам. Справа: Clip View/Device View selectors и Mixer View toggle. Слева: Info View toggle.
- **Groove Pool** **[M]**: открывается через Browser Config Menu или Cmd+Opt+6. Параметры: **Base**, **Quantize**, **Timing**, **Random**, **Velocity**, **Global Amount** (до 130 %). Если грувы применены к клипам, слайдер **Global Groove Amount** появляется и в Control Bar.

---

## 2. Control Bar слева направо (Live 12.4)

Порядок я собрал по скриншотам руководства (ControlBarL12, LearnViewL12, LinkToggleL12, OverloadIndicatorL12, ControlBarMidiIndicators), а названия взял из текста руководства. Девять секций названы так же, как в главе 3.1 **[M][SS]**.

| # | Секция (EN, как в руководстве) | Элемент (точное название) | Вид на экране | Примечание |
|---|---|---|---|---|
| 1 | **Browser Options** | **Show/Hide Browser** toggle | иконка двух панелей; оранжевая, когда браузер открыт | Cmd+Opt+B / Cmd+Opt+5 |
| 2 | | **Browser Config Menu** | ▼ | Full-Height Browser, Groove Pool, Tuning |
| 3 | **Tempo Settings and Metronome** | **Link** toggle и **Link drop-down menu** (▼) | кнопка «Link ▾» | Выпадающее меню и Link Audio с 12.4. Включённый Link показывает число пиров. Кнопку можно скрыть в Settings |
| 4 | | **Tempo Follower** toggle | кнопка с надписью «Follow» | Только при включённой опции Show Tempo Follower Toggle |
| 5 | | **EXT** button (External Sync) и LED синхронизации | «Ext», узкая ячейка | Только если в настройках включён внешний источник синхронизации |
| 6 | | **Tap Tempo** button | «Tap» | |
| 7 | | **Tempo** field | «120.00» | 20–999 BPM |
| 8 | | **Phase Nudge Down / Phase Nudge Up** buttons | две иконки «\|\|\|\|» | Временно замедляют или ускоряют воспроизведение |
| 9 | | **Time Signature** (Numerator / Denominator) fields | «4 / 4» | |
| 10 | | **Global Groove Amount** slider | «130%» | Только если грувы применены к клипам [M]; позиция по скриншоту [SS] |
| 11 | | **Metronome** switch и **Metronome Settings** pull-down (▼) | «○●» ▼ | В выпадающем меню **Count-In**, звук и ритм метронома. Клавиша O |
| 12 | | **Quantization Menu** / Global Quantization chooser | «1 Bar ▼» | Глобальная квантизация запуска. Cmd+6…Cmd+0 |
| 13 | **Scale Settings** | **Scale Mode** toggle, **Root Note** chooser, **Scale Name** chooser | фиолетовая кнопка «♭♯», «C ▼», «Minor ▼» | Отражают лад выбранного клипа. Скрыты, если загружена система строя (Tuning) |
| 14 | **Follow and Arrangement Position** | **Follow** switch | иконка «→⇢» (оранжевая, когда включена) | Автопрокрутка за плейхедом. Opt+Shift+F |
| 15 | | **Arrangement Position** fields | «1. 1. 1» | Такт.доля.шестнадцатая. Count-in показывается здесь синим |
| 16 | **Transport Controls** | **Play** button | ▶ (зелёная во время воспроизведения) | Space |
| 17 | | **Stop** button | ■ | Двойное нажатие возвращает в 1.1.1 |
| 18 | | **Arrangement Record** button | ● | F9 |
| 19 | **Automation and Capture MIDI** | **MIDI Arrangement Overdub** button | «+» | Overdub только для MIDI-треков |
| 20 | | **Automation Arm** button | иконка «узел-кривая», оранжевая | |
| 21 | | **Re-Enable Automation** button | «←» | Загорается, если автоматизация перекрыта ручной правкой |
| 22 | | **Capture MIDI** button | пунктирный квадрат «⛶» | С 12.4 шорткат удалён, Cmd+Shift+C теперь Copy Time |
| 23 | | **Session Record** button | «○» | Cmd+Shift+F9 |
| 24 | **Arrangement Loop Settings** | **Loop Start** fields | «1. 1. 1» | Это же точка punch-in |
| 25 | | **Punch-In** switch | «⌐\» | |
| 26 | | **Arrangement Loop** toggle (Loop switch) | иконка петли | Cmd+L при выделении |
| 27 | | **Punch-Out** switch | «/¬» | |
| 28 | | **Loop Length** fields | «8. 0. 0» | |
| 29 | **MIDI and CPU Settings** | **Draw Mode** toggle | карандаш | Клавиша B |
| 30 | | **Computer MIDI Keyboard** button | иконка клавиш пианино (оранжевая, когда включена) | Клавиша M |
| 31 | | **Key Map Mode** switch | «Key» | Cmd+K |
| 32 | | MIDI indicators: пара «remote» | узкая ячейка из 2 LED | |
| 33 | | **MIDI Map Mode** switch | «MIDI» | Cmd+M |
| 34 | | **Sample rate** indicator | «44.1 kHz» | Руководство: «change the project sample rate» |
| 35 | | **CPU Load Meter** (CPU meter) и drop-down | «21 % ▼»; заливка оранжевая | Average / Current, Warn on Current CPU Overload |
| 36 | | **Overload indicator** | пустой прямоугольник; при перегрузке оранжевый с надписью «CPU» | Также срабатывает на перегрузку диска |
| 37 | | MIDI indicators: пара «MIDI tracks» | узкая ячейка из 2 LED | Верхний LED: вход, нижний: выход |
| 38 | **View Selector** | **Session View** / **Arrangement View** selectors | «\|\|\|» (Session) и «≡» (Arrangement); активный оранжевый | Tab, Opt+1 / Opt+2 |

Элементы, которые появляются только в особых режимах **[M]**:
- **New** button: только в Key Map Mode или MIDI Map Mode. Останавливает клипы на armed-треках и выбирает сцену для нового дубля.
- **Resync External Hardware** button: только если в Tempo & MIDI Settings включена соответствующая опция.
- Индикаторы MIDI — три пары LED (верхний = вход, нижний = выход): sync (только при внешней синхронизации), remote (MIDI, управляющий интерфейсом), MIDI tracks. Расположение пар по скриншоту: sync после «Ext», remote между «Key» и «MIDI», tracks справа после Overload **[SS]**.

---

## 3. Основные шорткаты macOS (проверены по главе 42 «Live Keyboard Shortcuts»)

Источник: https://www.ableton.com/en/live-manual/12/live-keyboard-shortcuts/ **[M]**. Шорткаты зависят от контекста: многие клавиши в разных видах делают разное.

| # | Шорткат (Mac) | Действие (EN, как в руководстве) | По-русски | Где работает |
|---|---|---|---|---|
| 1 | **Tab** | Toggle Session/Arrangement View | Переключить Session и Arrangement | Везде. Не работает, если включён «Use Tab to Move Focus» |
| 2 | **Opt+1 / Opt+2** | Move Focus to the Session / Arrangement View | Перейти в Session или Arrangement | Альтернатива Tab |
| 3 | **Shift+Tab** (или F12) | Toggle Between Device/Clip View | Переключить Device View и Clip View | Нижняя панель |
| 4 | **Cmd+Opt+B** или **Cmd+Opt+5** | Hide/Show Browser | Показать или скрыть браузер | |
| 5 | **Cmd+Opt+3** | Hide/Show Clip View | Clip View | |
| 6 | **Cmd+Opt+4** | Hide/Show Device View | Device View | |
| 7 | **Cmd+Opt+6** | Hide/Show the Groove Pool | Groove Pool | В Live 11 было Cmd+Opt+G |
| 8 | **Cmd+Opt+7** | Hide/Show the Learn View | Learn View | |
| 9 | **Cmd+Opt+M** | Hide/Show Mixer | Микшер | |
| 10 | **Shift+?** | Hide/Show Info View | Info View | |
| 11 | **Cmd+,** | Open the Settings | Настройки | Preferences переименованы в Settings в 12.0 |
| 12 | **Space** / **Shift+Space** | Play from Start Marker/Stop / Continue Play from Stop Point | Старт и стоп / продолжить с места остановки | Транспорт |
| 13 | **F9** | Record | Запись в Arrangement | |
| 14 | **Cmd+Shift+F9** | Record to Session View | Session Record | |
| 15 | **O** | Toggle Metronome | Метроном | В Live 12.0 изменён на O |
| 16 | **Cmd+T** | Insert Audio Track | Новый аудиотрек | |
| 17 | **Cmd+Shift+T** | Insert MIDI Track | Новый MIDI-трек | |
| 18 | **Cmd+Opt+T** | Insert Return Track | Новый return-трек | |
| 19 | **Cmd+Shift+M** | Insert MIDI clip | Пустой MIDI-клип | Session-слот или выделение в Arrangement |
| 20 | **Cmd+I** | Insert Scene / Insert Silence / Insert Warp Marker | Вставить сцену / тишину / Warp Marker | Session / Arrangement / Sample Editor |
| 21 | **Cmd+D** | Duplicate | Дублировать | |
| 22 | **Cmd+R** | Rename | Переименовать (Tab переходит к следующему треку или сцене) | |
| 23 | **Cmd+G** / **Cmd+Shift+G** | Group / Ungroup (Tracks, Devices, Notes) | Сгруппировать / разгруппировать | Треки, устройства (в Rack), ноты (probability group) |
| 24 | **Cmd+E** | Split Clip at Selection / Add/Remove Stop Button / Chop notes | Разрезать клип / стоп-кнопка в слоте / нарезать ноты | Arrangement / Session / MIDI Note Editor |
| 25 | **Cmd+J** | Consolidate Selection into Clip / Join Notes | Склеить в один клип / соединить ноты | Arrangement / MIDI Note Editor |
| 26 | **Cmd+L** | Toggle Loop Brace (Loop Selection) | Петля по выделению | Arrangement |
| 27 | **Cmd+U** | Quantize | Квантизовать | MIDI Note Editor, Sample Editor |
| 28 | **Cmd+Shift+U** | Quantize Settings… | Настройки квантизации | |
| 29 | **Cmd+B** | Bounce to New Track | Bounce в новый трек | С 12.2 |
| 30 | **Cmd+Opt+Shift+F** | Freeze/Unfreeze Tracks | Заморозить трек | |
| 31 | **0** | Deactivate Selected Clip / Track / Selection | Деактивировать | Клип, трек, выделение |
| 32 | **A** | Toggle Automation Mode | Показать автоматизацию | Arrangement |
| 33 | **B** | Toggle Draw Mode | Режим карандаша | |
| 34 | **M** | Computer MIDI Keyboard | Клавиатура компьютера как MIDI. Z/X меняют октаву, C/V velocity | |
| 35 | **Cmd+K** / **Cmd+M** | Toggle Key Map Mode / MIDI Map Mode | Режимы маппинга | |
| 36 | **S** / **C** | Solo / Arm Selected Tracks | Соло / запись на выбранном треке | Когда включён Computer MIDI Keyboard, добавляйте Shift |
| 37 | **Cmd+1 / Cmd+2 / Cmd+3 / Cmd+4** | Narrow Grid / Widen Grid / Triplet Grid / Snap to Grid | Сетка уже / шире / триоли / привязка | |
| 38 | **Cmd+6 / 7 / 8 / 9 / 0** | 1/16, 1/8, 1/4, 1 Bar, Off (Global Quantization) | Глобальная квантизация запуска | |
| 39 | **Z / X** | Zoom to Selection / Zoom Back | Приблизить к выделению / вернуть масштаб | |
| 40 | **H / W** | Optimize Arrangement Height / Width | Вписать по высоте / ширине | |
| 41 | **Q** | Toggle Hot-Swap Mode | Hot-Swap | |
| 42 | **Cmd+F** | Search in Browser | Поиск в браузере | |
| 43 | **Cmd+Opt+U** | Show Take Lanes | Показать take lanes | Comping |
| 44 | **Cmd+Opt+F** | Create Fade/Crossfade | Создать фейд или кроссфейд | Arrangement |
| 45 | **Cmd+Shift+R** | Export Audio/Video | Экспорт аудио/видео | **Не resample!** |
| 46 | **Cmd+Shift+E** | Export MIDI File | Экспорт MIDI-файла | В MIDI-редакторе этот же шорткат делит Arrangement-клип по выделению, в браузере открывает Tag Editor |
| 47 | **Cmd+Shift+W** | Toggle Second Window | Второе окно | |
| 48 | **Enter** | Launch Selected Clip/Slot / Load Selected Item from Browser | Запустить клип / загрузить элемент из браузера | |
| 49 | **F10** | Back to Arrangement | Вернуться к аранжировке | |
| 50 | **Opt+Shift+F** | Scroll Display to Follow Playback (Follow) | Follow | |

Чего **нет** среди шорткатов Live 12 или что изменилось:
- **Cmd+Opt+L**: в Live 11 это «Hide/Show Detail View». В шорткатах Live 12 его нет **[M]**. Вместо него Cmd+Opt+3 и Cmd+Opt+4.
- **Cmd+Shift+R** = Export Audio/Video. Ресемплинг делается через Input Type «Resampling» на аудиотреке, отдельного шортката у него нет **[M]**.
- **Cmd+Shift+C** с 12.4 = Copy Time. Шорткат Capture MIDI удалён **[RN]**.
- **Cmd+Opt+G** в Live 12 = Hide/Show **Filter View** в браузере, а не Groove Pool **[M][RN]**.
- **Cmd+Shift+F**: в браузере Show Similar Files, в MIDI-редакторе Show/Hide MIDI Note Filters **[M]**.

---

## 4. Глоссарий: 70+ терминов (RU-объяснение, термин в UI по-английски)

Пометка [общ.] означает общий звукорежиссёрский термин, а не элемент интерфейса Live.

### Проект и файлы
1. **Live Set**: документ Live (.als), с которым вы работаете; хранит треки, клипы, устройства и настройки.
2. **Live Project**: папка, в которой лежат Сет и связанные с ним файлы (Samples/Recorded, Processed и т. п.). Доступна в браузере через Current Project.
3. **Collect All and Save**: команда File, которая копирует все используемые сэмплы в папку проекта, чтобы ссылки не потерялись.
4. **Live Clip** (.alc): клип, сохранённый в браузер вместе с инструментами и эффектами трека.
5. **Pack**: набор контента Ableton или сторонних авторов (звуки, пресеты, Сеты); устанавливается в Places → Packs.
6. **Core Library**: базовая библиотека звуков и пресетов, которая ставится вместе с Live.
7. **User Library**: папка ваших пресетов, сэмплов, шаблонов и клипов (по умолчанию ~/Music/Ableton/User Library).
8. **Template** (Templates): шаблонный Сет, с которого удобно начинать проект.
9. **Export Audio/Video**: рендер Сета или выделения в аудиофайл (Cmd+Shift+R).

### Клипы, сцены, треки
10. **Clip**: базовый музыкальный блок Live: фрагмент аудио или MIDI с собственными настройками воспроизведения.
11. **Audio Clip**: клип со ссылкой на аудиофайл (сэмпл) и параметрами его воспроизведения; сам файл не изменяется.
12. **MIDI Clip**: клип с MIDI-нотами и огибающими контроллеров; без инструмента звука не даёт.
13. **Scene**: горизонтальная строка в Session View; Scene Launch запускает все клипы строки одновременно.
14. **Track**: дорожка, которая хранит клипы и несёт цепочку устройств; в Session это столбец, в Arrangement строка.
15. **Audio Track**: трек для записи и воспроизведения аудиоклипов.
16. **MIDI Track**: трек для MIDI-клипов; звук даёт инструмент в его Device View.
17. **Return Track**: возвратный трек без клипов; принимает сигнал по Sends с многих треков и обрабатывает его общими эффектами.
18. **Group Track**: контейнер-подмикс для нескольких треков (Cmd+G); клипов не содержит, но может держать аудиоэффекты.
19. **Main track** (бывший Master): мастер-шина, куда по умолчанию сводятся все треки; в Session в ней стоят Scene Launch.
20. **Track Activator**: кнопка с номером трека, которая включает и выключает его звук (mute).
21. **Arm** (Arm Recording): подготовка трека к записи.
22. **Monitor (In / Auto / Off)**: когда слышен входной сигнал трека: всегда, только при Arm, или никогда.
23. **Solo / Cue**: Solo оставляет звучать только выбранный трек; Cue отправляет его в наушники (Cue Out), если у интерфейса хватает выходов.

### Устройства
24. **Device**: любой процессор в цепочке трека: инструмент, аудиоэффект или MIDI-эффект.
25. **Instrument**: устройство, которое превращает MIDI в звук (Drift, Wavetable, Simpler, Meld, Operator…).
26. **Audio Effect**: обрабатывает аудиосигнал (EQ Eight, Compressor, Reverb, Roar…).
27. **MIDI Effect**: обрабатывает MIDI до инструмента (Arpeggiator, Chord, Scale…).
28. **Plug-In** (VST/AU): стороннее устройство, лежит в лейбле Plug-Ins.
29. **Preset**: сохранённые значения параметров устройства или рэка.
30. **Hot-Swap**: режим, в котором пресет, сэмпл или устройство заменяется прямо из браузера (клавиша Q).
31. **Rack** (Instrument / Drum / Audio Effect / MIDI Effect Rack): контейнер с параллельными цепочками устройств, сохраняется как один пресет.
32. **Chain**: одна цепочка устройств внутри рэка; цепочки работают параллельно.
33. **Macro Controls**: до 16 ручек рэка (по умолчанию 8); каждая управляет любым числом параметров внутри рэка.
34. **Macro Variations**: сохранённые снимки положений макросов, которые можно переключать.
35. **Drum Rack / Pad**: рэк, где каждая цепочка висит на своей ноте-паде; Pad View показывает 16 падов.
36. **Max for Live**: среда Max внутри Live для создания и использования собственных устройств, модуляторов и MIDI Tools (Suite или отдельная покупка).
37. **Modulators**: устройства (Max for Live), которые модулируют параметры других устройств, например LFO или Envelope Follower.

### Время, темп, ворпинг
38. **Tempo / BPM**: темп Сета в ударах в минуту; задаётся полем Tempo в Control Bar.
39. **Warp**: изменение скорости воспроизведения аудио без изменения высоты, чтобы попасть в темп Сета.
40. **Warp Marker**: жёлтый маркер в Sample Editor, который прикрепляет точку аудио к доле сетки.
41. **Transient**: атака звука; Live помечает транзиенты серыми маркерами, из них можно сделать Warp Marker.
42. **Warp Modes**: алгоритмы растяжения: Beats (ритм), Tones (монофонический тон), Texture (текстуры), Re-Pitch (как на виниле, высота меняется вместе с темпом), Complex и Complex Pro (целые миксы).
43. **Auto-Warp**: автоматическая расстановка Warp-маркеров для длинных сэмплов при загрузке.
44. **Quantize**: выравнивание нот или транзиентов по сетке (Cmd+U).
45. **Global Quantization / Launch Quantization**: момент, в который срабатывает запуск клипа или сцены (например на следующий такт); задаётся в Quantization Menu.
46. **Record Quantization**: квантизация нот прямо во время записи MIDI.
47. **Groove / Groove Pool**: шаблон ритмического «чувства» (свинг, сдвиги, динамика); параметры грува правятся в Groove Pool.
48. **Commit** (Groove): «вписать» грув в клип навсегда: сдвинуть ноты или расставить Warp Markers.
49. **Nudge** (Phase Nudge): кратковременно ускорить или замедлить воспроизведение, чтобы подогнать фазу к внешнему источнику.
50. **Tap Tempo**: задать темп нажатиями на кнопку Tap.
51. **Tempo Follower**: Live подстраивает темп по входящему аудио (например по живому барабанщику).
52. **Link / Link Audio**: синхронизация темпа и фазы по сети с другими приложениями и устройствами; Link Audio (12.4) ещё и передаёт аудио по сети.

### Запуск клипов
53. **Launch Modes**: поведение кнопки запуска клипа: **Trigger** (нажатие запускает), **Gate** (играет, пока клавиша зажата), **Toggle** (нажатие запускает и останавливает), **Repeat** (повтор с шагом квантизации).
54. **Legato** (Legato Mode): новый клип в треке подхватывает позицию воспроизведения предыдущего, без перезапуска с начала.
55. **Follow Actions**: правила, что делать после проигрывания клипа или сцены (Next, Previous, Random, Jump и т. д.), с вероятностями Chance A и B.
56. **Back to Arrangement**: кнопка, которая возвращает треки от Session-клипов к воспроизведению аранжировки.
57. **Capture MIDI**: «поймать» сыгранное без нажатой записи; Live постоянно слушает armed-треки.

### Редактирование и запись
58. **Overdub** (MIDI Arrangement Overdub): дописывать ноты поверх существующих, не стирая их.
59. **Count-In**: отсчёт перед началом записи (меню метронома).
60. **Punch-In / Punch-Out**: запись идёт только внутри границ петли аранжировки.
61. **Take Lanes**: дорожки дублей под основным лейном трека.
62. **Comping**: сборка лучшего дубля из фрагментов нескольких take lanes в main lane.
63. **Consolidate**: склеить выделенные клипы или фрагмент в один новый клип (Cmd+J); для аудио создаётся новый файл.
64. **Split**: разрезать клип в точке или по выделению (Cmd+E).
65. **Fades / Crossfade**: плавное нарастание и затухание громкости на краях аудиоклипа; кроссфейд связывает два соседних клипа.
66. **Crossfader**: DJ-кроссфейдер в микшере; через Crossfade Assign A/B треки распределяются по его сторонам.
67. **Draw Mode**: режим карандаша для нот, velocity и автоматизации (B).
68. **Velocity**: сила удара ноты (0–127), правится в Velocity Editor.
69. **Chance (Probability)**: вероятность, что нота прозвучит; правится в Chance Editor. Probability Groups: Play All и Play One.
70. **MIDI Tools**: Transformations (меняют выбранные ноты) и Generators (создают новые ноты) в Clip View.
71. **Scale Awareness / Scale Mode**: клип «знает» свой лад (Root Note + Scale Name); совместимые устройства и инструменты это учитывают. Фиолетовый цвет в Live означает лад.
72. **Fold / Fold to Scale / Highlight Scale**: свернуть ряды без нот / показать только ноты лада / подсветить ноты лада.
73. **Tuning Systems**: альтернативные строи (Scala .scl и .ascl) вместо стандартного 12-TET.
74. **MPE** (MIDI Polyphonic Expression): отдельные огибающие высоты, давления и тембра для каждой ноты; правятся в MPE Editor.
75. **Linked-Track Editing**: связанные треки, у которых правки (comping, фейды, разрезы) применяются одновременно.
76. **Focus Mode**: при мульти-клиповом редактировании правится только один клип, а остальные остаются видны.

### Автоматизация и модуляция
77. **Automation**: запись изменений параметра во времени (огибающая из breakpoints); красный LED у параметра означает, что он автоматизирован.
78. **Automation Envelope / Breakpoint**: линия автоматизации и её узловые точки.
79. **Automation Arm**: кнопка в Control Bar, которая разрешает записывать движения ручек как автоматизацию.
80. **Re-Enable Automation**: вернуть автоматизацию параметрам, которые перекрыли вручную (их LED серый).
81. **Clip Envelope**: огибающая внутри клипа. Бывает автоматизацией (абсолютные значения) или **модуляцией**: относительное изменение вокруг текущего значения; синий LED означает модуляцию.
82. **Lock Envelopes**: огибающие остаются на месте при перемещении клипов.

### Bounce, Freeze, Resample
83. **Freeze Track**: временно отрендерить трек, чтобы снизить нагрузку на CPU; устройства остаются, но заблокированы.
84. **Flatten**: в Live 12.2+ **переименован в Bounce Track in Place**; старое «Freeze and Flatten» в меню больше не встречается.
85. **Bounce Track in Place**: заменить трек аудиотреком с отрендеренным звуком (после эффектов, до микшера).
86. **Bounce to New Track** (Cmd+B): отрендерить клип или выделение в новый аудиотрек; исходник глушится.
87. **Paste Bounced Audio**: вставить скопированный материал сразу в виде отрендеренного аудио (12.3).
88. **Resampling**: запись выхода Main на аудиотрек; выбирается в Input Type «Resampling».
89. **Stem Separation** (Suite, 12.3+): разделение аудио на Vocals, Drums, Bass, Others.

### Микширование и маршрутизация
90. **Send / Return**: посыл части сигнала трека на return-трек с общим эффектом (Sends A, B…).
91. **Pre/Post**: посыл берётся до или после фейдера, панорамы и активатора трека.
92. **Sidechain**: управление устройством сигналом другого трека, например Compressor давит бас по бочке; включается кнопкой Sidechain в заголовке устройства.
93. **Routing / In/Out**: выбор входа и выхода трека (Audio From / Audio To); Live называет это своим «patchbay».
94. **Gain staging** [общ.]: выстраивание уровней на каждом этапе цепочки, чтобы не было перегруза и шума.
95. **Headroom** [общ.]: запас до 0 dBFS. Внутри Live запас огромный (32-bit float), клиппинг опасен только на выходе из Live: Main, физические выходы, экспорт.
96. **Clipping** [общ.]: перегруз выше 0 dB на выходе, искажение. Пиковый индикатор в микшере показывает максимум.
97. **Peak / RMS**: метры Live показывают и пик (мгновенный уровень), и RMS (ближе к воспринимаемой громкости).
98. **LUFS** [общ.]: единица интегральной громкости для мастеринга и стримингов. **Штатного LUFS-метра в микшере Live руководство не описывает** [?], нужны сторонние или Max for Live измерители.
99. **Track Delay**: сдвиг трека во времени в мс или сэмплах для компенсации задержек.
100. **Delay Compensation**: автоматическая компенсация задержки плагинов (включена по умолчанию).

### Аудиосистема
101. **Sample Rate**: число сэмплов в секунду (44.1 или 48 kHz…); показан в Control Bar.
102. **Buffer Size** [общ.; задаётся в Settings → Audio]: размер аудиобуфера. Меньше буфер, меньше задержка, но выше нагрузка на CPU.
103. **Latency**: задержка между действием и звуком (вход плюс выход). Опция «Keep Monitoring Latency in Recording» выравнивает записанное.
104. **CPU Load Meter / Overload**: средняя или пиковая загрузка аудиодвижка; индикатор Overload горит при перегрузке диска или CPU.
105. **Performance Impact**: 6-сегментный индикатор нагрузки каждого трека в микшере.

### Управление и обучение
106. **MIDI Map Mode / Key Map Mode**: назначение MIDI-контроллера или клавиш компьютера на элементы интерфейса (Cmd+M / Cmd+K).
107. **Computer MIDI Keyboard**: игра нот на клавиатуре компьютера (M).
108. **Similarity Search / Similar Sample Swapping**: поиск похожих звуков и замена сэмпла на похожий в Simpler, Drum Rack и Drum Sampler.
109. **Splice** (12.3+): встроенный каталог сэмплов Splice в Places; есть функция «Search with Sound».
110. **Learn View**: встроенные видеоуроки (12.4+), бывший Help View.
111. **Info View**: контекстная подсказка о любом элементе под курсором.

---

## 5. Визуальная спецификация для дизайнера (упрощённый мок)

### 5.1. Общая сетка окна (в долях; пример для холста 1440×900)

Пропорции я снял со скриншота руководства (окно 1720×1075, вид Arrangement с открытыми браузером, микшером и Device View) **[SS]**. Пиксели пересчитаны на 1440×900 и округлены.

| Регион | X (от–до) | Y (от–до) | Пример 1440×900 | Примечания |
|---|---|---|---|---|
| Заголовок окна macOS (светофор, имя Сета «Untitled») | 0–100 % | 0–2 % | h ≈ 20 | Можно опустить |
| **Control Bar** | 0–100 % | 2.5–5.5 % | y 22–48, h ≈ 26 | Кнопки-«плашки» высотой ≈ 20 px с радиусом 2–3 px |
| **Browser** (sidebar + content pane) | 0.5–21 % | 6–74 % | x 8–300, y 54–665 | Sidebar ≈ 7 % ширины окна, content pane ≈ 13 %. Filter View, если открыт, добавляет ≈ 8.5 % |
| **Main view** (Session или Arrangement) | 22–99.5 % | 6–53 % | x 316–1432, y 54–478 | Справа колонки track headers + track controls ≈ 20 % ширины main view |
| **Mixer** (если открыт) | 22–99.5 % | 54–74 % | y 486–665 | Ширина канала ≈ 85–90 px |
| **Info View** | 0.5–16 % | 75.5–96 % | x 8–230, y 680–865 | |
| **Clip View / Device View** | 17–99.5 % | 75.5–96 % | x 244–1432, y 680–865 | Высота ≈ 20 % окна; Clip View можно растянуть |
| **Status Bar** | 0–100 % | 96.5–99.5 % | y 868–895, h ≈ 24 | Справа: ▲ Clip View toggle, миниатюра клипа, ▶ Device View toggle, имя трека с миниатюрами устройств, иконка микшера и ▼ |
| **Learn View** (если открыт) | ≈ 79.5–99.5 % | 6–96 % | x 1145–1432 | Сужает main view. Чёрная шапка «Learn Live», ниже список модулей |

Расположение «переключателей в углах окна» (с 12.0) **[RN]**: браузер слева вверху (в Control Bar), Session/Arrangement справа вверху (View Selector), Info View слева внизу, Mixer и Clip/Device View справа внизу.

Обычный стартовый экран для мока (рекомендация): Session View, браузер открыт, микшер открыт, внизу Clip View или Device View, Learn View закрыт.

### 5.2. Session View: размеры элементов (по скриншоту «The Session View Mixer»)

- Заголовок трека: h ≈ 18–20 px, заливка цветом трека (пастель), текст «1 Wave Pad» тёмный. Справа у группы и трека с устройствами иконка ◎▼.
- Клип-слот: h ≈ 20 px. Клип залит цветом, слева ▶ (Clip Launch). Пустой слот светлее фона, с маленьким ■ (Clip Stop) слева.
- Ширина трека: ≈ 90–110 px при 100 % масштаба [?].
- Main track: справа, шире (≈ 140–170 px). На каждой строке ▶ Scene Launch и номер сцены справа.
- Return tracks: между обычными треками и Main. Заголовки серые или голубые («A Reverb», «B Delay»).
- Под сеткой строка Track Status (≈ 16 px) с ■ на каждом треке. У Main там две кнопки: Stop All Clips и Back to Arrangement.
- Микшер, сверху вниз: In/Out (≈ 170 px высоты; выпадающие списки и тройка In/Auto/Off), Sends (≈ 80 px; две ручки A и B), секция Volume (≈ 260 px). В секции Volume: поле пика «-∞», поле громкости «-3.0», треугольник-фейдер на шкале метра (0…60 dB), ручка Pan, оранжевый квадрат с номером (Track Activator), «S», кнопка Arm. Внизу цветная полоска цвета трека (≈ 6 px).
- Справа внизу Main: ручка Preview/Cue (синяя дуга), «Solo».

### 5.3. Arrangement View: размеры

- Overview: h ≈ 14–16 px, сверху; цветные полоски клипов в серой рамке.
- Beat-time ruler: h ≈ 14 px, цифры тактов (1, 5, 9…).
- Scrub area с локаторами: h ≈ 14 px (▷ Intro, ▷ Verse 1…).
- Высота свёрнутого трека ≈ 20–22 px; развёрнутого 60–100 px с волной или нотами внутри клипа.
- Справа от дорожек: колонка track header (≈ 120 px; ◎▶ и имя на цвете трека), затем Arrangement Track Controls (≈ 170 px; оранжевый номер-активатор, S, Arm, справа узкий метр).
- Над заголовками: «Set» (овальная кнопка), ← →, кнопки Automation Mode (иконка кривой) и Lock Envelopes (замок), Back to Arrangement (▶≡, оранжевая при активности).
- Снизу: time ruler в мин:сек (0:00, 0:30…), справа иконка волны, «1.00x», «H», «W».
- Плейхед: тонкая вертикальная линия (белая в тёмной теме). Insert marker: мигающий синий.

### 5.4. Цвета

**Тёмное оформление** (Appearance: Dark; снято с промо-скриншота Live 12 на ableton.com, значения приблизительные, JPEG) **[SS]**:
| Роль | HEX |
|---|---|
| Фон окна и Control Bar | `#2B2B2B` |
| Кнопки и поля Control Bar | `#363636` – `#3A3A3A` |
| Фон панелей (лейны аранжировки, микшер, Status Bar) | `#313131` – `#353535` |
| Глубокие поля (кнопки S/Arm в выкл., поле Pan, фон метра) | `#1A1A1C` – `#232426` |
| Основной текст и иконки | `#B5B5B5`; яркий текст `#FEFEFE` |
| Ableton orange: активные Track Activator, Automation Arm, Loop/Warp, заливка CPU meter, активный View Selector | `#FFA83F` – `#F8AD50` |
| Play во время воспроизведения | `#0ECE8B` |
| Поле громкости в Track Controls (бирюзовая заливка значения) | `#62C3C9` / тёмная часть `#007B7D` |
| Зелёный метр | ≈ `#00C853` [?] (в JPEG видно `#008C2F` – `#2ECC40`) |
| Плейхед | `#FBFEFF` |
| Пастельные цвета клипов (примеры) | `#91A8FF` синий, `#5BFFE6` бирюза, `#EDFEAD` бледно-жёлтый, `#D26EDE` пурпур, `#FF9AA2` лосось [?] |

**Светлое оформление** (как в скриншотах руководства) **[SS]**:
| Роль | HEX |
|---|---|
| Фон окна | `#BCBCBC` |
| Панели (браузер, лейны, микшер, Info View, Status Bar) | `#CFCFCF` |
| Пустые Session-слоты | `#DADADA` |
| Кнопки Control Bar | `#9D9D9D` |
| Оранжевый (Show/Hide Browser, Follow, Loop в клипе) | `#FFBA00` – `#FFBD08` |
| Фиолетовый «лада» (Scale Mode) | `#BE99FF` |
| Выделение в браузере | голубовато-серый ≈ `#AFC4CB` [?] |

Смысловые цвета, которые стоит сохранить в моке **[M]**:
- **Оранжевый** = активное состояние (вкл.).
- **Фиолетовый** = scale awareness (лад).
- **Красный LED** = автоматизация, **синий LED** = модуляция, **серый LED** = автоматизация перекрыта вручную.
- **Мигающий синий** = Insert Marker. **Синие цифры** в Arrangement Position = идёт count-in.
- **Красная кнопка Clip Launch** = клип пишется.
- **Полосатая кнопка запуска** = у клипа или сцены есть Follow Action.
- **Цветная кнопка Scene Launch** = у сцены задан свой темп или размер.

**Темы в Live 12** (Settings → Theme & Colors): в списке Theme есть тема **Default** с опциями **Appearance** (Light / Dark; также **Follow System**, то есть следовать системе), **Tone** (Neutral / Cool / Warm) и **Contrast** (High). Опции light/dark, follow OS, warm/cool/neutral и high contrast подтверждает руководство (раздел 2.3.2) **[M]**. Точные подписи Appearance, Tone и Contrast и имя «Default» взяты из форума и CDM **[?]**. Названия «Dark», «Mid Dark», «Mid Light» относятся к темам Live 10 и 11; для Live 12 они не подтверждены **[?]**. Какая тема стоит по умолчанию после установки, проверить не удалось **[?]**. Для мока советую Dark/Neutral: она лучше читается в курсе; либо Light, если нужно, чтобы мок совпадал со скриншотами из руководства.

### 5.5. Иконки (по скриншотам)

- Show/Hide Browser: две вертикальные панели (левая залита оранжевым).
- View Selector: Session «|||» (три вертикальные черты), Arrangement «≡» (три горизонтальные).
- Metronome «○●». Draw Mode: карандаш. Computer MIDI Keyboard: клавиши пианино. Automation Arm: «⟋» с узлами. Re-Enable Automation «←». Capture MIDI: пунктирный квадрат. Session Record «○». Punch-In «⌐╲», Punch-Out «╱¬», Loop: стрелка-петля.
- Mixer View toggle: столбики эквалайзера. Info View: «ⓘ» в кружке.
- Clip Launch ▶ (треугольник). Clip Stop ■. Scene Launch ▶ в столбце Main.

---

## 6. Сюрпризы, переименования и изменения в недавних версиях

1. **Help View → Learn View** (12.4, май 2026) **[RN]**. Встроенные уроки заменены модулями с видео. «Pack lessons» теперь «**Pack Info pages**». Шорткат Cmd+Opt+7.
2. **Master → Main** **[M]**: в Live 12 везде «Main track», «Main Out», «Main output». В Live 11.0 был ещё «Master track»; переименовали в течение 11.x (к 11.3 точно [?]).
3. **«Detail View» больше не используется** в руководстве Live 12 **[M]**: только Clip View и Device View, их можно ставить в стопку (12.0). Шорткат Cmd+Opt+L (Live 11) пропал.
4. **Control Bar перекомпонован в 9 именованных секций** **[M]**. Появились **Scale Settings** (12.0), **Tempo Follower**, **Link drop-down** (12.4), **View Selector** справа и **Browser Config Menu** слева. Селектор Groove Pool убран, теперь Groove Pool включается через Browser Config Menu (12.0).
5. **В Clip View вкладки стали панелями**: Notes tab → **Pitch and Time Utilities** (12.0). Добавлены **Transform** и **Generate** (MIDI Tools, 12.0). Clip box → **Main Clip Properties** и **Extended Clip Properties**. Вкладки редактора: Notes / Envelopes / MPE (MIDI), Sample / Envelopes (аудио) **[M][RN]**.
6. **Mixer в Arrangement View** (12.0) **[RN]**. Секции справа от заголовков треков называются **Arrangement Track Controls**. Секция с метрами в микшере называется **Volume**.
7. **Freeze and Flatten → Bounce Track in Place** (12.2), плюс **Bounce to New Track** (Cmd+B), **Bounce Group** и **Paste Bounced Audio** (12.3) **[RN]**. Freeze Track остался.
8. **Шорткаты, изменённые в 12.0**: браузер Cmd+Opt+5 (старый Cmd+Opt+B тоже работает), Groove Pool Cmd+Opt+6, Metronome **O**, Follow **Opt+Shift+F**, Freeze Cmd+Opt+Shift+F **[RN][M]**. В **12.4** Capture MIDI потерял шорткат: Cmd+Shift+C теперь Copy Time **[RN]**.
9. **Preferences → Settings** (12.0) **[RN]**. Вкладка Look/Feel разделена на **Display & Input** и **Theme & Colors**; появилась отдельная вкладка **Link** (12.4).
10. **Браузер**: лейблы **Modulators** и **Tunings** (12.0), **Splice** (12.3), **Cloud** и **Push** в Places. Filter View получил toggle и меню, добавлены **Quick Tags** (12.2). Новые иконки в сайдбаре (12.3) **[RN][M]**.
11. **Три разных «Follow»** (ловушка для квиза): (а) кнопка **Tempo Follower** с надписью «Follow» рядом с Link; (б) **Follow** switch (автопрокрутка, иконка стрелки) перед Arrangement Position; (в) **Lead/Follow** toggle в Audio Utilities аудиоклипа **[M][SS]**.
12. **Stem Separation** (Suite, 12.3) и **Link Audio** (12.4) **[RN]**: новые функции, которые можно упомянуть в глоссарии.
13. В бета-ветке (12.4.5b–12.4.15b) появился **Extensions SDK** (раздел Settings → Extensions). В релизе 12.4.6 его нет, для курса он пока не нужен **[RN-beta]**.

---

## 7. Непроверенные пункты (сводка)

- Дефолтная тема и Appearance после установки Live 12; точные подписи «Appearance / Tone / Contrast»; есть ли ещё темы, кроме Default.
- Точная надпись в drop area справа от Session-треков. Для Device View проверено: «Drop Audio Effects Here» на скриншоте; для трека без инструмента надпись, вероятно, другая.
- Состав дефолтного Сета (сколько MIDI- и аудиотреков; «A Reverb», «B Delay»). Возвраты A Reverb и B Delay видны в демо-Сете руководства, но это не дефолтный шаблон.
- Ширина трека в Session View в пикселях при 100 % масштаба.
- Полный список цветов Collections, кроме Favorites, Green, Blue, Purple и Gray.
- В какой именно версии 11.x Master переименован в Main.
- LUFS: в руководстве штатный LUFS-метр не найден.
- Все HEX-значения приблизительны: сняты с JPEG/PNG-скриншотов.

---

## 8. Ссылки

Официальное руководство Live 12 (все главы проверены 2026-10-19):
- Live Concepts: https://www.ableton.com/en/live-manual/12/live-concepts/
- First Steps (Learn View, Info View, Settings, Theme & Colors): https://www.ableton.com/en/live-manual/12/first-steps/
- Working with the Browser: https://www.ableton.com/en/live-manual/12/working-with-the-browser/
- Arrangement View: https://www.ableton.com/en/live-manual/12/arrangement-view/
- Session View: https://www.ableton.com/en/live-manual/12/session-view/
- Clip View: https://www.ableton.com/en/live-manual/12/clip-view/
- Audio Clips, Tempo, and Warping: https://www.ableton.com/en/live-manual/12/audio-clips-tempo-and-warping/
- Editing MIDI: https://www.ableton.com/en/live-manual/12/editing-midi/
- MIDI Tools: https://www.ableton.com/en/live-manual/12/midi-tools/
- Using Grooves: https://www.ableton.com/en/live-manual/12/using-grooves/
- Launching Clips: https://www.ableton.com/en/live-manual/12/launching-clips/
- Routing and I/O: https://www.ableton.com/en/live-manual/12/routing-and-i-o/
- Mixing: https://www.ableton.com/en/live-manual/12/mixing/
- Recording New Clips: https://www.ableton.com/en/live-manual/12/recording-new-clips/
- Bounce to Audio: https://www.ableton.com/en/live-manual/12/bounce-to-audio/
- Comping: https://www.ableton.com/en/live-manual/12/comping/
- Working with Instruments and Effects: https://www.ableton.com/en/live-manual/12/working-with-instruments-and-effects/
- Instrument, Drum and Effect Racks: https://www.ableton.com/en/live-manual/12/instrument-drum-and-effect-racks/
- Automation: https://www.ableton.com/en/live-manual/12/automation/
- Synchronizing with Link, Tempo Follower, and MIDI: https://www.ableton.com/en/live-manual/12/synchronizing-with-link-tempo-follower-and-midi/
- Computer Audio Resources and Strategies (CPU meter, Overload): https://www.ableton.com/en/live-manual/12/computer-audio-resources-and-strategies/
- Live Keyboard Shortcuts: https://www.ableton.com/en/live-manual/12/live-keyboard-shortcuts/
- PDF (2026-10-01): https://cdn-resources.ableton.com/resources/pdfs/live-manual/12/2026-10-01/live12-manual-en.pdf

Release notes:
- Live 12 Release Notes (12.0 – 12.4.6): https://www.ableton.com/en/release-notes/live-12/
- Live 12 Beta Release Notes (12.4.15b7): https://www.ableton.com/en/release-notes/live-12-beta/
- Live 11 Keyboard Shortcuts (для сравнения, Cmd+Opt+L = Detail View): https://www.ableton.com/en/live-manual/11/live-keyboard-shortcuts/

Скриншоты, по которым снимал раскладку и цвета:
- Главное окно (светлое оформление): https://ableton-production.imgix.net/live-manual/12/ControlBarL12.png
- Главное окно с Learn View: https://ableton-production.imgix.net/live-manual/12/LearnViewL12.png
- Session Mixer: https://ableton-production.imgix.net/live-manual/12/SessionViewMixer.png
- Browser Layout: https://ableton-production.imgix.net/live-manual/12/BrowserLayoutL12.png
- Arrangement (верх): https://ableton-production.imgix.net/live-manual/12/ArrangementViewTop.png
- Тёмное оформление, промо Live 12: https://beta-ableton.imgix.net/media/gn4nwrrd/web-mixer-improvements.png

Неофициальные источники по темам (только для пунктов с [?]):
- https://cdm.link/twelve-things-to-try-in-live-12/
- https://forum.ableton.com/viewtopic.php?t=250625

Недоступно: help.ableton.com («What's new in Live 12», «Navigation and View Options in Live 12 FAQ») отдаёт 403 (Cloudflare).
