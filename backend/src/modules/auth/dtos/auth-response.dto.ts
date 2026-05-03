import { ApiProperty } from '@nestjs/swagger';

import type { ROLE } from '@/database/generated/enums';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.access.token',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token for obtain new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.refresh.token',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Authenticated user information',
    example: {
      id: '8f5d2f2d-6c5f-4b7a-9f0f-2d4e5c6b7a8b',
      email: 'jhondoe@acme.com',
      firstName: 'jhon',
      lastName: 'doe',
      role: 'USER',
    },
  })
  user!: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: ROLE;
  };
}
