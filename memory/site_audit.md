# Глибокий аудит 8 референсних сайтів (Awwwards-рівень)

Дата аудиту: аналіз живого HTML/DOM кожного сайту.
Мета: зрозуміти дизайн, анімації, 3D, переходи, структуру, кольори та стек — для майбутньої реалізації власного сайту.

---

## 1. advanced.team — Digital Design Boutique (Україна)

**Позиціонування:** Awwwards/FWA-студія, "інтерсекція дизайну і технологій", 32+ нагороди.

**Стек (докази з DOM):**
- CMS: **MODX** (компонент `phpthumbof` у шляхах картинок — 100% ознака MODX)
- Custom **Web Components** (кастомні теги: `<gl-model>`, `<gl-advanced-letter>`, `<animated-header>`, `<image-marquee>`, `<showreel-video>`, `<sticky-mouse-el>`, `<interactive-image>`)
- **Three.js / WebGL**: 3D сцени з `.obj` моделями + HDR environment maps (`matprev_env.hdr`, `studio-glow.hdr`), фізичний матеріал (roughness/metalness/envMapIntensity), area lights, bloom, mouse-rotation параметризовано через JSON-атрибути
- Кастомний smooth scroll (`.v-scroll__container`, `custom-scroll`)
- AJAX page transitions (`<page-ajax-loading>`, `data-v-pageajax-name`)
- Прелоадер з прогрес-баром (`.v-preloader`, фон #000)
- Turnstile (Cloudflare) для форм

**3D:** Головна фішка — 3D літера "A" у hero (метал/скло look, реагує на мишу) + 3D рука в contact-секції. Всі параметри сцени (світло, камера, ease) винесені в JSON-конфіг у HTML-атрибутах — дуже гнучка архітектура.

**Анімації:**
- Анімовані заголовки (порядкове розкриття)
- Marquee-рядки ("Awards — Recognition", "Let's talk — Contact us")
- Sticky-mouse елементи (кнопки-магніти, що липнуть до курсора)
- Круглі кнопки з обертовим текстом по колу (SVG ico + rotating text)
- Interactive-image: blur-in + scale + video-on-hover у превʼю проєктів
- Custom cursor ("Show respect" like-кнопка)

**Структура сторінки:** Hero (3D) → Showreel video → About (великий заголовок + кнопка) → Services (список + image marquee) → Portfolio grid (12 проєктів, відео-превʼю) → Awards (лічильники) → Contact (3D рука + marquee).

**Кольори:** Чорний (#000) фон, білий текст, монохром + металеві 3D-об'єкти. Строгий dark luxury.

**Трендовість:** Класика високого Awwwards-стилю 2021-2023: dark, 3D hero-об'єкт, magnetic buttons, marquee. Досі виглядає дорого.

---

## 2. neundex.com — Yannis Yannakopoulos (Греція, індивідуальний креативний розробник)

**Стек (докази):**
- CMS: **WordPress** (клас `wp-theme-neundexresources`, `wp-content/uploads`) — headless-подібне кастомне темування
- **Barba.js** (`data-barba="wrapper"`, `data-barba-namespace`) — SPA-переходи між сторінками
- **Locomotive Scroll** (`data-scroll-container`) — smooth scroll
- **Curtains.js / WebGL planes** (`gl-plane`, `data-sampler="planeTexture"`, `crossorigin` на img, `#canvas-wrapper`) — картинки рендеряться як WebGL-площини з шейдерними ефектами (деформація при скролі/ховері)
- CDN: **BunnyCDN** (neundex.b-cdn.net)
- Компонентна архітектура через `data-component="HeroGlTitle"`, `IndexGrid`, `HomeInfo`
- Прелоадер з % лічильником

**Дизайн:**
- Гігантський SVG-заголовок "neundex" на весь екран (векторний, теж WebGL-plane)
- Швейцарська сітка (Bootstrap-подібні `col-md-5`, `offset-md-3`) — асиметрична шахова розкладка проєктів (чергування offset)
- Індексна типографіка: "unselected projects (27)", нумерація 01–27
- Інфо-блок у табличному стилі: location / coordinates (37.9838° N) / availability 05/2026 — тренд "технічного паспорта"

**Кольори:** Мінімалістичний монохром (світлий фон, чорний текст), акцент на фото проєктів.

**Анімації:** GL-деформації картинок, flip-ефекти карток (`is-flip`), js-in reveal при скролі.

**Трендовість:** Взірець "creative developer portfolio": мінімум UI, максимум типографіки і WebGL-текстур. Дуже актуально.

---

## 3. buzzworthystudio.com — Brooklyn Creative Web Studio

**Стек (докази):**
- Статичний кастомний фронтенд + **Prismic** (headless CMS — усі медіа з images.prismic.io)
- **GSAP + ScrollSmoother** (`#smooth-wrapper`, у коментарях: `gsap.min.js`, `gsap-bundle.min.js`)
- **WebGL** (`#webglBubble` — фонова інтерактивна "бульбашка"/метабол)
- Lottie (класи `work-lottie`)
- AJAX-переходи: `.page-to-page` з SVG-path морфінгом (`#pageBgAnim`) — шторка з заокругленими кутами кольору #1D2145
- Кастомна грід-система (класи `bs-xl-*`, `bs-xs-os-*`)
- Lazy-load картинок (клас `lazy`, data-src)

**Дизайн:**
- Тема: **гексагони/бджоли** (Buzzworthy) — послідовний брендінг: hex-патерни, гекс-курсори, "LOADING ECOSYSTEM" прелоадер із анімованим SVG stroke (pathAnim)
- Величезна hero-типографіка "Creative Web Studio" (клас bs-220 — 220px) зі split-chars анімацією
- USP-карусель у шапці ("We → Turn Vision into Value / Unlock Potential ...")
- Проєкти: SVG `<mask>` + `<image>` — маскове розкриття превʼю
- Stacked cards секція "Attitude" (5 правил, картки складаються при скролі)
- Draggable слайдер відгуків з прогрес-баром
- Метрики-цифри (bounce rate -34%, traffic +396%) — конверсійний сторітелінг

**Кольори:** Темно-синій **#1D2145** (фон), off-white **#EEEEF2** (текст/лінії), червоний акцент, білий. 

**Трендовість:** "Personality-driven" агентський сайт: сильна метафора бренду + GSAP-хореографія. Виділяється характером, не 3D.

---

## 4. non-linear.studio — Design Studio (NYC / Utah / Tallinn)

**Стек (докази):**
- **Astro** (`data-astro-cid-*` атрибути всюди) — SSG з острівною гідрацією
- **Taxi.js** (`data-taxi`, `data-taxi-view`) — page transitions (наступник Highway.js)
- **Three.js r178** (`<canvas class="gl" data-engine="three.js r178">`, `data-gl-world`) — глобальна WebGL-сцена
- **GSAP + SplitText** (`data-split="words"/"chars"`, `data-paragraph`)
- Smooth scroll (`is-smooth` на body; ймовірно Lenis)
- CMS: **Sanity** (cdn.sanity.io/images/ji7i6g9r)
- Відео: **Vimeo progressive redirect** (self-hosted look, без iframe)
- Scramble-текст на ховерах (`data-hover-scramble`)
- GL-media: у картинок `data-gl-src` + `data-gl-next` — WebGL image transitions між двома текстурами

**Дизайн:**
- Hero: інтерактивний 3D-обʼєкт, який можна крутити ("Psst...Hey, you there. Give me a spin") + кастомний курсор-лейбл + прогрес-бар циклу таглайнів
- Кути-рамки (corner brackets) навколо hero-боксів — HUD/технічна естетика
- Секції: hero → фулскрін відео (кастомний плеєр + video-cursor) → маніфест ("No templates. No repetition.") → marquee → featured projects (sticky + прогрес-бар) → recognitions (табличні лічильники нагород) → industries (список з індексами /08) → testimonials slider
- Клієнти: Nike, Netflix, GM, PayPal, Luka Dončić

**Кольори:** Світло-сірий #E2E2E2, теракота #A8674A, оливковий #4B681C, глибокий чорний #1A1A1A — землиста, стримана палітра (сцени hero міняють колір фону).

**Трендовість:** Найсучасніший з усіх — Astro + Taxi + Three.js + scramble/split анімації, "engineering-grade" мінімалізм 2025-2026.

---

## 5. zhenyary.com — Zhenya Rynzhuk (арт-директор, Sochnik)

**Стек (докази):**
- **Nuxt 2 / Vue 2** (`#__nuxt`, `#__layout`, `data-n-head`, scoped `data-v-*`)
- Кастомний **WebGL canvas** (глобальний `<canvas>`)
- Кастомний smooth scroll (translate3d на `.scroll` контейнері + progress bar `scale3d`)
- Розробка: **Romain Avalle** (вказано в подяці)
- Прелоадер: кольорові кола (red/pink) + "Hey!"

**Дизайн:**
- Fashion-editorial стиль: величезна засічкова типографіка, курсиви, підкреслення, зірочки-спіннери (SVG star), смайлик
- Hero: портрет із hover-свапом кадрів (11 різних фото miss-N по руху миші — "жива" фотографія), розрізаний заголовок "Zhenya / Rynzhuk" (left/right частини роз'їжджаються при скролі)
- Сервіси: рядкова анімація по літерах (кожен char - span з translateX), blur-ефекти на курсивних словах (multi-layer `inner-blur` — трендовий motion blur текст)
- Проєкти: гігантська фонова літера (C, R) за карткою кейсу, parallax картинок з scale
- Контакти: рядки з стрілками, які виїжджають знизу (translateY + scaleY)
- Числова сітка 01–09 на фоні + вертикальні/горизонтальні лінії, що малюються

**Кольори:** Nude/беж фон (`body.color1`), рожевий, червоний, чорний текст — тепла fashion-палітра.

**Трендовість:** Еталон "editorial/art-direction portfolio" (SOTD). Типографіка як головний герой.

---

## 6. thefirstthelast.agency — TFTL (Дубай / Маямі)

**Стек (докази):**
- **Nuxt 3 / Vue 3** (`#__nuxt`, `data-capo` — nuxt-capo head ordering, `#teleports`)
- **Lenis** smooth scroll (`html.lenis.lenis-smooth`)
- **Lottie** (анімований логотип у прелоадері — SVG lottie DOM)
- CMS: ймовірно **Strapi** (медіа з cdn.thefirstthelast.agency з хеш-суфіксами `_e9aec4a1dd.mp4` — патерн Strapi uploads)
- Відео: self-hosted mp4/webm через власний CDN
- CSS custom properties `--vh/--vw`, scoped styles

**Дизайн:**
- Головна метафора: **кольорові стрічки-теги (chips)**, розкидані по всьому сайту (в прелоадері, меню, hero, секції тегів) — "sticker/label" естетика
- Прелоадер: % + падаючі кольорові теги + Lottie-логотип
- Hero: величезний заголовок "Success Designed Differently" (пословне розкриття) + фулскрін showreel з таймкодом (00:00) і кастомним курсором "Expand Video"
- Works: горизонтальний скролер проєктів (sticky, 1/4 → 4/4) з відео-фонами і parallax (`should-parallax`)
- Sticky-секції зі "big-title" (360° Agency)
- Секція-хмара з 28 кольорових тегів, що розлітаються при скролі
- Контакти: фото CEO, живий годинник по містах, адреси Miami/Dubai

**Кольори (точні):** жовтий #F5CC53, рожевий #F49FC5, червоний #E93223, кремовий #F2FBE0, зелений #34B550, лаванда #CBBEDC, помаранч #F05E23, магента #E97EFF, графіт #232323. Максимально соковита, "candy" палітра на нейтральному фоні.

**Трендовість:** Тренд 2024-2026 "colorful chips + bold statement typography". Дуже впізнавано.

---

## 7. midlife.engineering — Sound therapy / інтерактивний аудіо-експіріенс

**Стек (докази):**
- **Framer** (коментар "Made in Framer", framerusercontent.com, `data-framer-hydrate-v2`) → тобто React + **Framer Motion** (motion.mjs модулі) під капотом
- **Lenis** (`html.lenis`, модуль SmoothScroll_Prod.mjs)
- Кастомні code-components всередині Framer (термінальний рядок `$ ME|` з blink-анімацією)
- Google Fonts: Fragment Mono; кастомні: **PP Neue Montreal**, Manrope, Aspekta

**Дизайн:**
- Центральний артефакт: **повністю відтворений синтезатор OP-XY (Teenage Engineering)** з DOM-елементів — сотні кнопок з правильними тінями (multi-layer box-shadow), спікер-грілка з крапок, екран. Інтерактивний "прилад" замість hero-картинки
- Скевоморфізм 2.0: глибокі багатошарові тіні (10+ layers box-shadow), noise-текстури (repeat png)
- Стиль "продукт + гумор": відгуки від "Inbox Ian", "Overwhelmed Oliver", рейтинги 4.0/5
- Marquee "midlife needs harmony ☮︎" (152px шрифт)
- Плаваюча пігулка-нотифікація "Christmas treat" з gif
- Круглий логотип-бейдж (помаранчеве коло)

**Кольори (точні токени):** фон #EBEBEB (світло-сірий), акцент **#FF611A** (помаранчевий), текст #262626, темний прилад #2A2A2E/#141416, сірий #A8A8A8. Мінімальна дуотонна палітра: сірий + помаранч.

**Трендовість:** Пік тренду 2025-2026 — "інтерактивна іграшка як сайт", скевоморфні прилади, звук як UX. Зроблено 1042 Studio.

---

## 8. lightweight.info/en — Carbon Wheels (продуктовий бренд, Німеччина)

**Стек (докази):**
- **Next.js** (React) (`next/image` з `_next/image?url=`, `next-route-announcer`, CSS Modules хеші `HomeHero3D_section__PJYu9`)
- **Three.js r176** (canvas `data-engine="three.js r176"`, ймовірно React Three Fiber)
- **GSAP ScrollTrigger + ScrollSmoother** (`#smooth-wrapper`/`#smooth-content`, `pin-spacer`, `data-speed`, `data-lag`, inline `translate: none; rotate: none; scale: none` — сигнатура GSAP)
- CMS: **Sanity** (cdn.sanity.io/images/bxwc52hl, класи SanityLink, SanityVideo, SanityForm)
- Відео: **Vimeo player** (кастомізований, controls=0, background)
- Прелоадер з progress bar (`--progress: 0.206`)

**Ключова механіка:** ГІГАНТСЬКИЙ pin-scroll hero: pin-spacer висотою **213 440px** (!) — все перше знайомство з продуктом це одна прикріплена 3D-сцена колеса, яка обертається/трансформується під скрол, з 5 текстовими розділами (WELCOME → PHILOSOPHY → CRAFT → INNOVATION → EVOLUTION), scroll-timeline навігація зліва (01 philosophy / 02 craft / 03 innovation).

**Анімації:**
- Char-level 3D розкриття заголовків: кожна літера `rotateX(-90deg) rotateY(-15deg) + translate` — "фліп" літер
- Плюсики "+" як бренд-мотив (кути секцій, кнопки, розділювачі, обертаються)
- Кола-виміри (LargeCircle) навколо 3D-колеса — креслення/blueprint естетика
- Grain overlay (canvas шум поверх сторінки)
- Page transitions: темна шторка з колами (RoutingContext_curtain)
- Parallax картинок (data-speed="auto")
- Next/image + base64 SVG blur-placeholder (LQIP)

**Кольори:** Світла тема (#fff/світло-сірі градієнти), чорний текст, монохром + продуктова фотографія; темні (theme-dark) інверсні секції. Інженерна чистота.

**Трендовість:** Еталон продуктового 3D-сторітелінгу 2025-2026 (стиль Apple product pages): scroll-driven 3D, техномінімалізм, blueprint-мотиви.

---

# ЗВЕДЕНИЙ АНАЛІЗ (крос-патерни)

## Стеки — хто на чому
| Сайт | Framework | Scroll | 3D/WebGL | Переходи | CMS |
|---|---|---|---|---|---|
| advanced.team | Vanilla + Web Components | custom | Three.js (.obj + HDR) | custom AJAX | MODX |
| neundex.com | WordPress (custom theme) | Locomotive | Curtains.js planes | Barba.js | WordPress |
| buzzworthystudio | Vanilla JS | GSAP ScrollSmoother | WebGL bubble | AJAX + SVG morph | Prismic |
| non-linear.studio | **Astro** | Lenis-like | Three.js r178 | **Taxi.js** | Sanity |
| zhenyary.com | Nuxt 2 (Vue) | custom | custom canvas | Nuxt router | — |
| thefirstthelast | **Nuxt 3** | **Lenis** | — (відео замість 3D) | Vue transitions | Strapi (ймов.) |
| midlife.engineering | **Framer** (React+Motion) | Lenis | — (DOM-скевоморфізм) | Framer | Framer |
| lightweight.info | **Next.js** | **GSAP ScrollSmoother** | **Three.js/R3F** | custom curtain | Sanity |

## Спільні патерни (зустрічаються у 6-8 з 8):
1. **Прелоадер з прогресом** (%, бар або анімація) — у всіх 8
2. **Smooth scroll** (Lenis / ScrollSmoother / Locomotive / custom) — у всіх 8
3. **Split-text анімації** (по словах/літерах, reveal при скролі) — 7/8
4. **Кастомний курсор / cursor-follower** — 6/8
5. **Marquee (біжучий рядок)** — 6/8
6. **SPA-переходи між сторінками** (шторки, морфи) — 7/8
7. **Headless CMS** (Sanity ×2, Prismic, Strapi, MODX, WP) — 6/8
8. **Відео-шоуріли** з кастомними плеєрами і video-cursor — 5/8
9. **Sticky/pin секції** зі scroll-driven хореографією — 6/8
10. **Нумерація/індекси** (01, /08, 1/4) — технічна типографіка — 7/8
11. **Таблиці нагород/лічильники** (Awwwards ×N) — 5/8

## Тренди 2025-2026, які видно:
- **Scroll-driven 3D сторітелінг** (lightweight — pin на 200k px)
- **Інтерактивна іграшка як hero** (midlife — синтезатор; non-linear — spin-обʼєкт)
- **Scramble/decode текст-ефекти** (non-linear)
- **Кольорові chips/стікери** (TFTL)
- **Motion blur текст** (zhenyary)
- **Blueprint/HUD естетика**: плюсики, кути-брекети, координати, лічильники (lightweight, non-linear, neundex)
- **Astro замість Next** для контентних креативних сайтів (non-linear)

## Кольорові стратегії:
- **Dark luxury монохром**: advanced.team, buzzworthy (navy #1D2145)
- **Light інженерний мінімал**: lightweight, neundex, midlife (сірий + 1 акцент #FF611A)
- **Землиста стримана**: non-linear (#E2E2E2 / #A8674A / #4B681C)
- **Candy multicolor**: TFTL (8 яскравих кольорів на графіті #232323)
- **Fashion nude**: zhenyary (беж/рожевий/червоний)

## Типографіка:
- Гротески: PP Neue Montreal (midlife), Manrope, кастомні sans — величезні кеглі (150-240px)
- Курсив/serif акценти для editorial (zhenyary)
- Моноширинні для "технічних" підписів (Fragment Mono, tech-класи)
- UPPERCASE для навігації і секційних лейблів

## Рекомендований стек для реалізації подібного (на нашій платформі):
- **React (CRA у нас) + GSAP (ScrollTrigger) + Lenis** — покриває 90% анімаційних патернів
- **Three.js / React Three Fiber + drei** — для 3D hero-сцен (GLTF замість OBJ)
- **Framer Motion** — для UI-мікроанімацій і page transitions
- **SplitType/власний split** — для текстових розкриттів
- FastAPI+Mongo як headless-контент API (аналог Sanity)
- Прелоадер, smooth scroll, custom cursor, marquee, split-text — обовʼязковий "базовий набір"
