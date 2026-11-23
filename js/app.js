/* ROMARES ACADEMY 360° — motor da apresentação */
(() => {
  const stage = document.getElementById('stage');
  const slides = [...document.querySelectorAll('.slide')];
  const eu = document.getElementById('eu');
  const euImg = eu.querySelector('img');
  const bubble = eu.querySelector('.bubble');
  const chrome = document.getElementById('chrome');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  const pad = (n) => String(n).padStart(2, '0');
  let cur = -1, euHidden = false, typeTimer = null, euTimer = null;

  /* Pré-carrega as poses do apresentador */
  [1, 2, 3, 4].forEach((n) => { const i = new Image(); i.src = `assets/eu_${n}.jpg`; });

  /* Escala o palco 1920×1080 para caber na janela */
  const fit = () => stage.style.setProperty('--s', Math.min(innerWidth / 1920, innerHeight / 1080));
  addEventListener('resize', fit); fit();

  /* Ordem das animações de entrada: cada .rv recebe um índice dentro do slide */
  slides.forEach((s) => s.querySelectorAll('.rv').forEach((el, k) => { if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', k); }));

  /* ---------- Módulos (slide 4) ---------- */
  const MOD = [
    ['i-login', 'Integração', 'ENTRAR', 'Todo colaborador entra na empresa entendendo nossos processos, padrões e a forma como trabalhamos.', 'disp', 'Trilha institucional obrigatória: enquanto não for concluída, os demais cursos ficam bloqueados.'],
    ['i-route', 'Trilhas de aprendizagem', 'APRENDER', 'Organiza o desenvolvimento de cada profissional, do básico ao avançado, conforme a sua função.', 'disp', 'Trilha institucional para todos e trilha do cargo: o RH liga o curso aos cargos do ERP e cada colaborador vê só a trilha do seu cargo.'],
    ['i-book', 'Cursos e treinamentos', 'APRENDER', 'Centraliza o conhecimento e garante que todos recebam orientações padronizadas.', 'disp', 'Catálogo por área: Portaria, Atendimento, Limpeza, Segurança, Zeladoria e Institucional.'],
    ['i-zap', 'Microlearning', 'APRENDER', 'Treinamentos rápidos e objetivos, porque nem sempre o colaborador tem tempo para um curso longo.', 'disp', 'Cursos de até 5 minutos aparecem como microaprendizagem.'],
    ['i-target', 'Missões e simuladores', 'APRENDER', 'Situações reais do dia a dia para ver como o profissional reagiria antes de enfrentá-las na operação.', 'disp', 'Missões com etapas de simulação e cenários do dia a dia.'],
    ['i-clip', 'Avaliações', 'COMPROVAR', 'Não basta concluir o curso: é preciso identificar se a pessoa realmente aprendeu.', 'disp', '2 tentativas por pergunta e nota real registrada. O vídeo precisa ser assistido até o mínimo.'],
    ['i-award', 'Certificações e reciclagem', 'COMPROVAR', 'Comprova as capacitações realizadas e garante que o conhecimento seja atualizado periodicamente.', 'disp', 'Certificado em PDF com validade. Reciclagem com prazo em meses: vencido, o curso volta a pendente e o colaborador é avisado. Verificação por QR: próxima etapa.'],
    ['i-trophy', 'Gamificação, XP e ranking', 'ENGAJAR', 'Faz o aprendizado ser interessante e dá ao colaborador vontade de evoluir.', 'disp', 'XP, níveis, conquistas e ranking mensal, geral e por equipe.'],
    ['i-passport', 'Passaporte do colaborador', 'COMPROVAR', 'Cada profissional enxerga a sua evolução, seus certificados, competências e conquistas.', 'disp', 'Passaporte com radar: competência atual comparada ao requisito do cargo.'],
    ['i-grid', 'Matriz de competências', 'GERIR', 'O ponto mais estratégico: onde cada um é forte, onde precisa melhorar e se está pronto para a função.', 'disp', 'Notas avaliadas pelo RH, comparadas à meta de cada cargo, com histórico.'],
    ['i-qr', 'QR Code e base de conhecimento', 'APOIAR', 'Procedimentos e orientações acessíveis diretamente no posto de trabalho.', 'evol', 'Pendente: acesso aos procedimentos por QR Code no posto ainda não foi implementado.'],
    ['i-chat', 'Tutor virtual Rô', 'APOIAR', 'Apoio para tirar dúvidas e orientar com base nos procedimentos da empresa.', 'evol', 'Pendente: a Rô está desativada no momento e volta quando estiver pronta para uso.'],
    ['i-pen', 'Course Studio', 'GERIR', 'O próprio RH cria e atualiza treinamentos, sem depender sempre da TI.', 'disp', 'Editor com rascunho, vídeo, perguntas, cargos da trilha, prazo de reciclagem, publicação e arquivamento.'],
    ['i-chart', 'Painéis RH, supervisão e diretoria', 'GERIR', 'Transforma as informações em indicadores para acompanhar equipes e decidir com segurança.', 'disp', 'Inteligência de RH por posto, matriz, visão executiva consolidada e exportação de dados.'],
  ];
  const ST = { disp: 'EM FUNCIONAMENTO', parc: 'PARCIAL', evol: 'PENDENTE' };
  const orbit = document.getElementById('orbit');
  const detail = document.getElementById('detail');
  const ico = (id) => `<svg class="i"><use href="#${id}"/></svg>`;
  const nodes = MOD.map((m, k) => {
    const a = (k / MOD.length) * Math.PI * 2 - Math.PI / 2;
    const b = document.createElement('button');
    b.className = 'node'; b.style.setProperty('--k', k);
    b.style.left = 430 + Math.cos(a) * 320 + 'px';
    b.style.top = 380 + Math.sin(a) * 320 + 'px';
    b.innerHTML = `${ico(m[0])}<span class="num">${k + 1}</span><span class="st ${m[4]}"></span>`;
    b.setAttribute('aria-label', m[1]);
    b.addEventListener('mouseenter', () => { pick(k); stopAuto(); });
    b.addEventListener('click', () => { pick(k); stopAuto(); });
    orbit.appendChild(b);
    return b;
  });
  let sel = -1, autoT = null;
  function pick(k) {
    if (k === sel) return; sel = k;
    nodes.forEach((n, j) => n.classList.toggle('on', j === k));
    const m = MOD[k];
    detail.innerHTML = `<div class="swap">
      <div class="head"><div class="ico">${ico(m[0])}</div><div><div class="grp">MÓDULO ${pad(k + 1)} · ${m[2]}</div><h3>${m[1]}</h3></div></div>
      <p class="why">${m[3]}</p>
      <div class="now"><span class="status ${m[4]}">${ST[m[4]]}</span><p>${m[5]}</p></div></div>`;
  }
  const startAuto = () => { stopAuto(); autoT = setInterval(() => pick((sel + 1) % MOD.length), 4200); };
  const stopAuto = () => { clearInterval(autoT); autoT = null; };

  /* ---------- Efeitos ao entrar em cada slide ---------- */
  function countUp(el) {
    const to = +el.dataset.to, t0 = performance.now(), dur = 1600;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    el.textContent = '0'; setTimeout(() => requestAnimationFrame(step), 500);
  }
  function enter(s) {
    s.querySelectorAll('.count').forEach(countUp);
    // rosca "onde estamos"
    const C = 2 * Math.PI * 76;
    s.querySelectorAll('.donut .seg').forEach((c) => {
      c.style.strokeDasharray = `0 ${C}`; c.style.strokeDashoffset = 0;
      setTimeout(() => {
        const len = (+c.dataset.v / 14) * C - 3;
        c.style.strokeDasharray = `${len} ${C}`;
        c.style.strokeDashoffset = -((+c.dataset.o / 14) * C);
      }, 500);
    });
    // anéis do síndico
    const R = 2 * Math.PI * 58;
    s.querySelectorAll('.ringc .fg').forEach((c) => { c.style.strokeDasharray = `0 ${R}`; setTimeout(() => { c.style.strokeDasharray = `${(+c.dataset.p / 100) * R} ${R}`; }, 60); });
    // barras de meta por cargo
    s.querySelectorAll('.mbar i').forEach((i) => { i.style.width = '0'; setTimeout(() => { i.style.width = i.dataset.w + '%'; }, 60); });
    if (s.id === 's-eco') { sel = -1; pick(0); startAuto(); } else stopAuto();
  }

  /* ---------- Apresentador ---------- */
  function type(text) {
    clearInterval(typeTimer); bubble.innerHTML = '';
    if (!text) return;
    let k = 0; const caret = '<span class="caret"></span>';
    typeTimer = setInterval(() => { k++; bubble.innerHTML = text.slice(0, k) + caret; if (k >= text.length) { clearInterval(typeTimer); setTimeout(() => { bubble.innerHTML = text; }, 1200); } }, 28);
  }
  function presenter(s) {
    clearTimeout(euTimer);
    const pose = s.dataset.eu;
    eu.classList.add('hide'); clearInterval(typeTimer);
    if (!pose || euHidden) return;
    euTimer = setTimeout(() => {
      euImg.src = `assets/eu_${pose}.jpg`;
      eu.dataset.at = s.dataset.at || 'side';
      bubble.innerHTML = '';
      eu.classList.remove('hide');
      euTimer = setTimeout(() => type(s.dataset.fala || ''), 650);
    }, 420);
  }

  /* ---------- Navegação ---------- */
  function go(n, push = true) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === cur) return;
    if (cur >= 0) slides[cur].classList.remove('active');
    cur = n;
    const s = slides[cur];
    void s.offsetWidth; // reinicia as animações ao voltar ao slide
    s.classList.add('active');
    enter(s); presenter(s);
    chrome.classList.toggle('on-light', s.classList.contains('light'));
    counter.innerHTML = `<b>${pad(cur + 1)}</b> / ${pad(slides.length)}`;
    progress.style.width = ((cur + 1) / slides.length) * 100 + '%';
    if (push) history.replaceState(null, '', '#' + (cur + 1));
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  addEventListener('keydown', (e) => {
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'f' || k === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }
    else if (k === 'p' || k === 'P') { euHidden = !euHidden; presenter(slides[cur]); }
    else if (k === '?' || k === 'h' || k === 'H') document.getElementById('help').classList.toggle('on');
  });
  // clique numa pergunta do divisor leva direto ao slide dela
  const firstQ = slides.findIndex((s) => s.querySelector('.qnum'));
  document.querySelectorAll('.qchip').forEach((c, k) => c.addEventListener('click', () => go(firstQ + k)));
  // clique no palco avança (exceto em botões e no slide interativo)
  stage.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .qchip, #s-eco')) return;
    e.clientX > innerWidth * 0.25 ? next() : prev();
  });
  // toque: deslizar
  let tx = null;
  addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) (dx < 0 ? next : prev)(); tx = null; });

  /* ---------- Fundo: partículas douradas e linhas de conexão ---------- */
  const cv = document.getElementById('fx'), cx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = Array.from({ length: 70 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 2 + .6 }));
  function draw() {
    cx.clearRect(0, 0, 1920, 1080);
    for (const p of P) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 1920) p.vx *= -1;
      if (p.y < 0 || p.y > 1080) p.vy *= -1;
    }
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const a = P[i], b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 170) { cx.strokeStyle = `rgba(217,183,116,${(1 - d / 170) * .12})`; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
    }
    for (const p of P) { cx.fillStyle = 'rgba(217,183,116,.55)'; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fill(); }
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();

  go((parseInt(location.hash.slice(1), 10) || 1) - 1, false);
})();
