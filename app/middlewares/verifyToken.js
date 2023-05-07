const createHttpError = require("http-errors");
const { UserModel } = require("../models/users");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/constans");
async function verifyToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.accesstoken?.split(" ") || [];
    if (token && bearer.toLowerCase() === "bearer") {
        jwt.verify(token, SECRET_KEY, async (error, payload) => {
            if (error) next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        })
    }
    else
        return next(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"))
}
module.exports = {
    verifyToken

}