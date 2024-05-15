import { Comment, Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export class CommentService {
  async comment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput
  ): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }

  async comments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return prisma.comment.create({
      data,
    });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { data, where } = params;
    return prisma.comment.update({
      data,
      where,
    });
  }

  async updateCommentLikes(params: {
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Comment> {
    const { where } = params;
    return prisma.comment.update({
      data: {
        likes: {
          increment: 1,
        },
      },
      where,
    });
  }

  async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return prisma.comment.delete({
      where,
    });
  }
}
