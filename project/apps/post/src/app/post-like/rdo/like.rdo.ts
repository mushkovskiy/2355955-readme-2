import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LikeRdo {
  @ApiProperty({
    description: 'The uniq like ID',
    example: '13',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Post ID',
    example: '42',
  })
  @Expose()
  public postId!: string;

  @ApiProperty({
    description: 'User ID who liked the post',
    example: '00000000-0000-0000-0000-000000000001',
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    description: 'Like creation date',
    example: '2026-07-19T10:00:00.000Z',
  })
  @Expose()
  public createdAt!: string;
}
