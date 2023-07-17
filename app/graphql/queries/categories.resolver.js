const { GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { categoriesType } = require("../typeDefs/categories.type");
const { CategoryModel } = require("../../models/categories");
const { copyObject } = require("../../utils/function");

const categoriesResolver = {
    type: new GraphQLList(categoriesType),
    resolve: async () => {
        const categories = await CategoryModel.find({ parent: undefined });
        return categories;
    }
}
const childOfCategoryResolver = {
    type: new GraphQLList(categoriesType),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parent } = args;
        const categories = await CategoryModel.find({ parent });
        return categories;
    }
}
const findCategoryResolver = {
    type: new GraphQLList(categoriesType),
    args: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const databaseQuery = copyObject(args);
        const categories = await CategoryModel.find(databaseQuery);
        return categories;
    }
}

module.exports = {
    categoriesResolver,
    childOfCategoryResolver,
    findCategoryResolver
}