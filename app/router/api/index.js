const router = require("express").Router();
const { homeController } = require("../../http/controllers/api/home.controller");
router.get("/", homeController.indexPage);
module.exports = {
    homeRoutes: router
}