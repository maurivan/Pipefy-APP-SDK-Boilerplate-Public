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

# Pipefy APP Visual Language (Product Reference)

Use this section as a visual reference when replicating the Pipefy app style (app.pipefy.com). Always prefer Lumen tokens when available; these definitions describe the desired end result.

## Color palette (map to Lumen when possible)

| Use | Appearance | Typical usage |
|-----|------------|---------------|
| **Primary / Actions** | Solid blue | Primary buttons ("Upgrade plan", "+ Create new card", "Save"), links, active tab (underline), logo, action icons |
| **AI / Secondary accent** | Vibrant purple | "AI Agents" tab, floating "AI" button, "Let AI build" field outline, "Doing" phase titles, sparkle icon |
| **Main background** | White | Content area, cards, modals, inputs |
| **Secondary background** | Very light gray | Nav bars, dropdowns, side areas |
| **Text** | Black / dark gray | Titles, body text |
| **Secondary text** | Medium gray | Metadata, descriptions, counts |
| **Upcoming due date** | Light yellow (background) | Pill "Due date Mar, 5 in 2 days" |
| **Overdue** | Red-orange (background) | Pill "Due date Mar, 3 7 hours ago" |
| **Kanban phases** | Inbox: blue; Doing: purple; Done: yellow | Column titles and counts |
| **Tags/Labels** | Light gray or light pink | Tags on cards, "Inbox" label in list |

## Shapes and corners

- Almost all interactive elements use **rounded corners**: buttons, inputs, cards, modals, pills, dropdowns.
- Use `rounded-md` to `rounded-lg` consistently; avoid fully sharp corners.
- Cards and modals: soft edges, a defined “box” feel without being harsh.

## Components in Pipefy style

### Buttons
- **Primary**: blue background, white text, rounded, darker hover. E.g. "Save", "+ Create new card", "Upgrade plan".
- **Secondary**: light gray or transparent background, gray border, dark gray text. E.g. "Cancel", icon buttons (copy, code).
- **Close modal**: "X" icon in white circle with blue border/icon, top-right corner.

### Fields and forms
- **Input**: white background, light gray border, rounded corners; blue border/ring on focus.
- **Dropdown**: box with light gray background, chevron down on the right.
- **Toggle**: oval track — gray when off, blue when on; white sliding thumb (Description, Help text, Required, Editable on other phases).

### Modals
- White background, slightly rounded corners, subtle shadow.
- Bold title at top; close (X) button top-right.
- Content with explanatory text and well-spaced controls.
- Footer: secondary link on the left (e.g. "Field dependencies"); "Cancel" (secondary) and "Save" (primary) on the right.

### Cards (Kanban, pipe list)
- White rectangles, rounded corners, light spacing.
- Prominent title; metadata (dates, due date, comments) in smaller size with icons (calendar, clock, comment).
- Due date in pill with yellow or red-orange background.
- Tags in light gray or light pink chips.

### Tabs
- Active tab: bold + primary (blue) underline. E.g. "List" active with blue underline.

### Floating button (AI)
- Circle, purple background, white icon (sparkle), bottom-right corner.

### Navigation
- Logo on the left; items with icons; "AI Agents" in purple; red numeric badge for notifications when applicable.

## Typography in the product

- **New Order Semibold**: only for **main app titles** (page title, main modal title, primary section heading).
- **Inter**: for **all other text** — body, labels, metadata, buttons, card titles, form labels, tabs, pills.
- Clear hierarchy: main title (New Order) > card/field labels and metadata (Inter, smaller/lighter).
- Keep bold, larger for main titles; smaller, lighter for metadata; Inter as the default font stack.

## Layout and spacing

- Generous whitespace; clear visual grouping.
- Labels above fields; sections separated by borders or space.
- Minimal, linear icons (calendar, clock, comment, lock, copy).

## Density by context

- **Kanban/List**: compact but readable cards; pills and icons don’t compete with the title.
- **Forms and configuration**: more breathing room; label → input → toggles well spaced; actions in the footer.
- **Modals**: single-column content, controls in a vertical block with even spacing.

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

## 1. Always Import Lumen Tokens and Fonts

- **New Order** (Semibold): use only for **main app titles** (e.g. page titles, modal titles, section headings that are the primary label of the view).
- **Inter**: use for **all other text** — body copy, labels, metadata, buttons, cards, form fields, tabs, pills, etc.

```html
<link rel="stylesheet" href="https://pipestyle.staticpipefy.com/lumen/css/lumen-tokens.css">
<link href="https://assets.staticpipefy.com/fonts/new-order/NewOrder-600.css" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Apply in CSS or Tailwind: e.g. `font-family: 'New Order', sans-serif` for main titles; `font-family: 'Inter', sans-serif` as default for the rest.

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
        warning: "var(--lumen-color-warning)",
        // Pipefy APP: blue = primary/actions; purple = AI/secondary accent
        aiAccent: "var(--lumen-color-ai-accent, theme('colors.purple.600'))"
      },
      borderRadius: {
        sm: "var(--lumen-radius-sm)",
        md: "var(--lumen-radius-md)",
        lg: "var(--lumen-radius-lg)"
      },
      boxShadow: {
        soft: "var(--lumen-shadow-soft)",
        strong: "var(--lumen-shadow-strong)"
      },
      fontFamily: {
        title: ["'New Order'", "sans-serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  }
}
```

- Never use default Tailwind blue; use primary/aiAccent per the **Pipefy APP Visual Language** section.
- Never use random gradients.
- Never override design tokens with hex values except as fallback when the token does not exist (e.g. aiAccent).

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

Font usage (mandatory):
- **New Order Semibold (font-weight: 600)** — only for **main app titles** (e.g. page title, main modal heading, primary section title). Do not use for card titles, labels, or body text.
- **Inter** — for **all other UI text**: body copy, labels, metadata, buttons, card titles, form fields, tabs, pills. Set Inter as the default `font-family` for the app.

Optional: mono for data/code contexts.

Typography must:

- Have **strong hierarchy** (bold, larger for main titles in New Order; metadata and secondary in Inter, smaller size and lighter weight — see **Pipefy APP Visual Language > Typography in the product**)
- Avoid excessive weights
- Use tight line-height in dense UI (Kanban, lists)
- Use generous spacing in configuration pages and modals

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

# Example: Modal in Pipefy style (Form sharing / Field config)

```tsx
export default function FormSharingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-surface w-full max-w-lg rounded-lg shadow-strong p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-textPrimary">Form sharing</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-border text-primary hover:bg-surfaceAlt transition-colors"
            aria-label="Close"
          >
            <span className="text-primary">×</span>
          </button>
        </div>
        <p className="text-sm text-textSecondary mb-4">
          No need to bring everyone to your pipe. Share this form with a link or add it to the Portal.
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-textSecondary">🔒</span>
            <select className="flex-1 bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm text-textPrimary focus:ring-2 focus:ring-primary focus:border-primary">
              <option>Restricted to Vibe Coding</option>
            </select>
          </div>
          <p className="text-xs text-textSecondary">Anyone at Vibe Coding can view and submit via this form.</p>
        </div>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://app.pipefy.com/..."
            className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-textSecondary"
          />
          <button className="p-2 border border-border rounded-md text-textSecondary hover:bg-surfaceAlt">📋</button>
          <button className="p-2 border border-border rounded-md text-textSecondary hover:bg-surfaceAlt">&lt;/&gt;</button>
        </div>
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
          <button className="px-4 py-2 rounded-md border border-border text-textSecondary hover:bg-surfaceAlt text-sm font-medium">
            Cancel
          </button>
          <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
```

- Modal: white background, rounded-lg, shadow; X in circle at corner; footer with Cancel (secondary) + Save (primary).
- Inputs/dropdowns: gray border, focus with primary ring; dropdown with bg surfaceAlt.

---

# Example: Kanban card (card list)

```tsx
export default function KanbanCard({ title, dueDate, dueStatus, commentsCount, label }) {
  const dueBg = dueStatus === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-amber-50 text-amber-800';
  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-soft hover:shadow-strong transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-textPrimary flex-1">{title}</h3>
        <span className="text-textSecondary">→</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-textSecondary">
        <span>START: 03/02/2026</span>
        <span>END: 03/30/2026</span>
      </div>
      <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${dueBg}`}>
        🕐 Due date {dueDate}
      </div>
      <div className="mt-2 flex items-center gap-2">
        {commentsCount > 0 && <span className="text-xs text-textSecondary">{commentsCount} 💬</span>}
        {label && <span className="text-xs bg-surfaceAlt text-textSecondary px-2 py-0.5 rounded">{label}</span>}
      </div>
    </div>
  );
}
```

- Card: white, rounded-lg, moderate padding; due date in yellow or red pill by status; tags in light gray/pink chip.

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
- Maintain visual cohesion with a **Pipefy APP** look (palette, primary/secondary buttons, modals, cards, tabs and pills per the **Pipefy APP Visual Language** section)
- Avoid generic AI aesthetics
- Provide clean, well-structured code

Before delivery, confirm:
- Primary = blue; AI/accent = purple; backgrounds = white/light gray; alerts = yellow/red by state.
- Buttons and inputs with rounded corners; modals with shadow and Cancel + Save footer when applicable.
- Typographic hierarchy and minimal icons.

The result must feel intentional, refined, and brand-native.