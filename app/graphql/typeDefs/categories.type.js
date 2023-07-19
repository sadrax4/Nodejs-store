const {  GraphQLString, GraphQLObjectType, GraphQLList } = require("graphql");
const { AnyType } = require("./public.types");

const categoriesType = new GraphQLObjectType({
    name: "categoriesType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        children : {type: new GraphQLList(AnyType)}
    }
})
module.exports = {
    categoriesType
}