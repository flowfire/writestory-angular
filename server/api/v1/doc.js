const query = require("querystring");
module.exports = async({ param, body, request }) => {
    let response = {
        headers: {},
        body: {},
    }

    let body = {
        version: "v1",
        apis: [{
            path: "account/login",
            params: "",
            result: "",
        }, {
            path: "account/signup",
            params: {
                username: "用户名",
                password: "密码",
                account: "手机或邮箱",
                captcha: "验证码",
            },
            result: {
                success: "结果（boolean）",
                message: "其他信息，一般为错误信息"
            },
        }, ],
    };

    response.body = body;
    return response;
};