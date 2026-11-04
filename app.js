(() => {
'use strict';

/* ============ CONFIGURACIÓN (lo que hay que completar) ============ */
const WA_NUMERO = '5493624240260'; // WhatsApp de Milena (el de su bio de Instagram), sin + ni espacios

// Reseñas: con url y anonKey vacíos se guardan solo en el navegador (modo prueba).
// Para guardarlas de verdad, completá estos datos de Supabase (ver README).
const RESENAS_BACKEND = { url: '', anonKey: '', tabla: 'resenas' };

/* Avatares: foto = imagen quieta (4:5), video = clip de 6 a 8 s girando la cabeza. */
const AVATARES = [
  { nombre: 'Piel clara, pelo castaño', piel: '#F1D3BE', pelo: '#5A3A29', foto: null, video: null },
  { nombre: 'Piel clara, pelo rubio',   piel: '#F4D9C6', pelo: '#D8B66E', foto: null, video: null },
  { nombre: 'Piel trigueña',            piel: '#D9A77C', pelo: '#3B2619', foto: null, video: null },
  { nombre: 'Piel morena',              piel: '#8D5A3C', pelo: '#1E1410', foto: null, video: null },
  { nombre: 'Pelo rojizo',              piel: '#F2D5C4', pelo: '#A8431F', foto: null, video: null }
];

/* Tipos de novia: propuesta a confirmar con Milena. */
const ESTILOS = [
  { clave: 'natural',   tipo: 'natural',   look: 'Clean look',   persona: 'Sencilla, quiere verse como ella misma.',
    desc: 'Una piel que se ve como la tuya, descansada y luminosa, y un maquillaje liviano que te deja reconocerte en las fotos.' },
  { clave: 'romantica', tipo: 'romántica', look: 'Soft glam',    persona: 'Dulce y clásica.',
    desc: 'Un look suave y delicado, con color que acompaña y una mirada tierna. El clásico de novia, pero a tu medida.' },
  { clave: 'audaz',     tipo: 'audaz',     look: 'Smokey eye',   persona: 'Segura, le gusta destacarse.',
    desc: 'La mirada es la protagonista. Para la novia que quiere que la recuerden y no le teme al impacto.' },
  { clave: 'elegante',  tipo: 'elegante',  look: 'Piel mate',    persona: 'Sofisticada y atemporal.',
    desc: 'Una piel prolija y pareja, de acabado mate y estilo atemporal, que se ve igual de bien dentro de veinte años.' },
  { clave: 'boho',      tipo: 'boho',      look: 'Tonos tierra', persona: 'Libre, casamiento de día o en el campo.',
    desc: 'Colores cálidos y naturales, pensados para la luz del día y los casamientos al aire libre.' }
];

const LOOK_POR_TIPO = Object.fromEntries(ESTILOS.map(e => [e.clave, e.look]));
const OCASION_TXT = { quince: '15 años', egreso: 'Egreso' };

/* Portfolio: reemplazá archivo (por ejemplo 'img/novia-01.jpg'), nombre y anio de cada trabajo real. */
const TRABAJOS = [
  { ocasion: 'novias', tipo: 'natural',   nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'natural',   nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'natural',   nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'romantica', nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'romantica', nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'romantica', nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'audaz',     nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'audaz',     nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'elegante',  nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'elegante',  nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'boho',      nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'novias', tipo: 'boho',      nombre: 'Nombre de la novia', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'quince', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null },
  { ocasion: 'egreso', nombre: 'Nombre', archivo: null, anio: null }
];

/* Retrato de Milena: poné la ruta de la foto, por ejemplo 'img/milena.jpg'. */
const RETRATO = null;

/* Consejos (blog). Textos de ejemplo para que Milena los reemplace. */
const ARTICULOS = [
  { tag: 'Piel', titulo: 'Cómo preparar la piel antes de tu prueba',
    resumen: 'Pocos hábitos simples, bastante antes del día.',
    cuerpo: ['Hidratá la piel todos los días y usá protector solar: una piel cuidada recibe mejor el maquillaje.',
             'En la semana previa evitá productos nuevos y exfoliaciones fuertes, para no arriesgarte a una irritación.',
             'Llegá con la cara limpia y sin maquillaje.'] },
  { tag: 'Cejas', titulo: 'Las cejas, con tiempo',
    resumen: 'Por qué conviene perfilarlas antes del gran día.',
    cuerpo: ['El perfilado enmarca la mirada y cambia cómo se ve el resto del maquillaje.',
             'Conviene hacerlo con unos días de anticipación, así la piel se calma y tenés margen para ajustar.'] },
  { tag: 'Prueba', titulo: 'Qué llevar a tu prueba',
    resumen: 'Para aprovechar cada minuto con Milena.',
    cuerpo: ['Fotos de looks que te gusten, y también de los que no.',
             'Una imagen del vestido, sobre todo del escote, y una idea del peinado y los accesorios.',
             'El horario de la ceremonia, para planificar los tiempos del día.'] }
];

/* ============ UTILIDADES ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const conGsap = !!(window.gsap && window.ScrollTrigger) && !reducido;
if (!conGsap) document.documentElement.classList.add('sin-anim');
if (conGsap) gsap.registerPlugin(ScrollTrigger);

/* Colores para jugar en "Así se arma tu look". */
const PALETAS = {
  piel: [
    { nombre: 'muy clara', color: '#F6DDCB' }, { nombre: 'clara', color: '#F1D3BE' },
    { nombre: 'media', color: '#E0B48F' }, { nombre: 'trigueña', color: '#C9935F' },
    { nombre: 'morena', color: '#8D5A3C' }, { nombre: 'oscura', color: '#5E3A26' }
  ],
  cejas: [
    { nombre: 'negras', color: '#22160F' }, { nombre: 'castaño oscuro', color: '#3B2619' },
    { nombre: 'castañas', color: '#5A3A29' }, { nombre: 'castaño claro', color: '#8A6248' },
    { nombre: 'rubias', color: '#B89263' }, { nombre: 'cobrizas', color: '#8E3B1E' }
  ],
  ojos: [
    { nombre: 'natural', color: '#E3C3AE' }, { nombre: 'rosada', color: '#D9A4A8' },
    { nombre: 'tierra', color: '#A0694B' }, { nombre: 'bronce', color: '#9C6B3C' },
    { nombre: 'ciruela', color: '#6F0936' }, { nombre: 'ahumada', color: '#3E3A40' }
  ],
  mejillas: [
    { nombre: 'durazno', color: '#EBA58E' }, { nombre: 'rosa', color: '#D9A4A8' },
    { nombre: 'terracota', color: '#C47A63' }, { nombre: 'frambuesa', color: '#B83254' }
  ],
  labios: [
    { nombre: 'nude', color: '#C48E80' }, { nombre: 'rosa', color: '#D47784' },
    { nombre: 'frambuesa', color: '#B83254' }, { nombre: 'rojo', color: '#A3172B' },
    { nombre: 'ciruela', color: '#6F0936' }
  ]
};
const PARTES = ['piel', 'cejas', 'ojos', 'mejillas', 'labios'];
const PARTE_TXT = { piel: 'piel', cejas: 'cejas', ojos: 'sombras', mejillas: 'rubor', labios: 'labios' };
const LOOK_INICIAL = { ojos: 0, mejillas: 1, labios: 0 };

const estado = { avatar: AVATARES[0], estilo: null, ocasion: 'novias', tipo: 'todas', look: {}, tocadas: new Set() };

function siluetaSVG(a) {
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="500" fill="#F3EAE5"/>
    <ellipse cx="200" cy="215" rx="98" ry="122" fill="${a.pelo}"/>
    <path d="M70 500c0-95 55-135 130-135s130 40 130 135z" fill="${a.piel}"/>
    <rect x="170" y="300" width="60" height="80" fill="${a.piel}"/>
    <ellipse cx="200" cy="225" rx="70" ry="90" fill="${a.piel}"/>
    <path d="M165 172q5-6 15 0M220 172q5-6 15 0" stroke="${a.pelo}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="170" cy="205" rx="10" ry="5" fill="#fff" opacity=".85"/><ellipse cx="230" cy="205" rx="10" ry="5" fill="#fff" opacity=".85"/>
    <circle cx="170" cy="205" r="3.5" fill="#3a2a22"/><circle cx="230" cy="205" r="3.5" fill="#3a2a22"/>
    <ellipse cx="150" cy="245" rx="16" ry="12" fill="#D9A4A8" opacity=".5"/><ellipse cx="250" cy="245" rx="16" ry="12" fill="#D9A4A8" opacity=".5"/>
    <ellipse cx="200" cy="275" rx="18" ry="7" fill="#B83254" opacity=".7"/>
  </svg>`;
}
function medioHTML(a) {
  if (a.video) return `<div class="medio"><video muted playsinline preload="auto" ${a.foto ? `poster="${a.foto}"` : ''} src="${a.video}"></video></div>`;
  if (a.foto) return `<div class="medio"><img src="${a.foto}" alt="" draggable="false"></div>`;
  return `<div class="medio">${siluetaSVG(a)}</div>`;
}

/* ============ WHATSAPP ============ */
function resumenColores() {
  const elegidas = PARTES.filter(p => estado.tocadas.has(p));
  if (!elegidas.length) return '';
  return ` En la web probé estos colores: ${elegidas.map(p => `${PARTE_TXT[p]}: ${PALETAS[p][estado.look[p]].nombre}`).join(', ')}.`;
}
function mensajeWA() {
  if (!estado.estilo) return `Hola Milena! Vi tu web y quiero pedir una prueba de maquillaje para mi (evento).${resumenColores()}`;
  return `Hola Milena! Hice el test de tu web: me salió el estilo ${estado.estilo.tipo} (${estado.estilo.look}) y me parezco al avatar "${estado.avatar.nombre}".${resumenColores()} Quiero pedir una prueba de maquillaje para mi (evento).`;
}
function actualizarWA() {
  const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(mensajeWA())}`;
  $('#resWA').href = url;
  $('#contactoWA').href = url;
}

/* ============ CINTA ============ */
function armarCinta() {
  const frases = ['Elegí tu mejor versión', 'Tu día, tu estilo', 'Maquillaje de novias', 'Desde 2011'];
  const una = frases.map(f => `<span>${f}</span><i>◆</i>`).join('');
  $('#cintaPista').innerHTML = una.repeat(8);
}

/* ============ AVATAR DE LA PORTADA ============ */
function montarAvatar() {
  const a = estado.avatar;
  const stage = $('#arcoStage');
  stage.innerHTML = medioHTML(a) + ((a.foto || a.video) ? '' : '<p class="etiqueta-ph">Avatar de prueba</p>');
  stage.style.setProperty('--ry', '0deg'); stage.style.setProperty('--rx', '0deg');
}
function movimientoAvatar() {
  const stage = $('#arcoStage');
  let raf = 0, punto = null;
  const aplicar = () => {
    raf = 0;
    const r = stage.getBoundingClientRect();
    const px = clamp((punto.x - r.left) / r.width, 0, 1);
    const py = clamp((punto.y - r.top) / r.height, 0, 1);
    const v = $('video', stage);
    if (v && v.duration) { v.currentTime = px * v.duration; return; }
    if (reducido) return;
    stage.style.setProperty('--lx', (px * 100).toFixed(1) + '%');
    stage.style.setProperty('--ly', (py * 100).toFixed(1) + '%');
  };
  stage.addEventListener('pointermove', e => { punto = { x: e.clientX, y: e.clientY }; if (!raf) raf = requestAnimationFrame(aplicar); });
  stage.addEventListener('pointerleave', () => {
    stage.style.setProperty('--lx', '50%'); stage.style.setProperty('--ly', '35%');
  });
}

/* ============ TU ESTILO ============ */
function renderAvatares() {
  const cont = $('#avatares');
  cont.innerHTML = '';
  AVATARES.forEach(a => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ficha';
    b.setAttribute('aria-pressed', String(a === estado.avatar));
    b.innerHTML = `<span class="ficha__disco" style="--pelo:${a.pelo};--piel:${a.piel}"></span><span class="ficha__nombre">${a.nombre}</span>`;
    b.addEventListener('click', () => {
      estado.avatar = a;
      $$('.ficha', cont).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      montarAvatar(); montarArmado(); actualizarWA();
    });
    cont.append(b);
  });
}
function renderEstilos() {
  const cont = $('#estilos');
  cont.innerHTML = '';
  ESTILOS.forEach(e => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'fila';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span class="fila__look">${e.look}</span><span class="fila__persona">${e.persona}</span>`;
    b.addEventListener('click', () => {
      estado.estilo = e;
      $$('.fila', cont).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      mostrarResultado(e);
    });
    cont.append(b);
  });
}
function mostrarResultado(e) {
  const caja = $('#resultado');
  caja.hidden = false;
  const look = $('#resLook'), pincel = $('#resPincel');
  look.textContent = e.look;
  $('#resTipo').textContent = `Novia ${e.tipo}`;
  $('#resDesc').textContent = e.desc;
  actualizarWA();
  if (conGsap) {
    gsap.fromTo(look, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power2.out' });
    gsap.fromTo(pincel, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .7, delay: .7, ease: 'power1.out' });
  }
  caja.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'nearest' });
}

/* ============ ASÍ SE ARMA TU LOOK ============ */
// La cara queda quieta; lo que cambia son los colores que elige cada novia.
function caraSVG() {
  return `<svg class="cara-svg" viewBox="0 0 400 500" role="img" aria-label="Ilustración de una cara con los colores que elegiste">
    <rect width="400" height="500" fill="#F3EAE5"/>
    <ellipse cx="200" cy="215" rx="98" ry="122" style="fill:var(--c-pelo)"/>
    <g style="fill:var(--c-piel)">
      <path d="M70 500c0-95 55-135 130-135s130 40 130 135z"/>
      <rect x="170" y="300" width="60" height="80"/>
      <ellipse cx="200" cy="225" rx="70" ry="90"/>
    </g>
    <g style="fill:var(--c-ojos)" opacity=".8">
      <ellipse cx="170" cy="199" rx="19" ry="10"/><ellipse cx="230" cy="199" rx="19" ry="10"/>
    </g>
    <ellipse cx="170" cy="205" rx="10" ry="5" fill="#fff"/><ellipse cx="230" cy="205" rx="10" ry="5" fill="#fff"/>
    <circle cx="170" cy="205" r="3.5" fill="#3a2a22"/><circle cx="230" cy="205" r="3.5" fill="#3a2a22"/>
    <path d="M152 172q16-10 34-2M214 170q18-8 34 2" style="stroke:var(--c-cejas)" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g style="fill:var(--c-mejillas)" opacity=".55">
      <ellipse cx="150" cy="245" rx="17" ry="12"/><ellipse cx="250" cy="245" rx="17" ry="12"/>
    </g>
    <path d="M178 272q11-8 22-2q11-6 22 2q-11 13-22 13q-11 0-22-13z" style="fill:var(--c-labios)"/>
  </svg>`;
}
function cercano(lista, hex) {
  const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const [r, g, b] = rgb(hex);
  let mejor = 0, dist = Infinity;
  lista.forEach((t, i) => {
    const [r2, g2, b2] = rgb(t.color);
    const d = (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2;
    if (d < dist) { dist = d; mejor = i; }
  });
  return mejor;
}
// Piel y cejas arrancan parecidas al avatar elegido; el maquillaje, en tonos suaves.
function lookDelAvatar() {
  const a = estado.avatar;
  if (!estado.tocadas.has('piel')) estado.look.piel = cercano(PALETAS.piel, a.piel);
  if (!estado.tocadas.has('cejas')) estado.look.cejas = cercano(PALETAS.cejas, a.pelo);
  Object.entries(LOOK_INICIAL).forEach(([p, i]) => { if (!estado.tocadas.has(p)) estado.look[p] = i; });
}
function aplicarLook() {
  const cara = $('#cara');
  cara.style.setProperty('--c-pelo', estado.avatar.pelo);
  PARTES.forEach(p => {
    const t = PALETAS[p][estado.look[p]];
    cara.style.setProperty(`--c-${p}`, t.color);
    const li = $(`#armadoLista li[data-parte="${p}"]`);
    $('.armado__elegido', li).textContent = t.nombre;
    $$('.tono', li).forEach((b, i) => b.setAttribute('aria-pressed', String(i === estado.look[p])));
  });
  $('#armadoReset').hidden = !estado.tocadas.size;
}
function montarArmado() {
  lookDelAvatar();
  aplicarLook();
}
function iniciarArmado() {
  $('#cara').innerHTML = caraSVG();
  PARTES.forEach(p => {
    const li = $(`#armadoLista li[data-parte="${p}"]`);
    const fila = document.createElement('div');
    fila.className = 'tonos';
    fila.setAttribute('role', 'group');
    fila.setAttribute('aria-label', `Color de ${PARTE_TXT[p]}`);
    PALETAS[p].forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tono';
      b.title = t.nombre;
      b.setAttribute('aria-label', `${PARTE_TXT[p]} ${t.nombre}`);
      b.style.setProperty('--c', t.color);
      b.innerHTML = '<span></span>';
      b.addEventListener('click', () => {
        estado.look[p] = i;
        estado.tocadas.add(p);
        aplicarLook(); actualizarWA();
      });
      fila.append(b);
    });
    li.append(fila);
  });
  $('#armadoReset').addEventListener('click', () => {
    estado.tocadas.clear();
    montarArmado(); actualizarWA();
  });
  montarArmado();
}

/* ============ PORTFOLIO ============ */
function renderGaleria() {
  const g = $('#galeria');
  const lista = TRABAJOS.filter(t => t.ocasion === estado.ocasion && (estado.ocasion !== 'novias' || estado.tipo === 'todas' || t.tipo === estado.tipo));
  g.innerHTML = '';
  lista.forEach(t => {
    const f = document.createElement('figure');
    f.className = 'marco';
    const caja = document.createElement('div'); caja.className = 'marco__caja';
    const img = document.createElement('div'); img.className = 'marco__img';
    if (t.archivo) { const i = document.createElement('img'); i.src = t.archivo; i.alt = `Maquillaje de ${t.nombre}`; i.loading = 'lazy'; img.append(i); }
    else { const s = document.createElement('span'); s.textContent = 'foto de Milena'; img.append(s); }
    caja.append(img);
    const cap = document.createElement('figcaption');
    const n = document.createElement('strong'); n.textContent = t.nombre;
    const l = document.createElement('span');
    const etiqueta = t.ocasion === 'novias' ? (LOOK_POR_TIPO[t.tipo] || '') : OCASION_TXT[t.ocasion];
    l.textContent = etiqueta + (t.anio ? `, ${t.anio}` : '');
    cap.append(n, l);
    f.append(caja, cap);
    g.append(f);
  });
}
function iniciarPortfolio() {
  const tabs = $$('#ocasiones button'), filtros = $$('#filtro button');
  tabs.forEach(b => b.addEventListener('click', () => {
    estado.ocasion = b.dataset.ocasion;
    tabs.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('#filtro').hidden = estado.ocasion !== 'novias';
    renderGaleria();
  }));
  filtros.forEach(b => b.addEventListener('click', () => fijarTipo(b.dataset.tipo)));
  $('#resVer').addEventListener('click', e => {
    e.preventDefault();
    estado.ocasion = 'novias';
    tabs.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.ocasion === 'novias')));
    $('#filtro').hidden = false;
    fijarTipo(estado.estilo ? estado.estilo.clave : 'todas');
    $('#portfolio').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
  });
  function fijarTipo(t) {
    estado.tipo = t;
    filtros.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.tipo === t)));
    renderGaleria();
  }
  renderGaleria();
}

/* ============ CONSEJOS ============ */
function renderNotas() {
  const cont = $('#notas'), filtro = $('#filtroNotas');
  const temas = ['Todos', ...new Set(ARTICULOS.map(a => a.tag))];
  temas.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = t; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', () => {
      $$('button', filtro).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $$('.nota', cont).forEach(n => { n.hidden = i !== 0 && n.dataset.tag !== t; });
    });
    filtro.append(b);
  });
  filtro.hidden = temas.length <= 2;
  ARTICULOS.forEach((a, i) => {
    const art = document.createElement('article');
    art.className = 'nota'; art.dataset.reveal = ''; art.dataset.tag = a.tag;
    const tag = document.createElement('p'); tag.className = 'nota__tag'; tag.textContent = a.tag;
    const h = document.createElement('h3'); h.textContent = a.titulo;
    const r = document.createElement('p'); r.textContent = a.resumen;
    const cuerpo = document.createElement('div'); cuerpo.className = 'nota__cuerpo'; cuerpo.hidden = true; cuerpo.id = `nota-${i}`;
    a.cuerpo.forEach(t => { const p = document.createElement('p'); p.textContent = t; cuerpo.append(p); });
    const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Leer'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', cuerpo.id);
    b.addEventListener('click', () => {
      const abierto = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!abierto));
      cuerpo.hidden = abierto;
      b.textContent = abierto ? 'Leer' : 'Cerrar';
    });
    art.append(tag, h, r, cuerpo, b);
    cont.append(art);
  });
}

/* ============ RETRATO ============ */
function montarRetrato() {
  if (!RETRATO) return;
  const r = $('#retrato');
  r.innerHTML = '';
  const i = document.createElement('img'); i.src = RETRATO; i.alt = 'Milena Gauchat'; r.append(i);
}

/* ============ RESEÑAS ============ */
const CLAVE_LOCAL = 'mg_resenas';
const remoto = () => !!(RESENAS_BACKEND.url && RESENAS_BACKEND.anonKey);
const cabeceras = () => ({ apikey: RESENAS_BACKEND.anonKey, Authorization: `Bearer ${RESENAS_BACKEND.anonKey}`, 'Content-Type': 'application/json' });

async function leerResenas() {
  if (remoto()) {
    const { url, tabla } = RESENAS_BACKEND;
    const r = await fetch(`${url}/rest/v1/${tabla}?select=nombre,estrellas,comentario,creada&aprobada=eq.true&order=creada.desc&limit=50`, { headers: cabeceras() });
    if (!r.ok) throw new Error('No se pudieron leer las reseñas');
    return r.json();
  }
  try { return JSON.parse(localStorage.getItem(CLAVE_LOCAL) || '[]'); } catch { return []; }
}
async function guardarResena(d) {
  if (remoto()) {
    const { url, tabla } = RESENAS_BACKEND;
    const r = await fetch(`${url}/rest/v1/${tabla}`, { method: 'POST', headers: { ...cabeceras(), Prefer: 'return=minimal' }, body: JSON.stringify(d) });
    if (!r.ok) throw new Error('No se pudo enviar');
    return;
  }
  const lista = await leerResenas();
  lista.unshift({ ...d, creada: new Date().toISOString() });
  try { localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista.slice(0, 50))); } catch {}
}
async function pintarResenas() {
  const cont = $('#listaResenas'), prom = $('#promedio');
  let lista = [];
  try { lista = await leerResenas(); } catch { cont.innerHTML = '<p class="vacio">No pudimos cargar las reseñas ahora.</p>'; return; }
  cont.innerHTML = '';
  if (!lista.length) {
    prom.textContent = '';
    cont.innerHTML = '<p class="vacio">Todavía no hay reseñas. Si Milena te maquilló, contanos cómo fue.</p>';
    return;
  }
  const media = lista.reduce((s, x) => s + Number(x.estrellas), 0) / lista.length;
  prom.textContent = `${media.toFixed(1).replace('.', ',')} de 5 · ${lista.length} ${lista.length === 1 ? 'reseña' : 'reseñas'}`;
  lista.forEach(x => {
    const d = document.createElement('div'); d.className = 'resena';
    const e = document.createElement('div'); e.className = 'resena__estrellas'; e.setAttribute('aria-label', `${x.estrellas} de 5 estrellas`);
    e.textContent = '★'.repeat(x.estrellas) + '☆'.repeat(5 - x.estrellas);
    const n = document.createElement('p'); n.className = 'resena__nombre'; n.textContent = x.nombre;
    const t = document.createElement('p'); t.className = 'resena__texto'; t.textContent = x.comentario;
    d.append(e, n, t); cont.append(d);
  });
}
function iniciarResenas() {
  const form = $('#formResena'), msg = $('#formMsg');
  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    const nombre = $('#resNombre').value.trim();
    const comentario = $('#resTexto').value.trim();
    const sel = form.querySelector('input[name="estrellas"]:checked');
    msg.classList.add('error');
    if (!nombre) { msg.textContent = 'Escribí tu nombre.'; $('#resNombre').focus(); return; }
    if (!sel) { msg.textContent = 'Elegí cuántas estrellas le das.'; return; }
    if (!comentario) { msg.textContent = 'Contanos cómo fue tu experiencia.'; $('#resTexto').focus(); return; }
    try {
      await guardarResena({ nombre: nombre.slice(0, 60), estrellas: Number(sel.value), comentario: comentario.slice(0, 500) });
      form.reset();
      msg.classList.remove('error');
      msg.textContent = remoto() ? 'Gracias. Tu reseña se publica cuando Milena la apruebe.' : 'Gracias por tu reseña.';
      pintarResenas();
    } catch { msg.textContent = 'No pudimos enviar tu reseña. Probá de nuevo en un rato.'; }
  });
  pintarResenas();
}

/* ============ DETALLES DE INTERFAZ ============ */
function progresoLectura() {
  const barra = $('#progreso');
  const act = () => { const h = document.documentElement.scrollHeight - innerHeight; barra.style.transform = `scaleX(${h > 0 ? clamp(scrollY / h, 0, 1) : 0})`; };
  addEventListener('scroll', act, { passive: true }); addEventListener('resize', act); act();
}
function menuActivo() {
  const enlaces = $$('.menu a');
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    enlaces.forEach(a => a.classList.toggle('activo', a.dataset.sec === en.target.id));
    const menu = $('.menu'), act = $('.menu a.activo');
    if (act && menu.scrollWidth > menu.clientWidth) menu.scrollTo({ left: act.offsetLeft - menu.clientWidth / 2 + act.offsetWidth / 2, behavior: reducido ? 'auto' : 'smooth' });
  }), { rootMargin: '-45% 0px -50% 0px' });
  enlaces.forEach(a => { const s = document.getElementById(a.dataset.sec); if (s) io.observe(s); });
}
function revelado() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visto')); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const i = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal')).indexOf(el);
    el.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`);
    el.classList.add('visto');
    io.unobserve(el);
  }), { threshold: .12 });
  els.forEach(e => io.observe(e));
}
function cursorAro() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const c = $('#cursor'); c.hidden = false;
  let x = -100, y = -100, cx = -100, cy = -100;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
  const k = reducido ? 1 : .2;
  (function bucle() { cx += (x - cx) * k; cy += (y - cy) * k; c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(bucle); })();
  document.addEventListener('pointerover', e => c.classList.toggle('grande', !!e.target.closest('a,button,label,input,textarea')));
}
function botonesMagneticos() {
  if (reducido || !matchMedia('(pointer: fine)').matches) return;
  document.addEventListener('pointermove', e => {
    $$('.btn').forEach(b => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const cerca = Math.abs(dx) < r.width / 2 + 24 && Math.abs(dy) < r.height / 2 + 24;
      b.style.transform = cerca ? `translate(${clamp(dx * .12, -6, 6)}px,${clamp(dy * .2, -6, 6)}px)` : '';
    });
  });
}
function introCarga() {
  if (!conGsap) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('#cabecera', { yPercent: -100, duration: .7 })
    .from('.hero-word', { yPercent: 115, duration: .8, stagger: .09 }, '-=.3')
    .from('.hero .eyebrow, .hero__bajada, .hero .btn', { opacity: 0, y: 14, duration: .6, stagger: .1 }, '-=.5')
    .fromTo('.arco-forma', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power2.inOut' }, .2);
}

/* ============ ARRANQUE ============ */
armarCinta();
montarAvatar();
movimientoAvatar();
renderAvatares();
renderEstilos();
iniciarPortfolio();
renderNotas();
montarRetrato();
iniciarResenas();
actualizarWA();
progresoLectura();
menuActivo();
revelado();
cursorAro();
botonesMagneticos();
iniciarArmado();
introCarga();
})();
