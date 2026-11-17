import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

export async function getJwtOptions(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<SignOptions['expiresIn']>(
        'jwt.accessTokenExpiresIn',
      ),
      algorithm: 'HS256',
    },
  };
}
