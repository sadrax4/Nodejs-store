const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "category", default: undefined }
}, {
    id: false,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
}
);
Schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})
function autoPopulate(next) {
    this.populate([{ path: "children", select: { id: 0, __v: 0 } }]);
    next();
}
Schema.pre("findOne", autoPopulate).pre("find", autoPopulate)
module.exports = {
    CategoryModel: mongoose.model("category", Schema)
}