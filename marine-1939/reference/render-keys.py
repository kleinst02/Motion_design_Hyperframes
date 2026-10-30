"""Rend des images du film depuis reference/carte.html (demo(T)), temps du film ; sans temps : les images clés (KEYS).

    python3 marine-1939/reference/render-keys.py <dossier de sortie> [T…]
    ONLY=F2,F3 python3 …   : seulement les images clés de ces séquences ; GUIDES=0 : sans la bande du sous-titre.
"""
import sys, time, os
from pathlib import Path
from playwright.sync_api import sync_playwright

GSAP_URL = "https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"   # la version épinglée des séquences


def gsap_cache():
    """Le fichier GSAP épinglé, téléchargé une fois (curl, par le proxy) dans ~/.cache/marine-1939/."""
    import subprocess
    f = Path.home() / ".cache" / "marine-1939" / "gsap-3.14.2.min.js"
    if not f.exists() or f.stat().st_size < 50000:
        f.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["curl", "-sSfL", "--retry", "3", "-o", str(f), GSAP_URL], check=True)
    return f


def serve_gsap(page):
    """Sert GSAP depuis le cache au lieu du réseau : la page se charge sans attendre le CDN."""
    f = gsap_cache()
    page.route("**/npm/gsap@3.14.2/dist/gsap.min.js",
               lambda r: r.fulfill(path=str(f), content_type="application/javascript"))
ref = Path(__file__).resolve().parent / "carte.html"
out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
times = [float(t) for t in sys.argv[2:]]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    errors = []
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    serve_gsap(pg)
    pg.goto(ref.as_uri() + ("?guides=1&t=0" if os.environ.get("GUIDES", "1") == "1" else "?t=0"))
    pg.wait_for_load_state("networkidle", timeout=120000)
    pg.evaluate("document.fonts.ready.then(() => true)")
    if not times:
        keys = pg.evaluate("KEYS.map(k => [k[0], k[1], keyT(k)])")
        if os.environ.get("ONLY"): keys = [k for k in keys if k[0] in os.environ["ONLY"].split(",")]
        times = [k[2] for k in keys]
        names = [f"{k[0]}_{k[1]:.2f}".replace(".", "-") for k in keys]
    else:
        names = [f"T{t:05.2f}".replace(".", "-") for t in times]
    for t, n in zip(times, names):
        t0 = time.time()
        pg.evaluate(f"demo({t})")
        pg.evaluate("document.fonts.ready.then(() => true)")
        pg.wait_for_timeout(120)
        pg.screenshot(path=str(out / f"{n}.png"))
        print(f"{n} T={t:.2f} {time.time() - t0:.2f}s")
    b.close()
    for e in errors[:20]:
        print("ERROR", e)
