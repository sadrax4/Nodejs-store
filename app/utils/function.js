const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY, REFRESH_TOKEN } = require("./constans");
const createHttpError = require("http-errors");
const redisClient = require("./init_redis");
const path = require("path");
const fs = require("fs");
function randomNumberGenerator(length) {
    return Math.floor(Math.random() * 100000);
}
function signTokenGenerator(userID) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({ _id: userID });
        const options = {
            expiresIn: "1h"
        }
        const payload = {
            mobile: user.mobile
        }
        jwt.sign(payload, SECRET_KEY, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError("خطای سروری"));
            resolve(token);
        })
    })
}
async function signRefreshTokenGenerator(userID) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({ _id: userID });
        const options = {
            expiresIn: "1y"
        }
        const payload = {
            mobile: user.mobile
        }
        jwt.sign(payload, REFRESH_TOKEN, options, async (error, token) => {
            if (error) reject(createHttpError.InternalServerError("خطای سروری"));
            await redisClient.SETEX(userID.toString(), (365 * 24 * 60 * 60), token);
            resolve(token);
        })
    })
}
async function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN, async (error, payload) => {
            if (error) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(user._id.toString());
            if (token === refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("ورود به حساب کاربری انجام نشد"))
        })
    })
}

async function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const filePath = path.join(__dirname, "..", "..", fileAddress);
        if (fs.existsSync(filePath)) await fs.unlinkSync(filePath);
    }
}

function listOfImageFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return files.map(file =>  path.join(fileUploadPath, file.filename));
    } else {
        return [];
    }
}

module.exports = {
    randomNumberGenerator,
    signTokenGenerator,
    verifyRefreshToken,
    signRefreshTokenGenerator,
    deleteFileInPublic,
    listOfImageFromRequest
}