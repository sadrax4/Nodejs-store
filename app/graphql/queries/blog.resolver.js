const { GraphQLList, GraphQLObjectType, GraphQLString } = require("graphql")
const { BlogModel } = require("../../models/blogs");
const { blogType } = require("../typeDefs/blog.type");
const { verifyTokenInGraphQl } = require("../../middlewares/verifyToken");
const { copyObject } = require("../../utils/function");
const blogResolver = {
    type: new GraphQLList(blogType),
    args: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        category: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const databaseQuery = copyObject(args);
        const { req } = context;
        req.user = await verifyTokenInGraphQl(req);
        const blogs = await BlogModel.find(databaseQuery).populate([
            { path: "author" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" }
        ]);
        return blogs;
    }
}
module.exports = { blogResolver }