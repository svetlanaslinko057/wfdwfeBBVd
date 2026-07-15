// bodyModel.js — Deterministic "Tension Map" geometry for the Connected Body hero.
//
// CRITICAL: everything here is generated ONCE at module load with a fixed seed.
// Geometry is byte-identical on every render, remount and visit — there is no
// runtime randomness anywhere in the animation layer.

export const VIEW_W = 400;
export const VIEW_H = 720;
const CX = 200;
const SEED = 20260214;

// -- Seeded PRNG (mulberry32) -------------------------------------------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// -- Silhouette half-width profiles (engineering keypoints) -------------------
// Torso: single horizontal span [CX - w, CX + w]
const TORSO_PROFILE = [
  [6, 8], [16, 24], [26, 31], [40, 29], [54, 24], [66, 14], [78, 13],
  [90, 22], [104, 74], [120, 70], [150, 60], [185, 50], [215, 44],
  [245, 50], [275, 56], [305, 60], [326, 58],
];
// Legs: two spans centered at CX ± LEG_OFFSET
const LEG_PROFILE = [
  [330, 26], [370, 24], [420, 20], [468, 15], [500, 16], [545, 17],
  [590, 13], [636, 10], [660, 9], [680, 10], [698, 14],
];
const LEG_OFFSET = 30;

function sampleProfile(profile, y) {
  if (y <= profile[0][0]) return profile[0][1];
  for (let i = 0; i < profile.length - 1; i++) {
    const [y0, w0] = profile[i];
    const [y1, w1] = profile[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0);
      const s = 0.5 - Math.cos(t * Math.PI) / 2; // cosine smoothing
      return w0 + (w1 - w0) * s;
    }
  }
  return profile[profile.length - 1][1];
}

// Organic hairline: cubic segments with subtle deterministic vertical drift.
function contourSpan(rand, x0, x1, y) {
  const segs = 6;
  const step = (x1 - x0) / segs;
  let px = x0;
  let py = y + (rand() - 0.5) * 2;
  let d = `M ${px.toFixed(1)} ${py.toFixed(1)}`;
  for (let i = 1; i <= segs; i++) {
    const nx = x0 + step * i;
    const ny = y + (rand() - 0.5) * 3.2;
    const c1x = px + step * 0.45;
    const c2x = nx - step * 0.45;
    d += ` C ${c1x.toFixed(1)} ${py.toFixed(1)}, ${c2x.toFixed(1)} ${ny.toFixed(1)}, ${nx.toFixed(1)} ${ny.toFixed(1)}`;
    px = nx;
    py = ny;
  }
  return d;
}

function generateContours() {
  const rand = mulberry32(SEED);
  const contours = [];
  const SPACING = 12;
  let idx = 0;
  for (let y = 10; y <= 700; y += SPACING) {
    if (y <= 322) {
      const hw = sampleProfile(TORSO_PROFILE, y);
      if (hw > 4) {
        contours.push({
          id: `ct-${idx}`,
          d: contourSpan(rand, CX - hw, CX + hw, y),
          opacity: +(0.16 + rand() * 0.1).toFixed(3),
          phase: idx % 3,
        });
        idx++;
      }
    } else {
      const hw = sampleProfile(LEG_PROFILE, y);
      const dL = contourSpan(rand, CX - LEG_OFFSET - hw, CX - LEG_OFFSET + hw, y);
      const dR = contourSpan(rand, CX + LEG_OFFSET - hw, CX + LEG_OFFSET + hw, y);
      contours.push({
        id: `ct-${idx}`,
        d: `${dL} ${dR}`,
        opacity: +(0.16 + rand() * 0.1).toFixed(3),
        phase: idx % 3,
      });
      idx++;
    }
  }
  return contours;
}

// -- Anatomical nodes (12) -----------------------------------------------------
export const NODES = [
  { id: "occiput", x: 200, y: 34, label: "C0 · OCCIPUT" },
  { id: "c7", x: 200, y: 82, label: "C7 · CERVICAL" },
  { id: "shoulder-l", x: 148, y: 110, label: "GH-L · SHOULDER" },
  { id: "shoulder-r", x: 252, y: 110, label: "GH-R · SHOULDER" },
  { id: "t7", x: 200, y: 168, label: "T7 · THORACIC" },
  { id: "l4", x: 200, y: 248, label: "L4 · LUMBAR" },
  { id: "hip-l", x: 172, y: 306, label: "HIP-L · COXA" },
  { id: "hip-r", x: 228, y: 306, label: "HIP-R · COXA" },
  { id: "knee-l", x: 170, y: 470, label: "KNEE-L · PATELLA" },
  { id: "knee-r", x: 230, y: 470, label: "KNEE-R · PATELLA" },
  { id: "ankle-l", x: 170, y: 660, label: "ANKLE-L · TALUS" },
  { id: "ankle-r", x: 230, y: 660, label: "ANKLE-R · TALUS" },
];

export const NODES_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

// -- Pathways (edges) ----------------------------------------------------------
function edgePath(a, b, bow) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const c1x = a.x + dx * 0.3 + nx * bow;
  const c1y = a.y + dy * 0.3 + ny * bow;
  const c2x = a.x + dx * 0.7 + nx * bow;
  const c2y = a.y + dy * 0.7 + ny * bow;
  return `M ${a.x} ${a.y} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${b.x} ${b.y}`;
}

const EDGE_DEFS = [
  ["ankle-l", "knee-l", -10],
  ["knee-l", "hip-l", -12],
  ["hip-l", "l4", -8],
  ["ankle-r", "knee-r", 10],
  ["knee-r", "hip-r", 12],
  ["hip-r", "l4", 8],
  ["l4", "t7", -6],
  ["t7", "c7", 5],
  ["c7", "occiput", -4],
  ["shoulder-l", "c7", -8],
  ["shoulder-r", "c7", 8],
];

export const EDGES = EDGE_DEFS.map(([from, to, bow]) => ({
  id: `${from}--${to}`,
  from,
  to,
  d: edgePath(NODES_BY_ID[from], NODES_BY_ID[to], bow),
}));

const EDGE_LOOKUP = {};
EDGES.forEach((e) => {
  EDGE_LOOKUP[`${e.from}|${e.to}`] = { edge: e, reversed: false };
  EDGE_LOOKUP[`${e.to}|${e.from}`] = { edge: e, reversed: true };
});

export function edgeBetween(a, b) {
  return EDGE_LOOKUP[`${a}|${b}`] || null;
}

// -- Kinetic chains (per activated node) ---------------------------------------
export const CHAINS = {
  "ankle-l": ["ankle-l", "knee-l", "hip-l", "l4", "t7", "c7", "occiput"],
  "ankle-r": ["ankle-r", "knee-r", "hip-r", "l4", "t7", "c7", "occiput"],
  "knee-l": ["knee-l", "hip-l", "l4", "t7", "c7", "occiput"],
  "knee-r": ["knee-r", "hip-r", "l4", "t7", "c7", "occiput"],
  "hip-l": ["hip-l", "l4", "t7", "c7", "occiput"],
  "hip-r": ["hip-r", "l4", "t7", "c7", "occiput"],
  l4: ["l4", "t7", "c7", "occiput"],
  t7: ["t7", "c7", "occiput"],
  c7: ["c7", "t7", "l4"],
  occiput: ["occiput", "c7", "t7"],
  "shoulder-l": ["shoulder-l", "c7", "occiput"],
  "shoulder-r": ["shoulder-r", "c7", "occiput"],
};

// Auto-propagation rotation (deterministic order)
export const AUTO_SEQUENCE = ["ankle-l", "ankle-r", "hip-l", "shoulder-r"];

// Mobile shows 5 enlarged hotspots only
export const MOBILE_NODE_IDS = ["ankle-l", "knee-r", "hip-l", "l4", "c7"];

export const CONTOURS = generateContours();
