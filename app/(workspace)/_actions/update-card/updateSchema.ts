import { z } from 'zod';

export const updateCardSchema = z.object({
  title: z
    .string({ required_error: 'Title is required', invalid_type_error: 'Title is required' })
    .min(3, { message: 'Must have at least 3 letters' }),
  description: z.optional(
    z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description is required'
      })
      .min(3, { message: 'Must have at least 3 letters' })
  ),
  boardId: z.string(),
  cardId: z.string()
});
