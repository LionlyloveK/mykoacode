const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs") // 密码加盐加密
const { createUser, getUserInfo, updateByid } = require('../service/user.service')
const { result, ERRORCODE, throwError } = require('../constant/result')
const { JWT_SECRET } = require('../config/config.default')
const errorCode = ERRORCODE.USER;
class UserController {
    /**
     *
     *  注册
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof UserController
     */
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, password, is_admin } = ctx.request.body

        // 合法性 拆分到middleware文件中,中间件

        // 2.操作数据库  拆分到了service文件中
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
    /**
     *
     *  登陆
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof UserController
     */
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // 1 获取用户信息
        try {
            const { password, ...res } = await getUserInfo({ user_name })
            // 从返回结果对象中剔除掉指定字段
            // 3.返回结果
            ctx.body = result("用户登陆成功", {
                token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                id: res.id,
                is_admin: res.is_admin,
                user_name: res.user_name,
            });
        } catch (err) {
            console.log(err);
            return ctx.app.emit("error", throwError(errorCode, "用户登陆失败"), ctx);
        }
    }
    /**
     *
     *  根据ID修改用户密码
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof UserController
     */
    async changePassword(ctx, next) {
        const { password } = ctx.request.body
        const { id } = ctx.state.user
        try {
            //根据ID修改密码
            if (await updateByid({ id, password })) {
                ctx.body = result("密码修改成功");
            } else {
                console.error(err, "密码修改失败");
                return ctx.app.emit("error", throwError(errorCode, "密码修改失败"), ctx);
            }
        } catch (err) {
            console.error(err, "密码修改失败");
            return ctx.app.emit("error", throwError(errorCode, "密码修改失败"), ctx);
        }
    }
    /**
     *
     *  修改管理员权限
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof UserController
     */
    async changeAdmin(ctx, next) {
        const { is_admin, id } = ctx.request.body
        try {
            if (id && is_admin != undefined) {
                //根据ID修改权限
                if (await updateByid({ id, is_admin })) {
                    ctx.body = result("权限修改成功");
                } else {
                    console.error("权限修改失败");
                    return ctx.app.emit("error", throwError(errorCode, "权限修改失败"), ctx);
                }
            } else {
                console.error("未输入ID");
                return ctx.app.emit("error", throwError(errorCode, "未输入ID"), ctx);
            }

        } catch (err) {
            console.error(err, "权限修改失败");
            return ctx.app.emit("error", throwError(errorCode, "权限修改失败"), ctx);
        }
    }

}

module.exports = new UserController()