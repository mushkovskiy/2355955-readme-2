import { Entity } from '@project/core-repository';
import { Like } from '@project/types';

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public postId: string;
  public userId: string;
  public createdAt: Date;

  constructor(like: Like) {
    this.id = like.id;
    this.postId = like.postId;
    this.userId = like.userId;
    this.createdAt = like.createdAt;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }

  static fromObject(object: Like): LikeEntity {
    return new LikeEntity(object);
  }
}
