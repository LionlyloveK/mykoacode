const bcrypt = require("bcryptjs") // 密码加盐加密
const { getUserInfo } = require('../service/user.service')
const { ERRORCODE, throwError } = require('../constant/result') //错误CODE封装
const errorCode = ERRORCODE.USER;

/**
 *
 * 检测用户账号密码是否输入
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
const userValidator = async (ctx, next) => {
    const { user_name, password, is_admin } = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        return ctx.app.emit("error", throwError(errorCode, "用户名或密码为空"), ctx)
    }
    await next()
}

/**
 *
 * 检测是否存在同一用户名
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
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

/**
 *
 * 注册密码加密
 * @param {*} ctx
 * @param {*} next
 */
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}
/**
 *
 * 判断密码是否重复
 * @param {*} ctx
 * @param {*} next
 */
const verifyPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    console.log("🚀 ~ file: user.middleware.js:66 ~ verifyPassword ~ password:", password)
    const { id } = ctx.state.user
    try {
        const oldPassword = await getUserInfo({ id })
        if (bcrypt.compareSync(password, oldPassword.password)) {
            console.error("密码重复");
            return ctx.app.emit("error", throwError(errorCode, "密码重复"), ctx);
        }
        await next()
    } catch (err) {
        console.error(err);
        return ctx.app.emit("error", throwError(errorCode, "密码重复"), ctx);
    }
}

/**
 *
 * 校验登陆账号密码
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        // 用户是否存在
        if (!res) {
            console.error('用户名不存在', { user_name })
            return ctx.app.emit("error", throwError(errorCode, "用户名不存在"), ctx)
        }
        // 密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('用户密码错误')
            return ctx.app.emit("error", throwError(errorCode, "用户密码错误"), ctx)
        }

    } catch (err) {
        console.error('用户登录失败', err)
        return ctx.app.emit("error", throwError(errorCode, "用户登录失败"), ctx)
    }
    await next()
}


module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    verifyPassword
}