const joi = require("@hapi/joi");
const { MongoIDPattern } = require("../utils/constans");
const createHttpError = require("http-errors");
const objectIdValidator = joi.object({
    id: joi.string().pattern(MongoIDPattern).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})

module.exports = {
    objectIdValidator
}