const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

const { register, login } = require('../controller/user.controller')

// 注册
router.post('/register', register)

// 登陆
router.post('/login', login)

module.exports = router