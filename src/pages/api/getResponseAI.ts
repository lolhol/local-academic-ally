import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = "/ai/coms.txt";
  const fileContents = JSON.parse(await fs.promises.readFile(filePath, "utf8"));
  const list = fileContents.split("\n");

  res.status(200).json({ res: list[2] });
}
