import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Inter } from 'next/font/google'
import { MantleLogo } from '../components/HomeCard'
import 'nextra-theme-docs/style.css'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: 'Mantle Network Docs',
    template: '%s - Mantle Docs',
  },
  description:
    'Documentation for the Mantle Network — a high-performance Ethereum Layer 2 scaling solution.',
  icons: '/favicon.svg',
  openGraph: {
    title: 'Mantle Network Docs',
    description: 'Documentation for the Mantle Network — a high-performance Ethereum Layer 2 scaling solution.',
    siteName: 'Mantle Docs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mantle Network Docs',
    description: 'Documentation for the Mantle Network — a high-performance Ethereum Layer 2 scaling solution.',
  },
}

/* =============================================
   Footer — Social icons + legal links
   ============================================= */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function MantleFooter() {
  return (
    <footer className="mantle-footer">
      <div className="mantle-footer-inner">
        <div className="mantle-footer-top">
          <div className="mantle-footer-brand">
            <MantleLogo />
          </div>
          <div className="mantle-footer-social">
            <a href="https://twitter.com/0xMantle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://github.com/mantlenetworkio" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://discord.gg/mantle" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <DiscordIcon />
            </a>
            <a href="https://t.me/mantlenetwork" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <TelegramIcon />
            </a>
          </div>
        </div>
        <div className="mantle-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Mantle Network. All rights reserved.</span>
          <div className="mantle-footer-links">
            <a href="https://www.mantle.xyz" target="_blank" rel="noopener noreferrer">Website</a>
            <a href="https://www.mantle.xyz/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://www.mantle.xyz/terms" target="_blank" rel="noopener noreferrer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* =============================================
   Navbar — Tab-style with section links
   ============================================= */
const navbar = (
  <Navbar
    logo={<MantleLogo />}
    projectLink="https://github.com/mantlenetworkio"
  />
)

const footer = <MantleFooter />

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
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
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/mantlenetworkio/mantle-docs/tree/main"
          sidebar={{
            defaultMenuCollapseLevel: 1,
          }}
          editLink="Edit this page on GitHub"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
