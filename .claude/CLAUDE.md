# Pipefy App SDK Boilerplate — Contexto para Claude

> Mapa de contexto do projeto. Use em conjunto com os arquivos em `.claude/rules/` e a documentação em `docs/`.

## Contexto do projeto

**Pipefy App SDK Boilerplate** — template para construir apps que rodam dentro do Pipefy (pipe views, abas de card, etc.).

- **Stack:** Node.js, Express, frontend estático (HTML/JS/CSS).
- **Servidor:** Express na porta `process.env.PORT` ou 4041; serve a pasta `public/` e usa CORS.
- **Integração:** App registrado via `public/manifest.json` (nome, ícones, descrições em en/pt-BR/es, screenshots). O Pipefy carrega as URLs do app (ex.: `index.html`, `pipe-view.html`, `card-tab.html`) em iframes.
- **Arquivos principais:** `server.js` (backend), `public/index.html` + `public/index.js` (app principal), `public/pipe-view.html` (pipe view), `public/card-tab.html` (card tab).
- **Objetivo:** Base mínima para estender e publicar um app na plataforma Pipefy; UI e lógica ficam em `public/`.

## Quick Start

```bash
npm install   # Instalar dependências
npm start     # Iniciar servidor
```

## Comandos e workflows

- **Criar app a partir de um prompt:** Siga o workflow em `.claude/rules/create-app.md` (ex.: "visão em gantt", "checklist no card").
- **Gerar PRD (Product Requirements Document):** Siga o workflow em `.claude/rules/create-prd.md`.

## Referências obrigatórias (ordem de prioridade)

1. **Documentação do SDK** — Leia e siga estritamente: `docs/sdk.md` (Pipefy Apps SDK: script, manifest, initCall, pipe-view, card-tab, render, resizeTo, API `p`).
2. **Frontend e design** — Aplique em toda UI: `.claude/rules/pipe-frontend.md` (PipeStyle, Lumen tokens, Tailwind, fonte New Order, UI enterprise).
3. **Desenvolvimento** — Aplique em arquitetura e padrões: `.claude/rules/pipe-dev.md` (SDK vs API, inicialização, contexto, boas práticas).

## Estrutura do projeto

```text
Pipefy-APP-SDK-Boilerplate-Public/
├── server.js
├── package.json
├── AGENTS.md              # Contexto para agentes (Cursor)
├── .claude/
│   ├── CLAUDE.md          # Este arquivo (contexto para Claude)
│   └── rules/             # Regras e workflows (carregadas automaticamente)
│       ├── pipe-dev.md
│       ├── pipe-frontend.md
│       ├── create-app.md
│       └── create-prd.md
├── docs/
│   └── sdk.md             # Referência do Pipefy Apps SDK
├── public/                # Frontend estático
│   ├── index.html
│   ├── index.js
│   ├── pipe-view.html
│   ├── card-tab.html
│   ├── manifest.json
│   ├── icons/
│   └── screenshots/
└── .cursor/               # Configuração Cursor (commands, skills, docs)
```

## Caixa de ferramentas para IA

- **Rules (Claude):** `.claude/rules/` — regras de desenvolvimento, frontend e workflows (create-app, create-prd).
- **Commands (Cursor):** `.cursor/commands/` — mesmos workflows no Cursor.
- **Skills (Cursor):** `.cursor/skills/` — pipe-dev, pipe-frontend (conteúdo equivalente em `.claude/rules/`).

## Segurança

- Não crie `.env` ou `.env.example` para configurar token Pipefy. Use sempre a sessão/cookie fornecida pelo SDK (o usuário já está autenticado no Pipefy).
