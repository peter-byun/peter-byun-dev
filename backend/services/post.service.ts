import { Post, Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export class PostService {
  async post(postId: number): Promise<Post | null> {
    return prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return prisma.post.create({
      data,
    });
  }

  async createPosts(data: Prisma.PostCreateInput[]) {
    return prisma.post.createMany({
      data,
    });
  }

  async upsertPosts(data: Prisma.PostCreateInput[]) {
    return prisma.$transaction(
      data.map((cur) =>
        prisma.post.upsert({
          where: { title: cur.title },
          update: {
            title: cur.title,
            content: cur.content,
          },
          create: { title: cur.title, content: cur.content },
        })
      )
    );
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return prisma.post.update({
      data,
      where,
    });
  }

  async updatePostLikes(params: {
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Post> {
    const { where } = params;
    return prisma.post.update({
      data: {
        likes: {
          increment: 1,
        },
      },
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return prisma.post.delete({
      where,
    });
  }
}
