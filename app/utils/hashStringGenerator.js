const crypto = require('crypto');
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);