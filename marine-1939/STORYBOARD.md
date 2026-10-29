---
format: 1920x1080
duration: 50.10s
message: "Dans les manuels, la flotte française de 1939 tient en trois lignes ; MARINE 1939 fait revivre ses navires, ses matériels et ses hommes : montez à bord."
arc: Accroche (le manuel) → Douleur (Mers el-Kébir, Toulon, trois lignes, le reste a sombré) → Pivot (renflouer) → Solution (le blog, un par un, pièce par pièce, ses hommes) → Payoff (de New York à Toulon) → CTA
audience: passionnés d'histoire maritime (France), lecteurs de monographies et de revues navales, collectionneurs, maquettistes
mode: autonomous
captions: disabled
voice: "assets/audio/voix-montage.wav (50.10 s), minutage mot par mot dans onsets.json ; le mix (voix, musique CC0, bruitages) sera monté sur l'image à l'étape 5, de 0 à 50.10"
direction: "D · Le manuel et la carte (DIRECTIONS.md), choisie par l'auteur : le livre, puis la carte ; les navires toujours sur la mer"
styleframes: "styleframes/D1.html (4.40 s), D2 (5.30 s), D3 (8.90 s), D4 (15.20 s), D5 (29.40 s), D6 (32.30 s), D7 (39.30 s), D8 (46.60 s)"
patterns: ../patterns/STORYBOARD-CRAFT.md (dont les réglages retenus), ../patterns/PATTERNS.md
---

## Video direction

- **Un seul monde** (frame.md) : une table d'état-major, une carte marine de la Méditerranée occidentale sous une lampe, la nuit ; la même carte au jour après le pivot ; en séquence 10, cette carte est une feuille posée sur une carte de l'Atlantique. Tout le code du monde est dans le kit : `assets/carte/mx-kit.css`, `assets/carte/mx-data.js`, `assets/carte/mx-kit.js`, chargés tels quels par chaque séquence (jamais recopiés). Les positions sont dans `MX.W`. `reference/carte.html` reconstruit l'image du film à n'importe quel temps : `demo(T)`, T en secondes du film ; `KEYS` liste les images clés ci-dessous.
- **La caméra est UNE partition pour tout le film** : `MX.SCORE` dans le kit. Chaque séquence calcule T = début de la séquence (`MX.FRAMES`) + temps local et appelle `MX.applyCam(monde, MX.camAt(T))` et `filter: blur(MX.blurAt(T) px)` sur `.mx-stage`. Les deux côtés d'une couture lisent la même courbe : le passage de relais est exact par construction. Une séquence n'invente aucun mouvement de caméra ; elle ajoute seulement les secousses datées ci-dessous (en translate sur `.mx-stage`).
- **Coutures invisibles** : toutes les séquences s'enchaînent en `cut`. Chaque couture tombe au sommet du flou d'un mouvement (5.82, 9.32, 13.35, 17.84, 30.41, 35.07, 37.90), dans le noir du pivot (23.37, 26.40) ou dans le noir uni de l'article du blog (42.36) ; le `handoff_out` de N est recopié mot pour mot dans le `handoff_in` de N+1. Aucune coupe franche, aucun fondu de montage : le noir du pivot est la lampe qui s'éteint, puis l'écran du téléphone qui s'allume.
- **Règle de l'auteur, bloquante** : une maquette est toujours sur la mer, à chaque image : `MX.footprintClear(carte, type, x, y, longueur, angle)` renvoie null. Les maquettes ne sont qu'aux positions de `MX.W` ; les deux seules qui se déplacent suivent `MX.strasAt(T)` (le Strasbourg, 8.82 à 10.33) et `MX.clAt(T)` (le croiseur de la 4e DC, 38.40 à 40.60), vérifiés à chaque image dans le kit. Une maquette qui sombre ou remonte ne bouge pas de sa place.
- **Texte** (lisible sans le son) : la phrase de la voix en sous-titre `.mx-sub` en bas au centre (62 px, bande y 890 à 980 qui ne porte rien d'autre), mot par mot sur ses temps LOCAUX, 45 signes au plus par morceau ; thème `.paper` quand une page du manuel est dessous, `.night` sur la carte de nuit, `.day` sur la carte de jour. Une mise en valeur par phrase : [boîte : …] (la boîte jaune) ; un groupe encadré de plusieurs mots entre d'un bloc sur son premier mot ; quand une phrase de plusieurs phrases courtes a plusieurs boîtes, une seule est allumée à la fois (la précédente se retire vers la droite en 0,12 s quand la suivante se trace). Le texte du monde remplace le sous-titre quand il dit les mots de la voix : « SEPTEMBRE 1939 » se tape sur la page (séquence 1), « MARINE 1939 » est le titre du bandeau du blog et « Montez à bord » est le bouton (séquence 11). Un seul moment typographique : le pivot (séquence 6), centré, 84 px.
- **Pics** : trois traits jaunes seulement, [trait : …] sous « trois lignes » (17.10), « renflouer » (24.48), « drames » (41.56). Jamais de mot géant ni de grosse boîte.
- **Une seule chose à regarder** : la caméra isole le sujet de chaque phrase (un navire, une page, un cadran, une photo) et ne montre l'ensemble qu'à deux moments où il a du sens (la flotte de 1939 à 5.30, l'Atlantique à 38.60) ; jamais d'aller-retour : vers le sud-ouest jusqu'à Mers el-Kébir, avec le Strasbourg jusqu'à Toulon, puis vers l'ouest et le sud ; après le pivot, du téléphone vers l'ouest et le sud, puis le grand recul et l'est jusqu'à Toulon.
- **Vraies interfaces** : la page d'accueil mobile du blog (capture de l'auteur, `assets/img/blog-accueil-mobile.png`), son bandeau (`blog-bandeau.png`), trois articles dans le style du blog avec leurs vrais titres et leurs vraies dates, les photos de la collection de l'auteur (L'Épervier, le Dunkerque à quai, la 4e DC, les épaves de Toulon), filigrane d'origine compris ; l'article « Les cadrans optiques » (dimanche 29 janvier 2012, capture de l'auteur) et sa photo du cadran optique avant du Mogador, d'après laquelle le cadran du film est dessiné.
- **Grammaire de mouvement** : deux vitesses : gestes de 1 à 6 images (expo.out, power3.out), dérives linéaires de la partition qui ne s'arrêtent jamais ; la zone 0,3 à 0,9 s est réservée à la caméra (la partition) et au curseur ; tout élément arrive trop grand et flou (×1,2 à ×1,6, flou 4 à 12 px) ou remonte de la carte, puis se pose ; aucune tenue figée ; aucune transition « effet ».
- **Texte visible** : exactement le texte cité dans les lignes Scene, le décor fixe des cartes (`MX.DECOR`), les pages du manuel (`MX.ENGRAVING_TEXT`, `MX.VERSO_TEXT`, `MX.THREE_LINES`), les vraies interfaces et les légendes des photos ; typographie française (« », ’, espace insécable avant « : »), jamais de tiret cadratin ni demi-cadratin.
- **Négatifs** : diaporama (tout à t = 0), écran de veille, maquette posée ou passant sur la terre, objet dédoublé (le « 4e » en vol et le tampon de la page, le tirage et la vraie photo), texte coloré hors de la boîte, mot géant, symbole abstrait, accessoire sans rôle, plusieurs objets qui bougent pendant une couture, curseur qui hésite, la marque avant le pivot.

**MONDE**
- Acte 1, la nuit (0 à 23.37) : la carte de la Méditerranée (4200 × 3900 u) sous la lampe (`MX.lampHTML(960, 480, 980, 580)`), sol #0c0906, grain 6 %. Stations (`MX.W`) : le manuel A ouvert pages 214-215 sur la France (coin (780, 120), largeur 1250, -8°), toute la durée du film ; la ligne de 1939 au large de Toulon (`LINE` : cuirassé (2700, 1030), cuirassé (2480, 1150), croiseur lourd (2285, 1262), contre-torpilleurs (2120, 1360) et (1975, 1446), cap au sud-ouest) ; l'escadre de Mers el-Kébir (`MK`, vers (1066, 3200)) et « 3·7·40 » ; la flotte amarrée à Toulon (`TOULON`, vers (2748, 985)) et « 27·11·42 » ; le manuel B ouvert pages 216-217 sur la rade (coin (2440, 987), largeur 1300, 4°, centre (3090, 1420)) ; le cadran (1850, 1720) ; le tirage du manuel (1900, 2700).
- Le pivot (23.37 à 26.40) : le noir #0c0906 de la lampe éteinte, la phrase.
- Acte 2, le jour (26.40 à 42.36) : la même carte au jour (`MX.dayHTML`, sol #8a7353, grain 5 %) ; le téléphone (3250, 1250), là où était le manuel B ; la ligne de 1939 remontée à ses places, la photo de L'Épervier (centre-x 2420, haut 1420) ; le cadran remonté et l'article « Les cadrans optiques » (coin (1960, 1880)) ; la photo du Dunkerque (centre-x 1900, haut 2460), là où était le tirage. Puis la carte de l'Atlantique (4800 × 2100 u, `MX.chartSVG('atlantic')`) avec la carte de la Méditerranée posée dessus en feuille (`MX.medSheetHTML`, échelle 0,135648) : New York (525, 1121), Toulon (3522, 999), la route de la 4e DC (`MX.W.ROUTE`), « La 4ème DC à New York » (coin (595, 481)), « Les épaves de Toulon » (coin (2902, 299)).
- Acte 3, la fin (42.36 à 50.10) : le blog lui-même (`MX.endCardHTML`) : fond rayé #070707 / #161616, le bandeau, une phrase, un bouton, l'adresse.
- Couleurs de rôle : jaune #e6ec37 (le titre du blog) = le mot clé, les trois pics, le « 4e », le surligneur des trois lignes, la barre des articles, le bouton ; magenta #b3176a = la route et la rose des vents ; rouge #b3241a = les pertes (la Bretagne, Toulon) ; graphite #3a3530 = les dates écrites ; le noir du blog = le blog seul (téléphone, articles, fin).

**SIGNATURES**
- Mécanisme 1, « les ronds dans l’eau » : sombrer (la maquette s'enfonce sur place en deux vitesses : 0,2 s power2.in puis 1,0 s linéaire, ses ronds s'ouvrent) 8.02 la Bretagne, 11.42 à 12.02 les cinq de Toulon, 19.24 à 19.84 les trois de la ligne, 21.48 le cadran, 22.92 le tirage ; remonter (0,2 s expo.out depuis 40 % et flou 6 px, ses ronds s'ouvrent) 30.86 à 32.41 la ligne entière, 32.76 à 32.96 les pièces du cadran, 35.17 la photo du Dunkerque, 38.40 le croiseur de la 4e DC.
- Mécanisme 2, « le crayon » : une date ou une perte s'écrit sur la carte : 6.42 « 3·7·40 », 8.52 le cercle rouge de la Bretagne, 9.92 « 27·11·42 », 16.45 le surligneur des trois lignes, 38.30 à 40.90 la route de New York à Toulon, 41.45 le cercle rouge de Toulon.
- Mécanisme 3, « le tampon » : un objet jaune arrive de la caméra et se pose comme un tampon : 4.34 le « 4e », 44.91 le bouton « Montez à bord » (la rime).
- Registres de texte : sous-titre = mot par mot (opacité 0 → 1, y +8 → 0, flou 6 → 0 en 0,14 s, puis du gris 35 % à la couleur pleine en 0,2 s) ; boîte = se trace de gauche à droite (scaleX 0 → 1, 0,16 s power3.out, 0 à 2 images avant le mot) ; trait = se dessine sous le mot (scaleX 0 → 1, 0,4 s power2.out) ; moment typographique = les mêmes entrées à 84 px, et « renflouer » remonte d'en bas ; texte du monde = frappe à la machine (la date), arrivée de la caméra (le bandeau, le bouton).
- Rimes : la ligne de file de 1939 (5.30) remonte au même endroit, dans le même ordre (31.66 à 32.41) ; le tirage qui sombre (22.92) laisse place à la vraie photo qui remonte au même endroit (35.17) ; le téléphone (26.62) s'allume là où le manuel était tombé (14.40) ; le « 4e » (4.34) et le bouton (44.91) ; le sabordage de Toulon (11.42) et Toulon cerclé de rouge (41.45).

**PARTITION CAMÉRA** (temps du film, `MX.SCORE` ; cadrages nommés `MX.CAMS`) : 0.00 dérive sur la page 215 (A0 → A1) · 4.70 la bascule, recul et inclinaison jusqu'à la carte (B) · 5.40 whip vers le sud-sud-ouest (couture 5.82 au sommet) jusqu'à Mers el-Kébir (MK, 6.62) · 6.62 dérive sur l'escadre · 8.82 la caméra prend le Strasbourg (couture 9.32) · 9.32 suivi · 9.90 elle se pose sur la rade de Toulon (T1, 10.50) · 10.50 dérive · 12.72 elle se relève (couture 13.35) jusqu'au manuel B (BV, 14.25) · 14.25 dérive · 15.56 approche de la page 217 (PG, 17.05) · 17.30 recul vers l'ouest (couture 17.84) (V5a, 19.10) · 19.10 dérive · 20.70 cran vers le cadran · 22.00 cran vers le tirage · 23.17 la lampe s'éteint · 23.37 à 26.40 pas de caméra (noir) · 26.40 dérive sur le téléphone · 29.40 glissé vers l'ouest (couture 30.41) (L1, 30.95) · 30.95 dérive le long de la ligne · 32.50 cran vers le cadran · 34.70 glissé vers le sud (couture 35.07) (DK1, 35.62) · 35.62 dérive · 36.20 de la passerelle à l'équipage (CR1) · 37.40 grand recul jusqu'à l'Atlantique (couture 37.90) (AO, 38.60) · 38.60 vers l'est avec le croiseur, jusqu'à Toulon (TL, 41.40) · 41.40 dérive · 41.90 plongée dans l'article « Les épaves de Toulon » (couture 42.36) · 42.36 à 50.10 la carte de fin dérive en 2D · 48.60 l'iris.

**VOIX** : minutage dans `onsets.json`, rappelé en temps locaux dans chaque séquence. Silences de plus de 0,4 s, chacun écrit comme un plan avec son action : 1.88 à 2.32 (la date se pose, la caméra glisse vers la gravure) · 5.48 à 6.15 (whip vers Mers el-Kébir) · 7.64 à 8.07 (la première gerbe) · 9.06 à 9.59 (le Strasbourg s'échappe) · 11.30 à 11.76 (le premier navire se saborde) · 12.10 à 14.60 (le sabordage finit, la caméra se relève, le manuel tombe) · 17.57 à 18.12 (recul vers l'ouest) · 19.44 à 20.01 (la ligne sombre) · 20.74 à 21.14 (cran vers le cadran, posé sur « Ses ») · 22.03 à 22.48 (cran vers le tirage, posé sur « Ses ») · 23.06 à 23.67 (la lampe s'éteint, noir) · 25.64 à 27.16 (la phrase du pivot tient, puis l'écran s'allume dans le noir) · 30.11 à 30.70 (glissé vers la ligne, le premier navire remonte) · 32.28 à 32.71 (cran vers le cadran, ses pièces remontent) · 34.85 à 35.29 (glissé vers le sud, la photo remonte) · 40.69 à 41.15 (le crayon finit la route) · 41.89 à 42.82 (la plongée dans l'article, le blog paraît) · 44.58 à 45.00 (le bouton se pose) · 45.87 à 50.10 (tenue vivante, iris).

**COUPES** (voix narrative, quota 0 à 4) : aucune. Les deux changements d'acte passent par la lumière du monde : la lampe qui s'éteint (23.17 à 23.37) et l'écran qui s'allume dans le noir (26.62) ; l'entrée dans la carte de fin passe par un objet (le corps noir de l'article de Toulon). Couche de l'orchestrateur (`assemble.sh`) : pas d'éclair (LEAK_AT vide), pas d'iris d'entrée (IRIS_AT vide), pas de lit de papier (PAPER vide) ; l'iris de sortie est dans la séquence 11.

**RYTHME** : douleur (0 à 23.37) 15 plans, 6,4 plans / 10 s ; pivot 1 plan de 3,03 s ; solution et payoff (26.40 à 42.36) 9 plans, 5,6 plans / 10 s ; fin 3 plans. Événements toutes les 0,07 à 0,3 s dans les 3 premières secondes (la frappe), toutes les 0,5 s au plus ensuite.

**SON** (proposition, temps du film ; verrouillé à l'étape 5, l'image ne bouge pas pour le son) : musique de tension de 0 au pivot, montée de 20.40 à 23.17, coupée net par un impact grave quand la lampe s'éteint (23.17) ; silence ; la musique d'élan attaque sur « MARINE » (27.16), s'éteint en fondu de 46.86 à 50.10, sous la voix. Bruitages : frappes de machine à écrire 0.04 à 1.68 · tampon 4.34 · souffles 4.70 et 5.40 · crayon 6.42 à 7.42 · trois coups sourds de salve 7.87, 8.12, 8.37 · plouf grave 8.07 · crayon rouge 8.52 · souffle 8.92 · crayon 9.92 à 10.76 · cinq ploufs sourds 11.47 à 12.07 · souffle grave 12.72 · choc de livre 14.40 · surligneur 16.45, 16.73, 17.01 · souffle 17.30 · trois ploufs 19.29, 19.59, 19.89 · plouf métallique 21.53 · plouf feutré 22.97 · déclic de la lampe 23.17 · NOTIFICATION À DEUX TONS 26.62 (la signature, une seule fois) · souffle 29.40 · pops 30.86, 31.66, 31.93, 32.15, 32.41 · épingle 32.46 · pops 32.76, 32.86, 32.96 · épingle 33.26 · clics mécaniques 33.87, 34.26, 34.50 · pop doux 35.17 · épingle 35.52 · souffle 37.40 · crayon 38.30 à 40.90 · épingles 38.60, 38.85 · crayon rouge 41.45 · whoosh cinématique 41.90 · tampon 44.91 · clic 45.64.

## Frame 1 : Le manuel, la bascule · 0.00 → 5.82

- scene: Au plus près d'une page de manuel d'histoire, « SEPTEMBRE 1939 » se tape à la machine au-dessus d'une flotte gravée en ligne de file ; la gravure se met en route ; un « 4e » jaune arrive de la caméra et se pose comme un tampon ; la caméra recule et bascule : le manuel est posé sur une carte marine de nuit, et la flotte gravée est là en maquettes, au large de Toulon ; whip vers le sud-ouest
- duration: 5.82s
- transition_in: cut
- status: outline
- src: compositions/frames/01-manuel.html
- voiceover: "Septembre 1939. La France entre en guerre avec la quatrième flotte du monde."
- type: hook
- blueprint: zoom-out-workspace-reveal (Adapt)
- focal: la date tapée, puis le « 4e » qui se pose, puis la flotte en maquettes sur la carte
- rules: motion-blur-streak, svg-path-draw
- world: dark
- handoff_in: aucun (ouverture du film) ; première image = cam(1652.0, 235.7, 3.256, 0, 8) = MX.camAt(0) : la page 215 du manuel A au plus près, lumière chaude de la page ; en haut, la ligne vide où la date va se taper ; au milieu, la gravure de la flotte en ligne de file, sans fumée ni vague d'étrave ; l'ombre de la gouttière au bord gauche ; aucun sous-titre ; grain 6 %
- handoff_out: à 5.82 : cam(1633.3, 2054.5, 1.127, 46, 0) = MX.camAt(5.82), flou 13.3 px = MX.blurAt(5.82) sur .mx-stage ; caméra en plein whip vers le sud-sud-ouest (5100 u/s, échelle +80 %/s), segment 5.40 à 6.62 de MX.SCORE ; carte de la Méditerranée de nuit, lampe pleine ; le manuel A ouvert pages 214-215 à sa place (MX.W.BOOK_A), « SEPTEMBRE 1939 » tapé, fumées et vagues de la gravure tracées, tampon « 4e » posé, juste sorti du cadre en haut ; les cinq maquettes de la ligne de 1939 à leurs places (MX.W.LINE), filées au bord haut du cadre ; aucune autre maquette à l'image ; aucun sous-titre ; grain 6 %

Word cues: Septembre@0.04 1939@0.78 La@2.32 France@2.50 entre@2.88 en@3.28 guerre@3.48 avec@3.74 la@4.08 quatrième@4.34 flotte@4.80 du@5.00 monde@5.24

Scene 1 (0.00 à 2.30 s) : P1, « Septembre 1939 » se tape sur la page
  TEXTE ÉCRAN : aucun sous-titre : la voix est écrite dans le monde, « SEPTEMBRE 1939 » tapé à la machine en haut de la page 215 (Space Mono 700, une lettre par tspan .mx-tc de MX.pageEngravingSVG) ; écart synchro (chaque lettre sur la voix).
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.04 « S » frappe (opacité 0 → 1, échelle 1,6 → 1, flou 4 → 0 en 0,05 s ; la page tressaute de 1,5 px vers le bas et revient en 0,06 s) ; même frappe pour E 0.11, P 0.18, T 0.25, E 0.32, M 0.39, B 0.46, R 0.53, E 0.60 ; 0.69 l'espace (le tressautement seul) ; 0.78 « 1 » sur « mille », 1.06 « 9 » sur « neuf », 1.22 la page avance d'un cran vers la gauche (le chariot, 4 px en 0,05 s), 1.38 « 3 » sur « cent trente », 1.68 « 9 » sur « neuf » ; 1.96 la date se pose : son encre passe de 85 % à 100 % en 0,2 s ; 2.00 à 2.30 la caméra glisse vers la gravure.
  PISTE CAMÉRA : MX.camAt(T) : dérive linéaire de 0.00 à 4.70, de A0 (1652.0, 235.7, 3.256, 0, 8) vers A1 (1691.2, 234.1, 3.026, 0, 8) : 26 unités de page par seconde vers la droite, recul de 1,6 %/s ; flou nul.
  COUCHES ET PROFONDEUR : avant-plan : l'ombre de la gouttière et le bombé de la page au bord gauche ; sujet : la date qui se tape ; fond : la gravure et le grain du papier ; couches animées : lettres et papier.
  OBJET-PONT ET VECTEUR : la date reste tapée sur la page tout le film (le manuel A ne quitte jamais la carte) ; vecteur : la dérive vers la droite, vers la gravure.
  SON : une frappe de machine à écrire par lettre, de 0.04 à 1.68 ; un retour de chariot léger à 1.96.
  IMAGE CLÉ : 1.70 : « SEPTEMBRE 1939 » vient d'être tapé en haut de la page jaunie, la flotte gravée en ligne de file au-dessous, l'ombre de la gouttière à gauche.

Scene 2 (2.30 à 4.70 s) : P2, la gravure se met en route, le « 4e » se pose
  TEXTE ÉCRAN : sous-titre .paper en deux morceaux : « La France entre en guerre » (La 2.32, France 2.50, entre 2.88, en 3.28, guerre 3.48), sortie 3.58 à 3.72 ; puis « avec la [boîte : quatrième] flotte du monde. » (avec 3.74, la 4.08, boîte tracée 4.32, quatrième 4.34) ; écart : les fumées montent 0,1 s avant « France », la flotte gravée se met en route sur « entre » (première vague d'étrave 0,02 s après le mot), le « 4e » touche la page sur « quatrième ».
  IMAGE DE DÉPART : la page 215 au plus près, la date tapée, la gravure sans fumée.
  ÉTAPES : 2.40 la fumée du cuirassé se dessine (traits de #p01-…-smoke0, strokeDashoffset 1 → 0, 0,4 s power2.out, comme un trait) ; 2.58 celle du croiseur lourd (smoke1) ; 2.76 celle du contre-torpilleur (smoke2) ; 2.90, 3.02, 3.14 leurs vagues d'étrave se tracent (wake0 à 2, 0,3 s) : la flotte gravée se met en route sur « entre en » ; 3.48 « guerre » ; 3.74 « avec » ; 4.08 le « 4e » arrive de la caméra : copie 2D MX.stamp4eHTML au-dessus de la scène, depuis le haut droit du cadre vers la place du tampon de la page, échelle 1,25 → 1, flou 12 → 0, power2.in en 0,26 s, avec deux échos de traînée (30 % puis 14 % d'opacité, flous 16 et 24 px) ; 4.34 contact : dans la même image, la copie 2D et ses échos disparaissent et le tampon de la page (groupe #p01-…-stamp) apparaît ; il s'écrase (échelle 1,04 → 1 en 0,08 s) et la scène secoue (.mx-stage 4 px vers le bas, retour en 0,12 s).
  PISTE CAMÉRA : la dérive de la scène 1 continue (MX.camAt) ; secousse à 4.34.
  COUCHES ET PROFONDEUR : avant-plan : le « 4e » en vol, énorme et flou (4.08 à 4.34) ; sujet : la gravure qui s'anime, puis le tampon ; fond : le papier ; pic de 3 couches à 4.30 (fumées, « 4e », sous-titre).
  OBJET-PONT ET VECTEUR : la flotte gravée (cuirassé, croiseur lourd, contre-torpilleur en ligne de file) devient, au plan suivant, la ligne de maquettes sur la carte, dans le même ordre ; le « 4e » posé reste sur la page (il reviendra en bouton à la fin).
  SON : un souffle qui monte de 4.08 à 4.34 ; le tampon à 4.34.
  IMAGE CLÉ : 4.30 : le « 4e » jaune, énorme et flou, juste avant de toucher la page, au-dessus de la flotte gravée qui fume ; « avec la [quatrième] » en bas.

Scene 3 (4.70 à 5.82 s) : P3, la bascule : le manuel est posé sur la carte, la flotte est là
  TEXTE ÉCRAN : « avec la [quatrième] flotte du monde. » continue : flotte 4.80, du 5.00, monde. 5.24 ; le sous-titre passe du thème .paper au thème .night de 5.05 à 5.25 (couleur et ombre en 0,2 s) quand la carte de nuit arrive sous lui ; sortie 5.56 à 5.70 ; écart : la bascule part 0,1 s avant « flotte », la ligne entre dans le cadre entre « du » et « monde » (le recul montre le monde).
  IMAGE DE DÉPART : la page 215 au plus près, le tampon posé.
  ÉTAPES : 4.46 à 4.70 le tampon posé se lit, la dérive continue ; 4.70 la caméra recule et bascule (MX.camAt) : la page devient le manuel A entier, ouvert sur la carte ; 4.70 à 5.70 la lumière de la page s'efface pendant que la lampe de nuit (MX.lampHTML(960, 480, 980, 580)) monte (1,0 s linéaire) ; 4.80 « flotte » ; 5.00 « du » ; 5.05 le manuel entier paraît, posé sur la carte de nuit ; 5.10 la ligne de 1939 entre dans le cadre par la droite, cinq maquettes (MX.W.LINE : cuirassé, cuirassé, croiseur lourd, deux contre-torpilleurs) en ligne de file au large de Toulon, cap au sud-ouest, dans l'ordre de la gravure, toutes à l'image à 5.20 ; 5.22 la lumière de la lampe gagne la ligne de la tête à la queue (chaque maquette passe de 70 % à 100 % de luminosité en 0,2 s, 0,06 s d'écart) ; 5.24 « monde. » ; 5.40 départ du whip ; 5.56 le sous-titre sort ; 5.82 sommet du flou.
  PISTE CAMÉRA : 4.70 à 5.40 bascule de A1 vers B (2080, 1070, 0.95, 46, 0), power3.inOut, flou jusqu'à 14 px (le plafond) de 4.95 à 5.05 ; 5.40 à 5.82 début du whip vers Mers el-Kébir (segment 5.40 à 6.62, courbe whip(0.3443) : la caméra accélère jusqu'à la couture), flou 0 → 13,3 px.
  COUCHES ET PROFONDEUR : sujet : la ligne de maquettes et leurs ombres portées ; milieu : le manuel ouvert en haut à gauche ; fond : la côte de Provence, « TOULON », « MARSEILLE », le golfe du Lion, la vignette sombre de la lampe.
  OBJET-PONT ET VECTEUR : la ligne de maquettes (l'objet-pont de la gravure) ; vecteur : whip vers le sud-sud-ouest, repris à l'entrée de la séquence 2.
  SON : le souffle de la bascule de 4.70 à 5.40 ; un whoosh de 5.40 à 5.90.
  IMAGE CLÉ : 5.30 : le manuel ouvert posé sur la carte de nuit en haut à gauche, le « 4e » sur sa page ; les cinq maquettes en ligne de file au large de Toulon sous la lampe ; « avec la [quatrième] flotte du monde. » en bas.

## Frame 2 : Mers el-Kébir · 5.82 → 9.32

- scene: Le whip freine sur Mers el-Kébir : quatre maquettes amarrées côte à côte, l'avant vers la terre ; « 3·7·40 » s'écrit au crayon ; trois gerbes, la Bretagne sombre dans la carte et se fait cercler de rouge ; le Strasbourg recule, vire et s'échappe, la caméra le prend
- duration: 3.50s
- transition_in: cut
- status: outline
- src: compositions/frames/02-mers-el-kebir.html
- voiceover: "Juillet 1940. Mers el-Kébir."
- type: pain_point
- blueprint: camera-journey (Adapt)
- focal: l'escadre amarrée, puis la Bretagne qui sombre, puis le Strasbourg qui s'échappe
- rules: svg-path-draw, motion-blur-streak
- world: dark
- handoff_in: à 0.00 : cam(1633.3, 2054.5, 1.127, 46, 0) = MX.camAt(5.82), flou 13.3 px = MX.blurAt(5.82) sur .mx-stage ; caméra en plein whip vers le sud-sud-ouest (5100 u/s, échelle +80 %/s), segment 5.40 à 6.62 de MX.SCORE ; carte de la Méditerranée de nuit, lampe pleine ; le manuel A ouvert pages 214-215 à sa place (MX.W.BOOK_A), « SEPTEMBRE 1939 » tapé, fumées et vagues de la gravure tracées, tampon « 4e » posé, juste sorti du cadre en haut ; les cinq maquettes de la ligne de 1939 à leurs places (MX.W.LINE), filées au bord haut du cadre ; aucune autre maquette à l'image ; aucun sous-titre ; grain 6 %
- handoff_out: à 3.50 : cam(1618.2, 2740.4, 1.1, 46, 0) = MX.camAt(9.32), flou 7.9 px ; la caméra suit le Strasbourg, MX.strasAt(9.32) = (1618.2, 2740.4) à 153.7°, qui file vers l'est-nord-est à 2530 u/s (un seul mouvement de 8.82 à 10.33) ; le Strasbourg net dans sa propre scène sans flou (même caméra) ; au bord gauche du cadre, qui sortent : le Dunkerque et la Provence amarrés à Mers el-Kébir (MX.W.MK[0] et [1]), le cercle rouge de la Bretagne et « 3·7·40 » ; la Bretagne a sombré ; lampe de nuit ; aucun sous-titre ; grain 6 %

Word cues: Juillet@0.33 1940@0.90 Mers@2.25 el-Kébir@2.80

Scene 1 (0.00 à 2.00 s) : P4, l'escadre amarrée, « 3·7·40 »
  TEXTE ÉCRAN : sous-titre .night « Juillet 1940 : [boîte : Mers el-Kébir]. » : Juillet 0.33, « 1940 : » 0.90 (suite à la scène 2) ; écart : la date au crayon s'écrit pendant « Juillet 1940 ».
  IMAGE DE DÉPART : handoff_in. Le monde de cette séquence porte aussi, dès 0.00, l'escadre de Mers el-Kébir amarrée (MX.W.MK : le Dunkerque, la Provence, la Bretagne, le Strasbourg, arrière à la jetée, avant vers la terre).
  ÉTAPES : 0.00 à 0.80 le whip freine sur Mers el-Kébir : les maquettes de la ligne sortent par le haut dans les premières images (elles ne sont plus construites une fois hors cadre) et l'escadre arrive au centre ; 0.33 « Juillet » ; 0.60 le crayon écrit « 3·7·40 » en MX.W.PENCIL_MK, une lettre toutes les 0,2 s (0.60, 0.80, 1.00, 1.20, 1.40, 1.60 ; chaque lettre de opacité 0 à 0,88 avec un glissé de 6 px en 0,08 s) ; 0.90 « 1940 : » ; 1.30 la lumière de la lampe vacille (les calques de lampe à 92 % puis 100 % en 0,2 s) ; 1.82 fin de la phrase ; 1.90 l'escadre attend, la caméra pousse.
  PISTE CAMÉRA : 0.00 à 0.80 fin du whip (segment 5.40 à 6.62) jusqu'à MK (1066, 3305, 1.40, 46, 0), flou 13 → 0 ; 0.80 à 3.00 dérive linéaire vers MK2 (1090, 3285, 1.46, 46, 0) : 11 u/s vers l'est, poussée de 1,9 %/s.
  COUCHES ET PROFONDEUR : sujet : les quatre maquettes et leurs ombres portées ; milieu : la date au crayon ; fond : la côte d'Algérie, « MERS EL-KÉBIR » et « ORAN », la vignette de la lampe.
  OBJET-PONT ET VECTEUR : « 3·7·40 » et l'escadre restent à Mers el-Kébir tout le film.
  SON : la fin du whoosh de 0.00 à 0.30 ; le crayon de 0.60 à 1.70.
  IMAGE CLÉ : 1.40 : quatre maquettes amarrées côte à côte au pied de Mers el-Kébir sous la lampe, « 3·7· » qui s'écrit en haut à droite ; « Juillet 1940 : » en bas.

Scene 2 (2.00 à 3.00 s) : P5, la salve, la Bretagne sombre
  TEXTE ÉCRAN : [boîte : Mers el-Kébir] tracée à 2.23, le groupe entier posé à 2.25, « . » collé ; écart : la première gerbe 0,2 s avant « Mers », la Bretagne sombre sur « Mers ».
  IMAGE DE DÉPART : l'escadre amarrée, « 3·7·40 » écrit.
  ÉTAPES : 2.05, 2.30, 2.55 trois gerbes : de petits ronds clairs éclatent sur la mer près de l'escadre (MX.ripplesSVG(3, 14, 10, …) : ils paraissent d'un coup, puis s'élargissent et s'effacent en 1,0 s linéaire), chacune avec une secousse de la scène de 3 px (0,1 s) ; 2.20 touchée par la première salve, la Bretagne (MX.W.MK[2]) sombre sur place (frame.md, sombrer : 0,2 s power2.in, échelle 1 → 0,9, opacité 1 → 0,35, flou 0 → 3 px, puis 1,0 s linéaire jusqu'à opacité 0 et flou 6 px) pendant que ses ronds s'ouvrent (4 ellipses, 1,0 s linéaire) ; 2.25 « Mers el-Kébir » ; 2.70 à 3.10 le crayon rouge la cercle (MX.lossRingSVG en MX.W.LOSS_MK, strokeDashoffset de data-len à 0, 0,4 s power2.out) ; 2.80 « el-Kébir » est dit ; 3.00 il ne reste d'elle qu'une ombre dans ses ronds, son cercle rouge autour.
  PISTE CAMÉRA : la dérive continue (MX.camAt) ; secousses à 2.05, 2.30, 2.55.
  COUCHES ET PROFONDEUR : sujet : la Bretagne qui s'enfonce et son cercle ; avant : les gerbes ; fond : les trois autres maquettes, la côte ; pic de 3 couches (gerbes, naufrage, cercle).
  OBJET-PONT ET VECTEUR : le cercle rouge reste ; le Strasbourg, à droite de la Bretagne, va partir.
  SON : trois coups sourds de salve à 2.05, 2.30, 2.55 ; un plouf grave à 2.25 ; le crayon rouge de 2.70 à 3.10.
  IMAGE CLÉ : 3.05 : la Bretagne qui s'efface dans la carte au milieu de ses ronds, cerclée de rouge entre ses voisines amarrées, « 3·7·40 » ; « Juillet 1940 : [Mers el-Kébir]. » en bas.

Scene 3 (3.00 à 3.50 s) : P6, le Strasbourg s'échappe
  TEXTE ÉCRAN : le sous-titre sort de 3.26 à 3.40.
  IMAGE DE DÉPART : l'escadre, la Bretagne qui disparaît, son cercle.
  ÉTAPES : 3.00 le Strasbourg (MX.W.MK[3]) quitte son poste en suivant MX.strasAt(T) : il recule vers le nord, vire et prend l'est-nord-est (un seul mouvement de 8.82 à 10.33, partagé avec la séquence 3) ; de petits ronds s'ouvrent à son poste (1,0 s linéaire) ; à partir de 3.00 il passe dans une seconde scène (un .mx-stage sans flou, même caméra MX.camAt(T)) pour rester net pendant que la carte file ; 3.26 à 3.40 le sous-titre sort ; 3.40 la Bretagne a disparu ; 3.50 couture.
  PISTE CAMÉRA : 3.00 à 3.50 la caméra prend le Strasbourg (segment 8.82 à 9.32, mode « in » : de MK2 vers le Strasbourg, power3.inOut, échelle 1,46 → 1,10), flou 0 → 7,9 px.
  COUCHES ET PROFONDEUR : sujet : le Strasbourg net ; fond : la carte qui file, l'escadre qui sort à gauche.
  OBJET-PONT ET VECTEUR : le Strasbourg : la caméra le suit jusqu'à Toulon dans la séquence 3 ; vecteur vers l'est-nord-est.
  SON : un souffle qui monte de 3.10 à 3.50.
  IMAGE CLÉ : 3.40 : le Strasbourg net qui file vers le haut droit du cadre, la carte filée derrière lui, le cercle rouge de la Bretagne qui sort à gauche.

## Frame 3 : Toulon · 9.32 → 13.35

- scene: La caméra suit le Strasbourg à travers la carte jusqu'à Toulon, où il s'amarre près de quatre autres maquettes ; « 27·11·42 » s'écrit ; les cinq maquettes se sabordent une à une, de l'est à l'ouest ; la rade est vide, la caméra se relève
- duration: 4.03s
- transition_in: cut
- status: outline
- src: compositions/frames/03-toulon.html
- voiceover: "Novembre 1942. Toulon."
- type: pain_point
- blueprint: camera-journey (Adapt)
- focal: le Strasbourg qui file, puis la flotte amarrée, puis la rade vide
- rules: motion-blur-streak, svg-path-draw
- world: dark
- handoff_in: à 0.00 : cam(1618.2, 2740.4, 1.1, 46, 0) = MX.camAt(9.32), flou 7.9 px ; la caméra suit le Strasbourg, MX.strasAt(9.32) = (1618.2, 2740.4) à 153.7°, qui file vers l'est-nord-est à 2530 u/s (un seul mouvement de 8.82 à 10.33) ; le Strasbourg net dans sa propre scène sans flou (même caméra) ; au bord gauche du cadre, qui sortent : le Dunkerque et la Provence amarrés à Mers el-Kébir (MX.W.MK[0] et [1]), le cercle rouge de la Bretagne et « 3·7·40 » ; la Bretagne a sombré ; lampe de nuit ; aucun sous-titre ; grain 6 %
- handoff_out: à 4.03 : cam(2904.4, 1275.1, 1.115, 42.9, 0) = MX.camAt(13.35), flou 3.3 px ; la caméra se relève (échelle -102 %/s, glissé vers le sud-est à 700 u/s, inclinaison -9.7°/s), segment 12.72 à 14.25 ; la rade de Toulon vide (les cinq maquettes sabordées, plus aucun rond) ; « 27·11·42 » écrit (MX.W.PENCIL_TOULON) ; à flot à gauche, dans l'ombre de la lampe : le croiseur lourd et les deux contre-torpilleurs de la ligne de 1939 (MX.W.LINE[2] à [4]) ; le manuel A au bord haut gauche ; lampe de nuit ; aucun sous-titre ; grain 6 %

Word cues: Novembre@0.27 1942@0.96 Toulon@2.44

Scene 1 (0.00 à 1.18 s) : P6 (suite), la poursuite jusqu'à Toulon
  TEXTE ÉCRAN : sous-titre .night « Novembre 1942 : [boîte : Toulon]. » : Novembre 0.27, « 1942 : » 0.96 (suite aux scènes 2 et 3) ; écart synchro.
  IMAGE DE DÉPART : handoff_in. Le monde de cette séquence porte, dès 0.00 : les trois maquettes restées de la ligne de 1939 (MX.W.LINE[2] à [4], à flot à leurs places), la flotte amarrée à Toulon (MX.W.TOULON[0] à [3]), le manuel A, Mers el-Kébir (MX.W.MK[0] et [1], le cercle, « 3·7·40 »).
  ÉTAPES : 0.00 le Strasbourg file (MX.strasAt(T)) à l'est des Baléares, net dans sa scène sans flou, la carte filée ; 0.27 « Novembre » ; 0.30 à 0.80 les trois maquettes de la ligne passent dans l'ombre à gauche ; 0.58 la caméra le lâche et se pose sur la rade ; 0.60 le crayon écrit « 27·11·42 » en MX.W.PENCIL_TOULON, une lettre toutes les 0,12 s (0.60 à 1.44) ; 0.80 la rade de Toulon entre dans la lumière : quatre maquettes amarrées l'avant vers le quai (contre-torpilleur, croiseur lourd, cuirassé type Bretagne, croiseur léger) ; 0.96 « 1942 : » ; 1.01 le Strasbourg s'amarre à son poste (MX.W.TOULON[4], 88,5°), de petits ronds à son étrave (1,0 s linéaire) ; à 1.01 il revient dans la scène commune.
  PISTE CAMÉRA : 0.00 à 0.58 suivi (MX.camAt : le centre est le Strasbourg, échelle 1,10, flou jusqu'à 11,6 px vers 0.24) ; 0.58 à 1.18 la caméra se pose sur T1 (2748, 1090, 1.50, 46, 0) (mode « out », power3.inOut), flou → 0.
  COUCHES ET PROFONDEUR : sujet : le Strasbourg net ; fond : la carte filée (Minorque, Majorque), les maquettes de la ligne dans l'ombre.
  OBJET-PONT ET VECTEUR : le Strasbourg devient la cinquième maquette de la rade.
  SON : le souffle de la poursuite de 0.00 à 0.60 ; le crayon de 0.60 à 1.44 ; un clapot à 1.01.
  IMAGE CLÉ : 0.40 : le Strasbourg net au centre, la carte filée, Minorque floue à gauche ; « Novembre » en bas.

Scene 2 (1.18 à 2.10 s) : P7, la flotte amarrée
  TEXTE ÉCRAN : « Novembre 1942 : » reste ; « Toulon. » attend son mot.
  IMAGE DE DÉPART : cinq maquettes amarrées dans la rade, « 27·11·4 » qui finit de s'écrire.
  ÉTAPES : 1.44 la date est complète ; 1.70 la lampe vacille (92 % puis 100 % en 0,2 s) ; 1.98 fin de « 1942 » ; 2.00 les cinq maquettes tressaillent (1 px, 0,1 s).
  PISTE CAMÉRA : dérive linéaire de T1 vers T2 (2762, 1102, 1.54, 46, 0) de 1.18 à 3.40 : 6 u/s vers l'est, poussée de 1,2 %/s.
  COUCHES ET PROFONDEUR : sujet : les cinq maquettes et leurs ombres ; milieu : « 27·11·42 » ; fond : la côte de Provence, « TOULON », « MARSEILLE », « Golfe du Lion » ; à gauche, dans l'ombre, la ligne de 1939.
  OBJET-PONT ET VECTEUR : même cadrage que le plan suivant (la dérive continue).
  SON : la tension de la musique, rien d'autre.
  IMAGE CLÉ : 1.70 : la rade de Toulon sous la lampe, cinq maquettes amarrées côte à côte l'avant vers le quai, « 27·11·42 » à droite ; « Novembre 1942 : » en bas.

Scene 3 (2.10 à 3.40 s) : P8, le sabordage
  TEXTE ÉCRAN : [boîte : Toulon] tracée à 2.42, « Toulon » 2.44, « . » collé ; sortie du sous-titre de 3.10 à 3.24 ; écart : la première maquette sombre 0,34 s avant « Toulon ».
  ÉTAPES : les cinq maquettes se sabordent de l'est à l'ouest, chacune sur place (sombrer : 0,2 s power2.in puis 1,0 s linéaire) avec ses ronds (3 ellipses, 1,0 s linéaire) : 2.10 le contre-torpilleur, 2.25 le croiseur lourd, 2.40 le cuirassé, 2.55 le croiseur léger, 2.70 le Strasbourg ; 3.70 ses ronds finissent ; 3.90 la dernière a disparu.
  PISTE CAMÉRA : la dérive continue jusqu'à 3.40.
  COUCHES ET PROFONDEUR : sujet : la maquette qui sombre (une à la fois) ; fond : celles qui attendent, la côte ; pic de 3 couches (naufrage, ronds, date).
  OBJET-PONT ET VECTEUR : la rade vide et ses derniers ronds (le manuel va y tomber).
  SON : cinq ploufs sourds à 2.15, 2.30, 2.45, 2.60, 2.75.
  IMAGE CLÉ : 2.62 : trois maquettes déjà dans la carte, leurs ronds qui s'élargissent, la quatrième qui s'enfonce, la dernière encore à flot ; « Novembre 1942 : [Toulon]. » en bas.

Scene 4 (3.40 à 4.03 s) : P9, la rade vide, la caméra se relève
  TEXTE ÉCRAN : aucun (silence de la voix de 2.78 à 5.28, voir la séquence 4).
  ÉTAPES : 3.40 la caméra se relève : recul et glissé vers le sud-est ; 3.70 les derniers ronds s'effacent ; 3.90 l'ombre du Strasbourg a disparu ; 4.03 couture au sommet de la vitesse.
  PISTE CAMÉRA : segment 12.72 à 14.25 (courbe whip(0.4118), de T2 vers BV (3040, 1440, 0.82, 40, 0)) ; flou 0 → 3,3 px.
  COUCHES ET PROFONDEUR : la rade vide au centre ; la ligne de 1939 dans l'ombre à gauche ; le manuel A en haut à gauche.
  OBJET-PONT ET VECTEUR : vecteur : recul vers le sud-est, repris par la séquence 4, où le manuel tombe dans ce recul.
  SON : un souffle grave qui monte de 3.40 à 4.03.
  IMAGE CLÉ : 3.80 : la rade vide qui s'éloigne, « 27·11·42 » ; à gauche, la ligne de 1939 dans l'ombre.

## Frame 4 : Trois lignes · 13.35 → 17.84

- scene: Dans le recul, un manuel tombe de la caméra sur la mer de la rade, ouvert pages 216-217 ; la caméra s'approche de la page 217 : le titre du chapitre, trois lignes, puis rien ; les trois lignes se surlignent en jaune ; la caméra repart vers l'ouest
- duration: 4.49s
- transition_in: cut
- status: outline
- src: compositions/frames/04-trois-lignes.html
- voiceover: "Dans les manuels, toute son histoire tient en trois lignes."
- type: pain_point
- blueprint: camera-journey (Adapt)
- focal: le manuel qui tombe, puis les trois lignes
- rules: 3d-camera-flight, css-marker-patterns
- world: dark
- handoff_in: à 0.00 : cam(2904.4, 1275.1, 1.115, 42.9, 0) = MX.camAt(13.35), flou 3.3 px ; la caméra se relève (échelle -102 %/s, glissé vers le sud-est à 700 u/s, inclinaison -9.7°/s), segment 12.72 à 14.25 ; la rade de Toulon vide (les cinq maquettes sabordées, plus aucun rond) ; « 27·11·42 » écrit (MX.W.PENCIL_TOULON) ; à flot à gauche, dans l'ombre de la lampe : le croiseur lourd et les deux contre-torpilleurs de la ligne de 1939 (MX.W.LINE[2] à [4]) ; le manuel A au bord haut gauche ; lampe de nuit ; aucun sous-titre ; grain 6 %
- handoff_out: à 4.49 : cam(2999.7, 1313.5, 1.206, 37.9, -2.4) = MX.camAt(17.84), flou 5.9 px ; recul vers l'ouest (1450 u/s, échelle -97 %/s, inclinaison +14.4°/s), segment 17.30 à 19.10 ; le manuel B ouvert pages 216-217 à sa place (MX.W.BOOK_B), les trois lignes surlignées en jaune ; à flot à gauche : MX.W.LINE[2] à [4] ; le manuel A en haut à gauche ; « 27·11·42 » ; lampe de nuit ; aucun sous-titre ; grain 6 %

Word cues: Dans@1.25 les@1.43 manuels@1.67 toute@2.31 son@2.57 histoire@2.77 tient@3.21 en@3.49 trois@3.75 lignes@3.91

Scene 1 (0.00 à 1.20 s) : P9 (suite), le manuel tombe sur la rade
  TEXTE ÉCRAN : aucun (silence de la voix jusqu'à 1.25).
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.90 la caméra finit de se relever ; 0.45 l'ombre du manuel paraît sur la mer (une grande tache très floue, opacité 0 → 0,2 en 0,2 s) ; 0.79 le manuel B (MX.bookHTML en MX.W.BOOK_B, pages MX.pageBlankSVG(216) et MX.pageLinesSVG, surligneurs à 0) tombe de la caméra : translateZ 700 → 0 dans le monde (preserve-3d), power2.in en 0,26 s, rotation 10° → 4°, flou 10 → 0, et son ombre se resserre et fonce avec lui (échelle 1,4 → 1, opacité 0,2 → 0,7, flou 40 → 15 px) ; 1.05 contact (14.40) : le livre s'écrase (0,985 → 1 en 0,08 s), la scène secoue de 6 px (0,12 s), trois grands ronds s'ouvrent autour de lui (MX.ripplesSVG(3, 760, 150, …), 1,0 s) et une dizaine de grains de poussière s'élèvent dans la lumière de la lampe (calque 2D, montée lente de 1.05 à 2.50, positions tirées de MX.rng).
  PISTE CAMÉRA : fin du segment 12.72 à 14.25 (il freine jusqu'à BV à 0.90) ; dérive linéaire de BV vers BV2 (3048, 1432, 0.84, 40, 0) de 0.90 à 2.21.
  COUCHES ET PROFONDEUR : avant : le manuel en chute, grand et flou ; sujet : le manuel posé ; fond : la mer, la ligne de 1939 dans l'ombre à gauche, en haut à droite le coin de la table dans l'ombre de la lampe.
  OBJET-PONT ET VECTEUR : le manuel B reste sur la rade jusqu'au noir du pivot ; le téléphone le remplacera au même endroit.
  SON : un choc sourd de livre à 1.05.
  IMAGE CLÉ : 1.10 : le manuel ouvert qui vient de tomber sur la mer de la carte, ses ronds autour, la poussière dans la lumière.

Scene 2 (1.20 à 2.21 s) : P10, « Dans les manuels, »
  TEXTE ÉCRAN : sous-titre .night « Dans les manuels, » (Dans 1.25, les 1.43, manuels, 1.67), sortie 2.12 à 2.26 ; écart synchro.
  ÉTAPES : 1.25 « Dans » ; 1.43 « les » ; 1.60 la page 217 se lit : le titre « LA FLOTTE FRANÇAISE, 1939-1945 », trois lignes, puis rien ; 1.67 « manuels, » ; 2.21 la caméra commence son approche, 0,1 s avant « toute ».
  PISTE CAMÉRA : la dérive BV → BV2.
  COUCHES ET PROFONDEUR : sujet : le livre ouvert ; fond : la mer ; la poussière dans la lumière.
  OBJET-PONT ET VECTEUR : la page 217, où la caméra va entrer.
  SON : la tension de la musique, la poussière muette.
  IMAGE CLÉ : 1.85 : le manuel ouvert sur la mer de la carte, page 216 blanche, page 217 avec son titre et ses trois lignes ; « Dans les manuels, » en bas.

Scene 3 (2.21 à 3.95 s) : P11, les trois lignes
  TEXTE ÉCRAN : « toute son histoire tient en [boîte : trois lignes]. » + [trait : trois lignes] : toute 2.31, son 2.57, histoire 2.77, tient 3.21, en 3.49, boîte tracée 3.73, groupe « trois lignes » 3.75, trait de 3.75 à 4.15 ; le sous-titre passe au thème .paper de 2.60 à 2.80, quand la page arrive sous la bande ; écart : les lignes se surlignent avant d'être dites.
  ÉTAPES : 2.21 à 3.70 la caméra s'approche de la page 217 ; 2.31 « toute » ; 2.77 « histoire » ; 3.10 la ligne 1 « Septembre 1939 : la France entre en guerre. » se surligne (rect #p04-…-hl0, scaleX 0 → 1 depuis la gauche, 0,2 s power2.out, jaune à 85 %) ; 3.38 la ligne 2 « Juillet 1940 : drame de Mers el-Kébir. » ; 3.66 la ligne 3 « Novembre 1942 : la flotte se saborde à Toulon. » ; 3.75 « trois lignes » : le trait jaune commence à se dessiner dessous (jusqu'à 4.15) ; sous les trois lignes, la page reste blanche.
  PISTE CAMÉRA : 2.21 à 3.70 approche de BV2 vers PG (3382.0, 1223.6, 1.55, 34, -4), le point (820, 640) de la page 217 au centre, power2.inOut ; 3.70 à 3.95 dérive PG → PG2.
  COUCHES ET PROFONDEUR : sujet : les trois lignes ; fond : la page blanche dessous ; avant : le bord du livre qui sort du cadre en bas.
  OBJET-PONT ET VECTEUR : les trois lignes surlignées restent sur la page.
  SON : trois traits de surligneur à 3.10, 3.38, 3.66.
  IMAGE CLÉ : 4.15 : la page 217 de près, les trois lignes surlignées en jaune, rien dessous ; « toute son histoire tient en [trois lignes]. » souligné ; la caméra commence à reculer.

Scene 4 (3.95 à 4.49 s) : P12, le recul vers l'ouest
  TEXTE ÉCRAN : le trait est entier depuis 4.15 ; le sous-titre sort de 4.30 à 4.44.
  ÉTAPES : 3.95 la caméra quitte la page vers l'ouest en reculant : le manuel entier reparaît ; 4.30 le sous-titre sort ; 4.49 couture.
  PISTE CAMÉRA : segment 17.30 à 19.10 (courbe whip(0.3), de PG2 vers V5a (2400, 1450, 0.80, 44, 0)) ; flou 0 → 5,9 px.
  COUCHES ET PROFONDEUR : sujet : le manuel qui s'éloigne ; fond : la mer sombre à gauche.
  OBJET-PONT ET VECTEUR : vecteur : recul vers l'ouest, repris par la séquence 5.
  SON : un souffle de 3.95 à 4.49.
  IMAGE CLÉ : 4.40 : le manuel ouvert qui part vers la droite du cadre, ses lignes jaunes, la mer sombre qui s'ouvre à gauche.

## Frame 5 : Le reste a sombré · 17.84 → 23.37

- scene: La caméra recule sur la mer de nuit : les trois maquettes restées de la ligne de 1939 sombrent l'une après l'autre ; un cran vers un cadran optique de passerelle qui sombre ; un cran vers un tirage d'équipage qui sombre ; la lampe s'éteint
- duration: 5.53s
- transition_in: cut
- status: outline
- src: compositions/frames/05-le-reste.html
- voiceover: "Le reste a sombré. Ses navires. Ses matériels. Ses hommes."
- type: pain_point
- blueprint: spatial-pan-stations (Adapt)
- focal: les maquettes qui sombrent, puis le cadran, puis le tirage
- rules: depth-of-field-blur
- world: dark
- handoff_in: à 0.00 : cam(2999.7, 1313.5, 1.206, 37.9, -2.4) = MX.camAt(17.84), flou 5.9 px ; recul vers l'ouest (1450 u/s, échelle -97 %/s, inclinaison +14.4°/s), segment 17.30 à 19.10 ; le manuel B ouvert pages 216-217 à sa place (MX.W.BOOK_B), les trois lignes surlignées en jaune ; à flot à gauche : MX.W.LINE[2] à [4] ; le manuel A en haut à gauche ; « 27·11·42 » ; lampe de nuit ; aucun sous-titre ; grain 6 %
- handoff_out: à 5.53 : noir #0c0906 plein cadre : la lampe vient de s'éteindre (23.17 à 23.37) ; pas de caméra ; rien d'autre que le grain 6 % ; aucun sous-titre

Word cues: Le@0.28 reste@0.50 a@1.00 sombré@1.30 Ses@2.17 navires@2.38 Ses@3.30 matériels@3.54 Ses@4.64 hommes@4.98

Scene 1 (0.00 à 1.26 s) : P12 (suite), le reste
  TEXTE ÉCRAN : sous-titre « Le reste a [boîte : sombré]. » : Le 0.28, reste 0.50, a 1.00 (suite à la scène 2) ; thème .paper jusqu'à 0.36, puis .night (0,2 s) quand la page quitte la bande ; écart : les maquettes de la ligne entrent dans la lumière sur « reste ».
  IMAGE DE DÉPART : handoff_in. Le monde de cette séquence porte aussi, dès 0.00, posés sur la carte hors cadre : le cadran (MX.dialSVG en MX.W.DIAL) et le tirage du manuel (MX.printHTML en MX.W.PRINT : le pont du Dunkerque et ses marins, sépia, sans légende ni filigrane).
  ÉTAPES : 0.00 à 1.26 le recul vers l'ouest freine ; 0.40 les trois maquettes restées de la ligne de 1939 (MX.W.LINE[2] à [4]) entrent dans la lumière à gauche ; 0.50 « reste » ; 0.80 le cadran entre en bas à gauche, posé sur la carte ; 1.00 « a » ; 1.20 le manuel B arrive au bord droit et s'y floute (4 px, flou de profondeur sur l'objet seul).
  PISTE CAMÉRA : fin du segment 17.30 à 19.10 : il freine jusqu'à V5a à 1.26, flou → 0.
  COUCHES ET PROFONDEUR : avant : le manuel B flou au bord droit ; sujet : les trois maquettes ; fond : la mer, la côte.
  OBJET-PONT ET VECTEUR : les trois maquettes de la ligne, qui vont sombrer.
  SON : la fin du souffle.
  IMAGE CLÉ : 1.10 : le manuel flou à droite, la mer de nuit, trois maquettes en ligne à gauche sous la lampe, le cadran en bas.

Scene 2 (1.26 à 2.86 s) : P13, « sombré » : ses navires
  TEXTE ÉCRAN : [boîte : sombré] tracée à 1.28, « sombré » 1.30, « . » collé ; sortie 1.95 à 2.09 ; puis « Ses [boîte : navires]. Ses matériels. Ses hommes. » commence : Ses 2.17, boîte tracée 2.36, navires 2.38 ; écart : la première maquette sombre 0,1 s après « sombré ».
  ÉTAPES : 1.40 le croiseur lourd (MX.W.LINE[2]) sombre sur place (0,2 s power2.in puis 1,0 s linéaire) avec ses ronds (4 ellipses, 1,0 s linéaire) ; 1.70 le premier contre-torpilleur (LINE[3]) ; 2.00 le second (LINE[4]) ; 2.17 « Ses » ; 2.38 « navires. » ; 3.00 ses ronds s'effacent ; 3.20 le dernier a disparu.
  PISTE CAMÉRA : dérive linéaire de V5a vers V5b (2330, 1490, 0.81, 44, 0) de 1.26 à 2.86 : 44 u/s vers l'ouest, 25 u/s vers le sud.
  COUCHES ET PROFONDEUR : sujet : la maquette qui sombre ; fond : les autres, la mer ; avant : le manuel B flou au bord droit ; pic de 3 couches (naufrages, ronds, sous-titre).
  OBJET-PONT ET VECTEUR : les places vides de la ligne : elle y remontera (séquence 8).
  SON : trois ploufs à 1.45, 1.75, 2.05.
  IMAGE CLÉ : 1.90 : le croiseur déjà dans la carte, un contre-torpilleur qui s'enfonce dans ses ronds, le dernier encore à flot, le cadran en bas à gauche ; « Le reste a [sombré]. » en bas.

Scene 3 (2.86 à 4.16 s) : P14, « Ses matériels » : le cadran
  TEXTE ÉCRAN : « Ses navires. Ses [boîte : matériels]. Ses hommes. » : Ses 3.30, boîte tracée 3.52, matériels 3.54 ; la boîte de « navires » se retire à 3.44 (scaleX 1 → 0 vers la droite, 0,12 s) : une seule boîte allumée à la fois ; écart : le cadran est au centre 0,18 s avant « matériels » et sombre 0,1 s après le mot.
  ÉTAPES : 2.86 à 3.36 cran vers le cadran, dans le silence ; 3.30 « Ses » ; 3.36 la caméra se pose sur le cadran optique, entier, au centre ; 3.54 « matériels. » ; 3.64 il sombre sur place (0,2 s power2.in puis 1,0 s linéaire) avec ses ronds (4 ellipses, rayon 120 u) ; 3.84 il n'est plus qu'à moitié visible, ses ronds s'élargissent ; 4.84 il a disparu, hors champ (pendant le cran suivant).
  PISTE CAMÉRA : 2.86 à 3.36 cran de V5b vers V5c (1960, 1700, 0.86, 44, 0), power3.inOut, flou jusqu'à 5 px ; 3.36 à 4.16 dérive V5c → V5d.
  COUCHES ET PROFONDEUR : sujet : le cadran ; fond : Majorque, la mer ; le manuel B qui sort en haut à droite.
  OBJET-PONT ET VECTEUR : le cadran remontera pièce par pièce (séquence 8) ; vecteur : cran vers le sud.
  SON : un plouf métallique à 3.69.
  IMAGE CLÉ : 3.80 : le cadran à moitié dans la carte au milieu de ses ronds, Majorque dessous ; « Ses navires. Ses [matériels]. » en bas.

Scene 4 (4.16 à 5.53 s) : P15, « Ses hommes » : le tirage, la lampe s'éteint
  TEXTE ÉCRAN : « Ses navires. Ses matériels. Ses [boîte : hommes]. » : Ses 4.64, boîte tracée 4.96, hommes 4.98 (la boîte de « matériels » se retire à 4.88) ; sortie 5.28 à 5.42 ; écart : le tirage est au centre 0,32 s avant « hommes » et sombre 0,1 s après le mot.
  ÉTAPES : 4.16 à 4.66 cran vers le sud, vers le tirage, dans le silence ; 4.64 « Ses » ; 4.66 le tirage au centre : le pont du Dunkerque et ses marins ; 4.98 « hommes. » ; 5.08 il sombre (0,2 s power2.in puis 1,0 s linéaire) avec ses ronds (4 ellipses, rayon 170 u) ; 5.28 il n'en reste qu'une ombre ; 5.33 à 5.53 la lampe s'éteint : les deux calques de lampe et toute la scène passent au noir #0c0906 (0,2 s power2.in) ; 5.53 noir.
  PISTE CAMÉRA : 4.16 à 4.66 cran de V5d vers V5e (1980, 2600, 1.00, 44, 0), power3.inOut, flou jusqu'à 10 px ; 4.66 à 5.53 dérive V5e → V5f.
  COUCHES ET PROFONDEUR : sujet : le tirage ; fond : la mer, « Mer Méditerranée », « Baléares », « 3·7·40 » à gauche.
  OBJET-PONT ET VECTEUR : la place du tirage : la vraie photo du Dunkerque y remontera (séquence 9) ; la lampe qui s'éteint fait le noir du pivot.
  SON : un plouf feutré à 5.13 ; le déclic de la lampe à 5.33, avec l'impact grave de la musique.
  IMAGE CLÉ : 5.15 : le tirage d'équipage qui commence à s'enfoncer dans ses ronds au centre de la mer de nuit ; « Ses navires. Ses matériels. Ses [hommes]. » en bas.

## Frame 6 : Renflouer · 23.37 → 26.40

- scene: Sur le noir, la phrase du pivot, seule, centrée, mot par mot ; « renflouer » remonte d'en bas dans sa boîte jaune et se souligne ; la phrase avance doucement vers nous, puis s'efface ; le noir reste
- duration: 3.03s
- transition_in: cut
- status: outline
- src: compositions/frames/06-renflouer.html
- voiceover: "Il est temps de renflouer leur histoire."
- type: pivot
- blueprint: kinetic-type-beats (Adapt)
- focal: la phrase, puis « renflouer »
- rules: css-marker-patterns
- world: dark
- handoff_in: à 0.00 : noir #0c0906 plein cadre : la lampe vient de s'éteindre (23.17 à 23.37) ; pas de caméra ; rien d'autre que le grain 6 % ; aucun sous-titre
- handoff_out: à 3.03 : noir #0c0906 plein cadre, la phrase du pivot sortie à 26.31 ; pas de caméra ; rien d'autre que le grain 6 %

Word cues: Il@0.30 est@0.49 temps@0.75 de@0.87 renflouer@1.11 leur@1.63 histoire@1.79

Scene 1 (0.00 à 3.03 s) : P16, la phrase sur le noir
  TEXTE ÉCRAN : moment typographique (MX.typeHTML, 84 px, centré, aucun sous-titre en bas) : « Il est temps de [boîte : renflouer] leur histoire. » + [trait : renflouer] ; Il 0.30, est 0.49, temps 0.75, de 0.87, boîte tracée 1.09, renflouer 1.11, trait 1.15 à 1.55, leur 1.63, histoire. 1.79 ; écart synchro.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.30 « Il » (opacité 0 → 1, y +8 → 0, flou 6 → 0 en 0,14 s, puis du gris 35 % au plein en 0,2 s), et la phrase commence à avancer doucement vers nous (échelle 1 → 1,05 de 0.30 à 2.80, linéaire) ; 0.49 « est » ; 0.75 « temps » ; 0.87 « de » ; 1.09 la boîte jaune se trace (scaleX 0 → 1, 0,16 s power3.out) ; 1.11 « renflouer » remonte d'en bas dans sa boîte (y +40 → 0, flou 6 → 0, 0,2 s expo.out) : le mot refait surface ; 1.15 à 1.55 le trait jaune se dessine dessous ; 1.63 « leur » ; 1.79 « histoire. » ; 2.27 fin de la voix, la phrase avance toujours ; 2.80 à 2.94 la phrase sort (opacité 1 → 0, flou 0 → 6 px) ; 2.94 à 3.03 le noir et son grain (le silence du pivot, qui continue au début de la séquence 7).
  PISTE CAMÉRA : pas de monde ; la poussée lente de la phrase (0.30 à 2.80) tient lieu de caméra ; le grain bouge à chaque image.
  COUCHES ET PROFONDEUR : la phrase ; le noir et son grain.
  OBJET-PONT ET VECTEUR : le noir : un écran s'y allumera (séquence 7).
  SON : la musique est coupée depuis 23.23 ; la voix seule, puis le silence.
  IMAGE CLÉ : 2.00 : sur le noir, « Il est temps de [renflouer] leur histoire. », « renflouer » dans sa boîte jaune, souligné.

## Frame 7 : Le blog · 26.40 → 30.41

- scene: Dans le noir, un écran s'allume : la page d'accueil de MARINE 1939 sur un téléphone posé sur la carte, là où était tombé le manuel ; sa lumière éclaire la carte autour de lui ; sur « fait revivre », le jour se lève sur toute la carte et les épaves de la ligne de 1939 apparaissent sous le papier ; la caméra glisse vers elles
- duration: 4.01s
- transition_in: cut
- status: outline
- src: compositions/frames/07-blog.html
- voiceover: "MARINE 1939 fait revivre cette flotte."
- type: demo
- blueprint: device-surface-showcase (Adapt)
- focal: l'écran du téléphone, puis la carte qui s'éclaire
- rules: ambient-glow-bloom
- world: dark
- handoff_in: à 0.00 : noir #0c0906 plein cadre, la phrase du pivot sortie à 26.31 ; pas de caméra ; rien d'autre que le grain 6 %
- handoff_out: à 4.01 : cam(2632.4, 1260.5, 1.109, 38.3, 0) = MX.camAt(30.41), flou 2.5 px ; la caméra glisse vers l'ouest (840 u/s, échelle +20 %/s, inclinaison +20°/s), segment 29.40 à 30.95 ; plein jour (MX.dayHTML, sol #8a7353) ; le téléphone allumé sur la page d'accueil du blog (MX.W.PHONE), au bord droit ; les cinq maquettes de la ligne de 1939 en épaves sous le papier à leurs places (opacité 0,16, flou 5 px) ; le manuel A en haut à gauche ; « 27·11·42 » ; aucun sous-titre ; grain 5 %

Word cues: MARINE@0.76 1939@1.20 fait@2.32 revivre@2.74 cette@3.38 flotte@3.58

Scene 1 (0.00 à 2.30 s) : P17, le blog s'allume
  TEXTE ÉCRAN : sous-titre .night « MARINE 1939 fait [boîte : revivre] cette flotte. » : MARINE 0.76, 1939 1.20 (suite à la scène 2) ; écart : l'écran s'allume 0,54 s avant « MARINE ».
  IMAGE DE DÉPART : handoff_in. Dans le noir, invisibles : la carte de jour (couverte par l'ombre), le téléphone posé en MX.W.PHONE, écran éteint (filtre brightness 0 sur .mx-phone-screen), la caméra en MX.camAt(26.40) = cam(3110, 1280, 1.06, 25, 0). Le manuel B n'est plus là.
  ÉTAPES : 0.22 l'écran s'allume (brightness 0 → 1, 0,2 s) : la vraie page d'accueil du blog, son bandeau MARINE 1939 en haut ; 0.22 à 1.22 un halo froid s'ouvre sur la carte autour du téléphone (calque d'ombre percé d'un cercle de 0 à 260 px, bord doux, linéaire) : la mer, la côte de Corse à droite ; 0.76 « MARINE » ; 1.20 « 1939 » ; 1.22 à 2.30 le halo s'élargit encore (rayon 260 → 380 px, linéaire) ; 1.75 il atteint Toulon : « 27·11·42 » sort de l'ombre en haut, puis le golfe du Lion.
  PISTE CAMÉRA : dérive linéaire de PH1 (3110, 1280, 1.06, 25, 0) vers PH2 (3060, 1290, 1.00, 28, 0) de 0.00 à 3.00 : 17 u/s vers l'ouest, recul de 2 %/s, inclinaison +1°/s.
  COUCHES ET PROFONDEUR : sujet : l'écran allumé ; milieu : le téléphone et son ombre ; fond : la carte dans le halo ; avant : le noir des bords.
  OBJET-PONT ET VECTEUR : le téléphone a pris la place du manuel B (même endroit, même lumière qui vient de l'objet).
  SON : la NOTIFICATION À DEUX TONS à 0.22 (la signature, une seule fois) ; la musique d'élan attaque sur « MARINE » (0.76).
  IMAGE CLÉ : 1.40 : dans la nuit, le téléphone allumé sur la page d'accueil de MARINE 1939, sa lumière sur la carte (la Corse, Toulon) ; « MARINE 1939 » en bas.

Scene 2 (2.30 à 4.01 s) : P18, le jour se lève, la flotte sous le papier
  TEXTE ÉCRAN : fait 2.32, boîte tracée 2.72, revivre 2.74, cette 3.38, flotte. 3.58 ; le sous-titre passe au thème .day à 3.00 (0,2 s) ; sortie 3.80 à 3.94.
  ÉTAPES : 2.30 à 3.50 le jour se lève : depuis le téléphone, la lumière gagne toute la carte (le cercle de l'ombre s'élargit jusqu'aux bords, le sol passe de #0c0906 à #8a7353, MX.dayHTML monte de 0 à 1) ; 2.74 « revivre » ; 3.00 la caméra part vers l'ouest ; 3.00 à 3.60 à mesure que la lumière les atteint, les cinq maquettes de la ligne de 1939 apparaissent en épaves sous le papier à leurs places (opacité 0 → 0,16 en 0,2 s, flou 5 px) : 3.00 les deux cuirassés, 3.20 le croiseur lourd, 3.40 et 3.60 les contre-torpilleurs ; 3.58 « flotte. ».
  PISTE CAMÉRA : 3.00 à 4.01 glissé vers l'ouest (segment 29.40 à 30.95, courbe whip(0.6516), de PH2 vers L1 (2480, 1250, 1.15, 42, 0)) : la couture tombe au sommet de la vitesse ; flou 0 → 2,5 px.
  COUCHES ET PROFONDEUR : sujet : les épaves sous le papier ; milieu : le téléphone qui glisse vers la droite ; fond : la carte au jour.
  OBJET-PONT ET VECTEUR : les épaves remontent une à une (séquence 8) ; vecteur vers l'ouest.
  SON : la musique d'élan ; un souffle de 3.00 à 4.01.
  IMAGE CLÉ : 3.40 : la carte en plein jour, le téléphone allumé à droite, les ombres des maquettes sous le papier à gauche ; « MARINE 1939 fait [revivre] cette » en bas.

## Frame 8 : Un par un, pièce par pièce · 30.41 → 35.07

- scene: Les cinq maquettes de la ligne de 1939 remontent une à une à leurs places, et la vraie photo de L'Épervier se pose à côté ; un cran vers le cadran : ses trois pièces remontent de la carte et se remontent l'une après l'autre, avec l'article « Les cadrans optiques » ; la caméra repart vers le sud
- duration: 4.66s
- transition_in: cut
- status: outline
- src: compositions/frames/08-un-par-un.html
- voiceover: "Ses navires, un par un. Ses matériels, pièce par pièce."
- type: demo
- blueprint: spatial-pan-stations (Adapt)
- focal: les maquettes qui remontent, puis le cadran qui se remonte
- rules: depth-scatter-assemble
- world: light
- handoff_in: à 0.00 : cam(2632.4, 1260.5, 1.109, 38.3, 0) = MX.camAt(30.41), flou 2.5 px ; la caméra glisse vers l'ouest (840 u/s, échelle +20 %/s, inclinaison +20°/s), segment 29.40 à 30.95 ; plein jour (MX.dayHTML, sol #8a7353) ; le téléphone allumé sur la page d'accueil du blog (MX.W.PHONE), au bord droit ; les cinq maquettes de la ligne de 1939 en épaves sous le papier à leurs places (opacité 0,16, flou 5 px) ; le manuel A en haut à gauche ; « 27·11·42 » ; aucun sous-titre ; grain 5 %
- handoff_out: à 4.66 : cam(1937.3, 2281.9, 1.26, 33, 0) = MX.camAt(35.07), flou 7 px ; la caméra file vers le sud (2260 u/s, échelle +17 %/s, inclinaison -37.5°/s), segment 34.70 à 35.62 ; plein jour ; en haut du cadre : le cadran entier (MX.W.DIAL) et l'article « Les cadrans optiques » épinglé (MX.W.CARD_DIAL) ; hors cadre : la ligne de 1939 remontée à ses places, la photo de L'Épervier épinglée, le téléphone ; la place du tirage (MX.W.PRINT) vide ; aucun sous-titre ; grain 5 %

Word cues: Ses@0.29 navires@0.53 un@1.30 par@1.57 un@1.79 Ses@2.30 matériels@2.59 pièce@3.46 par@3.85 pièce@4.09

Scene 1 (0.00 à 2.09 s) : P19, un par un
  TEXTE ÉCRAN : sous-titre .day « Ses navires, [boîte : un par un]. » : Ses 0.29, navires, 0.53, boîte tracée 1.28, groupe « un par un » 1.30 ; sortie 2.10 à 2.24 ; écart : chaque maquette remonte sur sa syllabe.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.54 la caméra freine sur la ligne ; 0.45 le premier cuirassé (MX.W.LINE[0]) remonte à sa place (remonter : de 40 % et flou 6 px à net, échelle 1,04 → 1, 0,2 s expo.out, avec ses ronds) ; 0.53 « navires, » ; 1.25 le second cuirassé (LINE[1]) sur « un » ; 1.52 le croiseur lourd (LINE[2]) sur « par » ; 1.74 le premier contre-torpilleur (LINE[3]) sur « un » ; 1.95 la photo de L'Épervier (MX.photoCardHTML, 456 × 300, « L’Épervier. Collection Wilfried Langry. », en MX.W.CARD_EPERVIER) arrive de la caméra (×1,2, flou 8 → 0, 0,2 s) et se pose ; 2.00 le second contre-torpilleur (LINE[4]) remonte ; 2.05 l'épingle de la photo s'enfonce (MX.W.PIN_EPERVIER).
  PISTE CAMÉRA : fin du glissé (segment 29.40 à 30.95) jusqu'à L1 à 0.54 ; 0.54 à 2.09 dérive linéaire de L1 vers L2 (2260, 1480, 1.18, 42, 0) : 142 u/s vers l'ouest, 148 u/s vers le sud.
  COUCHES ET PROFONDEUR : sujet : la maquette qui remonte ; fond : les épaves encore sous le papier, la côte du golfe du Lion ; le téléphone au bord droit, qui sort.
  OBJET-PONT ET VECTEUR : la ligne de 1939 est revenue à l'endroit exact où elle était à 5.30, dans le même ordre (la rime) ; vecteur : cran vers le sud-ouest.
  SON : un pop clair par maquette à 0.45, 1.25, 1.52, 1.74, 2.00 ; l'épingle à 2.05.
  IMAGE CLÉ : 1.85 : quatre maquettes revenues en ligne de file au large de Toulon, la quatrième dans ses ronds, la dernière encore sous le papier, le téléphone au bord droit ; « Ses navires, [un par un]. » en bas.

Scene 2 (2.09 à 4.66 s) : P20, pièce par pièce
  TEXTE ÉCRAN : « Ses matériels, [boîte : pièce par pièce]. » : Ses 2.30, matériels, 2.59, boîte tracée 3.44, groupe « pièce par pièce » 3.46 ; sortie 4.46 à 4.60 ; écart : chaque pièce se pose sur son mot.
  ÉTAPES : 2.09 à 2.59 cran vers le cadran ; 2.35, 2.45, 2.55 ses trois pièces remontent de la carte, éparses autour de sa place (MX.dialSVG : la couronne #p08-…-bezel décalée de 70 u à l'ouest et 40 u au nord, le disque noir #…-face de 80 u à l'est et 50 u au sud, l'aiguille blanche #…-hands de 110 u au nord), chacune avec ses ronds ; 2.59 « matériels, » ; 2.75 l'article « Les cadrans optiques » (MX.blogRowHTML, une entrée de la liste du blog : la vignette du cadran optique avant du Mogador, « dimanche 29 janvier 2012 », en MX.W.CARD_DIAL) arrive de la caméra et se pose ; 2.85 son épingle (MX.W.PIN_DIAL) ; 3.46 « pièce » : la couronne glisse à sa place (0,18 s power3.out) ; 3.85 « par » : le disque s'y emboîte ; 4.09 « pièce » : l'aiguille se pose et pivote jusqu'à sa position (rotation -40° → 0, 0,2 s power3.out) ; 4.29 la caméra part vers le sud.
  PISTE CAMÉRA : 2.09 à 2.59 cran de L2 vers D1 (1990, 1840, 1.20, 40, 0), power3.inOut, flou jusqu'à 8,7 px ; 2.59 à 4.29 dérive D1 → D2 ; 4.29 à 4.66 départ vers la photo (segment 34.70 à 35.62, courbe whip(0.4022)), flou 0 → 7 px.
  COUCHES ET PROFONDEUR : sujet : la pièce qui se pose ; milieu : l'article ; fond : Majorque, la photo de L'Épervier en haut à droite.
  OBJET-PONT ET VECTEUR : le cadran remonté reste ; vecteur : vers le sud, vers la place du tirage.
  SON : un pop par pièce à 2.35, 2.45, 2.55 ; l'épingle à 2.85 ; trois clics mécaniques à 3.46, 3.85, 4.09.
  IMAGE CLÉ : 4.20 : le cadran optique entier, son aiguille posée, l'article « Les cadrans optiques » épinglé dessous avec la photo du Mogador, la photo de L'Épervier en haut à droite ; « Ses matériels, [pièce par pièce]. » en bas.

## Frame 9 : Ses hommes · 35.07 → 37.90

- scene: La caméra arrive là où le tirage avait sombré : la vraie photo du Dunkerque à quai, son équipage le long du bastingage, remonte et s'épingle ; la caméra s'approche et descend de la passerelle aux marins ; le grand recul commence
- duration: 2.83s
- transition_in: cut
- status: outline
- src: compositions/frames/09-ses-hommes.html
- voiceover: "Ses hommes, de l’amiral au matelot."
- type: demo
- blueprint: camera-journey (Adapt)
- focal: la photo du Dunkerque, puis l'équipage
- rules: depth-of-field-blur
- world: light
- handoff_in: à 0.00 : cam(1937.3, 2281.9, 1.26, 33, 0) = MX.camAt(35.07), flou 7 px ; la caméra file vers le sud (2260 u/s, échelle +17 %/s, inclinaison -37.5°/s), segment 34.70 à 35.62 ; plein jour ; en haut du cadre : le cadran entier (MX.W.DIAL) et l'article « Les cadrans optiques » épinglé (MX.W.CARD_DIAL) ; hors cadre : la ligne de 1939 remontée à ses places, la photo de L'Épervier épinglée, le téléphone ; la place du tirage (MX.W.PRINT) vide ; aucun sous-titre ; grain 5 %
- handoff_out: à 2.83 : cam(1846.8, 2734.8, 0.617, 23.3, 0) dans le repère de la Méditerranée = cam(3398.8, 1261.5, 4.547, 23.3, 0) dans celui de l'Atlantique (MX.camAt(37.90)), flou 9.8 px ; le grand recul (échelle -440 %/s), segment 37.40 à 38.60, mode zoom ; plein jour ; la photo du Dunkerque épinglée au centre, petite ; l'article « Les cadrans optiques » au bord haut ; le Dunkerque et la Provence à Mers el-Kébir, le cercle rouge et « 3·7·40 » au bord bas gauche ; tous les autres objets de la carte de la Méditerranée à leurs places ; la carte couvre encore tout le cadre ; aucun sous-titre ; grain 5 %

Word cues: Ses@0.22 hommes@0.57 de@1.15 l’amiral@1.37 au@1.99 matelot@2.29

Scene 1 (0.00 à 1.13 s) : P21, la photo du Dunkerque remonte
  TEXTE ÉCRAN : sous-titre .day « Ses hommes, [boîte : de l’amiral au matelot]. » : Ses 0.22, hommes, 0.57 (suite à la scène 2) ; écart : la photo remonte 0,12 s avant « Ses ».
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.55 la caméra freine sur la place du tirage ; 0.10 la vraie photo (MX.photoCardHTML, 360 × 390, « Le Dunkerque. Collection Wilfried Langry. », en MX.W.PHOTO) remonte de la carte (remonter, 0,2 s, ronds de 260 u) ; 0.22 « Ses » ; 0.45 son épingle s'enfonce (MX.W.PIN_PHOTO) ; 0.57 « hommes, » ; 0.55 à 1.13 la caméra dérive sur la photo.
  PISTE CAMÉRA : fin du segment 34.70 à 35.62 : il freine jusqu'à DK1 (1900, 2700, 1.30, 26, 0) à 0.55 ; dérive DK1 → DK2 de 0.55 à 1.13.
  COUCHES ET PROFONDEUR : sujet : la photo ; fond : la mer, « Baléares », « Mer Méditerranée », « 3·7·40 » à gauche ; les ronds autour de la photo.
  OBJET-PONT ET VECTEUR : la vraie photo prend la place du tirage anonyme (jamais les deux à l'écran).
  SON : un pop doux à 0.10 ; l'épingle à 0.45.
  IMAGE CLÉ : 0.80 : la photo du Dunkerque épinglée sur la mer de la carte, ses ronds qui s'effacent ; « Ses hommes, » en bas.

Scene 2 (1.13 à 2.83 s) : P22, de la passerelle à l'équipage, puis le grand recul
  TEXTE ÉCRAN : boîte tracée 1.13, groupe « de l’amiral au matelot » 1.15, « . » collé ; sortie 2.62 à 2.76.
  ÉTAPES : 1.13 la caméra s'approche de la photo et y descend ; 1.37 « l’amiral » : la passerelle et la tour du Dunkerque traversent le centre du cadre ; 1.99 « au » ; 2.18 l'équipage aligné le long du bastingage, à droite du pont, est au centre ; 2.29 « matelot » ; 2.33 le grand recul commence : la photo rapetisse, la carte s'ouvre autour ; 2.83 couture. La photo reste au-dessus de la bande du sous-titre à toute image.
  PISTE CAMÉRA : 1.13 à 2.18 de DK2 vers CR1 (1995, 2762, 1.85, 24, 0), power2.inOut ; 2.18 à 2.33 dérive CR1 → CR2 ; 2.33 à 2.83 le grand recul (segment 37.40 à 38.60, mode zoom : l'échelle en logarithme, la photo reste à l'image) ; flou 0 → 9,8 px.
  COUCHES ET PROFONDEUR : sujet : les marins de la photo ; fond : la passerelle qui sort par le haut, la carte autour de la photo.
  OBJET-PONT ET VECTEUR : la photo, qui devient un point de la carte dans le grand recul ; vecteur : recul.
  SON : un souffle qui monte de 2.33 à 2.83.
  IMAGE CLÉ : 2.25 : la photo de près, l'équipage aligné le long du bastingage, la tour du Dunkerque au-dessus ; « Ses hommes, [de l’amiral au matelot]. » en bas.

## Frame 10 : De New York à Toulon · 37.90 → 42.36

- scene: Le grand recul montre que la carte de la Méditerranée est une feuille posée sur une carte de l'Atlantique ; la route de la 4e DC va de New York à Toulon ; une maquette de croiseur léger remonte au large de New York et traverse l'océan, l'article « La 4ème DC à New York » à un bout, « Les épaves de Toulon » à l'autre ; sur « drames », Toulon se fait cercler de rouge ; la caméra plonge dans l'article de Toulon
- duration: 4.46s
- transition_in: cut
- status: outline
- src: compositions/frames/10-new-york-toulon.html
- voiceover: "De New York à Toulon, ses heures de gloire… et ses drames."
- type: payoff
- blueprint: zoom-out-workspace-reveal (Adapt)
- focal: la route, puis le croiseur qui la suit, puis Toulon cerclé de rouge
- rules: svg-path-draw, motion-blur-streak
- world: light
- handoff_in: à 0.00 : cam(1846.8, 2734.8, 0.617, 23.3, 0) dans le repère de la Méditerranée = cam(3398.8, 1261.5, 4.547, 23.3, 0) dans celui de l'Atlantique (MX.camAt(37.90)), flou 9.8 px ; le grand recul (échelle -440 %/s), segment 37.40 à 38.60, mode zoom ; plein jour ; la photo du Dunkerque épinglée au centre, petite ; l'article « Les cadrans optiques » au bord haut ; le Dunkerque et la Provence à Mers el-Kébir, le cercle rouge et « 3·7·40 » au bord bas gauche ; tous les autres objets de la carte de la Méditerranée à leurs places ; la carte couvre encore tout le cadre ; aucun sous-titre ; grain 5 %
- handoff_out: à 4.46 : plein cadre #141414 uni : le corps de la carte d'article « Les épaves de Toulon », à droite de son titre, vu au plus près (MX.CAMS.CARD2 : échelle 26, à plat, rz -3) ; flou 4.7 px ; aucun texte ; grain 5 %

Word cues: De@0.19 New@0.42 York@0.64 à@0.88 Toulon@1.02 ses@1.61 heures@1.90 de@2.12 gloire@2.38 et@3.25 ses@3.50 drames@3.66

Scene 1 (0.00 à 0.70 s) : P22 (suite), la carte de l'Atlantique
  TEXTE ÉCRAN : sous-titre .day « De New York à Toulon, » : De 0.19, New 0.42, York 0.64, à 0.88, Toulon, 1.02 ; sortie 1.40 à 1.54 ; écart : New York entre dans l'image 0,1 s avant « York ».
  IMAGE DE DÉPART : handoff_in. Le monde de cette séquence est dans le repère de l'Atlantique : la carte de l'Atlantique (MX.chartSVG('atlantic', …)) dessous ; la carte de la Méditerranée posée dessus en feuille (MX.medSheetHTML) avec, dedans, tous ses objets à leurs places de MX.W ; la route (MX.routeSVG en MX.W.ROUTE) ; la caméra est MX.camAt(T) dans ce repère. La première image est identique à la dernière de la séquence 9.
  ÉTAPES : 0.00 à 0.70 le recul continue : le bord de la feuille de la Méditerranée et son ombre apparaissent, puis l'océan autour ; 0.19 « De » ; 0.45 à 0.65 les objets de la feuille, devenus minuscules, s'effacent (opacité 1 → 0 en 0,2 s ; la feuille reste) ; la route de la 4e DC en pointillés magenta est sur la carte, de New York à Toulon ; 0.40 à 0.55 le crayon la trace de New York jusqu'au large (#…-done, MX.routeDoneAt(T)) ; 0.42 « New » ; 0.50 la maquette de croiseur léger (cl, 250 u) remonte au large de New York, en MX.clAt(T) ; 0.60 l'article « La 4ème DC à New York » (MX.blogCardHTML, « août 2013 », la photo de la 4e DC de l'auteur, en MX.W.CARD_NY) arrive de la caméra et se pose au-dessus de New York ; 0.64 « York » ; 0.70 son épingle (MX.W.PIN_NY).
  PISTE CAMÉRA : fin du grand recul (segment 37.40 à 38.60, mode zoom) jusqu'à AO (2050, 1010, 0.565, 22, 0) à 0.70 : la carte de l'Atlantique remplit le cadre, New York à gauche, Toulon à droite ; flou 9,8 → 0.
  COUCHES ET PROFONDEUR : sujet : New York, l'article qui se pose et le croiseur ; milieu : la route ; fond : l'océan, la feuille de la Méditerranée à droite.
  OBJET-PONT ET VECTEUR : la feuille de la Méditerranée : le film entier tient dans ce rectangle ; la route le relie à New York.
  SON : la fin du souffle ; le crayon à 0.40 ; l'épingle à 0.70.
  IMAGE CLÉ : 0.75 : toute la carte de l'Atlantique, New York à gauche avec son article épinglé et la maquette qui vient de remonter, la route en pointillés jusqu'à la feuille de la Méditerranée à droite ; « De New York » en bas.

Scene 2 (0.70 à 3.50 s) : P23, la route, ses heures de gloire
  TEXTE ÉCRAN : « ses heures de gloire… et ses [boîte : drames]. » + [trait : drames] : ses 1.61, heures 1.90, de 2.12, gloire… 2.38, et 3.25 (suite à la scène 3).
  ÉTAPES : 0.80 à 2.70 le croiseur suit la route (MX.clAt(T)) et le crayon la trace derrière lui (MX.routeDoneAt(T)) ; 0.85 l'article « Les épaves de Toulon » (MX.blogCardHTML, « jeudi 5 mai 2016 », la photo des épaves de l'auteur, en MX.W.CARD_TOULON) arrive de la caméra et se pose au nord-ouest de Toulon ; 0.95 son épingle (MX.W.PIN_TOULON) ; 1.02 « Toulon, » ; 1.61 « ses » ; 2.00 le croiseur passe au sud des Açores ; 2.38 « gloire… » ; 2.70 il s'arrête au large de Gibraltar ; 2.70 à 3.00 le crayon finit seul la route jusqu'à Toulon, à travers la feuille de la Méditerranée ; 3.25 « et ».
  PISTE CAMÉRA : 0.70 à 3.50 vers l'est avec le croiseur (segment 38.60 à 41.40, mode curve : le centre suit une courbe qui garde le croiseur au milieu du cadre, puis se pose sur TL (3250, 853.4, 0.74, 26, 0)), power2.inOut ; flou 2 px au plus.
  COUCHES ET PROFONDEUR : sujet : le croiseur et la ligne qui se trace ; milieu : les deux articles épinglés ; fond : l'océan, la rose des vents, « OCÉAN ATLANTIQUE ».
  OBJET-PONT ET VECTEUR : la route relie les deux articles, la gloire et le drame.
  SON : le crayon de 0.80 à 3.00 ; l'épingle à 0.95.
  IMAGE CLÉ : 2.40 : le croiseur au milieu de l'océan, la route tracée derrière lui depuis New York, les pointillés devant jusqu'à Gibraltar, l'article de Toulon en haut à droite ; « ses heures de gloire… » en bas.

Scene 3 (3.50 à 4.00 s) : P24, et ses drames
  TEXTE ÉCRAN : ses 3.50, boîte tracée 3.64, drames 3.66, trait de 3.66 à 4.06 ; sortie 3.98 à 4.12.
  ÉTAPES : 3.50 la caméra est posée sur la Méditerranée et Toulon ; 3.55 à 3.95 le crayon rouge cercle Toulon (MX.lossRingSVG en MX.W.LOSS_TOULON, 0,4 s power2.out) ; 3.66 « drames » ; 3.66 à 4.06 le trait jaune se dessine sous « drames ».
  PISTE CAMÉRA : dérive linéaire de TL vers TL2 (3258, 855.4, 0.76, 26, 0) de 3.50 à 4.00.
  COUCHES ET PROFONDEUR : sujet : Toulon cerclé ; milieu : l'article des épaves au-dessus ; fond : l'Espagne, l'Italie, le croiseur arrêté au large de Gibraltar en bas à gauche.
  OBJET-PONT ET VECTEUR : l'article « Les épaves de Toulon » : la caméra va y entrer.
  SON : le crayon rouge à 3.55.
  IMAGE CLÉ : 3.85 : la route qui finit à Toulon cerclé de rouge sur la feuille de la Méditerranée, l'article « Les épaves de Toulon » épinglé au-dessus ; « ses heures de gloire… et ses [drames]. » souligné.

Scene 4 (4.00 à 4.46 s) : P25, la plongée dans l'article
  TEXTE ÉCRAN : le sous-titre est sorti à 4.12.
  ÉTAPES : 4.00 la caméra plonge dans l'article de Toulon : elle se redresse au-dessus de lui (inclinaison 26° → 0, rotation -3° pour l'aligner) et fonce dans son corps sombre, à droite de son titre ; 4.40 le cadre n'est plus que le noir #141414 de l'article ; 4.40 à 4.46 la plongée continue dans ce noir uni ; couture à 4.46.
  PISTE CAMÉRA : 4.00 à 4.40 de TL2 vers CARD (3386.7, 698.9, 22, 0, -3), power3.in, flou jusqu'à 14 px ; 4.40 à 4.46 de CARD vers CARD2 (échelle 26), linéaire.
  COUCHES ET PROFONDEUR : l'article qui grandit jusqu'au plein cadre ; la carte qui fuit autour.
  OBJET-PONT ET VECTEUR : le corps noir de l'article devient le fond du blog (séquence 11).
  SON : un whoosh cinématique de 4.00 à 4.46.
  IMAGE CLÉ : 4.30 : l'article « Les épaves de Toulon » qui fonce vers nous, son titre filé.

## Frame 11 : Montez à bord · 42.36 → 50.10

- scene: Le noir de l'article devient le blog : son fond rayé, son bandeau MARINE 1939, sa phrase ; le bouton « Montez à bord » se pose comme le « 4e » du début ; un curseur arrive d'un seul mouvement et clique directement ; tenue vivante, puis l'iris se ferme sur le bouton
- duration: 7.74s
- transition_in: cut
- status: outline
- src: compositions/frames/11-montez-a-bord.html
- voiceover: "MARINE 1939. Montez à bord."
- type: cta
- blueprint: cta-morph-press (Adapt)
- focal: le bandeau MARINE 1939, puis le bouton
- rules: cursor-click-ripple
- world: dark
- handoff_in: à 0.00 : plein cadre #141414 uni : le corps de la carte d'article « Les épaves de Toulon », à droite de son titre, vu au plus près (MX.CAMS.CARD2 : échelle 26, à plat, rz -3) ; flou 4.7 px ; aucun texte ; grain 5 %
- handoff_out: aucun (fin du film : l'iris se ferme sur le bouton de 6.24 à 7.74, noir à la dernière image)

Word cues: MARINE@0.46 1939@1.00 Montez@2.64 à@3.04 bord@3.28 (tenue jusqu'à 7.74)

Scene 1 (0.00 à 2.40 s) : P26, le blog
  TEXTE ÉCRAN : aucun sous-titre : la voix est écrite par le blog lui-même ; « MARINE 1939 » est le titre de son bandeau (l'image assets/img/blog-bandeau.png, jamais redessinée), posé sur « MARINE » (0.46) ; la phrase « Les navires, les matériels et les hommes de la flotte française de 1939. » (MX.endCardHTML) s'imprime mot à mot à partir de « 1939 » (1.00).
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.07 à 0.27 le fond rayé du blog (#070707 et #161616, MX.endCardHTML) sort du noir uni #141414 : il arrive de la caméra (échelle 1,15 → 1, flou 8 → 0, 0,2 s expo.out) et la plongée se pose ; 0.30 le bandeau arrive de la caméra (échelle 1,15 → 1, flou 10 → 0, 0,16 s expo.out) ; 0.46 « MARINE » ; 1.00 « 1939 » : la phrase commence à s'imprimer, un mot toutes les 0,07 s (1.00 à 1.91 ; chaque mot opacité 0 → 1, y +6 → 0, 0,1 s) ; 1.91 à 2.40 la carte de fin dérive.
  PISTE CAMÉRA : pas de carte : la carte de fin dérive en 2D (échelle +0,6 %/s), le bandeau glisse de 4 px/s vers la gauche, la mer de sa photo respire (échelle 1 → 1,01 en 2 s, un seul aller).
  COUCHES ET PROFONDEUR : le bandeau ; la phrase ; le fond rayé ; le grain.
  OBJET-PONT ET VECTEUR : le noir de l'article de Toulon est devenu le blog.
  SON : la musique d'élan.
  IMAGE CLÉ : 1.60 : le bandeau MARINE 1939 sur le fond rayé du blog, la phrase qui s'imprime dessous.

Scene 2 (2.40 à 3.90 s) : P27, le bouton, le clic
  TEXTE ÉCRAN : le bouton « Montez à bord » (Archivo Black, jaune, ombre dure) porte les mots de la voix (Montez 2.64, à 3.04, bord 3.28) ; l'adresse « marine1939.blogspot.com » dessous.
  ÉTAPES : 2.40 le bouton arrive de la caméra comme le « 4e » de la séquence 1 (échelle 1,25 → 1, flou 12 → 0, power2.in en 0,15 s) ; 2.55 il touche la page : il s'écrase (1,04 → 1 en 0,08 s) et son ombre dure de 8 px apparaît ; 2.70 l'adresse s'imprime (×1,1, flou 6 → 0, 0,12 s) ; 2.85 la flèche du curseur arrive du bas à droite en UN mouvement courbe (x et y sur deux courbes, 0,43 s power3.out) ; 3.28 « bord » : clic direct (45.64) : la flèche à 0,85 et le bouton à 0,97 (0,05 s, puis retour à 1 en 0,08 s) ; le bouton passe en trois couleurs : #cdd32c enfoncé (0,05 s), #f5f8a8 relâché (0,1 s), puis son jaune #e6ec37 (0,08 s) ; trois anneaux jaunes s'ouvrent autour de lui (0,6 s, décalés de 0,08 s) ; 3.51 le bouton est revenu à son jaune.
  PISTE CAMÉRA : la dérive de la carte de fin continue.
  COUCHES ET PROFONDEUR : le bouton et la flèche (avant), les anneaux, le bandeau et la phrase, le fond rayé.
  OBJET-PONT ET VECTEUR : la rime : le bouton se pose comme le tampon « 4e » (4.34) ; son jaune est celui du titre du blog.
  SON : le tampon à 2.55 (le même qu'à 4.34) ; le clic à 3.28 (45.64).
  IMAGE CLÉ : 3.40 : le bouton « Montez à bord » enfoncé dans ses anneaux jaunes, la flèche dessus, le bandeau MARINE 1939 au-dessus, l'adresse dessous.

Scene 3 (3.90 à 7.74 s) : P28, la tenue vivante, l'iris
  TEXTE ÉCRAN : la carte de fin complète, rien de nouveau.
  ÉTAPES : 3.90 la flèche s'écarte de 60 px et s'efface (0,2 s) ; 4.10 à 6.24 tenue vivante (2,96 s du clic à l'iris) : le bandeau dérive, la mer de sa photo respire, la carte de fin avance (échelle +0,6 %/s) ; 4.24 à 5.24 un reflet clair court le long du bouton, de gauche à droite (1,0 s linéaire) ; 5.24 à 6.24 il repasse une seconde fois ; 6.24 à 7.74 l'iris se ferme sur le bouton (clip-path circle de 1250 px à 0 autour de (960, 742), 1,5 s power2.in) ; noir à 7.74.
  PISTE CAMÉRA : la dérive continue jusqu'à la dernière image.
  COUCHES ET PROFONDEUR : le bouton (avant), le bandeau et la phrase, le fond rayé ; le cercle de l'iris.
  OBJET-PONT ET VECTEUR : fin du film.
  SON : la musique d'élan s'éteint en fondu de 4.50 à 7.74.
  IMAGE CLÉ : 5.50 : la carte de fin du blog au complet : le bandeau MARINE 1939, la phrase, le bouton « Montez à bord » et son reflet, l'adresse.
