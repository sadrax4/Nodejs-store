const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");
const { getTimeOfChapter } = require("../utils/function");
const Episodes = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "lock" },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true }
})
const Chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episodes], default: [] }
})
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [mongoose.Types.ObjectId], required: true },
    dislikes: { type: [mongoose.Types.ObjectId], required: true },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0 },
    type: { type: String, default: "free" /* free,cash,vip */, required: true },
    status: { type: String, default: "notStarted" /* notStarted,completed, holding */, required: true },
    format: { type: String },
    teacher: { type: [mongoose.Types.ObjectId], ref: "user", required: true },
    chapters: { type: [Chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }
})
CourseSchema.set('toObject', { virtuals: true })
CourseSchema.set('toJSON', { virtuals: true })
CourseSchema.index({ title: "text", short_text: "text", text: "text" });
CourseSchema.virtual("imageURL").get(function () {
    return `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/${this.image}`
})
CourseSchema.virtual("totalTime").get(function () {
    return getTimeOfChapter(this.chapters || []);
})
module.exports = {
    CoursesModel: mongoose.model("course", CourseSchema)
}