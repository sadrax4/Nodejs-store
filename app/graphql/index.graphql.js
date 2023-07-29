const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver, findProductResolver } = require("./queries/product.resolve");
const { CourseResolver } = require("./queries/courses.resolver");
const {
    categoriesResolver,
    childOfCategoryResolver,
    findCategoryResolver
} = require("./queries/categories.resolver");
const {
    createCommentForBlogResolver,
    createCommentForCourseResolver,
    createCommentForProductResolver
} = require("./mutations/comment");
const {
    likeProductResolver,
    likeBlogResolver,
    likeCourseResolver
} = require("./mutations/like.resolve");
const {
    dislikeProductResolver,
    dislikeBlogResolver,
    dislikeCourseResolver
} = require("./mutations/dislike.resolve");
const {
    bookmarkProductResolver,
    bookmarkBlogResolver,
    bookmarkCourseResolver
} = require("./mutations/bookmark.resolve");
const {
    getUserProductBookmarkedResolver,
    getUserCourseBookmarkedResolver,
    getUserBlogBookmarkedResolver,
    getUserBasketResolver
} = require("./queries/user-profile");
const {
    addProductToBasketResolver,
    addCourseToBasketResolver,
    removeProductInBasketResolver,
    removeCourseInBasketResolver
} = require("./mutations/basket.resolver");
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blog: blogResolver,
        course: CourseResolver,
        product: productResolver,
        findProduct: findProductResolver,
        category: categoriesResolver,
        findCategory: findCategoryResolver,
        categoryChild: childOfCategoryResolver,
        userProductBookmarked: getUserProductBookmarkedResolver,
        userCourseBookmarked: getUserCourseBookmarkedResolver,
        userBlogBookmarked: getUserBlogBookmarkedResolver,
        userBasket: getUserBasketResolver
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutaion",
    fields: {
        createCommentForBlog: createCommentForBlogResolver,
        createCommentForCourse: createCommentForCourseResolver,
        createCommentForProduct: createCommentForProductResolver,
        likeProduct: likeProductResolver,
        likeBlog: likeBlogResolver,
        likeCourse: likeCourseResolver,
        dislikeProduct: dislikeProductResolver,
        dislikeBlog: dislikeBlogResolver,
        dislikeCourse: dislikeCourseResolver,
        bookmarkProduct: bookmarkProductResolver,
        bookmarkBlog: bookmarkBlogResolver,
        bookmarkCourse: bookmarkCourseResolver,
        addProductToBasket: addProductToBasketResolver,
        addCourseToBasket: addCourseToBasketResolver,
        removeProductInBasket: removeProductInBasketResolver,
        removeCourseInBasket: removeCourseInBasketResolver

    }
})
const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
module.exports = {
    graphqlSchema
}