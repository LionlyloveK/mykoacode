const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

const { register, login, changePassword, changeAdmin } = require('../controller/user.controller')
const {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    verifyPassword
} = require('../middleware/user.middleware')  //user的中间件
const { auth } = require('../middleware/auth.middleware')

// 注册
router.post('/register', userValidator, verifyUser, crpytPassword, register)
// 登陆
router.post('/login', userValidator, verifyLogin, login)
// 修改密码
router.post('/', auth, verifyPassword, crpytPassword, changePassword)
// 修改管理权限
router.post('/changeAdmin', auth, changeAdmin)

module.exports = router