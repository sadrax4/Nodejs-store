const { CategoryRoutes } = require("./api/admin/category");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *  -   name: admin-panel
 *      description: manage category
 * 
 *  -   name: category(admin-panel)
 *      description: manage category
 */
router.use("/category", CategoryRoutes);

module.exports = { adminRoutes: router };