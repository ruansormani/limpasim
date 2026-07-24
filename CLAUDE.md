# LimpaSim — site institucional

Site institucional da LimpaSim (distribuidora exclusiva Quimiprol, Gramado e
Serra Gaúcha/RS) em um único arquivo `index.html` (HTML+CSS+JS, sem build,
sem dependências externas além do Google Fonts).

## ⚠ Reconstrução completa do site — em planejamento (24/07/2026)

O cliente pediu um site **100% novo** (design/layout/copy atuais
descartados), mantendo só produtos/imagens/skills já validados. Antes de
qualquer código, foi produzido o briefing completo em
`docs/prompt-reconstrucao-site-novo.md` — **leia esse arquivo primeiro**
se a tarefa for continuar/executar essa reconstrução. Ele reúne toda a
memória relevante (o que reaproveitar, o que muda, paleta nova azul
suave, cupom de primeira compra, audiência dupla Empresas/Moradores,
etc.). **Todas as 6 perguntas em aberto já foram respondidas
(24/07/2026)** — resumo: accent **verde** (não dourado), cupom **5% na
primeira compra**, o badge "+10 Anos em Gramado" está **errado, o
certo é 5 anos** (corrigir em todo o site), botões de audiência **só
Empresas/Moradores** (sem mais segmentos), arquitetura **continua
vanilla single-file sem back-end** (só o padrão de URL da Quimiprol
vira âncora interna), catálogo **reaproveita imagens/dados como estão**
dentro de um bloco de apresentação novo. Documento pronto pra guiar a
construção — ver seção 8 do arquivo pra detalhe de cada resposta.
Ver também `docs/auditoria-quimiprol-completa.md` (relatório completo,
persistido nesta data — antes só havia um resumo condensado abaixo).

## Estrutura do repositório

- `index.html` — o site inteiro. Design "editorial elegante" (Fraunces +
  Plus Jakarta Sans, acento dourado/champagne sobre azul-noite), efeitos de
  scroll (reveal, paralaxe, scrollspy, tilt 3D), catálogo com **61
  produtos** organizados em abas de categoria + busca em tempo real
  (ver seção "Catálogo — abas de categoria" abaixo), dois carrosséis
  (Empresas/B2B e Casa/B2C).
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

## Catálogo — abas de categoria (24/07/2026, substitui a versão de aba única)

O catálogo **voltou a ter abas de categoria** (Todos / Lavanderia /
Cozinha / Limpeza Geral / Ambientes / Automotivo, cada uma com contador
de produtos), revertendo a simplificação anterior pra aba única +
busca (commit `d05bb0c`). Decisão explícita do cliente ao pedir pra
"pegar a estrutura bem organizada de produtos" do site do fabricante
Quimiprol (ver seção de análise mais abaixo) e aplicar algo **ainda
mais organizado** aqui.

- **Categorias = as 5 de `produtos-fonte/`**, não as 7 do site da
  Quimiprol — de propósito. Copiar as 7 categorias do fabricante
  criaria abas vazias (LimpaSim não tem produtos de "Pet" nem "Limpeza
  para Mãos" na biblioteca-fonte), exatamente o tipo de inconsistência
  que a própria análise do site da Quimiprol identificou como erro a
  evitar. Duas camadas de organização: `data-category` (macro, filtro
  de aba) + `product-cat` visível no card (subcategoria específica,
  ex.: "Amaciante", "Lava-Louças", "Desinfetante").
- **Paleta de cores do site NÃO mudou** — decisão explícita do cliente
  foi manter o azul-noite + dourado editorial já auditado (WCAG AA),
  usando cor só como acento organizacional (gradiente cyan/royal no
  estado selecionado da aba, já reaproveitando tokens existentes:
  `--cyan-600`, `--royal-700`). Nunca copiar a identidade visual do
  fabricante.
- **Catálogo expandido de 10 → 61 produtos**, incorporando praticamente
  toda a `produtos-fonte/` (as ~50 fotos que antes só ficavam de
  reserva). Isso foi necessário, não opcional: sem produtos suficientes
  em cada categoria, a maioria das abas ficaria vazia. Os 8 produtos já
  publicados antes continuam com o mesmo card; só ganharam
  `data-category`.
- **JS:** `applyFilters()` combina aba ativa (`activeFilter`) **e**
  termo de busca ao mesmo tempo (E lógico, nunca se excluem) — dá pra
  filtrar por categoria e ainda refinar digitando.
- Ao adicionar produto novo: escolher a categoria macro certa (uma das
  5), escrever descrição genérica sem inventar dado específico (fiel
  ao rótulo/tipo de produto, no mesmo tom dos demais cards), e nunca
  esquecer o `data-category` no `<article>` — sem ele o card não some
  nem aparece nas abas, só na busca.

## Vitrine Cinematográfica (scroll-scrub)

Seção `<section class="cine-showcase" id="destaques">`, entre o hero e o
carrossel Empresas. Técnica adaptada de um guia externo
(`GuiaSitesScrollHero.pdf`, "Sites de Produto com Scroll Cinematográfico")
que originalmente propunha um vídeo gerado por IA com frame-scrubbing via
canvas — **decisão do cliente foi usar só a técnica de scroll-scrub**,
sem vídeo, sem IA generativa, sem canvas, mantendo todo o resto do site
(menu, catálogo, footer) intacto. Implementação real:

- Contêiner alto (`230vh`) + palco `position: sticky` (`.cine-stage`) que
  fica "pinado" na tela enquanto o usuário rola por dentro do contêiner.
- Progresso do scroll (0→1) calculado via `getBoundingClientRect()` do
  contêiner, aplicado como `transform`/`opacity` inline em 3 fotos reais
  de produto (recortes de `assets/produtos/recorte/`), cada uma com sua
  própria janela de entrada (ease-out cúbico). Throttle por
  `requestAnimationFrame` no listener de `scroll`, igual ao resto do site.
- `.cine-stage` usa `top: 60px` (não `0`) para não ficar atrás do header
  sticky — se adicionar novo bloco `position: sticky`, sempre considerar
  a altura do header (60px) no offset.
- Filhos `position: absolute` dentro de um pai `flex-direction: column`
  não dão largura ao pai (encolhe pra 0) — por isso `.cine-products`
  precisa de `width: 100%; align-self: stretch` explícito nos estados de
  fallback (`prefers-reduced-motion` e `<noscript>`).
- Segue o padrão de 3 camadas já estabelecido no site: (1) experiência
  completa com JS, (2) `prefers-reduced-motion: reduce` → estado final
  estático sem animação, (3) `<noscript><style>` → colapsa a seção alta
  pra `height: auto` (senão sobra uma "zona de rolagem morta" sem JS).
- Ao adicionar/testar novas seções de scroll-scrub, reproduzir o processo
  de QA já usado aqui: script Playwright medindo overflow de documento e
  por bloco em 5 larguras (360/390/768/1280/1920px), auditoria de
  contraste WCAG AA com composição de canais alfa (não dá pra confiar em
  checker ingênuo com glassmorphism/gradiente), e checagem de erros de
  JS — tudo isso pego bugs reais antes de publicar (offset de header,
  largura zero no fallback, sobreposição imagem/texto).

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
