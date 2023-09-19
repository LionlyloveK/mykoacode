const Koa = require('koa')
const { koaBody } = require('koa-body');

const errHandler = require('./errHandler'); //错误处理函数

const userRouter = require('../router/user.route')

const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

// 统一错误处理
app.on('error', errHandler)

module.exports = app