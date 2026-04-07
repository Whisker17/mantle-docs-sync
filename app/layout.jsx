import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Mantle Network Docs',
    template: '%s | Mantle Network Docs'
  },
  description: 'Migrated from docs.mantle.xyz/network'
}

const navbar = <Navbar logo={<b>Mantle Network</b>} />
const footer = <Footer>© {new Date().getFullYear()} Mantle</Footer>

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase='https://github.com/mantlenetworkio'
          sidebar={{
            defaultMenuCollapseLevel: 1
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

