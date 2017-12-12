const query = require("querystring");
const monk = require("monk")("localhost:27017/writestory");
const jwt = require("jsonwebtoken");
const encrypt = require("../../../functions/encrypt");
const redis = require("../../../functions/redis");

module.exports = async ({ param, body, request }) => {
    let response = {
        headers: {},
        body: {},
    }
    body = query.parse(body);
    let account = body.account;
    let captcha = body.captcha;
    let password = body.password;

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

    // 获取缓存中的验证码
    let key;
    if (userInfo.account.startsWith("+")) {
        key = "sendSMS-resetPwd-code-" + userInfo.account;
    } else {
        key = "sendMail-resetPwd-code-" + userInfo.account;
    }

    // 校验验证码
    let savedCaptcha = await redis.get(key, () => null);
    await redis.del(key);
    if (!savedCaptcha.hit) {
        response.body = {
            success: false,
            message: "验证码已过期或未发送"
        }
        return response;
    }
    if (savedCaptcha.value !== captcha) {
        response.body = {
            success: false,
            message: "验证码错误，请重试"
        }
        return response;
    }

    // 检查密码强度
    if (!password || password.length < 6) {
        response.body = {
            success: false,
            message: "密码需要大于等于 6 个字符"
        }
        return response;
    }

    let salt = encrypt.salt(userInfo.account, userInfo.username);
    let encryptedPassword = encrypt.encrypt(password, salt);

    await user.findOneAndUpdate(
        {
            account: userInfo.account,
            username: userInfo.username,
        }, {
            $set: {
                salt: salt,
                password: encryptedPassword,
            },
        });

    let loginUser = await user.findOne({
        account: userInfo.account,
        username: userInfo.username,
    });

    if (!loginUser) {
        response.body = {
            success: false,
            message: "重设密码失败，请重试"
        }
        return response;
    }

    let info = {
        account: loginUser.account,
        username: loginUser.username,
        uid: loginUser._id.toString(),
    }

    let token = jwt.sign(info, salt);

    response.body = {
        success: true,
        message: "重设密码成功",
        token: token,
        info: info,
    }
    return response;

};