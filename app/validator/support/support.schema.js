const Joi = require("@hapi/joi");
const { ImagePattern, MobilePatter } = require("../../utils/constans");
const createHttpError = require("http-errors");
const addNamespaceValidator = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان انتخاب شده صحیح نمیباشد")),
    endpoint: Joi.string().min(3).max(30).error(createHttpError.BadRequest("اند بوینت انتخاب شده صحیح نمیباشد"))
})
const addRoomValidator = Joi.object({
    name: Joi.string().min(3).max(30).error(createHttpError.BadRequest(" نام وارد شده صحیح نمیباشد")),
    description: Joi.string().min(3).max(100).error(createHttpError.BadRequest(" توضیحات وارد شده صحیح نمیباشد")),
    filename: Joi.string().pattern(ImagePattern).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow(),
    namespace: Joi.allow()
})
const mobileValidator = Joi.object({
    mobile: Joi.string().pattern(MobilePatter).message("شماره وارد شده صحیح نمیباشد")
})

module.exports = {
    addNamespaceValidator,
    addRoomValidator,
    mobileValidator
}