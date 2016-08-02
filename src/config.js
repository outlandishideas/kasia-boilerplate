var environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  wordpress: process.env.WORDPRESS || 'localhost/kasia-boilerplate-wp',
  port: process.env.PORT,
  app: {
    title: 'Kasia Boilerplate',
    description: '',
    head: {
      titleTemplate: 'Kasia Boilerplate',
      meta: [
        { name: 'description', content: '' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '' },
        { property: 'og:image', content: '' },
        { property: 'og:locale', content: '' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '' },
        { property: 'og:creator', content: '' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment)
