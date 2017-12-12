const config = require("./smtp.config");
const mail = require("nodemailer");

module.exports = async({ from, to, subject, body }) => {

    let sender = mail.createTransport({
        host: config.host,
        port: 587,
        secure: false,
        auth: {
            user: config.user,
            pass: config.pass,
        }
    });

    let mailOption = {
        from: from + " <" + config.user + ">",
        to: to,
        subject: subject,
        html: body,
    };


    await new Promise((res, rej) => {
        sender.sendMail(mailOption, (err, info) => {
            if (err) rej();
            else res(info);
        })
    });
    return;
}