import { Post as PostData } from '../../../fetch/blog-apis-types';
import { getPosts } from '../../../fetch/blog-apis';
import PostView from './components/PostView';

export async function generateStaticParams() {
  const posts = (await getPosts()) ?? [];

  return posts.map((post) => {
    return {
      postId: String(post.id),
    };
  });
}

export type StaticallyGeneratedParam<T extends () => Promise<unknown[]>> =
  Awaited<ReturnType<T>>[number];

export type PostPageStaticParam = StaticallyGeneratedParam<
  typeof generateStaticParams
>;

function getPost(postId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${postId}`, {
    next: {
      revalidate: 60 * 60 * 60,
    },
  })
    .then<PostData>((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default async function Post({
  params,
}: {
  params: PostPageStaticParam;
}) {
  const postId = params.postId;
  const post = await getPost(postId);

  return <PostView post={post} />;
}
