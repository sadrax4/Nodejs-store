const joi = require("@hapi/joi");
const { MobilePatter } = require("../../utils/constans");
const getOtpSchema = joi.object({
    mobile: joi.string().length(11).pattern(MobilePatter).error(new Error("شماره موبایل وارد شده نادرست است"))
})
const checkOtpSchema = joi.object({
    mobile: joi.string().length(11).pattern(MobilePatter).error(new Error("شماره موبایل وارد شده نادرست است")),
    code: joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نمیباشد"))
})
module.exports = {
    getOtpSchema,
    checkOtpSchema
}