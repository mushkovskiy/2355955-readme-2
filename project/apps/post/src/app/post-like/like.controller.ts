import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('likes')
@Controller('posts/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The post has been successfully liked.',
    type: LikeRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Post already liked',
  })
  @Post()
  public async create(@Param('postId') postId: string) {
    const like = await this.likeService.create(postId);
    return this.likeService.toRdo(like);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Likes list',
    type: [LikeRdo],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Get()
  public async index(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikes(postId);
    return likes.map((like) => this.likeService.toRdo(like));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like found',
    type: LikeRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Like not found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const like = await this.likeService.getLike(id);
    return this.likeService.toRdo(like);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Like not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteById(@Param('id') id: string) {
    await this.likeService.deleteLike(id);
  }
}
