/* ==========================================================
   Portafolio de Josue Silva | Comportamiento de la página
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. Botón "Ver más proyectos" ---------- */
  var moreBtn = document.getElementById('more');
  var extra = document.getElementById('extra');
  moreBtn.addEventListener('click', function () {
    var abrir = extra.hidden;
    extra.hidden = !abrir;
    moreBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    moreBtn.textContent = abrir ? 'Ver menos' : 'Ver más proyectos';
    if (abrir) extra.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- 2. Ventanas de información (cursos, certificados, colectivo) ---------- */
  document.querySelectorAll('[data-open]').forEach(function (el) {
    el.addEventListener('click', function () {
      document.getElementById(el.dataset.open).showModal();
    });
  });
  document.querySelectorAll('dialog:not(.lightbox)').forEach(function (d) {
    d.addEventListener('click', function (e) {
      if (e.target === d) d.close();
    });
  });

  /* ---------- 3. Ver imágenes y videos en grande ---------- */
  var lb = document.getElementById('lightbox');
  var lbBody = lb.querySelector('.lb-body');
  var lbCap = lb.querySelector('.lb-cap');

  function abrirLightbox(el) {
    var esVideo = el.tagName === 'VIDEO';
    var medio;
    if (esVideo) {
      medio = document.createElement('video');
      medio.controls = true;
      medio.autoplay = true;
      medio.loop = true;
      medio.playsInline = true;
    } else {
      medio = document.createElement('img');
      medio.alt = el.getAttribute('alt') || '';
    }
    medio.src = el.getAttribute('src');
    lbBody.replaceChildren(medio);
    lbCap.textContent = el.getAttribute(esVideo ? 'aria-label' : 'alt') || '';
    lb.showModal();
  }

  document.querySelectorAll('.ph img, .ph video').forEach(function (el) {
    if (!el.getAttribute('src')) return; // espacios todavía vacíos
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.addEventListener('click', function (e) {
      e.preventDefault();
      abrirLightbox(el);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirLightbox(el);
      }
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target === lbBody) lb.close();
  });
  lb.addEventListener('close', function () {
    lbBody.replaceChildren(); // detiene el video al cerrar
  });

  /* ---------- 4. Botón para volver al inicio ---------- */
  var toTop = document.getElementById('to-top');
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

  function actualizarBoton() {
    toTop.classList.toggle('visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', actualizarBoton, { passive: true });
  actualizarBoton();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducir.matches ? 'auto' : 'smooth' });
  });
})();
