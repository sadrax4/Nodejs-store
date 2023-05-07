const createHttpError = require("http-errors");

const { authSchema, checkOtpSchema, getOtpSchema } = require("../../../../validator/user/auth.schema");
const Controller = require("../../controller");
const { randomNumberGenerator, signTokenGenerator, verifyRefreshToken, signRefreshTokenGenerator } = require("../../../../utils/function");
const { UserModel } = require("./../../../../models/users");
const { USER_ROLE, EXPIRES_IN } = require("../../../../utils/constans");

class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile, code);
            if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد")
            return res.status(200).send({
                statusCode: 200,
                message: "کد با موفقیت ارسال شد",
                code,
                mobile
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message));
        }
    }
    async saveUser(mobile, code) {
        const result = await this.checkExistUser(mobile);
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        if (result) {
            return (await this.updateUser(mobile, { otp }))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles: USER_ROLE
        }))
    }
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({ mobile });
            if (!user) throw createHttpError.NotFound("کاربری با این شماره  موبایل یافت نشد");
            if (user.otp.code != code) throw createHttpError.Unauthorized("کد وارد شده صحیح نمیباشد");
            const now = Date.now();
            if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await signTokenGenerator(user._id);
            const refreshToken = await signRefreshTokenGenerator(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user;
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, null, undefined, -1, "0", NaN].includes(objectData[key])) {
                delete objectData[key];
            }
        })
        return await UserModel.updateOne({ mobile }, { $set: objectData });
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshtoken } = req.body;
            const mobile = await verifyRefreshToken(refreshtoken);
            const user = await UserModel.findOne({ mobile });
            if (!user) createHttpError.Unauthorized("کاربری با این شماره یافت نشد")
            const accessToken = await signTokenGenerator(user._id);
            const newRefreshToken = await signRefreshTokenGenerator(user._id);
            return res.json({
                data: {
                    accessToken,
                    newRefreshToken
                }
            })
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    authController: new AuthController()
}