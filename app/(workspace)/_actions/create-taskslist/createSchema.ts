import { z } from 'zod';

export const createTasksListSchema = z.object({
  title: z
    .string({ required_error: 'Title is required', invalid_type_error: 'Title is required' })
    .min(3, { message: 'Must have at least 3 letters' }),
  id: z.string()
});
