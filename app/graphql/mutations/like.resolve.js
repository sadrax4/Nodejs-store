const { GraphQLString } = require("graphql")
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { responseType } = require("../typeDefs/public.types");
const { ProductModel } = require("../../models/products");
const { StatusCodes } = require("http-status-codes");
const { BlogModel } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { checkExistBlog, checkExistProduct, checkExistCourse } = require("../utils");

const likeProductResolver = {
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
        const updateQuery = likedProduct ? { $pull: { likes: user._id } } : { $push: { likes: user._id } }
        await ProductModel.updateOne({ _id: productID }, updateQuery);
        let message;
        if (!likedProduct) {
            if (dislikedProduct) {
                await ProductModel.updateOne({ _id: productID }, { $pull: { dislikes: user._id } });
            }
            message = "لایک کردن محصول ثبت شد"
        } else {
            message = "لایک کردن محصول لغو شد"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}
const likeBlogResolver = {
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
        const updateQuery = likedBlog ? { $pull: { likes: user._id } } : { $push: { likes: user._id } }
        await BlogModel.updateOne({ _id: blogID }, updateQuery);
        let message;
        if (!likedBlog) {
            if (dislikedBlog) {
                await BlogModel.updateOne({ _id: blogID }, { $pull: { dislikes: user._id } });
            }
            message = "لایک کردن بلاگ ثبت شد"
        } else {
            message = "لایک کردن بلاگ لغو شد"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}
const likeCourseResolver = {
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
        const dislikedBlog = await CoursesModel.findOne({ _id: courseID, dislikes: user._id });
        const updateQuery = likedCourse ? { $pull: { likes: user._id } } : { $push: { likes: user._id } }
        await CoursesModel.updateOne({ _id: courseID }, updateQuery);
        let message;
        if (!likedCourse) {
            if (dislikedBlog) {
                await CoursesModel.updateOne({ _id: courseID }, { $pull: { dislikes: user._id } });
            }
            message = "لایک کردن دوره ثبت شد"
        } else {
            message = "لایک کردن دوره لغو شد"
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
    likeProductResolver,
    likeBlogResolver,
    likeCourseResolver
}