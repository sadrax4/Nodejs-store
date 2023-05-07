const joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../utils/constans");

const addCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent: joi.string().allow("").pattern(MongoIDPatern).allow("").error(new Error("شناسه وارد شده صحیح نمیباشد"))
})
module.exports = {
    addCategorySchema
}