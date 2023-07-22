const { GraphQLString, GraphQLList } = require("graphql")
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { responseType } = require("../typeDefs/public.types");
const { ProductModel } = require("../../models/products");
const { StatusCodes } = require("http-status-codes");
const { BlogModel } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { checkExistBlog, checkExistProduct, checkExistCourse } = require("../utils");
const { blogType } = require("../typeDefs/blog.type");
const { productType } = require("../typeDefs/product.type");
const { coursesType } = require("../typeDefs/courses.type");

const bookmarkProductResolver = {
    type: new GraphQLList(productType),
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const bookmarkedProduct = await ProductModel.findOne({ _id: productID, bookmarks: user._id });
        const updateQuery = bookmarkedProduct ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } };
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        let message;
        if (!bookmarkedProduct) {
            message = "ذخیره کردن محصول ثبت شد"
        } else {
            message = "ذخیره کردن محصول لغو شد"
        }
        return {
            statusCode: StatusCodes.OK,
            data: {
                message
            }
        }
    }
}
const bookmarkBlogResolver = {
    type: new GraphQLList(blogType),
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { blogID } = args;
        await checkExistBlog(blogID);
        const bookmarkedBlog = await BlogModel.findOne({ _id: blogID, bookmarks: user._id });
        const updateQuery = bookmarkedBlog ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        let message;
        if (!bookmarkedBlog) {
            message = "ذخیره کردن بلاگ ثبت شد"
        } else {
            message = "ذخیره کردن بلاگ لغو شد"
        }
        return {
            statusCode: StatusCodes.OK,
            data: {
                message
            }
        }
    }
}
const bookmarkCourseResolver = {
    type: new GraphQLList(coursesType),
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const bookmarkedCourse = await CoursesModel.findOne({ _id: courseID, bookmarks: user._id });
        const updateQuery = bookmarkedCourse ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
        await CoursesModel.updateOne({ _id: courseID }, updateQuery);
        let message;
        if (!bookmarkedCourse) {
            message = "ذخیره کردن دوره ثبت شد"
        } else {
            message = "ذخیره کردن دوره لغو شد"
        }
        return {
            statusCode: StatusCodes.OK,
            data: {
                message
            }
        }
    }
}
module.exports = {
    bookmarkProductResolver,
    bookmarkBlogResolver,
    bookmarkCourseResolver
}