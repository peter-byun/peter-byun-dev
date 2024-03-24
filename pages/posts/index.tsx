import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getPosts } from '../../fetch/blog-apis';

import Layout from '../../components/global/Layout';

import { ContainerButton } from '../../components/base/ContainerButton';
import { LoadingSpinner } from '../../components/global/LoadingSpinner';

import { css } from '@emotion/react';
import { Input } from '../../components/base/Input';
import { pageRoot } from '../../styles/mixins';
import { bgColor4, textActive } from '../../styles/variables';
import { TIME_IN_SEC } from '../../constants/time-constants';
import { NotionService } from '../../backend/services/notion.service';
import { PostService } from '../../backend/services/post.service';
import { Prisma } from '@prisma/client';

async function fetchPosts() {
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
  // TODO: Upload images to your S3 bucket("/post-images/filename" directory).
  // 1. Parse the HTML tags
  // 2. Find image tags
  // 3. Replace the src attributes with "/s3-url/post-images/original-filename".

  if (validPosts.length > 0) {
    await postService.upsertPosts(validPosts as Prisma.PostCreateInput[]);
  }
}

export async function getStaticProps() {
  await fetchPosts();

  const posts = (await getPosts()) ?? [];

  return {
    props: {
      posts: Array.isArray(posts) ? posts : [],
    },
    revalidate: TIME_IN_SEC.HOUR,
  };
}

// Use Suspense to indicate loading
const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchKeyUp = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const postsToShow = useMemo(() => {
    return posts?.filter((post) =>
      post.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [posts, searchText]);

  const showPosts = useMemo(() => posts?.length, [posts]);

  if (!posts) {
    return null;
  }

  return (
    <section css={postsRootCss}>
      <section
        css={css`
          position: sticky;
          top: 0px;
        `}
      >
        <Input
          placeholder="🔍 Search posts"
          customCss={searchBoxCss}
          customInputCss={searchBoxInputCss}
          onChange={handleSearchKeyUp}
        ></Input>
      </section>
      {showPosts ? (
        postsToShow?.length ? (
          postsToShow.map((post) => {
            return (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <ContainerButton
                  css={postItemCss}
                  className="posts-item"
                  level={2}
                >
                  <h3
                    css={css`
                      font-weight: normal;
                    `}
                  >
                    {post.title}
                  </h3>
                </ContainerButton>
              </Link>
            );
          })
        ) : (
          <p
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 38rem;
            `}
          >
            Found Nothing 🥲
          </p>
        )
      ) : (
        <LoadingSpinner size="sm" />
      )}
    </section>
  );
};

Posts.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Posts;

const searchBoxCss = css`
  margin-bottom: 10px;
`;
const searchBoxInputCss = css`
  width: 100%;
  font-size: 1.2rem;
  padding: 1.2rem;
`;

const postsRootCss = css`
  ${pageRoot}
  h1 {
    text-align: left;
  }
`;

const postItemCss = css`
  appearance: none;

  color: ${textActive};

  width: 100%;
  max-width: 45rem;

  padding: 0;
  border: none;

  margin-bottom: 10px;

  cursor: pointer;

  transition: background-color 0.2s ease-in-out;
  :hover,
  :active {
    background-color: ${bgColor4};
  }

  h3 {
    margin: 1.2rem;
  }
`;
