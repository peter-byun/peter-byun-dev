import { PostService } from '../../backend/server-actions/post.service';

import { PostList } from './components/PostList';

const postService = new PostService();

const getPosts = () => {
  return postService.posts({
    skip: 0,
  });
};

export default async function Posts() {
  const posts = (await getPosts()) ?? [];
  Array.isArray(posts) ? posts : [];

  return <PostList posts={posts} />;
}
