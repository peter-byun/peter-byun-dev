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

import { TIME_IN_SEC } from '../../constants/time-constants';

import {
  postItemStyle,
  postsNotFoundStyle,
  postsRootStyle,
  searchBoxStyle,
  searchBoxInputStyle,
} from '../../components/posts/Posts.style';
import { fetchPosts } from '../../client-data/posts/fetchPosts';

export async function getStaticProps() {
  await fetchPosts();

  const posts = (await getPosts()) ?? [];

  return {
    props: {
      posts: Array.isArray(posts) ? posts : [],
    },
    revalidate: TIME_IN_SEC.WEEK,
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

  const shouldShowPosts = useMemo(() => posts?.length, [posts]);

  if (!posts) {
    return null;
  }

  return (
    <section css={postsRootStyle}>
      <section
        css={css`
          position: sticky;
          top: 0px;
        `}
      >
        <Input
          placeholder="🔍 Search posts"
          customCss={searchBoxStyle}
          customInputCss={searchBoxInputStyle}
          onChange={handleSearchKeyUp}
        ></Input>
      </section>

      {shouldShowPosts ? (
        postsToShow?.length ? (
          postsToShow.map((post) => {
            return (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                css={css`
                  outline: none;
                `}
              >
                <ContainerButton
                  css={postItemStyle}
                  className="posts-item"
                  level={2}
                  tabIndex={-1}
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
          <p css={postsNotFoundStyle}>Found Nothing 🥲</p>
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
