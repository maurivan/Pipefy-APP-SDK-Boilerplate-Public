# Pipefy App SDK Boilerplate

Template to build Pipefy Apps that run inside Pipefy (pipe views, card tabs, etc.). Use this repo as a base to create and publish your own app.

---

## How to run this app on Pipefy

### 1. Create the app in Pipefy

1. Go to **[app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps)** and sign in.
2. Click **"Create new app"** (or equivalent).
3. Fill in the app details. You will need a **URL** where your app is served (see "Run locally" below).
4. Use the **manifest** URL: point to your `manifest.json` (e.g. `https://your-domain.com/manifest.json` for production, or your tunnel URL for local dev).
5. Pipefy will read `manifest.json` to get the app name, icons, descriptions, and which URLs to open for the app home, pipe view, and card tab.

### 2. Run locally

1. **Clone and install:**
   ```bash
   git clone <this-repo-url>
   cd Pipefy-APP-SDK-Boilerplate-main
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   The app runs at **http://localhost:4041** (or the port set in `PORT`).

3. **Expose to the internet (for Pipefy to load your app):**  
   Pipefy loads your app in iframes, so your dev server must be reachable via HTTPS. Use a tunnel (e.g. [ngrok](https://ngrok.com), [localtunnel](https://localtunnel.github.io/www/)):
   ```bash
   npx localtunnel --port 4041
   ```
   Use the generated HTTPS URL as the app base URL in the Pipefy developer console (e.g. `https://xxx.loca.lt`).

4. **Register the app in Pipefy:**  
   In [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps), set your app URL to the tunnel URL (e.g. `https://xxx.loca.lt`) and the manifest URL to `https://xxx.loca.lt/manifest.json`. Save and install the app in a pipe to test.

---

## Using this repo as a boilerplate

1. **Fork or clone** this repository.
2. **Customize** `public/manifest.json`: change `name`, `short_name`, descriptions, and icon/screenshots paths.
3. **Edit** the HTML/JS in `public/` to build your UI and logic (`index.html`, `pipe-view.html`, `card-tab.html`, `index.js`).
4. **Replace** `public/icons/MyLogo.png` and `public/screenshots/screenshot.png` with your own assets.
5. **Deploy** the `public/` folder (and optionally `server.js`) to a host that serves over HTTPS, then point your Pipefy app to that URL and manifest.

---

## What each file is for

| File / folder | Purpose |
|---------------|--------|
| **server.js** | Express server: serves the `public/` folder, CORS enabled, listens on `process.env.PORT` or 4041. Run this to serve the app locally. |
| **package.json** | Project metadata and dependencies (express, cors, nodemon). `npm start` runs the server with nodemon. |
| **public/** | Static frontend. All app pages and assets. Pipefy loads these URLs in iframes. |
| **public/manifest.json** | Pipefy app manifest: app name, short/long descriptions (en, pt-BR, es), icons, screenshots, theme colors. Required for the app to appear correctly in Pipefy. |
| **public/index.html** | Main app entry. Loads Pipefy Apps SDK (`pipefy-app.js`) and `index.js`. The `init_url` in the manifest usually points here (`./`). |
| **public/index.js** | Your main app logic and behavior (e.g. SDK usage, API calls). |
| **public/pipe-view.html** | Page shown when the app is opened in **Pipe context** (pipe view). Uses Pipefy SDK and Pipefy styles. |
| **public/card-tab.html** | Page shown when the app is opened as a **card tab**. Uses Pipefy SDK; layout is adapted for the card panel. |
| **public/icons/** | App icons (e.g. `MyLogo.png`). Referenced in `manifest.json`. |
| **public/screenshots/** | Screenshots for the Pipefy app listing (e.g. `screenshot.png`). Referenced in `manifest.json`. |
| **docs/sdk.md** | Pipefy Apps SDK documentation: script loading, initCall, pipe-view, card-tab, render, resizeTo, and the `p` API. |

---

## Documentation

- **[docs/sdk.md](docs/sdk.md)** — Pipefy Apps SDK reference: loading the SDK, `initCall`, pipe-view, card-tab, `PipefyApp.init()` / `render()` / `resizeTo()`, and the `p` API (data, UI, context). Use it when implementing or extending app features.

## Requirements

- **Node.js** (LTS recommended)
- **npm** (comes with Node)
- For local testing with Pipefy: a **tunnel** (ngrok, localtunnel, etc.) so your app is reachable over HTTPS.
