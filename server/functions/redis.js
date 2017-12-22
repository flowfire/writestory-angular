const Redis = require("ioredis");
const redis = new Redis;
const TIMEOUT = 1000;

module.exports = {
    get: async(key, expried = 0, getter = () => "") => {
        let result = {
            hit: true,
            value: null,
        }
        result.value = await redis.get(key);

        if (result.value === null) {
            result.hit = false;
            result.value = getter();
            if (result.value !== null) {
                if (expried) redis.set(key, result.value, "EX", expried);
                else redis.set(key, result.value);
            }
        }

        return result;
    },

    set: async(key, expried = 0, setter = old => old) => {
        let result = {
            old: null,
            new: null,
        };
        result.old = await redis.get(key);
        result.new = setter(result.old);

        if (expried) redis.set(key, result.new, "EX", expried);
        else redis.set(key, result.new);

        return result;
    },

    del: async(key, ...keys) => {
        redis.del(key, ...keys);
        return;
    }
}