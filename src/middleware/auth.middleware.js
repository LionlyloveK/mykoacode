const jwt = require('jsonwebtoken')
const { result, ERRORCODE, throwError } = require('../constant/result')
const errorCode = ERRORCODE.AUTH;
const { JWT_SECRET } = require('../config/config.default')

/**
 *
 *  需要token的接口
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit("error", throwError(errorCode, "token已过期"), ctx);
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit("error", throwError(errorCode, "无效的token"), ctx);

        }
    }
    await next()
}
/**
 *
 *  判断是否是管理员
 * @param {*} ctx
 * @param {*} next
 * @return {*} 
 */
const isAdmin = async (ctx, next) => {
    const { is_admin } = ctx.state.user
    if (!is_admin) {
        console.error('不是管理员')
        return ctx.app.emit("error", throwError(errorCode, "不是管理员"), ctx);
    }
    await next()
}
module.exports = { auth, isAdmin }