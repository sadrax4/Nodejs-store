const { verifyToken } = require("../middlewares/verifyToken");
const { AdminBlogApiRouter } = require("./admin/blog");
const { AdminCategoryApiRouter } = require("./admin/category");
const { AdminChapterApiRouter } = require("./admin/chapter");
const { AdminCourseApiRouter } = require("./admin/course");
const { AdminEpisodeApiRouter } = require("./admin/episode");
const { AdminProductApiRouter } = require("./admin/product");
const { AdminUserApiRouter } = require("./admin/user");
const router = require("express").Router();

router.use("/user", AdminUserApiRouter);
router.use("/category", AdminCategoryApiRouter);
router.use("/blog", AdminBlogApiRouter);
router.use("/product", AdminProductApiRouter);
router.use("/courses", AdminCourseApiRouter);
router.use("/chapter", AdminChapterApiRouter);
router.use("/episode", AdminEpisodeApiRouter);

module.exports = { adminRoutes: router };