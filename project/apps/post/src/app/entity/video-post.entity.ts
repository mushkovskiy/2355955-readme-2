import { Entity } from '@project/core-repository';
import { PostStatus, PostType, VideoPost } from '@project/types';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';

export class VideoPostEntity implements VideoPost, Entity<string, VideoPost> {
  public id?: string;
  public userId: string;
  public type: PostType.Video = PostType.Video;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public likes?: LikeEntity[];
  public comments?: CommentEntity[];
  public title: string;
  public videoUrl: string;

  constructor(post: Omit<VideoPost, 'type'>) {
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
    this.title = post.title;
    this.videoUrl = post.videoUrl;
  }

  public toPOJO(): VideoPost {
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
      title: this.title,
      videoUrl: this.videoUrl,
    };
  }
  static fromObject(object: VideoPost): VideoPostEntity {
    return new VideoPostEntity(object);
  }
}
