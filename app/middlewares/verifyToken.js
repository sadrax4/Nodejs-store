const createHttpError = require("http-errors");
const { UserModel } = require("../models/users");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/constans");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && bearer.toLowerCase() === "bearer") return token;
    throw createHttpError.Unauthorized("وارد حساب کاربری خود شوید")
}
async function verifyToken(req, res, next) {
    try {
        const token = getToken(req.headers);
        jwt.verify(token, SECRET_KEY, async (error, payload) => {
            try {
                if (error) next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
                const { mobile } = payload || {};
                const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
                if (!user) next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
                req.user = user;
                return next();
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}
async function verifyTokenInGraphQl(req) {
    try {
        const token = getToken(req.headers);
        const { mobile } = jwt.verify(token, SECRET_KEY)
        const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
        return user;
    }
    catch (error) {
        throw new createHttpError.Unauthorized(error.message);
    }
}
module.exports = {
    verifyToken,
    verifyTokenInGraphQl
}