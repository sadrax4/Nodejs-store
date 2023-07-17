const joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../utils/constans");
const Joi = require("@hapi/joi");

const addRoleSchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان  نقش صحیح نمیباشد")),
    description: joi.string().min(3).max(200).error(new Error("توضیحات نقش دسترسی اشتباه است ")),
    permissions: joi.array().items(joi.string().pattern(MongoIDPattern)).error(new Error("سطح دسترسی وارد شده صحیح نمیباشد"))
})
const updateRoleSchema = joi.object({
    title: joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    description: joi.string().min(3).max(200).error(new Error("توضیحات نقش دسترسی اشتباه است ")),
    permissions: joi.array().items(joi.string().pattern(MongoIDPattern)).error(new Error("سطح دسترسی وارد شده صحیح نمیباشد"))
})
const addPermissionsSchema = joi.object({
    name: joi.string().min(3).max(20).error(new Error("نام سطح دسترسی  اشتباه وارد شده است")),
    description: joi.string().min(3).max(200).error(new Error("توضیحات سطح دسترسی اشتباه است "))
})
module.exports = {
    addRoleSchema,
    updateRoleSchema,
    addPermissionsSchema
}