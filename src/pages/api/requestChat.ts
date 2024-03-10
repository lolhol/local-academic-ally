import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = "ai/coms.txt";
  const bodyParsed = JSON.parse(req.body);
  const msg = "input\n" + "generate\n" + bodyParsed.prompt;

  try {
    await fs.writeFile(filePath, msg);
    console.log("The file has been saved!");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error writing file:", err);
    res.status(200).json({ success: false, error: "Internal Server Error" });
  }
}
