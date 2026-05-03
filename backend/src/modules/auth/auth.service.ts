import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

import { hash, compare } from 'bcrypt';

import { GenerateTokens } from './jwt/generate-tokens';
import { UpdateRefreshToken } from './jwt/update-refresh-token';

import { RegisterDto } from './dtos/register.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import type { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    public tokens: GenerateTokens,
    public refreshToken: UpdateRefreshToken,
  ) {}

  async register({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDto): Promise<AuthResponseDto> {
    const SALT_ROUNDS = 12;

    const existingUser = await this.db.user.findUnique({ where: { email } });

    if (existingUser)
      throw new UnauthorizedException('User with this email already exists');

    try {
      const hashedPassword = await hash(password, SALT_ROUNDS);

      const user = await this.db.user.create({
        data: { email, password: hashedPassword, firstName, lastName },
        select: {
          id: true,
          email: true,
          password: false,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      const tokens = await this.tokens.generate(user.id, user.email);
      await this.refreshToken.update(user.id, tokens.refreshToken);

      return { ...tokens, user };
    } catch (err) {
      console.error(`Error wile creating user: ${err}`);
      throw new InternalServerErrorException('Error on registration');
    }
  }

  async login({ email, password }: LoginDto): Promise<AuthResponseDto> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.tokens.generate(user.id, user.email);
    await this.refreshToken.update(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async refreshTokens(userId: string): Promise<AuthResponseDto> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const tokens = await this.tokens.generate(user.id, user.email);
    await this.refreshToken.update(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(userId): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
