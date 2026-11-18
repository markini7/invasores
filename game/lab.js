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
  };
  try { const sv = JSON.parse(localStorage.getItem(LS) || 'null'); if (sv) for (const k of ['slots', 'min', 'fixed', 'rate', 'speed', 'inv', 'ebs']) if (sv[k] != null) LAB[k] = sv[k]; } catch (e) {}
  const save = () => { try { localStorage.setItem(LS, JSON.stringify({ slots: LAB.slots, min: LAB.min, fixed: LAB.fixed, rate: LAB.rate, speed: LAB.speed, inv: LAB.inv, ebs: LAB.ebs })) } catch (e) {} };

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
    if (LAB.on) { pend = 0; xp = 0; TM.rb = 1e9; fuseReady = false; if (!LAB.ebs) ebs = []; }
    U0(dt);
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

  openPanel();
})();
