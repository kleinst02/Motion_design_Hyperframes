# MARINE 1939 : script validé (50,1 s)

- **Validé** le 28 octobre 2026 : version A, « Trois lignes dans les manuels ».
- **Objectif** : donner envie aux passionnés d'histoire maritime de visiter le blog MARINE 1939.
- **Adresse de la carte de fin** : marine1939.blogspot.com.
- **Le nom à l'oral** : « Marine mille neuf cent trente-neuf », comme dans la prise retenue. À l'écran, il s'écrit
  MARINE 1939.
- **Ton** : dramatique, grave, documentaire. Vouvoiement, comme le blog (« Vous y découvrirez les navires qui l'ont
  composée, ses matériels et les hommes qui l'ont créé et fait vivre. »).
- **Durée** : 50,1 s, le montage naturel validé le 28 octobre 2026. La prise dure 43,15 s ; le montage ajoute 2,5 s de
  silence après « Toulon », 1,5 s après « leur histoire », une respiration avant la carte de fin et 4,2 s de fin. Les
  temps ci-dessous sont ceux du montage (`onsets.json`).

Les silences ne sont pas lus par la voix : ils sont faits au montage. À l'écran, chaque phrase de la voix arrive mot par
mot en sous-titre, en bas au centre. Le mot en **gras** est le mot clé de la phrase (petite boîte de couleur ou trait
fin dessous). La mise en scène notée ici est une première intention : le storyboard (étape 3) la précisera.

## Version mise en scène (texte de l'écran)

| Temps (s) | Partie | Voix | À l'écran |
| --- | --- | --- | --- |
| 0,0 | 1. Accroche datée | « **Septembre 1939.** » | Gros plan sur une page de manuel d'histoire : la date se tape à la machine. |
| 2,3 | | « La France entre en guerre avec **la quatrième flotte du monde**. » | La caméra recule : la flotte de 1939 en ligne de file, en silhouettes. « 4e » arrive trop grand et flou, puis se pose. |
| 6,2 | | « Juillet 1940 : **Mers el-Kébir**. » | La ligne de file glisse ; un éclair de salve à l'horizon. |
| 9,6 | | « Novembre 1942 : **Toulon**. » | La rade de Toulon, de nuit : les silhouettes s'enfoncent une à une, la fumée monte. |
| 12,1 | 2. Silence (2,5 s) | | Une main tourne la page du manuel : le chapitre suivant commence. On n'entend que la page, puis la mer. |
| 14,6 | 3. Diagnostic | « Dans les manuels, toute son histoire tient en **trois lignes**. » | Retour sur la page : trois lignes, rien de plus. |
| 18,1 | | « Le reste **a sombré**. » | La page devient la surface de l'eau ; la caméra plonge. |
| 20,0 | | « Ses **navires**. Ses **matériels**. Ses **hommes**. » | Sous l'eau, trois objets coulent l'un après l'autre : la silhouette d'un navire, un cadran de conduite de tir, une photo d'équipage. |
| 23,7 | 4. Pivot sur noir (1,5 s de silence après) | « Il est temps de **renflouer** leur histoire. » | Noir. La phrase seule, centrée. |
| 27,2 | 5. Solution | « MARINE 1939 **fait revivre** cette flotte. » | La lumière revient : le vrai blog, son titre. |
| 30,7 | | « Ses navires, **un par un**. » | Les fiches navires du blog remontent à la surface (sous-marin Amphitrite, aviso La Surprise, chasseur CH4…). |
| 32,7 | | « Ses matériels, **pièce par pièce**. » | Le cadran remonte, net : l'article « Les cadrans optiques ». |
| 35,3 | | « Ses hommes, **de l'amiral au matelot**. » | La photo d'équipage remonte : les visages redeviennent nets. |
| 38,1 | | « De New York à Toulon, ses heures de gloire… **et ses drames**. » | Deux articles côte à côte : « La 4ème DC à New York » et « Les épaves de Toulon ». Toulon, l'accroche, revient. |
| 42,8 | 6. Marque et appel | « **MARINE 1939.** » | Carte de fin : le titre du blog sur une mer de nuit. |
| 45,0 | | « **Montez à bord.** » | Le bouton « Montez à bord » et l'adresse marine1939.blogspot.com. Le curseur arrive et clique, la mer vit encore 2 à 3 s, puis l'iris. |
| 50,1 | Fin | | |

## Texte lu par la voix

```
Septembre mille neuf cent trente-neuf.
La France entre en guerre avec la quatrième flotte du monde.
Juillet mille neuf cent quarante : Mers el-Kébir.
Novembre mille neuf cent quarante-deux : Toulon.
Dans les manuels, toute son histoire tient en trois lignes.
Le reste a sombré.
Ses navires.
Ses matériels.
Ses hommes.
[lower, slower] Il est temps de renflouer leur histoire.
Marine mille neuf cent trente-neuf fait revivre cette flotte.
Ses navires, un par un.
Ses matériels, pièce par pièce.
Ses hommes, de l'amiral au matelot.
De New York à Toulon, ses heures de gloire... et ses drames.
Marine mille neuf cent trente-neuf.
Montez à bord.
```

101 mots.

## La voix et le montage

- **Prise retenue** : ElevenLabs, modèle Eleven v4, voix « Paul K, Deep French Narrator », vitesse 1,07, stabilité
  50 %, similarité 80 % (d'après le nom du fichier). 43,15 s, dans `assets/audio/voix.mp3`.
- **Montage** : `build-audio.sh` (`CUTS`, `TAIL`, `TOTAL`), écrit `assets/audio/voix-montage.wav` (50,1 s). Il ne coupe
  que dans les silences.
- **Minutage** : Whisper (modèle medium) dans `assets/audio/voix-montage-mots.json`, débuts de phrase recalés sur le son
  dans `onsets.json`. Corrigé à la main d'après le script, là où Whisper confond des mots qui se prononcent pareil :
  « Mers el-Kébir », « Toulon », « l'amiral », « Montez ». Les débuts de « La » (2,32 s) et de « Montez » (45,00 s) ont
  aussi été recalés.
- **Si une phrase doit être refaite** : la regénérer avec sa voisine, même voix et mêmes réglages, la recoller dans les
  silences au montage, puis refaire le minutage : tous les temps qui suivent bougent.

## Musique et sons (étape 5)

- **Jusqu'au pivot** : une pulsation orchestrale sombre et lente (cordes graves, timbales), un tic-tac discret sous les
  dates. Pendant la page qui tourne, la musique tombe sur une nappe grave : on n'entend que la page et la mer.
- **Pivot** : une montée dans les 3 s avant « renflouer », un impact grave sur la fin de la phrase, puis le silence.
- **Solution** : un thème épique et solennel (cuivres, cordes) qui attaque sur « MARINE 1939 », baisse sous la voix
  et s'éteint en fondu sur la carte de fin.

Uniquement des morceaux sous licence CC0, jamais de musique générée : 3 ou 4 options montées sur la même voix, à choisir
à l'oreille. Les bruitages fournis (impacts graves, montée, souffles, frappe, clic) couvrent l'essentiel. La mer, la
page qui tourne et une sirène de navire n'y sont pas : il faudra les trouver en CC0.

## Les faits utilisés et leurs sources

- **La quatrième flotte du monde en 1939**, derrière la Royal Navy, l'US Navy et la marine japonaise :
  [Wikipédia, Histoire de la marine française depuis 1789](https://fr.wikipedia.org/wiki/Histoire_de_la_marine_fran%C3%A7aise_depuis_1789),
  [J. Chatelle, « La marine française en 1939-1940 », Revue historique des Armées, 1987](https://www.persee.fr/doc/rharm_0035-3299_1987_num_168_3_6980).
- **Mers el-Kébir, 3 juillet 1940** :
  [Wikipédia, Attaque de Mers el-Kébir](https://fr.wikipedia.org/wiki/Attaque_de_Mers_el-K%C3%A9bir).
- **Toulon, 27 novembre 1942, au petit matin** (les heures de l'ordre de sabordage varient selon les sources, entre
  5 h 15 et 5 h 45 : le script ne donne pas d'heure) :
  [Wikipédia, Sabordage de la flotte française à Toulon](https://fr.wikipedia.org/wiki/Sabordage_de_la_flotte_fran%C3%A7aise_%C3%A0_Toulon),
  [Les Clionautes](https://www.clionautes.org/toulon-1942-le-sabordage-de-la-marine-francaise.html).
- **New York, juillet 1939** : la 4e division de croiseurs part de Brest le 1er juillet 1939 pour représenter la France
  à l'Exposition universelle : [ton article](http://marine1939.blogspot.com/2013/08/la-4eme-dc-new-york.html).
- **Les articles montrés à l'écran** : [Les épaves de Toulon](http://marine1939.blogspot.com/2016/05/les-epaves-de-toulon.html),
  [Les cadrans optiques](http://marine1939.blogspot.com/2012/01/les-cadrans-optiques.html),
  [Le sous-marin Amphitrite](http://marine1939.blogspot.com/2012/01/le-sous-marin-amphitrite.html),
  [Aviso La Surprise (ex Bambara)](http://marine1939.blogspot.com/2012/06/aviso-la-surprise-ex-bambara.html),
  [Chasseur de sous-marins CH4](http://marine1939.blogspot.com/2012/05/chasseur-de-sous-marins-ch4.html).

## Annexe : pistes non retenues

| # | Piste | L'angle | Première phrase | Dernière phrase |
| --- | --- | --- | --- | --- |
| 2 | La catastrophe du Pluton (version B, ci-dessous) | Un drame que presque personne ne connaît, tiré de ton article : on vit l'explosion, puis on comprend que toute une flotte s'efface comme lui. | « Casablanca, 13 septembre 1939. » | « MARINE 1939. Montez à bord. » |
| 3 | Le sabordage | On commence par la fin : Toulon, au petit matin du 27 novembre 1942, la flotte se saborde. Puis on remonte jusqu'en 1939. | « Toulon, 27 novembre 1942. » | « MARINE 1939. Avant le naufrage, il y avait une flotte. » |
| 4 | Le dernier été | Juillet 1939 : trois croiseurs français partent pour l'Exposition universelle de New York. Deux mois plus tard, la guerre. | « Juillet 1939. Trois croiseurs français mettent le cap sur New York. » | « MARINE 1939. La suite de leur voyage. » |
| 5 | Les actualités d'octobre 1939 | Le film imite les actualités de la semaine du 16 octobre 1939 (ton premier article), puis la pellicule casse : la suite, les actualités ne l'ont jamais montrée. | « Actualités. Semaine du 16 octobre 1939. » | « MARINE 1939. La suite des actualités. » |
| 6 | Derrière la photo | Une photo de ta collection : un équipage en rang sur le pont. Qui sont-ils, sur quel navire, que sont-ils devenus ? | « Cette photo a plus de quatre-vingts ans. » | « MARINE 1939. L'histoire derrière chaque photo. » |

### Version B, « La catastrophe du Pluton » (texte de la voix)

```
Casablanca, treize septembre mille neuf cent trente-neuf.
La guerre a dix jours.
À quai, le croiseur Pluton débarque ses mines, une à une.
Dix heures quarante.
[lower, slower] Cent quatre-vingt-six marins tués ou disparus.
Qui se souvient du Pluton ?
Comme lui, toute une flotte s'efface.
Des épaves.
Des équipages sans visage.
Des archives qui dorment.
Il est temps de la sortir de l'oubli.
Marine mille neuf cent trente-neuf la fait revivre.
La quatrième flotte du monde, navire par navire.
Ses matériels, pièce par pièce.
Et les hommes qui l'ont servie.
De ses heures de gloire... à ses drames.
Marine mille neuf cent trente-neuf.
Montez à bord.
```

Silences : l'explosion après « Dix heures quarante. » (2,5 s), le pivot après « l'oubli. » (1,5 s). Le bilan du
Pluton est celui de ton article (186 tués ou disparus) ; les sources divergent : environ 200 morts pour
[Wikipédia](https://fr.wikipedia.org/wiki/Pluton_(1928)), 196 pour le
[Mémorial national des marins](https://memorial-national-des-marins.fr/g/184319-guissani-victor-nicolas-andre).
