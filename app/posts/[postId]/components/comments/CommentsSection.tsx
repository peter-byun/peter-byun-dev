import './CommentsSection.module.scss';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { Button } from '../../../../../ui/button/Button';
import { Input } from '../../../../../ui/Input';
import { TextArea } from '../../../../../ui/TextArea';
import {
  CommentCreateInput,
  Comment as CommentData,
} from '../../../../../network/blog-apis-types';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputError } from '../../../../../ui/InputError';
import { useThrottle } from '../../../../../utils/hooks/use-throttle';
import { H } from '../../../../../ui/H';
import { Toast } from '../../../../../ui/toast/Toast';
import { useToast } from '../../../../../ui/toast/useToast';

import styles from './CommentsSection.module.scss';

interface CommentsSectionProps {
  postId?: string | string[];
  comments?: CommentData[];
  createComment: (commentInput: CommentCreateInput) => Promise<Comment>;
  likeComment: (commentId: string) => Promise<Comment>;
}

type CommentFormInputs = {
  name: string;
  content: string;
  email?: string;
};

const ERROR_MESSAGES = {
  COMMENT_POSTING_FAILED: 'Failed to post the comment 😢',
} as const;

export const CommentsSection = ({
  postId,
  comments,
  createComment,
  likeComment,
}: CommentsSectionProps) => {
  const [commentsToShow, setCommentsToShow] = useState<
    CommentData[] | undefined
  >(Array.isArray(comments) ? [...comments] : undefined);

  useEffect(() => {
    Array.isArray(comments) && setCommentsToShow([...comments]);
  }, [comments]);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries('comments');
  const toast = useToast();

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
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    return handleSubmit(postComment)(e);
  };
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
      email: watch('email') ?? '',
      content: watch('content'),
    };

    createComment(commentPayload)
      .then(() => {
        queryClient.invalidateQueries('comments');
      })
      .catch(() => {
        toast.push(ERROR_MESSAGES.COMMENT_POSTING_FAILED);
      });
    resetForm();
  }, [postId]);

  const setCommentLikes = useCallback(
    (commentId: number, value: number) => {
      setCommentsToShow((prevCommentsToShow) =>
        prevCommentsToShow?.map((prevComment) =>
          prevComment.id === commentId
            ? { ...prevComment, likes: prevComment.likes + value }
            : prevComment
        )
      );
    },
    [setCommentsToShow]
  );

  const handleCommentLikeClick = useCallback((commentId: number) => {
    setCommentLikes(commentId, 1);

    likeComment(String(commentId)).catch(() => {
      setCommentLikes(commentId, -1);
    });
  }, []);

  const [throttledHandleCommentLikeClick] = useThrottle<
    Parameters<typeof handleCommentLikeClick>
  >(handleCommentLikeClick);

  return (
    <section className={styles.postCommentSection}>
      <H level={3}>Comments</H>
      <form onSubmit={onSubmit} className={styles.commentWriter}>
        <div className={styles.commentWriterId}>
          <div className={styles.inputName}>
            <Input type="text" {...register('name')}>
              Name
            </Input>
            <InputError>{errors.name?.message}</InputError>
          </div>

          <div className={styles.commentEmailWrapper}>
            <Input
              type="email"
              className={styles.commentEmail}
              {...register('email')}
            >
              Email (optional)
            </Input>
            <InputError>{errors.email?.message}</InputError>
          </div>
        </div>

        <div className={styles.viewerCommentContent}>
          <label htmlFor="viewer-comment-editor-text-area">Content</label>
          <TextArea
            id="viewer-comment-editor-text-area"
            {...register('content')}
          />
          <Button isLoading={false}>Submit</Button>
        </div>

        <InputError>{errors.content?.message}</InputError>
      </form>

      {commentsToShow &&
        commentsToShow.map((comment) => (
          <article className={styles.commentContainer} key={comment.id}>
            <span className={styles.commentWriterName}>{comment.name}</span>
            <p>{comment.content}</p>
            <div className={styles.commentBox}>
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
