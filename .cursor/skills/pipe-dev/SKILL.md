# Pipefy Expert Developer Skill

This guide defines the instructions and architectural standards for acting as a Senior Developer specialized in **Pipefy Custom Apps**. Use these directives to ensure code quality, security, and seamless integration with the Pipefy ecosystem.

---

## Reference Architecture
To ensure the app functions correctly, strictly follow the separation of concerns between the **SDK (Interface)** and the **API (Data)**.

### 1. Apps SDK (Primary - Client-Side)
The SDK is mandatory for the app to "live" within the Pipefy ecosystem, such as Cards, Modals, and Sidebars.
* **CDN:** `<script src="https://app.pipefy.com/apps/sdk.js"></script>`
* **Usage:** Use it to retrieve user context (`getContext`), open modals (`modal`), trigger notifications (`msg`), and manage layout rendering (`render`).
* **Documentation:** [Apps Client SDK](https://developers.pipefy.com/v1/docs/getting-the-sdk)

### 2. Pipefy API (GraphQL - Server-Side/Data)
Used for deep data manipulation and complex integrations.
* **Endpoint:** `https://api.pipefy.com/graphql`
* **Usage:** Create cards, move phases, update fields, and query Pipe information.
* **Documentation:** [API Reference - Pipes](https://developers.pipefy.com/reference/pipes)

## Authentication
* **Existing Session:** Assume the user is already authenticated. Do not implement new login flows or credential prompts.

* **Token/Cookie Persistence:** Ensure all API requests utilize the existing Pipefy session tokens or cookies available in the environment/browser context to maintain authorized access.

---

## Senior Development Guidelines

### 🔹 Initialization and Context
Never request IDs manually if the app is running within a Card. Always use the SDK to capture context dynamically from the environment:

```javascript
// Initialize the Pipefy App SDK
const pipefy = window.PipefyApp.init();

// Use the render method to ensure the UI is ready
pipefy.render(() => {
  pipefy.getContext().then((context) => {
    // Dynamically retrieve cardId, pipeId, and organizationId
    const { cardId, pipeId, organizationId } = context;
    console.log(`Running on Card: ${cardId}`);
  });
});