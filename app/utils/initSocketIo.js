const socketIO = require("socket.io");
function InitSocketIo(httpServer) {
    const io = socketIO(httpServer, {
        cors: {
            origin: '*'
        }
    })
    return io;
}
module.exports = {
    InitSocketIo
}
