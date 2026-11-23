# 05. Мотивы, теория и MIDI-инструменты Live 12 для медленного атмосферного техно

Исследование для русскоязычного курса по Ableton Live. Ученица — новичок. Цель: медленное, эстетичное, атмосферное техно с «интересными мотивами», ориентир — ISHOME. Не агрессивное клубное техно.

Дата исследования: 2026-10-19. Актуальная версия Live на эту дату: **Live 12.4.6 (15 сентября 2026)**. Источник: https://www.ableton.com/en/release-notes/live-12/

## Условные обозначения

- **[✓ manual]** — проверено в Live 12 Reference Manual на ableton.com.
- **[✓ ableton.com]** — проверено на странице пака, в блоге, release notes или Compare Editions.
- **[~]** — частично проверено, остальное по косвенным данным (что именно, указано рядом).
- **[?]** — не проверено, по памяти или из сторонних источников. Перед публикацией курса нужно сверить в Live.
- **Названия нот.** В Ableton **MIDI 60 = C3** (средняя «до»). Ниже ноты подписаны в нотации Ableton, рядом в скобках номер MIDI. В научной нотации те же ноты будут на октаву выше (MIDI 60 = C4). Для Web Audio: `freq = 440 * 2^((midi − 69) / 12)`.

## 0. Эстетика-ориентир: ISHOME

- ISHOME — проект Мирабеллы Карьяновой. Дебютный альбом *Confession* (2013) Афиша Daily включила в лучшие русские альбомы года. В её музыке смешаны синтетические звуки, атмосферные эмбиент-текстуры и меланхоличные мелодии. Источник: https://daily.afisha.ru/news/77560-ishome-dast-open-eyr-koncert-v-moskve
- Яндекс Афиша описывает её музыку так: «вязкие ритмы», многослойный эмбиент, меланхоличный грув, кинематографичная атмосфера. Источник: https://afisha.yandex.ru/moscow/concert/ishome-2026-08-21
- **Вывод для курса.** Нужны минорные лады с «окрашивающей» нотой (Dorian, Aeolian), длинные пэды и дроны, редкие повторяющиеся мотивы. Мотив оживляют микровариации (вероятность, velocity, фильтр), а не плотность нот. Темп обычно 105–122 BPM. **[?]** Это рекомендация, а не данные о конкретных треках ISHOME. Интервью о её технике продакшна найти не удалось.

---

# ЧАСТЬ A. Теория и композиция

## A1. Лады и гаммы: что даёт нужное настроение

### Почему лады звучат по-разному

Каждый лад — свой набор расстояний от тоники («дома») до остальных нот. Настроение задают одна-две **характерные ноты**: ступени, которыми лад отличается от соседнего. Всё сравнение идёт относительно натурального минора.

| Лад | Ступени (от тоники) | Ноты от D (Ableton) | Ноты от A | Характерная нота | Настроение / как использовать |
|---|---|---|---|---|---|
| **Aeolian / натуральный минор** | 1 2 ♭3 4 5 ♭6 ♭7 | D E F G A B♭ C | A B C D E F G | ♭6 (B♭ в D) | Базовый «тёмный, грустный» минор. ♭6 тянет вниз к 5-й ступени и даёт тоску. Безопасная основа для пэдов и баса. |
| **Dorian** | 1 2 ♭3 4 5 **6** ♭7 | D E F G A **B** C | A B C D E **F#** G | **натуральная 6** (B в D) | Минор, но «светлее» и «воздушнее». Это самый «ISHOME-подходящий» вариант: меланхолия без мрака. Мажорная 6 делает аккорд IV мажорным (G в D Dorian). |
| **Phrygian** | 1 **♭2** ♭3 4 5 ♭6 ♭7 | D **E♭** F G A B♭ C | A **B♭** C D E F G | **♭2** (E♭ в D) | Самый тёмный и напряжённый из «рабочих» ладов. Полутон над тоникой звучит тревожно, «восточно». Использовать дозированно: одна нота E♭ в мотиве или аккорд ♭II. |
| **Минорная пентатоника** | 1 ♭3 4 5 ♭7 | D F G A C | A C D E G | нет полутонов | 5 нот без полутонов, поэтому почти любое сочетание звучит «правильно». Идеальная песочница для новичка и для генераторов (Seed, Random). |
| **Целотонная (Whole Tone)** | 1 2 3 #4 #5 ♭7 | D E F# G# A# C | A B C# D# F G | все шаги по целому тону | Нет «дома»: звучит размыто, мечтательно, «плывёт». Вставлять кусочками на 1–2 такта (переход, «сон»), а не на весь трек. |

Основа таблицы:
- Моды как «вращения» одной гаммы (D Dorian = белые клавиши от D): https://learningmusic.ableton.com/advanced-topics/modes.html
- Dorian = минор с натуральной (мажорной) 6-й, «ярче» натурального минора: https://en.wikipedia.org/wiki/Dorian_mode
- Phrygian = минор с пониженной 2-й ступенью: https://en.wikipedia.org/wiki/Phrygian_mode
- Минорная пентатоника = минор без 2-й и 6-й ступеней: https://learningmusic.ableton.com/advanced-topics/pentatonic.html
- Целотонная: шесть нот, все шаги по целому тону, нет ясной тоники, звучит «размыто» и «блуждающе»: https://learningmusic.ableton.com/advanced-topics/whole-tone.html
- Минор большинство слушателей слышат как «грустный/тёмный»: https://learningmusic.ableton.com/notes-and-scales/minor-scales.html
- Attack Magazine утверждает, что «99,9% техно — минор»: https://attackmagazine.com/technique/tutorials/the-theory-of-techno-pads-part-1

### Объяснение для новичка (простыми словами)

- **♭3 (малая терция)** — главный «минорный» звук. Если в мотиве есть тоника и ♭3 (D–F), он уже звучит минорно.
- **6 или ♭6.** Одна нота меняет цвет: B♭ — «тоска» (Aeolian), B — «светлая грусть, надежда» (Dorian). Это самое полезное упражнение на слух (см. упражнение 1).
- **♭2** — «тень» или «угроза». Одна нота E♭ над D сразу делает звук фригийским.
- **Пентатоника** убирает полутоны, а значит и самые резкие трения. Поэтому она «всегда звучит».
- **Целотонная** лишена тоники и чистой квинты, поэтому ухо не находит «дом».
- **Хроматика (все 12 нот)** не имеет тоники и часто звучит «странно». Большая часть музыки использует подмножества вроде мажора и минора: https://learningmusic.ableton.com/notes-and-scales/adding-more-notes.html

### Как это делается в Live 12

Включить **Scale Mode**, выбрать Root = D и Scale = Dorian. После этого включить **Fold to Scale** (клавиша G) и **Highlight Scale** (K). Подробности в разделе B1.

## A2. Аккорды для медленного атмосферного техно

### A2.1 Строим от трезвучия

- Минорное трезвучие = 1–♭3–5. Dm = D3 F3 A3 (62 65 69). https://learningmusic.ableton.com/chords/minor-triads.html
- Септаккорд = трезвучие + ещё одна терция сверху. Cm7 = C E♭ G B♭. https://learningmusic.ableton.com/advanced-topics/seventh-chords.html
- Правило Attack Magazine для гаммы: **7-ю** берём как ноту гаммы на шаг **ниже** корня (только октавой выше), **9-ю** — как ноту на шаг **выше** корня. Пример в E minor: Em7 = E G B D, Em9 добавляет F#. Мажорные трезвучия для техно часто «слишком светлые», поэтому предпочтение отдают минорным. https://attackmagazine.com/technique/tutorials/the-theory-of-techno-pads-part-1

### A2.2 Каталог аккордов (в D minor / D Dorian; Ableton-ноты и MIDI)

| Аккорд | Ноты | MIDI | Звучание / роль |
|---|---|---|---|
| Dm (трезвучие) | D3 F3 A3 | 62 65 69 | База, «голый» минор |
| **Dm7** | D3 F3 A3 C4 | 62 65 69 72 | Мягче и «джазовее», главный техно-аккорд |
| **Dm9** (открытый) | D2 + F3 A3 C4 E4 | 50 + 65 69 72 76 | Глубокий, «влажный» пэд. Бас отдельно внизу, сверху m7 + 9 |
| Dm(add9) | D3 F3 A3 E4 | 62 65 69 76 | Минор + «воздух» без 7-й |
| **Dsus2** | D3 E3 A3 | 62 64 69 | Нет терции, поэтому ни мажор, ни минор: «подвешенный», нейтральный, открытый |
| Dsus4 | D3 G3 A3 | 62 67 69 | Тоже без терции, напряжённее, хочет разрешиться в Dm |
| Dm11 (dub-цвет) | D2 + A2 C3 F3 G3 | 50 + 57 60 65 67 | Кварта (G) на m7: очень «даб-техно» **[?]** (общая практика, не из конкретного источника) |
| **Открытый Dm7** | D2 A2 F3 C4 | 50 57 65 72 | Корень, квинта, децима, 7 через октаву: «широко», не мутно в низах |

- **sus2 вместо корня, 9 как вариация.** Девятая ступень (= 2-я) — допустимая замена корня или добавка к нему. https://mdecks-music-school.teachable.com/courses/114474/lectures/1726058
- **Удвоение октав.** Тонкие трезвучия уплотняют, добавляя нижние или верхние октавы аккордовых нот. https://attackmagazine.com/technique/tutorials/the-theory-of-techno-pads-part-1
- **Обращения и voicing.** Обращение меняет нижнюю ноту, но не «имя» аккорда. Voicing — расстановка нот аккорда: их можно разнести по октавам и дублировать. https://learningmusic.ableton.com/advanced-topics/inversions.html , https://learningmusic.ableton.com/advanced-topics/voicings.html
- **Практическое правило регистра [?]** (общая практика). Ниже примерно C2 (MIDI 48) держать одну-две ноты (корень и, может быть, квинту). Терции и септимы в низу звучат мутно.

### A2.3 Dub-techno chord stab

- В разборе Attack «Basic Channel style dub techno» аккорд — **минорный аккорд** (D# minor), полученный из сэмпла Live «Chord Dub Chop 24», транспонированного на −7 полутонов. Он играет **синкопированными короткими ударами**. Цепочка обработки: бит-редукция (Redux) → полосовой Auto Filter около 450 Hz с медленным LFO → delay **1/8 dotted** → Filter Delay → короткий reverb → sidechain-компрессия от бочки. Темп примера — 145 BPM. https://www.attackmagazine.com/technique/beat-dissected/basic-channel-style-dub-techno/
- Synth Secrets «Dub Techno Synth Chords» от Attack: звук в первую очередь делают **эффекты** (EQ, фильтры, delay). Пример: Diva, high-pass, LFO на cutoff, EQ Eight с вырезом около 600 Hz, tape echo, на send-канале Auto Filter (high-pass с LFO 0.25 Hz) и двухтаповый delay (1/8 dotted с feedback около 20% + свободный 264 ms с feedback около 85%). Конкретные ноты аккордов в статье не указаны. https://www.attackmagazine.com/technique/synth-secrets/dub-techno-synth-chords/
- **Параллельные аккорды (planing).** Если сэмпл одного аккорда транспонировать (как в примере Attack), форма аккорда сохраняется и параллельно сдвигается по высоте. Отсюда типичный даб-эффект: Dm7 → Cm7 → B♭m7 одной формой. Ноты выходят за пределы гаммы (E♭, D♭), и в этом «туманный» цвет. **[~]** Техника следует из примера Attack (транспонирование сэмпла-аккорда), а сам термин «planing» — общая теория.
- Даб-техно-аккорды чаще всего описывают как минорные, иногда это просто минорное трезвучие. **[~]** Минорные септ- и нон-аккорды для Basic Channel источники **не подтверждают**: это наша стилистическая рекомендация для «атмосферной» версии.

### A2.4 Педаль и дрон

- **Педаль (pedal point)** — выдержанная нота, обычно в басу, пока сверху меняются аккорды. Обычно это тоника или доминанта (5-я ступень). Она даёт ощущение «тяги домой» и напряжение. **Дрон** — «длинная педаль», которой не нужно разрешаться. https://en.wikipedia.org/wiki/Pedal_point
- **Применение.** Дрон D1/D2 (MIDI 38/50) звучит весь трек, а сверху меняются Dm9 → B♭maj7 → C → Dm9. Даже простые аккорды над педалью звучат «кинематографично».

### A2.5 Простые прогрессии и модальные «вампы»

Модальный вамп — 1–2 аккорда, которые качаются туда-сюда. Для гипнотического техно это главный приём: гармония почти стоит, движение дают звук и мотив.

| Прогрессия | В D minor | Voicing с плавным голосоведением (MIDI) | Характер |
|---|---|---|---|
| **i – VI** | Dm9 → B♭maj7 | Dm9: 50 \| 65 69 72 76 → B♭maj7: 46 \| 65 69 70 74 | Общие ноты F и A остаются, поэтому смена очень мягкая. Меланхолия, «кино» |
| **i – iv** | Dm7 → Gm7 | Dm7: 50 \| 65 69 72 → Gm7: 43 \| 65 70 74 | Классический тёмный минор |
| **i – VII – VI** | Dm → C → B♭ | Dm: 62 65 69 → C: 60 64 67 → B♭: 58 62 65 | Нисходящий «эпический» минор (Aeolian) |
| **i – IV (Dorian-вамп)** | Dm9 → G/D | Dm9: 50 \| 65 69 72 76 → G над педалью D: 50 \| 67 71 74 | Мажорный IV даёт «светлую» Dorian-окраску |
| **i – ♭II (Phrygian)** | Dm → E♭ | Dm: 62 65 69 → E♭: 63 67 70 | Тёмный, напряжённый. Брать редко, как «тень» |
| **i – v** | Dm7 → Am7 | Dm7: 50 \| 65 69 72 → Am7: 45 \| 64 67 72 | Холодная минорная «качка» |
| **Одноаккордный вамп** | Dm9 весь трек | — | Движение только фильтром, delay и мотивом. Самый «гипнотический» вариант |

- Hooktheory в агрегированной статистике тегов «techno» и «dorian» называет самыми частыми аккордами i, iv, VI. **[~]** Разметка на этих страницах местами небрежна. https://www.hooktheory.com/theorytab/view/nestrai/techno
- Мелодии в melodic techno часто строятся прямо из **арпеджированных нот аккордов**. Корни аккордов дают бас, аккордовые ноты дают арпеджио. https://attackmagazine.com/technique/tutorials/the-theory-of-techno-pads-part-1
- Плавное голосоведение: двигать голоса как можно меньше. https://sinee.de/en/magazine/musiktheorie-fuer-techno-akkorde-und-voicing-in-ableton-live-in-10-minuten

## A3. Мотивы: как придумать и как развивать

### A3.1 Что такое мотив

Мотив — короткая повторяющаяся идея: мелодическая, ритмическая или гармоническая. Это «наименьшая единица с тематической идентичностью». Его развивают повтором, изменением и секвенцией. https://en.wikipedia.org/wiki/Motif_(music)

Остинато — короткий мотив, который упорно повторяется в одном голосе. В электронике эту роль играет **луп**. https://en.wikipedia.org/wiki/Ostinato

### A3.2 Правила дизайна мотива для атмосферного техно (рекомендации курса)

1. **Клетка из 2–5 нот.** Меньше нот — больше места для звука, delay и воздуха.
2. **Сначала ритм, потом высота.** Нужно 3–5 ударов на 16 шагов с паузами. Хорошо работают позиции «не на долю»: шаги 1, 4, 7, 11, 14 из 16.
3. **Якорь.** Одна нота мотива — тоника (D) или квинта (A), чтобы ухо «держалось».
4. **Одна окрашивающая нота.** В Dorian это B (6-я ступень). Её можно давать с вероятностью 30–50%: «редкий свет».
5. **Шаги + один скачок.** Смесь поступенного движения и скачков делает мелодию запоминающейся (Learning Music, «Love Will Tear Us Apart»). https://learningmusic.ableton.com/make-melodies/love-will-tear-us-apart.html
6. **Повтор с микро-вариацией.** Learning Music разбирает это на двух примерах. В «Praxis» (Ikonika) мелодия — две почти одинаковые двухтактовые фразы, меняется только **последняя нота**: https://learningmusic.ableton.com/make-melodies/praxis.html . В «Tour de France» (Kraftwerk) фразы 1 и 2 отличаются последней нотой, получается «вопрос–ответ»: https://learningmusic.ableton.com/make-melodies/tour-de-france.html
7. **«3 раза одно, 4-й раз иначе».** В «Around the World» (Daft Punk) басовый мотив повторяется 3 раза, затем вариация: https://learningmusic.ableton.com/make-basslines/around-the-world.html
8. **Less is more.** «Ride» (Robert Hood) — один и тот же паттерн на весь трек. Меняется **звук**, а не ноты. Паттерн широко прыгает по регистру, и его можно услышать как две переплетённые партии: верх как мелодию, низ как бас. https://learningmusic.ableton.com/make-melodies/ride.html
9. **Неоднозначное начало.** Сдвиг точки старта того же паттерна меняет восприятие, и «настоящего» начала нет. https://learningmusic.ableton.com/make-melodies/ride-variations.html

### A3.3 Приёмы развития (на одном базовом мотиве)

**Базовый мотив M** (D Dorian, 1 такт = 16 шагов по 1/16; позиции с 1):

| Шаг | 1 | 4 | 7 | 11 |
|---|---|---|---|---|
| Нота | D3 (62) | F3 (65) | C4 (72), **Chance 50%** | A3 (69) |
| Velocity | 100 | 80 | 70 | 90 |

| Приём | Определение | Результат на M | Как сделать в Live 12 |
|---|---|---|---|
| **Повтор с микро-вариацией** | Тот же мотив, мелкие отличия | M ×3, на 4-й раз последняя нота A3 → B3 (Dorian-6) | Duplicate Loop (Cmd/Ctrl+D по loop brace), правка одной ноты; Chance; Velocity Deviation |
| **Секвенция** | Повтор мотива на другой высоте | По ступеням вверх на терцию: F3 A3 E4 C4 (65 69 76 72) | Transpose при активной гамме сдвигает **по ступеням** [✓ manual] |
| **Инверсия (обращение)** | Каждый ход вверх становится ходом вниз | Диатонически вокруг D: D3 → B2 → G2 → E2 (62 59 55 52) для контура D F A C | Invert (при активной гамме работает по ступеням) [✓ manual] |
| **Ретроград** | Мотив задом наперёд | C4 A3 F3 D3 | Reverse (Pitch and Time Utilities) [✓ manual]; Recombine → Mirror [✓ manual] |
| **Ретроград-инверсия** | Инверсия + ретроград | E2 G2 B2 D3 | Invert + Reverse |
| **Аугментация** | Длительности ×2 | Шаги 1, 7, 13, 21 (мотив растягивается на 2 такта) | Stretch ×2 (Double) [✓ manual] |
| **Диминуция** | Длительности ÷2 | Мотив за полтакта, повторяется дважды | Stretch /2 (Halve) [✓ manual] |
| **Смещение (displacement)** | Та же фигура, другое место в такте | Все ноты на +1/16: шаги 2, 5, 8, 12 | Сдвиг выделения стрелками; Recombine → Rotate по Position [✓ manual] |
| **Перестановка высот** | Ритм прежний, высоты переставлены | D A F C | Recombine → Dimension: Pitch → Shuffle или Rotate [✓ manual] |
| **Фрагментация** | Берём часть мотива | Только D3–F3, повторяется | Удалить ноты; короткий loop |
| **Вопрос–ответ** | Фраза 1 заканчивается «открыто», фраза 2 — на тонике | Q: D3 F3 A3 **E3**; A: D3 F3 A3 **D3** | Два клипа или 2 такта в одном |

Источники определений:
- Секвенция, ритмическое смещение, изменение интервалов при сохранённом ритме, фрагментация: https://en.wikipedia.org/wiki/Musical_development
- Инверсия: https://en.wikipedia.org/wiki/Inversion_(music)
- Аугментация и диминуция: https://en.wikipedia.org/wiki/Augmentation_(music)

### A3.4 Нечётные лупы, полиметрия, фазирование

- **Полиметрия в Live.** Короткий луп мотива из 3, 5 или 7 шестнадцатых крутится поверх 4/4. Акцент мотива «гуляет» по такту.
  - Луп 3/16 совпадает с началом такта каждые **3 такта** (НОК(3,16) = 48 шестнадцатых).
  - 5/16 совпадает каждые **5 тактов**, 7/16 — каждые **7 тактов**.
  - Если сочетать 3/16 и 5/16, общий цикл с тактом составит **15 тактов** (240 шестнадцатых). (Расчёт наш.)
- Клип в Session View можно сократить до любого числа шестнадцатых, и клипы разной длины крутятся независимо: https://alijamieson.co.uk/?p=9536
- Мотив из 7 нот «совпадает с сеткой только на 7-м такте»: https://productionmusiclive.com/blogs/news/hypnotic-polymetric-lead-in-analog-melodic-techno-ableton-tutorial
- Полиметрия в техно — с самого рождения жанра, ради «гипнотического» звучания: https://keithmcmillen.com/blog/analog-rytm-programming-with-polymeter/
- Sound On Sound: лупы разной длины (например, 4 такта против «3 такта + доля») дают сдвигающиеся синкопы. Ещё приёмы: понижать Chance у ровной партии; записать результат и выбрать лучшее. https://www.soundonsound.com/techniques/composing-chance
- **Фазирование (идея Steve Reich).** Два одинаковых мотива с чуть разной длиной лупа (16 и 15 шагов) расходятся и сходятся снова. Описание приёма: https://www.waves.com/reel-daw-making-phasey-polyrhythmic-tape-loops
- **Евклидовы ритмы.** k ударов максимально равномерно распределены по n шагам. Примеры: E(3,8) = `x..x..x.` (tresillo), E(5,16) = `x..x..x..x..x...`. https://en.wikipedia.org/wiki/Euclidean_rhythm
  - Наш расчёт (вариант с ударом на шаге 1): E(5,16) = `x...x..x..x..x..`, E(7,16) = `x..x.x.x..x.x.x.`, E(5,8) = `x.x.xx.x`. Это ротации канонических форм.

### A3.5 Вероятность и velocity — «живой» мотив без новых нот

- Пер-нотная **Chance** (0–100%), группы вероятности (Play All / Play One) и **Velocity Deviation** (случайный разброс velocity при каждом проигрывании) подробно описаны в B2 **[✓ manual]**.
- **Рецепт.** Якорные ноты (тоника) — 100%. Окрашивающие — 30–60%. Velocity Deviation — ±10–25. Каждый проход звучит чуть иначе, но мотив узнаётся.
- **Play One** на «аккорде» из 2–3 альтернативных нот на одном шаге: каждый раз звучит одна случайная. Это вариативный мотив без хаоса.

### A3.6 Паттерны арпеджио

- Арпеджио — ноты аккорда по очереди. В «Oblivion» (Grimes) басовая линия — двухтактовый паттерн из нот трезвучия D minor, потом тот же паттерн на B minor. https://learningmusic.ableton.com/make-basslines/oblivion.html
- Для атмосферы: аккорд Dm9 (D3 F3 A3 C4 E4), Rate 1/16 или 1/8, Gate 40–70%, стили **Up**, **UpDown**, **Converge**, **Pinky Up** (нижняя нота чередуется с остальными) **[~]**. Полный список стилей см. B7.

---

## A4. Learning Music (learningmusic.ableton.com): краткий конспект релевантных глав

Сайт: https://learningmusic.ableton.com/. Главы: Beats → Notes and Scales → Chords → Basslines → Melodies → Song Structure → Playground → Advanced Topics.

### Notes and Scales
- **Explore pitch.** Высота — «выше/ниже». Первые упражнения используют пять нот A, C, D, E, G (это ноты пентатоники, но сайт так их не называет). https://learningmusic.ableton.com/notes-and-scales/notes-and-scales.html
- **Keys and scales.** Тоника — «дом», самая устойчивая нота. Гамма — выбранное подмножество нот («палитра»). Мажор слышат как «радостный». https://learningmusic.ableton.com/notes-and-scales/keys-and-scales.html
- **Minor scales.** На примере C minor: минор большинство слышит как «грустный/тёмный», это восприятие, а не правило. https://learningmusic.ableton.com/notes-and-scales/minor-scales.html
- **Adding more notes.** 12 нот (хроматика), диез = бемоль (A# = B♭). Тоники нет, поэтому часто звучит «странно». https://learningmusic.ableton.com/notes-and-scales/adding-more-notes.html

### Chords
- Аккорд — несколько нот одновременно: https://learningmusic.ableton.com/chords/chords.html
- Минорное трезвучие = 1–♭3–5 гаммы (C–E♭–G), звучит «грустно/тёмно»: https://learningmusic.ableton.com/chords/minor-triads.html
- Есть уроки про прогрессию 1-5-6-4 и примеры песен.

### Basslines
- Бас — низкие ноты, обычно поддерживает аккорды. Ритм баса может дополнять барабаны или контрастировать с ними. https://learningmusic.ableton.com/make-basslines/make-basslines.html
- **«Oblivion»** (Grimes) — арпеджированный бас по трезвучию Dm, потом Bm. https://learningmusic.ableton.com/make-basslines/oblivion.html
- **«Around the World»** (Daft Punk) — восходящий «ступенчатый» мотив повторяется 3 раза, потом спуск: повтор с вариацией. Ноты баса подразумевают прогрессию 1-3-5-4. https://learningmusic.ableton.com/make-basslines/around-the-world.html

### Melodies
- Мелодия — одна нота за раз, выше баса. Ритмически подвижнее, шире по диапазону, даёт песне «лицо». https://learningmusic.ableton.com/make-melodies/make-melodies.html
- **«Love Will Tear Us Apart»:** гамма D major, начало на выдержанной E даёт напряжение. Сначала поступенное движение, потом скачки: контраст делает мелодию запоминающейся. https://learningmusic.ableton.com/make-melodies/love-will-tear-us-apart.html
- **«Tour de France»** (Kraftwerk): четыре фразы-вариации, вопрос–ответ через смену последней ноты, третья фраза — транспозиция первой. https://learningmusic.ableton.com/make-melodies/tour-de-france.html
- **«Praxis»** (Ikonika): E minor, синты настроены «между нотами». Две почти одинаковые фразы, меняется последняя нота. Восходящие пятинотные фигуры приходятся на разные доли и создают ритмическое напряжение. https://learningmusic.ableton.com/make-melodies/praxis.html
- **«Ride»** (Robert Hood) — минимал-техно, один паттерн на весь трек, развитие идёт через звук. Широкий диапазон, неоднозначная точка старта. https://learningmusic.ableton.com/make-melodies/ride.html и https://learningmusic.ableton.com/make-melodies/ride-variations.html

### Advanced Topics
- Моды как вращения C major: https://learningmusic.ableton.com/advanced-topics/modes.html
- Пентатоника: https://learningmusic.ableton.com/advanced-topics/pentatonic.html
- Целотонная: https://learningmusic.ableton.com/advanced-topics/whole-tone.html
- Обращения: https://learningmusic.ableton.com/advanced-topics/inversions.html
- Voicings: https://learningmusic.ableton.com/advanced-topics/voicings.html
- Септаккорды: https://learningmusic.ableton.com/advanced-topics/seventh-chords.html
- Также есть уроки про октатонику, пелог и 19-tone.

**Как использовать в курсе.** Learning Music — бесплатный интерактивный тренажёр в браузере. Ученицу стоит отправлять туда за «слуховой» практикой: Notes & Scales → Chords → Melodies (Ride, Praxis) → Advanced (Modes, Pentatonic, Whole tone, Seventh chords, Voicings). Наши упражнения в части C продолжают этот формат и направлены на атмосферное техно.

---

# ЧАСТЬ B. MIDI-инструменты Ableton Live 12 для мотивов

## B0. Что есть в каких редакциях

Источник: https://www.ableton.com/en/live/compare-editions/ **[✓ ableton.com]**

| Что | Intro | Standard | Suite |
|---|:-:|:-:|:-:|
| Keys and Scales (Scale Mode) | ✓ | ✓ | ✓ |
| MIDI Tool Quantize | ✓ | ✓ | ✓ |
| Остальные MIDI Tools (Arpeggiate, Span, Connect, Ornament, Recombine, Strum, Stacks, Rhythm, Seed, Shape, Time Warp, Euclidean, Velocity Shaper, а также Chop, Glissando, LFO из Live 12.1) | ✗ | ✓ | ✓ |
| MIDI-эффекты Arpeggiator, CC Control, Chord, Random, Scale, Note Length, Pitch, Velocity | ✓ | ✓ | ✓ |
| Note Echo | ✗ | ✓ | ✓ |
| Max for Live (полный) | ✗ | ✗ | ✓ (или Standard + аддон) |
| MIDI Tools Pack (Philip Meyer), Sequencers Pack | ✗ | ✗ | ✓ |

Встроенные M4L-инструменты **Velocity Shaper** и **Euclidean** входят и в Standard, и в Suite. https://www.ableton.com/en/live-manual/12/midi-tools/ **[✓ manual]**

**Вывод для курса.** Для работы с мотивами нужен минимум **Standard**. На Intro доступны только Scale Mode, Quantize и MIDI-эффекты.

## B1. Работа с ладом (Keys and Scales / Scale awareness) [✓ manual]

Источник: https://www.ableton.com/en/live-manual/12/editing-midi/ (разделы «Folding and Scales», «Pitch and Time Utilities»).

- **Scale Mode.** Кнопка в Main Clip Properties или в Control Bar. Справа от неё выбор **Root Note** и **Scale Name** для выбранных клипов. Chooser в Control Bar показывает гамму текущего клипа: это не глобальная гамма всего сета. **[~]** Последнее — по сниппету Keys and Scales FAQ (help.ableton.com отдаёт 403).
- **Highlight Scale** (клавиша **K**). Подсвечивает строки нот гаммы и отмечает тонику.
- **Fold to Scale** (кнопка **Scale** в шапке Clip View, клавиша **G**). Скрывает строки вне гаммы. Ноты вне гаммы, если они уже есть, остаются видимы.
- **Fold** (клавиша **F**). Показывает только строки, где есть ноты.
- **Transpose** при активной гамме двигает ноты **по ступеням**, а не по полутонам. **Invert** тоже работает по ступеням.
- **Fit to Scale** — двигает ноты к ближайшей ступени. Недоступен без активной гаммы.
- **Find and Select Notes → Scale filter** — выделяет ноты по гамме.
- **Use Current Scale** в шапке устройств: Arpeggiator, Chord, Pitch, Random, Scale. В Live 12.2 также Meld, Resonators, Spectral Resonator. Параметры высоты тогда работают в ступенях гаммы. https://www.ableton.com/en/live-manual/12/live-midi-effect-reference/ и https://www.ableton.com/en/release-notes/live-12/
- **MIDI Tools.** При активной гамме все «высотные» параметры инструментов работают в ступенях: Distance в Arpeggiate, Spread в Connect, Grace Notes в Ornament, Chord Root в Stacks. **[✓ manual]**
- Названия гамм в chooser: Major, Minor, Dorian, Phrygian, Lydian, Mixolydian, Locrian, Whole Tone, Minor Pentatonic, Major Pentatonic, Harmonic Minor, Melodic Minor, Minor Blues, Hirajoshi, In-Sen, Iwato, Kumoi, Pelog и др. **[?]** Список взят со стороннего форума (константы Push-скрипта). Официального перечня нет, сверить в Live.
- **Идея для гипнотических мотивов.** Включить D Dorian и Fold to Scale. На экране остаются только «правильные» строки, и новичок рисует мотив без фальши. Затем Transpose +2 (по ступеням) даёт секвенцию: мотив сам «перекрашивается» внутри лада.

## B2. Вероятность и разброс velocity на каждой ноте [✓ manual]

Источник: https://www.ableton.com/en/live-manual/12/editing-midi/

- **Chance Editor.** По умолчанию скрыт, включается через Lane Selector. Вероятность ноты задаётся от 0 до 100%: стрелки меняют её шагом 10%, с Shift — точно.
- **Randomize.** Ползунок Randomization Amount задаёт разброс вокруг текущей вероятности. Например, 50% ± 25% даёт значения от 25 до 75%.
- **Probability groups.** **Play All** — одна вероятность на всю группу (нота сыграет вся группа или никто). **Play One** — из группы каждый раз звучит одна случайная нота.
- **Velocity Deviation.** Пер-нотный диапазон velocity: при каждом проигрывании выбирается случайное значение. Задаётся ползунком или Cmd/Ctrl-перетаскиванием маркера velocity.
- **Find and Select Notes.** Фильтры Chance и Condition (Active, Chance, Velocity Deviation). Chance-фильтр добавлен в Live 12.1. https://www.ableton.com/en/release-notes/live-12/
- MIDI Tools Arpeggiate, Connect и Ornament переносят Chance и Velocity Deviation исходной ноты на созданные ноты (Live 12.0.x). **[✓ ableton.com]**
- Per-step «условий» в стиле Elektron (1:2, 3:4, «каждый N-й проход») в клипах Live **нет**. Такие Condition есть только в M4L-устройстве **SQ Sequencer** (Sequencers Pack). **[✓ ableton.com]**
- **Идея.** Мотив D–F–A–C: «C» (шаг 7) — Chance 50%, «A» — Velocity Deviation ±20. Дополнительная Dorian-нота B3 на шаге 14 — Chance 25%. Получается 4–5 вариантов одного мотива, которые случайно чередуются.

## B3. Pitch and Time Utilities (панель Clip View) [✓ manual]

| Функция | Что делает | Приём развития мотива |
|---|---|---|
| **Transpose** | Транспонирует. При активной гамме — по ступеням | Секвенция |
| **Fit to Scale** | Подтягивает ноты к гамме | «Починить» случайные ноты после Seed или записи |
| **Invert** | Переворачивает выделение по вертикали | Инверсия |
| **Intervals: Interval Size + Add Interval** | Добавляет ноту на интервал выше или ниже | Параллельные терции или квинты, аккорды из одноголосия |
| **Stretch, ×2, /2** | Растягивает или сжимает | Аугментация и диминуция |
| **Duration / Set Length** | Одна длина для всех нот | Стаккато или легато мотива |
| **Humanize** | Случайный сдвиг старта до ¼ деления сетки | Лёгкая «живость» |
| **Reverse** | Обращает порядок нот | Ретроград |
| **Legato** | Каждую ноту тянет до следующей | Тягучие «вязкие» линии |
| **Velocity → Randomize** | Случайная velocity | Микро-динамика |
| **Duplicate Loop** (Cmd/Ctrl+D по loop brace) | Удваивает луп с нотами | «3 + 1»: размножить и изменить последний такт |

## B4. MIDI Transformations (панель Transform в Clip View)

Общее для всех **[✓ manual]**:
- Трансформации заменяют выделенные ноты. Работают на выделении нот, на time selection или на лупе клипа.
- **Auto Apply** включён по умолчанию. **Cmd/Ctrl+Enter** — применить. **Reset** — сбросить параметры (сами ноты не трогает).
- С Live 12.1 параметры MIDI Tools можно назначить на MIDI/Key-контроллер, а инструменты — **соединять в цепочку**. https://www.ableton.com/en/release-notes/live-12/

| Tool | Что делает | Ключевые параметры | Идея для гипнотического мотива |
|---|---|---|---|
| **Arpeggiate** [✓] | Разбивает выделенные ноты или аккорд на арпеджио, как MIDI-эффект Arpeggiator | Style (18 паттернов), Distance (в ступенях при гамме), Steps, Rate (влияет и на длину нот), Gate | Нарисовать Dm9 на 2 такта → Arpeggiate Up, Rate 1/16, Gate 50% → «застывшее» арпеджио. Его потом можно редактировать вручную и давать нотам Chance |
| **Chop** [✓] (12.1) | Режет ноты на 2–64 части | Parts, Gaps (паузы после N нот или после каждой), Pattern toggles, Emphasis + Stretch Chunk(s) ×2–8, Variation (случайный сдвиг начала и конца) | Одну длинную ноту D3 → Chop 8 частей с паузами → ритмичная «пульсация» на одной высоте. Классический техно-ход «одна нота, интересный ритм» |
| **Connect** [✓] | Заполняет промежутки между нотами случайными «связками» | Spread (макс. отклонение высоты, в ступенях при гамме), Density (% заполнения), Rate (длина новых нот), Tie (вероятность легато до следующей исходной ноты) | Из 3 якорных нот получить мелодию: Spread 2 ступени, Density 30–50%. При гамме связки остаются в ладу |
| **Glissando** [✓] (MPE, 12.1) | Связывает высоту ноты со следующей через кривую pitch bend | Start (% длины ноты), Curve | «Плывущие» скольжения между нотами мотива. Нужен MPE-совместимый инструмент (Wavetable, Drift, Meld и др.) **[?]** список MPE-инструментов не сверялся. Кривые видны только в MPE-редакторе |
| **LFO** [✓] (MPE, 12.1) | Рисует LFO-кривую на Pitch Bend, Slide или Pressure каждой ноты | Target, Attack/Decay, Shape (Sine, Square, Triangle, Random + Reseed), Rate (1–1/128), Time Shift, Amount, Amplitude Base | Медленное вибрато или «дыхание» тембра: Slide → назначить на cutoff в синте. Velocity не меняет |
| **Ornament** [✓] | Добавляет форшлаги в начало нот | Flam (Flam Position, Flam Velocity) или Grace Notes (Pitch: High/Low/Same; Position; Velocity; Chance; Amount) | Тихий форшлаг на ступень ниже (Low, при гамме — ступень) с Chance 40%: «человеческая» деталь на окрашивающей ноте |
| **Quantize** [✓] | Квантует начало и/или конец, вкл. триоли; Amount — частичная квантизация | Grid/Meter, Start/End, Amount | После живой записи — Amount 50–70%, чтобы оставить «живость» |
| **Recombine** [✓] (переработан в 12.1) | Переставляет **один** параметр между выделенными нотами | Dimension: Position / Pitch / Duration / Velocity; Shuffle (случайно, новый результат при каждом Apply), Mirror (обратный порядок), Rotate (+ Rotation Steps, Rotate on Grid для Position) | Pitch + Rotate: ритм мотива тот же, высоты «сдвинуты по кругу» (D F A C → F A C D). Velocity + Shuffle: перетасовать акценты |
| **Span** [✓] | Меняет длительности: Legato, Tenuto, Staccato | Offset, Variation (случайная длина) | Staccato для «пинговых» мотивов под delay. Legato для вязких линий |
| **Strum** [✓] | Разносит ноты аккорда во времени | Strum Low, Strum High (до одного шага сетки при ±100%), Tension (кривая) | Dm9-пэд с лёгким стрампом звучит «мягче», чем блок-аккорд |
| **Time Warp** [✓] | Ускорение или замедление по кривой | 1–3 Breakpoints (Time, Speed), Quantize, Preserve Time Range, Include Note End | Мотив, «замедляющийся» к концу фразы: эффект «растворения» перед брейком |
| **Velocity Shaper** [✓] (M4L, Standard+) | Перерисовывает velocity огибающей | Envelope, Minimum/Maximum Velocity, Loop, Rotate, Division | Огибающая «волна» с Loop 4 по 16-шаговому мотиву: каждая 4-я нота громче. Rotate сдвигает акцент |

**Список из 18 стилей Arpeggiate / Arpeggiator** **[?]** (по памяти): Up, Down, UpDown, DownUp, Up & Down, Down & Up, Converge, Diverge, Con & Diverge, Pinky Up, Pinky UpDown, Thumb Up, Thumb UpDown, Play Order, Chord Trigger, Random, Random Other, Random Once. В мануале прямо подтверждены: число стилей (18), Up, Down, Converge, Diverge, Play Order, Chord Trigger, Random, Random Other, Random Once.

## B5. MIDI Generators (панель Generate в Clip View)

Общее **[✓ manual]**:
- Генераторы не требуют входных нот. Работают на time selection или лупе клипа.
- Новые ноты **добавляются**, если не пересекаются со старыми, и **заменяют** их при пересечении.
- С 12.1 высоту или диапазон для генератора можно задать кликом или протяжкой по piano ruler. Для Rhythm и Seed одну высоту выбирают через **Alt/Option-клик по piano ruler**.

| Tool | Что делает | Ключевые параметры | Идея для гипнотического мотива |
|---|---|---|---|
| **Rhythm** [✓] | Повторяющийся ритм-паттерн на одной высоте или паде | Steps (до 16), Pattern, Density, Step Duration, Split (вероятность деления шага пополам), Shift, Velocity, Accent, Accent Frequency, Accent Offset | Выбрать D2 → Steps 7, Density 3 → получился 7-шаговый «полиметрический» бас-пульс. Потом отменить выделение, выбрать A2 и добавить второй слой |
| **Seed** [✓] | Случайные ноты в заданных диапазонах | Pitch Range (Min/Max), Duration Range (1/128 – целая), Velocity Range (1–127), Voices, Density (% диапазона) | Scale Mode → D minor pentatonic. Seed: диапазон D3–D4, Voices 1, Density низкая → сгенерировать 10 раз, выбрать лучший «случайный» мотив. **[~]** В мануале сказано только, что при активной гамме слайдер подсвечен фиолетовым. Что Seed генерирует строго в гамме — по косвенным данным, сверить |
| **Shape** [✓] | Ноты по нарисованной или пресетной кривой | Shape Presets / рисование, Min/Max Pitch, Rate, Tie, Density, Jitter | Нарисовать медленную «волну» на 2 такта, Rate 1/8, Density 50%, Jitter 10% → «дышащий» контур мелодии. **[~]** Гамма — как у Seed |
| **Stacks** [✓] | Аккорды или прогрессии в гамме клипа | Chord Selector Pad (схемы на основе Tonnetz), Add/Delete Chord, Chord Root (подстраивается под тонику гаммы; при гамме выбор корня ограничен её нотами), Chord Inversion (с 12.1 отрицательные), Chord Duration и Offset (в восьмых исходной длины). Свои банки аккордов — файлы `.stacks` (JSON, с 12.1) | Сделать вамп i–VI в D minor за 30 секунд, затем Arpeggiate или Strum. Сохранить свой банк «атмосферных» m7/m9/sus2-аккордов |
| **Euclidean** [✓] (M4L, Standard+) | Евклидовы ритмы для 4 голосов | Вкладка Pattern (вкл. голосов, Rotation, кнопка рандома), вкладка Voices (высота или пад, Velocity), Steps, Density, Division | 4 голоса = 4 ноты мотива (D3, F3, A3, C4) с разными E(k,n): E(3,8), E(5,16), E(2,5)… Получается переплетённый «гипнотический» мотив. Rotation сдвигает |

## B6. Прочие MIDI-эффекты (живые, на треке)

Источник: https://www.ableton.com/en/live-manual/12/live-midi-effect-reference/ **[✓ manual]**

| Эффект | Что делает | Ключевые параметры | Идея |
|---|---|---|---|
| **Arpeggiator** | Живое арпеджио из удерживаемых нот | Style, Rate (Sync/Free), Gate, Distance/Steps, Retrigger (Off/Note/Beat), Repeats, Hold, Offset, Groove, Velocity (Decay, Target), Use Current Scale | Медленный Rate 1/8, Gate 60%, Steps 2, Distance +1 октава. Offset сдвигает стартовую ноту — мотив «переворачивается» без новых нот |
| **Chord** | Добавляет до 6 нот к каждой входящей | Shift 1–6 (±36 полутонов или ступени при Use Current Scale), Velocity, **Chance** (вероятность каждой добавленной ноты), Strum (до 400 мс), Tension, Crescendo, Learn | Одна нота → m7 или m9 (+3, +7, +10, +14 полутонов). С Use Current Scale — «диатонические» аккорды, которые меняют качество по ступеням. Chance 50% на 9-й: аккорд «дышит» |
| **Random** | Случайно меняет высоту нот | Chance, Choices (1–24), Interval, Mode (Random / Alt), Sign (Add / Sub / Bi), Use Current Scale | Мотив + Random (Chance 15%, Choices 3, Use Current Scale) → редкие «ошибки» в ладу. Микро-вариация без редактирования клипа |
| **Scale** | Переназначает ноты в гамму | Note Matrix 13×13, Base, Scale Name (+User), Use Current Scale, Transpose, Fold (только User), Lowest/Range | Поставить после Random или Arpeggiator: «ловит» всё в D Dorian |
| **Pitch** | Транспозиция | Pitch (±128 полутонов / ±30 ступеней), Step Up/Down + Step Width, Lowest/Range, Mode (Block/Fold/Limit), Use Current Scale | Автоматизировать Pitch по ступеням → мотив «модулирует» внутри лада |
| **Note Length** | Длина нот | Trigger (Note On/Off), Gate, Length, Time Mode, Release Velocity, Decay Time, Key Scale, Latch | Одинаково короткие «пинги» под delay |
| **Velocity** | Обработка velocity | Operation, Lowest/Range, Out Low/Out Hi, Mode (Clip/Gate/Fixed), Random, Drive, Compand | Random 10–20 → «дыхание» динамики |
| **CC Control** | Отправка CC | Mod Wheel, Pitch Bend, Pressure, Custom A–M | Модуляция внешнего синта |
| **Note Echo** (M4L, Standard+) | MIDI-эхо: повторы нот с падающей velocity | Sync (переключатели в 1/16), Delay Time (мс или % для свинга), Input Thru/Mute, Pitch (транспозиция каждого повтора), Delay (по мануалу — степень падения velocity на повторах **[~]** назначение ручки сверить в Live), Fback, MPE (Press, Slide, Note PB) | Pitch +7 или +12, Fback средний: каждая нота мотива порождает «лестницу» эха. Через синт (а не аудио-delay) у повторов можно менять тембр. Input Mute — только эхо |

Источник Note Echo: https://www.ableton.com/en/live-manual/12/max-for-live-devices/ **[✓ manual]**

## B7. Follow Actions: генеративные вариации клипов [✓ manual]

Источник: https://www.ableton.com/en/live-manual/12/launching-clips/

- **Группа** — подряд идущие клипы на одном треке; пустой слот разделяет группы. Follow Actions бывают и у сцен.
- Параметры: кнопка Follow Action (Shift+Enter), **Follow Action A/B**, **Chance A/B**, **Linked/Unlinked**, **Follow Action Multiplier** (Linked: сколько раз проиграть клип), **Follow Action Time** (Unlinked: через сколько; по умолчанию 1 такт).
- Действия: **No Action, Stop, Play Again, Previous, Next, First, Last, Any, Other, Jump** (Jump с Jump Target).
- Глобальная кнопка **Enable Follow Actions Globally**. Контекстная команда **Create Follow Action Chain**.
- **Legato** (Launch Mode клипа) — новый клип стартует с той же позиции, что и предыдущий, синхронность сохраняется.
- Примеры из мануала: «Temporary loops» (Play Again 80% / No Action 20%), «Cycles» (Next + редкий Any), «Nonrepetitive structures» (нечётные Follow Action Time — порядок почти не повторяется).
- **Идея для гипнотического мотива.**
  1. Сделать 4 клипа-варианта одного мотива: оригинал, с Dorian-нотой B, со смещением на 1/16, инверсия. Все в Legato.
  2. Follow Action A = Play Again 70%, B = Other 30%, Multiplier 2.
  3. Мотив «живёт» часами и почти не повторяется в одном порядке.
  4. Записать в Arrangement и выбрать лучшее.

## B8. Max for Live и паки для генеративной музыки

| Устройство / пак | Тип | Что даёт | Требования | Статус |
|---|---|---|---|---|
| **MIDI Tools by Philip Meyer**: Polyrhythm, Phase Pattern, Stages (генераторы); Retrigger, Slice Shuffler (трансформации) | M4L MIDI Tools | Polyrhythm — полиметрия и полиритмия, 6 генераторов паттернов, в т.ч. евклидовы. Phase Pattern — «органично» меняет тайминг, высоту и velocity. Stages — из пары нот длинные паттерны, по описанию Ableton «от гипнотических грувов до заикающегося стаккато». Retrigger — ретриггеры (ratchets). Slice Shuffler — вариации отдельных кусков клипа | Suite или Standard + M4L, 12.1+ | ✓ https://www.ableton.com/en/packs/midi-tools/ , https://www.ableton.com/en/blog/philip-meyer-midi-tools/ |
| **Sequencers**: Step Arp, SQ Sequencer, Rhythmic Steps | M4L MIDI-эффекты | Step Arp — пошаговый арпеджиатор с 6 значениями на шаг (velocity, длина, **chance**, транспозиция…). SQ Sequencer — до 16 шагов, у каждой дорожки своя длина и направление (**полиметрия**), есть **Condition**. Rhythmic Steps — ударные, вероятности на шаг | Suite или Standard + M4L, **12.2+** | ✓ https://www.ableton.com/en/packs/sequencers/ |
| **Creative Extensions**: Melodic Steps (+ Bass, Poli, Pitch Hack, Gated Delay, Spectral Blur и др.) | M4L | Melodic Steps — секвенсор для «эволюционирующих мелодий», полиритмичных и рандомизированных вариаций | Suite или Standard + M4L, 12.0+ | ✓ https://www.ableton.com/en/packs/creative-extensions/ |
| **Inspired by Nature**: Bouncy Notes (+ Vector Map, Tree Tone, Emit и др.) | M4L | Bouncy Notes — «гравитационный» MIDI-секвенсор: шарики отскакивают по piano roll, можно задать тональность и диапазон. Очень «эмбиентно» | Suite или Standard + M4L, 12.0+ | ✓ https://www.ableton.com/en/packs/inspired-nature/ |
| **Generators by Iftah**: Patterns, Sting | M4L MIDI Tools | Patterns — генератор ударных (6 голосов). Sting — 16-шаговые acid-линии (Type, Root, Transpose, Rate, Density). Для атмосферного техно годится как «сырьё» для баса | Suite или Standard + M4L, **12.3+** | ✓ https://www.ableton.com/en/packs/generators-by-iftah/ |
| **Expressive Chords** | M4L, MPE | Одна нота → аккорд из 52 наборов; strum, инверсии, случайная вариация; импорт своих наборов из MIDI-клипов | **Все редакции** (Intro+), 12.2+ | ✓ https://www.ableton.com/en/packs/expressive-chords/ |
| **Встроенные M4L MIDI-эффекты**: Envelope MIDI, Expression Control (в т.ч. источник Random и Increment), Shaper MIDI, MIDI Monitor, MPE Control, Note Echo | M4L | Модуляция параметров синта от нот. Expression Control → Random → cutoff даёт новый тембр каждой ноте мотива | Note Echo — Standard+; остальные в мануале как M4L devices **[~]** редакции не сверялись | ✓ https://www.ableton.com/en/live-manual/12/max-for-live-devices/ |
| **Polymetric Note Lanes** (Dennis DeSantis) | Сторонний бесплатный M4L (maxforlive.com) | У каждой строки нот своя длина в шагах. Длина клипа = НОК дорожек | M4L; версия Live не указана | **сторонний**, https://dennisdesantis.com/?p=2380 |

**Свои MIDI Tools.** В Max for Live можно собрать собственный Generator или Transformation. Папки: `User Library/MIDI Tools/Max Transformations` и `…/Max Generators`. **[✓ manual]**

**Обучение в самом Live.** С Live 12.4 Help View заменён на **Learn View** с видео-модулями. https://www.ableton.com/en/release-notes/live-12/

## B9. Что **не подтверждено** или чего нет (чтобы не выдумать в курсе)

- Отдельной трансформации «Humanize» в панели Transform **нет**. Humanize — функция в Pitch and Time Utilities. **[✓ manual]**
- «Velocity Shaper» и «Euclidean» — именно **M4L**-инструменты, но входят в Standard. **[✓ manual]**
- «Glissando» существует (MPE-трансформация, 12.1). Это не обычный portamento для любого синта: нужен MPE-инструмент или pitch bend. **[✓ manual]**
- «LFO» среди MIDI Tools — **MPE-трансформация** (Pitch Bend/Slide/Pressure), а не LFO-устройство. Есть и аудио-устройство LFO (M4L) — не путать. **[✓ manual]**
- Пошаговых «trig conditions» в клипах Live нет; есть только Chance и Probability groups. **[✓ manual]**
- В Live 12.2 / 12.3 / 12.4 новых встроенных MIDI Tools не появилось. Новое за это время — паки (Sequencers 12.2, Generators by Iftah 12.3), Expressive Chords (12.2) и улучшения редактирования. **[✓ ableton.com]** по release notes
- Полный список стилей Arpeggiator и список гамм в Scale chooser — **[?]**, сверить в Live.
- Строгая генерация «только нот гаммы» в Seed и Shape при активной гамме — **[~]**, сверить в Live.
- Точное назначение ручки «Delay» в Note Echo — **[~]**, сверить в Live.

---

# ЧАСТЬ C. Упражнения для браузера (Web Audio) → повтор в Ableton

Общие настройки для веб-движка (рекомендация):
- **Темп:** 112 BPM, шаг = 1/16 (≈ 0,134 с).
- **Синт:** triangle или saw → lowpass 1200–2000 Hz, огибающая A 5 ms / D 300 ms / S 0 / R 200 ms.
- **Delay:** 1/8 dotted (≈ 0,402 с при 112 BPM), feedback 0,35, wet 0,3. Это «даб»-воздух.
- **Бочка:** sine 50 Hz с быстрым pitch-спадом, на каждую четверть (шаги 1, 5, 9, 13) — «4/4 якорь».
- **Нотация:** MIDI-номера; имена по Ableton (60 = C3). Сетка: позиции шагов с 1 до 16.

### Упражнение 1. «Одна нота меняет цвет»: Aeolian vs Dorian vs Phrygian
- **Цель:** услышать характерную ступень лада.
- **Мотив** (1 такт): шаг 1 D3 (62), шаг 4 F3 (65), шаг 7 A3 (69), **шаг 11 X**, шаг 14 A3 (69).
  - Aeolian: X = B♭3 (70)
  - Dorian: X = B3 (71)
- **Вторая фраза для Phrygian:** шаг 1 D3 (62), шаг 4 **Y**, шаг 7 F3 (65), шаг 11 D3 (62).
  - Aeolian / Dorian: Y = E3 (64)
  - Phrygian: Y = E♭3 (63)
- **Интерфейс:** три кнопки ладов, дрон D1 (38) снизу. Квиз: «какой лад прозвучал?»
- **В Ableton:** Scale Mode → D Dorian / Minor / Phrygian. Нарисовать мотив и переключить Scale Name. Внимание: переключение гаммы само ноты не меняет — нужно **Fit to Scale** или правка вручную.

### Упражнение 2. «Песочница пентатоники»
- **Цель:** понять, что в пентатонике «нельзя ошибиться».
- **Сетка** 16 шагов × 6 строк: D3 F3 G3 A3 C4 D4 (62 65 67 69 72 74). Максимум 1 нота на шаг. Луп с бочкой.
- **Кнопка «Seed»:** случайно 4–6 нот из этих строк. Кнопка «Заморозить».
- **В Ableton:** Scale Mode D Minor Pentatonic + Fold to Scale (G). Generate → **Seed** (Voices 1, узкий диапазон D3–D4, низкая Density).

### Упражнение 3. «Вероятность»: мотив D Dorian с 50%-нотой
- **Мотив:**

| Шаг | 1 | 4 | 7 | 11 | 14 |
|---|---|---|---|---|---|
| Нота | D3 (62) | F3 (65) | C4 (72) | A3 (69) | B3 (71) |
| Velocity | 100 | 80 | 70 | 90 ± 20 (Velocity Deviation) | 60 |
| Chance | 100% | 100% | **50%** | 100% | **25%** (Dorian-«свет») |

- **Интерфейс:** ползунки Chance для каждой ноты, счётчик «уникальных проходов». Слушать 8 тактов.
- **В Ableton:** Chance Editor (Lane Selector), Velocity Deviation (Cmd/Ctrl-drag маркера velocity).

### Упражнение 4. «Вопрос — ответ»
- **Q** (такт 1): D3 (62) шаг 1, F3 (65) шаг 5, A3 (69) шаг 9, **E3 (64)** шаг 13. Конец на 2-й ступени звучит «открыто».
- **A** (такт 2): D3 шаг 1, F3 шаг 5, A3 шаг 9, **D3 (62)** шаг 13. Конец на тонике: «точка».
- **Вариант 2:** Q заканчивается на A3 (5-я ступень), A — на D3.
- **Задание:** пользователь меняет только последнюю ноту каждой фразы и слушает разницу. Это принцип «Tour de France» и «Praxis».
- **В Ableton:** клип на 2 такта. Duplicate Loop, правка последней ноты.

### Упражнение 5. «Трансформации мотива»
- **Исходник** (D Dorian, ноты по 1/16, шаги 1, 4, 7, 11): D3 F3 A3 C4 (62 65 69 72).
- **Кнопки:**
  - **Inversion** (диатоническая вокруг D3): 62 59 55 52 (D3 B2 G2 E2)
  - **Retrograde:** 72 69 65 62
  - **Retrograde-Inversion:** 52 55 59 62
  - **Augmentation:** шаги 1, 7, 13, 21 (2 такта)
  - **Diminution:** смещения 0, 1.5, 3, 5 шестнадцатых (нужна сетка 1/32: шаги 1, 4, 7, 11 на сетке 1/32), повтор со смещения 8
  - **Sequence +2 ступени:** F3 A3 C4 E4 (65 69 72 76)
  - **Displacement +1/16:** шаги 2, 5, 8, 12
  - **Pitch Rotate:** F3 A3 C4 D3 (65 69 72 62) на тех же шагах
- **В Ableton:** Invert, Reverse, Stretch ×2 и /2, Transpose (по ступеням), стрелки для сдвига, **Recombine** (Pitch → Rotate; Position → Rotate on Grid).

### Упражнение 6. «Цвет аккорда»: от трезвучия к m9
- **Последовательно, по 2 такта каждый, пэд с медленной атакой** (MIDI):
  - Dm: 62 65 69
  - Dm7: 62 65 69 72
  - Dm(add9): 62 65 69 76
  - Dm9 открытый: 50 | 65 69 72 76
  - Dsus2: 62 64 69
  - Dsus4: 62 67 69
  - Открытый Dm7: 50 57 65 72
- **Задание:** «Какой аккорд звучит самым атмосферным?» Сравнить закрытый Dm7 (62 65 69 72) и открытый (50 57 65 72).
- **В Ableton:** Generate → **Stacks** (Chord Root D, подбор схемы) или MIDI-эффект **Chord**. Shift +3 +7 +10 +14 — это m9 от корня.

### Упражнение 7. «Модальный вамп» (+ педаль)
- **Педаль** D1 (38) или D2 (50) весь луп.
- **Прогрессии** (по 2 такта на аккорд, выбор кнопкой):
  - **i–VI:** Dm9 [65 69 72 76] → B♭maj7 [65 69 70 74], бас 50 → 46
  - **i–iv:** Dm7 [65 69 72] → Gm7 [65 70 74], бас 50 → 43
  - **i–VII–VI:** Dm [62 65 69] → C [60 64 67] → B♭ [58 62 65]
  - **Dorian i–IV над педалью:** Dm9 [65 69 72 76] → G [67 71 74], бас всё время 50
  - **Phrygian i–♭II:** Dm [62 65 69] → E♭ [63 67 70]
- **Задание:** включать и выключать педаль. Услышать, как G-мажор над D даёт «Dorian-свет», а E♭ — «тень».
- **В Ableton:** Stacks (Add Chord) или рисовать вручную. Педаль — отдельный клип с длинной нотой.

### Упражнение 8. «Даб-стаб»: аккорд + delay + параллельный сдвиг
- **Аккорд Dm7** (62 65 69 72), длина 1/16, на шагах **3, 7, 11, 16**. Огибающая короткая.
- **Цепочка:** bandpass около 450–800 Hz (медленный LFO на cutoff) → delay **1/8 dotted**, feedback 0,45 → короткий reverb.
- **Кнопка «Planing»:** та же форма аккорда сдвигается целиком на −2 и −4 полутона: Cm7 (60 63 67 70), B♭m7 (58 61 65 68). По 2 такта каждый. Слушать, как «выпадающие из лада» ноты дают туман.
- **В Ableton:** Chord-сэмпл в Simpler, Transpose; или MIDI + Pitch (полутоны, без Use Current Scale). Echo или Delay 1/8 dotted, Auto Filter, sidechain-компрессор от бочки. Цепочка обработки — по примеру Attack.

### Упражнение 9. «Полиметрия: 3 и 5 поверх 4/4»
- **Луп A** (3 шага по 1/16): A2 (57), C3 (60), E3 (64), velocity 100 / 70 / 70. Совпадает с тактом каждые **3 такта**.
- **Луп B** (5 шагов): A3 (69), —, E3 (64), G3 (67), — (паузы на 2 и 5). Совпадает с тактом каждые **5 тактов**.
- **Визуализация:** «круги» с бегущей точкой, счётчик тактов до совпадения. При включении обоих лупов полный цикл — 15 тактов.
- **В Ableton:** Session View, длина лупа клипа 0.0.3 и 0.1.1 (такты.доли.шестнадцатые: 3 и 5 шестнадцатых); или **Rhythm** со Steps 3 / 5; или **Polyrhythm** (MIDI Tools Pack, Suite); или **SQ Sequencer** (дорожки разной длины).

### Упражнение 10. «Евклидов мотив»
- **4 голоса** — 4 ноты мотива, у каждой свой E(k,n) на 16 шагах:
  - D2 (50): E(3,8) повторён дважды = `x..x..x.x..x..x.`
  - A3 (69): E(5,16) = `x...x..x..x..x..`
  - C4 (72): E(2,16) с Rotation 6 = удары на шагах 7 и 15
  - F3 (65): E(7,16) = `x..x.x.x..x.x.x.`, velocity 50 (тихий «фон»)
- **Ручка Rotation** для каждого голоса.
- **В Ableton:** Generate → **Euclidean** (4 voices, у каждого голоса своя высота, Rotation). Или Rhythm.

### Упражнение 11. «Фазирование по Райху»
- **Мотив** (5 нот, D Dorian): D3 F3 A3 C4 B3 (62 65 69 72 71) на шагах 1, 3, 6, 9, 12.
- **Голос 1** лупится каждые **16** шагов, **голос 2** — каждые **15** шагов (тот же мотив, панорама L/R, разный тембр).
- Голоса совпадут снова через 240 шагов = **15 тактов**.
- **Задание:** найти на слух «случайные» новые мелодии, которые возникают из сдвига.
- **В Ableton:** два MIDI-клипа, длина лупа 1.0.0 и 0.3.3 (15 шестнадцатых).

### Упражнение 12. «Арпеджио аккорда»
- **Аккорд Dm9:** D3 F3 A3 C4 E4 (62 65 69 72 76). Rate 1/16, Gate 50%.
- **Переключатель стилей:**
  - **Up:** 62 65 69 72 76
  - **Down:** 76 72 69 65 62
  - **UpDown:** 62 65 69 72 76 72 69 65
  - **Converge:** 62 76 65 72 69
  - **Pinky Up** (верхняя нота между остальными): 62 76 65 76 69 76 72 76 **[~]** интерпретация стиля, сверить
- **Доп. режим:** «5 нот арпеджио в 3/16-лупе» — комбинация с упражнением 9.
- **В Ableton:** MIDI-эффект **Arpeggiator** (Style, Rate, Gate, Use Current Scale) или трансформация **Arpeggiate**, чтобы «заморозить» арпеджио в ноты.

### Упражнение 13. «Целотонный сон» (вставка)
- **Дрон** D2 (50). Такты 1–3: мотив в D Aeolian — D3 F3 A3 G3 (62 65 69 67) на шагах 1, 5, 9, 13.
- **Такт 4:** целотонная фигура D3 E3 F#3 G#3 A#3 C4 (62 64 66 68 70 72) по 1/8, с длинным delay.
- **Такт 5:** возврат на D3.
- **Задание:** услышать «потерю почвы» и возвращение домой.
- **В Ableton:** Scale Mode → Whole Tone на отдельном клипе-переходе. Или Pitch / Scale-эффект на коротком отрезке.

### Упражнение 14. «3 + 1» и «Less is more»
- **Такты 1–3:** мотив из 3 нот — A2 (57) шаг 1, C3 (60) шаг 7, E3 (64) шаг 11.
- **Такт 4:** последняя нота E3 → **G3 (67)** или пауза.
- **Задание:** сравнить с перегруженной версией (те же ноты + 6 случайных) и выбрать.
- **Вывод:** меньше нот = больше места для delay и звука.
- **В Ableton:** Duplicate Loop ×4, правка 4-го такта. Follow Actions: «Play Again 75% / Next 25%» между клипами «оригинал» и «вариация».

### Формат данных для веб-движка (предложение)

```json
{
  "id": "ex03-probability",
  "bpm": 112, "stepsPerBar": 16, "bars": 1, "loopSteps": 16,
  "scale": {"root": "D", "mode": "dorian", "notes": [62,64,65,67,69,71,72]},
  "drone": 38,
  "notes": [
    {"step": 1,  "midi": 62, "vel": 100, "chance": 1.0},
    {"step": 4,  "midi": 65, "vel": 80,  "chance": 1.0},
    {"step": 7,  "midi": 72, "vel": 70,  "chance": 0.5},
    {"step": 11, "midi": 69, "vel": 90,  "velDev": 20, "chance": 1.0},
    {"step": 14, "midi": 71, "vel": 60,  "chance": 0.25}
  ],
  "fx": {"delay": {"time": "1/8d", "feedback": 0.35, "wet": 0.3}, "lowpassHz": 1600},
  "abletonHint": "Chance Editor + Velocity Deviation; Scale Mode D Dorian"
}
```

Для полиметрии у каждой партии свой `loopSteps` (например 3, 5, 15).

---

## Источники

**Ableton Live 12 (официальные)**
- MIDI Tools (мануал): https://www.ableton.com/en/live-manual/12/midi-tools/
- Editing MIDI (Scale Mode, Fold/Highlight, Chance, Velocity Deviation, Pitch and Time Utilities): https://www.ableton.com/en/live-manual/12/editing-midi/
- Live MIDI Effect Reference: https://www.ableton.com/en/live-manual/12/live-midi-effect-reference/
- Max for Live Devices (Note Echo и др.): https://www.ableton.com/en/live-manual/12/max-for-live-devices/
- Launching Clips (Follow Actions, Legato): https://www.ableton.com/en/live-manual/12/launching-clips/
- Release notes Live 12 (до 12.4.6): https://www.ableton.com/en/release-notes/live-12/
- All new features in Live 12: https://www.ableton.com/en/live/all-new-features
- Compare editions: https://www.ableton.com/en/live/compare-editions/
- MIDI Tools Pack: https://www.ableton.com/en/packs/midi-tools/ и блог https://www.ableton.com/en/blog/philip-meyer-midi-tools/
- Sequencers Pack: https://www.ableton.com/en/packs/sequencers/
- Creative Extensions: https://www.ableton.com/en/packs/creative-extensions/
- Inspired by Nature: https://www.ableton.com/en/packs/inspired-nature/
- Generators by Iftah: https://www.ableton.com/en/packs/generators-by-iftah/
- Expressive Chords: https://www.ableton.com/en/packs/expressive-chords/
- Keys and Scales FAQ (сайт отдаёт 403, данные по сниппету): https://help.ableton.com/hc/articles/11425083250972

**Learning Music (Ableton)**
- https://learningmusic.ableton.com/ и все страницы, перечисленные в A4

**Теория / техно-продакшн**
- Attack Magazine — Theory of Techno Pads pt.1: https://attackmagazine.com/technique/tutorials/the-theory-of-techno-pads-part-1
- Attack — Basic Channel style dub techno: https://www.attackmagazine.com/technique/beat-dissected/basic-channel-style-dub-techno/
- Attack — Dub Techno Synth Chords: https://www.attackmagazine.com/technique/synth-secrets/dub-techno-synth-chords/
- Sound On Sound — Composing with chance: https://www.soundonsound.com/techniques/composing-chance
- Keith McMillen — polymeter: https://keithmcmillen.com/blog/analog-rytm-programming-with-polymeter/
- Production Music Live — polymetric lead: https://productionmusiclive.com/blogs/news/hypnotic-polymetric-lead-in-analog-melodic-techno-ableton-tutorial
- Ali Jamieson — полиритмы в Ableton: https://alijamieson.co.uk/?p=9536
- Waves — phasing loops: https://www.waves.com/reel-daw-making-phasey-polyrhythmic-tape-loops
- Dennis DeSantis — Polymetric Note Lanes: https://dennisdesantis.com/?p=2380
- Hooktheory (techno, статистика): https://www.hooktheory.com/theorytab/view/nestrai/techno
- Sinee — Akkorde & Voicing in Ableton: https://sinee.de/en/magazine/musiktheorie-fuer-techno-akkorde-und-voicing-in-ableton-live-in-10-minuten
- mDecks — sus2 substitution: https://mdecks-music-school.teachable.com/courses/114474/lectures/1726058
- Wikipedia: Dorian mode https://en.wikipedia.org/wiki/Dorian_mode ; Phrygian mode https://en.wikipedia.org/wiki/Phrygian_mode ; Motif https://en.wikipedia.org/wiki/Motif_(music) ; Musical development https://en.wikipedia.org/wiki/Musical_development ; Inversion https://en.wikipedia.org/wiki/Inversion_(music) ; Augmentation https://en.wikipedia.org/wiki/Augmentation_(music) ; Pedal point https://en.wikipedia.org/wiki/Pedal_point ; Ostinato https://en.wikipedia.org/wiki/Ostinato ; Euclidean rhythm https://en.wikipedia.org/wiki/Euclidean_rhythm

**ISHOME**
- https://daily.afisha.ru/news/77560-ishome-dast-open-eyr-koncert-v-moskve
- https://afisha.yandex.ru/moscow/concert/ishome-2026-08-21
