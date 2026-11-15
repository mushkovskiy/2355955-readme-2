import { Injectable } from '@nestjs/common';
import { Post } from '@project/types';
import { BasePostgresRepository } from '@project/core-repository';
import { PrismaClientService } from '@project/post-models';
import { PostEntity } from './entity/post-entity.type';
import { createPostEntity } from './entity/create-post-entity';
import { mapPrismaDocumentToPost } from './entity/map-prisma-document-to-post';
import { PostFilter, postFilterToPrismaFilter } from './post.filter';
import { MAX_POSTS_LIMIT } from './post.constant';

const postRelations = {
  likes: true,
  comments: true,
} as const;

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(protected readonly prismaClient: PrismaClientService) {
    super(prismaClient, createPostEntity);
  }

  public override async save(post: PostEntity): Promise<PostEntity> {
    const { likes: _likes, comments: _comments, ...data } = post.toPOJO();
    const record = await this.prismaClient.post.create({
      data,
      include: postRelations,
    });
    return this.createEntityFromDocument(mapPrismaDocumentToPost(record));
  }

  public override async findById(id: string): Promise<PostEntity | null> {
    const document = await this.prismaClient.post.findFirst({
      where: {
        id,
      },
      include: postRelations,
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(mapPrismaDocumentToPost(document));
  }

  public async find(filter?: PostFilter): Promise<PostEntity[]> {
    const where = filter ?? postFilterToPrismaFilter(filter);

    const documents = await this.prismaClient.post.findMany({
      where,
      take: MAX_POSTS_LIMIT,
      include: postRelations,
    });

    return documents
      .map((document) =>
        this.createEntityFromDocument(mapPrismaDocumentToPost(document)),
      )
      .filter((entity): entity is PostEntity => entity !== null);
  }

  public override async deleteById(id: string): Promise<void> {
    await this.prismaClient.post.delete({
      where: {
        id,
      },
    });
  }

  public override async update(
    id: string,
    post: PostEntity,
  ): Promise<PostEntity> {
    const { likes: _likes, comments: _comments, ...data } = post.toPOJO();
    const record = await this.prismaClient.post.update({
      where: {
        id,
      },
      data,
      include: postRelations,
    });

    return this.createEntityFromDocument(mapPrismaDocumentToPost(record));
  }

  public async findAll(): Promise<PostEntity[]> {
    const documents = await this.prismaClient.post.findMany({
      include: postRelations,
    });
    return documents
      .map((document) =>
        this.createEntityFromDocument(mapPrismaDocumentToPost(document)),
      )
      .filter((entity): entity is PostEntity => entity !== null);
  }
}
