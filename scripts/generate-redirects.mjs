#!/usr/bin/env node

/**
 * Generate static HTML redirect files in the `out/` directory.
 *
 * Next.js `output: 'export'` does not support server-side redirects, so this
 * script creates lightweight HTML pages with <meta http-equiv="refresh"> for
 * every redirect rule that has a fixed source path (no :slug / :path* params).
 *
 * Usage:  node scripts/generate-redirects.mjs
 * Env:    PAGES_BASE_PATH – prepended to destination URLs (default: "")
 */

import { redirects } from './redirects.mjs'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

const basePath = process.env.PAGES_BASE_PATH || ''
const outDir = join(dirname(new URL(import.meta.url).pathname), '..', 'out')

if (!existsSync(outDir)) {
  console.log('⚠  out/ directory not found – run `next build` first.')
  process.exit(1)
}

function htmlRedirect(destination) {
  const dest = basePath + destination
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${dest}">
  <link rel="canonical" href="${dest}">
  <title>Redirecting…</title>
</head>
<body>
  <p>Redirecting to <a href="${dest}">${dest}</a>…</p>
</body>
</html>
`
}

let generated = 0
let skipped = 0

for (const { source, destination } of redirects) {
  // Skip dynamic segments – we cannot generate static files for these
  if (source.includes(':') || source.includes('*')) {
    skipped++
    continue
  }

  // Don't overwrite real pages produced by next build
  const targetDir = join(outDir, source)
  const targetFile = join(targetDir, 'index.html')
  const targetFlat = join(outDir, `${source}.html`)

  if (existsSync(targetFile) || existsSync(targetFlat)) {
    continue
  }

  mkdirSync(targetDir, { recursive: true })
  writeFileSync(targetFile, htmlRedirect(destination))
  generated++
}

console.log(`✓  Redirects: ${generated} generated, ${skipped} skipped (dynamic patterns)`)
