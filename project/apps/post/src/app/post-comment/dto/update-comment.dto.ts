import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  COMMENT_TEXT_MAX_LENGTH,
  COMMENT_TEXT_MIN_LENGTH,
} from '../comment.constant';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'Comment text',
    example: 'Updated comment',
    minLength: COMMENT_TEXT_MIN_LENGTH,
    maxLength: COMMENT_TEXT_MAX_LENGTH,
  })
  @IsOptional()
  @IsString()
  @MinLength(COMMENT_TEXT_MIN_LENGTH)
  @MaxLength(COMMENT_TEXT_MAX_LENGTH)
  public text?: string;
}
