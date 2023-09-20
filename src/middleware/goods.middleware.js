const { result, ERRORCODE, throwError } = require('../constant/result')
const errorCode = ERRORCODE.GOODS;
/**
 *
 *添加商品参数校验
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
const verifyGoods = async (ctx, next) => {
    try {
        // 参数校验
        ctx.verifyParams({
            goods_name: 'string',
            goods_price: 'number',
            goods_num: 'number',
            goods_img: 'string',
        })
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', throwError(errorCode, '添加商品校验错误'), ctx)
    }
    await next()
}


module.exports = {
    verifyGoods
}