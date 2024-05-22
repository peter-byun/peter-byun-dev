import { string } from 'zod';

import { getAllowAllOriginHeaders } from '../../../../../backend/controllers/allowAllOrigins';
import { CommentService } from '../../../../../backend/server-actions/comment.service';

export async function GET(request: Request) {
  const commentService = new CommentService();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('post-id');

  const postIdValidationResult = string().safeParse(id);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    const comments = await commentService.comments({
      where: { postId: Number(validatedPostId) },
    });

    return new Response(JSON.stringify(comments), {
      headers: getAllowAllOriginHeaders(),
    });
  } else {
    return new Response(null, {
      status: 400,
      statusText: 'invalid post id',
    });
  }
}
