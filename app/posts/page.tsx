import { Prisma } from '@prisma/client';
import { NotionService } from '../../backend/server-actions/notion.service';
import { PostService } from '../../backend/server-actions/post.service';
import { getPosts } from '../../fetch/blog-apis';
import { isDev } from '../../utils/environment-checker';

import { PostList } from './components/PostList';

async function fetchPosts() {
  if (isDev()) {
    return;
  }

  const notionService = new NotionService();
  const postService = new PostService();

  const notionPostBlocks = await notionService.getNotionPostBlocks();

  const posts = await Promise.allSettled(
    notionPostBlocks.map((notionPostBlock) => {
      return notionService.getNotionPost(notionPostBlock);
    })
  ).then((responses) => {
    return responses
      .map((response) => {
        if (response.status === 'fulfilled') {
          return response.value;
        } else {
          return undefined;
        }
      })
      .filter((response) => response);
  });

  const validPosts = posts.filter((post) => {
    return post;
  });

  if (validPosts.length > 0) {
    await postService.upsertPosts(validPosts as Prisma.PostCreateInput[]);
  }
}

export default async function Posts() {
  fetchPosts();

  const posts = (await getPosts()) ?? [];
  Array.isArray(posts) ? posts : [];

  return <PostList posts={posts} />;
}
