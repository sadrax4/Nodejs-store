const { CategoryController } = require("../../http/controllers/admin/category/category.controller");
const router = require("express").Router();

router.post("/add", CategoryController.addCategory);
router.get("/parents", CategoryController.getParents);
router.delete("/remove/:id", CategoryController.removeCategory);
router.get("/all", CategoryController.getAllCategory);
router.get("/list-of-all", CategoryController.getAllCategoryWithout);
router.patch("/update-title/:id", CategoryController.updateCategoryTitle);
router.get("/:id", CategoryController.getCategoryById);

module.exports = {
    AdminCategoryApiRouter: router
}