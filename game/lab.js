// Laboratorio de Invasores: horda infinita para probar disparos y fusiones.
// Se añade al final de game/index.html (scripts/sync-game.js genera docs/lab.html).
// Usa el juego tal cual y solo cambia: sin subidas de nivel ni arcoíris, disparos elegidos
// a mano y la horda (minuto, cantidad, velocidad) ajustable.
(function () {
  const LS = 'invasores_lab';
  const LAB = {
    open: true, on: false,
    slots: [{ a: 'laser', b: null, l: 3 }, { a: null, b: null, l: 3 }, { a: null, b: null, l: 3 }],
    act: 0, min: 2, fixed: false, rate: 1, speed: 1, inv: true, ebs: true,
    hits: 0, why: '',
    // pruebas de diseño (solo laboratorio)
    d: { eb: 'laser', big: false, top: false, trail: false, hb: 'siempre', pause: 'actual', move: 'salta', dot: false, txt: false, lvl: false },
  };
  try { const sv = JSON.parse(localStorage.getItem(LS) || 'null'); if (sv) for (const k of ['slots', 'min', 'fixed', 'rate', 'speed', 'inv', 'ebs']) if (sv[k] != null) LAB[k] = sv[k]; if (sv.d) Object.assign(LAB.d, sv.d); } catch (e) {}
  const save = () => { try { localStorage.setItem(LS, JSON.stringify({ slots: LAB.slots, min: LAB.min, fixed: LAB.fixed, rate: LAB.rate, speed: LAB.speed, inv: LAB.inv, ebs: LAB.ebs, d: LAB.d })) } catch (e) {} };

  // ---------- la horda: minuto de partida, dificultad fija o creciente, cantidad y velocidad ----------
  const R0 = Object.assign({}, R);
  for (const k of Object.keys(R0)) R[k] = t => {
    if (!LAB.on) return R0[k](t);
    const tt = LAB.fixed ? LAB.min * 60 : t + LAB.min * 60;
    let v = R0[k](tt);
    if (k === 'rate') v *= LAB.rate;
    if (k === 'speed') v *= LAB.speed;
    return v;
  };

  // ---------- enganches al juego ----------
  const U0 = update;
  update = function (dt) {
    if (LAB.open) return;
    // sin subidas de nivel: la experiencia no puede llegar a la cuenta ni aunque mueran muchos a la vez
    const noLv = LAB.on && !LAB.d.lvl;
    if (LAB.on) { if (noLv) { pend = 0; xp = -1e9; } TM.rb = 1e9; fuseReady = false; if (!LAB.ebs) ebs = []; }
    U0(dt);
    if (noLv) { xp = 0; xpShow = 0; pend = 0; }
  };
  const H0 = hurt;
  hurt = function () {
    LAB.hits++;
    if (LAB.on && LAB.inv) { flash(px, py, '#ff4d6d', P * 12, .2); return false; }
    return H0();
  };
  gameOver = function () { state = 'over'; LAB.why = 'caido'; openPanel(); };
  showTitle = function () { openPanel(); };

  // ---------- estilos ----------
  const st = document.createElement('style');
  st.textContent = `
#lab{position:fixed;inset:0;z-index:30;display:none;flex-direction:column;align-items:center;gap:14px;overflow-y:auto;overflow-x:hidden;touch-action:pan-y;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,.94);padding-block:calc(18px + env(safe-area-inset-top,0px)) calc(24px + env(safe-area-inset-bottom,0px));padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));box-sizing:border-box;color:#fff;font-family:'Press Start 2P',ui-monospace,monospace}
#lab.show{display:flex}
#lab>*{width:min(420px,100%);flex-shrink:0}
#lab .lt{font-size:16px;line-height:1.5;text-align:center;text-shadow:3px 3px 0 #2b8a2b}
#lab .tg{font-size:8px;color:#8fa0a0;line-height:1.8;letter-spacing:.04em}
#lab .ds{font-size:7px;color:#c8d0d0;line-height:1.9}
#lab .sec{display:flex;flex-direction:column;gap:8px}
#lab .slots{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
#lab .slot{border:3px solid #333;padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;background:#050505;min-width:0}
#lab .slot.on{border-color:#fff}
#lab .slot canvas{width:44px;height:44px;image-rendering:pixelated}
#lab .slot .n{font-size:7px;line-height:1.6;text-align:center;min-height:22px;overflow-wrap:anywhere}
#lab .lv{display:flex;gap:4px}
#lab .lv span,#lab .chip{font-size:8px;padding:5px 7px;border:2px solid #444;color:#8fa0a0;cursor:pointer}
#lab .lv span.on,#lab .chip.on{border-color:#fff;color:#fff}
#lab .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:5px}
#lab .cell{border:2px solid #222;aspect-ratio:1;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#050505}
#lab .cell.on{border-color:#fff}
#lab .cell canvas{width:72%;height:72%;image-rendering:pixelated}
#lab .info{border:2px solid #333;padding:10px;display:flex;flex-direction:column;gap:6px;min-height:40px}
#lab .info .nm{font-size:10px;line-height:1.6}
#lab .row{display:flex;align-items:center;justify-content:space-between;gap:10px}
#lab input[type=range]{width:100%;accent-color:#5cff4a}
#lab .val{font-size:9px;color:#fff;white-space:nowrap;font-variant-numeric:tabular-nums}
#lab .chips{display:flex;gap:6px;flex-wrap:wrap}
#lab .go{border:3px solid #fff;font-size:12px;padding:14px;text-align:center;cursor:pointer}
#lab .go.alt{border-color:#555;color:#c8d0d0;font-size:9px;padding:11px}
#lab .go:active,#lab .slot:active,#lab .cell:active{transform:translate(2px,2px)}
#lab .res{border:3px solid #ffd23f;padding:10px;display:flex;flex-direction:column;gap:8px}
#lab .bar{height:5px;background:#222;margin-top:4px}
#lab .bar div{height:5px}
#lab [role=button]:focus-visible{outline:2px solid #ffd23f;outline-offset:2px}
#labb{position:fixed;right:calc(12px + env(safe-area-inset-right,0px));top:60px;z-index:4;display:none;align-items:center;gap:8px;font-family:'Press Start 2P',ui-monospace,monospace;font-size:7px;color:#c8d0d0;pointer-events:none}
#labb.show{display:flex}
#labb .st{text-align:right;line-height:1.9;text-shadow:1px 1px 0 #000}
#pz.mini{width:26px;height:26px;gap:4px}#pz.mini i{width:4px;height:10px}
body.labtxt #ov .card .ds{font-size:9px;line-height:1.7}body.labtxt #ov .card .nm{font-size:13px}body.labtxt #ov .card .tag{font-size:8px}
#lab .pv{width:100%;height:84px;image-rendering:pixelated;border:2px solid #222;background:#000}
#lab .grp{display:flex;flex-direction:column;gap:6px}
#labb .b{pointer-events:auto;border:2px solid #4a5656;background:rgba(0,0,0,.35);padding:9px 7px;font-size:8px;color:#fff;cursor:pointer}
`;
  document.head.appendChild(st);
  const panel = document.createElement('div'); panel.id = 'lab'; document.body.appendChild(panel);
  const hud = document.createElement('div'); hud.id = 'labb';
  hud.innerHTML = '<div class="st" id="labst"></div><div class="b" role="button" tabindex="0" id="labbtn">LAB</div>';
  document.body.appendChild(hud);
  document.getElementById('labbtn').addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); LAB.why = ''; openPanel(); });

  // ---------- utilidades ----------
  const idOf = s => !s.a ? null : s.b ? fid(s.a, s.b) : s.a;
  const fmtT = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  function sprite(cnv, id, box) {
    const g = cnv.getContext('2d'); g.clearRect(0, 0, cnv.width, cnv.height);
    if (!id) { g.fillStyle = '#222'; g.fillRect(cnv.width / 2 - 6, cnv.height / 2 - 1, 12, 2); g.fillRect(cnv.width / 2 - 1, cnv.height / 2 - 6, 2, 12); return; }
    const L = look(id), k = Math.max(1, Math.floor(box / Math.max(L.rows.length, L.rows[0].length)));
    drawSpr(g, L.rows, cnv.width / 2, cnv.height / 2, k, L.map);
  }
  function toSlot(s) { const id = idOf(s); if (!id) return null; return isF(id) ? { id, l: s.l, l2: s.l, fl: s.l } : { id, l: s.l }; }

  // ---------- panel ----------
  function openPanel() {
    LAB.open = true; ov.classList.remove('show'); hud.classList.remove('show'); render();
    panel.classList.add('show'); panel.scrollTop = 0;
  }
  function closePanel() { LAB.open = false; panel.classList.remove('show'); if (LAB.on) hud.classList.add('show'); }

  function render() {
    const S = LAB.slots, cur = S[LAB.act], cid = idOf(cur);
    let h = '<div class="lt">LABORATORIO</div>';
    // resultado de la partida en curso
    if (LAB.on && gt > 1) {
      const kpm = kills / Math.max(gt / 60, 1 / 60);
      const srcs = Object.keys(run.dmg).filter(s => run.dmg[s] > .01).sort((a, b) => run.dmg[b] - run.dmg[a]).slice(0, 6);
      const top = srcs.length ? run.dmg[srcs[0]] : 1;
      h += `<div class="res"><div class="tg" style="color:#ffd23f">${LAB.why === 'caido' ? 'HAS CAIDO' : 'PARTIDA EN PAUSA'}</div>
        <div class="ds">Tiempo <b style="color:#fff">${fmtT(gt)}</b> (horda en el minuto ${fmtT(LAB.fixed ? LAB.min * 60 : gt + LAB.min * 60)}) · ${kills} muertes · ${Math.round(kpm)}/min · ${LAB.hits} golpes recibidos</div>
        ${srcs.map(s => `<div class="ds">${srcName(s)} · ${Math.round(run.dmg[s])} de daño · ${run.kills[s] || 0} muertes<div class="bar"><div style="width:${Math.round(run.dmg[s] / top * 100)}%;background:${s.startsWith('art:') ? '#8fa0a0' : (T[s] || isF(s)) ? colorOf(s) : '#8fa0a0'}"></div></div></div>`).join('')}</div>`;
      if (LAB.why !== 'caido') h += '<div class="go" role="button" tabindex="0" id="lres">SEGUIR</div>';
    }
    // huecos de disparo
    h += `<div class="sec"><div class="tg">DISPAROS · TOCA UN HUECO Y ELIGE UNO O DOS DISPAROS (DOS = FUSION)</div><div class="slots">`;
    S.forEach((s, i) => {
      const id = idOf(s);
      h += `<div class="slot${i === LAB.act ? ' on' : ''}" role="button" tabindex="0" data-s="${i}"><canvas width="88" height="88" data-sp="${i}"></canvas><div class="n">${id ? nameOf(id) : 'Vacío'}</div>
        <div class="lv">${[1, 2, 3].map(l => `<span class="${s.l === l ? 'on' : ''}" data-s="${i}" data-l="${l}">${l}</span>`).join('')}</div></div>`;
    });
    h += `</div><div class="grid">${BASE.map(id => `<div class="cell${cur.a === id || cur.b === id ? ' on' : ''}" role="button" tabindex="0" data-id="${id}" aria-label="${T[id].n}"><canvas width="44" height="44" data-c="${id}"></canvas></div>`).join('')}</div>`;
    // ficha del hueco elegido
    if (cid) {
      const twd = isF(cid) && TW[cid.slice(2)] ? TW[cid.slice(2)].d : '';
      const st0 = S0(cid, cur.l);
      h += `<div class="info"><div class="nm" style="color:${colorOf(cid)}">${nameOf(cid)}</div>
        ${isF(cid) ? `<div class="tg">${T[cur.a].n} + ${T[cur.b].n} · FUSION NIVEL ${cur.l}</div>` : `<div class="tg">DISPARO NIVEL ${cur.l}</div>`}
        <div class="ds" style="color:#fff">${isF(cid) ? twd : T[cid].d}</div><div class="ds">${describe(st0).join(' · ')}</div>
        <div class="row"><span class="chip" role="button" tabindex="0" id="lclr">VACIAR HUECO</span></div></div>`;
    }
    h += '</div>';
    // horda
    h += `<div class="sec"><div class="tg">HORDA</div>
      <div class="row"><span class="ds">Empieza en el minuto</span><span class="val" id="vmin">${LAB.min}</span></div>
      <input type="range" id="lmin" min="0" max="20" step="1" value="${LAB.min}" aria-label="Minuto de partida">
      <div class="chips"><span class="chip${!LAB.fixed ? ' on' : ''}" role="button" tabindex="0" data-fx="0">SUBE CON EL TIEMPO</span><span class="chip${LAB.fixed ? ' on' : ''}" role="button" tabindex="0" data-fx="1">FIJA</span></div>
      <div class="row"><span class="ds">Cantidad de aliens</span><span class="val" id="vrate">x${LAB.rate}</span></div>
      <input type="range" id="lrate" min="0.25" max="4" step="0.25" value="${LAB.rate}" aria-label="Cantidad de aliens">
      <div class="row"><span class="ds">Velocidad de bajada</span><span class="val" id="vspd">x${LAB.speed}</span></div>
      <input type="range" id="lspd" min="0.25" max="4" step="0.25" value="${LAB.speed}" aria-label="Velocidad de bajada">
      <div class="chips"><span class="chip${LAB.inv ? ' on' : ''}" role="button" tabindex="0" id="linv">INVENCIBLE</span><span class="chip${LAB.ebs ? ' on' : ''}" role="button" tabindex="0" id="lebs">BALAS ENEMIGAS</span></div>
      <div class="ds">Sin subidas de nivel ni artefactos. Invencible: los golpes se cuentan pero no quitan vida.</div></div>`;
    // pruebas de diseño
    const D = LAB.d, ch = (k, v, t) => `<span class="chip${D[k] === v ? ' on' : ''}" role="button" tabindex="0" data-dk="${k}" data-dv="${v}">${t}</span>`, tg = (k, t) => `<span class="chip${D[k] ? ' on' : ''}" role="button" tabindex="0" data-dt="${k}">${t}</span>`;
    h += `<div class="sec"><div class="tg" style="color:#ffd23f">PRUEBAS DE DISEÑO · SOLO EN EL LABORATORIO</div>
      <div class="grp"><div class="ds">Bala enemiga</div><canvas class="pv" id="lpv" width="840" height="168"></canvas>
        <div class="chips">${ch('eb', 'laser', 'LASER (JUEGO)')}${ch('eb', 'actual', 'ANTIGUA')}${ch('eb', 'nucleo', 'NUCLEO')}${ch('eb', 'orbe', 'ORBE')}${ch('eb', 'rombo', 'ROMBO')}${ch('eb', 'flecha', 'FLECHA')}</div>
        <div class="chips">${tg('big', 'GRANDE')}${tg('top', 'ENCIMA DE TODO')}${tg('trail', 'ESTELA')}</div></div>
      <div class="grp"><div class="ds">Barras de vida de los aliens</div><div class="chips">${ch('hb', 'siempre', 'SIEMPRE')}${ch('hb', 'golpe', 'TRAS GOLPE')}${ch('hb', 'fina', 'FINAS')}${ch('hb', 'nunca', 'NUNCA')}</div></div>
      <div class="grp"><div class="ds">Botón de pausa</div><div class="chips">${ch('pause', 'actual', 'COMO AHORA')}${ch('pause', 'barra', 'EN LA BARRA')}</div></div>
      <div class="grp"><div class="ds">Movimiento de la nave</div><div class="chips">${ch('move', 'salta', 'SALTA AL DEDO')}${ch('move', 'rel', 'RELATIVO')}</div>
        <div class="ds">Relativo: la nave se mueve lo mismo que arrastras, pongas el dedo donde lo pongas.</div></div>
      <div class="grp"><div class="ds">Otros</div><div class="chips">${tg('dot', 'PUNTO DE IMPACTO')}${tg('txt', 'TEXTO DE CARTAS GRANDE')}${tg('lvl', 'SUBIDAS DE NIVEL')}</div>
        <div class="ds">Activa las subidas de nivel para ver las cartas con el texto grande.</div></div></div>`;
    h += `<div class="go" role="button" tabindex="0" id="lgo">${LAB.on ? 'REINICIAR CON ESTO' : 'EMPEZAR'}</div>`;
    panel.innerHTML = h;
    // dibujos
    panel.querySelectorAll('canvas[data-sp]').forEach(c => sprite(c, idOf(S[+c.dataset.sp]), 64));
    panel.querySelectorAll('canvas[data-c]').forEach(c => sprite(c, c.dataset.c, 32));
    // acciones
    const on = (el, fn) => { if (!el) return; el.addEventListener('click', fn); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e) } }); };
    panel.querySelectorAll('.slot').forEach(el => on(el, e => { if (e.target.dataset && e.target.dataset.l) return; LAB.act = +el.dataset.s; sfx('pick'); render(); }));
    panel.querySelectorAll('.lv span').forEach(el => on(el, e => { e.stopPropagation(); LAB.slots[+el.dataset.s].l = +el.dataset.l; LAB.act = +el.dataset.s; save(); render(); }));
    panel.querySelectorAll('.cell').forEach(el => on(el, () => {
      const id = el.dataset.id, s = LAB.slots[LAB.act];
      if (s.a === id) { s.a = s.b; s.b = null; } else if (s.b === id) s.b = null;
      else if (!s.a) s.a = id; else s.b = id;
      sfx('pick'); save(); render();
    }));
    on(document.getElementById('lclr'), () => { const s = LAB.slots[LAB.act]; s.a = s.b = null; save(); render(); });
    const rng = (id, key, out, pre) => { const el = document.getElementById(id); el.addEventListener('input', () => { LAB[key] = +el.value; document.getElementById(out).textContent = (pre || '') + el.value; save(); }); };
    rng('lmin', 'min', 'vmin'); rng('lrate', 'rate', 'vrate', 'x'); rng('lspd', 'speed', 'vspd', 'x');
    panel.querySelectorAll('[data-fx]').forEach(el => on(el, () => { LAB.fixed = el.dataset.fx === '1'; save(); render(); }));
    on(document.getElementById('linv'), () => { LAB.inv = !LAB.inv; save(); render(); });
    on(document.getElementById('lebs'), () => { LAB.ebs = !LAB.ebs; save(); render(); });
    on(document.getElementById('lres'), () => { sfx('pick'); closePanel(); });
    on(document.getElementById('lgo'), start);
    panel.querySelectorAll('[data-dk]').forEach(el => on(el, () => { LAB.d[el.dataset.dk] = el.dataset.dv; applyD(); save(); render(); }));
    panel.querySelectorAll('[data-dt]').forEach(el => on(el, () => { LAB.d[el.dataset.dt] = !LAB.d[el.dataset.dt]; applyD(); save(); render(); }));
    preview();
    accFix(panel);
  }
  // estadísticas del disparo para la ficha (sin depender de la partida)
  function S0(id, l) { return isF(id) ? S(id, l, l, l) : S(id, l); }

  function start() {
    const sl = LAB.slots.map(toSlot).filter(Boolean);
    if (!sl.length) { LAB.act = 0; render(); return; }
    sfx('pick');
    prof.ship = 'explorador';
    newGame();
    LAB.on = true; LAB.hits = 0; LAB.why = '';
    slots = sl; shotSlots = Math.max(shotSlots, sl.length); run.used = new Set(sl.map(s => s.id));
    closePanel();
  }

  // estadísticas en pantalla mientras juegas
  setInterval(() => {
    if (!LAB.on || LAB.open) return;
    const m = LAB.fixed ? LAB.min * 60 : gt + LAB.min * 60;
    document.getElementById('labst').innerHTML = `HORDA ${fmtT(m)}<br>${kills} MUERTES · ${Math.round(kills / Math.max(gt / 60, 1 / 60))}/MIN<br>${LAB.hits} GOLPES`;
  }, 250);

  // ---------- pruebas de diseño ----------
  const EBC = { actual: '#ff4d6d', laser: '#ff4d6d', nucleo: '#ff2a3a', orbe: '#ff2a50', rombo: '#ff2bd6', flecha: '#ff2a3a' };
  const ROMBO = ['..1..', '.121.', '12221', '.121.', '..1..'];
  function sqr(g, x, y, w, h, c, a) { g.globalAlpha = a == null ? 1 : a; g.fillStyle = c; g.fillRect(Math.round(x - w / 2), Math.round(y - h / 2), Math.max(1, Math.round(w)), Math.max(1, Math.round(h))); }
  // dibuja una bala enemiga con el estilo elegido
  function drawEB(g, q, D) {
    const u = Math.max(1, Math.round(P * (D.big ? 1.5 : 1) * (q.big ? 1.5 : 1))), c = EBC[D.eb] || '#ff4d6d', pulse = Math.floor(tm * 8) % 2;
    const vx = q.vx || 0, vy = q.vy || 100;
    if (D.trail) for (let i = 4; i >= 1; i--) sqr(g, q.x - vx * .022 * i, q.y - vy * .022 * i, u * (1.6 - i * .25), u * (1.6 - i * .25), c, .55 - i * .1);
    g.globalAlpha = 1;
    if (D.eb === 'laser') { // el zigzag de siempre con brillo de láser: halo que respira, rastro de luz y zigzag más vivo
      const fl = .75 + .25 * Math.sin(tm * 14 + q.x * .05), m = Math.hypot(vx, vy) || 1;
      g.globalCompositeOperation = 'lighter';
      g.globalAlpha = .55 * fl; g.drawImage(glowTex('#ff4d6d'), q.x - u * 5, q.y - u * 5, u * 10, u * 10);
      for (let i = 1; i <= 3; i++) sqr(g, q.x - vx / m * u * 1.4 * i, q.y - vy / m * u * 1.4 * i, u * .9, u * 1.4, '#ff4d6d', (.5 - i * .14) * fl);
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      if (q.big) { sqr(g, q.x, q.y, u * 3, u * 3, '#ff6a85'); sqr(g, q.x, q.y, u, u, '#ffffff') }
      else { const row = EB[Math.floor(q.y / (P * 4)) % 2]; drawSpr(g, row, q.x, q.y, u, { '1': '#ff6a85' }); sqr(g, q.x, q.y, Math.max(1, u * .5), Math.max(1, u * .5), '#ffe0e6', .9); }
    }
    else if (D.eb === 'actual') { if (q.big) { sqr(g, q.x, q.y, u * 3, u * 3, '#ff4d6d'); sqr(g, q.x, q.y, u, u, '#ffd0d8') } else drawSpr(g, EB[Math.floor(q.y / (P * 4)) % 2], q.x, q.y, u, { '1': '#ff4d6d' }); }
    else if (D.eb === 'nucleo') { sqr(g, q.x, q.y, u * 3 + 2, u * 5 + 2, '#1a0008'); sqr(g, q.x, q.y, u * 3, u * 5, pulse ? '#ff2a3a' : '#ff6a78'); sqr(g, q.x, q.y, u, u * 3, '#ffffff'); }
    else if (D.eb === 'orbe') { g.globalAlpha = .85; g.drawImage(glowTex(c), q.x - u * 4.5, q.y - u * 4.5, u * 9, u * 9); g.globalAlpha = 1; g.beginPath(); g.arc(q.x, q.y, u * 1.6, 0, 6.283); g.fillStyle = c; g.fill(); g.lineWidth = 1; g.strokeStyle = '#1a0008'; g.stroke(); g.beginPath(); g.arc(q.x, q.y, u * .75, 0, 6.283); g.fillStyle = '#ffffff'; g.fill(); }
    else if (D.eb === 'rombo') { for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) drawSpr(g, ROMBO, q.x + ox, q.y + oy, u, { '1': '#14000f', '2': '#14000f' }); drawSpr(g, ROMBO, q.x, q.y, u, { '1': pulse ? '#ff2bd6' : '#ff7ae6', '2': '#ffffff' }); }
    else { // flecha: cola roja que se apaga y cabeza blanca, en la dirección de la bala
      const m = Math.hypot(vx, vy) || 1, dx = vx / m, dy = vy / m;
      for (let i = 4; i >= 1; i--) sqr(g, q.x - dx * u * 1.6 * i, q.y - dy * u * 1.6 * i, u * 1.6, u * 1.6, c, 1 - i * .2);
      sqr(g, q.x, q.y, u * 2 + 2, u * 2 + 2, '#1a0008'); sqr(g, q.x, q.y, u * 2, u * 2, '#ffffff'); }
    g.globalAlpha = 1;
  }
  // capa 0: donde se dibujaban antes; capa 1: encima de todos los efectos
  window.labEB = function (layer) {
    const D = LAB.d;
    if (layer === (D.top ? 1 : 0)) for (const q of ebs) if (!q.dead) drawEB(ctx, q, D);
    if (layer === 1 && D.dot && (state === 'play' || state === 'lvup')) {
      const hb = hitbox(), w = P * 9 * hb, h = P * 7 * hb;
      ctx.globalAlpha = .35; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.strokeRect(Math.round(px - w / 2) + .5, Math.round(py - h / 2) + .5, Math.round(w), Math.round(h));
      sqr(ctx, px, py, P * 1.6 + 2, P * 1.6 + 2, '#000000'); sqr(ctx, px, py, P * 1.6, P * 1.6, '#ffffff'); ctx.globalAlpha = 1;
    }
  };
  // barras de vida: siempre, solo un rato tras recibir un golpe, finas o nunca
  window.labHB = function (e) {
    const m = LAB.d.hb;
    if (m === 'siempre') return true;
    if (m === 'nunca') return false;
    if (m === 'golpe') { if (e.flash > 0) e.lhT = tm; return tm - (e.lhT == null ? -9 : e.lhT) < 1.5; }
    const w = EP * 8, x0 = Math.round(e.x - w / 2), y0 = Math.round(e.y + EH() + EP);
    ctx.fillStyle = '#222'; ctx.fillRect(x0, y0, w, 1); ctx.fillStyle = ECOL[e.type]; ctx.fillRect(x0, y0, Math.round(w * Math.max(0, e.hp / e.max)), 1);
    return false;
  };
  // vista previa de la bala elegida sobre un fondo con algo de jaleo
  function preview() {
    const c = document.getElementById('lpv'); if (!c) return;
    const g = c.getContext('2d'), k = c.width / 420; g.setTransform(k, 0, 0, k, 0, 0); g.clearRect(0, 0, 420, 84); g.fillStyle = '#000'; g.fillRect(0, 0, 420, 84);
    const R2 = (i) => (Math.sin(i * 91.7) * .5 + .5);
    for (let i = 0; i < 26; i++) { g.globalAlpha = .55; g.fillStyle = ['#ff8a1f', '#5cff4a', '#fff200', '#ff5c9a', '#8ff0ff'][i % 5]; g.fillRect(R2(i) * 420, R2(i + 40) * 84, 3 + (i % 3), 3 + (i % 3)); }
    g.globalAlpha = .5; g.strokeStyle = '#fff200'; g.lineWidth = 2; g.beginPath(); g.moveTo(10, 20); g.lineTo(140, 50); g.lineTo(260, 18); g.lineTo(410, 60); g.stroke(); g.globalAlpha = 1;
    for (const [x, y] of [[60, 42], [150, 30], [240, 52], [330, 38]]) drawEB(g, { x, y, vx: x > 200 ? 30 : 0, vy: 150 }, LAB.d);
    g.setTransform(1, 0, 0, 1, 0, 0);
  }
  // botón de pausa en la barra de arriba
  const PP0 = placePause;
  placePause = function () {
    if (LAB.d.pause !== 'barra') { if (pz.classList.contains('mini')) { pz.classList.remove('mini'); pzKey = ''; } return PP0(); }
    const show = state === 'play' || state === 'lvup';
    pz.classList.toggle('show', show); pz.classList.add('mini'); pz.style.top = (hudY() - P * 2) + 'px'; pz.style.left = (P * 4 + 48) + 'px';
  };
  // movimiento relativo: la nave se mueve lo mismo que el dedo, desde donde esté
  const cvs = document.getElementById('c'); let rel = null;
  window.addEventListener('pointerdown', e => { if (LAB.d.move !== 'rel' || e.target !== cvs) return; e.stopPropagation(); rel = { x: e.clientX, tx: px }; }, true);
  window.addEventListener('pointermove', e => { if (LAB.d.move !== 'rel' || e.target !== cvs) return; e.stopPropagation(); if (!rel) return; tx = Math.max(P * 6, Math.min(W - P * 6, rel.tx + (e.clientX - rel.x) * 1.15)); }, true);
  window.addEventListener('pointerup', () => { rel = null; }, true);
  window.addEventListener('pointercancel', () => { rel = null; }, true);
  function applyD() { document.body.classList.toggle('labtxt', !!LAB.d.txt); pzKey = ''; }
  applyD();

  openPanel();
})();
