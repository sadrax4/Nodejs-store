const { GraphQLString } = require("graphql")
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { responseType } = require("../typeDefs/public.types");
const { ProductModel } = require("../../models/products");
const { StatusCodes } = require("http-status-codes");
const { BlogModel } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { checkExistBlog, checkExistProduct, checkExistCourse } = require("../utils");

const dislikeProductResolver = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const likedProduct = await ProductModel.findOne({ _id: productID, likes: user._id });
        const dislikedProduct = await ProductModel.findOne({ _id: productID, dislikes: user._id });
        const updateQuery = dislikedProduct ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } }
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        let message;
        if (!dislikedProduct) {
            if (likedProduct) {
                await ProductModel.updateOne({ _id: productID }, { $pull: { likes: user._id } });
            }
            message = "دیسلایک کردن محصول ثبت شد"
        } else {
            message = "دیسلایک کردن محصول لغو شد"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}
const dislikeBlogResolver = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { blogID } = args;
        await checkExistBlog(blogID);
        const likedBlog = await BlogModel.findOne({ _id: blogID, likes: user._id });
        const dislikedBlog = await BlogModel.findOne({ _id: blogID, dislikes: user._id });
        const updateQuery = dislikedBlog ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } }
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        let message;
        if (!dislikedBlog) {
            if (likedBlog) {
                await BlogModel.updateOne({ _id: blogID }, { $pull: { likes: user._id } });
            }
            message = "دیسلایک کردن بلاگ ثبت شد"
        } else {
            message = "دیسلایک کردن بلاگ لغو شد"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}
const dislikeCourseResolver = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const likedCourse = await CoursesModel.findOne({ _id: courseID, likes: user._id });
        const dislikedCourse = await CoursesModel.findOne({ _id: courseID, dislikes: user._id });
        const updateQuery = dislikedCourse ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } }
        await CoursesModel.updateOne({ _id: courseID }, updateQuery);
        let message;
        if (!dislikedCourse) {
            if (likedCourse) {
                await CoursesModel.updateOne({ _id: courseID }, { $pull: { likes: user._id } });
            }
            message = "دیسلایک کردن دوره ثبت شد"
        } else {
            message = "دیسلایک کردن دوره لغو شد"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}
module.exports = {
    dislikeProductResolver,
    dislikeBlogResolver,
    dislikeCourseResolver
}