# LimpaSim — site institucional

Site institucional da LimpaSim (distribuidora exclusiva Quimiprol, Gramado e
Serra Gaúcha/RS) em um único arquivo `index.html` (HTML+CSS+JS, sem build,
sem dependências externas além do Google Fonts).

## ✅ Reconstrução completa do site — concluída (24/07/2026)

O site foi **reconstruído 100% do zero** conforme
`docs/prompt-reconstrucao-site-novo.md` (as 6 perguntas em aberto do
briefing foram todas respondidas antes da execução — ver seção 8 desse
arquivo para o histórico completo de cada decisão). O design "editorial
elegante" antigo (Fraunces + azul-noite + dourado) foi **totalmente
descartado**; o que sobreviveu foi só dado/imagem/técnica, não visual.
Ver `docs/auditoria-quimiprol-completa.md` para a análise completa do
site do fabricante que inspirou a reestruturação de conteúdo (não o
visual — nunca copiar a identidade da Quimiprol).

## Estrutura do repositório

- `index.html` — o site inteiro. **Design novo** (24/07/2026): paleta
  **azul suave** dominante em todo o site + **verde** como único acento
  pontual (cupom, CTAs, badges de valor) — substituiu completamente o
  azul-noite/dourado antigo. Tipografia nova: **Manrope** (display) +
  **Work Sans** (corpo), no lugar de Fraunces/Plus Jakarta Sans.
  Arquitetura de **audiência dupla** com Empresas priorizada (cards de
  audiência no hero, seções B2B/B2C dedicadas com carrosséis
  curados) — ver seção "Arquitetura de audiência" abaixo. Catálogo com
  **61 produtos** em abas de categoria + busca (mesmos dados/imagens de
  sempre, bloco de apresentação redesenhado — ver seção "Catálogo"
  abaixo). Vitrine cinematográfica reconstruída como portal-reveal
  (`.portal-track`/`.portal-stage`, não mais `.cine-showcase`) — ver
  seção "Vitrine Cinematográfica" abaixo. Cupom de **5% na primeira
  compra** e badge **"+5 Anos em Gramado"** (corrigido — o antigo "+10
  Anos" estava errado).
- `assets/produtos/` — fotos **já usadas no site**, tratadas/otimizadas.
  Não editar as originais de `produtos-fonte/` diretamente; sempre copiar
  e ajustar para cá antes de referenciar no HTML.
  - `assets/produtos/recorte/` — recortes com fundo removido (só para os
    produtos cuja cor não se confunde com o azul do estúdio: Pinho,
    Alvejante Sem Cloro, Bem Me Quer Carícia). Usados só nos carrosséis de
    vitrine e no card 3D do hero — **nunca no catálogo**.
- `produtos-fonte/` — **biblioteca-fonte completa de fotos de produtos**
  enviada pelo cliente (78 fotos, 59 produtos, 5 categorias: Lavanderia,
  Cozinha, Limpeza Geral, Ambientes, Automotivo). Organizada em pastas por
  produto com nomes descritivos (os arquivos originais só tinham UUID).
  Ver `produtos-fonte/LEIA-ME.md` para o índice completo e observações.
  **Esta é a fonte a consultar sempre que o cliente pedir para adicionar
  um produto novo ao site** — provavelmente a foto já está aqui.
- `kit-scroll-cinematografico/` — **kit reutilizável genérico**, pensado
  pra copiar inteiro pra outros projetos (não depende de nada específico
  da LimpaSim). Ver `kit-scroll-cinematografico/README.md`. Extrai em
  código vanilla testado os padrões de motion já usados aqui: engine de
  progresso de scroll (`core/scroll-progress.js`), reveal genérico
  (`core/reveal.css`/`.js`), e 3 receitas com demo autocontido (`portal-
  reveal`, `video-scrub-stagger`, `ambient-gradient`). Criado depois de
  revisar skills de terceiros pro mesmo fim e decidir não instalar
  nenhuma (ver seção de skills mais abaixo).

## Convenções de trabalho estabelecidas nesta conversa

- **Nunca inventar** preços, rendimentos ou dados de produto: usar sempre
  `[Consulte valores]` / `[Rendimento a confirmar]`.
- **WhatsApp:** todo link usa `[SEU_NUMERO_WHATSAPP]` como placeholder,
  com mensagens pré-preenchidas via `encodeURIComponent`.
- **Marca Quimiprol:** é de terceiro — não reproduzir o logotipo real, só
  tipografia. Comentário `<!-- TODO -->` logo após `<head>` já cobre isso.
- **Antes de publicar qualquer mudança visual:** rodar verificação de
  overflow (documento e por bloco), contraste WCAG AA, e checar erros de
  JS em pelo menos 3 larguras (mobile ~390px, tablet ~768px, desktop
  ~1280px). Um pente-fino já foi feito e aprovado — não deixar regressão.
- **Efeitos de scroll/hover:** cuidado ao aplicar `IntersectionObserver`
  em elementos dentro de carrosséis com `overflow-x` — já causou um bug
  real (fotos permanentemente invisíveis) que foi revertido. Carrosséis
  ficam de fora de reveals automáticos por esse motivo.
- **Git:** branch de trabalho é `claude/limpasim-website-build-aidjvt`,
  PR #1 aberto em `ruansormani/limpasim`. Sempre commitar + push ao final
  de cada mudança aprovada.

## Arquitetura de audiência (Empresas em primeiro lugar)

Decisão do cliente: a experiência do cliente empresário vem primeiro,
mas os dois públicos (Empresas e Moradores) são atendidos. Implementado
como a primeira decisão do visitante, não uma seção no meio da rolagem:

- **Hero:** dois `.audience-card` lado a lado logo abaixo do H1 —
  `.audience-card--primary` ("Sou Empresa", estilo escuro/destacado,
  kicker "Prioridade") sempre antes de `.audience-card` comum ("Sou
  Morador", kicker "Residencial"). Mesma dupla de botões no header
  (`.audience-pill`, desktop) e no menu mobile (`.mobile-audience`).
- **Seções dedicadas** `#empresas` (bg `--paper-tint`, aparece primeiro)
  e `#moradores` (bg branco, aparece depois), cada uma com copy própria
  e um carrossel de 5 produtos curados (não os 61 do catálogo — seleção
  intencional: Empresas = linha profissional 5L; Moradores = tamanhos
  menores/residenciais). CTA de WhatsApp com mensagem própria por
  audiência.
- **"E etc" do pedido original** não virou mais botões de audiência —
  o cliente esclareceu que era sobre itens de menu normais (Catálogo,
  Quem Somos, Contato), não mais segmentos de público. Só existem 2
  audience buttons: Empresas e Moradores.

## Catálogo — abas de categoria (61 produtos)

Catálogo com abas de categoria (Todos / Lavanderia / Cozinha / Limpeza
Geral / Ambientes / Automotivo, cada uma com contador) + busca em tempo
real, seção `#catalogo`. Estrutura e dados **reaproveitados como estão**
da reconstrução anterior (24/07/2026, catálogo expandido de 10→61
produtos) — na reconstrução completa do site, só o bloco de
apresentação (CSS/paleta) foi refeito, os 61 `<article class="product-
card">` com seus `data-category`/`data-name`/imagens/descrições vieram
copiados 1:1 do HTML anterior.

- **Categorias = as 5 de `produtos-fonte/`**, não as 7 do site da
  Quimiprol — de propósito, pra não criar abas vazias (ver
  `docs/auditoria-quimiprol-completa.md`, erro identificado lá e
  evitado aqui). Duas camadas: `data-category` (macro, filtro de aba) +
  `product-cat` visível no card (subcategoria, ex.: "Amaciante").
- **Paleta do catálogo:** seção com fundo `--blue-900` (a única seção
  "escura" do site novo, contraste proposital com o resto azul-suave/
  branco), abas com gradiente `--blue-400`→`--green-500` no estado
  selecionado. Cards de produto continuam em `--paper` branco.
- **JS:** `applyFilters()` combina aba ativa (`activeFilter`) **e**
  termo de busca (E lógico, nunca se excluem).
- Ao adicionar produto novo: escolher a categoria macro certa,
  descrição genérica sem inventar dado, nunca esquecer `data-category`
  no `<article>` — sem ele o card não aparece nas abas, só na busca.
- **Bug real corrigido nesta reconstrução:** `.product-media img` sem
  `object-fit: contain` (só `max-height:100%; width:auto`) não respeita
  o container quando ele usa `aspect-ratio` — a imagem renderiza perto
  do tamanho natural e é cortada pelo `overflow:hidden` do card. Fix:
  `img { position:absolute; inset:0; width:100%; height:100%;
  object-fit:contain }` no lugar de `max-height`/`width:auto`. Mesma
  regra vale pro `.carousel-card-media img`.

## Vitrine Cinematográfica (scroll-scrub)

Seção `<section class="portal-track" id="destaques">` (renomeada de
`.cine-showcase`/`.cine-stage` para `.portal-track`/`.portal-stage` na
reconstrução completa — mesma técnica, nomes de classe novos), entre o
hero e a seção Empresas. Técnica de scroll-scrub sem vídeo/IA/canvas
(decisão original mantida). Implementação:

- Contêiner alto (`240vh`) + palco `position: sticky` (`.portal-stage`)
  pinado, fundo `--blue-900`→`--blue-700` com glow azul/verde.
- Progresso do scroll (0→1) via `getBoundingClientRect()`, aplicado como
  `transform`/`opacity` inline em 3 fotos reais (recortes de
  `assets/produtos/recorte/`), throttle por `requestAnimationFrame`.
- `.portal-stage` usa `top: var(--header-h)` (72px, não 0 nem um número
  fixo) — o offset do header agora é um token CSS (`--header-h`), não
  um valor mágico espalhado pelo CSS/JS. Se mudar a altura do header,
  mudar só esse token.
- Mesma armadilha de sempre: filhos `position:absolute` dentro de pai
  `flex-direction:column` colapsam a largura do pai — `.portal-products`
  precisa de `width:100%; align-self:stretch` nos fallbacks.
- Padrão de 3 camadas mantido: JS completo → `prefers-reduced-motion` →
  `<noscript>`.

## Bugs reais encontrados na reconstrução completa (24/07/2026)

Além do `object-fit` do catálogo (seção acima), a auditoria de overflow
pegou mais dois problemas reais que vale lembrar pra próximas seções:

- **Âncoras de navegação atrás do header sticky:** `<a href="#empresas">`
  etc. levava o usuário pro topo da seção parcialmente coberto pelo
  header fixo. Fix: `section[id] { scroll-margin-top: var(--header-h); }`
  — regra genérica, cobre qualquer seção-alvo de âncora automaticamente.
- **`white-space: nowrap` em botões com texto longo causa overflow real
  de documento**, não só corte visual: um `.btn` com label longa (ex.:
  "Pedir orçamento para minha empresa") força a largura do botão a
  acomodar o texto inteiro numa linha, e isso empurra o `<body>` inteiro
  pra largura maior que o viewport em telas estreitas — `overflow-x`
  vaza da seção pro documento todo. Fix: remover `white-space:nowrap`
  da regra base `.btn` (deixar quebrar linha se precisar) + `max-width:
  100%`. **Nunca usar `white-space:nowrap` em botão cujo texto não é
  garantidamente curto.**
- **Contraste WCAG AA precisa ser reauditado do zero a cada paleta
  nova** — não dá pra assumir que um par de cores que passava na paleta
  antiga passa na nova só por ocupar o "mesmo papel" visual. Nesta
  reconstrução, 4 pares reais falharam com a paleta azul/verde nova até
  serem ajustados: botão primário verde com texto branco (`--green-500`
  → `--green-600`), texto secundário `--ink-500` sobre branco (escurecido
  de `#6C8092` pra `#54697C`), e a opacidade do copyright do footer
  (`rgba(255,255,255,0.45)` → `0.62`). O script de auditoria usado
  (composição manual de canais alfa) tem um ponto cego conhecido:
  `getComputedStyle().backgroundColor` não captura fundos definidos via
  `background: linear-gradient(...)` (propriedade shorthand), então
  elementos sobre fundo gradiente aparecem como falso "FAIL" (fundo cai
  pro branco/fallback). Nesses casos, verificar manualmente contra os
  stops de cor do gradiente (ver commit da reconstrução pra exemplo de
  cálculo) antes de decidir se é bug real ou falso positivo.

## Referência: engenharia reversa de scroll cinematográfico

Ver `docs/referencia-scroll-cinematografico.md` — engenharia reversa ao
vivo (DOM, CSS computado, `currentTime` de vídeo, IntersectionObserver)
de Apple AirPods Pro, Apple Vision Pro, Stripe e Linear, feita em
23/07/2026 como pesquisa de técnica para futuros efeitos de scroll
aqui (não é conteúdo do site LimpaSim). Contém blocos HTML+CSS+JS
vanilla prontos para adaptar:

- **Portal Reveal** (Vision Pro): vídeo pinado que expande de card →
  fullscreen, com scrubbing de `video.currentTime` por scroll.
- **Video-scrubbing com stagger de texto** (AirPods Pro): mesma ideia
  de scrubbing, com revelação de texto palavra a palavra sincronizada
  ao progresso (não a `setTimeout`).
- **Gradiente mesh animado** (Stripe): efeito ambiente por tempo, não
  por scroll — alternativa sem WebGL sugerida para este site.
- **Reveals com blur→nítido via IntersectionObserver** (Linear):
  confirma que o padrão `data-reveal` já usado aqui está alinhado com
  o estado da arte.

Todos os sites usam JS vanilla + `requestAnimationFrame` (nenhum usa
GSAP/Lenis/Framer Motion) — mesmo padrão já seguido neste projeto. As
armadilhas já conhecidas aqui (offset do header sticky, filhos
`absolute` colapsando pai `flex-column`) se repetem nos sites
analisados — reforça que são cuidados genéricos, não específicos desta
implementação.

## Referência: análise do site oficial Quimiprol (fabricante)

Análise feita em 23/07/2026 do site do **fabricante** Quimiprol
(quimiprol.com.br, quimiprol.ind.br) — não é o site da LimpaSim, mas serve
de referência de conteúdo/SEO/estrutura por ser a marca que a LimpaSim
distribui. Achados relevantes para decisões futuras neste projeto:

- **Estrutura de produto que funciona bem** e pode inspirar o catálogo
  daqui: nome, categoria, imagem, resumo curto, "Aplicação e modo de
  usar", "Diferenciais". 7 categorias no site deles: Aromatizantes de
  Ambientes, Automotiva, Casa, Limpeza para Mãos, Lavanderia, Limpeza
  Pesada, Pet.
- **Erros a evitar aqui** (achados no site deles, não repetir no
  LimpaSim): números institucionais inconsistentes entre páginas (ex.:
  "60 produtos" vs "50 produtos"); link que muda de domínio sem aviso
  (`.com.br` → `.ind.br`) quebrando a navegação; meta descriptions
  genéricas/repetidas e cortadas ("...Saiba..." truncado — sinal de
  geração automática mal finalizada); cards de listagem com texto
  inconsistente entre si (alguns cortados começando em "Aplicação e modo
  de usar…").
- **Boas práticas técnicas confirmadas lá e já seguidas aqui:** HTTPS,
  `lang="pt-br"`, viewport responsivo, `alt` em 100% das imagens, H1
  único por página, meta title/description por página. Ainda faltam lá
  (oportunidade de diferencial para o LimpaSim, se fizer sentido no
  futuro): dados estruturados Schema.org/JSON-LD (Product, Organization,
  LocalBusiness) e `og:image` nas páginas de produto/categoria.
- **Coisa que o site deles não tem e o LimpaSim também não deve inventar:**
  preço, ficha técnica estruturada, FISPQ (ficha de segurança) — segue a
  mesma regra já estabelecida de nunca inventar dado de produto.
- Relatório completo (todas as 7 linhas, recomendações de SEO com
  exemplos de meta description) não foi persistido em arquivo — se for
  preciso revisitar detalhe fino, refazer a análise ou pedir ao usuário.

## Referência: skills de terceiros para efeitos de scroll cinematográfico

Ver `docs/levantamento-claude-skills-scroll.md` — levantamento feito em
23/07/2026 no GitHub por Claude Skills capazes de ajudar a implementar
os 4 efeitos de `docs/referencia-scroll-cinematografico.md`. **Nada foi
instalado** — é material pra revisão manual antes de decidir instalar
qualquer uma. Resumo dos melhores candidatos por efeito:

- **Portal reveal + video-scrubbing com stagger (efeitos 1 e 2):**
  `roeea2/scroll-site-claude` (mais sofisticado, mas só 1 star — achado
  recente não validado pela comunidade), `alirezarezvani/claude-skills`
  → skill `epic-design` (23k stars — mas usar só o repo original, há
  vários forks com nomes de conta suspeitos ao redor dele), ou
  `greensock/gsap-skills` → `gsap-scrolltrigger` (skill **oficial** do
  GreenSock, 12,2k stars).
- **Mesh gradient + reveal em JS vanilla puro (efeitos 3 e 4):**
  `nexu-io/motion-anything` (`grainient` + `scroll-reveal`) — melhor
  achado vanilla, mas o reveal precisaria de ajuste manual (adicionar
  `filter:blur`) pra bater com o efeito 4 exato.
- Todos os candidatos, incluindo os descartados (com sinais de
  scraping/repackaging em massa) e as queries de busca que não deram
  resultado, estão documentados no arquivo linkado acima.

## Preview público

Para gerar um link de preview do site (com imagens embutidas como data URI,
já que Artifacts não servem arquivos externos), ver o processo usado
anteriormente: montar uma cópia self-contained do `index.html` com as
imagens de `assets/produtos/` convertidas para base64 e publicar via
Artifact.
