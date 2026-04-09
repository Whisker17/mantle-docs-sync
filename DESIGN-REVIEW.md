# Optimism & Base Documentation — UI/UX Design Review

> Comprehensive analysis of design patterns from docs.optimism.io and docs.base.org
> for replication in the Mantle docs site (Nextra 4.6 + Next.js 15).

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Navigation Architecture](#2-navigation-architecture)
3. [Homepage / Landing Page Design](#3-homepage--landing-page-design)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Card Components](#6-card-components)
7. [Content Page Layout](#7-content-page-layout)
8. [Interactive Components](#8-interactive-components)
9. [Dark Mode Implementation](#9-dark-mode-implementation)
10. [Header / Navbar](#10-header--navbar)
11. [Footer](#11-footer)
12. [Search](#12-search)
13. [Feedback & AI Features](#13-feedback--ai-features)
14. [Responsive Design](#14-responsive-design)
15. [Gap Analysis: Mantle vs Optimism/Base](#15-gap-analysis-mantle-vs-optimismbase)
16. [Implementation Recommendations](#16-implementation-recommendations)

---

## 1. Platform Overview

Both Optimism and Base use **Mintlify** — a hosted SaaS documentation platform. Mantle uses **Nextra 4.6** (self-hosted Next.js). This means we need to **reimplement** Mintlify's design patterns using Nextra's customization APIs + custom CSS/components.

| Feature | Optimism | Base | Mantle (Current) |
|---------|----------|------|-------------------|
| **Platform** | Mintlify (theme: `mint`) | Mintlify (theme: `aspen`) | Nextra 4.6 + Next.js 15 |
| **Config** | Single `docs.json` | Single `docs.json` | `next.config.mjs` + `_meta.js` per dir |
| **Styling** | Custom CSS on Mintlify | Custom CSS on Mintlify | `globals.css` (303 lines) |
| **Custom font** | Riforma LL (woff2) | System UI stack | Inter (Google Fonts) |
| **Brand color** | `#FF0420` (red) | `#0000ff` (blue) | `#65B3AE` (teal) |

---

## 2. Navigation Architecture

### 2.1 Top-Level Tab Navigation (KEY PATTERN)

Both sites use **audience-based tab navigation** at the top, not a flat sidebar:

**Optimism tabs (8):**
1. Chain Operators
2. Node Operators
3. App Developers
4. OP Stack
5. OP Mainnet
6. How Optimism Evolves (Governance)
7. Notices
8. Rust

**Base tabs (6):**
1. Get Started
2. Base Chain
3. Base Account
4. AI Agents
5. Mini Apps
6. OnchainKit

**Pattern:** Each tab has its own sidebar tree. Selecting a tab switches the entire sidebar context. This is how Mintlify's `navigation.tabs` works.

### 2.2 Sidebar Structure

Within each tab, content is organized into **groups**:

```
Tab: App Developers
├── Group: Quickstarts
│   ├── Page: Deploy Your First Contract
│   └── Page: Create a Token
├── Group: Guides
│   ├── Page: Bridging Tokens
│   └── Page: Gas Estimation
├── Group: Tutorials
│   ├── Page: Cross-Domain Bridge ETH
│   └── Page: Standard Bridge ERC20
├── Group: Tools
│   ├── Nested Group: Build
│   │   ├── Page: Faucets
│   │   └── Page: Oracles
│   └── Nested Group: Connect
│       └── Page: RPC Providers
└── Group: Reference
    └── Page: SDK API Reference
```

**Key observations:**
- Groups are collapsible but `drilldown: false` keeps everything visible (Optimism)
- Up to 4 levels of nesting
- Consistent sub-structure pattern: `quickstarts/`, `guides/`, `tutorials/`, `reference/`, `tools/`
- Sidebar items have clean, concise labels

### 2.3 Breadcrumbs

Both sites show breadcrumbs above the page title:
```
App Developers > Tutorials > Bridging > Cross-Domain Bridge ERC20
```

### 2.4 Right-Side Table of Contents

Both sites show a floating TOC on the right side of content pages, auto-generated from headings. This is a standard Mintlify/Nextra feature.

### 2.5 Per-Tab "Global Anchors" (Base pattern)

Base adds quick external links per tab in the sidebar:
- **Get Started** tab: Status, Faucet, Bridge, Blog
- **Base Chain** tab: GitHub, Status, Chain Stats, Explorer, Support, Blog

These appear as icon links at the top or bottom of the sidebar — useful external navigation relevant to that section's audience.

### 2.6 Recommended Navigation for Mantle

Map to Nextra: Use Nextra's top navbar items + sidebar `_meta.js` with separators to approximate tab navigation. Or implement actual tab-style navigation with a custom Navbar component.

```
Suggested Mantle tabs:
1. Introduction (overview, architecture, roadmap, upgrades)
2. System (fee mechanism, on-chain, off-chain, risk management)
3. Developers (quick access, guides, SDK, tools, troubleshooting)
4. Node Operators (deployment, network roles, updates)
5. Users (ecosystem, wallets, how-to)
```

---

## 3. Homepage / Landing Page Design

### 3.1 Optimism Homepage

Uses `mode: "wide"` frontmatter for full-width layout.

**Structure:**
```
┌────────────────────────────────────────────────────┐
│  HERO SECTION (flex, space-between)                │
│  ┌────────────────────┐                            │
│  │  max-width: 505px  │                            │
│  │  h1: 2.5rem, 600wt │                            │
│  │  p: 1.125rem       │                            │
│  │  [Deployment ↗] [Learn More]  ← CTA buttons    │
│  └────────────────────┘                            │
│                                                    │
│  ## Components                                     │
│  (bullet list of OP Stack components)              │
│                                                    │
│  ## Deployment                                     │
│  <Steps> with 7 steps (op-deployer workflow)       │
│                                                    │
│  ## Next Steps                                     │
│  (links to best practices)                         │
└────────────────────────────────────────────────────┘
```

**Key CSS values:**
- Container: `max-width: 1400px`, centered, `padding: 0 2rem`
- Hero h1: `font-size: 3rem` (page-level) / `2.5rem` (hero), `font-weight: 400–600`, `letter-spacing: -0.025em`
- Hero subtitle: `font-size: 1.25rem`, `color: #6b7280`, `line-height: 1.6`
- CTA primary button: `background: #FF0420`, `color: white`, `padding: 0.75rem 1.5rem`, `border-radius: 0.75rem`
- CTA secondary button: `background: transparent`, `border: 1px solid #d1d5db`, `border-radius: 0.75rem`

### 3.2 Base Homepage

Also uses `mode: "wide"`. More card-heavy and grid-oriented.

**Structure:**
```
┌────────────────────────────────────────────────────┐
│  USE CASES GRID (3-column)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Payments │  │  Agents  │  │  Tokens  │         │
│  │ • Accept │  │ • Build  │  │ • Launch │         │
│  │ • Fees   │  │ • Pay    │  │ • Bridge │         │
│  │ • Wallet │  │ • Trade  │  │ • Bridge │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                    │
│  PRODUCTS — <CardGroup cols={4}>                   │
│  [Base Chain] [Base Account] [AI Agents] [Bridge]  │
│  (with icons)                                      │
│                                                    │
│  RESOURCES — 2-column grid                         │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   Funding    │  │    Growth    │                │
│  │ • Rewards    │  │ • Ecosystem  │                │
│  │ • Grants     │  │ • Mentor     │                │
│  └──────────────┘  └──────────────┘                │
└────────────────────────────────────────────────────┘
```

### 3.3 Homepage Card Types

**Optimism HomeCards:**
- 2-column grid (`grid-template-columns: 1fr 1fr` or `1fr 2fr`)
- Card: `padding: 1.75rem`, `border: 1px solid #e2e8f0`, `border-radius: 12px`
- Card title: `font-size: 1.5rem`, `font-weight: 400`, `letter-spacing: -0.01em`
- Card contains a `CardList` of `CardListItem`s — list-style navigation
- CardListItem has: optional number badge (circle), title, description, difficulty badge, arrow icon

**Base BrowseCard:**
- Background: `bg-zinc-100` (light) / `bg-zinc-900` (dark)
- Hover: `bg-zinc-200` / `bg-zinc-800`
- Icon + title + description

**Base GithubRepoCard:**
- Dark background (`bg-zinc-900`), always dark
- GitHub icon + repo name + URL

### 3.4 What Mantle Should Copy

The **Optimism** homepage pattern is more sophisticated and achievable with Nextra:
1. Full-width hero with CTA buttons
2. Grid of navigation cards (2-column HomeCards containing CardList items)
3. Each card represents a user journey (Build, Deploy, Operate) with listed sub-pages
4. Difficulty badges on tutorials (Easy/Medium/Hard)
5. Animated arrow on hover

---

## 4. Color System

### 4.1 Optimism Colors

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| **Primary/Brand** | `#FF0420` | `#FF0420` |
| **Background** | `#ffffff` | `#0f172a` (slate-900) |
| **Card bg** | `transparent` | `#1e293b` (slate-800) |
| **Card border** | `#e2e8f0` (slate-200) | `#334155` (slate-700) |
| **Text primary** | `#111827` (gray-900) / `#0f172a` (slate-900) | `#f9fafb` (gray-50) / `#f1f5f9` (slate-100) |
| **Text secondary** | `#6b7280` (gray-500) | `#9ca3af` (gray-400) |
| **Text tertiary** | `#64748b` (slate-500) | `#94a3b8` (slate-400) |
| **Divider** | `#f1f5f9` (slate-100) | `#334155` (slate-700) |
| **Hover accent** | `#ef4444` (red-500) | `#ef4444` (red-500) |
| **Number badge bg** | `#f1f5f9` (slate-100) | `#334155` (slate-700) |
| **Number badge text** | `#475569` (slate-600) | `#cbd5e1` (slate-300) |
| **CTA primary** | `#FF0420` bg, white text | same |
| **CTA secondary** | transparent, `#d1d5db` border | transparent, `#4b5563` border |

**Badge colors:**
| Level | Light bg | Light text | Dark bg | Dark text |
|-------|---------|-----------|---------|-----------|
| Easy | `#dcfce7` | `#166534` | `#14532d` | `#bbf7d0` |
| Medium | `#fef3c7` | `#92400e` | `#92400e` | `#fef3c7` |
| Hard | `#fee2e2` | `#991b1b` | `#991b1b` | `#fecaca` |

### 4.2 Base Colors

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| **Primary/Brand** | `#0000ff` | `#578BFA` |
| **Link** | `#0000ff` | `#578BFA` |
| **Link hover** | `#000000` | `#ffffff` |
| **Card bg** | `#f4f4f5` (zinc-100) | `#18181b` (zinc-900) |
| **Card hover** | `#e4e4e7` (zinc-200) | `#27272a` (zinc-800) |
| **Danger border** | `rgba(239,68,68,0.2)` | `rgba(239,68,68,0.2)` |
| **Danger bg** | `rgba(254,242,242,0.5)` | `rgba(239,68,68,0.1)` |

### 4.3 Mantle Color Mapping

For Mantle, translate the pattern using our teal brand:

| Token | Recommended Light | Recommended Dark |
|-------|------------------|-----------------|
| **Primary/Brand** | `#65B3AE` | `#7ECEC9` |
| **Background** | `#ffffff` | `#0f1419` |
| **Card bg** | `transparent` or `#f8fafa` | `#1a2332` |
| **Card border** | `rgba(101,179,174,0.15)` | `rgba(101,179,174,0.12)` |
| **Card border hover** | `rgba(101,179,174,0.45)` | `rgba(101,179,174,0.35)` |
| **Hover accent** | `#4A9A95` | `#7ECEC9` |
| **CTA primary** | `#65B3AE` bg, white text | same |
| **CTA secondary** | transparent, `#d1d5db` border | transparent, `#4b5563` border |

---

## 5. Typography

### 5.1 Optimism Typography

| Element | Family | Size | Weight | Spacing | Line Height |
|---------|--------|------|--------|---------|-------------|
| Body text | Riforma LL | system default | 400 | normal | normal |
| H1 (page) | Riforma LL | 3rem (48px) | 400 | -0.02em | 1.1 |
| H1 (hero) | Riforma LL | 2.5rem (40px) | 600 | -0.025em | 1.2 |
| H2 | Riforma LL | — | 400 | — | — |
| H3 | Riforma LL | — | 400 | — | — |
| Hero subtitle | Riforma LL | 1.25rem (20px) | 400 | — | 1.6 |
| Card title | Riforma LL | 1.5rem (24px) | 400 | -0.01em | — |
| List item title | Riforma LL | 1rem (16px) | 400 | -0.01em | — |
| List item desc | Riforma LL | 0.875rem (14px) | — | — | 1.5 |
| Badge | — | 0.75rem (12px) | 600 | — | — |
| Footer link | Riforma LL | 0.875rem (14px) | 500 | — | — |
| Code | Roboto Mono | — | — | — | — |
| Section label | — | 0.75rem (12px) | 650 | 0.08em | — |

**Key brand decision:** H1/H2/H3 all use `font-weight: 400` — intentionally light/airy, NOT bold. This is a distinctive Optimism choice.

### 5.2 Base Typography

| Element | Style |
|---------|-------|
| Homepage title | `text-3xl font-semibold` (~30px, 600wt) |
| Body | `text-base leading-relaxed` (~16px, lh 1.625) |
| Card title | `text-lg font-semibold` (~18px, 600wt) |
| GitHub card | `text-base font-medium` (~16px, 500wt) |
| Small text | `text-xs text-zinc-400` (~12px) |

### 5.3 Recommendation for Mantle

Keep Inter but adopt the refined sizing/weight from Optimism:
- H1: `2.5rem`, `font-weight: 600`, `letter-spacing: -0.025em`
- H2: `1.75rem`, `font-weight: 500`, `letter-spacing: -0.02em`
- H3: `1.25rem`, `font-weight: 600`, `letter-spacing: -0.015em`
- Body: `1rem (16px)`, `font-weight: 400`, `letter-spacing: -0.011em`
- Small/description: `0.875rem (14px)`, `color: secondary text`

---

## 6. Card Components

### 6.1 Optimism HomeCard (Outer Container)

```css
.home-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  background: transparent;                  /* Light */
  border: 1px solid #e2e8f0;               /* slate-200 */
  border-radius: 12px;
  transition: all 0.2s ease;
}
/* Dark: bg #1e293b, border #334155 */
```

Contains a title + `CardList` of navigable items.

### 6.2 Optimism CardListItem (Inner List Item)

```css
.card-list-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid #f1f5f9;        /* subtle divider */
  text-decoration: none;
  transition: all 0.2s ease;
}
/* Hover: title turns #ef4444 (red), arrow slides right 4px + turns red */
```

Structure: `[Number Badge] [Content: Title + Badge + Description] [Arrow →]`

### 6.3 Base BrowseCard

```
Zinc background, icon + title + description, hover darkens background
```

### 6.4 Pattern to Implement in Mantle

Create these components:
1. **`NavigationCard`** — outer card container with title and footer link
2. **`NavigationCardItem`** — inner list item with number, title, description, badge, arrow
3. **`CardGrid`** — responsive CSS grid for cards (already exists, enhance it)
4. **`DifficultyBadge`** — Easy (green) / Medium (yellow) / Hard (red) pill

---

## 7. Content Page Layout

### 7.1 Standard Layout (Both Sites)

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: [Logo] [Tab1] [Tab2] [Tab3]... [Search] [🌙]   │
├──────────┬──────────────────────────┬────────────────────┤
│          │                          │                    │
│ SIDEBAR  │     CONTENT AREA         │  TABLE OF CONTENTS │
│ (~250px) │     (~700-800px)         │     (~200px)       │
│          │                          │                    │
│ Group    │  Breadcrumb: X > Y > Z   │  # Section 1      │
│   Page   │                          │  # Section 2      │
│   Page   │  # Page Title            │  # Section 3      │
│ Group    │                          │                    │
│   Page   │  Content...              │                    │
│   Page   │  <Info> callout </Info>  │                    │
│          │  <Steps>                 │                    │
│          │    <Step title>          │                    │
│          │  </Steps>               │                    │
│          │                          │                    │
│          │  [◄ Previous] [Next ►]   │                    │
│          │                          │                    │
├──────────┴──────────────────────────┴────────────────────┤
│  FOOTER: Social links | Copyright | Links                │
└──────────────────────────────────────────────────────────┘
```

### 7.2 Content Width

- Optimism: `max-width: 1400px` with `padding: 0 2rem` (for custom content)
- Mintlify default prose width: ~700-800px
- Sidebar: ~250px
- TOC: ~200px

### 7.3 Page Metadata (Optimism)

Rich frontmatter for SEO and categorization:
```yaml
---
title: "Page Title"
description: "SEO description"
lang: en-US
content_type: guide|tutorial|reference|notice
topic: unique-topic-slug
personas:
  - app-developer
  - node-operator
categories:
  - infrastructure
  - protocol
---
```

### 7.4 Callout Types

| Mintlify Component | Color | Nextra Equivalent |
|-------------------|-------|-------------------|
| `<Info>` | Blue/gray | `<Callout type="info">` |
| `<Warning>` | Yellow/orange | `<Callout type="warning">` |
| `<Note>` (Base) | Blue | `<Callout type="info">` |
| `<Tip>` (Base) | Green | `<Callout type="default">` |
| `<Check>` (Base) | Green check | Custom component needed |
| `<Expandable>` | Accordion | Custom component needed |

### 7.5 Steps Component

Both use `<Steps>` with individual `<Step title="...">` sub-components.

Optimism:
```mdx
<Steps>
  <Step title="Smart contract deployment">
    Using op-deployer you will configure...
  </Step>
  <Step title="Validate your deployment">
    After deploying...
  </Step>
</Steps>
```

Nextra's `<Steps>` works similarly but uses Markdown headings:
```mdx
<Steps>
### Step 1: Deploy Contracts
Content here...

### Step 2: Validate
Content here...
</Steps>
```

---

## 8. Interactive Components

### 8.1 Code Blocks

Both Mintlify sites provide:
- Syntax highlighting (Shiki/Prism)
- Copy button (top-right)
- Language label
- Dark/light theme code blocks

**Code font:** Optimism explicitly uses `Roboto Mono`. Base uses system mono stack.

Optimism CSS for code:
```css
:root {
  --font-mono: 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

### 8.2 Tabs

Both use `<Tabs>` + `<Tab title="...">` for switching between content variants (e.g., different languages, mainnet vs testnet).

### 8.3 Accordion / Expandable

Optimism uses `<Expandable title="...">` for collapsible code samples and long content blocks.

Base uses `<Accordion>` / `<AccordionGroup>` for progressive disclosure.

**Nextra equivalent:** Nextra doesn't have a built-in accordion. We need a custom `<Expandable>` component.

### 8.4 Mermaid Diagrams

Optimism uses Mermaid diagrams inline in MDX:
```markdown
\`\`\`mermaid
flowchart TD
    A[L1] --> B[Bridge]
    B --> C[L2]
\`\`\`
```

Nextra doesn't include Mermaid by default — needs a plugin or custom component.

### 8.5 API Parameter Documentation (Base)

Base has structured API docs using:
- `<ParamField path="method" type="string">` — parameter documentation
- `<ResponseField name="result" type="object">` — response documentation
- `<Expandable>` for nested objects

Would need custom components in Nextra if we want API reference pages.

### 8.6 AI Context Buttons (Optimism)

```json
"contextual": {
  "options": ["copy", "chatgpt", "claude"]
}
```

Every content block gets buttons to:
- Copy text
- Send to ChatGPT
- Send to Claude

Novel UX feature worth implementing.

---

## 9. Dark Mode Implementation

### 9.1 Shared Pattern

Both sites use CSS class-based dark mode (`html[class*="dark"]` or `.dark`).

**Optimism dark mode palette:**
```css
/* Background */
html[class*="dark"] body { background: #0f172a; }

/* Cards */
html[class*="dark"] .home-card { background: #1e293b; border-color: #334155; }

/* Text */
html[class*="dark"] h1 { color: #f9fafb; }
html[class*="dark"] p { color: #9ca3af; }

/* Buttons */
html[class*="dark"] .btn-secondary { color: #f9fafb; border-color: #4b5563; }
html[class*="dark"] .btn-secondary:hover { background: #374151; border-color: #6b7280; }

/* Badges */
html[class*="dark"] .badge--easy { background: #14532d; color: #bbf7d0; }
html[class*="dark"] .badge--medium { background: #92400e; color: #fef3c7; }
html[class*="dark"] .badge--hard { background: #991b1b; color: #fecaca; }
```

### 9.2 Nextra Dark Mode

Nextra uses `.dark` class on `<html>`. Our existing `globals.css` already handles this — but needs expansion for new components.

### 9.3 Mode Toggle

Both sites show the toggle in the header. Optimism config:
```json
"modeToggle": { "default": "light", "isHidden": false }
```

Nextra includes this by default — already working in Mantle.

---

## 10. Header / Navbar

### 10.1 Optimism Navbar

```
┌────────────────────────────────────────────────────────────────┐
│ [OP Logo]  [Chain Ops] [Node Ops] [App Devs] [OP Stack] ...   │
│                                        [🔍 Search ⌘K] [🌙/☀️]  │
└────────────────────────────────────────────────────────────────┘
```

- Logo: Small optimism logo image (`max-height: 13px`)
- Tab navigation inline in header
- Search shortcut visible (`⌘K`)
- Theme toggle
- Social links in footer only (not header)

### 10.2 Base Navbar

```
┌────────────────────────────────────────────────────────────────┐
│ [Base Logo] [Get Started] [Base Chain] [Account] [AI] [Mini]  │
│                              [GitHub] [Discord] [Base Build →] │
└────────────────────────────────────────────────────────────────┘
```

- Logo: SVG with light/dark variants
- Tab navigation inline
- Right side: GitHub icon, Discord icon, CTA button ("Base Build" → base.dev)

### 10.3 Mantle Navbar Recommendation

```
┌────────────────────────────────────────────────────────────────┐
│ [Mantle Logo]  [Intro] [System] [Developers] [Nodes] [Users]  │
│                                    [🔍 ⌘K] [GitHub] [🌙/☀️]    │
└────────────────────────────────────────────────────────────────┘
```

Needs:
1. Proper SVG logo (not the CSS "M" badge)
2. Tab-style navigation for top-level sections
3. Search with keyboard shortcut hint
4. GitHub link icon
5. Theme toggle

---

## 11. Footer

### 11.1 Optimism Footer

Minimal:
```
┌──────────────────────────────────────┐
│  [Twitter] [GitHub]                  │
│  Built with Mintlify                 │
└──────────────────────────────────────┘
```

### 11.2 Base Footer

```
┌──────────────────────────────────────────────────────┐
│  [X/Twitter] [GitHub] [Reddit] [LinkedIn]            │
│  Base.org | Blog | Privacy Policy | Terms | Cookies  │
└──────────────────────────────────────────────────────┘
```

### 11.3 Mantle Footer Recommendation

Current Mantle footer is already decent. Enhance with:
- Social icon row (Twitter, GitHub, Discord, Telegram)
- Legal links (Privacy, Terms)
- "Built with Nextra" or "Powered by Mantle" branding

---

## 12. Search

### 12.1 Both Sites

Mintlify's built-in search:
- Triggered by `⌘K` / `Ctrl+K`
- Full-text search modal overlay
- Fuzzy matching
- Instant results as you type

### 12.2 Mantle Search Gap

Nextra has built-in Flexsearch which provides:
- Full-text search out of the box
- `⌘K` shortcut
- Decent results for static content

**No additional configuration needed** — Nextra's search works once content is indexed. Verify it's enabled in config.

---

## 13. Feedback & AI Features

### 13.1 Optimism Feedback

```json
"feedback": {
  "thumbsRating": true,
  "suggestEdit": true,
  "raiseIssue": true
}
```

Every page has:
- 👍/👎 rating buttons
- "Suggest Edit" → opens GitHub editor
- "Raise Issue" → creates GitHub issue

### 13.2 Base AI Features

- **MCP Server**: `https://docs.base.org/mcp`
- **llms.txt**: Navigation index for LLMs at root and per-section
- **llms-full.txt**: Complete context dump for LLMs
- **AI contextual buttons**: Copy to ChatGPT / Claude

### 13.3 Mantle Recommendations

Priority implementations:
1. Fix `docsRepositoryBase` to enable "Edit this page on GitHub"
2. Add `llms.txt` for AI discoverability
3. Consider adding thumbs rating (could be a simple custom component)

---

## 14. Responsive Design

### 14.1 Breakpoints

Optimism CSS breakpoints:
```css
@media (max-width: 768px) {
  .hero-section { flex-direction: column; text-align: center; }
  .hero-content h1 { font-size: 1.75rem; }  /* Down from 2.5rem */
  .home-cards { grid-template-columns: 1fr !important; }
  .card-list-item__header { flex-direction: column; }
}
```

### 14.2 Responsive Card Grids

| Screen | Columns |
|--------|---------|
| Desktop (>1024px) | 2–3 columns |
| Tablet (768–1024px) | 2 columns |
| Mobile (<768px) | 1 column |

### 14.3 Mobile Navigation

Both sites collapse the sidebar into a hamburger menu on mobile. This is handled by Mintlify/Nextra automatically.

---

## 15. Gap Analysis: Mantle vs Optimism/Base

### Critical Gaps (Must Fix)

| # | Gap | Priority | Effort |
|---|-----|----------|--------|
| 1 | **No tab-based top navigation** — flat sidebar only | HIGH | Medium |
| 2 | **No proper logo** — CSS "M" badge instead of SVG | HIGH | Low |
| 3 | **Homepage is basic** — no CTA buttons, no CardList items, no difficulty badges | HIGH | Medium |
| 4 | **Images hosted on GitBook CDN** — will break if GitBook deletes the space | HIGH | Medium |
| 5 | **docsRepositoryBase broken** — points to org, not repo | HIGH | Trivial |
| 6 | **No Expandable/Accordion component** | MEDIUM | Low |
| 7 | **Content index pages are flat link lists** — should be card grids | MEDIUM | Medium |

### Design Polish Gaps

| # | Gap | Priority | Effort |
|---|-----|----------|--------|
| 8 | **Card component needs CardList pattern** — current cards are simple, not list-style like Optimism | MEDIUM | Medium |
| 9 | **No difficulty badges** on tutorials/guides | LOW | Low |
| 10 | **No CTA buttons** (primary/secondary styled buttons) | MEDIUM | Low |
| 11 | **No breadcrumbs** (Nextra may provide this, verify) | LOW | Low |
| 12 | **Hero section centered only** — Optimism uses flex left-aligned hero with visual right side | LOW | Low |
| 13 | **No code font override** — should use a specific mono font | LOW | Trivial |

### Infrastructure Gaps

| # | Gap | Priority | Effort |
|---|-----|----------|--------|
| 14 | **No OG images / social cards** | MEDIUM | Medium |
| 15 | **No sitemap.xml / robots.txt** | MEDIUM | Low |
| 16 | **No analytics** (Optimism uses Mixpanel with extensive tracking) | LOW | Medium |
| 17 | **No llms.txt** for AI discoverability | LOW | Low |
| 18 | **No 404 page** | LOW | Trivial |

---

## 16. Implementation Recommendations

### Phase 1: Critical Design Alignment (Do First)

1. **Create proper SVG logo** — Replace CSS "M" badge with actual Mantle logo SVG (light/dark variants)

2. **Implement tab-style navigation** — Add top-level section links in the Nextra navbar:
   ```jsx
   // In layout.jsx, configure navbar with top links
   <Navbar
     logo={<MantleLogo />}
     items={[
       { title: 'Introduction', href: '/introduction' },
       { title: 'System', href: '/system-information' },
       { title: 'Developers', href: '/for-developers' },
       { title: 'Node Operators', href: '/for-node-operators' },
       { title: 'Users', href: '/for-users' },
     ]}
   />
   ```

3. **Redesign homepage** to match Optimism pattern:
   - Left-aligned hero with CTA buttons (primary + secondary)
   - 2-column `HomeCards` grid
   - Each card contains `CardList` with navigable items + descriptions + badges
   - Footer links in cards ("View all guides →")

4. **Create new card components:**
   ```
   NavigationCard — outer container (title + card list + footer link)
   NavigationCardItem — inner item (number + title + badge + description + arrow)
   DifficultyBadge — Easy/Medium/Hard pill
   CTAButton — primary/secondary styled buttons
   ```

5. **Fix `docsRepositoryBase`** — Point to actual repo for "Edit this page" links

6. **Download GitBook images to `public/images/`** — Rewrite all CDN URLs

### Phase 2: Component Library

7. **Add `Expandable` component** — Collapsible accordion for code samples
8. **Add `CTAButton` component** — Primary (brand color) and Secondary (outline) buttons
9. **Enhance `Callout` theming** — Add custom styling to match Mintlify's callout designs
10. **Add `CardGroup` component** — Mintlify-style responsive card grid with `cols` prop

### Phase 3: Polish & Infrastructure

11. **Add OG image generation** — Use `next/og` for dynamic social cards
12. **Add sitemap + robots.txt** — Use `next-sitemap` package
13. **Add custom 404 page** — Brand-consistent not-found page
14. **Add `llms.txt`** — AI navigation index
15. **Enhance section index pages** — Replace bullet lists with card grids

### CSS Design Tokens to Implement

```css
:root {
  /* Brand */
  --mantle-primary: #65B3AE;
  --mantle-primary-dark: #4A9A95;
  --mantle-primary-light: #7ECEC9;

  /* Text */
  --mantle-text-primary: #0f172a;
  --mantle-text-secondary: #6b7280;
  --mantle-text-tertiary: #64748b;

  /* Surfaces */
  --mantle-bg: #ffffff;
  --mantle-card-bg: transparent;
  --mantle-card-border: #e2e8f0;
  --mantle-divider: #f1f5f9;

  /* Interactive */
  --mantle-hover-accent: #4A9A95;
  --mantle-btn-radius: 0.75rem;
  --mantle-card-radius: 12px;

  /* Typography */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Spacing */
  --mantle-container-max: 1400px;
  --mantle-container-padding: 2rem;
}

.dark {
  --mantle-text-primary: #f9fafb;
  --mantle-text-secondary: #9ca3af;
  --mantle-text-tertiary: #94a3b8;
  --mantle-bg: #0f1419;
  --mantle-card-bg: #1a2332;
  --mantle-card-border: #2a3544;
  --mantle-divider: #2a3544;
  --mantle-hover-accent: #7ECEC9;
}
```

---

## Appendix A: Source File References

### Optimism
- Config: `docs/public-docs/docs.json` (~2700 lines)
- CSS: `docs/public-docs/styles/homepage.css` (1296 lines)
- Components: `docs/public-docs/components/HomeCard.tsx`
- Homepage: `docs/public-docs/index.mdx`
- Repo: `github.com/ethereum-optimism/optimism/tree/develop/docs/public-docs`

### Base
- Config: `docs/docs.json`
- CSS: `docs/style.css`
- Snippets: `docs/snippets/` (27+ files including HomeHeader, BrowseCard, GithubRepoCard)
- Repo: `github.com/base/docs`

### Mantle (Current)
- Layout: `app/layout.jsx`
- CSS: `app/globals.css` (303 lines)
- Components: `components/HomeCard.jsx`
- Homepage: `content/index.mdx`
- Config: `next.config.mjs`
