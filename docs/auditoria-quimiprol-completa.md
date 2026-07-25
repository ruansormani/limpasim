# Auditoria completa — site oficial Quimiprol (fabricante)

**URL analisada:** https://www.quimiprol.com.br/ | **Data da análise original:** 23/07/2026
**Segmento:** Fabricante/distribuidora de produtos de limpeza (venda para revendedores)

> Este é o relatório completo produzido na investigação ao vivo do site do
> fabricante Quimiprol — **não é o site da LimpaSim**, é material de
> referência sobre a marca que a LimpaSim distribui, usado para inspirar
> a reconstrução do site da LimpaSim (ver `docs/prompt-reconstrucao-site-novo.md`).
> Persistido em arquivo nesta data a pedido do cliente; antes só existia
> um resumo condensado no `CLAUDE.md`. Não há acesso à internet nesta
> sessão para revalidar ao vivo — o conteúdo abaixo é a transcrição da
> análise já feita e aprovada.

## 1. Identidade e proposta da empresa

A Quimiprol se posiciona como fabricante com mais de 10 anos de mercado,
com linha de mais de 50 a 60 produtos de limpeza. O foco central do site
é a captação de **revendedores** (o banner principal é "Venha ser um
revendedor Quimiprol"), e não a venda direta ao consumidor. A empresa
atua no Rio Grande do Sul e Santa Catarina com frota própria de entrega,
sediada em Sombrio/SC. Três pilares são comunicados de forma consistente
na home e no "Sobre Nós": Qualidade, Economia e Praticidade.

Observação importante: há uma **inconsistência de números** — a home diz
"mais de 60 produtos" e a página Sobre Nós diz "mais de 50 produtos".
Recomenda-se padronizar (e a LimpaSim não deve repetir esse erro).

## 2. Estrutura e arquitetura de navegação

O menu principal é bem organizado e hierárquico: Home, Produtos (com
submenu por linha e por produto individual), Sobre Nós, Seja um
Revendedor, Contato, Informações e Produtos de Limpeza. O rodapé repete
a navegação e adiciona "Mapa do site", reforçando boa usabilidade.

As **7 categorias de produtos** estão claramente segmentadas:
Aromatizantes de Ambientes, Automotiva, Casa, Limpeza para Mãos,
Lavanderia, Limpeza Pesada e Pet. A página de produtos possui busca
("Buscar por...") e filtro de itens por página — recursos que agregam
usabilidade real.

Um ponto de atenção: o link **"Seja um Revendedor" leva para outro
domínio** (quimiprol.**ind**.br), enquanto todo o resto do site é
quimiprol.**com**.br. Isso pode gerar confusão de marca e quebra de
experiência.

## 3. Qualidade das páginas de produto

As páginas individuais têm boa estrutura: nome, categoria (breadcrumb),
imagem, "Breve Informações do Produto", descrição, "Aplicação e modo de
usar" e "Diferenciais". No exemplo do Detergente Automotivo com Cera, o
conteúdo é claro e orientado ao benefício. Contudo, nas listagens de
categoria alguns textos aparecem cortados/inconsistentes (ex.: alguns
começam com "Aplicação e modo de usar…" enquanto outros trazem uma
frase-resumo limpa). Falta padronização editorial entre os cards. Notei
também ausência de **preço, ficha técnica/dados de embalagem
estruturados e ficha de segurança (FISPQ)** — relevante em produtos
químicos.

## 4. Conteúdo institucional e contato

A página **Contato** é completa: endereço físico, dois telefones,
WhatsApp, e-mail, redes sociais (Instagram/Facebook), formulário e mapa
de localização. Há botão flutuante de WhatsApp em todas as páginas —
excelente para conversão B2B. A página **Sobre Nós** é curta e
essencialmente repete o texto da home; poderia ser enriquecida com
missão, estrutura fabril, certificações e história real. A página
**Informações** está bastante rasa (apenas links soltos: Produtos de
Limpeza, Limpeza Automotiva, Roupas).

## 5. Aspectos técnicos e SEO

Pontos positivos: site em **HTTPS**, `lang="pt-br"` definido, **viewport
responsivo** configurado, favicon presente, **títulos e meta
descriptions** preenchidos por página, tags canônicas corretas,
estrutura de **H1 único** por página e **todas as imagens com atributo
alt** (0 imagens sem alt na categoria analisada) — algo raro e positivo.
Há ferramenta de **analytics** ativa (dataLayer detectado).

Pontos a melhorar: **não há dados estruturados (Schema.org/JSON-LD)** —
importante para e-commerce/catálogo aparecer melhor no Google; as
**meta descriptions são genéricas e repetidas** entre páginas (mesmo
texto-base "Empresa com mais de 10 anos…"), inclusive com o trecho
"…Saiba…" cortado, o que sugere geração automática mal finalizada; sem
`og:image` na categoria (prejudica compartilhamento em redes sociais);
ausência de palavra-chave (keywords vazio, o que é aceitável hoje).

## 6. Pontos fortes (resumo)

Navegação clara e categorização lógica dos produtos; forte orientação à
conversão (CTAs de revendedor e WhatsApp onipresentes); contato completo
e mapa; boa base técnica (HTTPS, responsivo, alt em imagens, canônicas,
H1 correto); páginas de produto com estrutura de benefícios e modo de
uso.

## 7. Pontos fracos e recomendações prioritárias

1. **Padronizar informações divergentes** (50 vs 60 produtos) e unificar
   a comunicação entre home e Sobre Nós.
2. **Unificar domínios** — "Seja um Revendedor" saindo do .com.br para
   .ind.br quebra a experiência e dilui a marca.
3. **Enriquecer meta descriptions** (torná-las únicas e completas por
   página) e **implementar Schema.org** (Product, Organization,
   LocalBusiness) para ganho de SEO.
4. **Padronizar os textos dos produtos** nas listagens (evitar textos
   cortados iniciando em "Aplicação e modo de usar").
5. **Aprofundar Sobre Nós e Informações** com conteúdo institucional
   real, certificações e, idealmente, FISPQ/fichas técnicas dos
   produtos químicos.
6. Adicionar `og:image` nas páginas de categoria/produto para melhor
   exibição em redes sociais.
7. Considerar exibir **dados de embalagem/rendimento** de forma
   estruturada, já que economia/rendimento é um dos pilares vendidos.

## 8. Arquitetura técnica (levantada em 24/07/2026 via Claude in Chrome)

A análise original (23/07/2026) foi só de conteúdo/UX/SEO, via inspeção
visual no navegador — não investigou a stack técnica. Essa lacuna foi
levantada depois, com acesso direto ao site pelo navegador do cliente
(nesta sessão o domínio está bloqueado pela política de rede). Achados:

**Conclusão: CMS proprietário/customizado em PHP** — não é WordPress,
Shopify, Wix nem Next.js. Front-end simples: Bootstrap 5 + jQuery + JS
vanilla, sem framework moderno de build.

> A página "Seja um Revendedor" fica no domínio irmão
> `quimiprol.ind.br`, que **é WordPress + Elementor** — mas isso é só a
> parte de captação de revendedor, num CMS separado do site principal.

- **Código-fonte:** sem `<meta name="generator">`. Comentários HTML de
  um template engine caseiro (`<!-- HEAD REPOSÁVEL PELAS PÁGINAS
  ESTÁTICAS -->`, `<!-- STARTSCRIPTSHEADER -->`/`<!-- ENDSCRIPTSHEADER
  -->`, `<!-- Menu brasmodulos -->`, `<!-- Nível da sessão-->`, `<!--
  Nível da categoria -->`, `<!-- STARTBANNER -->`/`<!-- ENDBANNER -->`,
  `<!-- STARTCOMPONENTS -->`/`<!-- ENDCOMPONENTS -->`, `<!-- INICIO
  CARD -->`/`<!-- FIM CARD -->`, `<!-- Logica Footer -->`, `<!--
  STARTSCRIPTSFOOTER -->`/`<!-- ENDSCRIPTSFOOTER -->`). Imagens/logo
  servidos em `/doutor/uploads/...` (`/doutor/` = painel administrativo
  do CMS interno). Scripts: `bootstrap@5.3.3` (jsdelivr), `/js/
  maskinput.js`, `gtag/js`, `/js/header-scroll.js`. CSS: Google Fonts,
  Font Awesome 6.5.2 (cdnjs), Bootstrap Icons 1.11.3 — tudo via CDN,
  sem arquivos com hash (`main.a1b2c3.js`), ou seja, sem pipeline
  Webpack/Vite. Nenhuma classe `elementor-*`/`wp-block-*`/React/Vue.
- **Servidor:** header `Server: nginx`. Sem `X-Powered-By`, sem
  Cloudflare (`cf-ray`). Fontes/ícones direto de CDNs públicas, não
  hospedados localmente.
- **Console:** `window.jQuery` presente (função); `window.wp`,
  `window.React`, `window.__NEXT_DATA__`, `window.Shopify`,
  `window.Wix` todos `undefined`.
- **Estrutura de URL:** `/` (home), `/produtos` (listagem), `/produtos/
  linha-lavanderia` (categoria), `/produtos/linha-lavanderia/agua-
  sanitaria-5l-2l` (produto), `/sobre-nos`. Padrão `/produtos/
  {categoria}/{produto}` com slugs amigáveis, sem `.php`/`?id=` —
  roteamento customizado (URL rewriting manual), não o padrão fixo de
  WooCommerce/Shopify.
- **robots.txt:** `Disallow: /doutor/`, `/inc/`, `/imagens/informacoes/
  thumb/`, `/*.webp$`; `Sitemap: https://www.quimiprol.com.br/
  sitemap.xml`. `/doutor/` confirma pasta de admin do CMS interno;
  `/inc/` sugere includes PHP típicos de sistema caseiro.
- **sitemap.xml:** gerado manualmente com Screaming Frog SEO Spider
  19.8 (comentário na primeira linha) — não por plugin automático,
  reforça a ausência de WordPress/Yoast no domínio principal.

**Implicação prática:** essa é uma arquitetura de **servidor com
back-end** (PHP customizado + nginx + roteamento server-side), bem
diferente do `index.html` único, estático, sem build e sem back-end que
a LimpaSim usa hoje. Replicar essa stack literalmente exigiria hospedar
um servidor PHP — uma mudança de infraestrutura, não só de código. Ver
`docs/prompt-reconstrucao-site-novo.md` (pergunta em aberto sobre
arquitetura) para a decisão de até que ponto isso deve ser adotado.

## Nota de transparência (da análise original)

Análise feita nas páginas públicas navegáveis (home, catálogo de
produtos e suas 7 linhas, exemplo de produto, Sobre Nós, Contato,
Informações e rodapé) e nos metadados técnicos.

## O que a LimpaSim deve extrair disto (não copiar, adaptar)

- **Copiar a estrutura de comunicação institucional** (pilares tipo
  Qualidade/Economia/Praticidade, foco em "há X anos no mercado",
  linguagem direta e confiável) — **reescrita do zero para a LimpaSim**,
  nunca reaproveitando texto literal da Quimiprol, e sempre falando da
  LimpaSim como distribuidora (não como fabricante).
- **Não repetir os erros:** números inconsistentes entre seções, link
  que troca de domínio sem aviso, meta descriptions genéricas/cortadas,
  cards com texto truncado/inconsistente entre si.
- **Adotar as boas práticas técnicas** já confirmadas lá (HTTPS,
  `lang`, viewport, alt em 100% das imagens, H1 único, meta por página)
  — a LimpaSim já segue a maioria, mas Schema.org e `og:image` são
  diferenciais ainda não implementados.
- **Nunca inventar** preço, ficha técnica estruturada ou FISPQ — mesma
  regra já em vigor no projeto.
