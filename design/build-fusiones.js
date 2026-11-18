// Genera design/fusiones.html: la página de fusiones y artefactos.
// Toma del juego (game/index.html) los datos, fórmulas y textos, para que todo coincida con lo que hay en el juego.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const game = fs.readFileSync(path.join(dir, '..', 'game', 'index.html'), 'utf8');
function slice(from, to) {
  const a = game.indexOf(from), b = game.indexOf(to);
  if (a < 0 || b < 0 || b < a) throw new Error('No encuentro "' + from + '" en game/index.html');
  return game.slice(a, b);
}
const shots = slice('// ================= DISPAROS', '// ================= PARTÍCULAS');
const arts = slice('// ================= ARTEFACTOS', 'const SHOT_SLOTS');
const tpl = fs.readFileSync(path.join(dir, 'fusiones.template.html'), 'utf8');
const out = tpl.replace('/*GAME*/', () => shots).replace('/*ARTS*/', () => arts);
fs.writeFileSync(path.join(dir, 'fusiones.html'), out);
console.log('design/fusiones.html', out.length, 'bytes');
