const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    dateTime: { type: Number, }
})
const locationSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    location: { type: Object, default: {} },
    dateTime: { type: Number, }
})
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    messages: { type: [messageSchema], default: [] },
    location: { type: [locationSchema], default: [] }
})
const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    endpoint: { type: String, required: true },
    rooms: { type: [roomSchema] }
})
module.exports = {
    ConversaionModel: mongoose.model("conversaion", conversationSchema)
}