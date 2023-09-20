const Router = require('koa-router')

const router = new Router({ prefix: '/goods' })

const {
    addGoods,
    updateGoods,
    getGoodsList
} = require('../controller/goods.controller')
const { auth, isAdmin } = require('../middleware/auth.middleware')
const { verifyGoods } = require('../middleware/goods.middleware')

// 添加商品
router.post('/add', auth, isAdmin, verifyGoods, addGoods)

// 修改商品
router.post('/update/:id', auth, isAdmin, verifyGoods, updateGoods)

// 获取商品列表
router.get('/list', auth, getGoodsList)


module.exports = router