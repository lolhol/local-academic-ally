import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { sendDataAI } from "../../internal/SendDataAI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = JSON.parse(req.body);

  //sendDataAI()

  res.status(200).json({ success: true });
}
