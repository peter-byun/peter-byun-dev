'use client';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import 'highlight.js/styles/github-dark.css';

import { useRouter } from 'next/router';
import { Comment as CommentData } from '../../../../fetch/blog-apis-types';

import { Post as PostData } from '../../../../fetch/blog-apis-types';
import { useCallback, useEffect, useState } from 'react';
import { headerState } from '../../../../states/global/header-state';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useToast } from '../../../../components/base/toast/useToast';
import { useThrottle } from '../../../../utility-hooks/use-throttle';
import { copyToClipboard } from '../../../../utils/copy-to-clipboard';
import { Button } from '../../../../components/base/button/Button';
import { HeartSvg } from '../../../../components/posts/HeartSvg';
import { Hr } from '../../../../components/base/Hr';
import { CommentsSection } from '../../../../components/posts/CommentsSection';
import { LoadingSpinner } from '../../../../components/global/LoadingSpinner';
import { Toast } from '../../../../components/base/toast/Toast';

export default function PostView({ post }: { post: PostData }) {
  const router = useRouter();

  const [postLikes, setPostLikes] = useState(post?.likes ?? 0);

  const [, setHeader] = useRecoilState(headerState);

  useEffect(() => {
    if (!post?.title) {
      return;
    }

    setHeader({
      title: post.title,
    });
  }, [post]);

  const { data: comments } = useQuery(
    ['comments', post.id],
    () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${post.id}/comments`
      ).then<CommentData[]>((response) => response.json());
    },
    {
      enabled: router.isReady && Boolean(post.id),
    }
  );

  const toast = useToast();

  const [isLikeAnimationOn, setIsLikeAnimationOn] = useState<boolean>();
  const handleLikeClick = useCallback(() => {
    toast.push('Thank you 🫶🏻');

    setPostLikes((prevLikes) => prevLikes + 1);
    fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${post.id}/likes`, {
      method: 'PATCH',
    }).catch(() => {
      setPostLikes((prevLikes) => prevLikes - 1);
    });

    setIsLikeAnimationOn(true);
    setTimeout(() => {
      setIsLikeAnimationOn(false);
    }, 800);
  }, [post.id, setPostLikes]);

  const [throttledHandleLikeClick] = useThrottle(handleLikeClick, 800);

  const handleShareClick = async () => {
    const shareData = {
      title: 'Peter Byun - Blog',
      text: 'Read articles about web development.',
      url: location.href,
    };

    try {
      if (!navigator.share) {
        copyToClipboard(location.href);
        toast.push('URL is copied to clipboard ✅');
        return;
      }

      await navigator.share(shareData);
    } catch (error: unknown) {
      toast.push('Failed to share a post 😢');
    }
  };

  return (
    <section className="post-root page-root post-view-root">
      {post?.content ? (
        <article className="post">
          <section
            dangerouslySetInnerHTML={new InnerHtmlHolder(post.content)}
            className="post-content"
          ></section>

          <aside className="post-aside-left">
            <div className="like-button-wrapper">
              <Button
                onClick={throttledHandleLikeClick}
                custom
                style={{
                  padding: '7px 0px',
                  animation: isLikeAnimationOn ? 'like-anim 0.7s' : undefined,
                }}
              >
                <HeartSvg
                  style={{
                    animation: isLikeAnimationOn
                      ? 'gradient-anim 0.7s'
                      : undefined,
                  }}
                ></HeartSvg>
              </Button>
              <div
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1rem',
                }}
              >
                {postLikes}
              </div>
            </div>

            <Button
              onClick={handleShareClick}
              style={{
                color: 'var(--text-active)',
                width: 'fit-content',
                margin: '25px 0 0 0',
              }}
              custom
            >
              🔗 Share
            </Button>
          </aside>

          <Hr margin="50px 0px" />

          <CommentsSection
            postId={String(post.id)}
            comments={comments}
          ></CommentsSection>
        </article>
      ) : (
        <LoadingSpinner size="sm" />
      )}
      <Toast
        isOpen={toast.isOpen}
        setIsOpen={toast.setIsOpen}
        messages={toast.messages}
      />
    </section>
  );
}

class InnerHtmlHolder {
  __html: string;
  constructor(__html: string) {
    this.__html = __html;
  }
}
