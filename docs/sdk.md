# Pipefy Apps SDK — Developer reference

This document summarizes the **Pipefy Apps Client SDK** used to build apps that run inside Pipefy (pipe views, card tabs, pipe/card buttons, etc.). For the official portal, see [Pipefy Developers](https://developers.pipefy.com/) and [Build your first Pipefy app](https://developers.pipefy.com/docs/build-your-first-pipefy-app).

---

## 1. Loading the SDK

Include the client script on every page that needs to talk to Pipefy. The SDK exposes a global `PipefyApp` object and enables cross-frame communication between your app and the platform.

```html
<script src="https://platform.staticpipefy.com/pipefy-app.js"></script>
```

Optional: use Pipefy’s app styles for consistent UI:

```html
<link rel="stylesheet" href="https://app.pipefy.com/apps/style.css" />
```

---

## 2. App entry and manifest

- Your app is defined by a **manifest** at a URL you register in [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps).
- The manifest’s **`init_url`** is the first page Pipefy loads in an iframe (e.g. `./` or `./index.html`).
- On that page you **must** load `pipefy-app.js` and call **`PipefyApp.initCall()`** to register which features your app provides (pipe-view, card-tab, pipe-buttons, etc.).

See [Manifest reference](https://developers.pipefy.com/docs/manifestjson) for all manifest properties (`name`, `short_description`, `description`, `icon`, `init_url`, `screenshots`, `features`, etc.).

---

## 3. Registering features: `PipefyApp.initCall()`

On the **init** page (the one pointed by `init_url`), call `PipefyApp.initCall()` with an object that maps feature names to handler functions. Each handler receives `(p, pipe)` and returns the configuration for that feature.

### 3.1 Pipe view (`pipe-view`)

Registers a view available at pipe level (e.g. a dedicated tab or button that opens a full view). Return an object with:

| Property | Description |
|----------|-------------|
| `icon`   | URL to the button/entry icon (e.g. `./icons/MyLogo.png`) |
| `text`   | Label (e.g. `"My Pipefy App"`) |
| `url`    | URL of the page that implements the view (e.g. `./pipe-view.html`) |

Example (from this boilerplate):

```javascript
PipefyApp.initCall({
  'pipe-view': function (p, pipe) {
    return {
      icon: './icons/MyLogo.png',
      text: 'My Pipefy App',
      url: './pipe-view.html',
    };
  },
});
```

### 3.2 Card tab (`card-tab`)

Adds a tab inside the card. Return an object with:

| Property | Description |
|----------|-------------|
| `title`  | Tab title shown in the card |
| `icon`   | URL to the tab icon |
| `url`    | URL of the page that renders the tab content (e.g. `./card-tab.html`) |
| `buttons`| Optional array of footer buttons (e.g. `[{ text: 'Save', callback: fn }]`) |

Example:

```javascript
PipefyApp.initCall({
  'card-tab': function (p, pipe) {
    return {
      title: 'My Pipefy App',
      icon: './icons/MyLogo.png',
      url: './card-tab.html',
      buttons: [],
    };
  },
});
```

### 3.3 Other features (pipe-buttons, card-buttons, card-badges)

- **`pipe-buttons`**: handler returns an **array** of buttons at pipe level. Each item: `icon`, `text`, `url` (and optional `target`, e.g. `'blank'`) or `callback`.
- **`card-buttons`** / **`card-badges`**: similar idea at card level. Declare the features you use in `manifest.json` under `features` (e.g. `["pipe-view", "card-tab"]`).

---

## 4. Inside a view or card-tab page: init, render, resize

On pages loaded as **pipe-view** or **card-tab** (or similar), you typically:

1. **Initialize** the SDK to get the `p` API object.
2. **Render** when Pipefy is ready (so the iframe is visible and context is available).
3. **Resize** (especially in card-tab) so the iframe height matches your content.

### 4.1 Initialize

```javascript
const p = PipefyApp.init();
```

`p` is the SDK instance used for data and UI (e.g. `p.card()`, `p.pipe()`, `p.set()`, `p.modal()`).

### 4.2 Render (when Pipefy is ready)

Wrap your UI logic in `PipefyApp.render()` so it runs after the handshake with Pipefy:

```javascript
PipefyApp.render(function () {
  // Safe to use DOM and SDK here
});
```

### 4.3 Resize (card-tab)

In a **card-tab** iframe, tell Pipefy to resize the iframe to match a given element so the tab doesn’t show a fixed small height:

```javascript
PipefyApp.render(function () {
  PipefyApp.resizeTo('#card-tab');  // selector of the main content container
});
```

Use a container with enough height (or min-height) so the content fits; the iframe will expand accordingly.

---

## 5. SDK instance `p` — data and UI (overview)

The object returned by `PipefyApp.init()` provides APIs for data and UI. Typical methods (names may vary by SDK version; check the client script or community docs):

| Area   | Methods (examples) | Description |
|--------|---------------------|-------------|
| Data   | `p.card()`, `p.pipe()`, `p.fields()` | Current card, pipe, fields |
| Storage| `p.set()`, `p.get()` | Persist data scoped to card/pipe/org |
| Attachments | `p.attach()`, `p.detach()` | Manage card attachments |
| UI    | `p.modal()`, `p.sidebar()`, `p.dropdown()`, `p.search()` | Open modal, sidebar, dropdown, search |
| Card  | `p.openCard()`, `p.closeCard()` | Control card display |
| Notify| `p.showNotification()` | Show in-app notification |
| Context | `p.timezone()`, `p.locale` | User timezone and locale |

For the exact API of your SDK version, see [Apps Client SDK (Community)](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916) and the official [Pipefy Developers](https://developers.pipefy.com/) docs.

---

## 6. Security and hosting

- Your app runs in **iframes** and must be served over **HTTPS** when used in Pipefy (required for iframes in production).
- For local development, use a tunnel (e.g. ngrok, localtunnel) and point the app and manifest URLs in [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps) to that HTTPS URL.

---

## 7. References

- [Build your first Pipefy app](https://developers.pipefy.com/docs/build-your-first-pipefy-app)
- [Manifest reference](https://developers.pipefy.com/docs/manifestjson)
- [Card tab](https://developers.pipefy.com/docs/card-tab)
- [Pipefy Developers](https://developers.pipefy.com/)
- [Apps Client SDK (Community)](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916)
