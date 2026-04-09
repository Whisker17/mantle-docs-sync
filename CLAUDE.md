# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nextra-based documentation site migrated from `https://docs.mantle.xyz/network` (GitBook). Uses Next.js 15 App Router + Nextra 4.6 + React 19. Content is MDX with YAML frontmatter.

## Commands

```bash
npm run dev                      # Start dev server (localhost:3000)
npm run build                    # Production build (115 static pages)
npm run migrate:mantle-network   # Re-fetch all content from docs.mantle.xyz/network
```

### Submodule management

```bash
./scripts/update-submodule.sh mantle-v2 v1.5.3   # Checkout specific tag
./scripts/update-submodule.sh op-geth --list      # List available tags
./scripts/update-submodule.sh all v1.5.3          # Update both repos
```

## Architecture

### Content pipeline

`scripts/migrate-mantle-network.mjs` scrapes the GitBook site and converts to Nextra-compatible MDX:

1. Fetches sitemap XML + root HTML to discover all routes (112 pages)
2. Downloads raw markdown for each page (concurrent, 8 workers)
3. Converts GitBook components → Nextra JSX: `{% hint %}` → `<Callout>`, `{% stepper/step %}` → `<Steps>`, `{% tabs/tab %}` → `<Tabs>`
4. Rewrites internal links (strips `/network` prefix, removes `.md` extensions)
5. Cleans artifacts (GitBook anchors, zero-width links, empty table rows)
6. Escapes MDX specials (`{`, `}`) but skips code fences, `$$` math blocks, and JSX component lines (uppercase tags)
7. Generates `_meta.js` navigation files per directory

Output goes to `content/`, report to `tmp/mantle-network-report.json`.

### Routing

Single catch-all route: `app/[[...mdxPath]]/page.jsx` handles all MDX pages. Nextra resolves paths from the `content/` directory.

### Navigation

Each content directory has a `_meta.js` exporting an object mapping slugs to display names. Root sections are ordered by `ROOT_SECTION_ORDER` in the migration script.

### MDX components

`mdx-components.js` registers `Callout`, `Steps`, `Tabs` globally from `nextra/components` — no per-file imports needed.

### Submodules

Two shallow submodules in `repos/` track upstream codebases for documentation accuracy:
- `repos/mantle-v2` — `github.com/mantlenetworkio/mantle-v2`
- `repos/op-geth` — `github.com/mantlenetworkio/op-geth`

Both use `shallow = true` and `GIT_LFS_SKIP_SMUDGE=1` for minimal clone size. Pin to specific tags via `scripts/update-submodule.sh`.

## Documentation Update Workflow

All documentation work MUST follow this branching workflow. Never commit documentation changes directly to `main`.

### Procedure

When the user initiates a documentation update task, execute the following steps in order:

1. **Create a worktree** — Create a new git worktree with a descriptive branch name (e.g., `docs/update-fee-mechanism`, `docs/sync-v1.5.4`). All work happens in this worktree, not on `main`.

2. **Pin submodules** — Confirm or update the target tags for `repos/mantle-v2` and `repos/op-geth` via `./scripts/update-submodule.sh`. If the user specifies a version, check it out; otherwise ask which version to target.

3. **Analyze code diff** — Run `git diff` / `git log` inside the submodule repos between the previously pinned tag and the new tag. Identify changes relevant to the documentation (API changes, config changes, new features, deprecations, contract address updates, etc.). Summarize findings before writing.

4. **Write or update documentation** — Create new MDX files or edit existing ones in `content/` according to the user's requirements and the diff analysis. Follow the content conventions below.

5. **Verify build** — Run `npm run build` in the worktree. The build must succeed with zero errors before proceeding. Fix any MDX compilation issues.

6. **Submit for review** — Commit changes, push the branch, and create a PR against `main` for peer review. Include a summary of what changed and why (referencing the code diff).

7. **Merge after approval** — Only merge to `main` after the PR review is complete and approved. Do not force-merge or skip review.

### Branch naming

Use the prefix `docs/` followed by a short description: `docs/<topic>` (e.g., `docs/arsia-fee-model`, `docs/node-v1.5.4-guide`).

## Version Upgrade Playbook

When the user says a new version is being released (e.g., "升级 v1.6.0 Olympus to sepolia"), follow this playbook automatically. Templates are in `scripts/templates/`.

### Required input

Ask the user for any missing fields before starting:

| Field | Required | Example |
|---|---|---|
| `VERSION` | Always | `v1.6.0` |
| `CODENAME` | Always | `Olympus` |
| `NETWORK` | Always | `sepolia` or `mainnet` |
| `ACTIVATION_TIME` | Always | `2026-06-01 07:00:00 UTC` |
| `L2_TIMESTAMP` | Always | `1780300800` |
| `SUBMODULE_TAGS` | Always | `mantle-v2 v1.6.0, op-geth v1.6.0` |
| `SEPOLIA_VERSION` | Mainnet only | `v1.5.3` (the sepolia release for this codename) |
| `SEPOLIA_DATE` | Mainnet only | `March 25, 2026` |
| `PREV_MAINNET_VERSION` | Mainnet only | `v1.5.4` (the version being superseded) |
| `PREV_CODENAME` | Mainnet only | `Arsia` (codename of previous mainnet release) |

### Decision tree

```
IF NETWORK == sepolia:
  Step 1: Create changelog
    - New file: content/node-operators/mantle-v2-{VERSION}-{CODENAME}-upgrade-sepolia.mdx
    - Template: scripts/templates/changelog-sepolia.mdx.tpl
    - Fill from submodule diff analysis

  Step 2: Update node-operators/_meta.js
    - Add new entry in "Changelogs" section (ABOVE the archive link)
    - Format: "mantle-v2-{VERSION}-{CODENAME}-upgrade-sepolia": "v{X.Y.Z} — {CODENAME} (Sepolia)"

  Step 3: (No archiving needed for sepolia-only releases)

  Step 4: [If applicable] Update component-specific docs in content/

IF NETWORK == mainnet:
  Step 1: ARCHIVE old documents
    a. Node Operators changelogs — move ALL current changelogs to archive:
       - Move content/node-operators/mantle-v2-*.mdx → content/node-operators/archive/
       - Remove their entries from node-operators/_meta.js "Changelogs" section
       - Add entries to archive/_meta.js (newest first, ABOVE existing entries)
    b. Notices — demote current active notice to archive section:
       - In notices/_meta.js, move the current top entry below the "---archive" separator
       - (Do NOT move the .mdx file itself — only reorder in _meta.js)

  Step 2: CREATE new documents
    a. Mainnet changelog:
       - New file: content/node-operators/mantle-v2-{VERSION}-{CODENAME}-mainnet.mdx
       - Template: scripts/templates/changelog-mainnet.mdx.tpl
    b. Sepolia changelog (if not already created):
       - Check if content/node-operators/mantle-v2-{SEPOLIA_VERSION}-{CODENAME}-upgrade-sepolia.mdx exists
       - If missing, create from scripts/templates/changelog-sepolia.mdx.tpl
    c. Activation notice:
       - New file: content/notices/{CODENAME}-mainnet-activation.mdx
       - Template: scripts/templates/notice-activation.mdx.tpl
    d. What's New page:
       - New file: content/mantle-network/whats-new-in-mantle-v2-{CODENAME}.mdx
       - Template: scripts/templates/whats-new.mdx.tpl

  Step 3: UPDATE _meta.js files
    a. node-operators/_meta.js:
       - "Changelogs" section should list ONLY:
         "{VERSION} — {CODENAME} (Mainnet)"
         "{SEPOLIA_VERSION} — {CODENAME} (Sepolia)"
         "archive" link
    b. notices/_meta.js:
       - New notice at TOP (before "---archive" separator)
    c. mantle-network/_meta.js:
       - Replace "whats-new-in-mantle-v2-*" entry with new codename

  Step 4: [If applicable] Update component-specific docs in content/
```

### Content generation

For all documents, content is derived from:
1. **Submodule diff analysis** — `git diff` / `git log` between old and new tags in `repos/mantle-v2` and `repos/op-geth`
2. **GitHub release notes** — Check `https://github.com/mantlenetworkio/mantle-v2/releases/tag/{VERSION}`
3. **Existing docs** — Reference prior upgrade docs for consistent style and structure

### Naming conventions

| Type | Filename pattern | _meta.js display |
|---|---|---|
| Sepolia changelog | `mantle-v2-{VERSION}-{CODENAME}-upgrade-sepolia.mdx` | `{VERSION} — {CODENAME} (Sepolia)` |
| Mainnet changelog | `mantle-v2-{VERSION}-{CODENAME}-mainnet.mdx` | `{VERSION} — {CODENAME} (Mainnet)` |
| Activation notice | `{CODENAME}-mainnet-activation.mdx` | `{CODENAME} Mainnet Activation ({DATE})` |
| What's New | `whats-new-in-mantle-v2-{CODENAME}.mdx` | `What's New in Mantle v2 {CODENAME}` |

All codenames in filenames are **lowercase kebab-case**. Display names use **Title Case**.

### Post-upgrade checklist

After creating/updating all files:
- [ ] `npm run build` passes with zero errors
- [ ] All internal cross-links resolve (changelog ↔ notice ↔ What's New)
- [ ] Docker image tags are correct
- [ ] Activation timestamps are consistent across all documents
- [ ] _meta.js ordering is correct (newest first in changelogs and archive)

## Key conventions

- Content pages use `.mdx` extension with frontmatter `title` (required) and `asIndexPage: true` (for directory index pages)
- GitBook hint style mapping: `info`→`info`, `warning`→`warning`, `danger`→`error`, `success`→`info`, `tip`→`default`
- LaTeX math enabled via `latex: true` in Nextra config; uses `$$` block delimiters
- The migration script wipes `content/` on each run — manual edits to content files will be lost unless the script is modified
