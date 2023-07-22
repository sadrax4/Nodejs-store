const { default: mongoose, Schema } = require("mongoose");
const { commentSchema } = require("./public.schema");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [mongoose.Types.ObjectId], ref: "user", required: true },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "user", required: true },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    supplier: { type: [mongoose.Types.ObjectId], required: true, ref: "user" },
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
}, {
    toJSON: { virtuals: true }, toObject: { virtuals: true }
})

ProductSchema.index({ text: "text", title: "text", short_text: "text" })
ProductSchema.virtual("imagesURL").get(function () {
    return this.images.map(image => `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/${image}`)
})
module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
}