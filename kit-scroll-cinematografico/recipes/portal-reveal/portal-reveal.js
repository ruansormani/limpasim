/*
 * portal-reveal.js — expande .portal-media de card contido até fullscreen
 * conforme o progresso do scroll, com opcional scrubbing de <video> interno.
 * Depende de core/scroll-progress.js (ScrollKit) carregado antes deste script.
 *
 * Janelas de progresso (calibradas na engenharia reversa do efeito original,
 * ajuste livremente para o seu ritmo):
 *   0–15%  entrada do card (opacity/translateY)
 *   15–55% vídeo pinado fazendo scrub (se houver <video>)
 *   55–85% expansão do portal (ease-in-out) card → fullscreen
 *   85–100% legenda revela (ease-out)
 */
(function () {
  'use strict';
  if (!window.ScrollKit) return; // carregue core/scroll-progress.js antes

  // Sem isto, o JS sobrescreveria via inline style (opacity/transform) o
  // estado final estático que o CSS já define em @media(prefers-reduced-motion),
  // porque inline style tem prioridade sobre a regra de media query.
  var prefersReduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;

  var K = window.ScrollKit;

  document.querySelectorAll('.portal-track').forEach(function (track) {
    var stage = track.querySelector('.portal-stage');
    var media = track.querySelector('.portal-media');
    var caption = track.querySelector('.portal-caption');
    var video = media ? media.querySelector('video') : null;
    if (!stage || !media) return;

    var headerOffset = parseInt(
      getComputedStyle(stage).getPropertyValue('--header-offset') || '0',
      10
    ) || 0;

    var baseWidth = 980;
    var baseHeightVh = 0.6;
    var baseRadius = 28;

    K.createScrollStage({
      track: track,
      headerOffset: headerOffset,
      onUpdate: function (p) {
        // 15–55%: scrubbing linear do vídeo, se existir
        if (video && video.duration) {
          var scrub = K.mapRange(p, 0.15, 0.55);
          video.currentTime = scrub * video.duration;
        }

        // 0–15%: entrada do card
        var enter = K.easeOutCubic(K.mapRange(p, 0, 0.15));
        media.style.opacity = String(enter);
        media.style.transform = 'translateY(' + K.lerp(80, 0, enter) + 'px)';

        // 55–85%: expansão do portal (ease-in-out) card → fullscreen
        var open = K.easeInOutCubic(K.mapRange(p, 0.55, 0.85));
        media.style.width = K.lerp(baseWidth, window.innerWidth, open) + 'px';
        media.style.height = K.lerp(baseHeightVh * window.innerHeight, window.innerHeight, open) + 'px';
        media.style.borderRadius = K.lerp(baseRadius, 0, open) + 'px';

        // 85–100%: legenda revela (ease-out)
        if (caption) {
          var cp = K.easeOutCubic(K.mapRange(p, 0.85, 1));
          caption.style.opacity = String(cp);
          caption.style.transform = 'translateY(' + K.lerp(40, 0, cp) + 'px)';
        }
      }
    });
  });
})();

/*
 * ARMADILHAS CONHECIDAS (já custaram bug real em produção):
 * 1. --header-offset PRECISA bater com a altura real do header fixo/sticky
 *    do seu site, ou o palco "pula" visualmente ao pinar.
 * 2. `overflow:hidden` + `isolation:isolate` no .portal-stage são
 *    obrigatórios — sem eles, o portal ao expandir vaza sobre seções vizinhas.
 * 3. Escrever video.currentTime a cada frame exige vídeo com keyframes
 *    densos (reencode com `-g 1` no ffmpeg), senão o scrub "engasga".
 * 4. Filhos position:absolute dentro de um pai flex-direction:column
 *    colapsam a largura do pai pra zero — se usar flex em vez de grid no
 *    .portal-stage, force width:100%/align-self:stretch onde precisar.
 */
