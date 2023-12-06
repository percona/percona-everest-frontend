import { z } from 'zod';

export const loginSchema = z.object({
  password: z.string().min(1, { message: 'Required' }),
});

export type LoginFormType = z.infer<typeof loginSchema>;
