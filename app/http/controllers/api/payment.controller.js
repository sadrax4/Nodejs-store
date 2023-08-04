const { default: axios } = require("axios");
const { getBasketOfUser, randomNumberGenerator, getPersianDate, deleteInvalidValue, copyObject } = require("../../../utils/function");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { PaymentModel } = require("../../../models/payments");
const { StatusCodes } = require("http-status-codes");
const { verifyFlat } = require("@hapi/joi/lib/common");
const { UserModel } = require("../../../models/users");
const { result } = require("@hapi/joi/lib/base");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class PaymentController extends Controller {
    async paymentGateway(req, res, next) {
        try {
            const user = req.user;
            const basket = await getBasketOfUser(user._id);
            const totalPayment = Number(basket[0].payDetail.paymentAmount);
            const zarinpallGateway = 'https://www.zarinpal.com/pg/StartPay'
            const amount = totalPayment
            const description = "درگاه برای خرید محصولات و دوره ها";
            const ZARINPALL_OPTION = {
                merchant_id: process.env.ZARINPALL_MERCHENT_ID,
                currency: "IRR",
                amount,
                description,
                callback_url: "http://localhost:3000/verify",
                metadata: {
                    email: user?.email,
                    mobile: user.mobile
                }
            }
            const requestResult = await axios.post(process.env.ZARINPALL_REQUEST_URL, ZARINPALL_OPTION)
                .then(result => result.data);
            const { authority, code } = requestResult.data;
            const invoiceNumber = randomNumberGenerator(10);
            const paymentDate = getPersianDate();
            await PaymentModel.create({
                amount,
                description,
                invoiceNumber,
                user: user._id,
                authority,
                verify: false,
                paymentDate,
                basket
            })
            if (code == 100 && authority) {
                return res.status(StatusCodes.OK).json({
                    data: {
                        statusCode: StatusCodes.OK,
                        code,
                        gatewayURL: `${zarinpallGateway}/${authority}`
                    }
                });
            }
            throw createHttpError.BadRequest("مقادیر ارسال شده صحیح نمیباشد");
        } catch (error) {
            next(error);
        }
    }
    async verifyPayment(req, res, next) {
        try {
            const { Authority: authority } = req.query;
            const payment = await PaymentModel.findOne({ authority });
            if (!payment)
                throw createHttpError.NotFound("تراکنشی در انتظار برداخت یافت نشد");
            if (payment.verify)
                throw createHttpError.BadRequest("تراکنش قبلا برداخت شده");
            const verifyBody = JSON.stringify({
                merchant_id: process.env.ZARINPALL_MERCHENT_ID,
                amount: payment.amount,
                authority
            })
            const verifyResult = await fetch(process.env.ZARINPALL_VERIFY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: verifyBody
            }).then(result => result.json());
            if (verifyResult.data.code == Number(100)) {
                const refID = verifyResult.data.ref_id;
                const cardPan = verifyResult.data.card_pan;
                const cardHash = verifyResult.data.card_hash;
                await Promise.all([
                    PaymentModel.updateOne({ authority }, {
                        $set: {
                            verify: true,
                            cardHash,
                            cardPan,
                            refID
                        }
                    }),
                    UserModel.updateOne({ _id: payment.user }, {
                        $set: {
                            courses: payment?.basket[0]?.payDetail?.courseIds,
                            products: payment?.basket[0]?.payDetail?.productIds,
                            basket: {
                                courses: [],
                                products: []
                            }
                        }
                    })
                ])
                return res.status(StatusCodes.OK).json({
                    statusCode: StatusCodes.OK,
                    data: {
                        message: "برداخت با موفقیت انجام شد"
                    }
                })
            } else {
                throw createHttpError.BadGateway("برداخت ناموفق.در صورت کسر وجه طی ۲۴ ساعت برگشت میخورد")
            }
        } catch (error) {
            next(error);
        }
    }
    async listOfTransaction(req, res, next) {
        try {
            const searchQuery = req.body || {};
            deleteInvalidValue(searchQuery);
            copyObject(searchQuery);
            const transactions = await PaymentModel.find(searchQuery);
            return res.statusCode(StatusCodes.OK).json({
                data: {
                    transactions
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async totalIncome(req, res, next) {
        try {
            const totalIncome = (await PaymentModel.aggregate([
                { $match: { verify: true } },
                {
                    $group: {
                        _id: null,
                        totalIncome: { $sum: "$amount" }
                    }
                },
                { $project: { _id: 0 } },
            ]))[0];
            return res.statusCode(StatusCodes.OK).json({
                data: {
                    totalIncome
                }
            })
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    PaymentController: new PaymentController()
}