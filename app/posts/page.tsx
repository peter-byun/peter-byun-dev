'use client';

import { getPosts } from '../../fetch/blog-apis';

import { fetchPosts } from '../../client-data/posts/fetchPosts';
import { PostList } from './components/PostList';

export async function loadPosts() {
  await fetchPosts();

  const posts = (await getPosts()) ?? [];

  return Array.isArray(posts) ? posts : [];
}

export default async function Posts() {
  const posts = await loadPosts();

  return <PostList posts={posts} />;
}
