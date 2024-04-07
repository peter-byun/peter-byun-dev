import { Prisma } from '@prisma/client';
import { NotionService } from '../../backend/services/notion.service';
import { PostService } from '../../backend/services/post.service';

export async function fetchPosts() {
  if (process.env.NODE_ENV === 'development') {
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
