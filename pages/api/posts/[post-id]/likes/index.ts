import { NextApiRequest, NextApiResponse } from 'next';

import { string } from 'zod';
import { PostService } from '../../../../../backend/services/post.service';
import { HTTP_METHODS } from '../../../../../backend/constants/http.verbs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postService = new PostService();

  const postIdValidationResult = string().safeParse(req.query['post-id']);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (req.method === HTTP_METHODS.PATCH && validatedPostId) {
    const postLikesUpdateResult = postService.updatePostLikes({
      where: {
        id: Number(validatedPostId),
      },
    });

    res.json(postLikesUpdateResult);
  }
}
