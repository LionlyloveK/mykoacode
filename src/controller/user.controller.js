const { createUser } = require('../service/user.service')
const { result, ERRORCODE, throwError } = require('../constant/result')
const errorCode = ERRORCODE.USER;
class UserController {
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, password, is_admin } = ctx.request.body
        // 合理性
        // 2.操作数据库
        try {
            const res = await createUser(user_name, password, is_admin)
            // 3.返回结果
            ctx.body = result("用户注册成功", {
                id: res.id,
                user_name: res.user_name,
                is_admin: res.is_admin
            });
        } catch (err) {
            console.log(err);
            return ctx.app.emit("error", throwError(errorCode, "用户注册失败"), ctx);
        }
    }
    async login(ctx, next) {
        ctx.body = ctx.request.body
    }
}

module.exports = new UserController()