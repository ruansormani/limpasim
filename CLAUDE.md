# LimpaSim — site institucional

Site institucional da LimpaSim (distribuidora exclusiva Quimiprol, Gramado e
Serra Gaúcha/RS) em um único arquivo `index.html` (HTML+CSS+JS, sem build,
sem dependências externas além do Google Fonts).

## Estrutura do repositório

- `index.html` — o site inteiro. Design "editorial elegante" (Fraunces +
  Plus Jakarta Sans, acento dourado/champagne sobre azul-noite), efeitos de
  scroll (reveal, paralaxe, scrollspy, tilt 3D), catálogo com busca em
  tempo real, dois carrosséis (Empresas/B2B e Casa/B2C).
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

## Preview público

Para gerar um link de preview do site (com imagens embutidas como data URI,
já que Artifacts não servem arquivos externos), ver o processo usado
anteriormente: montar uma cópia self-contained do `index.html` com as
imagens de `assets/produtos/` convertidas para base64 e publicar via
Artifact.
