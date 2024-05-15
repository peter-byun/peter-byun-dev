import Link from 'next/link';
import { Post } from '../../../fetch/blog-apis-types';
import { ContainerButton } from '../../../components/base/ContainerButton';
import { postItemStyle } from '../../../components/posts/Posts.style';
import { css } from '@emotion/react';

interface PostLinkProps {
  post: Post;
}

export default function PostLink({ post }: PostLinkProps) {
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
}
