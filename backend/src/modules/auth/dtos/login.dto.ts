import * as z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LoginDtoSchema = z.object({
  email: z
    .email({ error: 'Please provide a valid email address' })
    .nonempty({ error: 'Email is required' }),
  password: z.string().nonempty({ error: 'Password is required' }),
});

export class LoginDto extends createZodDto(LoginDtoSchema) {}
