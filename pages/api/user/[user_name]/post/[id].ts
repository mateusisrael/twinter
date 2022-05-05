import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET') {
    res.status(200).json({ "message": "Hello World"})
  } else {
    res.status(404).send({})
  }
}