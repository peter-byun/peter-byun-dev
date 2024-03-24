import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHODS } from '../../../../backend/constants/http.verbs';
import { PostService } from '../../../../backend/services/post.service';
import { string } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postService = new PostService();

  const postIdValidationResult = string().safeParse(req.query['post-id']);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (req.method === HTTP_METHODS.GET && validatedPostId) {
    const post = await postService.post(Number(validatedPostId));

    res.json(post);
  }
}
