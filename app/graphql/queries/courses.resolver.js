const { GraphQLList, GraphQLString } = require("graphql");
const { copyObject } = require("../../utils/function");
const { CoursesModel } = require("../../models/course");
const { coursesType } = require("../typeDefs/courses.type");

const CourseResolver = {
    type: new GraphQLList(coursesType),
    args: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const databaseQuery = copyObject(args);
        const courses = await CoursesModel.find(databaseQuery).populate([
            { path: "teacher" },
            { path: "category" },
            { path: "chapters" }
        ])
        return courses;
    }
}
module.exports = {
    CourseResolver
}