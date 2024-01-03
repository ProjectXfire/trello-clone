import { z } from 'zod';
import { type List } from '@prisma/client';
import { createTasksListSchema } from './createSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof createTasksListSchema>;
export type ReturnType = ActionState<InputType, List>;
