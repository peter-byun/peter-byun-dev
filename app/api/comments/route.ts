import { CommentService } from '../../../backend/services/comment.service';

export async function POST(request: Request) {
  const requestBody = await request.json();

  const commentService = new CommentService();

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

  return Response.json(comments);
}
