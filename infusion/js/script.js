/* ============================================================
   Infusión – Código Descafeinado | script.js
   Funcionalidades: navbar, menú hamburguesa, filtros catálogo,
   formulario validado, animaciones scroll, back-to-top, toast
   ============================================================ */

'use strict';

/* ── Datos del catálogo ─────────────────────────────────────── */
const productos = [
  {
    id: 1,
    nombre: "Espresso Debug",
    categoria: "cafe",
    precio: 4500,
    descripcion: "Doble shot de espresso de origen único. Concentrado y limpio, diseñado para cuando el código no compila.",
    ingredientes: ["Café single origin", "Agua filtrada"],
    emoji: "☕",
    tag: "Café"
  },
  {
    id: 2,
    nombre: "Cappuccino Full Stack",
    categoria: "cafe",
    precio: 6500,
    descripcion: "Espresso balanceado con leche vaporizada y espuma sedosa. El equilibrio perfecto entre capas, como una buena arquitectura.",
    ingredientes: ["Espresso doble", "Leche entera", "Espuma artesanal"],
    emoji: "☕",
    tag: "Café"
  },
  {
    id: 3,
    nombre: "Latte Async",
    categoria: "cafe",
    precio: 6800,
    descripcion: "Espresso suave con leche al vapor y arte latte. Fluido y sin errores, como el código asíncrono bien escrito.",
    ingredientes: ["Espresso", "Leche entera", "Arte latte"],
    emoji: "☕",
    tag: "Café"
  },
  {
    id: 4,
    nombre: "Brownie 404",
    categoria: "snack",
    precio: 5200,
    descripcion: "Denso, húmedo y con chips de chocolate. No hay error aquí: solo sabor intenso que no se encuentra en ningún otro lugar.",
    ingredientes: ["Chocolate negro 70%", "Mantequilla", "Nueces", "Vainilla"],
    emoji: "🍫",
    tag: "Snack"
  },
  {
    id: 5,
    nombre: "Muffin Overflow",
    categoria: "snack",
    precio: 4800,
    descripcion: "Esponjoso con frutos rojos que desbordan en cada bocado. Tanto sabor que el sistema simplemente no puede contenerlo.",
    ingredientes: ["Harina de avena", "Arándanos", "Frambuesas", "Yogur griego"],
    emoji: "🧁",
    tag: "Snack"
  },
  {
    id: 6,
    nombre: "Sándwich Deploy",
    categoria: "almuerzo",
    precio: 11500,
    descripcion: "Pan artesanal con proteína, vegetales frescos y salsa secreta de la casa. Listo para producción.",
    ingredientes: ["Pan ciabatta", "Pollo asado", "Aguacate", "Tomate", "Rúgula", "Salsa secreta"],
    emoji: "🥪",
    tag: "Almuerzo"
  }
];

/* ── Testimonios ────────────────────────────────────────────── */
const testimonios = [
  {
    texto: "Los Focus Pods cambiaron mi vida. Entrego mis proyectos a tiempo y el café de especialidad me mantiene en flujo durante horas. Infusión no es una cafetería, es una herramienta de trabajo.",
    nombre: "Santiago Ruiz",
    rol: "Software Developer · Bogotá",
    iniciales: "SR",
    estrellas: 5
  },
  {
    texto: "Vengo todos los días a estudiar mi maestría. El ambiente es increíble: silencioso cuando lo necesito y social cuando quiero. El Cappuccino Full Stack es adictivo en el buen sentido.",
    nombre: "Valentina Torres",
    rol: "Estudiante MBA · Bucaramanga",
    iniciales: "VT",
    estrellas: 5
  },
  {
    texto: "El servicio FlowState me ayudó a ordenar mis sesiones de trabajo. Ahora tengo datos reales de mi productividad. Nunca pensé que una cafetería me daría un dashboard de rendimiento.",
    nombre: "Andrés Morales",
    rol: "Diseñador UX · Medellín",
    iniciales: "AM",
    estrellas: 5
  }
];

/* ── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCodeRain();
  renderCatalogo();
  renderTestimonios();
  initFilters();
  initContactForm();
  initScrollReveal();
  initBackToTop();
  initActiveNavLinks();
});

/* ── Navbar: scroll + hamburguesa ───────────────────────────── */
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const drawer     = document.getElementById('nav-drawer');
  const drawerLinks = drawer.querySelectorAll('a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Toggle drawer
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close drawer on link click
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── Active nav link on scroll ──────────────────────────────── */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── Hero: lluvia de código decorativa ──────────────────────── */
function initHeroCodeRain() {
  const container = document.querySelector('.hero__bg-code');
  if (!container) return;

  const fragments = [
    'const brew = () =>',
    'import coffee from',
    'npm install latte',
    'git commit -m "fix"',
    'async function focus()',
    '{ caffeinated: true }',
    'return productivity;',
    '// TODO: add sugar',
    'while(tired) drink()',
    'export default cafe',
    '=> new Idea()',
    'debug(life)',
    'yarn start:morning'
  ];

  fragments.forEach((text, i) => {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.left  = `${(i * 7.5) % 95}%`;
    span.style.animationDelay    = `${(i * 1.5) % 12}s`;
    span.style.animationDuration = `${16 + (i % 5) * 3}s`;
    container.appendChild(span);
  });
}

/* ── Render catálogo ────────────────────────────────────────── */
function renderCatalogo(filtro = 'todos') {
  const grid = document.getElementById('catalogo-grid');
  if (!grid) return;

  const filtrados = filtro === 'todos'
    ? productos
    : productos.filter(p => p.categoria === filtro);

  grid.innerHTML = filtrados.map((p, i) => `
    <article class="product-card reveal" style="animation-delay:${i * .08}s"
             data-categoria="${p.categoria}" aria-label="${p.nombre}">
      <div class="product-card__img">
        <span class="product-card__cat">${p.tag}</span>
        <span aria-hidden="true">${p.emoji}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.nombre}</h3>
        <p class="product-card__desc">${p.descripcion}</p>
        <div class="product-card__ingredients" aria-label="Ingredientes">
          ${p.ingredientes.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
        </div>
        <div class="product-card__footer">
          <span class="product-card__price" aria-label="Precio: ${formatPrecio(p.precio)}">
            ${formatPrecio(p.precio)}
          </span>
          <button class="product-card__add"
                  aria-label="Agregar ${p.nombre} al pedido"
                  onclick="addToOrder('${p.nombre}')">+</button>
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe new cards for scroll reveal
  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ── Render testimonios ─────────────────────────────────────── */
function renderTestimonios() {
  const grid = document.getElementById('testimonios-grid');
  if (!grid) return;

  grid.innerHTML = testimonios.map((t, i) => `
    <article class="testimonial-card reveal" style="transition-delay:${i * .12}s">
      <div class="testimonial-stars" aria-label="${t.estrellas} estrellas">
        ${'★'.repeat(t.estrellas)}
      </div>
      <p class="testimonial-text">${t.texto}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar" aria-hidden="true">${t.iniciales}</div>
        <div class="testimonial-author-info">
          <strong>${t.nombre}</strong>
          <span>${t.rol}</span>
        </div>
      </div>
    </article>
  `).join('');

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ── Filtros catálogo ───────────────────────────────────────── */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      renderCatalogo(btn.dataset.filter);
    });
  });
}

/* ── Formulario de contacto ─────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
  const value   = field.value.trim();
  const errorEl = document.getElementById(`error-${field.id}`);
  let   message = '';

  if (field.required && !value) {
    message = 'Este campo es obligatorio.';
  } else if (field.type === 'email' && value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Ingresa un correo electrónico válido.';
    }
  } else if (field.id === 'nombre' && value && value.length < 2) {
    message = 'El nombre debe tener al menos 2 caracteres.';
  } else if (field.id === 'mensaje' && value && value.length < 10) {
    message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  field.classList.toggle('error', !!message);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.toggle('visible', !!message);
  }
  return !message;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let   valid  = true;

  inputs.forEach(input => {
    if (!validateField(input)) valid = false;
  });

  if (!valid) return;

  const submitBtn = form.querySelector('.form-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  // Simulate async submission
  setTimeout(() => {
    form.style.display = 'none';
    document.getElementById('form-success').classList.add('visible');
    showToast('✅ ¡Mensaje enviado con éxito!');
  }, 1200);
}

/* ── Agregar al pedido (feedback visual) ────────────────────── */
function addToOrder(nombre) {
  showToast(`☕ ${nombre} agregado`);
}

/* ── Toast notification ─────────────────────────────────────── */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Scroll reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  observeReveal(els);
}

function observeReveal(elements) {
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => obs.observe(el));
}

/* ── Back to top ────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Helpers ────────────────────────────────────────────────── */
function formatPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(precio);
}
