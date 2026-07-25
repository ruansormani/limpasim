# Biblioteca de fotos de produtos LimpaSim/Quimiprol

Biblioteca-fonte organizada a partir do zip `Produtos_Limpasim_1.zip` enviado pelo
cliente (78 fotos originais, nomes de arquivo aleatórios/UUID).

**Esta pasta é só material de referência/trabalho** — não é usada pelo site.
As fotos publicadas no site ficam em `assets/produtos/` (já tratadas/otimizadas).
Quando um produto daqui for usado no site, ele é copiado e ajustado para
`assets/produtos/`.

## Estrutura

```
produtos-fonte/
├── 01_Lavanderia/          13 produtos, 21 fotos
├── 02_Cozinha/              8 produtos, 12 fotos
├── 03_Limpeza_Geral/       27 produtos, 30 fotos
├── 04_Ambientes/            6 produtos, 7 fotos
└── 05_Automotivo/           5 produtos, 8 fotos
```

Cada produto tem sua própria pasta (nome descritivo). Quando existe mais de
uma foto do mesmo produto (tamanhos diferentes ou ângulos diferentes), os
arquivos ficam juntos na mesma pasta, nomeados por tamanho (`-2l`, `-5l`, etc.)
ou por sufixo `-a`/`-b` quando é o mesmo tamanho em fotos diferentes.

## Observações

- **Nomes de produto:** identificados visualmente lendo o rótulo de cada
  foto (os arquivos originais só tinham UUID, sem nome). Alguns nomes de
  linha (ex.: "Doxar", "Dovar", "Erva Doce") são os nomes exatos impressos
  no rótulo Quimiprol.
- **Duplicatas por ângulo:** alguns produtos têm 2 fotos praticamente do
  mesmo item em ângulos diferentes (ex.: `Alvejante_Sem_Cloro` tem 4 fotos:
  2L-a/2L-b/5L-a/5L-b). Mantidas todas — dá pra escolher a melhor na hora
  de usar.
- **Já usados no site atualmente** (`assets/produtos/`): Pinho 5L, Amaciante
  Lavanda 5L/2L, Quimiplus com Peróxido 5L, Sabão Líquido Azul 2L/5L,
  Alvejante Sem Cloro 2L, Amaciante Premium 5L, Desinfetante Lavanda 5L,
  Bem Me Quer Carícia 1L. As demais ~50 fotos são produtos que ainda não
  apareceram no site e podem ser incorporados ao catálogo.

Gerado em: 2026-07-22.
