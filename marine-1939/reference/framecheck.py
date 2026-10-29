"""Contrôle d'une séquence seule : monte le contenu de son <template> dans Chromium (comme le moteur, sans le reste du
film), cherche son timeline aux temps LOCAUX donnés et enregistre une image PNG par temps. N'écrit que dans le dossier
de sortie. Affiche les erreurs JavaScript de la page.

    python3 marine-1939/reference/framecheck.py marine-1939/compositions/frames/<id>.html <dossier de sortie> 0.00 1.70 5.80

Ce n'est pas la CLI HyperFrames : un sous-agent de séquence peut s'en servir pour comparer ses images clés aux rendus de
la référence (reference/render-keys.py).
"""
import re
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

frame, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
times = [float(t) for t in sys.argv[3:]] or [0.0]
project = frame.parents[2]                      # <projet>/compositions/frames/<id>.html
fid = frame.stem
src = frame.read_text(encoding="utf-8")
m = re.match(r"\s*<template[^>]*>(.*)</template>\s*$", src, re.S)
if not m:
    sys.exit(f"{frame.name} : le fichier n'est pas un seul <template>...</template>")
page = ('<!doctype html><html><head><meta charset="utf-8"><base href="' + project.as_uri() + '/">'
        '<style>html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#000}'
        '#hf-host{position:relative;width:1920px;height:1080px;overflow:hidden}</style>'
        '<script>window.__timelines = {};</script></head><body><div id="hf-host">' + m.group(1) + "</div></body></html>")
out.mkdir(parents=True, exist_ok=True)
html = out / f"_{fid}.html"
html.write_text(page, encoding="utf-8")
SEEK = """([id, t]) => {
  const tl = window.__timelines[id];
  if (!tl) return "timeline absent : window.__timelines[" + JSON.stringify(id) + "]";
  tl.totalTime(t + 0.001, true); tl.totalTime(t, false);       // comme le moteur : la seconde passe déclenche onUpdate
  document.querySelectorAll(".clip[data-start]").forEach(c => {  // les clips ne sont visibles que dans leur fenêtre
    const s = parseFloat(c.dataset.start), d = parseFloat(c.dataset.duration);
    c.style.visibility = t >= s && t < s + d ? "inherit" : "hidden";
  });
  return "ok " + tl.duration().toFixed(2) + " s";
}"""
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    errors = []
    pg.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(html.as_uri())
    pg.wait_for_load_state("networkidle", timeout=120000)
    pg.evaluate("document.fonts.ready.then(() => true)")
    for t in times:
        t0 = time.time()
        r = pg.evaluate(SEEK, [fid, t])
        pg.evaluate("document.fonts.ready.then(() => true)")
        pg.wait_for_timeout(80)
        name = out / (fid + "_" + f"{t:05.2f}".replace(".", "-") + ".png")
        pg.screenshot(path=str(name))
        print(f"{name.name}  t={t:.2f}  {r}  ({time.time() - t0:.2f} s)")
    b.close()
for e in errors[:30]:
    print("ERREUR", e)
