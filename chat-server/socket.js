// socket.js
let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
};

const getSocket = () => io;

module.exports = { initSocket, getSocket };
