const query = require("querystring");
const monk = require("monk")("localhost:27017/writestory");
const jwt = require("jsonwebtoken");
const encrypt = require("../../../functions/encrypt");
const redis = require("../../../functions/redis");

module.exports = async ({ param, body, request }) => {
    let response = {};

    body = query.parse(body);
    let account = body.account;

    let search = {};
    if (account.indexOf("@") !== -1 || account.indexOf("+") !== -1) {
        search.account = account;
    } else {
        search.username = account;
    }


    // 校验账号是否存在
    let user = monk.get("user");
    let userInfo = await user.findOne(search);
    if (!userInfo) {
        response.body = {
            success: false,
            message: "该账号尚未注册，请先注册"
        }
        return response;
    }

    let sendCaptcha;
    if (userInfo.account.indexOf("@") !== -1) {
        // 邮箱
        sendCaptcha = require("../mail/_type");
        body.address = userInfo.account;

    } else {
        // 手机
        sendCaptcha = require("../sms/_type");
        body.number = userInfo.account;
    }

    body = query.stringify(body);
    param.type = "resetPwd";
    response = await sendCaptcha({ param: param, body: body, request: request });

    return response;

}