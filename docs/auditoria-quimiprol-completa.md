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
