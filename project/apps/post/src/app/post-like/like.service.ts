import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { fillDto } from '@project/helpers';
import { POST_NOT_FOUND, STUB_USER_ID } from '../post.constant';
import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { LikeRdo } from './rdo/like.rdo';
import { LIKE_ALREADY_EXISTS, LIKE_NOT_FOUND } from './like.constant';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async create(
    postId: string,
    userId: string = STUB_USER_ID,
  ): Promise<LikeEntity> {
    await this.ensurePostExists(postId);

    const existing = await this.likeRepository.findByUserAndPost(
      userId,
      postId,
    );

    if (existing) {
      throw new ConflictException(LIKE_ALREADY_EXISTS);
    }

    const entity = new LikeEntity({
      postId,
      userId,
      createdAt: new Date(),
    });

    return this.likeRepository.save(entity);
  }

  public async getLike(id: string): Promise<LikeEntity> {
    const like = await this.likeRepository.findById(id);

    if (!like) {
      throw new NotFoundException(LIKE_NOT_FOUND);
    }

    return like;
  }

  public async getLikes(postId: string): Promise<LikeEntity[]> {
    await this.ensurePostExists(postId);
    return this.likeRepository.findByPostId(postId);
  }

  public async deleteLike(id: string): Promise<void> {
    await this.getLike(id);
    await this.likeRepository.deleteById(id);
  }

  public toRdo(like: LikeEntity) {
    return fillDto(LikeRdo, like.toPOJO());
  }

  private async ensurePostExists(postId: string): Promise<void> {
    const exists = await this.likeRepository.postExists(postId);

    if (!exists) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
  }
}
