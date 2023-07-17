const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const { deleteInvalidValue } = require("../../../../utils/function");
const userBlackListField = {
    MOBILE: "mobile",
    PASSWORD: "password",
    OTP: "otp",
    BILLS: "bills",
    DISCOUNT: "discount",
    BIRTHDAY: "birthday",
    ROLES: "roles",
    COURSES: "courses"
}
Object.freeze(userBlackListField);

class UserController extends Controller {
    async updateUser(req, res, next) {
        try {
            const userID = req?.user?._id;
            const data = req.body;
            const userBlackList = Object.values(userBlackListField);
            deleteInvalidValue(data, userBlackList);
            const updateResult = await UserModel.updateOne({ _id: userID }, { $set: data });
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("خطا سروری");
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getListOfUser(req, res, next) {
        try {
            const users = await UserModel.find({});
            if (!users) throw createHttpError.NotFound("کاربری یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async searchUser(req, res, next) {
        try {
            const { search } = req.params;
            const databaseQuery = {};
            databaseQuery["$text"] = { $search: search }
            const user = await UserModel.find(databaseQuery);
            if (!user) throw createHttpError.NotFound("کاربری یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async userProfile(req, res, next) {
        try {
            const user = req.user;
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserController: new UserController()
}