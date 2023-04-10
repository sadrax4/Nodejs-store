const express = require("express");
const { defualt: mongoose } = require("mongoose");
const path = require("path");
const {AllRoutes} = require("./router/router");
const autoBind = require("auto-bind");
module.exports = class Application {
    #app = express();

    constructor(PORT, DB_URI) {
        this.configApplication(PORT);
        this.createServer(PORT);
        this.connectToMongoDB(DB_URI);
        this.createRoutes();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: false }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
    }
    createServer(PORT) {
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            return console.log(`Server Run on http://localhost:${PORT}`);
        })
    }
    connectToMongoDB(DB_URI) {
        const mongoose = require('mongoose')
        mongoose.connect(DB_URI)
        return console.log('Connect to MongoDB')
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                message: "صفحه مورد نظر یافت نشد"
            })
        })
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}
