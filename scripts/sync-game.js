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
  buildLab(out2);
  buildMazmorra();
}

// Mazmorra de Dados (otro juego): mazmorra/index.html -> docs/mazmorra/index.html
function buildMazmorra() {
  const src2 = path.join(__dirname, '..', 'mazmorra', 'index.html');
  if (!fs.existsSync(src2)) return;
  const head = '<meta name="apple-mobile-web-app-title" content="Mazmorra">\n' +
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n' +
    '<meta name="theme-color" content="#120e18">\n';
  // número de versión: v0.N, donde N es el siguiente cambio de la carpeta mazmorra/ en git
  let ver = 'v0.dev';
  try { ver = 'v0.' + (parseInt(require('child_process').execSync('git rev-list --count HEAD -- mazmorra', { cwd: path.join(__dirname, '..') }).toString(), 10) + 1); } catch (e) {}
  const out = fs.readFileSync(src2, 'utf8').replace('<title>Mazmorra de Dados</title>', '<title>Mazmorra de Dados</title>\n' + head).replace("const VERSION = 'v0.dev';", `const VERSION = '${ver}';`);
  const dir = path.join(__dirname, '..', 'docs', 'mazmorra');
  fs.mkdirSync(dir, { recursive: true });
  const dst = path.join(dir, 'index.html');
  const prev = fs.existsSync(dst) ? fs.readFileSync(dst, 'utf8') : '';
  if (prev !== out) fs.writeFileSync(dst, out);
  // laboratorio de dados: el mismo juego con mazmorra/lab.js al final
  const labSrc = path.join(__dirname, '..', 'mazmorra', 'lab.js');
  if (fs.existsSync(labSrc)) {
    const lab = out.replace('<title>Mazmorra de Dados</title>', '<title>Laboratorio de dados</title>')
      .replace(/<\/body>\s*<\/html>\s*$/, '<script>\n' + fs.readFileSync(labSrc, 'utf8') + '</script>\n</body>\n</html>\n');
    const labDst = path.join(dir, 'lab.html');
    const prevLab = fs.existsSync(labDst) ? fs.readFileSync(labDst, 'utf8') : '';
    if (prevLab !== lab) fs.writeFileSync(labDst, lab);
  }
}

// Laboratorio (docs/lab.html): el mismo juego con game/lab.js al final para probar disparos.
function buildLab(web) {
  const lab = fs.readFileSync(path.join(__dirname, '..', 'game', 'lab.js'), 'utf8');
  // enganches solo para el laboratorio: dibujo de balas enemigas, capa de encima y barras de vida
  const hook = (html, from, to) => { if (!html.includes(from)) throw new Error('lab: no encuentro en el juego: ' + from.slice(0, 60)); return html.replace(from, to); };
  const EBD = "for(const q of ebs)drawEBullet(q);";
  let g = hook(web, EBD, 'if(window.labEB)labEB(0);else{' + EBD + '}');
  g = hook(g, ' // viñetas y destellos de pantalla', ' if(window.labEB)labEB(1);\n // viñetas y destellos de pantalla');
  g = hook(g, 'if(e.hp<e.max&&!fogged){', 'if(e.hp<e.max&&!fogged&&(!window.labHB||labHB(e))){');
  const out = g.replace('<title>Invasores</title>', '<title>Laboratorio de Invasores</title>')
    .replace(/<\/body>\s*<\/html>\s*$/, '<script>\n' + lab + '</script>\n</body>\n</html>\n');
  const dst = path.join(__dirname, '..', 'docs', 'lab.html');
  const prev = fs.existsSync(dst) ? fs.readFileSync(dst, 'utf8') : '';
  if (prev !== out) fs.writeFileSync(dst, out);
}

build();
if (process.argv.includes('--watch')) {
  let t;
  fs.watch(path.dirname(src), (_, file) => {
    if (file !== 'index.html' && file !== 'lab.js') return;
    clearTimeout(t);
    t = setTimeout(() => { try { build(); } catch (e) { console.error(e.message); } }, 100);
  });
  console.log('[juego] vigilando game/index.html');
}
