import { string } from 'zod';
import { getAllowAllOriginHeaders } from '../../../../backend/controllers/allowAllOrigins';
import { PostService } from '../../../../backend/server-actions/post.service';

export default async function GET(request: Request) {
  const postService = new PostService();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('post-id');

  const postIdValidationResult = string().safeParse(id);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    const post = await postService.post(Number(validatedPostId));

    return new Response(JSON.stringify(post), {
      headers: getAllowAllOriginHeaders(),
    });
  } else {
    return new Response(null, {
      status: 400,
      statusText: 'invalid post id',
    });
  }
}
