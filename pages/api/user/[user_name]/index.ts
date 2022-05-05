import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";


export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  if(req.method !== "GET") {
    return res.status(404).send({})
  }

  try {
    const { user_name } = req.query
    const query = `SELECT * FROM users WHERE user_name = '${user_name}';`;
    const dbResponse = await db.query(query)

    return res.status(200).json(dbResponse.rows)

  } catch (error) {
    return res.status(500).send({})
  }

}