'use client';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import { Input } from '../../../components/base/Input';

import {
  postsNotFoundStyle,
  postsRootStyle,
  searchBoxStyle,
  searchBoxInputStyle,
} from '../../../components/posts/Posts.style';
import { Post } from '../../../fetch/blog-apis-types';
import PostLink from './PostLink';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchKeyUp = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const postsToShow = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [posts, searchText]);

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
        />
      </section>

      {postsToShow.length ? (
        <>
          {postsToShow.map((post) => {
            return <PostLink post={post} />;
          })}
        </>
      ) : (
        <p css={postsNotFoundStyle}>Found Nothing 🥲</p>
      )}
    </section>
  );
}
