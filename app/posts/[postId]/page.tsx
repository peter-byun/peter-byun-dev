import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import 'highlight.js/styles/github-dark.css';

import { Button } from '../../../components/base/button/Button';
import { LoadingSpinner } from '../../../components/global/LoadingSpinner';
import { HeartSvg } from '../../../components/posts/HeartSvg';
import { CommentsSection } from '../../../components/posts/CommentsSection';
import { Post as PostData } from '../../../fetch/blog-apis-types';
import { Comment as CommentData } from '../../../fetch/blog-apis-types';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
  primaryColor2Inactive,
  textActive,
  textSecondary,
} from '../../../styles/variables';
import { useRecoilState } from 'recoil';
import { headerState } from '../../../states/global/header-state';
import Layout from '../../layout/RootBody';
import { useThrottle } from '../../../utility-hooks/use-throttle';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPosts } from '../../../fetch/blog-apis';
import { string } from 'zod';
import { TIME_IN_SEC } from '../../../constants/time-constants';
import { Hr } from '../../../components/base/Hr';
import { copyToClipboard } from '../../../utils/copy-to-clipboard';
import { useToast } from '../../../components/base/toast/useToast';
import { Toast } from '../../../components/base/toast/Toast';

export const getStaticPaths = (async () => {
  const posts = (await getPosts()) ?? [];

  return {
    paths: posts.map((post) => {
      return {
        params: {
          postId: String(post.id),
        },
      };
    }),
    fallback: true,
  };
}) satisfies GetStaticPaths<{
  postId: string;
}>;

const BUFFER_TIME_FOR_DB_UPDATE = 300;
export const getStaticProps = (async (context) => {
  const parsedPostId = string().safeParse(context.params?.postId);

  if (!parsedPostId.success) {
    return {
      props: {
        post: null,
      },
      revalidate: TIME_IN_SEC.HOUR + BUFFER_TIME_FOR_DB_UPDATE,
    };
  }

  const post = await getPost(parsedPostId.data);

  return {
    props: {
      post,
      revalidate: TIME_IN_SEC.HOUR,
    },
  };
}) satisfies GetStaticProps<{
  post: PostData | null;
}>;

function getPost(postId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${postId}`)
    .then<PostData>((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { postId } = router.query;

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
    ['comments', postId],
    () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${postId}/comments`
      ).then<CommentData[]>((response) => response.json());
    },
    {
      enabled: router.isReady && Boolean(postId),
    }
  );

  const toast = useToast();

  const [isLikeAnimationOn, setIsLikeAnimationOn] = useState<boolean>();
  const handleLikeClick = useCallback(() => {
    toast.push('Thank you 🫶🏻');

    setPostLikes((prevLikes) => prevLikes + 1);
    fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/posts/${postId}/likes`, {
      method: 'PATCH',
    }).catch(() => {
      setPostLikes((prevLikes) => prevLikes - 1);
    });

    setIsLikeAnimationOn(true);
    setTimeout(() => {
      setIsLikeAnimationOn(false);
    }, 800);
  }, [postId, setPostLikes]);
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
    <PostRoot className="post-root">
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
            postId={postId}
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
    </PostRoot>
  );
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

class InnerHtmlHolder {
  __html: string;
  constructor(__html: string) {
    this.__html = __html;
  }
}

export const PostRoot = styled.section`
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
