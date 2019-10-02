// const express = require('express')
// const next = require('next')
// const routes = require('../pages/routes')
// const cookieParser = require("cookie-parser");
//
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
// const handler = routes.getRequestHandler(app)
//
// app.prepare()
//     .then(() => {
//         const server = express()
//         server.use(handler)
//         server.use(cookieParser());
//         server.get('*', (req, res) => {
//             return handle(req, res)
//         })
//
//         server.listen(3001, (err) => {
//             if (err) throw err
//             console.log('> Ready on http://localhost:3001')
//         })
//     })

const Koa = require('koa')
// import cookie from 'koa-cookie'
// const cookie = require('koa-cookie');
const next = require('next')
const routes = require('../pages/routes')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const handler = routes.getRequestHandler(app)


app.prepare().then(() => {
    const server = new Koa()
    // server.use(cookie());;
    server.use(async (ctx, next) => {
        ctx.req["ctx"] = ctx; //req没有ctx
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
})
