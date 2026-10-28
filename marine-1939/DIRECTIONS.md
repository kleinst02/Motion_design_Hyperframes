# MARINE 1939 : directions de storyboard

Direction retenue : **D « Le manuel et la carte »** (le livre de A pour l'ouverture, puis la carte des opérations
de B), décrite plus bas, avant la section « Choix ». Les directions A, B et C restent ci-dessous pour mémoire.

Même voix, même musique, mêmes bruitages pour les trois directions : l'horloge ne bouge pas, seule la mise en scène
change. Grammaire visée : `patterns/STORYBOARD-CRAFT.md` (un monde, une caméra qui s'y déplace, un objet-pont à chaque
transition, deux vitesses, un événement toutes les 0,5 à 1 s, rien d'immobile).

Vraies interfaces : le blog [marine1939.blogspot.com](http://marine1939.blogspot.com/), et ses articles montrés avec
leurs vrais titres et leurs vraies dates. Dans les images de style, les articles sont des cartes dessinées dans le style
du film, et les navires des silhouettes stylisées de types de 1939 (cuirassé type Dunkerque, croiseur lourd,
contre-torpilleur, sous-marin), pas des navires précis. Pour la charte, il faudra des captures récentes du blog et, si
leurs droits le permettent, des photos de la collection de l'auteur. Aucune image d'archives tierce n'est utilisée.

Depuis le choix de D, l'auteur a fourni des captures du blog et des photos de sa collection : elles sont dans
`assets/img/` et la direction D les utilise telles quelles (voir plus bas).

Les pages des images de style sont générées par `styleframes/src/styleframes.py` (côtes Natural Earth projetées par
`styleframes/src/geo.mjs` dans `styleframes/src/geo.json`), puis rendues en PNG par
`.claude/skills/motion-design/scripts/render-styleframes.py`.

## Minutage global de la voix (secondes du film)

Septembre 0.04 · 1939 0.78 · La 2.32 · France 2.50 · entre 2.88 · en 3.28 · guerre 3.48 · avec 3.74 · la 4.08 ·
quatrième 4.34 · flotte 4.80 · du 5.00 · monde 5.24 · Juillet 6.15 · 1940 6.72 · Mers 8.07 · el-Kébir 8.62 ·
Novembre 9.59 · 1942 10.28 · Toulon 11.76 · [silence : la page qui tourne, 12.10 à 14.60] · Dans 14.60 · les 14.78 ·
manuels 15.02 · toute 15.66 · son 15.92 · histoire 16.12 · tient 16.56 · en 16.84 · trois 17.10 · lignes 17.26 ·
Le 18.12 · reste 18.34 · a 18.84 · sombré 19.14 · Ses 20.01 · navires 20.22 · Ses 21.14 · matériels 21.38 · Ses 22.48 ·
hommes 22.82 · Il 23.67 · est 23.86 · temps 24.12 · de 24.24 · renflouer 24.48 · leur 25.00 · histoire 25.16 ·
[pivot sur noir : silence de 25.64 à 27.16] · MARINE 27.16 · 1939 27.60 · fait 28.72 · revivre 29.14 · cette 29.78 ·
flotte 29.98 · Ses 30.70 · navires 30.94 · un 31.71 · par 31.98 · un 32.20 · Ses 32.71 · matériels 33.00 · pièce 33.87 ·
par 34.26 · pièce 34.50 · Ses 35.29 · hommes 35.64 · de 36.22 · l'amiral 36.44 · au 37.06 · matelot 37.36 · De 38.09 ·
New 38.32 · York 38.54 · à 38.78 · Toulon 38.92 · ses 39.51 · heures 39.80 · de 40.02 · gloire 40.28 · et 41.15 ·
ses 41.40 · drames 41.56 · MARINE 42.82 · 1939 43.36 · Montez 45.00 · à 45.40 · bord 45.64 ·
[fin de la voix 45.87 ; carte de fin jusqu'à 50.10]

## A. « Le manuel et la mer » (recommandée)

**Concept.** Un seul monde vertical : la page d'un manuel d'histoire posée sur la mer. L'acte de la douleur commence
sur le papier : la date tapée à la machine, la flotte gravée en ligne de file, Mers el-Kébir, Toulon. Au silence, une
main tourne la page. Sur « Le reste a sombré », la page devient la surface de l'eau et la caméra plonge : la douleur vit
dans le bleu nuit des profondeurs, le pivot est le noir du fond. Sur « renflouer », la lumière revient d'en haut et tout
remonte : la solution vit près de la surface, dans un bleu clair, jusqu'à la carte de fin sur la mer de nuit. C'est la
direction qui joue chaque mot du script au pied de la lettre (manuels, sombré, renflouer, un par un).

**Fil des objets-ponts.**
- 0.04 « Septembre 1939 » : la date se tape sur la page ; 2.32, la caméra recule sur la gravure de la flotte en ligne de
  file ; 4.34, « 4e » fonce depuis la caméra et se pose dans la marge.
- 6.15 « Mers el-Kébir » : un éclair de salve dans la gravure ; 9.59 « Toulon » : les navires gravés s'enfoncent sous
  la ligne de flottaison, qui est un trait du texte.
- 12.10, le silence : une main tourne la page, le chapitre suivant commence ; 14.60, retour sur la page : il ne reste que
  trois lignes de texte.
- 18.12 « Le reste a sombré » : la ligne de flottaison devient la surface de l'eau et la caméra passe dessous ; 20.01,
  21.14, 22.48 : trois objets coulent l'un après l'autre, un navire, un cadran de conduite de tir, une photo d'équipage.
- 23.67, le pivot : le noir du fond, la phrase seule.
- 27.16 « fait revivre » : un rai de lumière, le titre du blog ; 30.70, 32.71, 35.29 : les trois objets remontent et
  deviennent des articles du blog (la fiche du navire, l'article « Les cadrans optiques », la photo d'équipage, nette).
- 38.09 « De New York à Toulon » : deux articles remontent côte à côte (« La 4ème DC à New York », « Les épaves de
  Toulon ») ; Toulon, qui fermait l'accroche, revient.
- 42.82, la carte de fin : la surface de la mer de nuit, le titre MARINE 1939, le bouton « Montez à bord ».
- Signatures : « sous la ligne », un objet passe sous la ligne de flottaison (9.6, 18.1, 20.0, 21.1, 22.5) ; « la
  remontée », un objet remonte des profondeurs, trop grand et flou puis net (27.2, 30.7, 32.7, 35.3, 38.1). Rime : la
  ligne de texte du manuel (0 s) devient la ligne d'horizon de la carte de fin (42.8 s).
- Accent : rouge pompon (#c8312a, le pompon du bachi), pour le mot clé et le bouton.

**Images de style.**
- A1 (4,40 s, « avec la quatrième ») : gros plan sur la page du manuel, papier grainé, gouttière et page d'en face
  floues en avant-plan à gauche ; « SEPTEMBRE 1939 » tapé à la machine ; la gravure de la flotte en ligne de file
  (cuirassé, croiseur, contre-torpilleurs), fumée hachurée, vagues d'étrave ; « 4e » rouge, énorme et flou, arrive
  depuis la caméra par la droite avec sa traînée. Sous-titre « avec la [quatrième] ».
- A2 (21,70 s, « Ses matériels. ») : sous l'eau, la page devenue surface tout en haut (les trois lignes du manuel s'y
  devinent à l'envers), rais de lumière ; le cuirassé déjà loin, flou, qui pique de l'étrave vers le fond ; le cadran de
  conduite de tir, net, coule avec sa traînée de bulles ; la photo d'équipage, floue, dérive en avant-plan. Sous-titre
  « Ses [matériels]. »
- A3 (32,35 s, « Ses navires, un par un. ») : près de la surface, la lumière est revenue ; la fiche « Le sous-marin
  Amphitrite » remonte, nette, au centre ; « Aviso La Surprise (ex Bambara) » et « Chasseur de sous-marins CH4 »
  remontent plus bas, floues, l'une après l'autre. Sous-titre « Ses navires, [un par un]. »

## B. « La table des opérations »

**Concept.** Une grande carte marine de la Méditerranée et de l'Atlantique, posée sur la table d'un état-major sous une
lampe, la nuit. La flotte y est représentée par des maquettes peintes vues du dessus, que la caméra suit au ras de la
carte. La douleur : la nuit, la lampe, les maquettes qui sombrent dans la carte comme dans l'eau. Le pivot : la lampe
s'éteint. La solution : le grand jour sur la même carte, les maquettes reprennent la mer et les articles du blog sont
épinglés à leur place. C'est la direction la plus documentaire : les lieux sont les vrais (côtes Natural Earth), la
géographie de Mers el-Kébir, de Toulon et de New York se lit sur la carte.

**Fil des objets-ponts.**
- 0.04 « Septembre 1939 » : une étiquette tapée à la machine s'épingle sur la carte ; 2.32, la caméra recule : les
  maquettes sortent de la rade de Toulon en ligne de file ; 4.34, « 4e » fonce depuis la caméra.
- 6.15, la caméra file vers le sud jusqu'à Mers el-Kébir ; 8.07, l'escadre amarrée, l'étrave vers la terre : une
  maquette sombre dans la carte, des ronds dans l'eau, cerclée au crayon rouge, « 3·7·40 ».
- 9.59, retour à Toulon : toutes les maquettes sombrent ensemble.
- 12.10, le silence : la lampe vacille sur la carte vide.
- 14.60 « Dans les manuels » : un manuel ouvert posé sur la carte, trois lignes ; 18.12 « Le reste a sombré » : la mer
  de la carte devient profonde ; 20.01, 21.14, 22.48 : une maquette, un instrument, une photo glissent sous la surface.
- 23.67, le pivot : la lampe s'éteint, noir.
- 27.16, le grand jour : les maquettes remontent à leur place ; 30.70, 32.71, 35.29 : les articles du blog s'épinglent à
  côté de chaque maquette, de chaque instrument, de chaque photo.
- 38.09 « De New York à Toulon » : la route au crayon traverse l'Atlantique, une maquette la suit.
- 42.82, la carte de fin : la rose des vents devient le sceau MARINE 1939, le bouton « Montez à bord ».
- Signatures : « la maquette posée », elle arrive trop grande et floue et se pose avec son ombre (2.3, 8.1, 27.2, 30.7,
  38.1) ; « les ronds dans l'eau », sombrer puis remonter (8.1, 9.6, 18.1, 27.2). Rime : la ligne de file qui sort de
  Toulon (2.3 s) et la route qui y revient (38.9 s).
- Accent : magenta des cartes marines (#b3176a).

**Images de style.**
- B1 (4,40 s, « avec la quatrième ») : la carte en perspective basse sous la lampe, la nuit ; Marseille, Toulon, le
  golfe du Lion ; les maquettes en ligne de file sortent de la rade de Toulon vers le sud-ouest, avec leurs ombres ;
  l'étiquette « SEPTEMBRE 1939 » épinglée ; « 4e » magenta, flou, arrive par la gauche ; abat-jour et compas flous en
  avant-plan. Sous-titre « avec la [quatrième] ».
- B2 (8,90 s, « Juillet 1940 : Mers el-Kébir. ») : la côte de Mers el-Kébir et d'Oran ; l'escadre amarrée, l'étrave
  vers la terre ; une maquette sombre dans la carte, des ronds dans l'eau, cerclée au crayon rouge, « 3·7·40 » au
  crayon. Sous-titre « Juillet 1940 : [Mers el-Kébir]. »
- B3 (39,30 s, « De New York à Toulon, ») : le grand jour sur la carte de l'Atlantique ; la route au crayon magenta de
  New York à Toulon par Gibraltar, faite jusqu'au milieu de l'océan, la suite en pointillés ; une maquette la suit ;
  les articles « La 4ème DC à New York » et « Les épaves de Toulon » épinglés à chaque bout ; la rose des vents. Sous-titre
  « De New York à Toulon, ».

## C. « Les actualités de 1939 »

**Concept.** Le film est une bobine d'actualités de 1939 : le premier article du blog présente justement les actualités
de la semaine du 16 octobre 1939. La caméra glisse le long de la pellicule posée sur une table lumineuse : perforations,
piste sonore, images en noir et blanc, cartons Art déco. La douleur : le noir et blanc, le grain, la pellicule qui se
bloque et brûle sur Toulon. Le pivot : le projecteur s'arrête. La solution : la projection repart, en couleur, et chaque
image de la pellicule est un article du blog. C'est la direction la plus « 1939 » ; la phrase sur les manuels y est la
moins naturelle (elle passe par une vue fixe d'école).

**Fil des objets-ponts.**
- 0.04, le carton « Actualités · Septembre 1939 » ; 2.32, la pellicule avance d'une image : la flotte à la mer ; 4.34,
  « 4e » en carton.
- 6.15 « Mers el-Kébir » : l'image tremble, la fumée ; 9.59 « Toulon » : les navires s'enfoncent dans la rade.
- 12.10, le silence : la pellicule se bloque dans le couloir du projecteur et brûle.
- 14.60 « Dans les manuels » : une vue fixe d'école montre trois lignes ; 18.12 « Le reste a sombré » : la pellicule se
  déroule et tombe dans le noir ; 20.01, 21.14, 22.48 : trois images de la bobine s'éteignent l'une après l'autre (un
  navire, un cadran, un équipage).
- 23.67, le pivot : le projecteur s'arrête ; la phrase en carton, sur noir.
- 27.16, le projecteur repart en couleur : le carton MARINE 1939 ; 30.70, 32.71, 35.29 : la pellicule avance image par
  image, chaque image est un article du blog.
- 38.09 « De New York à Toulon » : deux images côte à côte, New York 1939 et Toulon.
- 42.82, la carte de fin : le même carton qu'au début, en couleur, avec le bouton « Montez à bord ».
- Signatures : « le carton », un carton Art déco qui entre en scintillant (0.0, 4.3, 23.7, 27.2, 42.8) ; « l'avance
  image par image », la pellicule saute d'une image avec un flou vertical (2.3, 6.2, 9.6, 30.7, 32.7, 35.3). Rime : le
  carton du début devient la carte de fin.
- Accent : or Art déco (#d9a441).

**Images de style.**
- C1 (0,90 s, « Septembre 1939. ») : la pellicule sur la table lumineuse, perforations qui brillent, piste sonore à
  gauche ; le carton « ACTUALITÉS · SEPTEMBRE 1939 », ancre et filets Art déco, grain, rayures ; l'image suivante
  (Toulon) attend sous la ligne de cadre. Moment typographique : pas de sous-titre.
- C2 (12,90 s, le silence après « Toulon ») : l'image de la rade de Toulon à l'aube, navires qui s'enfoncent, incendies,
  colonnes de fumée ; la pellicule bloquée brûle : un trou blanc qui fond vers l'extérieur, bord brun, bulles. Pas de
  sous-titre.
- C3 (29,50 s, « MARINE 1939 fait revivre ») : la projection repart en couleur ; la pellicule inclinée, le carton
  MARINE 1939 bleu nuit et or au centre, l'article « Le sous-marin Amphitrite » au-dessus, « Les cadrans optiques »
  en dessous ; faisceau du projecteur. Sous-titre « MARINE 1939 [fait revivre] ».

## D. « Le manuel et la carte » (retenue)

**Concept.** Le film s'ouvre dans le manuel d'histoire de A : la date tapée à la machine, la flotte gravée en ligne de
file, le « 4e ». Sur « flotte du monde », la caméra recule et se relève : cette page est celle d'un livre ouvert posé
sur la carte des opérations de B, la nuit, sous la lampe, et la flotte gravée est là, en maquettes, dans le même ordre.
Toute la suite se joue sur la carte : les maquettes sombrent dans la carte comme dans l'eau, le manuel tombe sur la mer
vide, la lampe s'éteint au pivot ; puis le jour se lève sur la même carte, le blog s'allume sur un téléphone posé
dessus, et les maquettes remontent, une à une, à la place d'où elles étaient parties.

**Règle de l'auteur : les navires sont toujours sur la mer.** Aucune maquette n'est posée sur la terre, même en partie.
Le générateur le vérifie : `check_at_sea` teste l'empreinte de chaque maquette (coque et marge de 18 px de carte) contre
le trait de côte Natural Earth et arrête la génération si un point touche la terre ; `moor_row` amarre une escadre
l'avant vers la terre en s'arrêtant avant la côte ; `check_route_at_sea` vérifie la route de New York à Toulon (aucun
segment sur la terre, 4 px de marge, sauf dans le détroit de Gibraltar et à l'entrée des deux ports). L'animation devra
garder la même règle à chaque image : les maquettes ne bougent que sur la mer.

**Types de navires, d'après tes documents.** Les maquettes et la gravure suivent des types de 1939, pas des navires
nommés : cuirassé rapide type Dunkerque (deux tourelles quadruples à l'avant), cuirassé ancien type Bretagne (cinq
tourelles doubles), croiseur lourd, croiseur léger type La Galissonnière pour la 4e DC (trois tourelles triples, deux
cheminées), contre-torpilleur à trois cheminées dessiné d'après ta photo de L'Épervier. À Mers el-Kébir, l'escadre est
amarrée côte à côte, l'arrière à la jetée et l'avant vers la terre ; la maquette qui sombre est de type Bretagne.

**Le film en 13 séquences** (minutage de la voix ci-dessus).
1. 0,00 à 4,90, le manuel (D1). 0,04 « Septembre 1939 » se tape sur la page ; 2,32, la caméra glisse le long de la
   gravure ; 4,34, « 4e » arrive de la caméra, trop grand et flou, et se pose sur la page comme un tampon jaune.
2. 4,90 à 6,15, la bascule (D2). La caméra recule et se relève : le livre ouvert est posé sur la carte, de nuit, sous la
   lampe ; à côté, la flotte gravée en maquettes, en ligne de file au large de Toulon. Objet-pont : la gravure devient
   les maquettes, dans le même ordre.
3. 6,15 à 9,45, Mers el-Kébir (D3). La caméra suit la ligne de file vers le sud-ouest jusqu'à Mers el-Kébir ; 8,07,
   l'escadre amarrée : la Bretagne s'enfonce dans la carte (ronds dans l'eau), cerclée au crayon rouge, « 3·7·40 ».
4. 9,45 à 12,10, Toulon. La caméra remonte vers Toulon ; 11,76 « Toulon » : les maquettes au mouillage devant la rade
   s'enfoncent l'une après l'autre ; « 27·11·42 » au crayon.
5. 12,10 à 14,60, le silence. La lampe vacille sur la carte vide ; le manuel tombe sur la mer de la carte (choc sourd à
   14,40), des ronds dans l'eau, la poussière dans la lumière.
6. 14,60 à 18,00, les trois lignes (D4). La caméra s'approche de la page 217 ; 17,10 « trois lignes » : les trois
   lignes se surlignent en jaune, l'une après l'autre ; le reste de la page reste blanc.
7. 18,00 à 23,55, « Le reste a sombré ». La caméra recule sur la mer de la carte ; 20,01, 21,14, 22,48 : une maquette,
   un cadran de conduite de tir, une photo d'équipage s'enfoncent dans la carte, toujours sur la mer.
8. 23,55 à 27,16, le pivot. La lampe s'éteint ; sur le noir, « Il est temps de [renflouer] leur histoire. », seule.
9. 27,16 à 30,55, le blog (D5). Dans le noir, un écran s'allume : ton blog sur un téléphone posé sur la carte ; 28,72
   « fait revivre » : le jour se lève sur la carte autour de lui.
10. 30,55 à 35,15, un par un, pièce par pièce (D6). Les maquettes remontent à l'endroit d'où elles étaient parties, une
    sur chaque « un · par · un » (31,71, 31,98, 32,20), avec ta photo de L'Épervier ; 32,71 « Ses matériels » : le
    cadran remonte, avec l'article « Les cadrans optiques ».
11. 35,15 à 37,95, ses hommes. Ta photo du cuirassé à quai, l'équipage sur le pont, épinglée sur la carte ; la caméra
    glisse le long des marins, « de l'amiral au matelot ».
12. 37,95 à 42,40, de New York à Toulon (D7). La caméra recule sur la carte de l'Atlantique ; la route de la 4e DC, une
    maquette de croiseur léger la suit ; tes articles « La 4ème DC à New York » et « Les épaves de Toulon » épinglés à
    chaque bout ; 41,56 « drames » : Toulon cerclé au crayon rouge.
13. 42,40 à 50,10, la carte de fin (D8). 42,82 « MARINE 1939 » : la carte cède la place au fond rayé du blog et à son
    bandeau ; 45,00 « Montez à bord » : le bouton ; le curseur clique directement sur « bord » (45,64) ; 2 à 3 s de plan
    vivant, puis l'iris.

**Signatures.** « Les ronds dans l'eau » : sombrer puis remonter (8,1, 11,8, 14,4, 20,0, 21,1, 22,5, puis 30,7 à 33,0) ;
« le crayon » : une date ou une perte s'écrit sur la carte (8,6, 11,8, 41,6). Rime : la ligne de file qui quitte Toulon
(5 s) revient au même endroit, en plein jour (31 s).

**Couleurs et lettres.** Accent : le jaune du titre du blog (#e6ec37), comme un surligneur sur le papier, pour le mot clé
de chaque phrase, le « 4e » et le bouton ; magenta des cartes marines (#b3176a) pour la route seule ; rouge crayon
(#b3241a) pour les pertes seules. Archivo Black remplace la typo du titre du blog (lourde, avec son ombre portée) ;
EB Garamond pour le manuel et la carte, Space Mono pour la machine à écrire, Instrument Sans pour les sous-titres.

**Images de style.**
- D1 (4,40 s, « avec la quatrième ») : la page du manuel de A ; « 4e » jaune, avec l'ombre portée du titre du blog,
  arrive depuis la caméra. Sous-titre « avec la [quatrième] ».
- D2 (5,30 s, « … flotte du monde. ») : la caméra recule ; le livre ouvert sur la carte de nuit (page 214 de texte,
  page 215 de la gravure, le « 4e » posé dessus comme un tampon) ; la flotte en maquettes au large de Toulon.
  Sous-titre « avec la [quatrième] flotte du monde. »
- D3 (8,90 s, « Juillet 1940 : Mers el-Kébir. ») : quatre maquettes amarrées côte à côte, l'avant vers la côte, deux
  types Dunkerque et deux types Bretagne ; la troisième s'enfonce, cerclée au crayon rouge ; « 3·7·40 ».
- D4 (15,20 s, « Dans les manuels, ») : le livre tombé sur la mer de la carte, ouvert sur la page 217 : le titre du
  chapitre, trois lignes, puis rien. Sous-titre en encre sur le papier.
- D5 (29,40 s, « MARINE 1939 fait revivre ») : après le noir, le téléphone posé sur la carte s'allume sur ta page
  d'accueil (ta capture) ; la lumière de l'écran sur la carte. Sous-titre « MARINE 1939 fait [revivre] ».
- D6 (32,30 s, « Ses navires, un par un. ») : le jour sur la carte ; trois maquettes déjà revenues, le contre-torpilleur
  qui remonte (ronds dans l'eau), le suivant encore sous le papier ; ta photo de L'Épervier épinglée à côté ; le
  téléphone au bord de l'image. Sous-titre « Ses navires, [un par un]. »
- D7 (39,30 s, « De New York à Toulon, ») : la carte de l'Atlantique ; la route de la 4e DC, faite jusqu'au milieu de
  l'océan, la suite en pointillés, qui contourne les Baléares ; la maquette de croiseur léger ; les deux articles dans
  le style du blog (vignette de New York dessinée en attendant ta photo). Sous-titre « De New York à Toulon, ».
- D8 (46,60 s, la fin) : le fond rayé du blog, ton bandeau, « Les navires, les matériels et les hommes de la flotte
  française de 1939. », le bouton « Montez à bord » cliqué, l'adresse marine1939.blogspot.com.

**À fournir ou à confirmer par l'auteur.** Une photo de l'article « La 4ème DC à New York » ; l'original de la vignette
« Les épaves de Toulon » (216 px, trop petite pour l'écran) ; le nom du cuirassé de la photo à quai, pour sa légende ;
le nombre de cheminées des croiseurs type La Galissonnière (deux, à confirmer).

## Choix

Direction retenue : **D « Le manuel et la carte »**, choisie par l'auteur le 28 octobre 2026 (« démarrer par le livre
puis basculer sur la carte »), avec sa règle : les navires sont toujours positionnés sur la mer, jamais sur les terres.
Images de style de référence pour la charte et le storyboard : D1 à D8.
