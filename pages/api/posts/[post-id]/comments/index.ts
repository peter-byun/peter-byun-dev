import { NextApiRequest, NextApiResponse } from 'next';

import { string } from 'zod';
import { CommentService } from '../../../../../backend/services/comment.service';
import { HTTP_METHODS } from '../../../../../backend/constants/http.verbs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentService = new CommentService();

  const postIdValidationResult = string().safeParse(req.query['post-id']);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (req.method === HTTP_METHODS.GET && validatedPostId) {
    const comments = await commentService.comments({
      where: { postId: Number(validatedPostId) },
    });

    res.json(comments);
  }
}
