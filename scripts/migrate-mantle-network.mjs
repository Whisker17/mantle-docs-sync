import path from 'node:path'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const BASE_URL = 'https://docs.mantle.xyz/network'
const SITEMAP_INDEX_URL = `${BASE_URL}/sitemap.xml`
const OUTPUT_DIR = path.join(process.cwd(), 'content')
const REPORT_FILE = path.join(process.cwd(), 'tmp', 'mantle-network-report.json')
const CONCURRENCY = 8
const LEGACY_ROUTE_PREFIX = '/network'
const REQUIRED_SECTION_ROUTES = ['/introduction', '/more']
const ROOT_SECTION_ORDER = [
  'introduction',
  'system-information',
  'for-node-operators',
  'for-developers',
  'for-users',
  'more'
]

const HINT_TYPE_MAP = {
  info: 'info',
  warning: 'warning',
  danger: 'error',
  success: 'info',
  tip: 'default'
}

const toTitleCase = value =>
  value
    .split('-')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')

const extractLocs = xml => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].trim())

const firstH1 = markdown => {
  const matched = markdown.match(/^#\s+(.+?)\s*$/m)
  return matched ? matched[1].trim() : null
}

const routeFromUrl = url => {
  const pathname = new URL(url).pathname
  const prefix = '/network'
  if (!pathname.startsWith(prefix)) {
    throw new Error(`Unsupported path: ${pathname}`)
  }
  const raw = pathname.slice(prefix.length)
  return raw === '' ? '/' : raw
}

const isIgnoredRoute = route =>
  route === '/rss.xml' ||
  route.startsWith('/sitemap') ||
  route.startsWith('/~gitbook/') ||
  route === LEGACY_ROUTE_PREFIX ||
  route.startsWith(`${LEGACY_ROUTE_PREFIX}/`)

const normalizeRoute = route => {
  if (!route) {
    return null
  }
  let normalized = route.split('#')[0].split('?')[0].trim()
  normalized = normalized.replace(/\.md$/, '')
  if (normalized === '') {
    normalized = '/'
  }
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }
  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }
  if (isIgnoredRoute(normalized)) {
    return null
  }
  return normalized
}

const routeFromHref = href => {
  if (!href) {
    return null
  }
  let normalizedHref = href.replaceAll('&amp;', '&')
  if (normalizedHref.startsWith('http://') || normalizedHref.startsWith('https://')) {
    if (!normalizedHref.startsWith(BASE_URL)) {
      return null
    }
    const route = routeFromUrl(normalizedHref)
    return normalizeRoute(route)
  }
  if (!normalizedHref.startsWith('/network')) {
    return null
  }
  const absolute = new URL(normalizedHref, `${BASE_URL}/`).toString()
  const route = routeFromUrl(absolute)
  return normalizeRoute(route)
}

const routeToPageUrl = route => (route === '/' ? BASE_URL : `${BASE_URL}${route}`)

const routeToDir = route => (route === '/' ? OUTPUT_DIR : path.join(OUTPUT_DIR, route.slice(1)))

const outputFileForRoute = (route, routesWithChildren) => {
  if (route === '/') {
    return path.join(OUTPUT_DIR, 'index.mdx')
  }
  const segments = route.split('/').filter(Boolean)
  if (routesWithChildren.has(route)) {
    return path.join(OUTPUT_DIR, ...segments, 'index.mdx')
  }
  const fileName = `${segments.at(-1)}.mdx`
  const parentSegments = segments.slice(0, -1)
  return path.join(OUTPUT_DIR, ...parentSegments, fileName)
}

const parentRoute = route => {
  if (route === '/') {
    return null
  }
  const parts = route.split('/').filter(Boolean)
  if (parts.length <= 1) {
    return '/'
  }
  return `/${parts.slice(0, -1).join('/')}`
}

const hrefShouldSkip = href =>
  href.startsWith('mailto:') ||
  href.startsWith('tel:') ||
  href.startsWith('javascript:') ||
  href.startsWith('data:')

const rewriteInternalHref = href => {
  if (hrefShouldSkip(href)) {
    return href
  }
  const gitbookPathAbsolute = `${BASE_URL}/~gitbook/`
  const gitbookPathRelative = '/network/~gitbook/'
  if (href.startsWith(gitbookPathAbsolute) || href.startsWith(gitbookPathRelative)) {
    return href
  }
  let normalized = href
  if (normalized.startsWith(BASE_URL)) {
    normalized = normalized.slice(BASE_URL.length) || '/'
  }
  while (normalized.startsWith('/network')) {
    normalized = normalized.slice('/network'.length) || '/'
  }
  normalized = normalized.replace(/\.md(?=($|[#?]))/, '')
  return normalized === '' ? '/' : normalized
}

const cleanWrappedUrl = raw => raw.replace(/^<+/, '').replace(/>+$/, '')

// ---------------------------------------------------------------------------
// GitBook → Nextra component converters
// ---------------------------------------------------------------------------

const convertGitBookHints = markdown =>
  markdown.replace(
    /\{%\s*hint\s+style="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_, style, content) => {
      const type = HINT_TYPE_MAP[style] || 'default'
      return `\n<Callout type="${type}">\n${content.trim()}\n</Callout>\n`
    }
  )

const convertGitBookSteppers = markdown =>
  markdown.replace(
    /\{%\s*stepper\s*%\}([\s\S]*?)\{%\s*endstepper\s*%\}/g,
    (_, content) => {
      const cleaned = content
        .replace(/\{%\s*step\s*%\}/g, '')
        .replace(/\{%\s*endstep\s*%\}/g, '')
      return `\n<Steps>\n${cleaned.trim()}\n</Steps>\n`
    }
  )

const convertGitBookTabs = markdown =>
  markdown.replace(
    /\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g,
    (_, content) => {
      const tabs = []
      const tabPattern = /\{%\s*tab\s+title="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endtab\s*%\}/g
      let match
      while ((match = tabPattern.exec(content)) !== null) {
        tabs.push({ title: match[1], content: match[2].trim() })
      }
      if (tabs.length === 0) {
        return content
      }
      const items = tabs.map(t => `'${t.title.replace(/'/g, "\\'")}'`).join(', ')
      const tabContent = tabs
        .map(t => `<Tabs.Tab>\n${t.content}\n</Tabs.Tab>`)
        .join('\n')
      return `\n<Tabs items={[${items}]}>\n${tabContent}\n</Tabs>\n`
    }
  )

// Handle remaining simple GitBook tags (embeds, content-refs, code blocks)
const normalizeGitBookMarkup = markdown => {
  let normalized = markdown
  normalized = normalized.replace(/\{%\s*embed url="([^"]+)"\s*%\}/g, (_, rawUrl) => {
    const href = cleanWrappedUrl(rawUrl)
    return `\n[Embedded link](${href})\n`
  })
  normalized = normalized.replace(/\{%\s*content-ref url="([^"]+)"\s*%\}/g, (_, rawUrl) => {
    const href = rewriteInternalHref(cleanWrappedUrl(rawUrl))
    return `\n[Referenced page](${href})\n`
  })
  normalized = normalized.replace(/\{%\s*endcontent-ref\s*%\}/g, '')
  normalized = normalized.replace(/\{%\s*code[^%]*%\}/g, '\n```text\n')
  normalized = normalized.replace(/\{%\s*endcode\s*%\}/g, '\n```\n')
  // Catch-all for any remaining GitBook tags
  normalized = normalized.replace(/\{%[^%]*%\}/g, '')
  return normalized
}

// ---------------------------------------------------------------------------
// Markdown / MDX normalization
// ---------------------------------------------------------------------------

const rewriteMarkdownLinks = markdown =>
  markdown.replace(/(!?\[[^\]]*?\])\(([^)]+)\)/g, (full, label, target) => {
    const trimmed = target.trim()
    const titleStart = trimmed.search(/\s+"/)
    const hrefPart = titleStart >= 0 ? trimmed.slice(0, titleStart) : trimmed
    const suffix = titleStart >= 0 ? trimmed.slice(titleStart) : ''
    const rewrittenHref = rewriteInternalHref(hrefPart)
    return `${label}(${rewrittenHref}${suffix})`
  })

const normalizeMdxCompatibility = markdown => {
  let normalized = markdown
  normalized = normalized.replace(/<(https?:\/\/[^>\s]+)>/g, (_, href) => `[${href}](${href})`)
  normalized = normalized.replace(/<br\s*\/?>/gi, '<br />')
  const voidTags = ['img', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr']
  for (const tag of voidTags) {
    const pattern = new RegExp(`<${tag}\\b([^>]*)>`, 'gi')
    normalized = normalized.replace(pattern, full => {
      if (full.endsWith('/>')) {
        return full
      }
      return full.slice(0, -1) + ' />'
    })
  }
  normalized = normalized.replace(/\sstyle="[^"]*"/gi, '')
  return normalized
}

const decodeHtmlEntities = value =>
  value
    .replaceAll('&#x3C;', '<')
    .replaceAll('&#x3E;', '>')
    .replaceAll('&#x26;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&nbsp;', ' ')

const normalizePreCodeBlocks = markdown =>
  markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, rawContent) => {
    const textContent = decodeHtmlEntities(rawContent).replace(/<[^>]*>/g, '').trim()
    return `\n\`\`\`text\n${textContent}\n\`\`\`\n`
  })

// Clean up GitBook-specific artifacts that leak into the output
const cleanupArtifacts = markdown => {
  let cleaned = markdown
  // Remove zero-width-char section links: [​](https://docs-v2.mantle.xyz/...)
  cleaned = cleaned.replace(/\[[\u200B\u200C\u200D\uFEFF]*\]\(https?:\/\/docs-v2\.mantle\.xyz[^)]*\)/g, '')
  // Remove anchor tags used by GitBook: <a href="#..." id="..."></a>
  cleaned = cleaned.replace(/<a\s+href="#[^"]*"\s+id="[^"]*"\s*>\s*<\/a>/g, '')
  // Remove data-size attributes from images
  cleaned = cleaned.replace(/\s+data-size="[^"]*"/g, '')
  // Remove empty table rows (rows containing only pipes and whitespace)
  cleaned = cleaned.replace(/^\|[\s|]*\|[\s]*$/gm, '')
  // Collapse 3+ consecutive blank lines into 2
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n')
  return cleaned
}

// Escape MDX specials but skip code fences, math blocks, and JSX component lines
const escapeMdxSpecials = markdown => {
  const lines = markdown.split('\n')
  const output = []
  let inFence = false
  let inMath = false

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence
      output.push(line)
      continue
    }
    if (inFence) {
      output.push(line)
      continue
    }
    // Detect $$ block math delimiters
    if (line.trim() === '$$') {
      inMath = !inMath
      output.push(line)
      continue
    }
    if (inMath) {
      output.push(line)
      continue
    }
    // Skip JSX component lines (opening/closing tags starting with uppercase)
    if (/^\s*<\/?[A-Z][\w.]*/.test(line)) {
      output.push(line)
      continue
    }
    output.push(line.replaceAll('{', '\\{').replaceAll('}', '\\}').replaceAll('<>', '&lt;&gt;'))
  }

  return output.join('\n')
}

// ---------------------------------------------------------------------------
// Fetching helpers
// ---------------------------------------------------------------------------

const fetchText = async url => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }
  return response.text()
}

const fetchMarkdown = async pageUrl => {
  if (pageUrl === BASE_URL) {
    return fetchText(`${BASE_URL}/introduction/overviews.md`)
  }
  const directMarkdownUrl = `${pageUrl}.md`
  const directResponse = await fetch(directMarkdownUrl)
  if (directResponse.ok) {
    return directResponse.text()
  }
  const html = await fetchText(pageUrl)
  const alternateMatch = html.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/)
  if (!alternateMatch) {
    throw new Error(`Unable to resolve markdown source for ${pageUrl}`)
  }
  return fetchText(alternateMatch[1].replaceAll('&amp;', '&'))
}

const runConcurrently = async (items, limit, worker) => {
  let nextIndex = 0
  const workers = Array.from({ length: limit }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex
      nextIndex += 1
      await worker(items[currentIndex], currentIndex)
    }
  })
  await Promise.all(workers)
}

const ensureDirFor = async filePath => {
  await mkdir(path.dirname(filePath), { recursive: true })
}

const sortChildrenForRoute = (directoryRoute, children) => {
  if (directoryRoute !== '/') {
    return [...children].sort((left, right) => left.localeCompare(right))
  }
  const ranking = new Map(ROOT_SECTION_ORDER.map((item, index) => [item, index]))
  return [...children].sort((left, right) => {
    const leftRank = ranking.has(left) ? ranking.get(left) : Number.MAX_SAFE_INTEGER
    const rightRank = ranking.has(right) ? ranking.get(right) : Number.MAX_SAFE_INTEGER
    if (leftRank !== rightRank) {
      return leftRank - rightRank
    }
    return left.localeCompare(right)
  })
}

const writeMetaFile = async (directoryRoute, childrenByParent, routeTitles) => {
  const dir = routeToDir(directoryRoute)
  const outputPath = path.join(dir, '_meta.js')
  const meta = {}
  const children = sortChildrenForRoute(directoryRoute, childrenByParent.get(directoryRoute) || [])
  for (const child of children) {
    const childRoute = directoryRoute === '/' ? `/${child}` : `${directoryRoute}/${child}`
    meta[child] = routeTitles.get(childRoute) || toTitleCase(child)
  }
  if (Object.keys(meta).length === 0) {
    return
  }
  await ensureDirFor(outputPath)
  await writeFile(outputPath, `export default ${JSON.stringify(meta, null, 2)}\n`)
}

// ---------------------------------------------------------------------------
// Content processing pipeline
// ---------------------------------------------------------------------------

const processMarkdown = raw => {
  let markdown = raw.replaceAll('\r\n', '\n')

  // 1. Convert GitBook block-level components to Nextra JSX components
  markdown = convertGitBookHints(markdown)
  markdown = convertGitBookSteppers(markdown)
  markdown = convertGitBookTabs(markdown)

  // 2. Handle remaining simple GitBook tags
  markdown = normalizeGitBookMarkup(markdown)

  // 3. Rewrite internal links
  markdown = rewriteMarkdownLinks(markdown)

  // 4. MDX compatibility fixes
  markdown = normalizeMdxCompatibility(markdown)
  markdown = normalizePreCodeBlocks(markdown)

  // 5. Clean up GitBook artifacts
  markdown = cleanupArtifacts(markdown)

  // 6. Escape MDX specials (skips code fences, math blocks, JSX lines)
  markdown = escapeMdxSpecials(markdown)

  return markdown
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const main = async () => {
  await mkdir(path.join(process.cwd(), 'tmp'), { recursive: true })
  await rm(OUTPUT_DIR, { recursive: true, force: true })
  await mkdir(OUTPUT_DIR, { recursive: true })

  const routeSet = new Set(['/'])

  const sitemapIndex = await fetchText(SITEMAP_INDEX_URL)
  const sitemapUrls = extractLocs(sitemapIndex)
  let sitemapRouteCount = 0

  for (const sitemapUrl of sitemapUrls) {
    const sitemap = await fetchText(sitemapUrl)
    const locs = extractLocs(sitemap)
    for (const loc of locs) {
      if (!loc.startsWith(BASE_URL)) {
        continue
      }
      const route = normalizeRoute(routeFromUrl(loc))
      if (!route) {
        continue
      }
      sitemapRouteCount += 1
      routeSet.add(route)
    }
  }

  const rootHtml = await fetchText(BASE_URL)
  const rootHrefMatches = [...rootHtml.matchAll(/href="([^"]+)"/g)].map(match => match[1])
  let rootHrefRouteCount = 0
  for (const href of rootHrefMatches) {
    const route = routeFromHref(href)
    if (!route) {
      continue
    }
    rootHrefRouteCount += 1
    routeSet.add(route)
  }

  for (const route of REQUIRED_SECTION_ROUTES) {
    routeSet.add(route)
  }

  const pageRoutesOrdered = [...routeSet].sort((left, right) => {
    if (left === '/') {
      return -1
    }
    if (right === '/') {
      return 1
    }
    return left.localeCompare(right)
  })

  const routeTitles = new Map()
  const childrenByParent = new Map()
  const pageRoutes = new Set()
  const failures = []

  for (const route of pageRoutesOrdered) {
    pageRoutes.add(route)
    if (route !== '/') {
      const segments = route.split('/').filter(Boolean)
      for (let index = 0; index < segments.length; index += 1) {
        const parent = index === 0 ? '/' : `/${segments.slice(0, index).join('/')}`
        const child = segments[index]
        if (!childrenByParent.has(parent)) {
          childrenByParent.set(parent, [])
        }
        const children = childrenByParent.get(parent)
        if (!children.includes(child)) {
          children.push(child)
        }
      }
    }
  }

  const routesWithChildren = new Set()
  for (const [route, children] of childrenByParent.entries()) {
    if (children.length > 0) {
      routesWithChildren.add(route)
    }
  }

  await runConcurrently(pageRoutesOrdered, CONCURRENCY, async route => {
    const pageUrl = routeToPageUrl(route)
    const outputFile = outputFileForRoute(route, routesWithChildren)
    const fallbackTitle = route === '/' ? 'Overviews' : toTitleCase(route.split('/').filter(Boolean).at(-1))
    const hasChildren = routesWithChildren.has(route)

    let raw
    try {
      raw = await fetchMarkdown(pageUrl)
    } catch (error) {
      const title = fallbackTitle
      routeTitles.set(route, title)
      const placeholder = `---\ntitle: ${JSON.stringify(title)}\n${hasChildren ? 'asIndexPage: true\n' : ''}---\n\n# ${title}\n\nOriginal page fetch failed: ${pageUrl}\n`
      await ensureDirFor(outputFile)
      await writeFile(outputFile, placeholder)
      failures.push({ route, pageUrl, error: String(error) })
      return
    }

    const markdown = processMarkdown(raw)
    const foundTitle = firstH1(markdown)
    const title = foundTitle || fallbackTitle
    routeTitles.set(route, title)

    const body = foundTitle ? markdown.replace(/^#\s+.+?\n+/, '') : markdown
    const frontmatter = `---\ntitle: ${JSON.stringify(title)}\n${hasChildren ? 'asIndexPage: true\n' : ''}---\n\n`
    const content = `${frontmatter}${body.trimEnd()}\n`

    await ensureDirFor(outputFile)
    await writeFile(outputFile, content)
  })

  const directoryRoutes = new Set(['/'])
  for (const route of pageRoutes) {
    if (routesWithChildren.has(route)) {
      directoryRoutes.add(route)
    }
    let parent = parentRoute(route)
    while (parent) {
      directoryRoutes.add(parent)
      parent = parentRoute(parent)
    }
  }

  const sortedDirectoryRoutes = [...directoryRoutes].sort((left, right) => {
    if (left === '/') {
      return -1
    }
    if (right === '/') {
      return 1
    }
    return left.localeCompare(right)
  })

  for (const directoryRoute of sortedDirectoryRoutes) {
    await writeMetaFile(directoryRoute, childrenByParent, routeTitles)
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalRoutesFromSitemap: sitemapRouteCount,
    totalRoutesFromRootHtml: rootHrefRouteCount,
    totalGeneratedRoutes: pageRoutes.size,
    failedPages: failures.length,
    failures
  }
  await writeFile(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`)

  process.stdout.write(
    `Generated ${pageRoutes.size} routes (sitemap=${sitemapRouteCount}, rootHtml=${rootHrefRouteCount}).\n`
  )
  if (failures.length > 0) {
    process.stdout.write(`Failed pages: ${failures.length}. See ${REPORT_FILE}\n`)
  }
}

await main()
