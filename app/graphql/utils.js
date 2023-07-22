const { Kind } = require("graphql");
const createHttpError = require("http-errors");
const { BlogModel } = require("../models/blogs");
const { ProductModel } = require("../models/products");
const { CoursesModel } = require("../models/course");

function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode?.values?.map(parseValueNode)
        default:
            return null;
    }
}
function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{' ? JSON.parse(valueNode.value) : valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:

    }
}
function toObject(value) {
    if (typeof value === 'object') {
        return value
    }
    if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value)
    }
    return null
}
async function checkExistBlog(blogID) {
    const blog = await BlogModel.findOne({ _id: blogID });
    if (!blog) throw createHttpError.NotFound(" بلاگی ای با این مشخصات یافت نشد");
    return blog;
}
async function checkExistProduct(productID) {
    const product = await ProductModel.findOne({ _id: productID });
    if (!product) throw createHttpError.NotFound(" محصولی ای بااین مشخصات یافت نشد");
    return product;
}
async function checkExistCourse(courseID) {
    const course = await CoursesModel.findOne({ _id: courseID });
    if (!course) throw createHttpError.NotFound(" دوره ای بااین مشخصات یافت نشد");
    return course;
}
async function getComment(model, id) {
    const comment = await model.findOne({ "comments._id": id }, { "comments.$": 1 });
    if (!comment?.comments?.[0]) throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد")
    return comment?.comments?.[0]
}

module.exports = {
    toObject,
    parseLiteral,
    parseValueNode,
    parseObject,
    checkExistBlog,
    checkExistProduct,
    checkExistCourse,
    getComment
}