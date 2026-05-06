import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

export const RegisterDtoSchema = z.object({
  email: z
    .email({ error: 'Please provide a valid email address' })
    .nonempty({ error: 'Email is required' }),
  password: z
    .string({ error: 'Password is required' })
    .min(8, { error: 'Password must be at least 8 characters long' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error:
          'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
      },
    ),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export class RegisterDto extends createZodDto(RegisterDtoSchema) {}
