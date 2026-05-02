import { randomBytes } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateTokens {
  constructor(private readonly jwt: JwtService) {}

  async generate(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };
    const refreshTokenId = randomBytes(16).toString('hex'); // gera um ID único pro refreshToken

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync({ ...payload, refreshTokenId }, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}
