const sendSMS = require("../../../functions/sendSMS");
const redis = require("../../../functions/redis");
const query = require("querystring");

module.exports = async ({ param, body, request }) => {
    let response = {
        headers: {},
        body: {},
    }

    // 查看该 ip 调用该接口的次数,超出次数则直接禁止访问。
    let ip = request.connection.remoteAddress;
    const timeLimit = 60 * 60 * 24;
    const freqLimit = 20; // 每天 20 次
    let apiHistroy = await redis.get("sendSMS-ip-" + ip, timeLimit, () => 1);

    if (apiHistroy.hit) {
        if (+apiHistroy.value >= freqLimit) {
            response.body = {
                success: false,
                message: "尝试次数过多，请 24 小时后再试",
            }
            return response;
        }
    }


    // 检查手机号。
    body = query.parse(body);
    let number = body.number;
    if (!number.startsWith("+")) {
        response.body = {
            success: false,
            message: "手机号格式错误（完整的手机号需要包含以加号 ‘+’ 开头的国家代码）",
        };
        return response;
    }

    let values = {};
    values.type = param.type;

    switch (param.type) {
        case "signup":
            values.message = "【WriteStory 注册】您的验证码为： ";
            break;

        case "resetPwd":
            values.message = "【WriteStory 重置密码】您的验证码为： ";
            break;

        default:
            response.body = {
                success: false,
                message: "没有该类型"
            };
            return response;
            break;
    }

    // 获取保存的验证码，10分钟内有效（以手机号标记）
    let codeHistory = await redis.get("sendSMS-" + values.type + "-code-" + number, 60 * 10, () => {
        return Math.floor((Math.random() * 1000000)).toString().padStart(6, '0');
    });


    // 检查 1分钟内是否发送过验证码（以手机号标记）
    let sendHistroy = await redis.get("sendSMS-" + values.type + "-sent-" + number, 60, () => true);
    if (sendHistroy.hit) {
        response.body = {
            success: false,
            message: "请一分钟后重试",
        };
    }


    // 调用接口发送短信
    let responseText = await sendSMS({
        number: number,
        message: values.message + codeHistory.value,
    });


    // 记录短信发送次数
    await redis.set("sendSMS-ip-" + ip, timeLimit, old => +old + 1);

    // 返回值
    response.body = {
        success: true,
        message: "短信发送成功",
    }
    return response;
};