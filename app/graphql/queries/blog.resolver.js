const { GraphQLList, GraphQLObjectType } = require("graphql")
const { BlogModel } = require("../../models/blogs");
const { blogType } = require("../typeDefs/blog.type");

const blogResolver = {
    type: new GraphQLList(blogType),
    resolve: async () => {
        const blogs = await BlogModel.find({}).populate([{ path: "author" }, { path: "category" }]);
        return blogs;
    }
}

module.exports = { blogResolver }