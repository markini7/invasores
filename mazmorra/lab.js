// Laboratorio de dados: un combate de prueba con los dados del juego tal y como están.
// Aquí se prueban las novedades antes de meterlas en el juego.
// Se añade al final del juego en docs/mazmorra/lab.html (lo hace scripts/sync-game.js).
(function () {
  try { localStorage.setItem('mazmorra_tuto3', '1'); } catch (e) {}
  ['legend', 'pareja', 'trio', 'eblock', 'poison', 'skull', 'cancel', 'rage', 'order'].forEach(t => Tips.seen.add(t));
  // muñecos de prueba con caras que antes se confundían (2 y 3, ataque + escudo)
  EN.lab1 = { n: 'Muñeco', spr: 'esqueleto', hp: 99, f: ['a2b2', 'a3b2', 'a2', 'a3', 'a2b3', 'a3b3'] };
  EN.lab2 = { n: 'Muñeco', spr: 'orco', hp: 99, f: ['a3', 'a2', 'a2b2', 'a3b3', 'p2', 'b3'] };
  window.LAB_EN = ['lab1', 'lab2'];
  SUITS = 'ambos';
  const css = document.createElement('style');
  css.textContent = `#labp{position:fixed;left:0;right:0;top:0;z-index:90;background:#2a1f10;box-shadow:0 3px 0 #000;padding:calc(env(safe-area-inset-top) + 6px) 10px 8px;font-size:7px;line-height:1.6;color:#f8d84a;display:flex;flex-direction:column;gap:5px}
  #labp .r{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:#e8e0f0}
  #labp button{font:inherit;font-size:8px;padding:5px 8px;background:#3a2e4a;color:#f4f0e8;border:none;box-shadow:0 0 0 2px #000;cursor:pointer}
  #labp button.on{background:#f8d84a;color:#000}
  #app{padding-top:calc(env(safe-area-inset-top) + 156px)!important}`;
  document.head.appendChild(css);
  const panel = document.createElement('div'); panel.id = 'labp'; document.body.appendChild(panel);
  const b = (txt, on, fn) => `<button class="${on ? 'on' : ''}" onclick="${fn}">${txt}</button>`;
  // paletas para los tres palos (la versión es siempre borde y fondo del color del palo)
  const PALS = [
    ['Joyas', ['#3ac060', '#a060e8', '#e8c030']],
    ['Joyas oscuras', ['#1f8a4a', '#6a2fb0', '#c08a10']],
    ['Elementos', ['#e0602a', '#2a9ad8', '#4ab04a']],
    ['Metales', ['#e0b830', '#a8b0c0', '#b0683a']],
    ['Hueso, piedra y sangre', ['#d8ccb0', '#707888', '#a02838']],
    ['Neón', ['#30e0c0', '#ff4fa8', '#ffe040']],
  ];
  let pal = 0;
  const sw = cols => cols.map(c => `<i style="display:inline-block;width:9px;height:9px;background:${c};box-shadow:0 0 0 1px #000;margin-right:2px"></i>`).join('');
  function draw() {
    panel.innerHTML = `<div>LABORATORIO DE DADOS · PALOS (borde y fondo del color del palo): las parejas y tríos van por color</div>
      <div class="r">${PALS.map(([n, c], i) => b(sw(c) + n, pal === i, `LAB.p(${i})`)).join('')}</div>
      <div class="r">${b('Empezar de nuevo', false, 'LAB.again()')}</div>`;
  }
  function refresh() { for (const k in texCache) delete texCache[k]; draw(); if (C) cRender(); }
  function start() {
    newRun('caballero');
    run.hp = run.maxHp = 99;
    // cada dado: dos caras de cada palo, repartidas al azar
    DKEYS.forEach(d => { const su = shuffle([0, 0, 1, 1, 2, 2]); run.dice[d].forEach((f, i) => { f.s = su[i]; }); });
    startCombat('combate');
  }
  window.LAB = { p: i => { pal = i; SUIT_COL = PALS[i][1].slice(); refresh(); }, again: () => start() };
  draw(); start();
})();
