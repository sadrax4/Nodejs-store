const { checkPermission } = require("../middlewares/permission.guard");
const { verifyToken } = require("../middlewares/verifyToken");
const { PERMISSIONS } = require("../utils/constans");
const { AdminBlogApiRouter } = require("./admin/blog");
const { AdminCategoryApiRouter } = require("./admin/category");
const { AdminChapterApiRouter } = require("./admin/chapter");
const { AdminCourseApiRouter } = require("./admin/course");
const { AdminEpisodeApiRouter } = require("./admin/episode");
const { AdminPermissionsApiRouter } = require("./admin/permissions");
const { AdminProductApiRouter } = require("./admin/product");
const { AdminRoleApiRouter } = require("./admin/role");
const { AdminUserApiRouter } = require("./admin/user");
const router = require("express").Router();

router.use("/user", AdminUserApiRouter);
router.use("/blog", checkPermission([PERMISSIONS.TEACHER]), AdminBlogApiRouter);
router.use("/role", checkPermission([PERMISSIONS.SUPERADMIN]), AdminRoleApiRouter);
router.use("/courses", checkPermission([PERMISSIONS.TEACHER]), AdminCourseApiRouter);
router.use("/chapter", checkPermission([PERMISSIONS.TEACHER]), AdminChapterApiRouter);
router.use("/episode", checkPermission([PERMISSIONS.TEACHER]), AdminEpisodeApiRouter);
router.use("/product", checkPermission([PERMISSIONS.SUPPLIER]), AdminProductApiRouter);
router.use("/category", checkPermission([PERMISSIONS.CONTENT_MANAGER]), AdminCategoryApiRouter);
router.use("/permissions", checkPermission([PERMISSIONS.SUPERADMIN]), AdminPermissionsApiRouter);

module.exports = { adminRoutes: router };