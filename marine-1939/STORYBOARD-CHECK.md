---
titre: Passage des grilles de contrôle sur le storyboard de MARINE 1939 (STORYBOARD-CRAFT.md section 5, grille du skill motion-design, règles maison)
date: 2026-10-29
fichiers: STORYBOARD.md, frame.md, reference/carte.html, assets/carte/mx-kit.js, assets/carte/mx-kit.css, assets/carte/mx-data.js, styleframes/src/geo.mjs
---

# Grille de contrôle du storyboard

Verdicts :
- **tenu** ;
- **tenu après correction** : la grille a trouvé l'écart, corrigé dans le storyboard, la charte, le kit ou la référence ;
- **non tenu** : l'écart reste, avec sa raison.

Les temps sont ceux du film, sauf la mention « local ». Toutes les images citées sont rendues par `demo(T)` de
`reference/carte.html` dans Chromium.

## Vérifications mécaniques

- **Parseur du pipeline** (`product-launch-video/scripts/lib/storyboard.mjs`) : 11 séquences, 0 avertissement. La
  somme des durées fait 50.10 s, la durée du montage de la voix.
- **Passages de relais** (script de `references/method.md` § 6) : les 10 coutures sont identiques caractère pour
  caractère entre le `handoff_out` de N et le `handoff_in` de N+1. La caméra des deux côtés est la même courbe
  (`MX.SCORE`). Chaque couture tombe dans le flou d'un mouvement (de 2,5 à 13,3 px) ou dans un noir uni :

  | Couture | Séquences | État commun |
  |---|---|---|
  | 5.82 | 1 → 2 | cam(1633.3, 2054.5, 1.127, 46, 0), flou 13.3 px, au sommet du whip |
  | 9.32 | 2 → 3 | cam(1618.2, 2740.4, 1.1, 46, 0), flou 7.9 px, le Strasbourg net dans sa propre scène |
  | 13.35 | 3 → 4 | cam(2904.4, 1275.1, 1.115, 42.9, 0), flou 3.3 px |
  | 17.84 | 4 → 5 | cam(2999.7, 1313.5, 1.206, 37.9, -2.4), flou 5.9 px |
  | 23.37 | 5 → 6 | noir #0c0906 : la lampe vient de s'éteindre |
  | 26.40 | 6 → 7 | noir #0c0906 : la phrase du pivot est sortie à 26.31 |
  | 30.41 | 7 → 8 | cam(2632.4, 1260.5, 1.109, 38.3, 0), flou 2.5 px |
  | 35.07 | 8 → 9 | cam(1937.3, 2281.9, 1.26, 33, 0), flou 7 px |
  | 37.90 | 9 → 10 | Méditerranée cam(1846.8, 2734.8, 0.617, 23.3, 0) = Atlantique cam(3398.8, 1261.5, 4.547, 23.3, 0), flou 9.8 px |
  | 42.36 | 10 → 11 | #141414 uni (le corps de l'article « Les épaves de Toulon ») |

- **Paquets des sous-agents** (`frame-packets.mjs`, sortie hors projet) : 11 paquets de 18,0 à 44,6 Ko, tous sous
  48 Ko ; le contrat des sous-agents fait 20,4 Ko. Chaque paquet embarque son blueprint et une ou deux règles. Aucun
  identifiant de règle ou de blueprint n'est cité hors des lignes `rules:` et `blueprint:` (vérifié par script).
- **Blueprints et règles** : tous existent dans `hyperframes-animation/`.
  - Blueprints : zoom-out-workspace-reveal, camera-journey, spatial-pan-stations, kinetic-type-beats,
    device-surface-showcase, cta-morph-press.
  - Règles : motion-blur-streak, svg-path-draw, 3d-camera-flight, css-marker-patterns, depth-of-field-blur,
    ambient-glow-bloom, depth-scatter-assemble, cursor-click-ripple.
- **Projection** : `MX.project` a été comparée à la position réelle dans le DOM de Chromium, sur 56 points à l'image
  pris à 27 temps du film, nuit, jour et Atlantique. L'écart maximal est de 0,40 px.
- **Navires sur la mer** (règle bloquante de l'auteur) :
  - le chemin du Strasbourg, échantillonné tous les 1/240 s de 8.82 à 10.34 : aucun échantillon à terre ;
  - le chemin du croiseur de la 4e DC, de 38.40 à 41.00 : aucun échantillon à terre ;
  - les 14 positions fixes (ligne de 1939, Mers el-Kébir, Toulon) : aucune à terre.
  La référence marque d'une croix rouge, avec une erreur de console, toute maquette posée à terre : aucune erreur
  sur les 32 images clés.
- **La carte couvre le cadre**, vérifié tous les 0,1 s, à chaque image. Seule exception : la séquence 4, de 13.50 à
  16.60, où le coin haut droit montre le bord de la table dans l'ombre de la lampe (voir « Limites connues »).
- **Bande du sous-titre (y 890 à 980)**, vérifiée image par image (1/30 s) :
  - les objets du récit n'y font que passer pendant un mouvement de caméra (maquettes, tirage, photo, cartes,
    objets de la feuille pendant la plongée) ;
  - restent en dessous seulement les surfaces qui servent de fond au sous-titre : la page du manuel A en séquence 1
    et celle du manuel B en séquence 4 (thème `.paper`), la feuille de la Méditerranée en séquence 10 ;
  - les étiquettes des deux cartes ne s'y arrêtent plus jamais pendant qu'un sous-titre est affiché (voir les
    règles maison).
- **La caméra n'est jamais à l'arrêt** : de 0 à 42.36, hors du noir du pivot, aucune fenêtre de plus de 0,5 s sous
  0,5 px de déplacement par image. Le minimum, 0,016 px, est un instant isolé à 19.07, à la fin du recul vers l'ouest (19.10).
- **Écart maximal entre deux étapes datées**, par séquence (temps locaux) :

  | Séq. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | Écart max (s) | 0,34 | 0,33 | 0,43 | 0,45 | 0,48 | 0,53 | 0,55 | 0,71 | 0,62 | 0,38 | 1,50 |

  Le 1,50 s de la séquence 11 est l'iris lui-même, un geste continu qui ferme le film. Dans les 3 premières secondes,
  l'écart maximal est de 0,30 s.
- **Sous-titres** : 14 morceaux, de 17 à 41 signes (45 au plus).
  - Une boîte par phrase. « Ses navires. Ses matériels. Ses hommes. » compte trois phrases et porte trois boîtes,
    une seule allumée à la fois.
  - Trois traits seulement.
  - Le signe de ponctuation qui suit un mot encadré est dans sa boîte, comme dans le film de référence.
- Aucun tiret cadratin ni demi-cadratin, aucun `{{` dans STORYBOARD.md, frame.md, DIRECTIONS.md, la référence et le
  kit.

## Les 15 points (STORYBOARD-CRAFT.md, section 5)

**1. En-tête (monde, fonds texturés, couleurs de rôle, signatures datées, registres de texte) : tenu.**
- MONDE donne les stations de chaque acte avec leurs coordonnées (`MX.W`). La charte en fait le tableau avec la
  durée de vie de chaque objet.
- Fonds texturés : le grain du papier des pages, la texture de la carte (`.mx-chart-tex`), le grain d'image (6 % la
  nuit, 5 % le jour) et le fond rayé du blog.
- Couleurs de rôle : jaune, magenta, rouge, graphite, noir du blog.
- Trois signatures, avec leurs occurrences datées : les ronds dans l'eau, le crayon, le tampon.
- Les registres de texte ont chacun leur mouvement : sous-titre, boîte, trait, moment typographique, texte du monde.
- Les rimes sont écrites dans l'en-tête.

**2. Une piste caméra dans chaque plan, jamais d'arrêt de plus de 0,5 s hors silence écrit : tenu.**
- Chaque Scene a sa ligne PISTE CAMÉRA : la dérive chiffrée (u/s, %/s) et chaque mouvement avec son cadrage cible
  (`MX.CAMS`). La partition globale est en tête.
- Le contrôle mécanique ne trouve aucun arrêt.
- Le pivot n'a pas de monde : la poussée lente de la phrase en tient lieu, du premier mot à sa sortie (0.30 à 2.80
  local).
- La carte de fin dérive en 2D (+0,6 %/s) jusqu'à la dernière image.

**3. Aucun trou de plus de 1 s entre deux étapes (0,3 s dans les 3 premières secondes) : tenu après correction.**
- Passe précédente :
  - un pas du chariot de la machine à écrire a été ajouté à 1.22, pour ne pas dépasser 0,3 s dans l'accroche ;
  - le halo du téléphone atteint Toulon à 1.75 (local, séquence 7).
- Ce passage, sur la tenue finale de la séquence 11 : elle attendait 1,2 s sur un seul reflet. Elle a maintenant deux
  reflets de 1,0 s (4.24 et 5.24 local), puis l'iris à 6.24 : rien n'attend plus de 1,0 s.

**4. Apparitions de 0,2 s au plus, dérives d'au moins 1 s, zone 0,3 à 0,9 s réservée à la caméra et au curseur (expo, power3 ou power4) : tenu après correction, avec trois exceptions assumées.**

Corrigé à la passe précédente :
- le naufrage se fait en deux vitesses : 0,2 s power2.in, puis 1,0 s linéaire, au lieu d'un seul geste de 0,6 s ;
- la remontée se fait en 0,2 s ;
- les lueurs et les fondus ont été raccourcis.

Corrigé à ce passage :
- la bascule du début, le cran qui prend le Strasbourg et la pose sur Toulon (0,5 à 0,7 s) passent de power2.inOut à
  power3.inOut ;
- la lumière de la page qui s'efface : 0,6 s → 1,0 s linéaire (4.70 à 5.70) ;
- les gerbes de Mers el-Kébir : 0,4 s → elles paraissent d'un coup, puis s'effacent en 1,0 s ;
- les petits ronds au départ et à l'arrivée du Strasbourg : 0,8 s → 1,0 s linéaire ;
- l'ombre du manuel qui tombe grandissait en 0,6 s. Elle paraît maintenant en 0,2 s, puis se resserre avec la chute ;
- la chute du manuel : 0,3 s → 0,26 s, comme le « 4e » ;
- « renflouer » qui remonte : 0,3 s → 0,2 s expo.out ;
- la poussée de la phrase du pivot : 1,0 s → 2,5 s ;
- le fond rayé du blog sortait du noir en fondu de 0,3 s. Il arrive maintenant de la caméra en 0,2 s expo.out
  (×1,15, flou 8).

Exceptions assumées :
- (a) **Les tracés de ligne** : fumées 0,4 s, vagues d'étrave 0,3 s, cercles rouges 0,4 s, traits des pics 0,4 s, fin
  de la route 0,3 s. Un trait qui se dessine a une vitesse de plume ; plus court, il ne se lit plus comme tracé. Le
  film de référence trace aussi ses traits en 0,4 s.
- (b) **Six dérives de moins de 1 s entre deux crans**, imposées par des phrases de moins de 1,5 s :

  | Dérive | Durée | Sur quoi |
  |---|---|---|
  | 17.05 à 17.30 | 0,25 s | les trois lignes |
  | 21.20 à 22.00 | 0,80 s | le cadran, « Ses matériels. » |
  | 22.50 à 23.37 | 0,87 s | le tirage, puis la lampe s'éteint |
  | 35.62 à 36.20 | 0,58 s | la photo du Dunkerque |
  | 37.25 à 37.40 | 0,15 s | l'équipage |
  | 41.40 à 41.90 | 0,50 s | Toulon cerclé |

  La caméra ne s'y arrête pas : chaque dérive prolonge le vecteur d'arrivée et dure le temps de sa phrase.
- (c) **Le curseur** (0,43 s power3.out) et ses anneaux de clic (0,6 s) sont dans la zone, comme la règle le permet.

**5. Chaque tenue de plus de 0,5 s nomme sa couche vivante, aucune image figée, fin comprise : tenu.**

| Tenue | Couche vivante |
|---|---|
| l'escadre qui attend (séquence 2) | dérive, poussée, vacillement de la lampe |
| la flotte amarrée à Toulon (séquence 3) | dérive, vacillement, tressaillement à 2.00 local |
| le manuel posé (séquence 4) | dérive, poussière dans la lumière |
| le pivot | poussée de la phrase, grain |
| le téléphone dans le noir | halo qui s'ouvre |
| la carte de fin | dérive du bandeau, mer qui respire, carte qui avance, deux reflets, puis l'iris |

**6. Chaque jonction nomme son objet-pont ou son vecteur, zéro dédoublement : tenu.**

| Couture | Objet-pont (nouveau rôle) ou vecteur |
|---|---|
| 5.82 | la gravure devenue ligne de maquettes ; whip vers le sud-sud-ouest |
| 9.32 | le Strasbourg, qui s'échappe de Mers el-Kébir et va s'amarrer à Toulon |
| 13.35 | la rade vide, où le manuel va tomber ; recul vers le sud-est |
| 17.84 | les trois maquettes restées de la ligne, qui vont sombrer ; recul vers l'ouest |
| 23.37 | la lampe qui s'éteint fait le noir du pivot |
| 26.40 | le noir, où un écran s'allume |
| 30.41 | les épaves sous le papier, qui remontent ; glissé vers l'ouest |
| 35.07 | la place du tirage, où la vraie photo remonte ; glissé vers le sud |
| 37.90 | la carte de la Méditerranée, qui devient une feuille posée sur l'Atlantique |
| 42.36 | le corps noir de l'article de Toulon, qui devient le fond du blog |

Aucun objet n'est à l'écran deux fois :
- le « 4e » en vol cède sa place au tampon de la page dans la même image ;
- le tirage disparaît avec la lampe (23.37) et la vraie photo remonte à 35.17 : jamais les deux à l'écran ;
- l'épave sous le papier et la maquette qui remonte sont le même objet ;
- le Strasbourg passe d'une scène à l'autre sans se dédoubler ;
- le téléphone remplace le manuel B après le noir ;
- les objets de la Méditerranée de la séquence 10 sont ceux de la séquence 9, aux mêmes places, dans la feuille.

**7. Deux transitions « effet » au plus : tenu (aucune).**
- Les deux changements d'acte passent par la lumière du monde : la lampe qui s'éteint, l'écran qui s'allume.
- L'entrée dans la carte de fin passe par un objet : le corps noir de l'article.
- Le grand recul de 37.40 à 38.60 est un mouvement de caméra dans un monde continu : la même carte, à une autre
  échelle, et non un zoom à travers.

**8. Coupes franches au quota de la voix, avec leur ligne « t, premier mot, raison » : tenu (aucune).**
- Voix narrative, quota de 0 à 4 : le film n'a aucune coupe franche.
- Les 11 séquences s'enchaînent bout à bout (`transition_in: cut`), mais l'image est continue : la même caméra, les
  mêmes objets de part et d'autre de chaque couture.

**9. Chaque entrée d'élément principal a un état de départ écrit (×1,1 à ×6 + flou, ou un point), aucun fondu à taille finale : tenu.**

| Mode d'entrée | Éléments |
|---|---|
| arrive de la caméra (×1,2 à ×1,6, flou 4 à 12) | les lettres tapées, le « 4e », le manuel B, les photos, les cartes d'articles, le bandeau, le bouton, l'adresse, le fond rayé |
| remonte de la carte (flou 6, 40 %, ×1,04, depuis l'épave) | les maquettes, les pièces du cadran, la photo du Dunkerque, le croiseur |
| se trace | les dates au crayon, les cercles, la route, les surligneurs |
| se révèle par la lumière ou la caméra | la flotte sous la lampe, le téléphone par son propre écran, les épaves par le jour qui les atteint |

Le sous-titre et la phrase du blog suivent leur registre de texte (opacité, y +8, flou 6, 0,14 s).

**10. Écart de chaque mot-image, changement de composition sur le premier mot de l'idée ou dans un silence, chaque silence de plus de 0,4 s écrit comme un plan : tenu après correction.**

Corrections de ce passage :
- les vagues d'étrave de la gravure partent sur « entre » (2.90 au lieu de 3.00) : la flotte se met en route sur le
  verbe ;
- la bascule part à 4.70, 0,1 s avant « flotte », au lieu de 4.50 ;
- le cadran et le tirage sombraient sur « Ses », avant leur nom. Le nom tombait donc sur un objet déjà à moitié
  enfoncé. Ils sont maintenant au centre avant leur nom, et sombrent 0,1 s après (21.48 et 22.92) ;
- l'approche de la page 217 part à 15.56, 0,1 s avant « toute », au lieu de 15.25 ;
- le trait sous « trois lignes » se dessine avec le groupe (17.10 à 17.50) : il est entier avant la sortie du
  sous-titre.

| Mot-image | Image | Écart |
|---|---|---|
| « Septembre 1939 » | chaque lettre tapée sur sa syllabe | synchro |
| « France » | les fumées de la gravure | avance de 0,10 s |
| « entre » | les vagues d'étrave : la flotte se met en route | +0,02 s |
| « quatrième » | le « 4e » touche la page | contact |
| « flotte » | la bascule part | avance de 0,10 s |
| « 1940 » | « 3·7·40 » s'écrit | avance de 0,30 s |
| « Mers » | la première gerbe ; la Bretagne sombre | avance de 0,20 s et de 0,05 s |
| « 1942 » | « 27·11·42 » s'écrit | avance de 0,36 s |
| « Toulon » | le premier sabordage | avance de 0,34 s |
| « Dans » | le manuel est tombé | avance de 0,20 s |
| « trois lignes » | les trois surligneurs, le dernier juste avant le mot | avance de 0,09 s |
| « sombré » | la première maquette sombre | +0,10 s |
| « matériels » | le cadran au centre, puis il sombre | avance de 0,18 s, puis +0,10 s |
| « hommes » | le tirage au centre, puis il sombre | avance de 0,32 s, puis +0,10 s |
| « renflouer » | le mot remonte d'en bas | synchro |
| « MARINE » | l'écran du téléphone s'allume | avance de 0,54 s |
| « revivre » | le jour se lève | avance de 0,44 s |
| « un par un » | chaque maquette remonte sur sa syllabe | avance de 0,05 s, trois fois |
| « pièce par pièce » | chaque pièce se pose sur son mot | contact, trois fois |
| « hommes » | la photo du Dunkerque remonte | avance de 0,47 s |
| « l'amiral » | la passerelle passe au centre | synchro |
| « matelot » | l'équipage au centre | avance de 0,11 s |
| « York » | New York entre dans l'image | avance de 0,10 s |
| « Toulon » | l'article « Les épaves de Toulon » se pose | avance de 0,17 s |
| « drames » | Toulon se fait cercler de rouge | avance de 0,11 s |
| « MARINE » | le bandeau du blog se pose | avance de 0,16 s |
| « Montez à bord » | le bouton se pose ; le clic tombe sur « bord » | avance de 0,09 s ; contact |

Changements de composition :
- Dans un silence de la voix :
  - le glissé vers la gravure (2.00) ;
  - le whip vers Mers el-Kébir, dont l'image la plus rapide, 5.82, tombe dans le silence ;
  - la prise du Strasbourg, qui finit à 9.32 ;
  - la caméra qui se relève (12.72) ;
  - le recul vers l'ouest, au sommet à 17.84 ;
  - le cran vers le cadran (20.70) et le cran vers le tirage (22.00) ;
  - la lampe qui s'éteint (23.17) ;
  - l'écran qui s'allume (26.62) ;
  - le glissé vers la ligne, au sommet à 30.41 ;
  - le cran vers le cadran remonté (32.50) ;
  - le glissé vers la photo, au sommet à 35.07 ;
  - la plongée dans l'article (41.90).
- Sur le premier mot de l'idée, à 0,1 s près : la bascule (« flotte »), l'approche de la page 217 (« toute »), la
  descente vers l'équipage (« de »), la carte de l'Atlantique qui remplit le cadre (« De », 38.09 ; le bord de la
  feuille est à l'image dès 37.92).
- Suivis du même sujet, pas de nouveau plan : le Strasbourg jusqu'à son poste à Toulon, le croiseur jusqu'à Gibraltar.
- Les 19 silences de plus de 0,4 s sont listés en tête, chacun avec son action.

**11. Au moins 3 verbes de la voix joués physiquement, contact à ± 0,1 s : tenu.**

| Verbe | Action physique | Contact | Mot |
|---|---|---|---|
| « entre (en guerre) » | la flotte gravée se met en route (vagues d'étrave) | 2.90 | 2.88 |
| « a sombré » | la première maquette sombre | 19.24 | 19.14 |
| « renflouer » | le mot remonte d'en bas ; les objets remontent ensuite | 24.48 | 24.48 |
| « Montez (à bord) » | le clic sur le bouton | 45.64 | 45.64 (« bord ») |

S'y ajoutent « un par un » (31.66, 31.93, 32.15 pour 31.71, 31.98, 32.20) et « pièce par pièce » (33.87, 34.26, 34.50,
au mot près).

**12. La moitié des plans à 3 niveaux, une parallaxe par acte, chaque mot géant devant ou derrière un objet : tenu pour la parallaxe et les géants ; tenu au sens large pour les 3 niveaux (21 plans sur 28) ; non tenu au sens strict de l'avant-plan flou (7 plans sur 28).**
- **3 niveaux au sens large** (avant-plan ou plan moyen, sujet, fond) : 21 plans sur 28.
- **Avant-plan réellement flou** : 7 plans sur 28.
  - P1 : l'ombre de la gouttière.
  - P2 : le « 4e » en vol.
  - P9 : le manuel qui tombe.
  - P12 à P14 : le manuel B flou au bord droit. La référence le rend maintenant : 4 px à partir de 19.04.
  - P17 : le noir des bords autour du halo.
- **Pourquoi pas plus** : le monde est une carte à plat, vue sous 22 à 46°. Un avant-plan flou par-dessus la carte
  serait un grand calque flou, interdit par les règles de rendu (aucun objet flou de plus de 1800 px). La profondeur
  vient d'ailleurs :
  - la perspective de la caméra inclinée ;
  - les ombres portées des maquettes, des livres et des photos ;
  - le flou propre des objets qui arrivent, sombrent ou remontent.
- **Parallaxe** : la carte inclinée donne une vraie perspective, son bord proche file plus vite que le lointain. Par
  acte :
  - acte 1 : les calques de la lampe, fixes à l'écran, au-dessus de la carte qui bouge ;
  - acte 2 : la perspective sous 25 à 44° ;
  - acte 3 : le bandeau glisse à 4 px/s pendant que la carte de fin avance de 0,6 %/s.
- **Géants** : aucun mot géant.

**13. Couches animées : régime courant d'au moins 2, pic de 3 à 4, un seul élément actif à la fois : tenu.**
- Le régime courant est la dérive de la caméra plus un élément actif.
- Les pics à 3 sont nommés dans les lignes COUCHES :
  - 4.30 : les fumées, le « 4e », le sous-titre ;
  - Mers el-Kébir : les gerbes, le naufrage, le cercle ;
  - Toulon : le naufrage, les ronds, la date ;
  - « Le reste a sombré » : les naufrages, les ronds, le sous-titre ;
  - le clic : le bouton, la flèche, les anneaux.

**14. Rime : un mécanisme ou un objet de l'accroche rejoué à l'identique avant la fin : tenu.**
- Le bouton « Montez à bord » se pose comme le « 4e » du début : de la caméra, ×1,25, flou 12, power2.in, écrasement
  1,04 → 1, même bruit de tampon (44.91 et 4.34).
- La ligne de 1939 remonte aux mêmes places, dans le même ordre (5.30 et 30.86 à 32.41).
- La vraie photo du Dunkerque remonte là où le tirage avait sombré (22.92 et 35.17).
- Toulon, sabordé à 11.42, est cerclé de rouge à 41.45.

**15. Fin : un geste qui rassemble le film, un curseur qui arrive en courbe et clique directement (3 couleurs, onde), 2 à 3 s de tenue vivante, sortie en iris ou au noir : tenu après correction.**
- **Le geste qui rassemble le film** : le grand recul de 37.40 à 38.60. Toute la carte de la Méditerranée, avec tous
  les objets du film à leurs places, devient une feuille posée sur l'Atlantique. La route relie ensuite New York à
  Toulon.
- **Le curseur** arrive d'un seul mouvement courbe (0,43 s power3.out, x et y sur deux courbes). Il clique
  directement sur « bord » (45.64). Trois anneaux jaunes suivent.
- **La tenue** dure 2,96 s, de 45.64 à 48.60 : la flèche s'écarte, le bandeau dérive, la mer respire, deux reflets
  passent sur le bouton.
- **La sortie** : l'iris se ferme sur le bouton en 1,5 s, noir à la dernière image.
- **Corrections** :
  - la pression du bouton passait par deux couleurs, elle en a maintenant trois (#cdd32c enfoncé, #f5f8a8 relâché,
    puis son jaune #e6ec37) ;
  - l'iris part à 48.60 au lieu de 49.10 : la tenue durait 3,46 s ;
  - un seul reflet → deux.

## La grille du skill (motion-design, « Control grid »)

- **Première image** : la page du manuel, où la date va se taper sur le premier mot. Jamais le logo. Le premier mot,
  « Septembre 1939 », nomme l'époque des lecteurs visés. Tenu.
- **Chaque phrase a sa composition** ; le sous-titre arrive mot à mot en bas au centre, sauf quand le monde écrit
  lui-même les mots : la date tapée, le pivot centré, le bandeau et le bouton. Tenu.
- **Un mot clé par phrase en boîte jaune**, une couleur par rôle, trois pics soulignés, aucun mot géant. Tenu.
- **Une seule chose à regarder à la fois** ; pas de disposition côte à côte ; aucun décor sans rôle. Tenu.
- **La douleur dans un outil que la cible reconnaît** : le manuel d'histoire, et la carte marine avec ses maquettes,
  comme sur une table d'état-major. Tenu.
- **Un pivot explicite** : une phrase sur le noir, après la lampe éteinte, avant la marque. Le sol change avec lui :
  la nuit devient le jour. Tenu.
- **La marque après le pivot** : MARINE 1939 paraît à 26.62, sur l'écran du téléphone. Tenu.
- **Coupes et fondus** : aucune coupe franche, aucun fondu ; chaque couture suit son passage de relais ; aucun
  aller-retour de caméra. Tenu, avec une réserve : voir « Caméra » dans les règles maison.
- **Chiffres** : chaque chiffre se tape, s'écrit au crayon ou arrive de la caméra ; aucun n'arrive en fondu. Tenu.
  - « 1939 » est tapé.
  - Le « 4e » arrive de la caméra.
  - « 3·7·40 » et « 27·11·42 » s'écrivent au crayon.
- **Le produit par des gestes dans sa vraie interface** : tenu en partie.
  - Les gestes : l'écran qui s'allume, les articles qui se posent et s'épinglent, le clic final.
  - La page d'accueil sur le téléphone est une capture fixe de l'auteur : elle tient entière dans l'écran, il n'y a
    rien à faire défiler (voir « Limites connues »).
- **Un élément de l'accroche revient avant la fin** : le « 4e » devenu bouton, la ligne de 1939. Tenu.
- **Carte de fin** : un bouton, un curseur qui arrive et clique directement, 2,96 s de tenue vivante, puis l'iris.
  Tenu après correction (point 15).
- **Lisible sans le son** du début à la fin : sous-titres, texte du monde, pivot écrit. Tenu.
- **Rythme** : du nouveau toutes les 0,5 à 1 s, aucune tenue figée, jamais la même disposition plus de 3 s. Tenu
  après correction : la carte de fin est complète à 45.06, la flèche part à 46.26, l'iris commence à 48.60 et la
  carte avance pendant tout ce temps.
- **Rendu** : à contrôler à l'étape 6. Le storyboard ne prévoit aucune animation de `letterSpacing`, aucun segment noir
  non voulu, aucun élément hors de sa séquence. Le niveau de la musique est réglé à l'étape 5.

## Les règles maison

- **Sous-titres** en bas au centre, 62 px, 45 signes au plus, mot à mot, rien d'autre dans la bande : tenu après
  correction.
  - La grille a trouvé quatre étiquettes de carte posées dans la bande pendant qu'un sous-titre était affiché :
    « ALGÉRIE » à Mers el-Kébir, « SARDAIGNE » sur le manuel B, la rose des vents et « OCÉAN ATLANTIQUE » en
    séquence 10. Un cinquième, « GIBRALTAR », y entrait à la fin de la séquence 10.
  - « ALGÉRIE » passe à l'intérieur des terres, hors du cadre ; « SARDAIGNE » monte sur le nord de l'île ;
    « GIBRALTAR » passe au nord du détroit.
  - La rose et le libellé de l'océan passent au nord de la route, entre les deux cartes d'articles (le libellé un peu
    plus petit, 96 u). Corrigé dans `mx-kit.js`, `geo.mjs`, `geo.json`, `mx-data.js` et frame.md.
  - Après correction, aucune étiquette ne s'arrête dans la bande ; certaines y passent un instant pendant un
    mouvement.
- **Mots clés en boîte jaune**, jamais noire. Tenu.
  - Le signe de ponctuation qui suit le mot est dans la boîte. Avant, il en restait séparé par la marge de la boîte,
    ce qui donnait « navires . » une fois la boîte retirée.
  - Le mot encadré garde 0,08 em de marge de chaque côté.
- **Pics** : trois traits fins sous « trois lignes », « renflouer », « drames ». Tenu.
- **Une seule chose à regarder** : la caméra isole le sujet de chaque phrase. Tenu.
  - Elle ne montre l'ensemble qu'à 5.30 (la flotte de 1939) et à 38.60 (l'Atlantique).
  - Le Strasbourg qui s'échappe est net dans sa propre scène pendant que la carte file. La référence le rend
    maintenant.
- **Caméra** : jamais d'aller-retour sur le décor ; chaque plan continue le mouvement du précédent. Tenu, avec une
  réserve.
  - Le seul retour en arrière est le recul vers l'ouest de 17.30, qui suit l'approche vers l'est de la page 217 (340 u).
  - La caméra quitte alors un objet, le livre, pour un autre sujet à l'ouest, la ligne qui va sombrer, en changeant
    d'échelle. Elle ne repasse pas sur le même décor.
- **Dispositions côte à côte** : aucune. Sans objet.
- **Zéro décor sans rôle** : la carte, les maquettes, les livres, le cadran, les photos, le téléphone, les articles.
  Aucun accessoire (frame.md, props). Tenu.
- **Aucune ligne qui traverse une phrase** :
  - le pivot est sur le noir ;
  - la route de la 4e DC passe au-dessus de la bande à Toulon (cadrage TL et caméra en courbe) ;
  - le graticule de la carte est le fond, pas un trait du décor.
  Tenu.
- **Vraies interfaces récentes** : la capture de la page d'accueil fournie par l'auteur, le bandeau du blog, les
  photos de sa collection avec leur filigrane, les articles avec leurs vrais titres et leurs vraies dates. Tenu, sauf
  la capture de l'article « Les cadrans optiques », qui manque.
- **Curseur** : un seul mouvement, clic direct. Tenu.
- **Rythme** : deux vitesses (dérives de la partition, gestes de 1 à 6 images) ; les éléments arrivent trop grands et
  flous, puis se posent. Tenu.
- **Musique, bruitages** : étape 5. La ligne SON est une proposition ; l'image ne bougera pas pour le son.
- **Script** : validé à l'étape 1. L'offre n'est pas détaillée ; les douleurs sont concrètes : Mers el-Kébir, Toulon,
  trois lignes dans les manuels. La solution dit qui fait le travail : « MARINE 1939 fait revivre cette flotte ».

## Limites connues

- **La capture de l'article « Les cadrans optiques » manque.** Sa carte d'article est sans image tant que l'auteur ne
  l'a pas fournie (séquences 8 à 10). Avec la capture, elle prendra la même forme que les deux autres.
- **La page d'accueil du blog sur le téléphone est une capture fixe** (1080 × 1976). Elle tient entière dans l'écran du
  téléphone : il n'y a rien à faire défiler. Le produit se montre par l'écran qui s'allume, les articles qui se
  posent et le clic final.
- **Séquence 4, de 13.50 à 16.60** : le coin haut droit du cadre montre le bord de la table dans l'ombre de la lampe.
  C'est la seule image où la carte ne couvre pas tout le cadre.
- **Surfaces sous le sous-titre** : la page du manuel en séquences 1 et 4, la feuille de la Méditerranée en
  séquence 10. Ce sont des fonds, pas des objets : le sous-titre y prend le thème `.paper` ou `.day`.
- **Chartes de style et carte de l'Atlantique** : la carte de l'Atlantique a été élargie pour le film (88° O à 40° E,
  21 à 58° N, 4800 × 2100 u), et sa rose et son libellé ont changé de place.
  - `styleframes/D7.html` et son PNG gardent la carte de l'étape des styles (80° O à 16° E, 24 à 54° N, 3600 × 1900 u).
  - Le storyboard et la référence font foi.
  - Régénérer les styles depuis `styleframes/src/` changerait D7.
- **La référence montre l'état du monde, pas tous les effets.** `reference/carte.html` ne dessine pas certains gestes
  que les séquences ajouteront depuis le storyboard :
  - les secousses ;
  - la poussière ;
  - le vacillement de la lampe ;
  - la lumière qui gagne la ligne ;
  - le tressaillement de la flotte ;
  - la respiration de la mer du bandeau.
- **Coût de rendu** : le grand recul et la séquence 10 font rendre la carte de l'Atlantique avec la feuille de la
  Méditerranée et tous ses objets ; la plongée finale va jusqu'à l'échelle 26. Dans Chromium, la référence met jusqu'à
  8 s par image en séquence 10, contre 2 à 3 s ailleurs. À surveiller au premier rendu de brouillon.
- **Sons** : les temps des bruitages et de la musique sont une proposition. Ils seront verrouillés sur l'image à
  l'étape 5.
