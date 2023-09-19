// 连接数据库

const { Sequelize } = require('sequelize');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = require("../config/config.default")
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    timezone: "+08:00",
    define: {
        freezeTableName: true //强制表名称等于模型名称
    }
});

seq
    .authenticate()
    .then(() => {
        console.log("数据库连接成功")
    })
    .catch((err) => {
        console.log("数据库连接失败", err)
    })


module.exports = seq