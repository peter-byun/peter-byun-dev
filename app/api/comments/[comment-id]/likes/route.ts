import { string } from 'zod';
import { CommentService } from '../../../../../backend/server-actions/comment.service';

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('comment-id');

  const commentService = new CommentService();

  const commentIdValidationResult = string().safeParse(id);
  const validatedCommentId = commentIdValidationResult.success
    ? commentIdValidationResult.data
    : null;

  if (validatedCommentId) {
    const comment = await commentService.updateCommentLikes({
      where: {
        id: Number(validatedCommentId),
      },
    });

    return Response.json(comment);
  } else {
    return new Response(null, {
      status: 400,
      statusText: 'invalid comment id',
    });
  }
}
