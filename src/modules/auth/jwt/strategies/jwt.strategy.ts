import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Strategy, ExtractJwt } from 'passport-jwt';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly db: DatabaseService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }
  async validate(payload: { sub: string; email: string }) {
    const user = await this.db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        password: false,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
