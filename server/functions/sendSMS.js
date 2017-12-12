const https = require("https");
const config = require("./twilio.config");
const query = require("querystring");

module.exports = async({ number, message }) => {

    let responseData = await new Promise(resolve => {
        let req = https.request({
            method: "POST",
            host: "api.twilio.com",
            path: "/2010-04-01/Accounts/" + config.id + "/Messages.json",
            auth: config.id + ":" + config.token,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }, response => {
            let responseData = "";
            response.on("data", data => {
                responseData += data;
            });
            response.on("end", () => {
                resolve(responseData);
            });
        });

        req.write(query.stringify({
            To: number,
            From: config.from,
            Body: message,
        }))
        req.end();
    });

    let response = {};

    response.body = responseData;

    return response;
};