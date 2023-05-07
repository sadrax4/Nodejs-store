const express = require("express");
const { homeRoutes } = require("./api");
const { authRouter } = require("./user/auth");
const redisClient = require("../utils/init_redis");
const { developerRoutes } = require("./developer.routes");
const {adminRoutes} = require("./admin.routes");
const router = express.Router();

router.use("/admin", adminRoutes)
router.use("/developer", developerRoutes);
router.use("/user", authRouter);
router.use("/", homeRoutes);

module.exports = { AllRoutes: router };