const { SupportController } = require("../../http/controllers/support/support.controller");
const router = require("express").Router();

router.get("/chat", SupportController.renderChat);

module.exports = {
    SupportApiRouter: router
}