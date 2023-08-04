const { EmailController } = require("../../http/controllers/admin/email/email.controller");

const router = require("express").Router();

router.post("/send", EmailController.sendEmail);

module.exports = {
    EmailApiRouter: router
}