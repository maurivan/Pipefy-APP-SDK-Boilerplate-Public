---
name: frontend-design-pipefy
description: Build production-grade frontend interfaces aligned with Pipefy’s Design System (PipeStyle / Lumen Tokens) using Tailwind CSS. Enterprise-grade, structured, brand-coherent UI. Avoid generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

# Frontend Design — Pipefy Edition

This skill generates distinctive, production-ready frontend interfaces aligned with Pipefy’s design principles and visual language.

It ensures:
- Strict alignment with PipeStyle (Lumen tokens)
- Tailwind-based implementation
- Enterprise-grade aesthetic
- Structured, systemic UI
- Zero generic “AI look”

This skill must always produce UI that feels native to Pipefy.

---

# Core Design Philosophy

Pipefy interfaces are:

- Structured
- Clear
- Operational
- Confident
- System-driven
- Enterprise-ready

Not playful.
Not decorative.
Not trend-driven.

Design should communicate reliability and product maturity.

---

# Mandatory Technical Foundation

## 1. Always Import Lumen Tokens and New Order Font

```html
<link rel="stylesheet" href="https://pipestyle.staticpipefy.com/lumen/css/lumen-tokens.css">
<link href="https://assets.staticpipefy.com/fonts/new-order/NewOrder-600.css" rel="stylesheet">
```

## 2. Tailwind Must Map to Lumen Variables

Never hardcode brand colors.

Example configuration:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--lumen-color-primary)",
        primaryHover: "var(--lumen-color-primary-hover)",
        surface: "var(--lumen-color-surface)",
        surfaceAlt: "var(--lumen-color-surface-alt)",
        border: "var(--lumen-color-border)",
        textPrimary: "var(--lumen-color-text-primary)",
        textSecondary: "var(--lumen-color-text-secondary)",
        success: "var(--lumen-color-success)",
        danger: "var(--lumen-color-danger)",
        warning: "var(--lumen-color-warning)"
      },
      borderRadius: {
        sm: "var(--lumen-radius-sm)",
        md: "var(--lumen-radius-md)",
        lg: "var(--lumen-radius-lg)"
      },
      boxShadow: {
        soft: "var(--lumen-shadow-soft)",
        strong: "var(--lumen-shadow-strong)"
      }
    }
  }
}
```

- Never use default Tailwind blue.
- Never use random gradients.
- Never override design tokens with hex values.

---

# Design Thinking Before Coding

Before generating UI, determine:

### 1. Context
- Is this for Admin configuration?
- Workflow execution?
- Analytics?
- Embedded App (Apps SDK)?
- Standalone dashboard?

### 2. Density Level
- High-density (tables, logs, metrics)
- Medium-density (forms, settings)
- Insight-focused (dashboards)

### 3. Visual Direction

Choose one strong direction:

- Enterprise Editorial
- Structured Data Brutalism
- Operational Intelligence UI
- Minimal Industrial
- Precision Dashboard

Execute it with discipline.

Do not mix aesthetics.

---

# Typography Rules

Avoid:
- A refined grotesk style
- Roboto
- Arial
- System default stack

Preferred tone:
- IBM Plex Sans (enterprise)
- Inter
- Optional mono for data contexts

Typography must:

- Have strong hierarchy
- Avoid excessive weights
- Use tight line-height in dense UI
- Use generous spacing in configuration pages

Always use:
- New Order Semibold (font-weight:600) for titles;

---

# Motion Philosophy

Motion is:

- Subtle
- Controlled
- Functional

Use:

- opacity + translate (4–12px)
- 150–250ms transitions
- hover states reinforcing structure
- subtle elevation changes

Avoid:

- Bounce effects
- Playful scaling
- Oversaturated hover colors
- Unnecessary animations

---

# Layout & Composition

Pipefy UI is grid-driven.

Use:

- Clear visual grouping
- Consistent spacing scale
- Strong alignment
- Logical hierarchy
- Controlled shadows

Cards should feel structural — not decorative.

---

# Accessibility Requirements

Always:

- Respect WCAG contrast
- Preserve focus states
- Use semantic HTML
- Maintain keyboard navigation
- Never remove outlines without replacement

---

# Example Component (Admin Integration Card)

```tsx
export default function IntegrationCard() {
  return (
    <div className="bg-surface border border-border rounded-md p-6 shadow-soft hover:shadow-strong transition-all duration-200">
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">
            Slack Integration
          </h3>
          <p className="text-sm text-textSecondary mt-1">
            Sync workflow events with Slack channels.
          </p>
        </div>

        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-sm">
          Active
        </span>
      </div>

      <div className="border-t border-border pt-4 flex justify-between items-center">
        <span className="text-sm text-textSecondary">
          Last sync: 2 hours ago
        </span>

        <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
          Configure
        </button>
      </div>
    </div>
  )
}
```

Why this works:

- Uses tokens
- Structured layout
- Clear hierarchy
- Enterprise tone
- Subtle interaction
- No decorative noise

---

# Embedded Apps (Pipefy Apps SDK) Considerations

If building for Apps SDK:

- Respect container spacing
- Avoid full-width edge-to-edge layouts
- Keep components modular
- Avoid global resets
- Ensure visual compatibility with Pipefy parent UI

---

# What Makes This Memorable

Not decoration.

Memorable elements:

- Structural clarity
- Confident typography
- Logical hierarchy
- Refined spacing
- System coherence
- Functional elegance

The UI should feel like:

> “This belongs inside Pipefy.”

---

# Hard Constraints

Never:

- Hardcode brand colors
- Use Tailwind defaults for primary UI
- Apply trendy gradient backgrounds
- Add playful UI patterns
- Create Dribbble-style decorative dashboards
- Mix multiple aesthetic directions

Always:

- Use Lumen tokens
- Use Tailwind mapping
- Preserve enterprise tone
- Maintain system integrity

---

# Output Standard

When generating code, always:

- Deliver production-grade markup
- Use semantic structure
- Ensure accessibility
- Maintain visual cohesion
- Avoid generic AI aesthetics
- Provide clean, well-structured code

The result must feel intentional, refined, and brand-native.