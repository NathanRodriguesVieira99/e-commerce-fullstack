import type { ROLE } from '@/database/generated/enums';

export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: ROLE;
  };
}
