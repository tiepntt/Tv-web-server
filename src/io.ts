export const loadIo = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  io.on("connection", (client) => {
    io.emit("connection");
    client.on("new", (data) => {
      /* … */
      io.emit("newNotification");
    });
    client.on("event", (data) => {
      /* … */
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
  return io;
};
