/**
 * # App Config
 */

module.exports = {
  host: process.env.HOST || 'localhost',
  wordpress: process.env.WORDPRESS || 'http://localhost/wordpress',
  wpapi: process.env.WORDPRESS_API || 'http://localhost/wordpress/wp-json',
  port: process.env.PORT || 3000,
  app: {
    title: 'Kasia Boilerplate',
    description: 'A universal application boilerplate with Kasia',
    head: {
      // react-helmet configuration
      titleTemplate: '%s | Kasia Boilerplate',
      defaultTitle: 'Kasia Boilerplate',
      meta: [
        { name: 'description', content: 'A universal application boilerplate with Kasia' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '' },
        { property: 'og:image', content: '' },
        { property: 'og:locale', content: '' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
        { property: 'og:card', content: '' },
        { property: 'og:site', content: '' },
        { property: 'og:creator', content: '' },
        { property: 'og:image:width', content: '' },
        { property: 'og:image:height', content: '' }
      ]
    }
  }
}
