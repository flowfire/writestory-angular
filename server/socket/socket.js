module.exports = server => {
    server.on('connect', client => {
        setInterval(() => {
            client.send("date:" + new Date);
        }, 1000);
    });
}