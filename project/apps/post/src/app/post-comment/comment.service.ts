import { Injectable, NotFoundException } from '@nestjs/common';
import { fillDto } from '@project/helpers';
import { POST_NOT_FOUND, STUB_USER_ID } from '../post.constant';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { COMMENT_NOT_FOUND } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(
    postId: string,
    dto: CreateCommentDto,
  ): Promise<CommentEntity> {
    await this.ensurePostExists(postId);

    const entity = new CommentEntity({
      postId,
      userId: STUB_USER_ID,
      text: dto.text,
      createdAt: new Date(),
    });

    return this.commentRepository.save(entity);
  }

  public async getComment(id: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    return comment;
  }

  public async getComments(postId: string): Promise<CommentEntity[]> {
    await this.ensurePostExists(postId);
    return this.commentRepository.findByPostId(postId);
  }

  public async updateComment(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.getComment(id);
    Object.assign(comment, dto);
    return this.commentRepository.update(id, comment);
  }

  public async deleteComment(id: string): Promise<void> {
    await this.getComment(id);
    await this.commentRepository.deleteById(id);
  }

  public toRdo(comment: CommentEntity) {
    return fillDto(CommentRdo, comment.toPOJO());
  }

  private async ensurePostExists(postId: string): Promise<void> {
    const exists = await this.commentRepository.postExists(postId);

    if (!exists) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
  }
}
