import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostStatus } from '@project/types';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Post status',
    enum: PostStatus,
    example: PostStatus.Draft,
  })
  @IsOptional()
  @IsEnum(PostStatus)
  public status?: PostStatus;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public tags?: string[];

  @ApiPropertyOptional({
    description: 'Post title',
    example: 'How to build NestJS REST API',
    minLength: 20,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title?: string;

  @ApiPropertyOptional({
    description: 'YouTube video URL',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsOptional()
  @IsUrl()
  public videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Post announcement',
    minLength: 50,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  public announcement?: string;

  @ApiPropertyOptional({
    description: 'Post text',
    minLength: 100,
    maxLength: 1024,
  })
  @IsOptional()
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  public text?: string;

  @ApiPropertyOptional({
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(300)
  public quote?: string;

  @ApiPropertyOptional({
    description: 'Quote author',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public author?: string;

  @ApiPropertyOptional({
    description: 'Photo file path',
    example: '/uploads/photo.jpg',
  })
  @IsOptional()
  @IsString()
  public photoPath?: string;

  @ApiPropertyOptional({
    description: 'Link URL',
    example: 'https://nestjs.com',
  })
  @IsOptional()
  @IsUrl()
  public link?: string;

  @ApiPropertyOptional({
    description: 'Link description',
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  public description?: string;
}
