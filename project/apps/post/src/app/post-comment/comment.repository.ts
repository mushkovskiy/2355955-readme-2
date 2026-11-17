import { Injectable } from '@nestjs/common';
import { Comment as PrismaComment } from '@prisma/client';
import { Comment } from '@project/types';
import { BasePostgresRepository } from '@project/core-repository';
import { PrismaClientService } from '@project/post-models';
import { CommentEntity } from './comment.entity';

function mapPrismaComment(document: PrismaComment): Comment {
  return {
    id: document.id,
    postId: document.postId,
    userId: document.userId,
    text: document.text,
    createdAt: document.createdAt,
  };
}

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(protected readonly prismaClient: PrismaClientService) {
    super(prismaClient, CommentEntity.fromObject);
  }

  public override async save(comment: CommentEntity): Promise<CommentEntity> {
    const record = await this.prismaClient.comment.create({
      data: {
        postId: comment.postId,
        userId: comment.userId,
        text: comment.text,
      },
    });

    return this.createEntityFromDocument(mapPrismaComment(record));
  }

  public override async findById(id: string): Promise<CommentEntity | null> {
    const document = await this.prismaClient.comment.findFirst({
      where: { id },
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(mapPrismaComment(document));
  }

  public async findByPostId(postId: string): Promise<CommentEntity[]> {
    const documents = await this.prismaClient.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
    });

    return documents.map((document) =>
      this.createEntityFromDocument(mapPrismaComment(document)),
    );
  }

  public override async update(
    id: string,
    comment: CommentEntity,
  ): Promise<CommentEntity> {
    const record = await this.prismaClient.comment.update({
      where: { id },
      data: {
        text: comment.text,
      },
    });

    return this.createEntityFromDocument(mapPrismaComment(record));
  }

  public override async deleteById(id: string): Promise<void> {
    await this.prismaClient.comment.delete({
      where: { id },
    });
  }

  public async postExists(postId: string): Promise<boolean> {
    const count = await this.prismaClient.post.count({
      where: { id: postId },
    });

    return count > 0;
  }
}
