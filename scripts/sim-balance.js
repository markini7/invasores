// Simulador de equilibrio: juega partidas automáticas en modo infinito con un solo
// disparo (o fusión), sin artefactos ni subidas de nivel, y mide cuánto aguanta.
// Uso: npm run sim                      (los 25 disparos a nivel 3)
//      npm run sim -- --fusions         (más las 300 fusiones a nivel máximo, ~2 min)
//      npm run sim -- --only fire       (un disparo y sus fusiones)
//      npm run sim -- --real            (con balas enemigas y 3 vidas: cuenta Antibalas y Vampiro)
// Opciones: --seeds 3 (partidas por disparo) --max 600 (segundos máx.) --leaks 5 --out resultados.json
// Ojo: sin balas enemigas (Antibalas sale peor de lo que es), sin artefactos y con un solo hueco de disparo.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SEEDS = +opt('--seeds', 3), MAX = +opt('--max', 600), LEAKS = +opt('--leaks', 5);
const WORKERS = +opt('--workers', 4), OUT = opt('--out', null), ONLY = opt('--only', null);
const REAL = args.includes('--real');
const html = 'file://' + path.join(__dirname, '..', 'game', 'index.html');

// se ejecuta dentro de la página: una partida con un disparo fijo
function runOne({ slot, seed, MAX, LEAKS, REAL }) {
  let s = seed >>> 0;
  Math.random = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  window.sfx = () => {}; window.haptic = () => {};
  prof.ship = 'explorador';
  newGame();
  slots = [Object.assign({}, slot)]; run.used = new Set([slot.id]);
  let leaks = 0;
  // modo normal: sin balas enemigas, cuenta los aliens que se escapan. Modo real: 3 vidas de verdad
  if (!REAL) hurt = () => { leaks++; return false };
  const DT = 1 / 60;
  let t = 0, dmg50 = null;
  while (t < MAX && (REAL ? lives > 0 : leaks < LEAKS)) {
    // sin subidas de nivel ni arcoíris: solo cuenta el disparo
    pend = 0; xp = 0; TM.rb = 1e9; fuseReady = false;
    if (!REAL) { ebs = []; lives = 3; }
    if (state !== 'play') { if (REAL && (state === 'dead' || state === 'over')) break; state = 'play'; }
    // piloto: se pone debajo del alien más bajo
    let lo = null; for (const e of en) if (!e.dead && !e.rock && !(e.charm > 0) && (!lo || e.y > lo.y)) lo = e;
    if (lo) tx = lo.x;
    // esquiva: entre varias posiciones cerca del objetivo, la más cercana sin balas enemigas cayendo encima
    if (REAL) {
      const want = lo ? lo.x : px, danger = x => { let d = 0; for (const q of ebs) if (!q.dead && q.y < py + P * 4 && q.y > py - P * 110 && Math.abs(q.x - x) < P * 9) d += 1 + (q.y - (py - P * 110)) / (P * 110); return d; };
      let best = null, bs = 1e9;
      for (let k = -8; k <= 8; k++) { const x = Math.max(P * 6, Math.min(W - P * 6, want + k * P * 8)); const sc = danger(x) * 1000 + danger((x + px) / 2) * 400 + Math.abs(x - want) * .05 + Math.abs(x - px) * .005; if (sc < bs) { bs = sc; best = x; } }
      tx = best;
    }
    update(DT); t += DT;
    if (dmg50 === null && t >= 60) dmg50 = run.total;
  }
  return { time: Math.round(t), kills, dmg: Math.round(run.total), dmg60: Math.round(dmg50 || run.total) };
}

(async () => {
  const browser = await chromium.launch();
  const base = await browser.newPage();
  await base.goto(html);
  const info = await base.evaluate(() => ({ BASE, names: Object.fromEntries(BASE.map(id => [id, T[id].n])) }));
  await base.close();
  const jobs = [];
  for (const id of info.BASE) jobs.push({ key: id, name: info.names[id], slot: { id, l: 3 } });
  if (args.includes('--fusions')) {
    for (let i = 0; i < info.BASE.length; i++) for (let j = i + 1; j < info.BASE.length; j++) {
      const a = info.BASE[i], b = info.BASE[j];
      jobs.push({ key: a + '+' + b, name: null, slot: { id: 'f:' + a + '+' + b, l: 3, l2: 3, fl: 3 } });
    }
  }
  const todo = ONLY ? jobs.filter(j => j.key.split('+').includes(ONLY) || j.key === ONLY) : jobs;
  const results = []; let done = 0;
  async function worker() {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await p.addInitScript(() => { window.requestAnimationFrame = () => 0 });
    await p.goto(html);
    while (todo.length) {
      const j = todo.shift();
      if (!j.name) j.name = await p.evaluate(id => nameOf(id), j.slot.id);
      const runs = [];
      for (let k = 0; k < SEEDS; k++) runs.push(await p.evaluate(runOne, { slot: j.slot, seed: 1234 + k * 7919, MAX, LEAKS, REAL }));
      const avg = f => Math.round(runs.reduce((a, r) => a + r[f], 0) / runs.length);
      results.push({ key: j.key, name: j.name, fusion: j.key.includes('+'), time: avg('time'), kills: avg('kills'), dmg: avg('dmg'), dmg60: avg('dmg60') });
      done++; process.stderr.write(`\r${done} hechas`);
    }
    await p.close();
  }
  await Promise.all(Array.from({ length: WORKERS }, worker));
  await browser.close();
  process.stderr.write('\n');
  results.sort((a, b) => b.time - a.time || b.dmg - a.dmg);
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
  for (const r of results) console.log(`${String(r.time).padStart(4)}s  ${String(r.kills).padStart(5)} muertes  ${String(r.dmg60).padStart(6)} daño 1er min  ${r.name}${r.fusion ? ' (' + r.key + ')' : ''}`);
})();
