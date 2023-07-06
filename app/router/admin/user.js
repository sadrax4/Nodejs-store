const { UserController } = require("../../http/controllers/admin/user/user.controller");

const router = require("express").Router();

router.get("/list", UserController.getListOfUser);
router.get("/search/:search", UserController.searchUser);
router.patch("/update", UserController.updateUser);

module.exports = {
    AdminUserApiRouter: router
}