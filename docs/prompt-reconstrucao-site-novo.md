# Prompt — Reconstrução 100% nova do site LimpaSim

Documento de briefing criado em 24/07/2026 a pedido do cliente, **antes**
de qualquer código novo ser escrito. Reúne tudo que já está arquivado
neste repositório (a "memória" do projeto) mais os requisitos novos
desta conversa, pra servir de prompt-mestre quando a reconstrução for
de fato executada. Nada neste documento foi implementado ainda.

## 0. Decisão do cliente

> "olha nosso site está muito ruim, vamos fazer um 100% novo"

O `index.html` atual é **descartado como design/estrutura**. Não é um
ajuste incremental — é uma reconstrução completa da experiência,
layout, copy e paleta. O que sobrevive é só o que está listado na
seção 1 abaixo.

## 1. O que REAPROVEITAR (não refazer do zero)

Instrução explícita do cliente: *"pegue somente as informações, o
arquivo de imagens dos produtos, as skills que vai precisar"*.

- **Informação/dados de produto** já levantados e validados:
  - `produtos-fonte/` — biblioteca-fonte completa (78 fotos, 59
    produtos, 5 categorias: Lavanderia, Cozinha, Limpeza Geral,
    Ambientes, Automotivo). Ver `produtos-fonte/LEIA-ME.md`.
  - `assets/produtos/` — as 62 fotos já tratadas/otimizadas e
    referenciadas no catálogo atual (61 produtos com nome, categoria,
    subcategoria, descrição genérica e badge de tamanho já escritos —
    esse conteúdo textual pode ser reaproveitado tal como está, ele não
    é "design", é dado).
  - `assets/produtos/recorte/` — recortes com fundo removido (Pinho,
    Alvejante Sem Cloro, Bem Me Quer Carícia) para uso em vitrines.
- **Skills/técnica a usar na reconstrução:**
  - `kit-scroll-cinematografico/` — engine de scroll genérico
    (`core/scroll-progress.js`), reveal genérico (`core/reveal.css`/`.js`)
    e as 3 receitas prontas (`portal-reveal`, `video-scrub-stagger`,
    `ambient-gradient`), todas testadas e documentadas.
  - `docs/referencia-scroll-cinematografico.md` — engenharia reversa
    Apple/Stripe/Linear com tabelas de progresso e código de referência
    (base técnica pra "toda a experiência ao deslizar o scroll").
  - `docs/levantamento-claude-skills-scroll.md` — por que nenhuma skill
    de terceiro foi instalada; a skill `ui-ux-pro-max` (já instalada,
    local) continua a melhor fonte de padrões de UI/motion/paletas para
    a reconstrução visual.
  - `docs/auditoria-quimiprol-completa.md` — auditoria completa do site
    do fabricante (estrutura de conteúdo, arquitetura de navegação,
    erros a não repetir) — ver seção 3 abaixo.
- **Convenções de segurança/dado que continuam valendo, sem exceção:**
  - Nunca inventar preço, rendimento, cupom ou qualquer dado de
    produto — placeholders (`[Consulte valores]` etc.) até serem
    confirmados.
  - WhatsApp: `[SEU_NUMERO_WHATSAPP]` como placeholder, mensagens
    pré-preenchidas via `encodeURIComponent`.
  - Marca Quimiprol é de terceiro — nunca reproduzir o logotipo real,
    só tipografia (manter o comentário `<!-- TODO -->` de autorização).
  - Processo de QA obrigatório antes de publicar: overflow (documento
    e por bloco), contraste WCAG AA, erros de JS, em pelo menos 5
    larguras (360/390/768/1280/1920px).

## 2. O que muda 100%

- Todo o HTML/CSS/JS de layout, componentes e copy institucional atual
  é reescrito do zero — nada do design "editorial elegante" (Fraunces +
  azul-noite + dourado) é herdado por padrão.
- Convenção técnica de base **mantida por default** (arquivo único
  `index.html`, HTML+CSS+JS vanilla, sem build, sem dependência externa
  além de Google Fonts) — porque é assim que o projeto inteiro (kit,
  docs, produtos-fonte) foi desenhado pra funcionar. Se o cliente quiser
  mudar isso (ex.: permitir build tooling), precisa dizer explicitamente
  — ver seção 6.

## 3. Arquitetura de audiência dupla — Empresas em primeiro lugar

> "o nosso como vende para outras empresas e também para pessoas, a
> experiência do cliente empresário deve ser em primeiro"

- A página abre já reconhecendo os dois públicos, mas **prioriza
  visualmente e narrativamente o cliente B2B** (hotéis, pousadas,
  restaurantes, lavanderias, comércio — já é o público de maior volume
  hoje, conforme carrossel "Empresas" existente).
- **Botões de segmentação de audiência** logo no topo/hero: **só
  "Empresas" e "Moradores"** — confirmado (24/07/2026): o "e etc" da
  instrução original não era sobre mais segmentos de público, era sobre
  os itens normais de menu que o site vai ter de qualquer forma
  ("tipo catálogo, quem somos, e etc") — ou seja, navegação padrão
  (Catálogo, Quem Somos, Contato...) **junto com**, não em vez de, os 2
  botões de audiência.
- Cada botão pode levar a uma seção/âncora com copy, produtos e CTA de
  WhatsApp específicos para aquele público (padrão já existe
  parcialmente hoje nos carrosséis "Empresas" e "Para a Sua Casa" — a
  reconstrução formaliza isso como a primeira decisão que o visitante
  toma ao entrar no site, não como uma seção no meio da rolagem).

## 4. Copy institucional — inspirado na Quimiprol, sobre a LimpaSim

> "quando o site abrir deve já ter essa mesma escrita que tem no
> quimiprol, porém lembre-se sempre focado na nossa empresa, e relatar
> a parceria, 10 anos."

Da auditoria completa (`docs/auditoria-quimiprol-completa.md`, seção 1):
a Quimiprol abre com um posicionamento institucional direto — "fabricante
há mais de 10 anos", pilares de Qualidade/Economia/Praticidade, foco em
conversão imediata (CTA de revendedor logo no banner principal).

**Para a LimpaSim, isso deve ser adaptado, nunca copiado literalmente:**

- Abertura institucional forte no hero/logo abaixo dele: quem é a
  LimpaSim, há quanto tempo atua, o que representa a parceria com a
  Quimiprol. **Correção de dado (24/07/2026): o número certo é 5 anos,
  não 10.** O badge atual "+10 Anos em Gramado" está **desatualizado/
  incorreto** e precisa ser substituído por algo como "+5 Anos" (ou
  "5 anos de LimpaSim" — redigir no tom do resto do copy) em **todo
  lugar** onde "10 anos"/"+10 Anos" aparece no site atual (badge do
  header, qualquer menção institucional). Não existe um segundo número
  de "anos de parceria" separado — é um dado só, e o valor certo é 5.
- Pilares equivalentes aos da Quimiprol, mas com voz própria da LimpaSim
  como **distribuidora** (não fabricante): ex. algo como "qualidade
  Quimiprol + agilidade local" — a redigir do zero, nunca reaproveitando
  frases literais do site do fabricante.
- Reforçar a parceria/exclusividade de distribuição já estabelecida
  (comentário `<!-- TODO -->` de autorização de marca continua válido —
  a menção à parceria é textual, não visual/logotipo).
- **Não repetir os erros identificados na auditoria:** números
  institucionais inconsistentes entre seções, meta descriptions
  genéricas/cortadas, textos de card truncados/inconsistentes entre si.

## 5. Nova paleta — azul suave com pontos de destaque

> "mude a informação da paleta... o nosso deverá ser azul suave em todo
> o site, alguns pontos não [uniformes], para destacar informações
> valiosas"

- Cor dominante em todo o site: **azul suave** (tom mais claro/calmo,
  não o azul-noite carregado atual) — transmite limpeza, confiança,
  leveza.
- Cor(es) de destaque pontual, aplicadas com moderação, só onde há
  informação de valor real (cupom, CTA principal, badge "+5 Anos",
  contadores do catálogo) — **RESPONDIDO (24/07/2026): verde**
  (associação direta com frescor/limpeza, contraste natural sobre azul
  suave). Tom exato do verde ainda a escolher na hora de codar (testar
  contraste WCAG AA real contra o azul suave de fundo antes de fixar o
  hex final — não presumir que um verde genérico passa sem medir).
- Qualquer paleta nova precisa refazer a auditoria de contraste WCAG AA
  do zero (não dá pra assumir que os pares antigos de contraste
  continuam válidos com uma base de cor diferente).

## 6. Feature nova — cupom de primeira compra

> "coloque cupom de desconto na primeira compra"

- Precisa de um elemento de UI (badge no hero, banner, ou seção
  dedicada) anunciando desconto na primeira compra.
- **RESPONDIDO (24/07/2026): 5% de desconto na primeira compra.**
  Código do cupom ainda não veio do cliente — como não é um dado de
  produto/preço e sim um rótulo de marketing, uma sugestão inicial
  (ex.: `LIMPASIM5` ou `BEMVINDO5`) pode ser proposta na hora de
  construir, deixando claro que é sugestão e fácil de trocar — mas o
  **5% em si já está confirmado e não é placeholder**.

## 7. Experiência de scroll completa

> "coloque toda a experiência que deve ter o cliente ao deslizar o
> scroll do site, faça um trabalho excelente usando as melhores skills"

- Não ficar restrito a uma única seção "vitrine" como hoje — aplicar a
  linguagem de motion em várias seções da nova página, usando o que já
  está pronto e testado no `kit-scroll-cinematografico/`:
  - **Reveals** (`core/reveal.js`) em praticamente todo bloco de
    conteúdo novo.
  - **Portal reveal** ou **video-scrub-stagger** como abertura de seção
    de destaque (produto/parceria), adaptando os parâmetros documentados
    em `docs/referencia-scroll-cinematografico.md`.
  - **Ambient gradient** como camada de fundo do hero (100% CSS, sem
    WebGL, já com fallback pronto).
  - Manter o padrão de 3 camadas de fallback em toda seção nova: JS
    completo → `prefers-reduced-motion` → `<noscript>`.

## 8. Perguntas em aberto — status (todas respondidas em 24/07/2026)

1. ~~**Cor de destaque**~~ — **RESPONDIDO: verde.** Ver seção 5.
2. ~~**Cupom**~~ — **RESPONDIDO: 5% na primeira compra.** Código ainda
   em aberto (sugestão a propor na hora de construir). Ver seção 6.
3. ~~**"10 anos"**~~ — **RESPONDIDO: era um erro, o certo é 5 anos.**
   Substitui o badge "+10 Anos em Gramado" em todo o site (não é um
   segundo dado, é correção do único dado). Ver seção 4.
4. ~~**Segmentos de audiência**~~ — **RESPONDIDO: só Empresas e
   Moradores.** O "etc" era sobre itens de menu normais (Catálogo, Quem
   Somos...), não mais botões de público. Ver seção 3.
5. ~~**Arquitetura técnica**~~ — **RESPONDIDO: opção (a), só inspirar,
   não replicar a stack PHP da Quimiprol.** Continua arquivo único
   vanilla, sem back-end; só o padrão de URL amigável vira âncora
   interna. Ver seção 2.
6. ~~**Catálogo**~~ — **RESPONDIDO:** reaproveitar as imagens e a
   organização (categorias, dados) do catálogo atual **como estão**,
   dentro de um bloco de apresentação novo — a liberdade é sobre o
   *visual* do bloco (layout, cards, motion), não sobre os dados/fotos
   em si, que já estão certos e não devem ser refeitos.

**Todas as 6 perguntas foram respondidas — este documento está pronto
para orientar a construção.** Próximo passo: implementar seguindo
exatamente as seções 1–7 acima, com o processo de QA da seção 1 antes
de publicar. Se surgir qualquer decisão nova durante a construção que
não esteja coberta aqui (e não for uma escolha puramente técnica de
implementação), voltar a perguntar em vez de presumir.
