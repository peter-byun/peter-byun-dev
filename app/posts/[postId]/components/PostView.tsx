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
import { css, keyframes } from '@emotion/react';
import { HeartSvg } from '../../../../components/posts/HeartSvg';
import {
  primaryColor2Inactive,
  textActive,
  textSecondary,
} from '../../../../styles/variables';
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
    <section className="post-root" css={postRootStyle}>
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
                css={[
                  css`
                    padding: 7px 0px;
                  `,
                  isLikeAnimationOn
                    ? css`
                        animation: ${animationLike} 0.7s;
                      `
                    : undefined,
                ]}
              >
                <HeartSvg
                  css={
                    isLikeAnimationOn &&
                    css`
                      animation: ${animationGradient} 0.7s;
                    `
                  }
                ></HeartSvg>
              </Button>
              <div
                css={css`
                  color: ${textSecondary};
                  line-height: 1rem;
                `}
              >
                {postLikes}
              </div>
            </div>

            <Button
              onClick={handleShareClick}
              css={css`
                color: ${textActive};
                width: fit-content;
                margin: 25px 0 0 0;
              `}
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

export const postRootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80vh;

  & > * {
    width: 45rem;
    max-width: 100%;
  }

  .post {
    background-color: #212121;
    max-width: 100%;
    border-radius: 6px;
    padding: 1rem;

    .post-title {
      width: 100%;
      text-align: left;
    }
    .post-content {
      width: 100%;
      text-align: left;

      line-height: 2rem;
    }

    pre {
      code {
        line-height: 1rem;
        span {
          white-space: pre-line;
        }
      }
    }

    figure {
      img {
        width: 100%;
      }
    }

    code {
      border-radius: 10px;
    }

    .post-aside-left {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;

      .like-button-wrapper {
        text-align: center;
        color: ${primaryColor2Inactive};
        font-size: 1.2rem;

        svg {
          width: 2.5rem;
          height: 2.5rem;
        }
      }

      @media screen and (min-width: 960px) {
        position: fixed;
        left: 5%;
        top: 30vh;
      }
    }

    .post-aside-right {
      right: 5%;
      top: 30vh;
    }

    .post-comment-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
    }
  }
`;

const animationGradient = keyframes`
  from, to {
    fill: #f52133f0;
  }
  50% {
    fill: #fc3d4def;
  }
`;
const animationLike = keyframes`
  from, to {
    transform: scale
    (1);
  }
  20% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
`;
