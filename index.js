require("dotenv").config();
const  Application  = require("./app/server");
new Application(process.env.PORT, process.env.DB_URI);