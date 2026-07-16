"""Generate raster brand assets (favicon.png, apple-touch-icon, og-image) for Kinetic.
Node-pair mark: two dots connected by a hairline curve. Bone background, graphite/bronze."""
from PIL import Image, ImageDraw, ImageFont

BONE = (247, 244, 238)
GRAPHITE = (34, 31, 28)
BRONZE = (124, 95, 70)
LINE = (76, 70, 64)


def bezier(p0, p1, p2, p3, steps=60):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1 - t
        x = mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0]
        y = mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1]
        pts.append((x, y))
    return pts


def draw_nodepair(d, x0, y0, size, lw):
    """Draw node-pair inside box (x0,y0,size,size*0.6)."""
    ax, ay = x0 + size * 0.08, y0 + size * 0.42
    bx, by = x0 + size * 0.92, y0 + size * 0.42
    c1 = (x0 + size * 0.32, y0 + size * 0.02)
    c2 = (x0 + size * 0.68, y0 + size * 0.02)
    pts = bezier((ax, ay), c1, c2, (bx, by))
    d.line(pts, fill=LINE, width=lw, joint="curve")
    r1 = size * 0.10
    r2 = size * 0.08
    d.ellipse([ax - r1, ay - r1, ax + r1, ay + r1], fill=BRONZE)
    d.ellipse([bx - r2, by - r2, bx + r2, by + r2], fill=GRAPHITE)


def rounded_bg(size, radius):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size, size], radius=radius, fill=BONE)
    return img, d


# favicon 32 + 48 -> ico, png
for px, name in [(32, "favicon-32.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")]:
    img, d = rounded_bg(px, int(px * 0.22))
    draw_nodepair(d, px * 0.10, px * 0.18, px * 0.80, max(2, int(px * 0.055)))
    img.save(f"/app/frontend/public/{name}")

# ICO fallback
img, d = rounded_bg(48, 10)
draw_nodepair(d, 4.8, 8.6, 38.4, 3)
img.save("/app/frontend/public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# OG image 1200x630
og = Image.new("RGB", (1200, 630), BONE)
d = ImageDraw.Draw(og)
try:
    serif_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 110)
    mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 26)
except Exception:
    serif_big = ImageFont.load_default()
    mono = ImageFont.load_default()

# subtle contour lines band
import math, random
random.seed(20260214)
for i in range(14):
    y = 470 + i * 11
    pts = []
    for x in range(80, 1121, 16):
        pts.append((x, y + math.sin(x * 0.012 + i) * 3 + random.uniform(-1, 1)))
    d.line(pts, fill=(227, 223, 218), width=1)

draw_nodepair(d, 80, 90, 150, 5)
d.text((80, 300), "kinetic", font=serif_big, fill=GRAPHITE)
d.text((84, 430), "МАНУАЛЬНА ТЕРАПІЯ / СИСТЕМИ РУХУ", font=mono, fill=(121, 114, 108))
d.text((84, 240), "БІЛЬ — ЦЕ СИГНАЛ. РІДКО — ДЖЕРЕЛО.", font=mono, fill=BRONZE)
og.save("/app/frontend/public/og-image.png", optimize=True)
print("assets generated")
