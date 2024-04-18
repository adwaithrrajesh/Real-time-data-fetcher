const socket = require('socket.io')

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});