const { UserController } = require("../../http/controllers/admin/user/user.controller");
const { checkPermission } = require("../../middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");

const router = require("express").Router();

router.get("/list",checkPermission([PERMISSIONS.ALL]), UserController.getListOfUser);
router.get("/search/:search",checkPermission([PERMISSIONS.ALL]), UserController.searchUser);
router.patch("/update", UserController.updateUser);
router.get("/profile", UserController.userProfile);


module.exports = {
    AdminUserApiRouter: router
}