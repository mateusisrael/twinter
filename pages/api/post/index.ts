import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4} from 'uuid'
import db from "../../../db";

interface IPostBodyRequest {
  title?: string,
  image?: string,
  text_content?: string
}

interface IPost extends IPostBodyRequest {
  id: string,
  user_name: string
  created_at: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === "POST") {
    
    try {
      const { title, image, text_content, }: IPostBodyRequest = req.body;
      const id = uuidv4()
      const user_name = "parzival"
      const created_at = '04/05/2022'

      const post: IPost = {
        id,
        user_name,
        title,
        text_content,
        image,
        created_at
      }

      const query = `INSERT INTO posts (id, user_name, title, text_content, image, created_at) VALUES (
        '${post.id}',
        '${post.user_name}',
        '${post.title}',
        '${post.text_content}',
        '${post.image}',
        '${post.created_at}
      ')`;

      const dbResponse = await db.query(query)
      console.log('dbResponse', dbResponse)
      res.status(201).json({
        "message": "Post was created!"
      })

    } catch (error) {
      console.log(error)
      res.status(400).send({})
    }

  }
}