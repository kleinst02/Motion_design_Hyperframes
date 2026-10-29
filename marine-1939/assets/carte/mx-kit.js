/* MARINE 1939 · kit du monde de la direction D « Le manuel et la carte ». Source UNIQUE, ne jamais recopier.
   Chaque séquence le charge, après les données des cartes :
     <link rel="stylesheet" href="assets/carte/mx-kit.css">
     <script src="assets/carte/mx-data.js"></script>
     <script src="assets/carte/mx-kit.js"></script>
   reference/carte.html le charge aussi (avec ../assets/) et montre chaque état de référence du storyboard (demo).
   Aucune dépendance et aucun hasard : les séquences animent avec GSAP et appellent le kit ; les tirages viennent de
   MX.rng(graine). Unités : u = pixel de carte (Méditerranée 4200 × 3900 u, Atlantique 3600 × 1900 u) ; page du manuel
   1920 × 2560 u. Règle de l'auteur : une maquette est toujours sur la mer (MX.footprintClear, MX.checkAtSea). */
var MX = (function () {
  "use strict";
  var MX = {};

  // ------------------------------------------------------------------------------------------------ utilitaires
  MX.rng = function (seed) {
    var a = (seed * 2654435761) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  function uni(r, a, b) { return a + (b - a) * r(); }
  function n1(v) { return (Math.round(v * 10) / 10).toString(); }
  function n0(v) { return Math.round(v).toString(); }
  MX.esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var esc = MX.esc;

  // ------------------------------------------------------------------------------------------------ couleurs de rôle
  MX.C = {
    canvas: "#0c0906",       // la table la nuit, le noir du pivot
    sea: "#dde8e4", land: "#efe3c4", coast: "#4e4232", grat: "#56707a",
    label: "#2a2722", seaLabel: "#4b6b7a", sounding: "#4f6873",
    paper: "#efe5cf", ink: "#1b1a17", inkSoft: "#5b5346", folio: "#8a8172",
    accent: "#e6ec37",       // le jaune du titre du blog : la boîte du mot clé, le « 4e », le bouton
    accentInk: "#111111", accentPress: "#cdd32c", accentFlash: "#f5f8a8",
    route: "#b3176a",        // magenta des cartes marines : la route seule
    loss: "#b3241a",         // crayon rouge : les pertes seules
    pencil: "#3a3530",       // crayon : les dates
    light: "#f4eddd", day: "#8a7353",
    blog: "#070707", blogCard: "#141414", blogText: "#ececec", blogMute: "#9a9a9a",
    hull: "#4b535a", deck: "#7d858b", dark: "#2b3136"
  };

  // ------------------------------------------------------------------------------------------------ navires
  // side : profils (longueur 1000, flottaison y = 0, étrave en x = 0) ; top : vues du dessus des maquettes
  // (turrets : x, y, w, h, canons, sens) ; funnels : sommets des cheminées des profils (fumée de la gravure).
  MX.SHIPS = {"side":{"bb":[["p",[[30,0],[985,0],[1000,-24],[600,-26],[590,-40],[60,-44],[0,-52]]],["p",[[150,-43],[150,-60],[166,-67],[255,-67],[255,-43]]],["l",[150,-55,62,-58,4]],["l",[150,-61,66,-64,4]],["p",[[290,-43],[290,-60],[390,-60],[390,-43]]],["p",[[285,-60],[285,-78],[301,-85],[395,-85],[395,-60]]],["l",[285,-71,192,-74,4]],["l",[285,-77,196,-80,4]],["p",[[420,-43],[420,-95],[430,-95],[430,-125],[440,-125],[440,-150],[450,-150],[450,-172],[470,-172],[470,-150],[478,-150],[478,-125],[488,-125],[488,-95],[505,-95],[505,-43]]],["p",[[410,-153],[515,-153],[515,-146],[410,-146]]],["l",[460,-172,460,-218,3]],["p",[[548,-43],[562,-138],[612,-138],[604,-43]]],["p",[[556,-146],[618,-146],[618,-138],[556,-138]]],["p",[[615,-26],[615,-70],[700,-70],[700,-26]]],["l",[680,-70,674,-182,3]],["l",[662,-160,690,-160,2.5]],["p",[[720,-26],[720,-44],[778,-44],[788,-26]]],["l",[778,-38,832,-38,3]],["p",[[800,-26],[800,-36],[862,-36],[862,-26]]],["p",[[800,-36],[800,-52],[858,-52],[868,-36]]],["l",[858,-46,908,-46,3]],["p",[[890,-26],[890,-40],[960,-40],[960,-26]]],["l",[930,-40,930,-82,3]],["l",[930,-80,976,-60,2.5]]],"ca":[["p",[[25,0],[985,0],[1000,-22],[30,-38],[0,-46]]],["p",[[120,-36],[120,-52],[132,-58],[195,-58],[195,-35]]],["l",[120,-47,52,-49,3.5]],["l",[120,-53,56,-55,3.5]],["p",[[215,-35],[215,-47],[290,-47],[290,-34]]],["p",[[210,-47],[210,-63],[222,-69],[290,-69],[290,-47]]],["l",[210,-58,142,-60,3.5]],["l",[210,-64,146,-66,3.5]],["p",[[320,-33],[320,-78],[330,-78],[330,-108],[342,-108],[342,-128],[362,-128],[362,-108],[372,-108],[372,-78],[390,-78],[390,-32]]],["p",[[310,-112],[400,-112],[400,-106],[310,-106]]],["l",[352,-128,352,-172,3]],["p",[[448,-31],[458,-112],[506,-112],[500,-30]]],["p",[[454,-119],[510,-119],[510,-112],[454,-112]]],["p",[[540,-29],[540,-56],[660,-56],[660,-27]]],["l",[590,-56,585,-160,3]],["l",[575,-140,598,-140,2.5]],["p",[[690,-27],[690,-39],[765,-39],[765,-26]]],["p",[[690,-39],[690,-55],[756,-55],[770,-46],[770,-39]]],["l",[770,-50,836,-50,3.5]],["l",[770,-44,832,-44,3.5]],["p",[[785,-25],[785,-41],[845,-41],[858,-33],[858,-24]]],["l",[858,-35,918,-35,3.5]],["l",[858,-30,914,-30,3.5]]],"ct4":[["p",[[18,0],[990,0],[1000,-16],[575,-20],[565,-30],[0,-38]]],["p",[[132,-36],[132,-50],[144,-54],[172,-54],[172,-35]]],["l",[132,-47,76,-48,3]],["p",[[225,-34],[225,-43],[272,-43],[272,-33]]],["p",[[220,-43],[220,-57],[232,-61],[264,-61],[264,-43]]],["l",[220,-54,162,-55,3]],["p",[[290,-33],[290,-52],[300,-52],[300,-84],[378,-84],[378,-52],[448,-52],[448,-31]]],["p",[[296,-90],[382,-90],[382,-84],[296,-84]]],["l",[392,-52,390,-176,2.5]],["l",[376,-150,406,-150,2]],["p",[[458,-31],[462,-98],[494,-98],[492,-31]]],["p",[[508,-30],[512,-98],[544,-98],[542,-30]]],["p",[[600,-20],[600,-28],[650,-28],[650,-19]]],["p",[[700,-19],[700,-32],[815,-32],[815,-18]]],["p",[[716,-32],[720,-90],[752,-90],[750,-32]]],["p",[[768,-32],[772,-90],[804,-90],[802,-32]]],["l",[853,-18,851,-130,2.5]],["p",[[840,-18],[840,-38],[930,-38],[930,-17]]],["p",[[862,-38],[862,-51],[874,-55],[902,-55],[902,-38]]],["l",[902,-48,950,-49,3]],["p",[[940,-17],[940,-30],[968,-30],[982,-22],[982,-16]]],["l",[982,-25,1020,-25,3]]]},"top":{"bb":{"beam":72,"turrets":[[205,0,92,80,4,-1],[340,0,98,86,4,-1],[832,0,52,44,4,1],[742,-44,40,34,4,1],[742,44,40,34,4,1]],"blocks":[[420,-30,90,60],[612,-26,92,52],[885,-30,80,60]],"funnels":[[585,0,34,26]]},"bb2":{"beam":80,"turrets":[[138,0,70,58,2,-1],[238,0,72,60,2,-1],[590,0,70,58,2,1],[790,0,72,60,2,1],[888,0,70,58,2,1]],"blocks":[[292,-32,74,64],[650,-28,92,56]],"funnels":[[420,0,28,22],[505,0,28,22]]},"ca":{"beam":56,"turrets":[[160,0,70,54,2,-1],[262,0,74,58,2,-1],[742,0,74,58,2,1],[842,0,70,54,2,1]],"blocks":[[330,-26,70,52],[540,-22,120,44]],"funnels":[[480,0,30,22]]},"cl":{"beam":50,"turrets":[[192,0,66,54,3,-1],[285,0,70,58,3,-1],[882,0,66,54,3,1]],"blocks":[[338,-24,84,48],[566,-22,254,44]],"funnels":[[492,0,22,17],[620,0,20,16]]},"ct4":{"beam":46,"turrets":[[152,0,40,30,1,-1],[245,0,42,32,1,-1],[882,0,38,28,1,1],[958,0,36,28,1,1]],"blocks":[[290,-24,158,48],[600,-14,50,28],[700,-20,115,40],[840,-22,90,44]],"funnels":[[476,0,18,14],[526,0,18,14],[735,0,18,14],[786,0,18,14]]}},"funnels":{"bb":[[587,-146]],"ca":[[482,-119]],"ct4":[[478,-98],[528,-98],[736,-90],[788,-90]]}};

  MX.sideSVG = function (kind, x0, y0, len, o) {
    o = o || {};
    var s = len / 1000, out = [], fill = o.fill || "#000", stroke = o.stroke || "none";
    MX.SHIPS.side[kind].forEach(function (part, n) {
      var t = part[0], d = part[1];
      if (t === "p") {
        var pts = d.map(function (p) { return n1(x0 + s * p[0]) + "," + n1(y0 + s * p[1]); }).join(" ");
        out.push('<polygon points="' + pts + '"' + (o.hull && n === 0 ? ' fill="' + o.hull + '"' : "") + "/>");
      } else {
        out.push('<line x1="' + n1(x0 + s * d[0]) + '" y1="' + n1(y0 + s * d[1]) + '" x2="' + n1(x0 + s * d[2]) + '" y2="' +
          n1(y0 + s * d[3]) + '" stroke="' + (stroke === "none" ? fill : stroke) + '" stroke-width="' + n1(Math.max(1, d[4] * s * 1.6)) +
          '" stroke-linecap="round"/>');
      }
    });
    return '<g fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (o.sw || 0) + '" stroke-linejoin="round">' + out.join("") + "</g>";
  };
  MX.funnelTops = function (kind, x0, y0, len) {
    var s = len / 1000;
    return (MX.SHIPS.funnels[kind] || []).map(function (p) { return [x0 + s * p[0], y0 + s * p[1]]; });
  };

  // Maquette peinte vue du dessus, centrée sur (0, 0), étrave vers -x : markup SVG seul.
  MX.topSVG = function (kind, len) {
    var p = MX.SHIPS.top[kind], s = len / 1000, b = p.beam, C = MX.C;
    var hull = "M 0 0 C " + n1(70 * s) + " " + n1(-b * .55 * s) + " " + n1(170 * s) + " " + n1(-b * s) + " " + n1(320 * s) + " " + n1(-b * s) +
      " L " + n1(880 * s) + " " + n1(-b * s) + " C " + n1(955 * s) + " " + n1(-b * s) + " " + n1(995 * s) + " " + n1(-b * .6 * s) + " " + n1(1000 * s) +
      " 0 C " + n1(995 * s) + " " + n1(b * .6 * s) + " " + n1(955 * s) + " " + n1(b * s) + " " + n1(880 * s) + " " + n1(b * s) + " L " + n1(320 * s) +
      " " + n1(b * s) + " C " + n1(170 * s) + " " + n1(b * s) + " " + n1(70 * s) + " " + n1(b * .55 * s) + " 0 0 Z";
    var o = ['<path d="' + hull + '" fill="' + C.dark + '" transform="translate(0 ' + n1(20 * s) + ')"/>',
      '<path d="' + hull + '" fill="' + C.hull + '"/>',
      '<path d="' + hull + '" fill="' + C.deck + '" transform="translate(' + n1(15 * s) + ' 0) scale(.97 .78)"/>'];
    p.blocks.forEach(function (q) {
      o.push('<rect x="' + n1(q[0] * s) + '" y="' + n1(q[1] * s) + '" width="' + n1(q[2] * s) + '" height="' + n1(q[3] * s) + '" rx="' + n1(4 * s) +
        '" fill="' + C.hull + '" stroke="' + C.dark + '" stroke-width="' + n1(2 * s) + '"/>');
    });
    p.funnels.forEach(function (f) {
      o.push('<ellipse cx="' + n1(f[0] * s) + '" cy="' + n1(f[1] * s) + '" rx="' + n1(f[2] * s) + '" ry="' + n1(f[3] * s) + '" fill="' + C.dark + '"/>' +
        '<ellipse cx="' + n1(f[0] * s) + '" cy="' + n1(f[1] * s) + '" rx="' + n1(f[2] * .62 * s) + '" ry="' + n1(f[3] * .62 * s) + '" fill="#141618"/>');
    });
    p.turrets.forEach(function (t) {
      for (var i = 0; i < t[4]; i++) {
        var by = (t[1] + (i - (t[4] - 1) / 2) * t[3] * .22) * s;
        o.push('<line x1="' + n1(t[0] * s) + '" y1="' + n1(by) + '" x2="' + n1((t[0] + t[5] * t[2] * 1.05) * s) + '" y2="' + n1(by) + '" stroke="' + C.dark +
          '" stroke-width="' + n1(Math.max(1.2, 7 * s)) + '" stroke-linecap="round"/>');
      }
      o.push('<rect x="' + n1((t[0] - t[2] / 2) * s) + '" y="' + n1((t[1] - t[3] / 2) * s) + '" width="' + n1(t[2] * s) + '" height="' + n1(t[3] * s) +
        '" rx="' + n1(t[3] * .38 * s) + '" fill="' + C.hull + '" stroke="' + C.dark + '" stroke-width="' + n1(2.4 * s) + '"/>');
    });
    var hw = b * s + 20 * s + 2;
    return '<svg width="' + n0(len + 4) + '" height="' + n0(2 * hw) + '" viewBox="-2 ' + n1(-hw) + " " + n0(len + 4) + " " + n1(2 * hw) +
      '" style="overflow:visible">' + o.join("") + "</svg>";
  };
  // Une maquette prête à poser : GSAP place son centre avec x, y, rotation (unités de carte) dans le calque du monde.
  MX.modelHTML = function (kind, len, id) {
    var hw = MX.SHIPS.top[kind].beam * len / 1000 + 20 * len / 1000 + 2;
    return '<div class="mx-model"' + (id ? ' id="' + id + '"' : "") + ' data-kind="' + kind + '" data-len="' + len + '" style="margin-left:' +
      n1(-len / 2 - 2) + "px;margin-top:" + n1(-hw) + 'px">' + MX.topSVG(kind, len) + "</div>";
  };
  MX.place = function (el, x, y, rot, scale) {   // pose statique (la référence) ; les séquences utilisent gsap.set
    el.style.transform = "translate(" + n1(x) + "px," + n1(y) + "px) rotate(" + n1(rot || 0) + "deg)" + (scale ? " scale(" + scale + ")" : "");
  };

  // ------------------------------------------------------------------------------------------------ la terre et la mer
  var RINGS = {};
  function rings(name) {
    if (RINGS[name]) return RINGS[name];
    var out = [], cur = [];
    MX_DATA[name].land.replace(/Z/g, " Z ").replace(/M/g, " M ").replace(/L/g, " L ").split(/\s+/).forEach(function (tok) {
      if (!tok || tok === "M" || tok === "L") return;
      if (tok === "Z") { if (cur.length) out.push(cur); cur = []; return; }
      var xy = tok.split(","); cur.push([+xy[0], +xy[1]]);
    });
    if (cur.length) out.push(cur);
    RINGS[name] = out.map(function (r) {
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      r.forEach(function (p) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
      return { r: r, b: [x0, y0, x1, y1] };
    });
    return RINGS[name];
  }
  MX.onLand = function (name, x, y) {
    var inside = false;
    rings(name).forEach(function (R) {
      if (x < R.b[0] || x > R.b[2] || y < R.b[1] || y > R.b[3]) return;
      var r = R.r, n = r.length, j = n - 1;
      for (var i = 0; i < n; i++) {
        var xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi) inside = !inside;
        j = i;
      }
    });
    return inside;
  };
  // Premier point de l'empreinte d'une maquette (coque + marge, 9 stations × 3 lignes) qui tombe à terre, ou null.
  MX.footprintClear = function (name, kind, x, y, len, angle, margin) {
    margin = margin === undefined ? 18 : margin;
    var a = angle * Math.PI / 180, beam = MX.SHIPS.top[kind].beam * len / 1000 + margin, half = len / 2 + margin;
    for (var i = 0; i < 9; i++) {
      var t = i / 8 - .5;
      for (var side = -1; side <= 1; side++) {
        var px = x + 2 * half * t * Math.cos(a) - side * beam * Math.sin(a), py = y + 2 * half * t * Math.sin(a) + side * beam * Math.cos(a);
        if (MX.onLand(name, px, py)) return [Math.round(px), Math.round(py)];
      }
    }
    return null;
  };
  MX.checkAtSea = function (name, models, margin) {     // models : [kind, x, y, len, angle] ; renvoie les fautifs
    return models.filter(function (m) { return MX.footprintClear(name, m[0], m[1], m[2], m[3], m[4], margin) !== null; });
  };

  // ------------------------------------------------------------------------------------------------ la carte marine
  var TEX = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360'><filter id='t'><feTurbulence type='fractalNoise' baseFrequency='.012 .02' numOctaves='3' seed='12'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23t)'/></svg>\")";
  MX.PAPER_TEX = TEX;
  // Le texte de la carte et des pages du manuel est un décor : data-layout-ignore (la vérification de mise en page de
  // HyperFrames ne l'audite pas) ; les calques de lumière couvrent le monde exprès : data-layout-allow-occlusion.
  // Le décor de chaque carte est FIXE (mêmes étiquettes, mêmes sondes dans toutes les séquences) ; aucune étiquette ne
  // s'arrête dans la bande du sous-titre à un cadrage du film (vérifié sur toute la partition) : labels
  // [texte, x, y, taille, "caps"|"it"|"land", interlettrage, ancre, couleur], soundings [x0, y0, x1, y1, base, n, graine],
  // rose [x, y, r].
  var P = function (name, key) { return MX_DATA[name].places[key]; };
  MX.DECOR = {
    med: {
      labels: [
        ["FRANCE", 1900, 420, 72, "land", 40, "middle", "#7a6f5d"], ["ESPAGNE", 520, 1900, 72, "land", 40, "middle", "#7a6f5d"],
        ["ALGÉRIE", 2400, 3760, 72, "land", 40, "middle", "#7a6f5d"],
        ["TOULON", P("med", "toulon")[0] + 26, P("med", "toulon")[1] - 48, 48, "caps", 9, "start", "#2a2722"],
        ["MARSEILLE", P("med", "marseille")[0] - 10, P("med", "marseille")[1] - 46, 38, "caps", 7, "middle", "#2a2722"],
        ["MERS EL-KÉBIR", P("med", "merselkebir")[0] - 40, P("med", "merselkebir")[1] + 120, 44, "caps", 8, "middle", "#2a2722"],
        ["ORAN", P("med", "oran")[0] + 210, P("med", "oran")[1] + 66, 40, "caps", 9, "start", "#2a2722"],
        ["ALGER", P("med", "alger")[0], P("med", "alger")[1] + 74, 40, "caps", 9, "middle", "#2a2722"],
        ["Golfe du Lion", P("med", "golfe")[0], P("med", "golfe")[1] + 60, 74, "it", 14, "middle", "#4b6b7a"],
        ["Mer Méditerranée", 2700, 2560, 96, "it", 30, "middle", "#4b6b7a"],
        ["Baléares", 1980, 2460, 44, "it", 10, "middle", "#4b6b7a"],
        ["CORSE", 3610, 1215, 40, "caps", 10, "middle", "#2a2722"], ["SARDAIGNE", 3640, 1850, 40, "caps", 10, "middle", "#2a2722"]],
      soundings: [200, 900, 4100, 3500, 40, 300, 3]
    },
    atlantic: {
      labels: [
        ["NEW YORK", P("atlantic", "newyork")[0] + 40, P("atlantic", "newyork")[1] + 64, 40, "caps", 7, "start", "#2a2722"],
        ["GIBRALTAR", P("atlantic", "gibraltar")[0] - 20, P("atlantic", "gibraltar")[1] - 30, 30, "caps", 6, "end", "#2a2722"],   // au nord du détroit : hors de la bande du sous-titre
        ["OCÉAN ATLANTIQUE", P("atlantic", "oceanlabel")[0], P("atlantic", "oceanlabel")[1], 96, "it", 30, "middle", "#4b6b7a"]],
      rose: [P("atlantic", "rose")[0], P("atlantic", "rose")[1], 130]
    }
  };
  MX.chartSVG = function (name, uid) {
    var o = MX.DECOR[name], d = MX_DATA[name], W = d.w, H = d.h, C = MX.C, u = uid || name, k;
    var bands = [[190, "#c9dcdc"], [186, C.sea], [110, "#9ebfca"], [106, "#c2d9dc"], [52, "#8fb2c0"], [48, "#b1cfd6"]];
    var s = ['<svg class="mx-chart" data-layout-ignore width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '"><defs><path id="' + u + '-land" d="' + d.land + '"/></defs>',
      '<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>'];
    bands.forEach(function (b) { s.push('<use href="#' + u + '-land" fill="none" stroke="' + b[1] + '" stroke-width="' + b[0] + '" stroke-linejoin="round"/>'); });
    s.push('<use href="#' + u + '-land" fill="' + C.land + '" stroke="' + C.coast + '" stroke-width="2.6" stroke-linejoin="round"/>');
    s.push('<path d="' + d.graticule + '" fill="none" stroke="' + C.grat + '" stroke-width="1.3" opacity=".45"/>');
    if (o.soundings) {
      var q = o.soundings, r = MX.rng(q[6] || 3);
      for (k = 0; k < (q[5] || 30); k++) {
        var sx = uni(r, q[0], q[2]), sy = uni(r, q[1], q[3]);
        if (MX.onLand(name, sx, sy) || MX.onLand(name, sx + 40, sy)) continue;     // une sonde ne s'écrit que sur la mer
        var depth = Math.round(q[4] + (sy - q[1]) / (q[3] - q[1]) * 1800 + uni(r, -180, 180));
        s.push('<text x="' + n0(sx) + '" y="' + n0(sy) + '" font-family="EB Garamond" font-style="italic" font-size="24" fill="' + C.sounding +
          '" opacity=".55">' + Math.max(12, depth) + "</text>");
      }
    }
    if (o.rose) {
      var rx = o.rose[0], ry = o.rose[1], rr = o.rose[2], pts = [];
      for (k = 0; k < 32; k++) {
        var a = k * 11.25 * Math.PI / 180, l = k % 8 === 0 ? rr : k % 4 === 0 ? rr * .62 : k % 2 === 0 ? rr * .4 : rr * .25;
        pts.push('<line x1="' + rx + '" y1="' + ry + '" x2="' + n1(rx + l * Math.sin(a)) + '" y2="' + n1(ry - l * Math.cos(a)) + '" stroke="' + C.route +
          '" stroke-width="' + (k % 8 === 0 ? 3 : 1.6) + '"/>');
      }
      s.push('<g opacity=".85"><circle cx="' + rx + '" cy="' + ry + '" r="' + n1(rr * 1.08) + '" fill="none" stroke="' + C.route + '" stroke-width="2.4"/>' +
        '<circle cx="' + rx + '" cy="' + ry + '" r="' + n1(rr * .98) + '" fill="none" stroke="' + C.route + '" stroke-width="1"/>' + pts.join("") +
        '<text x="' + rx + '" y="' + n1(ry - rr * 1.16) + '" text-anchor="middle" font-family="EB Garamond" font-weight="700" font-size="' + n0(rr * .22) +
        '" fill="' + C.route + '">N</text></g>');
    }
    (o.labels || []).forEach(function (L) {
      s.push('<text x="' + L[1] + '" y="' + L[2] + '" text-anchor="' + L[6] + '" font-family="EB Garamond" font-weight="' + (L[4] === "caps" ? 700 : 400) + '"' +
        (L[4] === "it" ? ' font-style="italic"' : "") + (L[4] === "land" ? ' opacity=".7"' : "") + ' font-size="' + L[3] + '" letter-spacing="' + L[5] + '" fill="' + L[7] + '">' +
        esc(L[0]) + "</text>");
    });
    s.push('<rect x="' + n0(W * .38) + '" width="26" height="' + H + '" fill="#ffffff" opacity=".08"/><rect x="' + n0(W * .38 + 26) + '" width="18" height="' + H +
      '" fill="#6b5a3e" opacity=".08"/></svg>');
    // texture du papier : une tuile, jamais un filtre sur toute la carte (rendu image par image)
    return s.join("") + '<div class="mx-chart-tex" style="width:' + W + "px;height:" + H + "px;background-image:" + TEX + '"></div>';
  };
  MX.place2D = function (name, key) { return MX_DATA[name].places[key]; };
  // La route au crayon magenta, posée sur la carte (coordonnées de carte) : #<u>-todo, toute la route en pointillés ;
  // #<u>-done, la partie faite, tracée en continu (strokeDasharray = longueur, strokeDashoffset = longueur × (1 - avancée)).
  MX.routeLength = function (pts) {
    var L = 0;
    for (var i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return L;
  };
  MX.routeSVG = function (u, pts, progress) {
    var poly = pts.map(function (v) { return v[0] + "," + v[1]; }).join(" "), L = MX.routeLength(pts);
    return '<svg class="mx-route" width="1" height="1" style="overflow:visible"><polyline id="' + u + '-todo" points="' + poly + '" fill="none" stroke="' + MX.C.route +
      '" stroke-width="6" stroke-dasharray="22 16" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><polyline id="' + u + '-done" points="' + poly +
      '" fill="none" stroke="' + MX.C.route + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + n1(L) + " " + n1(L) +
      '" stroke-dashoffset="' + n1(L * (1 - (progress || 0))) + '" data-len="' + n1(L) + '"/></svg>';
  };
  // Un point le long de la route à une distance donnée : [x, y, cap en degrés de place() (étrave vers l'avant)].
  MX.routeAt = function (pts, dist) {
    for (var i = 1; i < pts.length; i++) {
      var dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1], l = Math.hypot(dx, dy);
      if (dist <= l || i === pts.length - 1) {
        var t = Math.min(1, dist / l);
        return [pts[i - 1][0] + dx * t, pts[i - 1][1] + dy * t, Math.atan2(dy, dx) * 180 / Math.PI + 180];
      }
      dist -= l;
    }
  };
  // Un point de la carte de Méditerranée sur la carte de l'Atlantique (même projection de Mercator, échelle 0,135648).
  MX.medToAtl = function (x, y) { var M = MX.MED_ON_ATL; return [M.k * x + M.x, M.k * y + M.y]; };

  // ------------------------------------------------------------------------------------------------ caméra
  // cam(x, y, s, tilt, rz) : le point (x, y) de la carte est à l'ancre écran (960, 470), à l'échelle s, carte inclinée de
  // tilt degrés (rotateX) et tournée de rz degrés dans son plan ; perspective 1600 px vue depuis (960, 400).
  MX.STAGE = { ax: 960, ay: 470, persp: 1600, ox: 960, oy: 400 };
  MX.camTransform = function (c) {
    var S = MX.STAGE;
    return "translate3d(" + S.ax + "px," + S.ay + "px,0) rotateX(" + n1(c.tilt || 0) + "deg) rotateZ(" + n1(c.rz || 0) + "deg) scale(" +
      (Math.round(c.s * 10000) / 10000) + ") translate(" + n1(-c.x) + "px," + n1(-c.y) + "px)";
  };
  MX.applyCam = function (worldEl, c) { worldEl.style.transform = MX.camTransform(c); };
  // Projection d'un point de la carte (u) vers l'écran (px) ; k = px écran par u à cet endroit.
  MX.project = function (c, x, y) {
    var S = MX.STAGE, X = (x - c.x) * c.s, Y = (y - c.y) * c.s, r = (c.rz || 0) * Math.PI / 180, t = (c.tilt || 0) * Math.PI / 180;
    var xr = X * Math.cos(r) - Y * Math.sin(r), yr = X * Math.sin(r) + Y * Math.cos(r);
    var Xs = S.ax + xr, Ys = S.ay + yr * Math.cos(t), Z = yr * Math.sin(t), f = S.persp / (S.persp - Z);
    return { x: S.ox + (Xs - S.ox) * f, y: S.oy + (Ys - S.oy) * f, k: c.s * f };
  };
  MX.lerpCam = function (a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, s: a.s * Math.pow(b.s / a.s, t), tilt: a.tilt + (b.tilt - a.tilt) * t, rz: (a.rz || 0) + ((b.rz || 0) - (a.rz || 0)) * t };
  };

  // ------------------------------------------------------------------------------------------------ ronds dans l'eau
  // Ellipses posées dans le plan de la carte, centrées sur (0, 0) ; les séquences les font grandir et s'effacer une à une.
  MX.ripplesSVG = function (n, r0, step, color, op, cls) {
    var o = [];
    for (var i = 0; i < n; i++) {
      var r = r0 + i * step;
      o.push('<ellipse class="' + (cls || "mx-ring") + '" cx="0" cy="0" rx="' + n0(r) + '" ry="' + n0(r * .72) + '" fill="none" stroke="' + (color || "#3d6878") +
        '" stroke-width="' + n1(3.2 - i * .4) + '" opacity="' + (Math.round((op || .55) * (1 - i / (n + .5)) * 100) / 100) + '"/>');
    }
    return '<svg class="mx-rip" width="1" height="1" style="overflow:visible">' + o.join("") + "</svg>";
  };

  // ------------------------------------------------------------------------------------------------ le manuel
  MX.PAGE_W = 1920; MX.PAGE_H = 2560;
  function paperDefs(u) {
    return '<filter id="' + u + '-ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="4" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/></filter>' +
      '<pattern id="' + u + '-hatch" width="6" height="3.6" patternUnits="userSpaceOnUse"><line x1="0" y1="1.4" x2="6" y2="1.4" stroke="#1d1b17" stroke-width="1.25"/></pattern>' +
      '<pattern id="' + u + '-hatchd" width="6" height="2.6" patternUnits="userSpaceOnUse"><line x1="0" y1="1" x2="6" y2="1" stroke="#1d1b17" stroke-width="1.5"/></pattern>';
  }
  function pageGround() { return '<rect width="1920" height="2560" fill="' + MX.C.paper + '"/>'; }
  function folio(n, side) {
    return '<text x="' + (side === "right" ? 1706 : 214) + '" y="2440" text-anchor="' + (side === "right" ? "end" : "start") +
      '" font-family="EB Garamond" font-size="44" fill="' + MX.C.folio + '">' + n + "</text>";
  }
  function justified(paras, x, y, width, size, lead, chars, color) {
    var out = [];
    paras.forEach(function (para) {
      var words = para.split(/\s+/), lines = [], cur = "";
      words.forEach(function (w) {
        if (cur && cur.length + 1 + w.length > chars) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
      });
      lines.push(cur);
      lines.forEach(function (ln, i) {
        out.push('<text x="' + x + '" y="' + n0(y) + '" font-family="EB Garamond" font-size="' + size + '" fill="' + color + '"' +
          (i < lines.length - 1 ? ' textLength="' + width + '" lengthAdjust="spacing"' : "") + ">" + esc(ln) + "</text>");
        y += lead;
      });
      y += lead * .55;
    });
    return out.join("");
  }
  function engravedSea(x0, x1, y0, y1, seed) {
    var r = MX.rng(seed), out = [], y = y0 + 4, gap = 4;
    while (y < y1) {
      var x = x0;
      while (x < x1) {
        var seg = uni(r, 60, 260), pts = [], xx = x;
        while (xx < Math.min(x + seg, x1)) { pts.push(n0(xx) + "," + n1(y + 1.1 * Math.sin(xx / 23 + y) + uni(r, -.4, .4))); xx += 18; }
        if (pts.length > 1) out.push('<polyline points="' + pts.join(" ") + '" fill="none" stroke="#1d1b17" stroke-width="' + n1(1 + (y - y0) / (y1 - y0) * .7) +
          '" opacity="' + (Math.round((.55 + (y - y0) / (y1 - y0) * .35) * 100) / 100) + '"/>');
        x += seg + uni(r, 6, 26);
      }
      y += gap; gap *= 1.045;
    }
    return out.join("");
  }
  function smoke(x, y, length, rise, seed) {
    var r = MX.rng(seed), out = [];
    for (var k = 0; k < 9; k++) {
      var spread = (k - 4) / 4, pts = [];
      for (var i = 0; i < 13; i++) {
        var t = i / 12;
        pts.push(n0(x + t * length) + "," + n0(y - rise * t - spread * (4 + 46 * t) + 5 * Math.sin(t * 7 + k) * t));
      }
      out.push('<polyline points="' + pts.join(" ") + '" fill="none" stroke="#1d1b17" stroke-width="' + (Math.round((1.3 - Math.abs(spread) * .4) * 100) / 100) +
        '" opacity="' + (Math.round((.8 - Math.abs(spread) * .35 - uni(r, 0, .1)) * 100) / 100) + '" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>');
    }
    return out.join("");
  }
  function bowWave(x, y, len) {
    var s = len / 1000, o = '<polygon points="' + n0(x - 30 * s) + "," + (y + 2) + " " + n0(x + 120 * s) + "," + n0(y + 18 * s + 6) + " " + n0(x + 330 * s) + "," + n0(y + 8) +
      " " + n0(x + 40 * s) + "," + (y - 2) + '" fill="' + MX.C.paper + '"/>' + '<polygon points="' + n0(x + 940 * s) + "," + (y + 1) + " " + n0(x + 1400 * s) + "," + n0(y + 14) +
      " " + n0(x + 1400 * s) + "," + n0(y + 4) + '" fill="' + MX.C.paper + '"/>';
    for (var i = 0; i < 4; i++) o += '<path d="M ' + n0(x + (40 + i * 60) * s) + " " + n0(y + 6 + i * 3) + " q " + n0(40 * s) + " -6 " + n0(90 * s) + ' 0" fill="none" stroke="#1d1b17" stroke-width="1" opacity=".55" pathLength="1" stroke-dasharray="1 1"/>';
    return o;
  }
  MX.ENGRAVING_TEXT = [
    "En septembre 1939, la Marine nationale est la quatrième flotte du monde, derrière la Royal Navy, l’US Navy et la " +
    "Marine impériale japonaise. Ses contre-torpilleurs comptent parmi les navires les plus rapides de leur temps.",
    "L’armistice de juin 1940 la laisse presque intacte. Son sort devient alors l’un des enjeux de la guerre en Méditerranée."];
  MX.VERSO_TEXT = [
    "Au sortir de la Grande Guerre, la Marine nationale entreprend de se reconstruire. Les programmes navals votés à partir " +
    "de 1922 lui donnent, en moins de vingt ans, une flotte presque entièrement neuve : croiseurs lourds et légers, " +
    "contre-torpilleurs, torpilleurs et sous-marins.",
    "En 1939, deux cuirassés rapides, le Dunkerque et le Strasbourg, ont rejoint l’escadre ; le Richelieu et le Jean Bart " +
    "sont en achèvement. Les vieux cuirassés de la Grande Guerre, modernisés, restent en ligne.",
    "Les équipages sont des engagés et des inscrits maritimes, venus pour beaucoup de Bretagne et de Provence. Les bases " +
    "de Brest, Toulon et Bizerte tiennent les deux mers."];
  MX.THREE_LINES = ["Septembre 1939 : la France entre en guerre.", "Juillet 1940 : drame de Mers el-Kébir.",
    "Novembre 1942 : la flotte se saborde à Toulon."];
  // Page 215 : la date tapée (une lettre par tspan .mx-tc), la flotte gravée en ligne de file, le texte du manuel ;
  // le tampon « 4e » est un groupe #<u>-stamp, caché tant que la séquence ne le pose pas (opacity 0). La fumée de chaque
  // navire (#<u>-smoke0 à 2) et ses vagues d'étrave (#<u>-wake0 à 2) se dessinent : strokeDashoffset de 1 (rien) à 0 (tracé)
  // sur leurs traits (pathLength 1).
  MX.pageEngravingSVG = function (u, stampVisible) {
    var seaTop = 650, line = [["bb", 228, 640], ["ca", 920, 470], ["ct4", 1452, 300]], fleet = "", smokes = "", waves = "", i;
    line.forEach(function (L, n) {
      fleet += MX.sideSVG(L[0], L[1], seaTop, L[2], { fill: "url(#" + u + "-hatch)", stroke: MX.C.ink, sw: 1.5, hull: "url(#" + u + "-hatchd)" });
      smokes += '<g class="mx-smoke" id="' + u + "-smoke" + n + '">';
      MX.funnelTops(L[0], L[1], seaTop, L[2]).forEach(function (f) { smokes += smoke(f[0], f[1], L[2] * .55, L[2] * .07, 10 + n); });
      smokes += "</g>";
      waves += '<g class="mx-wake" id="' + u + "-wake" + n + '">' + bowWave(L[1], seaTop, L[2]) + "</g>";
    });
    var sky = "";
    for (var y = 322; y < seaTop - 4; y += 8) {
      [[214 + (y * 37) % 90, 520 + (y * 53) % 300], [900 + (y * 29) % 140, 760 - (y * 17) % 200]].forEach(function (p) {
        sky += '<line x1="' + p[0] + '" y1="' + y + '" x2="' + (p[0] + p[1]) + '" y2="' + y + '" stroke="#1d1b17" stroke-width=".9" opacity="' +
          (Math.round((.12 + (y - 320) / 330 * .3) * 100) / 100) + '"/>';
      });
    }
    var typed = "", date = "SEPTEMBRE 1939", r = MX.rng(21);
    for (i = 0; i < date.length; i++) typed += '<tspan class="mx-tc" dy="' + n1(uni(r, -1.2, 1.2)) + '" opacity="' + (Math.round(uni(r, .82, 1) * 100) / 100) + '">' + esc(date[i]) + "</tspan>";
    return "<defs>" + paperDefs(u) + '<clipPath id="' + u + '-fig"><rect x="214" y="314" width="1492" height="512"/></clipPath></defs>' + pageGround() +
      '<text x="960" y="232" text-anchor="middle" font-family="Space Mono" font-weight="700" font-size="56" letter-spacing="17" fill="#1f1c18">' + typed + "</text>" +
      '<g filter="url(#' + u + '-ink)"><rect x="206" y="306" width="1508" height="528" fill="none" stroke="' + MX.C.ink + '" stroke-width="2.4"/>' +
      '<rect x="214" y="314" width="1492" height="512" fill="none" stroke="' + MX.C.ink + '" stroke-width=".9"/>' +
      '<g clip-path="url(#' + u + '-fig)">' + sky + engravedSea(214, 1706, seaTop, 826, 11) + smokes + waves + fleet + "</g>" +
      justified(MX.ENGRAVING_TEXT, 214, 1240, 1492, 50, 74, 64, "#2a2620") + "</g>" + folio(215, "right") +
      '<g id="' + u + '-stamp" opacity="' + (stampVisible ? 1 : 0) + '" transform="rotate(-6 1540 640)">' +
      '<text x="1540" y="860" text-anchor="middle" font-family="Archivo Black" font-size="560" fill="#1b1a17" transform="translate(20 20)">4<tspan font-size="230" dy="-300">e</tspan></text>' +
      '<text x="1540" y="860" text-anchor="middle" font-family="Archivo Black" font-size="560" fill="' + MX.C.accent + '">4<tspan font-size="230" dy="-300">e</tspan></text></g>';
  };
  MX.pageVersoSVG = function (u) {
    return "<defs>" + paperDefs(u) + "</defs>" + pageGround() + '<g filter="url(#' + u + '-ink)">' + justified(MX.VERSO_TEXT, 214, 330, 1492, 50, 74, 64, "#2a2620") + "</g>" + folio(214, "left");
  };
  // Page 217 : le titre du chapitre, les trois lignes (chacune avec son surligneur .mx-hl, caché : la séquence le trace
  // par scaleX depuis la gauche), puis rien.
  MX.pageLinesSVG = function (u) {
    var rows = "";
    MX.THREE_LINES.forEach(function (t, i) {
      var y = 560 + i * 96, w = [1200, 1000, 1260][i];
      rows += '<rect class="mx-hl" id="' + u + "-hl" + i + '" x="200" y="' + (y - 50) + '" width="' + w + '" height="66" rx="6" fill="' + MX.C.accent + '" opacity="0"/>' +
        '<text x="214" y="' + y + '" font-family="EB Garamond" font-size="60" fill="#1f1c18">' + esc(t) + "</text>";
    });
    return "<defs>" + paperDefs(u) + "</defs>" + pageGround() +
      '<text x="214" y="380" font-family="EB Garamond" font-weight="700" font-size="46" letter-spacing="6" fill="' + MX.C.inkSoft + '">LA FLOTTE FRANÇAISE, 1939-1945</text>' +
      '<line x1="214" y1="414" x2="1706" y2="414" stroke="' + MX.C.inkSoft + '" stroke-width="2"/><g filter="url(#' + u + '-ink)">' + rows + "</g>" + folio(217, "right");
  };
  MX.pageBlankSVG = function (n) { return pageGround() + folio(n, "left"); };
  // Le livre ouvert posé à plat sur la carte : coin haut gauche (x, y) en u, largeur w, rotation rot (degrés, autour de son
  // centre). Hauteur = w × 2/3 (pages de 3 × 4). Ids : <u>-book, <u>-pl (page gauche), <u>-pr (page droite).
  MX.bookHTML = function (u, b, leftSVG, rightSVG) {
    var w = b.w, ph = w / 2 * MX.PAGE_H / MX.PAGE_W, page = function (svg, side, id) {
      return '<svg id="' + id + '" class="mx-page" data-layout-ignore viewBox="0 0 1920 2560" width="' + n0(w / 2) + '" height="' + n0(ph) + '" style="' + side + ':0">' + svg + "</svg>";
    }, edges = "";
    ["#ded2b6", "#d2c5a6", "#c6b896"].forEach(function (c, i) {
      edges += '<div class="mx-edge" style="left:' + (6 + i * 3) + "px;right:" + (6 + i * 3) + "px;top:" + n0(ph + i * 4) + "px;background:" + c + '"></div>';
    });
    return '<div id="' + u + '-book" class="mx-book" style="left:' + b.x + "px;top:" + b.y + "px;width:" + w + "px;height:" + n0(ph) + "px;transform:rotate(" + (b.rot || 0) + 'deg)">' +
      '<div class="mx-cover"></div>' + edges + page(leftSVG, "left", u + "-pl") + page(rightSVG, "right", u + "-pr") +
      '<div class="mx-paper-tex" style="width:' + w + "px;height:" + n0(ph) + "px;background-image:" + TEX + '"></div>' +
      '<div class="mx-gutter" style="left:' + n0(w / 2 - 110) + "px;height:" + n0(ph) + 'px"></div></div>';
  };
  // Un point d'une page (unités de page) en coordonnées de carte ; side "l" ou "r".
  MX.bookPoint = function (b, side, px, py) {
    var w = b.w, ph = w / 2 * MX.PAGE_H / MX.PAGE_W, lx = b.x + (side === "r" ? w / 2 : 0) + px * (w / 2) / MX.PAGE_W, ly = b.y + py * ph / MX.PAGE_H;
    var cx = b.x + w / 2, cy = b.y + ph / 2, a = (b.rot || 0) * Math.PI / 180, dx = lx - cx, dy = ly - cy;
    return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
  };
  // Le « 4e » qui arrive de la caméra (calque 2D au-dessus de la scène) : même dessin que le tampon de la page.
  MX.stamp4eHTML = function (id, px) {
    return '<div class="mx-4e"' + (id ? ' id="' + id + '"' : "") + ' style="font-size:' + px + 'px">4<span>e</span></div>';
  };

  // ------------------------------------------------------------------------------------------------ objets
  MX.phoneHTML = function (id, w, src) {
    var h = w * 2.08, p = w * .035;
    return '<div class="mx-phone"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + w + "px;height:" + n0(h) + "px;margin-left:" + n0(-w / 2) + "px;margin-top:" + n0(-h / 2) +
      "px;border-radius:" + n0(w * .13) + 'px"><div class="mx-phone-screen" style="left:' + n0(p) + "px;top:" + n0(p) + "px;right:" + n0(p) + "px;bottom:" + n0(p) +
      "px;border-radius:" + n0(w * .1) + 'px"><div class="mx-phone-bar" style="height:' + n0(w * .1) + "px;font-size:" + n0(w * .04) + "px;line-height:" + n0(w * .1) +
      'px">marine1939.blogspot.com</div><img src="' + src + '" alt=""></div><div class="mx-phone-glare"></div></div>';
  };
  MX.photoCardHTML = function (id, src, w, h, caption) {
    return '<div class="mx-photo"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + w + "px;margin-left:" + n0(-w / 2) + 'px"><div class="mx-photo-img" style="height:' + h +
      "px;background-image:url(" + src + ')"></div><div class="mx-photo-cap">' + esc(caption) + "</div></div>";
  };
  MX.blogCardHTML = function (id, title, date, src, w, th) {     // src null : carte sans image (en attendant la capture)
    w = w || 560; th = th || 300;
    return '<div class="mx-blogcard"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + w + 'px">' + (src ? '<div class="mx-blogcard-img" style="height:' + th +
      "px;background-image:url(" + src + ')"></div>' : "") + '<div class="mx-blogcard-body"><div class="mx-blogcard-date">' + esc(date) + '</div><div class="mx-blogcard-title">' + esc(title) +
      '</div><div class="mx-blogcard-bar"></div></div></div>';
  };
  MX.pinHTML = function (id, d) {
    return '<div class="mx-pin"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + (d || 30) + "px;height:" + (d || 30) + 'px"></div>';
  };
  // Cadran optique de passerelle, dessiné d'après la photo du Mogador de l'article « Les cadrans optiques » : un disque noir à
  // douze repères blancs et une aiguille blanche, dans sa couronne d'acier. Trois pièces que « pièce par pièce » assemble :
  // #<u>-bezel (la couronne et ses vis), #<u>-face (le disque et ses repères), #<u>-hands (l'aiguille et son moyeu).
  MX.dialSVG = function (u, r) {
    var marks = [], i;
    for (i = 0; i < 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), px = -sn, py = c;
      var r1 = r * .56, r2 = r * .84, w1 = r * .035, w2 = r * .075;
      marks.push('<polygon points="' + [[r1 * c + w1 * px, r1 * sn + w1 * py], [r2 * c + w2 * px, r2 * sn + w2 * py], [r2 * c - w2 * px, r2 * sn - w2 * py], [r1 * c - w1 * px, r1 * sn - w1 * py]]
        .map(function (q) { return n1(q[0]) + "," + n1(q[1]); }).join(" ") + '" fill="#f1efe8"/>');
    }
    var bolts = "";
    [45, 135, 225, 315].forEach(function (d) {
      var a = d * Math.PI / 180;
      bolts += '<circle cx="' + n1(r * .95 * Math.cos(a)) + '" cy="' + n1(r * .95 * Math.sin(a)) + '" r="' + n1(r * .028) + '" fill="#8a9096" stroke="#1a1d20" stroke-width="1.2"/>';
    });
    return '<svg class="mx-dial" width="' + n0(2 * r) + '" height="' + n0(2 * r) + '" viewBox="' + n0(-r) + " " + n0(-r) + " " + n0(2 * r) + " " + n0(2 * r) + '" style="overflow:visible">' +
      '<defs><radialGradient id="' + u + '-steel" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#6a7076"/><stop offset=".55" stop-color="#3a3f44"/><stop offset="1" stop-color="#16191c"/></radialGradient>' +
      '<radialGradient id="' + u + '-black" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#2a2a2a"/><stop offset="1" stop-color="#0b0b0b"/></radialGradient></defs>' +
      '<g id="' + u + '-bezel"><circle cx="0" cy="' + n1(r * .05) + '" r="' + n1(r * 1.02) + '" fill="#000" opacity=".35"/><circle r="' + r + '" fill="url(#' + u + '-steel)"/>' +
      '<circle r="' + n1(r * .9) + '" fill="#0d0e0f"/>' + bolts + "</g>" +
      '<g id="' + u + '-face"><circle r="' + n1(r * .88) + '" fill="url(#' + u + '-black)"/>' + marks.join("") + "</g>" +
      '<g id="' + u + '-hands"><polygon points="' + [[-r * .07, r * .1], [r * .07, r * .1], [r * .045, -r * .74], [-r * .045, -r * .74]].map(function (q) { return n1(q[0]) + "," + n1(q[1]); }).join(" ") +
      '" fill="#f1efe8"/><circle r="' + n1(r * .1) + '" fill="#f1efe8"/><circle r="' + n1(r * .035) + '" fill="#0d0e0f"/></g></svg>';
  };
  // Une entrée de la liste du blog, comme sur sa page d'accueil : la vignette à gauche, la date et le titre à droite.
  MX.blogRowHTML = function (id, title, date, src, w, h) {
    w = w || 640; h = h || 170;
    return '<div class="mx-blogcard mx-blogrow"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + w + "px;height:" + h + 'px"><div class="mx-blogrow-img" style="width:' + h +
      "px;background-image:url(" + src + ')"></div><div class="mx-blogcard-body"><div class="mx-blogcard-date">' + esc(date) + '</div><div class="mx-blogcard-title">' + esc(title) +
      '</div><div class="mx-blogcard-bar"></div></div></div>';
  };
  // Un tirage du manuel : une photo sans légende, virée au sépia, cadrée par pos (ex. le pont du Dunkerque, sans le filigrane
  // du blog : « 50% 100% » avec size « 100% auto ») ; avant le pivot, c'est l'image anonyme ; après, la vraie photo revient.
  MX.printHTML = function (id, src, w, h, pos, size) {
    return '<div class="mx-print"' + (id ? ' id="' + id + '"' : "") + ' style="width:' + w + "px;height:" + h + "px;margin-left:" + n0(-w / 2) + "px;margin-top:" + n0(-h / 2) +
      'px"><div class="mx-print-img" style="background-image:url(' + src + ");background-position:" + (pos || "50% 50%") + ";background-size:" + (size || "cover") + '"></div></div>';
  };
  // Photo d'équipage DESSINÉE (secours, si aucune photo n'est disponible).
  MX.crewDrawnSVG = function (u, w, h) {
    var light = "#efe4cc", mid = "#b8a27c", dark = "#3b2e22", r = MX.rng(7), b = w * .045, iw = w - 2 * b, ih = h - 2 * b, figs = [];
    [[.36, 11, .050], [.55, 10, .056], [.76, 9, .064]].forEach(function (row) {
      var size = iw * row[2];
      for (var i = 0; i < row[1]; i++) {
        var fx = b + iw * (.08 + .84 * (i + .5) / row[1]) + uni(r, -2, 2), fy = b + ih * row[0];
        figs.push('<rect x="' + n1(fx - size * .55) + '" y="' + n1(fy) + '" width="' + n1(size * 1.1) + '" height="' + n1(size * 1.9) + '" rx="' + n1(size * .25) + '" fill="' + dark + '"/>' +
          '<path d="M ' + n1(fx - size * .42) + " " + n1(fy + size * .05) + " L " + n1(fx) + " " + n1(fy + size * .55) + " L " + n1(fx + size * .42) + " " + n1(fy + size * .05) + ' Z" fill="' + light + '" opacity=".9"/>' +
          '<circle cx="' + n1(fx) + '" cy="' + n1(fy - size * .32) + '" r="' + n1(size * .33) + '" fill="' + mid + '"/>' +
          '<ellipse cx="' + n1(fx) + '" cy="' + n1(fy - size * .62) + '" rx="' + n1(size * .5) + '" ry="' + n1(size * .16) + '" fill="' + light + '"/>' +
          '<circle cx="' + n1(fx) + '" cy="' + n1(fy - size * .78) + '" r="' + n1(size * .12) + '" fill="' + dark + '"/>');
      }
    });
    return '<svg class="mx-crew" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '"><defs><linearGradient id="' + u + '-ph" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + light +
      '"/><stop offset=".45" stop-color="' + mid + '"/><stop offset="1" stop-color="' + dark + '"/></linearGradient></defs><rect width="' + w + '" height="' + h + '" fill="#f4efe3"/>' +
      '<rect x="' + b + '" y="' + b + '" width="' + iw + '" height="' + ih + '" fill="url(#' + u + '-ph)"/><rect x="' + b + '" y="' + n1(b + ih * .12) + '" width="' + iw + '" height="' + n1(ih * .05) + '" fill="' + dark + '" opacity=".35"/>' +
      figs.join("") + "</svg>";
  };
  // Une date au crayon (Space Mono, graphite), une lettre par tspan .mx-pc pour l'écrire lettre à lettre.
  MX.pencilSVG = function (text, size, color) {
    var t = "";
    for (var i = 0; i < text.length; i++) t += '<tspan class="mx-pc">' + esc(text[i]) + "</tspan>";
    return '<svg class="mx-pencil" data-layout-ignore width="1" height="1" style="overflow:visible"><text x="0" y="0" font-family="Space Mono" font-size="' + size + '" fill="' + (color || MX.C.pencil) +
      '" opacity=".88">' + t + "</text></svg>";
  };
  // Cercle au crayon rouge (une perte), ellipse tournée dans le plan de la carte ; le tracé se dessine par strokeDashoffset.
  MX.lossRingSVG = function (id, rx, ry, rot) {
    var L = Math.round(Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry))));
    return '<svg class="mx-loss" width="1" height="1" style="overflow:visible"><ellipse' + (id ? ' id="' + id + '"' : "") + ' cx="0" cy="0" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (rot || 0) +
      ')" fill="none" stroke="' + MX.C.loss + '" stroke-width="5" stroke-linecap="round" opacity=".85" stroke-dasharray="' + L + '" stroke-dashoffset="' + L + '" data-len="' + L + '"/></svg>';
  };

  // ------------------------------------------------------------------------------------------------ calques 2D
  MX.lampHTML = function (cx, cy, rx, ry, dark) {
    return '<div class="mx-layer mx-lamp" data-layout-allow-occlusion style="background:radial-gradient(ellipse ' + rx + "px " + ry + "px at " + cx + "px " + cy + 'px,rgba(255,206,140,.24),rgba(255,206,140,0) 70%)"></div>' +
      '<div class="mx-layer mx-lamp-dark" data-layout-allow-occlusion style="background:radial-gradient(ellipse ' + n0(rx * 1.25) + "px " + n0(ry * 1.25) + "px at " + cx + "px " + cy + "px,rgba(0,0,0,0) 38%,rgba(6,4,2," + (dark || .86) + ') 100%)"></div>';
  };
  MX.dayHTML = function () {
    return '<div class="mx-layer mx-day" data-layout-allow-occlusion style="background:radial-gradient(ellipse 1300px 800px at 900px 420px,rgba(255,248,232,.2),rgba(255,248,232,0) 70%)"></div>' +
      '<div class="mx-layer mx-day-edge" data-layout-allow-occlusion style="background:radial-gradient(ellipse 1400px 900px at 960px 460px,rgba(0,0,0,0) 55%,rgba(70,50,25,.32) 100%)"></div>';
  };
  MX.dividersSVG = function (u) {
    return '<svg class="mx-dividers" width="420" height="760" viewBox="0 0 420 760"><defs><linearGradient id="' + u + '-br" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#5a3f18"/><stop offset=".45" stop-color="#e2c07a"/><stop offset=".55" stop-color="#f6e0a6"/><stop offset="1" stop-color="#6b4a1c"/></linearGradient></defs>' +
      '<g transform="rotate(-34 160 640)"><rect x="80" y="120" width="34" height="640" rx="10" fill="url(#' + u + '-br)"/>' +
      '<rect x="190" y="120" width="34" height="640" rx="10" fill="url(#' + u + '-br)" transform="rotate(14 152 120)"/><circle cx="152" cy="120" r="44" fill="url(#' + u + '-br)"/></g></svg>';
  };

  // ------------------------------------------------------------------------------------------------ sous-titre
  // Un morceau de sous-titre : [["mot", "box"|"stroke"|""], ...] ; chaque mot est un span .mx-w (les séquences le font
  // entrer sur son temps) ; une boîte = .mx-box (.mx-box-bg qui se trace + .mx-box-tx) ; un trait = .mx-stroke sous le mot.
  function wordsHTML(words) {      // un signe de ponctuation seul (« . », « , », « … ») se colle au mot d'avant, dans sa boîte s'il est encadré
    var pt = function (w) { return w && /^[.,…]+$/.test(w[0]); };
    return words.map(function (w, i) {
      var t = esc(w[0]).replace(/ /g, "&nbsp;"), glue = pt(w) ? "" : (i ? " " : "");
      if (pt(w) && i && /^box/.test(words[i - 1][1])) return "";             // déjà écrit dans la boîte du mot d'avant
      var tail = pt(words[i + 1]) ? '<span class="mx-w mx-pt" data-i="' + (i + 1) + '">' + esc(words[i + 1][0]) + "</span>" : "";
      if (w[1] === "box") return glue + '<span class="mx-w mx-box" data-i="' + i + '"><span class="mx-box-bg"></span><span class="mx-box-tx">' + t + tail + "</span></span>";
      if (w[1] === "boxstroke") return glue + '<span class="mx-w mx-box" data-i="' + i + '"><span class="mx-box-bg"></span><span class="mx-box-tx"><span class="mx-kw">' + t + '<span class="mx-stroke"></span></span>' + tail + "</span></span>";
      return glue + '<span class="mx-w" data-i="' + i + '">' + t + "</span>";
    }).join("");
  }
  MX.subHTML = function (id, words, theme) {
    return '<div class="mx-sub ' + (theme || "night") + '"' + (id ? ' id="' + id + '"' : "") + ">" + wordsHTML(words) + "</div>";
  };
  // Le moment typographique (le pivot) : la phrase seule, centrée, 84 px, sur le noir.
  MX.typeHTML = function (id, words) {
    return '<div class="mx-type"' + (id ? ' id="' + id + '"' : "") + '><div class="mx-type-line">' + wordsHTML(words) + "</div></div>";
  };

  // ------------------------------------------------------------------------------------------------ carte de fin
  MX.endCardHTML = function (u, img) {
    return '<div class="mx-layer mx-end-ground" id="' + u + '-endground"></div>' +
      '<div class="mx-end-header" id="' + u + '-header" style="background-image:url(' + img + 'blog-bandeau.png)"></div>' +
      '<div class="mx-end-tag" id="' + u + '-tag">Les navires, les matériels et les hommes de la flotte française de 1939.</div>' +
      '<div class="mx-end-rings" id="' + u + '-rings"><i></i><i></i><i></i></div>' +
      '<div class="mx-btn" id="' + u + '-btn"><span>Montez à bord</span></div>' +
      '<div class="mx-end-url" id="' + u + '-url">marine1939.blogspot.com</div>' +
      '<svg class="mx-cursor" id="' + u + '-cursor" width="60" height="80" viewBox="0 0 24 32"><path d="M2 2 L2 26 L8.5 20 L13 30 L17 28.2 L12.6 18.6 L21 18.6 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  };


  // ------------------------------------------------------------------------------------------------ les stations du monde
  // Les positions du storyboard, vérifiées en mer (frame.md, « LE MONDE ») : une séquence les lit ici, ne les recopie pas.
  // Maquettes : [type, x, y, longueur, angle] ; livres : coin haut gauche, largeur, rotation ; photos : centre-x, haut,
  // rotation ; cartes d'articles : coin haut gauche, rotation ; épingles : centre.
  MX.W = {
    BOOK_A: { x: 780, y: 120, w: 1250, rot: -8 },                 // le manuel du début, sur la terre de France
    BOOK_B: { x: 2440, y: 987, w: 1300, rot: 4 },                 // le manuel tombé sur la rade (centre 3090, 1420)
    LINE: [["bb", 2700, 1030, 230, -30], ["bb", 2480, 1150, 230, -30], ["ca", 2285, 1262, 200, -30], ["ct4", 2120, 1360, 170, -30], ["ct4", 1975, 1446, 170, -30]],
    MK: [["bb", 934, 3210, 230, -108.5], ["bb2", 1012, 3155, 180, -111], ["bb2", 1099, 3123, 180, -107], ["bb", 1194, 3115, 230, -112]],
    STRAS: [[1194, 3115], [1204, 2945], [1700, 2700], [2380, 2290], [2560, 1700], [2608, 1250], [2608, 965]],
    TOULON: [["ct4", 2888, 995, 170, 88], ["ca", 2818, 980, 200, 91.5], ["bb2", 2748, 990, 180, 89], ["cl", 2678, 980, 200, 92], ["bb", 2608, 965, 230, 88.5]],
    PENCIL_MK: [1290, 2990], PENCIL_TOULON: [2950, 870],          // les dates au crayon (début du texte, ligne de base)
    LOSS_MK: [1099, 3123, 129, 44, -107],                         // le cercle rouge de la Bretagne : centre, rx, ry, rotation
    DIAL: [1850, 1720, 110, 8],                                   // le cadran : centre, rayon, rotation
    PRINT: [1900, 2700, 420, 300, -4],                            // le tirage du manuel : centre, largeur, hauteur, rotation
    PHOTO: [1900, 2460, 360, 390, -3],                            // la photo du Dunkerque : centre-x, haut, image, rotation
    PIN_PHOTO: [1898, 2470],
    PHONE: [3250, 1250, 330, -10],                                // le téléphone : centre, largeur, rotation (là où était le manuel B)
    CARD_EPERVIER: [2420, 1420, -3], PIN_EPERVIER: [2410, 1424],  // la photo de L'Épervier (456 × 300)
    CARD_DIAL: [1960, 1880, 3], PIN_DIAL: [2220, 1874],           // l'article « Les cadrans optiques » (520 de large)
    // carte de l'Atlantique
    ROUTE: ["newyork", "narrows", "sandyhook", "r1", "r2", "r3d", "r4", "strait", "r5", "bals", "bale", "toulonapp", "toulon"].map(function (k) { return MX_DATA.atlantic.places[k]; }),
    CARD_NY: [595, 481, -4], PIN_NY: [875, 469],                  // « La 4ème DC à New York » (560 de large), au-dessus de New York (525, 1121)
    CARD_TOULON: [2902, 299, 3], PIN_TOULON: [3182, 287],         // « Les épaves de Toulon » (560 de large), au nord-ouest de Toulon (3522, 999)
    LOSS_TOULON: [3522, 999, 70, 50, -10]
  };
  // La carte de la Méditerranée posée sur celle de l'Atlantique (séquence 10) : même projection de Mercator, échelle
  // 0,135648 (276,45 u par degré de longitude sur la Méditerranée, 37,5 sur l'Atlantique).
  MX.MED_ON_ATL = { k: 0.135648, x: 3148.27, y: 890.50 };
  MX.medSheetHTML = function (uid, inner) {      // le calque à poser dans le monde de l'Atlantique ; inner : objets en coordonnées de Méditerranée
    var M = MX.MED_ON_ATL;
    return '<div class="mx-sheet" id="' + uid + '" style="transform:translate(' + M.x + "px," + M.y + "px) scale(" + M.k + ')">' + MX.chartSVG("med", uid + "-med") + (inner || "") + "</div>";
  };
  MX.camToAtl = function (c) {
    if (!c || c.chart === "atlantic") return c;
    var M = MX.MED_ON_ATL;
    return { chart: "atlantic", x: M.k * c.x + M.x, y: M.k * c.y + M.y, s: c.s / M.k, tilt: c.tilt, rz: c.rz };
  };
  MX.camToMed = function (c) {
    if (!c || c.chart !== "atlantic") return c;
    var M = MX.MED_ON_ATL;
    return { chart: "med", x: (c.x - M.x) / M.k, y: (c.y - M.y) / M.k, s: c.s * M.k, tilt: c.tilt, rz: c.rz };
  };

  // ------------------------------------------------------------------------------------------------ courbes et chemins
  // Les courbes de GSAP (mêmes formules) et « whip(us) » : accélère (au carré) jusqu'à us puis freine (au cube), sans saut
  // de vitesse ; une couture placée en us tombe au sommet de la vitesse.
  // Courbes : powerN vaut u^N dans tout le projet (power2 = quadratique, power3 = cubique, power4 = quartique) ;
  // dans GSAP, les mêmes courbes s'appellent power1, power2, power3 : écrire power(N-1). expo et sine sont identiques.
  MX.ease = function (name, u) {
    u = Math.max(0, Math.min(1, u));
    switch (name) {
      case "none": return u;
      case "power2.in": return u * u;
      case "power2.out": return 1 - (1 - u) * (1 - u);
      case "power2.inOut": return u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u);
      case "power3.in": return u * u * u;
      case "power3.out": return 1 - Math.pow(1 - u, 3);
      case "power3.inOut": return u < .5 ? 4 * u * u * u : 1 - 4 * Math.pow(1 - u, 3);
      case "power4.in": return u * u * u * u;
      case "power4.out": return 1 - Math.pow(1 - u, 4);
      case "power4.inOut": return u < .5 ? 8 * u * u * u * u : 1 - 8 * Math.pow(1 - u, 4);
      case "sine.inOut": return -(Math.cos(Math.PI * u) - 1) / 2;
    }
    var m = /^whip\(([0-9.]+)\)$/.exec(name);
    if (m) {
      var us = +m[1], a = 3 / (us * (us + 2)), b = 2 * a * us / (3 * (1 - us) * (1 - us));
      return u <= us ? a * u * u : 1 - b * Math.pow(1 - u, 3);
    }
    throw new Error("MX.ease : courbe inconnue " + name);
  };
  function ss(w) { w = Math.max(0, Math.min(1, w)); return w * w * (3 - 2 * w); }
  function mixAngle(h1, h2, w) { var d = ((h2 - h1) % 360 + 540) % 360 - 180; return h1 + d * w; }
  // Un point d'une ligne brisée à une distance donnée, et le cap d'une maquette qui la suit (étrave vers l'avant), lissé
  // sur ± R u autour de chaque sommet ; h0 remplace le cap du premier segment (une maquette qui recule).
  MX.pathAt = function (pts, dist, R, h0) {
    var segs = [], acc = 0, i;
    for (i = 1; i < pts.length; i++) {
      var dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1], l = Math.hypot(dx, dy);
      segs.push({ a: acc, l: l, x: pts[i - 1][0], y: pts[i - 1][1], dx: dx / l, dy: dy / l, h: Math.atan2(dy, dx) * 180 / Math.PI + 180 });
      acc += l;
    }
    if (h0 !== undefined) segs[0].h = h0;
    dist = Math.max(0, Math.min(acc, dist));
    for (i = 0; i < segs.length - 1 && dist > segs[i].a + segs[i].l; i++);
    var g = segs[i], t = dist - g.a, h = g.h;
    for (var j = 0; j < segs.length - 1; j++) {
      var v = segs[j].a + segs[j].l;
      if (Math.abs(dist - v) < R) { h = mixAngle(segs[j].h, segs[j + 1].h, ss((dist - v + R) / (2 * R))); break; }
    }
    return [g.x + g.dx * t, g.y + g.dy * t, h];
  };
  // Le Strasbourg : il recule de son poste à Mers el-Kébir, vire, file à l'est des Baléares et s'amarre à Toulon. Un seul
  // mouvement de 8.82 à 10.33 (temps du film), partagé par les séquences 2 et 3 : [x, y, angle].
  MX.STRAS_MOVE = { t0: 8.82, d: 1.507, ease: "power2.inOut", h0: -112, berth: 88.5 };
  MX.strasAt = function (T) {
    var M = MX.STRAS_MOVE, pts = MX.W.STRAS, L = MX.routeLength(pts), d = L * MX.ease(M.ease, (T - M.t0) / M.d), q = MX.pathAt(pts, d, 60, M.h0);
    if (d > L - 60) q[2] = mixAngle(q[2], M.berth, ss((d - (L - 60)) / 60));
    return q;
  };
  // La maquette de croiseur léger de la 4e DC (séquence 10, carte de l'Atlantique) : elle remonte au large de New York
  // (distance 420 sur la route, à 38.40), file de 38.70 à 40.60 et s'arrête au large de Gibraltar (distance 2150).
  MX.CL_MOVE = { rise: 38.40, t0: 38.70, t1: 40.60, d0: 420, d1: 2150, ease: "sine.inOut" };
  MX.clAt = function (T) {
    var M = MX.CL_MOVE, d = M.d0 + (M.d1 - M.d0) * MX.ease(M.ease, (T - M.t0) / (M.t1 - M.t0));
    return MX.pathAt(MX.W.ROUTE, d, 80);
  };
  // La part faite de la route (0 à 1) : le crayon file de New York jusqu'à la maquette, la suit, puis finit seul jusqu'à
  // Toulon (40.60 à 40.90).
  MX.routeDoneAt = function (T) {
    var M = MX.CL_MOVE, L = MX.routeLength(MX.W.ROUTE), d;
    if (T < 38.30) d = 0;
    else if (T < 38.45) d = M.d0 * (T - 38.30) / .15;
    else if (T < M.t1) d = Math.max(M.d0, M.d0 + (M.d1 - M.d0) * MX.ease(M.ease, (T - M.t0) / (M.t1 - M.t0)));
    else d = M.d1 + (L - M.d1) * MX.ease("power2.inOut", (T - M.t1) / .30);
    return Math.min(1, d / L);
  };

  // ------------------------------------------------------------------------------------------------ la partition caméra
  // TOUTE la caméra du film, en temps GLOBAL (secondes du film). Une séquence calcule T = MX.FRAMES[n][1] + temps local et
  // appelle, dans son unique onUpdate : MX.applyCam(monde, MX.camAt(T)) et le flou MX.blurAt(T) sur .mx-stage. Les deux
  // côtés d'une couture lisent ainsi la même courbe : le passage de relais est exact par construction.
  MX.FRAMES = [["p01", 0, 5.82], ["p02", 5.82, 9.32], ["p03", 9.32, 13.35], ["p04", 13.35, 17.84], ["p05", 17.84, 23.37], ["p06", 23.37, 26.40],
    ["p07", 26.40, 30.41], ["p08", 30.41, 35.07], ["p09", 35.07, 37.90], ["p10", 37.90, 42.36], ["p11", 42.36, 50.10]];
  function cam(x, y, s, tilt, rz, chart) { return { chart: chart || "med", x: x, y: y, s: s, tilt: tilt || 0, rz: rz || 0 }; }
  function pageCam(b, px, py, s, tilt) { var p = MX.bookPoint(b, "r", px, py); return cam(p[0], p[1], s, tilt || 0, -(b.rot || 0)); }
  function shipCam(T) { var q = MX.strasAt(T); return cam(q[0], q[1], 1.10, 46, 0); }
  function zoomCam(a, b, l) {   // grand recul : l'échelle en logarithme, le centre en l² (le point de départ reste à l'image)
    var s = a.s * Math.pow(b.s / a.s, l), k = l * l * b.s / s;
    return { chart: b.chart, x: a.x - k * (a.x - b.x), y: a.y - k * (a.y - b.y), s: s, tilt: a.tilt + (b.tilt - a.tilt) * l, rz: a.rz + (b.rz - a.rz) * l };
  }
  var SP = 1920 / (MX.W.BOOK_A.w / 2), BA = MX.W.BOOK_A, BB = MX.W.BOOK_B;
  MX.CAMS = {                                                     // les cadrages nommés du storyboard
    A0: pageCam(BA, 880, 470, SP * 1.06), A1: pageCam(BA, 1000, 482, SP * .985),
    B: cam(2080, 1070, .95, 46), MK: cam(1066, 3305, 1.40, 46), MK2: cam(1090, 3285, 1.46, 46),
    T1: cam(2748, 1090, 1.50, 46), T2: cam(2762, 1102, 1.54, 46),
    BV: cam(3040, 1440, .82, 40), BV2: cam(3048, 1432, .84, 40), PG: pageCam(BB, 820, 640, 1.55, 34), PG2: pageCam(BB, 830, 646, 1.57, 34),
    V5a: cam(2400, 1450, .80, 44), V5b: cam(2330, 1490, .81, 44), V5c: cam(1960, 1700, .86, 44), V5d: cam(1935, 1722, .87, 44),
    V5e: cam(1980, 2600, 1.0, 44), V5f: cam(1978, 2622, 1.02, 44),
    PH1: cam(3110, 1280, 1.06, 25), PH2: cam(3060, 1290, 1.0, 28), L1: cam(2480, 1250, 1.15, 42), L2: cam(2260, 1480, 1.18, 42),
    D1: cam(1990, 1840, 1.20, 40), D2: cam(1975, 1860, 1.22, 40), DK1: cam(1900, 2700, 1.30, 26), DK2: cam(1905, 2710, 1.33, 26),
    CR1: cam(1995, 2762, 1.85, 24), CR2: cam(1998, 2763, 1.87, 24),
    AO: cam(2050, 1010, .565, 22, 0, "atlantic"), TL: cam(3250, 853.4, .74, 26, 0, "atlantic"), TL2: cam(3258, 855.4, .76, 26, 0, "atlantic"),
    CARD: null, CARD2: null                                       // le plein cadre du corps de la carte « Les épaves de Toulon » (calculés plus bas)
  };
  (function () {                                                  // le corps de la carte de Toulon, à droite de son titre : un noir #141414 uni
    var c = MX.W.CARD_TOULON, a = c[2] * Math.PI / 180, px = 505, py = 374, x = c[0] + px * Math.cos(a) - py * Math.sin(a), y = c[1] + px * Math.sin(a) + py * Math.cos(a);
    MX.CAMS.CARD = cam(x, y, 22, 0, -c[2], "atlantic"); MX.CAMS.CARD2 = cam(x, y, 26, 0, -c[2], "atlantic");
  })();
  var K = MX.CAMS;
  // [t0, t1, mode, a, b, courbe, point de contrôle] ; modes : lerp (MX.lerpCam), in (de a vers le Strasbourg suivi), follow,
  // out (du Strasbourg vers b), zoom (grand recul, dans le repère de l'Atlantique), curve (comme lerp, mais le centre suit
  // une courbe de Bézier passant près du point de contrôle).
  MX.SCORE = [
    [0.00, 4.70, "lerp", K.A0, K.A1, "none"],                     // 1 · la page 215 : dérive vers la droite, léger recul
    [4.70, 5.40, "lerp", K.A1, K.B, "power4.inOut"],              // 1 · la bascule : recul et inclinaison, le manuel sur la carte de nuit
    [5.40, 6.62, "lerp", K.B, K.MK, "whip(0.3443)"],              // 1 → 2 · whip vers le sud-sud-ouest (couture 5.82) jusqu'à Mers el-Kébir
    [6.62, 8.82, "lerp", K.MK, K.MK2, "none"],                    // 2 · dérive sur l'escadre amarrée
    [8.82, 9.32, "in", K.MK2, null, "power4.inOut"],              // 2 · la caméra prend le Strasbourg qui s'échappe (couture 9.32)
    [9.32, 9.90, "follow", null, null, "none"],                   // 3 · suivi du Strasbourg vers le nord-est
    [9.90, 10.50, "out", null, K.T1, "power4.inOut"],             // 3 · il s'amarre, la caméra se pose sur la rade de Toulon
    [10.50, 12.72, "lerp", K.T1, K.T2, "none"],                   // 3 · dérive pendant le sabordage
    [12.72, 14.25, "lerp", K.T2, K.BV, "whip(0.4118)"],           // 3 → 4 · la caméra se relève (couture 13.35), le manuel tombe
    [14.25, 15.56, "lerp", K.BV, K.BV2, "none"],                  // 4 · dérive sur le manuel ouvert
    [15.56, 17.05, "lerp", K.BV2, K.PG, "power2.inOut"],          // 4 · approche des trois lignes
    [17.05, 17.30, "lerp", K.PG, K.PG2, "none"],
    [17.30, 19.10, "lerp", K.PG2, K.V5a, "whip(0.3)"],            // 4 → 5 · recul vers l'ouest (couture 17.84)
    [19.10, 20.70, "lerp", K.V5a, K.V5b, "none"],                 // 5 · les trois maquettes qui sombrent
    [20.70, 21.20, "lerp", K.V5b, K.V5c, "power4.inOut"],         // 5 · cran vers le cadran, dans le silence, posé sur « Ses »
    [21.20, 22.00, "lerp", K.V5c, K.V5d, "none"],
    [22.00, 22.50, "lerp", K.V5d, K.V5e, "power4.inOut"],         // 5 · cran vers le tirage, dans le silence, posé sur « Ses »
    [22.50, 23.37, "lerp", K.V5e, K.V5f, "none"],                 // 5 · la lampe s'éteint (23.17 à 23.37)
    [26.40, 29.40, "lerp", K.PH1, K.PH2, "none"],                 // 7 · le téléphone s'allume, le jour se lève
    [29.40, 30.95, "lerp", K.PH2, K.L1, "whip(0.6516)"],          // 7 → 8 · vers l'ouest (couture 30.41), la ligne remonte
    [30.95, 32.50, "lerp", K.L1, K.L2, "none"],                   // 8 · un par un
    [32.50, 33.00, "lerp", K.L2, K.D1, "power4.inOut"],           // 8 · cran vers le cadran
    [33.00, 34.70, "lerp", K.D1, K.D2, "none"],                   // 8 · pièce par pièce
    [34.70, 35.62, "lerp", K.D2, K.DK1, "whip(0.4022)"],           // 8 → 9 · vers le sud (couture 35.07), la photo du Dunkerque
    [35.62, 36.20, "lerp", K.DK1, K.DK2, "none"],
    [36.20, 37.25, "lerp", K.DK2, K.CR1, "power2.inOut"],           // 9 · de la passerelle à l'équipage
    [37.25, 37.40, "lerp", K.CR1, K.CR2, "none"],
    [37.40, 38.60, "zoom", K.CR2, K.AO, "power2.inOut"],          // 9 → 10 · le grand recul jusqu'à l'Atlantique (couture 37.90)
    [38.60, 41.40, "curve", K.AO, K.TL, "power2.inOut", [2050, 875]], // 10 · vers l'est avec le croiseur, jusqu'à Toulon et sa carte
    [41.40, 41.90, "lerp", K.TL, K.TL2, "none"],
    [41.90, 42.30, "lerp", K.TL2, K.CARD, "power4.in"],           // 10 → 11 · plongée dans la carte « Les épaves de Toulon »
    [42.30, 42.36, "lerp", K.CARD, K.CARD2, "none"]               // 10 · le cadre est le noir uni du corps de la carte (couture 42.36)
  ];
  // L'état de la caméra au temps T du film, ou null (le noir du pivot, la carte de fin). Avant 37.90 : repère de la
  // Méditerranée ; de 37.90 à 42.36 : repère de l'Atlantique (la carte de la Méditerranée y est posée, MX.medSheetHTML).
  MX.camAt = function (T) {
    for (var i = 0; i < MX.SCORE.length; i++) {
      var g = MX.SCORE[i];
      if (T < g[0] || T >= g[1]) continue;
      var u = MX.ease(g[5], (T - g[0]) / (g[1] - g[0])), c;
      if (g[2] === "lerp") c = MX.lerpCam(g[3], g[4], u);
      else if (g[2] === "in") c = MX.lerpCam(g[3], shipCam(T), u);
      else if (g[2] === "follow") c = shipCam(T);
      else if (g[2] === "out") c = MX.lerpCam(shipCam(T), g[4], u);
      else if (g[2] === "zoom") c = zoomCam(MX.camToAtl(g[3]), g[4], u);
      else if (g[2] === "curve") { c = MX.lerpCam(g[3], g[4], u); var k = g[6];
        c.x = (1 - u) * (1 - u) * g[3].x + 2 * u * (1 - u) * k[0] + u * u * g[4].x; c.y = (1 - u) * (1 - u) * g[3].y + 2 * u * (1 - u) * k[1] + u * u * g[4].y; }
      c.chart = g[2] === "lerp" || g[2] === "curve" ? (g[4].chart || "med") : g[2] === "zoom" ? "atlantic" : "med";
      if (g[2] === "lerp" && g[3].chart !== g[4].chart) throw new Error("MX.camAt : deux repères dans un segment");
      if (T < 37.90 && c.chart === "atlantic") c = MX.camToMed(c);
      return c;
    }
    return null;
  };
  // Le flou de caméra (px, sur .mx-stage) : proportionnel au déplacement des points de l'image d'une image à l'autre,
  // 14 px au plus. Le même calcul des deux côtés de chaque couture.
  MX.blurAt = function (T) {
    var c0 = MX.camAt(T), c1 = MX.camAt(T + 1 / 60);
    if (!c0 || !c1) return 0;
    if (c0.chart !== c1.chart) { c0 = MX.camToAtl(c0); c1 = MX.camToAtl(c1); }
    var d = 0, o = [[0, 0], [700, 0], [-700, 0], [0, 380], [0, -380]];
    for (var i = 0; i < o.length; i++) {
      var wx = c0.x + o[i][0] / c0.s, wy = c0.y + o[i][1] / c0.s, p0 = MX.project(c0, wx, wy), p1 = MX.project(c1, wx, wy);
      d = Math.max(d, Math.hypot(p1.x - p0.x, p1.y - p0.y));
    }
    return Math.min(14, Math.round(d * 2 * .07 * 10) / 10);
  };

  return MX;
})();
