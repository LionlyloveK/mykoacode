const Koa = require('koa')
const path = require('path')

const { koaBody } = require('koa-body');
const koaStatic = require('koa-static');

const parameter = require("koa-parameter"); //中间件插件

const errHandler = require('./errHandler'); //错误处理函数

//注册路由
const router = require('../router')

const app = new Koa()

app.use(koaBody(
    {
        multipart: true, // 支持文件上传
        formidable: {
            uploadDir: path.join(__dirname, "../upload/online"), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        },
    }
))
// koa-static 文件静态访问
app.use(koaStatic(path.join(__dirname, "../upload/online")))
// 参数校验
app.use(parameter(app));
//注册路由
app.use(router.routes()).use(router.allowedMethods())

// 统一错误处理
app.on('error', errHandler)

module.exports = app