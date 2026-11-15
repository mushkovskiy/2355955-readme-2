import {
  Comment as PrismaComment,
  Like as PrismaLike,
  Post as PrismaPost,
} from '@prisma/client';
import { Comment, Like, Post, PostStatus, PostType } from '@project/types';

export type PrismaPostWithRelations = PrismaPost & {
  likes?: PrismaLike[];
  comments?: PrismaComment[];
};

function mapPrismaLike(like: PrismaLike): Like {
  return {
    id: like.id,
    postId: like.postId,
    userId: like.userId,
    createdAt: like.createdAt,
  };
}

function mapPrismaComment(comment: PrismaComment): Comment {
  return {
    id: comment.id,
    postId: comment.postId,
    userId: comment.userId,
    text: comment.text,
    createdAt: comment.createdAt,
  };
}

export function mapPrismaDocumentToPost(
  document: PrismaPostWithRelations,
): Post {
  const base = {
    id: document.id,
    userId: document.userId,
    status:
      document.status === 'published'
        ? PostStatus.Published
        : PostStatus.Draft,
    tags: document.tags,
    createdAt: document.createdAt,
    publishedAt: document.publishedAt,
    isRepost: document.isRepost,
    originalPostId: document.originalPostId ?? undefined,
    originalPostUserId: document.originalPostUserId ?? undefined,
    likes: (document.likes ?? []).map(mapPrismaLike),
    comments: (document.comments ?? []).map(mapPrismaComment),
  };

  switch (document.type) {
    case 'video':
      return {
        ...base,
        type: PostType.Video,
        title: document.title!,
        videoUrl: document.videoUrl!,
      };
    case 'text':
      return {
        ...base,
        type: PostType.Text,
        title: document.title!,
        announcement: document.announcement!,
        text: document.text!,
      };
    case 'quote':
      return {
        ...base,
        type: PostType.Quote,
        quote: document.quote!,
        author: document.author!,
      };
    case 'photo':
      return {
        ...base,
        type: PostType.Photo,
        photoPath: document.photoPath!,
      };
    case 'link':
      return {
        ...base,
        type: PostType.Link,
        link: document.link!,
        description: document.description ?? undefined,
      };
  }
}
