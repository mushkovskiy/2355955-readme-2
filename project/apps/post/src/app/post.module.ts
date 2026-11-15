import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaClientModule } from '@project/post-models';

@Module({
  imports: [PrismaClientModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
