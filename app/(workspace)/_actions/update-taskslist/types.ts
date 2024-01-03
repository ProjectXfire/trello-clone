import { z } from 'zod';
import { type List } from '@prisma/client';
import { updateTasksListSchema } from './updateSchema';
import { ActionState } from '@/shared/lib/createSafeAction';

export type InputType = z.infer<typeof updateTasksListSchema>;
export type ReturnType = ActionState<InputType, List>;
