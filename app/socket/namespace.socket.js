const path = require("path");
const { ConversaionModel } = require("../models/conversion");
const fs = require("fs");

module.exports = class NamespaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io;
    }
    initConnection() {
        this.#io.on("connection", async socket => {
            const namespacesList = await ConversaionModel.find({}, { title: 1, endpoint: 1 });
            this.#io.emit("namespacesList", namespacesList);
        })
    }
    async createNamespaceConnection() {
        const namespacesList = await ConversaionModel.find({});
        for (const namespace of namespacesList) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async socket => {
                const conversion = await ConversaionModel.findOne({ endpoint: namespace.endpoint });
                socket.on("joinRoom", async roomName => {
                    const lastRoom = Array.from(socket.rooms)[1];
                    if (lastRoom) {
                        socket.leave(lastRoom);
                    }
                    socket.join(roomName);
                    await this.countOnlineUsers(namespace.endpoint, roomName);
                    const roomInfo = conversion.rooms.find(item => item.name == roomName);
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket);
                    this.getNewLocation(socket);
                    this.uploadFile(socket);
                    socket.on("disconnect", async () => {
                        await this.countOnlineUsers(namespace.endpoint, roomName);
                    })
                })
                socket.emit("roomList", conversion.rooms);
            })
        }
    }
    async countOnlineUsers(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets();
        this.#io.of(`/${endpoint}`).in(roomName).emit("countOnlineUsers", Array.from(onlineUsers).length)
    }
    getNewMessage(socket) {
        socket.on("newMessage", async (data) => {
            const { message, endpoint, roomName, sender } = data;
            await ConversaionModel.updateOne({ endpoint, "rooms.name": roomName }, {
                $push: {
                    "rooms.$.messages": {
                        message,
                        sender,
                        dateTime: Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data);
        })
    }
    getNewLocation(socket) {
        socket.on("newLocation", async (data) => {
            const { location, endpoint, roomName, sender } = data;
            await ConversaionModel.updateOne({ endpoint, "rooms.name": roomName }, {
                $push: {
                    "rooms.$.location": {
                        location,
                        sender,
                        dateTime: Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmLocation", data);
        })
    }
    uploadFile(socket) {
        socket.on("upload", ({ file, filename }, callback) => {
            const ext = path.extname(filename);
            const filePath = "public/uploads/sockets/" + String(Date.now() + ext);
            fs.writeFile(filePath, file, (err) => {
                callback({ message: err });
            })
        })
    }

}

