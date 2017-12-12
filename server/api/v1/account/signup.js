const query = require("querystring");
const monk = require("monk")("localhost:27017/writestory");
const jwt = require("jsonwebtoken");
const encrypt = require("../../../functions/encrypt");

const redis = require("../../../functions/redis");

module.exports = async({ param, body, request }) => {
    let response = {
        headers: {},
        body: {},
    }
    body = query.parse(body);
    let username = body.username;
    let password = body.password;
    let account = body.account;
    let captcha = body.captcha;

    if (!account || !password || !username || !captcha) {
        response.body = {
            success: false,
            message: "请输入所有信息",
        }
        return response;
    }

    // 校验账号合法性
    let key;
    if (account.startsWith("+")) {
        key = "sendSMS-signup-code-" + account;
    } else if (/^[^@]+@[^.]+(.[^.]+)+$/.test(account)) {
        key = "sendMail-signup-code-" + account;
    } else {
        response.body = {
            success: false,
            message: "只能使用手机或邮箱注册，手机号需要带有以+开头的国家代码"
        }
        return response;
    }

    // 校验昵称合法性
    if (username.indexOf("@") !== -1 || username.indexOf("+") !== -1) {
        response.body = {
            success: false,
            message: "昵称不能带有 @ 或 +"
        }
        return response;
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

    let user = monk.get("user");

    // 检查 账号/昵称 是否已经存在
    let accountExist = await user.findOne({
        account: account,
    });
    if (accountExist) {
        response.body = {
            success: false,
            message: "该手机/邮箱已注册，请直接登录"
        }
        return response;
    }

    let usernameExist = await user.findOne({
        username: username,
    });
    if (usernameExist) {
        response.body = {
            success: false,
            message: "该用户名已注册，请直接登录或更换用户名"
        }
        return response;
    }

    let salt = encrypt.salt(account, username);
    let encryptedPassword = encrypt.encrypt(password, salt);

    await user.insert({
        account: account,
        username: username,
        salt: salt,
        password: encryptedPassword,
    });

    let loginUser = await user.findOne({
        account: account,
        username: username,
    });

    if (!loginUser) {
        response.body = {
            success: false,
            message: "注册失败，请重试"
        }
        return response;
    }

    let info = {
        account: account,
        username: username,
        uid: loginUser._id.toString(),
    }

    let token = jwt.sign(info, salt);

    response.body = {
        success: true,
        message: "注册成功",
        token: token,
        info: info,
    }
    return response;

};