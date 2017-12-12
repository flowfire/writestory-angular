const query = require("querystring");
const monk = require("monk")("localhost:27017/writestory");
const jwt = require("jsonwebtoken");
const redis = require("../../../functions/redis");
const encrypt = require("../../../functions/encrypt");

module.exports = async({ param, body, request }) => {
    body = query.parse(body);
    let response = {};

    let account = body.account;
    let password = body.password;

    if (!account || !password) {
        response.body = {
            success: false,
            message: "请输入账号与密码",
        }
        return response;
    }

    let search = {};
    if (account.indexOf("@") !== -1 || account.indexOf("+") !== -1) {
        search.account = account;
    } else {
        search.username = account;
    }

    // 查看该账号登录次数,超出次数则直接禁止登录。
    let ip = request.connection.remoteAddress;
    const timeLimit = 60 * 60;
    const freqLimit = 10; // 每小时 10 次
    let errPwdTimes = 1;
    let loginHistroy = await redis.get("loginErr-account-" + account, timeLimit, () => "0");
    if (loginHistroy.hit) {
        if (+loginHistroy.value >= freqLimit) {
            response.body = {
                success: false,
                message: "密码错误次数过多，请1小时后再试",
            }
            return response;
        }
    }

    let user = monk.get("user");
    let userInfo = await user.findOne(search);

    if (!userInfo) {
        response.body = {
            success: false,
            message: "该账号不存在，请先注册",
        }
        return response;
    }

    let salt = userInfo.salt;
    let encryptedPassword = userInfo.password;
    if (encryptedPassword !== encrypt.encrypt(password, salt)) {

        // 增加错误次数
        redis.set("loginErr-account-" + account, timeLimit, old => +old + 1);

        response.body = {
            success: false,
            message: "密码不正确",
        }
        return response;
    }

    let info = {
        account: userInfo.account,
        username: userInfo.username,
        uid: userInfo._id.toString(),
    }

    let token = jwt.sign(info, salt);

    response.body = {
        success: true,
        message: "登录成功",
        token: token,
        info: info,
    }
    return response;
};