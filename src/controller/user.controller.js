const { createUser, getUserInfo } = require('../service/user.service')


class UserController {
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, password, is_admin } = ctx.request.body

        // 合法性
        if (!user_name || !password) {
            console.error('用户名或密码为空', ctx.request.body)
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: "用户名或者密码为空",
                result: ''
            }
            return
        }
        // 合理性
        if (getUserInfo({ user_name })) {
            ctx.status = 409
            ctx.body = {
                code: '10001',
                message: "用户已经存在了",
                result: ''
            }
            return
        }
        // 2.操作数据库
        const res = await createUser(user_name, password, is_admin)
        // 3.返回结果
        ctx.body = {
            code: 0,
            message: "用户注册成功",
            result: {
                id: res.id,
                user_name: res.user_name,
                is_admin: res.is_admin
            }
        }
    }
    async login(ctx, next) {
        ctx.body = ctx.request.body
    }
}

module.exports = new UserController()