import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = "ai/coms.txt";
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const list = fileContents.split("\n");

  if (list[0] == "output") {
    res.status(200).json({ res: list[2] });
  }

  res.status(200).json({ res: undefined });
}
