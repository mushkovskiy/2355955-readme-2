import { Entity } from '@project/core-repository';
import { Comment } from '@project/types';

export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public postId: string;
  public userId: string;
  public text: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.userId = comment.userId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      text: this.text,
      createdAt: this.createdAt,
    };
  }

  static fromObject(object: Comment): CommentEntity {
    return new CommentEntity(object);
  }
}
