import { Injectable } from '@nestjs/common';
import { Like as PrismaLike } from '@prisma/client';
import { Like } from '@project/types';
import { BasePostgresRepository } from '@project/core-repository';
import { PrismaClientService } from '@project/post-models';
import { LikeEntity } from './like.entity';

function mapPrismaLike(document: PrismaLike): Like {
  return {
    id: document.id,
    postId: document.postId,
    userId: document.userId,
    createdAt: document.createdAt,
  };
}

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(protected readonly prismaClient: PrismaClientService) {
    super(prismaClient, LikeEntity.fromObject);
  }

  public override async save(like: LikeEntity): Promise<LikeEntity> {
    const record = await this.prismaClient.like.create({
      data: {
        postId: like.postId,
        userId: like.userId,
      },
    });

    return this.createEntityFromDocument(mapPrismaLike(record));
  }

  public override async findById(id: string): Promise<LikeEntity | null> {
    const document = await this.prismaClient.like.findFirst({
      where: { id },
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(mapPrismaLike(document));
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const documents = await this.prismaClient.like.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
    });

    return documents.map((document) =>
      this.createEntityFromDocument(mapPrismaLike(document)),
    );
  }

  public async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const document = await this.prismaClient.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(mapPrismaLike(document));
  }

  public override async deleteById(id: string): Promise<void> {
    await this.prismaClient.like.delete({
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
