import { Post, PostType } from '@project/types';
import { PostEntity } from './post-entity.type';
import { VideoPostEntity } from './video-post.entity';
import { TextPostEntity } from './text-post.entity';
import { QuotePostEntity } from './quote-post.entity';
import { PhotoPostEntity } from './photo-post.entity';
import { LinkPostEntity } from './link-post.entity';

export function createPostEntity(document: Post): PostEntity {
  switch (document.type) {
    case PostType.Video:
      return VideoPostEntity.fromObject(document);
    case PostType.Text:
      return TextPostEntity.fromObject(document);
    case PostType.Quote:
      return QuotePostEntity.fromObject(document);
    case PostType.Photo:
      return PhotoPostEntity.fromObject(document);
    case PostType.Link:
      return LinkPostEntity.fromObject(document);
  }
}
