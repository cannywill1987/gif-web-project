//主要是给
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/home/')
routes.add('about', '/about')
routes.add('contact','/contact')
routes.add('post', '/blog/:slug')
