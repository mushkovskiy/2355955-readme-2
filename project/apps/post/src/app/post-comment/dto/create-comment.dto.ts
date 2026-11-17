import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  COMMENT_TEXT_MAX_LENGTH,
  COMMENT_TEXT_MIN_LENGTH,
} from '../comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Great post!',
    minLength: COMMENT_TEXT_MIN_LENGTH,
    maxLength: COMMENT_TEXT_MAX_LENGTH,
  })
  @IsString()
  @MinLength(COMMENT_TEXT_MIN_LENGTH)
  @MaxLength(COMMENT_TEXT_MAX_LENGTH)
  public text!: string;
}
