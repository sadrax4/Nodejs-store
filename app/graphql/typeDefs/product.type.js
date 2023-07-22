const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { authorType, categoryType } = require("./public.types");
const { commentType } = require("./comment.type");

const feature = new GraphQLObjectType({
    name: "feature",
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        color: { type: new GraphQLList(GraphQLString) },
        model: { type: new GraphQLList(GraphQLString) },
        madein: { type: GraphQLString }
    }
})
const productType = new GraphQLObjectType({
    name: "productType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imagesURL: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: categoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        format: { type: GraphQLString },
        supplier: { type: new GraphQLList(authorType) },
        feature: { type: feature },
        comments: { type: new GraphQLList(commentType) },
        likes: { type: new GraphQLList(authorType) },
        dislikes: { type: new GraphQLList(authorType) },
        bookmarks: { type: new GraphQLList(authorType) }
    }
})
module.exports = {
    productType
}