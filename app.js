const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://127.0.0.1:3000" } });

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

io.on("connect", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
