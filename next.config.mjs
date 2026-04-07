import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
  latex: true
})

export default withNextra({
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
})

