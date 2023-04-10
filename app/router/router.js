const express = require("express");
const { homeRoutes } = require("./api");
const router = express.Router();
router.use("/", homeRoutes)
module.exports = { AllRoutes: router };