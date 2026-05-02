import { Request } from 'express';

import { BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { DatabaseService } from '@/database/database.service';
import { compare } from 'bcrypt';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly db: DatabaseService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string; email: string }) {
    const logger = new Logger('JWT');

    logger.log('RefreshTokenStrategy.validate called');
    logger.log(`Payload, sub:${payload.sub} email:${payload.email}`);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.error('No authorization header found');
      throw new BadRequestException('Refresh token not provided');
    }

    const refreshToken = authHeader.replace('Bearer', '').trim();
    if (!refreshToken)
      throw new BadRequestException('Refresh token empty after extraction');

    const user = await this.db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        refreshToken: true,
      },
    });
    if (!user || !user.refreshToken)
      throw new BadRequestException('Invalid refresh token');

    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches)
      throw new BadRequestException('Invalid refresh token');

    return { id: user.id, email: user.email, role: user.role };
  }
}
