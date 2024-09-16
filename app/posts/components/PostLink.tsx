'use client';
import Link from 'next/link';
import { Post } from '../../../fetch/blog-apis-types';
import { ContainerButton } from '../../../ui/ContainerButton';

interface PostLinkProps {
  post: Post;
}

export default function PostLink({ post }: PostLinkProps) {
  return (
    <Link href={`/posts/${post.id}`} key={post.id} className="post-item-link">
      <ContainerButton className="post-item" level={2} tabIndex={-1}>
        <h3
          style={{
            fontWeight: 'normal',
          }}
        >
          {post.title}
        </h3>
      </ContainerButton>
    </Link>
  );
}
