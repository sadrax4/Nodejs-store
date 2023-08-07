const { SupportController } = require("../../http/controllers/support/support.controller");
const { checkLogin, checkAccessLogin } = require("../../middlewares/auth");
const router = require("express").Router();

router.get("/chat", checkLogin, SupportController.renderChat);
router.get("/login", checkAccessLogin, SupportController.renderLogin);
router.post("/login", checkAccessLogin, SupportController.login)

module.exports = {
    SupportApiRouter: router
}