import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = "/json/lessonData.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      console.log("File content:", data);
    }
  });

  res.status(200).json({ sucess: true });
}
