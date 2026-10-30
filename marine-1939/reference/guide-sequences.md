# Guide des séquences de MARINE 1939 (pour le sous-agent qui construit une séquence)

Ce guide fait partie de la mission de chaque sous-agent. Il complète trois documents, qui restent prioritaires :
- le contrat `.hyperframes/frame-packets/_role.md` ;
- le paquet de la séquence ;
- `frame.md`.

La séquence pilote `compositions/frames/01-manuel.html` a été construite et vérifiée avec ces règles. C'est le modèle
du squelette : copier sa structure, pas son contenu (la page, la date, le « 4e »).

Tous les chemins partent de `/home/user/Motion_design_Hyperframes/marine-1939/`.

## 1. Le squelette (celui du pilote)

- **Le fichier** est un seul `<template>`. Dedans, la racine
  `<div id="root" data-composition-id="<id>" data-width="1920" data-height="1080" data-duration="<D>">` contient, dans
  cet ordre :
  1. `<link rel="stylesheet" href="assets/carte/mx-kit.css">` ;
  2. un `<style>` avec un `@font-face` par police nommée dans le fichier (fichiers de `assets/fonts/`) et le style de
     `#root` ;
  3. les clips ;
  4. les scripts, dans cet ordre : `https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js`,
     `assets/carte/mx-data.js`, `assets/carte/mx-kit.js`, puis le script de la séquence dans une IIFE.

  Le moteur charge les scripts dans l'ordre et attend chacun. Ne jamais copier ni modifier le kit.
- **Le sol et la scène** : un clip plein temps `<div id="pNN-ground" class="clip mx-ground" data-start="0"
  data-duration="<D>" data-track-index="0">`. Il contient `.mx-stage` (le cadre 1920 × 1080, sa perspective), puis la
  **secousse** `#pNN-shake` (position absolue, 1920 × 1080, `transform-style: preserve-3d`), puis `.mx-world`.
  - Une secousse est un `x` ou un `y` de `#pNN-shake` : l'image bouge dans le cadre, les bords restent pleins.
  - Ne jamais secouer `.mx-stage`, qui découvrirait le sol noir.
  - Ne jamais animer `.mx-world` avec GSAP.
- **Au-dessus de la scène**, des calques 2D, chacun un clip plein temps, avec un `data-track-index` croissant :
  les lumières, les copies qui arrivent de la caméra, le sous-titre, puis `.mx-grain` tout en haut.
- **La caméra** : une fonction `render(T)`, T en **temps du film**, appelée par UN seul tween :
  - `render(T)` fait :
    - `MX.applyCam(world, MX.camAt(T))` ;
    - le flou de `.mx-stage`, `filter: blur(MX.blurAt(T) px)` si le flou dépasse 0,3, sinon `none` ;
    - le décalage du grain, tiré du numéro d'image `Math.round(T * 30)` ;
    - tout ce qui suit la partition : le Strasbourg `MX.strasAt(T)`, le croiseur `MX.clAt(T)`, la route
      `MX.routeDoneAt(T)`.
  - Le tween va de `T0` à `T0 + D` (`ease: "none"`). `T0` est le début de la séquence (`MX.FRAMES`, deuxième valeur).
  - Il porte `onUpdate: render` **et** `modifiers: { t: v => { render(+v); return v; } }` : un saut pile à la fin du
    timeline ne déclenche pas `onUpdate`.
  - Appeler `render(T0)` avant d'enregistrer le timeline : c'est la première image, `handoff_in`.
- **Les tweens** :
  - un seul timeline `gsap.timeline({ paused: true })`, enregistré dans `window.__timelines["<id>"]` ;
  - l'aide `ft(cible, de, vers, à)` du pilote : un `fromTo` avec `immediateRender: false` ;
  - tout élément absent à t = 0 est caché en CSS ;
  - `tl.set({}, {}, D)` à la fin.
- **Le sous-titre** : `MX.subHTML(id, [[mot, ""|"box"|"boxstroke"]…], thème)`, animé par l'aide `words()` du pilote.
  - Chaque mot entre 0,06 s avant son repère : opacité, y +8 et flou 6, net en 0,14 s.
  - Il entre en gris (35 %), puis passe à la couleur pleine en 0,2 s.
  - La boîte se trace 0,066 s avant son mot.
  - La sortie se fait en 0,14 s.
  - Couleurs des thèmes : `.night` #f4eddd, `.paper` #1b1a17, `.day` #1d1b18, mot encadré #111111. Pour un changement
    de thème, animer la couleur et l'ombre du texte entre les valeurs de `mx-kit.css` (le pilote le fait de 5.05 à 5.25).
  - **Une seule boîte allumée à la fois** : quand la boîte suivante se trace, la précédente se retire vers la droite,
    0,1 s avant le mot suivant encadré. Elle passe en `scaleX` 1 → 0 en 0,12 s, avec
    `transform-origin: 100% 50%`, et son mot reprend la couleur de la ligne.
  - Un signe de ponctuation qui suit un mot encadré est dans sa boîte : le kit l'y met.
  - Le trait d'un pic (`[trait : …]`) se dessine sous le mot, en `scaleX` 0 → 1 en 0,4 s.

## 2. Le temps et le monde

- **Temps du film** : T = T0 + temps local. Les tableaux `EV` (événements) et `SUBS` (sous-titres) de
  `reference/carte.html` sont en temps du film. Le paquet donne les temps locaux. Les deux disent la même chose.
- **Ce qui existe dans la séquence** : exactement ce que `demo(T)` de `reference/carte.html` dessine pour T dans
  [T0, T0 + D]. Ce sont les blocs `buildMed`, `buildAtl`, `endCard`, les lumières et le sous-titre de `demo`.
  - Chaque objet est construit une fois, puis montré ou caché par des tweens à ces temps.
  - Un objet qui sombre finit à l'opacité 0 ; un objet qui naît pendant la séquence commence caché.
- **Les positions** :
  - les objets fixes sont aux places de `MX.W`, rien d'autre ;
  - les objets qui bougent suivent `MX.strasAt(T)`, `MX.clAt(T)` et `MX.routeDoneAt(T)`.
  - Règle bloquante de l'auteur : une maquette est toujours sur la mer, donc jamais ailleurs que là.
- **Un objet posé sur la carte** est un élément `.mx-on` placé une fois avec `gsap.set(el, {x, y, rotation})`, son
  HTML du kit dedans. On anime son opacité, son échelle et son filtre, ou ceux de ses enfants. Exemple :
  `MX.modelHTML(type, longueur, id)` pour une maquette.
- **Les gestes du monde**, avec le bloc de `carte.html` qui les montre :
  - sombrer : `sinkState` (frame.md, `model.sink`) ;
  - remonter : `riseState` (`model.rise`) ;
  - les ronds dans l'eau : `ripples`. L'ensemble grandit de ×1 à ×1,35 et s'efface (opacité 0,85 → 0) en 1,0 s
    linéaire, toutes ses ellipses ensemble ;
  - se poser en arrivant de la caméra : `land`, ×1,2, flou 8, 0,2 s ;
  - la date au crayon : `MX.pencilSVG`, les lettres `.mx-pc` ;
  - le cercle rouge : `MX.lossRingSVG`, `strokeDashoffset` depuis `data-len`.

## 3. Les courbes

`powerN` vaut u^N dans tout le projet : storyboard, frame.md, kit et référence. Dans GSAP, écrire `power(N-1)` :
- « 0,2 s power2.in » (sombrer) donne GSAP `power1.in` ;
- « power3.out » donne GSAP `power2.out` ;
- `expo.out` et `sine.inOut` sont les mêmes.

La caméra suit déjà ces courbes dans `MX.camAt` : il n'y a rien à convertir pour elle.

## 4. Les pièges relevés sur le pilote

- **Éléments du kit déjà transformés** : ne jamais animer la transformation d'un élément du kit qui en porte déjà une.
  - Le livre (`#<u>-book`, rotation CSS) et les groupes SVG à attribut `transform` (comme `#<u>-stamp`) en portent
    une.
  - Les envelopper dans un `div` ou un `<g>` inséré au démarrage, et animer l'enveloppe (`svgOrigin` pour le SVG).
  - Exemple : le manuel B qui tombe (séquence 4) est une enveloppe autour du livre.
- **`<tspan>`** : il ne prend ni transformation ni filtre.
- **Pendant le rendu** : jamais de `getBoundingClientRect` dans `render` ni dans un `onUpdate`. Mesurer une fois au
  démarrage.
- **Le Strasbourg qui s'échappe** (8.82 à 10.33, séquences 2 et 3) est dans sa propre seconde scène : un `.mx-stage`
  sans flou, avec son `.mx-world` qui ne contient que lui. Les deux scènes ont la même caméra :
  `MX.applyCam(world2, MX.camAt(T))` dans `render`. Le bloc « le Strasbourg qui s'échappe » de `carte.html` le montre.
  Hors de cet intervalle, il est dans la scène commune, à son poste.
- **Séquence 10** : le monde est la carte de l'Atlantique (`MX.chartSVG("atlantic", uid)`). La carte de la Méditerranée
  y est posée en feuille (`MX.medSheetHTML(uid, inner)`), avec tous ses objets dedans, aux places de `MX.W` en
  coordonnées de la Méditerranée. Dès 37.90, `MX.camAt(T)` est dans le repère de l'Atlantique.
- **Couture** : la première image est `handoff_in`, la dernière est `handoff_out`. Rien ne naît ni ne meurt dans les
  deux images autour d'une couture.
- **La vérification de mise en page de HyperFrames** (`npx hyperframes check`, lancée par l'orchestrateur) audite tout
  texte visible.
  - Le kit marque déjà comme décor le texte de la carte, celui des pages du manuel et les dates au crayon
    (`data-layout-ignore`), ainsi que ses calques de lumière (`data-layout-allow-occlusion`).
  - Vos propres calques qui couvrent le monde exprès portent `data-layout-allow-occlusion` : la lumière de la page, le
    halo, le voile d'ombre, le noir de la lampe qui s'éteint.
  - Des copies de texte superposées exprès portent `data-layout-allow-overlap`, sur chaque bloc de texte : ce marqueur
    ne s'hérite pas.
  - Le calque du sous-titre porte `data-layout-allow-caption-zone`, comme dans le pilote.

## 5. Vérifier avant de finir

- **Voir la séquence seule** :
  `python3 reference/framecheck.py compositions/frames/<id>.html <dossier temporaire> <temps locaux…>` la monte seule
  dans Chromium, pose son timeline à chaque temps, enregistre une image par temps et affiche les erreurs JavaScript.
  Ce n'est pas la CLI HyperFrames, son usage est permis. Il n'écrit que dans le dossier donné.
- **Les rendus de référence** de vos images clés, en temps du film :
  `ONLY=F<n> GUIDES=0 python3 reference/render-keys.py <dossier temporaire>`.
- **À comparer** :
  - l'image 0.00 avec `handoff_in` ;
  - chaque image clé avec sa référence ;
  - l'image D - 0.02 avec `handoff_out` ;
  - aucune erreur JavaScript.
