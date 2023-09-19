const { getUserInfo } = require('../service/user.service')
const { ERRORCODE, throwError } = require('../constant/result')
const errorCode = ERRORCODE.USER;

// 检测用户账号密码是否输入
const userValidator = async (ctx, next) => {
    const { user_name, password, is_admin } = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        return ctx.app.emit("error", throwError(errorCode, "用户名或密码为空"), ctx)
    }
    await next()
}

// 检测是否存在同一用户名
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已经存在', { user_name })
            return ctx.app.emit("error", throwError(errorCode, "用户名已经存在"), ctx)
        }

    } catch (err) {
        console.error('获取用户信息错误', err)
        return ctx.app.emit("error", throwError(errorCode, "获取用户信息错误"), ctx)
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser
}