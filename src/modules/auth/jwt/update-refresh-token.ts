import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class UpdateRefreshToken {
  constructor(private readonly db: DatabaseService) {}

  async update(userId: string, refreshToken: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
