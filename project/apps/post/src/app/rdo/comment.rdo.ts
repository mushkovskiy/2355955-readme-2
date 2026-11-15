import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
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
    description: 'Comment author ID',
    example: '00000000-0000-0000-0000-000000000001',
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Great post!',
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2026-07-19T10:00:00.000Z',
  })
  @Expose()
  public createdAt!: string;
}
