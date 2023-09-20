const path = require('path')
const fs = require('fs');
const { result, ERRORCODE, throwError } = require('../constant/result')

const errorCode = ERRORCODE.UPLOAD;
class UploadController {
    /**
     *
     *  文件上传
     * @param {*} ctx
     * @param {*} next
     * @return {*} 
     * @memberof UploadController
     */
    async upload(ctx, next) {
        const { file } = ctx.request.files || []
        const fileTypes = ['image/jpeg', 'image/png'] //控制可以上传的文件类型
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                fs.unlinkSync(file.filepath); // 删除上传的文件
                return ctx.app.emit("error", throwError(errorCode, `不支持(${file.mimetype})此格式文件上传`), ctx);
            }
            ctx.body = result("图片上传成功", {
                path: path.basename(file.filepath),
                file_name: path.basename(file.originalFilename),
            })
        } else {
            return ctx.app.emit("error", throwError(errorCode, "请上传文件"), ctx);
        }
    }
}


module.exports = new UploadController()