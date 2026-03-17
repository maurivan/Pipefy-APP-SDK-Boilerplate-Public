# Pipefy Expert Developer — Regras de desenvolvimento

Guia de instruções e padrões arquiteturais para atuar como desenvolvedor sênior especializado em **Pipefy Custom Apps**. Use estas diretrizes para garantir qualidade de código, segurança e integração com o ecossistema Pipefy.

---

## Arquitetura de referência

Respeite a separação entre **SDK (interface)** e **API (dados)**.

### 1. Apps SDK (principal — client-side)

O SDK é obrigatório para o app “viver” dentro do Pipefy (cards, modais, sidebars).

- **CDN:** `<script src="https://app.pipefy.com/apps/sdk.js"></script>`
- **Uso:** obter contexto do usuário (`getContext`), abrir modais (`modal`), notificações (`msg`), gerenciar layout (`render`).
- **Documentação:** [Apps Client SDK](https://developers.pipefy.com/v1/docs/getting-the-sdk)

### 2. Pipefy API (GraphQL — server-side/dados)

Usada para manipulação profunda de dados e integrações complexas.

- **Endpoint:** `https://api.pipefy.com/graphql`
- **Uso:** criar cards, mover fases, atualizar campos, consultar Pipes.
- **Documentação:** [API Reference - Pipes](https://developers.pipefy.com/reference/pipes)

## Autenticação

- **Sessão existente:** Assuma que o usuário já está autenticado. Não implemente novos fluxos de login nem prompts de credenciais.
- **Token/cookie:** Garanta que todas as requisições à API usem os tokens/cookies de sessão do Pipefy disponíveis no ambiente/navegador.

---

## Diretrizes de desenvolvimento sênior

### Inicialização e contexto

Nunca peça IDs manualmente se o app roda dentro de um Card. Use sempre o SDK para obter o contexto dinamicamente:

```javascript
// Inicializar o Pipefy App SDK
const pipefy = window.PipefyApp.init();

// Usar render para garantir que a UI está pronta
pipefy.render(() => {
  pipefy.getContext().then((context) => {
    const { cardId, pipeId, organizationId } = context;
    console.log(`Running on Card: ${cardId}`);
  });
});
```

Referência completa da API do SDK: `docs/sdk.md`.
