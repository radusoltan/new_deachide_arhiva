export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      disallow: [
          '/api/*',
          '/dashboard',
          '/content/*',
          '/management/*',

      ],
    },
    sitemap: process.env.APP_URL+'sitemap.xml',
  }
}