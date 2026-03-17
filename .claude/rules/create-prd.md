# Workflow: Gerar Product Requirements Document (PRD)

## Objetivo

Guiar a criação de um Product Requirements Document (PRD) detalhado em Markdown, a partir de um prompt inicial do usuário. O PRD deve ser claro, acionável e adequado para um desenvolvedor júnior implementar a funcionalidade.

## Processo

1. **Receber o prompt inicial** — O usuário descreve brevemente a feature ou funcionalidade desejada.
2. **Fazer perguntas de esclarecimento** — Antes de escrever o PRD, **obrigatório** fazer perguntas para entender o "o quê" e o "porquê" da feature (o "como" fica a cargo do desenvolvedor).
3. **Gerar o PRD** — Com base no prompt e nas respostas, gerar o PRD na estrutura abaixo.
4. **Salvar o PRD** — Salvar como `prd-[nome-da-feature].md` em **`.cursor/planning/prd/`** (compatível com Cursor) ou **`planning/prd/`** na raiz do projeto. Criar a pasta se não existir.

## Áreas para perguntas (exemplos)

- **Problema/objetivo:** "Que problema essa feature resolve?" / "Qual o objetivo principal?"
- **Usuário-alvo:** "Quem é o usuário principal?"
- **Funcionalidade:** "Quais ações principais o usuário deve poder fazer?"
- **User stories:** "Pode dar alguns user stories? (ex.: Como [tipo de usuário], quero [ação] para [benefício].)"
- **Critérios de aceite:** "Como saberemos que a feature foi implementada com sucesso?"
- **Escopo:** "Há algo que a feature *não* deve fazer (non-goals)?"
- **Dados:** "Que dados a feature precisa exibir ou manipular?"
- **UI/design:** "Há mockups ou guias de UI?"
- **Casos de borda:** "Há edge cases ou condições de erro a considerar?"

## Estrutura do PRD

1. **Introdução/Visão geral** — Breve descrição da feature e do problema que resolve. Objetivo.
2. **Objetivos** — Lista de objetivos específicos e mensuráveis.
3. **User stories** — Narrativas de uso e benefícios.
4. **Requisitos funcionais** — Lista numerada do que a feature deve ter (linguagem clara e concisa).
5. **Non-goals (fora do escopo)** — O que a feature *não* inclui.
6. **Considerações de design (opcional)** — Links para mockups, requisitos de UI/UX.
7. **Considerações técnicas (opcional)** — Restrições, dependências, sugestões.
8. **Métricas de sucesso** — Como o sucesso será medido.
9. **Perguntas em aberto** — Pontos que ainda precisam de esclarecimento.

## Público-alvo

O leitor principal é um **desenvolvedor júnior**. Requisitos devem ser explícitos, inequívocos e com pouco jargão; detalhe suficiente para entender o propósito e a lógica da feature.

## Formato e local

- **Formato:** Markdown (`.md`)
- **Local:** `.cursor/planning/prd/` ou `planning/prd/`
- **Nome do arquivo:** `prd-[nome-da-feature].md`

## Instruções finais

1. Não comece a implementar o PRD.
2. Faça perguntas de esclarecimento ao usuário.
3. Use as respostas para refinar o PRD.
4. Ofereça ao usuário a opção de iniciar a implementação com o PRD gerado.
