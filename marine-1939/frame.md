---
version: 1
name: "MARINE 1939 · Le manuel et la carte (direction D)"
description: >
  Charte du film de lancement du blog MARINE 1939 (50,10 s, 1920×1080, 30 i/s), sur la voix
  assets/audio/voix-montage.wav. Direction D « Le manuel et la carte », choisie par l'auteur : le film s'ouvre dans un
  manuel d'histoire posé sur une carte marine, la caméra bascule sur la carte des opérations, et toute l'histoire se joue
  avec des maquettes posées sur la mer de la carte. Douleur : la nuit, une lampe, des maquettes qui sombrent dans la carte.
  Pivot : la lampe s'éteint, « Il est temps de renflouer leur histoire. » sur le noir. Solution : le jour se lève sur la
  même carte, le blog s'allume sur un téléphone, les maquettes et les documents remontent, tels que le blog les montre.
  Un seul accent : le jaune du titre du blog (#e6ec37), pour le mot clé de chaque phrase, le « 4e » et le bouton.
  Règle de l'auteur : les navires sont TOUJOURS sur la mer, jamais sur la terre (contrôlé par le kit).
unit: 1920×1080
principle: "une carte, des maquettes posées sur la mer, une idée par image, un geste par transition, chaque couture invisible"
reference: "assets/carte/mx-kit.css, assets/carte/mx-data.js, assets/carte/mx-kit.js (code commun : stations du monde MX.W, partition caméra MX.camAt et MX.blurAt, chemins du Strasbourg et du croiseur, cartes, maquettes, contrôle à terre, manuel et ses pages, tampon 4e, téléphone, photos, tirage du manuel, cartes du blog, épingle, cadran, ronds dans l'eau, crayon, cercle rouge, route, lumières, sous-titre, boîte, trait, moment typographique, carte de fin ; source UNIQUE, chargée telle quelle par chaque séquence) ; reference/carte.html (l'image du film à n'importe quel temps : demo(T), T en secondes du film ; KEYS liste les images clés du storyboard)"

colors:
  canvas: "#0c0906"            # la table la nuit, le noir du pivot
  sea: "#dde8e4"               # la mer de la carte ; hauts-fonds en bandes #c9dcdc, #9ebfca, #c2d9dc, #8fb2c0, #b1cfd6
  land: "#efe3c4"              # la terre de la carte ; trait de côte #4e4232 ; graticule #56707a à 45 %
  chart-ink: "#2a2722"         # noms des villes ; mers et golfes en italique #4b6b7a ; sondes #4f6873 à 55 %
  paper: "#efe5cf"             # les pages du manuel
  ink: "#1b1a17"               # l'encre du manuel et de la gravure ; texte du manuel #2a2620 ; titre courant #5b5346 ; folio #8a8172
  light-text: "#f4eddd"        # sous-titre sur la carte de nuit et sur le noir
  day-text: "#1d1b18"          # sous-titre sur la carte de jour (halo clair)
  accent: "#e6ec37"            # LE jaune du titre MARINE 1939 : boîte du mot clé, trait des pics, « 4e », surligneur des trois lignes, bouton, barre des cartes du blog
  accent-ink: "#111111"        # le texte dans la boîte et sur le bouton
  accent-press: "#cdd32c"      # le bouton enfoncé
  accent-flash: "#f5f8a8"      # le bouton relâché, un instant : le clic passe en trois couleurs
  route: "#b3176a"             # magenta des cartes marines : la route de la 4e DC, la rose des vents, rien d'autre
  loss: "#b3241a"              # crayon rouge : les pertes seulement (Bretagne à Mers el-Kébir, Toulon sur « drames »)
  pencil: "#3a3530"            # crayon graphite : les dates écrites sur la carte
  blog: "#070707"              # fond du blog (rayures #161616), cartes d'articles #141414, titres #ececec, dates #9a9a9a
  model: "#4b535a"             # coque des maquettes ; pont #7d858b ; détails #2b3136

fonts:
  Instrument Sans: { files: ["assets/fonts/InstrumentSans-500.woff2 (500)", "assets/fonts/InstrumentSans-600.woff2 (600)", "assets/fonts/InstrumentSans-700.woff2 (700)"] }
  EB Garamond: { files: ["assets/fonts/EBGaramond-400.woff2 (400)", "assets/fonts/EBGaramond-700.woff2 (700)", "assets/fonts/EBGaramond-400-italic.woff2 (400 italique)"] }
  Space Mono: { files: ["assets/fonts/SpaceMono-400.woff2 (400)", "assets/fonts/SpaceMono-700.woff2 (700)"] }
  Archivo Black: { files: ["assets/fonts/ArchivoBlack-400.woff2 (400)"], note: "remplace la police lourde du titre du blog : « 4e », bouton « Montez à bord »" }

typography:
  subtitle:     { fontFamily: "Instrument Sans", px: 62, weight: 600, note: "la phrase de la voix EN BAS AU CENTRE (classe .mx-sub, bande y 890 à 980 qui ne porte rien d'autre), 45 signes au plus par morceau, mot par mot. Trois thèmes : .night (#f4eddd, ombre sombre) sur la carte de nuit, .paper (encre, halo papier) quand le manuel est dessous, .day (#1d1b18, halo clair) sur la carte de jour" }
  type:         { fontFamily: "Instrument Sans", px: 84, weight: 600, note: "UN seul moment typographique : le pivot (séquence 6), la phrase centrée sur le noir (.mx-type) ; pas de sous-titre en bas pendant ce moment" }
  chart-label:  { fontFamily: "EB Garamond", note: "villes en capitales 700 (38 à 48 u, interlettrage 7 à 9 u) ; mers et golfes en italique 400 (44 à 110 u, #4b6b7a) ; pays en capitales 400 à 70 % ; sondes en italique 24 u. Le décor de chaque carte est FIXE : MX.chartSVG(nom, uid)" }
  book:         { fontFamily: "EB Garamond", note: "texte du manuel 50 u justifié ; titre courant 700 46 u interlettré ; folio 44 u ; trois lignes 60 u" }
  typed-date:   { fontFamily: "Space Mono", weight: 700, note: "« SEPTEMBRE 1939 » tapé à la machine en haut de la page 215 (56 u, interlettrage 17 u), une lettre par tspan .mx-tc" }
  pencil:       { fontFamily: "Space Mono", weight: 400, px: 44, note: "les dates écrites au crayon sur la carte : « 3·7·40 », « 27·11·42 », lettre à lettre (.mx-pc)" }
  blog-card:    { fontFamily: "Instrument Sans", note: "date 500 22 px #9a9a9a, titre 600 40 px #ececec, barre jaune 96 × 6 px" }
  photo-caption: { fontFamily: "EB Garamond", note: "italique 22 px #3b352c sous les photos de la collection" }
  brand:        { fontFamily: "Archivo Black", note: "le « 4e » (jaune, ombre portée dure #1b1a17 comme le titre du blog) et le bouton « Montez à bord » (42 px, #111111 sur jaune, ombre dure 8 px). Le titre MARINE 1939 lui-même n'est jamais redessiné : c'est l'image du bandeau du blog" }
  url:          { fontFamily: "Instrument Sans", px: 34, weight: 500, note: "« marine1939.blogspot.com » #9a9a9a sous le bouton" }

components:
  chart:
    summary: "la carte marine posée sur la table : MX.chartSVG('med' | 'atlantic', uid) dans le calque du monde (.mx-world), texture de papier en tuile (.mx-chart-tex, jamais un filtre sur toute la carte), pli du papier en x = 0,38 W. Méditerranée occidentale 4200 × 3900 u (côtes Natural Earth 10 m), Atlantique 4800 × 2100 u (50 m). En séquence 10, la carte de la Méditerranée est une feuille posée sur celle de l'Atlantique (MX.medSheetHTML). Section « LE MONDE »."
  camera:
    summary: "UNE partition pour tout le film, dans le kit : MX.camAt(T) et MX.blurAt(T), T = temps du film (début de la séquence dans MX.FRAMES + temps local). MX.applyCam(monde, MX.camAt(T)) ; flou de caméra = filtre MX.blurAt(T) sur .mx-stage (le cadre 1920 × 1080), JAMAIS sur la carte elle-même. Une séquence n'invente aucun mouvement de caméra : seules les secousses datées du storyboard s'ajoutent, sur .mx-stage. Section « CAMÉRA »."
  model:
    look: "maquette peinte vue du dessus (MX.modelHTML(type, longueur, id)) : coque #4b535a, pont #7d858b, tourelles et cheminées, ombre portée douce (la maquette est POSÉE sur la carte). GSAP place son centre avec x, y, rotation (unités de carte), étrave vers -x à rotation 0. Types : bb (cuirassé rapide type Dunkerque, 230 u), bb2 (cuirassé ancien type Bretagne, 180 u), ca (croiseur lourd, 200 u), cl (croiseur léger type La Galissonnière, deux cheminées, 200 à 250 u), ct4 (contre-torpilleur type Aigle à quatre cheminées en deux paires, comme L'Épervier, 170 u)."
    sink: "sombrer, en deux vitesses : 0,2 s power2.in (échelle 1 → 0,9, opacité 1 → 0,35, flou 0 → 3 px), puis 1,0 s linéaire (opacité 0,35 → 0, flou 3 → 6 px), pendant que ses ronds dans l'eau s'ouvrent ; elle ne bouge pas de sa place (elle s'enfonce dans la mer de la carte)."
    rise: "remonter : depuis flou 6 px, 40 % d'opacité et échelle 1,04, jusqu'à net, plein et 1 en 0,2 s expo.out ; ses ronds s'ouvrent au même moment. Avant de remonter, une maquette du jour est une épave sous le papier : opacité 0,16, flou 5 px."
    rule: "BLOQUANT. Toute maquette, à chaque image, a son empreinte (coque + 18 u) sur la mer : MX.footprintClear(carte, type, x, y, longueur, angle) doit renvoyer null. Les positions (MX.W) et les deux seuls chemins (MX.strasAt(T) pour le Strasbourg, MX.clAt(T) pour le croiseur de la 4e DC) sont vérifiés à chaque image ; ne pas en inventer d'autres."
  ripples:
    look: "ronds dans l'eau : MX.ripplesSVG(n, r0, pas, '#2f6c80', opacité) posés à plat sur la carte, chaque ellipse grandit (×1 → ×1,35) et s'efface en 1,0 s linéaire, décalées de 0,1 s."
  pencil-date:
    look: "MX.pencilSVG(texte, 44) : Space Mono graphite #3a3530 à 88 %, écrit lettre à lettre (chaque lettre paraît en 0,08 s, au rythme donné par le storyboard), posé sur la carte."
  loss-ring:
    look: "MX.lossRingSVG(id, rx, ry, rot) : ellipse au crayon rouge #b3241a, 5 u, qui se trace par strokeDashoffset (de data-len à 0) en 0,4 s power2.out. Seulement : la Bretagne (séquence 2), Toulon sur « drames » (séquence 10)."
  book:
    look: "le manuel ouvert à plat sur la carte : MX.bookHTML(uid, {x, y, w, rot}, pageGauche, pageDroite) ; couverture #3b2a1c débordante, tranche des pages, gouttière ombrée, pages 3 × 4 (1920 × 2560 u de page). Pages : 214 (texte, MX.pageVersoSVG), 215 (date tapée, gravure de la flotte en ligne de file, texte, tampon 4e : MX.pageEngravingSVG), 216 (blanche, MX.pageBlankSVG(216)), 217 (titre du chapitre, les trois lignes, puis rien : MX.pageLinesSVG). Un point d'une page en coordonnées de carte : MX.bookPoint(livre, 'r', px, py)."
  engraving:
    look: "la gravure de la page 215 : cadre double, ciel en traits, mer gravée, cuirassé type Dunkerque, croiseur lourd et contre-torpilleur à quatre cheminées en hachures d'encre, fumées en lignes, vagues d'étrave ; filtre d'encre léger (#<uid>-ink). Les fumées (#<uid>-smoke0 à 2) et les vagues d'étrave (#<uid>-wake0 à 2) se dessinent : strokeDashoffset de leurs traits de 1 (rien) à 0 (tracé), pathLength 1."
  stamp-4e:
    look: "le « 4e » : sur la page, le groupe #<uid>-stamp (Archivo Black 560 u jaune, ombre dure décalée de 20 u, rotation -6°, centre de page (1540, 640)) ; en vol, sa copie 2D MX.stamp4eHTML(id, px) au-dessus de la scène. La copie 2D arrive de la caméra (×1,25, flou 12 → 0) et, au contact, cède sa place au tampon de la page dans la même image (jamais les deux à la fois)."
  highlighter:
    look: "le surligneur jaune des trois lignes (rect .mx-hl #<uid>-hl0 à hl2, jaune à 85 %) : se trace par scaleX depuis la gauche, 0,2 s power2.out, une ligne après l'autre."
  phone:
    look: "téléphone récent posé sur la carte (MX.phoneHTML(id, 330, 'assets/img/blog-accueil-mobile.png')) en MX.W.PHONE, là où était le manuel B : bord noir, barre d'adresse « marine1939.blogspot.com », la VRAIE page d'accueil du blog (capture de l'auteur). L'écran s'allume : filtre brightness 0 → 1 sur .mx-phone-screen en 0,2 s, puis un halo froid s'ouvre sur la carte autour de lui (lights.dawn)."
  photo-card:
    look: "tirage de la collection de l'auteur, bord blanc #f4efe3, légende en EB Garamond italique : MX.photoCardHTML(id, src, w, h, légende). L'Épervier (« L’Épervier. Collection Wilfried Langry. ») et le Dunkerque (« Le Dunkerque. Collection Wilfried Langry. ») ; épingle MX.pinHTML. Le filigrane du blog des photos reste tel quel."
  print:
    look: "le tirage anonyme du manuel, avant le pivot : MX.printHTML(id, src, 420, 300, '50% 100%', '130% auto') ; le pont du Dunkerque et ses marins, viré au sépia, sans légende et sans le filigrane du blog (cadré dessous). Après le pivot, la vraie photo avec sa légende le remplace."
  blog-card:
    look: "un article du blog, imprimé dans son propre style : MX.blogCardHTML(id, titre, date, image) ; fond #141414, date grise, titre clair, barre jaune ; épinglé sur la carte. Articles : « La 4ème DC à New York » (août 2013, photo assets/img/4e-dc-collection-langry.jpg), « Les épaves de Toulon » (jeudi 5 mai 2016, photo assets/img/epaves-toulon-collection-langry.jpg), « Les cadrans optiques » (dimanche 29 janvier 2012), en entrée de liste comme sur la page d'accueil du blog : MX.blogRowHTML(id, titre, date, image), la vignette à gauche (assets/img/cadrans-optiques-mogador.jpg, le cadran optique avant du Mogador, tiré de la capture de l'auteur assets/img/blog-article-cadrans-optiques.jpg), 640 × 170."
  dial:
    look: "cadran optique de passerelle, dessiné d'après la photo du Mogador de l'article « Les cadrans optiques » (MX.dialSVG(uid, 110)) : un disque noir à douze repères blancs et une aiguille blanche, dans sa couronne d'acier ; trois pièces : #<uid>-bezel (la couronne et ses vis), #<uid>-face (le disque et ses repères), #<uid>-hands (l'aiguille et son moyeu). Avant le pivot il coule entier ; après, « pièce par pièce » le remonte pièce après pièce."
  route:
    look: "la route de la 4e DC au crayon magenta (MX.routeSVG(uid, MX.W.ROUTE, avancée)) : toute la route en pointillés (#<uid>-todo), la partie faite tracée en continu par strokeDashoffset (#<uid>-done) ; l'avancée au temps T est MX.routeDoneAt(T) (strokeDashoffset = data-len × (1 − avancée)) ; la maquette de croiseur léger qui la suit est en MX.clAt(T) : [x, y, angle]."
  lights:
    night: "MX.lampHTML(960, 480, 980, 580) : un cône de lampe chaud au centre et l'ombre autour ; la carte est la seule source de lumière ; fond #0c0906."
    black: "le pivot : la lampe s'éteint en 0,2 s power2.in (les deux calques de lampe et toute la scène vers le noir), puis noir #0c0906."
    dawn: "après le pivot : l'écran s'allume en 0,2 s et il est la seule lumière : un halo froid s'ouvre autour de lui en 1,0 s linéaire (un calque d'ombre percé d'un cercle), puis le jour monte de l'écran vers les bords de la carte en 1,2 s (le cercle s'ouvre jusqu'aux bords, le sol passe de #0c0906 à #8a7353, MX.dayHTML de 0 à 1)."
    day: "MX.dayHTML() : lumière douce venue du haut à gauche, bords chauds ; fond #8a7353 sous la carte."
  props:
    description: "aucun accessoire sur la table : la carte, ses maquettes et les objets du récit seulement (le manuel, le cadran, les photos, le téléphone, les articles)."
  subtitle:
    rule: "MX.subHTML(id, [[mot, ''|'box'|'boxstroke'], …], thème) ; chaque mot (.mx-w) entre sur son temps : de opacité 0, y +8, flou 6 → net en 0,14 s, immediateRender false, puis il passe du gris (35 %) à la couleur pleine en 0,2 s. Sortie avant une couture : opacité 1 → 0 et flou 0 → 6 en 0,14 s. Un signe de ponctuation seul se colle au mot d'avant, dans sa boîte quand ce mot est encadré (MX.subHTML le fait), comme dans le film de référence."
  key-word-box:
    look: "petit rectangle jaune #e6ec37, angles nets (rayon 3 px), qui déborde du mot de 0,14 em (le mot encadré garde 0,08 em de marge de chaque côté) ; le mot passe en #111111. Jamais une boîte noire."
    motion: "la boîte (.mx-box-bg) se trace de gauche à droite (scaleX 0 → 1, 0,16 s power3.out), 0 à 2 images avant le mot."
  peak-stroke:
    look: "trait jaune fin (.mx-stroke, 6 px, bord sombre d'un pixel pour se lire sur le papier) sous LE mot clé ; seulement « trois lignes », « renflouer », « drames »."
    motion: "se dessine de gauche à droite (scaleX 0 → 1, 0,4 s power2.out) pendant que le mot est dit."
  type-moment:
    look: "MX.typeHTML(id, mots) : la phrase du pivot centrée sur le noir, 84 px, mot par mot, « renflouer » en boîte avec son trait."
  end-card:
    look: "à l'image du blog (MX.endCardHTML(uid, 'assets/img/')) : fond rayé #070707/#161616, le bandeau du blog (assets/img/blog-bandeau.png, 1080 × 395, son titre MARINE 1939 jaune), la phrase « Les navires, les matériels et les hommes de la flotte française de 1939. », UN bouton « Montez à bord » (Archivo Black, jaune, ombre dure), l'adresse « marine1939.blogspot.com ». Le curseur arrive d'un seul mouvement et clique directement sur le bouton : le bouton à 0,97 et en trois couleurs (#cdd32c enfoncé 0,05 s, #f5f8a8 relâché 0,1 s, puis son jaune), trois anneaux jaunes qui s'ouvrent ; puis 2 à 3 s de plan vivant (le bandeau dérive de 4 px/s, la mer de sa photo respire en 1 % d'échelle, un reflet clair passe deux fois le long du bouton, 1,0 s linéaire chacun) avant l'iris (1,5 s power2.in, noir à la dernière image)."
  cursor:
    description: "flèche blanche à contour noir, ombre portée ; arrive en UN mouvement courbe (0,43 s power3.out, x et y sur deux courbes) et clique directement : la flèche à 0,85 et le bouton à 0,97 en 0,05 s, puis retour ; anneaux. Jamais d'hésitation."

negative:
  - "Jamais une maquette sur la terre, même en partie, même une image : positions et chemins de « LE MONDE » seulement, et MX.footprintClear à null."
  - "Jamais de sous-titre en haut à gauche ; jamais plus de 64 px pour la phrase de la voix ; la bande y 890 à 980 ne porte que la phrase (les sondes et le papier de la carte peuvent passer dessous, aucun objet du récit)."
  - "Un seul accent, le jaune du blog ; le magenta seulement pour la route et la rose des vents ; le rouge seulement pour les pertes ; aucune autre teinte hors des vraies photos et du vrai blog."
  - "La marque (le bandeau, le titre MARINE 1939, l'adresse, les photos filigranées du blog) n'apparaît jamais avant la fin du pivot (26,40 s) : elle paraît à 26,62, quand l'écran du téléphone s'allume."
  - "Une transition = UN geste lisible en une seconde (la caméra qui bascule, suit une maquette, recule) ; jamais plusieurs objets qui bougent chacun de leur côté pendant une couture."
  - "Pas d'aller-retour de caméra sur le décor : la nuit, vers le sud-ouest jusqu'à Mers el-Kébir, avec le Strasbourg jusqu'à Toulon (le seul retour, en suivant la maquette qui s'échappe), puis vers l'ouest et le sud ; le jour, du téléphone vers l'ouest et le sud, puis le grand recul et l'est le long de la route jusqu'à Toulon. La caméra est MX.camAt(T), rien d'autre."
  - "Chaque image illustre littéralement sa phrase ; aucun symbole abstrait ; aucune seconde immobile."
  - "Pas d'objet dédoublé : la copie 2D du « 4e » disparaît dans l'image où le tampon de la page apparaît ; le tirage du manuel n'est jamais à l'écran en même temps que la vraie photo du Dunkerque ; le manuel B et le téléphone ne sont jamais là ensemble."
  - "Pas d'Inter, Space Grotesk, Geist, system-ui. Pas d'emoji. Pas d'easing élastique ni back.out ; pas de boucle de respiration infinie ; pas d'hésitation du curseur."
  - "Aucun texte visible hors des lignes Scene, du décor fixe des cartes, des pages du manuel, des vraies interfaces (blog, cartes d'articles) et des légendes des photos écrites ici."
  - "Jamais de tiret cadratin ni demi-cadratin dans un texte visible. Typographie française : espace insécable avant « : », apostrophe ’."

fabrication:
  - "Chaque séquence charge le kit tel quel, dans <div id=\"root\"> : <link rel=\"stylesheet\" href=\"assets/carte/mx-kit.css\">, <script src=\"assets/carte/mx-data.js\"></script>, <script src=\"assets/carte/mx-kit.js\"></script>, puis son propre script. Ne JAMAIS recopier ni modifier ces fichiers : la carte, les maquettes et le manuel sont ainsi identiques au pixel des deux côtés de chaque couture."
  - "BLOQUANT. Tout <template id> interne est placé À L'INTÉRIEUR de <div id=\"root\"> ; tout id commence par une lettre et porte le préfixe de la séquence (p01- à p11-), y compris l'uid passé au kit (MX.chartSVG('med', 'p03-med'), MX.bookHTML('p01-bk', …))."
  - "BLOQUANT. Jamais style.visibility = \"visible\" : toujours \"inherit\"."
  - "BLOQUANT. Tout élément part de opacity: 0 en CSS avant son entrée (sauf ce qui est à l'écran dès la première image de la séquence et qui doit correspondre au handoff_in) ; immediateRender: false sur tout fromTo placé après t = 0."
  - "BLOQUANT. Transforms seulement : x, y, rotation, scale, opacity, filter, et les attributs SVG strokeDashoffset et opacity ; jamais top, left, width, height, letterSpacing."
  - "BLOQUANT. Pas de backdrop-filter ; pas de clip-path polygon interpolé ; aucun flou sur la carte elle-même (4200 u) : le flou de caméra va sur .mx-stage (1920 × 1080), le flou d'objet sur l'objet (maquette, carte d'article, livre)."
  - "BLOQUANT. La bande y 890 à 980 est réservée à la phrase : les cadrages du storyboard la laissent libre de tout objet du récit."
  - "BLOQUANT. Paquet de séquence sous 48 Ko : au plus 2 règles dans « rules: »."
  - "Une seule timeline GSAP en pause. La caméra n'est pas tweenée : UN seul onUpdate calcule T = MX.FRAMES[n][1] + tl.time() et appelle MX.applyCam(monde, MX.camAt(T)), puis pose filter: blur(MX.blurAt(T) px) sur .mx-stage (plus la secousse datée de la séquence, en translate sur .mx-stage). Le Strasbourg suit MX.strasAt(T), le croiseur MX.clAt(T), la route MX.routeDoneAt(T), dans le même onUpdate. Les autres maquettes et objets sont posés dans le monde et animés par leurs propres tweens. Jamais de getBoundingClientRect dans onUpdate."
  - "Une séquence n'est jamais masquée avant son début ; chaque séquence peint son propre fond (.mx-ground) sur un calque class=\"clip\" de toute sa durée, jamais sur #root."
  - "Chemins relatifs à la racine du projet : assets/carte/..., assets/fonts/..., assets/img/... (dans la référence : ../assets/...)."
---

# MARINE 1939 · charte « Le manuel et la carte »

Le texte raconte une flotte puissante, ses deux drames, l'oubli des manuels, puis le blog qui la fait revivre. Le film
est une table d'état-major : une grande carte marine de la Méditerranée sous une lampe, la nuit. Il s'ouvre au plus près
de la page d'un manuel d'histoire posé sur la carte : la date tapée à la machine, la flotte gravée en ligne de file, le
« 4e » jaune qui se pose comme un tampon. La caméra recule et bascule : la flotte gravée est là, en maquettes peintes, au
large de Toulon. On la suit jusqu'à Mers el-Kébir, où la Bretagne sombre dans la carte ; le Strasbourg s'échappe et la
caméra le suit jusqu'à Toulon, où la flotte se saborde, maquette après maquette. Le manuel tombe sur la rade vide,
ouvert sur trois lignes. Le reste sombre aussi : un contre-torpilleur, un cadran optique de passerelle, une photo
d'équipage. La lampe s'éteint. Dans le noir, « Il est temps de renflouer leur histoire. » Un téléphone s'allume là où
était le manuel : c'est le blog. Le jour se lève sur la même carte ; les maquettes remontent là d'où elles étaient
parties, avec la vraie photo de L'Épervier ; le cadran se remonte pièce par pièce ; la vraie photo du Dunkerque et de son
équipage revient. La caméra recule jusqu'à l'Atlantique, la route de la 4e DC file de New York à Toulon, et le film
finit dans le blog lui-même : son bandeau, un bouton, un clic.

Toutes les durées et tous les temps sont en secondes avec un point décimal dans le storyboard (ex. 5.82) ; ce texte
utilise la virgule en prose.

## LE MONDE (au u près)

**Source unique du code** : `assets/carte/mx-kit.css`, `assets/carte/mx-data.js`, `assets/carte/mx-kit.js`, chargés
tels quels par chaque séquence (section `fabrication`). Toutes les positions ci-dessous sont dans `MX.W` : une séquence
les lit là, ne les recopie pas. `reference/carte.html` charge le même kit et reconstruit l'image du film à n'importe quel
temps : `demo(T)` (T en secondes du film), ou `?t=5.30&guides=1` à l'adresse (la bande du sous-titre est tracée) ; `KEYS`
liste les images clés du storyboard ; une maquette posée à terre y est barrée d'une croix rouge.

### La carte de la Méditerranée occidentale (`MX.chartSVG('med', uid)`)

- 4200 × 3900 u, projection de Mercator (Natural Earth 10 m, ajustée sur 3,5° O à 10,6° E et 34,4° N à 45,2° N) :
  x = 1118,6 + 276,45 × longitude ; la carte va de 4,0° O à 11,1° E. Repère : x vers l'est, y vers le sud, origine au coin
  haut gauche. Villes : Toulon (2758, 802), Marseille (2603, 733), Mers el-Kébir (925, 3451), Oran (942, 3461), Alger
  (1965, 3101). Décor fixe (étiquettes, sondes, pli) dans `MX.DECOR.med`.
- Repères (boîtes englobantes des îles, u) : Majorque x 1768 à 2080, y 1966 à 2217 ; Minorque x 2170 à 2317, y 1926 à
  2021 ; Ibiza x 1454 à 1567, y 2271 à 2373 ; Corse x 3481 à 3761, y 841 à 1457 ; Sardaigne x 3367 à 3835, y 1495 à 2361.

| Station (`MX.W`) | Position (u) | Vie | Séquences |
|---|---|---|---|
| `BOOK_A` le manuel A, pages 214-215 | coin (780, 120), largeur 1250, -8° ; tampon « 4e » au centre de page (1540, 640) | tout le film, sur la France | 1 à 10 |
| `LINE` la ligne de 1939, cap au sud-ouest (-30°) | cuirassé (2700, 1030) 230 ; cuirassé (2480, 1150) 230 ; croiseur lourd (2285, 1262) 200 ; contre-torpilleurs (2120, 1360) et (1975, 1446) 170 | les cinq à flot jusqu'au whip de 5.40 ; les deux cuirassés ne sont plus construits une fois hors cadre (ils sont à Mers el-Kébir) ; les trois autres à flot jusqu'à leur naufrage (19.24, 19.54, 19.84) ; les cinq en épaves sous le papier de 29.40 à 30.00, remontées de 30.86 à 32.41 | 1, 2, 3, 4, 5, 7, 8, 9, 10 |
| `MK` l'escadre de Mers el-Kébir, arrière à la jetée | le Dunkerque (934, 3210, -108,5°) ; la Provence (1012, 3155, -111°) ; la Bretagne (1099, 3123, -107°) ; le Strasbourg (1194, 3115, -112°) | dès la séquence 2 ; la Bretagne sombre à 8.22 ; le Strasbourg part à 8.82 (`MX.strasAt`) | 2, 3, 5, 9, 10 |
| `PENCIL_MK`, `LOSS_MK` | « 3·7·40 » à (1290, 2990) ; cercle rouge (1099, 3123), 129 × 44, -107° | écrits à 6.42 et 8.52, puis restent | 2, 3, 5, 9, 10 |
| `STRAS` le chemin du Strasbourg | (1194, 3115) → (1204, 2945) → (1700, 2700) → (2380, 2290) → (2560, 1700) → (2608, 1250) → (2608, 965) | `MX.strasAt(T)`, 8.82 à 10.33 : il recule, vire, file à l'est des Baléares, s'amarre à Toulon | 2, 3 |
| `TOULON` la flotte amarrée, avant vers le quai | contre-torpilleur (2888, 995, 88°) ; croiseur lourd (2818, 980, 91,5°) ; cuirassé type Bretagne (2748, 990, 89°) ; croiseur léger (2678, 980, 92°) ; le Strasbourg (2608, 965, 88,5°) | dès la séquence 3 ; sabordés à 11.52, 11.72, 11.92, 12.12, 12.32 | 3 |
| `PENCIL_TOULON` | « 27·11·42 » à (2950, 870) | écrit à 9.92, puis reste | 3 à 10 |
| `BOOK_B` le manuel B, pages 216-217 | coin (2440, 987), largeur 1300, 4° (centre (3090, 1420)) ; les trois lignes autour du point de page (820, 640) | tombe à 14.40, retiré dans le noir du pivot | 4, 5 |
| `DIAL` le cadran optique de passerelle | centre (1850, 1720), rayon 110, 8° | posé dès la séquence 5, sombre à 21.48 ; ses pièces remontent à 32.76, il se remonte à 33.87, 34.26, 34.50 | 5, 8, 9, 10 |
| `PRINT` le tirage du manuel | centre (1900, 2700), 420 × 300, -4° | posé dès la séquence 5, sombre à 22.92 | 5 |
| `PHOTO`, `PIN_PHOTO` la photo du Dunkerque | centre-x 1900, haut 2460, image 360 × 390, -3° ; épingle (1898, 2470) | remonte à 35.17 à la place du tirage | 9, 10 |
| `PHONE` le téléphone | centre (3250, 1250), largeur 330, -10° | posé dans le noir du pivot, là où était le manuel B ; s'allume à 26.62 | 7, 8, 10 |
| `CARD_EPERVIER`, `PIN_EPERVIER` | centre-x 2420, haut 1420, 456 × 300, -3° ; épingle (2410, 1424) | se pose à 32.36 | 8, 9, 10 |
| `CARD_DIAL`, `PIN_DIAL` l'article « Les cadrans optiques » | coin (1960, 1880), largeur 520, 3° ; épingle (2220, 1874) | se pose à 33.16 | 8, 9, 10 |

Une carte d'article, une photo ou un livre peut se poser sur la terre ; une maquette jamais.

### La carte de l'Atlantique (`MX.chartSVG('atlantic', uid)`, séquence 10)

- 4800 × 2100 u, même projection (Natural Earth 50 m, de 88° O à 40° E) : x = 3300 + 37,5 × longitude. Villes : New York
  (525, 1121), Gibraltar (3099, 1340), Toulon (3522, 999). Décor fixe dans `MX.DECOR.atlantic` : « NEW YORK »,
  « GIBRALTAR » (au nord du détroit), « OCÉAN ATLANTIQUE » (centré en (2025, 793), entre les deux cartes d'articles), la rose des vents (1612, 504), au large de Terre-Neuve : tous au nord de la route, pour ne jamais passer dans la bande du sous-titre.
- **La carte de la Méditerranée posée dessus** : `MX.medSheetHTML(uid, objets)` est une feuille placée par
  `MX.MED_ON_ATL` = (k 0,135648 ; x 3148,27 ; y 890,50) : un point (x, y) de la Méditerranée est en (0,135648 x + 3148,27 ;
  0,135648 y + 890,50) sur l'Atlantique (`MX.medToAtl`), et la même vue de caméra s'écrit `MX.camToAtl(cam)`. Les objets
  de la Méditerranée se mettent DANS la feuille, à leurs coordonnées de `MX.W` : la première image de la séquence 10 est
  ainsi identique à la dernière de la séquence 9. La feuille a un bord clair et une ombre (`.mx-sheet`).
- Route de la 4e DC (`MX.W.ROUTE`, vérifiée en mer à 4 u de marge, détroit et entrées de ports exceptés) : New York → les
  Narrows → Sandy Hook → (975, 1175) → (1612, 1233) → au sud de Santa Maria (2250, 1334) → (2850, 1346) → le milieu du
  détroit (3090, 1348) → (3225, 1328) → au sud des Baléares (3375, 1235) → à leur est (3495, 1175) → l'approche
  (3524, 1006) → Toulon. Longueur 3214 u. La part faite au temps T : `MX.routeDoneAt(T)`.
- La maquette de croiseur léger de la 4e DC (cl, 250 u) : `MX.clAt(T)`, de la distance 420 (932, 1171), au large de New
  York, où elle remonte à 38.40, à la distance 2150 (2651, 1342), au large de Gibraltar, où elle s'arrête à 40.60 ; elle ne
  passe jamais le détroit.
- Articles : « La 4ème DC à New York » coin (595, 481), -4°, épingle (875, 469) ; « Les épaves de Toulon » coin (2902, 299),
  3°, épingle (3182, 287). Cercle rouge de Toulon : (3522, 999), 70 × 50 u, -10°.

### La règle des navires en mer

`MX.footprintClear(carte, type, x, y, longueur, angle, marge = 18)` teste 27 points de l'empreinte de la coque contre le
trait de côte et renvoie le premier point à terre, ou null ; `MX.checkAtSea(carte, maquettes)` renvoie les fautives. Les
stations de `MX.W` sont vérifiées ainsi, et les deux chemins à chaque image (`MX.strasAt` de 8.82 à 10.33,
`MX.clAt` de 38.40 à 41.00, au 1/240 s). Une maquette qui bouge ne quitte pas son chemin ; une maquette qui sombre ou
remonte reste à sa place.

## CAMÉRA

- `cam(x, y, s, tilt, rz)` : le point (x, y) de la carte (u) est à l'ancre écran (960, 470), à l'échelle s (px par u),
  la carte inclinée de tilt degrés (rotateX : le bas de l'image est plus proche) et tournée de rz degrés dans son plan.
  Perspective 1600 px vue depuis (960, 400) (`MX.STAGE`). `MX.project(cam, x, y)` donne la position écran d'un point.
- **Une seule partition pour tout le film** : `MX.SCORE` (segments en temps du film) et `MX.CAMS` (les cadrages nommés).
  `MX.camAt(T)` rend la caméra au temps T du film, ou null (le noir du pivot de 23.37 à 26.40, la carte de fin après
  42.36) ; avant 37.90 dans le repère de la Méditerranée, de 37.90 à 42.36 dans celui de l'Atlantique. `MX.blurAt(T)` rend
  le flou de caméra (px, 14 au plus), calculé sur le déplacement de l'image d'une image à l'autre. `MX.FRAMES` donne le
  début de chaque séquence : T = `MX.FRAMES[n][1]` + temps local.
- Modes des segments : lerp (`MX.lerpCam`, l'échelle en logarithme), in / follow / out (la caméra prend, suit puis lâche le
  Strasbourg, net dans sa propre scène sans flou), zoom (le grand recul de 37.40 à 38.60 : l'échelle en logarithme, le
  point de départ reste à l'image), curve (le centre suit une courbe qui garde le croiseur au milieu du cadre). Courbes :
  celles de GSAP, et whip(us) qui accélère jusqu'à us et freine ensuite, sans saut de vitesse : la couture tombe en us.
- **Gros plan sur une page** : la caméra met un point de page au centre (`MX.bookPoint`) avec rz = -rotation du livre ;
  à l'échelle 1920 / (largeur du livre / 2), une unité de page fait un pixel.
- **Flou** : `MX.blurAt(T)` sur `.mx-stage` seulement ; les objets portent leur propre flou (arrivée, naufrage,
  profondeur). **Secousses** : datées dans le storyboard, en translate sur `.mx-stage` (3 à 6 px, 0,1 à 0,12 s).
- **Passage de relais (règle absolue)** : chaque séquence commence EXACTEMENT dans l'état où la précédente s'arrête ; la
  caméra y est la même courbe, et le storyboard écrit l'état du monde deux fois à l'identique (`handoff_out` de N,
  `handoff_in` de N+1). Aucun élément ne naît ni ne meurt dans les 2 images autour d'une couture.

### Cadrages nommés (`MX.CAMS`)

| Nom | Ce qu'on voit | cam |
|---|---|---|
| A0, A1 | la page 215 au plus près (début et fin de la dérive) | (1652.0, 235.7, 3.256, 0, 8), (1691.2, 234.1, 3.026, 0, 8) |
| B | le manuel A sur la carte de nuit, la ligne de 1939 au large de Toulon | (2080, 1070, 0.95, 46, 0) |
| MK, MK2 | l'escadre amarrée à Mers el-Kébir | (1066, 3305, 1.40, 46, 0), (1090, 3285, 1.46, 46, 0) |
| T1, T2 | la flotte amarrée dans la rade de Toulon | (2748, 1090, 1.50, 46, 0), (2762, 1102, 1.54, 46, 0) |
| BV, BV2 | le manuel B tombé sur la rade | (3040, 1440, 0.82, 40, 0), (3048, 1432, 0.84, 40, 0) |
| PG, PG2 | les trois lignes de la page 217 | (3382.0, 1223.6, 1.55, 34, -4), (3385.3, 1225.8, 1.57, 34, -4) |
| V5a à V5f | la ligne qui sombre, le cadran, le tirage | (2400, 1450, 0.80, 44, 0) … (1978, 2622, 1.02, 44, 0) |
| PH1, PH2 | le téléphone | (3110, 1280, 1.06, 25, 0), (3060, 1290, 1.00, 28, 0) |
| L1, L2 | la ligne qui remonte | (2480, 1250, 1.15, 42, 0), (2260, 1480, 1.18, 42, 0) |
| D1, D2 | le cadran remonté et son article | (1990, 1840, 1.20, 40, 0), (1975, 1860, 1.22, 40, 0) |
| DK1, DK2, CR1, CR2 | la photo du Dunkerque, puis son équipage | (1900, 2700, 1.30, 26, 0) … (1998, 2763, 1.87, 24, 0) |
| AO | l'Atlantique entier, New York à gauche, Toulon à droite | (2050, 1010, 0.565, 22, 0) sur l'Atlantique |
| TL, TL2 | la Méditerranée, Toulon et son article | (3250, 853.4, 0.74, 26, 0), (3258, 855.4, 0.76, 26, 0) sur l'Atlantique |
| CARD, CARD2 | le corps noir de l'article « Les épaves de Toulon », plein cadre | (3386.7, 698.9, 22 puis 26, 0, -3) sur l'Atlantique |

Contrôles faits sur toute la partition : la carte couvre tout le cadre à chaque image, sauf en séquence 4 où le coin haut
droit montre le bord de la table dans l'ombre de la lampe ; aucun objet du récit ne s'arrête dans la bande du sous-titre
(il ne fait qu'y passer pendant un mouvement) ; les objets principaux restent à 90 px au moins des bords aux images clés.

## TEXTE

- **Sous-titre** (la voix) : en bas au centre, 62 px, 45 signes au plus par morceau (une phrase plus longue se découpe en
  morceaux qui se remplacent), mot par mot sur ses temps LOCAUX ; thème `.paper` quand le manuel est dessous, `.night` sur
  la carte de nuit, `.day` sur la carte de jour.
- **Une mise en valeur par phrase**, nommée dans le storyboard : [boîte : …] (la boîte jaune) ; [trait : …] (trait jaune
  sous la boîte) seulement pour les trois pics : « trois lignes », « renflouer », « drames ». Un groupe encadré de
  plusieurs mots (« Mers el-Kébir », « un par un ») entre d'un bloc sur son premier mot ; dans un morceau qui porte
  plusieurs boîtes (« Ses navires. Ses matériels. Ses hommes. »), une seule est allumée à la fois : la précédente se
  retire vers la droite (scaleX 1 → 0, 0,12 s) quand la suivante se trace.
- **Le texte du monde** remplace le sous-titre quand il dit les mots de la voix : « SEPTEMBRE 1939 » se tape sur la page
  (0,04 à 1,96) ; « MARINE 1939 » est le titre du bandeau du blog (42,82) ; « Montez à bord » est le bouton (45,00).
- **Moment typographique** : le pivot seulement (séquence 6), la phrase centrée sur le noir, 84 px, mot par mot.

## SON (le mix se fera sur l'image)

Le mix sera verrouillé à l'étape 5 (musique CC0 et bruitages de `.claude/skills/media-use/audio/assets/sfx/`) : l'image
ne bouge pas pour le son. Intention : une musique de tension de 0 au pivot, avec une montée dans les 3 s qui précèdent
« renflouer » et un impact grave quand la lampe s'éteint ; le silence du pivot ; la musique d'élan qui attaque sur
« MARINE » (27,16) et s'éteint en fondu sur la carte de fin. Bruitages sur les gestes : frappe de machine à écrire
(la date), tampon (« 4e »), souffle (bascule, suivis), plouf sourd (chaque maquette qui sombre, le manuel qui tombe),
crayon (les dates), clic (le bouton). Chaque séquence liste ses bruitages en temps locaux.
