const { PermissionsController } = require("../../http/controllers/admin/RBAC/permissions.controller");
const { toUpperCase } = require("../../middlewares/toUpperCase");
const router = require("express").Router();

router.get("/list", PermissionsController.getPermissions);
router.post("/add",toUpperCase("name"), PermissionsController.addPermission);
router.delete("/remove/:id", PermissionsController.removePermission);
router.patch("/update/:id", PermissionsController.updatePermission);

module.exports = {
    AdminPermissionsApiRouter: router
}