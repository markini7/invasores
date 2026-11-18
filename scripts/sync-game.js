// Convierte game/index.html en game/gameHtml.js para que la app lo cargue
// y Metro recargue el móvil cada vez que cambia el juego.
// Uso: node scripts/sync-game.js        (una vez)
//      node scripts/sync-game.js --watch (se queda vigilando)
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'game', 'index.html');
const out = path.join(__dirname, '..', 'game', 'gameHtml.js');

function build() {
  const html = fs.readFileSync(src, 'utf8');
  const js = '// Generado por scripts/sync-game.js — no editar a mano; edita game/index.html\n' +
    'export default ' + JSON.stringify(html) + ';\n';
  const prev = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (prev !== js) {
    fs.writeFileSync(out, js);
    console.log('[juego] actualizado ' + new Date().toLocaleTimeString());
  }
}

build();
if (process.argv.includes('--watch')) {
  let t;
  fs.watch(path.dirname(src), (_, file) => {
    if (file !== 'index.html') return;
    clearTimeout(t);
    t = setTimeout(() => { try { build(); } catch (e) { console.error(e.message); } }, 100);
  });
  console.log('[juego] vigilando game/index.html');
}
