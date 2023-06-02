const { verifyToken } = require("../middlewares/verifyToken");
const { blogApiRouter } = require("./api/admin/blog");
const { CategoryApiRouter } = require("./api/admin/category");
const { productApiRouter } = require("./api/admin/product");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *  -   name: product(admin-panel)
 *      description: manage product
 *  -   name: admin-panel
 *      description: manage category
 * 
 * 
 *  -   name: category(admin-panel)
 *      description: manage category
 * 
 *  -   name: blog(admin-panel)
 *      description: manage blog
 */
router.use("/category", CategoryApiRouter);
router.use("/blog", blogApiRouter)
router.use("/product", productApiRouter);

module.exports = { adminRoutes: router };