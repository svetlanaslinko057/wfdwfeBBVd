# plan.md — Connected Body (KINETIC) / Phase 1

## 1) Objectives
- Establish **global visual foundation** (tokens + typography + materiality) that matches the Blueprint: warm neutrals, graphite, **bronze-as-earned**.
- Deliver a **technically complete, accessible** `SiteHeader` with real routes (`/approach`, `/conditions`, `/about`, `/booking`) using placeholder pages (no future sections).
- Prove the core brand mechanic via **Hero POC “The Living System”**: deterministic SVG line-field body, 12 accessible nodes, breath + propagation + pointer coupling, reduced-motion + pause logic.
- Validate quality gates: build runs clean, responsive, a11y baseline, performance-minded animation loop.

## 2) Implementation Steps

### Phase 1 — Core feature POC (Isolation): Hero engine + animation correctness
**User stories (POC):**
1. As a visitor, I see a calm body-map that feels alive (breathing) without distracting effects.
2. As a visitor, I can activate a node with mouse/keyboard/touch and watch a chain propagate foot→neck.
3. As a visitor, my cursor feels like “palpation”: nearby lines respond smoothly without lag.
4. As a motion-sensitive visitor, I get an equivalent static hero with clear highlighted chain and labels.
5. As a performance-focused user, hero animations pause when offscreen or when the tab is hidden.

**Steps:**
1. **Best-practice check (websearch)**: GSAP SVG performance, `quickTo`, `ticker` loops, `prefers-reduced-motion`, IntersectionObserver pausing patterns.
2. Build `ConnectedBodyHero` skeleton (no app chrome):
   - Seeded PRNG utility (stable seed; never regenerates geometry per render).
   - SVG line-field generator: ~45–60 paths desktop, ~30 mobile; no randomness during runtime.
   - Overlay 12 node hotspots as real `<button>` elements (>=44px targets) aligned to SVG coordinates.
3. GSAP animation layer (single-owner lifecycle):
   - **Breath**: 6s sine loop (transform/opacity only).
   - **Propagation**: 9s cycle + click-trigger; single guarded timeline ref; no overlapping timelines.
   - **Pointer attraction**: one `gsap.ticker` lerp + `quickTo` setters (no per-pointermove tween creation).
4. Pause/resume system:
   - IntersectionObserver to pause all loops off-viewport.
   - `visibilitychange` to pause when tab hidden.
   - Ensure cleanup on unmount / route change.
5. Reduced motion:
   - Gate all timelines; provide static chain state + visible annotations.

**Exit gate (must pass before moving on):**
- No timeline overlap; no growing memory/tween count during pointer movement.
- Nodes fully keyboard accessible with visible focus ring.
- Reduced-motion shows meaningful static state.
- Animations pause offscreen and in background tab.

### Phase 2 — V1 app development (Phase 1 scope): Global foundation + Header + Routes + integrate Hero
**User stories (V1 shell):**
1. As a visitor, the site looks premium immediately (tokens, typography, noise, selection).
2. As a visitor, I can navigate to Approach/Conditions/About/Booking pages without broken links.
3. As a keyboard user, I can reach the header, skip to content, and see focus states everywhere.
4. As a mobile visitor, I can open a sheet menu and navigate reliably.
5. As a returning visitor, the hero loads consistently (no geometry jitter between renders).

**Steps:**
1. Global styles:
   - Update `src/index.css` tokens per `/app/design_guidelines.md` (warm neutrals + bronze ring).
   - Add noise overlay + `::selection` bronze.
   - Load fonts (Gloock, IBM Plex Sans, IBM Plex Mono) via `public/index.html` and set base font stacks.
2. Routing:
   - Replace CRA placeholder Home with real layout.
   - Create placeholder pages for `/approach`, `/conditions`, `/about`, `/booking` (minimal content; no extra sections).
3. `SiteHeader`:
   - Sticky translucent bone surface with hairline border.
   - Real nav links + CTA.
   - Mobile Sheet menu (Radix/shadcn).
   - Scroll-aware compress/expand (no scroll-jacking).
4. Home page:
   - Render `ConnectedBodyHero` POC as primary content.
   - Include mono legend + CTA.
5. Build checks:
   - `yarn test` (smoke), `yarn build` (esbuild/CRA build pipeline), runtime check.

### Phase 3 — Testing & validation (within Phase 1 deliverable)
**User stories (verification):**
1. As a user, I can complete the core interaction (click node → chain plays) on desktop and mobile.
2. As a user, I can navigate the hero nodes using keyboard only.
3. As a user, I don’t see motion if my OS prefers reduced motion.
4. As a user, the hero doesn’t drain resources when I scroll away.
5. As a user, the header navigation is usable and consistent across routes.

**Steps:**
1. Run frontend testing agent: hero interaction, nav routes, focus order, reduced-motion behavior.
2. Manual responsive review: desktop + mobile breakpoints; check hit targets.
3. Capture screenshots (desktop hero, mobile hero, header states).
4. Produce detailed report (per original task format): audit summary, files changed, behaviors implemented, perf/a11y notes, known limitations.

## 3) Next Actions
1. Websearch + implementation notes for GSAP SVG + `quickTo` + pausing.
2. Implement seeded PRNG + deterministic SVG generator utilities.
3. Build `ConnectedBodyHero` POC and verify exit gate.
4. Update global tokens/fonts/noise/selection.
5. Implement `SiteHeader` + real routes + placeholder pages.
6. Integrate hero into Home and run build/tests + screenshots + testing agent.

## 4) Success Criteria
- **Visual foundation** matches tokens: warm neutrals, graphite text, bronze focus/selection; noise overlay subtle.
- **Header is production-grade**: accessible nav, real links, mobile sheet, scroll compress.
- **Hero POC works reliably**:
  - deterministic SVG (no rerender randomness), 12 accessible node buttons,
  - breath (6s), propagation (9s) with no overlap,
  - pointer coupling without per-event tweens,
  - reduced-motion static fallback,
  - pauses offscreen + on hidden tab.
- **Quality gates**: app runs without errors; `yarn build` succeeds; responsive and basic a11y checks pass.
- **Scope discipline**: no StoryPin/other sections/backend work included in Phase 1.
## 5) Deployment Status (redeploy from GitHub)
- Repo cloned from github.com/svetlanaslinko057/d2d2deDD and deployed to /app (env files preserved).
- Dependencies installed (gsap, @gsap/react); backend + frontend running under supervisor.
- Both CRITICAL bugs from iteration_1 verified FIXED (auto propagation + reduced-motion static state).
- Additional bug found & fixed during regression: GSAP SVG fill must be inside attr {} (ConnectedBodyHero.jsx, 4 locations).
- Full regression (iteration_2): 25/25 frontend tests passed, no console errors.
- Current state: Phase 1 complete. Next phases per blueprint: real content for /approach, /conditions, /about, /booking, StoryPin sections, backend booking logic.

## 6) Ukrainian Localization (per user corrective)
- Full UI translation to Ukrainian: header nav, hero (H1, subtext, CTAs), propagation annotations, node labels, legend, mobile hint, placeholder pages, 404, skip-link, aria-labels, SVG title/desc, live-region, html lang="uk", page title.
- Font fix: Gloock lacks Cyrillic -> added Playfair Display as Cyrillic serif fallback (Gloock kept for Latin wordmark).
- Regression (iteration_3): 12/12 tests passed, no English leftovers, no console errors.
