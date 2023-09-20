const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

// 创建模型

const Goods = seq.define(
    'hy_goods',
    {
        //id会被自动创建
        goods_name: {
            type: DataTypes.STRING,//类型
            allowNull: false,//是否可以为空
            comment: '商品名称',//简介
        },
        goods_price: {
            type: DataTypes.DECIMAL(10, 2),//类型
            allowNull: false,
            comment: '商品单价',
        },
        goods_num: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            comment: '商品库存',
        },
        goods_img: {
            type: DataTypes.STRING,//类型
            allowNull: false,
            comment: '商品图片',
        },
    }

)

// Goods.sync({ force: true }) //同步数据表

module.exports = Goods
