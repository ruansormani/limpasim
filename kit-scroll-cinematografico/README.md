# Kit de scroll cinematográfico

Kit reutilizável de efeitos de scroll vanilla (HTML+CSS+JS, sem build,
sem dependências) extraído do trabalho de motion design do site
LimpaSim. Pensado pra ser copiado inteiro (a pasta `kit-scroll-
cinematografico/`) pra dentro de qualquer projeto novo — não depende de
nada específico deste repositório.

## Por que vanilla, sem GSAP/Lenis/framework

Uma revisão de skills de terceiros pra esse mesmo objetivo (ver
`../docs/levantamento-claude-skills-scroll.md`) mostrou que as opções
boas exigem GSAP/Lenis, e as vanilla tinham dependência quebrada ou
eram redundantes. Este kit é a alternativa: os mesmos efeitos,
100% vanilla, testados, sem dependência nova pra manter.

## Filosofia (aplicada em todo o kit)

1. **rAF-throttle no scroll**, nunca um loop `requestAnimationFrame`
   contínuo — um listener de `scroll` que agenda no máximo 1
   atualização por frame.
2. **3 camadas de fallback obrigatórias** em toda seção de scroll-scrub:
   - JS completo (a experiência real).
   - `@media (prefers-reduced-motion: reduce)` → estado final estático,
     **sem** animação — e o JS precisa checar essa media query também
     e **não rodar**, senão ele sobrescreve o CSS via inline style
     (bug real, encontrado e corrigido durante a montagem deste kit).
   - `<noscript><style>` → colapsa a seção alta pra `height: auto`
     (senão sobra "zona de rolagem morta" sem JS).
3. **Progresso 0→1 via `getBoundingClientRect()`**, nunca `scrollY`
   bruto — funciona independente de outras seções acima mudarem de
   altura.
4. Toda seção `sticky` precisa saber a altura de um eventual header
   fixo (`--header-offset`) — se errar esse número, o palco "pula"
   visualmente ao pinar.

## Estrutura

```
core/
  scroll-progress.js   engine genérico: progresso, easing, lerp/clamp
  reveal.css/js         reveal ao entrar na viewport (fade+rise+blur)
recipes/
  portal-reveal/         card sticky que expande até fullscreen
  video-scrub-stagger/    mídia em scrub + texto palavra a palavra
  ambient-gradient/       gradiente animado de fundo, CSS puro
```

Cada pasta em `recipes/` tem um `demo.html` autocontido — abra
diretamente no navegador (`file://`) pra ver o efeito funcionando antes
de decidir usar.

## Como usar num projeto novo

1. Copie a pasta `core/` inteira — sempre necessária.
2. Copie só as receitas de `recipes/` que for usar.
3. No HTML, carregue `core/scroll-progress.js` **antes** do JS da
   receita (`portal-reveal.js` etc. dependem de `window.ScrollKit`).
4. Ajuste `--header-offset` pro valor real do seu header fixo (ou
   `0px` se não tiver).
5. Troque os placeholders (`<div class="portal-media">` vazio, cores
   do `ambient-gradient`) pelos assets/paleta do projeto.
6. Adicione o bloco `<noscript><style>` (comentado no topo de cada CSS)
   no `<head>` do seu HTML.
7. Rode o mesmo processo de QA já estabelecido: overflow por bloco em
   várias larguras, contraste WCAG AA, checagem de erros JS, e teste
   manual com `prefers-reduced-motion` emulado no DevTools.

## Origem / referência técnica completa

- `../docs/referencia-scroll-cinematografico.md` — engenharia reversa
  original (Apple, Stripe, Linear) com as tabelas de progresso e a
  justificativa de cada valor usado aqui.
- `../docs/levantamento-claude-skills-scroll.md` — por que nenhuma
  skill de terceiro foi instalada em vez deste kit.
- O efeito "Vitrine Cinematográfica" em `../index.html` do site LimpaSim
  é a implementação de produção mais próxima do `portal-reveal` (com
  fotos reais de produto em vez de vídeo).

## Aviso

Este kit não trata de acessibilidade além do que está descrito (reduced-
motion, no-JS). Sempre valide contraste, `alt` de imagens/vídeos, e
foco de teclado no contexto do projeto onde for usado.
