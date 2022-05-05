import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET') {
    const { user_name } = req.query;
    try {
      const query = `SELECT * FROM posts WHERE user_name = '${user_name}';`;
      const dbResponse = await db.query(query);
      res.status(200).json(dbResponse.rows)
    } catch (error) {
      res.status(400).send({})
    }
  } else {
    res.status(404).send({})
  }
}