import nextra from 'nextra'
import { redirects as redirectList } from './scripts/redirects.mjs'

const withNextra = nextra({
  contentDirBasePath: '/',
  latex: true
})

// Static export mode – used by GitHub Pages deployment
const isExport = process.env.STATIC_EXPORT === 'true'
const basePath = process.env.PAGES_BASE_PATH || ''

export default withNextra({
  reactStrictMode: true,

  // Static export settings (GitHub Pages)
  ...(isExport
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
        ...(basePath ? { basePath } : {}),
      }
    : {
        // Server-side redirects for dev / SSR mode
        async redirects() {
          return redirectList
        },
      }),

  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
})
