import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { AuthService } from './shared/auth.service';
import { jwtConstants } from './shared/constants';
import { UserModule } from '../models/user/user.module';


@Module({
    imports: [
      UserModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '360s' },
      }),
    ],
    controllers: [
      AuthController,
    ],
    providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
    ],
  })
  export class AuthModule { }