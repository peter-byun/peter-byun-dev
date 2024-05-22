import { string } from 'zod';
import { PostService } from '../../../../../backend/server-actions/post.service';

export default async function PATCH(request: Request) {
  const postService = new PostService();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('post-id');

  const postIdValidationResult = string().safeParse(id);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    const postLikesUpdateResult = postService.updatePostLikes({
      where: {
        id: Number(validatedPostId),
      },
    });

    return Response.json(postLikesUpdateResult);
  } else {
    return new Response(null, {
      status: 400,
      statusText: 'invalid post id',
    });
  }
}
