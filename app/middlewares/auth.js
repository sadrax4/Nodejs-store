const { UserModel } = require("../models/users");
const IP = require('ip');
async function checkLogin(req, res, next) {
    try {
        const ipAddress = IP.address();
        console.log(ipAddress)
        const token = req?.signedCookies["authorization"];
        if (token) {
            const user = await UserModel.findOne({ token });
            if (user) {
                req.user = user;
                return next();
            }
        }
        return res.render("login.ejs", { error: "شما باید وارذ حساب کاربری شوید" });
    } catch (error) {
        next(error);
    }
}
async function checkAccessLogin(req, res, next) {
    try {
        const token = req?.signedCookies["authorization"];
        if (token) {
            const user = await UserModel.findOne({ token });
            if (user) {
                req.user = user;
                return res.redirect("/support/chat");
            }
        }
        return next()
    } catch (error) {
        next(error);
    }
}
module.exports = {
    checkLogin,
    checkAccessLogin
}