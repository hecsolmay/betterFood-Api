require("./database");
const app = require("./app");
const SocketIO = require("socket.io");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("Connectado");

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`Conectado a la room: ${room}`);
  });
});

module.exports = {
  server,
  io,
};
