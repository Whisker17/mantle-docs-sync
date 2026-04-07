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

## Key conventions

- Content pages use `.mdx` extension with frontmatter `title` (required) and `asIndexPage: true` (for directory index pages)
- GitBook hint style mapping: `info`→`info`, `warning`→`warning`, `danger`→`error`, `success`→`info`, `tip`→`default`
- LaTeX math enabled via `latex: true` in Nextra config; uses `$$` block delimiters
- The migration script wipes `content/` on each run — manual edits to content files will be lost unless the script is modified
