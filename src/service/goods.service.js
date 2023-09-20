const Goods = require('../model/goods.model')

class GoodsService {

    /**
     *
     *  添加商品到数据库
     * @param {*} data
     * @return {*} 
     * @memberof GoodsService
     */
    async addGoodsList(data) {
        //写入数据库
        const res = await Goods.create(data)
        return res.dataValues
    }
    /**
     *
     *  根据param获取指定商品
     * @param {*} { id, goods_name, goods_price, goods_num }
     * @return {*} 
     * @memberof GoodsService
     */
    async getGoodsInfo({ id, goods_name, goods_price, goods_num }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        goods_name && Object.assign(whereOpt, { goods_name })
        goods_price && Object.assign(whereOpt, { goods_price })
        goods_num && Object.assign(whereOpt, { goods_num })
        const res = await Goods.findOne({
            attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_img'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    /**
     *
     *  更新商品详情
     * @param {*} { id, goods_name, goods_price, goods_num, goods_img }
     * @return {*} 
     * @memberof GoodsService
     */
    async updateGoodsInfo(id, data) {
        const res = await Goods.update(data, { where: { id } })
        return res
    }


    /**
     *
     *  获取商品列表
     * @param {*} { page, limit }
     * @return {*} 
     * @memberof GoodsService
     */
    async getGoodsList({ page, limit }) {
        return await Goods.findAll({ offset: page * limit, limit: parseInt(limit) }) //分页
    }
}


module.exports = new GoodsService()