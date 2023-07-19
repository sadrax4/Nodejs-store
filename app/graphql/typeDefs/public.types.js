const {  GraphQLObjectType, GraphQLString, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
})

const responseType = new GraphQLObjectType({
    name: "responseType",
    fields: {
        statusCode: { type: GraphQLString },
        data: { type: AnyType }
    }
})

const authorType = new GraphQLObjectType({
    name: "authorType",
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
    }
})
const categoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parent: { type: GraphQLString }
    }
})

module.exports = {
    authorType,
    categoryType,
    AnyType,
    responseType
}