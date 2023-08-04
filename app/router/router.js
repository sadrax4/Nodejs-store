const express = require("express");
const { homeRouter } = require("./api");
const { authRouter } = require("./user/auth");
const { developerRouter } = require("./developer.routes");
const { adminRouter } = require("./admin.routes");
const { CategoryApiPrisma } = require("./prisma-api/category.api");
const { blogApiPrisma } = require("./prisma-api/blog.api");
const { PaymentApiRouter } = require("./api/payment");
const { SupportApiRouter } = require("./support/support");
const { verifyToken } = require("../middlewares/verifyToken");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../utils/graphql.config");
const { RoomApiRouter } = require("./support/room");
const { NamespaceApiRouter } = require("./support/namespace");
const { EmailApiRouter } = require("./admin/email");
const router = express.Router();

router.use("/email", EmailApiRouter);
router.use("/home", homeRouter);
router.use("/support", SupportApiRouter)
router.use("/room", RoomApiRouter)
router.use("/namespace", NamespaceApiRouter)
router.use("/user", authRouter);
router.use("/graphql", graphqlHTTP(graphqlConfig))
router.use("/admin", verifyToken, /*checkRole("ADMIN"),*/ adminRouter)
router.use("/developer", developerRouter);
router.use("/blogs", blogApiPrisma)
router.use("/category", CategoryApiPrisma)
router.use("/", PaymentApiRouter);

module.exports = { AllRoutes: router };