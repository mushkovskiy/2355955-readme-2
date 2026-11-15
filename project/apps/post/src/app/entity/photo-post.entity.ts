import { Entity } from '@project/core-repository';
import { PhotoPost, PostStatus, PostType } from '@project/types';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';

export class PhotoPostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public id?: string;
  public userId: string;
  public type: PostType.Photo = PostType.Photo;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public likes?: LikeEntity[];
  public comments?: CommentEntity[];
  public photoPath: string;

  constructor(post: Omit<PhotoPost, 'type'>) {
    this.id = post.id;
    this.userId = post.userId;
    this.status = post.status ?? PostStatus.Published;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.isRepost = post.isRepost ?? false;
    this.originalPostId = post.originalPostId;
    this.originalPostUserId = post.originalPostUserId;
    this.likes = (post.likes ?? []).map((like) => LikeEntity.fromObject(like));
    this.comments = (post.comments ?? []).map((comment) =>
      CommentEntity.fromObject(comment),
    );
    this.photoPath = post.photoPath;
  }

  public toPOJO(): PhotoPost {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      status: this.status,
      tags: this.tags,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
      isRepost: this.isRepost,
      originalPostId: this.originalPostId,
      originalPostUserId: this.originalPostUserId,
      likes: this.likes?.map((like) => like.toPOJO()),
      comments: this.comments?.map((comment) => comment.toPOJO()),
      photoPath: this.photoPath,
    };
  }

  static fromObject(object: PhotoPost): PhotoPostEntity {
    return new PhotoPostEntity(object);
  }
}
