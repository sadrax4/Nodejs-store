const { BlogController } = require("../../http/controllers/admin/blog/blog.controller");
const { stringToArray } = require("../../middlewares/ stringToArray");
const {uploadFile} = require("../../utils/multer");
const router = require("express").Router();

router.get("/list", BlogController.getListOfBlog)
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), BlogController.updateBlog)
router.delete("/remove/:id", BlogController.removeBlog);
router.post("/add", uploadFile.single("image"), stringToArray("tags"), BlogController.addBlog)
router.get("/:id", BlogController.findBlogById)

module.exports = {
    AdminBlogApiRouter: router
}