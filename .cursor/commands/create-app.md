---
description: Create a Pipefy App from a short prompt (e.g. "visão em gantt"). Uses SDK, pipe-frontend and pipe-dev skills.
globs:
alwaysApply: false
---

# Command: Create Pipefy App

## Trigger

The user invokes this command with a **prompt** describing the app they want, for example:

- `/create-app visão em gantt`
- `/create-app checklist no card`
- `/create-app botão no pipe que abre um modal`

**Input:** Everything after `/create-app` is the **user prompt** (the app idea). Use it as the single source of intent for what to build.

---

## Goal

Create a working Pipefy App that implements the idea described in the user prompt, using the **Pipefy Apps SDK**, following **Frontend/Design** and **Development** standards defined in the project skills.

---

## Mandatory References (priority order)

1. **SDK documentation (first)** — Read and follow strictly:
   - **`.cursor/docs/sdk.md`** — Pipefy Apps SDK: loading script, `manifest.json`, `init_url`, `PipefyApp.initCall()`, `pipe-view`, `card-tab`, `PipefyApp.init()`, `PipefyApp.render()`, `PipefyApp.resizeTo()`, and the `p` API. All app structure and SDK usage must match this document.

2. **Frontend & Design (second)** — Apply for all UI and markup:
   - **`.cursor/skills/pipe-frontend/SKILL.md`** — PipeStyle, Lumen tokens, Tailwind, New Order font, enterprise UI, no generic AI aesthetics. Use for layout, components, and visual consistency.

3. **Development (third)** — Apply for architecture and patterns:
   - **`.cursor/skills/pipe-dev/SKILL.md`** — Separation between SDK (client) and API (data), initialization, context, and senior dev guidelines. Use for structure, security, and integration with Pipefy.

Always prioritize **SDK doc** and **frontend skill** when there is any overlap or doubt.

---

## Process

1. **Parse the user prompt**  
   Treat the full text after `/create-app` as the app idea (e.g. "visão em gantt" → an app that shows a Gantt view).

2. **Clarify if needed**  
   If the idea is too vague, ask exactly one short question to narrow scope (e.g. "Deve aparecer como aba no card, view no pipe, ou os dois?"). If it’s clear enough, do not ask.

3. **Design the app shape from the SDK**  
   Using **only** `.cursor/docs/sdk.md`:
   - Decide where the app appears: **pipe-view**, **card-tab**, or both (and pipe-buttons/card-buttons if relevant).
   - Plan the init page: `init_url` → `public/index.html` + `public/index.js` with `PipefyApp.initCall({ 'pipe-view': ... }, { 'card-tab': ... })`.
   - Plan view/tab pages: `PipefyApp.init()`, `PipefyApp.render()`, and for card-tab `PipefyApp.resizeTo()`.

4. **Implement**  
   - **Manifest:** Update `public/manifest.json` (name, description, icons, screenshots) to match the new app.
   - **Init:** Implement or adjust `public/index.html` and `public/index.js` (initCall, feature config).
   - **Views:** Implement or adjust `public/pipe-view.html` and/or `public/card-tab.html` (and extra pages if needed).
   - **UI:** Follow **pipe-frontend** skill: Lumen tokens, Tailwind mapped to tokens, New Order font, enterprise look, no hardcoded brand colors, no generic AI aesthetics.
   - **Logic:** Follow **pipe-dev** skill: use SDK for context and UI (modal, sidebar, notifications); use API only when SDK is not enough; assume existing session. **Authentication:** never create `.env` or `.env.example` files to configure a Pipefy token; always use the session/cookie provided by the SDK (the user is already authenticated in Pipefy; API calls must use the context/session provided by the SDK).
   * **Existing Session:** Assume the user is already authenticated. Do not implement new login flows or credential prompts.
   * **Token/Cookie Persistence:** Ensure all API requests utilize the existing Pipefy session tokens or cookies available in the environment/browser context to maintain authorized access.

5. **Deliver**  
   Produce or update the files under `public/` (and manifest) so the app runs with `npm start` and can be registered at [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps). Do not create PRDs or separate planning docs unless the user explicitly asks.

6. **Run the app (required)**  
   Always after completing the implementation, run in the terminal:
   - `npm install` — install dependencies.
   - `npm start` — start the server so the user can test the app.

---

## Constraints

- Do not invent SDK methods or manifest fields; use only what is described in **`.cursor/docs/sdk.md`** (and official links there if needed).
- Do not skip the frontend skill: all UI must use Lumen tokens and PipeStyle guidance from **`.cursor/skills/pipe-frontend/SKILL.md`**.
- Keep the existing server and project layout: app lives in `public/`, entry is the init page, views/tabs are HTML (and JS/CSS) as in the boilerplate.
- **Do not create `.env` or `.env.example`** files to configure a Pipefy token. Always use the session/cookie provided by the SDK (user is already authenticated in Pipefy).

---

## Example (for the AI)

**User:** `/create-app visão em gantt`

**Interpretation:** Build an app that shows a Gantt view (e.g. of cards/phases or dates). Decide whether it’s pipe-view, card-tab, or both from the SDK doc. Use initCall to register the feature(s). Implement the view(s) with PipefyApp.init(), render(), and resizeTo() for card-tab. Style with Lumen + Tailwind per pipe-frontend. Use pipe-dev for context and API usage if needed.

Then implement the files under `public/` and update the manifest accordingly.