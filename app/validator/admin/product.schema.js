const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constans");
const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("خلاصه وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    count: Joi.number().error(createError.BadRequest("تعداد وارد شده صحیح نمیباشد")),
    weight: Joi.number().allow(0, null,"").error(createError.BadRequest("وزن وارد شده صحیح نمیباشد")),
    length: Joi.number().allow(0, null,"").error(createError.BadRequest("طول وارد شده صحیح نمیباشد")),
    height: Joi.number().allow(0, null,"").error(createError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
    width: Joi.number().allow(0, null,"").error(createError.BadRequest("عرض وارد شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow()
});

module.exports = {
    createProductSchema
}