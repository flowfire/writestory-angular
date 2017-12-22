const config = require("./smtp.config");
const mailgun = require("mailgun-js")({
    apiKey: config.apiKey,
    domain: config.domain,
});

module.exports = async({ from, to, subject, body }) => {

    return await new Promise((res, rej) => {
        mailgun.messages().send({
            from: `${from} <${config.from}>`,
            to: to,
            subject: subject,
            html: body,
        }, (err, body) => {
            if (err) rej(err);
            else res(body);
        });
    });
}