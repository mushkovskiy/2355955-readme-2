import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaClientModule } from '@project/post-models';
import { LikeModule } from './post-like/like.module';
import { CommentModule } from './post-comment/comment.module';

@Module({
  imports: [PrismaClientModule, CommentModule, LikeModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
