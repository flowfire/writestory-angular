const redis = require("../../../functions/redis");
const query = require("querystring");
const from = "WriteStory Robot";
const sendEmail = require("../../../functions/sendMail");
const mailStyle = require("../../../functions/mailStyle");

module.exports = async({ param, body, request }) => {
    let response = {
        headers: {},
        body: {},
    }
    body = query.parse(body);

    // 查看该 ip 调用该接口的次数,超出次数则直接禁止访问。
    let ip = request.connection.remoteAddress;
    const timeLimit = 60 * 60 * 24;
    const freqLimit = 20; // 每天 20 次
    let apiHistroy = await redis.get("sendMail-ip-" + ip, timeLimit, () => 1);
    if (apiHistroy.hit) {
        if (+apiHistroy.value >= freqLimit) {
            response.body = {
                success: false,
                message: "尝试次数过多，请 24 小时后再试",
            }
            return response;
        }
        await redis.set("sendMail-ip-" + ip, timeLimit, old => +old + 1);
    }

    // 检查邮箱。
    let address = body.address;
    if (!/^[^@]+@[^.]+(.[^.]+)+$/.test(address)) {
        response.body = {
            success: false,
            message: "邮箱格式错误",
        };
        return response;
    }

    let values = {};
    values.type = param.type;

    switch (param.type) {
        case "signup":
            values.title = "注册账号";
            values.subject = "注册为 WriteStory 的会员";
            break;

        case "resetPwd":
            values.title = "重置密码";
            values.subject = "重置您在 WriteStory 上的密码";
            break;

        default:
            response.body = {
                success: false,
                message: "无该类型."
            };
            return response;
            break;
    }



    // 获取保存的验证码，60分钟内有效（以邮箱标记）
    let codeHistory = await redis.get("sendMail-" + values.type + "-code-" + address, 60 * 60, () => {
        return Math.floor((Math.random() * 1000000)).toString().padStart(6, '0');
    });
    let code = codeHistory.value;

    // 检查 1分钟内是否发送过验证码（以邮箱标记）
    let sendHistroy = await redis.get("sendMail-" + values.type + "-sent-" + address, 60, () => true);
    if (sendHistroy.hit) {
        response.body = {
            success: false,
            message: "请一分钟后重试",
        };
    }

    // 生成邮件内容
    let content = await mailStyle("captcha", {
        title: values.title,
        code: code,
    });
    let subject = values.subject;

    // 发送邮件
    await sendEmail({
        from: from,
        to: address,
        subject: subject,
        body: content,
    });

    // 返回值
    response.body = {
        success: "true",
        message: "邮件发送成功"
    }
    return response;
};