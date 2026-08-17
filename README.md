# Portfolio em Vue

Portfolio pessoal reimaginado com Vue 3 + Vite, com foco em estrutura, manutencao e design mais moderno.

## Stack

- Vue 3
- Vite
- gh-pages

## Rodando localmente

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Gere build de producao:

```bash
npm run build
```

## Deploy no GitHub Pages

O comando abaixo faz o build e publica automaticamente a pasta dist na branch gh-pages:

```bash
npm run deploy
```

## Observacao importante

O base path do Vite esta configurado como /portifolio/ em [vite.config.js](vite.config.js). Se o nome do repositorio no GitHub for diferente, ajuste esse valor antes de publicar.
