/* =========================================================
   Lieke Gruiters — portfolio scripts
   - Matter.js fysica-speeltuin in de hero
   - Mobiel menu
   - Licht/donker thema toggle
   ========================================================= */

/* ---------- Mobiel menu ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu?.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

/* ---------- Thema toggle (licht / donker) ---------- */
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('lg-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }
  localStorage.setItem('lg-theme', next);
});

/* ---------- Fysica-speeltuin (hero) ---------- */
(function initPhysics() {
  const stage = document.getElementById('physics-stage');
  if (!stage || typeof Matter === 'undefined') return;

  const { Engine, Runner, World, Bodies, Body, Common, Events } = Matter;
  /* Geen Render/Mouse/MouseConstraint meer: de badges zijn gewone DOM-
     elementen (voor scherpe typografie) en zonder Matter's eigen
     mouse-module blijft het wielscrollen van de pagina altijd vrij,
     ook wanneer de cursor boven de hero hangt. */

  const engine = Engine.create();
  engine.gravity.y = 0.9; /* echte zwaartekracht: de badges vallen naar beneden */

  const width = stage.clientWidth;
  const height = stage.clientHeight;

  /* Onzichtbare wanden rond het paneel. De bodem staat precies op de
     onderrand, zodat de badges daar op een hoopje vallen en blijven
     liggen. Geen plafond meer: er is niets meer dat de badges omhoog
     duwt (geen cursor-effect), dus ze mogen gewoon van bovenaf, buiten
     beeld, ongehinderd naar binnen vallen. */
  const wallOpts = { isStatic: true, render: { visible: false } };
  const ground = Bodies.rectangle(width / 2, height + 40, width * 2, 80, wallOpts);
  const leftWall = Bodies.rectangle(-40, height / 2, 80, height * 4, wallOpts);
  const rightWall = Bodies.rectangle(width + 40, height / 2, 80, height * 4, wallOpts);
  World.add(engine.world, [ground, leftWall, rightWall]);

  /* De vallende "knoppen" linken nu door naar de rest van de site:
     portfolio, over mij, contact, het kinderboek (Mila's Monsters)
     en de vier andere projecten. */
  const navPills = [
    { label: 'Portfolio', href: 'index.html#projecten' },
    { label: 'Over mij', href: 'over-mij.html' },
    { label: 'Contact', href: 'index.html#footer' },
    { label: 'Kinderboek', href: 'project2.html' },
    { label: 'Peeldemoontjes', href: 'project1.html' },
    { label: 'Joordens', href: 'project3.html' },
    { label: 'één klik', href: 'project4.html' },
    { label: 'Fleuren', href: 'project5.html' },
  ];
  const bodies = [];

  /* Maak een tijdelijk DOM-element om de echte breedte van een pill te meten */
  function measurePill(text) {
    const probe = document.createElement('span');
    probe.className = 'p-pill';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.whiteSpace = 'nowrap';
    probe.textContent = text;
    stage.appendChild(probe);
    const w = probe.offsetWidth;
    const h = probe.offsetHeight;
    stage.removeChild(probe);
    return { w, h };
  }

  const isMobile = width < 700;
  const scale = isMobile ? 0.82 : 1;

  navPills.forEach(({ label, href }, i) => {
    const { w, h } = measurePill(label);
    const x = Common.random(w / 2 + 20, width - w / 2 - 20);
    const y = Common.random(-260, -20) - i * 70;
    const angle = Common.random(-0.35, 0.35);

    const body = Bodies.rectangle(x, y, w, h, {
      angle,
      restitution: 0.5,
      friction: 0.4,
      frictionAir: 0.02,
      chamfer: { radius: h / 2 },
    });

    const el = document.createElement('div');
    el.className = 'p-body p-body-link';
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.innerHTML = `<a class="p-pill" href="${href}" draggable="false">${label}</a>`;

    stage.appendChild(el);
    bodies.push({ body, el, w, h });
    World.add(engine.world, body);
  });

  /* Iconen + rondje met foto: vallen mee met de badges */
  const icons = {
    computer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>`,
    pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    cursor: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 3l8 18 3-7 7-3z"/></svg>`,
  };

  const extraDefs = [
    { kind: 'icon', icon: icons.computer, size: 78 * scale },
    { kind: 'icon', icon: icons.pencil, size: 68 * scale },
    { kind: 'icon', icon: icons.cursor, size: 60 * scale },
    { kind: 'photo', size: 148 * scale },
  ];

  extraDefs.forEach((def, i) => {
    const x = Common.random(def.size, width - def.size);
    const y = Common.random(-260, -20) - (navPills.length + i) * 70;
    const body = Bodies.circle(x, y, def.size / 2, {
      restitution: 0.5,
      friction: 0.3,
      frictionAir: 0.02,
    });

    const el = document.createElement('div');
    el.className = 'p-body';
    el.style.width = def.size + 'px';
    el.style.height = def.size + 'px';
    el.innerHTML = def.kind === 'photo'
      ? `<span class="p-circle p-photo"><img src="img/selfie.png" alt="Lieke Gruiters"></span>`
      : `<span class="p-icon-loose">${def.icon}</span>`;
    const inner = el.querySelector('.p-circle, .p-icon-loose');
    inner.style.width = def.size + 'px';
    inner.style.height = def.size + 'px';

    stage.appendChild(el);
    bodies.push({ body, el, w: def.size, h: def.size });
    World.add(engine.world, body);
  });

  /* Geen cursor-effect meer: de badges vallen gewoon naar beneden
     door de zwaartekracht. Een heel klein beetje willekeurige jitter
     zorgt ervoor dat de hoop onderin toch nog zachtjes blijft
     "leven" in plaats van helemaal stil te vallen. */
  const DRIFT_STRENGTH = 0.00001;

  Events.on(engine, 'beforeUpdate', () => {
    bodies.forEach(({ body }) => {
      Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * DRIFT_STRENGTH * body.mass,
        y: (Math.random() - 0.5) * DRIFT_STRENGTH * body.mass,
      });
    });
  });

  const runner = Runner.create();
  Runner.run(runner, engine);

  (function update() {
    bodies.forEach(({ body, el, w, h }) => {
      el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
    });
    requestAnimationFrame(update);
  })();

  window.addEventListener('resize', () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    Body.setPosition(ground, { x: w / 2, y: h + 40 });
    Body.setPosition(leftWall, { x: -40, y: h / 2 });
    Body.setPosition(rightWall, { x: w + 40, y: h / 2 });
  });
})();
