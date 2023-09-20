const Router = require('koa-router')

const router = new Router({ prefix: '/file' })

const { upload } = require('../controller/file.controller')

const { auth, isAdmin } = require('../middleware/auth.middleware')
// 图片上传
router.post('/upload', auth, isAdmin, upload)


module.exports = router