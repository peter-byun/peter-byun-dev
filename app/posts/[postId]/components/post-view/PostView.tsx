'use client';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import 'highlight.js/styles/github-dark.css';

import {
  Comment,
  CommentCreateInput,
  Comment as CommentData,
  Post as PostData,
} from '../../../../../network/blog-apis-types';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../../../../../ui/toast/useToast';
import { useThrottle } from '../../../../../utils/hooks/useThrottle';
import { copyToClipboard } from '../../../../../utils/copy-to-clipboard';
import { Button } from '../../../../../ui/button/Button';
import { Hr } from '../../../../../ui/Hr';
import { CommentsSection } from '../comments/CommentsSection';
import { LoadingSpinner } from '../../../../../ui/LoadingSpinner';
import { Toast } from '../../../../../ui/toast/Toast';

import styles from './PostView.module.scss';
import clsx from 'clsx';
import { useHeaderContext } from '../../../../states/global/header-state';
import { HeartSvg } from './post-like-button/HeartSvg';
import { useLikeAnim } from './post-like-button/useLikeAnim';
import { useWebShare } from '../../../../../utils/hooks/useWebShare';

export default function PostView(props: {
  post: PostData;
  comments?: CommentData[];
  likePost: (postId: number) => Promise<void>;
  createComment: (commentInput: CommentCreateInput) => Promise<Comment>;
  likeComment: (commentId: string) => Promise<Comment>;
}) {
  const { post, comments, likePost, createComment, likeComment } = props;
  const [postLikes, setPostLikes] = useState(post?.likes ?? 0);

  useHeaderTitle({
    title: post.title,
  });

  const toast = useToast();

  const likeAnim = useLikeAnim();

  const handleLikeClick = useCallback(() => {
    likePost(post.id).then(() => {
      toast.push('Thank you 🫶🏻');
      likeAnim.animate();
      setPostLikes(postLikes + 1);
    });
  }, [post.id, setPostLikes]);

  const [throttledHandleLikeClick] = useThrottle(handleLikeClick, 800);

  const webShare = useWebShare();

  const handleShareClick = async () => {
    const shareSucceeded = await webShare.share({
      title: 'Peter Byun - Blog',
      text: 'Read articles about web development.',
      url: location.href,
    });
    if (shareSucceeded) {
      copyToClipboard(location.href);
      toast.push('URL is copied to clipboard ✅');
    } else {
      toast.push('Failed to share a post 😢');
    }
  };

  return (
    <section className={clsx(['post-root page-root', styles.postViewRoot])}>
      {post?.content ? (
        <article className={styles.post}>
          <section
            dangerouslySetInnerHTML={new InnerHtmlHolder(post.content)}
            className={styles.postContent}
          />

          <section className={styles.postAsideLeft}>
            <div className={styles.linkButtonWrapper}>
              <Button
                onClick={throttledHandleLikeClick}
                custom
                style={{
                  padding: '7px 0px',
                  ...likeAnim.elementStyles.buttonStyle,
                }}
              >
                <HeartSvg
                  style={{
                    ...likeAnim.elementStyles.heartStyle,
                  }}
                />
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
          </section>

          <Hr margin="50px 0px" />

          <CommentsSection
            postId={String(post.id)}
            comments={comments}
            createComment={createComment}
            likeComment={likeComment}
          />
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

function useHeaderTitle({ title }: { title: string }) {
  const { setHeader } = useHeaderContext();

  useEffect(() => {
    if (!title) {
      return;
    }

    setHeader({
      title,
    });
  }, [title]);
}
