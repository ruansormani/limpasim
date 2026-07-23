# Levantamento de Claude Skills para efeitos de scroll cinematográfico

Pesquisa feita em 23/07/2026 no GitHub (Code Search + Repository Search)
por Claude Skills (pacotes com `SKILL.md`) capazes de ajudar a
**implementar** os 4 efeitos de scroll documentados em
`docs/referencia-scroll-cinematografico.md` (portal reveal, video-
scrubbing com stagger de texto, gradiente mesh, reveals via
IntersectionObserver). **Nada foi instalado** — isto é só um
levantamento para revisão humana antes de qualquer instalação (skill
de terceiro roda com privilégios de código no repositório, então merece
revisão de conteúdo real antes de confiar nela).

## Candidatos avaliados

### 1. scroll-film-studio — `roeea2/scroll-site-claude`
- **Link:** https://github.com/roeea2/scroll-site-claude (SKILL.md na raiz)
- **O que faz:** processo completo (entrevista → conceitos → construção)
  para montar sites "scroll-film" — a página inteira como um plano
  cinematográfico contínuo dirigido por scroll. Duas variantes: motion
  pura em código (GSAP+Lenis) ou vídeo real gerado por IA, encadeado e
  "esfregado" quadro a quadro num canvas.
- **Cobre:** Efeito 1 (portal reveal — "mask opening to full-bleed",
  regra de handoff sem quadro vazio) e Efeito 2 de forma muito
  específica — em vez de `video.currentTime` ingênuo, usa `canvas` +
  frames JPEG pré-extraídos com "ImageBitmap sliding window" anti-jank
  (justifica tecnicamente por que `<video>` "engasga"), mais "char-split
  hero reveal" com stagger `yPercent:120→0`. **Não cobre** efeito 3
  (mesh gradient) nem efeito 4 (blur via IntersectionObserver).
- **Qualidade:** 1 star, repo novo (~3 dias, último commit 19/07/2026),
  MIT, autor único (RoeeAI) com pouco histórico público. Conteúdo
  excepcionalmente detalhado para o escopo exato pedido.
- **Conteúdo:** interview → pitch de conceitos nomeados → art direction
  → build (Lane A pura-código ou Lane B vídeo encadeado) → verificação
  (harness Puppeteer, `?jump=`/`__ready`) → deploy opcional Vercel.
  `references/engine.md` traz o "scrub engine" completo com código.
- **Risco:** Lane B pede conta/créditos de serviços externos de geração
  de vídeo (Higgsfield, Kie.ai, fal, Replicate) — opt-in, o SKILL.md
  declara "zero personal data — no API keys, no accounts baked in".
  Scripts shell (`chain-step.sh`, `assemble.sh`) e `verify.js`
  (Puppeteer) são executáveis mas escopados ao propósito declarado.
- **Recomendação:** o mais tecnicamente alinhado aos efeitos 1 e 2 —
  vale revisar em detalhe, mas tratar como "achado recente promissor",
  não "validado pela comunidade" (1 star só).

### 2. epic-design — `alirezarezvani/claude-skills`
- **Link:** https://github.com/alirezarezvani/claude-skills/blob/main/engineering-team/skills/epic-design/SKILL.md
- **O que faz:** design 2.5D cinematográfico, 6 camadas de profundidade,
  45+ técnicas de motion/texto via GSAP+CSS+JS (sem WebGL).
- **Cobre:** Efeito 1 — "curtain panel roll-up", "circle iris expand",
  "window pane iris", `clip-path: inset(0 0 100% 0)→inset(0)` com
  scrub timeline (equivalente a portal reveal); Efeito 2 — "word-by-word
  scroll lighting" explícito. **Não cobre** efeito 3 nem efeito 4 (usa
  IntersectionObserver só para performance, não para blur→nítido).
- **Qualidade:** **23 mil stars**, MIT, commit recente (17/07/2026),
  parte de coleção de 345 skills. Autor com crédito nominal (Abbas Mir).
- **Conteúdo:** pipeline de inspeção de assets, sistema depth-0 a
  depth-5, tabela de decisão por tipo de projeto/comportamento de
  scroll, regras de acessibilidade e performance obrigatórias, script
  de validação (`validate-layers.js`).
- **Risco (reportado, não julgado):** dezenas de forks/mirrors sob
  contas com nomes aleatórios/suspeitos (`Cora49634lCumberland`,
  `henrytylerhebert-eng`, `bensitaud-hash`, `zain5210`, `ciciliaETH`,
  `Magum23`, `kriskosmile`, `NedJunk`, `DMLAB3`...) com o mesmo
  `epic-design/SKILL.md` idêntico — sugere atividade de mirror/
  star-farming em torno do repo (não incrimina o original). **Usar
  apenas `alirezarezvani/claude-skills` diretamente, nunca os forks.**
- **Recomendação:** candidato de maior tração/maturidade cobrindo
  efeitos 1 e 2 — vale revisar em detalhe.

### 3. gsap-scrolltrigger — `greensock/gsap-skills` (oficial GreenSock)
- **Link:** https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md
- **O que faz:** skill **oficial** dos criadores do GSAP — pin, scrub,
  batch, scroll horizontal via `containerAnimation`, refresh/cleanup.
- **Cobre:** infraestrutura genérica para efeitos 1 e 2 (pin+scrub é o
  mecanismo por trás de ambos); `ScrollTrigger.batch()` citado como
  alternativa ao IntersectionObserver para reveals em lote (parcial pro
  efeito 4, sem blur). Não cobre video-scrubbing específico nem efeito 3.
- **Qualidade:** 12,2 mil stars, MIT, autoria oficial GreenSock/Webflow,
  commit 21/04/2026, seção explícita de anti-padrões ("Do Not").
- **Conteúdo:** registro do plugin, `start`/`end`, `scrub`, `pin`,
  `toggleActions`, `ScrollTrigger.batch()`, `scrollerProxy()` (integrar
  smooth-scroll de terceiros), scroll horizontal, refresh/cleanup.
- **Risco:** nenhum sinal encontrado.
- **Recomendação:** referência mais autoritativa para GSAP ScrollTrigger
  — sozinha justificaria reconsiderar a regra "vanilla only" do
  projeto, se algum dia isso fizer sentido.

### 4. gsap-scroll — `iotron/gsap-cookbook`
- **Link:** https://github.com/iotron/gsap-cookbook/blob/main/skills/gsap-scroll/SKILL.md
- **O que faz:** "receitas de produção" complementares ao item 3 —
  reveals, parallax, cards empilhados, "Image Mask On Scroll"
  (before/after com containers contra-transladados, parecido com portal
  reveal).
- **Cobre:** Efeito 1 parcial via "Image Mask On Scroll"/"Pinned Panels
  with Overscroll" (não confirmado em detalhe); skill irmã `gsap-text`
  promete SplitText/char-split (efeito 2, não aberta em detalhe);
  `gsap-canvas` poderia servir ao efeito 3 (não confirmado).
- **Qualidade:** 5 stars, MIT, mas estrutura de "progressive disclosure"
  bem pensada (frontmatter enxuto + corpo + references), triggers/
  non-triggers explícitos — sinal de autoria cuidadosa.
- **Conteúdo:** `gsap.context()`, `autoAlpha` em vez de `opacity`,
  `ScrollTrigger.batch()` para reveals em grade, parallax com
  `data-speed`.
- **Risco:** nenhum sinal encontrado.
- **Recomendação:** complemento ao item 3, mas mais genérico que
  específico aos 4 efeitos.

### 5. grainient + scroll-reveal — `nexu-io/motion-anything`
- **Links:** https://github.com/nexu-io/motion-anything/blob/main/recipes/web/grainient/SKILL.md
  e https://github.com/nexu-io/motion-anything/blob/main/recipes/web/scroll-reveal/SKILL.md
- **O que faz:** ~90 "recipes" de motion (portados do ReactBits) como
  skills vanilla JS/CSS, sem dependências. `grainient` = shader WebGL de
  fundo (gradiente animado por tempo); `scroll-reveal` = reveal via
  IntersectionObserver (rise+fade, uma vez por elemento).
- **Cobre:** **Efeito 3 confirmado** (`grainient.js` = shader GLSL real
  com uniform `uTime`, `uColorBalance`, `iResolution`, vanilla).
  **Efeito 4 parcial** — `scroll-reveal.css` confirmado usa só
  `opacity`+`translateY`, **sem** `filter:blur` (é fade+rise, não
  blur→nítido). Não cobre efeitos 1 e 2.
- **Qualidade:** 532 stars, Apache-2.0, commit 06/07/2026, vanilla JS +
  CSS puro (sem GSAP/Lenis) — alinhado ao requisito do site-alvo.
- **Conteúdo:** cada recipe auto-contido (CSS+JS pequenos, cópia
  direta), frontmatter com quando usar/não usar, nota de
  `prefers-reduced-motion`.
- **Risco:** nenhum sinal encontrado nos arquivos abertos.
- **Recomendação:** melhor candidato vanilla puro para efeitos 3 e 4 —
  para o efeito 4 exato (blur→nítido) precisaria adaptar manualmente
  (adicionar `filter:blur`, que o recipe atual não usa).

### 6. gsap-scrolltrigger — `majiayu000/claude-skill-registry`
- **Link:** https://github.com/majiayu000/claude-skill-registry/blob/main/skills/data/gsap-scrolltrigger/SKILL.md
- **O que faz:** referência genérica de GSAP ScrollTrigger (pin, scrub,
  snap, parallax, batch stagger).
- **Cobre:** infraestrutura genérica pra efeito 1/2 e batch-stagger pra
  efeito 4 (sem blur/IntersectionObserver nativo). Não cobre efeito 3.
- **Qualidade:** 512 stars, MIT, commit 13/07/2026.
- **Conteúdo:** redundante com o item 3 (oficial), mas com exemplos
  próprios.
- **Risco:** nenhum sinal encontrado.
- **Recomendação:** não prioritário — menos autoritativo e mais
  redundante que o oficial GreenSock (item 3).

### 7. 3d-frontend — `zyliu0/3d-frontend` (tangencial, fora de escopo)
- **Link:** https://github.com/zyliu0/3d-frontend
- **O que faz:** sites 3D dirigidos por scroll via Three.js + GSAP
  ScrollTrigger (fly-through, room walkthrough, orbit).
- **Cobre:** nenhum dos 4 efeitos diretamente — é sobre cenas 3D
  completas, não sobre os efeitos 2D/vídeo descritos.
- **Qualidade:** 10 stars, MIT.
- **Recomendação:** não vale a pena para este objetivo específico.

## Achados descartados / sinais de risco (reportados, não julgados)

- **`diegosouzapw/awesome-omni-skills`** (`skills/scroll-experience-v2/SKILL.md`):
  o próprio arquivo se descreve como "public intake copy" que empacota
  automaticamente conteúdo de `sickn33/antigravity-awesome-skills` via
  pipeline de "public validator and private enhancer" — linguagem
  típica de scraping/repackaging automatizado, não autoria original.
  Mesmo `scroll-experience/SKILL.md` duplicado em pelo menos 6 outras
  contas (`benjaminasterA`, `betapro-ai`, `hoavdc`, `zibyte`,
  `Edwin0422-FullEstack`, além do suposto original `sickn33`, cujo repo
  foi renomeado para `agentic-awesome-skills` com "1.987+ skills" —
  escala consistente com geração em massa). **Não recomendado como
  fonte confiável.**
- **`dr4ken-soul/Mnemix`** (`FRONTEND_SKILL.md`): falso positivo — é um
  daemon de memória de shell, não relacionado a Claude Skills; o
  arquivo é só o brief de design interno da landing page do próprio
  projeto.
- **`halicotampa-crypto/motion-pack`**: falso positivo — renderiza
  templates de vídeo vertical (TikTok/Reels) via Puppeteer/ffmpeg, não
  efeitos de scroll em página web.
- Nenhum SKILL.md aberto de fato continha scripts executados
  automaticamente sem invocação do usuário, pedido de credenciais/
  token, ou instruções fora do escopo declarado.

## Queries que não retornaram nada de relevante

- Query `claude-skill landing page motion` (Repositories): 0
  resultados — precisou reformular para `topic:claude-skills scroll`,
  que revelou os itens 1, 2 e 7.
- Query `path:SKILL.md scroll OR parallax OR cinematic OR
  "scroll-timeline"`: o GitHub não restringiu de fato a arquivos
  `SKILL.md`, retornando majoritariamente resultados irrelevantes
  (jogos, shaders 3D genéricos, prompts de imagem). Nada novo relevante
  encontrado com essa formulação.

## Resumo / conclusão

Nenhuma skill cobre os 4 efeitos de uma vez. A combinação que mais se
aproxima do levantamento técnico completo:

- **Efeitos 1 e 2 (portal reveal + video-scrubbing com stagger):**
  `roeea2/scroll-site-claude` (mais sofisticado tecnicamente, mas só 1
  star — achado recente, não validado pela comunidade) ou
  `alirezarezvani/claude-skills` → `epic-design` (23k stars, tração
  real, mas evitar os forks suspeitos e usar só o repo original) ou
  `greensock/gsap-skills` (oficial GreenSock, 12,2k stars, infra sólida
  de ScrollTrigger).
- **Efeitos 3 e 4 (mesh gradient + reveal) em JS vanilla puro:**
  `nexu-io/motion-anything` (`grainient` + `scroll-reveal`) — melhor
  achado vanilla, mas o reveal precisaria de ajuste manual (adicionar
  `filter:blur`) pra bater 100% com o efeito 4.

**Nada foi instalado.** Qualquer um desses é candidato a revisão manual
do conteúdo real do `SKILL.md` antes de decidir instalar — em especial
`epic-design`, dado o volume de forks suspeitos ao redor do repositório
(mesmo que o original pareça legítimo).
