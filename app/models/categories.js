const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String, required: true }
})
module.exports = {
    CategoryModel: mongoose.model("category", Schema)
}