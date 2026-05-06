import * as z from 'zod';
import { createZodDto } from 'nestjs-zod';

const isoDateTimeToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

export const UserResponseDtoSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  createdAt: isoDateTimeToDate,
  updatedAt: isoDateTimeToDate,
});

export class UserResponseDto extends createZodDto(UserResponseDtoSchema, {
  codec: true,
}) {}
