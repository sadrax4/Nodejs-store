const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY, REFRESH_TOKEN } = require("./constans");
const createHttpError = require("http-errors");
const redisClient = require("./init_redis");
const path = require("path");
const fs = require("fs");
const moment = require("jalali-moment");
function randomNumberGenerator(length) {
    let lenghString = '1';
    for (let i = 0; i < length; i++) {

        lenghString = lenghString + '0';
    }
    return Math.floor(Math.random() * Number(lenghString));
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
            const refreshToken = await redisClient.get(user?._id.toString());
            if (token === refreshToken) return resolve(mobile);
            reject(createHttpError.Unauthorized("ورود به حساب کاربری انجام نشد"))
        })
    })
}

async function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const filePath = path.join(__dirname, "..", "..", fileAddress);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}
function listOfImageFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return files.map(file => path.join(fileUploadPath, file.filename));
    } else {
        return [];
    }
}
function deleteInvalidValue(data = {}, blackList = []) {
    Object.keys(data).forEach(key => {
        if (blackList.includes(key)) delete data[key];
        if (typeof data[key] === 'string') data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if (Array.isArray(data[key]) && data[key].length < 1) delete data[key];;
        if (process.env.NULL_DATA.includes(data[key])) delete data[key]
    })
}
function setFeature(body) {
    let feature = {};
    const { width, height, weight, length } = body;
    if (!isNaN(+width) || !isNaN(+length) || !isNaN(+height) || !isNaN(+weight)) {
        if (!width) feature.width = 0;
        else feature.width = +width;
        if (!length) feature.length = 0;
        else feature.length = +length;
        if (!height) feature.height = 0;
        else feature.height = +height;
        if (!weight) feature.weight = 0;
        else feature.weight = +weight;
    }
    return feature;
}

function copyObject(objectData) {
    return JSON.parse(JSON.stringify(objectData));
}

function getTime(time) {
    let total = Math.round(time) / 60;
    let [min, percentage] = String(total).split(".");
    if (percentage == undefined) percentage = "0"
    let sec = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    let hour = 0;
    if (min > 59) {
        total = min / 60;
        [hour, percentage] = String(total).split(".")
        if (percentage == undefined) percentage = "0"
        min = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    }
    if (String(hour).length == 1) hour = `0${hour}`;
    if (String(min).length == 1) min = `0${min}`
    if (String(sec).length == 1) sec = `0${sec}`
    return hour + ":" + min + ":" + sec;
}

function getTimeOfChapter(chapters = []) {
    let time, hour, minute;
    let second = 0;
    for (const chapter of chapters) {
        if (Array.isArray(chapter?.episodes)) {
            for (const episode of chapter.episodes) {
                if (episode?.time) time = episode.time.split(":");
                else time = "00:00:00".split(":");
                if (time.length === 3) {
                    second += Number(time[0]) * 3600; // convert hour to seconds
                    second += Number(time[1]) * 60;   // convert minutes to seconds
                    second += Number(time[2]);        // sum seconds with seconds
                }
                if (time.length === 2) {
                    second += Number(time[0]) * 60;   // convert minutes to seconds
                    second += Number(time[1]);        // sum seconds with seconds
                }
            }
        }
    }
    hour = Math.floor(second / 3600);         // convert seconds to hourt
    minute = Math.floor(second / 60) % 60;    // convert seconds to minutes
    second = Math.floor(second % 60);         // convert seconds to second
    if (String(hour).length == 1) hour = `0${hour}`;
    if (String(minute).length == 1) minute = `0${minute}`
    if (String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" + second);
}
async function getBasketOfUser(userID) {
    const userDetail = await UserModel.aggregate([
        {
            $match: { _id: userID }
        },
        {
            $project: { basket: 1 }
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.products.productID",
                foreignField: "_id",
                as: "productDetail"
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.courses.courseID",
                foreignField: "_id",
                as: "courseDetail"
            }
        },
        {
            $addFields: {
                "productDetail": {
                    $function: {
                        body: function (productDetail, products) {
                            return productDetail.map(function (product) {
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
                "courseDetail": {
                    $function: {
                        body: function (courseDetail) {
                            return courseDetail.map(function (course) {
                                return {
                                    ...course,
                                    finalPrice: course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args: ["$courseDetail"],
                        lang: "js"
                    }
                },
                "payDetail": {
                    $function: {
                        body: function (courseDetail, productDetail, products) {
                            const courseAmount = courseDetail.reduce(function (total, course) {
                                return total + (course.price - ((course.discount / 100) * course.price))
                            }, 0)
                            const productAmount = productDetail.reduce(function (total, product) {
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price;
                                return total + (totalPrice - ((product.discount / 100) * totalPrice))
                            }, 0)
                            const courseIds = courseDetail.map(course => course._id.valueOf())
                            const productIds = productDetail.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount: courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args: ["$courseDetail", "$productDetail", "$basket.products"],
                        lang: "js"
                    }
                }
            }
        }, {
            $project: {
                basket: 0,
            }
        }
    ]);
    return copyObject(userDetail)
}
const getPersianDate = () => {
    return moment().locale('fa').format('YYYY/M/D');
}
module.exports = {
    randomNumberGenerator,
    signTokenGenerator,
    verifyRefreshToken,
    signRefreshTokenGenerator,
    deleteFileInPublic,
    listOfImageFromRequest,
    copyObject,
    setFeature,
    deleteInvalidValue,
    getTime,
    getTimeOfChapter,
    getBasketOfUser,
    getPersianDate
}