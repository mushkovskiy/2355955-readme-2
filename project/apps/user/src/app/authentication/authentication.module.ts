import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from '../user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user-model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/core-user-config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserRepository, JwtAccessStrategy],
})
export class AuthenticationModule {}
