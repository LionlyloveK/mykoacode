const { addGoodsList, getGoodsInfo, updateGoodsInfo, getGoodsList } = require('../service/goods.service')
const { result, ERRORCODE, throwError } = require('../constant/result')
const errorCode = ERRORCODE.GOODS;
class GoodsController {
    /**
     *
     * 添加商品
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof GoodsController
     */
    async addGoods(ctx, next) {
        try {
            const { goods_name } = ctx.request.body
            const old = await getGoodsInfo({ goods_name }) //判断是否存在此商品
            if (!old) {
                await addGoodsList(ctx.request.body)
                ctx.body = result("商品添加成功", ctx.request.body)
            } else {
                return ctx.app.emit('error', throwError(errorCode, '已经存在此商品了'), ctx)
            }

        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', throwError(errorCode, '添加商品错误'), ctx)
        }
    }

    /**
     *
     *修改商品详情
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof GoodsController
     */
    async updateGoods(ctx, next) {
        try {
            const { id } = ctx.params
            const res = await updateGoodsInfo(id, ctx.request.body)
            if (res[0]) {
                ctx.body = result('商品修改成功')
            } else {
                return ctx.app.emit('error', throwError('修改商品不存在'), ctx)
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', throwError('修改失败'), ctx)
        }
    }

    /**
     *
     *获取商品列表
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof GoodsController
     */
    async getGoodsList(ctx, next) {
        try {
            const { page, limit } = ctx.query //get请求这么获取参数
            const res = await getGoodsList({ page, limit })
            ctx.body = result('获取成功', res)
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', throwError('获取商品列表失败'), ctx)
        }
    }
}


module.exports = new GoodsController()