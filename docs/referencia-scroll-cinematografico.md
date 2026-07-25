# Referência: engenharia reversa de scroll cinematográfico (Apple, Stripe, Linear)

Engenharia reversa ao vivo (DOM, CSS computado, objetos globais de JS,
scroll frame-a-frame) feita em 23/07/2026 em sites de referência para
motion design premium. **Não é documentação do site LimpaSim** — é
material de apoio técnico para implementar futuros efeitos de scroll
aqui, reaproveitando a técnica (nunca o conteúdo) dos sites analisados.
Ver também a seção "Vitrine Cinematográfica" no `CLAUDE.md` para o
efeito já implementado no site usando esse tipo de técnica.

## Sites analisados

| Site | Efeito-assinatura | Lib usada |
|---|---|---|
| Apple AirPods Pro 3 | Video-scrubbing pinado (`currentTime` dirigido por scroll) | JS vanilla, scroll nativo |
| Apple Vision Pro | Portal reveal (vídeo pinado que expande até fullscreen) | JS vanilla, scroll nativo |
| Stripe | Gradiente mesh WebGL animado por tempo (ambiente, não scroll) | WebGL vanilla (canvas) |
| Linear | Reveals com blur→nítido via IntersectionObserver | JS vanilla |
| Vercel | Redirecionou para login — não investigado | — |

Nenhum dos sites usa GSAP/Lenis/Framer Motion (`window.gsap`,
`window.ScrollTrigger`, `window.Lenis`, `window.Motion` todos `false`
em todos os alvos) — todos usam **JS vanilla + `requestAnimationFrame`**,
o mesmo padrão já usado no `index.html` da LimpaSim.

---

## 1. Portal Reveal pinado com vídeo (Apple Vision Pro) — o efeito principal

**Mecanismo:** `<div class="sticky-element" style="top:52px">` (52px =
altura do localnav fixo da Apple) segura um `video-container type-portal`
na tela. O container começa como card com cantos arredondados e, ao
avançar o scroll, expande até `100vw × 100vh` enquanto o `<video>`
interno tem `currentTime` escrito pelo progresso do scroll (frame-
scrubbing). `<video>` é `muted`, `playsinline`, `autoplay:false`.

**Altura da trilha:** ~288–320vh por seção (medido: 1664px/288vh em
`.section-design`; subseções 1714–1840px/297–319vh).

**Tabela de progresso → estado:**

| Progresso | O que acontece |
|---|---|
| 0–15% | Card do vídeo entra por baixo, `opacity 0→1`, `translateY ~80px→0`. Cantos arredondados (`border-radius ~28px`), largura contida (~980px). |
| 15–55% | Vídeo pinado no centro (sticky ativo). `video.currentTime` avança **linearmente** com o scroll. Legenda revela em fade. |
| 55–85% | **Abertura do portal:** container escala/expande de card contido → `width:100vw; height:100vh`, `border-radius 28px→0` (ease-in-out). Vídeo faz crossfade para a cena seguinte. |
| 85–100% | Portal totalmente aberto (fullscreen), texto da próxima seção revela por cima (`opacity 0→1`, ease-out). Sticky solta. |

**Easing:** expansão do portal = ease-in-out; scrubbing do vídeo =
linear; reveals de texto = ease-out. **Camadas:** vídeo `z-index:1`;
legendas `z-index:4`; `overflow:hidden` + `isolation` no palco pai
(essencial para o portal não vazar sobre seções vizinhas ao expandir).
**Mobile:** trilha mantém ~288vh; cantos/margens menores; vídeos com
bitrate reduzido; legendas empilham verticalmente.

### Implementação de referência (HTML+CSS+JS vanilla)

```html
<section class="portal-track"><!-- contêiner ALTO: define a "pista" de scroll -->
  <div class="portal-stage"><!-- palco STICKY -->
    <div class="portal-media"><!-- camada que expande de card → fullscreen -->
      <video class="portal-video" muted playsinline preload="auto">
        <source src="device.mp4" type="video/mp4">
      </video>
    </div>
    <div class="portal-caption"><h2>O melhor teatro. Onde quer que você esteja.</h2></div>
  </div>
</section>
```

```css
.portal-track { height: 300vh; position: relative; }         /* pista ~288–320vh */
.portal-stage { position: sticky; top: 52px;                  /* 52px = offset do header fixo */
  height: calc(100vh - 52px); display: grid; place-items: center;
  overflow: hidden; isolation: isolate; }
.portal-media { position: relative; z-index: 1;
  width: 980px; max-width: 92vw; height: 60vh;
  border-radius: 28px; overflow: hidden;
  will-change: width, height, border-radius;
  transform-origin: center center; }
.portal-video { width: 100%; height: 100%; object-fit: cover; }
.portal-caption { position: absolute; z-index: 4; opacity: 0;
  will-change: opacity, transform; }
```

```js
const track = document.querySelector('.portal-track');
const media = document.querySelector('.portal-media');
const cap   = document.querySelector('.portal-caption');
const video = document.querySelector('.portal-video');
const easeInOut = t => t < .5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2; // cúbico
const clamp = (v,a,b) => Math.min(b,Math.max(a,v));
const lerp  = (a,b,t) => a + (b-a)*t;
let ticking = false;

function onScroll(){ if(!ticking){ requestAnimationFrame(update); ticking = true; } }
function update(){
  ticking = false;
  const r = track.getBoundingClientRect();
  // progresso 0→1 dentro da pista (desconta a altura do palco sticky)
  const total = track.offsetHeight - (window.innerHeight - 52);
  const p = clamp(-r.top / total, 0, 1);

  // 15–55%: scrubbing linear do vídeo
  const scrub = clamp((p - .15) / (.55 - .15), 0, 1);
  if (video.duration) video.currentTime = scrub * video.duration;

  // 55–85%: expansão do portal (ease-in-out) card → fullscreen
  const open = easeInOut(clamp((p - .55) / (.85 - .55), 0, 1));
  media.style.width        = lerp(980, window.innerWidth,  open) + 'px';
  media.style.height       = lerp(0.6*window.innerHeight, window.innerHeight, open) + 'px';
  media.style.borderRadius = lerp(28, 0, open) + 'px';

  // 85–100%: legenda revela (ease-out)
  const cp = clamp((p - .85) / (1 - .85), 0, 1);
  cap.style.opacity   = cp;
  cap.style.transform = `translateY(${lerp(40,0,cp)}px)`;
}
window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', onScroll);
```

**Fallbacks (padrão de 3 camadas do site):**

```css
@media (prefers-reduced-motion: reduce){
  .portal-track { height: auto; }
  .portal-stage { position: static; height: auto; }
  .portal-media { width: 100%; height: auto; border-radius: 12px; }
  .portal-caption { opacity: 1; transform: none; position: static; }
}
```

```html
<noscript><style>
  .portal-track{height:auto}.portal-stage{position:static;height:auto}
  .portal-media{width:100%;height:auto}.portal-caption{opacity:1;position:static}
</style></noscript>
```

**Armadilhas:** `top: 52px` do sticky tem que bater com a altura real
do header fixo (na LimpaSim, 60px — ver seção Vitrine Cinematográfica
no `CLAUDE.md`) ou o palco "pula". `overflow:hidden` + `isolation:
isolate` são obrigatórios no palco. Anime só `width`/`height`/
`border-radius` com `will-change` (evite `filter`/`box-shadow`
animados — custam repaint). Escrever `video.currentTime` a cada frame
exige vídeo com keyframes densos (reencodar com `-g 1` no ffmpeg),
senão o scrubbing engasga.

---

## 2. Video-scrubbing pinado com stagger de texto (Apple AirPods Pro)

**Mecanismo:** palco centralizado (`media-container pin-center`)
segura o vídeo na tela; `currentTime` é escrito por scroll (confirmado
empiricamente: `currentTime` = 1.42 / 1.97 / 2.34 / 2.40s em posições
distintas, duração total 2.466s, `autoplay:false`). Simultaneamente
uma onda tipo prisma revela e o texto entra **palavra a palavra**
(stagger).

**Altura da trilha:** ~460vh (medido: 2653px).

| Progresso | O que acontece |
|---|---|
| 0–20% | Onda-prisma revela de baixo (`opacity 0→1`, `scale ~0.85→1`, ease-out cúbico). Headline em fade. |
| 20–60% | Vídeo scrubando (linear). Parágrafo revela palavra a palavra, stagger ~30–50ms entre palavras. |
| 60–100% | Cena dissolve; próxima headline entra enquanto a anterior sai. |

### Implementação de referência

```html
<section class="scrub-track">
  <div class="scrub-stage">
    <video class="scrub-video" muted playsinline preload="auto"><source src="prism.mp4"></video>
    <p class="scrub-copy" data-split>Frase que revela palavra a palavra conforme o scroll.</p>
  </div>
</section>
```

```css
.scrub-track { height: 460vh; position: relative; }      /* pista ~460vh medida */
.scrub-stage { position: sticky; top: 52px; height: calc(100vh - 52px);
  display: grid; place-items: center; overflow: hidden; }
.scrub-video { position: absolute; inset: 0; width:100%; height:100%;
  object-fit: cover; z-index: 1; opacity: 0; transform: scale(.85);
  will-change: opacity, transform; }
.scrub-copy { position: relative; z-index: 4; }
.scrub-copy .word { display:inline-block; opacity:0; transform:translateY(12px);
  will-change: opacity, transform; }
```

```js
// dividir a copy em palavras no load
document.querySelectorAll('[data-split]').forEach(el=>{
  el.innerHTML = el.textContent.split(' ')
    .map(w=>`<span class="word">${w}</span>`).join(' ');
});
const easeOutCubic = t => 1 - Math.pow(1-t,3);
// dentro do update(p):
//  prism revela 0–20%: opacity=easeOutCubic(p/0.2); scale=lerp(.85,1,...)
//  scrub 20–60%: video.currentTime = clamp((p-.2)/.4,0,1)*video.duration  (LINEAR)
//  stagger 20–60%: cada palavra i revela quando p passa (0.2 + i*0.02),
//                  opacity 0→1 e translateY 12→0 via easeOutCubic
```

Fallbacks idênticos ao Portal Reveal (reduced-motion →
`.word{opacity:1;transform:none}` + `height:auto`; `<noscript>` colapsa
a pista).

**Armadilhas:** o stagger **não pode depender de `setTimeout`**
(dessincroniza do scroll) — mapeie cada palavra a uma sub-faixa de
progresso, não a um timer. Recodificar o vídeo com GOP curto para
scrubbing suave.

---

## 3. Gradiente mesh WebGL (Stripe) — cinema ambiente, não dirigido por scroll

`<canvas class="squeezy-carousel__canvas">` com contexto WebGL rodando
shader de gradiente mesh animado por tempo (`requestAnimationFrame`),
**independente do scroll**. Não há pinning nem scrubbing na home atual
da Stripe — o efeito "cinema" está todo no shader do hero.

Alternativa fiel e barata sem WebGL, para um site institucional simples
como o da LimpaSim: `background` com `conic-gradient`/`linear-gradient`
animado via `@property --angle` + `@keyframes`, ou `<canvas 2d>` com
3–4 blobs radiais em `filter: blur(80px)` movendo-se em padrão
Lissajous. Fallback reduced-motion: gradiente estático (sem animação).

---

## 4. Reveals por IntersectionObserver (Linear)

Cada seção começa com `opacity:0; transform: translateY(...); filter:
blur(...)` e, ao entrar na viewport, transiciona para o estado final
(medido no `<h1>`: `blur→none`, `opacity→1`).

```css
.reveal { opacity:0; transform: translateY(24px); filter: blur(8px);
  transition: opacity .8s ease-out, transform .8s ease-out, filter .8s ease-out; }
.reveal.is-in { opacity:1; transform:none; filter:none; }
@media (prefers-reduced-motion: reduce){ .reveal{opacity:1;transform:none;filter:none;transition:none} }
```

```js
const io = new IntersectionObserver((es)=>es.forEach(e=>{
  if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: .15, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
```

Fallback `<noscript>`: `.reveal{opacity:1;transform:none;filter:none}`
num bloco `<noscript><style>`.

Este padrão já é essencialmente o que o `data-reveal` do `index.html`
da LimpaSim faz — serve mais como confirmação de que a abordagem atual
já está alinhada com o estado da arte do que como algo novo a adotar.

---

## Armadilha geral (todos os blocos acima)

Filhos `position:absolute` dentro de um pai `display:flex;
flex-direction:column` colapsam a largura do pai para zero — force
`width:100%`/`min-width` no palco (mesmo bug já documentado na seção
"Vitrine Cinematográfica" do `CLAUDE.md`, para a mesma classe de
problema). Toda seção `sticky` precisa descontar o offset do header
fixo tanto no `top` quanto no cálculo de progresso do JS.

## Pendências desta investigação

- Vercel redirecionou para tela de login — não investigado (não se
  faz login em conta de terceiro para pesquisa).
- Não documentado ainda: sticky header que esconde ao descer/aparece
  ao subir (visto parcialmente na Apple), scrollspy do localnav da
  Apple, e sites com scroll virtual (Lenis/Locomotive Scroll) — este
  último precisaria de aprovação para investigar um novo domínio de
  demo.
