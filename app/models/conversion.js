const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'user',required: true },
    message: { type: String,required: true },
    dateTime: { type: String ,required: true}
})
const roomSchema = new mongoose.Schema({
    name: { type: String ,required: true},
    description: { type: String },
    image: { type: String },
    messages: { type: [messageSchema], default: [] }
})
const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    endpoint: { type: String, required: true },
    rooms: { type: [roomSchema] }
})
module.exports = {
    ConversaionModel: mongoose.model("conversaion", conversationSchema)
}