const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id);
});

const PORT = process.env.PORT || 5500;

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
