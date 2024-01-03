import { z } from 'zod';

export const deleteTasksListSchema = z.object({
  id: z.string(),
  boardId: z.string()
});
