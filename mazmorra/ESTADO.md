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

## El juego hoy (v0.27)

- **Héroes**: Caballero (Furia y Doble), Clériga (Luz), Pícara (Veneno), Piromante (Fuego). Cada uno con 3 dados: Ataque, Protección y Especial. Evolucionan al vencer a los jefes de los pisos 1 y 2 (2 caminos cada vez); cada evolución tiene su skin 3D (variantes del héroe base) y la pantalla muestra cómo cambian los dados.
- **Mazmorra**: 3 pisos (Cripta, Cuevas, Abismo) de 8 salas. Se elige puerta tocándola en un pasillo 3D en primera persona; las puertas solo llevan su símbolo y hay botón de leyenda. Salas: combate, élite, forja, altar, evento, hoguera, tienda ("Tienda de mejoras y reliquias") y jefe.
- **Combate** (una sola escena 3D): los enemigos tiran su dado primero (su intención se ve en la franja de carteles de arriba, con barra de puntitos y número de vida "24/35"). Tú tiras 3 dados, tocas en la mesa los que quieres guardar y vuelves a tirar el resto (2 veces), y luego usas cada dado tocándolo y tocando su objetivo. La protección siempre es para ti y para los golpes (el veneno la atraviesa). Si matas a un enemigo antes de que actúe, su dado se cancela.
- **Colores (palos)**: cada cara tiene un color (verde, morado o amarillo, paleta Joyas; borde y fondo del color y número en blanco; el lateral del dado muestra su tipo). **Las parejas y los tríos van por color**: pareja +1 a cada dado, trío ×2. Cada dado empieza con 2 caras de cada color. Las caras nuevas heredan el color de la que sustituyen.
- **Tu vida**: barra de puntitos fija debajo de la escena con previsión (amarillo lo que te van a quitar, azul lo bloqueado, verde el veneno, calavera si mueres ese turno). Los textos que te afectan salen centrados sobre esa barra.
- **Panel de abajo en combate**: mientras puedes volver a tirar, las 6 caras de cada dado (la que salió marcada); al usar, lo que hará cada dado con todo sumado. Tocar una cara muestra lo que hace (también fuera de combate).
- **Dados 3D con físicas**: ruedan por el suelo; al pararse dan un saltito y su cara de arriba pasa a dibujarse recta píxel a píxel (sin diagonales).
- **Personajes y enemigos**: modelos de vóxeles hechos con piezas en código (`MODEL_DEFS`), dibujados con luz tramada y contorno. 20 enemigos + 25 criaturas solo de cartas.
- **Reliquias**: 32. Las de un tipo concreto (veneno, fuego, luz, furia) solo salen si te sirven.
- **Cartas coleccionables**: 45 criaturas en 4 rarezas; salen de cofres (evento del cofre 20%, élites 7%, jefes 15%) y no se repiten. Álbum en el menú (las que faltan, en sombra). La carta grande se gira con el dedo.
- **Menú de inicio**: Nueva partida, Álbum (amarillo), Estadísticas (por héroe: partidas, ganadas, enemigos derrotados, daño total, mejor piso), Cómo se juega, Sonido y número de versión.
- **"Tu build"**: debajo de premios, reliquias, evolución, tienda, hoguera y eventos se ven tus dados y reliquias.
- **Tutorial**: primer combate preparado (una rata), bocadillo con flecha que señala una cosa cada vez, con una pareja de color preparada; se puede saltar. Se guarda que ya se vio en `localStorage` (`mazmorra_tuto3`).

## Pruebas

- **Bot**: juega partidas enteras en modo rápido (`G._fast(true)`) usando las funciones del juego; sirve para buscar errores y medir dificultad. Con el bot (que juega mal) ahora se gana aproximadamente: Caballero y Clériga 2 de cada 3, Pícara 1 de cada 5 y Piromante 1 de cada 3.
- Las funciones globales útiles para probar: `G.start(héroe)`, `startCombat('combate'|'elite'|'jefe')`, `G.roll()`, `G.ready()`, `useDie(d, objetivo)`, `G.end()`, `G._s()` (estado).

## Pendiente de decidir (ver IDEAS.md)

- Rehacer los dados de cada clase con caras variadas (Aturdir, Debilitar, Marcar, Esquivar, Robar, Rapidez, Drenar, Bendición), Brujo en vez de Piromante y nuevo Doctor de la Plaga.
- Dado de "una vez por combate", posiblemente ligado a compañeros (perro, mercenario, búho…).
- Dificultad: con las parejas por color el +1 es casi constante; quizá afinar.
- Cartas con ilustración (prueba de la Gárgola con ChatGPT) y packs de vóxeles `.vox` (habría que escribir un importador).
