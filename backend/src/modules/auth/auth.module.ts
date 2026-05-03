import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt/strategies/jwt.strategy';
import { RefreshTokenStrategy } from './jwt/strategies/refresh-token.strategy';
import { GenerateTokens } from './jwt/generate-tokens';
import { UpdateRefreshToken } from './jwt/update-refresh-token';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<number>('JWT_EXPIRES_IN', 900) },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    GenerateTokens,
    UpdateRefreshToken,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
