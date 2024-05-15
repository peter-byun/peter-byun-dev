import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHODS } from '../../../backend/constants/http.verbs';
import { PostService } from '../../../backend/services/post.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postService = new PostService();

  if (req.method === HTTP_METHODS.GET) {
    const posts = await postService.posts({
      skip: 0,
    });

    res.json(posts);
  }
}
