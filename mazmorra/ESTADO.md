# Mazmorra de Dados: estado del proyecto

Documento para retomar el trabajo en una conversación nueva. Léelo entero antes de tocar nada.

## Dónde está todo

- **El juego**: `mazmorra/index.html` (un solo archivo con todo: estilos, motor 3D, datos y lógica).
- **Laboratorio de dados**: `mazmorra/lab.js`. Se añade al final del juego y sale en `docs/mazmorra/lab.html`. Siempre tiene los dados tal y como están en el juego; aquí se prueban las novedades antes de pasarlas al juego.
- **Publicar**: `node scripts/sync-game.js` genera `docs/mazmorra/index.html` y `docs/mazmorra/lab.html` y pone el número de versión (`v0.N`, N = commits de `mazmorra/` + 1). Después, commit y `git push origin HEAD:main` (y también a la rama de trabajo). El juego se juega en https://markini7.github.io/invasores/mazmorra/ y el laboratorio en …/mazmorra/lab.html.
- **Ideas pendientes**: `mazmorra/IDEAS.md`.
- **Catálogo de imágenes (para cuando haya arte)**: `mazmorra/ARTE.md`.

## Cómo trabajamos (preferencias del equipo)

- Marcos y Mario hacen el juego. Hablan en español. Cuando van en el coche (modo voz) quieren **solo conversar, sin cambios en el juego**.
- Antes de cambios grandes, **comentar y proponer**; los cambios pequeños se hacen directamente.
- Todo lo nuevo tiene que **entenderse bien**: tutorial paso a paso, pistas de una frase la primera vez que pasa algo, sin textos largos.
- Tras cada cambio: comprobar con capturas (Playwright, 390×844) y con el bot de pruebas; después publicar en `main` y decir qué versión (`v0.N`) deben ver en el menú.
- Nada de botones abajo para volver: **"← Volver" arriba** y **✕ arriba** en las ventanas.

## El juego hoy (v0.33)

- **Héroes**: Caballero (Furia y Doble), Clériga (Luz), Pícara (Veneno), Piromante (Fuego). Cada uno con 3 dados: Ataque, Protección y Especial. Evolucionan al vencer a los jefes de los pisos 1 y 2 (2 caminos cada vez); cada evolución tiene su skin 3D (variantes del héroe base) y la pantalla muestra cómo cambian los dados.
- **Dos mazmorras** (`DUNGEONS`): al pulsar Nueva partida se elige mazmorra. **La Mazmorra** (Cripta, Cuevas, Abismo) y **La Torre del Hechicero** (Biblioteca, Laboratorio, Cima; de momento la Biblioteca y el Laboratorio, como vista previa abierta a todos). Ganar La Mazmorra desbloquea la Torre y **La Mazmorra en Dificultad 2** para todos los héroes (`localStorage` `mazmorra_prog`). Truco de pruebas: tocar 5 veces el número de versión lo desbloquea todo. `FLOORS` y `THEMES` cambian según la mazmorra (`setDungeon`); la partida guarda `dg` y `diff`.
- **Dificultad 2**: enemigos con 25% más de vida, +1 al primer número de cada cara (ataque, escudo o veneno), algunas caras cambiadas por habilidades nuevas (`DIFF2_SUB`, `DIFF2_BOOM`), más combates de 3, 25% menos oro y la hoguera cura el 25% en vez del 35%.
- **Habilidades nuevas de enemigos** (letras en las caras): `c` maldecir (una cara tuya queda vacía hasta el final del combate, se marca en morado), `o` robar oro (se recupera al matarlo), `k` congelar (ese número de dados tuyos no se pueden volver a tirar el turno siguiente; candado azul hielo), `g` proteger a un aliado (al más herido, al tirar). Pasiva `boom` en `EN`: al morir explota y hace daño a todos (a ti no te puede matar). `l` curar al aliado más herido. Pasivas en `EN`: `spines` (pinchos: te hace daño cada vez que le pegas; no te puede matar), `grow` (pega 1 más cada turno), `heads`+`regrow` (jefe formado por varias cabezas iguales; las muertas vuelven a crecer con media vida si queda alguna viva). `fig` en `EN` elige el modelo 3D del combate. Pendientes para la Cima: tres ataques del Cerbero y fases del Hechicero que se convierte en Liche.
- **La Biblioteca**: paredes de estanterías (`theme.shelf`). Enemigos: Libro vivo (nuevo), Cuervo, Fuego fatuo, Aprendiz (cultista azul); élites Banshee y Grimorio (libro rojo); jefe el Bibliotecario (nuevo, invoca libros).
- **El Laboratorio**: estanterías de frascos de colores (`theme.shelf = 'lab'`). Enemigos: Homúnculo (nuevo, crece), Sapo morado (veneno), Serpiente (cura a un aliado), Momia (pinchos); élites Mantícora (pinchos y crece) y Basilisco (congela 2 dados); jefe la Hidra: tres cabezas de 13 de vida que vuelven a crecer una vez.
- **Mazmorra 1**: 3 pisos (Cripta, Cuevas, Abismo) de 8 salas. Se elige puerta tocándola en un pasillo 3D en primera persona; las puertas solo llevan su símbolo y hay botón de leyenda. Salas: combate, élite, forja, altar, evento, hoguera, tienda ("Tienda de mejoras y reliquias") y jefe.
- **Combate** (una sola escena 3D): los enemigos tiran su dado primero (su intención se ve en la franja de carteles de arriba, con barra de puntitos y número de vida "24/35"). Tú tiras 3 dados, tocas en la mesa los que quieres guardar y vuelves a tirar el resto (2 veces), y luego usas cada dado tocándolo y tocando su objetivo. La protección siempre es para ti y para los golpes (el veneno la atraviesa). Si matas a un enemigo antes de que actúe, su dado se cancela. El botón **«Auto»** (antes «Terminar turno») usa los dados que quedan en orden: furia y doble, luego cura y protección, después los que dan a todos y por último los ataques a un enemigo al azar; luego termina el turno.
- **Enemigos por combate**: el primer combate de cada piso tiene uno; los demás, siempre 2 (3 a veces: 25% en el piso 1 y 45% después). Nadie pelea solo: las élites traen 1 acompañante (o 2, la mitad de las veces, desde el piso 2), los jefes 1 esbirro (2 en el Abismo) y el mímico un bicho del piso. La estatua del evento usa el combate de élite.
- **Colores (palos)**: cada cara tiene un color (verde, morado, amarillo o rosa, paleta Joyas; borde y fondo del color y número en blanco; el lateral del dado muestra su tipo). **Las parejas y los tríos van por color**: pareja +1 a cada dado, trío ×2. Cada dado empieza con dos colores repetidos (2 caras cada uno) y dos colores sueltos (1 cara cada uno). Las caras nuevas heredan el color de la que sustituyen.
- **Tu vida**: barra de puntitos fija debajo de la escena con previsión (amarillo lo que te van a quitar, azul lo bloqueado, verde el veneno, calavera si mueres ese turno). Los textos que te afectan salen centrados sobre esa barra.
- **Panel de abajo en combate**: mientras puedes volver a tirar, las 6 caras de cada dado (la que salió marcada); al usar, lo que hará cada dado con todo sumado. Tocar una cara muestra lo que hace (también fuera de combate).
- **Dados 3D con físicas**: ruedan por el suelo; al pararse dan un saltito y su cara de arriba pasa a dibujarse recta píxel a píxel (sin diagonales).
- **Personajes y enemigos**: modelos de vóxeles hechos con piezas en código (`MODEL_DEFS`), dibujados con luz tramada y contorno. 20 enemigos + 25 criaturas solo de cartas.
- **Reliquias**: 32. Las de un tipo concreto (veneno, fuego, luz, furia) solo salen si te sirven.
- **Eventos con escena**: cada evento sale en una salita 3D con su figura (cofre, fuente, altar, goblin, estatua, aventurero herido, espectro herrero, seta). El resultado aparece en la misma pantalla. En la apuesta del goblin se tira de verdad tu dado de ataque. **Cofres**: al abrirlos tiemblan y 23% de las veces son un **mímico** (combate; da 30+ de oro y 40% de carta); si no, 25 de oro.
- **Cartas coleccionables**: 45 criaturas en 4 rarezas; salen de cofres (evento del cofre 20%, mímicos 40%, élites 7%, jefes 15%) y no se repiten. Álbum en el menú (las que faltan, en sombra). La carta grande se gira con el dedo.
- **Menú de inicio**: Nueva partida, Álbum (amarillo), Estadísticas (por héroe: partidas, ganadas, enemigos derrotados, daño total, mejor piso), Cómo se juega, Sonido y número de versión.
- **"Tu build"**: debajo de premios, reliquias, evolución, tienda, hoguera y eventos se ven tus dados y reliquias.
- **Tutorial**: primer combate preparado (una rata), bocadillo con flecha que señala una cosa cada vez, con una pareja de color preparada; se puede saltar. Se guarda que ya se vio en `localStorage` (`mazmorra_tuto3`).

## Pruebas

- **Bot**: juega partidas enteras en modo rápido (`G._fast(true)`) usando las funciones del juego; sirve para buscar errores y medir dificultad. Con el bot (que juega mal) con los acompañantes (v0.30) el bot gana muy poco (1-3 de cada 15) y muere sobre todo en el jefe del piso 1; un jugador de verdad debería ganar bastante más.
- Las funciones globales útiles para probar: `G.start(héroe)`, `startCombat('combate'|'elite'|'jefe')`, `G.roll()`, `G.ready()`, `useDie(d, objetivo)`, `G.auto()`, `G.end()`, `G._s()` (estado).

## Pendiente de decidir (ver IDEAS.md)

- Rehacer los dados de cada clase con caras variadas (Aturdir, Debilitar, Marcar, Esquivar, Robar, Rapidez, Drenar, Bendición), Brujo en vez de Piromante y nuevo Doctor de la Plaga.
- Dado de "una vez por combate", posiblemente ligado a compañeros (perro, mercenario, búho…).
- Dificultad: subida en v0.29 (más enemigos, 4 colores); ver qué tal se siente jugando.
- Cartas con ilustración (prueba de la Gárgola con ChatGPT) y packs de vóxeles `.vox` (habría que escribir un importador).
