import * as fs from "fs";
import * as net from "net";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  communicateWithServer("Hello");
  res.status(200).json({ sucess: true });
}

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
