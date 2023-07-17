const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver, findProductResolver } = require("./queries/product.resolve");
const { categoriesResolver, childOfCategoryResolver, findCategoryResolver } = require("./queries/categories.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blog: blogResolver,
        product: productResolver,
        findProduct: findProductResolver,
        category: categoriesResolver,
        findCategory: findCategoryResolver,
        categoryChild: childOfCategoryResolver
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutaion",
    fields: {

    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery
    //mutation: RootMutation
})
module.exports = {
    graphqlSchema
}