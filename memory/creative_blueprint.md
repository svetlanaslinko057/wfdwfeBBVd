# KINETIC — Creative Blueprint
## Premium Website Concept for a Private Manual Therapy & Movement Restoration Specialist

Version 1.0 — Implementation-ready creative specification. No code. Companion file: `/app/design_guidelines.md` (design tokens, shadcn mapping).

---

# 0. EXECUTIVE CONCEPT

**Working title of the concept: "THE CONNECTED BODY."**

One sentence: *A website where the human body is the interface — a living, breathing map of kinetic chains that demonstrates, without saying it, that pain in one place begins somewhere else.*

The visitor never reads "the body is a connected system." They **watch it happen** — a disturbance at the foot travels up a chain of lines and arrives at the neck. That single interaction carries the entire brand.

Positioning axis: **engineering precision × human warmth.**
- From Apple / Teenage Engineering / lightweight.info → measurement, annotation, calibration aesthetics.
- From Aesop / Oura → warm neutral materiality, calm editorial voice.
- From the medical world → only rigor. Never its visual clichés.

---

# 1. BRAND POSITIONING

## 1.1 Who this is
One specialist. A personal practice. The site speaks in **first person singular** ("I assess…", "I re-test…"). Never "we", never "our clinic", never "our team".

## 1.2 Brand promise
> "I don't chase your pain. I find where it starts."

## 1.3 Verbal identity
- **Tone:** calm, exact, unhurried. Short declarative sentences. Mechanical vocabulary: *load, tension, range, chain, compensation, coordination, sensitivity, re-test.*
- **Forbidden vocabulary:** energy, healing hands, holistic, miracle, detox, blockages, aura, ancient wisdom, "wellness journey".
- **Replacement rule:** every claim becomes a process. Not "I fix backs" → "Assess → test → treat → re-test. Every session, measurable."

## 1.4 Naming & wordmark direction
- Wordmark = specialist's name set in the editorial serif, lowercase, tight tracking, followed by a mono-type descriptor:
  `[name surname]` + `MANUAL THERAPY / MOVEMENT SYSTEMS` (mono, 11px, letter-spaced).
- Brand device (logo alternative): **"the node-pair"** — two small dots connected by a 1px hairline with a subtle curve. It is the smallest possible statement of the entire philosophy: *one point influences another.* Used as favicon, list bullet, divider ornament, loading indicator.

## 1.5 Emotional direction (what the visitor must feel, in order)
1. **First 3 seconds:** "This is precise. This person understands the body like an engineer."
2. **First scroll:** "Oh — that's why my knee hurts when the problem is my hip."
3. **Mid-page:** "This is calm. Not a hospital. Not a guru."
4. **End:** "I trust this person with my body." → Book.

---

# 2. UX PHILOSOPHY

1. **The body is the navigation.** Wherever possible, content is accessed *through* the body (region navigator, chain diagram), not through card grids.
2. **Show, then label.** Diagrams first, words second. Copy is captioning, not explaining.
3. **One idea per viewport.** No section holds more than one concept. Whitespace is a feature (2–3× more spacing than feels comfortable).
4. **Scroll is the therapy session.** The page structure mirrors a real clinical arc: something moves → something compensates → pain appears → it gets assessed → treated → re-tested → balanced. The visitor experiences the method before reading about it.
5. **Interaction earns trust.** Every micro-interaction is calm and physical (breath, tension, release) — never decorative fireworks.
6. **Zero dark patterns.** One CTA ("Book an assessment"). No urgency timers, no popups, no exit modals.

---

# 3. VISUAL IDENTITY

## 3.1 Color system (from `/app/design_guidelines.md`, HSL tokens)

| Token | HSL | Approx | Role |
|---|---|---|---|
| `--warm-white` | 34 33% 98% | #FBF9F5 | Page surface, cards |
| `--bone` | 34 33% 96% | #F7F4EE | Primary background |
| `--bg-2` | 32 26% 92% | #EFEAE1 | Alternate section bands |
| `--hairline` | 30 10% 88% | #E3DFDA | 1px dividers, diagram base strokes |
| `--muted` | 30 6% 45% | #79726C | Captions, mono labels |
| `--text-2` | 30 7% 28% | #4C4640 | Body copy |
| `--graphite` | 30 10% 12% | #221F1C | Headlines, primary buttons |
| `--charcoal` | 30 8% 8% | #171412 | Deep sections (inverted bands), footer |
| `--accent` (muted bronze) | 28 28% 38% | #7C6248 | THE accent: active nodes, chain highlights, links, focus ring |
| `--accent-soft` | 28 30% 92% | #F1E8DE | Accent tint surfaces, hover fills |

**Rules:**
- Bronze is *earned*: it appears only on active/alive elements (activated node, drawn pathway, focused input, primary hover). Never as decoration.
- Two dark "inversion bands" max per page (Pain chapter + Footer) — the page breathes light→dark→light like inhale/exhale.
- Gradients: only the two approved washes (`hero-warm-wash`, `section-topo-haze`), ≤20% viewport, near-invisible.
- Global grain/noise overlay at 0.06 opacity, multiply — kills digital flatness, adds "paper/skin" materiality.

## 3.2 Typography

| Layer | Font | Usage | Behavior |
|---|---|---|---|
| Editorial display | **Gloock** (serif) | H1/H2 only. clamp(2.5rem → 6rem). Tracking −0.02em | Split-line reveals; never animated per-letter (too fashion) — per-line masks only |
| UI / body | **IBM Plex Sans** | Body, nav, buttons, forms. 15–17px, leading 1.6 | Static; short modules of 1–2 sentences |
| Technical annotation | **IBM Plex Mono** | ONLY anatomical labels, coordinates, legends, timestamps, section indices | 11px, uppercase, tracking 0.14em, muted color |

**Hierarchy grammar** (used on every section, creating rhythm):
```
01 — SECTION INDEX          ← mono, muted, top-left on grid edge
Section headline in Gloock  ← large serif, split-line reveal
One supporting sentence.    ← Plex Sans, text-2
[ diagram / interaction ]
FIG.01 · CAPTION            ← mono legend under diagram
```
The mono index numbers (01–09) run through the page like measurement ticks — the "engineering ruler" that holds the narrative together.

## 3.3 Illustration system — "The Tension Map language"

This is the site's proprietary graphic language. Every diagram on the site is built from exactly **five primitives**:

1. **Contour line** — 1px hairline, 0.08–0.14 opacity, slight organic curve (topographic body slices).
2. **Node** — 3–5px dot at an anatomical landmark. Three states: dormant (hairline gray), aware (graphite), active (bronze + soft 12px halo, opacity-only glow).
3. **Pathway** — a curved 1px line connecting nodes; draws via stroke-dashoffset; when active: 1.5px, bronze.
4. **Force arrow / tick** — engineering-style small arrows, brackets, dotted leader lines.
5. **Mono label** — every annotated point gets a leader line + mono caption (`C7 · CERVICAL`, `LOAD +12%`, `ROM 140°→165°`).

**Hard bans:** no anatomical gore, no realistic muscles/organs, no skeletons, no medical crosses, no DNA, no ECG lines, no lungs/hearts. The body is always an *abstract topographic silhouette* — recognizably human, clinically neutral, gender-ambiguous.

## 3.4 Photography direction
- **Subject:** the specialist only. Hands at work (close-ups of palpation on clothed body/shoulder), portrait in natural window light, the studio space (one frame max).
- **Grade:** warm neutral, lifted blacks, slight grain to match the noise overlay. No teal-orange, no HDR.
- **Casting rule:** zero stock patients, zero white coats, zero smiles-at-camera. If a patient appears: anonymous framing (back, shoulder, hands), real session, natural light.
- **Ratio of imagery:** photography ≤ 15% of page real estate. The Tension Map graphics carry the visual load; photos ground it in a real human.
- Selected reference URLs are in `/app/design_guidelines.md → image_urls`.

---

# 4. SITEMAP & ARCHITECTURE

```
/                     Home — the full scroll narrative (primary experience)
/approach             Method in depth: assessment protocol, techniques, evidence stance
/conditions           Body-region index (interactive silhouette)
/conditions/:region   Neck · Back · Shoulder · Hip · Knee · Foot (6 detail pages, one template)
/about                The specialist: story, credentials, principles, studio
/booking              Booking page (form + practical info) — also embedded as home section
404                   "This page lost its alignment." + node-pair mark + link home
```

Navigation (sticky, translucent bone surface, hairline bottom border):
`[wordmark] ——— Approach · Conditions · About ——— [Book an assessment]`
Nav compresses (−12px height) on scroll-down, expands on scroll-up. Mobile: sheet menu with oversized serif links + mono indices.

---

# 5. THE HOME PAGE — SECTION BY SECTION

Total: 10 movements. Mono indices 00–09. Every section *transforms* an element of the previous one — the silhouette and its chain are the persistent protagonist.

---

### 00 · PRELOADER — "Calibration"
- Bone background. The node-pair mark: two dots, a hairline draws between them (stroke-dashoffset), then a mono counter `CALIBRATING · 47%`.
- At 100%: the line "exhales" (1.05 → 1.0 scale), preloader lifts as a soft curtain revealing the hero. Total ≤ 1.8s, skipped entirely on repeat visits (sessionStorage).

### 01 · HERO — "The Living System" ★ signature experience
**Layout:** asymmetric. Left 5/12 columns: text. Right 7/12: the living body map. Bottom edge: mono legend + scroll cue.

**The body map:** a human silhouette (standing, ¾ height of viewport) constructed from ~45–60 horizontal topographic contour lines (SVG paths). No outline — the *density* of lines creates the form. Overlaid: 12 anatomical nodes (occiput, C7, shoulders, T7, L4, SI joint, hips, knees, ankles, arch of foot) and dormant pathways between them.

**Idle behavior — "Breath":** the whole line-field expands/contracts vertically ±1.5% on a 6-second cycle (calm breathing rate). Lines drift 1–2px individually with slight phase offset — the body feels alive, never mechanical.

**The signature moment — "Propagation":** every ~9 seconds (and on node click), one distal node activates (e.g., left arch of foot turns bronze), and activation *travels* up the chain: foot → knee → hip → contralateral lumbar → thoracic → neck. Each node lights in sequence (120ms stagger), the connecting pathway draws itself, and the *contour lines locally tense* (opacity +0.08, spacing compresses 4%) as the wave passes. At the terminal node a mono annotation types on: `PAIN FELT HERE` — and at the origin: `ORIGIN OF DYSFUNCTION`. Then everything releases with a slow exhale.

**Cursor coupling (desktop):** within 80px of the silhouette, local lines gain contrast and bend 2–3px toward the cursor (soft magnetic field, spring easing); nearest node shows its mono label. The visitor literally *palpates* the body with the cursor.

**Touch (mobile):** tapping any of 5 enlarged hotspots (≥44px) plays that chain's propagation. A hint chip: `TAP A POINT`.

**Copy:**
- H1 (Gloock, 3 lines, split reveal): *"Pain is a signal. Rarely the source."*
- Sub (Plex Sans, 2 lines): *"Manual therapy and movement restoration. I trace dysfunction through the body's chains — and treat where it begins."*
- Primary CTA: **Book an assessment** · Ghost link: *How it works ↓*
- Mono legend bottom: `FIG.00 · KINETIC CHAIN, POSTERIOR LINE` + `● ORIGIN  ○ REFERRED`

**Reduced-motion fallback:** static silhouette with one pre-activated chain, annotations visible, no breathing.

### 02 · MANIFESTO — "The idea in three lines"
Quiet section, generous whitespace. Three short statements, each revealed line-by-line as it enters:
1. *"The body works as one system."*
2. *"Where it hurts is where the system gave up compensating."*
3. *"I treat the chain — not the symptom."*
Between statements: hairline dividers that draw in (scaleX 0→1). Right margin: tiny node-pair ornaments. No images. This is the Aesop moment: typography, space, restraint.

### 03 · THE STORY — Pinned scroll narrative ★ core storytelling
**One pinned viewport, 7 states, ~450vh of scrub.** The hero silhouette (smaller, centered-right) is the actor; a chapter column sits left. Progress: a vertical mono ruler `01—07` with a moving tick (like lightweight.info's scroll timeline).

| # | Chapter | Diagram state (what the silhouette does) | Copy (1–2 lines) |
|---|---|---|---|
| 1 | **MOVEMENT** | Lines flow smoothly; a walking-gait motion path loops beside the legs; all nodes calm | "Healthy movement distributes load through the whole chain." |
| 2 | **COMPENSATION** | One hip node dims; nearby pathways *reroute* (new dotted detour lines draw); posture line tilts 2° | "When one link underperforms, others silently take the load." |
| 3 | **PAIN** | Background inverts to charcoal (first dark band). Neck node pulses bronze; tension lines densify around it; mono: `SYMPTOM SITE ≠ SOURCE` | "Pain appears at the weakest point of the detour — often far from the cause." |
| 4 | **ASSESSMENT** | Back to bone. Measurement overlays appear: brackets, angle arcs (`ROM 140°`), a scanning hairline sweeps the body; nodes get index labels | "I test movement, strength and sensitivity — link by link — to find the origin." |
| 5 | **TREATMENT** | Cursor-like pressure ring appears at origin node; concentric soft ripples (opacity rings); detour lines begin to fade | "Precise manual work at the source: soft tissue, trigger points, joint mechanics." |
| 6 | **RECOVERY** | Original pathway redraws itself clean; gait loop returns, smoother; re-test annotation: `ROM 140° → 165°` counts up | "Then we re-test. Recovery is measured, not assumed." |
| 7 | **BALANCE** | All detours gone; lines settle to even spacing; one slow full-body breath; plumb line drops through the silhouette, perfectly vertical | "A balanced system. Movement that costs nothing." |

Transitions between states are scrubbed (tied to scroll position) — the visitor *drives* the story at their own pace. Each chapter headline does a masked line-swap; the mono chapter label types on.

**Mobile:** the pin converts to a horizontal swipe stepper (Tabs/Carousel + progress bar): same 7 states, tap/swipe advances, diagram crossfades between prebaked states. Identical narrative, zero scroll-jacking on touch.

### 04 · KINETIC CHAIN EXPLAINER — "One point moves everything"
Interactive engineering diagram, horizontal: `FOOT — KNEE — HIP — SPINE — NECK` as five linked segments with force arrows. Hover/tap any segment: it highlights bronze, upstream & downstream influences light with directional arrows, a 2-line mono explanation appears (`STIFF ANKLE → +18% KNEE VALGUS LOAD`). Desktop: hover; mobile: tap with persistent selection. This is the "prove it" section — cause and effect made tactile.

### 05 · CONDITIONS — Body-region navigator (no cards)
**Layout:** left — the silhouette with 6 tappable regions (neck, back, shoulder, hip, knee, foot) as subtle outlined zones; right — a live panel.
Selecting a region: zone fills with accent-soft, its contour lines sharpen, panel crossfades to that region's content: region name (serif), 3–4 typical presentations as a hairline list (*"Desk-work neck stiffness" / "Radiating tension into the shoulder blade" / "Morning rigidity"*), one mono stat, and `See how I treat this →` (to `/conditions/:region`).
Keyboard: regions are real `<button>`s, arrow-key navigable. Mobile: silhouette on top, panel below; regions are 44px+ targets.

### 06 · THE SESSION — Process timeline
Vertical timeline with mono timestamps, styled like a lab protocol:
```
00:00  CONVERSATION      Your history, your goals. No forms-first medicine.
00:10  MOVEMENT TESTING  I watch how you move — gait, range, control.
00:25  MANUAL WORK       Targeted soft-tissue and joint techniques. Always explained.
00:50  RE-TEST           We measure the change together, same tests.
00:55  HOME PROTOCOL     Two or three precise exercises. Not twenty.
```
The timeline spine draws downward as you scroll; each tick pops (opacity+2px shift) on entry. Right rail: one photo of hands at work (the section's single photograph). Caption sets expectation honesty: *"First session: 60 minutes. Wear something you can move in."*

### 07 · ABOUT — The specialist
Asymmetric editorial split: portrait (natural light, warm grade, subtle parallax `data-speed:0.95`) left 5/12; right — story in short modules:
- Serif intro line: *"I've spent 12 years learning why bodies stop moving well."*
- Credentials as a mono list with ticks (degrees, certifications, hours of practice) — verifiable facts only, engineering-spec style: `EDUCATION · [degree]`, `CERTIFIED · [method]`, `PRACTICE · 6,000+ HRS`.
- Three "principles" lines (echoing the manifesto voice).
No badges wall, no association logos carousel. Precision reads as one clean spec sheet.

### 08 · OUTCOMES — Restrained patient stories
Charcoal inversion band #2 (the page's second "inhale"). One quote at a time, large serif, no star ratings, no avatars-with-names-and-smiles. Context as mono caption *below* the quote:
`CASE · RUNNER, 34 · RECURRING KNEE PAIN · RESOLVED AT THE HIP · 5 SESSIONS`
Carousel: horizontal drag with inertia + thin progress line; auto-advance off. 4–6 stories max. Every case reinforces the thesis: *treated somewhere other than where it hurt.*

### 09 · QUESTIONS + BOOKING — one composed finale
**FAQ:** minimal accordion, hairline separators, 5–7 questions, answers ≤3 lines (*"Do I need a referral?" / "Does it hurt?" / "How many sessions?" / "What should I wear?" / "Do you treat athletes only?"*). The +/− indicator is the node-pair: dot splits into two dots connected by a line when open.

**Booking block:** warm-white surface card on bone, soft shadow. Left: serif headline *"Start with an assessment."* + trust microcopy (*"60 minutes. A full-body movement analysis and a clear plan — whether or not we continue together."*) + practical mono details (location, hours, price, response time). Right: the form — Name, Contact (phone/email), "What's troubling you?" textarea with a helpful placeholder (*"e.g., right knee pain when descending stairs, ~3 months"*), optional preferred time. Submit: **Request an assessment**. Success = inline confirmation + sonner toast (*"Received. I reply personally within one working day."*). Backend: FastAPI endpoint → MongoDB, honeypot antispam, no CAPTCHAs harming the mood.

### FOOTER — "The system at rest"
Charcoal. The hero silhouette reprised at 20% opacity, *lying horizontally* along the footer bottom — the body at rest; one final slow breath loop. Above it: oversized serif wordmark, three link columns (Navigate / Practice info / Legal), mono coordinates of the studio (`50.4501° N, 30.5234° E` — the neundex touch), `© 2026 · [NAME]`. Selection color: bronze at 22%.

---

# 6. SUBPAGES (template logic)

- **/approach:** long-form editorial: Assessment protocol (numbered spec list) → Techniques index (each technique = name + 1-line mechanism + what it's for; hover reveals a mini-diagram) → "What I don't do" (a trust-building anti-list: no cracking for show, no endless passive treatment, no promises of one-session miracles) → CTA.
- **/conditions/:region:** one shared template: region hero (zoomed silhouette crop of that region with its local chain), typical presentations, "where it usually starts" mini pathway diagram, what a session for this looks like, related case quote, CTA. Six pages from one component + data.
- **/about:** extended bio, studio photos (max 3), philosophy, credentials spec-sheet.
- **/booking:** the booking block as a full page + map placeholder + cancellation policy in honest microcopy.
- **Page transitions:** a bone-colored curtain wipes vertically; during the wipe, a single hairline "pathway" draws across it (400–600ms total). Fast, calm, branded — never blocking.

---

# 7. MOTION LANGUAGE — "Physiological easing"

Four motion verbs, each with a fixed recipe. Nothing else is allowed.

| Verb | Meaning | Recipe |
|---|---|---|
| **Breath** | idle life | scale/translate ±1–2%, 6s sine loop, infinite; hero, footer, active surfaces |
| **Tension** | attention, load | opacity +0.08, stroke 1→1.5px, spacing −4%, 300ms power2.out |
| **Release** | resolution | slow fade + settle, 800–1200ms power2.inOut; slight overshoot never allowed |
| **Alignment** | precision, completion | snap of elements to grid/plumb line, 250ms, tiny 2px settle; counters count-up |

Global rules:
- GPU-only properties: transform + opacity (stroke-dashoffset on SVG allowed — cheap).
- Easings: `power2.out` for entrances, `power2.inOut` for state morphs, `sine.inOut` for breath. **No bounce, no elastic, no back easing anywhere.**
- Durations: micro 150–250ms · reveals 500–700ms · narrative morphs 800–1200ms · breath 6000ms.
- Stagger: 90–140ms for line groups; 120ms for chain node propagation.
- Split typography: line-mask reveals only (translateY 110%→0 inside overflow-hidden), never per-character scrambles (wrong genre for healthcare trust).
- Custom cursor (desktop only): 28px ring + 4px dot; ring expands to 44px with mono label over hotspots (`PRESS`, `DRAG`, `VIEW`); blends via difference on dark bands. Hidden on touch; `cursor: none` only when custom cursor active and rendering.

---

# 8. COMPONENT LIBRARY (design-system inventory)

Foundations: tokens (see §3.1) · 12/8/4-col grid, max 1120px, gutter clamp(16–28px) · section spacing clamp(56–120px) · radius 10/14/18 · two shadows (sm/md, warm-tinted) · noise overlay · focus ring bronze.

| Component | Notes | Key states |
|---|---|---|
| StickyNav | translucent bone + hairline; compress/expand on scroll direction | default / compressed / sheet-open |
| Button (primary/secondary/ghost) | charcoal fill / hairline outline / text; lift −1px hover, scale .98 press | hover, press, focus-visible, disabled, loading (node-pair pulse) |
| MonoLabel | leader-line + uppercase mono caption | static / typed-on |
| SectionHeader | index + serif headline + support line | split-reveal on enter |
| HairlineDivider | 1px, draws scaleX 0→1 | — |
| NodePair | brand mark micro-component | dormant / active / loading |
| BodyMap (hero) | SVG line-field + nodes + pathways engine | idle-breath / propagation / cursor-tense / reduced-motion static |
| ChainDiagram | 5-segment kinetic explainer | rest / segment-active |
| RegionNavigator | silhouette zones + live panel | region-selected ×6 |
| StoryPin | 7-state scrub controller (desktop) / stepper (mobile) | states 1–7 |
| Timeline | protocol list with drawing spine | steps reveal |
| QuoteCarousel | drag + progress line | dragging / settled |
| Accordion (FAQ) | node-pair indicator | closed / open |
| BookingForm | shadcn form + inline validation + sonner | idle / error / submitting / success |
| PageCurtain | route transition wipe | enter / exit |
| Footer | resting silhouette + links | — |
| Preloader | calibration counter | first-visit only |

All interactive elements carry kebab-case `data-testid` (mapping already defined in `/app/design_guidelines.md`).

---

# 9. RESPONSIVE & MOBILE STRATEGY (not stacking — redesigning)

| Experience | Desktop | Mobile |
|---|---|---|
| Hero | cursor-magnetic line field + auto propagation | 5 large tap hotspots trigger chains; hint chip; silhouette fills upper 60vh, text below |
| Story (03) | pinned 450vh scrub | horizontal swipe stepper, 7 slides, progress bar, crossfade states — no pinning |
| Chain explainer | hover highlighting | tap-to-select, selection persists, panel below |
| Region navigator | side-by-side | silhouette top, sliding panel bottom (sheet-like) |
| Cursor | custom ring | none; subtle tap ripple (opacity ring, 300ms) |
| Nav | inline anchors | sheet menu, oversized serif links, book CTA pinned bottom of sheet |
| Smooth scroll | Lenis | **native scroll** (Lenis smoothTouch off — battery + UX) |
| Hover reveals | allowed | every hover has a tap equivalent; nothing is hover-only |
| Type scale | H1 up to 96px | H1 40–44px, tighter leading; mono labels stay 11px |
Performance on mobile: hero line count reduced to ~30 paths; propagation FPS-capped; IntersectionObserver pauses all loops offscreen.

---

# 10. ACCESSIBILITY (WCAG AA, non-negotiable)

- Contrast: graphite on bone = ~13:1; body text-2 on bone ≥ 7:1; muted mono labels used only for non-essential annotation and still ≥ 4.5:1.
- `prefers-reduced-motion`: Lenis off, pins become static steppers, breath loops stop, propagation replaced by a static highlighted chain with visible annotations. The narrative survives motionless.
- All diagram hotspots are real `<button>`s over the SVG with descriptive `aria-label`s ("Left shoulder pathway — show connected chain"); story stepper = proper Tabs with arrow-key nav; accordion & carousel from shadcn primitives (a11y built in).
- Every diagram has a text equivalent via `aria-describedby` (one-sentence description of what the figure shows).
- Focus-visible bronze ring everywhere; logical tab order; skip-to-content link; form errors announced inline + `aria-live`.
- Hit targets ≥44px; no information conveyed by color alone (active nodes also change size + get labels).

---

# 11. PERFORMANCE BUDGET

- Lighthouse ≥ 90 all categories. LCP < 2.0s (hero text is the LCP — the SVG map loads progressively after first paint). CLS < 0.02 (all media with fixed aspect boxes). JS < 220KB gz total (gsap ~70 + lenis ~10 + framer-motion ~40 + app).
- Hero engine: **SVG + GSAP** (not Three.js) — ~60 paths, shared `<defs>`, transforms/opacity/dashoffset only → comfortably 60fps. Canvas 2D fallback path documented if profiling ever shows SVG strain.
- Fonts: 3 families, 5 weights total, `font-display: swap`, subset, preloaded.
- Images: lazy, AVIF/WebP, LQIP blur placeholders; photography budget ≤ 600KB total on home.
- All loops pause offscreen (IntersectionObserver); ScrollTriggers cleaned on route change; `will-change` applied surgically and removed after animation.

---

# 12. TECHNICAL IMPLEMENTATION RECOMMENDATIONS

**Stack:** React (CRA) + Tailwind + shadcn/ui · GSAP + ScrollTrigger · Lenis (desktop) · Framer Motion (component micro-motion + AnimatePresence page curtains) · FastAPI + MongoDB (booking endpoint, content collections for conditions/FAQ/testimonials).

**Three.js verdict: NOT justified for v1.** The entire visual language is line-work — SVG delivers it sharper (true vectors), lighter, more accessible, and easier to animate with GSAP. Reserve WebGL for a possible v2 flourish (e.g., a depth-parallax spine module on /approach) only if the SVG hero proves insufficient — it won't.

**GSAP roadmap (build order):**
1. **Foundation** — Lenis↔ScrollTrigger sync (scaffold in design_guidelines), reduced-motion gate, global reveal system (SectionHeader splits, hairline draws).
2. **Hero engine** — line-field generator (paths from a silhouette source), breath timeline, propagation timeline (chained node/path tweens), cursor proximity field (quickTo), touch hotspots.
3. **StoryPin** — master pinned timeline, 7 labeled states, scrub 0.8; diagram state machine (each state = target attrs for nodes/paths/overlays); mobile stepper variant sharing the same state machine.
4. **Interactive modules** — ChainDiagram, RegionNavigator, Timeline draw, QuoteCarousel drag (Draggable or pointer events + inertia).
5. **Chrome** — preloader, page curtains, custom cursor, nav compress, counters, footer breath.
6. **Hardening** — reduced-motion QA, mobile perf pass, Lighthouse pass, a11y audit.

**Content model (Mongo collections):** `conditions` (region, presentations[], pathway data, copy), `faq`, `testimonials` (quote, case-context), `booking_requests`.

---

# 13. KEY DESIGN DECISIONS & RATIONALE

1. **Line-topography instead of realistic anatomy** — communicates "system & mechanics" while staying calm and non-graphic; sidesteps every medical-clip-art cliché; renders cheap and crisp.
2. **Propagation as the one signature effect** — a single memorable mechanic repeated in hero, story, and region pages beats ten disconnected effects; it *is* the brand argument in motion.
3. **Serif display + mono annotations** — the Aesop×engineering tension the brief asks for: humanity in headlines, instrumentation in labels. Sans-only would feel like a SaaS; serif-only would feel like a spa.
4. **Bronze as a scarce resource** — one warm accent that only marks "life/activation" makes every activation legible and keeps the page premium-quiet.
5. **Scroll narrative = clinical method** — structure as persuasion: the visitor has *experienced* assess→treat→re-test before reaching the booking form, so the CTA feels like a natural next step, not a pitch.
6. **Two dark bands (Pain, Footer)** — the page itself inhales and exhales; pain is literally the darkest moment of the journey; balance returns to light.
7. **No Three.js in v1** — award-level ≠ WebGL by default; lightweight.info-grade choreography with SVG keeps the 90+ Lighthouse promise honest.
8. **Mobile stepper instead of mobile pinning** — pinned scrub on touch is the #1 premium-site failure mode; a swipe stepper preserves narrative and dignity.
9. **First-person microcopy with honest logistics** ("wear something you can move in", "I reply personally") — trust is built in the small print, not the hero.
10. **The node-pair mark** — the philosophy compressed to two dots and a line; scales from favicon to footer; free of any medical or mystical baggage.
