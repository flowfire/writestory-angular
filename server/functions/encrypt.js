const hash = require("hash.js");
module.exports = {
    salt: (account, username) => {
        let presalt = account + "@+@+" + username + new Date().getTime() + Math.random();
        return hash.sha1().update(presalt).digest('hex');
    },
    encrypt: (password, salt) => {
        return hash.sha256().update(password + "-salt-" + salt).digest('hex');
    },
}