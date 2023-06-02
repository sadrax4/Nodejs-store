const express = require("express");
const { homeRoutes } = require("./api");
const { authRouter } = require("./user/auth");
const redisClient = require("../utils/init_redis");
const { developerRoutes } = require("./developer.routes");
const { adminRoutes } = require("./admin.routes");
const { CategoryApiPrisma } = require("./prisma-api/category.api");
const { blogApiPrisma } = require("./prisma-api/blog.api");
const { verifyToken, checkRole } = require("../middlewares/verifyToken");
const router = express.Router();

router.use("/admin", verifyToken, checkRole("ADMIN"), adminRoutes)
router.use("/developer", developerRoutes);
router.use("/blogs", blogApiPrisma)
router.use("/category", CategoryApiPrisma)
router.use("/user", authRouter);
router.use("/", homeRoutes);

module.exports = { AllRoutes: router };