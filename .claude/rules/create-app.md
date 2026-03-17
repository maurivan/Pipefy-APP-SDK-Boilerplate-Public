# Workflow: Criar Pipefy App

## Gatilho

O usuário descreve o app que quer, por exemplo:

- "visão em gantt"
- "checklist no card"
- "botão no pipe que abre um modal"

**Entrada:** O texto da ideia do app é a única fonte de intenção do que construir.

---

## Objetivo

Criar um Pipefy App funcional que implemente a ideia descrita, usando o **Pipefy Apps SDK** e seguindo os padrões de **Frontend/Design** e **Desenvolvimento** definidos nas regras do projeto.

---

## Referências obrigatórias (ordem de prioridade)

1. **Documentação do SDK (primeiro)** — Ler e seguir estritamente:
   - **`docs/sdk.md`** — Pipefy Apps SDK: script, manifest, init_url, initCall, pipe-view, card-tab, init, render, resizeTo e API `p`. Toda estrutura e uso do SDK devem seguir este documento.

2. **Frontend e design (segundo)** — Aplicar em toda UI e markup:
   - **`.claude/rules/pipe-frontend.md`** — PipeStyle, Lumen tokens, Tailwind, fonte New Order, UI enterprise, sem estética genérica de IA.

3. **Desenvolvimento (terceiro)** — Aplicar em arquitetura e padrões:
   - **`.claude/rules/pipe-dev.md`** — Separação SDK (cliente) e API (dados), inicialização, contexto e diretrizes de desenvolvimento. Usar para estrutura, segurança e integração com o Pipefy.

Em caso de sobreposição ou dúvida, priorize a **doc do SDK** e a **regra de frontend**.

---

## Processo

1. **Interpretar o prompt** — Tratar o texto como a ideia do app (ex.: "visão em gantt" → app que mostra uma visão Gantt).

2. **Esclarecer se necessário** — Se a ideia for vaga, fazer uma pergunta curta para delimitar (ex.: "Deve aparecer como aba no card, view no pipe ou os dois?"). Se estiver claro, não perguntar.

3. **Desenhar a forma do app a partir do SDK** — Usando apenas `docs/sdk.md`:
   - Decidir onde o app aparece: **pipe-view**, **card-tab** ou ambos (e pipe-buttons/card-buttons se fizer sentido).
   - Planejar a página init: init_url → `public/index.html` + `public/index.js` com `PipefyApp.initCall({ 'pipe-view': ... }, { 'card-tab': ... })`.
   - Planejar as páginas de view/tab: `PipefyApp.init()`, `PipefyApp.render()` e, para card-tab, `PipefyApp.resizeTo()`.

4. **Implementar**
   - **Manifest:** Atualizar `public/manifest.json` (name, description, icons, screenshots) conforme o novo app.
   - **Init:** Implementar ou ajustar `public/index.html` e `public/index.js` (initCall, configuração de features).
   - **Views:** Implementar ou ajustar `public/pipe-view.html` e/ou `public/card-tab.html` (e páginas extras se necessário).
   - **UI:** Seguir a regra **pipe-frontend**: Lumen tokens, Tailwind mapeado a tokens, fonte New Order, visual enterprise, sem cores de marca hardcoded, sem estética genérica de IA.
   - **Lógica:** Seguir a regra **pipe-dev**: usar SDK para contexto e UI (modal, sidebar, notificações); usar API só quando o SDK não bastar; assumir sessão existente. **Autenticação:** não criar `.env` ou `.env.example` para configurar token Pipefy; usar sempre a sessão/cookie fornecida pelo SDK.

5. **Entregar** — Produzir ou atualizar os arquivos em `public/` (e manifest) para o app rodar com `npm start` e ser registrado em [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps). Não criar PRDs ou docs de planejamento separados a menos que o usuário peça.

6. **Rodar o app (obrigatório)** — Após implementar, executar no terminal:
   - `npm install`
   - `npm start`

---

## Restrições

- Não inventar métodos do SDK nem campos do manifest; usar apenas o descrito em **`docs/sdk.md`** (e links oficiais lá indicados).
- Não pular a regra de frontend: toda UI deve usar Lumen tokens e orientações PipeStyle de **`.claude/rules/pipe-frontend.md`**.
- Manter o servidor e o layout do projeto: app em `public/`, entrada na página init, views/tabs em HTML (e JS/CSS) como no boilerplate.
- **Não criar `.env` ou `.env.example`** para configurar token Pipefy; usar sempre a sessão/cookie fornecida pelo SDK.
