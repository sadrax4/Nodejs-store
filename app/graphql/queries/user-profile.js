const { GraphQLList, GraphQLString } = require("graphql");
const { copyObject, getBasketOfUser } = require("../../utils/function");
const { CoursesModel } = require("../../models/course");
const { coursesType } = require("../typeDefs/courses.type");
const { authorType, AnyType } = require("../typeDefs/public.types");
const { productType } = require("../typeDefs/product.type");
const { ProductModel } = require("../../models/products");
const createHttpError = require("http-errors");
const { blogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blogs");
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { UserModel } = require("../../models/users");

const getUserProductBookmarkedResolver = {
    type: new GraphQLList(productType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const bookmarkedProducts = await ProductModel.find({ bookmarks: user._id }).populate([
            { path: "supplier" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" }
        ]);
        if (bookmarkedProducts.length == 0) {
            throw createHttpError.NotFound("محصولی در لیست علاقه مندی وجود ندارد")
        }
        return bookmarkedProducts;
    }
}
const getUserCourseBookmarkedResolver = {
    type: new GraphQLList(coursesType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const bookmarkedCourses = await CoursesModel.find({ bookmarks: user._id }).populate([
            { path: "comments" },
            { path: "teacher" },
            { path: "category" },
            { path: "chapters" },
            { path: "comments._id" },
            { path: "comments.user" },
            { path: "comments.answers.user" },
        ]);
        if (bookmarkedCourses.length == 0) {
            throw createHttpError.NotFound("دوره ای در لیست علاقه مندی وجود ندارد")
        }
        return bookmarkedCourses;
    }
}
const getUserBlogBookmarkedResolver = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const bookmarkedBlog = await BlogModel.find({ bookmarks: user._id }).populate([
            { path: "supplier" },
            { path: "category" },
            { path: "comments._id" },
            { path: "comments.answers.user" },
        ]);
        if (bookmarkedBlog.length == 0) {
            throw createHttpError.NotFound("بلاگی در لیست علاقه مندی وجود ندارد")
        }
        return bookmarkedBlog;
    }
}
const getUserBasketResolver = {
    type: AnyType,
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        return await getBasketOfUser(user._id);
    }
}
module.exports = {
    getUserProductBookmarkedResolver,
    getUserCourseBookmarkedResolver,
    getUserBlogBookmarkedResolver,
    getUserBasketResolver
}