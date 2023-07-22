const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { authorType, categoryType } = require("./public.types");
const { commentType } = require("./comment.type");

const episodeType = new GraphQLObjectType({
    name: "episodeType",
    fields: {
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        videoAddress: { type: GraphQLString },
    }
})
const chapterType = new GraphQLObjectType({
    name: "chapterType",
    fields: {
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episodes: { type: new GraphQLList(episodeType) },
    }
})
const coursesType = new GraphQLObjectType({
    name: "coursesType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: categoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        format: { type: GraphQLString },
        price: { type: GraphQLString },
        status: { type: GraphQLString },
        teacher: { type: new GraphQLList(authorType) },
        chapters: { type: new GraphQLList(chapterType) },
        totalTime: { type: GraphQLString },
        comments: {type:  new GraphQLList(commentType) },
        likes: { type: new GraphQLList(authorType) },
        dislikes: { type: new GraphQLList(authorType) },
        bookmarks: { type: new GraphQLList(authorType) }
    }
})
module.exports = {
    coursesType
}