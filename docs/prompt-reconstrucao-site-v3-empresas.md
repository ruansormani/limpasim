# Prompt — Reconstrução v3: site 100% focado em vender para empresas

Documento de briefing criado em 24/07/2026, **antes** de qualquer código
novo. Esta é a **terceira versão** da home (v1: "editorial elegante"
navy/dourado; v2: azul suave + audiência dupla igualitária, 61 produtos
em catálogo completo). O cliente rejeitou a v2 nos pontos específicos
listados abaixo — não é insatisfação geral, é direção nova e mais
afiada. Nada foi implementado ainda nesta v3.

## 0. O que mudou da v2 pra v3 (não repetir os mesmos erros)

| Ponto | v2 (atual, publicada) | v3 (este briefing) |
|---|---|---|
| Foco de audiência | Dupla, "igualitária" (Empresas card maior, mas Moradores com o mesmo peso estrutural) | **Site inteiro pensado pra vender pra empresa primeiro.** Pessoa física ainda existe, mas como um caminho secundário claramente subordinado — no estilo Quimiprol (ver seção 2). |
| Catálogo | Grid completo dos 61 produtos, abas + busca, tudo visível | **Não mostrar tudo.** Cliente foi explícito: *"nao quero todas mostrado pelo site como estava antes"*. Curadoria, não inventário completo — ver seção 4. |
| Imagens de produto | Vitrine usava os recortes com fundo removido (`assets/produtos/recorte/*.png`) | **Não usar mais os recortes** — cliente: *"nao utilize mais essas imagens que removeu o fundo, elas estao ruims"*. Usar as fotos originais do zip (fundo de estúdio azul), as mesmas já em `assets/produtos/*.jpg`. |
| Logo | Ícone genérico (SVG sparkle) + texto "LimpaSim" | **Logo real do cliente**, já processada — ver seção 1. |
| Tom/energia | Institucional, elegante, mas "apresentação" | **"Vende de verdade"** — nível sênior de copywriting comercial B2B, não só bonito. Foco em conversão, não só em estética. |

## 1. Logo real (novo — não existia nas versões anteriores)

Arquivo enviado pelo cliente, processado nesta sessão (remoção de fundo
por chroma-key, mais limpo que segmentação por IA pra esse tipo de arte
vetorial):

- `assets/logo/limpasim-icone.png` (467×475, fundo transparente) — só o
  símbolo (gota d'água azul + folha verde entrelaçada + 3 estrelas),
  sem texto. Usar como marca no header (substitui o ícone SVG genérico
  atual) e como base para favicon.
- `assets/logo/limpasim-logo-completa.png` (1077×821, fundo
  transparente) — símbolo + wordmark "LimpaSim" (Limpa em azul, Sim em
  verde) + tagline "PRODUTOS DE LIMPEZA". Usar em rodapé ou onde fizer
  sentido o lockup completo.
- A paleta azul+verde que já estava em uso na v2 **bate exatamente**
  com as cores reais da logo — não precisa mudar a paleta, só validar
  os tons exatos contra a logo (pode ajustar levemente os hex de
  `--blue-500`/`--green-500` pra casar 1:1 com a gota/folha da logo,
  se ao comparar lado a lado houver diferença perceptível).

## 2. Estrutura inspirada na Quimiprol — adaptada, não copiada

> "pegue ideia do site kimiproll, o foco em vender para empresas...
> eles tem mensagens focada em vender para empresarios, e com uma aba
> que leva ate empresas, onde tera mais detalhes, onde tera, um botao
> para pessoas onde tera mais detalhes, 2 botao, um, minha empresa,
> outro minha casa, quem somos, produtos"

Da auditoria completa (`docs/auditoria-quimiprol-completa.md`): a
Quimiprol abre com mensagem direta pra quem quer revender/comprar em
volume, CTA de conversão logo no banner, e usa a navegação pra separar
claramente o público comercial do institucional.

**Estrutura de navegação/IA proposta para a v3:**

- Menu principal: **Produtos**, **Empresas**, **Quem Somos**, Contato.
- **Dois botões de entrada** (mantém o que já existia na v2, mas agora
  cada um leva a uma **página/seção com bem mais profundidade**, não
  só um carrossel de 5 produtos):
  - **"Minha Empresa"** → seção robusta `#empresas`: dor específica do
    empresário (nunca ficar sem estoque, padrão de qualidade constante
    pra hóspede/cliente final, condição de compra por volume), prova
    social/argumentos de venda, produtos relevantes, CTA de orçamento.
  - **"Minha Casa"** → seção mais enxuta `#moradores`, claramente
    secundária em extensão e destaque visual (não em qualidade — só em
    prioridade de espaço/hierarquia).
- Isso é uma **evolução** da arquitetura de audiência dupla da v2 (que
  já tinha Empresas priorizada), não uma invenção do zero — a diferença
  é dar profundidade de conteúdo de verdade pra cada caminho, no
  espírito da Quimiprol, em vez de só um card de hero + carrossel curto.

## 3. Copy: "vender de verdade", nível sênior

> "que vende de verdade nivel senjior, foque na pratica de vender
> esperiencia com o cliente pelo site skroll, elegante, efeitos
> sutis, elegante"

- Copywriting orientado a conversão B2B: liderar com a dor do
  comprador empresarial (ruptura de estoque, inconsistência de
  fornecedor, tempo perdido cotando com vários lugares), não só
  descrição de produto.
- **Efeitos de scroll sutis e elegantes** — não é pra ter menos
  qualidade de motion que a v2, é pra ter **menos volume/intensidade**
  de efeito, com mais intenção em cada um. Reaproveitar o
  `kit-scroll-cinematografico/` e `docs/referencia-scroll-
  cinematografico.md` (portal-reveal, reveals) já testados, mas dosar:
  cada efeito precisa justificar por que está ali (reforçar uma
  mensagem de venda), não decorar por decorar.
- Sem invenção de dado comercial: preço, rendimento, condição de
  pagamento continuam com os placeholders já estabelecidos
  (`[Consulte valores]` etc.), mesmo com copy mais agressiva de venda —
  agressividade é no argumento, não no dado inventado.

## 4. Catálogo — curadoria, não inventário completo

> "nao quero todas mostrado pelo site como estava antes quero uma
> ideia totalmente nova"

Em vez do grid de 61 produtos com abas+busca (isso continua existindo
como CONCEITO, só não é mais o que a home mostra por padrão):

- Proposta: uma seção de **produtos em destaque** (curadoria pequena,
  6-10 itens, os mais representativos do uso profissional/B2B — linha
  5L, os que já eram destaque nos carrosséis Empresas da v2), com um
  CTA claro tipo "Ver catálogo completo" que leva pra uma **página/
  seção separada** com o inventário completo (o que já existe, pronto,
  não precisa reconstruir — só deixar de ser o destaque da home).
- **Fotos: usar as originais do zip** (`assets/produtos/*.jpg`, fundo
  de estúdio azul), não os recortes. Isso vale pra qualquer vitrine/
  destaque também — nada de `assets/produtos/recorte/`.

## 5. Pendência não resolvida — vídeos

O cliente mencionou *"pegue mesma informação dos vídeos que pedi para
analisar"* — **não existe nenhum pedido de análise de vídeo registrado
nesta conversa**. Perguntei diretamente (duas vezes) e a pergunta foi
dispensada sem resposta nas duas ocasiões, sem confirmação de que era
engano nem envio do vídeo. **Tratando como não aplicável por enquanto**
— se o cliente mandar o vídeo depois, incorporar a informação na hora;
não inventar o que não foi enviado.

## 6. O que já está pronto e deve ser 100% reaproveitado

- Toda a base técnica da v2: tokens de cor azul/verde (validar contra a
  logo real, seção 1), tipografia Manrope+Work Sans, `kit-scroll-
  cinematografico/`, convenções de segurança (nunca inventar preço,
  WhatsApp placeholder, QA de overflow/contraste/JS em 5 larguras antes
  de publicar).
- Os 61 produtos (dados/categorias) e as fotos originais em
  `assets/produtos/*.jpg` — **exceto os recortes**, que saem de uso.
- A lição de bugs reais da v2 (`CLAUDE.md`, seção "Bugs reais
  encontrados"): `object-fit:contain` nas imagens de card,
  `scroll-margin-top` em âncoras, nunca `white-space:nowrap` em botão
  de texto longo, reauditar contraste do zero a cada paleta/uso novo.

## 7. Perguntas em aberto (se quiser responder antes de eu construir)

1. Confirma que "Minha Casa" deve continuar existindo (só menor/
   secundária), e não ser removida do site?
2. A seção de produtos em destaque na home: 6, 8 ou 10 itens? (proposta
   inicial: 8, os mesmos já curados pro carrossel Empresas da v2 +
   2-3 novos)
3. Vídeos da seção 5 — tem algo pra mandar, ou realmente não se aplica?

Se preferir, posso seguir com as respostas padrão sugeridas acima (item
2: 8 produtos) e só parar se algo crítico depender de resposta sua.
