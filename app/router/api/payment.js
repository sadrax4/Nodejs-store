const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { verifyToken } = require("../../middlewares/verifyToken");
const route = require("express").Router();

route.post("/payment", verifyToken, PaymentController.paymentGateway);
route.get("/verify", PaymentController.verifyPayment);
route.post("/transaction-list", PaymentController.listOfTransaction);


module.exports = {
    PaymentApiRouter: route
}