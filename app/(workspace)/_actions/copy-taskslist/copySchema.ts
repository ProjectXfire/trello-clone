import { z } from 'zod';

export const copyTasksListSchema = z.object({
  id: z.string(),
  boardId: z.string()
});
