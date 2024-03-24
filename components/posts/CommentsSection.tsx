import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { z } from 'zod';

import { Button } from '../base/Button';
import { Input } from '../base/Input';
import { TextArea } from '../base/TextArea';
import { Comment as CommentData } from '../../fetch/blog-apis-types';
import { useMutation } from 'react-query';
import { fetchJson } from '../../fetch/fetch-utils';
import { flexColumnCenter } from '../../styles/mixins';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputError } from '../base/InputError';
import { useThrottle } from '../../utility-hooks/use-throttle';
import { H } from '../base/H';

type CommentPayload = {
  postId: number;
  name: string;
  email?: string;
  content: string;
};

const commentContainerCss = css`
  width: 100%;
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid gray;
  }
`;
const commentWriterCss = css`
  ${flexColumnCenter}
  width: 100%;
  gap: 1rem;

  .viewer-comment-editor {
    width: 100%;

    .text-area {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;
const commentWriterId = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;
const commentWriterNameCss = css`
  color: gray;
`;
const commentBottomCss = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  line-height: 1rem;
`;

interface CommentsSectionProps {
  postId?: string | string[];
  comments?: CommentData[];
  onCommentSubmit?: () => void;
}

type CommentFormInputs = {
  name: string;
  content: string;
  email?: string;
};

export const CommentsSection = ({
  postId,
  comments,
  onCommentSubmit,
}: CommentsSectionProps) => {
  const [commentsToShow, setCommentsToShow] = useState<
    CommentData[] | undefined
  >(Array.isArray(comments) ? [...comments] : undefined);

  useEffect(() => {
    Array.isArray(comments) && setCommentsToShow([...comments]);
  }, [comments]);

  const { mutate } = useMutation<CommentData, unknown, CommentPayload>('mk', {
    mutationFn: (commentPaylaod: CommentPayload): Promise<CommentData> => {
      return fetchJson(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/comments`, {
        method: 'POST',
        body: commentPaylaod,
      });
    },
    onSuccess: () => {
      onCommentSubmit?.();
    },
  });
  const commentSubmitPayloadScheme = z.object({
    name: z.string().min(1, 'please enter your name'),
    email: z.string().optional(),
    content: z.string().min(1, 'please enter the content'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(commentSubmitPayloadScheme),
  });

  const postComment = useCallback(() => {
    const postIdInNumber = Number(postId);
    const parsedPostId = z.number().safeParse(postIdInNumber);
    if (!parsedPostId.success) {
      alert('An error occurred while posting the comment.');
      return;
    }

    const commentPayload = {
      postId: parsedPostId.data,
      name: watch('name'),
      email: watch('email'),
      content: watch('content'),
    };

    mutate(commentPayload);
  }, [postId]);

  const setCommentLikes = useCallback(
    (commentId: number, value: number) => {
      setCommentsToShow((prevCommentsToShow) => {
        return prevCommentsToShow?.map((prevComment) => {
          return prevComment.id === commentId
            ? { ...prevComment, likes: prevComment.likes + value }
            : prevComment;
        });
      });
    },
    [setCommentsToShow]
  );

  const handleCommentLikeClick = useCallback((commentId: number) => {
    setCommentLikes(commentId, 1);

    fetchJson(
      `${process.env.NEXT_PUBLIC_BLOG_API_URL}/comments/${commentId}/likes`,
      {
        method: 'PATCH',
      }
    ).catch(() => {
      setCommentLikes(commentId, -1);
    });
  }, []);

  const [throttledHandleCommentLikeClick] = useThrottle<
    Parameters<typeof handleCommentLikeClick>
  >(handleCommentLikeClick);

  return (
    <section className="post-comment-section">
      <H level={3}>Comments</H>
      <form onSubmit={handleSubmit(postComment)} css={commentWriterCss}>
        <div css={commentWriterId}>
          <div
            css={css`
              width: 30%;
            `}
          >
            <Input
              type="text"
              id="comment-name"
              {...register('name')}
              customCss={css`
                input {
                  width: 100%;
                }
              `}
            >
              Name
            </Input>
            <InputError>{errors.name?.message}</InputError>
          </div>

          <div
            css={css`
              width: 50%;
            `}
          >
            <Input
              type="email"
              id="comment-email"
              {...register('email')}
              customCss={css`
                input {
                  width: 100%;
                }
              `}
            >
              Email (optional)
            </Input>
            <InputError>{errors.email}</InputError>
          </div>
        </div>

        <div className="viewer-comment-editor">
          <label htmlFor="viewer-comment-editor-text-area">Content</label>
          <TextArea
            id="viewer-comment-editor-text-area"
            {...register('content')}
          />
          <Button>Submit</Button>
        </div>

        <InputError>{errors.content?.message}</InputError>
      </form>

      {commentsToShow &&
        commentsToShow.map((comment) => (
          <article css={commentContainerCss} key={comment.id}>
            <span css={commentWriterNameCss}>{comment.name}</span>
            <p>{comment.content}</p>
            <div css={commentBottomCss}>
              <Button
                onClick={() => {
                  throttledHandleCommentLikeClick(comment.id);
                }}
                custom
                css={css`
                  :hover,
                  :focus,
                  :active {
                    filter: brightness(1.3);
                  }
                `}
              >
                🤍
              </Button>
              <span>{comment.likes}</span>
            </div>
          </article>
        ))}
    </section>
  );
};
