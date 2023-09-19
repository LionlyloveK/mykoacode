const User = require('../model/user.model')

class UserService {
    async createUser(user_name, password, is_admin) {
        //写入数据库
        const res = await User.create({
            user_name,
            password,
            is_admin
        })
        return res.dataValues
    }
    // 查询是否是重复的ID user_name
    async getUserInfo({
        id, user_name, is_admin
    }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        is_admin && Object.assign(whereOpt, { is_admin })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
}


module.exports = new UserService()