# Pipefy Apps Client SDK — Knowledge Base

> Consolidated reference for use in Cursor (skills/knowledge-base).  
> Source: [Pipefy Developers](https://developers.pipefy.com/docs/) — Apps Client SDK v1.

---

## 1. Introduction and Getting the SDK

### About the Client SDK

The **Client SDK** lets you interact with the Pipefy Apps framework directly from your iframe. The SDK exposes the global `PipefyApp` object for communication between your app and the Pipefy product.

### Loading the SDK

Import the script from the CDN:

```html
<script src="https://platform.staticpipefy.com/pipefy-app.js"></script>
```

### Using the Client SDK

**On the initial page** (defined by `init_url`):

```javascript
PipefyApp.initCall({
  'pipe-buttons': function(p, pipe) { /* ... */ }
});
```

**In iframes** inside dropdowns, modals, tabs, and sidebars:

```javascript
var p = PipefyApp.init();
```

---

## 2. Getting Pipefy Data

All functions below return a **Promise** (except `p.locale`, which is synchronous).

### p.card(ID)

Returns a Promise with the current card in context.

```javascript
p.card().then(function(card) {
  console.log(card); // { id: '23abc', ... }
});
```

**Sample return:**

```json
{
  "id": "Vtp5gHjo",
  "title": "Hotdog App",
  "assigness": [{ "name": "Jim Yang", "username": "jim yang", "avatar_url": "..." }],
  "labels": [{ "id": 2334, "title": "High", "color": "#CCCCCC" }],
  "field_values": [{ "start_date": "2017-02-19T01:58:08+00:00", "approved": false }],
  "current_phase": { "name": "Doing", "description": "Show time!", "done": false }
}
```

### p.fields()

Returns the fields of the current pipe.

```javascript
p.fields().then((fields) => {
  console.log(fields); // [{ id: "title", ... }]
});
```

### p.pipe()

Returns the current pipe’s attributes.

**Sample return:**

```json
{
  "id": "-Pclaixx",
  "name": "Sprint Planning",
  "organization_name": "Pied Piper",
  "cards_count": 4
}
```

### p.cardAttachments()

Returns card attachments added via `p.attach()`.

```javascript
p.cardAttachments().then((attachments) => {
  console.log(attachments);
  // [{ id: "LPpssdkK", url: "https://...", name: "Shrug 🤷" }]
});
```

### p.timezone()

Returns the user’s timezone (tz database name).

```javascript
p.timezone().then((timezone) => {
  console.log(timezone); // "America/Los_Angeles"
});
```

### p.locale

Returns the user’s locale (synchronous property). E.g. `en-gb`, `pt-br`, `en`, `ru`, `es`, `fr`.

```javascript
const locale = p.locale;
console.log(locale); // "pt-br"
```

---

## 3. Storing and Retrieving Custom Data

### p.set(scope, visibility, key, value)

Stores data in Pipefy scoped to a `card`, `pipe`, or `organization`. Apps can only access their own stored data.

| Scope         | Description |
|---------------|-------------|
| organization  | Data available to all pipes in the organization. |
| pipe          | Data scoped to the pipe; other pipes cannot access it. |
| card          | Data scoped to the card; other cards/pipes cannot access it. |

| Visibility | Description |
|------------|-------------|
| private    | Only the current user (e.g. personal API tokens). |
| public     | Other users can access the same data. |

```javascript
p.set('pipe', 'private', 'token', 'VERY_IMPORTANT_TOKEN');
p.set('card', 'public', 'emoji', '😈');
```

### p.get(scope, visibility, key)

Retrieves data stored by the app.

```javascript
p.get('pipe', 'private', 'token').then((token) => {
  console.log(token);
}).catch((error) => {
  console.log(error);
});
```

### p.attach({ url, name })

Attaches a link to the card. Apps can later “claim” these attachments and render them.

```javascript
p.attach({
  url: 'https://github.com/piedpiper/hotdog-app/pull/1000',
  name: 'Hotdog App PR #1000'
}).then((result) => {
  console.log(result);
});
```

### p.detach(id)

Removes a link from the card. Apps can only detach attachments that the same app attached.

```javascript
p.detach('231jasd').then((result) => {
  console.log(result); // true
});
```

---

## 4. User Interface (UI) Functions

### Sidebar

- **p.sidebar({ title, url })** — Opens a sidebar with title and iframe URL.
- **p.closeSidebar()** — Closes the sidebar in the current context.

```javascript
p.sidebar({
  title: 'Sidebar with Flags',
  url: './sidebar.html',
});
p.closeSidebar();
```

### Modal

- **p.modal({ url, width, height })** — Opens a modal. `width` and `height` in pixels or percentage (e.g. `500px`, `50%`).
- **p.closeModal()** — Closes the modal.

```javascript
p.modal({
  url: './modal.html',
  height: '70%',
  width: '70%',
});
p.closeModal();
```

To resize later: `PipefyApp.resizeTo(selector)`.

### Card

- **p.openCard(id)** — Opens the card by ID.
- **p.closeCard()** — Closes the currently open card.

```javascript
p.openCard('23123');
p.closeCard();
```

### Dropdown

- **p.dropdown(options)** — Opens a dropdown. Options: `title`, `items` (list with `title` and `callback`) or `url` (iframe), and optionally `height`.

```javascript
// List with callbacks
p.dropdown({
  title: 'Emoji app',
  items: [
    { title: '😈 Set Card Emoji', callback: function(p) { /* ... */ } },
    { title: '😎 Open Modal', callback: function(p) { p.modal(/* ... */); } },
    { title: '👋 Close card', callback: function(p) { p.closeCard(); } },
  ]
});

// Dropdown with iframe
p.dropdown({
  title: 'Select Card Emoji',
  url: './set-emoji.html',
  height: '500px',
});
```

- **p.closeDropdown()** — Closes the dropdown (useful after an item callback).

### Search

**p.search(options)** — Opens a search dropdown. Parameters:

- **items**: function `(p, query)` that returns a Promise of an array of `{ title, callback }`
- **loading**: text shown while loading
- **empty**: text when no results
- **placeholder**: input placeholder
- **title**: dropdown title

```javascript
p.search({
  title: 'Select Emoji',
  placeholder: 'Search Emoji',
  empty: 'No Emoji found',
  loading: 'Looking for Emoji...',
  items: function(p, query) {
    return new Promise(function(resolve) {
      const filtered = query
        ? window.emojis_urls.filter(e => e.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        : window.emojis_urls;
      resolve(filtered.map(e => ({
        title: e.name + ' ' + e.emoji,
        callback: function(p) { /* ... */ }
      })));
    });
  },
});
```

### Notification

**p.showNotification(text, type)** — In-app notification. `type`: `'success'` or `'error'`.

```javascript
p.showNotification('🎉 Sample success notification', 'success');
p.showNotification('😢 Sample error notification', 'error');
```

### p.render(callback) / PipefyApp.render(callback)

In the official docs it appears as *"Building…"* (in progress). In the [Pipefy Community](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916) it is used in apps like Calendar: the callback runs in the view’s render cycle. Example from real app code:

```javascript
PipefyApp.render(function () {
  return null;
});
```

Use sparingly; the API may change as it is not officially documented yet.

### Resize iframe

**PipefyApp.resizeTo(selector)** — Resizes the iframe (dropdown/modal) to the selected element’s width and height.

```javascript
PipefyApp.resizeTo('#attachments');
```

---

## 5. Authentication (community)

### p.getAuthToken()

Returns a **Promise** with the user’s authentication token. Useful to integrate external HTTP/GraphQL clients (e.g. Apollo Client) using Pipefy credentials. Not detailed in official docs; usage confirmed in the community (e.g. [Calendar app](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916)).

```javascript
var p = PipefyApp.init();
p.getAuthToken().then(function (token) {
  // use token with Apollo Client, fetch, etc.
  var client = createApolloClient(token, 'internal_api');
});
```

---

## 6. Pipe view (undocumented feature)

To show the app **inside** the Pipefy UI (like the Calendar app) instead of opening in a new window when clicking the pipe button, the **pipe-view** feature is used; it is not yet documented in the official docs. It is configured in the app’s **manifest**; the page defined in `init_url` is shown embedded in the pipe view.

Community references:

- [Apps Client SDK](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916) topic (e.g. reply about *pipe-view* and “Sample React App with Pipe Views”).
- Calendar app code (manifest + HTML) mentioned in the same discussion.

If the goal is to “open like Calendar” (content inside Pipefy), look in the manifest for the option related to **pipe-view** and the behavior of `PipefyApp.initCall` / `init_url` for that mode.

---

## 7. Promises

All communication between the app and Pipefy uses Promises. The SDK includes **Bluebird**:

```javascript
var Promise = PipefyApp.Promise;
```

References: [Bluebird](http://bluebirdjs.com/docs/getting-started.html), [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

---

## 8. API Calls (GraphQL)

Calls use the authenticated user’s permissions.

### p.query(query, variables)

Runs a GraphQL **query**.

- **query**: query string (only operations of type `query`).
- **variables** (optional): variables object for queries with an operation name.

Returns a **Promise** whose result may have `data` and/or `errors`.

**Examples:**

```javascript
// Simple query
p.query('{ me { id } }').then(function(result) {
  console.log(result); // { data: { me: { id: "123", __typename: "User" } } }
});

// With operation name
const cardTitleQuery = `
  query CardTitle {
    card(id: 1234) {
      title
    }
  }`;
p.query(cardTitleQuery).then(function(result) {
  console.log(result); // { data: { card: { title: "My Card", __typename: "Card" } } }
});

// With variables (e.g. app pipeId)
const pipeNameQuery = `
  query PipeName($pipeId: ID!) {
    pipe(id: $pipeId) {
      name
    }
  }`;
const variables = { pipeId: p.app.pipeId };
p.query(pipeNameQuery, variables).then(function(result) {
  console.log(result);
});
```

Error handling: the result can include `errors` along with `data` (e.g. permission denied on a field).

### p.mutation(mutation, variables)

Runs a GraphQL **mutation**.

- **mutation**: mutation string (only operations of type `mutation`).
- **variables** (optional): variables object.

**Examples:**

```javascript
// Create card
const createCardMutation = `
  mutation {
    createCard(input: {pipe_id: ${p.app.pipeId}, title: "New card"}) {
      card { id }
    }
  }`;
p.mutation(createCardMutation).then(function(result) {
  console.log(result);
});

// With operation name
const deleteCardMutation = `
  mutation deleteCard {
    deleteCard(input: { id: 1234 }) {
      success
    }
  }`;
p.mutation(deleteCardMutation).then(function(result) {
  console.log(result); // { data: { deleteCard: { success: true, ... } } }
});
```

Variable usage and error shape: same as in the `p.query` examples.

---

## Quick reference (cheat sheet)

| Category  | Main functions |
|-----------|----------------|
| Data      | `p.card()`, `p.pipe()`, `p.fields()`, `p.cardAttachments()`, `p.timezone()`, `p.locale` |
| Storage   | `p.set(scope, visibility, key, value)`, `p.get(scope, visibility, key)` |
| Attachments | `p.attach({ url, name })`, `p.detach(id)` |
| UI        | `p.sidebar()`, `p.closeSidebar()`, `p.modal()`, `p.closeModal()`, `p.openCard(id)`, `p.closeCard()`, `p.dropdown()`, `p.closeDropdown()`, `p.search()`, `p.showNotification(text, type)`, `p.render()` / `PipefyApp.render()` |
| API       | `p.query(query, variables)`, `p.mutation(mutation, variables)` |
| Auth      | `p.getAuthToken()` (community) |
| Init      | `PipefyApp.initCall({ ... })`, `p = PipefyApp.init()` |
| Utils     | `PipefyApp.Promise`, `PipefyApp.resizeTo(selector)` |
| Manifest  | **pipe-view** (undocumented) — show app inside pipe view, like Calendar |

---

## Sources

- **Official docs:** [Pipefy Developers](https://developers.pipefy.com/docs/) — Getting the SDK, Store/Retrieve Custom Data, Get Pipefy Data, User Interface Functions, Promises, Make API Calls.
- **Community:** [Apps Client SDK | Pipefy Community](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916) — topic with SDK summary, questions about `p.render`, **pipe-view**, and `getAuthToken()` example in the Calendar app.
