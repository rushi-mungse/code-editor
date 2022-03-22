const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { JOIN, JOINED, DISCONNECTED } = require("./src/actions");
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const userSocketMap = {};

const getAllClientsInRoom = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return { socketId, username: userSocketMap[socketId] };
    }
  );
};

io.on("connection", (socket) => {
  socket.on(JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllClientsInRoom(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(JOINED, {
        socketId,
        username: userSocketMap[socket.id],
        clients,
      });
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5500;

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
