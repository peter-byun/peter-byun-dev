import { PostService } from '../backend/server-actions/post.service';

const postService = new PostService();

export const getPosts = () => {
  return postService.posts({
    skip: 0,
  });
};
