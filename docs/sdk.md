# Pipefy Apps Client SDK — Referência

> Referência consolidada para Cursor (skills/knowledge-base) e Claude (rules).  
> Fonte: [Pipefy Developers](https://developers.pipefy.com/docs/) — Apps Client SDK v1.

---

## 1. Introdução e carregamento do SDK

O **Client SDK** permite interagir com o framework Pipefy Apps a partir do seu iframe. Expõe o objeto global `PipefyApp`.

### Carregar o SDK

```html
<script src="https://platform.staticpipefy.com/pipefy-app.js"></script>
```

Opcional: estilos do app para UI consistente:

```html
<link rel="stylesheet" href="https://app.pipefy.com/apps/style.css" />
```

---

## 2. Entrada do app e manifest

- O app é definido por um **manifest** em uma URL registrada em [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps).
- O **`init_url`** do manifest é a primeira página que o Pipefy carrega no iframe (ex.: `./` ou `./index.html`).
- Nessa página é **obrigatório** carregar `pipefy-app.js` e chamar **`PipefyApp.initCall()`** para registrar as features (pipe-view, card-tab, pipe-buttons, etc.).

Ver [Manifest reference](https://developers.pipefy.com/docs/manifestjson) para todas as propriedades.

---

## 3. Registrar features: `PipefyApp.initCall()`

Na página **init** (apontada por `init_url`), chame `PipefyApp.initCall()` com um objeto que mapeia nomes de feature para funções. Cada handler recebe `(p, pipe)` e retorna a configuração da feature.

### 3.1 Pipe view (`pipe-view`)

Registra uma view no nível do pipe. Retorne um objeto com:

| Propriedade | Descrição |
|-------------|-----------|
| `icon` | URL do ícone (ex.: `./icons/MyLogo.png`) |
| `text` | Label (ex.: `"My Pipefy App"`) |
| `url` | URL da página da view (ex.: `./pipe-view.html`) |

Exemplo:

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

Adiciona uma aba dentro do card. Retorne um objeto com:

| Propriedade | Descrição |
|-------------|-----------|
| `title` | Título da aba |
| `icon` | URL do ícone da aba |
| `url` | URL da página da aba (ex.: `./card-tab.html`) |
| `buttons` | Opcional: array de botões no rodapé |

Exemplo:

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

### 3.3 Outras features (pipe-buttons, card-buttons, card-badges)

- **`pipe-buttons`**: handler retorna um **array** de botões no pipe. Cada item: `icon`, `text`, `url` (e opcional `target`, ex. `'blank'`) ou `callback`.
- **`card-buttons`** / **`card-badges`**: mesma ideia no nível do card. Declare as features em `manifest.json` em `features` (ex.: `["pipe-view", "card-tab"]`).

---

## 4. Dentro de uma view ou card-tab: init, render, resize

Nas páginas carregadas como **pipe-view** ou **card-tab**:

1. **Inicializar** o SDK para obter o objeto `p`.
2. **Render** quando o Pipefy estiver pronto (iframe visível, contexto disponível).
3. **Resize** (principalmente em card-tab) para a altura do iframe acompanhar o conteúdo.

### 4.1 Inicializar

```javascript
const p = PipefyApp.init();
```

`p` é a instância do SDK (dados e UI: `p.card()`, `p.pipe()`, `p.set()`, `p.modal()`, etc.).

### 4.2 Render (quando o Pipefy estiver pronto)

Envolva a lógica da UI em `PipefyApp.render()` para rodar após o handshake com o Pipefy:

```javascript
PipefyApp.render(function () {
  // Seguro usar DOM e SDK aqui
});
```

### 4.3 Resize (card-tab)

No iframe de **card-tab**, informe ao Pipefy para redimensionar o iframe conforme um elemento:

```javascript
PipefyApp.render(function () {
  PipefyApp.resizeTo('#card-tab');  // seletor do container principal
});
```

---

## 5. Dados do Pipefy

As funções abaixo retornam **Promise** (exceto `p.locale`, síncrono).

### p.card()

Retorna uma Promise com o card atual no contexto.

```javascript
p.card().then(function(card) {
  console.log(card); // { id: '23abc', ... }
});
```

### p.fields()

Retorna os campos do pipe atual.

```javascript
p.fields().then((fields) => {
  console.log(fields); // [{ id: "title", ... }]
});
```

### p.pipe()

Retorna os atributos do pipe atual.

### p.cardAttachments()

Retorna anexos do card adicionados via `p.attach()`.

### p.timezone()

Retorna o timezone do usuário (nome tz database).

### p.locale

Propriedade síncrona com o locale do usuário (ex.: `pt-br`, `en`, `es`).

```javascript
const locale = p.locale;
```

---

## 6. Armazenar e recuperar dados customizados

### p.set(scope, visibility, key, value)

Armazena dados no Pipefy com escopo `card`, `pipe` ou `organization`.

| Scope | Descrição |
|-------|-----------|
| organization | Dados disponíveis para todos os pipes da organização. |
| pipe | Dados do pipe; outros pipes não acessam. |
| card | Dados do card; outros cards/pipes não acessam. |

| Visibility | Descrição |
|------------|-----------|
| private | Apenas o usuário atual. |
| public | Outros usuários podem acessar. |

### p.get(scope, visibility, key)

Recupera dados armazenados pelo app.

### p.attach({ url, name })

Anexa um link ao card.

### p.detach(id)

Remove um link do card (apenas anexos que o próprio app adicionou).

---

## 7. Interface (UI)

### Sidebar

- **p.sidebar({ title, url })** — Abre sidebar com título e URL do iframe.
- **p.closeSidebar()** — Fecha a sidebar.

### Modal

- **p.modal({ url, width, height })** — Abre modal. `width` e `height` em pixels ou porcentagem.
- **p.closeModal()** — Fecha o modal.
- Para redimensionar depois: `PipefyApp.resizeTo(selector)`.

### Card

- **p.openCard(id)** — Abre o card pelo ID.
- **p.closeCard()** — Fecha o card atual.

### Dropdown

- **p.dropdown(options)** — Abre dropdown. Opções: `title`, `items` (array com `title` e `callback`) ou `url` (iframe), e opcionalmente `height`.
- **p.closeDropdown()** — Fecha o dropdown.

### Search

**p.search(options)** — Abre dropdown de busca. Parâmetros: `items` (função `(p, query)` que retorna Promise de array `{ title, callback }`), `loading`, `empty`, `placeholder`, `title`.

### Notificação

**p.showNotification(text, type)** — Notificação in-app. `type`: `'success'` ou `'error'`.

### PipefyApp.render(callback)

O callback roda no ciclo de render da view. Usar com moderação; API pode mudar.

### PipefyApp.resizeTo(selector)

Redimensiona o iframe (dropdown/modal) para as dimensões do elemento indicado.

---

## 8. Autenticação (comunidade)

### p.getAuthToken()

Retorna uma **Promise** com o token de autenticação do usuário. Útil para integrar clientes HTTP/GraphQL externos (ex.: Apollo Client) usando credenciais Pipefy. Confirmado na comunidade (ex.: app Calendar).

---

## 9. Chamadas de API (GraphQL)

As chamadas usam as permissões do usuário autenticado.

**Contexto do app:** `p.app.pipeId` — ID do pipe atual; sempre numérico. Use em GraphQL `pipe(id: ...)` e em mutations (ex.: `pipe_id` em `createCard`).

### p.query(query, variables)

Executa uma **query** GraphQL. Retorna Promise com `data` e/ou `errors`.

### p.mutation(mutation, variables)

Executa uma **mutation** GraphQL.

---

## 10. Promises

A comunicação entre o app e o Pipefy usa Promises. O SDK inclui **Bluebird**:

```javascript
var Promise = PipefyApp.Promise;
```

---

## Referência rápida

| Categoria | Principais funções |
|-----------|---------------------|
| Dados | `p.card()`, `p.pipe()`, `p.fields()`, `p.cardAttachments()`, `p.timezone()`, `p.locale` |
| Storage | `p.set()`, `p.get()` |
| Anexos | `p.attach()`, `p.detach()` |
| UI | `p.sidebar()`, `p.closeSidebar()`, `p.modal()`, `p.closeModal()`, `p.openCard()`, `p.closeCard()`, `p.dropdown()`, `p.closeDropdown()`, `p.search()`, `p.showNotification()`, `PipefyApp.render()` |
| API | `p.query()`, `p.mutation()` |
| Auth | `p.getAuthToken()` (comunidade) |
| Init | `PipefyApp.initCall()`, `p = PipefyApp.init()` |
| Utils | `PipefyApp.Promise`, `PipefyApp.resizeTo(selector)` |
| Manifest | **pipe-view** — exibir app dentro da view do pipe (ex.: Calendar) |

---

## Segurança e hosting

- O app roda em **iframes** e deve ser servido por **HTTPS** em produção.
- Em desenvolvimento local, use um túnel (ex.: ngrok, localtunnel) e aponte as URLs do app e do manifest em [app.pipefy.com/developers/apps](https://app.pipefy.com/developers/apps) para essa URL HTTPS.

---

## Referências

- [Build your first Pipefy app](https://developers.pipefy.com/docs/build-your-first-pipefy-app)
- [Manifest reference](https://developers.pipefy.com/docs/manifestjson)
- [Card tab](https://developers.pipefy.com/docs/card-tab)
- [Pipefy Developers](https://developers.pipefy.com/)
- [Apps Client SDK (Community)](https://community.pipefy.com/customs-apps-integrations-75/apps-client-sdk-916)
