const { APP_PORT } = require('./config/config.default')

const app = require("./app")

app.listen(APP_PORT, () => {
    console.log(`服务器已经启动 on http://localhost:${APP_PORT}`);
})