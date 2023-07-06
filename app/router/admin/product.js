const { ProductController } = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../middlewares/ stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), ProductController.addProduct);
router.get("/list", ProductController.getAllProduct);
router.get("/list-new", ProductController.newGetAllProducts);
router.delete("/remove/:id", ProductController.removeProductById);
router.get("/search", ProductController.searchProduct);
router.patch("/update/:id", uploadFile.array("images", 10), stringToArray("tags"), ProductController.updateProduct);
router.get("/:id", ProductController.getOneProduct);

module.exports = {
   AdminProductApiRouter: router
}