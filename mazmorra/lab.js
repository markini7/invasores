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
  const css = document.createElement('style');
  css.textContent = `#labp{position:fixed;left:0;right:0;top:0;z-index:90;background:#2a1f10;box-shadow:0 3px 0 #000;padding:calc(env(safe-area-inset-top) + 6px) 10px 8px;font-size:7px;line-height:1.6;color:#f8d84a;display:flex;flex-direction:column;gap:5px}
  #labp .r{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:#e8e0f0}
  #labp button{font:inherit;font-size:8px;padding:5px 8px;background:#3a2e4a;color:#f4f0e8;border:none;box-shadow:0 0 0 2px #000;cursor:pointer}
  #labp button.on{background:#f8d84a;color:#000}
  #app{padding-top:calc(env(safe-area-inset-top) + 64px)!important}`;
  document.head.appendChild(css);
  const panel = document.createElement('div'); panel.id = 'labp'; document.body.appendChild(panel);
  const b = (txt, on, fn) => `<button class="${on ? 'on' : ''}" onclick="${fn}">${txt}</button>`;
  function draw() {
    panel.innerHTML = `<div>LABORATORIO DE DADOS · los dados tal y como están en el juego</div>
      <div class="r">${b('Empezar de nuevo', false, 'LAB.again()')}</div>`;
  }
  function refresh() { for (const k in texCache) delete texCache[k]; draw(); if (C) cRender(); }
  function start() {
    newRun('caballero');
    run.hp = run.maxHp = 99;
    startCombat('combate');
  }
  window.LAB = { again: () => start() };
  draw(); start();
})();
