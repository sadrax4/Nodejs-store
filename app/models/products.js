const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId,ref:"category", required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [mongoose.Types.ObjectId], required: true },
    deslikes: { type: [mongoose.Types.ObjectId], required: true },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    supplier: { type: [mongoose.Types.ObjectId], required: true },
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