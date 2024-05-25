import './CommentSEction.css';

import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { Button } from '../base/button/Button';
import { Input } from '../base/Input';
import { TextArea } from '../base/TextArea';
import { Comment as CommentData } from '../../fetch/blog-apis-types';
import { useMutation, useQueryClient } from 'react-query';
import { fetchJson } from '../../fetch/fetch-utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputError } from '../base/InputError';
import { useThrottle } from '../../utility-hooks/use-throttle';
import { H } from '../base/H';
import { Toast } from '../base/toast/Toast';
import { useToast } from '../base/toast/useToast';

type CommentPayload = {
  postId: number;
  name: string;
  email?: string;
  content: string;
};

interface CommentsSectionProps {
  postId?: string | string[];
  comments?: CommentData[];
}

type CommentFormInputs = {
  name: string;
  content: string;
  email?: string;
};

const ERROR_MESSAGES = {
  COMMENT_POSTING_FAILED: 'Failed to post the comment 😢',
} as const;

export const CommentsSection = ({ postId, comments }: CommentsSectionProps) => {
  const [commentsToShow, setCommentsToShow] = useState<
    CommentData[] | undefined
  >(Array.isArray(comments) ? [...comments] : undefined);

  useEffect(() => {
    Array.isArray(comments) && setCommentsToShow([...comments]);
  }, [comments]);

  const queryClient = useQueryClient();
  const toast = useToast();

  const postCommentMutation = useMutation<CommentData, unknown, CommentPayload>(
    {
      mutationFn: (commentPayload: CommentPayload): Promise<CommentData> => {
        return fetchJson(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/comments`, {
          method: 'POST',
          body: commentPayload,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
      onError: () => {
        toast.push(ERROR_MESSAGES.COMMENT_POSTING_FAILED);
      },
    }
  );
  const commentSubmitPayloadScheme = z.object({
    name: z.string().min(1, 'Please enter your name'),
    email: z.string().optional(),
    content: z.string().min(1, 'Please enter the content'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset: resetForm,
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(commentSubmitPayloadScheme),
  });

  const postComment = useCallback(() => {
    const postIdInNumber = Number(postId);
    const parsedPostId = z.number().safeParse(postIdInNumber);
    if (!parsedPostId.success) {
      toast.push(ERROR_MESSAGES.COMMENT_POSTING_FAILED);

      return;
    }

    const commentPayload = {
      postId: parsedPostId.data,
      name: watch('name'),
      email: watch('email'),
      content: watch('content'),
    };

    postCommentMutation.mutate(commentPayload);

    resetForm();
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
      <form
        onSubmit={handleSubmit(postComment)}
        className="comment-writer flex-column-center"
      >
        <div className="comment-writer-id">
          <div className="input-name">
            <Input type="text" id="comment-name" {...register('name')}>
              Name
            </Input>
            <InputError>{errors.name?.message}</InputError>
          </div>

          <div className="comment-email-wrapper">
            <Input type="email" id="comment-email" {...register('email')}>
              Email (optional)
            </Input>
            <InputError>{errors.email}</InputError>
          </div>
        </div>

        <div className="viewer-comment-editor">
          <label htmlFor="viewer-comment-editor-text-area">Content</label>
          <TextArea
            id="viewer-comment-editor-text-area text-input"
            {...register('content')}
          />
          <Button isLoading={postCommentMutation.isLoading}>Submit</Button>
        </div>

        <InputError>{errors.content?.message}</InputError>
      </form>

      {commentsToShow &&
        commentsToShow.map((comment) => (
          <article className="comment-container" key={comment.id}>
            <span className="comment-writer-name">{comment.name}</span>
            <p>{comment.content}</p>
            <div className="comment-box">
              <Button
                onClick={() => {
                  throttledHandleCommentLikeClick(comment.id);
                }}
                custom
              >
                🤍
              </Button>
              <span>{comment.likes}</span>
            </div>
          </article>
        ))}

      <Toast
        isOpen={toast.isOpen}
        setIsOpen={toast.setIsOpen}
        messages={toast.messages}
      />
    </section>
  );
};
