import { z } from 'zod';

export const copyCardSchema = z.object({
  cardId: z.string(),
  boardId: z.string()
});
