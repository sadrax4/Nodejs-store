const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { verifyToken } = require("../../middlewares/verifyToken");
const route = require("express").Router();

route.get("/verify", PaymentController.verifyPayment);
route.get("/total-income", PaymentController.totalIncome);
route.post("/transaction-list", PaymentController.listOfTransaction);
route.post("/payment", verifyToken, PaymentController.paymentGateway);



module.exports = {
    PaymentApiRouter: route
}