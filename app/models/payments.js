const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    invoiceNumber: { type: String },
    authority: { type: String },
    paymentDate: { type: Number },
    amount: { type: Number },
    description: { type: String, default: "بابت خرید دوره" },
    verify: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    basket: { type: Object, default: {} },
    refID: { type: String, default: undefined },
    cardHash: { type: String, default: undefined },
    cardPan: { type: String, default: undefined },
    paymentDate: { type: String, defualt: undefined }
}, { timestamps: true });
PaymentSchema.index({ authority: 'text', invoiceNumber: 'text', user: 'text', refID: 'text' });
module.exports = {
    PaymentModel: mongoose.model("Payment", PaymentSchema)
}