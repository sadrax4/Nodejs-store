const {  GraphQLString, GraphQLObjectType } = require("graphql");

const categoriesType = new GraphQLObjectType({
    name: "categoriesType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parent: { type: GraphQLString }
    }
})
module.exports = {
    categoriesType
}