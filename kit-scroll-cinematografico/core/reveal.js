/*
 * reveal.js — observa [data-reveal] e adiciona .is-in uma vez, ao entrar
 * na viewport. Ver reveal.css para o CSS (transição) e o fallback de
 * <noscript> obrigatório (sem ele, elementos ficam presos em opacity:0
 * quando JS está desabilitado).
 *
 * Uso:
 *   <div data-reveal>...</div>
 *   <li data-reveal data-reveal-delay="80">...</li>  <!-- stagger opcional, ms -->
 */
(function () {
  'use strict';

  function revealAll() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  function init() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    els.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--reveal-delay', parseInt(d, 10) + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/*
 * ARMADILHA CONHECIDA: nunca observe elementos dentro de um contêiner com
 * overflow-x (carrossel) cujo ancestral também tenha transform 3D/perspective
 * — o IntersectionObserver pode nunca reportar isIntersecting:true mesmo com
 * o elemento visivelmente na tela, deixando-o preso em opacity:0 para sempre.
 * Bug real já encontrado; carrosséis ficam de fora de reveals automáticos
 * por esse motivo. Se precisar animar itens de carrossel, use outra técnica
 * (ex.: CSS puro, ou revelar tudo de uma vez no load).
 */
