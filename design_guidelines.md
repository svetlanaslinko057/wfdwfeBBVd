{
  "project": {
    "type": "premium_marketing_site_personal_practice",
    "brand_attributes": [
      "scientific",
      "minimal",
      "premium",
      "calm",
      "precise",
      "human",
      "engineering-like clarity",
      "movement-aware"
    ],
    "north_star_metaphor": "BODY CONNECTIONS — the body is the interface (kinetic chains, pressure maps, motion paths). Every section visually transforms into the next: Movement → Compensation → Pain → Assessment → Treatment → Recovery → Balance.",
    "anti_patterns_to_avoid": [
      "medical crosses, DNA icons, heartbeat lines",
      "blue gradients / hospital blues",
      "doctor stock imagery, white coats, fake smiles",
      "endless card grids and icon grids",
      "large paragraphs; keep copy modular",
      "pseudoscience / miracle language / mystical symbolism"
    ]
  },

  "design_tokens": {
    "notes": "Warm neutrals + graphite + muted bronze. No saturated colors. Gradients only as subtle section background accents (<=20% viewport).",

    "css_custom_properties": {
      "global": {
        "--bg": "34 33% 96%",
        "--bg-2": "32 26% 92%",
        "--surface": "34 33% 98%",
        "--surface-2": "30 18% 94%",
        "--text": "30 10% 12%",
        "--text-2": "30 7% 28%",
        "--muted": "30 6% 45%",
        "--border": "30 10% 84%",
        "--hairline": "30 10% 88%",

        "--graphite": "30 10% 12%",
        "--charcoal": "30 8% 8%",
        "--bone": "34 33% 96%",
        "--warm-white": "34 33% 98%",

        "--accent": "28 28% 38%",
        "--accent-2": "28 22% 46%",
        "--accent-soft": "28 30% 92%",

        "--success": "145 22% 28%",
        "--warning": "38 55% 42%",
        "--danger": "6 55% 42%",

        "--focus-ring": "28 28% 38%",

        "--radius-sm": "10px",
        "--radius-md": "14px",
        "--radius-lg": "18px",

        "--shadow-sm": "0 1px 0 rgba(20,18,16,0.06), 0 10px 30px rgba(20,18,16,0.06)",
        "--shadow-md": "0 1px 0 rgba(20,18,16,0.08), 0 18px 50px rgba(20,18,16,0.10)",

        "--grid-max": "1120px",
        "--gutter": "clamp(16px, 4vw, 28px)",
        "--section-y": "clamp(56px, 8vw, 120px)",

        "--noise-opacity": "0.06",
        "--cursor-size": "28px"
      },

      "shadcn_mapping_update_index_css": {
        "instruction": "Update /app/frontend/src/index.css :root tokens to match this warm-neutral system (replace current default grayscale). Keep .dark optional but not required for MVP.",
        "shadcn_vars": {
          "--background": "var(--bg)",
          "--foreground": "var(--text)",
          "--card": "var(--surface)",
          "--card-foreground": "var(--text)",
          "--popover": "var(--surface)",
          "--popover-foreground": "var(--text)",
          "--primary": "var(--charcoal)",
          "--primary-foreground": "34 33% 98%",
          "--secondary": "var(--surface-2)",
          "--secondary-foreground": "var(--text)",
          "--muted": "var(--surface-2)",
          "--muted-foreground": "var(--muted)",
          "--accent": "var(--accent-soft)",
          "--accent-foreground": "var(--text)",
          "--border": "var(--border)",
          "--input": "var(--border)",
          "--ring": "var(--focus-ring)",
          "--radius": "14px"
        }
      }
    },

    "gradients_and_textures": {
      "allowed_gradients": [
        {
          "name": "hero-warm-wash",
          "usage": "Hero background only (<=20% viewport).",
          "css": "radial-gradient(1200px 600px at 70% 20%, rgba(206,137,70,0.10), transparent 60%), radial-gradient(900px 500px at 20% 70%, rgba(60,52,44,0.06), transparent 55%)"
        },
        {
          "name": "section-topo-haze",
          "usage": "Pinned storytelling section background overlay only.",
          "css": "linear-gradient(180deg, rgba(244,239,230,0.0), rgba(244,239,230,0.9) 40%, rgba(244,239,230,1) 100%)"
        }
      ],
      "noise_overlay": {
        "usage": "Apply subtle noise via pseudo-element on body or main wrapper.",
        "css_hint": "background-image: url('data:image/svg+xml;...') OR use a tiny repeating noise png; opacity var(--noise-opacity); mix-blend-mode: multiply; pointer-events:none;"
      },
      "topographic_lines": {
        "usage": "Decorative SVG lines behind hero + in transitions between sections.",
        "style": "1px hairlines, low opacity (0.08–0.14), slight blur (0.2–0.6px) for depth."
      }
    }
  },

  "typography": {
    "font_pairing": {
      "headings_editorial": {
        "google_font": "Gloock",
        "fallback": "ui-serif, Georgia, serif",
        "usage": "H1/H2 only; large, calm, premium."
      },
      "body_ui": {
        "google_font": "IBM Plex Sans",
        "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        "usage": "Body, navigation, UI labels."
      },
      "mono_annotations": {
        "google_font": "IBM Plex Mono",
        "fallback": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "usage": "Anatomical annotations, coordinates, micro labels, diagram legends."
      }
    },

    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em]",
      "h2": "text-base md:text-lg text-[hsl(var(--text-2))]",
      "h3": "text-xl sm:text-2xl tracking-[-0.01em]",
      "body": "text-sm sm:text-base leading-relaxed text-[hsl(var(--text-2))]",
      "caption": "text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]",
      "mono_label": "font-mono text-[11px] tracking-[0.14em] uppercase text-[hsl(var(--muted))]"
    },

    "copy_rules": [
      "Prefer short modules: 1–2 sentence blocks + micro labels.",
      "Use first-person voice for the specialist; avoid institutional tone.",
      "Replace claims with process language: assess → test → treat → re-test.",
      "Never use mystical metaphors; use mechanics: load, tension, range, coordination, sensitivity."
    ]
  },

  "layout_and_grid": {
    "mobile_first_principles": [
      "Single-column narrative with pinned moments converted to swipeable steps on mobile.",
      "Touch-first interactions: tap to activate body regions; avoid hover-only affordances.",
      "Keep hero interactive but simplified: fewer points, larger hit targets (44px)."
    ],

    "grid": {
      "container": "mx-auto max-w-[var(--grid-max)] px-[var(--gutter)]",
      "columns": {
        "desktop": "12-col grid with 24px gap",
        "tablet": "8-col grid",
        "mobile": "4-col grid"
      },
      "section_spacing": "py-[var(--section-y)]",
      "composition_rules": [
        "Use asymmetry: text left, diagram right; alternate per section.",
        "Avoid card walls; use 1–2 large surfaces with hairline dividers.",
        "Use micro labels aligned to grid edges (Swiss/engineering feel)."
      ]
    },

    "navigation": {
      "style": "Sticky minimal nav with translucent warm surface + hairline border; expands on scroll stop.",
      "pattern": "Left: name/logo wordmark; Center: 3–5 anchors; Right: Book CTA.",
      "shadcn": ["navigation-menu.jsx", "sheet.jsx", "button.jsx"],
      "data_testids": {
        "nav": "site-nav",
        "nav-book": "nav-book-button",
        "nav-menu": "nav-mobile-menu-button"
      }
    }
  },

  "components": {
    "shadcn_component_paths": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "form": "/app/frontend/src/components/ui/form.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx",
      "carousel": "/app/frontend/src/components/ui/carousel.jsx",
      "progress": "/app/frontend/src/components/ui/progress.jsx"
    },

    "button_system": {
      "tone": "Luxury / Elegant (slim, tall, rounded 10–14px).",
      "variants": {
        "primary": {
          "usage": "Book assessment, primary CTAs.",
          "tailwind": "rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] text-[hsl(var(--warm-white))] shadow-[var(--shadow-sm)] hover:bg-[hsl(var(--graphite))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] focus-visible:ring-offset-2",
          "micro_interaction": "On hover: subtle lift (translateY -1px) + shadow deepen; on press: scale 0.98."
        },
        "secondary": {
          "usage": "Explore approach, view conditions.",
          "tailwind": "rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--text))] hover:bg-[hsl(var(--surface-2))]",
          "micro_interaction": "Hairline border becomes slightly darker on hover; no glow."
        },
        "ghost": {
          "usage": "Inline actions, diagram toggles.",
          "tailwind": "rounded-[var(--radius-sm)] bg-transparent text-[hsl(var(--text))] hover:bg-[hsl(var(--accent-soft))]"
        }
      },
      "data_testids": {
        "primary_cta": "primary-cta-button",
        "secondary_cta": "secondary-cta-button"
      }
    },

    "signature_modules": {
      "hero_living_body_map": {
        "goal": "Immediate understanding: body is a connected system. Not a static image.",
        "visual": "Minimal body silhouette built from kinetic contour lines + pressure nodes + motion paths. Lines breathe; nodes softly activate; a wave travels through chains.",
        "implementation_hint": {
          "preferred": "SVG (paths) + GSAP for stroke-dashoffset + opacity; optional Canvas for 60fps if SVG too heavy.",
          "cursor": "Cursor proximity reveals annotations and increases line contrast locally.",
          "touch": "Tap hotspots cycles through 3–5 preset pathways."
        },
        "ui_structure": [
          "Left column: H1 editorial statement + 2-line subheading.",
          "Right: interactive body map canvas/SVG.",
          "Bottom: micro legend (mono) + 'Scroll to follow the chain' cue."
        ],
        "data_testids": {
          "hero": "hero-section",
          "hero-book": "hero-book-button",
          "hero-bodymap": "hero-bodymap",
          "hero-legend": "hero-legend"
        }
      },

      "pinned_scroll_storytelling": {
        "sections": [
          "Movement",
          "Compensation",
          "Pain",
          "Assessment",
          "Treatment",
          "Recovery",
          "Balance"
        ],
        "pattern": "Pinned container with 7 steps; each step morphs the diagram state (line tension, node activation, alignment guides).",
        "desktop": "GSAP ScrollTrigger pin + scrub; split typography reveals; diagram layers crossfade.",
        "mobile": "Convert to swipeable Tabs/Carousel with progress indicator; keep subtle transitions.",
        "shadcn": ["tabs.jsx", "carousel.jsx", "progress.jsx"],
        "data_testids": {
          "story": "storytelling-section",
          "story-step": "storytelling-step",
          "story-progress": "storytelling-progress"
        }
      },

      "kinetic_chain_explainer": {
        "visual": "Engineering diagram: 3–5 linked segments (foot→knee→hip→spine→neck) with force arrows and micro labels.",
        "interaction": "Hover/tap a segment to highlight upstream/downstream influence; show 2-line explanation.",
        "components": ["tooltip.jsx", "separator.jsx"],
        "data_testids": {
          "chain": "kinetic-chain-explainer",
          "chain-segment": "kinetic-chain-segment"
        }
      },

      "conditions_body_region_navigator": {
        "visual": "Body regions as interactive overlay on silhouette (not cards).",
        "interaction": "Hover/tap region highlights; right panel updates with conditions list + 'See details'.",
        "components": ["tabs.jsx", "button.jsx"],
        "data_testids": {
          "conditions": "conditions-navigator",
          "region": "conditions-region",
          "region-details": "conditions-region-details"
        }
      },

      "session_process_timeline": {
        "visual": "Vertical timeline with technical ticks + timestamps (mono).",
        "interaction": "Scroll reveals each step; subtle line draw animation.",
        "components": ["separator.jsx"],
        "data_testids": {
          "timeline": "session-timeline",
          "timeline-step": "session-timeline-step"
        }
      },

      "testimonials_restrained": {
        "visual": "Single quote at a time; no star ratings; include context (issue, timeframe) as mono caption.",
        "components": ["carousel.jsx"],
        "data_testids": {
          "testimonials": "testimonials",
          "testimonial-item": "testimonial-item"
        }
      },

      "faq": {
        "visual": "Minimal accordion with hairline separators; short answers.",
        "components": ["accordion.jsx"],
        "data_testids": {
          "faq": "faq",
          "faq-item": "faq-item"
        }
      },

      "booking": {
        "visual": "Warm surface block with clear form; trust microcopy; availability note.",
        "components": ["form.jsx", "input.jsx", "textarea.jsx", "button.jsx", "sonner.jsx"],
        "data_testids": {
          "booking": "booking-section",
          "booking-form": "booking-form",
          "booking-submit": "booking-submit-button",
          "booking-success": "booking-success-message",
          "booking-error": "booking-error-message"
        }
      }
    }
  },

  "motion_and_interactions": {
    "libraries": {
      "required": [
        {
          "name": "gsap",
          "why": "Pinned storytelling, line draw, scrubbed transitions.",
          "install": "npm i gsap"
        },
        {
          "name": "@studio-freight/lenis",
          "why": "Premium smooth scrolling; pairs with ScrollTrigger.",
          "install": "npm i @studio-freight/lenis"
        },
        {
          "name": "framer-motion",
          "why": "Component-level entrance/hover micro motion; reduced-motion handling.",
          "install": "npm i framer-motion"
        }
      ],
      "optional": [
        {
          "name": "lottie-react",
          "why": "If you want a lightweight preloader animation; keep subtle.",
          "install": "npm i lottie-react"
        }
      ]
    },

    "principles": [
      "Motion communicates physiology: breathing (slow scale/opacity), tension (line density), release (soft fade), alignment (snap-to-grid).",
      "Use GPU-friendly transforms only (translate/scale/opacity).",
      "Avoid flashy easing; use calm curves (power2.out, expo.out sparingly).",
      "Always support prefers-reduced-motion: disable pinned scrubbing; show static states + stepper UI."
    ],

    "micro_interactions": {
      "cursor": {
        "desktop": "Custom cursor: small ring + dot; expands near hotspots; shows mono label.",
        "mobile": "Disable custom cursor; use tap ripples (subtle) and larger hotspots.",
        "data_testid": "custom-cursor"
      },
      "hover": [
        "Buttons: lift -1px + shadow deepen; no color flashing.",
        "Diagram hotspots: increase node glow slightly (opacity only), show tooltip label.",
        "Nav: on scroll down, compress height; on scroll up, expand."
      ],
      "scroll": [
        "Section headers: split reveal (line-by-line) with 120–180ms stagger.",
        "Hairline dividers draw in (scaleX from 0 to 1).",
        "Topographic background drifts 6–12px over long scroll (very subtle)."
      ]
    },

    "gsap_lenis_scaffold_js": {
      "note": "Project uses .js (not .tsx).",
      "snippet": "import Lenis from '@studio-freight/lenis';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\nexport function initSmoothScroll() {\n  const lenis = new Lenis({\n    duration: 1.1,\n    smoothWheel: true,\n    smoothTouch: false,\n  });\n\n  lenis.on('scroll', ScrollTrigger.update);\n\n  gsap.ticker.add((time) => {\n    lenis.raf(time * 1000);\n  });\n  gsap.ticker.lagSmoothing(0);\n\n  return () => {\n    lenis.destroy();\n    gsap.ticker.remove((time) => lenis.raf(time * 1000));\n  };\n}\n"
    }
  },

  "accessibility": {
    "requirements": [
      "WCAG AA contrast: graphite text on bone background; avoid light gray text.",
      "Focus states: visible ring using --focus-ring; never remove outline without replacement.",
      "Hit targets: >=44px for hotspots and nav items.",
      "prefers-reduced-motion: provide static hero + stepper for storytelling.",
      "All diagrams must have text equivalents (aria-describedby) and keyboard navigation for hotspots."
    ],
    "aria_patterns": {
      "body_map_hotspots": "Use <button> elements positioned over SVG/canvas with aria-label like 'Left shoulder pathway'.",
      "story_steps": "Use Tabs with proper aria-controls; ensure keyboard arrow navigation."
    }
  },

  "image_urls": {
    "portrait_about_specialist": [
      {
        "url": "https://images.unsplash.com/photo-1579983881037-0e47c4eacc48?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbGlnaHQlMjBwb3J0cmFpdCUyMGNhbG0lMjBwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBzdHVkaW98ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzg0MTUxNTQwfDA&ixlib=rb-4.1.0&q=85",
        "description": "Natural-light portrait; calm, credible; crop for About hero."
      },
      {
        "url": "https://images.unsplash.com/photo-1648140516174-563158eee5b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxuYXR1cmFsJTIwbGlnaHQlMjBwb3J0cmFpdCUyMGNhbG0lMjBwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBzdHVkaW98ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzg0MTUxNTQwfDA&ixlib=rb-4.1.0&q=85",
        "description": "Alternate portrait option; use warm tint overlay to match palette."
      }
    ],

    "studio_interior": [
      {
        "url": "https://images.unsplash.com/photo-1708704974484-3ca56db9384f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxtaW5pbWFsJTIwdGhlcmFweSUyMHN0dWRpbyUyMGludGVyaW9yJTIwd2FybSUyMG5ldXRyYWx8ZW58MHx8fHdoaXRlfDE3ODQxNTE1NDd8MA&ixlib=rb-4.1.0&q=85",
        "description": "Warm minimal interior reference; use sparingly (1 image max) to avoid stock feel."
      }
    ],

    "abstract_topographic_texture": [
      {
        "url": "https://images.unsplash.com/photo-1660721858662-9ad9f37447f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHx0b3BvZ3JhcGhpYyUyMGNvbnRvdXIlMjBsaW5lcyUyMG1pbmltYWwlMjBiYWNrZ3JvdW5kfGVufDB8fHx0ZWFsfDE3ODQxNTE1NTF8MA&ixlib=rb-4.1.0&q=85",
        "description": "Use only as a behind-the-scenes texture reference; recolor to warm neutrals (no teal in final)."
      }
    ]
  },

  "instructions_to_main_agent": {
    "global_css_changes": [
      "Remove CRA default App.css styles (dark header, spinning logo). Do NOT center align .App.",
      "In index.css, replace default shadcn grayscale tokens with warm-neutral tokens above.",
      "Add a subtle noise overlay on body/main wrapper via ::before; keep opacity <= 0.06.",
      "Add selection styles: ::selection { background: rgba(206,137,70,0.22); }"
    ],

    "page_structure_home": [
      "StickyNav",
      "HeroLivingBodyMap (interactive)",
      "Manifesto/Philosophy (short modules + micro labels)",
      "PinnedStorytelling (Movement→Balance)",
      "KineticChainExplainer",
      "PainPathwaysInteractiveMap",
      "Approach/Methods (technical list, not icons)",
      "ConditionsBodyRegionNavigator",
      "SessionProcessTimeline",
      "AboutSpecialist",
      "PatientStories (restrained carousel)",
      "FAQ (accordion)",
      "Booking (form + CTA)",
      "Footer"
    ],

    "diagram_style_guide": [
      "All diagrams use hairline strokes (1px) with low opacity; highlight state increases opacity and stroke width to 1.5px.",
      "Annotations use mono font, uppercase, tracking; include small leader lines and coordinate-like numbers.",
      "Avoid medical iconography; use engineering symbols: arrows, ticks, brackets, dotted lines."
    ],

    "testing_attributes": [
      "Add data-testid to every interactive element: nav links, CTAs, body hotspots, tabs, accordion triggers, form inputs, submit button, toast messages.",
      "Use kebab-case describing role (not appearance)."
    ],

    "performance": [
      "Prefer SVG paths with GSAP; keep path count low; reuse symbols; lazy-load heavy sections.",
      "Use IntersectionObserver to pause hero animation when offscreen.",
      "Respect prefers-reduced-motion: disable Lenis + pinned ScrollTrigger; show static states."
    ]
  },

  "component_path": {
    "primary": "/app/frontend/src/components/ui/* (shadcn)",
    "notes": "Use shadcn primitives for all UI (accordion, sheet, tabs, inputs). Avoid raw HTML dropdown/calendar/toast; use existing shadcn components."
  },

  "references_used": {
    "design_inspiration_domains": [
      "advanced.team",
      "lightweight.info",
      "midlife.engineering",
      "non-linear.studio",
      "thefirstthelast.agency",
      "zhenyary.com",
      "buzzworthystudio.com",
      "neundex.com"
    ],
    "web_notes": [
      "Lenis + GSAP ScrollTrigger integration patterns (2026 references).",
      "Editorial minimal warm-neutral palettes and topographic line motifs."
    ]
  },

  "GENERAL_UI_UX_DESIGN_GUIDELINES": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
