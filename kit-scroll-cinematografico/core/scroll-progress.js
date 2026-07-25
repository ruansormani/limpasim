/*
 * scroll-progress.js — motor genérico de scroll-scrub, vanilla, sem deps.
 *
 * Calcula um progresso 0→1 dentro de um contêiner alto ("track") enquanto
 * um palco `position: sticky` fica pinado na tela, e chama onUpdate(progress)
 * a cada frame — throttle por requestAnimationFrame no listener de scroll
 * (nunca um loop rAF contínuo). Você decide o que fazer com o progresso:
 * interpolar transform/opacity, escrever video.currentTime, etc.
 *
 * Uso:
 *   var stage = ScrollKit.createScrollStage({
 *     track: document.querySelector('.portal-track'),
 *     headerOffset: 60, // precisa bater com o `top` do CSS sticky
 *     onUpdate: function (p) {
 *       var open = ScrollKit.easeInOutCubic(ScrollKit.mapRange(p, 0.55, 0.85));
 *       media.style.borderRadius = ScrollKit.lerp(28, 0, open) + 'px';
 *     }
 *   });
 *   // depois, se a seção for removida do DOM: stage.destroy();
 */
(function (global) {
  'use strict';

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Sub-progresso 0→1 dentro de uma janela [start, end] do progresso total.
  // end <= start sempre retorna 1 (janela já "consumida").
  function mapRange(p, start, end) {
    return clamp(end > start ? (p - start) / (end - start) : 1, 0, 1);
  }

  var linear = function (t) { return t; };
  var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeInOutCubic = function (t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  /**
   * createScrollStage({ track, headerOffset, onUpdate })
   * - track: elemento alto que define a "pista" de scroll.
   * - headerOffset: altura em px de um header fixo/sticky acima do palco
   *   (tem que bater com o `top` usado no CSS do palco sticky, senão o
   *   progresso desalinha do que é visto na tela).
   * - onUpdate(progress): chamado a cada tick com o progresso 0..1.
   * Retorna { destroy() } para remover os listeners.
   */
  function createScrollStage(opts) {
    var track = opts.track;
    var headerOffset = opts.headerOffset || 0;
    var onUpdate = opts.onUpdate || function () {};
    var ticking = false;

    function update() {
      ticking = false;
      var total = track.offsetHeight - (window.innerHeight - headerOffset);
      var progress = total > 0
        ? clamp(-track.getBoundingClientRect().top / total, 0, 1)
        : 0;
      onUpdate(progress);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update(); // estado inicial correto mesmo sem scroll ainda

    return {
      destroy: function () {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
  }

  global.ScrollKit = {
    clamp: clamp,
    lerp: lerp,
    mapRange: mapRange,
    linear: linear,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    createScrollStage: createScrollStage
  };
})(window);
