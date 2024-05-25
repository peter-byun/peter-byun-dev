import { fetchPosts } from '../../client-data/posts/PostsProvider';
import { getPosts } from '../../fetch/blog-apis';

import { PostList } from './components/PostList';

export default async function Posts() {
  fetchPosts();
  const posts = (await getPosts()) ?? [];
  Array.isArray(posts) ? posts : [];

  return <PostList posts={posts} />;
}
