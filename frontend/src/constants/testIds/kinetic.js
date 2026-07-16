// testIds for the Connected Body (KINETIC) site — Phase 2: full website.

export const NAV = {
  root: "site-nav",
  wordmark: "nav-wordmark",
  book: "nav-book-button",
  menu: "nav-mobile-menu-button",
  linkApproach: "nav-link-approach",
  linkConditions: "nav-link-conditions",
  linkAbout: "nav-link-about",
  sheet: "nav-mobile-sheet",
};

export const HERO = {
  section: "hero-section",
  bodymap: "hero-bodymap",
  legend: "hero-legend",
  book: "hero-book-button",
  how: "hero-how-link",
  hint: "hero-tap-hint",
  annotationOrigin: "hero-annotation-origin",
  annotationTerminal: "hero-annotation-terminal",
  nodeLabel: "hero-node-label",
  node: (id) => `hero-node-${id}`,
};

export const MANIFESTO_T = {
  section: "manifesto-section",
  line: (i) => `manifesto-line-${i}`,
};

export const JOURNEY_T = {
  section: "journey-section",
  stage: "journey-stage",
  diagram: "journey-diagram",
  progress: "journey-progress",
  stateTitle: "journey-state-title",
  prev: "journey-prev",
  next: "journey-next",
  step: (i) => `journey-step-${i}`,
};

export const CHAIN_T = {
  section: "chain-section",
  panel: "chain-panel",
  segment: (id) => `chain-segment-${id}`,
};

export const REGIONS_T = {
  section: "regions-section",
  panel: "regions-panel",
  link: "regions-panel-link",
  zone: (id) => `region-zone-${id}`,
  chip: (id) => `region-chip-${id}`,
};

export const SESSION_T = {
  section: "session-section",
  step: (i) => `session-step-${i}`,
};

export const SPECIALIST_T = {
  section: "specialist-section",
  more: "specialist-more-link",
};

export const SCENARIOS_T = {
  section: "scenarios-section",
  item: (id) => `scenario-${id}`,
};

export const FAQ_T = {
  section: "faq-section",
  item: (id) => `faq-item-${id}`,
};

export const CTA_T = {
  section: "final-cta-section",
  button: "final-cta-button",
};

export const FOOTER_T = {
  root: "site-footer",
  nav: "footer-nav",
  privacy: "footer-privacy-link",
};

export const BOOKING_T = {
  page: "booking-page",
  form: "booking-form",
  name: "booking-name",
  phone: "booking-phone",
  email: "booking-email",
  method: "booking-method",
  complaint: "booking-complaint",
  duration: "booking-duration",
  time: "booking-time",
  consent: "booking-consent",
  submit: "booking-submit",
  success: "booking-success",
  error: "booking-error",
};

export const APPROACH_T = {
  page: "approach-page",
  cta: "approach-cta",
};

export const CONDITIONS_T = {
  page: "conditions-page",
  regionLink: (id) => `conditions-link-${id}`,
};

export const REGION_PAGE_T = {
  page: "region-page",
  cta: "region-cta",
};

export const ABOUT_T = {
  page: "about-page",
  cta: "about-cta",
};

export const PLACEHOLDER = {
  page: "placeholder-page",
  home: "placeholder-home-link",
};
