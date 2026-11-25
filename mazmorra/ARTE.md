# Mazmorra de Dados: catálogo de imágenes

Este catálogo es para pasárselo a una IA de imágenes (ChatGPT, Gemini, Midjourney…). Cada imagen tiene un **nombre de archivo**: con ese nombre exacto la busca el juego.

## Cómo usarlo

1. Abre una conversación nueva con la IA de imágenes y pega primero el **mensaje inicial** de abajo. Así todas las imágenes salen con el mismo estilo.
2. Después pide las imágenes **de una en una**, pegando su prompt (los bloques en inglés, que es como mejor entienden estas IAs).
3. Cuando una salga bien, sobre todo la primera de cada grupo, dile: *"usa esta imagen como referencia de estilo para las siguientes"*. Así se parecen entre ellas.
4. Guarda cada imagen como **PNG** con su nombre y súbela a GitHub, en la carpeta `mazmorra/arte/…` que pone en cada sección (en la web de GitHub: *Add file → Upload files*). Avísame cuando estén y las meto en el juego.

**Fondos transparentes:** muchas IAs no saben hacerlos. Por eso los personajes, enemigos e iconos se piden sobre **fondo magenta liso (#FF00FF)**, y ese color lo quito yo con un script. Que no se te olvide: el fondo tiene que ser **un solo color plano**, sin sombras ni degradados.

**Orden recomendado:** primero la **Fase A**, que es lo que más cambia el juego. La Fase B es para después.

---

## Mensaje inicial (pégalo una vez al principio)

```
I'm making a mobile dungeon-crawler dice game and I need many images in ONE consistent art style. Every image in this conversation must follow these rules:

STYLE: dark fantasy illustration done in traditional tattoo flash style. Bold, thick black outlines of even weight. Solid flat colors with black shading done as whip-shading / stippling / hatching, like an old-school tattoo flash sheet. Limited, muted palette: bone white, parchment, dried-blood red, rust orange, sickly green, tarnished gold, cold steel grey, deep black. Grim medieval mood inspired by dark fantasy (Dark Souls, Berserk, Warhammer vibes): skulls, rusted armor, tattered cloth, candles, ominous creatures. High contrast, strong readable silhouette that still reads when shown small on a phone. Slightly stylized proportions, not photorealistic, not 3D render, not anime, not cute.

ALWAYS: no text, no letters, no logos, no watermark, no frame or border unless I ask for one.

When I ask for a CHARACTER, ENEMY or ICON: draw a single subject, centered, fully visible with some empty margin around it, on a perfectly flat solid magenta background (#FF00FF) with no gradient, no floor shadow and no scenery.

Reply only with the image. I will send the requests one by one.
```

---

# FASE A (imprescindible)

## 1. Héroes (4): `mazmorra/arte/heroes/`

Los héroes **miran hacia la derecha**. Cuerpo entero, de 3/4. Tamaño 1024×1024.

**`caballero.png`**
```
CHARACTER, facing right, full body, three-quarter view: a grim knight in dented, battle-worn plate armor with a closed great helm with a narrow eye slit, a tattered dark blue tabard, a small torn blue plume on the helm, holding a long notched sword pointing down with both hands. Stoic, heavy, tough. Magenta #FF00FF flat background. 1024x1024.
```

**`clerigo.png`**
```
CHARACTER, facing right, full body, three-quarter view: a battle cleric woman in a long off-white hooded robe with gold trim over chainmail, a faint golden halo-like ring of light behind her head, holding a heavy spiked mace in one hand and a holy symbol on a chain in the other, wax candles and prayer scrolls hanging from her belt. Serene but fierce. Magenta #FF00FF flat background. 1024x1024.
```

**`picaro.png`**
```
CHARACTER, facing right, full body, three-quarter view: a lean rogue woman in a deep purple hooded cloak and dark leather armor, face half hidden by the hood with glowing green eyes, holding two curved daggers dripping with green poison, small poison vials hanging from her belt. Sneaky, dangerous. Magenta #FF00FF flat background. 1024x1024.
```

**`piromante.png`**
```
CHARACTER, facing right, full body, three-quarter view: a gaunt pyromancer in a tall crooked red wizard hat and ragged crimson robes with burnt edges, pale face with a long grey beard, holding a twisted wooden staff topped with a burning flame, small embers floating around his hands. Fragile but menacing. Magenta #FF00FF flat background. 1024x1024.
```

## 2. Enemigos (17): `mazmorra/arte/enemigos/`

Los enemigos **miran hacia la izquierda** (hacia el héroe). Tamaño 1024×1024.

### Piso 1: La Cripta

**`rata.png`**
```
ENEMY, facing left, full body: a mangy plague rat the size of a dog, patchy grey fur, scars, long pink naked tail, sharp yellow teeth, beady red eyes. Magenta #FF00FF flat background. 1024x1024.
```

**`murcielago.png`**
```
ENEMY, facing left, flying with wings spread: a crypt bat with torn leathery purple wings, tiny glowing red eyes, open mouth with needle fangs, skeletal wing fingers. Magenta #FF00FF flat background. 1024x1024.
```

**`esqueleto.png`**
```
ENEMY, facing left, full body: a reanimated skeleton warrior with yellowed cracked bones, a rusty broken sword and a few scraps of old chainmail, faint blue light in its empty eye sockets. Magenta #FF00FF flat background. 1024x1024.
```

**`limo.png`**
```
ENEMY, facing left: a blob of toxic green slime with bones, a skull and a rusty dagger floating inside its translucent body, dripping, two simple angry eyes. Magenta #FF00FF flat background. 1024x1024.
```

**`ratagigante.png`** (élite)
```
ENEMY (elite, bigger and scarier), facing left, full body: a huge mutated rat king with blood-red matted fur, several tails knotted together, a crown of bones stuck on its head, foaming mouth with broken yellow teeth, hunched and muscular. Magenta #FF00FF flat background. 1024x1024.
```

**`limogrande.png`** (élite)
```
ENEMY (elite), facing left: a giant purple ooze with many skulls and a whole rusted helmet floating inside it, toxic purple drips, several small eyes on its surface, bubbling. Magenta #FF00FF flat background. 1024x1024.
```

### Piso 2: Las Cuevas

**`goblin.png`**
```
ENEMY, facing left, full body: a wiry cave goblin with green warty skin, big pointy ears, yellow eyes, a crooked grin, wearing a brown leather scrap vest, holding a jagged cleaver. Magenta #FF00FF flat background. 1024x1024.
```

**`arana.png`**
```
ENEMY, facing left: a giant cave spider with a dark purple hairy body, a red hourglass mark, eight glowing red eyes, dripping green venom from its fangs, legs spread. Magenta #FF00FF flat background. 1024x1024.
```

**`hongo.png`**
```
ENEMY, facing left: a walking mushroom creature with a big red cap with white spots, a pale fleshy stem body with a creepy face, little root legs, glowing spores floating around it. Magenta #FF00FF flat background. 1024x1024.
```

**`orco.png`**
```
ENEMY, facing left, full body: a brutal orc warrior with dark green skin, tusks, small angry yellow eyes, crude spiked leather and iron armor, holding a big stone-headed club. Magenta #FF00FF flat background. 1024x1024.
```

**`ogro.png`** (élite)
```
ENEMY (elite, huge), facing left, full body: an enormous fat cave ogre with brown leathery skin, one eye swollen shut, chains wrapped around its arms, a tree trunk club with nails, bones hanging from its belt. Magenta #FF00FF flat background. 1024x1024.
```

**`golem.png`** (élite)
```
ENEMY (elite, huge), facing left, full body: a stone golem made of dungeon bricks and cracked grey rock, glowing orange runes carved on its chest, moss growing on its shoulders, massive fists. Magenta #FF00FF flat background. 1024x1024.
```

### Piso 3: El Abismo

**`diablillo.png`**
```
ENEMY, facing left, full body: a small red imp demon with bat wings, curved horns, a long pointed tail, yellow eyes and a mischievous evil grin, holding a tiny trident, flames at its feet. Magenta #FF00FF flat background. 1024x1024.
```

**`gargola.png`**
```
ENEMY, facing left, crouching: a stone gargoyle with grey cracked stone skin, folded stone wings, horns, glowing red eyes, sharp claws gripping a broken pillar piece. Magenta #FF00FF flat background. 1024x1024.
```

**`espectro.png`**
```
ENEMY, facing left, floating: a wailing specter, a ghost made of pale cyan mist and tattered shroud, a skull-like face screaming, long thin clawed hands, its lower body fading into smoke. Magenta #FF00FF flat background. 1024x1024.
```

**`cultista.png`**
```
ENEMY, facing left, full body: a dark cultist in a deep purple hooded robe, face completely hidden in shadow except two red glowing eyes, holding a ritual dagger and a burning black candle, a golden occult symbol on the chest. Magenta #FF00FF flat background. 1024x1024.
```

**`caballerooscuro.png`** (élite)
```
ENEMY (elite), facing left, full body: a fallen black knight in black spiked plate armor with red glowing eye slits in the helm, a torn black cape, holding a huge black greatsword wreathed in dark red smoke. Magenta #FF00FF flat background. 1024x1024.
```

## 3. Jefes (3): `mazmorra/arte/jefes/`

Tienen que imponer más: más detalle y una pose más amenazante. **Miran hacia la izquierda.** Tamaño 1024×1024.

**`reycalavera.png`**
```
BOSS ENEMY, facing left, full body, imposing: the Skeleton King, a giant skeleton seated-standing in rotten royal purple robes, a tarnished gold crown with spikes, red glowing eyes, holding a long scepter topped with a skull, small skulls hanging from chains. Magenta #FF00FF flat background. 1024x1024.
```

**`gusano.png`**
```
BOSS ENEMY, facing left, imposing: a giant cave worm bursting out of the ground, pink-grey segmented flesh, a huge round mouth full of rings of teeth, dripping green venom, small spiders crawling on its body. Magenta #FF00FF flat background. 1024x1024.
```

**`dragon.png`**
```
BOSS ENEMY, facing left, full body, imposing: an ancient red dragon with tattered wings, scarred scales, long horns, yellow eyes, fire glowing inside its open mouth and between its scales, claws on a pile of skulls and gold coins. Magenta #FF00FF flat background. 1024x1024.
```

## 4. Fondos de combate (3): `mazmorra/arte/fondos/`

Van detrás del combate y **no llevan personajes**. Tamaño 1536×1024 (horizontal). La mitad de abajo tiene que ser suelo bastante despejado, porque ahí se colocan los luchadores. Estos no van sobre magenta.

**`cripta.png`**
```
BACKGROUND SCENE, no characters, no magenta: interior of an ancient crypt, stone walls lined with skull niches, stone coffins, cobwebs, dripping wax candles giving warm orange light, cold blue shadows. The lower half is an empty stone floor. Front view, slightly from above. 1536x1024.
```

**`cuevas.png`**
```
BACKGROUND SCENE, no characters, no magenta: a deep underground cave, rough rock walls with glowing green mushrooms and crystals, roots hanging from the ceiling, a small underground stream, abandoned mining tools and bones. The lower half is an empty rocky floor. Front view, slightly from above. 1536x1024.
```

**`abismo.png`**
```
BACKGROUND SCENE, no characters, no magenta: a hellish abyss temple, black obsidian pillars, rivers of lava in the distance, red smoky sky, chains hanging, an altar with occult symbols. The lower half is an empty cracked obsidian floor. Front view, slightly from above. 1536x1024.
```

## 5. Iconos de las caras de los dados (13): `mazmorra/arte/iconos/`

Se ven **muy pequeños** dentro de los dados, así que tienen que ser simples, con trazo gordo y una forma clara. Tamaño 512×512, sobre magenta.

Plantilla, cambiando solo la parte entre corchetes:
```
ICON, simple and bold, readable at 48 pixels, thick black outline, centered: [SUBJECT]. Magenta #FF00FF flat background. 512x512.
```

| Archivo | [SUBJECT] |
|---|---|
| `golpe.png` | a single straight sword pointing up-right |
| `barrido.png` | a curved sword with a wide slashing arc trail |
| `perforar.png` | an arrow piercing through a cracked shield |
| `vampiro.png` | two vampire fangs dripping blood |
| `escudo.png` | a blue heater shield with an iron rim |
| `espinas.png` | a blue shield covered with sharp spikes |
| `luz.png` | a radiant holy golden star with rays |
| `veneno.png` | a green poison drop with a small skull inside |
| `nube.png` | a cloud of green toxic gas with skulls |
| `fuego.png` | a single orange and yellow flame |
| `explosion.png` | a fiery explosion burst |
| `furia.png` | a red horned demon face, angry |
| `doble.png` | two crossed swords with a yellow lightning bolt |

## 6. Iconos de salas y del juego (12): `mazmorra/arte/iconos/`

Misma plantilla que los anteriores.

| Archivo | [SUBJECT] |
|---|---|
| `sala_combate.png` | two crossed swords |
| `sala_elite.png` | a horned skull with red eyes |
| `sala_forja.png` | a blacksmith anvil with a hammer and sparks |
| `sala_altar.png` | a stone altar with a glowing purple die floating above it |
| `sala_evento.png` | a mysterious hooded figure silhouette with a question-mark-shaped smoke |
| `sala_hoguera.png` | a campfire with logs |
| `sala_tienda.png` | a leather coin pouch overflowing with gold coins |
| `sala_jefe.png` | a spiked dark crown |
| `oro.png` | a single gold coin with a skull stamp |
| `vida.png` | an anatomical red heart |
| `invoca.png` | a purple summoning circle with a hand coming out |
| `calavera.png` | a simple human skull |

## 7. Portada (1): `mazmorra/arte/ui/`

**`portada.png`** (vertical, 1024×1536, para el menú principal)
```
TITLE SCREEN ILLUSTRATION, vertical 1024x1536, no magenta, no text: the four heroes (an armored knight, a cleric woman with a mace, a hooded rogue woman with daggers, a pyromancer with a burning staff) standing together seen from behind at the entrance of a huge dark dungeon gate carved with skulls, giant glowing dice floating in the darkness above them. Leave empty dark space at the top for the game title.
```

---

# FASE B (después)

## 8. Pasillo en 3D (por piso): `mazmorra/arte/texturas/`

Mi idea para el 3D: al pasar de una sala a otra, el héroe **camina en primera persona por un pasillo en 3D** hasta las puertas, al estilo de los dungeon crawlers clásicos. Los combates se quedan con el fondo ilustrado, porque así se leen mejor. Para el pasillo necesito texturas **que se repitan sin que se note la costura** (*seamless*), vistas totalmente de frente y sin perspectiva. Tamaño 1024×1024, sin magenta.

Para cada piso (`cripta`, `cuevas`, `abismo`) hacen falta 4 texturas: 12 en total.

| Archivo | Prompt |
|---|---|
| `cripta_pared.png` | `SEAMLESS TILEABLE TEXTURE, flat front view, no perspective, even lighting, 1024x1024: old crypt stone brick wall with skull niches and cobwebs, tattoo flash style linework.` |
| `cripta_suelo.png` | `SEAMLESS TILEABLE TEXTURE, top-down view, even lighting, 1024x1024: worn crypt stone floor tiles with cracks and bone fragments, tattoo flash style linework.` |
| `cripta_techo.png` | `SEAMLESS TILEABLE TEXTURE, view from below, even lighting, 1024x1024: dark stone vaulted ceiling blocks with roots and cobwebs, tattoo flash style linework.` |
| `cripta_puerta.png` | `FLAT FRONT VIEW, no perspective, 1024x1024, magenta #FF00FF background around it: a heavy arched wooden dungeon door with iron bands and a skull knocker, set in a stone frame.` |
| `cuevas_pared.png` | `SEAMLESS TILEABLE TEXTURE, flat front view, even lighting, 1024x1024: rough cave rock wall with glowing green mushrooms and crystal veins, tattoo flash style linework.` |
| `cuevas_suelo.png` | `SEAMLESS TILEABLE TEXTURE, top-down view, even lighting, 1024x1024: rocky cave ground with pebbles, puddles and small bones, tattoo flash style linework.` |
| `cuevas_techo.png` | `SEAMLESS TILEABLE TEXTURE, view from below, even lighting, 1024x1024: cave ceiling rock with stalactites tips and hanging roots, tattoo flash style linework.` |
| `cuevas_puerta.png` | `FLAT FRONT VIEW, no perspective, 1024x1024, magenta #FF00FF background around it: a crude wooden mine door reinforced with planks and rope, set in a rock opening with wooden beams.` |
| `abismo_pared.png` | `SEAMLESS TILEABLE TEXTURE, flat front view, even lighting, 1024x1024: black obsidian wall blocks with glowing red cracks and carved occult symbols, tattoo flash style linework.` |
| `abismo_suelo.png` | `SEAMLESS TILEABLE TEXTURE, top-down view, even lighting, 1024x1024: cracked obsidian floor with thin lava lines glowing between the cracks, tattoo flash style linework.` |
| `abismo_techo.png` | `SEAMLESS TILEABLE TEXTURE, view from below, even lighting, 1024x1024: dark volcanic ceiling rock with hanging chains, tattoo flash style linework.` |
| `abismo_puerta.png` | `FLAT FRONT VIEW, no perspective, 1024x1024, magenta #FF00FF background around it: a massive black iron gate covered in spikes and demonic faces, set in an obsidian frame with red glow.` |

Y una más, común a todos los pisos:

**`antorcha.png`** (va colgada en las paredes del pasillo)
```
ICON-LIKE OBJECT, front view: a medieval wall torch in an iron sconce with a bright orange flame. Magenta #FF00FF flat background. 1024x1024.
```

## 9. Reliquias (10): `mazmorra/arte/reliquias/`

Misma plantilla que los iconos (sección 5).

| Archivo | [SUBJECT] |
|---|---|
| `trebol.png` | a dark four-leaf clover in an old silver charm |
| `corazon.png` | a heart made of grey stone with cracks |
| `colmillo.png` | a big beast fang hanging on a leather cord |
| `gemelo.png` | an amulet with two identical dice joined together |
| `escudo.png` | an old dented round wooden shield |
| `bolsa.png` | a heavy leather bag of gold with a skull seal |
| `brasa.png` | a glowing ember inside a small iron cage |
| `seta.png` | a strange glowing purple mushroom |
| `calavera.png` | a cursed skull with a candle melting on top |
| `cargado.png` | a red bone die with a lead weight, cracked |

## 10. Eventos (8): `mazmorra/arte/eventos/`

Son escenas pequeñas que se ven arriba del texto del evento. Tamaño 1024×768, sin magenta.

| Archivo | Prompt |
|---|---|
| `cofre.png` | `SMALL SCENE, 1024x768, no magenta: an old dusty treasure chest covered in cobwebs in a dark dungeon corner, a faint glow leaking from the lid.` |
| `fuente.png` | `SMALL SCENE, 1024x768, no magenta: a stone fountain carved with faces, filled with glowing blue water, in a dark dungeon room.` |
| `sangre.png` | `SMALL SCENE, 1024x768, no magenta: a blood-red stone altar with a carved demonic face, candles and dripping blood, a sinister whisper atmosphere.` |
| `apuesta.png` | `SMALL SCENE, 1024x768, no magenta: a sly goblin sitting on a barrel grinning and holding up a bone die, coins on the barrel, tavern-like dungeon nook.` |
| `estatua.png` | `SMALL SCENE, 1024x768, no magenta: an ancient stone statue of a robed figure holding a large stone die, moss and cracks, mysterious light.` |
| `herido.png` | `SMALL SCENE, 1024x768, no magenta: a wounded adventurer sitting against a dungeon wall, bandaged, holding out a hand asking for help, broken sword beside him.` |
| `herrero.png` | `SMALL SCENE, 1024x768, no magenta: a ghostly translucent blacksmith hammering on an anvil, cyan spectral sparks, a ruined forge.` |
| `setas.png` | `SMALL SCENE, 1024x768, no magenta: a patch of strange glowing mushrooms of many colors on a dark cave floor.` |

## 11. Evoluciones de los héroes (16): `mazmorra/arte/heroes/`

Usa como referencia la imagen del héroe original (*"same character as this reference, but…"*). Miran hacia la derecha, sobre magenta y a 1024×1024, igual que los héroes.

| Archivo | Prompt (añade antes: `CHARACTER, same character as the reference image, facing right, full body, magenta #FF00FF flat background, 1024x1024:`) |
|---|---|
| `caballero_paladin.png` | now a holy paladin: shining gold-trimmed armor, a white tabard with a sun symbol, a faint golden aura. |
| `caballero_barbaro.png` | now a berserker barbarian: armor broken off, bare scarred muscular arms, a wild horned helm, a huge axe. |
| `caballero_campeon.png` | now a champion: ornate heavy armor with a laurel crest, a long red cape, a giant sword. |
| `caballero_senor.png` | now a warlord: black and gold spiked armor, a fur mantle, war banners on the back. |
| `clerigo_sacerdotisa.png` | now a high priestess: richer white and gold robes, a bright halo, a glowing staff. |
| `clerigo_inquisidora.png` | now an inquisitor: a dark red robe, a wide-brimmed hat, a flaming mace. |
| `clerigo_santa.png` | now a saint: floating slightly, wings of light, radiant holy glow. |
| `clerigo_martillo.png` | now a holy warrior: heavy armor and a massive blessed warhammer. |
| `picaro_asesina.png` | now an assassin: black mask, a long piercing stiletto blade, a crossbow on the back. |
| `picaro_alquimista.png` | now an alchemist: goggles, a belt full of bubbling flasks, a green toxic cloud around her. |
| `picaro_sombra.png` | now a shadow: body partly made of black smoke, glowing eyes. |
| `picaro_plaga.png` | now a plague doctor: a bird-beak plague mask, a dark coat, swarms of flies and green gas. |
| `piromante_archimago.png` | now an archmage: more elaborate robes with runes, floating spell books. |
| `piromante_incendiario.png` | now an arsonist: wild burning hair, a bomb bag, explosions around. |
| `piromante_tormenta.png` | now a storm mage: blue-white lightning crackling around his staff. |
| `piromante_fenix.png` | now a phoenix mage: robes turning into fiery wings, reborn from flames. |

---

## Resumen

| Fase | Grupo | Imágenes |
|---|---|---|
| A | Héroes | 4 |
| A | Enemigos | 17 |
| A | Jefes | 3 |
| A | Fondos de combate | 3 |
| A | Iconos de caras | 13 |
| A | Iconos de salas y del juego | 12 |
| A | Portada | 1 |
| **A** | **Total** | **53** |
| B | Pasillo 3D (texturas, puertas y antorcha) | 13 |
| B | Reliquias | 10 |
| B | Eventos | 8 |
| B | Evoluciones | 16 |
| **B** | **Total** | **47** |
