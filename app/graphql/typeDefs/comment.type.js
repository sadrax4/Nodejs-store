const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { authorType } = require("./public.types");

const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType", 
    fields : {
        _id: {type: GraphQLString},
        user: {type: authorType},
        comment: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        show: {type: GraphQLBoolean}
    }
})
const commentType = new GraphQLObjectType({
    name: "commentType", 
    fields : {
        _id: {type: GraphQLString},
        user: {type: authorType},
        comment: {type: GraphQLString},
        answers : {type: new GraphQLList(CommentAnswerType)},
        show: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString}
    }
})
module.exports = {
    commentType
}