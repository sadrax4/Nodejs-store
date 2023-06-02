const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");
const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "free" },
    time: { type: String, required: true }
})
const Chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episodes], default: [] }
})
const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [mongoose.Types.ObjectId], required: true },
    deslikes: { type: [mongoose.Types.ObjectId], required: true },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0 },
    type: { type: String, default: "free" /* free,cash,vip */, required: true },
    time: { type: String, default: "00:00:00" },
    format: { type: String },
    teacher: { type: [mongoose.Types.ObjectId], ref: "user", required: true },
    chapter: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }
})
module.exports = {
    Courses: mongoose.model("course", Schema)
}