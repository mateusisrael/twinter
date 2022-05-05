import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET") {
    const { id } = req.query
    const query = `SELECT * FROM posts WHERE post_id = '${id}';`;

    try {
      const dbResponse = await db.query(query);
      res.status(200).json(dbResponse)

    } catch (error) {
      res.status(500).send({})
    }
  }
}