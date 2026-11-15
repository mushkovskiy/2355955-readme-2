import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  public avatarPath!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov',
  })
  @IsString()
  public lastname!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password!: string;
}
