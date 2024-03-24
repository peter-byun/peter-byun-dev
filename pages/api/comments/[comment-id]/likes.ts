import { NextApiRequest, NextApiResponse } from 'next';

import { string } from 'zod';
import { CommentService } from '../../../../backend/services/comment.service';
import { HTTP_METHODS } from '../../../../backend/constants/http.verbs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentService = new CommentService();

  const commentIdValidationResult = string().safeParse(req.query['comment-id']);
  const validatedCommentId = commentIdValidationResult.success
    ? commentIdValidationResult.data
    : null;

  if (req.method === HTTP_METHODS.PATCH && validatedCommentId) {
    const comment = await commentService.updateCommentLikes({
      where: {
        id: Number(validatedCommentId),
      },
    });

    res.json(comment);
  }
}
