import { Entity } from '@project/core-repository';
import { LinkPost, PostStatus, PostType } from '@project/types';
import { CommentEntity } from '../post-comment/comment.entity';
import { LikeEntity } from '../post-like/like.entity';

export class LinkPostEntity implements LinkPost, Entity<string, LinkPost> {
  public id?: string;
  public userId: string;
  public type: PostType.Link = PostType.Link;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public likes?: LikeEntity[];
  public comments?: CommentEntity[];
  public link: string;
  public description?: string;

  constructor(post: Omit<LinkPost, 'type'>) {
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
    this.link = post.link;
    this.description = post.description;
  }

  public toPOJO(): LinkPost {
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
      link: this.link,
      description: this.description,
    };
  }

  static fromObject(object: LinkPost): LinkPostEntity {
    return new LinkPostEntity(object);
  }
}
