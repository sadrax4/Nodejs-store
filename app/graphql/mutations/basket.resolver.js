const { GraphQLString } = require("graphql")
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { responseType } = require("../typeDefs/public.types");
const { StatusCodes } = require("http-status-codes");
const { checkExistProduct, checkExistCourse } = require("../utils");
const { UserModel } = require("../../models/users");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../utils/function");
const createHttpError = require("http-errors");

const addProductToBasketResolver = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const product = await findProudctInBasket(user._id, productID);
        if (product) {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "basket.products.productID": productID },
                {
                    $inc: { "basket.products.$.count": 1 }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        } else {
            const updateResult = await UserModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        "basket.products":
                        {
                            productID,
                            count: 1
                        }
                    }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: "محصول با موفقیت به سبد خرید اضافه شد"
            }
        }
    }
}
const addCourseToBasketResolver = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const course = await findCourseInBasket(user._id, courseID);
        if (course) {
            await UserModel.updateOne(
                { _id: user._id, "basket.courses.courseID": courseID },
                {
                    $inc: { "basket.courses.$.count": 1 }
                })
        } else {
            const updateResult = await UserModel.updateOne(
                { _id: user._id },
                {
                    $push: {
                        "basket.courses":
                        {
                            courseID,
                            count: 1
                        }
                    }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: "دوره با موفقیت به سبد خرید اضافه شد"
            }
        }
    }
}
const removeCourseInBasketResolver = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { courseID } = args;
        await checkExistCourse(courseID);
        const course = await findCourseInBasket(user._id, courseID);
        if (course.count == 1) {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "basket.courses.courseID": courseID },
                {
                    $pull: {
                        "basket.courses":
                        {
                            courseID
                        }
                    }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        } else {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "basket.courses.courseID": courseID },
                {
                    $inc: { "basket.courses.$.count": -1 }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: "دوره با موفقیت از سید خرید حذف شد"
            }
        }
    }
}
const removeProductInBasketResolver = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { productID } = args;
        await checkExistProduct(productID);
        const product = await findProudctInBasket(user._id, productID);
        if (product.count == 1) {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "basket.products.productID": productID },
                {
                    $pull: {
                        "basket.products":
                        {
                            productID
                        }
                    }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        } else {
            const updateResult = await UserModel.updateOne(
                { _id: user._id, "basket.products.productID": productID },
                {
                    $inc: { "basket.products.$.count": -1 }
                })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطای داخلی");
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: "محصول بلا موفقیت از سید خرید حذف شد"
            }
        }
    }
}
async function findProudctInBasket(userID, productID) {
    const productsInbasket = await UserModel.findOne(
        { _id: userID, "basket.products.productID": new mongoose.Types.ObjectId(productID) },
        { "basket.products.$": 1 }
    )
    const product = copyObject(productsInbasket);
    return product?.basket?.products?.[0];
}
async function findCourseInBasket(userID, courseID) {
    const coursesInbasket = await UserModel.findOne(
        { _id: userID, "basket.courses.courseID": new mongoose.Types.ObjectId(courseID) },
        { "basket.courses.$": 1 }
    )
    const course = copyObject(coursesInbasket);
    return course?.basket?.courses?.[0];
}
module.exports = {
    addProductToBasketResolver,
    addCourseToBasketResolver,
    removeProductInBasketResolver,
    removeCourseInBasketResolver
}