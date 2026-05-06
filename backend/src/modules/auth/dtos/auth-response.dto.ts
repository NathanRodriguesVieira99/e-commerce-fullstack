import * as z from 'zod';
import { createZodDto } from 'nestjs-zod';

const AuthResponseDtoSchema = z
  .object({
    accessToken: z.string(),
    refreshToken: z.string(),
    user: z.object({
      id: z.string(),
      email: z.email(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      role: z.enum(['USER', 'ADMIN']).default('USER'),
    }),
  })
  .meta({ id: 'AuthResponseDto' });

export class AuthResponseDto extends createZodDto(AuthResponseDtoSchema) {}
