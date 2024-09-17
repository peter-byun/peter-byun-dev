import { Prisma } from '@prisma/client';
import { NotionService } from '../../backend/server-actions/notion.service';
import { PostService } from '../../backend/server-actions/post.service';
import { isDev } from '../../utils/environment-checker';
import { Prompt } from './Prompt';

async function validatePassword(val: string) {
  'use server';

  if (val === process.env.NOTION_UPDATE_PASSWORD) {
    return true;
  }
  return false;
}

const postService = new PostService();

async function fetchPosts() {
  'use server';
  if (isDev()) {
    return;
  }

  const notionService = new NotionService();

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

export default async function Loader() {
  return <Prompt validatePassword={validatePassword} fetchPosts={fetchPosts} />;
}
