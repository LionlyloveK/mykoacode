const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

// 创建模型

const User = seq.define(
    'hy_user',
    {
        //id会被自动创建
        user_name: {
            type: DataTypes.STRING,//类型
            allowNull: false,//是否可以为空
            unique: true,//是否唯一
            comment: '用户名,唯一',//简介
        },
        password: {
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: '密码',
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            comment: '是否是管理员 0不是管理员,1是管理员',
        },
    }

)

// User.sync({ force: true }) //同步数据表

module.exports = User
