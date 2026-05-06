import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getProfile(userId: string): Promise<UserResponseDto> {
    const profile = await this.db.user.findUnique({
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

    if (!profile) throw new NotFoundException(`Resource not found`);

    return profile;
  }
}
