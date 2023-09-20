const fs = require('fs')
const Router = require('koa-router')
const router = new Router()


fs.readdirSync(__dirname).forEach(file => {
    if (file != 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
    }
})
// 随便写的一个欢迎
router.get("/", (ctx, next) => {
    ctx.body = "欢迎 这是后台server首页";
});
module.exports = router