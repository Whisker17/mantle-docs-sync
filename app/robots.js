export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://docs.mantle.xyz/sitemap.xml',
  }
}
