import { Post } from './blog-apis-types';
import { fetchJson } from './fetch-utils';

export const getPosts = () => {
  return fetchJson<Post[]>(
    `${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts`
  ).catch((e) => {
    console.error(e);

    throw e;
  });
};
