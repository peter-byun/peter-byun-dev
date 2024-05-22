import { PostService } from '../../../backend/server-actions/post.service';

export default async function GET() {
  const postService = new PostService();

  const posts = await postService.posts({
    skip: 0,
  });

  return Response.json(posts);
}
