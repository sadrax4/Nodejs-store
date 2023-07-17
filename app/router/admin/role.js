const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../middlewares/ stringToArray");
const { toUpperCase } = require("../../middlewares/toUpperCase");

const router = require("express").Router();

router.get("/list", RoleController.getRoles);
router.post("/add", stringToArray("permissions"), RoleController.addRole);
router.delete("/remove/:field", toUpperCase("field"), RoleController.removeRole);
router.patch("/update/:id",stringToArray("permissions") ,RoleController.updateRole);

module.exports = {
    AdminRoleApiRouter: router
}