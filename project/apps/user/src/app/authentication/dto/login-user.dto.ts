import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password!: string;
}
