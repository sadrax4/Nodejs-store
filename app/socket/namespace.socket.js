const { ConversaionModel } = require("../models/conversion");

module.exports = class NamespaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io;
    }
    initConnection() {
        this.#io.on("connection", async socket => {
            const namespacesList = await ConversaionModel.find({}, { title: 1, endpoint: 1 })
            this.#io.emit("namespacesList", namespacesList);
        })
    }
    async createNamespaceConnection() {
        const namespacesList = await ConversaionModel.find({});
        for (const namespace of namespacesList) {
            this.#io.of(`/${namespace.endpoint}`).on("connection",socket=>{
                socket.emit("roomList",namespace.rooms);
            })
        }
    }
}

