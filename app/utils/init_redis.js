const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connecting to redis"));
redisClient.on("error", (error) => console.log(`can not connect to redis: ${error}`));
redisClient.on("ready", () => console.log("redis is connect and ready to use"));

module.exports = redisClient

