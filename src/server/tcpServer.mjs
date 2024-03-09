import * as net from "net";

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    const message = data.toString();
    console.log(`Data received from client: ${message}`);

    socket.write("Server received your message");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
