#!/usr/bin/env python3
"""Styleframes of the film marine-1939: 3 directions x 3 frozen images, one standalone 1920x1080 HTML page each.

Usage: python3 -I styleframes.py <project>/styleframes <geo.json>
A « Le manuel et la mer », B « La table des opérations », C « Les actualités de 1939 ».
Fonts come from ../assets/fonts (project-relative), nothing from the network.
"""
import html
import json
import math
import os
import random
import sys

OUT, GEO_PATH = sys.argv[1], sys.argv[2]
GEO = json.load(open(GEO_PATH, encoding="utf-8"))
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------------------------------------------- shared kit

FONT_FACES = [
    ("Instrument Sans", "InstrumentSans-500.woff2", 500, "normal"),
    ("Instrument Sans", "InstrumentSans-600.woff2", 600, "normal"),
    ("EB Garamond", "EBGaramond-400.woff2", 400, "normal"),
    ("EB Garamond", "EBGaramond-700.woff2", 700, "normal"),
    ("EB Garamond", "EBGaramond-400-italic.woff2", 400, "italic"),
    ("EB Garamond", "EBGaramond-600-italic.woff2", 600, "italic"),
    ("Space Mono", "SpaceMono-400.woff2", 400, "normal"),
    ("Space Mono", "SpaceMono-700.woff2", 700, "normal"),
    ("Big Shoulders", "BigShoulders-600.woff2", 600, "normal"),
    ("Big Shoulders", "BigShoulders-800.woff2", 800, "normal"),
    ("Poiret One", "PoiretOne-400.woff2", 400, "normal"),
]
FONT_CSS = "\n".join(
    f'@font-face{{font-family:"{fam}";src:url(../assets/fonts/{f}) format("woff2");font-weight:{w};font-style:{s}}}'
    for fam, f, w, s in FONT_FACES)

BASE_CSS = """
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#000}
.f{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:hidden}
svg{display:block}
.sub{position:absolute;left:0;top:890px;width:1920px;height:90px;display:flex;align-items:center;justify-content:center;
     font:600 62px/1 "Instrument Sans";letter-spacing:-.005em;white-space:pre}
.sub .box{border-radius:3px;padding:.03em .14em .1em}
"""


def page(name, title, body, css=""):
    doc = (f'<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<title>{title}</title>\n'
           f'<style>\n{FONT_CSS}\n{BASE_CSS}\n{css}\n</style>\n</head>\n<body>\n{body}\n</body>\n</html>\n')
    with open(os.path.join(OUT, name + ".html"), "w", encoding="utf-8") as fh:
        fh.write(doc)


def sub(segments, color, box_bg="", box_fg="", shadow="none"):
    spans = []
    for text, boxed in segments:
        t = html.escape(text)
        spans.append(f'<span class="box" style="background:{box_bg};color:{box_fg}">{t}</span>' if boxed else f"<span>{t}</span>")
    return f'<div class="sub" style="color:{color};text-shadow:{shadow}">{"".join(spans)}</div>'


def grain(opacity=.08, freq=.85, blend="overlay", seed=1):
    return (f'<svg class="f" style="opacity:{opacity};mix-blend-mode:{blend}" width="1920" height="1080">'
            f'<filter id="grain{seed}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" '
            f'baseFrequency="{freq}" numOctaves="2" seed="{seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" '
            f'values="0"/></filter><rect width="1920" height="1080" filter="url(#grain{seed})"/></svg>')


# Side profiles of French warships of 1939 (stylised), length 1000, waterline y = 0, bow at x = 0 (facing left).
SHIPS = {
    "bb": [  # fast battleship, Dunkerque type: both quadruple turrets forward, tower, one funnel, hangar aft
        ("p", [(30, 0), (985, 0), (1000, -24), (600, -26), (590, -40), (60, -44), (0, -52)]),
        ("p", [(150, -43), (150, -60), (166, -67), (255, -67), (255, -43)]),
        ("l", (150, -55, 62, -58, 4)), ("l", (150, -61, 66, -64, 4)),
        ("p", [(290, -43), (290, -60), (390, -60), (390, -43)]),
        ("p", [(285, -60), (285, -78), (301, -85), (395, -85), (395, -60)]),
        ("l", (285, -71, 192, -74, 4)), ("l", (285, -77, 196, -80, 4)),
        ("p", [(420, -43), (420, -95), (430, -95), (430, -125), (440, -125), (440, -150), (450, -150), (450, -172),
               (470, -172), (470, -150), (478, -150), (478, -125), (488, -125), (488, -95), (505, -95), (505, -43)]),
        ("p", [(410, -153), (515, -153), (515, -146), (410, -146)]),
        ("l", (460, -172, 460, -218, 3)),
        ("p", [(548, -43), (562, -138), (612, -138), (604, -43)]),
        ("p", [(556, -146), (618, -146), (618, -138), (556, -138)]),
        ("p", [(615, -26), (615, -70), (700, -70), (700, -26)]),
        ("l", (680, -70, 674, -182, 3)), ("l", (662, -160, 690, -160, 2.5)),
        ("p", [(720, -26), (720, -44), (778, -44), (788, -26)]), ("l", (778, -38, 832, -38, 3)),
        ("p", [(800, -26), (800, -36), (862, -36), (862, -26)]),
        ("p", [(800, -36), (800, -52), (858, -52), (868, -36)]), ("l", (858, -46, 908, -46, 3)),
        ("p", [(890, -26), (890, -40), (960, -40), (960, -26)]),
        ("l", (930, -40, 930, -82, 3)), ("l", (930, -80, 976, -60, 2.5)),
    ],
    "ca": [  # heavy cruiser: four twin turrets, tower, one funnel
        ("p", [(25, 0), (985, 0), (1000, -22), (30, -38), (0, -46)]),
        ("p", [(120, -36), (120, -52), (132, -58), (195, -58), (195, -35)]),
        ("l", (120, -47, 52, -49, 3.5)), ("l", (120, -53, 56, -55, 3.5)),
        ("p", [(215, -35), (215, -47), (290, -47), (290, -34)]),
        ("p", [(210, -47), (210, -63), (222, -69), (290, -69), (290, -47)]),
        ("l", (210, -58, 142, -60, 3.5)), ("l", (210, -64, 146, -66, 3.5)),
        ("p", [(320, -33), (320, -78), (330, -78), (330, -108), (342, -108), (342, -128), (362, -128), (362, -108),
               (372, -108), (372, -78), (390, -78), (390, -32)]),
        ("p", [(310, -112), (400, -112), (400, -106), (310, -106)]),
        ("l", (352, -128, 352, -172, 3)),
        ("p", [(448, -31), (458, -112), (506, -112), (500, -30)]),
        ("p", [(454, -119), (510, -119), (510, -112), (454, -112)]),
        ("p", [(540, -29), (540, -56), (660, -56), (660, -27)]),
        ("l", (590, -56, 585, -160, 3)), ("l", (575, -140, 598, -140, 2.5)),
        ("p", [(690, -27), (690, -39), (765, -39), (765, -26)]),
        ("p", [(690, -39), (690, -55), (756, -55), (770, -46), (770, -39)]),
        ("l", (770, -50, 836, -50, 3.5)), ("l", (770, -44, 832, -44, 3.5)),
        ("p", [(785, -25), (785, -41), (845, -41), (858, -33), (858, -24)]),
        ("l", (858, -35, 918, -35, 3.5)), ("l", (858, -30, 914, -30, 3.5)),
    ],
    "ct": [  # contre-torpilleur
        ("p", [(18, 0), (990, 0), (1000, -16), (330, -22), (320, -30), (0, -36)]),
        ("p", [(100, -34), (100, -48), (112, -52), (140, -52), (140, -33)]), ("l", (100, -45, 44, -46, 3)),
        ("p", [(200, -32), (200, -41), (250, -41), (250, -31)]),
        ("p", [(196, -41), (196, -55), (208, -59), (240, -59), (240, -41)]), ("l", (196, -52, 138, -53, 3)),
        ("p", [(265, -31), (265, -60), (275, -60), (275, -76), (310, -76), (310, -60), (318, -60), (318, -30)]),
        ("l", (300, -76, 298, -150, 2.5)), ("l", (286, -128, 312, -128, 2)),
        ("p", [(395, -21), (404, -82), (442, -82), (436, -21)]),
        ("p", [(505, -20), (514, -80), (552, -80), (546, -20)]),
        ("p", [(460, -21), (460, -29), (495, -29), (495, -20)]),
        ("p", [(585, -19), (585, -28), (630, -28), (630, -19)]),
        ("l", (690, -18, 688, -108, 2.5)),
        ("p", [(725, -18), (725, -26), (775, -26), (775, -17)]),
        ("p", [(725, -26), (725, -40), (760, -40), (774, -30), (774, -26)]), ("l", (774, -35, 830, -35, 3)),
        ("p", [(812, -17), (812, -31), (846, -31), (860, -22), (860, -17)]), ("l", (860, -26, 908, -26, 3)),
    ],
    "ss": [  # coastal submarine
        ("p", [(60, 0), (100, -10), (200, -16), (860, -14), (930, -8), (960, 0)]),
        ("p", [(410, -16), (424, -60), (520, -60), (530, -16)]),
        ("p", [(430, -66), (514, -66), (514, -60), (430, -60)]),
        ("l", (470, -66, 470, -118, 3)), ("l", (492, -66, 492, -100, 3)),
        ("p", [(318, -16), (318, -26), (338, -26), (338, -16)]), ("l", (318, -23, 282, -25, 3)),
    ],
    "av": [  # aviso
        ("p", [(20, 0), (985, 0), (1000, -18), (360, -22), (350, -30), (0, -36)]),
        ("p", [(300, -30), (300, -64), (370, -64), (370, -22)]),
        ("l", (340, -64, 338, -140, 2.5)),
        ("p", [(470, -22), (480, -86), (530, -86), (524, -22)]),
        ("p", [(150, -33), (150, -47), (185, -47), (185, -33)]), ("l", (150, -42, 95, -43, 3)),
        ("p", [(760, -20), (760, -34), (795, -34), (805, -20)]), ("l", (805, -28, 855, -28, 3)),
        ("l", (650, -22, 648, -110, 2.5)),
        ("p", [(560, -22), (560, -32), (640, -32), (640, -22)]),
    ],
    "ch": [  # chasseur de sous-marins
        ("p", [(15, 0), (985, 0), (1000, -14), (0, -28)]),
        ("p", [(380, -24), (380, -56), (480, -56), (486, -22)]),
        ("l", (440, -56, 438, -120, 2.5)),
        ("p", [(520, -21), (526, -60), (560, -60), (556, -21)]),
        ("p", [(180, -26), (180, -38), (210, -38), (210, -26)]), ("l", (180, -34, 130, -35, 3)),
        ("p", [(880, -15), (880, -24), (960, -24), (960, -15)]),
    ],
}


def ship(kind, x0, y0, length, facing=1, fill="#000", stroke="none", sw=0, extra="", hull_fill=None):
    """A ship profile in page coordinates: bow at x0 (facing=1: bow to the left), waterline at y0."""
    s = length / 1000
    out = []
    for n, (kind_, data) in enumerate(SHIPS[kind]):
        if kind_ == "p":
            pts = " ".join(f"{x0 + facing * s * x:.1f},{y0 + s * y:.1f}" for x, y in data)
            own = f' fill="{hull_fill}"' if hull_fill and n == 0 else ""
            out.append(f'<polygon points="{pts}"{own}/>')
        else:
            x1, y1, x2, y2, w = data
            out.append(f'<line x1="{x0 + facing * s * x1:.1f}" y1="{y0 + s * y1:.1f}" x2="{x0 + facing * s * x2:.1f}" '
                       f'y2="{y0 + s * y2:.1f}" stroke="{fill if stroke == "none" else stroke}" stroke-width="{max(1.0, w * s * 1.6):.1f}" '
                       f'stroke-linecap="round"/>')
    return f'<g fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" {extra}>{"".join(out)}</g>'


def funnel_tops(kind, x0, y0, length, facing=1):
    """Page coordinates of the top of each funnel of a profile drawn by ship()."""
    s = length / 1000
    tops = {"bb": [(587, -146)], "ca": [(482, -119)], "ct": [(423, -82), (533, -80)], "av": [(505, -86)], "ch": [(543, -60)], "ss": []}
    return [(x0 + facing * s * x, y0 + s * y) for x, y in tops[kind]]


TOP_PLANS = {
    # Plan views (seen from above), length 1000 along x, bow at x = 0, beam along y. Turrets: (x, y, w, h, barrels, direction).
    "bb": {"beam": 72, "turrets": [(205, 0, 92, 80, 4, -1), (340, 0, 98, 86, 4, -1), (832, 0, 52, 44, 4, 1), (742, -44, 40, 34, 4, 1), (742, 44, 40, 34, 4, 1)],
           "blocks": [(420, -30, 90, 60), (612, -26, 92, 52), (885, -30, 80, 60)], "funnels": [(585, 0, 34, 26)]},
    "ca": {"beam": 56, "turrets": [(160, 0, 70, 54, 2, -1), (262, 0, 74, 58, 2, -1), (742, 0, 74, 58, 2, 1), (842, 0, 70, 54, 2, 1)],
           "blocks": [(330, -26, 70, 52), (540, -22, 120, 44)], "funnels": [(480, 0, 30, 22)]},
    "ct": {"beam": 44, "turrets": [(120, 0, 40, 30, 1, -1), (222, 0, 42, 32, 1, -1), (750, 0, 42, 32, 1, 1), (840, 0, 40, 30, 1, 1)],
           "blocks": [(262, -18, 56, 36), (455, -14, 44, 28), (585, -14, 50, 28)], "funnels": [(420, 0, 22, 16), (530, 0, 22, 16)]},
}


def model_top(kind, length, deck="#7d858b", hull="#4b535a", dark="#2b3136"):
    """A painted ship model seen from above (SVG group, bow at x = 0, centred on y = 0), to lay on the chart."""
    p = TOP_PLANS[kind]
    s = length / 1000
    b = p["beam"]
    hull_d = (f"M 0 0 C {70 * s:.1f} {-b * .55 * s:.1f} {170 * s:.1f} {-b * s:.1f} {320 * s:.1f} {-b * s:.1f} L {880 * s:.1f} {-b * s:.1f} "
              f"C {955 * s:.1f} {-b * s:.1f} {995 * s:.1f} {-b * .6 * s:.1f} {1000 * s:.1f} 0 C {995 * s:.1f} {b * .6 * s:.1f} {955 * s:.1f} {b * s:.1f} {880 * s:.1f} {b * s:.1f} "
              f"L {320 * s:.1f} {b * s:.1f} C {170 * s:.1f} {b * s:.1f} {70 * s:.1f} {b * .55 * s:.1f} 0 0 Z")
    out = [f'<path d="{hull_d}" fill="{dark}" transform="translate(0 {6 * s * 1000 / 300:.1f})"/>',
           f'<path d="{hull_d}" fill="{hull}"/>',
           f'<path d="{hull_d}" fill="{deck}" transform="scale(.97 .78) translate({15 * s:.1f} 0)"/>']
    for x, y, w, h in p["blocks"]:
        out.append(f'<rect x="{x * s:.1f}" y="{y * s:.1f}" width="{w * s:.1f}" height="{h * s:.1f}" rx="{4 * s:.1f}" fill="{hull}" stroke="{dark}" stroke-width="{2 * s:.1f}"/>')
    for x, y, rx, ry in p["funnels"]:
        out.append(f'<ellipse cx="{x * s:.1f}" cy="{y * s:.1f}" rx="{rx * s:.1f}" ry="{ry * s:.1f}" fill="{dark}"/>'
                   f'<ellipse cx="{x * s:.1f}" cy="{y * s:.1f}" rx="{rx * .62 * s:.1f}" ry="{ry * .62 * s:.1f}" fill="#141618"/>')
    for x, y, w, h, nb, d in p["turrets"]:
        for i in range(nb):
            by = (y + (i - (nb - 1) / 2) * h * .22) * s
            out.append(f'<line x1="{x * s:.1f}" y1="{by:.1f}" x2="{(x + d * w * 1.05) * s:.1f}" y2="{by:.1f}" stroke="{dark}" stroke-width="{max(1.2, 7 * s):.1f}" stroke-linecap="round"/>')
        out.append(f'<rect x="{(x - w / 2) * s:.1f}" y="{(y - h / 2) * s:.1f}" width="{w * s:.1f}" height="{h * s:.1f}" rx="{h * .38 * s:.1f}" fill="{hull}" stroke="{dark}" stroke-width="{2.4 * s:.1f}"/>')
    return "".join(out)


def ripples(cx, cy, n, r0, step, color="#3d6878", op=.55):
    return "".join(f'<ellipse cx="{cx}" cy="{cy}" rx="{r0 + i * step:.0f}" ry="{(r0 + i * step) * .72:.0f}" fill="none" stroke="{color}" '
                   f'stroke-width="{3.2 - i * .4:.1f}" opacity="{op * (1 - i / (n + .5)):.2f}"/>' for i in range(n))


def dial(cx, cy, r, rot=0, uid="d", tint=None, tint_op=.35):
    """A brass fire-control dial (range clock), graduated 0 to 100."""
    ticks = []
    for i in range(0, 100, 2):
        a = math.radians(i * 3.6 - 90)
        long_ = i % 10 == 0
        r1, r2 = r * (0.70 if long_ else 0.76), r * 0.82
        ticks.append(f'<line x1="{cx + r1 * math.cos(a):.1f}" y1="{cy + r1 * math.sin(a):.1f}" x2="{cx + r2 * math.cos(a):.1f}" '
                     f'y2="{cy + r2 * math.sin(a):.1f}" stroke="#1e1b16" stroke-width="{3.2 if long_ else 1.6}"/>')
        if long_:
            rn = r * 0.58
            ticks.append(f'<text x="{cx + rn * math.cos(a):.1f}" y="{cy + rn * math.sin(a) + r * 0.05:.1f}" text-anchor="middle" '
                         f'font-family="Space Mono" font-weight="700" font-size="{r * 0.12:.0f}" fill="#1e1b16">{i}</text>')
    hands = (f'<line x1="{cx}" y1="{cy}" x2="{cx + r * 0.66 * math.cos(math.radians(38)):.1f}" y2="{cy + r * 0.66 * math.sin(math.radians(38)):.1f}" '
             f'stroke="#16130f" stroke-width="{r * 0.035:.1f}" stroke-linecap="round"/>'
             f'<line x1="{cx}" y1="{cy}" x2="{cx + r * 0.46 * math.cos(math.radians(-128)):.1f}" y2="{cy + r * 0.46 * math.sin(math.radians(-128)):.1f}" '
             f'stroke="#9b2a20" stroke-width="{r * 0.05:.1f}" stroke-linecap="round"/>')
    tint_layer = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{tint}" opacity="{tint_op}" style="mix-blend-mode:multiply"/>' if tint else ""
    screws = "".join(f'<circle cx="{cx + r * .94 * math.cos(math.radians(a)):.1f}" cy="{cy + r * .94 * math.sin(math.radians(a)):.1f}" r="{r * .03:.1f}" '
                     f'fill="#3a2a12" stroke="#e6c98a" stroke-width="1.2"/>' for a in (45, 135, 225, 315))
    return f"""<g transform="rotate({rot} {cx} {cy})">
<defs><radialGradient id="brass{uid}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f1d79a"/><stop offset=".45" stop-color="#b48b4a"/><stop offset=".8" stop-color="#6b4f25"/><stop offset="1" stop-color="#3d2b12"/></radialGradient>
<radialGradient id="face{uid}" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#f4eedc"/><stop offset="1" stop-color="#d9ceb1"/></radialGradient></defs>
<circle cx="{cx}" cy="{cy + r * 0.05}" r="{r * 1.02}" fill="#000" opacity=".35"/>
<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#brass{uid})"/>
<circle cx="{cx}" cy="{cy}" r="{r * 0.88}" fill="#3b2a12"/>
<circle cx="{cx}" cy="{cy}" r="{r * 0.86}" fill="url(#face{uid})"/>{screws}
{''.join(ticks)}{hands}
<circle cx="{cx}" cy="{cy}" r="{r * 0.07}" fill="url(#brass{uid})" stroke="#2a1d0b" stroke-width="2"/>
<path d="M {cx - r * 0.7:.1f} {cy - r * 0.3:.1f} A {r * 0.8:.1f} {r * 0.8:.1f} 0 0 1 {cx + r * 0.35:.1f} {cy - r * 0.72:.1f}" stroke="#fff" stroke-width="{r * 0.06:.1f}" fill="none" opacity=".35" stroke-linecap="round"/>
{tint_layer}
</g>"""


def sailors_photo(x, y, w, h, rot=0, uid="p", tone=("#efe4cc", "#b8a27c", "#3b2e22")):
    """A crew photograph: three rows of sailors in bachi caps on a deck, printed with a white border."""
    light, mid, dark = tone
    rnd = random.Random(7)
    b = w * 0.045
    iw, ih = w - 2 * b, h - 2 * b
    figs = []
    rows = [(0.36, 11, 0.050), (0.55, 10, 0.056), (0.76, 9, 0.064)]
    for ry, n, sc in rows:
        size = iw * sc
        for i in range(n):
            fx = x + b + iw * (0.08 + 0.84 * (i + 0.5) / n) + rnd.uniform(-2, 2)
            fy = y + b + ih * ry
            figs.append(f'<rect x="{fx - size * 0.55:.1f}" y="{fy:.1f}" width="{size * 1.1:.1f}" height="{size * 1.9:.1f}" rx="{size * 0.25:.1f}" fill="{dark}"/>'
                        f'<path d="M {fx - size * 0.42:.1f} {fy + size * 0.05:.1f} L {fx:.1f} {fy + size * 0.55:.1f} L {fx + size * 0.42:.1f} {fy + size * 0.05:.1f} Z" fill="{light}" opacity=".9"/>'
                        f'<circle cx="{fx:.1f}" cy="{fy - size * 0.32:.1f}" r="{size * 0.33:.1f}" fill="{mid}"/>'
                        f'<ellipse cx="{fx:.1f}" cy="{fy - size * 0.62:.1f}" rx="{size * 0.5:.1f}" ry="{size * 0.16:.1f}" fill="{light}"/>'
                        f'<circle cx="{fx:.1f}" cy="{fy - size * 0.78:.1f}" r="{size * 0.12:.1f}" fill="{dark}"/>')
    return f"""<g transform="rotate({rot} {x + w / 2} {y + h / 2})">
<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#f4efe3"/>
<defs><linearGradient id="ph{uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{light}"/><stop offset=".45" stop-color="{mid}"/><stop offset="1" stop-color="{dark}"/></linearGradient></defs>
<rect x="{x + b}" y="{y + b}" width="{iw}" height="{ih}" fill="url(#ph{uid})"/>
<rect x="{x + b}" y="{y + b + ih * 0.12}" width="{iw}" height="{ih * 0.05}" fill="{dark}" opacity=".35"/>
{''.join(figs)}
</g>"""


def article_card(title, date, kind, w=540, accent="#3b4a55", sea=("#bcd6dc", "#5d8f9f", "#1f4b5c"), ship_fill="#132d39"):
    """An article of the blog as a printed card: picture, blog name, title, date (HTML)."""
    sky, mid, deep = sea
    ih = int(w * 0.52)
    img = (f'<svg width="{w}" height="{ih}" viewBox="0 0 {w} {ih}"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">'
           f'<stop offset="0" stop-color="{sky}"/><stop offset=".62" stop-color="{mid}"/><stop offset="1" stop-color="{deep}"/></linearGradient></defs>'
           f'<rect width="{w}" height="{ih}" fill="url(#sk)"/><rect y="{ih * 0.62}" width="{w}" height="{ih * 0.38}" fill="{deep}" opacity=".55"/>'
           + ship(kind, w * 0.12, ih * 0.64, w * 0.76, fill=ship_fill) +
           f'<rect y="{ih * 0.64}" width="{w}" height="3" fill="#e9f1f1" opacity=".35"/></svg>')
    return (f'<div class="card" style="width:{w}px">{img}<div class="cb"><div class="cn" style="color:{accent}">MARINE 1939</div>'
            f'<div class="ct">{html.escape(title)}</div><div class="cd">{html.escape(date)}</div></div></div>')


CARD_CSS = """
.card{background:#f7f1e3;border-radius:6px;overflow:hidden;box-shadow:0 30px 60px rgba(0,25,40,.35),0 4px 10px rgba(0,0,0,.18)}
.card .cb{padding:22px 30px 28px}
.card .cn{font:700 17px/1 "Space Mono";letter-spacing:.22em}
.card .ct{font:700 44px/1.08 "EB Garamond";color:#1b1a17;margin-top:14px}
.card .cd{font:400 17px/1 "Space Mono";color:#6b6658;margin-top:16px}
"""


def rays(xs, top, bottom, spread, opacity, blur, color="#ffffff"):
    out = []
    for i, x in enumerate(xs):
        w0, w1 = 30 + 12 * (i % 3), spread + 40 * (i % 2)
        out.append(f'<polygon points="{x - w0},{top} {x + w0},{top} {x + w1 + 160},{bottom} {x - w1 + 160},{bottom}" fill="url(#rayg)" opacity="{opacity * (0.7 + 0.3 * (i % 2))}"/>')
    return (f'<svg class="f" style="mix-blend-mode:screen;filter:blur({blur}px)" width="1920" height="1080"><defs><linearGradient id="rayg" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{color}" stop-opacity=".9"/><stop offset="1" stop-color="{color}" stop-opacity="0"/></linearGradient></defs>{"".join(out)}</svg>')


def particles(n, seed, area, rmin, rmax, color, op=(0.15, 0.6)):
    rnd = random.Random(seed)
    x0, y0, x1, y1 = area
    out = []
    for _ in range(n):
        r = rnd.uniform(rmin, rmax)
        out.append(f'<circle cx="{rnd.uniform(x0, x1):.0f}" cy="{rnd.uniform(y0, y1):.0f}" r="{r:.1f}" fill="{color}" opacity="{rnd.uniform(*op):.2f}"/>')
    return "".join(out)


def bubbles(seed, x, y, n, spread, rise, rmin=3, rmax=11):
    rnd = random.Random(seed)
    out = []
    for i in range(n):
        r = rnd.uniform(rmin, rmax) * (1 - i / (n * 1.6))
        bx = x + rnd.uniform(-spread, spread) * (1 + i / n)
        by = y - rise * i / n - rnd.uniform(0, 18)
        out.append(f'<circle cx="{bx:.0f}" cy="{by:.0f}" r="{r:.1f}" fill="none" stroke="#e8f6f8" stroke-width="{max(1.2, r * 0.22):.1f}" opacity=".75"/>'
                   f'<circle cx="{bx - r * 0.35:.0f}" cy="{by - r * 0.35:.0f}" r="{r * 0.25:.1f}" fill="#ffffff" opacity=".8"/>')
    return "".join(out)


ACC_A, PAPER_A, INK = "#c8312a", "#f1e8d6", "#1b1a17"
ACC_B, PAPER_B = "#b3176a", "#efe6cf"
ACC_C = "#d9a441"
LIGHT_TEXT = "#f4eddd"
SHADOW_DARK = "0 2px 14px rgba(0,0,0,.65),0 0 2px rgba(0,0,0,.5)"

# ---------------------------------------------------------------------------------------------------- A · le manuel et la mer

PAPER_DEFS = """<filter id="paper" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.0032 0.0055" numOctaves="3" seed="7" result="blot"/>
<feColorMatrix in="blot" type="matrix" values="0 0 0 0 .42  0 0 0 0 .33  0 0 0 0 .2  0 0 0 .6 0" result="b2"/>
<feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="3" result="fine"/>
<feColorMatrix in="fine" type="matrix" values="0 0 0 0 .3  0 0 0 0 .24  0 0 0 0 .16  0 0 0 .45 0" result="f2"/>
<feMerge><feMergeNode in="b2"/><feMergeNode in="f2"/></feMerge></filter>
<filter id="ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="4" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/></filter>
<pattern id="hatch" width="6" height="3.6" patternUnits="userSpaceOnUse"><line x1="0" y1="1.4" x2="6" y2="1.4" stroke="#1d1b17" stroke-width="1.25"/></pattern>
<pattern id="hatchd" width="6" height="2.6" patternUnits="userSpaceOnUse"><line x1="0" y1="1" x2="6" y2="1" stroke="#1d1b17" stroke-width="1.5"/></pattern>"""


def engraved_sea(x0, x1, y0, y1, seed):
    rnd = random.Random(seed)
    out, y, gap = [], y0 + 4, 4.0
    while y < y1:
        x = x0
        while x < x1:
            seg = rnd.uniform(60, 260)
            pts = []
            xx = x
            while xx < min(x + seg, x1):
                pts.append(f"{xx:.0f},{y + 1.1 * math.sin(xx / 23 + y) + rnd.uniform(-.4, .4):.1f}")
                xx += 18
            if len(pts) > 1:
                out.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#1d1b17" stroke-width="{1.0 + (y - y0) / (y1 - y0) * .7:.2f}" opacity="{.55 + (y - y0) / (y1 - y0) * .35:.2f}"/>')
            x += seg + rnd.uniform(6, 26)
        y += gap
        gap *= 1.045
    return "".join(out)


def smoke(x, y, length, rise, seed):
    """Engraved smoke: lines leave the top of the funnel and trail aft (to the right), the plume widening as it goes."""
    rnd = random.Random(seed)
    out = []
    for k in range(9):
        spread = (k - 4) / 4
        pts = []
        for i in range(13):
            t = i / 12
            px = x + t * length
            py = y - rise * t - spread * (4 + 46 * t) + 5 * math.sin(t * 7 + k) * t
            pts.append(f"{px:.0f},{py:.0f}")
        out.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#1d1b17" stroke-width="{1.3 - abs(spread) * .4:.2f}" '
                   f'opacity="{.8 - abs(spread) * .35 - rnd.uniform(0, .1):.2f}" stroke-linecap="round"/>')
    return "".join(out)


def bow_wave(x, y, length):
    """The white wedge of a bow wave on the engraved sea, and the wake behind the stern."""
    s = length / 1000
    return (f'<polygon points="{x - 30 * s:.0f},{y + 2} {x + 120 * s:.0f},{y + 18 * s + 6:.0f} {x + 330 * s:.0f},{y + 8:.0f} {x + 40 * s:.0f},{y - 2}" fill="#efe5cf"/>'
            f'<polygon points="{x + 940 * s:.0f},{y + 1} {x + 1400 * s:.0f},{y + 14:.0f} {x + 1400 * s:.0f},{y + 4:.0f}" fill="#efe5cf"/>'
            + "".join(f'<path d="M {x + (40 + i * 60) * s:.0f} {y + 6 + i * 3:.0f} q {40 * s:.0f} -6 {90 * s:.0f} 0" fill="none" stroke="#1d1b17" stroke-width="1" opacity=".55"/>' for i in range(4)))


def frame_a1():
    # 4.40 s, « avec la quatrième » : the history book page, the fleet engraved in line ahead, « 4e » rushing in
    sea_top = 650
    line = [("bb", 228, 640), ("ca", 920, 470), ("ct", 1452, 300)]
    fleet, smokes, waves = "", "", ""
    for n, (kind, x0, length) in enumerate(line):
        fleet += ship(kind, x0, sea_top, length, fill="url(#hatch)", stroke=INK, sw=1.5, hull_fill="url(#hatchd)")
        for fx, fy in funnel_tops(kind, x0, sea_top, length):
            smokes += smoke(fx, fy, length * .55, length * .07, 10 + n)
        waves += bow_wave(x0, sea_top, length)
    sky = "".join(
        f'<line x1="{x}" y1="{y}" x2="{x + w}" y2="{y}" stroke="#1d1b17" stroke-width=".9" opacity="{.12 + (y - 320) / 330 * .3:.2f}"/>'
        for y in range(322, sea_top - 4, 8) for x, w in [(214 + (y * 37) % 90, 520 + (y * 53) % 300), (900 + (y * 29) % 140, 760 - (y * 17) % 200)])
    typed = "".join(
        f'<tspan dy="{random.Random(i).uniform(-1.2, 1.2):.1f}" opacity="{random.Random(i + 9).uniform(.82, 1):.2f}">{html.escape(ch)}</tspan>'
        for i, ch in enumerate("SEPTEMBRE 1939"))
    hulls = ""
    svg = f"""<svg class="f" width="1920" height="1080" viewBox="0 0 1920 1080">
<defs>{PAPER_DEFS}
<radialGradient id="vig" cx="52%" cy="46%" r="75%"><stop offset=".55" stop-color="#6b4a22" stop-opacity="0"/><stop offset="1" stop-color="#6b4a22" stop-opacity=".32"/></radialGradient>
<linearGradient id="gut" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3f1c" stop-opacity=".42"/><stop offset=".2" stop-color="#5a3f1c" stop-opacity="0"/></linearGradient>
<clipPath id="fig"><rect x="214" y="314" width="1492" height="512"/></clipPath>
<filter id="inkt" x="-5%" y="-30%" width="110%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
<rect width="1920" height="1080" fill="#efe5cf"/>
<rect width="1920" height="1080" filter="url(#paper)" opacity=".38" style="mix-blend-mode:multiply"/>
<rect width="1920" height="1080" fill="url(#gut)"/>
<text x="960" y="232" text-anchor="middle" font-family="Space Mono" font-weight="700" font-size="56" letter-spacing="17" fill="#1f1c18" filter="url(#inkt)">{typed}</text>
<g filter="url(#ink)">
<rect x="206" y="306" width="1508" height="528" fill="none" stroke="{INK}" stroke-width="2.4"/>
<rect x="214" y="314" width="1492" height="512" fill="none" stroke="{INK}" stroke-width=".9"/>
<g clip-path="url(#fig)">{sky}{engraved_sea(214, 1706, sea_top, 826, 11)}
{smokes}{waves}{hulls}{fleet}</g></g>
<rect width="1920" height="1080" fill="url(#vig)"/>
</svg>"""
    curl = ('<div style="position:absolute;left:-170px;top:-140px;width:300px;height:1360px;border-radius:46%;'
            'background:linear-gradient(90deg,#cdbf9f,#f3ead6 58%,#e1d5ba);filter:blur(16px);box-shadow:40px 0 70px rgba(70,45,15,.38)"></div>')
    four = ""
    for dx, op, bl in ((150, .12, 26), (78, .25, 18), (0, 1, 9)):
        four += (f'<div style="position:absolute;left:{1265 + dx}px;top:70px;font:800 760px/1 \'Big Shoulders\';color:{ACC_A};'
                 f'opacity:{op};filter:blur({bl}px);transform:scale(1.12);transform-origin:80% 50%">4<span style="font-size:.4em;vertical-align:.95em;margin-left:.02em">e</span></div>')
    body = (f'<div class="f">{svg}{curl}{four}'
            + sub([("avec la ", False), ("quatrième", True)], INK, ACC_A, PAPER_A)
            + grain(.07, .9, "multiply", 2) + "</div>")
    page("A1", "A1 · Le manuel et la mer · 4,40 s", body)


SURFACE_LINES = ["Septembre 1939 : la France entre en guerre.", "Juillet 1940 : drame de Mers el-Kébir.",
                 "Novembre 1942 : la flotte se saborde à Toulon."]


def water_defs(uid, freq=".004 .02", scale=44):
    return (f'<filter id="wav{uid}" x="-10%" y="-40%" width="120%" height="180%"><feTurbulence type="fractalNoise" baseFrequency="{freq}" '
            f'numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="{scale}" xChannelSelector="R" yChannelSelector="G"/>'
            f'<feGaussianBlur stdDeviation="1.4"/></filter>')


def frame_a2():
    # 21.70 s, « Ses matériels. » : under the water, the page has become the surface, the dial sinks
    ghost_lines = "".join(
        f'<text x="960" y="{-40 - i * 46}" text-anchor="middle" font-family="EB Garamond" font-size="40" fill="#e9f5f7">{html.escape(t)}</text>'
        for i, t in enumerate(SURFACE_LINES))
    svg = f"""<svg class="f" width="1920" height="1080">
<defs>
<linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa3b6"/><stop offset=".2" stop-color="#22647c"/><stop offset=".55" stop-color="#0b2f45"/><stop offset="1" stop-color="#03111b"/></linearGradient>
{water_defs('a')}
<filter id="far" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="near" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="snow"><feGaussianBlur stdDeviation="1.2"/></filter>
<filter id="sink" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="0 9"/></filter>
<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d3a52" stop-opacity="0"/><stop offset="1" stop-color="#05141f" stop-opacity=".55"/></linearGradient>
</defs>
<rect width="1920" height="1080" fill="url(#deep)"/>
<g opacity=".55" filter="url(#wava)"><path d="M0 0 H1920 V54 Q1800 74 1680 56 T1440 56 T1200 56 T960 56 T720 56 T480 56 T240 56 T0 56 Z" fill="#d9f0f4" opacity=".55"/>
<g transform="scale(1,-1)" opacity=".16">{ghost_lines}</g></g>
<g filter="url(#far)" opacity=".78" transform="rotate(-12 520 880)">{ship('bb', -60, 930, 1150, fill='#124c64')}</g>
<rect y="640" width="1920" height="440" fill="url(#haze)"/>
<g filter="url(#snow)">{particles(150, 3, (0, 80, 1920, 1080), .8, 2.6, '#cfe8ee', (.08, .45))}</g>
<g opacity=".2" filter="url(#sink)" transform="translate(0,-80)" style="mix-blend-mode:screen">{dial(1190, 470, 205, -14, 'g')}</g>
{dial(1190, 470, 205, -14, 'm', tint='#5c9aab', tint_op=.3)}
{bubbles(5, 1250, 250, 14, 22, 230)}{bubbles(8, 1120, 270, 10, 16, 200, 2, 7)}
<g filter="url(#near)">{sailors_photo(70, 70, 600, 420, 13, 'n')}</g>
<g filter="url(#near)" opacity=".7">{bubbles(11, 1820, 980, 6, 40, 380, 18, 34)}</g>
</svg>"""
    body = (f'<div class="f">{svg}'
            f'{rays([260, 560, 820, 1080, 1390, 1650], -20, 900, 140, .16, 22)}'
            + sub([("Ses ", False), ("matériels", True), (".", False)], LIGHT_TEXT, ACC_A, PAPER_A, SHADOW_DARK)
            + grain(.06, .9, "overlay", 3) + "</div>")
    page("A2", "A2 · Le manuel et la mer · 21,70 s", body)


def frame_a3():
    # 32.35 s, « Ses navires, un par un. » : the light is back, the blog's ship cards rise to the surface one by one
    svg = f"""<svg class="f" width="1920" height="1080">
<defs><linearGradient id="up" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b4e3ea"/><stop offset=".22" stop-color="#63b3c6"/><stop offset=".6" stop-color="#2a7e98"/><stop offset="1" stop-color="#145470"/></linearGradient>
<filter id="caus" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".011 .018" numOctaves="2" seed="9" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.4 0 0 0 -1.1" result="c"/><feGaussianBlur in="c" stdDeviation="1.2"/></filter>
<linearGradient id="causm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="cm"><rect width="1920" height="1080" fill="url(#causm)"/></mask>
<filter id="snow"><feGaussianBlur stdDeviation="1.5"/></filter>
<filter id="near" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter></defs>
<rect width="1920" height="1080" fill="url(#up)"/>
<g mask="url(#cm)" opacity=".55" style="mix-blend-mode:screen"><rect width="1920" height="1080" filter="url(#caus)"/></g>
<path d="M0 0 H1920 V30 Q1800 48 1680 30 T1440 30 T1200 30 T960 30 T720 30 T480 30 T240 30 T0 30 Z" fill="#f2fbfc" opacity=".65"/>
<g filter="url(#snow)">{particles(110, 4, (0, 120, 1920, 1080), .8, 2.4, '#e6f5f8', (.1, .5))}</g>
{bubbles(21, 980, 230, 16, 30, 200)}{bubbles(22, 400, 470, 10, 20, 170, 2, 8)}{bubbles(23, 1560, 560, 9, 18, 150, 2, 7)}
</svg>"""
    cards = (f'<div style="position:absolute;left:1350px;top:500px;transform:rotate(-6deg) scale(.68);transform-origin:0 0;filter:blur(8px);opacity:.82">'
             f'{article_card("Chasseur de sous-marins CH4", "20 mai 2012", "ch")}</div>'
             f'<div style="position:absolute;left:150px;top:410px;transform:rotate(4deg) scale(.8);transform-origin:0 0;filter:blur(4px);opacity:.92">'
             f'{article_card("Aviso La Surprise (ex Bambara)", "25 juin 2012", "av")}</div>'
             f'<div style="position:absolute;left:690px;top:140px;transform:rotate(-2.5deg);transform-origin:50% 50%">'
             f'{article_card("Le sous-marin Amphitrite", "6 janvier 2012", "ss")}</div>')
    near = f'<svg class="f" width="1920" height="1080"><g filter="url(#nearb)"><defs><filter id="nearb" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="13"/></filter></defs>{bubbles(31, 1800, 900, 7, 50, 420, 16, 30)}</g></svg>'
    body = (f'<div class="f">{svg}{rays([300, 700, 1100, 1500], -20, 1000, 180, .2, 26)}{cards}{near}'
            + sub([("Ses navires, ", False), ("un par un", True), (".", False)], LIGHT_TEXT, ACC_A, PAPER_A, SHADOW_DARK)
            + grain(.05, .9, "overlay", 4) + "</div>")
    page("A3", "A3 · Le manuel et la mer · 32,35 s", body, CARD_CSS)


# ---------------------------------------------------------------------------------------------------- B · la table des opérations

def chart_svg(c, uid, labels, soundings_area=None, sea="#dde8e4", land="#efe3c4", seed=1, rose=None, route=None, n_snd=36):
    W, H = c["width"], c["height"]
    land_d = c["land"]
    bands = "".join(
        f'<path d="{land_d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linejoin="round"/>'
        for w, col in ((190, "#c9dcdc"), (186, sea), (110, "#9ebfca"), (106, "#c2d9dc"), (52, "#8fb2c0"), (48, "#b1cfd6")))
    grat = f'<path d="{c["graticule"]}" fill="none" stroke="#56707a" stroke-width="1.3" opacity=".45"/>'
    snd = ""
    if soundings_area:
        rnd = random.Random(seed)
        x0, y0, x1, y1, base = soundings_area
        for _ in range(n_snd):
            x, y = rnd.uniform(x0, x1), rnd.uniform(y0, y1)
            depth = int(base + (y - y0) / (y1 - y0) * 1800 + rnd.uniform(-180, 180))
            snd += f'<text x="{x:.0f}" y="{y:.0f}" font-family="EB Garamond" font-style="italic" font-size="24" fill="#4f6873" opacity=".55">{max(12, depth)}</text>'
    lab = ""
    for text, x, y, size, style, ls, anchor, col in labels:
        it = ' font-style="italic"' if style == "it" else ""
        wt = 700 if style == "caps" else 400
        lab += (f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="EB Garamond" font-weight="{wt}"{it} font-size="{size}" '
                f'letter-spacing="{ls}" fill="{col}">{html.escape(text)}</text>')
    rose_svg = ""
    if rose:
        rx, ry, rr = rose
        pts = []
        for k in range(32):
            a = math.radians(k * 11.25)
            l = rr if k % 8 == 0 else rr * .62 if k % 4 == 0 else rr * .4 if k % 2 == 0 else rr * .25
            pts.append(f'<line x1="{rx}" y1="{ry}" x2="{rx + l * math.sin(a):.1f}" y2="{ry - l * math.cos(a):.1f}" stroke="{ACC_B}" stroke-width="{3 if k % 8 == 0 else 1.6}"/>')
        rose_svg = (f'<g opacity=".85"><circle cx="{rx}" cy="{ry}" r="{rr * 1.08}" fill="none" stroke="{ACC_B}" stroke-width="2.4"/>'
                    f'<circle cx="{rx}" cy="{ry}" r="{rr * .98}" fill="none" stroke="{ACC_B}" stroke-width="1"/>{"".join(pts)}'
                    f'<text x="{rx}" y="{ry - rr * 1.16}" text-anchor="middle" font-family="EB Garamond" font-weight="700" font-size="{rr * .22:.0f}" fill="{ACC_B}">N</text></g>')
    route_svg = ""
    if route:
        done, todo = route
        route_svg = (f'<polyline points="{done}" fill="none" stroke="{ACC_B}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
                     f'<polyline points="{todo}" fill="none" stroke="{ACC_B}" stroke-width="6" stroke-dasharray="22 16" stroke-linecap="round" opacity=".8"/>')
    return f"""<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" style="position:absolute;left:0;top:0">
<defs><filter id="chartpaper{uid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0026 .004" numOctaves="3" seed="12" result="b"/>
<feColorMatrix in="b" type="matrix" values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .5 0"/></filter></defs>
<rect width="{W}" height="{H}" fill="{sea}"/>{bands}
<path d="{land_d}" fill="{land}" stroke="#4e4232" stroke-width="2.6" stroke-linejoin="round"/>
{grat}{snd}{rose_svg}{route_svg}{lab}
<rect width="{W}" height="{H}" filter="url(#chartpaper{uid})" opacity=".55" style="mix-blend-mode:multiply"/>
<rect x="{W * .38:.0f}" width="26" height="{H}" fill="#ffffff" opacity=".08"/><rect x="{W * .38 + 26:.0f}" width="18" height="{H}" fill="#6b5a3e" opacity=".08"/>
</svg>"""


def chart_scene(c, focus, screen, tilt, scale, content, persp=1500, origin="960px 380px"):
    fx, fy = focus
    sx, sy = screen
    return (f'<div class="f" style="perspective:{persp}px;perspective-origin:{origin}">'
            f'<div style="position:absolute;left:0;top:0;width:{c["width"]}px;height:{c["height"]}px;transform-origin:0 0;'
            f'transform:translate3d({sx}px,{sy}px,0) rotateX({tilt}deg) scale({scale}) translate({-fx}px,{-fy}px);transform-style:preserve-3d">'
            f'{content}</div></div>')


def place_model(kind, x, y, length, angle, opacity=1, blur=0, uid="m", shadow=True):
    """A ship model lying on the chart (chart coordinates, centred on x, y, bow along angle)."""
    filt = (f'<filter id="ds{uid}" x="-30%" y="-60%" width="160%" height="220%"><feDropShadow dx="9" dy="13" stdDeviation="7" '
            f'flood-color="#1a1008" flood-opacity=".55"/>' + (f'<feGaussianBlur stdDeviation="{blur}"/>' if blur else "") + "</filter>") if shadow else ""
    return (f'<svg style="position:absolute;left:{x}px;top:{y}px;overflow:visible" width="1" height="1"><defs>{filt}</defs>'
            f'<g transform="rotate({angle}) translate({-length / 2:.0f} 0)" opacity="{opacity}" {"filter=" + chr(34) + "url(#ds" + uid + ")" + chr(34) if shadow else ""}>'
            f'{model_top(kind, length)}</g></svg>')


def dividers(blur=12, right=False):
    flip = 'transform="translate(1920 0) scale(-1 1)"' if right else ""
    return (f'<svg class="f" width="1920" height="1080" style="filter:blur({blur}px)"><defs><linearGradient id="br" x1="0" y1="0" x2="1" y2="0">'
            f'<stop offset="0" stop-color="#5a3f18"/><stop offset=".45" stop-color="#e2c07a"/><stop offset=".55" stop-color="#f6e0a6"/><stop offset="1" stop-color="#6b4a1c"/></linearGradient></defs>'
            f'<g {flip}><g transform="rotate(-34 120 980)"><rect x="40" y="560" width="34" height="640" rx="10" fill="url(#br)"/>'
            f'<rect x="150" y="560" width="34" height="640" rx="10" fill="url(#br)" transform="rotate(14 112 560)"/>'
            f'<circle cx="112" cy="560" r="44" fill="url(#br)"/></g></g></svg>')


def lamp(cx, cy, rx, ry, dark=.86):
    return (f'<div class="f" style="background:radial-gradient(ellipse {rx}px {ry}px at {cx}px {cy}px,rgba(255,206,140,.24),rgba(255,206,140,0) 70%);mix-blend-mode:screen"></div>'
            f'<div class="f" style="background:radial-gradient(ellipse {rx * 1.25:.0f}px {ry * 1.25:.0f}px at {cx}px {cy}px,rgba(0,0,0,0) 38%,rgba(6,4,2,{dark}) 100%)"></div>')


def lampshade(left=-260):
    return (f'<div style="position:absolute;left:{left}px;top:-330px;width:1300px;height:420px;border-radius:0 0 50% 50%;'
            'background:linear-gradient(180deg,#0b2a1c 70%,#2d5a40 92%,#c9b98a 100%);filter:blur(12px);opacity:.95"></div>')


def paper_tag(x, y, text, rot=-7, w=330, h=96, size=30):
    return (f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:#f6f0e0;'
            f'box-shadow:6px 10px 18px rgba(40,25,10,.45);transform:rotate({rot}deg);display:flex;align-items:center;justify-content:center;'
            f'font:700 {size}px/1 \'Space Mono\';letter-spacing:4px;color:#1f1c18">{html.escape(text)}</div>'
            f'<div style="position:absolute;left:{x - 10}px;top:{y + h / 2 - 13:.0f}px;width:26px;height:26px;border-radius:50%;'
            f'background:radial-gradient(circle at 35% 35%,#f7dc9c,#9a7432 60%,#4a3410);box-shadow:4px 6px 8px rgba(30,15,5,.6)"></div>')


def frame_b1():
    # 4.40 s, « avec la quatrième » : the operations table at night, the models of the 1939 fleet leave the roads of Toulon
    c = GEO["med"]
    tx, ty = c["places"]["toulon"]
    mx, my = c["places"]["marseille"]
    gx, gy = c["places"]["golfe"]
    labels = [("TOULON", tx + 26, ty - 48, 48, "caps", 9, "start", "#2a2722"), ("MARSEILLE", mx - 10, my - 46, 38, "caps", 7, "middle", "#2a2722"),
              ("Golfe du Lion", gx, gy + 60, 74, "it", 14, "middle", "#4b6b7a")]
    chart = chart_svg(c, "b1", labels, (2000, ty + 170, 3250, ty + 1000, 40), seed=3, n_snd=34)
    line = [("bb", 2700, 1030, 230), ("bb", 2480, 1150, 230), ("ca", 2285, 1262, 200), ("ct", 2120, 1360, 150), ("ct", 1975, 1446, 150)]
    models = "".join(place_model(k, x, y, l, -30, uid=f"b1{i}") for i, (k, x, y, l) in enumerate(line))
    tag = paper_tag(2745, 905, "SEPTEMBRE 1939")
    scene = chart_scene(c, (2330, 1210), (1080, 560), 50, 1.3, chart + models + tag)
    four = ""
    for dx, op, bl in ((-150, .12, 26), (-78, .25, 18), (0, 1, 9)):
        four += (f'<div style="position:absolute;left:{30 + dx}px;top:-70px;font:800 720px/1 \'Big Shoulders\';color:{ACC_B};'
                 f'opacity:{op};filter:blur({bl}px);transform:scale(1.12);transform-origin:20% 50%">4<span style="font-size:.4em;vertical-align:.95em">e</span></div>')
    body = (f'<div class="f" style="background:#0c0906">{scene}{lamp(1080, 580, 960, 540)}{lampshade(900)}{dividers(right=True)}{four}'
            + sub([("avec la ", False), ("quatrième", True)], LIGHT_TEXT, ACC_B, PAPER_B, SHADOW_DARK)
            + grain(.07, .9, "overlay", 5) + "</div>")
    page("B1", "B1 · La table des opérations · 4,40 s", body)


def frame_b2():
    # 8.90 s, « Juillet 1940 : Mers el-Kébir. » : the squadron moored stern to the jetty; one model sinks into the chart
    c = GEO["med"]
    mx, my = c["places"]["merselkebir"]
    ox, oy = c["places"]["oran"]
    labels = [("MERS EL-KÉBIR", mx - 60, my + 70, 46, "caps", 8, "end", "#2a2722"), ("ORAN", ox + 120, oy + 80, 44, "caps", 9, "start", "#2a2722")]
    chart = chart_svg(c, "b2", labels, (250, my - 1100, 1750, my - 260, 1400), seed=5, n_snd=30)
    row = [("bb", mx - 300, my - 290, 230), ("bb", mx - 130, my - 296, 230), ("bb", mx + 40, my - 302, 230), ("bb", mx + 210, my - 308, 230)]
    models = ""
    for i, (k, x, y, l) in enumerate(row):
        if i == 2:  # the one that sinks: ripples on the chart, the model already half gone
            models += (f'<svg style="position:absolute;left:{x}px;top:{y}px;overflow:visible" width="1" height="1">{ripples(0, 0, 5, 120, 44)}'
                       f'<ellipse cx="0" cy="0" rx="190" ry="150" fill="none" stroke="#b3241a" stroke-width="5" opacity=".8" stroke-dasharray="40 12"/></svg>')
            models += place_model(k, x, y, l, -84, opacity=.5, blur=2.5, uid=f"b2{i}")
        else:
            models += place_model(k, x, y, l, -90 + (i - 1.5) * 3, uid=f"b2{i}")
    note = (f'<svg style="position:absolute;left:{mx + 150}px;top:{my - 520}px;overflow:visible" width="1" height="1">'
            f'<text x="0" y="0" font-family="Space Mono" font-size="44" fill="#3a3530" opacity=".85">3·7·40</text></svg>')
    scene = chart_scene(c, (mx - 50, my - 230), (960, 470), 50, 1.55, chart + models + note)
    body = (f'<div class="f" style="background:#0c0906">{scene}{lamp(980, 520, 880, 500, .88)}{lampshade()}'
            + sub([("Juillet 1940 : ", False), ("Mers el-Kébir", True), (".", False)], LIGHT_TEXT, ACC_B, PAPER_B, SHADOW_DARK)
            + grain(.07, .9, "overlay", 6) + "</div>")
    page("B2", "B2 · La table des opérations · 8,90 s", body)


def frame_b3():
    # 39.30 s, « De New York à Toulon, » : daylight on the chart, the route from New York to Toulon, a model slides along it
    c = GEO["atlantic"]
    P = c["places"]
    way = ["newyork", "r1", "r2", "r3", "r4", "gibraltar", "r5", "r6", "r7", "toulon"]
    pts = [P[k] for k in way]
    cut = 2
    tx, ty = pts[cut]
    done = " ".join(f"{x},{y}" for x, y in pts[:cut + 1])
    todo = " ".join(f"{x},{y}" for x, y in pts[cut:])
    labels = [("NEW YORK", P["newyork"][0] + 40, P["newyork"][1] + 64, 40, "caps", 7, "start", "#2a2722"),
              ("TOULON", P["toulon"][0] - 40, P["toulon"][1] + 70, 40, "caps", 7, "end", "#2a2722"),
              ("GIBRALTAR", P["gibraltar"][0] - 20, P["gibraltar"][1] + 64, 30, "caps", 6, "end", "#2a2722"),
              ("OCÉAN ATLANTIQUE", 1500, 1420, 110, "it", 40, "middle", "#4b6b7a")]
    chart = chart_svg(c, "b3", labels, None, rose=(2350, 1500, 150), route=(done, todo))
    heading = math.degrees(math.atan2(pts[cut + 1][1] - ty, pts[cut + 1][0] - tx)) + 180
    model = place_model("ca", tx, ty, 260, heading, uid="b3m")
    trail = "".join(f'<div style="position:absolute;left:0;top:0;opacity:{op};filter:blur({bl}px);transform:translateX({-dx}px)">'
                    f'{place_model("ca", tx, ty, 260, heading, shadow=False)}</div>' for dx, op, bl in ((120, .18, 10), (60, .35, 5)))
    cards = (f'<div style="position:absolute;left:{P["newyork"][0] + 60}px;top:{P["newyork"][1] - 560}px;transform:rotate(-4deg) scale(.9);transform-origin:0 0">'
             f'{article_card("La 4ème DC à New York", "12 août 2013", "ca", 520, sea=("#e5d6b8", "#a9937a", "#5f4c39"), ship_fill="#2b2118")}</div>'
             f'<div style="position:absolute;left:{P["toulon"][0] - 560}px;top:{P["toulon"][1] - 650}px;transform:rotate(3deg) scale(.9);transform-origin:0 0">'
             f'{article_card("Les épaves de Toulon", "5 mai 2016", "ct", 520, sea=("#cfd3d1", "#7c8784", "#2f3836"), ship_fill="#1c2322")}</div>')
    pins = "".join(f'<div style="position:absolute;left:{x}px;top:{y}px;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f7dc9c,#9a7432 60%,#4a3410);box-shadow:4px 6px 8px rgba(30,15,5,.45)"></div>'
                   for x, y in ((P["newyork"][0] + 300, P["newyork"][1] - 556), (P["toulon"][0] - 300, P["toulon"][1] - 640)))
    scene = chart_scene(c, (1720, 900), (960, 470), 22, .56, chart + cards + pins + trail + model, persp=2600, origin="960px 300px")
    ruler = ('<div style="position:absolute;left:1380px;top:-160px;width:760px;height:380px;transform:rotate(-12deg);filter:blur(10px);'
             'background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,.15));border:3px solid rgba(255,255,255,.5);'
             'border-radius:0 0 380px 380px;box-shadow:0 20px 40px rgba(40,30,10,.18)"></div>')
    day = ('<div class="f" style="background:radial-gradient(ellipse 1300px 800px at 900px 420px,rgba(255,248,232,.18),rgba(255,248,232,0) 70%);mix-blend-mode:screen"></div>'
           '<div class="f" style="background:radial-gradient(ellipse 1400px 900px at 960px 460px,rgba(0,0,0,0) 55%,rgba(70,50,25,.35) 100%)"></div>')
    body = (f'<div class="f" style="background:#8a7353">{scene}{day}{ruler}'
            + sub([("De New York à Toulon,", False)], "#1d1b18", shadow="0 0 18px rgba(255,250,238,.95),0 0 4px rgba(255,250,238,.9)")
            + grain(.05, .9, "multiply", 7) + "</div>")
    page("B3", "B3 · La table des opérations · 39,30 s", body, CARD_CSS)


# ---------------------------------------------------------------------------------------------------- C · les actualités de 1939

K = 58  # px per mm of 35 mm film for C1 and C2


def film_strip(k, cx, image_top, frames, perf_color="#fff4dc", base="#191613", sound=True, uid="s"):
    """A 35 mm strip seen on a light box: perforations, optical sound track, frames (HTML inside each frame)."""
    film_w = 35 * k
    left = cx - film_w / 2
    img_l = left + 7.6 * k
    img_w, img_h, pitch = 22 * k, 16 * k, 19 * k
    out = [f'<div style="position:absolute;left:{left:.0f}px;top:-200px;width:{film_w:.0f}px;height:1480px;background:{base}"></div>']
    first = image_top - pitch * 3
    y = first - 1.5 * k
    while y < 1300:
        for px in (left + 2.01 * k, left + 30.19 * k):
            out.append(f'<div style="position:absolute;left:{px:.0f}px;top:{y:.0f}px;width:{2.8 * k:.0f}px;height:{1.98 * k:.0f}px;'
                       f'border-radius:{.5 * k:.0f}px;background:{perf_color};box-shadow:0 0 {k * .6:.0f}px {perf_color}"></div>')
        y += 4.75 * k
    if sound:
        rnd = random.Random(4)
        pts_l, pts_r = [], []
        yy = -200
        while yy < 1300:
            amp = .25 + .55 * abs(math.sin(yy / 23) * math.cos(yy / 61)) * rnd.uniform(.6, 1)
            pts_l.append(f"{left + 6.35 * k - amp * .55 * k:.1f},{yy}")
            pts_r.append(f"{left + 6.35 * k + amp * .55 * k:.1f},{yy}")
            yy += 4
        poly = " ".join(pts_l + pts_r[::-1])
        out.append(f'<svg class="f" width="1920" height="1080" style="overflow:visible"><polygon points="{poly}" fill="#e9e2d2" opacity=".85"/></svg>')
    for i, inner in enumerate(frames):
        top = image_top + (i - 1) * pitch
        out.append(f'<div style="position:absolute;left:{img_l:.0f}px;top:{top:.0f}px;width:{img_w:.0f}px;height:{img_h:.0f}px;overflow:hidden;'
                   f'border-radius:{.35 * k:.0f}px">{inner}</div>')
    return "".join(out), (img_l, img_w, img_h)


def bw_effects(w, h, seed, scratches=3):
    rnd = random.Random(seed)
    sc = "".join(f'<line x1="{rnd.uniform(0, w):.0f}" y1="0" x2="{rnd.uniform(0, w):.0f}" y2="{h}" stroke="#f4f0e6" stroke-width="{rnd.uniform(.8, 2):.1f}" opacity="{rnd.uniform(.2, .5):.2f}"/>'
                 for _ in range(scratches))
    dust = "".join(f'<circle cx="{rnd.uniform(0, w):.0f}" cy="{rnd.uniform(0, h):.0f}" r="{rnd.uniform(1, 4):.1f}" fill="{rnd.choice(["#0a0a0a", "#efeadf"])}" opacity="{rnd.uniform(.4, .8):.2f}"/>'
                   for _ in range(26))
    return (f'<svg style="position:absolute;left:0;top:0" width="{w:.0f}" height="{h:.0f}">'
            f'<defs><filter id="fg{seed}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="{seed}"/>'
            f'<feColorMatrix type="saturate" values="0"/></filter>'
            f'<radialGradient id="vg{seed}" cx="50%" cy="48%" r="72%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>'
            f'<linearGradient id="fl{seed}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'
            f'<rect width="{w:.0f}" height="{h:.0f}" filter="url(#fg{seed})" opacity=".22" style="mix-blend-mode:overlay"/>'
            f'<rect width="{w:.0f}" height="{h:.0f}" fill="url(#fl{seed})"/>{sc}{dust}<rect width="{w:.0f}" height="{h:.0f}" fill="url(#vg{seed})"/></svg>')


def deco_card(w, h, top_word, big, second, color="#efeadf", ground="#0c0c0c", gold=None):
    g = gold or color
    m = min(w, h) * .07
    anchor = (f'<svg width="90" height="90" viewBox="-45 -45 90 90" style="display:block;margin:0 auto">'
              f'<circle cx="0" cy="-30" r="7" fill="none" stroke="{g}" stroke-width="4"/><line x1="0" y1="-23" x2="0" y2="32" stroke="{g}" stroke-width="5"/>'
              f'<line x1="-18" y1="-12" x2="18" y2="-12" stroke="{g}" stroke-width="5"/><path d="M -32 10 Q -26 34 0 34 Q 26 34 32 10" fill="none" stroke="{g}" stroke-width="5"/>'
              f'<path d="M -38 16 L -30 6 L -24 18 Z M 38 16 L 30 6 L 24 18 Z" fill="{g}"/></svg>')
    rule = f'<div style="flex:1;height:2px;background:{g};opacity:.9"></div>'
    return (f'<div style="position:absolute;inset:0;background:{ground}">'
            f'<div style="position:absolute;left:{m:.0f}px;top:{m:.0f}px;right:{m:.0f}px;bottom:{m:.0f}px;border:3px solid {g}"></div>'
            f'<div style="position:absolute;left:{m + 14:.0f}px;top:{m + 14:.0f}px;right:{m + 14:.0f}px;bottom:{m + 14:.0f}px;border:1px solid {g};opacity:.8"></div>'
            + "".join(f'<div style="position:absolute;{v}:{m - 12:.0f}px;{hh}:{m - 12:.0f}px;width:46px;height:46px;border:3px solid {g};background:{ground}"></div>'
                      for v in ("top", "bottom") for hh in ("left", "right"))
            + f'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:{color};text-align:center">'
            f'<div style="font:400 {h * .052:.0f}px/1 \'Poiret One\';letter-spacing:.5em;margin-left:.5em">{html.escape(top_word)}</div>'
            f'<div style="display:flex;align-items:center;gap:28px;width:58%;margin:{h * .035:.0f}px 0">{rule}{anchor}{rule}</div>'
            f'<div style="font:800 {h * .2:.0f}px/.95 \'Big Shoulders\';letter-spacing:.05em">{html.escape(big)}</div>'
            f'<div style="font:800 {h * .27:.0f}px/.9 \'Big Shoulders\';letter-spacing:.04em;color:{g}">{html.escape(second)}</div></div></div>')


def newsreel_harbor(w, h, seed=1):
    """Toulon at dawn, 27 November 1942, as a newsreel frame: hills, ships settling in the roads, fires, smoke columns."""
    rnd = random.Random(seed)
    sea_y = h * .66
    hills = (f'<path d="M 0 {h * .6:.0f} C {w * .08:.0f} {h * .52:.0f} {w * .16:.0f} {h * .47:.0f} {w * .27:.0f} {h * .5:.0f} '
             f'C {w * .36:.0f} {h * .53:.0f} {w * .42:.0f} {h * .44:.0f} {w * .55:.0f} {h * .45:.0f} C {w * .68:.0f} {h * .46:.0f} {w * .74:.0f} {h * .53:.0f} '
             f'{w * .86:.0f} {h * .52:.0f} C {w * .93:.0f} {h * .51:.0f} {w * .97:.0f} {h * .55:.0f} {w:.0f} {h * .57:.0f} L {w:.0f} {sea_y + 2:.0f} L 0 {sea_y + 2:.0f} Z" fill="#3b3a37"/>')
    smoke, fires, refl = [], [], []
    ships = [("bb", w * .05, w * .38, 5), ("ca", w * .47, w * .27, -4), ("ct", w * .76, w * .19, 2)]
    out_ships = []
    for kind, x0, length, tilt in ships:
        out_ships.append(ship(kind, x0, sea_y + length * .02, length, fill="#121212",
                              extra=f'transform="rotate({tilt} {x0 + length / 2:.0f} {sea_y:.0f})"'))
        for fx, fy in funnel_tops(kind, x0, sea_y, length)[:1]:
            for i in range(14):
                r = 22 + i * 9
                smoke.append(f'<circle cx="{fx + i * 14 + rnd.uniform(-10, 10):.0f}" cy="{fy - i * 30:.0f}" r="{r:.0f}" fill="#{rnd.choice(["262626", "333333", "404040", "4d4d4d"])}" opacity=".9"/>')
        for j in range(3):
            fx = x0 + length * rnd.uniform(.15, .85)
            fires.append(f'<ellipse cx="{fx:.0f}" cy="{sea_y - length * .03:.0f}" rx="{length * .05:.0f}" ry="{length * .025:.0f}" fill="#ffffff" opacity=".9"/>')
            refl.append(f'<rect x="{fx - 4:.0f}" y="{sea_y + 6:.0f}" width="8" height="{h * .2:.0f}" fill="#d9d9d9" opacity=".35"/>')
    return (f'<svg style="position:absolute;left:0;top:0" width="{w:.0f}" height="{h:.0f}"><defs>'
            f'<linearGradient id="sky{seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151515"/><stop offset=".5" stop-color="#4d4c48"/>'
            f'<stop offset=".66" stop-color="#8d8b85"/></linearGradient>'
            f'<linearGradient id="sea{seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2b2a"/><stop offset="1" stop-color="#080808"/></linearGradient>'
            f'<filter id="smk{seed}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>'
            f'<filter id="fire{seed}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>'
            f'<filter id="ref{seed}"><feGaussianBlur stdDeviation="3 10"/></filter></defs>'
            f'<rect width="{w:.0f}" height="{h:.0f}" fill="url(#sky{seed})"/>{hills}'
            f'<rect y="{sea_y:.0f}" width="{w:.0f}" height="{h - sea_y:.0f}" fill="url(#sea{seed})"/>'
            f'<g filter="url(#smk{seed})">{"".join(smoke)}</g>{"".join(out_ships)}'
            f'<g filter="url(#fire{seed})">{"".join(fires)}</g><g filter="url(#ref{seed})">{"".join(refl)}</g></svg>')


def frame_c1():
    # 0.90 s, « Septembre 1939. » : the film strip on the light box, the newsreel title card; the strip runs upward
    w, h = 22 * K, 16 * K
    card = deco_card(w, h, "ACTUALITÉS", "SEPTEMBRE", "1939") + bw_effects(w, h, 11)
    nxt = newsreel_harbor(w, h, 2) + bw_effects(w, h, 12)
    strip, (il, iw, ih) = film_strip(K, 1000, 40, ["", card, nxt])
    body = (f'<div class="f" style="background:#060504"><div class="f" style="filter:blur(.4px)">{strip}</div>'
            f'<div class="f" style="background:linear-gradient(180deg,rgba(255,244,220,.06),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 80%,rgba(0,0,0,.4))"></div>'
            f'<div class="f" style="background:radial-gradient(ellipse 1200px 900px at 1000px 480px,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)"></div>'
            + grain(.12, .8, "overlay", 8) + "</div>")
    page("C1", "C1 · Les actualités de 1939 · 0,90 s", body)


def frame_c2():
    # 12.90 s, the silence after « Toulon. » : the film jams in the gate and burns through the image of Toulon
    w, h = 22 * K, 16 * K
    harbor = newsreel_harbor(w, h, 3) + bw_effects(w, h, 13, 4)
    cx, cy, r = w * .64, h * .4, h * .3
    rnd = random.Random(17)
    cells = "".join(
        f'<circle cx="{cx + r * k * math.cos(a):.0f}" cy="{cy + r * .82 * k * math.sin(a):.0f}" r="{rr:.0f}" fill="#fff6dc" stroke="#7a3a12" stroke-width="{rr * .35:.1f}"/>'
        for a, k, rr in [(rnd.uniform(0, 2 * math.pi), rnd.uniform(.92, 1.12), rnd.uniform(5, 17)) for _ in range(46)])
    burn = f"""<svg style="position:absolute;left:0;top:0" width="{w:.0f}" height="{h:.0f}">
<defs><filter id="melt" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="8" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter>
<radialGradient id="hole" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffef8"/><stop offset=".8" stop-color="#fff5d8"/><stop offset=".9" stop-color="#f6c66e"/>
<stop offset=".955" stop-color="#b0561c"/><stop offset="1" stop-color="#3e1705"/></radialGradient>
<radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset=".6" stop-color="#4a2208" stop-opacity=".5"/><stop offset="1" stop-color="#4a2208" stop-opacity="0"/></radialGradient></defs>
<g filter="url(#melt)"><ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{r * 1.28:.0f}" ry="{r * 1.1:.0f}" fill="url(#halo)"/>
<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{r:.0f}" ry="{r * .82:.0f}" fill="url(#hole)"/><g filter="url(#soft)">{cells}</g></g>
</svg>"""
    strip, _ = film_strip(K, 1000, 76, ["", harbor + burn, ""])
    glow = ('<div class="f" style="background:radial-gradient(ellipse 700px 560px at 1170px 390px,rgba(255,190,90,.3),rgba(255,190,90,0) 70%);mix-blend-mode:screen"></div>')
    body = (f'<div class="f" style="background:#060504"><div class="f" style="transform:translateY(6px) rotate(.25deg)">{strip}</div>{glow}'
            f'<div class="f" style="background:radial-gradient(ellipse 1200px 900px at 1000px 480px,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%)"></div>'
            + grain(.12, .8, "overlay", 9) + "</div>")
    page("C2", "C2 · Les actualités de 1939 · 12,90 s", body)


def frame_c3():
    # 29.50 s, « MARINE 1939 fait revivre » : the projector starts again, in colour; the blog's articles are the frames of the strip
    k = 34
    w, h = 22 * k, 16 * k
    title = deco_card(w, h, "LE BLOG", "MARINE", "1939", color="#f3ead2", ground="#0d1b2e", gold=ACC_C)
    top = (f'<div style="position:absolute;inset:0;filter:blur(3px)"><svg width="{w}" height="{h}"><defs><linearGradient id="c3s" x1="0" y1="0" x2="0" y2="1">'
           f'<stop offset="0" stop-color="#9fc9d8"/><stop offset=".6" stop-color="#3f7f97"/><stop offset="1" stop-color="#173d4f"/></linearGradient></defs>'
           f'<rect width="{w}" height="{h}" fill="url(#c3s)"/>' + ship("ss", w * .12, h * .78, w * .76, fill="#0f2a36") +
           f'<rect width="{w}" height="{h * .24:.0f}" fill="#f7f1e3"/>'
           f'<text x="26" y="{h * .16:.0f}" font-family="EB Garamond" font-weight="700" font-size="40" fill="#1b1a17">Le sous-marin Amphitrite</text></svg></div>')
    bottom = (f'<div style="position:absolute;inset:0;background:#0e2230;filter:blur(3px)"><svg width="{w}" height="{h}">'
              + dial(w * .36, h * .5, h * .34, 8, 'c') +
              f'<text x="{w * .66:.0f}" y="{h * .5:.0f}" font-family="EB Garamond" font-weight="700" font-size="44" fill="#f3ead2">Les cadrans</text>'
              f'<text x="{w * .66:.0f}" y="{h * .5 + 50:.0f}" font-family="EB Garamond" font-weight="700" font-size="44" fill="#f3ead2">optiques</text></svg></div>')
    strip, (il, iw, ih) = film_strip(k, 960, 214, [top, title, bottom], perf_color="#fff7e6", base="#141210", uid="c")
    beam = ('<div class="f" style="background:conic-gradient(from 200deg at -200px -300px,rgba(255,236,200,0) 0deg,rgba(255,236,200,.16) 14deg,rgba(255,236,200,0) 30deg);mix-blend-mode:screen;filter:blur(20px)"></div>')
    body = (f'<div class="f" style="background:radial-gradient(ellipse 1300px 900px at 960px 420px,#2a2218,#0a0806)">'
            f'<div class="f" style="transform:rotate(-3.5deg);transform-origin:960px 540px">{strip}</div>'
            f'{beam}<div class="f" style="background:linear-gradient(180deg,rgba(0,0,0,0) 72%,rgba(0,0,0,.72) 86%,rgba(0,0,0,.8))"></div>'
            + sub([("MARINE 1939 ", False), ("fait revivre", True)], LIGHT_TEXT, ACC_C, "#0b0b0b", SHADOW_DARK)
            + grain(.06, .85, "overlay", 10) + "</div>")
    page("C3", "C3 · Les actualités de 1939 · 29,50 s", body)


def dial_html(w, h):
    return f'<svg width="{w}" height="{h}">' + dial(w / 2, h / 2 + 10, h * .38, 8, 'c') + "</svg>"


for fn in (frame_a1, frame_a2, frame_a3, frame_b1, frame_b2, frame_b3, frame_c1, frame_c2, frame_c3):
    fn()
print("9 styleframes written to", OUT)
