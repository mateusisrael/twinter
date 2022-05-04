import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../db'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log('next handler')

  if(req.method === 'GET') {
    const query = 'SELECT * FROM users;';

    try {
      const response = await db.query(query);
      return res.status(200).json(response.rows);

    } catch (error) {
      return res.status(500);
  
    }
  }

  if(req.method === 'POST') {
    const { user_name, name, email } = req.body

    try {
      const checkIFUserExistsQuery = `SELECT * FROM users WHERE user_name='${user_name}';`;
      const userExists = await db.query(checkIFUserExistsQuery);

      if(userExists.rowCount > 0) {
        return res.status(400).json({
          "message": "User already exists!"
        })
      }

      const query = `INSERT INTO users (user_name, name, email) VALUES ('${user_name}', '${name}', '${email}');`;
      await db.query(query);
      return res.status(201).send({});
    } catch (error) {
      console.log('erruuu', error)
      return res.status(400).json({
        "message": "User is not created"
      });
  
    }
  } else {
    return res.status(404).send({})
  }
} 