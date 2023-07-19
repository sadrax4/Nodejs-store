const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver, findProductResolver } = require("./queries/product.resolve");
const { categoriesResolver, childOfCategoryResolver, findCategoryResolver } = require("./queries/categories.resolver");
const { CourseResolver } = require("./queries/courses.resolver");
const { createCommentForBlog, createCommentForCourse, createCommentForProduct } = require("./mutations/comment");
const { likeProductResolver } = require("./mutations/like.resolve");
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blog: blogResolver,
        course: CourseResolver,
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
        createCommentForBlog,
        createCommentForCourse,
        createCommentForProduct,
        likeProductResolver
    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
module.exports = {
    graphqlSchema
}