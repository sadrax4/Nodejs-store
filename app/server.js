const express = require("express");
const { defualt: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const autoBind = require("auto-bind");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const ejs = require("ejs");
const ExpressEjsLayouts = require('express-ejs-layouts');
const { InitSocketIo } = require("./utils/initSocketIo");
const { socketHandler } = require("./socket");

module.exports = class Application {
    #app = express();
    constructor(PORT, DB_URI) {
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_URI);
        this.initTemplateEngine();
        this.init_redis();
        this.createRoutes();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(cors());
        this.#app.use(bodyParser.urlencoded({ extended: true }));
        this.#app.use(bodyParser.json());
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
        this.#app.use("/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(
                swaggerJsDoc({
                    swaggerDefinition: {
                        openapi: "3.0.1",
                        info: {
                            title: "X4 store",
                            version: "1.0.0",
                            description: "بزرگترین فروشگاه ایکس فور ها",
                            contact: {
                                name: "Sadra soleimani",
                                email: "sadrasadrasadra6@gmail.com",
                                phone: "09162844007",
                                url: "http://github.com/sadrax4"
                            }
                        },
                        servers: [
                            {
                                url: "http://localhost:3000"
                            }
                        ],
                        components: {
                            securitySchemes: {
                                BearerAuth: {
                                    type: "http",
                                    scheme: "bearer",
                                    bearerFormat: "JWT"
                                }
                            }
                        },
                        security: [{ BearerAuth: [] }]
                    },
                    apis: ["./app/router/**/*.js"]
                }), { explorer: true }
            )
        )
    }
    initTemplateEngine() {
        this.#app.set("view engine", "ejs");
        this.#app.use(ExpressEjsLayouts)
        this.#app.set("views", "resource/views");
        this.#app.set("layout", "layouts/master");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);
    }
    createServer(PORT) {
        const http = require("http");
        const server = http.createServer(this.#app);
        const io = InitSocketIo(server);
        socketHandler(io);
        server.listen(PORT, () => {
            return console.log(`Server Run on http://localhost:${PORT}`);
        })
    }
    connectToMongoDB(DB_URI) {
        console.log(DB_URI)
        const mongoose = require('mongoose')
        mongoose.connect(DB_URI);
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to DB");
        })
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    init_redis() {
        require("./utils/initRedis");
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("صفحه مورد نظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            })
        })
    }
}
