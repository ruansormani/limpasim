# LimpaSim — site institucional

Site institucional da LimpaSim (distribuidora exclusiva Quimiprol, Gramado e
Serra Gaúcha/RS) em um único arquivo `index.html` (HTML+CSS+JS, sem build,
sem dependências externas além do Google Fonts).

## ✅ Reconstrução v3 (foco 100% em vender pra empresas) — concluída (24/07/2026)

Briefing completo em `docs/prompt-reconstrucao-site-v3-empresas.md` —
histórico de decisão, mas o site já reflete o resultado. Mudou em
relação à v2 abaixo: site pensado pra vender pra empresa em primeiro
lugar (não mais audiência "igualitária" — Empresas tem seção mais longa
e robusta, Moradores é deliberadamente mais enxuta, ver seção
"Arquitetura de audiência" abaixo); catálogo completo (61 produtos) saiu
da home e virou seção secundária `#produtos` — a home mostra só
curadorias pequenas (5 itens linha 5L em Empresas, 4 itens tamanho
residencial em Moradores), cada uma com link "Ver catálogo completo";
**fotos com fundo removido não são mais usadas em nenhum lugar do site**
(nem vitrine, nem hero — `assets/produtos/recorte/*.png` ficou sem uso;
tudo usa `assets/produtos/*.jpg` originais, inclusive o hero, que usa
uma máscara radial em CSS pra suavizar a borda do fundo de estúdio em
vez de recortar o fundo de verdade); **logo real do cliente** em
`assets/logo/` (ícone no header, lockup completo — invertido pra branco
via `filter: brightness(0) invert(1)` — no footer), substituindo o SVG
genérico usado até a v2. A vitrine cinematográfica scroll-scrub da v2
(`.portal-track`) **não foi reconstruída na v3** — o cliente pediu
"efeitos sutis", então o hero ficou com só a vitrine de produto mascarada
(ver seção "Hero e vitrine de produto" abaixo); o `kit-scroll-
cinematografico/` continua no repo pra uso futuro se fizer sentido.
Nova seção institucional `#quem-somos` (era `#parceria` na v2, mesmo
conteúdo de diferenciais, copy de abertura reescrita pro tom "vende de
verdade" do briefing). Ver `docs/referencia-video-produto-premium.md`
para a análise do vídeo de referência que inspirou o tratamento do hero.

## ✅ Reconstrução completa do site v2 — concluída (24/07/2026, substituída pela v3 acima)

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

- `index.html` — o site inteiro. **Design v3** (24/07/2026, sobre a
  mesma base de paleta/tipografia da v2): **azul suave** dominante +
  **verde** como acento pontual (cupom, CTAs, badges de valor).
  Tipografia **Manrope** (display) + **Work Sans** (corpo) + **Playfair
  Display** itálica (`--font-accent`, só pro momento de reveal do nome
  do produto na vitrine do hero — nova na v3). Ordem das seções:
  header → hero (headline B2B + vitrine de produto mascarada, foto real)
  → `#empresas` (robusta: 3 argument-cards de dor/argumento + carrossel
  de 5 produtos 5L + banner CTA escuro) → `#moradores` (deliberadamente
  mais enxuta: heading menor, lista inline em vez de cards, carrossel de
  4 produtos residenciais, CTA compacto) → `#produtos` (catálogo
  completo, 61 produtos, abas + busca — era `#catalogo` na v2) →
  `#quem-somos` (selo de parceria + 3 diferenciais) → `#contato` (CTA
  final com os 2 botões de audiência) → footer (logo real). Ver seções
  "Arquitetura de audiência", "Hero e vitrine de produto" e "Catálogo"
  abaixo. Cupom de **5% na primeira compra** e badge **"+5 Anos em
  Gramado"** mantidos da v2.
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

Decisão do cliente, aprofundada na v3: a experiência do cliente
empresário vem primeiro e tem bem mais profundidade de conteúdo que a
residencial — não é mais só um card de hero + carrossel curto (v2), é
seção inteira com argumento de venda.

- **Botões "Minha Empresa"/"Minha Casa"** (`.audience-pill`,
  `.audience-pill--primary` pro empresa) aparecem em 3 lugares: nav
  desktop (`.main-nav`), menu mobile (`.mobile-audience`) e um toggle
  dedicado no hero (`.hero-toggle`, abaixo dos CTAs principais). Todos
  levam pra `#empresas`/`#moradores`.
- **`#empresas`** (bg `--paper-tint`): eyebrow + H2 + parágrafo de dor
  (ruptura de estoque, padrão inconsistente pro hóspede) → 3
  `.argument-card` (nunca fica sem estoque / padrão de qualidade
  constante / condição por volume) → carrossel de 5 produtos da linha
  profissional 5L (`.carousel-card`, mesmo padrão de imagem
  `object-fit:contain` do catálogo) → `.cta-banner` escuro
  (gradiente `--blue-900`→`--blue-700`) com WhatsApp.
- **`#moradores`** (bg branco, **deliberadamente mais enxuto** — heading
  menor, sem argument-cards, só uma `.home-mini-list` inline de 3 itens,
  carrossel de 4 produtos em tamanho residencial (1L/2L), CTA compacto
  em vez de banner) — subordinado em espaço/destaque, não em qualidade,
  conforme o briefing v3 seção 2.
- **Carrosséis usam fotos originais** (`assets/produtos/*.jpg`), nunca
  `recorte/`. Ao escolher produto pra um carrossel nesses dois blocos,
  conferir a cor de fundo real da foto antes de fechar a curadoria — uma
  foto (`amaciante-lavanda-2l.jpg`) tem fundo de estúdio escuro/azul-
  marinho (lote fotográfico diferente do resto, que é azul-claro) e
  destoava visualmente ao lado das outras no carrossel de Moradores;
  foi trocada por `amaciante-azul-2em1-2l.jpg`. Sempre olhar a miniatura
  renderizada lado a lado com as vizinhas antes de finalizar a escolha.
- Carrosséis **não usam `[data-reveal]`** nos cards (só no
  heading/CTA da seção) — mesma cautela já documentada abaixo sobre
  `IntersectionObserver` em `overflow-x`.

## Catálogo — abas de categoria (61 produtos)

Catálogo com abas de categoria (Todos / Lavanderia / Cozinha / Limpeza
Geral / Ambientes / Automotivo, cada uma com contador) + busca em tempo
real, seção **`#produtos`** (era `#catalogo` até a v2 — o id mudou na v3
pra bater com o link "Produtos" do nav e os CTAs "Ver catálogo completo"
espalhados pelas seções Empresas/Moradores). Estrutura, dados e os 61
`<article class="product-card">` (com seus `data-category`/`data-name`/
imagens/descrições) são **reaproveitados como estão** desde a
reconstrução de 24/07/2026 (catálogo expandido de 10→61 produtos) — só
o id da seção mudou na v3, o resto veio copiado 1:1.

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

## Hero e vitrine de produto (v3 — substitui a vitrine cinematográfica)

A v3 **não reconstruiu** a vitrine cinematográfica scroll-scrub da v2
(`.portal-track`/`.portal-stage`) — o briefing pedia "efeitos sutis", e
o cliente rejeitou explicitamente as fotos recortadas que essa vitrine
usava. Em vez disso, o hero ganhou uma vitrine de produto mais simples e
contida:

- `.hero-showcase`: uma foto real (`assets/produtos/*.jpg`, fundo de
  estúdio azul, nunca `recorte/`) suavizada com
  `mask-image: radial-gradient(ellipse ... transparent 100%)` — a
  técnica original é do site v1 (`.product-media img`), reaproveitada
  aqui pra esconder a borda retangular do fundo de estúdio sem precisar
  de recorte de verdade. Legenda em `--font-accent` (Playfair Display
  itálica) sobreposta perto da base da imagem.
- `.hero-ambient::before`: blob de gradiente cônico (`@property --angle`
  + `conic-gradient`) girando devagar (28s) atrás do conteúdo do hero,
  `filter: blur(90px)`, desligado via `prefers-reduced-motion`.
- **Bug real de layout corrigido nesta seção:** `.hero-grid` com
  `align-items: center` centralizava a vitrine (coluna mais curta)
  contra a altura da coluna de texto (bem mais alta), deixando um vão
  vazio grande acima da imagem. Fix: `align-items: start` +
  `margin-top` fixo na `.hero-showcase` — a imagem passa a alinhar
  perto do topo, igual à badges row, sem vão.
- **Falso alarme de screenshot (mais uma vez):** em capturas headless
  (Playwright/Chromium sem GPU), a imagem mascarada às vezes renderiza
  **totalmente invisível** num screenshot "frio" (logo após o load, sem
  nenhum scroll/repaint) mesmo com todos os estilos computados
  corretos (`opacity:1`, `mask-image` válido, imagem `complete`) — mas
  aparece perfeitamente com um `clip` de screenshot menor, ou após
  qualquer scroll de 1-2px (forçando um repaint). É um artefato de
  compositing do headless com `mask-image`, não um bug real — confirmar
  sempre com um pequeno scroll antes de reportar uma imagem como
  "sumida".
- O `kit-scroll-cinematografico/` continua no repo (não foi usado nesta
  versão, mas fica disponível se um efeito scroll-scrub fizer sentido de
  novo no futuro).

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

## Bug real encontrado na v3: especificidade CSS engolindo cor de botão/pill

Auditoria de contraste da v3 achou um bug de verdade (não um falso
positivo de gradiente): seletores de contêiner com tag+classe, tipo
`.main-nav a { color: var(--ink-700) }` ou `.mobile-nav-panel a { color:
var(--ink-900) }`, têm especificidade `(0,1,1)` — **maior** que
`.audience-pill--primary { color: #fff }` ou `.btn-primary { color: #fff
}`, que são só `(0,1,0)`. Resultado: o "Minha Empresa" pill do nav e o
botão "Falar no WhatsApp" do menu mobile renderizavam com texto escuro
sobre fundo azul/verde — ilegível, contraste ~1.5-3.0 (falha WCAG AA de
verdade, confirmado por cálculo manual, não blind spot de gradiente).
Fix: aumentar a especificidade do componente pra ele sempre vencer,
independente de onde for aninhado — `.audience-pill.audience-pill--
primary`, `.btn.btn-primary`, `.btn.btn-secondary`, `.footer-col
a.footer-cta` (duas classes/seletor composto, em vez de confiar na
ordem de declaração no arquivo). **Lição geral:** qualquer regra do tipo
`.container a { color: ... }` é uma armadilha de especificidade pra
qualquer botão/pill/link estilizado que for aninhado dentro desse
contêiner — ao criar uma regra assim, sempre conferir se componentes
com classe própria (`.btn`, `.audience-pill`, etc.) podem aparecer lá
dentro, e blindar o seletor do componente com uma classe composta.

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
