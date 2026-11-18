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
  buildWeb(html);
}

// Versión web (docs/index.html) para GitHub Pages: el mismo juego con el icono
// y los datos para instalarlo en la pantalla de inicio desde Safari.
function buildWeb(html) {
  const web = path.join(__dirname, '..', 'docs', 'index.html');
  const head = '<link rel="apple-touch-icon" href="icon.png">\n<link rel="icon" href="icon.png">\n' +
    '<meta name="apple-mobile-web-app-title" content="Invasores">\n' +
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n' +
    '<meta name="theme-color" content="#000000">\n';
  const out2 = html.replace('<title>Invasores</title>', '<title>Invasores</title>\n' + head);
  const prev2 = fs.existsSync(web) ? fs.readFileSync(web, 'utf8') : '';
  if (prev2 !== out2) fs.writeFileSync(web, out2);
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
