const { GraphQLString } = require("graphql")
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { responseType } = require("../typeDefs/public.types");
const { ProductModel } = require("../../models/products");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const likeProductResolver = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenInGraphQl(req);
        const { productID } = args;
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
module.exports = { likeProductResolver }