const { GraphQLInputObjectType, GraphQLList, GraphQLString } = require("graphql");
const { productType } = require("../typeDefs/product.type");
const { ProductModel } = require("../../models/products");
const { copyObject } = require("../../utils/function");

const productResolver = {
    type: new GraphQLList(productType),
    resolve: async (_, args) => {
        const products = await ProductModel.find({}).populate([{ path: "supplier" }, { path: "category" }])
        return products;
    }
}
const findProductResolver = {
    type: new GraphQLList(productType),
    args: {
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const databaseQuery = copyObject(args);
        const products = await ProductModel.find(databaseQuery);
        return products;
    }
}
module.exports = {
    productResolver,
    findProductResolver
}