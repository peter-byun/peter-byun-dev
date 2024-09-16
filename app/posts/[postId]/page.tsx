import { string } from 'zod';
import { PostService } from '../../../backend/server-actions/post.service';
import PostView from './components/post-view/PostView';
import { CommentService } from '../../../backend/server-actions/comment.service';
import { CommentCreateInput } from '../../../backend/types/posts.type';

async function getPost(postId: string) {
  const postService = new PostService();

  const postIdValidationResult = string().safeParse(String(postId));
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    const post = await postService.post(Number(validatedPostId));

    if (!post) {
      throw new Error('Post does not exist');
    }

    return post;
  } else {
    throw new Error('invalid post id');
  }
}

async function likePost(postId: number) {
  'use server';
  const postService = new PostService();

  const postIdValidationResult = string().safeParse(String(postId));
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    postService.updatePostLikes({
      where: {
        id: Number(validatedPostId),
      },
    });
  } else {
    throw new Error('invalid post id');
  }
}

async function getComments(id: string) {
  const commentService = new CommentService();

  const postIdValidationResult = string().safeParse(id);
  const validatedPostId = postIdValidationResult.success
    ? postIdValidationResult.data
    : null;

  if (validatedPostId) {
    return commentService.comments({
      where: { postId: Number(validatedPostId) },
    });
  } else {
    throw new Error('invalid postId');
  }
}

async function createComment(comment: CommentCreateInput) {
  'use server';
  const commentService = new CommentService();

  const comments = await commentService.createComment({
    email: comment.email,
    name: comment.name,
    content: comment.content,
    post: {
      connect: {
        id: comment.postId,
      },
    },
  });

  return comments;
}

async function likeComment(commentId: string) {
  'use server';
  const commentService = new CommentService();

  const commentIdValidationResult = string().safeParse(commentId);
  const validatedCommentId = commentIdValidationResult.success
    ? commentIdValidationResult.data
    : null;

  if (validatedCommentId) {
    return commentService.updateCommentLikes({
      where: {
        id: Number(validatedCommentId),
      },
    });
  } else {
    throw new Error('invalid comment id');
  }
}

export default async function Post({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const postId = params.postId;
  const post = await getPost(postId);
  const comments = await getComments(postId);

  return (
    <PostView
      post={post}
      comments={comments}
      createComment={createComment}
      likePost={likePost}
      likeComment={likeComment}
    />
  );
}
