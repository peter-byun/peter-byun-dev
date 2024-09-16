'use client';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import './PostList.css';

import { Input } from '../../../ui/Input';

import { Post } from '../../../network/blog-apis-types';
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
    if (searchText) {
      return posts.filter((post) =>
        post.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
    }

    return posts;
  }, [posts, searchText]);

  return (
    <section className="post-root page-root">
      <section className="search-box">
        <Input
          placeholder="🔍 Search posts"
          className="search-box-input"
          onChange={handleSearchKeyUp}
        />
      </section>

      {postsToShow.length ? (
        <>
          {postsToShow.map((post) => {
            return <PostLink post={post} key={post.id} />;
          })}
        </>
      ) : (
        <p className="posts-not-found">Found Nothing 🥲</p>
      )}
    </section>
  );
}
