import { NextApiRequest, NextApiResponse } from 'next';

import { CommentService } from '../../../backend/services/comment.service';
import { HTTP_METHODS } from '../../../backend/constants/http.verbs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentService = new CommentService();

  const requestBody = req.body;

  if (req.method === HTTP_METHODS.POST) {
    const comments = await commentService.createComment({
      email: requestBody.email,
      name: requestBody.name,
      content: requestBody.content,
      post: {
        connect: {
          id: requestBody.postId,
        },
      },
    });

    res.json(comments);
  }
}
