const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern, ImagePattern } = require("../../utils/constans");
const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("خلاصه وارد شده صحیح نمیباشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    type: Joi.string().pattern(/(unlock|lock)/).error(createError.BadRequest("تگ  مورد نظر یافت نشد")),
    filename: Joi.string().pattern(ImagePattern).error(createError.BadRequest("تصویر وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
});
const addChapterSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    id: Joi.allow()
});
const addEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان وارد  صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن وارد شده صحیح نمیباشد")),
    chapterID: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest("فصل  مورد نظر یافت نشد")),
    courseID: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest(" دوره مورد نظر یافت نشد")),
    type: Joi.string().pattern(/(unlock|lock)/).error(createError.BadRequest("نوع محصول را انتخاب کنید ")),
    filename: Joi.string().pattern(/(\.mp4|\.mp3|\.mpg|\.mov|\.mkv|\.avi)$/).error(createError.BadRequest("فیلم وارد شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
});

module.exports = {
    createCourseSchema,
    addChapterSchema,
    addEpisodeSchema
}