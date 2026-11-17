import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.',
    type: CommentRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const comment = await this.commentService.create(postId, dto);
    return this.commentService.toRdo(comment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list',
    type: [CommentRdo],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Get()
  public async index(@Param('postId') postId: string) {
    const comments = await this.commentService.getComments(postId);
    return comments.map((comment) => this.commentService.toRdo(comment));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment found',
    type: CommentRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const comment = await this.commentService.getComment(id);
    return this.commentService.toRdo(comment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment has been successfully updated.',
    type: CommentRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentService.updateComment(id, dto);
    return this.commentService.toRdo(comment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteById(@Param('id') id: string) {
    await this.commentService.deleteComment(id);
  }
}
