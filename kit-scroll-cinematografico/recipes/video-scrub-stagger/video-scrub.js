/*
 * video-scrub.js — revela mídia + faz texto entrar palavra a palavra
 * (stagger) mapeado ao progresso do scroll, nunca a setTimeout.
 * Depende de core/scroll-progress.js (ScrollKit) carregado antes deste script.
 *
 * Janelas de progresso:
 *   0–20%  mídia revela (opacity/scale) + headline em fade
 *   20–60% mídia em scrub (se <video>, currentTime linear); texto stagger
 *   60–100% dissolve (livre pra você estender com a próxima cena)
 */
(function () {
  'use strict';
  if (!window.ScrollKit) return;

  // Mesmo motivo do portal-reveal.js: sem este guard, o JS sobrescreveria
  // via inline style o estado final estático que o CSS define em
  // @media(prefers-reduced-motion), já que inline style vence media query.
  var prefersReduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;

  var K = window.ScrollKit;

  document.querySelectorAll('.scrub-track').forEach(function (track) {
    var stage = track.querySelector('.scrub-stage');
    var media = track.querySelector('.scrub-media');
    var copy = track.querySelector('.scrub-copy');
    if (!stage || !media) return;

    var video = media.querySelector('video');
    var headerOffset = parseInt(
      getComputedStyle(stage).getPropertyValue('--header-offset') || '0',
      10
    ) || 0;

    // Divide a copy em palavras uma única vez (não em cada tick).
    var words = [];
    if (copy) {
      copy.querySelectorAll('[data-split]').forEach(function (el) {
        var text = el.textContent;
        el.innerHTML = text.split(' ').map(function (w) {
          return '<span class="word">' + w + '</span>';
        }).join(' ');
        words = words.concat(Array.prototype.slice.call(el.querySelectorAll('.word')));
      });
    }

    K.createScrollStage({
      track: track,
      headerOffset: headerOffset,
      onUpdate: function (p) {
        // 0–20%: mídia revela
        var enter = K.easeOutCubic(K.mapRange(p, 0, 0.2));
        media.style.opacity = String(enter);
        media.style.transform = 'scale(' + K.lerp(0.85, 1, enter) + ')';

        // 20–60%: scrub linear do vídeo (se existir)
        if (video && video.duration) {
          var scrub = K.mapRange(p, 0.2, 0.6);
          video.currentTime = scrub * video.duration;
        }

        // 20–60%: stagger de texto — CADA palavra mapeada a uma sub-janela
        // do progresso, nunca a um timer (fica sempre sincronizado ao scroll).
        var n = words.length;
        if (n) {
          var windowStart = 0.2, windowEnd = 0.6;
          var step = (windowEnd - windowStart) / Math.max(n, 1);
          for (var i = 0; i < n; i++) {
            var wp = K.easeOutCubic(K.mapRange(p, windowStart + i * step, windowStart + i * step + step * 1.4));
            words[i].style.opacity = String(wp);
            words[i].style.transform = 'translateY(' + K.lerp(12, 0, wp) + 'px)';
          }
        }
      }
    });
  });
})();

/*
 * ARMADILHAS CONHECIDAS:
 * 1. Nunca use setTimeout/setInterval pro stagger — se o usuário rolar
 *    rápido ou parar no meio, o timer dessincroniza do scroll. Mapeie
 *    sempre a uma sub-faixa de progresso, como acima.
 * 2. Mesma regra de --header-offset do portal-reveal.js: tem que bater
 *    com o `top` real do palco sticky.
 * 3. Para scrub de vídeo suave, reencode com GOP curto (`-g 1` no ffmpeg)
 *    — sem isso, video.currentTime "engasga" a cada frame.
 */
