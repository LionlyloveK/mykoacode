const User = require('../model/user.model')

class UserService {
    /**
     *
     * 创建用户添加到数据库
     * @param {*} user_name
     * @param {*} password
     * @param {*} is_admin
     * @return {*} 
     * @memberof UserService
     */
    async createUser(user_name, password, is_admin) {
        //写入数据库
        const res = await User.create({
            user_name,
            password,
            is_admin
        })
        return res.dataValues
    }
    /**
     *
     * 查询是否是重复的ID user_name
     * @param {*} id
     * @param {*} user_name
     * @param {*} is_admin
     * @return {*} 
     * @memberof UserService
     */
    async getUserInfo({
        id, user_name, is_admin
    }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        is_admin != undefined && Object.assign(newUser, { is_admin })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'is_admin', 'password'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }


    /**
     *
     * 根据ID来修改指定字段
     * @param {*} { id, user_name, password, is_admin }
     * @return {*} 
     * @memberof UserService
     */
    async updateByid({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}
        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin != undefined && Object.assign(newUser, { is_admin })
        const res = await User.update(newUser, {
            where: whereOpt
        })
        return res[0] > 0 ? true : false
    }
}


module.exports = new UserService()