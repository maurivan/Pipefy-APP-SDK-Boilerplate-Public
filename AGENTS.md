# AGENTS.md

> **Context Map for AI Agents**. Use this file to locate project knowledge.

## Project Context

**Pipefy App SDK Boilerplate** — template for building apps that run inside Pipefy (pipe views, card tabs, etc.).

- **Stack**: Node.js, Express, static frontend (HTML/JS/CSS).
- **Server**: Express on port `process.env.PORT` or 4041; serves the `public/` folder and uses CORS.
- **Integration**: App registered via `public/manifest.json` (name, icons, descriptions in en/pt-BR/es, screenshots). Pipefy loads the app URLs (e.g. `index.html`, `pipe-view.html`, `card-tab.html`) in iframes.
- **Main files**: `server.js` (backend), `public/index.html` + `public/index.js` (main app), `public/pipe-view.html` (pipe view), `public/card-tab.html` (card tab).
- **Goal**: Minimal base to extend and publish an app on the Pipefy platform; UI and logic live in `public/`.

## Quick Start

```bash
npm install                                     # Install dependencies
npm start                               # Start Server
```

## Knowledge Map

### 1. Product & Architecture (Read First)
- **Pipefy App**: definition and screens in `public/manifest.json`, `public/index.html`, `public/pipe-view.html`, `public/card-tab.html`.
- **Cursor command**: `.cursor/commands/create-app.md` — workflow for app development.
- **Skills**: `.cursor/skills/pipe-dev/SKILL.md` (dev), `.cursor/skills/pipe-frontend/SKILL.md` (UI/Design System).

## Organization

### Project Structure
```text
Pipefy-APP-SDK-Boilerplate-main/
├── server.js                 # Express server (port 4041 or PORT)
├── package.json              # Dependencies: express, cors, nodemon
├── package-lock.json
├── AGENTS.md                 # Context for AI agents (reference)
├── .gitignore
│
├── public/                   # Static frontend (served by Express)
│   ├── index.html            # Main app page
│   ├── index.js              # App logic/scripts
│   ├── pipe-view.html        # View in Pipe context (pipe-view)
│   ├── card-tab.html         # Card tab
│   ├── manifest.json         # Pipefy app manifest (name, icons, descriptions)
│   ├── icons/                # Icons (e.g. MyLogo.png)
│   └── screenshots/          # Screenshots for the marketplace
│
└── .cursor/                  # Cursor configuration
    ├── commands/
    │   └── create-app.md     # Command/workflow for the Pipefy app
    └── skills/
        ├── pipe-dev/SKILL.md
        └── pipe-frontend/SKILL.md
```

### AI Toolbox (Available Capabilities)
- **Commands**: `.cursor/commands/` (Workflows like `create-app`)
- **Skills**: `.cursor/skills/` (Specialized agents for Frontend, Design, Developer)

## Key Architectural Patterns

## Security Context
