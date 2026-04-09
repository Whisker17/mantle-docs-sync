# Mantle Docs — Nextra Layout & Configuration Analysis

## Overview

This is a **Nextra 4.6.1** documentation site powered by Next.js 15.3.3 with the `nextra-theme-docs` theme. The site uses a custom two-row navbar layout inspired by Optimism's design patterns.

---

## 1. Root Layout (`app/layout.jsx`)

**Location:** `/app/layout.jsx`

### Key Points:

- **Theme Imports:**
  - `nextra-theme-docs/style.css` — base Nextra theme styles
  - `./globals.css` — custom Mantle overrides and custom components

- **Navbar Configuration:**
  ```jsx
  const navbar = (
    <Navbar
      logo={<MantleLogo />}
      projectLink="https://github.com/mantlenetworkio"
    />
  )
  ```
  - Single `<Navbar>` component from `nextra-theme-docs`
  - Logo is a custom SVG (MantleLogo from `components/HomeCard.jsx`)
  - Project link points to the GitHub repository

- **Footer:**
  - Custom `MantleFooter` component with:
    - Brand section (Mantle logo)
    - Social links (Twitter, GitHub, Discord, Telegram)
    - Bottom section with copyright, privacy, terms links
  - Styled in `globals.css` with `.mantle-footer-*` classes

- **Head Configuration:**
  ```jsx
  <Head
    color={{
      hue: 175,
      saturation: 33,
      lightness: { dark: 55, light: 40 },
    }}
    backgroundColor={{
      dark: 'rgb(15,20,25)',
      light: 'rgb(250,250,250)',
    }}
    faviconGlyph="M"
  />
  ```
  - Sets Nextra primary color to teal (#65B3AE)
  - Theme-aware background colors
  - Custom favicon

- **Layout Props:**
  ```jsx
  <Layout
    navbar={navbar}
    footer={footer}
    pageMap={pageMap}
    docsRepositoryBase="https://github.com/mantlenetworkio/mantle-docs/tree/main"
    sidebar={{ defaultMenuCollapseLevel: 1 }}
    editLink="Edit this page on GitHub"
  >
  ```

---

## 2. Global CSS (`app/globals.css`)

**Location:** `/app/globals.css` (905 lines, 18.6 KB)

### Design Tokens (Lines 6–60)

```css
:root {
  --nextra-primary-hue: 175deg;
  --nextra-primary-saturation: 33%;
  --nextra-primary-lightness: 40%;

  /* Brand: Teal palette */
  --mantle-primary: #65B3AE;
  --mantle-primary-dark: #4A9A95;
  --mantle-primary-light: #7ECEC9;

  /* Text colors */
  --mantle-text-primary: #0f172a;
  --mantle-text-secondary: #6b7280;
  --mantle-text-tertiary: #64748b;

  /* Surfaces */
  --mantle-bg: #ffffff;
  --mantle-card-bg: transparent;
  --mantle-card-border: #e2e8f0;
  --mantle-card-border-hover: rgba(101, 179, 174, 0.45);
  --mantle-divider: #f1f5f9;
  
  /* ... (see full file) */
}

.dark {
  /* Dark mode overrides */
}
```

### Key CSS Sections:

1. **Typography** (Lines 89–125)
   - Base font: `--font-inter` (Google Fonts)
   - Monospace: JetBrains Mono
   - Heading sizes: h1 (2.5rem) → h4 (1.1rem)

2. **Hero Section** (Lines 128–178)
   - `.mantle-hero` — main container with gradient text
   - Responsive: 3rem on desktop, 2rem on mobile
   - Cyan gradient: `#65B3AE` → `#4A9A95`

3. **CTA Buttons** (Lines 181–228)
   - `.mantle-btn` — base button with flex layout
   - `.mantle-btn-primary` — filled teal background
   - `.mantle-btn-secondary` — transparent with border
   - Hover states with smooth transitions

4. **Cards & Grids** (Lines 244–320)
   - `.mantle-card-grid` — 3-column responsive grid
   - `.mantle-card` — individual card with border, hover shadow
   - `.mantle-card-arrow` — animated arrow icon on hover
   - Responsive: 3 cols → 2 cols (769–1024px) → 1 col (≤768px)

5. **Navigation Cards** (Lines 324–455)
   - `.mantle-nav-card` — outer container
   - `.mantle-nav-card-item` — inner list items with number badges
   - `.mantle-nav-grid` — 2-column grid (like Optimism)
   - Interactive: arrow animates on item hover

6. **Difficulty Badges** (Lines 482–518)
   - `.mantle-badge-easy` — green (#dcfce7 / #bbf7d0)
   - `.mantle-badge-medium` — yellow (#fef3c7 / #fef3c7)
   - `.mantle-badge-hard` — red (#fee2e2 / #fecaca)
   - `.mantle-badge-new` — teal accent

7. **Two-Row Navbar** (Lines 725–820)
   - **Critical CSS:**
     ```css
     .nextra-navbar > nav {
       flex-wrap: wrap !important;
       height: auto !important;
       padding-top: 0.875rem;
       padding-bottom: 0;
     }

     /* Tab items container: force to second row */
     .nextra-navbar > nav > div:nth-child(2) {
       order: 99 !important;
       flex-basis: 100% !important;
       width: 100% !important;
       padding: 0.625rem 0 0;
       margin-top: 0.625rem;
       border-top: 1px solid var(--mantle-divider);
     }

     /* Tab links styling */
     .nextra-navbar > nav > div:nth-child(2) > a {
       position: relative;
       padding: 0.5rem 0.875rem !important;
       font-size: 0.875rem !important;
       border-bottom: 2px solid transparent;
       margin-bottom: -1px;
     }

     /* Active tab indicator */
     .nextra-navbar > nav > div:nth-child(2) > a[aria-current="true"] {
       color: var(--mantle-text-primary) !important;
       font-weight: 500 !important;
       border-bottom-color: var(--mantle-primary) !important;
     }
     ```

   - **Mobile Revert** (Lines 805–820):
     ```css
     @media (max-width: 767px) {
       .nextra-navbar > nav {
         flex-wrap: nowrap !important;
         height: var(--nextra-navbar-height) !important;
       }
       .nextra-navbar > nav > div:nth-child(2) {
         order: unset !important;
         flex-basis: auto !important;
         width: auto !important;
       }
     }
     ```

8. **Footer Styling** (Lines 621–706)
   - Social icon links: 32×32 flex boxes
   - Hover: color change to primary + light background
   - Footer links: flex row with 1.5rem gap

9. **Expandable Accordion** (Lines 521–574)
   - `<details>` element with custom styling
   - `.mantle-expandable-trigger` — clickable header
   - Chevron rotates on open state

---

## 3. Sidebar Navigation & External Links

### Structure: `content/_meta.js`

The sidebar is built from `_meta.js` files in the content directory:

```js
export default {
  index: { title: 'Home', type: 'page', display: 'hidden' },
  notices: { title: 'Notices', type: 'page' },
  'mantle-network': { title: 'Mantle Network', type: 'page' },
  'node-operators': { title: 'Node Operators', type: 'page' },
  developers: { title: 'Developers', type: 'page' },
  users: { title: 'Users', type: 'page' },
}
```

### External Links Example: `content/developers/_meta.js`

```js
export default {
  "---getting-started": {
    type: "separator",
    title: "Getting Started",
  },
  "quick-access": "Quick Access",
  
  /* ... section separators ... */

  "---links": {
    type: "separator",
  },
  "faucet": {
    title: "Faucet ↗",
    href: "https://faucet.sepolia.mantle.xyz",
  },
  "bridge": {
    title: "Bridge ↗",
    href: "https://bridge.mantle.xyz",
  },
  "explorer": {
    title: "Explorer ↗",
    href: "https://explorer.mantle.xyz",
  },
}
```

**Key points:**
- External links are defined in `_meta.js` with an `href` property
- The `↗` arrow is part of the title string (or can be added via CSS)
- Separators are defined with `type: "separator"`
- Internal pages reference local `.mdx` files by filename

### How External Links Are Styled

Currently, external links in the sidebar are styled by Nextra's default theme. To add custom styling:

1. **Selector:** `.nextra-sidebar-container a[href^="http"]` or specific link classes
2. **CSS Location:** `app/globals.css` (Section 14 has sidebar link transitions)
3. **Current Styling:** Lines 822–825
   ```css
   .nextra-sidebar-container a {
     transition: color 0.15s ease;
   }
   ```

---

## 4. MDX Components (`mdx-components.js`)

**Location:** `/mdx-components.js`

```js
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout, Steps, Tabs } from 'nextra/components'
import {
  Hero,
  SectionTitle,
  CardGrid,
  HomeCard,
  NavigationCard,
  NavigationCardItem,
  NavGrid,
  CTAButton,
  DifficultyBadge,
  Expandable,
} from './components/HomeCard'

export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(),
    Callout,
    Steps,
    Tabs,
    Hero,
    SectionTitle,
    CardGrid,
    HomeCard,
    NavigationCard,
    NavigationCardItem,
    NavGrid,
    CTAButton,
    DifficultyBadge,
    Expandable,
    ...components,
  }
}
```

**How it works:**
1. Imports base Nextra components
2. Imports custom Mantle components from `./components/HomeCard.jsx`
3. Merges them into the MDX context
4. Authors can now use `<Hero>`, `<CardGrid>`, etc. in `.mdx` files

---

## 5. Custom Components (`components/HomeCard.jsx`)

**Location:** `/components/HomeCard.jsx` (208 lines)

### Exported Components:

1. **MantleLogo**
   - SVG-based logo with linear gradient
   - Used in navbar
   - Responsive sizing (24×24 in navbar)

2. **Hero**
   - Props: `title`, `subtitle`, `children` (CTA buttons)
   - Renders to `.mantle-hero` container
   - Gradient text on h1

3. **CTAButton**
   - Props: `href`, `variant` ('primary' | 'secondary'), `external`, `children`
   - Renders `<Link>` with appropriate classes
   - External links get `target="_blank"` + external icon SVG

4. **SectionTitle**
   - Uppercase, teal-colored section label
   - Uses `.mantle-section-title` class

5. **CardGrid**
   - Responsive grid container
   - Props: `cols`, `children`
   - Wraps `<HomeCard>` components

6. **HomeCard**
   - Props: `href`, `icon`, `title`, `description`
   - Single card with icon + title + description
   - Arrow icon animates on hover

7. **NavigationCard** + **NavigationCardItem**
   - Multi-item navigation card (Optimism pattern)
   - Items can have: number, title, description, badge
   - Optional footer link

8. **DifficultyBadge**
   - Props: `level` ('easy' | 'medium' | 'hard' | 'new')
   - Renders colored pill badge

9. **Expandable**
   - Props: `title`, `children`, `defaultOpen`
   - `<details>` / `<summary>` wrapper with custom styling
   - Animated chevron

10. **NavGrid**
    - 2-column container for NavigationCards
    - Responsive to 1 column on mobile

---

## 6. Next.js Configuration (`next.config.mjs`)

**Key settings:**
- **Nextra Setup:** Uses `withNextra` wrapper with `contentDirBasePath: '/'`
- **Turbopack Alias:** Resolves `next-mdx-import-source-file` to `./mdx-components.js`
- **Redirects:** 100+ URL redirects for backward compatibility with old docs structure
- **LaTeX Support:** `latex: true` enables math rendering

---

## 7. Styling Hierarchy

### Import Order (in `app/layout.jsx`):
1. `nextra-theme-docs/style.css` — Nextra base theme
2. `./globals.css` — Mantle customizations (overrides)

### CSS Specificity:
- Nextra theme uses class-based selectors (`.nextra-*`)
- `globals.css` uses `!important` on high-specificity rules to override
- Custom classes (`.mantle-*`) are defined separately

### Design System Colors:

**Light Mode:**
- Primary: `#65B3AE` (teal)
- Text: `#0f172a` (dark slate)
- Borders: `#e2e8f0` (light gray)

**Dark Mode:**
- Primary: `#7ECEC9` (lighter teal)
- Text: `#f9fafb` (off-white)
- Borders: `#2a3544` (dark gray)

---

## 8. Sidebar External Links — Current Issues & Solutions

### How Nextra Renders External Links

1. **Detection:** Links with `href` property (absolute URLs) are rendered as external
2. **Styling:** Nextra applies class `active` when URL matches
3. **Icons:** No built-in external link icon (you manually add `↗` to title)

### Common Styling Issues:

**Issue 1: External link styling not visible**
- **Cause:** CSS selector specificity or missing `:not()` pseudo-class
- **Solution:** Use `a[href^="http"]` or `a[target="_blank"]` selectors

**Issue 2: External links not distinguishable from internal**
- **Cause:** No visual indicator or color difference
- **Solution:** Add CSS like:
  ```css
  .nextra-sidebar-container a[href^="http"] {
    color: var(--mantle-primary);
    font-weight: 550;
  }
  
  .nextra-sidebar-container a[href^="http"]::after {
    content: " ↗";
    opacity: 0.6;
  }
  ```

**Issue 3: Hover state not working**
- **Cause:** Nextra's `:hover` styles override custom styles
- **Solution:** Use `!important` or increase CSS specificity:
  ```css
  .nextra-sidebar-container a[href^="http"]:hover {
    color: var(--mantle-primary-dark) !important;
  }
  ```

---

## 9. Typography & Responsive Design

### Font Stack:
- **Sans-serif:** Inter (Google Fonts) + system fonts
- **Monospace:** JetBrains Mono + system monospace

### Heading Sizes:
- h1: 2.5rem (desktop), responsive down
- h2: 1.75rem
- h3: 1.25rem
- h4: 1.1rem

### Breakpoints:
- Mobile: `max-width: 640px`
- Tablet: `max-width: 768px` & `min-width: 769px`
- Desktop: `min-width: 1025px`

---

## 10. Next Steps for Styling Fixes

### To Fix External Link Styling in Sidebar:

1. **Add CSS selector** in `app/globals.css` (around line 823):
   ```css
   /* Sidebar external links */
   .nextra-sidebar-container a[href^="http"] {
     color: var(--mantle-primary);
     font-weight: 550;
   }
   
   .nextra-sidebar-container a[href^="http"]:hover {
     color: var(--mantle-primary-dark);
     text-decoration: underline;
   }
   ```

2. **Or use target="_blank"** selector (if Nextra sets this):
   ```css
   .nextra-sidebar-container a[target="_blank"] {
     /* same styles */
   }
   ```

3. **Test in browser** with DevTools to confirm selectors match the DOM

4. **Check Nextra documentation** for new theme APIs in v4.6.1

---

## File References Summary

| File | Purpose | Lines |
|------|---------|-------|
| `app/layout.jsx` | Root layout, Navbar, Footer | 153 |
| `app/globals.css` | All custom styles | 905 |
| `mdx-components.js` | MDX component registration | 35 |
| `components/HomeCard.jsx` | Custom React components | 208 |
| `content/_meta.js` | Root sidebar structure | 35 |
| `content/developers/_meta.js` | Developers section + external links | 48 |
| `next.config.mjs` | Next.js + Nextra config | 112 |

---

## Quick Reference: How to Style External Links

**Selector options:**
```css
/* Option 1: Match absolute URLs */
a[href^="http"] { }

/* Option 2: Match external icon in title (if using ↗) */
a:has(+ span:contains("↗")) { }

/* Option 3: Target by specific sidebar container */
.nextra-sidebar-container a { }

/* Option 4: Combined (most specific) */
.nextra-sidebar-container a[href^="http"] { }
```

**Best practice:** Use Option 4 with appropriate hover/active states.
