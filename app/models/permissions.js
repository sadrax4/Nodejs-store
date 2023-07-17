const { default: mongoose } = require("mongoose");

const permissionsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" }
}, {
    toJSON: { virtuals: true }
})
module.exports = {
    PermissionsModel: mongoose.model('permissions', permissionsSchema)
}
