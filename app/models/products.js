const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    total_desc: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [String], required: true },
    like: { type: [mongoose.Types.ObjectId], required: true },
    deslike: { type: [mongoose.Types.ObjectId], required: true },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0, required: true },
    disount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, required: true },
    time: { type: String, },
    format: { type: String, },
    teacher: { type: [mongoose.Types.ObjectId], required: true },
    feature: {
        type: Object, default: {
            length: "",
            height: "",
            width: "",
            weight: "",
            color: [],
            model: [],
            madein: ""
        }
    }
})
module.exports = {
    ProductModel: mongoose.model("product", Schema)
}