import * as net from "net";

const communicateWithServer = (message: string) => {
  const client = net.createConnection({ port: 3001 }, () => {
    console.log("Connected to server");

    client.write(message);
  });

  // Handle data received from the server
  client.on("data", (data: Buffer) => {
    console.log(`Data received from server: ${data.toString()}`);

    client.end();
  });

  client.on("end", () => {
    console.log("Disconnected from server");
  });
};

communicateWithServer("Hello, server!");
